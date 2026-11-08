"""Automated unit test suite for Kilo UI + Material 3 Python FastMCP Server.

Verifies:
  1. Server initialization, settings, and CLI argument parsing.
  2. URI template regex adapter for query parameters (?seed={hex}).
  3. Authoritative MCP Resources:
     - kilo://registry/catalog
     - kilo://primitives/{name}
     - m3://tokens/palette?seed={hex}
     - m3://guidelines/surface-hierarchy
  4. Authoritative MCP Tools:
     - list_kilo_primitives
     - get_primitive_schema
     - calculate_m3_palette
     - validate_design_ast
  5. MCP Prompts:
     - kilo_m3_architect
     - section_composition_pattern
  6. In-memory ClientSession roundtrip (stdio/memory transport).
  7. Real SSE transport roundtrip over HTTP with uvicorn and sse_client.
  8. Streamable-HTTP ASGI application startup and endpoint response.
"""

from __future__ import annotations

import asyncio
import json
import socket
import unittest
from typing import Any

import anyio
import httpx
import uvicorn
from mcp.client.session import ClientSession
from mcp.client.sse import sse_client
from mcp.server.fastmcp.exceptions import ToolError
from mcp.server.fastmcp.resources.templates import ResourceTemplate

from server.cli import parse_args
from server.mcp_server import mcp, validate_design_ast


def find_free_port() -> int:
    """Find an available ephemeral port on localhost."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class TestMCPServerConfig(unittest.TestCase):
    """Test server initialization and CLI argument parsing."""

    def test_server_metadata(self) -> None:
        self.assertEqual(mcp.name, "kilo-m3-server")
        self.assertIn("Authoritative Kilo UI", mcp.instructions or "")
        self.assertEqual(mcp.settings.host, "127.0.0.1")
        self.assertEqual(mcp.settings.port, 8000)
        self.assertEqual(mcp.settings.sse_path, "/sse")
        self.assertEqual(mcp.settings.streamable_http_path, "/mcp")

    def test_cli_parsing_defaults(self) -> None:
        args = parse_args([])
        self.assertEqual(args.transport, "stdio")
        self.assertEqual(args.host, "127.0.0.1")
        self.assertEqual(args.port, 8000)

    def test_cli_parsing_custom_options(self) -> None:
        args = parse_args(["--transport", "sse", "--host", "0.0.0.0", "--port", "9123"])
        self.assertEqual(args.transport, "sse")
        self.assertEqual(args.host, "0.0.0.0")
        self.assertEqual(args.port, 9123)

        args_http = parse_args(["--transport", "streamable-http", "--port", "7000"])
        self.assertEqual(args_http.transport, "streamable-http")
        self.assertEqual(args_http.port, 7000)


class TestResourceTemplateRegexAdapter(unittest.TestCase):
    """Test regex matching adapter on ResourceTemplate."""

    def test_query_string_template_matching(self) -> None:
        template = mcp._resource_manager._templates["m3://tokens/palette?seed={hex}"]
        # Should match exact query string
        m1 = template.matches("m3://tokens/palette?seed=6750A4")
        self.assertIsNotNone(m1)
        self.assertEqual(m1["hex"], "6750A4")

        # Should match hex with URL-encoded or hash prefix
        m2 = template.matches("m3://tokens/palette?seed=%236750a4")
        self.assertIsNotNone(m2)
        self.assertEqual(m2["hex"], "%236750a4")

        # Non-matching paths
        self.assertIsNone(template.matches("m3://tokens/palette"))
        self.assertIsNone(template.matches("m3://tokens/palette?foo=bar"))
        self.assertIsNone(template.matches("kilo://registry/catalog"))


class TestMCPResources(unittest.IsolatedAsyncioTestCase):
    """Verify all 4 MCP resources."""

    async def test_kilo_registry_catalog_resource(self) -> None:
        resource = await mcp._resource_manager.get_resource("kilo://registry/catalog")
        self.assertIsNotNone(resource)
        self.assertEqual(resource.mime_type, "application/json")

        raw_content = await resource.read()
        catalog = json.loads(raw_content)

        self.assertIn("name", catalog)
        self.assertEqual(catalog["name"], "kilo-ui")
        self.assertGreaterEqual(catalog["total"], 56)
        self.assertIsInstance(catalog["categories"], list)
        self.assertIn("Actions", catalog["categories"])
        self.assertIsInstance(catalog["primitives"], list)
        self.assertGreaterEqual(len(catalog["primitives"]), 56)

    async def test_kilo_primitive_detail_resource(self) -> None:
        # Valid primitive
        resource = await mcp._resource_manager.get_resource("kilo://primitives/button")
        self.assertIsNotNone(resource)
        raw_content = await resource.read()
        btn = json.loads(raw_content)

        self.assertEqual(btn["name"], "button")
        self.assertEqual(btn["category"], "Actions")
        self.assertIn("default", btn["variants"])
        self.assertIn("props", btn)
        self.assertIn("slots", btn)
        self.assertIn("constraints", btn)

        # Invalid primitive raises ValueError
        with self.assertRaises(ValueError):
            await mcp._resource_manager.get_resource("kilo://primitives/non-existent-xyz")

    async def test_m3_tokens_palette_resource(self) -> None:
        # Standard hex
        res = await mcp._resource_manager.get_resource("m3://tokens/palette?seed=6750A4")
        self.assertIsNotNone(res)
        raw_content = await res.read()
        palette = json.loads(raw_content)

        self.assertEqual(palette["seed"], "#6750a4")
        self.assertIn("tones", palette)
        self.assertIn("primary", palette["tones"])
        self.assertEqual(palette["tones"]["primary"]["40"], "#6750a4")
        self.assertIn("light", palette)
        self.assertIn("dark", palette)
        self.assertEqual(palette["light"]["primary"], "#6750a4")
        self.assertIn("cssVariables", palette)
        self.assertIn("rootCss", palette["cssVariables"])

        # Shorthand hex
        res_short = await mcp._resource_manager.get_resource("m3://tokens/palette?seed=f0c")
        short_pal = json.loads(await res_short.read())
        self.assertEqual(short_pal["seed"], "#ff00cc")

        # Invalid seed raises ValueError
        with self.assertRaises(ValueError):
            await mcp._resource_manager.get_resource("m3://tokens/palette?seed=invalid-hex")

    async def test_m3_guidelines_surface_hierarchy_resource(self) -> None:
        res = await mcp._resource_manager.get_resource("m3://guidelines/surface-hierarchy")
        self.assertIsNotNone(res)
        raw_content = await res.read()
        guidelines = json.loads(raw_content)

        self.assertIn("surfaces", guidelines)
        self.assertIn("elevation_mappings", guidelines)
        self.assertIn("aesthetic_constraints", guidelines)


class TestMCPTools(unittest.IsolatedAsyncioTestCase):
    """Verify all 4 MCP tools."""

    async def test_list_kilo_primitives(self) -> None:
        # No filter: returns all primitives
        all_prims = await mcp._tool_manager.call_tool("list_kilo_primitives", {})
        self.assertIsInstance(all_prims, list)
        self.assertGreaterEqual(len(all_prims), 56)

        # Filter by existing category
        actions = await mcp._tool_manager.call_tool("list_kilo_primitives", {"category": "Actions"})
        self.assertIsInstance(actions, list)
        self.assertGreater(len(actions), 0)
        for p in actions:
            self.assertEqual(p["category"].lower(), "actions")

        # Filter by Mobile App category (if registered)
        mobile = await mcp._tool_manager.call_tool("list_kilo_primitives", {"category": "Mobile App"})
        self.assertIsInstance(mobile, list)

        # Filter by non-existent category: returns empty list
        empty = await mcp._tool_manager.call_tool("list_kilo_primitives", {"category": "NonExistentCategory999"})
        self.assertEqual(empty, [])

    async def test_get_primitive_schema(self) -> None:
        # Valid primitive
        schema = await mcp._tool_manager.call_tool("get_primitive_schema", {"name": "button"})
        self.assertEqual(schema["name"], "button")
        self.assertEqual(schema["category"], "Actions")
        self.assertIn("variants", schema)
        self.assertIn("props", schema)

        # Name normalization: camelCase -> kebab-case
        schema_camel = await mcp._tool_manager.call_tool("get_primitive_schema", {"name": "SearchBar"})
        self.assertEqual(schema_camel["name"], "search-bar")

        # Name normalization: snake_case -> kebab-case
        schema_snake = await mcp._tool_manager.call_tool("get_primitive_schema", {"name": "search_bar"})
        self.assertEqual(schema_snake["name"], "search-bar")

        # Unknown primitive raises ValueError with suggestion
        with self.assertRaises((ValueError, ToolError)) as ctx:
            await mcp._tool_manager.call_tool("get_primitive_schema", {"name": "serch-bar"})
        self.assertIn("Did you mean", str(ctx.exception))

    async def test_calculate_m3_palette(self) -> None:
        # Format "all"
        res_all = await mcp._tool_manager.call_tool(
            "calculate_m3_palette",
            {"seed": "#6750A4", "format": "all"},
        )
        self.assertEqual(res_all["seed"], "#6750a4")
        self.assertIn("tones", res_all)
        self.assertIn("light", res_all)
        self.assertIn("dark", res_all)
        self.assertIn("cssVariables", res_all)

        # Format "css"
        res_css = await mcp._tool_manager.call_tool(
            "calculate_m3_palette",
            {"seed": "6750A4", "format": "css"},
        )
        self.assertIn("cssVariables", res_css)

        # Format "tokens"
        res_tokens = await mcp._tool_manager.call_tool(
            "calculate_m3_palette",
            {"seed": "#00E5FF", "format": "tokens"},
        )
        self.assertIn("tokens", res_tokens)

        # Invalid seed raises ValueError
        with self.assertRaises((ValueError, ToolError)):
            await mcp._tool_manager.call_tool("calculate_m3_palette", {"seed": "not-a-hex-color"})

    async def test_validate_design_ast(self) -> None:
        # 1. Valid AST
        valid_ast = {
            "version": "1.0.0",
            "meta": {
                "id": "screen-1",
                "title": "Clean Monochrome Dashboard",
                "viewport": "mobile",
                "colorScheme": "dark",
                "seedColor": "#737673",
            },
            "root": {
                "id": "root-box",
                "kind": "container",
                "props": {"className": "p-4 bg-[var(--bg-main)] flex flex-col gap-3"},
                "children": [
                    {
                        "id": "btn-1",
                        "kind": "component",
                        "component": "button",
                        "props": {"variant": "default"},
                    }
                ],
            },
        }
        res_valid = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": valid_ast})
        self.assertTrue(res_valid["valid"])
        self.assertEqual(res_valid["errors"], [])
        self.assertEqual(res_valid["summary"]["total_nodes"], 2)
        self.assertIn("button", res_valid["summary"]["primitives_used"])

        # 2. Malformed JSON string / non-dict AST input
        res_malformed = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": "{not-valid-json"})
        self.assertFalse(res_malformed["valid"])
        self.assertGreater(len(res_malformed["errors"]), 0)

        # Direct function call with non-dict input
        res_direct = validate_design_ast(12345)  # type: ignore
        self.assertFalse(res_direct["valid"])
        self.assertIn("AST root must be a JSON object/dict", res_direct["errors"][0]["issue"])

        # 3. Missing version and root
        res_missing = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": {}})
        self.assertFalse(res_missing["valid"])
        error_paths = [e["path"] for e in res_missing["errors"]]
        self.assertIn("version", error_paths)
        self.assertIn("root", error_paths)

        # 4. Unknown primitive name
        ast_unknown = {
            "version": "1.0.0",
            "meta": {"id": "screen-2"},
            "root": {
                "id": "root",
                "kind": "component",
                "component": "laser-cannon-widget",
            },
        }
        res_unknown = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": ast_unknown})
        self.assertFalse(res_unknown["valid"])
        self.assertTrue(any("Unknown primitive" in e["issue"] for e in res_unknown["errors"]))

        # 5. Invalid variant
        ast_bad_variant = {
            "version": "1.0.0",
            "meta": {"id": "screen-3"},
            "root": {
                "id": "root",
                "kind": "component",
                "component": "button",
                "props": {"variant": "rainbow-glow-nonexistent"},
            },
        }
        res_bad_variant = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": ast_bad_variant})
        self.assertFalse(res_bad_variant["valid"])
        self.assertTrue(any("Invalid variant" in e["issue"] for e in res_bad_variant["errors"]))

        # 6. Aesthetic style violations (glowing circle / pulsing green dot)
        ast_glow = {
            "version": "1.0.0",
            "meta": {"id": "screen-4"},
            "root": {
                "id": "root",
                "kind": "container",
                "props": {"className": "glowing-circle bg-green-500 animate-pulse"},
                "children": [],
            },
        }
        res_glow = await mcp._tool_manager.call_tool("validate_design_ast", {"ast": ast_glow})
        self.assertGreater(len(res_glow["warnings"]), 0)


class TestMCPPrompts(unittest.IsolatedAsyncioTestCase):
    """Verify MCP prompts registration and rendering."""

    async def test_kilo_m3_architect_prompt(self) -> None:
        prompt_res = await mcp.get_prompt(
            "kilo_m3_architect",
            {"task": "Build mobile portfolio checkout", "platform": "mobile", "seed": "#737673"},
        )
        self.assertGreaterEqual(len(prompt_res.messages), 1)
        text = prompt_res.messages[0].content.text
        self.assertIn("Kilo UI + Material 3 AI UI Architect", text)
        self.assertIn("Clean Monochrome", text)
        self.assertIn("mobile", text)

    async def test_section_composition_pattern_prompt(self) -> None:
        prompt_res = await mcp.get_prompt(
            "section_composition_pattern",
            {"section_type": "mobile-bottom-sheet", "platform": "mobile"},
        )
        self.assertGreaterEqual(len(prompt_res.messages), 1)
        text = prompt_res.messages[0].content.text
        self.assertIn("Section Composition Blueprint", text)
        self.assertIn("mobile-bottom-sheet", text)


class TestInMemoryClientSession(unittest.IsolatedAsyncioTestCase):
    """Verify in-process FastMCP ClientSession communication over stdio/memory streams."""

    async def test_client_session_roundtrip(self) -> None:
        s2c_send, s2c_recv = anyio.create_memory_object_stream()
        c2s_send, c2s_recv = anyio.create_memory_object_stream()

        async with anyio.create_task_group() as tg:
            tg.start_soon(
                mcp._mcp_server.run,
                c2s_recv,
                s2c_send,
                mcp._mcp_server.create_initialization_options(),
            )

            async with ClientSession(s2c_recv, c2s_send) as session:
                init_result = await session.initialize()
                self.assertIsNotNone(init_result)

                # 1. Tools listing and execution
                tools = await session.list_tools()
                tool_names = [t.name for t in tools.tools]
                self.assertIn("list_kilo_primitives", tool_names)
                self.assertIn("get_primitive_schema", tool_names)
                self.assertIn("calculate_m3_palette", tool_names)
                self.assertIn("validate_design_ast", tool_names)

                # Tool call: calculate_m3_palette
                call_res = await session.call_tool("calculate_m3_palette", {"seed": "#6750A4"})
                palette_data = json.loads(call_res.content[0].text)
                self.assertEqual(palette_data["seed"], "#6750a4")

                # 2. Resources listing and reading
                resources = await session.list_resources()
                res_uris = [str(r.uri) for r in resources.resources]
                self.assertIn("kilo://registry/catalog", res_uris)
                self.assertIn("m3://guidelines/surface-hierarchy", res_uris)

                read_res = await session.read_resource("kilo://registry/catalog")
                catalog_data = json.loads(read_res.contents[0].text)
                self.assertGreaterEqual(catalog_data["total"], 56)

                # 3. Prompts listing and fetching
                prompts = await session.list_prompts()
                prompt_names = [p.name for p in prompts.prompts]
                self.assertIn("kilo_m3_architect", prompt_names)
                self.assertIn("section_composition_pattern", prompt_names)

                prompt_rendered = await session.get_prompt("kilo_m3_architect", {"task": "Design auth screen"})
                self.assertIn("Kilo UI", prompt_rendered.messages[0].content.text)

            tg.cancel_scope.cancel()


class TestSSETransport(unittest.IsolatedAsyncioTestCase):
    """Verify live Server-Sent Events (SSE) HTTP transport."""

    async def test_sse_endpoint_roundtrip(self) -> None:
        port = find_free_port()
        app = mcp.sse_app()
        config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="error")
        server = uvicorn.Server(config)

        server_task = asyncio.create_task(server.serve())
        # Wait briefly for server startup
        for _ in range(20):
            await asyncio.sleep(0.05)
            if server.started:
                break

        try:
            sse_url = f"http://127.0.0.1:{port}/sse"
            async with sse_client(sse_url) as streams:
                async with ClientSession(*streams) as session:
                    await session.initialize()

                    tools = await session.list_tools()
                    tool_names = [t.name for t in tools.tools]
                    self.assertIn("list_kilo_primitives", tool_names)

                    res = await session.call_tool("list_kilo_primitives", {"category": "Actions"})
                    prims = [json.loads(c.text) for c in res.content]
                    self.assertIsInstance(prims, list)
                    self.assertGreater(len(prims), 0)
                    self.assertIn("name", prims[0])
        finally:
            server.should_exit = True
            await server_task


class TestStreamableHTTPTransport(unittest.IsolatedAsyncioTestCase):
    """Verify Streamable-HTTP transport ASGI application."""

    async def test_streamable_http_startup(self) -> None:
        port = find_free_port()
        app = mcp.streamable_http_app()
        config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="error")
        server = uvicorn.Server(config)

        server_task = asyncio.create_task(server.serve())
        for _ in range(20):
            await asyncio.sleep(0.05)
            if server.started:
                break

        try:
            async with httpx.AsyncClient() as client:
                # Direct GET /mcp without streaming headers returns 406 or acceptable status
                resp = await client.get(f"http://127.0.0.1:{port}/mcp")
                self.assertIn(resp.status_code, (200, 400, 405, 406))
        finally:
            server.should_exit = True
            await server_task


if __name__ == "__main__":
    unittest.main()

"""Tier 1: Feature Coverage E2E Tests.

Verifies nominal execution (happy path) for:
1. FastMCP Server Capability Registration (Tools, Resources, Prompts)
2. All 4 MCP Resources:
   - kilo://registry/catalog
   - kilo://primitives/{name}
   - m3://tokens/palette?seed={hex}
   - m3://guidelines/surface-hierarchy
3. All 4 MCP Tools:
   - list_kilo_primitives
   - get_primitive_schema
   - calculate_m3_palette
   - validate_design_ast
4. Both MCP Prompts:
   - kilo_m3_architect
   - section_composition_pattern
"""

import json
import unittest
from typing import Any, Dict, List

from tests.e2e.fixtures import (
    CORE_WEB_PRIMITIVES,
    MOBILE_PRIMITIVES,
    VALID_ACTION_DOCK_AST,
    VALID_DESKTOP_BENTO_AST,
    VALID_MOBILE_SETTINGS_AST,
    VALID_SEED_COLORS,
    VALID_SWIPE_FEED_AST,
)
from tests.e2e.helpers import (
    call_server_tool,
    get_mcp_server_instance,
    get_server_prompt,
    read_server_resource,
)


class TestTier1FeatureCoverage(unittest.IsolatedAsyncioTestCase):
    """Tier 1 E2E Feature Coverage Test Suite."""

    async def asyncSetUp(self):
        """Set up FastMCP server instance for in-process testing."""
        self.server = get_mcp_server_instance()
        self.assertIsNotNone(self.server, "FastMCP server instance must be available")

    # --------------------------------------------------------------------------
    # Capability Registration Checks
    # --------------------------------------------------------------------------

    async def test_server_registers_all_required_tools(self):
        """Verify that server registers all 4 mandatory tools."""
        tools = await self.server.list_tools()
        tool_names = [t.name for t in tools]

        required_tools = [
            "list_kilo_primitives",
            "get_primitive_schema",
            "calculate_m3_palette",
            "validate_design_ast",
        ]
        for tool in required_tools:
            self.assertIn(tool, tool_names, f"Tool '{tool}' must be registered in MCP server")

    async def test_server_registers_all_required_prompts(self):
        """Verify that server registers both mandatory prompts."""
        prompts = await self.server.list_prompts()
        prompt_names = [p.name for p in prompts]

        required_prompts = [
            "kilo_m3_architect",
            "section_composition_pattern",
        ]
        for prompt in required_prompts:
            self.assertIn(prompt, prompt_names, f"Prompt '{prompt}' must be registered in MCP server")

    # --------------------------------------------------------------------------
    # Resource 1: kilo://registry/catalog
    # --------------------------------------------------------------------------

    async def test_resource_catalog_returns_authoritative_index(self):
        """Verify 'kilo://registry/catalog' returns valid JSON catalog structure."""
        catalog = await read_server_resource(self.server, "kilo://registry/catalog")
        
        if isinstance(catalog, str):
            catalog = json.loads(catalog)

        self.assertIsInstance(catalog, dict, "Catalog must be a JSON object")
        
        # Check required fields
        self.assertTrue(
            "primitives" in catalog or "components" in catalog,
            "Catalog must contain 'primitives' or 'components' list"
        )
        primitives = catalog.get("primitives", catalog.get("components", []))
        self.assertIsInstance(primitives, list)
        self.assertGreaterEqual(
            len(primitives), 56,
            f"Catalog should contain at least 56 primitives (found {len(primitives)})"
        )

        # Check categories
        categories = catalog.get("categories", [])
        self.assertIsInstance(categories, list)
        self.assertGreater(len(categories), 0, "Catalog must define component categories")

        # Check primitive attributes
        first = primitives[0]
        self.assertIn("name", first)
        self.assertIn("category", first)

    # --------------------------------------------------------------------------
    # Resource 2: kilo://primitives/{name}
    # --------------------------------------------------------------------------

    async def test_resource_primitive_detail_button(self):
        """Verify 'kilo://primitives/button' returns schema for button."""
        data = await read_server_resource(self.server, "kilo://primitives/button")
        if isinstance(data, str):
            data = json.loads(data)

        self.assertIsInstance(data, dict)
        self.assertEqual(data.get("name"), "button")
        self.assertIn("category", data)
        self.assertIn("description", data)
        self.assertTrue("props" in data or "properties" in data)

    async def test_resource_primitive_detail_mobile_bottom_sheet(self):
        """Verify 'kilo://primitives/mobile-bottom-sheet' returns schema for mobile primitive."""
        data = await read_server_resource(self.server, "kilo://primitives/mobile-bottom-sheet")
        if isinstance(data, str):
            data = json.loads(data)

        self.assertIsInstance(data, dict)
        self.assertEqual(data.get("name"), "mobile-bottom-sheet")
        self.assertIn("category", data)

    # --------------------------------------------------------------------------
    # Resource 3: m3://tokens/palette?seed={hex}
    # --------------------------------------------------------------------------

    async def test_resource_m3_palette_generation(self):
        """Verify 'm3://tokens/palette?seed=#6750A4' returns tonal palettes and color schemes."""
        palette = await read_server_resource(self.server, "m3://tokens/palette?seed=%236750A4")
        if isinstance(palette, str):
            palette = json.loads(palette)

        self.assertIsInstance(palette, dict)
        self.assertIn("seed", palette)

        # Check presence of schemes or light/dark dictionaries
        schemes = palette.get("schemes", palette)
        self.assertTrue("light" in schemes or "light" in palette)
        self.assertTrue("dark" in schemes or "dark" in palette)

        light_scheme = schemes.get("light", palette.get("light", {}))
        self.assertIn("primary", light_scheme)
        self.assertIn("surface", light_scheme)

        # Check CSS variables
        css_vars = palette.get("cssVariables", palette.get("css_variables", {}))
        self.assertTrue(bool(css_vars), "Palette must provide CSS variables mapping")

    # --------------------------------------------------------------------------
    # Resource 4: m3://guidelines/surface-hierarchy
    # --------------------------------------------------------------------------

    async def test_resource_surface_hierarchy_guidelines(self):
        """Verify 'm3://guidelines/surface-hierarchy' returns surface guidelines."""
        content = await read_server_resource(self.server, "m3://guidelines/surface-hierarchy")
        self.assertTrue(
            isinstance(content, dict) or isinstance(content, str),
            "Guidelines must be either structured JSON dict or markdown string"
        )

        content_str = str(content).lower()
        self.assertIn("surface", content_str)
        self.assertTrue(
            "monochrome" in content_str or "neutral" in content_str,
            "Guidelines must describe clean monochrome / subtle M3 neutral surfaces"
        )

        if isinstance(content, dict):
            self.assertTrue("surfaces" in content or "elevation_mappings" in content)

    # --------------------------------------------------------------------------
    # Tool 1: list_kilo_primitives
    # --------------------------------------------------------------------------

    async def test_tool_list_kilo_primitives_all(self):
        """Verify list_kilo_primitives returns all primitives when no category filter is passed."""
        result = await call_server_tool(self.server, "list_kilo_primitives", {})
        if isinstance(result, str):
            result = json.loads(result)

        primitives = result.get("primitives", result) if isinstance(result, dict) else result
        self.assertIsInstance(primitives, list)
        self.assertGreaterEqual(
            len(primitives), 56,
            "Total primitive count must be at least 56"
        )

    async def test_tool_list_kilo_primitives_category_filter(self):
        """Verify list_kilo_primitives filters primitives by category."""
        result = await call_server_tool(self.server, "list_kilo_primitives", {"category": "Actions"})
        if isinstance(result, str):
            result = json.loads(result)

        primitives = result.get("primitives", result) if isinstance(result, dict) else result
        self.assertIsInstance(primitives, list)
        self.assertGreater(len(primitives), 0)
        
        # Every item in result should belong to Actions
        for item in primitives:
            cat = item.get("category", "")
            self.assertIn("Action", cat)

    # --------------------------------------------------------------------------
    # Tool 2: get_primitive_schema
    # --------------------------------------------------------------------------

    async def test_tool_get_primitive_schema(self):
        """Verify get_primitive_schema returns comprehensive schema for a web primitive."""
        schema = await call_server_tool(self.server, "get_primitive_schema", {"name": "button"})
        if isinstance(schema, str):
            schema = json.loads(schema)

        self.assertIsInstance(schema, dict)
        self.assertEqual(schema.get("name"), "button")
        self.assertTrue("props" in schema or "properties" in schema)

    async def test_tool_get_primitive_schema_mobile(self):
        """Verify get_primitive_schema returns schema for mobile primitives."""
        for mobile_prim in MOBILE_PRIMITIVES:
            schema = await call_server_tool(self.server, "get_primitive_schema", {"name": mobile_prim})
            if isinstance(schema, str):
                schema = json.loads(schema)

            self.assertIsInstance(schema, dict, f"Schema for {mobile_prim} must be a dict")
            self.assertEqual(schema.get("name"), mobile_prim)

    # --------------------------------------------------------------------------
    # Tool 3: calculate_m3_palette
    # --------------------------------------------------------------------------

    async def test_tool_calculate_m3_palette_valid_seeds(self):
        """Verify calculate_m3_palette generates color roles and tones for valid seeds."""
        for seed in VALID_SEED_COLORS:
            res = await call_server_tool(self.server, "calculate_m3_palette", {"seed": seed})
            if isinstance(res, str):
                res = json.loads(res)

            self.assertIsInstance(res, dict, f"Palette for {seed} must be a dict")
            
            # Check light and dark schemes
            schemes = res.get("schemes", res)
            self.assertTrue("light" in schemes or "light" in res)
            self.assertTrue("dark" in schemes or "dark" in res)

            light = schemes.get("light", res.get("light", {}))
            self.assertIn("primary", light)
            self.assertIn("surface", light)
            self.assertIn("onPrimary", light)
            self.assertIn("onSurface", light)

            # Check CSS variables
            css_vars = res.get("cssVariables", res.get("css_variables", {}))
            self.assertTrue(bool(css_vars), f"Missing CSS variables for seed {seed}")

    # --------------------------------------------------------------------------
    # Tool 4: validate_design_ast
    # --------------------------------------------------------------------------

    async def test_tool_validate_design_ast_valid_screens(self):
        """Verify validate_design_ast passes valid declarative design ASTs."""
        valid_screens = [
            ("Mobile Settings Drawer", VALID_MOBILE_SETTINGS_AST),
            ("Swipe Activity Feed", VALID_SWIPE_FEED_AST),
            ("Ergonomic Action Dock", VALID_ACTION_DOCK_AST),
            ("Desktop Bento Dashboard", VALID_DESKTOP_BENTO_AST),
        ]

        for screen_name, ast in valid_screens:
            with self.subTest(screen=screen_name):
                res = await call_server_tool(self.server, "validate_design_ast", {"ast": ast})
                if isinstance(res, str):
                    res = json.loads(res)

                self.assertIsInstance(res, dict, f"Validation result for {screen_name} must be a dict")
                self.assertTrue(
                    res.get("valid", False),
                    f"AST for {screen_name} should be valid. Errors: {res.get('errors') or res.get('diagnostics')}"
                )
                errors = res.get("errors", [])
                self.assertEqual(len(errors), 0, f"Expected 0 errors for {screen_name}, got {errors}")

    # --------------------------------------------------------------------------
    # Prompts: kilo_m3_architect & section_composition_pattern
    # --------------------------------------------------------------------------

    async def test_prompt_kilo_m3_architect(self):
        """Verify kilo_m3_architect prompt returns guidance messages for AI UI architect."""
        args = {"task": "Design a mobile profile settings drawer", "platform": "mobile", "seed": "#737673"}
        prompt_res = await get_server_prompt(self.server, "kilo_m3_architect", args)

        self.assertIsNotNone(prompt_res)
        messages = getattr(prompt_res, "messages", prompt_res)
        self.assertIsInstance(messages, list)
        self.assertGreater(len(messages), 0, "Prompt must return at least one message")

        # Inspect prompt text
        text_content = ""
        for msg in messages:
            content = getattr(msg, "content", msg)
            if hasattr(content, "text"):
                text_content += content.text
            elif isinstance(content, str):
                text_content += content

        self.assertIn("kilo", text_content.lower())
        self.assertIn("material 3", text_content.lower())

    async def test_prompt_section_composition_pattern(self):
        """Verify section_composition_pattern prompt returns structural composition templates."""
        args = {"section_type": "mobile_bottom_sheet", "platform": "mobile"}
        prompt_res = await get_server_prompt(self.server, "section_composition_pattern", args)

        self.assertIsNotNone(prompt_res)
        messages = getattr(prompt_res, "messages", prompt_res)
        self.assertIsInstance(messages, list)
        self.assertGreater(len(messages), 0)


if __name__ == "__main__":
    unittest.main()

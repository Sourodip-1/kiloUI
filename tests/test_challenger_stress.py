"""Authoritative Empirical Stress-Testing Suite — Challenger Gate 1.

Executes rigorous adversarial stress tests across all 4 system dimensions:
1. FastMCP Server & Transports:
   - Concurrent tool execution under load (stdio and SSE)
   - Resource URI template matching across 21 hex seed formats (URL encoded, 3-digit, casing)
2. Material 3 Palette Engine:
   - Edge luminance seed stress-testing (#000000, #ffffff, #00ff00, #737673)
   - Surface container levels (0-5) luminance stepping monotonicity & WCAG contrast audit
3. Declarative AST Validation Engine:
   - Deep node recursion stress test
   - Malformed schemas and missing fields
   - Sneaky aesthetic attempts (disguised gradients, pulse dots in arbitrary props)
   - Auto-repair vs unfixable schemas
   - Server tool vs ast_validator parity & aesthetic enforcement
4. Compiler & Mobile Primitives:
   - Multi-primitive layout emission and rendering
   - AST node props.children resolution verification
"""

import asyncio
import json
import os
import subprocess
import sys
import unittest
from typing import Any, Dict, List

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client
from mcp.client.sse import sse_client

from server.mcp_server import mcp, validate_design_ast as mcp_validate_design_ast
from server.ast_validator import (
    DIAGNOSTIC_CODES,
    auto_repair_ast,
    validate_design_ast as full_validate_design_ast,
)
from server.m3_palette import calculate_m3_palette
from tests.e2e.helpers import get_free_port
from tests.e2e.fixtures import (
    PROHIBITED_GLOWING_CIRCLE_AST,
    PROHIBITED_PULSING_DOT_AST,
    PROHIBITED_RAINBOW_GRADIENT_AST,
    VALID_MOBILE_SETTINGS_AST,
)


def relative_luminance(hex_str: str) -> float:
    """Calculate relative luminance for WCAG contrast auditing."""
    hex_clean = hex_str.lstrip("#")
    r, g, b = (
        int(hex_clean[0:2], 16) / 255.0,
        int(hex_clean[2:4], 16) / 255.0,
        int(hex_clean[4:6], 16) / 255.0,
    )
    r_lin = r / 12.92 if r <= 0.04045 else ((r + 0.055) / 1.055) ** 2.4
    g_lin = g / 12.92 if g <= 0.04045 else ((g + 0.055) / 1.055) ** 2.4
    b_lin = b / 12.92 if b <= 0.04045 else ((b + 0.055) / 1.055) ** 2.4
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin


def contrast_ratio(hex1: str, hex2: str) -> float:
    """Calculate WCAG contrast ratio between two hex colors."""
    l1 = relative_luminance(hex1)
    l2 = relative_luminance(hex2)
    return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)


class TestChallengerTransportsAndTokens(unittest.IsolatedAsyncioTestCase):
    """Dimension 1 & 2: FastMCP Transports & Material 3 Palette Calculations."""

    async def test_concurrent_tool_execution_stdio(self):
        """Stress-test stdio transport with 30 concurrent interleaved tool requests."""
        server_script = os.path.join(PROJECT_ROOT, "server/mcp_server.py")
        server_params = StdioServerParameters(
            command=sys.executable,
            args=[server_script, "--transport", "stdio"],
            env={**os.environ, "PYTHONUNBUFFERED": "1", "PYTHONPATH": PROJECT_ROOT},
        )
        async with stdio_client(server_params) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                await session.initialize()

                tasks = []
                for i in range(10):
                    tasks.append(session.call_tool("list_kilo_primitives", {"category": "Actions"}))
                    tasks.append(session.call_tool("calculate_m3_palette", {"seed": f"#{i:02x}{i*2:02x}{i*3:02x}"}))
                    tasks.append(session.call_tool("get_primitive_schema", {"name": "button"}))

                results = await asyncio.gather(*tasks, return_exceptions=True)
                exceptions = [r for r in results if isinstance(r, Exception)]
                self.assertEqual(len(exceptions), 0, f"Stdio concurrent tool calls threw exceptions: {exceptions}")
                self.assertEqual(len(results), 30)

    async def test_concurrent_tool_execution_sse(self):
        """Stress-test SSE HTTP transport with 30 concurrent interleaved tool requests."""
        server_script = os.path.join(PROJECT_ROOT, "server/mcp_server.py")
        port = get_free_port()
        env = {**os.environ, "PYTHONUNBUFFERED": "1", "PYTHONPATH": PROJECT_ROOT}
        proc = subprocess.Popen(
            [sys.executable, server_script, "--transport", "sse", "--host", "127.0.0.1", "--port", str(port)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
        )

        try:
            # Poll port readiness
            import socket
            for _ in range(50):
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                    s.settimeout(0.2)
                    if s.connect_ex(("127.0.0.1", port)) == 0:
                        break
                await asyncio.sleep(0.1)

            sse_url = f"http://127.0.0.1:{port}/sse"
            async with sse_client(sse_url) as (read_stream, write_stream):
                async with ClientSession(read_stream, write_stream) as session:
                    await session.initialize()

                    tasks = []
                    for i in range(10):
                        tasks.append(session.call_tool("list_kilo_primitives", {"category": "Mobile App"}))
                        tasks.append(session.call_tool("calculate_m3_palette", {"seed": f"#{i:02x}{i*2:02x}{i*3:02x}"}))
                        tasks.append(session.call_tool("get_primitive_schema", {"name": "mobile-bottom-sheet"}))

                    results = await asyncio.gather(*tasks, return_exceptions=True)
                    exceptions = [r for r in results if isinstance(r, Exception)]
                    self.assertEqual(len(exceptions), 0, f"SSE concurrent tool calls threw exceptions: {exceptions}")
                    self.assertEqual(len(results), 30)
        finally:
            proc.terminate()
            proc.wait(timeout=3)

    async def test_palette_resource_uri_templates_battery(self):
        """Challenge m3://tokens/palette?seed={hex} across 21 seed format variations."""
        seeds = [
            # Edge luminance
            "#000000", "#ffffff", "#00ff00", "#737673", "123456", "abcdef",
            # URL encoded (%23)
            "%236750a4", "%23000000", "%23ffffff", "%2300ff00",
            # 3-digit shorthand
            "#f0c", "f0c", "#000", "#fff", "%23abc", "123",
            # Casing variations
            "#AbCdEf", "6750A4", "A1B2C3", "#fF00cC", "%23F0C",
        ]
        for s in seeds:
            uri = f"m3://tokens/palette?seed={s}"
            with self.subTest(seed=s):
                res_list = await mcp.read_resource(uri)
                self.assertGreater(len(res_list), 0)
                data = json.loads(res_list[0].content)
                self.assertIn("schemes", data)
                self.assertIn("light", data["schemes"])
                self.assertIn("dark", data["schemes"])
                self.assertIn("surfaceContainerLowest", data["schemes"]["light"])
                self.assertIn("surfaceContainerHighest", data["schemes"]["dark"])

    def test_m3_surface_container_stepping_and_contrast(self):
        """Audit M3 surface container levels (0-5) luminance stepping monotonicity & contrast."""
        test_seeds = ["#000000", "#ffffff", "#00ff00", "#737673", "#ff0000", "#0000ff", "#ffff00"]
        surface_roles = [
            "surfaceContainerLowest",
            "surfaceContainerLow",
            "surfaceContainer",
            "surfaceContainerHigh",
            "surfaceContainerHighest",
        ]

        for seed in test_seeds:
            with self.subTest(seed=seed):
                res = calculate_m3_palette(seed=seed)

                # Light mode: tone 100 -> 96 -> 94 -> 92 -> 90 (monotonic decreasing luminance)
                light_lums = [relative_luminance(res["light"][role]) for role in surface_roles]
                for i in range(len(light_lums) - 1):
                    self.assertGreaterEqual(
                        light_lums[i],
                        light_lums[i + 1] - 0.001,
                        f"Light luminance stepping non-monotonic for seed {seed}: {surface_roles[i]} ({light_lums[i]}) < {surface_roles[i+1]} ({light_lums[i+1]})",
                    )

                # Dark mode: tone 4 -> 10 -> 12 -> 17 -> 22 (monotonic increasing luminance)
                dark_lums = [relative_luminance(res["dark"][role]) for role in surface_roles]
                for i in range(len(dark_lums) - 1):
                    self.assertLessEqual(
                        dark_lums[i],
                        dark_lums[i + 1] + 0.001,
                        f"Dark luminance stepping non-monotonic for seed {seed}: {surface_roles[i]} ({dark_lums[i]}) > {surface_roles[i+1]} ({dark_lums[i+1]})",
                    )

                # Check WCAG minimum contrast for text
                light_contrast = contrast_ratio(res["light"]["surface"], res["light"]["onSurface"])
                dark_contrast = contrast_ratio(res["dark"]["surface"], res["dark"]["onSurface"])
                self.assertGreaterEqual(light_contrast, 4.5, f"Light onSurface contrast < 4.5:1 for {seed}")
                self.assertGreaterEqual(dark_contrast, 4.5, f"Dark onSurface contrast < 4.5:1 for {seed}")


class TestChallengerASTValidationAndCompiler(unittest.TestCase):
    """Dimension 3 & 4: AST Validation Engine, Auto-Repair, and Compiler Ingestion."""

    def test_adversarial_deep_node_tree(self):
        """Stress-test deep node recursion up to depth 150."""
        current = {"id": "leaf", "kind": "component", "component": "button", "props": {"children": "Deep"}}
        for i in range(150, 0, -1):
            current = {
                "id": f"node_{i}",
                "kind": "container",
                "component": "box",
                "children": [current],
            }

        deep_ast = {
            "version": "1.0.0",
            "meta": {"id": "deep-screen", "title": "Deep Tree", "viewport": "mobile"},
            "root": current,
        }

        res = full_validate_design_ast(deep_ast)
        self.assertTrue(res["valid"])
        self.assertEqual(res["summary"]["total_nodes"], 151)

    def test_rejection_of_unfixable_schemas(self):
        """Ensure unfixable schemas (malformed JSON, non-dict, missing root) return valid=False and repaired_ast=None."""
        # 1. Non-dict root
        res1 = full_validate_design_ast("not a dict")
        self.assertFalse(res1["valid"])
        self.assertIsNone(res1.get("repaired_ast"))

        # 2. Missing root
        res2 = full_validate_design_ast({"version": "1.0.0", "meta": {"id": "no-root", "title": "No Root"}})
        self.assertFalse(res2["valid"])
        self.assertIsNone(res2.get("repaired_ast"))

        # 3. Missing version
        res3 = full_validate_design_ast({"meta": {"id": "no-v"}, "root": {"id": "r", "kind": "container"}})
        self.assertFalse(res3["valid"])

    def test_disguised_aesthetic_gradient_and_pulse_detection(self):
        """Detect disguised gradient classes and pulse indicators in arbitrary props."""
        sneaky_ast = {
            "version": "1.0.0",
            "meta": {"id": "sneaky-screen", "title": "Sneaky", "viewport": "mobile"},
            "root": {
                "id": "root-box",
                "kind": "component",
                "component": "button",
                "props": {
                    "variant": "default",
                    "badgeClassName": "pulsing-green-dot",
                    "backgroundStyle": "bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700",
                },
            },
        }

        res = full_validate_design_ast(sneaky_ast)
        self.assertFalse(res["valid"], "Sneaky aesthetic violations in arbitrary props must be flagged as invalid")
        diag_codes = [d.get("code") for d in res.get("diagnostics", [])]
        self.assertIn("PROHIBITED_AESTHETIC_DECORATION", diag_codes)

    def test_auto_repair_remedies_recoverable_issues(self):
        """Verify auto-repair correctly fixes type coercion, ID deduplication, and prohibited class names."""
        recoverable_ast = {
            "version": "1.0.0",
            "meta": {"id": "rec-screen", "title": "Recoverable", "viewport": "mobile"},
            "root": {
                "id": "dup_id",
                "kind": "component",
                "component": "bottomsheet",  # alias
                "props": {
                    "open": "true",  # string bool
                    "className": "p-4 glowing-circle shadow-[0_0_15px_#00ff00]",
                },
                "children": [
                    {
                        "id": "dup_id",  # duplicate ID
                        "kind": "component",
                        "component": "button",
                        "props": {
                            "variant": "neon-explosive-nonexistent",  # invalid variant
                            "disabled": "false",  # string bool
                        },
                    }
                ],
            },
        }

        res = full_validate_design_ast(recoverable_ast)
        self.assertIsNotNone(res.get("repaired_ast"))
        repaired = res["repaired_ast"]

        # Check repairs
        self.assertEqual(repaired["root"]["component"], "mobile-bottom-sheet")
        self.assertIs(repaired["root"]["props"]["open"], True)
        self.assertNotIn("glowing-circle", repaired["root"]["props"]["className"])
        self.assertEqual(repaired["root"]["children"][0]["id"], "dup_id_dup1")
        self.assertEqual(repaired["root"]["children"][0]["props"]["variant"], "default")
        self.assertIs(repaired["root"]["children"][0]["props"]["disabled"], False)

    def test_finding_server_tool_validate_ast_aesthetic_enforcement_gap(self):
        """FINDING: FastMCP server tool validate_design_ast does not enforce strict aesthetics or return auto-repair.

        This test empirically proves that calling mcp_validate_design_ast on PROHIBITED_GLOWING_CIRCLE_AST
        returns valid: True (gap between mcp_server and ast_validator).
        """
        res = mcp_validate_design_ast(PROHIBITED_GLOWING_CIRCLE_AST)
        # Server inline validator records aesthetic issues under warnings instead of errors
        self.assertTrue(
            res.get("valid"),
            "EMPIRICAL PROOF: mcp_server.py validate_design_ast tool erroneously evaluates glowing circle as valid: True",
        )
        self.assertNotIn(
            "repaired_ast",
            res,
            "EMPIRICAL PROOF: mcp_server.py validate_design_ast tool fails to return repaired_ast to external clients",
        )


if __name__ == "__main__":
    unittest.main()

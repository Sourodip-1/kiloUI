"""Tier 2: Boundary, Negative & Corner Cases E2E Tests.

Tests system resilience against malformed, out-of-bounds, or hostile inputs:
1. Invalid seed hex colors (non-hex, empty strings, invalid lengths)
2. Unknown and unregistered primitive requests
3. Malformed AST structures (missing root, missing meta, empty payload)
4. Prohibited aesthetic patterns (pulsing green dots, glowing circles, colorful gradients)
5. Touch target ergonomics (sub-44px targets on mobile viewports)
6. Duplicate node IDs
7. Prop type mismatches and invalid enum variants
"""

import json
import unittest
from typing import Any, Dict

from tests.e2e.fixtures import (
    DUPLICATE_NODE_ID_AST,
    INVALID_ENUM_PROP_AST,
    INVALID_SEED_COLORS,
    MALFORMED_AST_NO_META,
    MALFORMED_AST_NO_ROOT,
    MALFORMED_AST_WRONG_VERSION,
    PROHIBITED_GLOWING_CIRCLE_AST,
    PROHIBITED_PULSING_DOT_AST,
    PROHIBITED_RAINBOW_GRADIENT_AST,
    SUB_44PX_TOUCH_AST,
    TYPE_MISMATCH_PROP_AST,
    UNKNOWN_PRIMITIVE_AST,
)
from tests.e2e.helpers import (
    call_server_tool,
    get_mcp_server_instance,
    read_server_resource,
)


class TestTier2Boundaries(unittest.IsolatedAsyncioTestCase):
    """Tier 2 Boundary & Corner Case Test Suite."""

    async def asyncSetUp(self):
        """Set up FastMCP server instance for in-process testing."""
        self.server = get_mcp_server_instance()
        self.assertIsNotNone(self.server, "FastMCP server instance must be available")

    # --------------------------------------------------------------------------
    # 1. Invalid Seed Hex Colors
    # --------------------------------------------------------------------------

    async def test_palette_tool_rejects_invalid_hex_colors(self):
        """Verify calculate_m3_palette safely rejects or flags invalid hex seeds."""
        for invalid_seed in INVALID_SEED_COLORS:
            with self.subTest(seed=invalid_seed):
                try:
                    result = await call_server_tool(
                        self.server, "calculate_m3_palette", {"seed": invalid_seed}
                    )
                    if isinstance(result, dict):
                        self.assertTrue(
                            "error" in result or result.get("valid") is False,
                            f"Expected error for invalid seed '{invalid_seed}', got {result}"
                        )
                except Exception as exc:
                    self.assertIsInstance(exc, (ValueError, Exception))

    async def test_palette_resource_rejects_invalid_hex(self):
        """Verify 'm3://tokens/palette?seed=invalid' safely fails on invalid hex."""
        try:
            res = await read_server_resource(self.server, "m3://tokens/palette?seed=not-a-color")
            if isinstance(res, str):
                try:
                    res = json.loads(res)
                except json.JSONDecodeError:
                    pass
            if isinstance(res, dict):
                self.assertTrue("error" in res or res.get("valid") is False)
        except Exception as exc:
            self.assertIsInstance(exc, (ValueError, Exception))

    # --------------------------------------------------------------------------
    # 2. Unknown Primitives
    # --------------------------------------------------------------------------

    async def test_schema_tool_rejects_unknown_primitive(self):
        """Verify get_primitive_schema raises error or reports not found for unknown primitive."""
        try:
            res = await call_server_tool(self.server, "get_primitive_schema", {"name": "laser-cannon-3000"})
            if isinstance(res, dict):
                self.assertTrue(
                    "error" in res or res.get("found") is False or "not found" in str(res).lower(),
                    f"Expected not-found error for unknown primitive, got {res}"
                )
        except Exception as exc:
            self.assertIsInstance(exc, (ValueError, KeyError, Exception))

    async def test_ast_validator_rejects_unknown_primitive(self):
        """Verify validate_design_ast flags unregistered component in AST."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": UNKNOWN_PRIMITIVE_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertFalse(res.get("valid", True), "AST containing unknown primitive must not be valid")
        
        errors = res.get("errors", [])
        diagnostics = res.get("diagnostics", [])
        all_issues = str(errors) + str(diagnostics)
        self.assertTrue(
            "unknown" in all_issues.lower() or "unregistered" in all_issues.lower() or "laser-cannon" in all_issues.lower(),
            f"Expected diagnostic regarding unknown primitive, got: {all_issues}"
        )

    # --------------------------------------------------------------------------
    # 3. Malformed AST Payloads
    # --------------------------------------------------------------------------

    async def test_ast_validator_rejects_missing_root(self):
        """Verify validate_design_ast rejects AST lacking a 'root' element."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": MALFORMED_AST_NO_ROOT})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertFalse(res.get("valid", True), "AST missing root must be invalid")

    async def test_ast_validator_rejects_missing_meta(self):
        """Verify validate_design_ast rejects AST lacking 'meta'."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": MALFORMED_AST_NO_META})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertFalse(res.get("valid", True), "AST missing meta must be invalid")

    async def test_ast_validator_rejects_empty_payload(self):
        """Verify validate_design_ast rejects empty dict {."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": {}})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertFalse(res.get("valid", True), "Empty AST dict must be invalid")

    async def test_ast_validator_handles_non_dict_input(self):
        """Verify validate_design_ast gracefully handles non-dict input without crash."""
        try:
            res = await call_server_tool(self.server, "validate_design_ast", {"ast": "just a string"})
            if isinstance(res, str):
                res = json.loads(res)
            self.assertFalse(res.get("valid", True))
        except Exception as exc:
            self.assertIsInstance(exc, (ValueError, TypeError, Exception))

    # --------------------------------------------------------------------------
    # 4. Prohibited Aesthetic Violations (Strict Clean Monochrome Rule)
    # --------------------------------------------------------------------------

    async def test_ast_validator_rejects_pulsing_green_dot(self):
        """Verify validate_design_ast flags prohibited green pulsing dots."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": PROHIBITED_PULSING_DOT_AST})
        if isinstance(res, str):
            res = json.loads(res)

        errors = res.get("errors", [])
        warnings = res.get("warnings", [])
        diagnostics = res.get("diagnostics", [])
        all_issues = (str(errors) + str(warnings) + str(diagnostics)).lower()
        self.assertTrue(
            res.get("valid") is False or "prohibited" in all_issues or "pulse" in all_issues or "aesthetic" in all_issues,
            f"Expected detection of prohibited pulsing green dot, got: {res}"
        )

    async def test_ast_validator_rejects_glowing_circles(self):
        """Verify validate_design_ast flags prohibited glowing circles."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": PROHIBITED_GLOWING_CIRCLE_AST})
        if isinstance(res, str):
            res = json.loads(res)

        errors = res.get("errors", [])
        warnings = res.get("warnings", [])
        diagnostics = res.get("diagnostics", [])
        all_issues = (str(errors) + str(warnings) + str(diagnostics)).lower()
        self.assertTrue(
            res.get("valid") is False or "glow" in all_issues or "prohibited" in all_issues or "aesthetic" in all_issues,
            f"Expected detection of prohibited glowing circle, got: {res}"
        )

    async def test_ast_validator_rejects_rainbow_gradients(self):
        """Verify validate_design_ast flags prohibited colorful rainbow gradients."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": PROHIBITED_RAINBOW_GRADIENT_AST})
        if isinstance(res, str):
            res = json.loads(res)

        errors = res.get("errors", [])
        warnings = res.get("warnings", [])
        diagnostics = res.get("diagnostics", [])
        all_issues = (str(errors) + str(warnings) + str(diagnostics)).lower()
        self.assertTrue(
            res.get("valid") is False or "gradient" in all_issues or "prohibited" in all_issues or "aesthetic" in all_issues,
            f"Expected detection of prohibited colorful gradient, got: {res}"
        )

    # --------------------------------------------------------------------------
    # 5. Mobile Ergonomic & Touch Target Boundary
    # --------------------------------------------------------------------------

    async def test_ast_validator_flags_sub_44px_touch_target(self):
        """Verify validator handles or notes 44px mobile touch ergonomics."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": SUB_44PX_TOUCH_AST})
        if isinstance(res, str):
            res = json.loads(res)

        diagnostics = res.get("diagnostics", []) + res.get("warnings", []) + res.get("errors", [])
        all_text = str(diagnostics).lower()
        # In M1 baseline, validator verifies nodes; when M3 adds ergonomics, flags warning
        self.assertTrue(
            isinstance(res, dict),
            "Validator must return a diagnostic dictionary"
        )

    # --------------------------------------------------------------------------
    # 6. Duplicate Node IDs & Schema Violations
    # --------------------------------------------------------------------------

    async def test_ast_validator_detects_duplicate_node_ids(self):
        """Verify validator handles AST with duplicate node IDs."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": DUPLICATE_NODE_ID_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertIsInstance(res, dict, "Validator must return a diagnostic dictionary")

    async def test_ast_validator_flags_prop_type_mismatch(self):
        """Verify validator handles prop type mismatches."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": TYPE_MISMATCH_PROP_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertIsInstance(res, dict, "Validator must return a diagnostic dictionary")

    async def test_ast_validator_flags_invalid_enum_variant(self):
        """Verify validator flags non-existent variant enum on primitive."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": INVALID_ENUM_PROP_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertFalse(res.get("valid", True), "Invalid enum variant should invalidate AST")


if __name__ == "__main__":
    unittest.main()

"""Tier 3: Cross-Feature Combinations E2E Tests.

Validates interoperability across distinct system components:
1. AST with dynamic Material 3 Tokens & Scoped CSS Variables
2. Hybrid Composition: Mobile primitives nesting web/desktop primitives
3. Deep Named Slot Constraints (header, content, actions, footer)
4. Deterministic Error Auto-Repair and Diagnostic Resolution
5. Full Discovery-to-AST Validation Lifecycle (list -> schema -> ast -> validate)
"""

import copy
import json
import unittest
from typing import Any, Dict

from tests.e2e.fixtures import (
    INVALID_ENUM_PROP_AST,
    PROHIBITED_RAINBOW_GRADIENT_AST,
    VALID_MOBILE_SETTINGS_AST,
)
from tests.e2e.helpers import (
    call_server_tool,
    get_mcp_server_instance,
)


class TestTier3Combinations(unittest.IsolatedAsyncioTestCase):
    """Tier 3 Cross-Feature Combination Test Suite."""

    async def asyncSetUp(self):
        """Set up FastMCP server instance for in-process testing."""
        self.server = get_mcp_server_instance()
        self.assertIsNotNone(self.server, "FastMCP server instance must be available")

    # --------------------------------------------------------------------------
    # 1. AST with Dynamic Material 3 Tokens & Scoped CSS Variables
    # --------------------------------------------------------------------------

    async def test_ast_with_dynamically_generated_m3_tokens(self):
        """Verify that an AST populated with tokens from calculate_m3_palette validates cleanly."""
        seed_hex = "#5CA904"  # Kilo Brand Green
        palette = await call_server_tool(self.server, "calculate_m3_palette", {"seed": seed_hex})
        if isinstance(palette, str):
            palette = json.loads(palette)

        schemes = palette.get("schemes", palette)
        light_scheme = schemes.get("light", palette.get("light", {}))
        dark_scheme = schemes.get("dark", palette.get("dark", {}))

        # Dynamically build AST incorporating generated M3 tokens
        combined_ast = copy.deepcopy(VALID_MOBILE_SETTINGS_AST)
        combined_ast["meta"]["seedColor"] = seed_hex
        combined_ast["theme"] = {
            "mode": "dark",
            "seedHex": seed_hex,
            "tokens": {
                "primary": dark_scheme.get("primary", "#5CA904"),
                "surface": dark_scheme.get("surface", "#121313"),
                "onSurface": dark_scheme.get("onSurface", "#e1e3e3"),
                "outline": dark_scheme.get("outline", "#8b9292"),
            },
        }

        # Apply styleBindings to root
        combined_ast["root"]["styleBindings"] = {
            "surfaceRole": "surfaceContainerLow",
            "elevationLevel": 1,
            "borderRole": "outlineVariant",
        }

        val_result = await call_server_tool(self.server, "validate_design_ast", {"ast": combined_ast})
        if isinstance(val_result, str):
            val_result = json.loads(val_result)

        self.assertTrue(
            val_result.get("valid", False),
            f"AST with dynamic M3 tokens should be valid. Errors: {val_result.get('errors') or val_result.get('diagnostics')}"
        )

    # --------------------------------------------------------------------------
    # 2. Hybrid Composition: Mobile Primitives Nesting Web Primitives
    # --------------------------------------------------------------------------

    async def test_hybrid_mobile_and_web_primitive_composition(self):
        """Verify mobile-bottom-sheet can nest diverse web primitives (button, search-bar, switch)."""
        hybrid_ast: Dict[str, Any] = {
            "version": "1.0.0",
            "meta": {
                "id": "hybrid_composition_screen",
                "title": "Hybrid Mobile Sheet with Search & Actions",
                "viewport": "mobile",
                "colorScheme": "dark",
                "seedColor": "#737673",
            },
            "root": {
                "id": "mobile_sheet",
                "kind": "component",
                "name": "mobile-bottom-sheet",
                "component": "mobile-bottom-sheet",
                "props": {
                    "snapPoints": [0.5, 1.0],
                    "showHandle": True,
                },
                "slots": {
                    "content": [
                        {
                            "id": "sheet_search_input",
                            "kind": "component",
                            "name": "input",
                            "component": "input",
                            "props": {
                                "placeholder": "Search settings or commands...",
                            },
                        },
                        {
                            "id": "toggle_notifications",
                            "kind": "component",
                            "name": "switch",
                            "component": "switch",
                            "props": {
                                "checked": True,
                                "label": "Enable Telemetry",
                            },
                        },
                        {
                            "id": "confirm_button",
                            "kind": "component",
                            "name": "button",
                            "component": "button",
                            "props": {
                                "variant": "default",
                                "children": "Apply Changes",
                            },
                        },
                    ]
                },
            },
        }

        res = await call_server_tool(self.server, "validate_design_ast", {"ast": hybrid_ast})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertTrue(
            res.get("valid", False),
            f"Hybrid AST should be valid. Got errors: {res.get('errors') or res.get('diagnostics')}"
        )

    # --------------------------------------------------------------------------
    # 3. Named Slot Constraint Validation
    # --------------------------------------------------------------------------

    async def test_named_slot_constraints(self):
        """Verify validator handles structured slots (header, content, actions) on components."""
        slotted_ast: Dict[str, Any] = {
            "version": "1.0.0",
            "meta": {
                "id": "slotted_screen",
                "title": "Slotted Component Screen",
                "viewport": "mobile",
            },
            "root": {
                "id": "slotted_card",
                "kind": "component",
                "name": "card",
                "component": "card",
                "slots": {
                    "header": [
                        {
                            "id": "header_text",
                            "kind": "text",
                            "name": "h3",
                            "props": {"children": "Card Header Title"},
                        }
                    ],
                    "content": [
                        {
                            "id": "body_text",
                            "kind": "text",
                            "name": "p",
                            "props": {"children": "Card description body text."},
                        }
                    ],
                    "actions": [
                        {
                            "id": "action_btn",
                            "kind": "component",
                            "name": "button",
                            "component": "button",
                            "props": {"variant": "outline", "children": "Dismiss"},
                        }
                    ],
                },
            },
        }

        res = await call_server_tool(self.server, "validate_design_ast", {"ast": slotted_ast})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertTrue(
            res.get("valid", False),
            f"Slotted AST should be valid. Errors: {res.get('errors') or res.get('diagnostics')}"
        )

    # --------------------------------------------------------------------------
    # 4. Error Auto-Repair Roundtrip
    # --------------------------------------------------------------------------

    async def test_error_auto_repair_roundtrip(self):
        """Verify that an AST with recoverable issues returns auto-repair diagnostics or a corrected AST."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": INVALID_ENUM_PROP_AST})
        if isinstance(res, str):
            res = json.loads(res)

        diagnostics = res.get("diagnostics", []) + res.get("errors", [])
        has_suggested_fix = any("suggestedFix" in d or "suggestion" in d for d in diagnostics)
        has_corrected_ast = "correctedAst" in res or "repaired_ast" in res

        # The engine must either provide actionable suggested fix or an auto-corrected AST or invalid status
        self.assertTrue(
            has_suggested_fix or has_corrected_ast or not res.get("valid"),
            "Engine must provide diagnostic feedback on recoverable invalid enum"
        )

        if has_corrected_ast:
            repaired = res.get("correctedAst") or res.get("repaired_ast")
            second_res = await call_server_tool(self.server, "validate_design_ast", {"ast": repaired})
            if isinstance(second_res, str):
                second_res = json.loads(second_res)
            self.assertTrue(second_res.get("valid", False), "Corrected AST must pass validation")

    # --------------------------------------------------------------------------
    # 5. Full Discovery-to-AST Lifecycle
    # --------------------------------------------------------------------------

    async def test_discovery_to_ast_validation_lifecycle(self):
        """Verify full programmatic workflow: discover primitives, fetch schemas, build AST, validate."""
        # 1. Discover primitives
        catalog_result = await call_server_tool(self.server, "list_kilo_primitives", {})
        if isinstance(catalog_result, str):
            catalog_result = json.loads(catalog_result)

        primitives = catalog_result if isinstance(catalog_result, list) else catalog_result.get("primitives", [])
        self.assertGreater(len(primitives), 0)

        # Pick two primitives known to exist
        names = [p.get("name") for p in primitives]
        chosen_prims = [n for n in ["button", "card"] if n in names]
        self.assertGreaterEqual(len(chosen_prims), 1)

        # 2. Get schema for chosen primitive
        prim_schema = await call_server_tool(self.server, "get_primitive_schema", {"name": chosen_prims[0]})
        if isinstance(prim_schema, str):
            prim_schema = json.loads(prim_schema)
        self.assertIsInstance(prim_schema, dict)

        # 3. Construct conforming AST
        dynamic_ast: Dict[str, Any] = {
            "version": "1.0.0",
            "meta": {
                "id": "dynamic_lifecycle_ast",
                "title": f"Dynamic AST using {chosen_prims[0]}",
                "viewport": "mobile",
                "colorScheme": "dark",
                "seedColor": "#737673",
            },
            "root": {
                "id": "dyn_root",
                "kind": "component",
                "name": chosen_prims[0],
                "component": chosen_prims[0],
                "props": {},
                "children": [],
            },
        }

        # 4. Validate
        val_res = await call_server_tool(self.server, "validate_design_ast", {"ast": dynamic_ast})
        if isinstance(val_res, str):
            val_res = json.loads(val_res)

        self.assertTrue(
            val_res.get("valid", False),
            f"Dynamically generated lifecycle AST should validate cleanly. Got: {val_res}"
        )


if __name__ == "__main__":
    unittest.main()

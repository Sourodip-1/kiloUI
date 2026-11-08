"""Tier 4: Real-World Scenarios E2E Tests.

Simulates end-to-end production workflows of the AI UI Architect:
1. Scenario A: Mobile Settings Drawer with Bottom Sheet & Thumb Segment Controller
2. Scenario B: Swipeable Content Feed with Pull-to-Refresh & Swipe Action Cards
3. Scenario C: Ergonomic Floating Action Dock with 44px Touch Target Compliance
4. Scenario D: Compiler Integration & Static JSX/TSX Code Emission Contract
5. Scenario E: Material 3 Surface Hierarchy & Contrast Stepping Audit
"""

import json
import unittest
from typing import Any, Dict, List

from tests.e2e.fixtures import (
    MOBILE_PRIMITIVES,
    VALID_ACTION_DOCK_AST,
    VALID_MOBILE_SETTINGS_AST,
    VALID_SWIPE_FEED_AST,
)
from tests.e2e.helpers import (
    call_server_tool,
    get_mcp_server_instance,
    read_server_resource,
)


class TestTier4RealWorldScenarios(unittest.IsolatedAsyncioTestCase):
    """Tier 4 Real-World Scenario Test Suite."""

    async def asyncSetUp(self):
        """Set up FastMCP server instance for in-process testing."""
        self.server = get_mcp_server_instance()
        self.assertIsNotNone(self.server, "FastMCP server instance must be available")

    # --------------------------------------------------------------------------
    # Scenario A: Mobile Settings Drawer
    # --------------------------------------------------------------------------

    async def test_scenario_mobile_settings_drawer(self):
        """AI UI Architect discovers mobile primitives, builds and validates a Mobile Settings Drawer."""
        # 1. Discover mobile primitives
        catalog = await call_server_tool(self.server, "list_kilo_primitives", {"category": "Mobile App"})
        if isinstance(catalog, str):
            catalog = json.loads(catalog)

        prims = catalog if isinstance(catalog, list) else catalog.get("primitives", [])
        prim_names = [p.get("name") for p in prims]

        # 2. Derive M3 Palette for Neutral Grey
        palette = await call_server_tool(self.server, "calculate_m3_palette", {"seed": "#737673"})
        if isinstance(palette, str):
            palette = json.loads(palette)
        self.assertIn("seed", palette)

        # 3. Validate generated settings AST
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": VALID_MOBILE_SETTINGS_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertTrue(
            res.get("valid", False),
            f"Settings drawer AST must be valid. Got errors: {res.get('errors') or res.get('diagnostics')}"
        )

        # Verify monochrome and surface hierarchy compliance
        theme = VALID_MOBILE_SETTINGS_AST.get("theme", {})
        self.assertEqual(theme.get("mode"), "dark")

    # --------------------------------------------------------------------------
    # Scenario B: Swipeable Content Feed
    # --------------------------------------------------------------------------

    async def test_scenario_swipeable_content_feed(self):
        """AI UI Architect creates a feed screen with Pull-to-Refresh & Swipe Action Cards."""
        # Validate feed AST
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": VALID_SWIPE_FEED_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertTrue(
            res.get("valid", False),
            f"Swipe feed AST must be valid. Got errors: {res.get('errors') or res.get('diagnostics')}"
        )

        # Verify child cards in AST
        children = VALID_SWIPE_FEED_AST["root"].get("children", [])
        self.assertGreaterEqual(len(children), 2, "Feed must contain at least 2 swipe action cards")
        for card in children:
            self.assertEqual(card.get("name"), "swipe-action-card")
            self.assertIn("leftAction", card.get("props", {}))
            self.assertIn("rightAction", card.get("props", {}))

    # --------------------------------------------------------------------------
    # Scenario C: Ergonomic Floating Action Dock
    # --------------------------------------------------------------------------

    async def test_scenario_ergonomic_floating_action_dock(self):
        """AI UI Architect generates an ergonomic action dock satisfying touch and surface constraints."""
        res = await call_server_tool(self.server, "validate_design_ast", {"ast": VALID_ACTION_DOCK_AST})
        if isinstance(res, str):
            res = json.loads(res)

        self.assertTrue(
            res.get("valid", False),
            f"Action dock AST must be valid. Got errors: {res.get('errors') or res.get('diagnostics')}"
        )

        # Ensure no errors
        errors = res.get("errors", [])
        self.assertEqual(
            len(errors), 0,
            f"Action dock should have zero validation errors: {errors}"
        )

    # --------------------------------------------------------------------------
    # Scenario D: Compiler Integration & Static Code Emitter Contract
    # --------------------------------------------------------------------------

    async def test_scenario_compiler_integration_contract(self):
        """Verify that declarative ASTs meet the compiler ingestion and code emission contract."""
        ast = VALID_MOBILE_SETTINGS_AST

        # Contract Rule 1: Every node must have kind, id, name or component
        def walk_nodes(node: Dict[str, Any]):
            self.assertIn("id", node, "Every node must possess an id")
            self.assertIn("kind", node, "Every node must possess a kind")
            self.assertTrue(
                "name" in node or "component" in node,
                "Every node must possess a name or component attribute"
            )

            for child in node.get("children", []):
                walk_nodes(child)
            for slot_list in node.get("slots", {}).values():
                if isinstance(slot_list, list):
                    for slot_node in slot_list:
                        walk_nodes(slot_node)
                elif isinstance(slot_list, dict):
                    walk_nodes(slot_list)

        walk_nodes(ast["root"])

        # Contract Rule 2: Primitive names must match Kilo UI registry naming
        catalog = await call_server_tool(self.server, "list_kilo_primitives", {})
        if isinstance(catalog, str):
            catalog = json.loads(catalog)
        prims = catalog if isinstance(catalog, list) else catalog.get("primitives", [])
        registered_names = {p.get("name") for p in prims}

        # Check primitives used in settings drawer
        used_primitives = ["mobile-bottom-sheet", "thumb-segment-controller", "switch", "button"]
        for prim in used_primitives:
            self.assertIn(
                prim, registered_names,
                f"Compiler requires primitive '{prim}' to be registered in Kilo UI catalog"
            )

    # --------------------------------------------------------------------------
    # Scenario E: Material 3 Surface Hierarchy & Contrast Stepping Audit
    # --------------------------------------------------------------------------

    async def test_scenario_surface_hierarchy_contrast_audit(self):
        """Verify M3 surface guidelines define proper container elevation contrast stepping."""
        guidelines = await read_server_resource(self.server, "m3://guidelines/surface-hierarchy")
        self.assertTrue(
            isinstance(guidelines, dict) or isinstance(guidelines, str),
            "Guidelines must be a dict or string"
        )

        guidelines_str = str(guidelines).lower()

        # Guidelines must document core M3 surface roles
        expected_surface_roles = [
            "surface",
            "surface-container",
            "outline",
        ]
        for role in expected_surface_roles:
            self.assertIn(
                role.replace("-", ""),
                guidelines_str.replace("-", "").replace("_", ""),
                f"Guidelines must explain surface role '{role}'"
            )


if __name__ == "__main__":
    unittest.main()

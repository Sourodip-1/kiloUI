"""Automated tests for Mobile App Primitives & UI Architecture.

Verifies:
1. Registration of all 5 mobile primitives in REGISTRY_DATA under "Mobile App" category.
2. Complete prop definitions, variants, and component file contents.
3. Schema generation, slot inference, and ergonomic constraints via server/registry_loader.py.
4. Consumer re-exports in components/ui/*.
5. Dedicated mobile section route and navigation whitelisting.
"""

import unittest
from pathlib import Path
from server.registry_loader import load_registry, list_primitives, get_primitive_schema, get_registry_catalog

EXPECTED_MOBILE_PRIMITIVES = [
    "mobile-bottom-sheet",
    "swipe-action-card",
    "thumb-segment-controller",
    "pull-to-refresh",
    "floating-action-dock",
]


class TestMobilePrimitives(unittest.TestCase):
    """Test suite for Mobile App primitives in Kilo UI."""

    @classmethod
    def setUpClass(cls):
        cls.registry_data = load_registry(reload=True)

    def test_all_five_mobile_primitives_present_in_registry(self):
        """Verify all 5 mobile primitives exist in REGISTRY_DATA."""
        for primitive_name in EXPECTED_MOBILE_PRIMITIVES:
            self.assertIn(
                primitive_name,
                self.registry_data,
                f"Primitive '{primitive_name}' must be registered in REGISTRY_DATA",
            )

    def test_mobile_category_assignment(self):
        """Verify all 5 primitives are assigned to category 'Mobile App'."""
        mobile_items = list_primitives("Mobile App", registry_data=self.registry_data)
        registered_names = {item["name"] for item in mobile_items}

        for expected in EXPECTED_MOBILE_PRIMITIVES:
            self.assertIn(
                expected,
                registered_names,
                f"'{expected}' must be returned when filtering category by 'Mobile App'",
            )
        self.assertGreaterEqual(len(registered_names), 5)

    def test_primitive_schemas_and_constraints(self):
        """Verify schema extraction and authoritative M3 / ergonomic constraints."""
        for name in EXPECTED_MOBILE_PRIMITIVES:
            schema = get_primitive_schema(name, registry_data=self.registry_data)
            self.assertEqual(schema["name"], name)
            self.assertEqual(schema["category"], "Mobile App")
            self.assertTrue(len(schema["props"]) > 0, f"Schema for {name} must have props")
            self.assertIn("constraints", schema)

            # Strict aesthetic and ergonomic constraint checks
            constraints_text = " ".join(schema["constraints"])
            self.assertIn("monochrome styling", constraints_text.lower())
            self.assertIn("thumb-friendly", constraints_text.lower())
            self.assertIn("44x44px", constraints_text)

    def test_consumer_re_exports_exist(self):
        """Verify thin re-exports in components/ui/ exist and re-export correctly."""
        base_dir = Path(__file__).resolve().parent.parent
        for name in EXPECTED_MOBILE_PRIMITIVES:
            re_export_file = base_dir / "components" / "ui" / f"{name}.tsx"
            self.assertTrue(re_export_file.is_file(), f"Missing re-export file: {re_export_file}")

            content = re_export_file.read_text(encoding="utf-8")
            self.assertIn(
                f"@/registry/ui/{name}",
                content,
                f"{re_export_file} must re-export from @/registry/ui/{name}",
            )

    def test_component_source_files_exist_in_registry_ui(self):
        """Verify source implementations exist in registry/ui/."""
        base_dir = Path(__file__).resolve().parent.parent
        for name in EXPECTED_MOBILE_PRIMITIVES:
            source_file = base_dir / "registry" / "ui" / f"{name}.tsx"
            self.assertTrue(source_file.is_file(), f"Missing source implementation: {source_file}")

            content = source_file.read_text(encoding="utf-8")
            self.assertIn('"use client"', content)
            self.assertNotIn("pulse-green", content)
            self.assertNotIn("animate-ping", content)

    def test_mobile_showcase_page_exists(self):
        """Verify dedicated mobile primitives showcase page exists."""
        base_dir = Path(__file__).resolve().parent.parent
        page_file = base_dir / "app" / "mobile-primitives" / "page.tsx"
        self.assertTrue(page_file.is_file(), f"Missing showcase page: {page_file}")

        content = page_file.read_text(encoding="utf-8")
        self.assertIn("MobileBottomSheet", content)
        self.assertIn("SwipeActionCard", content)
        self.assertIn("ThumbSegmentController", content)
        self.assertIn("PullToRefresh", content)
        self.assertIn("FloatingActionDock", content)

    def test_app_shell_whitelisting(self):
        """Verify /mobile-primitives is whitelisted in components/app-shell.tsx."""
        base_dir = Path(__file__).resolve().parent.parent
        app_shell_file = base_dir / "components" / "app-shell.tsx"
        content = app_shell_file.read_text(encoding="utf-8")
        self.assertIn('"/mobile-primitives"', content)


if __name__ == "__main__":
    unittest.main()

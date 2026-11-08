"""Unit tests for server/registry_loader.py."""

from __future__ import annotations

import unittest
from server.registry_loader import (
    get_primitive_schema,
    get_registry_catalog,
    list_primitives,
    load_registry,
    normalize_primitive_name,
)


class TestRegistryLoader(unittest.TestCase):
    """Test suite for Kilo UI registry loader."""

    def test_load_registry_returns_all_primitives(self):
        """Verify load_registry parses registry-data.ts and extracts all primitives."""
        data = load_registry()
        self.assertIsInstance(data, dict)
        self.assertGreaterEqual(len(data), 56)
        self.assertIn("button", data)
        self.assertIn("input", data)
        self.assertIn("card", data)

        # Spot-check structural integrity
        button = data["button"]
        self.assertEqual(button.get("name"), "button")
        self.assertEqual(button.get("category"), "Actions")
        self.assertIsInstance(button.get("variants"), list)
        self.assertIn("default", button["variants"])

    def test_normalize_primitive_name(self):
        """Test normalization across camelCase, PascalCase, snake_case, and whitespace."""
        self.assertEqual(normalize_primitive_name("button"), "button")
        self.assertEqual(normalize_primitive_name("Button"), "button")
        self.assertEqual(normalize_primitive_name("SearchBar"), "search-bar")
        self.assertEqual(normalize_primitive_name("search_bar"), "search-bar")
        self.assertEqual(normalize_primitive_name("  popover-dialog  "), "popover-dialog")
        self.assertEqual(normalize_primitive_name("popoverDialog"), "popover-dialog")
        self.assertEqual(normalize_primitive_name("laser_cursor"), "laser-cursor")
        self.assertEqual(normalize_primitive_name(""), "")

    def test_get_primitive_schema_button(self):
        """Verify authoritative schema generation for button primitive."""
        schema = get_primitive_schema("button")
        self.assertEqual(schema["name"], "button")
        self.assertEqual(schema["title"], "Button")
        self.assertEqual(schema["category"], "Actions")
        self.assertIn("default", schema["variants"])
        self.assertIn("secondary", schema["variants"])
        self.assertIn("accent", schema["variants"])

        # Check slots
        self.assertIn("leftIcon", schema["slots"])
        self.assertIn("rightIcon", schema["slots"])

        # Check allowedChildren
        self.assertEqual(schema["allowedChildren"], ["*"])

        # Check props
        prop_names = [p["name"] for p in schema["props"]]
        self.assertIn("variant", prop_names)
        self.assertIn("size", prop_names)
        self.assertIn("isLoading", prop_names)
        self.assertIn("disabled", prop_names)
        self.assertIn("children", prop_names)

        # Check supportedValues on union props
        variant_prop = next(p for p in schema["props"] if p["name"] == "variant")
        self.assertIn("default", variant_prop["supportedValues"])
        self.assertIn("destructive", variant_prop["supportedValues"])

        # Check constraints
        self.assertTrue(any("monochrome" in c.lower() for c in schema["constraints"]))

    def test_get_primitive_schema_inferred_props_fallback(self):
        """Verify components lacking explicit props in JSON get props inferred from TypeScript interface."""
        schema = get_primitive_schema("popover-dialog")
        self.assertEqual(schema["name"], "popover-dialog")
        self.assertEqual(schema["category"], "Overlays")

        prop_names = [p["name"] for p in schema["props"]]
        self.assertIn("open", prop_names)
        self.assertIn("variant", prop_names)
        self.assertIn("side", prop_names)
        self.assertIn("trigger", prop_names)

        # Test skeleton props
        skeleton_schema = get_primitive_schema("skeleton")
        sk_prop_names = [p["name"] for p in skeleton_schema["props"]]
        self.assertIn("variant", sk_prop_names)
        self.assertIn("shape", sk_prop_names)

    def test_get_primitive_schema_case_and_format_tolerance(self):
        """Verify schema lookup handles case, snake_case, and camelCase transparently."""
        schema1 = get_primitive_schema("SearchBar")
        schema2 = get_primitive_schema("search_bar")
        schema3 = get_primitive_schema("search-bar")
        self.assertEqual(schema1["name"], "search-bar")
        self.assertEqual(schema2["name"], "search-bar")
        self.assertEqual(schema3["name"], "search-bar")

    def test_get_primitive_schema_invalid_name_raises_value_error(self):
        """Verify unknown primitive name raises ValueError with helpful suggestions."""
        with self.assertRaises(ValueError) as ctx:
            get_primitive_schema("serch-bar")
        self.assertIn("search-bar", str(ctx.exception))

        with self.assertRaises(ValueError):
            get_primitive_schema("non-existent-xyz-primitive")

    def test_list_primitives_all(self):
        """Verify list_primitives returns all primitives sorted deterministically."""
        primitives = list_primitives()
        self.assertIsInstance(primitives, list)
        self.assertGreaterEqual(len(primitives), 56)

        names = [p["name"] for p in primitives]
        self.assertEqual(names, sorted(names))
        for p in primitives:
            self.assertIn("name", p)
            self.assertIn("title", p)
            self.assertIn("category", p)
            self.assertIn("description", p)

    def test_list_primitives_filtered_by_category(self):
        """Verify list_primitives filters accurately, case-insensitively with whitespace tolerance."""
        actions = list_primitives(category="Actions")
        self.assertGreater(len(actions), 0)
        for p in actions:
            self.assertEqual(p["category"], "Actions")

        # Case-insensitive
        actions_lower = list_primitives(category="actions")
        self.assertEqual(len(actions), len(actions_lower))

        # Whitespace trimmed
        actions_padded = list_primitives(category="  Actions  ")
        self.assertEqual(len(actions), len(actions_padded))

    def test_list_primitives_unknown_category_returns_empty(self):
        """Verify filtering by non-existent category returns an empty list."""
        res = list_primitives(category="NonExistentCategoryXYZ")
        self.assertEqual(res, [])

    def test_get_registry_catalog(self):
        """Verify get_registry_catalog matches kilo://registry/catalog interface contract."""
        catalog = get_registry_catalog()
        self.assertIn("total", catalog)
        self.assertIn("total_primitives", catalog)
        self.assertIn("categories", catalog)
        self.assertIn("primitives", catalog)
        self.assertGreaterEqual(catalog["total"], 56)
        self.assertIn("Actions", catalog["categories"])
        self.assertIn("Overlays", catalog["categories"])
        self.assertIn("Forms & Inputs", catalog["categories"])

    def test_authoritative_zero_drift_all_primitives(self):
        """Verify all registered primitives can be loaded and produce valid schemas without error."""
        registry = load_registry()
        for name in registry:
            schema = get_primitive_schema(name, registry_data=registry)
            self.assertEqual(schema["name"], name)
            self.assertTrue(len(schema["category"]) > 0)
            self.assertIsInstance(schema["props"], list)
            self.assertIsInstance(schema["slots"], list)
            self.assertIsInstance(schema["constraints"], list)


if __name__ == "__main__":
    unittest.main()

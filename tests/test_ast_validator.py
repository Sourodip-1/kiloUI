"""Automated unit test suite for Kilo UI + Material 3 Declarative Design AST Validator.

Tests:
  1. Valid AST structures (simple, complex, mobile suite primitives, serialized JSON).
  2. Malformed AST payloads (non-dict inputs, syntax errors, missing version/meta/root, invalid kinds).
  3. Unregistered primitives & fuzzy match suggestions (UNREGISTERED_PRIMITIVE).
  4. Prop types, missing required props, and variant enumeration (INVALID_PROP_TYPE, INVALID_PROP_VALUE).
  5. Slot rules and allowed children (SLOT_RULE_VIOLATION).
  6. Duplicate node ID detection (SCHEMA_VIOLATION).
  7. Strict aesthetic boundary enforcement:
     - Glowing circles & neon shadows (PROHIBITED_AESTHETIC_DECORATION)
     - Green pulsing dots (PROHIBITED_AESTHETIC_DECORATION)
     - Colorful rainbow gradients (PROHIBITED_AESTHETIC_DECORATION)
  8. Touch target ergonomics (44x44px minimum for mobile interactive nodes, TOUCH_TARGET_TOO_SMALL).
  9. Deterministic auto-repair engine (coercion, aesthetic stripping, ID deduplication, variant fallback, and re-validation).
"""

from __future__ import annotations

import json
import unittest
from typing import Any, Dict

from server.ast_validator import (
    DIAGNOSTIC_CODES,
    auto_repair_ast,
    sanitize_class_names,
    validate_design_ast,
)


class TestASTValidatorValid(unittest.TestCase):
    """Test valid Declarative Design AST structures."""

    def test_simple_valid_ast(self) -> None:
        simple_ast = {
            "version": "1.0.0",
            "meta": {
                "id": "screen-simple",
                "title": "Clean Monochrome Button",
                "viewport": "mobile",
                "colorScheme": "dark",
                "seedColor": "#737673",
            },
            "root": {
                "id": "root-box",
                "kind": "container",
                "component": "box",
                "props": {
                    "className": "p-4 bg-[var(--bg-main)] flex flex-col gap-2",
                },
                "children": [
                    {
                        "id": "btn-action",
                        "kind": "component",
                        "component": "button",
                        "props": {
                            "variant": "default",
                            "children": "Deploy",
                        },
                    }
                ],
            },
        }

        res = validate_design_ast(simple_ast)
        self.assertTrue(res["valid"])
        self.assertEqual(res["errors"], [])
        self.assertEqual(res["summary"]["total_nodes"], 2)
        self.assertIn("button", res["summary"]["primitives_used"])

    def test_complex_valid_ast_with_slots_and_tokens(self) -> None:
        complex_ast = {
            "version": "1.0.0",
            "meta": {
                "id": "screen-complex",
                "title": "Clean M3 Neutral Dashboard",
                "viewport": "desktop",
                "colorScheme": "dark",
                "seedColor": "#737673",
            },
            "theme": {
                "mode": "dark",
                "seedHex": "#737673",
                "tokens": {
                    "--surface-elevated": "#141515",
                },
            },
            "root": {
                "id": "root-container",
                "kind": "container",
                "component": "stack",
                "layout": {
                    "display": "flex",
                    "direction": "column",
                    "gap": "md",
                    "padding": 16,
                },
                "children": [
                    {
                        "id": "heading-title",
                        "kind": "text",
                        "name": "h1",
                        "text": "Project Metrics",
                        "props": {
                            "className": "text-lg font-medium text-[var(--text-primary)]",
                        },
                    },
                    {
                        "id": "card-display",
                        "kind": "component",
                        "component": "card",
                        "props": {
                            "variant": "default",
                            "bgToken": {"$token": "m3.color.surfaceContainer"},
                        },
                        "children": [
                            {
                                "id": "card-header-box",
                                "kind": "container",
                                "children": [
                                    {
                                        "id": "header-title",
                                        "kind": "text",
                                        "name": "p",
                                        "text": "Cluster Status",
                                    }
                                ],
                            },
                            {
                                "id": "btn-refresh",
                                "kind": "component",
                                "component": "button",
                                "props": {
                                    "variant": "secondary",
                                    "children": "Sync",
                                },
                                "slots": {
                                    "leftIcon": {
                                        "id": "btn-icon",
                                        "kind": "text",
                                        "name": "span",
                                        "text": "⚡",
                                    }
                                },
                            },
                        ],
                    },
                ],
            },
        }

        res = validate_design_ast(complex_ast)
        self.assertTrue(res["valid"])
        self.assertEqual(res["errors"], [])
        self.assertEqual(res["summary"]["total_nodes"], 7)
        self.assertIn("card", res["summary"]["primitives_used"])
        self.assertIn("button", res["summary"]["primitives_used"])

    def test_mobile_app_primitives_suite(self) -> None:
        """Verify all 5 mobile app primitives pass validation."""
        mobile_suite_ast = {
            "version": "1.0.0",
            "meta": {
                "id": "mobile-checkout",
                "title": "Mobile Portfolio Actions",
                "viewport": "mobile",
            },
            "root": {
                "id": "mobile-root",
                "kind": "container",
                "children": [
                    {
                        "id": "sheet-control",
                        "kind": "component",
                        "component": "mobile-bottom-sheet",
                        "props": {
                            "variant": "default",
                            "open": True,
                        },
                        "slots": {
                            "footer": {
                                "id": "sheet-title",
                                "kind": "text",
                                "name": "h3",
                                "text": "Transfer Funds",
                            }
                        },
                    },
                    {
                        "id": "swipe-card-1",
                        "kind": "component",
                        "component": "swipe-action-card",
                        "props": {
                            "threshold": 80,
                        },
                    },
                    {
                        "id": "segment-tabs",
                        "kind": "component",
                        "component": "thumb-segment-controller",
                        "props": {
                            "variant": "default",
                            "items": [{"label": "Day", "value": "day"}],
                        },
                    },
                    {
                        "id": "ptr-indicator",
                        "kind": "component",
                        "component": "pull-to-refresh",
                        "props": {
                            "threshold": 60,
                            "refreshing": False,
                        },
                    },
                    {
                        "id": "fab-dock",
                        "kind": "component",
                        "component": "floating-action-dock",
                        "props": {
                            "variant": "default",
                            "items": [{"icon": "Plus", "label": "Add"}],
                        },
                    },
                ],
            },
        }

        res = validate_design_ast(mobile_suite_ast)
        self.assertTrue(res["valid"])
        self.assertEqual(res["errors"], [])
        for prim in [
            "mobile-bottom-sheet",
            "swipe-action-card",
            "thumb-segment-controller",
            "pull-to-refresh",
            "floating-action-dock",
        ]:
            self.assertIn(prim, res["summary"]["primitives_used"])

    def test_json_string_input(self) -> None:
        ast_dict = {
            "version": "1.0.0",
            "meta": {"id": "str-test", "title": "JSON String Input"},
            "root": {
                "id": "r",
                "kind": "component",
                "component": "badge",
                "props": {"variant": "outline"},
            },
        }
        res = validate_design_ast(json.dumps(ast_dict))
        self.assertTrue(res["valid"])
        self.assertEqual(res["errors"], [])


class TestASTValidatorMalformed(unittest.TestCase):
    """Test rejection of malformed or schema-violating AST payloads."""

    def test_non_dict_and_non_json_input(self) -> None:
        res_int = validate_design_ast(42)  # type: ignore
        self.assertFalse(res_int["valid"])
        self.assertEqual(res_int["errors"][0]["code"], DIAGNOSTIC_CODES["SCHEMA_VIOLATION"])

        res_none = validate_design_ast(None)  # type: ignore
        self.assertFalse(res_none["valid"])

    def test_malformed_json_string(self) -> None:
        res = validate_design_ast("{not valid json syntax!")
        self.assertFalse(res["valid"])
        self.assertIn("Malformed AST JSON", res["errors"][0]["issue"])

    def test_missing_version_and_root(self) -> None:
        res = validate_design_ast({})
        self.assertFalse(res["valid"])
        paths = [e["path"] for e in res["errors"]]
        self.assertIn("version", paths)
        self.assertIn("meta", paths)
        self.assertIn("root", paths)

    def test_unsupported_version(self) -> None:
        ast = {
            "version": "2.0.0",
            "meta": {"id": "m1", "title": "Unsupported"},
            "root": {"id": "r", "kind": "container"},
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        self.assertTrue(any("Unsupported AST version" in e["issue"] for e in res["errors"]))

    def test_missing_meta_id(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"title": "Missing ID"},
            "root": {"id": "r", "kind": "container"},
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        self.assertTrue(any(e["path"] == "meta.id" for e in res["errors"]))

    def test_invalid_node_kind(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m2", "title": "Invalid Kind"},
            "root": {
                "id": "r",
                "kind": "unsupported_kind",  # Must be component | container | text
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        self.assertTrue(any(e["path"] == "root.kind" for e in res["errors"]))


class TestASTValidatorUnregisteredPrimitives(unittest.TestCase):
    """Test registry lookup and nearest match suggestions."""

    def test_unregistered_primitive_error(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m3", "title": "Unregistered Primitive"},
            "root": {
                "id": "r",
                "kind": "component",
                "component": "quantum-laser-cannon",
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(e for e in res["errors"] if e["path"] == "root.component")
        self.assertEqual(err["code"], DIAGNOSTIC_CODES["UNREGISTERED_PRIMITIVE"])
        self.assertIn("Unknown primitive 'quantum-laser-cannon'", err["issue"])

    def test_fuzzy_match_suggestion(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m4", "title": "Fuzzy Match"},
            "root": {
                "id": "r",
                "kind": "component",
                "component": "bottomsheet",
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(e for e in res["errors"] if e["path"] == "root.component")
        self.assertIn("Did you mean", err["suggestion"])
        self.assertIn("mobile-bottom-sheet", err["suggestion"])


class TestASTValidatorPropsAndEnums(unittest.TestCase):
    """Test prop type mismatches, missing required props, and variant enumeration."""

    def test_invalid_variant_enum(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m5", "title": "Invalid Variant"},
            "root": {
                "id": "btn",
                "kind": "component",
                "component": "button",
                "props": {"variant": "neon-rainbow-extreme"},
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(e for e in res["errors"] if e["path"] == "root.props.variant")
        self.assertEqual(err["code"], DIAGNOSTIC_CODES["INVALID_PROP_VALUE"])
        self.assertIn("Invalid variant 'neon-rainbow-extreme'", err["issue"])

    def test_prop_type_mismatch_boolean(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m6", "title": "Type Mismatch"},
            "root": {
                "id": "switch-1",
                "kind": "component",
                "component": "switch",
                "props": {"checked": "true"},  # Should be boolean True, not string "true"
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(e for e in res["errors"] if e["path"] == "root.props.checked")
        self.assertEqual(err["code"], DIAGNOSTIC_CODES["INVALID_PROP_TYPE"])


class TestASTValidatorSlotRules(unittest.TestCase):
    """Test slot declaration validation against primitive schema."""

    def test_unsupported_slot_on_primitive(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m7", "title": "Slot Rules"},
            "root": {
                "id": "btn-slot",
                "kind": "component",
                "component": "button",
                "slots": {
                    "unsupportedHeroBannerSlot": {
                        "id": "banner",
                        "kind": "container",
                    }
                },
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(e for e in res["errors"] if "unsupportedHeroBannerSlot" in e["path"])
        self.assertEqual(err["code"], DIAGNOSTIC_CODES["SLOT_RULE_VIOLATION"])


class TestASTValidatorDuplicateNodeIDs(unittest.TestCase):
    """Test detection of duplicate node IDs across the AST tree."""

    def test_duplicate_node_id_flagged(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "m8", "title": "Duplicate IDs"},
            "root": {
                "id": "duplicate-id",
                "kind": "container",
                "children": [
                    {
                        "id": "duplicate-id",  # Identical ID in tree
                        "kind": "component",
                        "component": "button",
                    }
                ],
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        dup_err = next(e for e in res["errors"] if "Duplicate node ID" in e["issue"])
        self.assertEqual(dup_err["code"], DIAGNOSTIC_CODES["SCHEMA_VIOLATION"])


class TestASTValidatorAestheticConstraints(unittest.TestCase):
    """Verify strict prohibition of glowing circles, green pulsing dots, and colorful gradients."""

    def test_glowing_circle_rejected(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "aesth-1", "title": "Glowing Circle Anti-Pattern"},
            "root": {
                "id": "root-box",
                "kind": "container",
                "props": {
                    "className": "w-10 h-10 rounded-full glowing-circle shadow-[0_0_20px_#00ff00]",
                },
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(
            e for e in res["errors"] if e["code"] == DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"]
        )
        self.assertIn("glowing circle", err["issue"].lower())

    def test_green_pulsing_dot_rejected(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "aesth-2", "title": "Pulsing Green Dot Anti-Pattern"},
            "root": {
                "id": "indicator",
                "kind": "container",
                "props": {
                    "className": "w-2 h-2 rounded-full bg-green-500 animate-pulse",
                },
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(
            e for e in res["errors"] if e["code"] == DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"]
        )
        self.assertIn("pulsing green dot", err["issue"].lower())

    def test_rainbow_gradient_rejected(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {"id": "aesth-3", "title": "Colorful Gradient Anti-Pattern"},
            "root": {
                "id": "hero-bg",
                "kind": "container",
                "props": {
                    "className": "p-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
                },
            },
        }
        res = validate_design_ast(ast)
        self.assertFalse(res["valid"])
        err = next(
            e for e in res["errors"] if e["code"] == DIAGNOSTIC_CODES["PROHIBITED_AESTHETIC_DECORATION"]
        )
        self.assertIn("colorful gradient", err["issue"].lower())

    def test_clean_monochrome_styling_accepted(self) -> None:
        """Clean M3 neutral surfaces and precision borders must pass cleanly."""
        ast = {
            "version": "1.0.0",
            "meta": {"id": "aesth-4", "title": "Clean Monochrome Spec"},
            "root": {
                "id": "panel",
                "kind": "container",
                "props": {
                    "className": "p-4 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] rounded-md",
                },
            },
        }
        res = validate_design_ast(ast)
        self.assertTrue(res["valid"])
        self.assertEqual(res["errors"], [])


class TestASTValidatorTouchTargetErgonomics(unittest.TestCase):
    """Test mobile touch target ergonomics checking (44x44px minimum)."""

    def test_mobile_sub_44px_touch_target_warning(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {
                "id": "erg-1",
                "title": "Ergonomics Test",
                "viewport": "mobile",
            },
            "root": {
                "id": "root",
                "kind": "container",
                "children": [
                    {
                        "id": "tiny-btn",
                        "kind": "component",
                        "component": "button",
                        "layout": {
                            "width": 28,
                            "height": 28,
                        },
                    }
                ],
            },
        }
        res = validate_design_ast(ast)
        warning = next(
            (w for w in res["warnings"] if w["code"] == DIAGNOSTIC_CODES["TOUCH_TARGET_TOO_SMALL"]),
            None,
        )
        self.assertIsNotNone(warning)
        self.assertIn("44x44px", warning["issue"])

    def test_desktop_viewport_does_not_flag_small_touch_target(self) -> None:
        ast = {
            "version": "1.0.0",
            "meta": {
                "id": "erg-2",
                "title": "Desktop Ergonomics",
                "viewport": "desktop",
            },
            "root": {
                "id": "root",
                "kind": "component",
                "component": "button",
                "layout": {
                    "width": 28,
                    "height": 28,
                },
            },
        }
        res = validate_design_ast(ast)
        touch_warnings = [w for w in res["warnings"] if w["code"] == DIAGNOSTIC_CODES["TOUCH_TARGET_TOO_SMALL"]]
        self.assertEqual(touch_warnings, [])


class TestASTValidatorAutoRepair(unittest.TestCase):
    """Test deterministic auto-correction of recoverable defects."""

    def test_auto_repair_prohibited_aesthetics_and_type_coercion(self) -> None:
        defective_ast = {
            "version": "1.0.0",
            "meta": {
                "id": "repair-screen",
                "title": "Defective AST to Auto-Repair",
                "viewport": "mobile",
            },
            "root": {
                "id": "root",
                "kind": "container",
                "props": {
                    "className": "p-4 glowing-circle bg-green-500 animate-pulse",
                },
                "children": [
                    {
                        "id": "switch-1",
                        "kind": "component",
                        "component": "switch",
                        "props": {
                            "checked": "true",  # String to coerce
                        },
                        "layout": {
                            "minWidth": 20,
                            "minHeight": 20,
                        },
                    },
                    {
                        "id": "root",  # Duplicate ID with root!
                        "kind": "component",
                        "component": "bottomsheet",  # Alias to normalize
                        "props": {
                            "variant": "unsupported-wild-variant",  # Invalid variant
                        },
                    },
                ],
            },
        }

        res = validate_design_ast(defective_ast, auto_repair=True)
        self.assertFalse(res["valid"])  # Original had errors
        repaired = res["repaired_ast"]
        self.assertIsNotNone(repaired)

        # 1. Prohibited aesthetics stripped
        root_props = repaired["root"]["props"]
        self.assertNotIn("glowing-circle", root_props["className"])
        self.assertNotIn("bg-green-500 animate-pulse", root_props["className"])
        self.assertIn("p-4", root_props["className"])

        # 2. Type coerced
        switch_node = repaired["root"]["children"][0]
        self.assertIs(switch_node["props"]["checked"], True)

        # 3. Mobile touch target expanded
        self.assertGreaterEqual(switch_node["layout"]["minWidth"], 44)
        self.assertGreaterEqual(switch_node["layout"]["minHeight"], 44)

        # 4. Duplicate ID resolved
        sheet_node = repaired["root"]["children"][1]
        self.assertNotEqual(sheet_node["id"], "root")
        self.assertTrue(sheet_node["id"].startswith("root_dup"))

        # 5. Alias normalized
        self.assertEqual(sheet_node["component"], "mobile-bottom-sheet")

        # 6. Variant reset to supported default
        self.assertEqual(sheet_node["props"]["variant"], "default")

        # 7. Re-validation of repaired AST passes or has zero errors!
        re_val = validate_design_ast(repaired)
        self.assertTrue(re_val["valid"])
        self.assertEqual(re_val["errors"], [])

    def test_sanitize_class_names_utility(self) -> None:
        raw = "p-4 glowing-circle bg-green-500 animate-pulse shadow-[0_0_15px_#ff00ff] border border-[var(--border)]"
        cleaned = sanitize_class_names(raw)
        self.assertNotIn("glowing-circle", cleaned)
        self.assertNotIn("animate-pulse", cleaned)
        self.assertNotIn("bg-green-500", cleaned)
        self.assertNotIn("shadow-[0_0_", cleaned)
        self.assertIn("p-4", cleaned)
        self.assertIn("border", cleaned)
        self.assertIn("border-[var(--border)]", cleaned)


if __name__ == "__main__":
    unittest.main()

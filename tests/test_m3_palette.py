"""Unit tests for server/m3_palette.py and server/guidelines.py."""

from __future__ import annotations

import re
import unittest
from server.guidelines import get_surface_guidelines, get_surface_guidelines_markdown
from server.m3_palette import calculate_m3_palette, normalize_hex_color


class TestM3Palette(unittest.TestCase):
    """Test suite for Material 3 color token generation."""

    def test_calculate_m3_palette_standard_seed(self):
        """Verify M3 palette generation for standard Google purple seed #6750A4."""
        res = calculate_m3_palette("#6750A4")

        self.assertEqual(res["seed"], "#6750a4")
        self.assertIn("hct", res)
        self.assertAlmostEqual(res["hct"]["hue"], 298.98, delta=1.0)
        self.assertAlmostEqual(res["hct"]["chroma"], 47.86, delta=1.0)
        self.assertAlmostEqual(res["hct"]["tone"], 40.08, delta=1.0)

        # Palettes verification
        palettes = res["palettes"]
        expected_palettes = ["primary", "secondary", "tertiary", "neutral", "neutralVariant", "error"]
        for p in expected_palettes:
            self.assertIn(p, palettes)
            # All standard tones present
            for tone in [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]:
                self.assertIn(str(tone), palettes[p])
                hex_val = palettes[p][str(tone)]
                self.assertTrue(re.fullmatch(r"#[0-9a-f]{6}", hex_val), f"Invalid hex: {hex_val}")

        # Primary tone 40 should match seed color
        self.assertEqual(palettes["primary"]["40"], "#6750a4")

    def test_surface_container_elevations(self):
        """Verify exact Material 3 surface container elevation tones for light and dark schemes."""
        res = calculate_m3_palette("#6750A4")
        light = res["schemes"]["light"]
        dark = res["schemes"]["dark"]

        # Light mode neutral tones: 100, 96, 94, 92, 90
        self.assertEqual(light["surfaceContainerLowest"], "#ffffff")
        self.assertEqual(light["surfaceContainerLow"], "#f7f2f7")
        self.assertEqual(light["surfaceContainer"], "#f2ecf1")
        self.assertEqual(light["surfaceContainerHigh"], "#ece7eb")
        self.assertEqual(light["surfaceContainerHighest"], "#e6e1e6")

        # Dark mode neutral tones: 4, 10, 12, 17, 22
        self.assertEqual(dark["surfaceContainerLowest"], "#0f0e11")
        self.assertEqual(dark["surfaceContainerLow"], "#1c1b1e")
        self.assertEqual(dark["surfaceContainer"], "#201f22")
        self.assertEqual(dark["surfaceContainerHigh"], "#2b292d")
        self.assertEqual(dark["surfaceContainerHighest"], "#363438")

    def test_hex_variations_and_normalization(self):
        """Verify support for raw 6-digit hex, uppercase, 3-digit shorthand, and URL encoding."""
        cases = ["#6750A4", "6750a4", "6750A4", "%236750A4"]
        baseline = calculate_m3_palette("#6750A4")

        for c in cases:
            norm = normalize_hex_color(c)
            self.assertEqual(norm, "#6750a4")
            result = calculate_m3_palette(c)
            self.assertEqual(result["seed"], baseline["seed"])
            self.assertEqual(result["palettes"]["primary"]["40"], baseline["palettes"]["primary"]["40"])

        # 3-digit shorthand expansion: #f0c -> #ff00cc
        self.assertEqual(normalize_hex_color("#f0c"), "#ff00cc")
        self.assertEqual(normalize_hex_color("f0c"), "#ff00cc")
        self.assertEqual(normalize_hex_color("%23f0c"), "#ff00cc")

    def test_invalid_hex_raises_value_error(self):
        """Verify invalid hex colors raise informative ValueError."""
        invalid_seeds = [
            "not-a-color",
            "#12",
            "#12345",
            "#1234567",
            "#gggggg",
            "",
            "   ",
        ]
        for bad in invalid_seeds:
            with self.assertRaises(ValueError):
                normalize_hex_color(bad)
            with self.assertRaises(ValueError):
                calculate_m3_palette(bad)

    def test_css_variables_format(self):
        """Verify --md-sys-color-* CSS custom properties generation."""
        res = calculate_m3_palette("#6750A4")
        css = res["cssVariables"]

        self.assertIn("light", css)
        self.assertIn("dark", css)
        self.assertIn("rootCss", css)

        # Check essential semantic variables in light and dark
        for theme in ["light", "dark"]:
            tokens = css[theme]
            self.assertIn("--md-sys-color-primary", tokens)
            self.assertIn("--md-sys-color-on-primary", tokens)
            self.assertIn("--md-sys-color-surface", tokens)
            self.assertIn("--md-sys-color-on-surface", tokens)
            self.assertIn("--md-sys-color-surface-container", tokens)
            self.assertIn("--md-sys-color-surface-container-low", tokens)
            self.assertIn("--md-sys-color-surface-container-high", tokens)
            self.assertIn("--md-sys-color-outline", tokens)
            self.assertIn("--md-sys-color-outline-variant", tokens)

        # Check rootCss formatting
        root_css = css["rootCss"]
        self.assertIn(":root {", root_css)
        self.assertIn(".dark {", root_css)
        self.assertIn("--md-sys-color-primary: #6750a4;", root_css)

    def test_output_formats(self):
        """Verify formatting options: all, json, css, tokens."""
        # CSS format
        css_res = calculate_m3_palette("#6750A4", format="css")
        self.assertIn("cssVariables", css_res)
        self.assertIn("rootCss", css_res)
        self.assertNotIn("palettes", css_res)

        # Tokens format
        tokens_res = calculate_m3_palette("#6750A4", format="tokens")
        self.assertIn("light", tokens_res)
        self.assertIn("dark", tokens_res)
        self.assertIn("palettes", tokens_res)
        self.assertNotIn("rootCss", tokens_res)

        # All / JSON format
        all_res = calculate_m3_palette("#6750A4", format="all")
        self.assertIn("palettes", all_res)
        self.assertIn("schemes", all_res)
        self.assertIn("cssVariables", all_res)

    def test_pure_python_fallback(self):
        """Verify fallback color generator operates reliably with identical schema."""
        fb = calculate_m3_palette("#6750A4", use_fallback=True)

        self.assertEqual(fb["seed"], "#6750a4")
        self.assertIn("hct", fb)
        self.assertIn("palettes", fb)
        self.assertIn("schemes", fb)
        self.assertIn("cssVariables", fb)

        # Check tones and container roles
        light = fb["schemes"]["light"]
        self.assertIn("surfaceContainer", light)
        self.assertIn("surfaceContainerLow", light)
        self.assertIn("surfaceContainerHigh", light)

        # Check CSS variables in fallback
        self.assertIn("--md-sys-color-primary", fb["cssVariables"]["light"])
        self.assertIn(":root {", fb["cssVariables"]["rootCss"])

    def test_guidelines_surface_hierarchy(self):
        """Verify surface hierarchy guidelines and Kilo UI token mappings."""
        guidelines = get_surface_guidelines()

        self.assertEqual(guidelines["version"], "3.0")
        surfaces = guidelines["surfaces"]
        self.assertIn("level_0", surfaces)
        self.assertIn("level_1", surfaces)
        self.assertIn("level_2", surfaces)
        self.assertIn("level_3", surfaces)
        self.assertIn("level_4", surfaces)

        # Check mapping to Kilo UI tokens
        self.assertEqual(surfaces["level_0"]["kilo_token"], "--bg-main")
        self.assertEqual(surfaces["level_1"]["kilo_token"], "--bg-sidebar")
        self.assertEqual(surfaces["level_2"]["kilo_token"], "--surface-elevated")
        self.assertEqual(surfaces["level_3"]["kilo_token"], "--surface-secondary")
        self.assertEqual(surfaces["level_4"]["kilo_token"], "--surface-tertiary")

        # Check elevation mappings table
        em = guidelines["elevation_mappings"]
        self.assertIn("--bg-main", em)
        self.assertIn("--surface-elevated", em)
        self.assertIn("--border", em)
        self.assertIn("--text-primary", em)

        # Check aesthetic rules
        rules = guidelines["aesthetic_constraints"]
        self.assertTrue(rules["clean_monochrome_mandate"])
        self.assertTrue(any("glowing" in p.lower() for p in rules["prohibited_patterns"]))
        self.assertTrue(any("pulsing" in p.lower() for p in rules["prohibited_patterns"]))

        # Check markdown generation
        md = get_surface_guidelines_markdown()
        self.assertIn("# Material 3 Surface Hierarchy", md)
        self.assertIn("--bg-main", md)
        self.assertIn("--surface-elevated", md)
        self.assertIn("NO Glowing Circles", md)
        self.assertIn("NO Pulsing Green Dots", md)


if __name__ == "__main__":
    unittest.main()

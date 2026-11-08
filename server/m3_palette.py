"""Material 3 Design Token Generator for Kilo UI.

Generates complete Material 3 tonal palettes (0-100), Light and Dark semantic
color roles, surface container elevations, and --md-sys-color-* CSS variables.

Uses Google Material Color Utilities (materialyoucolor) with direct imports
from CorePalette, Scheme, Hct, and color_utils, bypassing any broken theme_utils.
Includes a fully self-contained pure-Python fallback for maximum resilience.
"""

from __future__ import annotations

import colorsys
import re
from typing import Any, Dict, List, Tuple

# Try importing official materialyoucolor modules directly (avoiding theme_utils)
_HAS_MATERIALYOUCOLOR = False
try:
    from materialyoucolor.palettes.core_palette import CorePalette
    from materialyoucolor.scheme.scheme import Scheme
    from materialyoucolor.hct.hct import Hct
    from materialyoucolor.utils.color_utils import argb_from_rgb, hex_from_argb
    _HAS_MATERIALYOUCOLOR = True
except ImportError:
    _HAS_MATERIALYOUCOLOR = False

STANDARD_TONES: List[int] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]


def normalize_hex_color(seed: str) -> str:
    """Normalize and validate a hex color string to #rrggbb format.

    Supports:
        - "#6750A4", "6750A4", "#6750a4" (6-digit)
        - "#675", "675" (3-digit shorthand)
        - "%236750A4" (URL-encoded)

    Raises:
        ValueError: If the hex format is invalid.
    """
    clean = seed.strip()
    if clean.startswith("%23") or clean.startswith("%20"):
        clean = clean[3:].strip()
    if clean.startswith("#"):
        clean = clean[1:].strip()

    if len(clean) == 3:
        clean = "".join(c * 2 for c in clean)

    if len(clean) != 6 or not re.fullmatch(r"[0-9a-fA-F]{6}", clean):
        raise ValueError(
            f"Invalid seed hex color '{seed}'. Expected 3 or 6 hex digits."
        )

    return f"#{clean.lower()}"


def _argb_to_hex6(argb_int: int) -> str:
    """Format an ARGB integer into a clean 6-digit hex string (#rrggbb)."""
    r = (argb_int >> 16) & 0xFF
    g = (argb_int >> 8) & 0xFF
    b = argb_int & 0xFF
    return f"#{r:02x}{g:02x}{b:02x}"


def _camel_to_kebab(name: str) -> str:
    """Convert camelCase role name to kebab-case for CSS variables."""
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name)
    return s.lower()


def _rgb_to_hsl(r: int, g: int, b: int) -> Tuple[float, float, float]:
    """Convert 0-255 RGB to HSL (h in [0, 360], s in [0, 1], l in [0, 1])."""
    h, l, s = colorsys.rgb_to_hls(r / 255.0, g / 255.0, b / 255.0)
    return h * 360.0, s, l


def _hsl_to_hex6(h: float, s: float, l: float) -> str:
    """Convert HSL (h in [0, 360], s in [0, 1], l in [0, 1]) to #rrggbb."""
    h = h % 360.0
    s = max(0.0, min(1.0, s))
    l = max(0.0, min(1.0, l))
    r, g, b = colorsys.hls_to_rgb(h / 360.0, l, s)
    return f"#{int(round(r * 255)):02x}{int(round(g * 255)):02x}{int(round(b * 255)):02x}"


def _fallback_calculate_palette(seed_hex: str) -> Dict[str, Any]:
    """Pure-Python fallback color generator when materialyoucolor is unavailable."""
    norm_hex = normalize_hex_color(seed_hex)
    r = int(norm_hex[1:3], 16)
    g = int(norm_hex[3:5], 16)
    b = int(norm_hex[5:7], 16)
    hue, sat, lit = _rgb_to_hsl(r, g, b)

    # Perceived tone approximate
    tone = lit * 100.0

    def tone_to_hex(h: float, s: float, t: int) -> str:
        # Map tone 0-100 to lightness 0.0-1.0
        lightness = t / 100.0
        # Reduce saturation at very low and high tones
        s_adjusted = s * (1.0 - abs(t - 50) / 70.0) if t < 20 or t > 80 else s
        return _hsl_to_hex6(h, max(0.05, s_adjusted), lightness)

    # Secondary: same hue, lower saturation
    sec_hue, sec_sat = hue, sat * 0.4
    # Tertiary: analogous hue (+60 deg)
    tert_hue, tert_sat = (hue + 60.0) % 360.0, sat * 0.6
    # Neutral: very low saturation
    neu_hue, neu_sat = hue, 0.04
    # Neutral variant: slightly more saturation
    nv_hue, nv_sat = hue, 0.08
    # Error: red hue (15 deg), high saturation
    err_hue, err_sat = 15.0, 0.85

    palettes: Dict[str, Dict[str, str]] = {
        "primary": {str(t): tone_to_hex(hue, sat, t) for t in STANDARD_TONES},
        "secondary": {str(t): tone_to_hex(sec_hue, sec_sat, t) for t in STANDARD_TONES},
        "tertiary": {str(t): tone_to_hex(tert_hue, tert_sat, t) for t in STANDARD_TONES},
        "neutral": {str(t): tone_to_hex(neu_hue, neu_sat, t) for t in STANDARD_TONES},
        "neutralVariant": {str(t): tone_to_hex(nv_hue, nv_sat, t) for t in STANDARD_TONES},
        "error": {str(t): tone_to_hex(err_hue, err_sat, t) for t in STANDARD_TONES},
    }

    # Semantic light scheme
    light_scheme = {
        "primary": tone_to_hex(hue, sat, 40),
        "onPrimary": tone_to_hex(hue, sat, 100),
        "primaryContainer": tone_to_hex(hue, sat, 90),
        "onPrimaryContainer": tone_to_hex(hue, sat, 10),
        "inversePrimary": tone_to_hex(hue, sat, 80),
        "secondary": tone_to_hex(sec_hue, sec_sat, 40),
        "onSecondary": tone_to_hex(sec_hue, sec_sat, 100),
        "secondaryContainer": tone_to_hex(sec_hue, sec_sat, 90),
        "onSecondaryContainer": tone_to_hex(sec_hue, sec_sat, 10),
        "tertiary": tone_to_hex(tert_hue, tert_sat, 40),
        "onTertiary": tone_to_hex(tert_hue, tert_sat, 100),
        "tertiaryContainer": tone_to_hex(tert_hue, tert_sat, 90),
        "onTertiaryContainer": tone_to_hex(tert_hue, tert_sat, 10),
        "error": tone_to_hex(err_hue, err_sat, 40),
        "onError": tone_to_hex(err_hue, err_sat, 100),
        "errorContainer": tone_to_hex(err_hue, err_sat, 90),
        "onErrorContainer": tone_to_hex(err_hue, err_sat, 10),
        "surface": tone_to_hex(neu_hue, neu_sat, 98),
        "onSurface": tone_to_hex(neu_hue, neu_sat, 10),
        "surfaceVariant": tone_to_hex(nv_hue, nv_sat, 90),
        "onSurfaceVariant": tone_to_hex(nv_hue, nv_sat, 30),
        "inverseSurface": tone_to_hex(neu_hue, neu_sat, 20),
        "inverseOnSurface": tone_to_hex(neu_hue, neu_sat, 95),
        "surfaceContainerLowest": tone_to_hex(neu_hue, neu_sat, 100),
        "surfaceContainerLow": tone_to_hex(neu_hue, neu_sat, 96),
        "surfaceContainer": tone_to_hex(neu_hue, neu_sat, 94),
        "surfaceContainerHigh": tone_to_hex(neu_hue, neu_sat, 92),
        "surfaceContainerHighest": tone_to_hex(neu_hue, neu_sat, 90),
        "outline": tone_to_hex(nv_hue, nv_sat, 50),
        "outlineVariant": tone_to_hex(nv_hue, nv_sat, 80),
        "background": tone_to_hex(neu_hue, neu_sat, 98),
        "onBackground": tone_to_hex(neu_hue, neu_sat, 10),
        "scrim": "#000000",
        "shadow": "#000000",
    }

    # Semantic dark scheme
    dark_scheme = {
        "primary": tone_to_hex(hue, sat, 80),
        "onPrimary": tone_to_hex(hue, sat, 20),
        "primaryContainer": tone_to_hex(hue, sat, 30),
        "onPrimaryContainer": tone_to_hex(hue, sat, 90),
        "inversePrimary": tone_to_hex(hue, sat, 40),
        "secondary": tone_to_hex(sec_hue, sec_sat, 80),
        "onSecondary": tone_to_hex(sec_hue, sec_sat, 20),
        "secondaryContainer": tone_to_hex(sec_hue, sec_sat, 30),
        "onSecondaryContainer": tone_to_hex(sec_hue, sec_sat, 90),
        "tertiary": tone_to_hex(tert_hue, tert_sat, 80),
        "onTertiary": tone_to_hex(tert_hue, tert_sat, 20),
        "tertiaryContainer": tone_to_hex(tert_hue, tert_sat, 30),
        "onTertiaryContainer": tone_to_hex(tert_hue, tert_sat, 90),
        "error": tone_to_hex(err_hue, err_sat, 80),
        "onError": tone_to_hex(err_hue, err_sat, 20),
        "errorContainer": tone_to_hex(err_hue, err_sat, 30),
        "onErrorContainer": tone_to_hex(err_hue, err_sat, 90),
        "surface": tone_to_hex(neu_hue, neu_sat, 6),
        "onSurface": tone_to_hex(neu_hue, neu_sat, 90),
        "surfaceVariant": tone_to_hex(nv_hue, nv_sat, 30),
        "onSurfaceVariant": tone_to_hex(nv_hue, nv_sat, 80),
        "inverseSurface": tone_to_hex(neu_hue, neu_sat, 90),
        "inverseOnSurface": tone_to_hex(neu_hue, neu_sat, 20),
        "surfaceContainerLowest": tone_to_hex(neu_hue, neu_sat, 4),
        "surfaceContainerLow": tone_to_hex(neu_hue, neu_sat, 10),
        "surfaceContainer": tone_to_hex(neu_hue, neu_sat, 12),
        "surfaceContainerHigh": tone_to_hex(neu_hue, neu_sat, 17),
        "surfaceContainerHighest": tone_to_hex(neu_hue, neu_sat, 22),
        "outline": tone_to_hex(nv_hue, nv_sat, 60),
        "outlineVariant": tone_to_hex(nv_hue, nv_sat, 30),
        "background": tone_to_hex(neu_hue, neu_sat, 6),
        "onBackground": tone_to_hex(neu_hue, neu_sat, 90),
        "scrim": "#000000",
        "shadow": "#000000",
    }

    return _build_response(
        seed=norm_hex,
        hct={"hue": round(hue, 2), "chroma": round(sat * 100.0, 2), "tone": round(tone, 2)},
        palettes=palettes,
        light_scheme=light_scheme,
        dark_scheme=dark_scheme,
    )


def _build_response(
    seed: str,
    hct: Dict[str, float],
    palettes: Dict[str, Dict[str, str]],
    light_scheme: Dict[str, str],
    dark_scheme: Dict[str, str],
) -> Dict[str, Any]:
    """Construct standard dictionary response containing schemes, tokens, and CSS."""
    light_css: Dict[str, str] = {}
    dark_css: Dict[str, str] = {}

    for role, hex_val in light_scheme.items():
        css_var = f"--md-sys-color-{_camel_to_kebab(role)}"
        light_css[css_var] = hex_val

    for role, hex_val in dark_scheme.items():
        css_var = f"--md-sys-color-{_camel_to_kebab(role)}"
        dark_css[css_var] = hex_val

    # Format CSS stylesheets
    light_lines = [f"  {k}: {v};" for k, v in sorted(light_css.items())]
    dark_lines = [f"  {k}: {v};" for k, v in sorted(dark_css.items())]

    root_css = (
        ":root {\n"
        + "\n".join(light_lines)
        + "\n}\n\n.dark {\n"
        + "\n".join(dark_lines)
        + "\n}"
    )

    css_vars_dict = {
        "light": light_css,
        "dark": dark_css,
        "rootCss": root_css,
    }

    return {
        "seed": seed,
        "hct": hct,
        "palettes": palettes,
        "schemes": {
            "light": light_scheme,
            "dark": dark_scheme,
        },
        "light": light_scheme,
        "dark": dark_scheme,
        "cssVariables": css_vars_dict,
        "css_variables": css_vars_dict,
    }


def calculate_m3_palette(
    seed_hex: str | None = None,
    format: str = "all",
    use_fallback: bool = False,
    seed: str | None = None,
) -> Dict[str, Any]:
    """Calculate Material 3 tonal palettes, semantic color roles, and CSS variables.

    Args:
        seed_hex: Source color hex string (e.g., "#6750A4" or "6750A4").
        format: Output format: "all" (or "json"), "css", or "tokens".
        use_fallback: Force using pure-Python fallback (useful for testing or no-dependency mode).
        seed: Alias for seed_hex for flexible caller compatibility.

    Returns:
        Dictionary containing seed, HCT coordinates, 6 tonal palettes (0-100),
        light and dark semantic schemes (including surfaceContainer 1-5), and CSS custom properties.

    Raises:
        ValueError: If seed_hex is not a valid 3- or 6-digit hex string.
    """
    raw_seed = seed if seed is not None else seed_hex
    if raw_seed is None:
        raise ValueError("Seed color must be provided via 'seed' or 'seed_hex'.")

    norm_hex = normalize_hex_color(raw_seed)

    # Use fallback if requested or if materialyoucolor is not available
    if use_fallback or not _HAS_MATERIALYOUCOLOR:
        full_res = _fallback_calculate_palette(norm_hex)
        return _format_output(full_res, format)

    # Primary path using Google Material Color Utilities (materialyoucolor)
    r = int(norm_hex[1:3], 16)
    g = int(norm_hex[3:5], 16)
    b = int(norm_hex[5:7], 16)
    argb = argb_from_rgb(r, g, b)

    cp = CorePalette.of(argb)
    hct_obj = Hct.from_int(argb)
    light = Scheme.light(argb)
    dark = Scheme.dark(argb)

    # Generate 6 full tonal palettes (0-100)
    palettes: Dict[str, Dict[str, str]] = {
        "primary": {str(t): _argb_to_hex6(cp.a1.tone(t)) for t in STANDARD_TONES},
        "secondary": {str(t): _argb_to_hex6(cp.a2.tone(t)) for t in STANDARD_TONES},
        "tertiary": {str(t): _argb_to_hex6(cp.a3.tone(t)) for t in STANDARD_TONES},
        "neutral": {str(t): _argb_to_hex6(cp.n1.tone(t)) for t in STANDARD_TONES},
        "neutralVariant": {str(t): _argb_to_hex6(cp.n2.tone(t)) for t in STANDARD_TONES},
        "error": {str(t): _argb_to_hex6(cp.error.tone(t)) for t in STANDARD_TONES},
    }

    # Light Scheme roles with exact M3 surface container levels
    light_scheme: Dict[str, str] = {
        "primary": _argb_to_hex6(light.primary),
        "onPrimary": _argb_to_hex6(light.on_primary),
        "primaryContainer": _argb_to_hex6(light.primary_container),
        "onPrimaryContainer": _argb_to_hex6(light.on_primary_container),
        "inversePrimary": _argb_to_hex6(light.inverse_primary),
        "secondary": _argb_to_hex6(light.secondary),
        "onSecondary": _argb_to_hex6(light.on_secondary),
        "secondaryContainer": _argb_to_hex6(light.secondary_container),
        "onSecondaryContainer": _argb_to_hex6(light.on_secondary_container),
        "tertiary": _argb_to_hex6(light.tertiary),
        "onTertiary": _argb_to_hex6(light.on_tertiary),
        "tertiaryContainer": _argb_to_hex6(light.tertiary_container),
        "onTertiaryContainer": _argb_to_hex6(light.on_tertiary_container),
        "error": _argb_to_hex6(light.error),
        "onError": _argb_to_hex6(light.on_error),
        "errorContainer": _argb_to_hex6(light.error_container),
        "onErrorContainer": _argb_to_hex6(light.on_error_container),
        "surface": _argb_to_hex6(light.surface),
        "onSurface": _argb_to_hex6(light.on_surface),
        "surfaceVariant": _argb_to_hex6(light.surface_variant),
        "onSurfaceVariant": _argb_to_hex6(light.on_surface_variant),
        "inverseSurface": _argb_to_hex6(light.inverse_surface),
        "inverseOnSurface": _argb_to_hex6(light.inverse_on_surface),
        "surfaceContainerLowest": _argb_to_hex6(cp.n1.tone(100)),
        "surfaceContainerLow": _argb_to_hex6(cp.n1.tone(96)),
        "surfaceContainer": _argb_to_hex6(cp.n1.tone(94)),
        "surfaceContainerHigh": _argb_to_hex6(cp.n1.tone(92)),
        "surfaceContainerHighest": _argb_to_hex6(cp.n1.tone(90)),
        "outline": _argb_to_hex6(light.outline),
        "outlineVariant": _argb_to_hex6(light.outline_variant),
        "background": _argb_to_hex6(light.background),
        "onBackground": _argb_to_hex6(light.on_background),
        "scrim": _argb_to_hex6(light.scrim),
        "shadow": _argb_to_hex6(light.shadow),
    }

    # Dark Scheme roles with exact M3 surface container levels
    dark_scheme: Dict[str, str] = {
        "primary": _argb_to_hex6(dark.primary),
        "onPrimary": _argb_to_hex6(dark.on_primary),
        "primaryContainer": _argb_to_hex6(dark.primary_container),
        "onPrimaryContainer": _argb_to_hex6(dark.on_primary_container),
        "inversePrimary": _argb_to_hex6(dark.inverse_primary),
        "secondary": _argb_to_hex6(dark.secondary),
        "onSecondary": _argb_to_hex6(dark.on_secondary),
        "secondaryContainer": _argb_to_hex6(dark.secondary_container),
        "onSecondaryContainer": _argb_to_hex6(dark.on_secondary_container),
        "tertiary": _argb_to_hex6(dark.tertiary),
        "onTertiary": _argb_to_hex6(dark.on_tertiary),
        "tertiaryContainer": _argb_to_hex6(dark.tertiary_container),
        "onTertiaryContainer": _argb_to_hex6(dark.on_tertiary_container),
        "error": _argb_to_hex6(dark.error),
        "onError": _argb_to_hex6(dark.on_error),
        "errorContainer": _argb_to_hex6(dark.error_container),
        "onErrorContainer": _argb_to_hex6(dark.on_error_container),
        "surface": _argb_to_hex6(dark.surface),
        "onSurface": _argb_to_hex6(dark.on_surface),
        "surfaceVariant": _argb_to_hex6(dark.surface_variant),
        "onSurfaceVariant": _argb_to_hex6(dark.on_surface_variant),
        "inverseSurface": _argb_to_hex6(dark.inverse_surface),
        "inverseOnSurface": _argb_to_hex6(dark.inverse_on_surface),
        "surfaceContainerLowest": _argb_to_hex6(cp.n1.tone(4)),
        "surfaceContainerLow": _argb_to_hex6(cp.n1.tone(10)),
        "surfaceContainer": _argb_to_hex6(cp.n1.tone(12)),
        "surfaceContainerHigh": _argb_to_hex6(cp.n1.tone(17)),
        "surfaceContainerHighest": _argb_to_hex6(cp.n1.tone(22)),
        "outline": _argb_to_hex6(dark.outline),
        "outlineVariant": _argb_to_hex6(dark.outline_variant),
        "background": _argb_to_hex6(dark.background),
        "onBackground": _argb_to_hex6(dark.on_background),
        "scrim": _argb_to_hex6(dark.scrim),
        "shadow": _argb_to_hex6(dark.shadow),
    }

    full_res = _build_response(
        seed=norm_hex,
        hct={
            "hue": round(hct_obj.hue, 2),
            "chroma": round(hct_obj.chroma, 2),
            "tone": round(hct_obj.tone, 2),
        },
        palettes=palettes,
        light_scheme=light_scheme,
        dark_scheme=dark_scheme,
    )

    return _format_output(full_res, format)


def _format_output(full_res: Dict[str, Any], output_format: str) -> Dict[str, Any]:
    """Filter response dictionary according to requested format."""
    fmt = output_format.strip().lower()
    if fmt == "css":
        return {
            "seed": full_res["seed"],
            "cssVariables": full_res["cssVariables"],
            "rootCss": full_res["cssVariables"]["rootCss"],
        }
    elif fmt == "tokens":
        return {
            "seed": full_res["seed"],
            "light": full_res["schemes"]["light"],
            "dark": full_res["schemes"]["dark"],
            "palettes": full_res["palettes"],
        }
    return full_res

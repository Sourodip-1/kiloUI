"""Authoritative Kilo UI + Material 3 Python FastMCP Server.

Exposes resources, tools, and prompts for external IDE clients (Claude Desktop,
Cursor, VS Code, Windsurf, Antigravity) over stdio, SSE, and Streamable HTTP.
"""

from __future__ import annotations

import difflib
import json
import os
import re
import sys
from typing import Any, Literal

# Ensure repository root is on sys.path when invoked directly as a script
_REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if _REPO_ROOT not in sys.path:
    sys.path.insert(0, _REPO_ROOT)

from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.resources.templates import ResourceTemplate
from server.ast_validator import validate_design_ast as _ast_validate

# ---------------------------------------------------------------------------
# 1. FastMCP 1.28.0 URI Template Matching Adapter
# ---------------------------------------------------------------------------
# FastMCP's built-in ResourceTemplate.matches replaces '{' and '}' without
# escaping literal metacharacters like '?'. In URI templates with query
# parameters (e.g. 'm3://tokens/palette?seed={hex}'), the '?' is treated as a
# regex quantifier instead of a literal question mark. This adapter splits on
# parameters, escapes literal parts, and compiles a robust regex pattern.
_original_resource_matches = ResourceTemplate.matches


def _robust_resource_matches(self: ResourceTemplate, uri: str) -> dict[str, Any] | None:
    parts = re.split(r"(\{[^}]+\})", self.uri_template)
    regex_parts: list[str] = []
    for part in parts:
        if part.startswith("{") and part.endswith("}"):
            param_name = part[1:-1]
            regex_parts.append(rf"(?P<{param_name}>[^/&]+)")
        else:
            regex_parts.append(re.escape(part))
    pattern = "^" + "".join(regex_parts) + "$"
    match = re.match(pattern, uri)
    return match.groupdict() if match else None


ResourceTemplate.matches = _robust_resource_matches


# ---------------------------------------------------------------------------
# 2. FastMCP Server Initialization
# ---------------------------------------------------------------------------
mcp = FastMCP(
    name="kilo-m3-server",
    instructions="Authoritative Kilo UI and Material 3 Design Token Server",
    host="127.0.0.1",
    port=8000,
    sse_path="/sse",
    message_path="/messages/",
    streamable_http_path="/mcp",
)


# ---------------------------------------------------------------------------
# 3. Helper Integration with Registry, M3 Palette, and Guidelines Modules
# ---------------------------------------------------------------------------
def _load_registry_catalog() -> dict[str, Any]:
    """Retrieve primitive catalog from server.registry_loader with fallback."""
    try:
        from server.registry_loader import get_registry_catalog

        return get_registry_catalog()
    except Exception:
        # Fallback direct parser if module is unavailable
        from pathlib import Path

        repo_root = Path(__file__).resolve().parent.parent
        data_file = repo_root / "registry" / "registry-data.ts"
        if data_file.exists():
            text = data_file.read_text(encoding="utf-8")
            marker = "export const REGISTRY_DATA: Record<string, RegistryItem> = "
            idx = text.find(marker)
            if idx != -1:
                raw = text[idx + len(marker) :].strip().rstrip(";")
                items = json.loads(raw)
                categories: set[str] = set()
                prim_summaries: list[dict[str, Any]] = []
                for k, v in items.items():
                    cat = v.get("category", "General")
                    categories.add(cat)
                    prim_summaries.append(
                        {
                            "name": v.get("name", k),
                            "title": v.get("title", k.title()),
                            "category": cat,
                            "description": v.get("description", ""),
                            "variants": v.get("variants", []),
                        }
                    )
                return {
                    "name": "kilo-ui",
                    "version": "0.3.0",
                    "description": "Authoritative Kilo UI Component Registry",
                    "total": len(items),
                    "total_primitives": len(items),
                    "categories": sorted(categories),
                    "primitives": prim_summaries,
                }
        return {
            "name": "kilo-ui",
            "version": "0.3.0",
            "description": "Authoritative Kilo UI Component Registry",
            "total": 0,
            "total_primitives": 0,
            "categories": [],
            "primitives": [],
        }


def _get_primitive_schema(name: str) -> dict[str, Any]:
    """Retrieve detailed schema for a primitive with name normalization and fallback."""
    try:
        from server.registry_loader import get_primitive_schema

        return get_primitive_schema(name)
    except ValueError:
        raise
    except Exception as exc:
        raise ValueError(f"Could not load schema for '{name}': {exc}") from exc


def _list_primitives_filtered(category: str | None = None) -> list[dict[str, Any]]:
    """List primitives, optionally filtered by category."""
    try:
        from server.registry_loader import list_primitives

        return list_primitives(category=category)
    except Exception:
        catalog = _load_registry_catalog()
        primitives = catalog.get("primitives", [])
        if not category:
            return primitives
        norm_cat = category.strip().lower()
        return [p for p in primitives if p.get("category", "").lower() == norm_cat]


def _calc_palette_data(seed: str, format_type: str = "all") -> dict[str, Any]:
    """Calculate M3 tonal palette, light/dark roles, and CSS custom properties."""
    try:
        from server.m3_palette import calculate_m3_palette as m3_calc

        raw = m3_calc(seed=seed, format=format_type)
        # Ensure canonical response shape satisfies all client requirements
        if isinstance(raw, dict):
            if "palettes" in raw and "tones" not in raw:
                raw["tones"] = raw["palettes"]
            if "tones" in raw and "palettes" not in raw:
                raw["palettes"] = raw["tones"]
            if "schemes" in raw:
                if "light" not in raw and "light" in raw["schemes"]:
                    raw["light"] = raw["schemes"]["light"]
                if "dark" not in raw and "dark" in raw["schemes"]:
                    raw["dark"] = raw["schemes"]["dark"]
            if "tokens" not in raw:
                raw["tokens"] = {
                    "light": raw.get("light"),
                    "dark": raw.get("dark"),
                    "tones": raw.get("tones") or raw.get("palettes"),
                }
        return raw
    except ValueError:
        raise
    except Exception as exc:
        raise ValueError(f"Failed to calculate Material 3 palette: {exc}") from exc


def _get_surface_hierarchy_data() -> dict[str, Any]:
    """Retrieve M3 surface hierarchy guidelines and Kilo UI token mappings."""
    try:
        from server.guidelines import get_surface_guidelines, get_surface_guidelines_markdown

        base = get_surface_guidelines()
        try:
            base["guidelines_markdown"] = get_surface_guidelines_markdown()
        except Exception:
            pass
        return base
    except Exception:
        return {
            "version": "1.0.0",
            "surfaces": {
                "surface": {
                    "elevation": "0dp",
                    "role": "Base canvas / page background",
                    "kiloToken": "var(--bg-main)",
                },
                "surfaceContainerLowest": {
                    "elevation": "0dp",
                    "role": "Lowest container, recessed cards",
                    "kiloToken": "var(--surface-lowest)",
                },
                "surfaceContainerLow": {
                    "elevation": "1dp",
                    "role": "Low container, grouping cards",
                    "kiloToken": "var(--surface-subtle)",
                },
                "surfaceContainer": {
                    "elevation": "2dp",
                    "role": "Standard container, default cards/panels",
                    "kiloToken": "var(--surface-secondary)",
                },
                "surfaceContainerHigh": {
                    "elevation": "3dp",
                    "role": "Elevated cards, hover cards, dropdowns",
                    "kiloToken": "var(--surface-elevated)",
                },
                "surfaceContainerHighest": {
                    "elevation": "4dp",
                    "role": "Highest container, dialogs, modals, popovers",
                    "kiloToken": "var(--surface-highest)",
                },
            },
            "elevation_mappings": {
                "level0": {"dp": 0, "token": "--elevation-0", "shadow": "none", "usage": "Backgrounds, flat items"},
                "level1": {"dp": 1, "token": "--elevation-1", "shadow": "0 1px 2px rgba(0,0,0,0.06)", "usage": "Cards, list items"},
                "level2": {"dp": 2, "token": "--elevation-2", "shadow": "0 2px 4px rgba(0,0,0,0.08)", "usage": "Hover state, filter chips"},
                "level3": {"dp": 3, "token": "--elevation-3", "shadow": "0 4px 8px rgba(0,0,0,0.10)", "usage": "Floating navigation, top app bars"},
                "level4": {"dp": 4, "token": "--elevation-4", "shadow": "0 6px 12px rgba(0,0,0,0.12)", "usage": "Nav drawers, bottom sheets"},
                "level5": {"dp": 5, "token": "--elevation-5", "shadow": "0 8px 16px rgba(0,0,0,0.14)", "usage": "Dialogs, pickers, critical alerts"},
            },
            "aesthetic_constraints": [
                "Strict clean monochrome styling",
                "Subtle M3 neutral surface container elevations",
                "NO glowing circles or neon drop-shadows",
                "NO pulsing green dots or animated status radars",
                "NO colorful rainbow gradients",
            ],
        }


# ---------------------------------------------------------------------------
# 4. Resources
# ---------------------------------------------------------------------------
@mcp.resource("kilo://registry/catalog", mime_type="application/json")
def get_catalog_resource() -> dict[str, Any]:
    """Complete summary of all Kilo UI primitives, categories, and total counts."""
    return _load_registry_catalog()


@mcp.resource("kilo://primitives/{name}", mime_type="application/json")
def get_primitive_resource(name: str) -> dict[str, Any]:
    """Detailed schema, props, slots, constraints, variants, and source files for a primitive."""
    return _get_primitive_schema(name)


@mcp.resource("m3://tokens/palette?seed={hex}", mime_type="application/json")
def get_m3_palette_resource(hex: str) -> dict[str, Any]:
    """Material 3 tonal palettes, light/dark semantic color roles, and CSS variables for a seed color."""
    return _calc_palette_data(seed=hex, format_type="all")


@mcp.resource("m3://guidelines/surface-hierarchy", mime_type="application/json")
def get_surface_hierarchy_resource() -> dict[str, Any]:
    """Material Design 3 surface elevation guidelines and container role mappings to Kilo UI tokens."""
    return _get_surface_hierarchy_data()


# ---------------------------------------------------------------------------
# 5. Tools
# ---------------------------------------------------------------------------
@mcp.tool()
def list_kilo_primitives(category: str | None = None) -> list[dict[str, Any]]:
    """List available Kilo UI primitives, optionally filtered by category name.

    Args:
        category: Optional category name filter (e.g. 'Actions', 'Forms & Inputs',
                  'Overlays', 'Data Display', 'Navigation', 'Media & Layout',
                  'Backgrounds & Shaders', 'Cursors', 'Mobile App').
    """
    return _list_primitives_filtered(category=category)


@mcp.tool()
def get_primitive_schema(name: str) -> dict[str, Any]:
    """Retrieve authoritative schema, props, slots, and design constraints for a specific primitive.

    Args:
        name: Name of the primitive (case-insensitive, kebab-case, snake_case, or PascalCase).
    """
    return _get_primitive_schema(name)


@mcp.tool()
def calculate_m3_palette(seed: str, format: str = "all") -> dict[str, Any]:
    """Calculate Material 3 tonal palettes, light/dark schemes, and CSS custom properties from a seed color.

    Args:
        seed: Hex color seed string (e.g. '#6750A4', '6750a4', '#f0c', '%236750a4').
        format: Output format ('all', 'json', 'css', or 'tokens'). Defaults to 'all'.
    """
    return _calc_palette_data(seed=seed, format_type=format)


@mcp.tool()
def validate_design_ast(ast: dict[str, Any] | str) -> dict[str, Any]:
    """Validate a declarative design AST against primitive schemas and aesthetic design rules.

    Checks:
      1. Structural integrity (version, meta, root).
      2. Component existence against authoritative registry.
      3. Prop validity, required props, and variant enumeration.
      4. Kilo UI aesthetic constraints (flags glowing circles, pulsing green dots,
         and rainbow gradients).

    Args:
        ast: Declarative Design AST dictionary or JSON string.
    """
    return _ast_validate(ast, auto_repair=True, strict_aesthetics=True)


# ---------------------------------------------------------------------------
# 6. Prompts
# ---------------------------------------------------------------------------
@mcp.prompt()
def kilo_m3_architect(task: str, platform: str = "mobile", seed: str = "#737673") -> str:
    """System prompt instructing the AI UI Architect on composing declarative design ASTs with Kilo UI + M3.

    Args:
        task: Description of the screen or interface to design.
        platform: Target platform ('mobile', 'tablet', or 'desktop'). Defaults to 'mobile'.
        seed: Material 3 seed hex color (defaults to neutral '#737673').
    """
    return f"""You are the Kilo UI + Material 3 AI UI Architect.

Mission:
Generate an authoritative, strongly-typed declarative Design AST (version 1.0.0) for the following task:
"{task}"

Target Platform: {platform}
Seed Color: {seed}

Aesthetic Principles:
1. Strict Clean Monochrome Styling: Adhere strictly to clean monochrome styling, precision typography, and subtle M3 neutral surfaces.
2. Zero Neon / Anti-Patterns: Absolutely DO NOT include glowing circles, neon drop shadows, green pulsing dots, or rainbow gradients.
3. M3 Surface Elevation: Use container levels:
   - Level 0: var(--bg-main) (Canvas)
   - Level 1: var(--surface-subtle) (Low container grouping)
   - Level 2: var(--surface-secondary) (Standard cards and inputs)
   - Level 3: var(--surface-elevated) (Hover cards, dropdowns)
   - Level 4: var(--surface-highest) (Bottom sheets, modals)
4. Authoritative Primitives:
   Only use registered Kilo UI primitives (e.g. button, card, input, modal, bottom-sheet,
   swipe-action-card, thumb-segment-controller, pull-to-refresh, floating-action-dock).

AST Output Structure:
{{
  "version": "1.0.0",
  "meta": {{
    "id": "screen-1",
    "title": "Design Title",
    "viewport": "{platform}",
    "colorScheme": "dark",
    "seedColor": "{seed}"
  }},
  "theme": {{
    "tokens": {{}},
    "m3": {{ "primary": "{seed}", "surface": "#121212" }}
  }},
  "root": {{
    "id": "root-container",
    "kind": "container",
    "props": {{ "className": "min-h-screen bg-[var(--bg-main)] p-4 flex flex-col gap-4" }},
    "children": []
  }}
}}

Always validate the generated AST with the `validate_design_ast` tool before returning your final answer.
"""


@mcp.prompt()
def section_composition_pattern(section_type: str, platform: str = "mobile") -> str:
    """Composition guidelines and structural blueprints for specific UI section patterns.

    Args:
        section_type: Section category ('hero', 'features', 'auth', 'navigation',
                      'mobile-bottom-sheet', 'dashboard-card', 'mobile-feed').
        platform: Target platform ('mobile', 'tablet', or 'desktop'). Defaults to 'mobile'.
    """
    return f"""Section Composition Blueprint: {section_type} (Platform: {platform})

Guidelines:
1. Container Hierarchy:
   - Root section container with clear semantic layout (flex or grid).
   - Card wrappers using surface-container elevation (var(--surface-secondary)).
   - Precision typography using text-primary (high contrast) and text-muted (secondary).
2. Recommended Primitives for '{section_type}':
   - Mobile: floating-action-dock, mobile-bottom-sheet, thumb-segment-controller, swipe-action-card.
   - Web/Desktop: button, card, input, dialog, accordion, tabs.
3. Surface Elevation:
   - Canvas: var(--bg-main)
   - Card Body: var(--surface-secondary) border border-[var(--border)]
   - Action Dock / Bottom Sheet: var(--surface-elevated) with backdrop-blur.
4. Validation:
   Ensure all component names match registered primitives and variants match supported schemas.
"""


# ---------------------------------------------------------------------------
# 7. CLI Execution Entry Point
# ---------------------------------------------------------------------------
def main(args: list[str] | None = None) -> None:
    """Run server from command-line."""
    from server.cli import main as cli_main

    cli_main(args)


if __name__ == "__main__":
    main(sys.argv[1:])

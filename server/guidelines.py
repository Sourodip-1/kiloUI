"""Material 3 Surface Hierarchy and Elevation Guidelines for Kilo UI.

Defines the authoritative mapping between Material Design 3 surface container roles
and Kilo UI design tokens (--bg-main, --surface-elevated, --surface-secondary, etc.),
along with monochrome styling constraints and elevation specifications.
"""

from __future__ import annotations

from typing import Any, Dict, List

# Authoritative surface levels 0 through 5 mapped to Kilo UI
SURFACE_HIERARCHY: Dict[str, Dict[str, Any]] = {
    "level_0": {
        "level": 0,
        "name": "Base Canvas / Page Body",
        "m3_role": "surface",
        "m3_container_role": "surface-container-lowest",
        "kilo_token": "--bg-main",
        "kilo_dark_value": "#090a0a",
        "kilo_light_value": "#f8f9fa",
        "elevation_dp": 0,
        "description": "Default background behind all application elements. Represents the deepest canvas plane.",
        "tailwind_class": "bg-[var(--bg-main)]",
        "usage": ["Main document body", "Page chassis background", "Canvas backdrop"],
    },
    "level_1": {
        "level": 1,
        "name": "Low Surface Container",
        "m3_role": "surface-container-low",
        "m3_container_role": "surface-container-low",
        "kilo_token": "--bg-sidebar",
        "kilo_dark_value": "#0d0e0e",
        "kilo_light_value": "#f1f2f3",
        "elevation_dp": 1,
        "description": "Subtle grouping containers resting directly on the canvas background. Creates quiet separation without high contrast.",
        "tailwind_class": "bg-[var(--bg-sidebar)]",
        "usage": ["Application sidebars", "Left navigation panels", "Muted grouped content sections"],
    },
    "level_2": {
        "level": 2,
        "name": "Standard Surface Container / Elevated",
        "m3_role": "surface-container",
        "m3_container_role": "surface-container",
        "kilo_token": "--surface-elevated",
        "kilo_dark_value": "#141515",
        "kilo_light_value": "#ffffff",
        "elevation_dp": 2,
        "description": "Primary card and container surface for standalone components, input groups, and interactive modules.",
        "tailwind_class": "bg-[var(--surface-elevated)]",
        "usage": ["Component cards", "Preview stage containers", "Interactive control groups", "Stat cards"],
    },
    "level_3": {
        "level": 3,
        "name": "High Surface Container / Secondary Surface",
        "m3_role": "surface-container-high",
        "m3_container_role": "surface-container-high",
        "kilo_token": "--surface-secondary",
        "kilo_dark_value": "#1b1c1c",
        "kilo_light_value": "#e9ebec",
        "elevation_dp": 6,
        "description": "Elevated containers that float over level 2 surfaces or require explicit visual prominence.",
        "tailwind_class": "bg-[var(--surface-secondary)]",
        "usage": ["Dropdown menus", "Popovers", "Tooltips", "Floating segment bars", "Secondary buttons"],
    },
    "level_4": {
        "level": 4,
        "name": "Highest Surface Container / Modals & Sheets",
        "m3_role": "surface-container-highest",
        "m3_container_role": "surface-container-highest",
        "kilo_token": "--surface-tertiary",
        "kilo_dark_value": "#222424",
        "kilo_light_value": "#dfdede",
        "elevation_dp": 8,
        "description": "Highest container plane. Used for modal overlays, drawer sheets, and critical HUD dialogs.",
        "tailwind_class": "bg-[var(--surface-tertiary)]",
        "usage": ["Mobile bottom sheets", "Command palette HUD", "Modal dialogs", "Toast containers"],
    },
    "level_5": {
        "level": 5,
        "name": "Transient Overlays / Reticles / Scrim",
        "m3_role": "scrim",
        "m3_container_role": "scrim",
        "kilo_token": "--scrim",
        "kilo_dark_value": "rgba(0, 0, 0, 0.7)",
        "kilo_light_value": "rgba(0, 0, 0, 0.35)",
        "elevation_dp": 16,
        "description": "Backdrop scrim dimming the interface below modal or drawer layers.",
        "tailwind_class": "bg-black/60 backdrop-blur-xs",
        "usage": ["Modal backdrop scrim", "Bottom sheet dimming layer"],
    },
}

# Elevation mapping table between Kilo UI CSS tokens and M3 roles
ELEVATION_MAPPINGS: Dict[str, Dict[str, Any]] = {
    "--bg-main": {
        "m3_role": "surface",
        "m3_elevation": 0,
        "dark": "#090a0a",
        "light": "#f8f9fa",
        "border_token": "--border-subtle",
        "text_token": "--text-primary",
        "description": "Base canvas background",
    },
    "--bg-sidebar": {
        "m3_role": "surface-container-low",
        "m3_elevation": 1,
        "dark": "#0d0e0e",
        "light": "#f1f2f3",
        "border_token": "--border",
        "text_token": "--text-primary",
        "description": "Sidebar and persistent panel background",
    },
    "--surface-elevated": {
        "m3_role": "surface-container",
        "m3_elevation": 2,
        "dark": "#141515",
        "light": "#ffffff",
        "border_token": "--border",
        "text_token": "--text-primary",
        "description": "Primary card, preview tile, and content container",
    },
    "--surface-secondary": {
        "m3_role": "surface-container-high",
        "m3_elevation": 6,
        "dark": "#1b1c1c",
        "light": "#e9ebec",
        "border_token": "--border-hover",
        "text_token": "--text-primary",
        "description": "Floating controls, popovers, dropdown menus",
    },
    "--surface-tertiary": {
        "m3_role": "surface-container-highest",
        "m3_elevation": 8,
        "dark": "#222424",
        "light": "#dfdede",
        "border_token": "--border-hover",
        "text_token": "--text-primary",
        "description": "Top-level dialogs, mobile sheets, command palettes",
    },
    "--border": {
        "m3_role": "outline",
        "dark": "#292b29",
        "light": "#d7dbd7",
        "description": "Standard container and component boundary border",
    },
    "--border-subtle": {
        "m3_role": "outline-variant",
        "dark": "#1f201f",
        "light": "#e5e8e5",
        "description": "Subtle secondary partition line or divider",
    },
    "--text-primary": {
        "m3_role": "on-surface",
        "dark": "#f2f2f0",
        "light": "#121313",
        "description": "High-contrast primary typography",
    },
    "--text-secondary": {
        "m3_role": "on-surface-variant",
        "dark": "#a3a5a3",
        "light": "#585c58",
        "description": "Secondary typography and metadata",
    },
    "--text-muted": {
        "m3_role": "outline",
        "dark": "#737673",
        "light": "#7f847f",
        "description": "Muted labels, placeholders, and CAD reticle marks",
    },
}

# Strict Kilo UI aesthetic and architectural constraints
AESTHETIC_CONSTRAINTS: Dict[str, Any] = {
    "clean_monochrome_mandate": True,
    "prohibited_patterns": [
        "Glowing circles or neon blur drop shadows (e.g. shadow-[0_0_*] with saturated colors)",
        "Green pulsing dots (e.g. animate-ping with bright green accent)",
        "Rainbow, pastel, or multi-hue gradient backgrounds (e.g. bg-gradient-to-r from-pink-500)",
        "Harsh saturated neon accents as primary container fills",
    ],
    "required_patterns": [
        "Monochrome neutral palette with subtle M3 tonal shifts",
        "Precision 1px solid borders using --border or --border-subtle",
        "Subtle container elevation hierarchy (surface-container 1-5)",
        "Monospace micro-labels and CAD architectural reticles for technical precision",
        "Touch target dimensions >= 44x44px for thumb-friendly mobile ergonomics",
        "Focus-visible keyboard rings with offset contrast",
    ],
    "contrast_ratios": {
        "body_text": ">= 4.5:1 (WCAG AA)",
        "large_text": ">= 3:1 (WCAG AA)",
        "interactive_boundaries": ">= 3:1 (WCAG Non-text Contrast)",
    },
}


def get_surface_guidelines() -> Dict[str, Any]:
    """Retrieve structured Material 3 surface hierarchy and elevation guidelines.

    Matches m3://guidelines/surface-hierarchy interface contract.
    """
    return {
        "version": "3.0",
        "surfaces": SURFACE_HIERARCHY,
        "elevation_mappings": ELEVATION_MAPPINGS,
        "aesthetic_constraints": AESTHETIC_CONSTRAINTS,
    }


def get_surface_guidelines_markdown() -> str:
    """Generate comprehensive Markdown documentation for Material 3 surface hierarchy."""
    doc = """# Material 3 Surface Hierarchy & Elevation Guidelines for Kilo UI

## Overview
Kilo UI integrates Material Design 3's tonal surface model with a high-craft,
developer-tool monochrome aesthetic. Surfaces do not rely on heavy drop shadows;
instead, depth and hierarchy are communicated through subtle tonal elevation steps,
crisp 1px borders, and disciplined container nesting.

---

## Surface Hierarchy Levels

| Level | M3 Container Role | Kilo UI Token | Dark Value | Light Value | Elevation | Primary Use Cases |
|---|---|---|---|---|---|---|
| **0** | `surface` / `lowest` | `--bg-main` | `#090a0a` | `#f8f9fa` | 0dp | Application canvas, main body background |
| **1** | `surface-container-low` | `--bg-sidebar` | `#0d0e0e` | `#f1f2f3` | 1dp | Sidebars, navigation drawers, low panels |
| **2** | `surface-container` | `--surface-elevated` | `#141515` | `#ffffff` | 2dp | Cards, preview stages, input groups |
| **3** | `surface-container-high` | `--surface-secondary` | `#1b1c1c` | `#e9ebec` | 6dp | Popovers, dropdown menus, floating bars |
| **4** | `surface-container-highest` | `--surface-tertiary` | `#222424` | `#dfdede` | 8dp | Mobile bottom sheets, modals, command HUD |
| **5** | `scrim` | `--scrim` | `rgba(0,0,0,0.7)` | `rgba(0,0,0,0.35)` | 16dp | Backdrop dimming layer for modals/sheets |

---

## Token Elevation Mappings

- **`--bg-main`** (`surface`): The foundational canvas layer.
- **`--bg-sidebar`** (`surface-container-low`): Rests upon `--bg-main` with subtle tonal contrast.
- **`--surface-elevated`** (`surface-container`): The default card container. Use for all content cards.
- **`--surface-secondary`** (`surface-container-high`): Elevated floating controls and active item states.
- **`--surface-tertiary`** (`surface-container-highest`): Dialog windows, sheet containers, floating action docks.
- **`--border`** (`outline`): Precision 1px container outline.
- **`--border-subtle`** (`outline-variant`): Internal partition lines between items.
- **`--text-primary`** (`on-surface`): High-contrast header and body typography.
- **`--text-secondary`** (`on-surface-variant`): Secondary descriptions and metadata.
- **`--text-muted`** (`outline`): Muted tags, disabled state, and architectural crosshair indicators.

---

## Strict Kilo UI Aesthetic Constraints

To maintain high visual craft and professional developer tool quality:

1. **NO Glowing Circles**: Avoid neon radial glows, `shadow-[0_0_*]` colored blurs, and pseudo-element light blooms.
2. **NO Pulsing Green Dots**: Avoid `animate-ping` indicators and aggressive pulsing beacons.
3. **NO Saturated Rainbow Gradients**: Avoid multi-hue linear gradients (`from-pink-500 to-indigo-500`).
4. **Precision Monochrome Surfaces**: Use neutral M3 surface container levels (`--surface-elevated`, `--surface-secondary`, `--surface-tertiary`).
5. **Ergonomic Touch Targets**: In mobile layouts, interactive elements must maintain at least 44x44px hit bounds.
6. **Focus Ring Contrast**: All focusable primitives must feature clear `focus-visible:ring-1 focus-visible:ring-offset-1` indicators.
"""
    return doc.strip()

"""Authoritative test fixtures for Kilo UI + Material 3 MCP E2E test suite.

Contains canonical declarative ASTs, seed colors, boundary cases,
and expected schemas derived strictly from ORIGINAL_REQUEST.md and PROJECT.md.
"""

from typing import Any, Dict, List

# Authoritative lists of primitives
MOBILE_PRIMITIVES: List[str] = [
    "mobile-bottom-sheet",
    "swipe-action-card",
    "thumb-segment-controller",
    "pull-to-refresh",
    "floating-action-dock",
]

CORE_WEB_PRIMITIVES: List[str] = [
    "button",
    "card",
    "input",
    "switch",
    "tabs",
    "accordion",
    "dialog",
    "drawer-dialog",
    "sidebar",
    "notched-navbar",
    "stat-card",
    "skeleton",
]

VALID_SEED_COLORS: List[str] = [
    "#6750A4",  # M3 Baseline Purple
    "#5CA904",  # Kilo Brand Green
    "#737673",  # M3 Neutral Grey
    "#006494",  # Cyan Blue
    "6750A4",   # Raw hex without '#' prefix
    "#FFF",     # 3-digit hex white
    "#000",     # 3-digit hex black
]

INVALID_SEED_COLORS: List[Any] = [
    "not-a-color",
    "#GGGGGG",
    "#12",
    "#12345",
    "#12345678",
    "",
    "   ",
    "#ZZZ",
]

# Canonical Tier 1 / Tier 4 Declarative Design ASTs

VALID_MOBILE_SETTINGS_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "screen_mobile_settings",
        "title": "Mobile Settings Drawer",
        "description": "Ergonomic mobile configuration drawer with theme controls",
        "viewport": "mobile",
        "colorScheme": "dark",
        "seedColor": "#737673",
    },
    "theme": {
        "mode": "dark",
        "seedHex": "#737673",
        "tokens": {
            "surface": "#121313",
            "surfaceContainer": "#1e2020",
            "onSurface": "#e1e3e3",
            "primary": "#c2c7c7",
            "outline": "#8b9292",
        },
    },
    "root": {
        "id": "sheet_root",
        "kind": "component",
        "name": "mobile-bottom-sheet",
        "component": "mobile-bottom-sheet",
        "props": {
            "snapPoints": [0.4, 0.9],
            "defaultSnap": 0.4,
            "showHandle": True,
        },
        "slots": {
            "content": [
                {
                    "id": "theme_segment",
                    "kind": "component",
                    "name": "thumb-segment-controller",
                    "component": "thumb-segment-controller",
                    "props": {
                        "options": ["System", "Light", "Dark"],
                        "value": "Dark",
                    },
                },
                {
                    "id": "notif_switch",
                    "kind": "component",
                    "name": "switch",
                    "component": "switch",
                    "props": {
                        "checked": True,
                        "label": "Push Notifications",
                    },
                },
                {
                    "id": "save_action_btn",
                    "kind": "component",
                    "name": "button",
                    "component": "button",
                    "props": {
                        "variant": "default",
                        "size": "default",
                        "children": "Save Preferences",
                    },
                },
            ]
        },
        "children": [],
    },
}

VALID_SWIPE_FEED_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "screen_swipe_feed",
        "title": "Swipeable Activity Feed",
        "viewport": "mobile",
        "colorScheme": "dark",
        "seedColor": "#737673",
    },
    "root": {
        "id": "feed_pull_refresh",
        "kind": "component",
        "name": "pull-to-refresh",
        "component": "pull-to-refresh",
        "props": {
            "threshold": 64,
            "monochrome": True,
        },
        "children": [
            {
                "id": "feed_item_1",
                "kind": "component",
                "name": "swipe-action-card",
                "component": "swipe-action-card",
                "props": {
                    "leftAction": "Bookmark",
                    "rightAction": "Delete",
                    "title": "Architectural Update",
                    "subtitle": "Kilo UI + M3 MCP server deployed successfully.",
                },
                "children": [],
            },
            {
                "id": "feed_item_2",
                "kind": "component",
                "name": "swipe-action-card",
                "component": "swipe-action-card",
                "props": {
                    "leftAction": "Archive",
                    "rightAction": "Delete",
                    "title": "Performance Optimization",
                    "subtitle": "Zero-drift parser benchmarked under 5ms.",
                },
                "children": [],
            },
        ],
    },
}

VALID_ACTION_DOCK_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "screen_action_dock",
        "title": "Ergonomic Navigation Dock",
        "viewport": "mobile",
        "colorScheme": "dark",
        "seedColor": "#737673",
    },
    "root": {
        "id": "dock_container",
        "kind": "container",
        "name": "stack",
        "layout": {
            "display": "flex",
            "direction": "column",
            "width": "full",
            "height": "screen",
            "justify": "end",
        },
        "children": [
            {
                "id": "dock_component",
                "kind": "component",
                "name": "floating-action-dock",
                "component": "floating-action-dock",
                "props": {
                    "actions": [
                        {"icon": "home", "label": "Feed"},
                        {"icon": "search", "label": "Explore"},
                        {"icon": "bell", "label": "Alerts"},
                        {"icon": "settings", "label": "Profile"},
                    ],
                    "active": "Feed",
                },
                "children": [],
            }
        ],
    },
}

VALID_DESKTOP_BENTO_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "screen_desktop_dashboard",
        "title": "Desktop Analytics Dashboard",
        "viewport": "desktop",
        "colorScheme": "dark",
        "seedColor": "#5CA904",
    },
    "root": {
        "id": "dashboard_grid",
        "kind": "container",
        "name": "grid",
        "layout": {
            "display": "grid",
            "columns": 3,
            "gap": "md",
        },
        "children": [
            {
                "id": "card_metric_1",
                "kind": "component",
                "name": "stat-card",
                "component": "stat-card",
                "props": {
                    "title": "Total Primitives",
                    "value": "61",
                    "trend": "+5 mobile",
                },
                "children": [],
            },
            {
                "id": "card_metric_2",
                "kind": "component",
                "name": "card",
                "component": "card",
                "props": {
                    "title": "MCP Telemetry",
                },
                "children": [
                    {
                        "id": "btn_refresh_stats",
                        "kind": "component",
                        "name": "button",
                        "component": "button",
                        "props": {
                            "variant": "outline",
                            "children": "Refresh Metrics",
                        },
                    }
                ],
            },
        ],
    },
}

# Boundary & Corner Test Fixtures (Tier 2)

MALFORMED_AST_NO_ROOT: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "missing_root",
        "title": "Invalid AST Missing Root",
    },
}

MALFORMED_AST_NO_META: Dict[str, Any] = {
    "version": "1.0.0",
    "root": {
        "id": "lone_root",
        "kind": "component",
        "name": "button",
        "component": "button",
    },
}

MALFORMED_AST_WRONG_VERSION: Dict[str, Any] = {
    "version": "99.0.0",
    "meta": {"id": "bad_ver", "title": "Bad Version"},
    "root": {"id": "r1", "kind": "component", "name": "button", "component": "button"},
}

UNKNOWN_PRIMITIVE_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "unknown_prim", "title": "Unknown Primitive Screen"},
    "root": {
        "id": "unregistered_node",
        "kind": "component",
        "name": "laser-cannon-widget",
        "component": "laser-cannon-widget",
        "props": {"power": 9000},
        "children": [],
    },
}

PROHIBITED_PULSING_DOT_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "bad_pulse", "title": "Violates Aesthetic Rule"},
    "root": {
        "id": "pulsing_node",
        "kind": "component",
        "name": "button",
        "component": "button",
        "props": {
            "variant": "default",
            "className": "w-3 h-3 bg-green-500 rounded-full animate-pulse",
        },
        "children": [],
    },
}

PROHIBITED_GLOWING_CIRCLE_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "bad_glow", "title": "Violates Glow Rule"},
    "root": {
        "id": "glowing_node",
        "kind": "component",
        "name": "card",
        "component": "card",
        "props": {
            "className": "rounded-full blur-xl bg-purple-500/50 glowing-circle shadow-[0_0_20px_#a855f7]",
        },
        "children": [],
    },
}

PROHIBITED_RAINBOW_GRADIENT_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "bad_grad", "title": "Violates Gradient Rule"},
    "root": {
        "id": "gradient_node",
        "kind": "component",
        "name": "card",
        "component": "card",
        "props": {
            "className": "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
        },
        "children": [],
    },
}

SUB_44PX_TOUCH_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {
        "id": "bad_touch",
        "title": "Sub 44px Touch Target",
        "viewport": "mobile",
    },
    "root": {
        "id": "tiny_touch_btn",
        "kind": "component",
        "name": "button",
        "component": "button",
        "props": {
            "variant": "ghost",
            "size": "micro",
            "minWidth": 24,
            "minHeight": 24,
        },
        "children": [],
    },
}

DUPLICATE_NODE_ID_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "dup_ids", "title": "Duplicate Node IDs"},
    "root": {
        "id": "duplicate_id_node",
        "kind": "container",
        "name": "stack",
        "children": [
            {
                "id": "duplicate_id_node",
                "kind": "component",
                "name": "button",
                "component": "button",
                "props": {"children": "First"},
            },
            {
                "id": "duplicate_id_node",
                "kind": "component",
                "name": "button",
                "component": "button",
                "props": {"children": "Second"},
            },
        ],
    },
}

TYPE_MISMATCH_PROP_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "type_mismatch", "title": "Type Mismatch AST"},
    "root": {
        "id": "bad_switch",
        "kind": "component",
        "name": "switch",
        "component": "switch",
        "props": {
            "checked": "not-a-boolean",
        },
        "children": [],
    },
}

INVALID_ENUM_PROP_AST: Dict[str, Any] = {
    "version": "1.0.0",
    "meta": {"id": "invalid_enum", "title": "Invalid Enum Variant"},
    "root": {
        "id": "bad_button_variant",
        "kind": "component",
        "name": "button",
        "component": "button",
        "props": {
            "variant": "neon-explosive-nonexistent",
        },
        "children": [],
    },
}

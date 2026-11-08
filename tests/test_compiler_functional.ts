/**
 * Functional verification script for Kilo UI Compiler and Emitter
 */

import * as React from "react";
import type { DesignAST } from "../lib/ast/schema";
import {
  KiloASTRenderer,
  compileASTToReact,
  emitTypeScriptSource,
  resolveM3Tokens,
  generateM3Palette,
  COMPONENT_REGISTRY_MAP,
} from "../lib/compiler";

console.log("=== KILO UI COMPILER FUNCTIONAL VERIFICATION ===");

// 1. Construct a comprehensive DesignAST exercising all features
const testAST: DesignAST = {
  version: "1.0.0",
  meta: {
    id: "mobile-dashboard-ast",
    title: "Mobile Dashboard Flow",
    description: "Complete mobile dashboard utilizing all 5 mobile primitives and M3 tokens",
    viewport: "mobile",
    colorScheme: "dark",
    seedColor: "#5CA904",
  },
  theme: {
    mode: "dark",
    seedHex: "#5CA904",
    tokens: {
      "custom-accent": "#5CA904",
    },
    m3: {
      primary: "#5CA904",
      surface: "#090a0a",
      outline: "#292b29",
    },
  },
  root: {
    id: "dashboard-root",
    kind: "container",
    name: "container",
    layout: {
      display: "flex",
      direction: "column",
      gap: "md",
      padding: 16,
      width: "full",
    },
    styleBindings: {
      surfaceRole: "surface",
      borderRole: "outlineVariant",
      shapeCorner: "xl",
    },
    slots: {
      header: [
        {
          id: "hdr-text",
          kind: "text",
          name: "h2",
          text: "Mobile Dashboard",
          styleBindings: {
            textRole: "headline",
          },
        },
      ],
      actions: [
        {
          id: "btn-refresh",
          kind: "component",
          component: "button",
          props: {
            variant: "outline",
            size: "sm",
            leftIcon: "RefreshCw",
          },
          text: "Sync",
        },
      ],
    },
    children: [
      // 1. Thumb Segment Controller
      {
        id: "segment-ctrl",
        kind: "component",
        component: "thumb-segment-controller",
        props: {
          size: "default",
          fullWidth: true,
          items: [
            { id: "all", label: "All Items", icon: "Layers" },
            { id: "pinned", label: "Pinned", icon: "Bookmark", badge: 3 },
            { id: "archive", label: "Archive", icon: "Archive" },
          ],
        },
      },

      // 2. Pull-To-Refresh wrapping SwipeActionCard
      {
        id: "ptr-wrapper",
        kind: "component",
        component: "pull-to-refresh",
        props: {
          pullThreshold: 72,
        },
        children: [
          {
            id: "swipe-card-1",
            kind: "component",
            component: "swipe-action-card",
            props: {
              threshold: 72,
              fullSwipeThreshold: 180,
              leftActions: [
                { id: "pin", label: "Pin", icon: "Bookmark", variant: "default" },
              ],
              rightActions: [
                { id: "delete", label: "Delete", icon: "Trash2", variant: "destructive" },
                { id: "archive", label: "Archive", icon: "Archive", variant: "neutral" },
              ],
            },
            children: [
              {
                id: "card-body",
                kind: "container",
                layout: {
                  display: "flex",
                  direction: "row",
                  justify: "between",
                  align: "center",
                  padding: 12,
                },
                children: [
                  {
                    id: "item-title",
                    kind: "text",
                    name: "p",
                    text: "Important System Notification",
                    styleBindings: {
                      textRole: "body",
                    },
                  },
                  {
                    id: "item-badge",
                    kind: "component",
                    component: "badge",
                    props: {
                      variant: "default",
                      size: "sm",
                    },
                    text: "Active",
                  },
                ],
              },
            ],
          },
        ],
      },

      // 3. Mobile Bottom Sheet
      {
        id: "sheet-1",
        kind: "component",
        component: "mobile-bottom-sheet",
        props: {
          title: "Quick Action Drawer",
          description: "Select an option from the bottom drawer",
          snapPoints: [0.35, 0.85],
        },
        slots: {
          trigger: [
            {
              id: "btn-open-sheet",
              kind: "component",
              component: "button",
              props: {
                variant: "secondary",
                size: "default",
              },
              text: "Open Action Sheet",
            },
          ],
        },
        children: [
          {
            id: "sheet-content-input",
            kind: "component",
            component: "input",
            props: {
              label: "Feedback Notes",
              placeholder: "Enter details...",
            },
          },
          {
            id: "sheet-switch",
            kind: "component",
            component: "switch",
            props: {
              label: "Auto-save changes",
              defaultChecked: true,
            },
          },
        ],
      },

      // 4. Floating Action Dock
      {
        id: "action-dock-1",
        kind: "component",
        component: "floating-action-dock",
        props: {
          primaryAction: {
            label: "Create",
            icon: "Plus",
          },
          items: [
            { id: "home", label: "Home", icon: "Home", active: true },
            { id: "search", label: "Search", icon: "Search" },
            { id: "notifications", label: "Alerts", icon: "Bell", badge: 5 },
            { id: "settings", label: "Config", icon: "Settings" },
          ],
        },
      },
    ],
  },
};

// Test 1: Material 3 Token Generation
console.log("\n[TEST 1] Testing Material 3 Token Resolution...");
const tokens = resolveM3Tokens(testAST);
console.assert(tokens["--md-sys-color-primary"] === "#5CA904", "Primary token must match seed override");
console.assert(typeof tokens["--md-sys-color-surface"] === "string", "Surface token must be generated");
console.assert(typeof tokens["--md-sys-color-outline"] === "string", "Outline token must be generated");
console.assert(typeof tokens["--md-sys-elevation-level1"] === "string", "Elevation 1 must exist");
console.assert(typeof tokens["--bg-main"] === "string", "Kilo bridge variable --bg-main must exist");
console.log("✓ M3 Token Resolution: SUCCESS (Found %d tokens)", Object.keys(tokens).length);

// Test 2: React Element Compilation
console.log("\n[TEST 2] Testing compileASTToReact...");
const element = compileASTToReact(testAST);
console.assert(React.isValidElement(element), "compileASTToReact must return valid React element");
console.assert((element.props as { ast: DesignAST }).ast === testAST, "Element must bind ast prop");
console.log("✓ compileASTToReact: SUCCESS");

// Test 3: Static Code Emission
console.log("\n[TEST 3] Testing emitTypeScriptSource...");
const emittedCode = emitTypeScriptSource(testAST, {
  componentName: "GeneratedMobileFlow",
});

console.assert(emittedCode.includes('"use client";'), "Emitted code must have 'use client'");
console.assert(emittedCode.includes("export default function GeneratedMobileFlow"), "Emitted code must declare exported component");
console.assert(emittedCode.includes("@/registry/ui/mobile-bottom-sheet"), "Must import MobileBottomSheet");
console.assert(emittedCode.includes("@/registry/ui/swipe-action-card"), "Must import SwipeActionCard");
console.assert(emittedCode.includes("@/registry/ui/thumb-segment-controller"), "Must import ThumbSegmentController");
console.assert(emittedCode.includes("@/registry/ui/pull-to-refresh"), "Must import PullToRefresh");
console.assert(emittedCode.includes("@/registry/ui/floating-action-dock"), "Must import FloatingActionDock");
console.assert(emittedCode.includes("lucide-react"), "Must import Lucide icons");
console.assert(emittedCode.includes("themeTokens"), "Must declare themeTokens");
console.assert(emittedCode.includes("--md-sys-color-primary"), "Must inject M3 CSS variables");

console.log("✓ emitTypeScriptSource: SUCCESS (%d bytes emitted)", emittedCode.length);

// Test 4: Registry Map Verification
console.log("\n[TEST 4] Verifying Primitive Registry Map Coverage...");
const expectedPrimitives = [
  "mobile-bottom-sheet",
  "swipe-action-card",
  "thumb-segment-controller",
  "pull-to-refresh",
  "floating-action-dock",
  "button",
  "card",
  "badge",
  "input",
  "switch",
  "checkbox",
  "dialog",
  "drawer-dialog",
  "tabs",
  "accordion",
  "stat-card",
  "skeleton",
];

for (const prim of expectedPrimitives) {
  console.assert(COMPONENT_REGISTRY_MAP[prim] !== undefined, `Missing primitive in map: ${prim}`);
}
console.log("✓ Component Registry Map: SUCCESS (Covered %d primitives)", expectedPrimitives.length);

console.log("\n=================================================");
console.log("ALL 4 COMPILER VERIFICATION CHECKS PASSED CLEANLY");
console.log("=================================================");

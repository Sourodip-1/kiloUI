"use client";

import * as React from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  X,
  Share2,
  Maximize2,
  Minimize2,
  ShoppingBag,
  Search,
  Activity,
  Layers,
  Key,
  Radio,
  Sliders,
  ArrowRight,
  Shield,
  Smartphone,
  ExternalLink,
  Fingerprint,
  Gauge,
  Sparkles,
  Columns,
  Square,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { M3OtpInput } from "@/registry/ui/m3-otp-input";
import { M3PhysicsLoader } from "@/components/ui/m3-physics-loader";
import { BiometricScanner } from "@/registry/ui/biometric-scanner";
import { MobileHapticStepper } from "@/registry/ui/mobile-haptic-stepper";
import { M3Switch } from "@/registry/ui/m3-switch";
import { M3Slider } from "@/registry/ui/m3-slider";
import { M3Chip } from "@/registry/ui/m3-chip";
import { M3SquigglyLoader } from "@/components/ui/m3-squiggly-loader";
import { M3Fab } from "@/registry/ui/m3-fab";
import { DynamicIslandBanner } from "@/registry/ui/dynamic-island-banner";

export type CanvasItemType =
  | "app-bar"
  | "search-bar"
  | "product-card"
  | "metric-card"
  | "biometric-scanner"
  | "otp-input"
  | "dynamic-island"
  | "haptic-stepper"
  | "segmented-tabs"
  | "action-button"
  | "fab-dial"
  | "switch-toggle"
  | "slider-control"
  | "filter-chips"
  | "loader-physics"
  | "loader-squiggly"
  | "list-stream";

export type CanvasItemSize = "full" | "half";

export interface CanvasItem {
  id: string;
  type: CanvasItemType;
  title: string;
  subtitle?: string;
  value?: string;
  variant?: string;
  tag?: string;
  size?: CanvasItemSize;
}

export interface CustomPage {
  id: string;
  name: string;
  items: CanvasItem[];
}

export const DEFAULT_PALETTE_ITEMS: {
  type: CanvasItemType;
  label: string;
  category: "actions" | "forms" | "data" | "feedback" | "navigation";
  icon: React.ReactNode;
  defaultItem: Omit<CanvasItem, "id">;
}[] = [
  {
    type: "app-bar",
    label: "Top App Bar",
    category: "navigation",
    icon: <Layers className="h-3.5 w-3.5 text-emerald-400" />,
    defaultItem: {
      type: "app-bar",
      title: "Essential Archive",
      subtitle: "Kilo Studio // Collection 2026",
      size: "full",
    },
  },
  {
    type: "search-bar",
    label: "Search Bar",
    category: "forms",
    icon: <Search className="h-3.5 w-3.5 text-blue-400" />,
    defaultItem: {
      type: "search-bar",
      title: "Search primitives & assets...",
      size: "full",
    },
  },
  {
    type: "biometric-scanner",
    label: "Biometric Sensor",
    category: "actions",
    icon: <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />,
    defaultItem: {
      type: "biometric-scanner",
      title: "Security Enclave",
      subtitle: "Touch sensor to authenticate",
      tag: "HARDWARE",
      size: "full",
    },
  },
  {
    type: "otp-input",
    label: "OTP PIN Code",
    category: "forms",
    icon: <Key className="h-3.5 w-3.5 text-amber-400" />,
    defaultItem: {
      type: "otp-input",
      title: "Two-Step Verification",
      subtitle: "Enter 6-digit confirmation PIN",
      size: "full",
    },
  },
  {
    type: "haptic-stepper",
    label: "Haptic Stepper",
    category: "actions",
    icon: <Activity className="h-3.5 w-3.5 text-rose-400" />,
    defaultItem: {
      type: "haptic-stepper",
      title: "Order Quantity",
      subtitle: "15ms damped vibration",
      value: "2",
      tag: "PCS",
      size: "half",
    },
  },
  {
    type: "switch-toggle",
    label: "Tactile Switch",
    category: "forms",
    icon: <Sliders className="h-3.5 w-3.5 text-blue-400" />,
    defaultItem: {
      type: "switch-toggle",
      title: "Hardware Enclave",
      subtitle: "Active protection",
      size: "half",
    },
  },
  {
    type: "dynamic-island",
    label: "Dynamic Island HUD",
    category: "navigation",
    icon: <Radio className="h-3.5 w-3.5 text-emerald-400" />,
    defaultItem: {
      type: "dynamic-island",
      title: "Telemetry Stream Active",
      subtitle: "12ms RTT // Edge Cluster US-East",
      size: "full",
    },
  },
  {
    type: "metric-card",
    label: "Metric Card",
    category: "data",
    icon: <Activity className="h-3.5 w-3.5 text-purple-400" />,
    defaultItem: {
      type: "metric-card",
      title: "Available Telemetry",
      value: "$14,892.40",
      subtitle: "+18.4% edge performance",
      tag: "LIVE SYNC",
      size: "full",
    },
  },
  {
    type: "product-card",
    label: "Product Card",
    category: "data",
    icon: <ShoppingBag className="h-3.5 w-3.5 text-rose-400" />,
    defaultItem: {
      type: "product-card",
      title: "Technical Shell 3L",
      subtitle: "[ MODULAR PARKA ] • Stormproof",
      value: "$245.00",
      tag: "DROP 01",
      size: "full",
    },
  },
  {
    type: "slider-control",
    label: "Haptic Slider",
    category: "forms",
    icon: <Gauge className="h-3.5 w-3.5 text-cyan-400" />,
    defaultItem: {
      type: "slider-control",
      title: "Bandwidth Throttle",
      subtitle: "Edge routing limit",
      value: "68",
      size: "full",
    },
  },
  {
    type: "segmented-tabs",
    label: "Segmented Tabs",
    category: "navigation",
    icon: <Sliders className="h-3.5 w-3.5 text-blue-400" />,
    defaultItem: {
      type: "segmented-tabs",
      title: "Navigation Tabs",
      subtitle: "All, Outerwear, Footwear",
      size: "full",
    },
  },
  {
    type: "action-button",
    label: "Action Button",
    category: "actions",
    icon: <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />,
    defaultItem: {
      type: "action-button",
      title: "Confirm & Proceed",
      subtitle: "Primary CTA 48px",
      size: "full",
    },
  },
  {
    type: "fab-dial",
    label: "FAB Speed Dial",
    category: "actions",
    icon: <Plus className="h-3.5 w-3.5 text-emerald-400" />,
    defaultItem: {
      type: "fab-dial",
      title: "Quick Dispatch",
      subtitle: "Floating action dial",
      size: "full",
    },
  },
  {
    type: "filter-chips",
    label: "Filter Chips",
    category: "navigation",
    icon: <Layers className="h-3.5 w-3.5 text-purple-400" />,
    defaultItem: {
      type: "filter-chips",
      title: "Category Filters",
      subtitle: "Material 3 • Tactile • Fast",
      size: "full",
    },
  },
  {
    type: "loader-physics",
    label: "Elastic Membrane",
    category: "feedback",
    icon: <Activity className="h-3.5 w-3.5 text-purple-400" />,
    defaultItem: {
      type: "loader-physics",
      title: "Membrane Punch-Through",
      subtitle: "Harmonic spring physics",
      size: "full",
    },
  },
  {
    type: "loader-squiggly",
    label: "Squiggly Loader",
    category: "feedback",
    icon: <Sparkles className="h-3.5 w-3.5 text-rose-400" />,
    defaultItem: {
      type: "loader-squiggly",
      title: "Sine Wave Progress",
      subtitle: "14 Harmonic waves",
      size: "full",
    },
  },
];

export const INITIAL_CUSTOM_PAGES: CustomPage[] = [
  {
    id: "custom-1",
    name: "Custom Canvas",
    items: [
      {
        id: "item-1",
        type: "app-bar",
        title: "Kilo Studio",
        subtitle: "Minimal Mobile Architecture",
        size: "full",
      },
      {
        id: "item-2",
        type: "dynamic-island",
        title: "Edge Telemetry Active",
        subtitle: "12ms RTT • Primary US-East",
        size: "full",
      },
      {
        id: "item-3",
        type: "metric-card",
        title: "Available Telemetry Credit",
        value: "$14,892.40",
        subtitle: "99.98% cluster health rating",
        tag: "ENCLAVE OK",
        size: "full",
      },
      {
        id: "item-4",
        type: "haptic-stepper",
        title: "Allocated Threads",
        value: "4",
        size: "half",
      },
      {
        id: "item-5",
        type: "switch-toggle",
        title: "Auto-Failover",
        subtitle: "Zero downtime",
        size: "half",
      },
      {
        id: "item-6",
        type: "action-button",
        title: "Authenticate Session",
        subtitle: "48px reach button",
        size: "full",
      },
    ],
  },
];

/**
 * Generates an in-depth AI design prompt from the canvas items with npm install commands & exact locations/sizes.
 */
export function generateDesignPrompt(pageName: string, items: CanvasItem[]): string {
  const componentDescriptions = items.map((item, index) => {
    const sizeLabel = item.size === "half" ? "Half-Width (50% Column)" : "Full-Width (100% Width)";
    switch (item.type) {
      case "app-bar":
        return `Slot ${index + 1} [${sizeLabel}]: **Header App Bar**: Title "${item.title}" with subtitle "${item.subtitle || ""}". Clean back navigation arrow and cart badge on right.`;
      case "search-bar":
        return `Slot ${index + 1} [${sizeLabel}]: **M3 Search Bar**: 56px rounded-full field with placeholder "${item.title}". Background var(--surface-secondary), hairline border, leading search lens icon.`;
      case "metric-card":
        return `Slot ${index + 1} [${sizeLabel}]: **Telemetry Stat Card**: Displaying metric "${item.value || "$0.00"}" for "${item.title}". Tag "${item.tag || "ACTIVE"}" with subtext "${item.subtitle || ""}".`;
      case "product-card":
        return `Slot ${index + 1} [${sizeLabel}]: **Store Hero Card**: Title "${item.title}", price "${item.value || "$0"}", with interactive 3D model container and quick action CTA button.`;
      case "biometric-scanner":
        return `Slot ${index + 1} [${sizeLabel}]: **Hardware Biometric Sensor**: Fingerprint and passkey authentication scanner with progressive scan animation and haptic pulse.`;
      case "otp-input":
        return `Slot ${index + 1} [${sizeLabel}]: **Interactive 6-Digit OTP Input**: Accessible segmented numeric boxes with spring scale transitions, auto-focus, backspace advance, and clipboard paste.`;
      case "dynamic-island":
        return `Slot ${index + 1} [${sizeLabel}]: **Dynamic Island Capsule**: Compact pill expanding into telemetry HUD with live active sound wave animation.`;
      case "haptic-stepper":
        return `Slot ${index + 1} [${sizeLabel}]: **Tactile Haptic Stepper**: Precision quantity increment/decrement with 15ms vibration feedback, directional digit glide, and bounded limits.`;
      case "segmented-tabs":
        return `Slot ${index + 1} [${sizeLabel}]: **Segmented Filter Tabs**: Rounded pill controller with options [All, Outerwear, Footwear].`;
      case "action-button":
        return `Slot ${index + 1} [${sizeLabel}]: **Primary CTA Button**: 48px reach button, rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] font-bold "${item.title}".`;
      case "switch-toggle":
        return `Slot ${index + 1} [${sizeLabel}]: **M3 Tactile Switch Tile**: Hardware toggling setting for "${item.title}".`;
      case "slider-control":
        return `Slot ${index + 1} [${sizeLabel}]: **Haptic Slider**: Range slider input for "${item.title}" with live numeric output.`;
      case "filter-chips":
        return `Slot ${index + 1} [${sizeLabel}]: **Filter Chips Cluster**: Pill-shaped Material 3 selectable chips.`;
      case "loader-physics":
        return `Slot ${index + 1} [${sizeLabel}]: **Spring Membrane Loader**: Damped harmonic oscillator elastic line with shape morph breakthrough.`;
      case "loader-squiggly":
        return `Slot ${index + 1} [${sizeLabel}]: **M3 Squiggly Loader**: 14-phase sine-wave fluid progress indicator.`;
      default:
        return `Slot ${index + 1} [${sizeLabel}]: **${item.type}**: "${item.title}"`;
    }
  });

  return `You are designing a high-craft mobile UI matching Google Material Design 3 and KiloUI minimal standards.

### 1. NPM Dependencies & Kilo CLI Installation
\`\`\`bash
# Install core packages via npm
npm i @kilo-ui/cli motion lucide-react clsx tailwind-merge

# Or install the components directly via Kilo CLI:
npx @kilo-ui/cli add mobile biometric-scanner m3-otp-input mobile-haptic-stepper dynamic-island-banner
\`\`\`

### 2. Screen Architecture & Device Frame
- **Screen Name:** ${pageName}
- **Target Viewport:** 380px x 720px Touch Viewport (Modern iOS / Pixel chassis, 44px corner radius)
- **Aesthetic Direction:** Strict minimalist obsidian theme. Zero glow, crisp hairline borders, 48px ergonomic touch reach.
- **Tokens:** Background \`#090a0a\`, Elevated Surface \`#141618\`, Secondary Surface \`#101112\`, Accent Primary \`#10b981\` (Lime/Emerald Accent), Border \`rgba(255, 255, 255, 0.08)\`.

### 3. Layout Grid & Component Placement Matrix
The layout is arranged on a responsive 2-column mobile grid (\`grid grid-cols-2 gap-2.5\`):
${items.map((item, i) => `| Slot #${i + 1} | Type: ${item.type} | Size: ${item.size === "half" ? "Half-Width (col-span-1, 50%)" : "Full-Width (col-span-2, 100%)"} | Title: "${item.title}" |`).join("\n")}

### 4. Component Hierarchy & Parameters
${componentDescriptions.join("\n")}

### 5. Implementation Instructions for AI Agents (Antigravity, Cursor, Claude Code, Codex)
1. Assemble the screen inside an iOS/Android chassis (\`w-[380px] h-[720px] rounded-[44px]\`).
2. Implement a dedicated inner scroll container (\`flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar p-3.5 pb-24 space-y-3\`).
3. Place items in a 2-column grid (\`grid grid-cols-2 gap-2.5\`), assigning \`col-span-1\` to Half-Width items and \`col-span-2\` to Full-Width items.
4. Pin the FloatingActionDock at the bottom with \`absolute inset-x-0 bottom-4 z-30 flex justify-center\`.
5. Ensure all interactive inputs (Biometric sensor, OTP 6-digit PIN, Haptic stepper) trigger immediate state updates with haptic vibration (\`navigator.vibrate\`).`;
}

/**
 * Interactive renderer for custom canvas items inside the phone chassis screen.
 */
export function MobileCanvasRenderer({
  items,
  onReorder,
  onRemove,
  onAddItem,
  onUpdateItem,
}: {
  items: CanvasItem[];
  onReorder: (index: number, direction: "up" | "down") => void;
  onRemove: (id: string) => void;
  onAddItem: (type: CanvasItemType) => void;
  onUpdateItem?: (id: string, updates: Partial<CanvasItem>) => void;
}) {
  const [otpVal, setOtpVal] = React.useState("");
  const [stepperVal, setStepperVal] = React.useState(2);
  const [switchState, setSwitchState] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState(68);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar p-3.5 font-sans text-[var(--text-primary)]">
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-[var(--border)] rounded-2xl space-y-3 my-12">
          <div className="h-10 w-10 rounded-full bg-[var(--surface-secondary)] flex items-center justify-center text-[var(--text-muted)]">
            <Plus className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold font-mono">Empty Canvas Screen</h4>
            <p className="text-[11px] text-[var(--text-muted)] max-w-xs">
              Click any component from the tray to assemble your custom mobile screen.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center pt-1">
            {DEFAULT_PALETTE_ITEMS.slice(0, 3).map((p) => (
              <button
                key={p.type}
                type="button"
                onClick={() => onAddItem(p.type)}
                className="px-2.5 py-1 rounded-lg bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border)] text-[10px] font-mono cursor-pointer flex items-center gap-1 active:scale-95 transition-all"
              >
                {p.icon}
                <span>+ {p.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 pb-28">
          {items.map((item, idx) => {
            const isHalf = item.size === "half";
            return (
              <div
                key={item.id}
                className={cn(
                  "group relative rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] transition-all duration-200 hover:border-[var(--accent-green)]/40 overflow-hidden",
                  isHalf ? "col-span-1 p-2.5" : "col-span-2 p-3"
                )}
              >
                {/* Floating Item Toolbar (Hover & Touch Active) */}
                <div className="absolute right-1 top-1 z-20 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--surface-secondary)]/95 backdrop-blur-md rounded-lg p-0.5 border border-[var(--border)] shadow-md">
                  {/* Toggle Width: Full vs Half */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateItem?.(item.id, { size: isHalf ? "full" : "half" });
                    }}
                    className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] cursor-pointer text-[10px] font-mono"
                    title={isHalf ? "Expand to Full Width" : "Compact to Half Width"}
                  >
                    {isHalf ? <Square className="h-3 w-3" /> : <Columns className="h-3 w-3" />}
                  </button>

                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorder(idx, "up");
                    }}
                    className={cn(
                      "p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] cursor-pointer",
                      idx === 0 && "opacity-30 cursor-not-allowed"
                    )}
                    title="Move up"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorder(idx, "down");
                    }}
                    className={cn(
                      "p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] cursor-pointer",
                      idx === items.length - 1 && "opacity-30 cursor-not-allowed"
                    )}
                    title="Move down"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {/* Delete Item */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    className="p-1 rounded text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                    title="Remove component"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>

                {/* Component Specific Renderers */}
                {item.type === "app-bar" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                        {item.subtitle || "Kilo Studio"}
                      </span>
                      <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-xs">
                      <ShoppingBag className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    </div>
                  </div>
                )}

                {item.type === "search-bar" && (
                  <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)]/60 px-3 py-2 text-xs text-[var(--text-muted)]">
                    <Search className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </div>
                )}

                {item.type === "biometric-scanner" && (
                  <div className="py-1">
                    <BiometricScanner
                      variant={isHalf ? "minimal" : "pill"}
                      size={isHalf ? "sm" : "md"}
                      label={item.title}
                      sublabel={isHalf ? undefined : item.subtitle}
                    />
                  </div>
                )}

                {item.type === "haptic-stepper" && (
                  <div className="space-y-1.5 py-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)] truncate">{item.title}</span>
                      <span className="text-[var(--accent-green)] font-bold">{stepperVal} pcs</span>
                    </div>
                    <MobileHapticStepper
                      variant="compact"
                      size="sm"
                      value={stepperVal}
                      onChange={setStepperVal}
                      min={0}
                      max={20}
                    />
                  </div>
                )}

                {item.type === "switch-toggle" && (
                  <div className="flex items-center justify-between py-1">
                    <div className="min-w-0 pr-2">
                      <span className="text-xs font-semibold block truncate">{item.title}</span>
                      {item.subtitle && !isHalf && (
                        <span className="text-[10px] text-[var(--text-muted)] block truncate">{item.subtitle}</span>
                      )}
                    </div>
                    <M3Switch
                      checked={switchState}
                      onChange={setSwitchState}
                    />
                  </div>
                )}

                {item.type === "slider-control" && (
                  <div className="space-y-1.5 py-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)]">{item.title}</span>
                      <span className="text-[var(--accent-green)] font-bold">{sliderVal}%</span>
                    </div>
                    <M3Slider
                      value={sliderVal}
                      onChange={setSliderVal}
                      min={0}
                      max={100}
                    />
                  </div>
                )}

                {item.type === "filter-chips" && (
                  <div className="flex flex-wrap gap-1.5 py-1">
                    <M3Chip selected>Material 3</M3Chip>
                    <M3Chip>Tactile</M3Chip>
                    <M3Chip>Obsidian</M3Chip>
                  </div>
                )}

                {item.type === "fab-dial" && (
                  <div className="flex items-center justify-between py-1">
                    <div className="min-w-0 pr-2">
                      <span className="text-xs font-semibold block truncate">{item.title}</span>
                      <span className="text-[10px] text-[var(--text-muted)] block truncate">{item.subtitle}</span>
                    </div>
                    <M3Fab size="sm" variant="primary" label="Action" />
                  </div>
                )}

                {item.type === "dynamic-island" && (
                  <div className="py-0.5">
                    <DynamicIslandBanner
                      variant="compact-pill"
                      title={item.title}
                      subtitle={item.subtitle}
                    />
                  </div>
                )}

                {item.type === "metric-card" && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">{item.title}</span>
                      {item.tag && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--accent-green)] font-semibold shrink-0">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-xl font-bold tracking-tight font-mono">{item.value || "$0.00"}</div>
                    {item.subtitle && !isHalf && (
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block">{item.subtitle}</span>
                    )}
                  </div>
                )}

                {item.type === "product-card" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                        {item.tag || "DROP 01"}
                      </span>
                      <span className="text-xs font-bold font-mono text-[var(--accent-green)]">{item.value || "$0"}</span>
                    </div>
                    <div className="text-xs font-bold truncate">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-[10px] text-[var(--text-muted)] font-mono truncate">{item.subtitle}</div>
                    )}
                  </div>
                )}

                {item.type === "otp-input" && (
                  <div className="space-y-2 py-1">
                    <div className="text-xs font-bold">{item.title}</div>
                    <div className="flex justify-center">
                      <M3OtpInput
                        length={isHalf ? 4 : 6}
                        value={otpVal}
                        onChange={setOtpVal}
                        size={isHalf ? "sm" : "md"}
                      />
                    </div>
                  </div>
                )}

                {item.type === "segmented-tabs" && (
                  <div className="space-y-1 py-1">
                    <div className="flex rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-0.5 text-[11px] font-mono">
                      <button type="button" className="flex-1 py-1 text-center font-bold bg-[var(--surface-elevated)] rounded shadow-2xs">
                        All
                      </button>
                      <button type="button" className="flex-1 py-1 text-center text-[var(--text-muted)]">
                        Shell
                      </button>
                      <button type="button" className="flex-1 py-1 text-center text-[var(--text-muted)]">
                        Boot
                      </button>
                    </div>
                  </div>
                )}

                {item.type === "action-button" && (
                  <button
                    type="button"
                    className="w-full h-10 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer select-none"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}

                {item.type === "loader-physics" && (
                  <div className="py-2 flex flex-col items-center justify-center space-y-1">
                    <M3PhysicsLoader variant="shape-morph" theme="google" size={40} />
                    <span className="text-[9px] font-mono text-[var(--text-muted)]">Harmonic Spring</span>
                  </div>
                )}

                {item.type === "loader-squiggly" && (
                  <div className="py-2 flex flex-col items-center justify-center space-y-1">
                    <M3SquigglyLoader variant="horizontal" squiggles={10} amplitude={3} color="google" />
                    <span className="text-[9px] font-mono text-[var(--text-muted)]">Sine Wave</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Component Palette Tray for adding new items with category filter tabs.
 */
export function CanvasPaletteTray({
  onAdd,
}: {
  onAdd: (type: CanvasItemType) => void;
}) {
  const [activeTab, setActiveTab] = React.useState<"all" | "actions" | "forms" | "data" | "feedback" | "navigation">("all");

  const filteredItems = DEFAULT_PALETTE_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 space-y-3 font-mono text-xs select-none shadow-xs">
      <div className="flex items-center justify-between pb-1 border-b border-[var(--border)]">
        <h4 className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[11px]">
          Add Components
        </h4>
        <span className="text-[10px] text-[var(--text-muted)]">Click to insert</span>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[10px]">
        {[
          { id: "all", label: "All" },
          { id: "actions", label: "Actions" },
          { id: "forms", label: "Forms" },
          { id: "data", label: "Data" },
          { id: "navigation", label: "Nav" },
          { id: "feedback", label: "Loaders" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-2 py-0.5 rounded-md whitespace-nowrap transition-colors cursor-pointer",
              activeTab === tab.id
                ? "bg-[var(--accent-green)] text-[var(--bg-main)] font-bold"
                : "bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
        {filteredItems.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => onAdd(item.type)}
            className="flex items-center gap-1.5 p-2 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border)] hover:border-[var(--accent-green)]/40 text-left transition-all cursor-pointer group active:scale-95"
          >
            <div className="shrink-0 p-1 rounded-md bg-[var(--surface-elevated)] group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <span className="truncate text-[11px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Fullscreen Centered Focus Studio Modal.
 */
export function MobileStudioFocusModal({
  isOpen,
  onClose,
  activePageName,
  pages,
  activePageId,
  onSelectPage,
  onNewPage,
  onExportPrompt,
  onAddPaletteItem,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  activePageName: string;
  pages: CustomPage[];
  activePageId: string;
  onSelectPage: (id: string) => void;
  onNewPage: () => void;
  onExportPrompt: () => void;
  onAddPaletteItem: (type: CanvasItemType) => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060708]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Top Studio Control Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-[var(--border)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            KS
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold font-sans tracking-tight text-[var(--text-primary)]">
              Mobile Studio Focus
            </h2>
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              Custom Canvas Mode • {activePageName}
            </p>
          </div>
        </div>

        {/* Page Switcher Tabs */}
        <div className="hidden sm:flex items-center gap-1 font-mono text-xs">
          {pages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPage(p.id)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                activePageId === p.id
                  ? "bg-[var(--accent-green)] text-[var(--bg-main)] font-bold shadow-xs"
                  : "bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={onNewPage}
            className="px-2 py-1 rounded-lg bg-[var(--surface-secondary)] border border-dashed border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-green)] text-xs cursor-pointer active:scale-95 transition-all"
            title="Create new custom mobile screen"
          >
            + Page
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportPrompt}
            className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-green)] text-[var(--bg-main)] font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Export structured AI prompt"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Copy Prompt</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center cursor-pointer transition-all active:scale-95"
            title="Close focus mode (Esc)"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Center Area: Centered Phone Simulator + Palette Side/Bottom */}
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 py-6">
        {/* Centered Phone Container */}
        <div className="shrink-0 flex items-center justify-center relative">{children}</div>

        {/* Palette Inspector on Side for Custom Building */}
        <div className="w-full lg:w-80 space-y-4">
          <CanvasPaletteTray onAdd={onAddPaletteItem} />

          <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2 font-mono text-xs select-none shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>Screen Engine</span>
              <span className="text-[var(--accent-green)] font-bold">M3 Tactile</span>
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Use the <span className="text-white font-semibold">Copy Prompt</span> button above to copy the npm install command, component sizing matrix, and ready-to-run layout for other AI agents.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Prompt Export Dialog / Sheet.
 */
export function PromptExportModal({
  isOpen,
  onClose,
  prompt,
}: {
  isOpen: boolean;
  onClose: () => void;
  prompt: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 flex flex-col space-y-4 shadow-2xl overflow-hidden font-sans select-none">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Customized AI Agent Prompt</h3>
              <p className="text-[11px] text-[var(--text-muted)] font-mono">
                Includes NPM setup, component matrix, layout coordinates &amp; sizing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Code / Markdown View */}
        <div className="flex-1 overflow-y-auto rounded-xl bg-black/80 border border-[var(--border)] p-4 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed select-text custom-scrollbar">
          {prompt}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>npm i @kilo-ui/cli</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-xl bg-[var(--accent-green)] text-[var(--bg-main)] font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Customized Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

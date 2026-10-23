"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Copy,
  Check,
  Code2,
  SlidersHorizontal,
  RotateCw,
  X,
  Layers,
  ArrowRight,
  Download,
  Sparkles,
  Maximize2,
  Palette,
  Terminal,
  ChevronRight,
  Filter,
} from "lucide-react";
import { ICONS_DATA, ICON_CATEGORIES, AnimatedIcon, IconCategory } from "@/registry/icons-data";
import { useAppShell } from "@/components/app-shell";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import { cn } from "@/lib/utils";

const ACCENT_PRESETS = [
  { name: "Sage Mint (Default)", hex: "#8bc49a" },
  { name: "Terminal Emerald", hex: "#4ade80" },
  { name: "Ice Cyan", hex: "#38bdf8" },
  { name: "Studio Violet", hex: "#a78bfa" },
  { name: "Solar Amber", hex: "#fbbf24" },
  { name: "Rose Coral", hex: "#fb7185" },
  { name: "Monochrome Slate", hex: "#e2e8f0" },
];

export default function IconPackPage() {
  const { theme } = useAppShell();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [triggerMode, setTriggerMode] = React.useState<"hover" | "loop">("hover");
  const [accentColor, setAccentColor] = React.useState("#8bc49a");
  const [strokeWidth, setStrokeWidth] = React.useState<number>(1.5);
  const [previewSize, setPreviewSize] = React.useState<number>(24);
  const [selectedIcon, setSelectedIcon] = React.useState<AnimatedIcon>(ICONS_DATA[0]);
  const [inspectorTab, setInspectorTab] = React.useState<"tsx" | "svg" | "css">("tsx");
  const [inspectorZoom, setInspectorZoom] = React.useState<number>(3);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [localToast, setLocalToast] = React.useState<string | null>(null);

  const toastTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const showToast = React.useCallback(
    (msg: string) => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setLocalToast(msg);
      toastTimerRef.current = setTimeout(() => {
        setLocalToast(null);
      }, 2000);
    },
    []
  );

  // Filtered icons
  const filteredIcons = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ICONS_DATA.filter((icon) => {
      const matchesCat = selectedCategory === "all" || icon.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        icon.name.toLowerCase().includes(q) ||
        icon.id.toLowerCase().includes(q) ||
        icon.animType.toLowerCase().includes(q) ||
        icon.tags?.some((t) => t.toLowerCase().includes(q)) ||
        String(icon.num) === q ||
        `#${icon.num}`.includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (text: string, message: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (key) {
        setCopiedId(key);
        setTimeout(() => setCopiedId(null), 1800);
      }
      showToast(message);
    } catch {
      showToast("Unable to copy to clipboard");
    }
  };

  const getCleanSvgSnippet = React.useCallback(
    (icon: AnimatedIcon) => {
      return icon.svg
        .replace('class="kilo-icon dev-icon"', `width="${previewSize}" height="${previewSize}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`)
        .replace(/class="dev-icon"/g, `width="${previewSize}" height="${previewSize}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`);
    },
    [previewSize, strokeWidth]
  );

  const getReactTsxSnippet = React.useCallback(
    (icon: AnimatedIcon) => {
      const compName = icon.name
        .replace(/[^a-zA-Z0-9]/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("") + "Icon";

      return `"use client";

import * as React from "react";

export interface ${compName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
  primaryColor?: string;
  accentColor?: string;
  animate?: "hover" | "always" | "never";
}

export function ${compName}({
  size = ${previewSize},
  strokeWidth = ${strokeWidth},
  primaryColor = "currentColor",
  accentColor = "${accentColor}",
  animate = "hover",
  className,
  ...props
}: ${compName}Props) {
  return (
    <div
      data-trigger={animate === "always" ? "loop" : animate === "hover" ? "hover" : "none"}
      className="inline-flex dev-card"
      style={{
        "--icon-primary": primaryColor,
        "--icon-accent": accentColor,
        "--icon-stroke-width": \`\${strokeWidth}px\`,
      } as React.CSSProperties}
    >
      <div style={{ width: size, height: size }}>
        ${icon.svg}
      </div>
    </div>
  );
}`;
    },
    [previewSize, strokeWidth, accentColor]
  );

  const getCssKeyframeSnippet = React.useCallback((icon: AnimatedIcon) => {
    return `/* kilo/icons — Pure CSS Keyframe Animation for ${icon.name} */
:root {
  --icon-primary: var(--text-primary, #ffffff);
  --icon-accent: var(--accent-green, #8bc49a);
  --icon-stroke-width: 1.5px;
}

.kilo-icon {
  width: 24px;
  height: 24px;
  overflow: visible;
}

.kilo-icon .stroke-primary {
  stroke: var(--icon-primary);
  stroke-width: var(--icon-stroke-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.kilo-icon .stroke-accent {
  stroke: var(--icon-accent);
  stroke-width: var(--icon-stroke-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* Interaction: ${icon.animType} */
.dev-card:hover .kilo-icon {
  /* GPU keyframes active */
}`;
  }, []);

  const downloadSvgFile = (icon: AnimatedIcon) => {
    const svgCode = getCleanSvgSnippet(icon);
    const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${icon.id}-icon.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${icon.id}-icon.svg`);
  };

  return (
    <div
      data-trigger={triggerMode}
      style={
        {
          "--icon-primary": theme === "light" ? "#0f172a" : "#ededed",
          "--primary-color": theme === "light" ? "#0f172a" : "#ededed",
          "--icon-accent": accentColor,
          "--accent-color": accentColor,
          "--icon-stroke-width": `${strokeWidth}px`,
          "--stroke-width": `${strokeWidth}px`,
        } as React.CSSProperties
      }
      className="flex-1 w-full h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden"
    >
      {/* 1. Slim Studio Header Bar (Anchored at Top, No Scrolling) */}
      <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Count */}
        <div className="flex items-center gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5">
              <span>kilo</span>
              <span className="text-[var(--accent-green)] font-semibold">/</span>
              <span>ui</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">icons</span>
          </nav>

          <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <span>kilo/icons</span>
              <span className="text-[10px] font-normal px-1.5 py-0.2 rounded border border-[var(--border)] text-[var(--accent-green)]">
                v1.0
              </span>
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)] hidden md:inline">
              • 100 Animated Vector Primitives
            </span>
          </div>
        </div>

        {/* Center: Real-Time Fuzzy Search Input */}
        <div className="relative w-full sm:w-80 order-3 sm:order-2">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons (e.g. terminal, git, lock)..."
            className="w-full h-7.5 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)]/50 pl-8 pr-7 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
          <span className="font-mono text-[11px] text-[var(--text-muted)] hidden lg:inline">
            Showing <strong className="text-[var(--text-primary)]">{filteredIcons.length}</strong> / 100
          </span>
          <button
            type="button"
            onClick={() => {
              const bundle = ICONS_DATA.map((i) => `<!-- ${i.name} (${i.id}) -->\n${i.svg}`).join("\n\n");
              copyToClipboard(bundle, "Copied all 100 SVGs to clipboard!");
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-xs font-mono text-[var(--text-primary)] transition-all active:scale-95 shadow-2xs"
          >
            <Copy className="h-3 w-3 text-[var(--accent-green)]" />
            <span>Copy All SVGs</span>
          </button>
        </div>
      </div>

      {/* 2. Studio Body (Left: Icons Canvas Above-The-Fold | Right: Studio Panel) */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* LEFT STAGE: The Icons Grid (Immediate View Above-the-Fold, Zero Required Scroll) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
            {filteredIcons.map((icon) => {
              const isSelected = selectedIcon?.id === icon.id;
              return (
                <div
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon)}
                  className={cn(
                    "kilo-icon-tile dev-card group relative flex flex-col items-center justify-between p-3 rounded-xl border transition-all duration-150 cursor-pointer aspect-square select-none",
                    isSelected
                      ? "border-[var(--accent-green)] bg-[var(--surface-secondary)]/80 ring-1 ring-[var(--accent-green)]/30 shadow-md scale-[1.02]"
                      : "border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)]/60 hover:border-[var(--border-hover)]"
                  )}
                >
                  {/* Top Bar of Tile: Number + Micro Indicator */}
                  <div className="w-full flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                      #{icon.num}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                    )}
                  </div>

                  {/* Center: The Precision Icon Preview */}
                  <div
                    className="flex-1 flex items-center justify-center w-full my-1 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      width: `${Math.max(previewSize, 24)}px`,
                      height: `${Math.max(previewSize, 24)}px`,
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: icon.svg }}
                    />
                  </div>

                  {/* Bottom: Icon Label */}
                  <div className="w-full text-center">
                    <span className="font-mono text-[11px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] font-medium truncate block max-w-full">
                      {icon.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="p-12 text-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-elevated)] space-y-3 mt-8">
              <Search className="h-8 w-8 text-[var(--text-muted)] mx-auto opacity-50" />
              <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                No primitives found
              </h3>
              <p className="font-mono text-xs text-[var(--text-muted)]">
                No icons matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] font-mono text-xs text-[var(--text-primary)] hover:border-[var(--accent-green)] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE PANEL: Categories, Customizers & Live Icon Inspector */}
        <aside className="w-80 lg:w-96 shrink-0 border-l border-[var(--border)] bg-[var(--surface-elevated)]/60 flex flex-col overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Section A: Selected Icon Live Stage & Quick Export */}
          <div className="space-y-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--accent-green)] border border-[var(--border)] font-semibold">
                  #{selectedIcon.num}
                </span>
                <h2 className="font-mono text-sm font-bold text-[var(--text-primary)]">
                  {selectedIcon.name}
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                {selectedIcon.category}
              </span>
            </div>

            {/* Live Interactive Canvas */}
            <div className="flex flex-col items-center justify-center p-6 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] dev-card relative group">
              <div
                style={{
                  width: `${24 * inspectorZoom}px`,
                  height: `${24 * inspectorZoom}px`,
                }}
                className="transition-transform duration-200"
                dangerouslySetInnerHTML={{ __html: selectedIcon.svg }}
              />

              {/* Zoom Controls Overlay */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 font-mono text-[10px] bg-[var(--surface-secondary)]/90 backdrop-blur-xs border border-[var(--border)] rounded px-1.5 py-0.5">
                {[1, 2, 3, 4].map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setInspectorZoom(z)}
                    className={cn(
                      "px-1 rounded transition-colors select-none",
                      inspectorZoom === z
                        ? "text-[var(--accent-green)] font-bold"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
              <span>{selectedIcon.animType}</span>
            </div>

            {/* Quick Export Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    getReactTsxSnippet(selectedIcon),
                    `Copied ${selectedIcon.name} React Component!`,
                    "panel-tsx"
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-xs font-mono text-[var(--text-primary)] transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                {copiedId === "panel-tsx" ? (
                  <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                ) : (
                  <Code2 className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                )}
                <span>React TSX</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    getCleanSvgSnippet(selectedIcon),
                    `Copied ${selectedIcon.name} SVG!`,
                    "panel-svg"
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-xs font-mono text-[var(--text-primary)] transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                {copiedId === "panel-svg" ? (
                  <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                )}
                <span>Copy SVG</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => downloadSvgFile(selectedIcon)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              <Download className="h-3 w-3" />
              <span>Download .svg file</span>
            </button>
          </div>

          {/* Section B: Studio Customizer Controls */}
          <div className="space-y-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
            <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent-green)]" />
              <span>Studio Properties</span>
            </h3>

            {/* Stroke Width Toggle */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Stroke Width:</span>
              <div className="inline-flex items-center p-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)]/60 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStrokeWidth(1.5)}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all select-none",
                    strokeWidth === 1.5
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  1.5px
                </button>
                <button
                  type="button"
                  onClick={() => setStrokeWidth(2.0)}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all select-none",
                    strokeWidth === 2.0
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  2.0px
                </button>
              </div>
            </div>

            {/* Size Switcher */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Grid Size:</span>
              <div className="inline-flex items-center p-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)]/60 text-[11px]">
                {[16, 20, 24, 32].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreviewSize(s)}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-all select-none",
                      previewSize === s
                        ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Mode */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Animation:</span>
              <div className="inline-flex items-center p-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)]/60 text-[11px]">
                <button
                  type="button"
                  onClick={() => setTriggerMode("hover")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all select-none",
                    triggerMode === "hover"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  Hover
                </button>
                <button
                  type="button"
                  onClick={() => setTriggerMode("loop")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all select-none flex items-center gap-1",
                    triggerMode === "loop"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  <RotateCw className="h-2.5 w-2.5 text-[var(--accent-green)]" />
                  <span>Loop</span>
                </button>
              </div>
            </div>

            {/* Theme Accent Swatches */}
            <div className="pt-2 border-t border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--text-muted)]">Theme Accent:</span>
                <button
                  type="button"
                  onClick={() => setAccentColor("#8bc49a")}
                  className="text-[10px] text-[var(--accent-green)] hover:underline"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                {ACCENT_PRESETS.map((preset) => {
                  const isSelected = accentColor.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setAccentColor(preset.hex)}
                      className={cn(
                        "w-5 h-5 rounded-full transition-all cursor-pointer flex items-center justify-center relative",
                        isSelected
                          ? "ring-2 ring-offset-2 ring-offset-[var(--surface-elevated)] scale-110 shadow-xs"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      )}
                      style={
                        {
                          backgroundColor: preset.hex,
                          "--tw-ring-color": preset.hex,
                        } as React.CSSProperties
                      }
                      title={preset.name}
                      aria-label={preset.name}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black/60 shadow-xs" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section C: Category Navigation */}
          <div className="space-y-2.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
            <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[var(--accent-green)]" />
              <span>Categories</span>
            </h3>

            <div className="space-y-1">
              {ICON_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer text-left",
                      isSelected
                        ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold border border-[var(--border)] shadow-2xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)] rounded bg-[var(--surface-elevated)] border border-[var(--border)] px-1.5 py-0.2">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Toast Notification */}
      {localToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-md text-xs font-mono text-[var(--text-primary)] shadow-xl animate-fade-rise">
          <Check className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
          <span>{localToast}</span>
        </div>
      )}
    </div>
  );
}

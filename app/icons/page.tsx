"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Check,
  Copy,
  Sparkles,
  Layers,
  Box,
  RotateCcw,
  SlidersHorizontal,
  Play,
  MousePointer,
  Repeat,
} from "lucide-react";
import { ICONS_LIST, IconItem } from "@/registry/icons-data";
import { cn } from "@/lib/utils";

/** Master keyframe CSS ensuring all 41 SVG loaders animate smoothly at 60fps */
const MASTER_LOADER_CSS = `
  .ui-ldr {
    width: 100%;
    height: 100%;
    overflow: visible;
    display: block;
  }
  .ui-ldr * {
    transform-box: view-box;
    transform-origin: 32px 32px;
  }
  .ui-ldr .origin-self {
    transform-box: fill-box !important;
    transform-origin: center !important;
  }
  .ui-ldr .origin-bottom {
    transform-box: fill-box !important;
    transform-origin: bottom center !important;
  }
  .ui-ldr .origin-top {
    transform-box: fill-box !important;
    transform-origin: top center !important;
  }

  /* Rotations */
  @keyframes u-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes u-spin-rev {
    to { transform: rotate(-360deg); }
  }
  @keyframes u-spin-elastic {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(220deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes u-flip-step {
    0%, 25% { transform: rotate(0deg); }
    50%, 75% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

  /* Stroke Dash Sweeps */
  @keyframes u-sweep {
    0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
    50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
    100% { stroke-dasharray: 90, 150; stroke-dashoffset: -125; }
  }
  @keyframes u-dash-flow {
    to { stroke-dashoffset: -128; }
  }
  @keyframes u-trace-io {
    0% { stroke-dashoffset: 140; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -140; }
  }

  /* Bounces, Squash & Stretch */
  @keyframes u-bounce-y {
    0%, 100% { transform: translateY(8px) scale(1.12, 0.88); }
    50% { transform: translateY(-10px) scale(0.92, 1.08); }
  }
  @keyframes u-dot-wave {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }
  @keyframes u-shadow-scale {
    0%, 100% { transform: scaleX(1.15); opacity: 0.45; }
    50% { transform: scaleX(0.5); opacity: 0.12; }
  }
  @keyframes u-cradle-left {
    0%, 50%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(28deg); }
  }
  @keyframes u-cradle-right {
    0%, 50%, 100% { transform: rotate(0deg); }
    75% { transform: rotate(-28deg); }
  }
  @keyframes u-leap-a {
    0% { transform: translate(0, 0); }
    25% { transform: translate(11px, -11px); }
    50% { transform: translate(22px, 0); }
    75% { transform: translate(11px, 11px); }
    100% { transform: translate(0, 0); }
  }
  @keyframes u-leap-b {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-11px, 11px); }
    50% { transform: translate(-22px, 0); }
    75% { transform: translate(-11px, -11px); }
    100% { transform: translate(0, 0); }
  }

  /* Scales, Pulses & Ripples */
  @keyframes u-pulse {
    0%, 100% { transform: scale(0.78); opacity: 0.45; }
    50% { transform: scale(1.06); opacity: 1; }
  }
  @keyframes u-ripple {
    0% { transform: scale(0.15); opacity: 1; }
    100% { transform: scale(1.15); opacity: 0; }
  }
  @keyframes u-bar-eq {
    0%, 100% { transform: scaleY(0.28); }
    50% { transform: scaleY(1); }
  }

  /* Squares, Rolls & Shuffles */
  @keyframes u-roll-box {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(45deg); }
    50% { transform: translateY(0) rotate(90deg); }
    75% { transform: translateY(-8px) rotate(135deg); }
    100% { transform: translateY(0) rotate(180deg); }
  }
  @keyframes u-grid-shuffle {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(20px, 0); }
    50% { transform: translate(20px, 20px); }
    75% { transform: translate(0, 20px); }
  }
  @keyframes u-corners {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.22); }
  }

  /* Wipes & Indeterminate Bars */
  @keyframes u-wipe-x {
    0% { transform: translateX(-100%) scaleX(0.2); }
    50% { transform: translateX(0%) scaleX(0.65); }
    100% { transform: translateX(100%) scaleX(0.2); }
  }
  @keyframes u-pill-toggle {
    0%, 100% { transform: translateX(-9px); }
    50% { transform: translateX(9px); }
  }
  @keyframes u-curtain-y {
    0% { transform: scaleY(0); transform-origin: bottom; }
    45% { transform: scaleY(1); transform-origin: bottom; }
    55% { transform: scaleY(1); transform-origin: top; }
    100% { transform: scaleY(0); transform-origin: top; }
  }
  @keyframes u-pendulum {
    0%, 100% { transform: rotate(-30deg); }
    50% { transform: rotate(30deg); }
  }
  @keyframes u-fade-step {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.15; }
  }

  /* VECTR Morphing Vector & App Icons (.v-ico) */
  .v-ico {
    width: 100%;
    height: 100%;
    overflow: visible;
    display: block;
    fill: none;
    stroke: var(--ldr-pri, #6366f1);
    stroke-width: var(--ico-sw, 2px);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .v-ico * {
    transition: transform calc(var(--ico-dur, 0.42s) / var(--ldr-spd, 1)) var(--ico-ease, cubic-bezier(0.34, 1.56, 0.64, 1)),
                opacity calc(0.28s / var(--ldr-spd, 1)) ease,
                stroke-dashoffset calc(var(--ico-dur, 0.42s) / var(--ldr-spd, 1)) ease,
                stroke calc(0.25s / var(--ldr-spd, 1)) ease,
                fill calc(0.25s / var(--ldr-spd, 1)) ease;
    transform-box: view-box;
    transform-origin: 12px 12px;
  }
  .v-ico .trk {
    stroke: var(--ldr-sec, #27272a);
  }
  .v-ico .fill-pri {
    fill: var(--ldr-pri, #6366f1);
    stroke: none;
  }
  .v-ico .origin-self {
    transform-box: fill-box !important;
    transform-origin: center !important;
  }
  .v-ico .origin-bottom {
    transform-box: fill-box !important;
    transform-origin: bottom center !important;
  }
  .v-ico .origin-top {
    transform-box: fill-box !important;
    transform-origin: top center !important;
  }
  .v-ico .origin-left {
    transform-box: fill-box !important;
    transform-origin: center left !important;
  }

  /* Active / Hover State Transformations */
  .v-ico.is-active .t-y6 { transform: translateY(6px); }
  .v-ico.is-active .t-ny6 { transform: translateY(-6px); }
  .v-ico.is-active .t-y4 { transform: translateY(4px); }
  .v-ico.is-active .t-ny4 { transform: translateY(-4px); }
  .v-ico.is-active .t-y2 { transform: translateY(2px); }
  .v-ico.is-active .t-ny2 { transform: translateY(-2px); }
  .v-ico.is-active .t-ny3 { transform: translateY(-3px); }
  .v-ico.is-active .t-x3 { transform: translateX(3px); }
  .v-ico.is-active .t-nx3 { transform: translateX(-3px); }
  .v-ico.is-active .t-x5 { transform: translateX(5px); }
  .v-ico.is-active .t-nx5 { transform: translateX(-5px); }

  .v-ico.is-active .r-45 { transform: rotate(45deg); }
  .v-ico.is-active .r-n45 { transform: rotate(-45deg); }
  .v-ico.is-active .r-90 { transform: rotate(90deg); }
  .v-ico.is-active .r-180 { transform: rotate(180deg); }
  .v-ico.is-active .r-n180 { transform: rotate(-180deg); }
  .v-ico.is-active .r-135 { transform: rotate(135deg); }
  .v-ico.is-active .r-45-y6 { transform: translateY(6px) rotate(45deg); }
  .v-ico.is-active .r-n45-ny6 { transform: translateY(-6px) rotate(-45deg); }
  .v-ico.is-active .r-45-y4 { transform: translateY(4px) rotate(45deg); }
  .v-ico.is-active .r-n45-ny4 { transform: translateY(-4px) rotate(-45deg); }

  .v-ico.is-active .s-0 { transform: scale(0); opacity: 0; }
  .v-ico.is-active .s-x0 { transform: scaleX(0); opacity: 0; }
  .v-ico.is-active .s-125 { transform: scale(1.22); }
  .v-ico.is-active .s-115 { transform: scale(1.14); }
  .v-ico.is-active .s-80 { transform: scale(0.8); }
  .v-ico.is-active .op-0 { opacity: 0; }
  .v-ico.is-active .op-100 { opacity: 1 !important; }
  .v-ico .op-init-0 { opacity: 0; transform: scale(0.5); }
  .v-ico.is-active .op-init-0 { opacity: 1; transform: scale(1); }

  /* Specialized App & Menu Morph Helpers */
  .v-ico.is-active .flap-open { transform: rotateX(45deg) translateY(-2.5px); }
  .v-ico.is-active .lid-lift { transform: translateY(-3px) rotate(-14deg); }
  .v-ico.is-active .card-pop { transform: translate(2.5px, -3.5px) rotate(-6deg); }
  .v-ico.is-active .bell-swing { transform: rotate(16deg); }
  .v-ico.is-active .clapper-shift { transform: translateX(-2.5px); }
  .v-ico.is-active .shackle-unlock { transform: translateY(-3px) rotate(16deg); }
  .v-ico.is-active .bar-grow-1 { transform: scaleY(1.45); }
  .v-ico.is-active .bar-grow-2 { transform: scaleY(0.65); }
  .v-ico.is-active .bar-grow-3 { transform: scaleY(1.3); }
  .v-ico.is-active .pie-pop { transform: translate(2.5px, -2.5px); }
  .v-ico.is-active .dash-draw { stroke-dashoffset: 0 !important; }
  .v-ico.is-active .rocket-boost { transform: translate(2.5px, -2.5px) scale(1.06); }
  .v-ico.is-active .arrow-up-Right { transform: translate(2.5px, -2.5px); }
`;

/**
 * VectrMenuIconCard: Isolated card component for interactive state-morphing menu & app icons.
 * Crucial: Keeps the SVG permanently in the DOM and toggles `.is-open` and `.is-active` via classList mutation,
 * allowing CSS cubic-bezier transitions to smoothly animate without DOM destruction/re-render glitch.
 */
function VectrMenuIconCard({
  icon,
  triggerMode,
  speed,
  color,
  size,
  autoplayPhase,
  onCopy,
}: {
  icon: any;
  triggerMode: "click" | "hover" | "loop";
  speed: number;
  color: string;
  size: number;
  autoplayPhase: boolean;
  onCopy: (name: string, snippet: string) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const effectiveOpen = triggerMode === "loop" ? autoplayPhase : internalOpen;

  // Memoized SVG string — re-rendered ONLY when color, speed, or size customization changes
  const svgHtml = React.useMemo(() => {
    let raw = icon.svgString || icon.standaloneSvg || icon.htmlSnippet || "";
    // Strip inline event attributes so they won't conflict with our React handlers
    raw = raw
      .replace(/onclick="[^"]*"/g, "")
      .replace(/onmouseenter="[^"]*"/g, "")
      .replace(/onmouseleave="[^"]*"/g, "");
    if (color) {
      raw = raw.replaceAll("#6366f1", color);
    }
    if (speed !== 1) {
      raw = raw.replaceAll("0.38s", `${(0.38 / speed).toFixed(2)}s`);
      raw = raw.replaceAll("--ldr-spd:1", `--ldr-spd:${speed}`);
    }
    raw = raw
      .replace(/width="[0-9]+"/, `width="${size}"`)
      .replace(/height="[0-9]+"/, `height="${size}"`);
    return raw;
  }, [icon.svgString, icon.standaloneSvg, icon.htmlSnippet, color, speed, size]);

  // Direct DOM class toggle preserves CSS keyframe & cubic-bezier transitions!
  React.useEffect(() => {
    const svgEl = containerRef.current?.querySelector(".vm-icon, .v-ico");
    if (svgEl) {
      if (effectiveOpen) {
        svgEl.classList.add("is-open");
        svgEl.classList.add("is-active");
      } else {
        svgEl.classList.remove("is-open");
        svgEl.classList.remove("is-active");
      }
    }
  }, [effectiveOpen]);

  const handleClick = () => {
    if (triggerMode === "click") {
      setInternalOpen((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (triggerMode === "hover") {
      setInternalOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerMode === "hover") {
      setInternalOpen(false);
    }
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(icon.name, icon.svgString || icon.standaloneSvg || icon.htmlSnippet);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all text-center select-none cursor-pointer",
        effectiveOpen
          ? "border-[var(--accent-green)]/70 bg-[var(--surface-secondary)] shadow-sm"
          : "border-[var(--border)] bg-[var(--surface-secondary)]/40 hover:bg-[var(--surface-secondary)] hover:border-[var(--border-hover)]"
      )}
      title={
        triggerMode === "click"
          ? "Click to morph & toggle"
          : triggerMode === "hover"
          ? "Hover to morph"
          : "Continuous loop"
      }
    >
      {/* Copy Button on Hover */}
      <button
        type="button"
        onClick={handleCopyClick}
        title="Copy standalone SVG"
        className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-[var(--surface-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer z-10"
      >
        <Copy className="h-3 w-3" />
      </button>

      {/* Persistent SVG element */}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svgHtml }}
        className="flex items-center justify-center transition-transform group-hover:scale-105 pointer-events-none"
        style={{ width: size, height: size }}
      />

      <span className="mt-2 text-xs font-sans font-medium text-[var(--text-primary)] line-clamp-1">
        {icon.name}
      </span>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          {icon.category}
        </span>
        {effectiveOpen && (
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
        )}
      </div>
    </div>
  );
}

export default function IconsPage() {
  // Global Tab: Standard Clean Icons (Image 1) vs Animated Motion & Loaders
  const [activeTab, setActiveTab] = React.useState<"standard" | "animated">("standard");

  /* ─────────────────────────────────────────────────────────────────── */
  /* 1. Interface Icons State (Matching Image 1)                          */
  /* ─────────────────────────────────────────────────────────────────── */
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
    "Navigation",
    "Actions",
    "Interface",
    "Media",
    "Status",
  ]);
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(true);
  const [strokeWidth, setStrokeWidth] = React.useState<1 | 1.5 | 2>(1.5);
  const [styleMode, setStyleMode] = React.useState<"outline" | "solid">("outline");
  const [selectedIconId, setSelectedIconId] = React.useState<string>("search");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  /* ─────────────────────────────────────────────────────────────────── */
  /* 2. Motion Icons & Loaders State (Right-side customization)          */
  /* ─────────────────────────────────────────────────────────────────── */
  const [animatedAppIcons, setAnimatedAppIcons] = React.useState<any[]>([]);
  const [animatedIcons, setAnimatedIcons] = React.useState<any[]>([]);
  const [animatedLoaders, setAnimatedLoaders] = React.useState<any[]>([]);
  const [motionSearchQuery, setMotionSearchQuery] = React.useState("");
  const [motionTypeFilter, setMotionTypeFilter] = React.useState<"all" | "app" | "menu" | "loaders">("all");
  const [motionTriggerMode, setMotionTriggerMode] = React.useState<"click" | "hover" | "loop">("click");
  const [motionSpeed, setMotionSpeed] = React.useState<number>(1.0);
  const [motionColor, setMotionColor] = React.useState<string>("#6366f1");
  const [motionSize, setMotionSize] = React.useState<number>(44);
  const [autoplayPhase, setAutoplayPhase] = React.useState<boolean>(false);

  const [selectedAppCats, setSelectedAppCats] = React.useState<string[]>([
    "Home, Overview & Dashboard",
    "Wallet, Finance & Commerce",
    "Folders, Files & Cloud",
    "Users, Security & Settings",
    "Dev Tools, Media & Actions",
  ]);
  const [selectedMenuCats, setSelectedMenuCats] = React.useState<string[]>([
    "Hamburger to X",
    "Grid, Bento & Dots",
    "Sidebar & Layout",
    "Filter, Sort & UI",
  ]);
  const [selectedLoaderCats, setSelectedLoaderCats] = React.useState<string[]>([
    "Circles & Rings",
    "Ball Bounces & Dots",
    "Squares & Polygons",
    "Wipes, Bars & Lines",
    "Minimal Morphs & UI",
  ]);
  const [isAppCatsOpen, setIsAppCatsOpen] = React.useState(true);
  const [isMenuCatsOpen, setIsMenuCatsOpen] = React.useState(true);
  const [isLoaderCatsOpen, setIsLoaderCatsOpen] = React.useState(true);

  // Fetch datasets from public/icons
  React.useEffect(() => {
    // 1. VECTR App & UI motion icons from bundle 39
    fetch("/icons/vectr-icons-bundle-39.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.items) {
          const appItems = data.items.filter((i: any) => i.suite === "app");
          setAnimatedAppIcons(appItems);
          const allCats = Array.from(
            new Set(appItems.map((i: any) => i.category).filter(Boolean))
          ) as string[];
          if (allCats.length > 0) setSelectedAppCats(allCats);
        }
      })
      .catch(() => {});

    // 2. VECTR Menu icons
    fetch("/icons/vectr-menu-icons-26.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.icons) {
          setAnimatedIcons(data.icons);
          const allCats = Array.from(
            new Set(data.icons.map((i: any) => i.category).filter(Boolean))
          ) as string[];
          if (allCats.length > 0) setSelectedMenuCats(allCats);
        }
      })
      .catch(() => {});

    // 3. VECTR UI loaders
    fetch("/icons/vectr-ui-loaders-41.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.loaders) {
          setAnimatedLoaders(data.loaders);
          const allCats = Array.from(
            new Set(data.loaders.map((l: any) => l.category).filter(Boolean))
          ) as string[];
          if (allCats.length > 0) setSelectedLoaderCats(allCats);
        }
      })
      .catch(() => {});
  }, []);

  // Continuous loop toggle when trigger mode is "loop"
  React.useEffect(() => {
    if (motionTriggerMode !== "loop") return;
    const interval = setInterval(() => {
      setAutoplayPhase((prev) => !prev);
    }, 1600);
    return () => clearInterval(interval);
  }, [motionTriggerMode]);

  /* ─────────────────────────────────────────────────────────────────── */
  /* Filtering Logic                                                     */
  /* ─────────────────────────────────────────────────────────────────── */
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleAppCat = (cat: string) => {
    setSelectedAppCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleMenuCat = (cat: string) => {
    setSelectedMenuCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleLoaderCat = (cat: string) => {
    setSelectedLoaderCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Filtered standard icons
  const filteredIcons = React.useMemo(() => {
    return ICONS_LIST.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategories.includes(icon.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  // Filtered animated app icons
  const filteredAnimatedAppIcons = React.useMemo(() => {
    if (motionTypeFilter === "menu" || motionTypeFilter === "loaders") return [];
    return animatedAppIcons.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        icon.slug?.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        (icon.tags && icon.tags.some((t: string) => t.toLowerCase().includes(motionSearchQuery.toLowerCase())));
      const matchesCat = selectedAppCats.includes(icon.category);
      return matchesSearch && matchesCat;
    });
  }, [animatedAppIcons, motionSearchQuery, motionTypeFilter, selectedAppCats]);

  // Filtered animated menu icons
  const filteredAnimatedIcons = React.useMemo(() => {
    if (motionTypeFilter === "app" || motionTypeFilter === "loaders") return [];
    return animatedIcons.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        icon.slug?.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        (icon.tags && icon.tags.some((t: string) => t.toLowerCase().includes(motionSearchQuery.toLowerCase())));
      const matchesCat = selectedMenuCats.includes(icon.category);
      return matchesSearch && matchesCat;
    });
  }, [animatedIcons, motionSearchQuery, motionTypeFilter, selectedMenuCats]);

  // Filtered animated loaders
  const filteredAnimatedLoaders = React.useMemo(() => {
    if (motionTypeFilter === "app" || motionTypeFilter === "menu") return [];
    return animatedLoaders.filter((ldr) => {
      const matchesSearch =
        ldr.name.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        ldr.slug?.toLowerCase().includes(motionSearchQuery.toLowerCase()) ||
        (ldr.tags && ldr.tags.some((t: string) => t.toLowerCase().includes(motionSearchQuery.toLowerCase())));
      const matchesCat = selectedLoaderCats.includes(ldr.category);
      return matchesSearch && matchesCat;
    });
  }, [animatedLoaders, motionSearchQuery, motionTypeFilter, selectedLoaderCats]);

  /* ─────────────────────────────────────────────────────────────────── */
  /* Copy & Toast Handlers                                               */
  /* ─────────────────────────────────────────────────────────────────── */
  const handleCopyIcon = (icon: IconItem) => {
    setSelectedIconId(icon.id);
    const svgCode = `<svg viewBox="0 0 24 24" fill="${styleMode === "solid" ? "currentColor" : "none"}" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">\n  <!-- ${icon.name} icon -->\n</svg>`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(svgCode);
      setCopiedId(icon.id);
      setToastMessage(`Copied <${icon.name} /> SVG code to clipboard`);
      setTimeout(() => setCopiedId(null), 1800);
      setTimeout(() => setToastMessage(null), 2400);
    }
  };

  const handleCopyMotionItem = (name: string, snippet: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setToastMessage(`Copied "${name}" animated SVG to clipboard`);
      setTimeout(() => setToastMessage(null), 2400);
    }
  };

  /* ─────────────────────────────────────────────────────────────────── */
  /* SVG String Transformers for Loaders & Menu Icons                    */
  /* ─────────────────────────────────────────────────────────────────── */
  const processLoaderSvg = (ldr: any) => {
    // Using svgString gives full keyframe rules and styling
    let raw = ldr.svgString || ldr.htmlSnippet || "";
    if (motionColor) {
      raw = raw.replaceAll("#6366f1", motionColor);
    }
    if (motionSpeed !== 1) {
      raw = raw.replaceAll("/ 1)", `/ ${motionSpeed})`);
      raw = raw.replaceAll("/ 1s", `/ ${motionSpeed}s`);
    }
    // Update width & height
    raw = raw.replace(/width="[0-9]+"/, `width="${motionSize}"`).replace(/height="[0-9]+"/, `height="${motionSize}"`);
    return raw;
  };

  const categories = [
    { name: "Navigation", count: ICONS_LIST.filter((i) => i.category === "Navigation").length },
    { name: "Actions", count: ICONS_LIST.filter((i) => i.category === "Actions").length },
    { name: "Interface", count: ICONS_LIST.filter((i) => i.category === "Interface").length },
    { name: "Media", count: ICONS_LIST.filter((i) => i.category === "Media").length },
    { name: "Status", count: ICONS_LIST.filter((i) => i.category === "Status").length },
  ];

  const appCategoryList = React.useMemo(() => {
    const defaults = [
      "Home, Overview & Dashboard",
      "Wallet, Finance & Commerce",
      "Folders, Files & Cloud",
      "Users, Security & Settings",
      "Dev Tools, Media & Actions",
    ];
    const foundCats = animatedAppIcons.length > 0 
      ? Array.from(new Set(animatedAppIcons.map((i: any) => i.category).filter(Boolean))) as string[]
      : defaults;
    return foundCats.map((name) => ({
      name,
      count: animatedAppIcons.filter((i: any) => i.category === name).length,
    }));
  }, [animatedAppIcons]);

  const menuCategoryList = React.useMemo(() => {
    const defaults = ["Hamburger to X", "Grid, Bento & Dots", "Sidebar & Layout", "Filter, Sort & UI"];
    const foundCats = animatedIcons.length > 0 
      ? Array.from(new Set(animatedIcons.map((i: any) => i.category).filter(Boolean))) as string[]
      : defaults;
    return foundCats.map((name) => ({
      name,
      count: animatedIcons.filter((i: any) => i.category === name).length,
    }));
  }, [animatedIcons]);

  const loaderCategoryList = React.useMemo(() => {
    const defaults = ["Circles & Rings", "Ball Bounces & Dots", "Squares & Polygons", "Wipes, Bars & Lines", "Minimal Morphs & UI"];
    const foundCats = animatedLoaders.length > 0
      ? Array.from(new Set(animatedLoaders.map((l: any) => l.category).filter(Boolean))) as string[]
      : defaults;
    return foundCats.map((name) => ({
      name,
      count: animatedLoaders.filter((l: any) => l.category === name).length,
    }));
  }, [animatedLoaders]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Global CSS injection for SVG keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: MASTER_LOADER_CSS }} />

      {/* 1. Header with Breadcrumbs & Title — Branded as Kilo/Icons */}
      <div className="space-y-2 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
            kilo/ui
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-[var(--text-primary)] transition-colors">
            All Components
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">Kilo/Icons</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[var(--text-primary)] font-mono">
                Kilo<span className="text-[var(--accent-green)]">/</span>Icons
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent-green)] font-semibold">
                Collection
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              A crafted collection of clean vector icons, morphing menu actions, and responsive SVG loaders.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Tabs */}
            <div className="inline-flex items-center p-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-colors cursor-pointer",
                  activeTab === "standard"
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                Interface Icons ({ICONS_LIST.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("animated")}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5",
                  activeTab === "animated"
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                <span>Motion & Loaders ({animatedAppIcons.length + animatedIcons.length + animatedLoaders.length || 104})</span>
              </button>
            </div>

            <span className="text-xs font-mono text-[var(--text-muted)] tabular-nums">
              {activeTab === "standard"
                ? `${filteredIcons.length} icons`
                : `${filteredAnimatedAppIcons.length + filteredAnimatedIcons.length + filteredAnimatedLoaders.length} icons`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout: Icons Canvas (Left 3 cols) + Customization & Filters (Right 1 col) */}
      {activeTab === "standard" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT 3 COLS: Standard Interface Icon Grid Container */}
          <div className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-8 min-h-[520px]">
            {filteredIcons.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
                <Box className="h-8 w-8 text-[var(--text-muted)] opacity-50" />
                <p className="text-sm font-mono text-[var(--text-secondary)]">No icons match your search</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories(["Navigation", "Actions", "Interface", "Media", "Status"]);
                  }}
                  className="text-xs font-mono text-[var(--accent-green)] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-7 gap-x-3">
                {filteredIcons.map((icon) => {
                  const isSelected = selectedIconId === icon.id;
                  const isCopied = copiedId === icon.id;

                  return (
                    <button
                      key={icon.id}
                      type="button"
                      onClick={() => handleCopyIcon(icon)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer text-center",
                        "focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]",
                        isSelected
                          ? "bg-[var(--surface-secondary)] border border-[var(--border)] shadow-xs"
                          : "hover:bg-[var(--surface-secondary)]/50 border border-transparent"
                      )}
                      title={`Click to copy <${icon.name} />`}
                    >
                      {/* Icon Glyph Container */}
                      <div className="h-10 w-10 flex items-center justify-center text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-200">
                        {icon.render({
                          strokeWidth,
                          isSolid: styleMode === "solid",
                          className: "h-6 w-6 text-[var(--text-primary)]",
                        })}
                      </div>

                      {/* Icon Name Label */}
                      <span className="mt-2 text-xs font-sans font-normal text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate max-w-[95px] transition-colors">
                        {icon.name}
                      </span>

                      {/* Floating copy feedback */}
                      {isCopied && (
                        <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[var(--accent-green)] text-[var(--bg-main)] font-semibold shadow-xs animate-in fade-in">
                          Copied!
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COL: Interface Filters Panel matching Image 1 */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Filters
            </h3>

            {/* 1. Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search icons..."
                className="w-full h-8.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/60 pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-mono"
              />
            </div>

            {/* 2. Categories Accordion with counts & checkboxes */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full text-xs font-sans font-medium text-[var(--text-primary)] cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200",
                    isCategoriesOpen ? "rotate-0" : "-rotate-90"
                  )}
                />
              </button>

              {isCategoriesOpen && (
                <div className="space-y-2 pt-1 pl-0.5">
                  {categories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.name}
                        onClick={() => toggleCategory(cat.name)}
                        className="flex items-center justify-between text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none py-0.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                              isChecked
                                ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                                : "border-[var(--border)] bg-transparent"
                            )}
                          >
                            {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                          {cat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Stroke Width Selector */}
            <div className="space-y-3 pt-3 border-t border-[var(--border)]">
              <span className="block text-xs font-sans font-medium text-[var(--text-primary)]">
                Stroke
              </span>
              <div className="space-y-2 pl-0.5">
                {[1, 1.5, 2].map((sw) => {
                  const isChecked = strokeWidth === sw;
                  return (
                    <label
                      key={sw}
                      onClick={() => setStrokeWidth(sw as any)}
                      className="flex items-center gap-2.5 text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                            : "border-[var(--border)] bg-transparent"
                        )}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span>{sw} px</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. Style Selector (Outline vs Solid) */}
            <div className="space-y-3 pt-3 border-t border-[var(--border)]">
              <span className="block text-xs font-sans font-medium text-[var(--text-primary)]">
                Style
              </span>
              <div className="space-y-2 pl-0.5">
                {[
                  { id: "outline", label: "Outline" },
                  { id: "solid", label: "Solid" },
                ].map((st) => {
                  const isChecked = styleMode === st.id;
                  return (
                    <label
                      key={st.id}
                      onClick={() => setStyleMode(st.id as any)}
                      className="flex items-center gap-2.5 text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none"
                    >
                      <div
                        className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                            : "border-[var(--border)] bg-transparent"
                        )}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span>{st.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────── */
        /* MOTION & LOADERS TAB: Left Grid (3 cols) + Right Customization Panel */
        /* ─────────────────────────────────────────────────────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT 3 COLS: Motion Icons & Animated Loaders */}
          <div className="lg:col-span-3 space-y-6">
            {/* 1. Animated App & UI Icons Card */}
            {(motionTypeFilter === "all" || motionTypeFilter === "app") && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-2">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[var(--accent-green)]" />
                      <span>VECTR App & UI Icons ({filteredAnimatedAppIcons.length})</span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Reactive motion icons for dashboards, commerce, files, and settings. Mode:{" "}
                      <span className="font-mono text-[var(--accent-green)] font-semibold uppercase">
                        {motionTriggerMode === "click"
                          ? "Click to Toggle"
                          : motionTriggerMode === "hover"
                          ? "Hover to Morph"
                          : "Continuous Loop"}
                      </span>
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                    Click to morph • Copy icon on hover
                  </span>
                </div>

                {filteredAnimatedAppIcons.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-[var(--text-muted)]">
                    No app icons match your filters
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                    {filteredAnimatedAppIcons.map((icon: any) => (
                      <VectrMenuIconCard
                        key={icon.uid || `app-${icon.id}`}
                        icon={icon}
                        triggerMode={motionTriggerMode}
                        speed={motionSpeed}
                        color={motionColor}
                        size={motionSize}
                        autoplayPhase={autoplayPhase}
                        onCopy={handleCopyMotionItem}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. Animated Menu Icons Card */}
            {(motionTypeFilter === "all" || motionTypeFilter === "menu") && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-2">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[var(--accent-green)]" />
                      <span>VECTR Menu Icons ({filteredAnimatedIcons.length})</span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      State-morphing navigation triggers. Mode:{" "}
                      <span className="font-mono text-[var(--accent-green)] font-semibold uppercase">
                        {motionTriggerMode === "click"
                          ? "Click to Toggle"
                          : motionTriggerMode === "hover"
                          ? "Hover to Morph"
                          : "Continuous Loop"}
                      </span>
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                    Click to morph • Copy icon on hover
                  </span>
                </div>

                {filteredAnimatedIcons.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-[var(--text-muted)]">
                    No menu icons match your filters
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                    {filteredAnimatedIcons.map((icon: any) => (
                      <VectrMenuIconCard
                        key={icon.id}
                        icon={icon}
                        triggerMode={motionTriggerMode}
                        speed={motionSpeed}
                        color={motionColor}
                        size={motionSize}
                        autoplayPhase={autoplayPhase}
                        onCopy={handleCopyMotionItem}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Animated UI Loaders Card */}
            {(motionTypeFilter === "all" || motionTypeFilter === "loaders") && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-2">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[var(--accent-green)]" />
                      <span>Minimal UI Loaders & Spinners ({filteredAnimatedLoaders.length})</span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Continuously running 60fps SVG spinners, elastic sweeps, and harmonic ripples.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                    Click loader to copy SVG
                  </span>
                </div>

                {filteredAnimatedLoaders.length === 0 ? (
                  <div className="py-12 text-center font-mono text-xs text-[var(--text-muted)]">
                    No UI loaders match your filters
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                    {filteredAnimatedLoaders.map((ldr: any) => (
                      <div
                        key={ldr.id}
                        onClick={() => handleCopyMotionItem(ldr.name, ldr.svgString || ldr.htmlSnippet)}
                        className="group flex flex-col items-center justify-center p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 hover:bg-[var(--surface-secondary)] hover:border-[var(--border-hover)] transition-all text-center cursor-pointer select-none"
                        title="Click to copy loader SVG"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: processLoaderSvg(ldr),
                          }}
                          className="flex items-center justify-center h-12 w-12 transition-transform group-hover:scale-110"
                        />
                        <span className="mt-2 text-xs font-sans font-medium text-[var(--text-primary)] line-clamp-1">
                          {ldr.name}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">
                          {ldr.category}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COL: Motion Customization & Filters Panel */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-6">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--border)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Filters & Motion
              </h3>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                Reactive
              </span>
            </div>

            {/* 1. Motion Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={motionSearchQuery}
                onChange={(e) => setMotionSearchQuery(e.target.value)}
                placeholder="Search motion & loaders..."
                className="w-full h-8.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/60 pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-mono"
              />
            </div>

            {/* 2. Content Type Switcher */}
            <div className="space-y-2.5">
              <span className="block text-xs font-sans font-medium text-[var(--text-primary)]">
                Content Type
              </span>
              <div className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)]">
                {[
                  { id: "all", label: "All" },
                  { id: "app", label: "App UI" },
                  { id: "menu", label: "Menu" },
                  { id: "loaders", label: "Loaders" },
                ].map((item) => {
                  const isSelected = motionTypeFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMotionTypeFilter(item.id as any)}
                      className={cn(
                        "py-1 rounded text-xs font-mono transition-colors cursor-pointer",
                        isSelected
                          ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-semibold shadow-xs"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Trigger Mode (App & Menu Icons) */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[var(--text-primary)]">
                  Trigger Mode
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  App & Menu Icons
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  { id: "click", label: "Click to Toggle", icon: MousePointer },
                  { id: "hover", label: "Hover to Morph", icon: Play },
                  { id: "loop", label: "Continuous Loop", icon: Repeat },
                ].map((mode) => {
                  const isSelected = motionTriggerMode === mode.id;
                  const IconComp = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setMotionTriggerMode(mode.id as any)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer text-left",
                        isSelected
                          ? "bg-[var(--surface-secondary)] border-[var(--accent-green)] text-[var(--text-primary)] font-medium"
                          : "border-[var(--border)] hover:bg-[var(--surface-secondary)]/50 text-[var(--text-secondary)]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className={cn("h-3.5 w-3.5", isSelected ? "text-[var(--accent-green)]" : "text-[var(--text-muted)]")} />
                        <span>{mode.label}</span>
                      </div>
                      {isSelected && <Check className="h-3 w-3 text-[var(--accent-green)]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Animation Speed Multiplier */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[var(--text-primary)]">
                  Animation Speed
                </span>
                <span className="text-xs font-mono text-[var(--accent-green)]">
                  {motionSpeed}x
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0.5, 1.0, 1.5, 2.0].map((spd) => {
                  const isSelected = motionSpeed === spd;
                  return (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setMotionSpeed(spd)}
                      className={cn(
                        "py-1 rounded-md text-xs font-mono border transition-colors cursor-pointer text-center",
                        isSelected
                          ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow-xs"
                          : "border-[var(--border)] bg-[var(--surface-secondary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {spd}x
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Accent Color Tint */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[var(--text-primary)]">
                  Color Accent
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                  {motionColor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { color: "#6366f1", label: "Indigo" },
                  { color: "#8bc49a", label: "Sage Green" },
                  { color: "#ffffff", label: "Pure White" },
                  { color: "#22d3ee", label: "Cyan" },
                  { color: "#fb7185", label: "Rose" },
                  { color: "#fbbf24", label: "Amber" },
                ].map((item) => {
                  const isSelected = motionColor.toLowerCase() === item.color.toLowerCase();
                  return (
                    <button
                      key={item.color}
                      type="button"
                      onClick={() => setMotionColor(item.color)}
                      title={item.label}
                      className={cn(
                        "h-6 w-6 rounded-full border transition-transform cursor-pointer relative",
                        isSelected
                          ? "scale-125 border-white ring-2 ring-[var(--accent-green)]"
                          : "border-transparent opacity-80 hover:opacity-100 hover:scale-110"
                      )}
                      style={{ backgroundColor: item.color }}
                    />
                  );
                })}
                <label className="relative flex items-center cursor-pointer ml-auto" title="Custom color">
                  <input
                    type="color"
                    value={motionColor}
                    onChange={(e) => setMotionColor(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className="h-6 w-6 rounded-md border border-[var(--border)] hover:border-white transition-colors"
                    style={{ backgroundColor: motionColor }}
                  />
                </label>
              </div>
            </div>

            {/* 6. Size Scale */}
            <div className="space-y-2.5 pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-[var(--text-primary)]">
                  Icon Size
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {motionSize}px
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[36, 44, 52].map((sz) => {
                  const isSelected = motionSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setMotionSize(sz)}
                      className={cn(
                        "py-1 rounded-md text-xs font-mono border transition-colors cursor-pointer text-center",
                        isSelected
                          ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow-xs"
                          : "border-[var(--border)] bg-[var(--surface-secondary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {sz}px
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. App UI Categories Accordion */}
            {(motionTypeFilter === "all" || motionTypeFilter === "app") && (
              <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsAppCatsOpen(!isAppCatsOpen)}
                  className="flex items-center justify-between w-full text-xs font-sans font-medium text-[var(--text-primary)] cursor-pointer"
                >
                  <span>App UI Categories</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200",
                      isAppCatsOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>

                {isAppCatsOpen && (
                  <div className="space-y-2 pt-1 pl-0.5">
                    {appCategoryList.map((cat) => {
                      const isChecked = selectedAppCats.includes(cat.name);
                      return (
                        <label
                          key={cat.name}
                          onClick={() => toggleAppCat(cat.name)}
                          className="flex items-center justify-between text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none py-0.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                                isChecked
                                  ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                                  : "border-[var(--border)] bg-transparent"
                              )}
                            >
                              {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                            {cat.count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 8. Menu Categories Accordion */}
            {(motionTypeFilter === "all" || motionTypeFilter === "menu") && (
              <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsMenuCatsOpen(!isMenuCatsOpen)}
                  className="flex items-center justify-between w-full text-xs font-sans font-medium text-[var(--text-primary)] cursor-pointer"
                >
                  <span>Menu Icon Categories</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200",
                      isMenuCatsOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>

                {isMenuCatsOpen && (
                  <div className="space-y-2 pt-1 pl-0.5">
                    {menuCategoryList.map((cat) => {
                      const isChecked = selectedMenuCats.includes(cat.name);
                      return (
                        <label
                          key={cat.name}
                          onClick={() => toggleMenuCat(cat.name)}
                          className="flex items-center justify-between text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none py-0.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                                isChecked
                                  ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                                  : "border-[var(--border)] bg-transparent"
                              )}
                            >
                              {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                            {cat.count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 9. Loader Categories Accordion */}
            {(motionTypeFilter === "all" || motionTypeFilter === "loaders") && (
              <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsLoaderCatsOpen(!isLoaderCatsOpen)}
                  className="flex items-center justify-between w-full text-xs font-sans font-medium text-[var(--text-primary)] cursor-pointer"
                >
                  <span>Loader Categories</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200",
                      isLoaderCatsOpen ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>

                {isLoaderCatsOpen && (
                  <div className="space-y-2 pt-1 pl-0.5">
                    {loaderCategoryList.map((cat) => {
                      const isChecked = selectedLoaderCats.includes(cat.name);
                      return (
                        <label
                          key={cat.name}
                          onClick={() => toggleLoaderCat(cat.name)}
                          className="flex items-center justify-between text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none py-0.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={cn(
                                "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                                isChecked
                                  ? "bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-main)]"
                                  : "border-[var(--border)] bg-transparent"
                              )}
                            >
                              {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                            {cat.count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Reset All Motion Settings */}
            <div className="pt-2 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => {
                  setMotionSearchQuery("");
                  setMotionTypeFilter("all");
                  setMotionTriggerMode("click");
                  setMotionSpeed(1.0);
                  setMotionColor("#6366f1");
                  setMotionSize(44);
                  setSelectedAppCats([
                    "Home, Overview & Dashboard",
                    "Wallet, Finance & Commerce",
                    "Folders, Files & Cloud",
                    "Users, Security & Settings",
                    "Dev Tools, Media & Actions",
                  ]);
                  setSelectedMenuCats([
                    "Hamburger to X",
                    "Grid, Bento & Dots",
                    "Sidebar & Layout",
                    "Filter, Sort & UI",
                  ]);
                  setSelectedLoaderCats([
                    "Circles & Rings",
                    "Ball Bounces & Dots",
                    "Squares & Polygons",
                    "Wipes, Bars & Lines",
                    "Minimal Morphs & UI",
                  ]);
                }}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Motion Controls</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-md text-xs font-mono text-[var(--text-primary)] shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Check className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  RotateCcw,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Code2,
  Terminal,
  X,
  Plus,
  RefreshCw,
  Search,
  Layers,
  ArrowRight,
  Folder,
  FileCode,
  Zap,
  Sliders,
  Bell,
  Command,
  MoveHorizontal,
  MoveVertical,
  ZoomIn,
  MousePointer,
  Sparkle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VectorMotionIcon } from "@/components/vector-icons";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";

export default function MotionEnginePage() {
  // --------------------------------------------------------------------------
  // PROMPT-DRIVEN MOTION CONTROLLER
  // --------------------------------------------------------------------------
  const [activePrompt, setActivePrompt] = React.useState<string>("Search bar expanding into command center");
  const [activeCategory, setActiveCategory] = React.useState<
    "all" | "container-transform" | "shared-axis" | "fade-through" | "pop-fade" | "physics-atoms"
  >("all");

  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  // Kinetic race track state
  const [raceTriggered, setRaceTriggered] = React.useState(false);

  const PROMPT_PRESETS = [
    { label: "Search Bar to Command Center", category: "container-transform" as const, action: "search" },
    { label: "Project Card to Modal", category: "container-transform" as const, action: "card" },
    { label: "FAB to Action Menu", category: "container-transform" as const, action: "fab" },
    { label: "Horizontal Wizard (X-Axis)", category: "shared-axis" as const, action: "x-axis" },
    { label: "Vertical Stepper (Y-Axis)", category: "shared-axis" as const, action: "y-axis" },
    { label: "Hierarchy Zoom (Z-Axis)", category: "shared-axis" as const, action: "z-axis" },
    { label: "Tab Fade Through", category: "fade-through" as const, action: "tabs" },
    { label: "Spring Dialog Pop", category: "pop-fade" as const, action: "dialog" },
    { label: "Kinetic Spring Atoms", category: "physics-atoms" as const, action: "atoms" },
  ];

  const handleSelectPrompt = (preset: (typeof PROMPT_PRESETS)[0]) => {
    setActivePrompt(preset.label);
    setActiveCategory(preset.category);

    // Auto-trigger the matching demo
    if (preset.action === "search") {
      setSearchExpanded(true);
    } else if (preset.action === "card") {
      setExpandedCardId("apex");
    } else if (preset.action === "fab") {
      setFabExpanded(true);
    } else if (preset.action === "x-axis") {
      setSharedAxisMode("x");
      setXStep((s) => (s === 3 ? 1 : s + 1));
    } else if (preset.action === "y-axis") {
      setSharedAxisMode("y");
      setYStep((s) => (s === 3 ? 1 : s + 1));
    } else if (preset.action === "z-axis") {
      setSharedAxisMode("z");
      setZStep((s) => (s === 3 ? 1 : s + 1));
    } else if (preset.action === "dialog") {
      setModalOpen(true);
    }
  };

  // --------------------------------------------------------------------------
  // DEMO 1: CONTAINER TRANSFORM (Search bar, Project Card, FAB)
  // --------------------------------------------------------------------------
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [expandedCardId, setExpandedCardId] = React.useState<string | null>(null);
  const [fabExpanded, setFabExpanded] = React.useState(false);

  const CARDS = [
    {
      id: "apex",
      title: "Apex Cloud Studio",
      category: "Developer Tool",
      tag: "v2.4 Released",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
      description: "Distributed edge cluster compute with microsecond warm-starts.",
      details:
        "Apex runs serverless workloads directly at network perimeter nodes. Features instant live-patching, sub-millisecond cold starts, and seamless distributed state caching.",
      stats: { latency: "1.2ms", regions: "48", uptime: "99.999%" },
    },
    {
      id: "hyperion",
      title: "Hyperion Audio DSP",
      category: "Neural Audio",
      tag: "Spatial 3D",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop&q=80",
      description: "Real-time generative spatial audio synthesis and acoustics engine.",
      details:
        "Hyperion computes ray-traced spatial acoustics and binaural audio geometry in real time. Designed for spatial gaming, VR headsets, and interactive digital twins.",
      stats: { sampleRate: "192 kHz", buffer: "64 samples", channels: "128" },
    },
  ];

  // --------------------------------------------------------------------------
  // DEMO 2: SHARED AXIS (X, Y, Z)
  // --------------------------------------------------------------------------
  const [sharedAxisMode, setSharedAxisMode] = React.useState<"x" | "y" | "z">("x");

  // X-Axis (Horizontal wizard)
  const [xStep, setXStep] = React.useState(1);
  const [xForward, setXForward] = React.useState(true);

  // Y-Axis (Vertical stepper)
  const [yStep, setYStep] = React.useState(1);
  const [yForward, setYForward] = React.useState(true);

  // Z-Axis (Depth zoom)
  const [zStep, setZStep] = React.useState(1);
  const [zForward, setZForward] = React.useState(true);

  // --------------------------------------------------------------------------
  // DEMO 3: FADE THROUGH (Tabs & Live Reload)
  // --------------------------------------------------------------------------
  const [activeTabDestination, setActiveTabDestination] = React.useState<"metrics" | "traffic" | "logs">("metrics");
  const [metricsVersion, setMetricsVersion] = React.useState(1);
  const [metricsData, setMetricsData] = React.useState({
    reqs: "94,820",
    errorRate: "0.002%",
    p99: "4.8ms",
  });

  const handleRefreshMetrics = () => {
    setMetricsVersion((v) => v + 1);
    setMetricsData({
      reqs: `${(90 + Math.floor(Math.random() * 15)).toLocaleString()},${Math.floor(Math.random() * 900 + 100)}`,
      errorRate: `0.00${Math.floor(Math.random() * 8 + 1)}%`,
      p99: `${(3 + Math.random() * 3).toFixed(1)}ms`,
    });
  };

  // --------------------------------------------------------------------------
  // DEMO 4: SPRING POP & FADE (Dialog, Popover, Toast)
  // --------------------------------------------------------------------------
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);

  // --------------------------------------------------------------------------
  // DEMO 5: TACTILE PHYSICS ATOMS
  // --------------------------------------------------------------------------
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [buttonBounced, setButtonBounced] = React.useState(false);
  const [activePillIdx, setActivePillIdx] = React.useState(0);
  const [hoverCardActive, setHoverCardActive] = React.useState(false);

  const handleBounceButton = () => {
    setButtonBounced(true);
    setTimeout(() => setButtonBounced(false), 350);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16 select-none font-sans">
      {/* 1. COMPACT HERO WITH PROMPT BAR */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] max-w-full rounded-full bg-[var(--accent-green)]/10 blur-3xl opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/30 text-[var(--accent-green)] font-mono text-[11px] font-bold">
                <VectorMotionIcon className="h-3.5 w-3.5" />
                <span>kilo/ui Motion Physics</span>
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Spring Mechanics & Canonical Transitions
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Interactive Motion Engine
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Real UI components demonstrating Kilo&apos;s natural physics: spring bounce, fluid gliding, container morphing, and directional transitions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText("npx kilo-ui add motion-engine");
              setCopiedCli(true);
              setTimeout(() => setCopiedCli(false), 2000);
            }}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-green)] transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)]" />
            <span>npx kilo-ui add motion-engine</span>
            {copiedCli ? <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" /> : <Copy className="h-3 w-3 opacity-60" />}
          </button>
        </div>

        {/* PROMPT INITIALIZATION BAR */}
        <div className="relative z-10 space-y-3 pt-2">
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-main)] px-3 py-2.5 focus-within:border-[var(--accent-green)] shadow-inner transition-colors">
            <Sparkles className="h-4 w-4 text-[var(--accent-green)] shrink-0 animate-pulse" />
            <input
              type="text"
              value={activePrompt}
              onChange={(e) => setActivePrompt(e.target.value)}
              placeholder="Type any motion intent: e.g. 'search bar expanding into command center'..."
              className="w-full bg-transparent text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-mono"
            />
            <span className="text-[10px] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] shrink-0 hidden sm:inline-block">
              Interactive
            </span>
          </div>

          {/* Quick preset chips that automatically trigger the motion */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mr-1">
              Quick Trigger:
            </span>
            {PROMPT_PRESETS.map((p) => {
              const isActive = activePrompt === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleSelectPrompt(p)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer border",
                    isActive
                      ? "bg-[var(--accent-green)] text-black border-[var(--accent-green)] font-semibold shadow-xs scale-102"
                      : "bg-[var(--surface-secondary)]/70 border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SELECTOR TABS */}
      <SlidingHighlightContainer
        activeSelector='[data-state="active"]'
        activeKey={activeCategory}
        className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[var(--border)] text-xs font-mono select-none"
        pillClassName="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg shadow-xs"
      >
        {[
          { id: "all", label: "All Motion Demos", count: "Complete" },
          { id: "container-transform", label: "1. Container Transform", count: "3 Demos" },
          { id: "shared-axis", label: "2. Shared Axis (X, Y, Z)", count: "Directional" },
          { id: "fade-through", label: "3. Fade Through", count: "Tabs & Refresh" },
          { id: "pop-fade", label: "4. Pop & Fade", count: "Dialog & Menu" },
          { id: "physics-atoms", label: "5. Tactile Physics Atoms", count: "Micro-Springs" },
        ].map((tab) => {
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              data-hover-item="true"
              data-state={isSelected ? "active" : "inactive"}
              onClick={() => setActiveCategory(tab.id as any)}
              className={cn(
                "group relative z-10 px-3.5 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap",
                isSelected
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-[9px] px-1.5 py-0.2 rounded font-normal transition-colors",
                  isSelected ? "bg-[var(--accent-green)]/15 text-[var(--accent-green)]" : "bg-[var(--surface-secondary)] text-[var(--text-muted)]"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </SlidingHighlightContainer>

      {/* ====================================================================== */}
      {/* 1. CONTAINER TRANSFORM SHOWCASE                                        */}
      {/* ====================================================================== */}
      {(activeCategory === "all" || activeCategory === "container-transform") && (
        <div className="space-y-6">
          {/* A. Search Bar to Command Center Transform */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span>A. Search Bar to Command Center</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-bold">
                    Fluid Morph
                  </span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Click the search pill to watch it physically morph into a full spotlight command center.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                cubic-bezier(0.16, 1, 0.3, 1)
              </span>
            </div>

            {/* Clickable Origin Search Pill */}
            {!searchExpanded ? (
              <div
                onClick={() => setSearchExpanded(true)}
                className="w-full max-w-md mx-auto flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/60 hover:border-[var(--accent-green)] transition-all cursor-pointer shadow-md group"
              >
                <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                  <Search className="h-4 w-4 text-[var(--accent-green)]" />
                  <span className="font-mono">Search primitives, components, docs...</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-[10px] font-mono text-[var(--text-muted)]">
                  ⌘K
                </kbd>
              </div>
            ) : (
              /* Expanded Command Palette overlay */
              <div className="w-full max-w-xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] shadow-2xl p-4 space-y-3 animate-in zoom-in-95 duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2.5">
                  <Search className="h-4 w-4 text-[var(--accent-green)]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Type a component name..."
                    defaultValue="motion-engine"
                    className="w-full bg-transparent text-xs text-[var(--text-primary)] focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchExpanded(false)}
                    className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <kbd className="text-[10px] font-mono">ESC</kbd>
                  </button>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  {[
                    { name: "motion-engine", desc: "Material motion system with spring physics" },
                    { name: "content-slider", desc: "TOC slider with rubber band hover track" },
                    { name: "expanding-card", desc: "4-card stage expanding hero preview" },
                  ].map((item, idx) => (
                    <div
                      key={item.name}
                      onClick={() => setSearchExpanded(false)}
                      className={cn(
                        "p-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors",
                        idx === 0 ? "bg-[var(--surface-secondary)] text-[var(--accent-green)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]/50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5" />
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]/60 text-[10px] font-mono text-[var(--text-muted)]">
                  <span>Container Transform Active</span>
                  <button
                    type="button"
                    onClick={() => setSearchExpanded(false)}
                    className="text-[var(--accent-green)] font-bold hover:underline"
                  >
                    Close (Reverse Transform)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* B. Card to Modal Details Transform */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <span>B. Project Card to Details Expansion</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]">
                    Slow Spatial Spring
                  </span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Click either card to watch its container transform its geometry, corner radius, and elevation into a full sheet.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Damping 0.9 • Stiffness 300
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CARDS.map((card) => {
                const isExpanded = expandedCardId === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                    className={cn(
                      "rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 p-4 transition-all duration-300 cursor-pointer group shadow-md",
                      "hover:border-[var(--accent-green)] hover:shadow-xl",
                      isExpanded && "ring-2 ring-[var(--accent-green)] border-[var(--accent-green)]"
                    )}
                  >
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-black/40 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                          {card.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5">
                        <div className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-green)] font-bold">
                        {card.category}
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {card.description}
                      </p>

                      {isExpanded && (
                        <div className="pt-3 mt-3 border-t border-[var(--border)] space-y-3 animate-in fade-in duration-300">
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {card.details}
                          </p>
                          <div className="grid grid-cols-3 gap-2 font-mono text-[11px] p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
                            {Object.entries(card.stats).map(([k, v]) => (
                              <div key={k} className="text-center">
                                <div className="text-[9px] uppercase text-[var(--text-muted)]">{k}</div>
                                <div className="font-bold text-[var(--text-primary)] mt-0.5">{v}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end">
                            <span className="text-[10px] font-mono text-[var(--accent-green)] font-bold">
                              Click again to collapse
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. FAB Action Menu Transform */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                C. Floating Action Button (FAB) Transform
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                The round FAB morphs into a rectangular action sheet without separate popup flashes.
              </p>
            </div>

            {!fabExpanded ? (
              <button
                type="button"
                onClick={() => setFabExpanded(true)}
                className="h-10 px-4 rounded-full bg-[var(--accent-green)] text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>New Session</span>
              </button>
            ) : (
              <div className="rounded-xl border border-[var(--accent-green)] bg-[var(--surface-secondary)] p-3 shadow-xl flex items-center gap-2 animate-in zoom-in-90 duration-200">
                <input
                  type="text"
                  placeholder="Session name..."
                  autoFocus
                  defaultValue="cluster-alpha-telemetry"
                  className="bg-transparent text-xs font-mono text-[var(--text-primary)] border-b border-[var(--border)] px-1 py-0.5 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setFabExpanded(false)}
                  className="px-2.5 py-1 rounded bg-[var(--accent-green)] text-black font-mono text-xs font-bold cursor-pointer"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setFabExpanded(false)}
                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 2. SHARED AXIS SHOWCASE (X, Y, Z)                                      */}
      {/* ====================================================================== */}
      {(activeCategory === "all" || activeCategory === "shared-axis") && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Shared Axis Navigation Flow
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Creates spatial continuity along the X-axis (horizontal), Y-axis (vertical), or Z-axis (depth).
              </p>
            </div>

            {/* Mode Picker */}
            <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] p-0.5 font-mono text-xs">
              {(["x", "y", "z"] as const).map((ax) => (
                <button
                  key={ax}
                  type="button"
                  onClick={() => setSharedAxisMode(ax)}
                  className={cn(
                    "px-3 py-1 rounded-md uppercase font-bold transition-colors cursor-pointer",
                    sharedAxisMode === ax
                      ? "bg-[var(--accent-green)] text-black shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {ax}-axis
                </button>
              ))}
            </div>
          </div>

          {/* X-AXIS: MULTI-STEP FLOW */}
          {sharedAxisMode === "x" && (
            <div className="space-y-4 max-w-xl mx-auto">
              {/* Stepper Pill Indicators */}
              <div className="flex items-center justify-between px-4 font-mono text-xs">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all",
                      xStep === step
                        ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)] text-[var(--accent-green)] font-bold scale-105"
                        : xStep > step
                          ? "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-primary)]"
                          : "border-[var(--border)] text-[var(--text-muted)]"
                    )}
                  >
                    <span>0{step}</span>
                    <span className="hidden sm:inline">
                      {step === 1 ? "Credentials" : step === 2 ? "Region" : "Cluster Ready"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Animated Viewport */}
              <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-8 min-h-[180px] overflow-hidden flex flex-col justify-center text-center">
                <div
                  key={xStep}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] space-y-2",
                    xForward
                      ? "animate-in fade-in slide-in-from-right-10"
                      : "animate-in fade-in slide-in-from-left-10"
                  )}
                >
                  {xStep === 1 && (
                    <div className="space-y-1.5">
                      <div className="h-10 w-10 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent-green)]">
                        <Command className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        Step 1: Ephemeral SSH Credentials
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto">
                        Generates a cryptographic 2048-bit Ed25519 temporary token with 60-second TTL.
                      </p>
                    </div>
                  )}

                  {xStep === 2 && (
                    <div className="space-y-1.5">
                      <div className="h-10 w-10 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--accent-green)]">
                        <MoveHorizontal className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        Step 2: Deployment Region Routing
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto">
                        Auto-routes payload to closest edge POP in us-east-4 with sub-millisecond hop.
                      </p>
                    </div>
                  )}

                  {xStep === 3 && (
                    <div className="space-y-1.5">
                      <div className="h-10 w-10 rounded-xl bg-[var(--accent-green)]/20 border border-[var(--accent-green)]/40 flex items-center justify-center mx-auto text-[var(--accent-green)]">
                        <Check className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        Step 3: Cluster Active & Healthy
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto">
                        All worker pods running in steady state with zero resource allocation debt.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setXForward(false);
                    setXStep((s) => Math.max(1, s - 1));
                  }}
                  disabled={xStep === 1}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] disabled:opacity-30 cursor-pointer"
                >
                  ← Previous Step
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setXForward(true);
                    setXStep((s) => (s < 3 ? s + 1 : 1));
                  }}
                  className="px-4 py-2 rounded-lg bg-[var(--accent-green)] text-black text-xs font-mono font-bold cursor-pointer"
                >
                  {xStep === 3 ? "Replay From Step 1" : "Next Step →"}
                </button>
              </div>
            </div>
          )}

          {/* Y-AXIS: VERTICAL PIPELINE */}
          {sharedAxisMode === "y" && (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-6 min-h-[160px] flex items-center justify-center text-center overflow-hidden">
                <div
                  key={yStep}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] space-y-1",
                    yForward
                      ? "animate-in fade-in slide-in-from-bottom-8"
                      : "animate-in fade-in slide-in-from-top-8"
                  )}
                >
                  <span className="text-[10px] font-mono text-[var(--accent-green)] uppercase font-bold tracking-wider">
                    Pipeline Task 0{yStep}
                  </span>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {yStep === 1 && "Turbopack Compile & Module Graph"}
                    {yStep === 2 && "TypeScript Validation & Strict Typecheck"}
                    {yStep === 3 && "Edge Bundle Compression (Brotli Level 11)"}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Vertical slide with deceleration settling curve.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setYForward(false);
                    setYStep((s) => (s > 1 ? s - 1 : 3));
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                >
                  ↑ Up (Backward)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setYForward(true);
                    setYStep((s) => (s < 3 ? s + 1 : 1));
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-green)] text-black text-xs font-mono font-bold cursor-pointer"
                >
                  ↓ Down (Forward)
                </button>
              </div>
            </div>
          )}

          {/* Z-AXIS: DEPTH ZOOM */}
          {sharedAxisMode === "z" && (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-6 min-h-[160px] flex items-center justify-center text-center overflow-hidden">
                <div
                  key={zStep}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] space-y-1",
                    zForward ? "animate-in fade-in zoom-in-75" : "animate-in fade-in zoom-in-125"
                  )}
                >
                  <span className="text-[10px] font-mono text-[var(--accent-green)] uppercase font-bold tracking-wider">
                    Depth Level 0{zStep}
                  </span>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {zStep === 1 && "Root Workspace (/kiloUI)"}
                    {zStep === 2 && "Package Directory (/registry/ui)"}
                    {zStep === 3 && "Leaf Primitives (/motion-engine.tsx)"}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Scale zoom along the Z-axis camera frustum to reinforce folder hierarchy.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setZForward(false);
                    setZStep((s) => (s > 1 ? s - 1 : 3));
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                >
                  Zoom Out (Parent)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZForward(true);
                    setZStep((s) => (s < 3 ? s + 1 : 1));
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-green)] text-black text-xs font-mono font-bold cursor-pointer"
                >
                  Zoom In (Child)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. FADE THROUGH SHOWCASE                                               */}
      {/* ====================================================================== */}
      {(activeCategory === "all" || activeCategory === "fade-through") && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Fade Through (Tabs & Data Reload)
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Outgoing view scales down slightly while fading out; incoming view scales up while fading in.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefreshMetrics}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-green)] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <RefreshCw className="h-3 w-3 text-[var(--accent-green)]" />
              <span>Simulate Refresh</span>
            </button>
          </div>

          {/* Segmented Tab Navigation */}
          <div className="flex items-center gap-1 p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 font-mono text-xs max-w-md mx-auto">
            {(["metrics", "traffic", "logs"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTabDestination(tab)}
                className={cn(
                  "flex-1 py-1.5 rounded-lg transition-all cursor-pointer capitalize font-bold text-center",
                  activeTabDestination === tab
                    ? "bg-[var(--surface-elevated)] text-[var(--accent-green)] border border-[var(--border)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Fade Through Viewport */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-8 min-h-[160px] flex items-center justify-center max-w-xl mx-auto">
            <div
              key={`${activeTabDestination}-${metricsVersion}`}
              className="w-full animate-in fade-in zoom-in-95 duration-250 ease-[cubic-bezier(0.05,0.7,0.1,1)]"
            >
              {activeTabDestination === "metrics" && (
                <div className="space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Throughput:</span>
                    <strong className="text-sm text-[var(--text-primary)]">{metricsData.reqs} req/s</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Error Rate:</span>
                    <strong className="text-sm text-[var(--accent-green)]">{metricsData.errorRate}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">P99 Latency:</span>
                    <strong className="text-sm text-[var(--text-primary)]">{metricsData.p99}</strong>
                  </div>
                </div>
              )}

              {activeTabDestination === "traffic" && (
                <div className="space-y-2 text-center font-mono">
                  <div className="text-xs text-[var(--accent-green)] font-bold">Traffic Distribution</div>
                  <div className="text-sm text-[var(--text-primary)] font-bold">US East: 42% • EU West: 38% • APAC: 20%</div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    All regions passing latency health checks.
                  </p>
                </div>
              )}

              {activeTabDestination === "logs" && (
                <div className="space-y-1 font-mono text-[11px] text-[var(--text-secondary)]">
                  <div>[19:05:12] INF: Warm-started pod in 1.4ms</div>
                  <div>[19:05:15] INF: Synchronized motion-engine registry package</div>
                  <div>[19:05:22] INF: Memory allocated: 18.2 MB</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 4. POP & FADE SHOWCASE (Dialog, Popover, Toast)                         */}
      {/* ====================================================================== */}
      {(activeCategory === "all" || activeCategory === "pop-fade") && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-6">
          <div className="border-b border-[var(--border)] pb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Material Pop & Fade
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Centered scale and opacity entry without lateral displacement for modals, menus, and toasts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Modal Button */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[var(--accent-green)] text-black font-mono font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Trigger Modal Dialog
            </button>

            {/* Popover Button */}
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-green)] transition-all cursor-pointer"
            >
              Toggle Anchor Popover
            </button>

            {/* Toast Button */}
            <button
              type="button"
              onClick={() => {
                setToastOpen(true);
                setTimeout(() => setToastOpen(false), 3000);
              }}
              className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--accent-green)] transition-all cursor-pointer"
            >
              Fire Spring Toast
            </button>
          </div>

          {/* Interactive Popover Menu Display */}
          {dropdownOpen && (
            <div className="w-56 mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-2 shadow-2xl space-y-1 font-mono text-xs animate-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setDropdownOpen(false)}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]"
              >
                Fast Spatial Spring (1400k)
              </button>
              <button
                type="button"
                onClick={() => setDropdownOpen(false)}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]"
              >
                Default Spatial Spring (700k)
              </button>
              <button
                type="button"
                onClick={() => setDropdownOpen(false)}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-[var(--surface-secondary)] text-[var(--text-primary)]"
              >
                Slow Spatial Spring (300k)
              </button>
            </div>
          )}

          {/* Interactive Modal Dialog */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
                onClick={() => setModalOpen(false)}
              />
              <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    Spring Pop Dialog
                  </h4>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Notice the subtle natural deceleration as this dialog snaps into view, using Kilo&apos;s fluid spring physics curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-green)] text-black text-xs font-mono font-bold cursor-pointer"
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Floating Toast */}
          {toastOpen && (
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-[var(--accent-green)]/40 bg-[var(--surface-elevated)] px-4 py-2.5 text-xs font-mono text-[var(--text-primary)] shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <Zap className="h-4 w-4 text-[var(--accent-green)]" />
              <span>Spring Toast fired with rubber-band settle!</span>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* 5. TACTILE PHYSICS ATOMS (Real micro-interactions)                    */}
      {/* ====================================================================== */}
      {(activeCategory === "all" || activeCategory === "physics-atoms") && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-6">
          <div className="border-b border-[var(--border)] pb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Tactile Micro-Springs in Action
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Click, hover, and toggle these real atoms to experience Kilo&apos;s physical spring responses.
            </p>
          </div>

          {/* A. LIVE KINETIC EASING COMPARISON RACE */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/30 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--accent-green)]" />
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    Kilo Motion Physics Comparison
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Launch the 3 core physics easings across the track to witness their terminal curves live.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRaceTriggered((v) => !v)}
                className="px-4 py-2 rounded-xl bg-[var(--accent-green)] text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
              >
                <Play className={cn("h-3.5 w-3.5 fill-current transition-transform duration-300", raceTriggered && "rotate-180")} />
                <span>{raceTriggered ? "Reset Motion Track" : "Launch Motion Physics"}</span>
              </button>
            </div>

            {/* 3 Tracks */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              {/* 1. Spring */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[var(--text-primary)]">1. --ease-spring</span>
                  <span className="text-[var(--accent-green)]">cubic-bezier(0.16, 1, 0.3, 1) • Natural Spring Deceleration</span>
                </div>
                <div className="relative h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border)] overflow-hidden flex items-center px-2">
                  <div className="absolute right-14 top-0 bottom-0 w-[1px] border-r border-dashed border-[var(--border)] z-0" />
                  <div
                    className={cn(
                      "relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-md bg-[var(--accent-green)] text-black font-bold text-[11px] shadow-sm whitespace-nowrap",
                      raceTriggered ? "translate-x-[calc(100cqw-100%)] sm:translate-x-[420px]" : "translate-x-0"
                    )}
                    style={{
                      transition: "transform 750ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <span>Spring Settle</span>
                  </div>
                </div>
              </div>

              {/* 2. Bounce */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[var(--text-primary)]">2. --ease-bounce</span>
                  <span className="text-white/80">cubic-bezier(0.34, 1.56, 0.64, 1) • Rubber Rebound & Overshoot</span>
                </div>
                <div className="relative h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border)] overflow-hidden flex items-center px-2">
                  <div className="absolute right-14 top-0 bottom-0 w-[1px] border-r border-dashed border-[var(--border)] z-0" />
                  <div
                    className={cn(
                      "relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-md bg-white text-black font-bold text-[11px] shadow-sm whitespace-nowrap",
                      raceTriggered ? "translate-x-[calc(100cqw-100%)] sm:translate-x-[420px]" : "translate-x-0"
                    )}
                    style={{
                      transition: "transform 750ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <span>Bounce Rebound</span>
                  </div>
                </div>
              </div>

              {/* 3. Fluid */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[var(--text-primary)]">3. --ease-fluid</span>
                  <span className="text-[var(--text-muted)]">cubic-bezier(0.2, 0, 0, 1) • Zero-Friction Liquid Glide</span>
                </div>
                <div className="relative h-10 rounded-lg bg-[var(--bg-main)] border border-[var(--border)] overflow-hidden flex items-center px-2">
                  <div className="absolute right-14 top-0 bottom-0 w-[1px] border-r border-dashed border-[var(--border)] z-0" />
                  <div
                    className={cn(
                      "relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] font-bold text-[11px] shadow-sm whitespace-nowrap",
                      raceTriggered ? "translate-x-[calc(100cqw-100%)] sm:translate-x-[420px]" : "translate-x-0"
                    )}
                    style={{
                      transition: "transform 750ms cubic-bezier(0.2, 0, 0, 1)",
                    }}
                  >
                    <span>Fluid Momentum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Rubber-Band Bounce Button */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 space-y-3 text-center">
              <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                Rubber-Band Spring Bounce
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Depresses on click, overshoots and settles with natural spring rebound.
              </p>
              <button
                type="button"
                onClick={handleBounceButton}
                className={cn(
                  "w-full py-2.5 rounded-xl bg-[var(--accent-green)] text-black font-mono font-bold text-xs transition-transform cursor-pointer shadow-md",
                  buttonBounced
                    ? "scale-90"
                    : "scale-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] duration-300"
                )}
              >
                {buttonBounced ? "Bouncing!" : "Click Me to Bounce"}
              </button>
            </div>

            {/* 2. Fast Spatial Snap Switch */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 space-y-3 text-center">
              <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                Fast Spatial Snap Switch
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Instant 1400k stiffness thumb glide with sub-pixel alignment.
              </p>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSwitchChecked((v) => !v)}
                  className={cn(
                    "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                    switchChecked ? "bg-[var(--accent-green)]" : "bg-[var(--surface-secondary)] border-[var(--border)]"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                      switchChecked ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                State: {switchChecked ? "Active (Snapped)" : "Inactive"}
              </span>
            </div>

            {/* 3. Floating Highlight Pill */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 space-y-3 text-center">
              <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                Sliding Highlight Glide
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Highlight pill glides smoothly between items with fluid momentum.
              </p>
              <div className="flex p-1 rounded-xl bg-[var(--bg-main)] border border-[var(--border)] font-mono text-xs">
                {["Tab 1", "Tab 2", "Tab 3"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActivePillIdx(idx)}
                    className={cn(
                      "flex-1 py-1 rounded-lg transition-all duration-300 cursor-pointer font-bold",
                      activePillIdx === idx
                        ? "bg-[var(--surface-elevated)] text-[var(--accent-green)] shadow-md border border-[var(--border)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CODE SNIPPET DRAWER */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <Code2 className="h-4 w-4 text-[var(--accent-green)]" />
          <span className="text-[var(--text-primary)] font-bold">
            Looking to add these motion patterns to your app?
          </span>
          <span className="text-[var(--text-muted)] hidden sm:inline">
            Zero external dependencies • CSS and React hooks only
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(`import { ContainerTransform, SharedAxis, FadeThrough, Fade } from "@/components/ui/motion-engine";`);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] hover:border-[var(--accent-green)] text-xs font-mono text-[var(--text-primary)] cursor-pointer"
        >
          {copiedCode ? <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copiedCode ? "Copied Import!" : "Copy Import"}</span>
        </button>
      </div>
    </div>
  );
}

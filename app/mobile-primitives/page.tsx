"use client";

import * as React from "react";
import {
  Archive,
  Trash2,
  Bookmark,
  Pin,
  Plus,
  Home,
  Compass,
  Bell,
  Search,
  Check,
  Copy,
  ShoppingBag,
  Heart,
  Zap,
  Send,
  ArrowDownLeft,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileBottomSheet } from "@/components/ui/mobile-bottom-sheet";
import { SwipeActionCard } from "@/components/ui/swipe-action-card";
import { ThumbSegmentController } from "@/components/ui/thumb-segment-controller";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";

type PresetMode = "store" | "feed" | "wallet";
type CategoryFilter = "all" | "sheets" | "gestures" | "thumb" | "floating";

export default function MobilePrimitivesPage() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const [presetMode, setPresetMode] = React.useState<PresetMode>("store");
  const [isPhoneVisible, setIsPhoneVisible] = React.useState(true);
  const [copiedCli, setCopiedCli] = React.useState(false);

  // Store Preset state
  const [storeCategory, setStoreCategory] = React.useState<string>("all");
  const [cartCount, setCartCount] = React.useState(2);
  const [likedItems, setLikedItems] = React.useState<string[]>(["parka-1"]);

  // Feed Preset state
  const [feedItems, setFeedItems] = React.useState([
    { id: "1", sender: "Architecture Board", subject: "M3 Surface elevation token mapping review", time: "12m" },
    { id: "2", sender: "Telemetry Core", subject: "Sub-millisecond frame dispatch rate confirmed", time: "34m" },
    { id: "3", sender: "AST Validator", subject: "All mobile primitives schema compliance check", time: "1h" },
  ]);

  // Card 01 Interactive Sheet State
  const [cardSheetSelected, setCardSheetSelected] = React.useState<"express" | "standard">("express");

  // Card 03 Interactive Thumb Segment State
  const [cardSegmentValue, setCardSegmentValue] = React.useState<string>("week");

  // Phone Frame Bottom Sheet inspection state
  const [isSheetOpen, setIsSheetOpen] = React.useState<boolean>(false);
  const [dockSelected, setDockSelected] = React.useState<string>("home");

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx @kilo-ui/cli add mobile");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      /* noop */
    }
  };

  const handleRefreshFeed = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFeedItems((prev) => [
      { id: `${Date.now()}`, sender: "Sync Dispatch", subject: "Real-time buffer refreshed", time: "now" },
      ...prev.slice(0, 3),
    ]);
  };

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 min-h-0 bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans overflow-x-clip relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        
        {/* ── Minimalist Clean Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
              Mobile Primitives
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-sans">
              Touch-calibrated gesture primitives and interaction patterns.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyCli}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] active:scale-95 transition-all cursor-pointer shadow-xs select-none"
          >
            <span className="text-[var(--text-muted)]">$</span>
            <code>npx @kilo-ui/cli add mobile</code>
            {copiedCli ? (
              <Check className="h-3.5 w-3.5 text-[var(--accent-green)] ml-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-[var(--text-muted)] ml-1" />
            )}
          </button>
        </div>

        {/* ── Category Filter Tabs (Minimalist sliding pill) ── */}
        <div className="flex items-center justify-between gap-4 pt-1">
          <SlidingHighlightContainer
            activeSelector='[data-state="active"]'
            activeKey={activeCategory}
            className="flex items-center gap-1 overflow-x-auto text-xs font-mono select-none"
            pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg shadow-2xs"
          >
            {[
              { id: "all", label: "All Primitives" },
              { id: "sheets", label: "Bottom Sheets" },
              { id: "gestures", label: "Swipe Cards" },
              { id: "thumb", label: "Thumb Controls" },
              { id: "floating", label: "Floating Docks" },
            ].map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-hover-item="true"
                  data-state={isSelected ? "active" : "inactive"}
                  onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                  className={cn(
                    "relative z-10 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95",
                    isSelected
                      ? "text-[var(--text-primary)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </SlidingHighlightContainer>
        </div>

        {/* ── Two-Column Layout: Left Bento Grid, Right Phone Simulator ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 relative">
          
          {/* ── LEFT COLUMN: Primitives Grid (Expands to full width when phone is beyond edge) ── */}
          <div
            className={cn(
              "grid gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isPhoneVisible
                ? "lg:col-span-7 grid-cols-1 sm:grid-cols-2"
                : "lg:col-span-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            )}
          >

            {/* ── 01. Bottom Sheet ── */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Bottom Sheet
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  Multi-Snap
                </span>
              </div>

              {/* Direct interactive preview — no nested container borders */}
              <div className="space-y-1.5 py-1">
                <button
                  type="button"
                  onClick={() => setCardSheetSelected("express")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                    cardSheetSelected === "express"
                      ? "border-[var(--border-hover)] bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-xs"
                      : "border-transparent text-[var(--text-muted)] hover:bg-[var(--surface-secondary)]/40"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>Express Snap</span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">$4.00</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardSheetSelected("standard")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                    cardSheetSelected === "standard"
                      ? "border-[var(--border-hover)] bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-xs"
                      : "border-transparent text-[var(--text-muted)] hover:bg-[var(--surface-secondary)]/40"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    <span>Standard Freight</span>
                  </div>
                  <span className="text-[var(--accent-green)] font-bold">Free</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                <span>0.42 snap threshold</span>
                <span className="text-[var(--accent-green)]">Damped</span>
              </div>
            </div>

            {/* ── 02. Swipe Card ── */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Swipe Action Card
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  72px Spring
                </span>
              </div>

              {/* Direct swipe card */}
              <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                <SwipeActionCard
                  leftActions={[
                    {
                      id: "archive-card",
                      label: "Archive",
                      icon: <Archive className="h-3.5 w-3.5" />,
                      onClick: () => {},
                    },
                  ]}
                  rightActions={[
                    {
                      id: "delete-card",
                      label: "Delete",
                      icon: <Trash2 className="h-3.5 w-3.5" />,
                      variant: "destructive",
                      onClick: () => {},
                    },
                  ]}
                  threshold={60}
                  fullSwipeThreshold={140}
                >
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <div className="text-xs font-bold font-mono text-[var(--text-primary)]">
                        Order #RFC-902
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] font-mono">
                        Swipe left or right
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">⇄</span>
                  </div>
                </SwipeActionCard>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                <span>Bidirectional actions</span>
                <span className="text-[var(--accent-green)]">Haptic</span>
              </div>
            </div>

            {/* ── 03. Thumb Segment ── */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Thumb Segment
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  48px Reach
                </span>
              </div>

              <div className="py-2">
                <ThumbSegmentController
                  items={[
                    { id: "day", label: "Day" },
                    { id: "week", label: "Week", badge: 3 },
                    { id: "month", label: "Month" },
                    { id: "year", label: "Year" },
                  ]}
                  value={cardSegmentValue}
                  onChange={setCardSegmentValue}
                  size="default"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                <span>Ergonomic arc</span>
                <span className="text-[var(--accent-green)]">M3 Easing</span>
              </div>
            </div>

            {/* ── 04. Floating Action Dock ── */}
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Floating Action Dock
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  Safe Area
                </span>
              </div>

              <div className="py-2 flex items-center justify-center">
                <FloatingActionDock
                  className="relative z-10"
                  dockClassName="scale-90"
                  primaryAction={{
                    label: "Add",
                    icon: <Plus className="h-3.5 w-3.5" />,
                    onClick: () => {},
                  }}
                  items={[
                    {
                      id: "home",
                      label: "Home",
                      icon: <Home className="h-3.5 w-3.5" />,
                      onClick: () => {},
                      active: true,
                    },
                    {
                      id: "search",
                      label: "Search",
                      icon: <Search className="h-3.5 w-3.5" />,
                      onClick: () => {},
                    },
                    {
                      id: "alerts",
                      label: "Alerts",
                      icon: <Bell className="h-3.5 w-3.5" />,
                      onClick: () => {},
                    },
                  ]}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                <span>Elevation Level 3</span>
                <span className="text-[var(--accent-green)]">Anchored</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Minimalist Preset Phone Showcase ── */}
          <div
            className={cn(
              "flex flex-col items-center space-y-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isPhoneVisible
                ? "lg:col-span-5 translate-x-0 opacity-100"
                : "fixed right-0 top-32 translate-x-[120%] opacity-0 pointer-events-none z-30"
            )}
          >
            {/* Clean Preset Header */}
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--text-secondary)] font-mono">
                  Preset Preview
                </span>
                <button
                  type="button"
                  onClick={() => setIsPhoneVisible(false)}
                  className="h-6 w-6 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer"
                  title="Move mobile view beyond right edge"
                  aria-label="Move mobile view beyond right edge"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <SlidingHighlightContainer
                activeSelector='[data-state="active"]'
                activeKey={presetMode}
                className="p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40"
                pillClassName="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg shadow-2xs"
              >
                <div className="flex items-center gap-0.5 relative z-10">
                  {(["store", "feed", "wallet"] as PresetMode[]).map((mode) => {
                    const isSelected = presetMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        data-hover-item="true"
                        data-state={isSelected ? "active" : "inactive"}
                        onClick={() => setPresetMode(mode)}
                        className={cn(
                          "px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer active:scale-95",
                          isSelected
                            ? "text-[var(--text-primary)] font-semibold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </SlidingHighlightContainer>
            </div>

            {/* Phone Wrapper with circle button on the left edge */}
            <div className="relative">
              {/* Circle button with arrow to move mobile app template view beyond right edge */}
              <button
                type="button"
                onClick={() => setIsPhoneVisible(false)}
                className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-40 h-8 w-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] shadow-lg hover:scale-110 active:scale-95 items-center justify-center transition-all duration-200 cursor-pointer group"
                title="Move mobile view beyond right edge"
                aria-label="Move mobile view beyond right edge"
              >
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              {/* Sleek Minimalist Mobile Device Chassis Frame */}
              <div className="w-[360px] sm:w-[380px] h-[700px] rounded-[44px] bg-[#0c0d0e] border-[6px] border-[#1e2022] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative select-none">
              
              {/* Top Status Bar & Dynamic Island */}
              <div className="pt-3 pb-1 px-6 flex items-center justify-between shrink-0 z-40 bg-[#0c0d0e] text-neutral-400 text-[11px] font-mono">
                <span className="font-semibold text-white">9:41</span>
                
                <div className="w-24 h-5 rounded-full bg-black border border-neutral-800 flex items-center justify-center gap-1.5 px-2">
                  <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-neutral-700" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-[2px] border border-neutral-400 p-[1px] flex items-center">
                    <div className="h-full w-2.5 bg-neutral-200" />
                  </div>
                </div>
              </div>

              {/* ── Preset 1: Store View (Essential Archive) ── */}
              {presetMode === "store" && (
                <div className="flex-1 flex flex-col overflow-y-auto px-4 pt-3 pb-20 space-y-4 text-white">
                  {/* Store Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                        KILO STUDIO
                      </span>
                      <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                        Essential Archive
                      </h2>
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsSheetOpen(true)}
                        className="h-8 w-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-black font-mono font-bold text-[9px] flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Search Input */}
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search apparel..."
                      className="w-full h-9 pl-9 pr-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs text-white placeholder:text-neutral-500 font-sans focus:outline-none"
                      readOnly
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    {[
                      { id: "all", label: "All (24)" },
                      { id: "outerwear", label: "Outerwear" },
                      { id: "footwear", label: "Footwear" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setStoreCategory(cat.id)}
                        className={cn(
                          "px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap active:scale-95",
                          storeCategory === cat.id
                            ? "bg-white text-black border-white font-semibold"
                            : "bg-neutral-900 border-neutral-800 text-neutral-400"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Hero Product Card */}
                  <div className="p-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-400 font-semibold">
                        DROP 01
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleLike("parka-1")}
                        className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            likedItems.includes("parka-1") && "fill-rose-500 text-rose-500"
                          )}
                        />
                      </button>
                    </div>

                    <div className="py-5 flex flex-col items-center justify-center text-center space-y-1 border-y border-neutral-800/40 my-1">
                      <span className="font-mono text-sm tracking-wider text-neutral-200 font-semibold">
                        [ MODULAR PARKA ]
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Interactive 3D model
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-xs font-bold text-white">Technical Shell 3L</div>
                        <div className="text-[10px] font-mono text-neutral-400">$245.00</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCartCount((c) => c + 1);
                          setIsSheetOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                      >
                        Quick Buy
                      </button>
                    </div>
                  </div>

                  {/* Saved Items */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Saved</span>
                      <span className="text-[10px] text-neutral-500">Swipe ⇄</span>
                    </div>

                    <SwipeActionCard
                      threshold={60}
                      rightActions={[
                        {
                          id: "del-tee",
                          label: "Delete",
                          variant: "destructive",
                          icon: <Trash2 className="h-3.5 w-3.5" />,
                          onClick: () => {},
                        },
                      ]}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">Oversized Heavy Tee</div>
                          <div className="text-[10px] text-neutral-400 font-mono">Raw Black • L</div>
                        </div>
                        <span className="font-mono text-xs font-bold text-white">$65</span>
                      </div>
                    </SwipeActionCard>
                  </div>
                </div>
              )}

              {/* ── Preset 2: Feed View ── */}
              {presetMode === "feed" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-white">
                      Feed
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSheetOpen(true)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white"
                    >
                      Inspect
                    </button>
                  </div>

                  <PullToRefresh onRefresh={handleRefreshFeed} className="flex-1 p-3 space-y-2 overflow-y-auto pb-20">
                    {feedItems.map((item) => (
                      <SwipeActionCard
                        key={item.id}
                        threshold={60}
                        rightActions={[
                          {
                            id: `del-${item.id}`,
                            label: "Delete",
                            variant: "destructive",
                            icon: <Trash2 className="h-3.5 w-3.5" />,
                            onClick: () => setFeedItems((prev) => prev.filter((i) => i.id !== item.id)),
                          },
                        ]}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] font-bold text-white">{item.sender}</span>
                          <span className="font-mono text-[9px] text-neutral-500">{item.time}</span>
                        </div>
                        <div className="text-xs text-neutral-300 line-clamp-1">{item.subject}</div>
                      </SwipeActionCard>
                    ))}
                  </PullToRefresh>
                </div>
              )}

              {/* ── Preset 3: Wallet View ── */}
              {presetMode === "wallet" && (
                <div className="flex-1 flex flex-col overflow-y-auto px-4 pt-3 pb-20 space-y-4 text-white">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                      ASSETS
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                      Balance
                    </h2>
                  </div>

                  <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-3">
                    <div className="text-[10px] font-mono text-neutral-400">Total Net Value</div>
                    <div className="text-2xl font-bold font-mono text-white">$24,850.40</div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSheetOpen(true)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                      >
                        <Send className="h-3 w-3" />
                        <span>Send</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSheetOpen(true)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-neutral-800 bg-neutral-950 text-white font-mono text-xs hover:bg-neutral-900 active:scale-95 transition-all cursor-pointer"
                      >
                        <ArrowDownLeft className="h-3 w-3" />
                        <span>Deposit</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-neutral-400">Recent</div>
                    {[
                      { title: "Kilo Studio", amount: "-$145.00", time: "10:24 AM" },
                      { title: "Direct Wire", amount: "+$2,400.00", time: "Yesterday" },
                    ].map((tx) => (
                      <div
                        key={tx.title}
                        className="p-3 rounded-xl border border-neutral-800/60 bg-neutral-950/40 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{tx.title}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">{tx.time}</div>
                        </div>
                        <span className={cn("font-mono text-xs font-bold", tx.amount.startsWith("+") ? "text-emerald-400" : "text-white")}>
                          {tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom In-Chassis Dock */}
              <FloatingActionDock
                className="absolute inset-x-0 bottom-3 z-30 flex justify-center pointer-events-none"
                dockClassName="scale-90"
                primaryAction={{
                  label: "Action",
                  icon: <Plus className="h-3.5 w-3.5" />,
                  onClick: () => setIsSheetOpen(true),
                }}
                items={[
                  {
                    id: "home",
                    label: "Home",
                    icon: <Home className="h-3.5 w-3.5" />,
                    onClick: () => setDockSelected("home"),
                    active: dockSelected === "home",
                  },
                  {
                    id: "explore",
                    label: "Explore",
                    icon: <Compass className="h-3.5 w-3.5" />,
                    onClick: () => setDockSelected("explore"),
                    active: dockSelected === "explore",
                  },
                  {
                    id: "alerts",
                    label: "Alerts",
                    icon: <Bell className="h-3.5 w-3.5" />,
                    onClick: () => setDockSelected("alerts"),
                    active: dockSelected === "alerts",
                    badge: 2,
                  },
                ]}
              />

              {/* Bottom Bezel Line */}
              <div className="h-3 w-full flex items-center justify-center shrink-0 z-40 bg-[#0c0d0e]">
                <div className="w-28 h-1 rounded-full bg-neutral-600/50" />
              </div>

              {/* In-Chassis Bottom Sheet */}
              <MobileBottomSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                inline={true}
                title="Checkout"
                description="Confirm shipping and place order"
                snapPoints={[0.45, 0.88]}
                footer={
                  <button
                    type="button"
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold font-mono hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
                  >
                    Confirm &amp; Pay $245.00
                  </button>
                }
              >
                <div className="space-y-3 text-xs text-neutral-300">
                  <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Items:</span>
                      <span className="text-white font-bold">{cartCount} items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Delivery:</span>
                      <span className="text-emerald-400 font-bold">Free Express</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                    Swipe downward or drag the handle to dismiss.
                  </p>
                </div>
              </MobileBottomSheet>

            </div>
          </div>
        </div>

      </div>
    </div>

      {/* Small circle button with arrow to bring mobile view back */}
      {!isPhoneVisible && (
        <button
          type="button"
          onClick={() => setIsPhoneVisible(true)}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] shadow-2xl hover:bg-[var(--surface-secondary)] hover:border-[var(--border-hover)] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer group animate-in fade-in slide-in-from-right-4 duration-300"
          title="Bring back mobile preview"
          aria-label="Bring back mobile preview"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>
      )}
    </div>
  );
}

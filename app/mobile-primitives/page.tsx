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
  RotateCcw,
  Activity,
  Check,
  Copy,
  ChevronDown,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ArrowRight,
  Zap,
  CreditCard,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
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
  const [searchQuery, setSearchQuery] = React.useState<string>("" );
  const [presetMode, setPresetMode] = React.useState<PresetMode>("store");
  const [copiedCli, setCopiedCli] = React.useState(false);

  // Store Preset state
  const [storeCategory, setStoreCategory] = React.useState<string>("all");
  const [cartCount, setCartCount] = React.useState(2);
  const [likedItems, setLikedItems] = React.useState<string[]>(["parka-1"]);

  // Feed Preset state
  const [feedItems, setFeedItems] = React.useState([
    { id: "1", sender: "Architecture Board", subject: "M3 Surface elevation token mapping review", time: "12m ago", tag: "Design" },
    { id: "2", sender: "Telemetry Core", subject: "Sub-millisecond frame dispatch rate confirmed", time: "34m ago", tag: "Kernel" },
    { id: "3", sender: "AST Validator", subject: "All 5 mobile primitives schema compliance check", time: "1h ago", tag: "AST" },
  ]);

  // Card 01 Interactive Sheet State
  const [cardSheetSelected, setCardSheetSelected] = React.useState<"express" | "standard">("express");

  // Card 03 Interactive Thumb Segment State
  const [cardSegmentValue, setCardSegmentValue] = React.useState<string>("week");

  // Bottom Sheet inspection state in phone frame
  const [isSheetOpen, setIsSheetOpen] = React.useState<boolean>(false);
  const [activeSnapIndex, setActiveSnapIndex] = React.useState<number>(0);
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
      { id: `${Date.now()}`, sender: "Sync Dispatch", subject: "Real-time buffer refreshed", time: "Just now", tag: "Live" },
      ...prev.slice(0, 3),
    ]);
  };

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 min-h-0 bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans">
      {/* ── Top Header Bar ── */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/40 px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
              PRODUCTION MOBILE PRIMITIVES
            </span>
            <span className="font-mono text-[10px] text-[var(--text-muted)] hidden sm:inline">
              // M3 TOUCH COMPLIANT // GESTURE DRIVEN
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
                Kilo/MobileUi
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-sans">
                Ui Premitives for your next mobile app.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="#primitives-grid"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Primitives</span>
                <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </a>

              <button
                type="button"
                onClick={handleCopyCli}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--text-secondary)] text-xs font-mono text-[var(--text-primary)] active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <span className="text-[var(--text-muted)]">CLI:</span>
                <code>npx @kilo-ui/cli add mobile</code>
                {copiedCli ? (
                  <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Filter Bar & Live Search ── */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-primary)] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <SlidingHighlightContainer
            activeSelector='[data-state="active"]'
            activeKey={activeCategory}
            className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs font-mono select-none"
            pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg shadow-2xs"
          >
            {[
              { id: "all", label: "All Primitives (24)" },
              { id: "sheets", label: "Sheets & Drawers" },
              { id: "gestures", label: "Gestures & Swipes" },
              { id: "thumb", label: "Thumb Controls" },
              { id: "floating", label: "Floating Bars" },
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
                    "relative z-10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap active:scale-95",
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

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 24 primitives..."
                className="h-8 pl-8 pr-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/50 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] w-48 sm:w-56 font-mono"
              />
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0 hidden sm:inline">
              Showing 4 core
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Viewport: Left Bento 2x2, Right Phone Preset UI ── */}
      <div id="primitives-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT COLUMN (7 COLS): 2x2 Bento Primitives Grid ── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* ── Card 01: MobileBottomSheet ── */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--border-hover)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  01 <span className="ml-1 text-[var(--text-primary)]">MobileBottomSheet</span>
                </span>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  bottom-sheet.tsx
                </code>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                Multi-snap physics with velocity fling detection, tactile drag handle, and rubber-band overscroll.
              </p>
            </div>

            {/* Interactive Preview Container */}
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-primary)] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Delivery Option</span>
                <span className="text-[10px] text-[var(--accent-green)]">0.42 snap</span>
              </div>
              
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setCardSheetSelected("express")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                    cardSheetSelected === "express"
                      ? "border-[var(--border-hover)] bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                      : "border-transparent hover:bg-[var(--surface-secondary)]/50 text-[var(--text-muted)]"
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
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                    cardSheetSelected === "standard"
                      ? "border-[var(--border-hover)] bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                      : "border-transparent hover:bg-[var(--surface-secondary)]/50 text-[var(--text-muted)]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    <span>Standard Freight</span>
                  </div>
                  <span className="text-[var(--accent-green)] font-bold">Free</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between pt-1 border-t border-[var(--border)]/50">
              <span>M3 calibrated drag physics</span>
              <span className="text-[var(--accent-green)]">● Ready</span>
            </div>
          </div>

          {/* ── Card 02: SwipeActionCard ── */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--border-hover)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  02 <span className="ml-1 text-[var(--text-primary)]">SwipeActionCard</span>
                </span>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  swipe-card.tsx
                </code>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                Bidirectional swipe drawers with rubber-band spring resistance and haptic trigger threshold.
              </p>
            </div>

            {/* Interactive Preview Container */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-primary)]">
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
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-muted)]">
                    <span>⇄</span>
                  </div>
                </div>
              </SwipeActionCard>
            </div>

            <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between pt-1 border-t border-[var(--border)]/50">
              <span>Threshold: 72px • Spring rubber-band</span>
              <span className="text-[var(--accent-green)]">● Damped</span>
            </div>
          </div>

          {/* ── Card 03: ThumbSegmentController ── */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--border-hover)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  03 <span className="ml-1 text-[var(--text-primary)]">ThumbSegmentController</span>
                </span>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  thumb-segment.tsx
                </code>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                Ergonomic thumb target reach, sliding active pill with M3 spring cubic-bezier, haptic scale.
              </p>
            </div>

            {/* Interactive Preview Container */}
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-primary)]">
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

            <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between pt-1 border-t border-[var(--border)]/50">
              <span>48px ergonomic touch reach</span>
              <span className="text-[var(--accent-green)]">● M3 Spring</span>
            </div>
          </div>

          {/* ── Card 04: FloatingActionDock ── */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col justify-between space-y-4 shadow-sm hover:border-[var(--border-hover)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                  04 <span className="ml-1 text-[var(--text-primary)]">FloatingActionDock</span>
                </span>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  floating-dock.tsx
                </code>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                Bottom safe-area floating navigation pill with inverted high-contrast monochrome FAB.
              </p>
            </div>

            {/* Interactive Preview Container */}
            <div className="p-3 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-primary)]">
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
                    id: "profile",
                    label: "Profile",
                    icon: <Bell className="h-3.5 w-3.5" />,
                    onClick: () => {},
                  },
                ]}
              />
            </div>

            <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between pt-1 border-t border-[var(--border)]/50">
              <span>Safe area anchored • Elevation M3</span>
              <span className="text-[var(--accent-green)]">● Floating</span>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN (5 COLS): Preset UI Phone Showcase ── */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          
          {/* Preset Mode Controls & Heading */}
          <div className="w-full flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[var(--text-primary)]">
                Preset UI
              </h3>
              <p className="text-[11px] text-[var(--text-muted)] font-mono">
                Premade template UI designs for different styles
              </p>
            </div>

            {/* Preset Switcher (Store | Feed | Wallet) with Sliding Spring Physics */}
            <SlidingHighlightContainer
              activeSelector='[data-state="active"]'
              activeKey={presetMode}
              className="p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50"
              pillClassName="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg shadow-2xs"
            >
              <div className="flex items-center gap-1 relative z-10">
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
                        "px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-all cursor-pointer active:scale-95",
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

          {/* Live Mobile Device Chassis Frame */}
          <div className="w-[360px] sm:w-[380px] h-[720px] rounded-[44px] bg-[#0d0e10] border-[6px] border-[#222426] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative select-none">
            
            {/* Top Status Bar & Dynamic Island */}
            <div className="pt-3 pb-1 px-6 flex items-center justify-between shrink-0 z-40 bg-[#0d0e10] text-neutral-400 text-[11px] font-mono">
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
                      KILO STUDIO // APPAREL
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

                {/* Mobile Search Bar */}
                <div className="relative">
                  <Search className="h-3.5 w-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search heavyweight cotton, nylon..."
                    className="w-full h-9 pl-9 pr-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 font-sans focus:outline-none"
                    readOnly
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
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
                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-400 font-bold">
                      SPRING DROP
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

                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-1 border-y border-neutral-800/60 my-2">
                    <span className="font-mono text-sm tracking-widest text-neutral-200 font-semibold">
                      [ MODULAR PARKA 01 ]
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Touch-drag to rotate
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <div className="text-xs font-bold text-white">Technical Shell 3L</div>
                      <div className="text-[10px] font-mono text-neutral-400">Waterproof ripstop monochrome</div>
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

                {/* Saved Items Swipe Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Saved Items</span>
                    <span className="text-[10px] text-neutral-500">Swipe left to delete</span>
                  </div>

                  <SwipeActionCard
                    threshold={60}
                    rightActions={[
                      {
                        id: "del-tee",
                        label: "Remove",
                        variant: "destructive",
                        icon: <Trash2 className="h-3.5 w-3.5" />,
                        onClick: () => {},
                      },
                    ]}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Heavy Oversized Tee</div>
                        <div className="text-[10px] text-neutral-400 font-mono">Size L • Raw Black</div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white">$65.00</span>
                    </div>
                  </SwipeActionCard>
                </div>
              </div>
            )}

            {/* ── Preset 2: Feed View (Inbox & Telemetry) ── */}
            {presetMode === "feed" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Feed Protocol
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSheetOpen(true)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white"
                  >
                    Details
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

            {/* ── Preset 3: Wallet View (Finance & Assets) ── */}
            {presetMode === "wallet" && (
              <div className="flex-1 flex flex-col overflow-y-auto px-4 pt-3 pb-20 space-y-4 text-white">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                    LEDGER // ASSETS
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-white font-sans">
                    Universal Wallet
                  </h2>
                </div>

                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 space-y-3">
                  <div className="text-[10px] font-mono text-neutral-400">Total Net Balance</div>
                  <div className="text-2xl font-bold font-mono text-white">$24,850.40</div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSheetOpen(true)}
                      className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="h-3 w-3" />
                      <span>Transfer</span>
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
                  <div className="text-[11px] font-mono text-neutral-400">Recent Transactions</div>
                  {[
                    { title: "Kilo Studio Checkout", amount: "-$145.00", time: "Today 10:24 AM" },
                    { title: "Direct Wire Deposit", amount: "+$2,400.00", time: "Yesterday" },
                  ].map((tx) => (
                    <div
                      key={tx.title}
                      className="p-3 rounded-xl border border-neutral-800/80 bg-neutral-950/60 flex items-center justify-between"
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

            {/* In-Chassis Floating Dock (Shared across presets) */}
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

            {/* Bottom Hardware Home Bar */}
            <div className="h-3 w-full flex items-center justify-center shrink-0 z-40 bg-[#0d0e10]">
              <div className="w-28 h-1 rounded-full bg-neutral-600/60" />
            </div>

            {/* In-Chassis Bottom Sheet */}
            <MobileBottomSheet
              open={isSheetOpen}
              onOpenChange={setIsSheetOpen}
              inline={true}
              title="Cart Checkout & Delivery"
              description="Confirm address & shipping method"
              snapPoints={[0.45, 0.88]}
              currentSnapIndex={activeSnapIndex}
              onSnapChange={setActiveSnapIndex}
              footer={
                <button
                  type="button"
                  onClick={() => setIsSheetOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-bold font-mono hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
                >
                  Confirm &amp; Place Order
                </button>
              }
            >
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-400">Total Items:</span>
                    <span className="text-white font-bold">{cartCount} items</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-neutral-400">Shipping:</span>
                    <span className="text-emerald-400 font-bold">Free Express</span>
                  </div>
                  <div className="h-px bg-neutral-800 my-1" />
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-bold">Estimated Total:</span>
                    <span className="text-white font-bold">$245.00</span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  Fling downward or pull the tactile monochrome drag handle to dismiss.
                </p>
              </div>
            </MobileBottomSheet>

          </div>
        </div>

      </div>
    </div>
  );
}

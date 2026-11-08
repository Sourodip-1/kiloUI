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
  RotateCcw,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileBottomSheet } from "@/components/ui/mobile-bottom-sheet";
import { SwipeActionCard } from "@/components/ui/swipe-action-card";
import { ThumbSegmentController } from "@/components/ui/thumb-segment-controller";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { CodeBlock } from "@/components/code-block";

// Device frame presets
type DevicePreset = "iphone" | "pixel" | "compact";

interface DeviceSpec {
  name: string;
  width: number;
  height: number;
  islandWidth: number;
  cornerRadius: string;
}

const DEVICE_SPECS: Record<DevicePreset, DeviceSpec> = {
  iphone: {
    name: "iPhone 16 Pro",
    width: 393,
    height: 780,
    islandWidth: 110,
    cornerRadius: "rounded-[46px]",
  },
  pixel: {
    name: "Pixel 9 Pro",
    width: 408,
    height: 790,
    islandWidth: 32,
    cornerRadius: "rounded-[42px]",
  },
  compact: {
    name: "Compact Device",
    width: 360,
    height: 720,
    islandWidth: 28,
    cornerRadius: "rounded-[36px]",
  },
};

interface FeedItem {
  id: string;
  sender: string;
  subject: string;
  timestamp: string;
  tag: string;
}

const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: "item-1",
    sender: "Architecture Board",
    subject: "M3 Surface elevation token mapping review",
    timestamp: "12m ago",
    tag: "Design",
  },
  {
    id: "item-2",
    sender: "Telemetry Core",
    subject: "Sub-millisecond frame dispatch rate confirmed",
    timestamp: "34m ago",
    tag: "Kernel",
  },
  {
    id: "item-3",
    sender: "AST Validator",
    subject: "All 5 mobile primitives schema compliance check",
    timestamp: "1h ago",
    tag: "AST",
  },
  {
    id: "item-4",
    sender: "Physics Engine",
    subject: "Damped spring tension curve tuning complete",
    timestamp: "2h ago",
    tag: "Physics",
  },
];

export default function MobilePrimitivesPage() {
  const [device, setDevice] = React.useState<DevicePreset>("iphone");
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [feedItems, setFeedItems] = React.useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [isSheetOpen, setIsSheetOpen] = React.useState<boolean>(false);
  const [activeSnapIndex, setActiveSnapIndex] = React.useState<number>(0);
  const [selectedDockItem, setSelectedDockItem] = React.useState<string>("home");

  // Telemetry HUD state
  const [telemetry, setTelemetry] = React.useState<{
    lastGesture: string;
    dragOffset: string;
    velocity: string;
    snapState: string;
    selectedSegment: string;
    interactionCount: number;
  }>({
    lastGesture: "IDLE",
    dragOffset: "0px",
    velocity: "0.00 px/ms",
    snapState: "COLLAPSED",
    selectedSegment: "all",
    interactionCount: 0,
  });

  const recordTelemetry = (gesture: string, details?: { offset?: string; velocity?: string; snap?: string; segment?: string }) => {
    setTelemetry((prev) => ({
      lastGesture: gesture,
      dragOffset: details?.offset || prev.dragOffset,
      velocity: details?.velocity || prev.velocity,
      snapState: details?.snap || prev.snapState,
      selectedSegment: details?.segment || prev.selectedSegment,
      interactionCount: prev.interactionCount + 1,
    }));
  };

  const handleRefresh = async () => {
    recordTelemetry("PULL_TO_REFRESH", { offset: "72px (threshold met)", velocity: "release" });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const newItem: FeedItem = {
      id: `item-${Date.now()}`,
      sender: "Runtime Sync",
      subject: `Fresh buffer updated at ${new Date().toLocaleTimeString()}`,
      timestamp: "Just now",
      tag: "Live",
    };
    setFeedItems((prev) => [newItem, ...prev.slice(0, 4)]);
    recordTelemetry("REFRESH_COMPLETE", { offset: "0px", velocity: "0.00 px/ms" });
  };

  const currentDevice = DEVICE_SPECS[device];

  const SEGMENT_ITEMS = [
    { id: "all", label: "All Feed", badge: feedItems.length },
    { id: "starred", label: "Pinned", badge: 2 },
    { id: "system", label: "System" },
  ];

  return (
    <div className="flex-1 min-h-0 bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans">
      {/* Top Banner Header */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)]/40 px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
                PRODUCTION MOBILE PRIMITIVES
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                M3 COMPLIANT // GESTURE DRIVEN
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
              Mobile App Primitives
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl font-sans">
              Calibrated touch targets, hardware-accelerated spring gestures, and tactile monochrome feedback. Strictly free of glowing circles or colorful gradients.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-right">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Primitives</div>
              <div className="font-mono text-base font-bold text-[var(--text-primary)]">5 Active</div>
            </div>
            <div className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-right">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Touch Target</div>
              <div className="font-mono text-base font-bold text-[var(--text-primary)]">≥ 46px</div>
            </div>
            <div className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-right">
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Aesthetic</div>
              <div className="font-mono text-base font-bold text-[var(--text-primary)]">Monochrome</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Viewport: Left Simulator Chassis, Right Telemetry & Documentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Phone Chassis Simulator Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Chassis Controls Bar */}
          <div className="w-full flex items-center justify-between pb-4">
            <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-xs">
              {(["iphone", "pixel", "compact"] as DevicePreset[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setDevice(p)}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-mono text-[11px] font-medium transition-colors cursor-pointer",
                    device === p
                      ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {DEVICE_SPECS[p].name.split(" ")[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setFeedItems(INITIAL_FEED_ITEMS);
                setIsSheetOpen(false);
                recordTelemetry("RESET_SIMULATOR", { offset: "0px", velocity: "0.00 px/ms", snap: "COLLAPSED" });
              }}
              className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded border border-[var(--border)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
              title="Reset Simulator"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Interactive Phone Frame */}
          <div
            style={{
              width: `${currentDevice.width}px`,
              height: `${currentDevice.height}px`,
            }}
            className={cn(
              "relative bg-[#0d0e10] border-[6px] border-[#222426] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden transition-all duration-300 select-none",
              currentDevice.cornerRadius
            )}
          >
            {/* Top Device Hardware Bezel & Island */}
            <div className="relative pt-3 pb-1 px-6 flex items-center justify-between shrink-0 z-40 bg-[#0d0e10] text-neutral-400 text-[11px] font-mono">
              <span className="font-semibold text-white">9:41</span>

              {/* Dynamic Island / Notch */}
              <div
                style={{ width: `${currentDevice.islandWidth}px` }}
                className="h-5 rounded-full bg-black border border-neutral-800/80 flex items-center justify-center gap-1.5 px-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
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

            {/* In-Chassis Header */}
            <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--surface-elevated)]/60 shrink-0 z-20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-xs font-mono font-bold tracking-wider text-[var(--text-primary)] uppercase">
                    Kilo Mobile OS
                  </h2>
                  <p className="text-[10px] font-mono text-[var(--text-muted)]">
                    PULL DOWN OR SWIPE CARDS
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSheetOpen(true);
                    recordTelemetry("BOTTOM_SHEET_TRIGGER", { snap: "SNAP_0 (38%)" });
                  }}
                  className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[10px] font-mono font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] active:scale-95 transition-all cursor-pointer"
                >
                  Inspect Sheet
                </button>
              </div>

              {/* Ergonomic Thumb Segment Controller (46px Thumb Target) */}
              <ThumbSegmentController
                items={SEGMENT_ITEMS}
                value={activeTab}
                onChange={(val) => {
                  setActiveTab(val);
                  recordTelemetry("SEGMENT_CHANGED", { segment: val });
                }}
                size="default"
              />
            </div>

            {/* Scrollable Container with Pull-to-Refresh Gesture */}
            <div className="flex-1 relative overflow-hidden min-h-0">
              <PullToRefresh
                onRefresh={handleRefresh}
                pullThreshold={72}
                maxPull={120}
                className="p-3 space-y-2.5 pb-24"
              >
                {feedItems.map((item) => (
                  <SwipeActionCard
                    key={item.id}
                    leftActions={[
                      {
                        id: `pin-${item.id}`,
                        label: "Pin",
                        icon: <Pin className="h-4 w-4" />,
                        onClick: () => recordTelemetry("ACTION_PIN", { offset: "144px" }),
                      },
                      {
                        id: `bookmark-${item.id}`,
                        label: "Bookmark",
                        icon: <Bookmark className="h-4 w-4" />,
                        onClick: () => recordTelemetry("ACTION_BOOKMARK", { offset: "72px" }),
                      },
                    ]}
                    rightActions={[
                      {
                        id: `archive-${item.id}`,
                        label: "Archive",
                        icon: <Archive className="h-4 w-4" />,
                        onClick: () => recordTelemetry("ACTION_ARCHIVE", { offset: "-72px" }),
                      },
                      {
                        id: `delete-${item.id}`,
                        label: "Delete",
                        variant: "destructive",
                        icon: <Trash2 className="h-4 w-4" />,
                        onClick: () => {
                          recordTelemetry("ACTION_DELETE", { offset: "-144px" });
                          setFeedItems((prev) => prev.filter((i) => i.id !== item.id));
                        },
                      },
                    ]}
                    threshold={72}
                    fullSwipeThreshold={180}
                    onActionTrigger={(actionId, direction) => {
                      recordTelemetry("FULL_SWIPE_TRIGGERED", {
                        offset: direction === "left" ? "-180px" : "180px",
                      });
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold text-[var(--text-primary)]">
                        {item.sender}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)]">
                        {item.timestamp}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] font-sans line-clamp-1">
                      {item.subject}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                        {item.tag}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)]">
                        Swipe ⇄
                      </span>
                    </div>
                  </SwipeActionCard>
                ))}
              </PullToRefresh>

              {/* In-Chassis Mobile Bottom Sheet (Inline Mode) */}
              <MobileBottomSheet
                open={isSheetOpen}
                onOpenChange={(open) => {
                  setIsSheetOpen(open);
                  recordTelemetry(open ? "SHEET_OPENED" : "SHEET_CLOSED", {
                    snap: open ? `SNAP_${activeSnapIndex}` : "COLLAPSED",
                  });
                }}
                inline={true}
                title="Telemetry Inspector"
                description="Live gesture physics analysis"
                snapPoints={[0.42, 0.88]}
                currentSnapIndex={activeSnapIndex}
                onSnapChange={(idx) => {
                  setActiveSnapIndex(idx);
                  recordTelemetry("SHEET_SNAP_CHANGED", {
                    snap: idx === 0 ? "SNAP_0 (42%)" : "SNAP_1 (88%)",
                  });
                }}
                footer={
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSheetOpen(false)}
                      className="w-full py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                    >
                      Dismiss Sheet
                    </button>
                  </div>
                }
              >
                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/50">
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-1">
                      Physics Engine State
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div>Velocity Fling: <span className="text-[var(--text-primary)]">v &gt; 0.45 px/ms</span></div>
                      <div>Rubber Band: <span className="text-[var(--text-primary)]">d = 0.20</span></div>
                      <div>Snap Ease: <span className="text-[var(--text-primary)]">cubic-bezier</span></div>
                      <div>Duration: <span className="text-[var(--text-primary)]">320ms</span></div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    Grab and drag the tactile monochrome handle above. A quick downward fling will dismiss or step down snap breakpoints.
                  </p>
                </div>
              </MobileBottomSheet>
            </div>

            {/* Floating Action Dock Anchored at Bottom */}
            <FloatingActionDock
              className="absolute inset-x-0 bottom-2 z-25 flex justify-center pointer-events-none"
              dockClassName="scale-90 sm:scale-100"
              primaryAction={{
                label: "Inspect",
                icon: <Plus className="h-3.5 w-3.5" />,
                onClick: () => {
                  setIsSheetOpen(true);
                  recordTelemetry("FAB_PRIMARY_TAP", { snap: "SNAP_0 (42%)" });
                },
              }}
              items={[
                {
                  id: "home",
                  label: "Home",
                  icon: <Home className="h-4 w-4" />,
                  onClick: () => {
                    setSelectedDockItem("home");
                    recordTelemetry("DOCK_ITEM_TAP", { segment: "home" });
                  },
                  active: selectedDockItem === "home",
                },
                {
                  id: "explore",
                  label: "Explore",
                  icon: <Compass className="h-4 w-4" />,
                  onClick: () => {
                    setSelectedDockItem("explore");
                    recordTelemetry("DOCK_ITEM_TAP", { segment: "explore" });
                  },
                  active: selectedDockItem === "explore",
                },
                {
                  id: "alerts",
                  label: "Alerts",
                  icon: <Bell className="h-4 w-4" />,
                  onClick: () => {
                    setSelectedDockItem("alerts");
                    recordTelemetry("DOCK_ITEM_TAP", { segment: "alerts" });
                  },
                  active: selectedDockItem === "alerts",
                  badge: 2,
                },
              ]}
            />

            {/* Bottom Hardware Home Indicator Bar */}
            <div className="h-3 w-full flex items-center justify-center shrink-0 z-40 bg-[#0d0e10]">
              <div className="w-28 h-1 rounded-full bg-neutral-600/60" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Telemetry HUD, Architecture Overview, and Code Documentation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Telemetry Readout HUD */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[var(--text-primary)]" />
                <h3 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] font-mono">
                  LIVE GESTURE TELEMETRY HUD
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                EVENTS: {telemetry.interactionCount}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Last Gesture</div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate mt-1">
                  {telemetry.lastGesture}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Displacement</div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate mt-1">
                  {telemetry.dragOffset}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Velocity</div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate mt-1">
                  {telemetry.velocity}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]">
                <div className="text-[10px] text-[var(--text-muted)] uppercase">Snap State</div>
                <div className="text-xs font-bold text-[var(--text-primary)] truncate mt-1">
                  {telemetry.snapState}
                </div>
              </div>
            </div>
          </div>

          {/* Component Documentation Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)] font-sans">
              Registered Mobile Primitives
            </h3>

            {/* 1. Mobile Bottom Sheet */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] font-mono">
                    1. MobileBottomSheet
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Gesture drag physics, velocity fling detection, multi-snap points, tactile handle (w-9 h-1).
                  </p>
                </div>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  registry/ui/mobile-bottom-sheet.tsx
                </code>
              </div>

              <CodeBlock
                filename="mobile-bottom-sheet-demo.tsx"
                language="tsx"
                code={`import { MobileBottomSheet } from "@/components/ui/mobile-bottom-sheet";

export function BottomSheetDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <MobileBottomSheet
      open={open}
      onOpenChange={setOpen}
      title="Parameters"
      description="Swipe down or fling downward to dismiss"
      snapPoints={[0.38, 0.86]}
    >
      <div className="space-y-2">
        <p className="text-sm text-neutral-300">Sheet content body</p>
      </div>
    </MobileBottomSheet>
  );
}`}
              />
            </div>

            {/* 2. Swipe Action Card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] font-mono">
                    2. SwipeActionCard
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Bidirectional swipe drawers, damped spring friction, snap &amp; full-swipe triggers, vertical scroll lock.
                  </p>
                </div>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  registry/ui/swipe-action-card.tsx
                </code>
              </div>

              <CodeBlock
                filename="swipe-action-card-demo.tsx"
                language="tsx"
                code={`import { SwipeActionCard } from "@/components/ui/swipe-action-card";
import { Archive, Trash2, Pin } from "lucide-react";

export function SwipeDemo() {
  return (
    <SwipeActionCard
      leftActions={[{ id: "pin", label: "Pin", icon: <Pin className="h-4 w-4" /> }]}
      rightActions={[
        { id: "archive", label: "Archive", icon: <Archive className="h-4 w-4" /> },
        { id: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" />, variant: "destructive" },
      ]}
      threshold={72}
      fullSwipeThreshold={180}
    >
      <p className="text-sm">Swipe left or right to reveal actions</p>
    </SwipeActionCard>
  );
}`}
              />
            </div>

            {/* 3. Thumb Segment Controller */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] font-mono">
                    3. ThumbSegmentController
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Ergonomic 46px thumb target reach, sliding active pill with M3 spring cubic-bezier, haptic scale.
                  </p>
                </div>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  registry/ui/thumb-segment-controller.tsx
                </code>
              </div>

              <CodeBlock
                filename="thumb-segment-demo.tsx"
                language="tsx"
                code={`import { ThumbSegmentController } from "@/components/ui/thumb-segment-controller";

export function SegmentDemo() {
  const [tab, setTab] = React.useState("day");
  return (
    <ThumbSegmentController
      items={[
        { id: "day", label: "Day" },
        { id: "week", label: "Week", badge: 3 },
        { id: "month", label: "Month" },
      ]}
      value={tab}
      onChange={setTab}
      size="default" // 46px thumb target
    />
  );
}`}
              />
            </div>

            {/* 4. Pull to Refresh */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] font-mono">
                    4. PullToRefresh
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Overscroll pull detection, logarithmic tension curve, clean monochrome spinning arc.
                  </p>
                </div>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  registry/ui/pull-to-refresh.tsx
                </code>
              </div>

              <CodeBlock
                filename="pull-to-refresh-demo.tsx"
                language="tsx"
                code={`import { PullToRefresh } from "@/components/ui/pull-to-refresh";

export function RefreshDemo() {
  const handleRefresh = async () => {
    await fetch("/api/data");
  };
  return (
    <PullToRefresh onRefresh={handleRefresh} pullThreshold={72} maxPull={120}>
      <div className="p-4">Pull downward at top of scrollable feed to refresh</div>
    </PullToRefresh>
  );
}`}
              />
            </div>

            {/* 5. Floating Action Dock */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] font-mono">
                    5. FloatingActionDock
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Safe-area bottom anchoring, inverted high-contrast monochrome FAB, subtle M3 Level 3 elevation.
                  </p>
                </div>
                <code className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                  registry/ui/floating-action-dock.tsx
                </code>
              </div>

              <CodeBlock
                filename="floating-action-dock-demo.tsx"
                language="tsx"
                code={`import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { Home, Compass, Bell, Plus } from "lucide-react";

export function DockDemo() {
  return (
    <FloatingActionDock
      primaryAction={{
        label: "Create",
        icon: <Plus className="h-4 w-4" />,
        onClick: () => console.log("Create tapped"),
      }}
      items={[
        { id: "home", label: "Home", icon: <Home className="h-4 w-4" />, onClick: () => {}, active: true },
        { id: "explore", label: "Explore", icon: <Compass className="h-4 w-4" />, onClick: () => {} },
        { id: "alerts", label: "Alerts", icon: <Bell className="h-4 w-4" />, onClick: () => {}, badge: 2 },
      ]}
    />
  );
}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

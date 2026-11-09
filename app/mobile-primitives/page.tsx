"use client";

import * as React from "react";
import Link from "next/link";
import {
  Archive,
  Trash2,
  Bookmark,
  Pin,
  Plus,
  Minus,
  Fingerprint,
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
  ArrowLeft,
  User,
  Lock,
  Shield,
  Activity,
  RefreshCw,
  Sliders,
  Eye,
  EyeOff,
  Layers,
  Smartphone,
  CheckCircle2,
  Radio,
  ToggleLeft,
  MoreVertical,
  Menu,
  ArrowRight,
  Clock,
  Settings,
  Key,
  Cpu,
  Wifi,
  AlertCircle,
  ExternalLink,
  Edit3,
  Share2,
  Calendar,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { MobileBottomSheet } from "@/components/ui/mobile-bottom-sheet";
import { SwipeActionCard } from "@/components/ui/swipe-action-card";
import { ThumbSegmentController } from "@/components/ui/thumb-segment-controller";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { FloatingActionDock } from "@/components/ui/floating-action-dock";
import { M3Button } from "@/registry/ui/m3-button";
import { M3Fab } from "@/registry/ui/m3-fab";
import { M3SegmentedButton } from "@/registry/ui/m3-segmented-button";
import { M3IconButton } from "@/registry/ui/m3-icon-button";
import { M3Switch } from "@/registry/ui/m3-switch";
import { M3Checkbox } from "@/registry/ui/m3-checkbox";
import { M3RadioGroup } from "@/registry/ui/m3-radio";
import { M3Slider } from "@/registry/ui/m3-slider";
import { M3Chip } from "@/registry/ui/m3-chip";
import { M3TextField } from "@/registry/ui/m3-text-field";
import { M3SearchBar } from "@/registry/ui/m3-search-bar";
import { M3NavigationBar } from "@/registry/ui/m3-navigation-bar";
import { M3TopAppBar } from "@/registry/ui/m3-top-app-bar";
import { M3NavigationDrawer } from "@/registry/ui/m3-navigation-drawer";
import { M3Tabs } from "@/registry/ui/m3-tabs";
import { M3Card } from "@/registry/ui/m3-card";
import { M3Dialog } from "@/registry/ui/m3-dialog";
import { M3Snackbar } from "@/registry/ui/m3-snackbar";
import { M3ProgressIndicator } from "@/registry/ui/m3-progress-indicator";
import { M3SquigglyLoader } from "@/components/ui/m3-squiggly-loader";
import { M3PhysicsLoader } from "@/components/ui/m3-physics-loader";
import { M3Badge } from "@/registry/ui/m3-badge";
import { M3List, M3ListItem } from "@/registry/ui/m3-list";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import { useAppShell } from "@/components/app-shell";

type PresetMode =
  | "store"
  | "feed"
  | "pulse-sync"
  | "pulse-security"
  | "pulse-projects"
  | "otp-verify"
  | "wallet";

const PRESET_OPTIONS: { id: PresetMode; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: "store", label: "Store", sub: "Essential Archive", icon: <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" /> },
  { id: "feed", label: "Feed", sub: "Communication", icon: <Radio className="h-3.5 w-3.5 text-blue-400" /> },
  { id: "pulse-sync", label: "Pulse Sync", sub: "Cloud Engine", icon: <RefreshCw className="h-3.5 w-3.5 text-purple-400" /> },
  { id: "pulse-security", label: "Security", sub: "Biometrics", icon: <Shield className="h-3.5 w-3.5 text-amber-400" /> },
  { id: "pulse-projects", label: "Projects", sub: "Sprint Board", icon: <Layers className="h-3.5 w-3.5 text-cyan-400" /> },
  { id: "otp-verify", label: "OTP Verify", sub: "Auth Shield", icon: <Key className="h-3.5 w-3.5 text-rose-400" /> },
  { id: "wallet", label: "Wallet", sub: "Telemetry", icon: <Zap className="h-3.5 w-3.5 text-amber-300" /> },
];

type CategoryFilter = "all" | "actions" | "forms" | "navigation" | "overlays" | "data-display";

export default function MobilePrimitivesPage() {
  const { theme } = useAppShell();
  const [isLightMode, setIsLightMode] = React.useState(false);

  React.useEffect(() => {
    const checkLight = () => {
      return document.documentElement.classList.contains("light");
    };
    setIsLightMode(checkLight());

    const observer = new MutationObserver(() => {
      setIsLightMode(checkLight());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  // Page Controls
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [presetMode, setPresetMode] = React.useState<PresetMode>("store");
  const [isPresetDropdownOpen, setIsPresetDropdownOpen] = React.useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = React.useState(true);
  const [copiedCli, setCopiedCli] = React.useState(false);

  // ── Category Tabs Scroll Controls ──
  const tabsContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = React.useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = React.useState(false);

  const checkTabsScroll = React.useCallback(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    setCanScrollTabsLeft(el.scrollLeft > 4);
    setCanScrollTabsRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    checkTabsScroll();
    const el = tabsContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkTabsScroll, { passive: true });
    window.addEventListener("resize", checkTabsScroll);
    return () => {
      el.removeEventListener("scroll", checkTabsScroll);
      window.removeEventListener("resize", checkTabsScroll);
    };
  }, [checkTabsScroll]);

  const scrollTabs = (dir: "left" | "right") => {
    if (!tabsContainerRef.current) return;
    const offset = dir === "left" ? -180 : 180;
    tabsContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // ── Mobile Panel Section Wheel Scroll Chaining ──
  const mobilePanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = panel;
      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // Check if mobile panel section has scroll headroom
      const canScrollDown = scrollTop + clientHeight < scrollHeight - 3;
      const canScrollUp = scrollTop > 3;

      if ((isDown && canScrollDown) || (isUp && canScrollUp)) {
        // While the mobile panel section scrolls, the primitives DO NOT scroll
        e.preventDefault();
        panel.scrollTop += e.deltaY;
      } else {
        // When the mobile panel hits the dead end, then the primitives will be scrolled
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
    };

    panel.addEventListener("wheel", handleWheel, { passive: false });
    return () => panel.removeEventListener("wheel", handleWheel);
  }, []);

  // ── Bento Grid Interactive States ──
  // Actions
  const [demoBtnLoading, setDemoBtnLoading] = React.useState(false);
  const [demoFabOpen, setDemoFabOpen] = React.useState(false);
  const [demoSegmentVal, setDemoSegmentVal] = React.useState<string>("week");
  const [demoMultiSegments, setDemoMultiSegments] = React.useState<string[]>(["day", "week"]);
  const [demoIconBtnSelected, setDemoIconBtnSelected] = React.useState(false);
  const [demoDockSelected, setDemoDockSelected] = React.useState("home");

  // Forms & Inputs
  const [demoTextVal, setDemoTextVal] = React.useState("souro@kiloui.com");
  const [demoPasswordVal, setDemoPasswordVal] = React.useState("supersecret123");
  const [demoSwitchVal, setDemoSwitchVal] = React.useState(true);
  const [demoCheckboxVal, setDemoCheckboxVal] = React.useState(true);
  const [demoRadioVal, setDemoRadioVal] = React.useState("express");
  const [demoSliderVal, setDemoSliderVal] = React.useState(68);
  const [demoFilterChips, setDemoFilterChips] = React.useState<string[]>(["Material 3", "Next.js"]);
  const [demoOtpDigits, setDemoOtpDigits] = React.useState<string[]>(["8", "4", "2", "0", "", ""]);

  // Navigation
  const [demoNavTab, setDemoNavTab] = React.useState("home");
  const [demoTabsVal, setDemoTabsVal] = React.useState("overview");
  const [demoThumbSegment, setDemoThumbSegment] = React.useState("week");
  const [demoDrawerOpen, setDemoDrawerOpen] = React.useState(false);
  const [demoDrawerVal, setDemoDrawerVal] = React.useState("inbox");

  // Overlays
  const [demoSheetSelected, setDemoSheetSelected] = React.useState<"express" | "standard">("express");
  const [demoDialogOpen, setDemoDialogOpen] = React.useState(false);
  const [demoToastMsg, setDemoToastMsg] = React.useState<string | null>(null);

  // Data Display
  const [demoProgressVal, setDemoProgressVal] = React.useState(74);

  // Squiggly Loader Controls
  const [squigglyVariant, setSquigglyVariant] = React.useState<"circular" | "horizontal">("circular");
  const [squigglesCount, setSquigglesCount] = React.useState(14);
  const [squigglyAmp, setSquigglyAmp] = React.useState(4);
  const [squigglyColor, setSquigglyColor] = React.useState<"accent" | "blue" | "monochrome">("accent");

  // Physics Loader Controls
  const [physicsVariant, setPhysicsVariant] = React.useState<"shape-morph" | "elastic-line">("elastic-line");
  const [physicsTheme, setPhysicsTheme] = React.useState<"accent" | "google">("accent");
  const [physicsResistance, setPhysicsResistance] = React.useState(1);
  const [physicsSpeed, setPhysicsSpeed] = React.useState(1);

  // ── New Unique Mobile Primitive States ──
  const [demoQuantity, setDemoQuantity] = React.useState(2);
  const [islandExpanded, setIslandExpanded] = React.useState(false);
  const [snackbarActive, setSnackbarActive] = React.useState(true);
  const [biometricScanning, setBiometricScanning] = React.useState(false);
  const [biometricAuthenticated, setBiometricAuthenticated] = React.useState(false);

  // ── Phone Frame Preset States ──
  // Store Preset
  const [storeCategory, setStoreCategory] = React.useState<string>("all");
  const [cartCount, setCartCount] = React.useState(2);
  const [likedItems, setLikedItems] = React.useState<string[]>(["parka-1"]);

  // Feed Preset
  const [feedItems, setFeedItems] = React.useState([
    { id: "1", sender: "Architecture Board", subject: "M3 Surface elevation token mapping review", time: "12m" },
    { id: "2", sender: "Telemetry Core", subject: "Sub-millisecond frame dispatch rate confirmed", time: "34m" },
    { id: "3", sender: "AST Validator", subject: "All mobile primitives schema compliance check", time: "1h" },
    { id: "4", sender: "Design Systems", subject: "Expressive cubic bezier motion token release v2.4", time: "2h" },
    { id: "5", sender: "Security Enclave", subject: "Hardware biometrics passkey sync handshake ok", time: "3h" },
    { id: "6", sender: "Cloud Storage", subject: "Edge replica synchronization complete in 4 regions", time: "5h" },
    { id: "7", sender: "Kilo Studio", subject: "Spring physics membrane loader demo verified", time: "6h" },
    { id: "8", sender: "Package Registry", subject: "CLI bundle distribution ready on npm @0.3.0", time: "1d" },
  ]);

  // Pulse Sync Preset (Stitch Screen 1)
  const [pulseSyncActive, setPulseSyncActive] = React.useState(true);
  const [pulseNodes, setPulseNodes] = React.useState(8);

  // Pulse Security Preset (Stitch Screen 2)
  const [biometricEnabled, setBiometricEnabled] = React.useState(true);
  const [twoFactorActive, setTwoFactorActive] = React.useState(true);

  // Pulse Projects Preset (Stitch Screen 3)
  const [activeBoardTab, setActiveBoardTab] = React.useState("in-progress");

  // OTP Verification Preset (Stitch Screen 6)
  const [phoneOtpDigits, setPhoneOtpDigits] = React.useState<string[]>(["5", "9", "3", "1", "", ""]);
  const [otpVerified, setOtpVerified] = React.useState(false);

  // Phone Bottom Sheet
  const [isPhoneSheetOpen, setIsPhoneSheetOpen] = React.useState(false);
  const [phoneDockSelected, setPhoneDockSelected] = React.useState("home");

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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setFeedItems((prev) => [
      { id: `${Date.now()}`, sender: "Sync Dispatch", subject: "Real-time buffer refreshed", time: "now" },
      ...prev.slice(0, 3),
    ]);
  };

  const showToast = (msg: string) => {
    setDemoToastMsg(msg);
    setTimeout(() => setDemoToastMsg(null), 3000);
  };

  // Search and Category filtering
  const matchesSearch = (title: string, desc: string, cat: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      cat.toLowerCase().includes(q)
    );
  };

  const showCategory = (cat: CategoryFilter) => {
    if (activeCategory === "all") return true;
    return activeCategory === cat;
  };

  return (
    <div className="flex-1 min-h-0 bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans overflow-x-clip relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
              Mobile Primitives
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-sans max-w-2xl">
              Touch-calibrated gesture primitives, spring physics, and responsive presets matching Google Material Design 3 and minimal SaaS standards.
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

        {/* ── Category Filter Tabs & Instant Search Bar ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="relative flex items-center min-w-0 max-w-full">
            {/* Scroll Left Arrow Button */}
            {canScrollTabsLeft && (
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                className="absolute left-0 z-20 h-7 w-7 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-green)] flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90 shrink-0"
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            )}

            <SlidingHighlightContainer
              ref={tabsContainerRef}
              activeSelector='[data-state="active"]'
              activeKey={activeCategory}
              className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth text-xs font-mono select-none px-2"
              pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-lg shadow-2xs"
            >
              {[
                { id: "all", label: "All Primitives" },
                { id: "actions", label: "Actions" },
                { id: "forms", label: "Forms & Inputs" },
                { id: "navigation", label: "Navigation" },
                { id: "overlays", label: "Overlays" },
                { id: "data-display", label: "Data Display" },
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

            {/* Scroll Right Arrow Button */}
            {canScrollTabsRight && (
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                className="absolute right-0 z-20 h-7 w-7 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-green)] flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90 shrink-0"
                aria-label="Scroll categories right"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Field & Preset Preview Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter primitives..."
                className="w-full h-8.5 pl-8 pr-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 text-xs font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsPhoneVisible(!isPhoneVisible)}
              className={cn(
                "h-8.5 px-3 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 select-none",
                isPhoneVisible
                  ? "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-hover)]"
                  : "bg-[var(--accent-green-deep)] border-[var(--accent-green)]/40 text-[var(--accent-green)] font-semibold shadow-xs"
              )}
              title={isPhoneVisible ? "Hide Preview Phone" : "Show Preview Phone"}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isPhoneVisible ? "Hide Preview" : "Show Preview"}</span>
            </button>
          </div>
        </div>

        {/* ── Two-Column Layout: Left Bento Grid, Right Phone Simulator ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pt-2 relative">
          
          {/* ── LEFT COLUMN: Primitives Grid ── */}
          <div className="flex-1 min-w-0 grid gap-4 grid-cols-1 sm:grid-cols-2">

            {/* ════════ ACTIONS CATEGORY ════════ */}
            {showCategory("actions") && (
              <>
                {/* 01. M3 Buttons */}
                {matchesSearch("M3 Button", "Filled Tonal Elevated Outlined Text", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Link href="/components/m3-button" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                          M3 Buttons
                          <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                        </Link>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">5 Core Roles</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 py-1">
                      <M3Button
                        size="sm"
                        variant="filled"
                        onClick={() => showToast("Filled button triggered")}
                      >
                        Filled
                      </M3Button>
                      <M3Button
                        size="sm"
                        variant="tonal"
                        onClick={() => showToast("Tonal button triggered")}
                      >
                        Tonal
                      </M3Button>
                      <M3Button
                        size="sm"
                        variant="elevated"
                        onClick={() => showToast("Elevated button triggered")}
                      >
                        Elevated
                      </M3Button>
                      <M3Button
                        size="sm"
                        variant="outlined"
                        onClick={() => showToast("Outlined button triggered")}
                      >
                        Outlined
                      </M3Button>
                      <M3Button
                        size="sm"
                        variant="text"
                        onClick={() => showToast("Text button triggered")}
                      >
                        Text
                      </M3Button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>r: full • h: 40px</span>
                      <span className="text-[var(--accent-green)]">Spring Scale</span>
                    </div>
                  </div>
                )}

                {/* 02. M3 FAB & Speed Dial */}
                {matchesSearch("Floating Action Button", "M3 FAB Speed Dial Popover", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all relative">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-fab" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 FAB &amp; Dial
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Speed Dial</span>
                    </div>

                    <div className="py-2 flex items-center justify-center">
                      <M3Fab
                        size="default"
                        variant="primary"
                        label="Add"
                        open={demoFabOpen}
                        onOpenChange={setDemoFabOpen}
                        menuItems={[
                          { id: "note", label: "New Task", icon: <Edit3 className="h-4 w-4" />, onClick: () => showToast("Task created") },
                          { id: "sync", label: "Sync Telemetry", icon: <RefreshCw className="h-4 w-4" />, onClick: () => showToast("Syncing cluster...") },
                          { id: "share", label: "Share Sprint", icon: <Share2 className="h-4 w-4" />, onClick: () => showToast("Sprint link copied") },
                        ]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Click to toggle speed dial</span>
                      <span className="text-[var(--accent-green)]">Stagger 40ms</span>
                    </div>
                  </div>
                )}

                {/* 03. Segmented Button */}
                {matchesSearch("Segmented Button", "Single select multi select pill", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-segmented-button" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Segmented Buttons
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Single &amp; Multi</span>
                    </div>

                    <div className="space-y-3 py-1">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1.5">Single Select Pill</span>
                        <M3SegmentedButton
                          size="sm"
                          value={demoSegmentVal}
                          onChange={setDemoSegmentVal}
                          options={[
                            { id: "day", label: "Day" },
                            { id: "week", label: "Week" },
                            { id: "month", label: "Month" },
                          ]}
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1.5">Multi Select Filters</span>
                        <M3SegmentedButton
                          size="sm"
                          multiSelect
                          variant="multi-select"
                          value={demoMultiSegments}
                          onChange={setDemoMultiSegments}
                          options={[
                            { id: "day", label: "Day" },
                            { id: "week", label: "Week" },
                            { id: "year", label: "Year" },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>No frame overflow</span>
                      <span className="text-[var(--accent-green)]">Check pop</span>
                    </div>
                  </div>
                )}

                {/* 04. M3 Icon Buttons */}
                {matchesSearch("M3 Icon Button", "Standard tonal outlined filled", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-icon-button" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Icon Buttons
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">4 Variants</span>
                    </div>

                    <div className="flex items-center justify-around py-3">
                      <M3IconButton
                        variant="standard"
                        selected={demoIconBtnSelected}
                        onSelectedChange={setDemoIconBtnSelected}
                        icon={<Heart className="h-4.5 w-4.5" />}
                        selectedIcon={<Heart className="h-4.5 w-4.5 fill-current" />}
                      />
                      <M3IconButton
                        variant="tonal"
                        selected={demoIconBtnSelected}
                        onSelectedChange={setDemoIconBtnSelected}
                        icon={<Bookmark className="h-4.5 w-4.5" />}
                        selectedIcon={<Bookmark className="h-4.5 w-4.5 fill-current" />}
                      />
                      <M3IconButton
                        variant="filled"
                        icon={<Share2 className="h-4.5 w-4.5" />}
                        onClick={() => showToast("Share button clicked")}
                      />
                      <M3IconButton
                        variant="outlined"
                        icon={<Settings className="h-4.5 w-4.5" />}
                        onClick={() => showToast("Settings opened")}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Interactive toggle</span>
                      <span className="text-[var(--accent-green)]">40px touch</span>
                    </div>
                  </div>
                )}

                {/* 04B. Mobile Biometric Pulse Scanner */}
                {matchesSearch("Biometric Pulse Scanner", "Fingerprint TouchID face hardware sensor passkey", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Biometric Scanner
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Hardware Enclave</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center space-y-2">
                      <button
                        type="button"
                        onMouseDown={() => {
                          setBiometricScanning(true);
                          setTimeout(() => {
                            setBiometricAuthenticated(true);
                            setBiometricScanning(false);
                            showToast("Biometric passkey verified!");
                          }, 900);
                        }}
                        onMouseUp={() => setBiometricScanning(false)}
                        onTouchStart={() => {
                          setBiometricScanning(true);
                          setTimeout(() => {
                            setBiometricAuthenticated(true);
                            setBiometricScanning(false);
                            showToast("Biometric passkey verified!");
                          }, 900);
                        }}
                        onTouchEnd={() => setBiometricScanning(false)}
                        className={cn(
                          "relative h-15 w-15 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer active:scale-95 shadow-lg select-none",
                          biometricAuthenticated
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                            : biometricScanning
                            ? "bg-[var(--surface-tertiary)] border-[var(--accent-green)] text-[var(--accent-green)] ring-4 ring-[var(--accent-green)]/20"
                            : "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
                        )}
                        title="Press and hold sensor"
                      >
                        <Fingerprint className={cn("h-7 w-7 transition-transform", biometricScanning && "scale-110")} />
                        {biometricScanning && (
                          <span className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-green)] animate-ping opacity-30" />
                        )}
                      </button>

                      <div className="text-center">
                        <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                          {biometricAuthenticated
                            ? "Passkey Authenticated ✓"
                            : biometricScanning
                            ? "Reading hardware enclave..."
                            : "Press & hold sensor"}
                        </span>
                        {biometricAuthenticated && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBiometricAuthenticated(false);
                            }}
                            className="text-[9px] font-mono text-[var(--accent-green)] hover:underline mt-0.5 cursor-pointer"
                          >
                            Reset Sensor
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>WebAuthn FIDO2</span>
                      <span className="text-[var(--accent-green)]">Tactile Touch</span>
                    </div>
                  </div>
                )}

                {/* 05. Floating Action Dock */}
                {matchesSearch("Floating Action Dock", "Dock navigation anchored island", "Actions") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/floating-action-dock" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Floating Action Dock
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Safe Area</span>
                    </div>

                    <div className="py-2 flex items-center justify-center">
                      <FloatingActionDock
                        className="relative z-10"
                        dockClassName="scale-90"
                        primaryAction={{
                          label: "Add",
                          icon: <Plus className="h-3.5 w-3.5" />,
                          onClick: () => showToast("Dock primary action triggered"),
                        }}
                        items={[
                          {
                            id: "home",
                            label: "Home",
                            icon: <Home className="h-3.5 w-3.5" />,
                            onClick: () => setDemoDockSelected("home"),
                            active: demoDockSelected === "home",
                          },
                          {
                            id: "search",
                            label: "Search",
                            icon: <Search className="h-3.5 w-3.5" />,
                            onClick: () => setDemoDockSelected("search"),
                            active: demoDockSelected === "search",
                          },
                          {
                            id: "alerts",
                            label: "Alerts",
                            icon: <Bell className="h-3.5 w-3.5" />,
                            onClick: () => setDemoDockSelected("alerts"),
                            active: demoDockSelected === "alerts",
                            badge: 3,
                          },
                        ]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Level 3 Elevation</span>
                      <span className="text-[var(--accent-green)]">Anchored</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════════ FORMS & INPUTS CATEGORY ════════ */}
            {showCategory("forms") && (
              <>
                {/* 06. M3 Text Fields */}
                {matchesSearch("M3 Text Field", "Outlined Filled Floating Label Password", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-text-field" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Text Fields
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Floating Notch</span>
                    </div>

                    <div className="space-y-4 py-2">
                      <M3TextField
                        variant="outlined"
                        label="Email Address"
                        value={demoTextVal}
                        labelBgClassName="bg-[var(--surface-primary)]"
                        onChange={(e) => setDemoTextVal(e.target.value)}
                        leadingIcon={<User className="h-4 w-4" />}
                        helperText="Corporate SSO domain"
                      />
                      <M3TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        labelBgClassName="bg-[var(--surface-primary)]"
                        value={demoPasswordVal}
                        onChange={(e) => setDemoPasswordVal(e.target.value)}
                        leadingIcon={<Lock className="h-4 w-4" />}
                        helperText="Minimum 8 characters"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Seamless notch background</span>
                      <span className="text-[var(--accent-green)]">Eye reveal</span>
                    </div>
                  </div>
                )}

                {/* 07. M3 Search Bar */}
                {matchesSearch("M3 Search Bar", "Search voice suggestions", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-search-bar" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Search Bar
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">56px Pill</span>
                    </div>

                    <div className="py-2">
                      <M3SearchBar
                        placeholder="Search primitives, tokens..."
                        suggestions={["Gesture curves", "Spring physics", "Material 3 tokens", "Bottom sheets"]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Search &amp; voice icons</span>
                      <span className="text-[var(--accent-green)]">Dropdown modal</span>
                    </div>
                  </div>
                )}

                {/* 08. M3 Switch */}
                {matchesSearch("M3 Switch", "Switch toggle thumb spring", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-switch" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Switches
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Thumb Stretch</span>
                    </div>

                    <div className="space-y-3 py-1">
                      <M3Switch
                        label="Haptic Feedback"
                        description="Vibrate on gesture threshold"
                        checked={demoSwitchVal}
                        onChange={setDemoSwitchVal}
                        showIcon
                      />
                      <M3Switch
                        label="Minimal SaaS Mode"
                        variant="minimal"
                        checked={demoSwitchVal}
                        onChange={setDemoSwitchVal}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>stiffness: 300, damping: 25</span>
                      <span className="text-[var(--accent-green)]">M3 Easing</span>
                    </div>
                  </div>
                )}

                {/* 09. M3 Checkbox & Radio */}
                {matchesSearch("M3 Checkbox Radio", "Checkbox Radio group spring pop", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-checkbox" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Checkbox &amp; Radio
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Spring Pop</span>
                    </div>

                    <div className="space-y-2.5 py-1">
                      <div className="flex items-center gap-4">
                        <M3Checkbox
                          label="Telemetry sync"
                          checked={demoCheckboxVal}
                          onChange={setDemoCheckboxVal}
                        />
                        <M3Checkbox
                          label="Pending"
                          checked="indeterminate"
                        />
                      </div>
                      <div className="pt-1 border-t border-[var(--border)]/50">
                        <M3RadioGroup
                          value={demoRadioVal}
                          onChange={setDemoRadioVal}
                          options={[
                            { id: "express", label: "Express Freight ($4.00)" },
                            { id: "standard", label: "Standard Logistics (Free)" },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>SVG draw checkmark</span>
                      <span className="text-[var(--accent-green)]">Scale 0.9</span>
                    </div>
                  </div>
                )}

                {/* 10. M3 Slider */}
                {matchesSearch("M3 Slider", "Continuous discrete balloon pin bubble", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-slider" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Sliders
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Balloon Pin</span>
                    </div>

                    <div className="space-y-4 py-1">
                      <M3Slider
                        label="Bandwidth Allocation"
                        value={demoSliderVal}
                        onChange={setDemoSliderVal}
                        showValueBubble
                      />
                      <M3Slider
                        variant="discrete"
                        discrete
                        value={demoSliderVal}
                        onChange={setDemoSliderVal}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Drag with pointer capture</span>
                      <span className="text-[var(--accent-green)]">Ring halo</span>
                    </div>
                  </div>
                )}

                {/* 11. M3 Chips */}
                {matchesSearch("M3 Chips", "Filter assist input suggestion chips", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-chip" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Chips
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">4 Chip Types</span>
                    </div>

                    <div className="flex flex-wrap gap-2 py-1">
                      {["Material 3", "Next.js", "Motion", "Tailwind"].map((chip) => {
                        const isSelected = demoFilterChips.includes(chip);
                        return (
                          <M3Chip
                            key={chip}
                            chipType="filter"
                            selected={isSelected}
                            onSelectedChange={() => {
                              setDemoFilterChips((prev) =>
                                isSelected ? prev.filter((c) => c !== chip) : [...prev, chip]
                              );
                            }}
                          >
                            {chip}
                          </M3Chip>
                        );
                      })}
                      <M3Chip
                        chipType="assist"
                        icon={<Calendar className="h-3.5 w-3.5" />}
                        onClick={() => showToast("Added to sprint calendar")}
                      >
                        Sprint
                      </M3Chip>
                      <M3Chip
                        chipType="input"
                        onDelete={() => showToast("Filter removed")}
                      >
                        Removable
                      </M3Chip>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Checkmark spring pop</span>
                      <span className="text-[var(--accent-green)]">Multi-active</span>
                    </div>
                  </div>
                )}

                {/* 12. OTP Verification Input (From Stitch Screen 6) */}
                {matchesSearch("OTP Input", "PIN verification 6 digits auth code", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        OTP Code Input
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Stitch M3-6</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 py-2">
                      {demoOtpDigits.map((digit, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all",
                            digit
                              ? "border-[var(--accent-green)] bg-[var(--accent-green-deep)]/40 text-[var(--accent-green)] shadow-xs"
                              : i === 4
                              ? "border-[var(--text-primary)] ring-2 ring-[var(--accent-green)]/30 animate-pulse text-[var(--text-primary)]"
                              : "border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-muted)]"
                          )}
                        >
                          {digit || (i === 4 ? "|" : "•")}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Auto-advance focus</span>
                      <span className="text-[var(--accent-green)]">Secure PIN</span>
                    </div>
                  </div>
                )}

                {/* 12B. Mobile Haptic Stepper */}
                {matchesSearch("Mobile Haptic Stepper", "Touch quantity stepper counter reach", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Haptic Stepper
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">44px Reach</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center space-y-3">
                      {/* Spring Stepper Pill */}
                      <div className="inline-flex items-center p-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] shadow-inner">
                        <button
                          type="button"
                          onClick={() => setDemoQuantity((q) => Math.max(1, q - 1))}
                          disabled={demoQuantity <= 1}
                          className={cn(
                            "h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90",
                            demoQuantity <= 1
                              ? "text-[var(--text-muted)]/40 cursor-not-allowed"
                              : "bg-[var(--surface-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border)] shadow-2xs"
                          )}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <motion.span
                          key={demoQuantity}
                          initial={{ scale: 0.8, y: -2 }}
                          animate={{ scale: 1, y: 0 }}
                          className="w-12 text-center font-mono font-bold text-sm text-[var(--text-primary)] select-none"
                        >
                          {demoQuantity}
                        </motion.span>
                        <button
                          type="button"
                          onClick={() => setDemoQuantity((q) => Math.min(10, q + 1))}
                          disabled={demoQuantity >= 10}
                          className={cn(
                            "h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90",
                            demoQuantity >= 10
                              ? "text-[var(--text-muted)]/40 cursor-not-allowed"
                              : "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-110 shadow-xs font-bold"
                          )}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Live Cart Calculation & Unit Metric */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                        <span>Items: {demoQuantity}x</span>
                        <span>•</span>
                        <span className="text-[var(--accent-green)] font-bold">${(demoQuantity * 45).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Tactile spring limits</span>
                      <span className="text-[var(--accent-green)]">Haptic Pop</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════════ NAVIGATION CATEGORY ════════ */}
            {showCategory("navigation") && (
              <>
                {/* 13. M3 Navigation Bar */}
                {matchesSearch("M3 Navigation Bar", "Bottom navigation pill active indicators", "Navigation") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-navigation-bar" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Navigation Bar
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Active Pill</span>
                    </div>

                    <div className="py-1 overflow-hidden rounded-xl border border-[var(--border)]">
                      <M3NavigationBar
                        value={demoNavTab}
                        onChange={setDemoNavTab}
                        destinations={[
                          { id: "home", label: "Home", icon: <Home className="h-4.5 w-4.5" /> },
                          { id: "explore", label: "Explore", icon: <Compass className="h-4.5 w-4.5" /> },
                          { id: "alerts", label: "Alerts", icon: <Bell className="h-4.5 w-4.5" />, badge: 3 },
                          { id: "profile", label: "Profile", icon: <User className="h-4.5 w-4.5" /> },
                        ]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Symmetrical alignment</span>
                      <span className="text-[var(--accent-green)]">64x32 Pill</span>
                    </div>
                  </div>
                )}

                {/* 14. M3 Top App Bar */}
                {matchesSearch("M3 Top App Bar", "Center aligned small medium large toolbar", "Navigation") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-top-app-bar" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Top App Bar
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Center-Aligned</span>
                    </div>

                    <div className="py-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40">
                      <M3TopAppBar
                        variant="center-aligned"
                        title="Pulse Sync"
                        subtitle="Cluster 04"
                        navigationIcon={<ArrowLeft className="h-4.5 w-4.5" />}
                        actions={
                          <div className="flex items-center gap-0.5">
                            <M3IconButton variant="standard" size="sm" icon={<Search className="h-4 w-4" />} />
                            <M3IconButton variant="standard" size="sm" icon={<MoreVertical className="h-4 w-4" />} />
                          </div>
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Back arrow &amp; actions</span>
                      <span className="text-[var(--accent-green)]">Scroll elevation</span>
                    </div>
                  </div>
                )}

                {/* 15. M3 Tabs */}
                {matchesSearch("M3 Tabs", "Primary secondary minimal sliding tabs", "Navigation") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-tabs" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Tabs
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">3 Variants</span>
                    </div>

                    <div className="space-y-3 py-1">
                      <M3Tabs
                        type="primary"
                        value={demoTabsVal === "overview" ? "all" : demoTabsVal}
                        onChange={setDemoTabsVal}
                        tabs={[
                          { id: "all", label: "All" },
                          { id: "active", label: "Active", badge: 4 },
                          { id: "logs", label: "Logs" },
                        ]}
                      />
                      <M3Tabs
                        variant="minimal"
                        value={demoTabsVal === "overview" ? "all" : demoTabsVal}
                        onChange={setDemoTabsVal}
                        tabs={[
                          { id: "all", label: "All" },
                          { id: "active", label: "Active" },
                          { id: "logs", label: "Logs" },
                        ]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Zero gap clipping</span>
                      <span className="text-[var(--accent-green)]">Spring bar</span>
                    </div>
                  </div>
                )}

                {/* 16. Thumb Segment Controller */}
                {matchesSearch("Thumb Segment", "Ergonomic thumb reach arc controller", "Navigation") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/thumb-segment-controller" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Thumb Segment
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">48px Reach</span>
                    </div>

                    <div className="py-2 overflow-hidden">
                      <ThumbSegmentController
                        items={[
                          { id: "day", label: "Day" },
                          { id: "week", label: "Week", badge: 3 },
                          { id: "month", label: "Month" },
                        ]}
                        value={demoThumbSegment}
                        onChange={setDemoThumbSegment}
                        size="default"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Ergonomic arc</span>
                      <span className="text-[var(--accent-green)]">M3 Easing</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════════ OVERLAYS CATEGORY ════════ */}
            {showCategory("overlays") && (
              <>
                {/* 17. Mobile Bottom Sheet */}
                {matchesSearch("Mobile Bottom Sheet", "Multi snap points gesture fling velocity", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/mobile-bottom-sheet" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Mobile Bottom Sheet
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Multi-Snap</span>
                    </div>

                    <div className="space-y-1.5 py-1">
                      <button
                        type="button"
                        onClick={() => setDemoSheetSelected("express")}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                          demoSheetSelected === "express"
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
                        onClick={() => setDemoSheetSelected("standard")}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border active:scale-[0.98]",
                          demoSheetSelected === "standard"
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
                      <span className="text-[var(--accent-green)]">Damped Fling</span>
                    </div>
                  </div>
                )}

                {/* 18. Swipe Action Card */}
                {matchesSearch("Swipe Action Card", "Gesture swipe left right archive delete", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/swipe-action-card" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Swipe Action Card
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">72px Spring</span>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                      <SwipeActionCard
                        leftActions={[
                          {
                            id: "archive-card",
                            label: "Archive",
                            icon: <Archive className="h-3.5 w-3.5" />,
                            onClick: () => showToast("Item archived"),
                          },
                        ]}
                        rightActions={[
                          {
                            id: "delete-card",
                            label: "Delete",
                            icon: <Trash2 className="h-3.5 w-3.5" />,
                            variant: "destructive",
                            onClick: () => showToast("Item deleted"),
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
                )}

                {/* 19. M3 Dialog Modal */}
                {matchesSearch("M3 Dialog Modal", "Alert confirmation dialog popup", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-dialog" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Dialog
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Modal Scrim</span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-[var(--accent-green)]" />
                        <h4 className="text-xs font-bold font-sans">Dispatch Telemetry?</h4>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)]">Confirm sending bundle payload to regional replica nodes.</p>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => showToast("Dialog dismissed")}
                          className="px-2.5 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast("Payload dispatched")}
                          className="px-3 py-1 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                        >
                          Dispatch
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>28dp corner radius</span>
                      <span className="text-[var(--accent-green)]">Backdrop Blur</span>
                    </div>
                  </div>
                )}

                {/* 19B. Dynamic Island Live Activity */}
                {matchesSearch("Dynamic Island Capsule", "Live activity capsule HUD status notch", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        Dynamic Island HUD
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Live Capsule</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center">
                      <div
                        onClick={() => setIslandExpanded(!islandExpanded)}
                        className={cn(
                          "relative rounded-[22px] bg-black border border-neutral-800 transition-all duration-300 cursor-pointer shadow-2xl select-none overflow-hidden",
                          islandExpanded ? "w-full p-3.5 space-y-2.5" : "w-44 py-2 px-3 flex items-center justify-between"
                        )}
                      >
                        {islandExpanded ? (
                          <div className="space-y-2 font-mono">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                  <Radio className="h-3.5 w-3.5 animate-pulse" />
                                </div>
                                <div>
                                  <div className="text-[11px] font-bold text-white font-sans">Edge Telemetry</div>
                                  <div className="text-[9px] text-neutral-400">12ms • US-East Cluster</div>
                                </div>
                              </div>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                                ACTIVE
                              </span>
                            </div>
                            <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                              <div className="h-full bg-[var(--accent-green)] rounded-full w-[68%]" />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-0.5">
                              <span>Tap to collapse</span>
                              <span className="text-white font-sans font-medium">99.98% Health</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                              <span className="text-[10px] font-mono font-bold text-white">Edge Sync</span>
                            </div>
                            {/* Animated Mini Wave */}
                            <div className="flex items-center gap-0.5 h-3">
                              <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]" />
                              <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
                              <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Gesture tap to expand</span>
                      <span className="text-[var(--accent-green)]">Hardware Pill</span>
                    </div>
                  </div>
                )}

                {/* 19C. M3 Mobile Snackbar */}
                {matchesSearch("M3 Snackbar Toast", "Floating notification bottom snackbar undo", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        M3 Snackbar &amp; Undo
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Bottom Anchor</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center space-y-2">
                      <AnimatePresence mode="wait">
                        {snackbarActive ? (
                          <motion.div
                            key="snackbar"
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)] shrink-0" />
                              <span className="text-xs font-sans text-[var(--text-primary)] truncate">Asset archived</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setSnackbarActive(false);
                                  showToast("Action undone!");
                                }}
                                className="text-xs font-mono font-bold text-[var(--accent-green)] hover:underline cursor-pointer"
                              >
                                Undo
                              </button>
                              <button
                                type="button"
                                onClick={() => setSnackbarActive(false)}
                                className="h-5 w-5 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer text-sm"
                              >
                                ×
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="retrigger"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            type="button"
                            onClick={() => setSnackbarActive(true)}
                            className="px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] cursor-pointer active:scale-95 transition-all"
                          >
                            Summon Snackbar
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Swipe or tap dismiss</span>
                      <span className="text-[var(--accent-green)]">M3 Surface</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════════ DATA DISPLAY CATEGORY ════════ */}
            {showCategory("data-display") && (
              <>
                {/* 20. M3 Cards & Surfaces */}
                {matchesSearch("M3 Card Surfaces", "Elevated filled outlined minimal surface", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-card" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Cards
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">3 Archetypes</span>
                    </div>

                    <div className="space-y-2.5 py-1">
                      <M3Card
                        variant="elevated"
                        headline="Elevated Card (dp1)"
                        subhead="Tonal surface mapping"
                        actions={
                          <M3Button size="sm" variant="tonal" onClick={() => showToast("Card action clicked")}>
                            Explore
                          </M3Button>
                        }
                      >
                        Material 3 crafts depth with surface steps rather than stark black shadows.
                      </M3Card>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Elevated • Filled • Outlined</span>
                      <span className="text-[var(--accent-green)]">Press 0.985</span>
                    </div>
                  </div>
                )}

                {/* 21. M3 Lists */}
                {matchesSearch("M3 List Item", "1-line 2-line 3-line list items", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-list" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Lists
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">56 / 72 / 88px</span>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-primary)] divide-y divide-[var(--border)]/50">
                      <M3ListItem
                        lines="1"
                        headline="System Alert"
                        leading={<Zap className="h-4 w-4 text-amber-400" />}
                        trailingText="12m"
                        divider={false}
                        onClick={() => showToast("One-line list item clicked")}
                      />
                      <M3ListItem
                        lines="2"
                        headline="Data Pipeline"
                        supportingText="Sub-millisecond latency confirmed"
                        leading={<Activity className="h-4 w-4 text-[var(--accent-green)]" />}
                        trailingText="Now"
                        divider={false}
                        onClick={() => showToast("Two-line list item clicked")}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Standard line heights</span>
                      <span className="text-[var(--accent-green)]">M3 Anatomy</span>
                    </div>
                  </div>
                )}

                {/* 22. M3 Progress & Step Pipeline (Stitch Screen 1 & 7) */}
                {matchesSearch("M3 Progress Loaders", "Circular linear buffer step progression pipeline", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-progress-indicator" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Progress &amp; Pipeline
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Stitch M3-7</span>
                    </div>

                    <div className="space-y-3 py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[var(--text-secondary)]">Asset Transcode</span>
                          <span className="text-[var(--accent-green)] font-bold">{demoProgressVal}%</span>
                        </div>
                        <M3ProgressIndicator type="linear" value={demoProgressVal} bufferValue={88} />
                      </div>

                      {/* Clean 3-Stepped Pipeline */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-[var(--surface-secondary)] text-center text-[10px] font-mono">
                          <CheckCircle className="h-4 w-4 text-[var(--accent-green)]" />
                          <span className="font-semibold">1. Setup</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-[var(--accent-green-deep)] text-center text-[10px] font-mono text-[var(--accent-green)] font-bold border border-[var(--accent-green)]/30">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>2. Sync</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-[var(--surface-secondary)]/50 text-center text-[10px] font-mono opacity-60">
                          <Clock className="h-4 w-4 text-[var(--text-muted)]" />
                          <span>3. Cache</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Linear &amp; circular</span>
                      <span className="text-[var(--accent-green)]">Step Engine</span>
                    </div>
                  </div>
                )}

                {/* 23. M3 Badges & Status */}
                {matchesSearch("M3 Badge Status", "Badges dots counter tags halo", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/m3-badge" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        M3 Badges
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Dot &amp; Large</span>
                    </div>

                    <div className="py-2 space-y-3">
                      {/* Row 1: Anchored Icon Badges */}
                      <div className="flex items-center justify-center gap-6">
                        <M3Badge content={3} color="primary">
                          <div className="h-11 w-11 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)]/50 flex items-center justify-center shadow-2xs">
                            <Bell className="h-5 w-5 text-[var(--text-secondary)]" />
                          </div>
                        </M3Badge>

                        <M3Badge dot color="error">
                          <div className="h-11 w-11 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)]/50 flex items-center justify-center shadow-2xs">
                            <Shield className="h-5 w-5 text-[var(--text-secondary)]" />
                          </div>
                        </M3Badge>

                        <M3Badge content="99+" max={99} color="primary">
                          <div className="h-11 w-11 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)]/50 flex items-center justify-center shadow-2xs">
                            <ShoppingBag className="h-5 w-5 text-[var(--text-secondary)]" />
                          </div>
                        </M3Badge>
                      </div>

                      {/* Row 2: Status Badges */}
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-green-deep)] text-[var(--accent-green)] text-xs font-mono font-semibold border border-[var(--accent-green)]/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                          <span>Live Active</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] text-xs font-mono border border-[var(--border)]/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span>Syncing</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Auto-positioning on anchor</span>
                      <span className="text-[var(--accent-green)]">Live status</span>
                    </div>
                  </div>
                )}

                {/* 24. M3 Squiggly Loaders (Google Android 14+) */}
                {matchesSearch("M3 Squiggly Loader", "Squiggly horizontal circular undulating wave android sine", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/components/m3-progress-indicator?variant=squiggly-circular"
                        className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1"
                      >
                        M3 Squiggly Loaders
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Android 14+</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center space-y-4">
                      {squigglyVariant === "circular" ? (
                        <div className="py-2 flex items-center justify-center">
                          <M3SquigglyLoader
                            variant="circular"
                            size={72}
                            squiggles={squigglesCount}
                            amplitude={squigglyAmp}
                            color={squigglyColor}
                            strokeWidth={3.5}
                          />
                        </div>
                      ) : (
                        <div className="w-full py-4 px-2">
                          <M3SquigglyLoader
                            variant="horizontal"
                            squiggles={squigglesCount}
                            amplitude={squigglyAmp}
                            color={squigglyColor}
                            strokeWidth={3.5}
                          />
                        </div>
                      )}

                      {/* Interactive Controls Bar */}
                      <div className="w-full space-y-2 pt-2 border-t border-[var(--border)]/40 text-xs font-mono">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1 bg-[var(--surface-secondary)] p-0.5 rounded-lg border border-[var(--border)] text-[10px]">
                            <button
                              type="button"
                              onClick={() => setSquigglyVariant("circular")}
                              className={cn(
                                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                                squigglyVariant === "circular"
                                  ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] font-bold shadow-2xs"
                                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Circular
                            </button>
                            <button
                              type="button"
                              onClick={() => setSquigglyVariant("horizontal")}
                              className={cn(
                                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                                squigglyVariant === "horizontal"
                                  ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] font-bold shadow-2xs"
                                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Horizontal
                            </button>
                          </div>

                          {/* Single Accent Color Switcher */}
                          <div className="flex items-center gap-1 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setSquigglyColor("accent")}
                              className={cn(
                                "px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                                squigglyColor === "accent"
                                  ? "bg-[var(--surface-secondary)] border-emerald-500/60 text-emerald-400 font-bold"
                                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Emerald
                            </button>
                            <button
                              type="button"
                              onClick={() => setSquigglyColor("blue")}
                              className={cn(
                                "px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                                squigglyColor === "blue"
                                  ? "bg-[var(--surface-secondary)] border-blue-500/60 text-blue-400 font-bold"
                                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Blue
                            </button>
                          </div>
                        </div>

                        {/* Sliders for Squiggliness & Amplitude */}
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                          <div>
                            <div className="flex justify-between text-[var(--text-muted)] mb-1">
                              <span>Squiggles:</span>
                              <span className="font-bold text-[var(--text-primary)]">{squigglesCount}</span>
                            </div>
                            <input
                              type="range"
                              min={8}
                              max={24}
                              value={squigglesCount}
                              onChange={(e) => setSquigglesCount(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-[var(--surface-secondary)]"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-[var(--text-muted)] mb-1">
                              <span>Amplitude:</span>
                              <span className="font-bold text-[var(--text-primary)]">{squigglyAmp}px</span>
                            </div>
                            <input
                              type="range"
                              min={2}
                              max={8}
                              value={squigglyAmp}
                              onChange={(e) => setSquigglyAmp(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-[var(--surface-secondary)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Configurable waves</span>
                      <span className="text-[var(--accent-green)]">Sine Physics</span>
                    </div>
                  </div>
                )}

                {/* 25. M3 Physics & Shape Morph Loaders */}
                {matchesSearch("M3 Physics Loader", "Shape morph spin elastic membrane punch through resistance physics", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link
                        href="/components/m3-progress-indicator?variant=elastic-line"
                        className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1"
                      >
                        M3 Physics Loaders
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Morph &amp; Elastic</span>
                    </div>

                    <div className="py-2 flex flex-col items-center justify-center space-y-4">
                      {physicsVariant === "elastic-line" ? (
                        <div className="w-full">
                          <M3PhysicsLoader
                            variant="elastic-line"
                            theme={physicsTheme}
                            resistance={physicsResistance}
                            speed={physicsSpeed}
                          />
                        </div>
                      ) : (
                        <div className="py-4 flex items-center justify-center">
                          <M3PhysicsLoader
                            variant="shape-morph"
                            theme={physicsTheme}
                            size={72}
                            speed={physicsSpeed}
                          />
                        </div>
                      )}

                      {/* Interactive Controls Bar */}
                      <div className="w-full space-y-2 pt-2 border-t border-[var(--border)]/40 text-xs font-mono">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1 bg-[var(--surface-secondary)] p-0.5 rounded-lg border border-[var(--border)] text-[10px]">
                            <button
                              type="button"
                              onClick={() => setPhysicsVariant("elastic-line")}
                              className={cn(
                                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                                physicsVariant === "elastic-line"
                                  ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] font-bold shadow-2xs"
                                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Elastic
                            </button>
                            <button
                              type="button"
                              onClick={() => setPhysicsVariant("shape-morph")}
                              className={cn(
                                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                                physicsVariant === "shape-morph"
                                  ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] font-bold shadow-2xs"
                                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Morph
                            </button>
                          </div>

                          {/* Accent Color Switcher */}
                          <div className="flex items-center gap-1 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setPhysicsTheme("accent")}
                              className={cn(
                                "px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                                physicsTheme === "accent"
                                  ? "bg-[var(--surface-secondary)] border-emerald-500/60 text-emerald-400 font-bold"
                                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Emerald
                            </button>
                            <button
                              type="button"
                              onClick={() => setPhysicsTheme("google")}
                              className={cn(
                                "px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                                physicsTheme === "google"
                                  ? "bg-[var(--surface-secondary)] border-blue-500/60 text-blue-400 font-bold"
                                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              Blue
                            </button>
                          </div>
                        </div>

                        {physicsVariant === "elastic-line" ? (
                          <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                            <div>
                              <div className="flex justify-between text-[var(--text-muted)] mb-1">
                                <span>Tension:</span>
                                <span className="font-bold text-[var(--text-primary)]">{physicsResistance.toFixed(1)}x</span>
                              </div>
                              <input
                                type="range"
                                min={0.6}
                                max={1.8}
                                step={0.1}
                                value={physicsResistance}
                                onChange={(e) => setPhysicsResistance(Number(e.target.value))}
                                className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-[var(--surface-secondary)]"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-[var(--text-muted)] mb-1">
                                <span>Speed:</span>
                                <span className="font-bold text-[var(--text-primary)]">{physicsSpeed.toFixed(1)}x</span>
                              </div>
                              <input
                                type="range"
                                min={0.5}
                                max={2.2}
                                step={0.1}
                                value={physicsSpeed}
                                onChange={(e) => setPhysicsSpeed(Number(e.target.value))}
                                className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-[var(--surface-secondary)]"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="pt-1 text-[10px]">
                            <div className="flex justify-between text-[var(--text-muted)] mb-1">
                              <span>Morph Speed:</span>
                              <span className="font-bold text-[var(--text-primary)]">{physicsSpeed.toFixed(1)}x</span>
                            </div>
                            <input
                              type="range"
                              min={0.5}
                              max={2.5}
                              step={0.1}
                              value={physicsSpeed}
                              onChange={(e) => setPhysicsSpeed(Number(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer h-1.5 rounded-lg bg-[var(--surface-secondary)]"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Resistance &amp; breakthrough</span>
                      <span className="text-[var(--accent-green)]">Damped Physics</span>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>

          {/* ── RIGHT COLUMN: Full Mobile Preview Panel Section ── */}
          <div
            className={cn(
              "hidden lg:block shrink-0 self-stretch transition-[width,opacity] duration-400 ease-in-out",
              isPhoneVisible ? "w-[410px] sm:w-[430px] opacity-100" : "w-0 opacity-0 pointer-events-none overflow-hidden"
            )}
          >
            <div
              ref={mobilePanelRef}
              className={cn(
                "sticky top-20 w-full max-h-[calc(100vh-5.5rem)] overflow-y-auto no-scrollbar flex flex-col items-center pl-7 pr-3 space-y-4 pb-12 transition-transform duration-400 ease-in-out will-change-transform",
                isPhoneVisible ? "translate-x-0" : "translate-x-full pointer-events-none"
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
                  title="Collapse preview panel"
                  aria-label="Collapse preview panel"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Custom Animated Preset Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPresetDropdownOpen(!isPresetDropdownOpen)}
                  className="h-7 px-2.5 rounded-lg text-xs font-mono border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs select-none"
                >
                  {PRESET_OPTIONS.find((p) => p.id === presetMode)?.icon}
                  <span className="font-semibold">{PRESET_OPTIONS.find((p) => p.id === presetMode)?.label}</span>
                  <ChevronDown className={cn("h-3 w-3 text-[var(--text-muted)] transition-transform duration-200", isPresetDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isPresetDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsPresetDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className="absolute right-0 top-full mt-1.5 w-56 p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-xl shadow-2xl z-50 divide-y divide-[var(--border)]/30 font-mono text-xs select-none"
                      >
                        <div className="p-1 space-y-0.5">
                          {PRESET_OPTIONS.map((opt) => {
                            const isSelected = presetMode === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  setPresetMode(opt.id);
                                  setIsPresetDropdownOpen(false);
                                }}
                                className={cn(
                                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-all cursor-pointer text-left",
                                  isSelected
                                    ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] font-semibold shadow-2xs"
                                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/60"
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {opt.icon}
                                  <div className="truncate">
                                    <div className="leading-tight">{opt.label}</div>
                                    <div className="text-[10px] text-[var(--text-muted)] leading-tight">{opt.sub}</div>
                                  </div>
                                </div>
                                {isSelected && (
                                  <Check className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0 ml-1.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Phone Wrapper with hide toggle */}
            <div className="relative">
              {/* Circle button on left rim to push beyond right edge (never clipped) */}
              <button
                type="button"
                onClick={() => setIsPhoneVisible(false)}
                className="flex absolute -left-4.5 top-1/2 -translate-y-1/2 z-40 h-9 w-9 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] shadow-xl hover:scale-110 active:scale-95 items-center justify-center transition-all duration-200 cursor-pointer group"
                title="Collapse preview panel"
                aria-label="Collapse preview panel"
              >
                <ChevronRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              {/* Mobile Device Chassis Frame - Rims ALWAYS black, interior matching var(--bg-main) */}
              <div
                className="w-[360px] sm:w-[380px] h-[720px] rounded-[44px] bg-[var(--bg-main)] border-[7px] border-[#18191b] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] ring-1 ring-black/80 flex flex-col overflow-hidden relative select-none shrink-0"
              >
              
                {/* Top Status Bar & Dynamic Island */}
                <div
                  className={cn(
                    "pt-2 pb-1 px-5 flex items-center justify-between shrink-0 z-30 text-[11px] font-mono transition-colors",
                    isLightMode ? "bg-white text-neutral-600 border-b border-neutral-100" : "bg-[var(--bg-main)] text-neutral-400 border-b border-[var(--border)]/30"
                  )}
                >
                  <span className={cn("font-semibold text-xs", isLightMode ? "text-neutral-900" : "text-white")}>
                    9:41
                  </span>

                  {/* Hardware Dynamic Island - always black */}
                  <div className="w-22 h-4.5 rounded-full bg-black border border-neutral-800 flex items-center justify-center gap-1.5 px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1c1d22] border border-neutral-700/60" />
                    <div className="w-1 h-1 rounded-full bg-[#0a1829]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-xs border border-current flex items-center p-0.5">
                      <div className="w-full h-full bg-current rounded-3xs" />
                    </div>
                  </div>
                </div>

                {/* ════ PRESET 1: STORE PRESET ════ */}
                {presetMode === "store" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Kilo Studio</span>
                        <h2 className="text-xl font-bold font-sans">Essential Archive</h2>
                      </div>
                      <div className="relative">
                        <div className={cn("h-9 w-9 rounded-full flex items-center justify-center border", isLightMode ? "bg-neutral-100 border-neutral-200" : "bg-[var(--surface-secondary)] border-[var(--border)]")}>
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] text-[10px] font-mono font-bold flex items-center justify-center">
                          {cartCount}
                        </span>
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5">
                      {["All (24)", "Outerwear", "Footwear"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setStoreCategory(cat)}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                            storeCategory === cat
                              ? isLightMode
                                ? "bg-neutral-900 text-white"
                                : "bg-white text-black"
                              : isLightMode
                              ? "bg-neutral-200/60 text-neutral-700"
                              : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Hero Product Card */}
                    <div className={cn("p-4 rounded-2xl border space-y-2.5", isLightMode ? "bg-white border-neutral-200 shadow-sm" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                          DROP 01
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setLikedItems((prev) =>
                              prev.includes("parka-1") ? prev.filter((i) => i !== "parka-1") : [...prev, "parka-1"]
                            );
                          }}
                          className="text-rose-500 cursor-pointer"
                        >
                          <Heart className={cn("h-4 w-4", likedItems.includes("parka-1") && "fill-current")} />
                        </button>
                      </div>

                      <div className="h-24 rounded-xl bg-[var(--surface-secondary)] flex flex-col items-center justify-center border border-dashed border-[var(--border)]">
                        <span className="text-sm font-mono font-bold">[ MODULAR PARKA ]</span>
                        <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Interactive 3D model</span>
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <div>
                          <div className="text-xs font-bold">Technical Shell 3L</div>
                          <div className="text-xs font-mono text-neutral-400">$245.00</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCartCount((c) => c + 1)}
                          className="px-3.5 py-1.5 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] text-xs font-bold cursor-pointer active:scale-95 transition-all"
                        >
                          Quick Buy
                        </button>
                      </div>
                    </div>

                    {/* Additional Product Card 2 */}
                    <div className={cn("p-3 rounded-2xl border space-y-1.5", isLightMode ? "bg-white border-neutral-200 shadow-sm" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                          DROP 02
                        </span>
                        <span className="text-[10px] font-mono text-[var(--accent-green)] font-semibold">In Stock</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold">Arc Minimal Trench 2.0</div>
                          <div className="text-xs font-mono text-neutral-400">$280.00 • Stormproof</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCartCount((c) => c + 1)}
                          className="px-3 py-1 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] text-xs font-mono font-semibold cursor-pointer active:scale-95 transition-all"
                        >
                          + Cart
                        </button>
                      </div>
                    </div>

                    {/* Saved Item */}
                    <div className={cn("p-2.5 rounded-xl border text-xs font-mono flex justify-between items-center", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-secondary)] border-[var(--border)]")}>
                      <span className="text-[11px] truncate">Raw Black Overshirt • L</span>
                      <span className="text-[var(--accent-green)] font-bold text-xs">$65.00</span>
                    </div>
                  </div>
                )}

                {/* ════ PRESET 2: FEED PRESET ════ */}
                {presetMode === "feed" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Communication</span>
                        <h2 className="text-xl font-bold font-sans">Inbox Stream</h2>
                      </div>
                      <button
                        type="button"
                        onClick={handleRefreshFeed}
                        className={cn("h-8 w-8 rounded-full border flex items-center justify-center cursor-pointer active:scale-95", isLightMode ? "bg-white border-neutral-200 text-neutral-700" : "bg-[var(--surface-secondary)] border-[var(--border)] text-neutral-300")}
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {feedItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className={cn("p-3 rounded-xl border space-y-1 transition-all", isLightMode ? "bg-white border-neutral-200 shadow-2xs" : "bg-[var(--surface-elevated)] border-[var(--border)]")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-sans">{item.sender}</span>
                            <span className="text-[10px] font-mono text-neutral-400">{item.time}</span>
                          </div>
                          <p className="text-xs text-neutral-400 font-sans leading-relaxed">{item.subject}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ════ PRESET 3: PULSE SYNC (Stitch Screen 1) ════ */}
                {presetMode === "pulse-sync" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent-green)] uppercase tracking-wider font-semibold">Pulse Cloud Core</span>
                        <h2 className="text-xl font-bold font-sans">Sync Engine</h2>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[var(--accent-green-deep)] text-[var(--accent-green)] text-[10px] font-mono font-bold">
                        ACTIVE
                      </span>
                    </div>

                    {/* Live Telemetry Ticker */}
                    <div className={cn("p-3 rounded-xl border flex items-center justify-between text-xs font-mono", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <div className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-[var(--accent-green)]" />
                        <span>1.42 GB/s</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                        <span>{pulseNodes} nodes locked</span>
                      </div>
                    </div>

                    {/* Primary Asset Pipeline */}
                    <div className={cn("p-3.5 rounded-2xl border space-y-2.5", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold">Asset Transcode Pipeline</span>
                        <span className="font-mono text-[var(--accent-green)] font-bold">74%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--accent-green)] rounded-full w-[74%]" />
                      </div>
                      <div className="grid grid-cols-4 gap-1 pt-1 text-center text-[9px] font-mono">
                        <div className="p-1 rounded bg-[var(--surface-secondary)] text-[var(--accent-green)] font-bold">1. Setup ✓</div>
                        <div className="p-1 rounded bg-[var(--surface-secondary)] text-[var(--accent-green)] font-bold">2. Encode ✓</div>
                        <div className="p-1 rounded bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold">3. Sync...</div>
                        <div className="p-1 rounded bg-[var(--surface-secondary)] text-neutral-500">4. Distribute</div>
                      </div>
                    </div>

                    {/* Nodes grid */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Replica Health</span>
                      <div className="grid grid-cols-2 gap-2">
                        {["US-East (Primary)", "EU-West (Hot Standby)", "AP-South (Read)", "SA-East (Replica)"].map((node) => (
                          <div key={node} className={cn("p-2 rounded-xl border text-[11px] font-mono flex items-center justify-between", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-secondary)] border-[var(--border)]")}>
                            <span className="truncate">{node}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ════ PRESET 4: PULSE SECURITY (Stitch Screen 2) ════ */}
                {presetMode === "pulse-security" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-green)] uppercase tracking-wider font-semibold">Pulse Security</span>
                      <h2 className="text-xl font-bold font-sans">Sessions &amp; Auth</h2>
                    </div>

                    <div className={cn("p-4 rounded-2xl border space-y-3.5", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Shield className="h-5 w-5 text-[var(--accent-green)]" />
                          <div>
                            <div className="text-xs font-bold">Biometric Face Auth</div>
                            <div className="text-[10px] text-neutral-400">Secure enclave authentication</div>
                          </div>
                        </div>
                        <M3Switch checked={biometricEnabled} onChange={setBiometricEnabled} />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/60">
                        <div className="flex items-center gap-2.5">
                          <Key className="h-5 w-5 text-amber-400" />
                          <div>
                            <div className="text-xs font-bold">Hardware 2FA Key</div>
                            <div className="text-[10px] text-neutral-400">YubiKey / WebAuthn passkey</div>
                          </div>
                        </div>
                        <M3Switch checked={twoFactorActive} onChange={setTwoFactorActive} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Active Device Sessions</span>
                      <div className={cn("p-3 rounded-xl border space-y-1 text-xs", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                        <div className="flex justify-between font-bold">
                          <span>MacBook Pro 16&quot; (This Device)</span>
                          <span className="text-[var(--accent-green)] font-mono text-[10px]">CURRENT</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">Chrome 131 • San Francisco, CA</div>
                      </div>
                      <div className={cn("p-3 rounded-xl border space-y-1 text-xs opacity-75", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-elevated)]/75 border-[var(--border)]")}>
                        <div className="flex justify-between font-bold">
                          <span>iPhone 16 Pro</span>
                          <span className="text-neutral-400 font-mono text-[10px]">2h ago</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">Safari iOS • Tokyo, JP</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ════ PRESET 5: PULSE PROJECTS (Stitch Screen 3) ════ */}
                {presetMode === "pulse-projects" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-green)] uppercase tracking-wider font-semibold">Pulse Projects</span>
                      <h2 className="text-xl font-bold font-sans">Sprint Kanban</h2>
                    </div>

                    <div className="flex items-center gap-1">
                      {["in-progress", "in-review", "done"].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveBoardTab(tab)}
                          className={cn(
                            "flex-1 py-1 text-xs font-mono uppercase rounded-lg transition-all cursor-pointer",
                            activeBoardTab === tab
                              ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold border border-[var(--accent-green)]/30"
                              : "text-neutral-400 hover:text-neutral-200"
                          )}
                        >
                          {tab.replace("-", " ")}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { title: "M3 Motion tokens integration", tag: "CRITICAL", lead: "Souro", est: "2h" },
                        { title: "AST Validator schema audit", tag: "CORE", lead: "DevTeam", est: "4h" },
                        { title: "Dynamic Island notch calibration", tag: "UI", lead: "Design", est: "1h" },
                      ].map((task, i) => (
                        <div
                          key={i}
                          className={cn("p-3.5 rounded-xl border space-y-2", isLightMode ? "bg-white border-neutral-200 shadow-2xs" : "bg-[var(--surface-elevated)] border-[var(--border)]")}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold leading-tight">{task.title}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)] font-semibold">
                              {task.tag}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-1 border-t border-[var(--border)]/40">
                            <span>Lead: {task.lead}</span>
                            <span>{task.est} remaining</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ════ PRESET 6: OTP VERIFY (Stitch Screen 6) ════ */}
                {presetMode === "otp-verify" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-4 space-y-4 transition-colors text-center",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div className="flex flex-col items-center space-y-2 pt-2">
                      <div className="h-14 w-14 rounded-2xl bg-[var(--accent-green-deep)] text-[var(--accent-green)] border border-[var(--accent-green)]/30 flex items-center justify-center">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-bold font-sans">Two-Step Verification</h2>
                      <p className="text-xs text-neutral-400 max-w-xs">
                        Enter the 6-digit confirmation code dispatched to your hardware authenticator.
                      </p>
                    </div>

                    {/* 6 Digit Inputs */}
                    <div className="flex items-center justify-center gap-2 py-1">
                      {phoneOtpDigits.map((digit, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-10 h-13 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-base transition-all",
                            digit
                              ? "border-[var(--accent-green)] bg-[var(--accent-green-deep)]/30 text-[var(--accent-green)]"
                              : i === 4
                              ? "border-[var(--text-primary)] ring-2 ring-[var(--accent-green)]/30 text-[var(--text-primary)]"
                              : "border-[var(--border)] bg-[var(--surface-primary)] text-neutral-500"
                          )}
                        >
                          {digit || (i === 4 ? "|" : "•")}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneOtpDigits(["5", "9", "3", "1", "8", "4"]);
                          setOtpVerified(true);
                          showToast("Session authenticated!");
                        }}
                        className="w-full py-3 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] font-sans font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {otpVerified ? <CheckCircle2 className="h-4 w-4" /> : null}
                        <span>{otpVerified ? "Code Verified" : "Verify Session"}</span>
                      </button>

                      <div className="text-xs font-mono text-neutral-400">
                        Didn&apos;t receive code? <span className="text-[var(--accent-green)] cursor-pointer">Resend in 24s</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ════ PRESET 7: WALLET PRESET ════ */}
                {presetMode === "wallet" && (
                  <div
                    className={cn(
                      "flex-1 flex flex-col justify-between px-4 py-3 space-y-3 transition-colors",
                      isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
                    )}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Vault &amp; Tokens</span>
                      <h2 className="text-xl font-bold font-sans">Active Liquidity</h2>
                    </div>

                    <div className={cn("p-4 rounded-2xl border space-y-2.5", isLightMode ? "bg-white border-neutral-200 shadow-sm" : "bg-[var(--surface-elevated)] border-[var(--border)]")}>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">Available Telemetry Credit</span>
                      <div className="text-2xl font-mono font-bold tracking-tight text-[var(--accent-green)]">
                        $14,892.40
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => showToast("Quick Send modal opened")}
                          className="py-2 rounded-xl bg-[var(--surface-secondary)] text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Send</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast("Deposit address copied")}
                          className="py-2 rounded-xl bg-[var(--surface-secondary)] text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                        >
                          <ArrowDownLeft className="h-3.5 w-3.5" />
                          <span>Deposit</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Recent Activity</span>
                      {[
                        { title: "Validator Stake #09", time: "10m ago", amt: "+$420.00", pos: true },
                        { title: "AST Batch Verification", time: "1h ago", amt: "-$12.50", pos: false },
                        { title: "Cluster Shard Provision", time: "3h ago", amt: "-$85.00", pos: false },
                      ].map((tx, i) => (
                        <div key={i} className={cn("p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono", isLightMode ? "bg-white border-neutral-200" : "bg-[var(--surface-secondary)] border-[var(--border)]")}>
                          <div>
                            <div className="font-bold">{tx.title}</div>
                            <div className="text-[10px] text-neutral-400">{tx.time}</div>
                          </div>
                          <span className={cn("font-bold", tx.pos ? "text-[var(--accent-green)]" : "text-neutral-400")}>
                            {tx.amt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Centered Island Navigation Dock */}
                <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center pointer-events-none">
                  <FloatingActionDock
                    className="relative pointer-events-auto"
                    dockClassName="scale-90"
                    primaryAction={{
                      label: "Action",
                      icon: <Plus className="h-3.5 w-3.5" />,
                      onClick: () => setIsPhoneSheetOpen(true),
                    }}
                    items={[
                      {
                        id: "home",
                        label: "Home",
                        icon: <Home className="h-3.5 w-3.5" />,
                        onClick: () => setPhoneDockSelected("home"),
                        active: phoneDockSelected === "home",
                      },
                      {
                        id: "explore",
                        label: "Explore",
                        icon: <Compass className="h-3.5 w-3.5" />,
                        onClick: () => setPhoneDockSelected("explore"),
                        active: phoneDockSelected === "explore",
                      },
                      {
                        id: "alerts",
                        label: "Alerts",
                        icon: <Bell className="h-3.5 w-3.5" />,
                        onClick: () => setPhoneDockSelected("alerts"),
                        active: phoneDockSelected === "alerts",
                        badge: 2,
                      },
                    ]}
                  />
                </div>

                {/* Bottom Home Indicator Bar */}
                <div
                  className={cn(
                    "h-3 w-full flex items-center justify-center shrink-0 z-40 transition-colors",
                    isLightMode ? "bg-white" : "bg-[var(--bg-main)]"
                  )}
                >
                  <div className={cn("w-32 h-1 rounded-full", isLightMode ? "bg-neutral-300" : "bg-neutral-700")} />
                </div>

              </div>
            </div>

            {/* ── Below Mobile Phone: Section Extension for Full Panel Scrolling ── */}
            <div className="w-[360px] sm:w-[380px] space-y-3 pt-2">
              {/* Preset Quick Switcher Card */}
              <div className="w-full p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/80 backdrop-blur-md space-y-2.5 font-mono text-xs select-none shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="font-semibold uppercase tracking-wider">Switch Preset Screen</span>
                  <span className="text-[var(--accent-green)] font-bold">
                    {PRESET_OPTIONS.find((p) => p.id === presetMode)?.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-0.5">
                  {PRESET_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPresetMode(opt.id)}
                      className={cn(
                        "p-2 rounded-xl border text-[11px] flex items-center gap-1.5 transition-all cursor-pointer truncate",
                        presetMode === opt.id
                          ? "bg-[var(--surface-tertiary)] border-[var(--accent-green)]/40 text-[var(--accent-green)] font-bold shadow-2xs"
                          : "bg-[var(--surface-secondary)]/50 border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                      )}
                    >
                      {opt.icon}
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reactive State Inspector Card */}
              <div className="w-full p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/80 backdrop-blur-md space-y-2 font-mono text-xs select-none shadow-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">Active Preset</span>
                  <span className="font-bold text-[var(--accent-green)] uppercase">{presetMode}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">Chassis Frame</span>
                  <span className="text-[var(--text-primary)]">Hardware 720px M3 Glass</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">Scroll Chaining</span>
                  <span className="text-[var(--accent-green)]">Panel Section Linked</span>
                </div>
              </div>

              {/* Quick CLI Command */}
              <div className="w-full p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/80 backdrop-blur-md flex items-center justify-between font-mono text-xs select-none shadow-xs">
                <div className="flex items-center gap-1.5 truncate text-[11px]">
                  <span className="text-[var(--accent-green)]">$</span>
                  <span className="text-[var(--text-muted)] truncate">npx @kilo-ui/cli add mobile</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] text-[10px] text-[var(--text-primary)] cursor-pointer active:scale-95 transition-all shrink-0 ml-2"
                >
                  {copiedCli ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

        {/* Floating Slide-Open Circle Button on Right Edge when Panel is hidden */}
        {!isPhoneVisible && (
          <button
            type="button"
            onClick={() => setIsPhoneVisible(true)}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 h-11 w-11 rounded-full bg-[var(--surface-elevated)] border-2 border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center transition-all cursor-pointer select-none group"
            title="Open Mobile Preview Panel"
            aria-label="Open Mobile Preview Panel"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5 text-[var(--accent-green)]" />
          </button>
        )}

        {/* Global Toast Notification */}
        <AnimatePresence>
          {demoToastMsg && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] shadow-2xl flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" />
              <span>{demoToastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Maximize2,
  Minimize2,
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
import { M3OtpInput } from "@/registry/ui/m3-otp-input";
import { BiometricScanner } from "@/components/ui/biometric-scanner";
import { MobileHapticStepper } from "@/components/ui/mobile-haptic-stepper";
import { DynamicIslandBanner } from "@/components/ui/dynamic-island";
import { MobileActionSheet } from "@/registry/ui/mobile-action-sheet";
import { MobileNumericKeypad } from "@/registry/ui/mobile-numeric-keypad";
import { ShapedImageCard, ImageCardShape } from "@/registry/ui/shaped-image-card";
import { Depth3dCarousel, NOCTURNE_SANCTUARIES } from "@/registry/ui/3d-depth-carousel";
import {
  CanvasItem,
  CanvasItemType,
  CustomPage,
  DEFAULT_PALETTE_ITEMS,
  INITIAL_CUSTOM_PAGES,
  generateDesignPrompt,
  MobileCanvasRenderer,
  CanvasPaletteTray,
  MobileStudioFocusModal,
  PromptExportModal,
} from "@/components/mobile-studio-builder";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import { useAppShell } from "@/components/app-shell";

type PresetMode =
  | "store"
  | "feed"
  | "pulse-sync"
  | "pulse-security"
  | "pulse-projects"
  | "otp-verify"
  | "wallet"
  | "custom";

const PRESET_OPTIONS: { id: PresetMode; label: string; sub: string; icon: React.ReactNode }[] = [
  { id: "store", label: "Store", sub: "Essential Archive", icon: <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" /> },
  { id: "feed", label: "Feed", sub: "Communication", icon: <Radio className="h-3.5 w-3.5 text-blue-400" /> },
  { id: "pulse-sync", label: "Pulse Sync", sub: "Cloud Engine", icon: <RefreshCw className="h-3.5 w-3.5 text-purple-400" /> },
  { id: "pulse-security", label: "Security", sub: "Biometrics", icon: <Shield className="h-3.5 w-3.5 text-amber-400" /> },
  { id: "pulse-projects", label: "Projects", sub: "Sprint Board", icon: <Layers className="h-3.5 w-3.5 text-cyan-400" /> },
  { id: "otp-verify", label: "OTP Verify", sub: "Auth Shield", icon: <Key className="h-3.5 w-3.5 text-rose-400" /> },
  { id: "wallet", label: "Wallet", sub: "Telemetry", icon: <Zap className="h-3.5 w-3.5 text-amber-300" /> },
  { id: "custom", label: "Custom Canvas", sub: "Interactive Studio", icon: <Sliders className="h-3.5 w-3.5 text-emerald-400" /> },
];

type CategoryFilter = "all" | "actions" | "forms" | "navigation" | "overlays" | "data-display";

let canvasItemIdCounter = 100;
function getNextCanvasItemId(): string {
  canvasItemIdCounter += 1;
  return `item-${canvasItemIdCounter}`;
}

let customPageIdCounter = 10;
function getNextCustomPageId(): string {
  customPageIdCounter += 1;
  return `custom-${customPageIdCounter}`;
}

function MobilePrimitivesContent() {
  const { theme } = useAppShell();
  const [isLightMode, setIsLightMode] = React.useState(false);

  React.useEffect(() => {
    const checkLight = () => document.documentElement.classList.contains("light");
    const rafId = requestAnimationFrame(() => {
      setIsLightMode(checkLight());
    });

    const observer = new MutationObserver(() => {
      setIsLightMode(checkLight());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [theme]);

  // Page Controls
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get("category") as CategoryFilter | null;

  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [presetMode, setPresetMode] = React.useState<PresetMode>("store");
  const [isPresetDropdownOpen, setIsPresetDropdownOpen] = React.useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = React.useState(true);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [demoActionSheetOpen, setDemoActionSheetOpen] = React.useState(false);
  const [demoKeypadVal, setDemoKeypadVal] = React.useState("");
  const [demoShapedCardShape, setDemoShapedCardShape] = React.useState<ImageCardShape>("arch");
  const [demoCarouselIdx, setDemoCarouselIdx] = React.useState(0);

  const scrollToPrimitives = React.useCallback(() => {
    setTimeout(() => {
      const container = document.getElementById("main-scroll-container");
      const el = document.getElementById("primitives-section");
      if (container && el) {
        const top = el.offsetTop - 24;
        container.scrollTo({ top, behavior: "smooth" });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }, []);

  React.useEffect(() => {
    if (categoryParam && ["all", "actions", "forms", "navigation", "overlays", "data-display"].includes(categoryParam)) {
      setActiveCategory(categoryParam);
      scrollToPrimitives();
    }
  }, [categoryParam, scrollToPrimitives]);

  React.useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const custom = e as CustomEvent<{ category: CategoryFilter }>;
      if (custom.detail?.category) {
        setActiveCategory(custom.detail.category);
        scrollToPrimitives();
      }
    };
    window.addEventListener("kilo:set-mobile-category", handleCategoryChange);
    return () => window.removeEventListener("kilo:set-mobile-category", handleCategoryChange);
  }, [scrollToPrimitives]);

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
  const [demoOtpDigits, setDemoOtpDigits] = React.useState<string>("8420");

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

  const showToast = React.useCallback((msg: string) => {
    setDemoToastMsg(msg);
    setTimeout(() => setDemoToastMsg(null), 3000);
  }, []);

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
  const [phoneOtpDigits, setPhoneOtpDigits] = React.useState<string>("5931");
  const [otpVerified, setOtpVerified] = React.useState(false);

  // ── Custom Canvas & Studio State ──
  const [customPages, setCustomPages] = React.useState<CustomPage[]>(INITIAL_CUSTOM_PAGES);
  const [activeCustomPageId, setActiveCustomPageId] = React.useState<string>("custom-1");
  const [isStudioExpanded, setIsStudioExpanded] = React.useState(false);
  const [isExportPromptOpen, setIsExportPromptOpen] = React.useState(false);
  const [exportedPromptText, setExportedPromptText] = React.useState("");

  const activeCustomPage = customPages.find((p) => p.id === activeCustomPageId) || customPages[0];

  const handleAddCanvasItem = React.useCallback((type: CanvasItemType) => {
    const paletteDef = DEFAULT_PALETTE_ITEMS.find((p) => p.type === type);
    const newItem: CanvasItem = {
      id: getNextCanvasItemId(),
      ...(paletteDef ? paletteDef.defaultItem : { type, title: type }),
    };

    setCustomPages((prev) =>
      prev.map((page) =>
        page.id === activeCustomPageId ? { ...page, items: [...page.items, newItem] } : page
      )
    );
    showToast(`Added ${paletteDef?.label || type} to screen`);
  }, [activeCustomPageId, showToast]);

  const handleReorderCanvasItem = React.useCallback((index: number, direction: "up" | "down") => {
    if (!activeCustomPage) return;
    const items = [...activeCustomPage.items];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const [moved] = items.splice(index, 1);
    items.splice(targetIdx, 0, moved);

    setCustomPages((prev) =>
      prev.map((page) => (page.id === activeCustomPageId ? { ...page, items } : page))
    );
  }, [activeCustomPage, activeCustomPageId]);

  const handleRemoveCanvasItem = React.useCallback((id: string) => {
    setCustomPages((prev) =>
      prev.map((page) =>
        page.id === activeCustomPageId
          ? { ...page, items: page.items.filter((item) => item.id !== id) }
          : page
      )
    );
    showToast("Component removed");
  }, [activeCustomPageId, showToast]);

  const handleUpdateCanvasItem = React.useCallback(
    (id: string, updates: Partial<CanvasItem>) => {
      setCustomPages((prev) =>
        prev.map((page) =>
          page.id === activeCustomPageId
            ? {
                ...page,
                items: page.items.map((item) =>
                  item.id === id ? { ...item, ...updates } : item
                ),
              }
            : page
        )
      );
    },
    [activeCustomPageId]
  );

  const handleNewCustomPage = React.useCallback(() => {
    const pageNum = customPages.length + 1;
    const newPage: CustomPage = {
      id: getNextCustomPageId(),
      name: `Page ${pageNum}`,
      items: [
        {
          id: getNextCanvasItemId(),
          type: "app-bar",
          title: `Custom Page ${pageNum}`,
          subtitle: "Material 3 Screen",
        },
      ],
    };
    setCustomPages((prev) => [...prev, newPage]);
    setActiveCustomPageId(newPage.id);
    showToast(`Created Page ${pageNum}`);
  }, [customPages.length, showToast]);

  const handleExportPrompt = React.useCallback(() => {
    if (!activeCustomPage) return;
    const prompt = generateDesignPrompt(activeCustomPage.name, activeCustomPage.items);
    setExportedPromptText(prompt);
    setIsExportPromptOpen(true);
  }, [activeCustomPage]);

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
      { id: getNextCanvasItemId(), sender: "Sync Dispatch", subject: "Real-time buffer refreshed", time: "now" },
      ...prev.slice(0, 3),
    ]);
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
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex items-center justify-between pb-1">
          <Link
            href="/components"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Components</span>
          </Link>

          {presetMode === "custom" && (
            <button
              type="button"
              onClick={() => setPresetMode("store")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-green)] hover:border-[var(--accent-green)]/40 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Presets Showcase</span>
            </button>
          )}
        </div>

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
        <div id="primitives-section" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
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

          {/* Quick Search Field */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter primitives..."
                className="w-full h-8.5 pl-8 pr-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 text-xs font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── 3-Column Primitives Grid Layout ── */}
        <div className="w-full pt-2">
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

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
                      <Link href="/components/biometric-scanner" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Biometric Scanner
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
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
                      <Link href="/components/otp-input" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        OTP Code Input
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Stitch M3-6</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 py-2">
                      <M3OtpInput
                        value={demoOtpDigits}
                        onChange={setDemoOtpDigits}
                        onComplete={(code) => showToast(`OTP Verified: ${code}`)}
                        size="md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setDemoOtpDigits("");
                          showToast("OTP cleared");
                        }}
                        className="text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      >
                        Reset Input
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Interactive numeric entry</span>
                      <span className="text-[var(--accent-green)]">M3 Tactile</span>
                    </div>
                  </div>
                )}

                {/* 12B. Mobile Haptic Stepper */}
                {matchesSearch("Mobile Haptic Stepper", "Touch quantity stepper counter reach", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/haptic-stepper" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Haptic Stepper
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
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

                {/* 13. Mobile Numeric Keypad */}
                {matchesSearch("Mobile Numeric Keypad", "Touch-calibrated PIN passcode checkout dialer", "Forms & Inputs") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/mobile-numeric-keypad" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Mobile Numeric Keypad
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Touch PIN</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)] space-y-3">
                      {/* PIN display */}
                      <div className="h-8 px-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center min-w-[120px]">
                        <span className="font-mono text-sm tracking-widest text-[var(--text-primary)] font-bold">
                          {demoKeypadVal ? "•".repeat(demoKeypadVal.length) : <span className="text-[10px] text-[var(--text-muted)] tracking-normal font-sans">Enter PIN</span>}
                        </span>
                      </div>

                      <div className="w-full max-w-[220px]">
                        <MobileNumericKeypad
                          value={demoKeypadVal}
                          onChange={setDemoKeypadVal}
                          maxLength={6}
                          leftAction={{
                            icon: <Fingerprint className="h-5 w-5 text-[var(--accent-green)]" />,
                            label: "Touch ID",
                            onClick: () => setDemoKeypadVal("4829"),
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Biometric quick-trigger</span>
                      <span className="text-[var(--accent-green)]">Haptic Keypad</span>
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
                      <Link href="/components/dynamic-island" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Dynamic Island HUD
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
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

                {/* 20. Mobile Action Sheet */}
                {matchesSearch("Mobile Action Sheet", "Cupertino M3 contextual action sheet destructive cancel", "Overlays") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/mobile-action-sheet" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Mobile Action Sheet
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">Cupertino / M3</span>
                    </div>

                    <div className="min-h-[160px] flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)]">
                      <button
                        type="button"
                        onClick={() => setDemoActionSheetOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer active:scale-95 transition-all shadow-xs"
                      >
                        Open Action Sheet
                      </button>

                      <MobileActionSheet
                        open={demoActionSheetOpen}
                        onOpenChange={setDemoActionSheetOpen}
                        title="Document Options"
                        description="Select an action to perform on this workspace node."
                        actions={[
                          { id: "share", label: "Share Document", icon: <Share2 className="h-4 w-4" />, onClick: () => setDemoActionSheetOpen(false) },
                          { id: "duplicate", label: "Duplicate Node", icon: <Copy className="h-4 w-4" />, onClick: () => setDemoActionSheetOpen(false) },
                          { id: "delete", label: "Delete Permanently", variant: "destructive", icon: <Trash2 className="h-4 w-4" />, onClick: () => setDemoActionSheetOpen(false) },
                        ]}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Destructive grouping & cancel pill</span>
                      <span className="text-[var(--accent-green)]">Spring Slide</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════════ DATA DISPLAY CATEGORY ════════ */}
            {showCategory("data-display") && (
              <>
                {/* 20. Shaped Image Card */}
                {matchesSearch("Shaped Image Card", "Multi-silhouette geometric arch ticket blob hexagon image cards", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/shaped-image-card" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        Shaped Image Card
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">16 Silhouettes</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)] space-y-3">
                      <div className="w-full max-w-[200px]">
                        <ShapedImageCard
                          shape={demoShapedCardShape}
                          layout="overlay"
                          aspectRatio="4/5"
                          glow
                          imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                          title="Villa Bellinzona"
                          subtitle="Alpine Retreat"
                          badge="Featured"
                          primaryAction={{
                            label: "View Space",
                            onClick: () => showToast("Opening space view..."),
                          }}
                        />
                      </div>

                      {/* Interactive Shape Pill Switcher */}
                      <div className="flex items-center gap-1 overflow-x-auto w-full no-scrollbar py-1">
                        {(["square", "rounded", "circle", "pill", "arch", "ticket", "hexagon", "blob", "shield", "star", "diamond", "heart", "scallop"] as ImageCardShape[]).map((sh) => (
                          <button
                            key={sh}
                            type="button"
                            onClick={() => setDemoShapedCardShape(sh)}
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[9px] font-mono capitalize transition-all border shrink-0 cursor-pointer",
                              demoShapedCardShape === sh
                                ? "bg-[var(--accent-green)] text-black font-bold border-transparent"
                                : "bg-[var(--surface-secondary)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)]"
                            )}
                          >
                            {sh}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Multi-shape CSS & SVG masks</span>
                      <span className="text-[var(--accent-green)]">16 Shapes</span>
                    </div>
                  </div>
                )}

                {/* 21. 3D Depth Card Carousel (Stitch Screen ca8b6e8e) */}
                {matchesSearch("3D Depth Card Carousel", "Curated collection perspective 3d cards sanctuary peek tilt", "Data Display") && (
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col justify-between space-y-4 hover:border-[var(--border-hover)] transition-all overflow-hidden">
                    <div className="flex items-center justify-between">
                      <Link href="/components/3d-depth-carousel" className="text-xs font-semibold text-[var(--text-primary)] hover:underline flex items-center gap-1">
                        3D Depth Carousel
                        <ExternalLink className="h-3 w-3 text-[var(--text-muted)]" />
                      </Link>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">3D Spatial</span>
                    </div>

                    <div className="relative w-full rounded-xl bg-[#090d16] border border-[#1b2234] overflow-hidden py-4 flex flex-col items-center">
                      <div className="w-full flex justify-center scale-90 sm:scale-95 origin-center">
                        <Depth3dCarousel
                          activeIndex={demoCarouselIdx}
                          onChange={setDemoCarouselIdx}
                          onReserve={(it) => showToast(`Reserving ${it.title}`)}
                          onBookmark={(it, saved) => showToast(saved ? `Saved ${it.title}` : `Removed ${it.title}`)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                      <span>Perspective 1200px • 3D Tilt</span>
                      <span className="text-[var(--accent-green)]">4 Escapes</span>
                    </div>
                  </div>
                )}

                {/* 22. M3 Cards & Surfaces */}
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

          
        </div>
      </div>

      {/* Fullscreen Centered Focus Studio Modal */}
        <AnimatePresence>
          {isStudioExpanded && (
            <MobileStudioFocusModal
              isOpen={isStudioExpanded}
              onClose={() => setIsStudioExpanded(false)}
              activePageName={activeCustomPage?.name || "Canvas Screen"}
              pages={customPages}
              activePageId={activeCustomPageId}
              onSelectPage={setActiveCustomPageId}
              onNewPage={handleNewCustomPage}
              onExportPrompt={handleExportPrompt}
              onAddPaletteItem={handleAddCanvasItem}
            >
              {/* Phone Device Chassis Frame Centered */}
              <div className="w-[360px] sm:w-[380px] h-[720px] rounded-[44px] bg-[var(--bg-main)] border-[7px] border-[#18191b] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] ring-1 ring-black/80 flex flex-col overflow-hidden relative select-none shrink-0">
                {/* Top Status Bar */}
                <div
                  className={cn(
                    "pt-2 pb-1 px-5 flex items-center justify-between shrink-0 z-30 text-[11px] font-mono transition-colors",
                    isLightMode ? "bg-white text-neutral-600 border-b border-neutral-100" : "bg-[var(--bg-main)] text-neutral-400 border-b border-[var(--border)]/30"
                  )}
                >
                  <span className={cn("font-semibold text-xs", isLightMode ? "text-neutral-900" : "text-white")}>
                    9:41
                  </span>
                  <div className="w-24 h-5 rounded-full bg-black flex items-center justify-between px-2.5 shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <span className="text-[9px] font-mono font-bold text-neutral-400">STUDIO</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Wifi className="h-3 w-3" />
                    <span className="text-[10px] font-bold">5G</span>
                  </div>
                </div>

                {/* Custom Canvas Renderer inside Centered Studio Chassis */}
                {activeCustomPage ? (
                  <MobileCanvasRenderer
                    items={activeCustomPage.items}
                    onReorder={handleReorderCanvasItem}
                    onRemove={handleRemoveCanvasItem}
                    onAddItem={handleAddCanvasItem}
                    onUpdateItem={handleUpdateCanvasItem}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center p-6 text-neutral-500 font-mono text-xs">
                    No active page selected
                  </div>
                )}

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
            </MobileStudioFocusModal>
          )}
        </AnimatePresence>

        {/* Prompt Export Dialog */}
        <PromptExportModal
          isOpen={isExportPromptOpen}
          onClose={() => setIsExportPromptOpen(false)}
          prompt={exportedPromptText}
        />

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
  );
}

export default function MobilePrimitivesPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}>
      <MobilePrimitivesContent />
    </React.Suspense>
  );
}

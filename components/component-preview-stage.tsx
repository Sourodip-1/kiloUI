"use client";

import * as React from "react";
import { RotateCcw, Check, Copy, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Mic, SlidersHorizontal, Search, Pin, Trash2, Home, Compass, Bell, Plus, ShoppingBag, Heart, Smartphone, RefreshCw, Layers, ArrowUpDown, Archive, CheckCircle2, User, Settings, Share2, Bookmark, Volume2, Edit3, Filter, Calendar, ArrowLeft, MoreVertical, Download, AlertCircle, CheckCheck, Star, Folder, X, Shield, Lock, Send, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileBottomSheet } from "@/registry/ui/mobile-bottom-sheet";
import { SwipeActionCard } from "@/registry/ui/swipe-action-card";
import { ThumbSegmentController } from "@/registry/ui/thumb-segment-controller";
import { PullToRefresh } from "@/registry/ui/pull-to-refresh";
import { FloatingActionDock } from "@/registry/ui/floating-action-dock";
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
import { M3LoadingIndicator } from "@/registry/ui/m3-loading-indicator";
import { M3Badge } from "@/registry/ui/m3-badge";
import { M3List, M3ListItem } from "@/registry/ui/m3-list";
import { BiometricScanner } from "@/registry/ui/biometric-scanner";
import { M3OtpInput } from "@/registry/ui/m3-otp-input";
import { MobileHapticStepper } from "@/registry/ui/mobile-haptic-stepper";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Switch } from "@/registry/ui/switch";
import { Checkbox } from "@/registry/ui/checkbox";
import { NotchedNavbar, HomeIcon, BriefcaseIcon, MailIcon } from "@/registry/ui/notched-navbar";
import { SearchBar, LiquidGlassSearchBar } from "@/registry/ui/search-bar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/registry/ui/dialog";
import { Badge } from "@/registry/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion";
import { StatCard } from "@/registry/ui/stat-card";
import { ExpandingCard } from "@/registry/ui/expanding-card";
import { BlurredCarousel } from "@/registry/ui/blurred-carousel";
import { ContentSlider } from "@/registry/ui/content-slider";
import { Footer } from "@/registry/ui/footer";
import { ScrollMarquee } from "@/registry/ui/scroll-marquee";
import { DirectionalMarquee } from "@/registry/ui/directional-marquee";
import { KineticText } from "@/registry/ui/kinetic-text";
import { MinimalistLogin } from "@/registry/ui/minimalist-login";
import { PrismaticSlatsBg } from "@/registry/ui/prismatic-slats-bg";
import { ConcaveCarousel } from "@/registry/ui/concave-carousel";
import { GrainyGridShader } from "@/registry/ui/grainy-grid-shader";
import { GrainyHorizonShader } from "@/registry/ui/grainy-horizon-shader";
import { FireflyCursor } from "@/registry/ui/firefly-cursor";
import { TargetCursor, MagneticCursor, TargetCursorVariant } from "@/registry/ui/magnetic-cursor";
import { NeonRibbonCursor, NeonRibbonVariant } from "@/registry/ui/neon-ribbon-cursor";
import { QuantumParticlesCursor, QuantumVariant } from "@/registry/ui/quantum-particles-cursor";
import { SpotlightCursor, SpotlightVariant } from "@/registry/ui/spotlight-cursor";
import { ElasticBlobCursor, ElasticBlobVariant } from "@/registry/ui/elastic-blob-cursor";
import { EtherealSmokeShader, ETHEREAL_SMOKE_PRESETS } from "@/registry/ui/ethereal-smoke-shader";
import { LiquidMetalBackground } from "@/registry/ui/liquid-metal-background";
import { ContourTide, ContourTidePreset, CONTOUR_TIDE_PRESETS } from "@/registry/ui/contour-tide";
import { MorphNodeRing, MorphShapeDesign } from "@/registry/ui/morph-node-ring";
import { GlassReveal, GlassRevealShape } from "@/registry/ui/glass-reveal";
import { HorizonLogin } from "@/registry/ui/horizon-login";
import { BlueprintLogin } from "@/registry/ui/blueprint-login";
import { MagneticButton } from "@/registry/ui/magnetic-button";
import { BorderBeamButton } from "@/registry/ui/border-beam-button";
import { CyberGlitchButton } from "@/registry/ui/cyber-glitch-button";
import { LiquidWaveButton } from "@/registry/ui/liquid-wave-button";
import { ParticleBurstButton } from "@/registry/ui/particle-burst-button";
import { ElasticSlotButton } from "@/registry/ui/elastic-slot-button";
import { GlassPrismButton } from "@/registry/ui/glass-prism-button";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonBadge, SkeletonCard, SkeletonCanvas } from "@/registry/ui/skeleton";
import { PopoverDialog } from "@/registry/ui/popover-dialog";
import { CommandPalette } from "@/registry/ui/command-palette";
import { DrawerDialog } from "@/registry/ui/drawer-dialog";
import { SpotlightModal } from "@/registry/ui/spotlight-modal";
import { AnnouncementBar } from "@/registry/ui/announcement-bar";
import { ToastStack } from "@/registry/ui/toast-stack";
import { TickerNotification } from "@/registry/ui/ticker-notification";
import { DynamicIslandBanner } from "@/registry/ui/dynamic-island-banner";
import { StackCards } from "@/registry/ui/stack-cards";
import { ShapedImageCard, ImageCardShape, ImageCardLayout } from "@/registry/ui/shaped-image-card";
import {
  Depth3dCarousel,
  NOCTURNE_SANCTUARIES,
} from "@/registry/ui/3d-depth-carousel";
import { SpecsGridCard } from "@/registry/ui/specs-grid-card";
import { HostTrustCard } from "@/registry/ui/host-trust-card";
import { BookingActionBar } from "@/registry/ui/booking-action-bar";
import { CuratedFilterBar } from "@/registry/ui/curated-filter-bar";
import { RegistryItem } from "@/registry/registry-data";
import { ScaledThumbnailWrapper } from "@/components/scaled-thumbnail-wrapper";
import {
  VectorKiloLogo,
  VectorPanelLeftIcon,
  VectorFolderIcon,
  VectorLayersIcon,
  VectorApiIcon,
  VectorCategoryIcon,
} from "@/components/vector-icons";

export interface ComponentPreviewStageProps {
  item: RegistryItem;
  interactive?: boolean;
  viewport?: "desktop" | "tablet" | "mobile";
  className?: string;
  onReset?: () => void;
  showKnobs?: boolean;
  showGrid?: boolean;
  onConfiguredCodeChange?: (code: string) => void;
  activeVariant?: string;
  onVariantChange?: (variant: string) => void;
}

/** Dedicated Mobile Preview Simulator with hardware black rims and adaptive light/dark screen */
function MobilePreviewChassis({
  children,
  isLightMode,
  title,
  subtitle,
  actions,
  className,
}: {
  children: React.ReactNode;
  isLightMode: boolean;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[340px] h-[580px] rounded-[44px] p-2.5 shadow-2xl transition-all duration-300 border-[7px] border-[#18191b] bg-[var(--bg-main)] ring-1 ring-black/80 flex flex-col justify-between overflow-hidden select-none",
        className
      )}
    >
      {/* Top Status Bar & Dynamic Island */}
      <div
        className={cn(
          "pt-2 pb-1 px-5 flex items-center justify-between shrink-0 z-30 text-[11px] font-mono transition-colors rounded-t-[34px]",
          isLightMode ? "bg-white text-neutral-600 border-b border-neutral-100" : "bg-[var(--bg-main)] text-neutral-400 border-b border-[var(--border)]/30"
        )}
      >
        <span className={cn("font-semibold text-xs", isLightMode ? "text-neutral-900" : "text-white")}>
          9:41
        </span>

        {/* Dynamic Island - hardware is black in both modes */}
        <div className="w-22 h-4.5 rounded-full bg-black border border-neutral-800 flex items-center justify-center gap-1.5 px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1c1d22] border border-neutral-700/60" />
          <div className="w-1 h-1 rounded-full bg-[#0a1829]" />
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span>5G</span>
          <div className="w-4 h-2 rounded-[2px] border border-neutral-400 p-[1px] flex items-center">
            <div className={cn("h-full w-2.5", isLightMode ? "bg-neutral-900" : "bg-neutral-200")} />
          </div>
        </div>
      </div>

      {/* Screen Header Bar (optional) */}
      {(title || subtitle || actions) && (
        <div
          className={cn(
            "px-4 py-2 border-b flex items-center justify-between shrink-0 z-20 transition-colors",
            isLightMode
              ? "bg-white border-neutral-200 text-neutral-900"
              : "bg-[var(--bg-main)] border-[var(--border)]/80 text-[var(--text-primary)]"
          )}
        >
          <div>
            {subtitle && (
              <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 block">
                {subtitle}
              </span>
            )}
            {title && (
              <h4 className="text-sm font-bold tracking-tight font-sans">
                {title}
              </h4>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}

      {/* Screen Interior Content */}
      <div
        className={cn(
          "relative flex-1 flex flex-col overflow-hidden transition-colors",
          isLightMode ? "bg-white text-neutral-900" : "bg-[var(--bg-main)] text-[var(--text-primary)]"
        )}
      >
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div
        className={cn(
          "h-4 w-full flex items-center justify-center shrink-0 z-30 transition-colors rounded-b-[34px]",
          isLightMode ? "bg-white" : "bg-[var(--bg-main)]"
        )}
      >
        <div
          className={cn(
            "w-28 h-1 rounded-full",
            isLightMode ? "bg-neutral-300" : "bg-neutral-700"
          )}
        />
      </div>
    </div>
  );
}

/** Tile container for individual controls matching photo 2 */
function CustomizeTile({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2.5 h-10 px-3.5 rounded-lg bg-[var(--surface-secondary)]/75 hover:bg-[var(--surface-secondary)] border border-[var(--border)]/70 transition-colors min-w-0 relative",
        className
      )}
    >
      <span
        title={label}
        className="text-xs font-semibold font-mono tracking-tight text-[var(--text-secondary)] truncate min-w-0 select-none mr-2"
      >
        {label}
      </span>
      <div className="flex items-center justify-end shrink-0 min-w-0">{children}</div>
    </div>
  );
}

/** Custom elevated select matching kilo/ui design tokens */
function CustomizeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[] | string[];
}) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const normOptions = React.useMemo(
    () =>
      options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
      ),
    [options]
  );

  const selectedOption =
    normOptions.find((opt) => opt.value === value) || {
      label: value,
      value,
    };

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", open && "z-50")}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer select-none",
          "bg-[var(--surface-tertiary)]/80 hover:bg-[var(--surface-tertiary)] border border-[var(--border)] hover:border-[var(--border-hover)]",
          "text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-green)]/40 shadow-xs",
          open && "border-[var(--accent-green)]/50 ring-1 ring-[var(--accent-green)]/40 bg-[var(--surface-elevated)]"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate max-w-[170px] sm:max-w-[200px] font-medium text-[var(--text-primary)]">
          {selectedOption.label}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-[var(--text-muted)] transition-transform duration-200 shrink-0 group-hover:text-[var(--text-primary)]",
            open && "rotate-180 text-[var(--accent-green)]"
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 top-full mt-1.5 z-[100] min-w-[140px] max-h-56 overflow-y-auto",
            "rounded-lg p-1 bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl shadow-black/80 backdrop-blur-md",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {normOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors text-left cursor-pointer",
                  isSelected
                    ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check className="h-3 w-3 text-[var(--accent-green)] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Rounded iOS-style pill switch matching photo 2 */
function CustomizeSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
        checked
          ? "bg-[var(--accent-green)]"
          : "bg-[var(--surface-tertiary)] border border-[var(--border)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5",
          checked ? "translate-x-4.5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

/** Transparent text input matching photo 2 */
function CustomizeInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent text-right text-xs text-[var(--text-primary)] font-mono focus:outline-none placeholder:text-[var(--text-muted)] w-28 sm:w-36 px-1 truncate"
    />
  );
}

/** Elegant elevated image preset and custom URL selector */
function CustomizeImageSelect({
  value,
  onChange,
  presets = [
    { name: "Sunflowers", url: "/images/sunflowers.jpg" },
    {
      name: "Portrait",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Cyber Neon",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Abstract Mist",
      url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Camera Noir",
      url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=1200&q=80",
    },
  ],
}: {
  value: string;
  onChange: (val: string) => void;
  presets?: { name: string; url: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentPreset = presets.find((p) => p.url === value);
  const label = currentPreset ? currentPreset.name : "Custom URL";

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", open && "z-50")}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group flex items-center justify-between gap-2 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-150 cursor-pointer select-none",
          "bg-[var(--surface-tertiary)]/80 hover:bg-[var(--surface-tertiary)] border border-[var(--border)] hover:border-[var(--border-hover)]",
          "text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-green)]/40 shadow-xs",
          open && "border-[var(--accent-green)]/50 ring-1 ring-[var(--accent-green)]/40 bg-[var(--surface-elevated)]"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 truncate max-w-[130px]">
          <img
            src={value}
            alt=""
            className="h-4 w-4 rounded-sm object-cover border border-white/20 shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <span className="truncate font-medium text-[var(--text-primary)]">
            {label}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-[var(--text-muted)] transition-transform duration-200 shrink-0 group-hover:text-[var(--text-primary)]",
            open && "rotate-180 text-[var(--accent-green)]"
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 mt-1.5 w-64 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-xl shadow-2xl z-50",
            "animate-in fade-in zoom-in-95 duration-100 origin-top-right text-xs"
          )}
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] px-1 pb-2">
            Select Photo Preset
          </div>
          <div className="grid grid-cols-1 gap-1 mb-2.5 max-h-52 overflow-y-auto pr-0.5">
            {presets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 w-full p-1.5 rounded-lg text-xs font-mono transition-colors text-left cursor-pointer",
                    isSelected
                      ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] font-semibold border border-[var(--border)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                  )}
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="h-7 w-7 rounded-md object-cover border border-white/10 shrink-0"
                  />
                  <span className="flex-1 truncate font-medium">{preset.name}</span>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0 mr-1" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[var(--border)]/70 pt-2 px-0.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] mb-1">
              Custom Image URL
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              className="w-full px-2.5 py-1.5 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[var(--accent-green)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** Color picker tile control with swatches and native picker */
function CustomizeColorPicker({
  value,
  onChange,
  presets = [
    { label: "Default", color: "" },
    { label: "White", color: "#ffffff" },
    { label: "Sage Green", color: "#8bc49a" },
    { label: "Cyan", color: "#22d3ee" },
    { label: "Violet", color: "#a78bfa" },
    { label: "Amber", color: "#fbbf24" },
    { label: "Rose", color: "#fb7185" },
  ],
}: {
  value: string;
  onChange: (val: string) => void;
  presets?: { label: string; color: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1">
        {presets.map((preset) => {
          const isSelected = value === preset.color;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.color)}
              title={preset.label}
              className={cn(
                "h-4 w-4 rounded-full border transition-transform cursor-pointer relative",
                isSelected
                  ? "scale-125 border-[var(--text-primary)] ring-1 ring-[var(--accent-green)]"
                  : "border-[var(--border)] hover:scale-110 opacity-75 hover:opacity-100"
              )}
              style={{
                backgroundColor: preset.color || "rgba(255,255,255,0.2)",
              }}
            />
          );
        })}
      </div>
      <label className="relative flex items-center cursor-pointer ml-1" title="Custom color picker">
        <input
          type="color"
          value={value.startsWith("#") ? value : "#8bc49a"}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div
          className="h-4 w-4 rounded border border-[var(--border)] hover:border-[var(--text-primary)] transition-colors shadow-2xs"
          style={{ backgroundColor: value || "transparent" }}
        />
      </label>
    </div>
  );
}

/** Precise slider with mono value readout matching Images 3 and 5 */
function CustomizeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  formatValue,
}: {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (v: number) => string;
}) {
  const displayVal = formatValue ? formatValue(value) : `${value}${unit}`;
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 sm:w-28 accent-[var(--accent-green)] h-1.5 bg-[var(--surface-tertiary)] rounded-full cursor-pointer"
      />
      <span className="font-mono text-xs text-[var(--text-primary)] w-12 text-right shrink-0 select-none">
        {displayVal}
      </span>
    </div>
  );
}

/** Hex color readout + interactive picker swatch matching Images 3 & 5 */
function CustomizeHexColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-[var(--text-primary)] uppercase select-all">
        {value}
      </span>
      <label className="relative flex items-center cursor-pointer" title="Pick color">
        <input
          type="color"
          value={value.startsWith("#") ? value : "#050505"}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
        <div
          className="h-4 w-4 rounded border border-[var(--border)] hover:border-[var(--text-primary)] transition-colors shadow-2xs"
          style={{ backgroundColor: value }}
        />
      </label>
    </div>
  );
}

export function ComponentPreviewStage({
  item,
  interactive = true,
  viewport = "desktop",
  className,
  onReset,
  showKnobs = true,
  showGrid = false,
  onConfiguredCodeChange,
  activeVariant,
  onVariantChange,
}: ComponentPreviewStageProps) {
  // Adaptive light/dark theme tracking for chassis interior
  const [isLightMode, setIsLightMode] = React.useState(false);
  React.useEffect(() => {
    const checkLight = () => document.documentElement.classList.contains("light");
    setIsLightMode(checkLight());
    const observer = new MutationObserver(() => setIsLightMode(checkLight()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 1. Mobile Bottom Sheet state
  const [mobileBottomSheetVariant, setMobileBottomSheetVariant] = React.useState<string>(
    item.name === "mobile-bottom-sheet" && activeVariant ? activeVariant : "default"
  );
  const [mobileBottomSheetOpen, setMobileBottomSheetOpen] = React.useState<boolean>(true);
  const [mobileBottomSheetTitle, setMobileBottomSheetTitle] = React.useState<string>("Order Summary");
  const [mobileBottomSheetHandle, setMobileBottomSheetHandle] = React.useState<boolean>(true);
  const [mobileBottomSheetBlur, setMobileBottomSheetBlur] = React.useState<boolean>(true);

  // 2. Swipe Action Card state
  const [swipeActionCardVariant, setSwipeActionCardVariant] = React.useState<string>(
    item.name === "swipe-action-card" && activeVariant ? activeVariant : "default"
  );
  const [swipeActionThreshold, setSwipeActionThreshold] = React.useState<number>(72);
  const [swipeActionDisabled, setSwipeActionDisabled] = React.useState<boolean>(false);
  const [swipeActionCount, setSwipeActionCount] = React.useState<number>(0);
  const [swipeLastAction, setSwipeLastAction] = React.useState<string>("");

  // 3. Thumb Segment Controller state
  const [thumbSegmentVariant, setThumbSegmentVariant] = React.useState<string>(
    item.name === "thumb-segment-controller" && activeVariant ? activeVariant : "default"
  );
  const [thumbSegmentValue, setThumbSegmentValue] = React.useState<string>("week");
  const [thumbSegmentFullWidth, setThumbSegmentFullWidth] = React.useState<boolean>(true);

  // 4. Pull To Refresh state
  const [pullToRefreshVariant, setPullToRefreshVariant] = React.useState<string>(
    item.name === "pull-to-refresh" && activeVariant ? activeVariant : "default"
  );
  const [pullToRefreshThreshold, setPullToRefreshThreshold] = React.useState<number>(72);
  const [pullToRefreshDisabled, setPullToRefreshDisabled] = React.useState<boolean>(false);
  const [pullRefreshCount, setPullRefreshCount] = React.useState<number>(1);
  const [pullItems, setPullItems] = React.useState<Array<{ id: string; title: string; desc: string; time: string }>>([
    { id: "1", title: "Sync Dispatch", desc: "Real-time buffer refreshed", time: "Just now" },
    { id: "2", title: "Telemetry Core", desc: "Sub-millisecond frame dispatch rate confirmed", time: "34m ago" },
    { id: "3", title: "AST Validator", desc: "All 5 mobile primitives schema compliance check", time: "1h ago" },
  ]);

  // 5. Floating Action Dock state
  const [floatingActionDockVariant, setFloatingActionDockVariant] = React.useState<string>(
    item.name === "floating-action-dock" && activeVariant ? activeVariant : "default"
  );
  const [floatingDockActive, setFloatingDockActive] = React.useState<string>("home");
  const [floatingDockShowPrimary, setFloatingDockShowPrimary] = React.useState<boolean>(true);
  const [floatingDockBadge, setFloatingDockBadge] = React.useState<number>(3);

  // Material 3 Mobile Suite State
  const [m3BtnVariant, setM3BtnVariant] = React.useState<any>(
    item.name === "m3-button" && activeVariant ? activeVariant : "filled"
  );
  const [m3BtnSize, setM3BtnSize] = React.useState<any>("default");
  const [m3BtnLabel, setM3BtnLabel] = React.useState("Action Button");
  const [m3BtnLoading, setM3BtnLoading] = React.useState(false);
  const [m3BtnDisabled, setM3BtnDisabled] = React.useState(false);

  const [m3FabVariant, setM3FabVariant] = React.useState<any>(
    item.name === "m3-fab" && activeVariant ? activeVariant : "extended"
  );
  const [m3FabSize, setM3FabSize] = React.useState<any>("extended");
  const [m3FabLabel, setM3FabLabel] = React.useState("New Action");

  const [m3SegmentVariant, setM3SegmentVariant] = React.useState<any>(
    item.name === "m3-segmented-button" && activeVariant ? activeVariant : "single-select"
  );
  const [m3SegmentVal, setM3SegmentVal] = React.useState<any>("day");
  const [m3MultiSegmentVal, setM3MultiSegmentVal] = React.useState<string[]>(["day", "week"]);
  const [m3ChipsList, setM3ChipsList] = React.useState(["Next.js", "Material 3", "Turbopack", "TypeScript"]);
  const [m3SelectedChips, setM3SelectedChips] = React.useState<string[]>(["Material 3", "Turbopack"]);

  const [m3IconBtnVariant, setM3IconBtnVariant] = React.useState<any>(
    item.name === "m3-icon-button" && activeVariant ? activeVariant : "tonal"
  );
  const [m3IconBtnSelected, setM3IconBtnSelected] = React.useState(false);

  const [m3SwitchVariant, setM3SwitchVariant] = React.useState<any>(
    item.name === "m3-switch" && activeVariant ? activeVariant : "standard-m3"
  );
  const [m3SwitchChecked, setM3SwitchChecked] = React.useState(true);
  const [m3SwitchIcons, setM3SwitchIcons] = React.useState(true);

  const [m3CheckboxVariant, setM3CheckboxVariant] = React.useState<any>(
    item.name === "m3-checkbox" && activeVariant ? activeVariant : "standard-m3"
  );
  const [m3CheckboxChecked, setM3CheckboxChecked] = React.useState(true);

  const [m3RadioVariant, setM3RadioVariant] = React.useState<any>(
    item.name === "m3-radio" && activeVariant ? activeVariant : "standard-m3"
  );
  const [m3RadioVal, setM3RadioVal] = React.useState("express");

  const [m3SliderVariant, setM3SliderVariant] = React.useState<any>(
    item.name === "m3-slider" && activeVariant ? activeVariant : "continuous"
  );
  const [m3SliderVal, setM3SliderVal] = React.useState(68);

  const [m3ChipVariant, setM3ChipVariant] = React.useState<any>(
    item.name === "m3-chip" && activeVariant ? activeVariant : "filter"
  );
  const [m3ChipSelected, setM3ChipSelected] = React.useState(true);

  const [m3TextVariant, setM3TextVariant] = React.useState<any>(
    item.name === "m3-text-field" && activeVariant ? activeVariant : "outlined"
  );
  const [m3TextVal, setM3TextVal] = React.useState("dev@kiloui.com");

  const [m3SearchVariant, setM3SearchVariant] = React.useState<any>(
    item.name === "m3-search-bar" && activeVariant ? activeVariant : "standard-m3"
  );
  const [m3SearchVal, setM3SearchVal] = React.useState("");

  const [m3NavVariant, setM3NavVariant] = React.useState<any>(
    item.name === "m3-navigation-bar" && activeVariant ? activeVariant : "standard-m3"
  );
  const [m3NavTab, setM3NavTab] = React.useState("home");

  const [m3AppBarVariant, setM3AppBarVariant] = React.useState<any>(
    item.name === "m3-top-app-bar" && activeVariant ? activeVariant : "center-aligned"
  );

  const [m3DrawerOpen, setM3DrawerOpen] = React.useState(false);
  const [m3DrawerVal, setM3DrawerVal] = React.useState("inbox");
  const [m3DrawerVariant, setM3DrawerVariant] = React.useState<any>(
    item.name === "m3-navigation-drawer" && activeVariant ? activeVariant : "modal-drawer"
  );

  const [m3TabsVariant, setM3TabsVariant] = React.useState<any>(
    item.name === "m3-tabs" && activeVariant ? activeVariant : "primary"
  );
  const [m3TabsVal, setM3TabsVal] = React.useState("overview");

  const [m3CardVariant, setM3CardVariant] = React.useState<any>(
    item.name === "m3-card" && activeVariant ? activeVariant : "outlined"
  );

  const SHAPED_CARD_IMAGES = [
    {
      title: "Villa Bellinzona",
      subtitle: "Alpine Sanctuary",
      badge: "Exclusive",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      desc: "Cantilevered brutalist residence nestled into the southern Swiss Alps with panoramic thermal glazing.",
    },
    {
      title: "Cybernetic Horizon",
      subtitle: "Neo Tokyo Grid",
      badge: "Cyberpunk",
      url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop",
      desc: "High-density telemetry nodes illuminating dense atmospheric mist across Sector 4.",
    },
    {
      title: "Komorebi Forest",
      subtitle: "Biophilic Retreat",
      badge: "Nature",
      url: "https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=800&auto=format&fit=crop",
      desc: "Filtered sunlight piercing morning mist through ancient Yakushima cedar canopies.",
    },
    {
      title: "Orbital Habitat IX",
      subtitle: "Deep Space Station",
      badge: "Sci-Fi",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      desc: "Next-generation solar torus generating artificial gravity for long-range research expeditions.",
    },
  ];

  const [shapedCardShape, setShapedCardShape] = React.useState<ImageCardShape>("arch");
  const [shapedCardLayout, setShapedCardLayout] = React.useState<ImageCardLayout>(
    item.name === "shaped-image-card" && activeVariant ? (activeVariant as ImageCardLayout) : "overlay"
  );
  const [shapedCardAspect, setShapedCardAspect] = React.useState<"1/1" | "4/3" | "16/9" | "3/4" | "4/5" | "2/3">("4/5");
  const [shapedCardGlow, setShapedCardGlow] = React.useState(true);
  const [shapedCardBorder, setShapedCardBorder] = React.useState(true);
  const [shapedCardImageIdx, setShapedCardImageIdx] = React.useState(0);

  const [depthCarouselIndex, setDepthCarouselIndex] = React.useState(0);
  const [depthCarouselSize, setDepthCarouselSize] = React.useState<"sm" | "default" | "lg">("default");
  const [depthCarouselTilt, setDepthCarouselTilt] = React.useState<number>(7);
  const [curatedActiveFilter, setCuratedActiveFilter] = React.useState("all");
  const [specsGuests, setSpecsGuests] = React.useState(4);
  const [hostVerified, setHostVerified] = React.useState(true);
  const [bookingSticky, setBookingSticky] = React.useState(false);
  const [carouselToast, setCarouselToast] = React.useState<string | null>(null);
  const showCarouselToast = React.useCallback((msg: string) => {
    setCarouselToast(msg);
    setTimeout(() => setCarouselToast((cur) => (cur === msg ? null : cur)), 2400);
  }, []);

  const [m3DialogOpen, setM3DialogOpen] = React.useState(false);
  const [m3DialogVariant, setM3DialogVariant] = React.useState<any>(
    item.name === "m3-dialog" && activeVariant ? activeVariant : "confirmation"
  );

  const [m3SnackbarVariant, setM3SnackbarVariant] = React.useState<any>(
    item.name === "m3-snackbar" && activeVariant ? activeVariant : "with-action"
  );
  const [m3SnackbarMsg, setM3SnackbarMsg] = React.useState("Message archived to archive vault");
  const [m3SnackbarOpen, setM3SnackbarOpen] = React.useState(true);

  const [m3ProgressVariant, setM3ProgressVariant] = React.useState<any>(
    item.name === "m3-progress-indicator" && activeVariant ? activeVariant : "circular"
  );
  const [m3ProgressVal, setM3ProgressVal] = React.useState(72);
  const [m3ProgressColor, setM3ProgressColor] = React.useState<"accent" | "google" | "monochrome">("accent");
  const [m3ProgressSpeed, setM3ProgressSpeed] = React.useState(1);
  const [m3ElasticResistance, setM3ElasticResistance] = React.useState(1);
  const [m3MorphVariant, setM3MorphVariant] = React.useState<"uncontained" | "contained">("uncontained");
  const [m3ContainerShape, setM3ContainerShape] = React.useState<"squircle" | "circle" | "rounded">("squircle");
  const [m3MorphSize, setM3MorphSize] = React.useState(56);
  const [m3SquiggleCount, setM3SquiggleCount] = React.useState(14);
  const [m3SquiggleAmp, setM3SquiggleAmp] = React.useState(3.5);

  const [m3BadgeVariant, setM3BadgeVariant] = React.useState<any>(
    item.name === "m3-badge" && activeVariant ? activeVariant : "count"
  );
  const [m3BadgeVal, setM3BadgeVal] = React.useState(4);

  const [m3ListVariant, setM3ListVariant] = React.useState<any>(
    item.name === "m3-list" && activeVariant ? activeVariant : "two-line"
  );

  // Biometric Scanner state
  const [biometricVariant, setBiometricVariant] = React.useState<any>(
    item.name === "biometric-scanner" && activeVariant ? activeVariant : "tile"
  );
  const [biometricSize, setBiometricSize] = React.useState<"sm" | "md" | "lg">("md");

  // OTP Input state
  const [otpVal, setOtpVal] = React.useState("8420");
  const [otpLength, setOtpLength] = React.useState(6);
  const [otpMask, setOtpMask] = React.useState(false);
  const [otpError, setOtpError] = React.useState(false);

  // Mobile Haptic Stepper state
  const [stepperVariant, setStepperVariant] = React.useState<any>(
    (item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper") && activeVariant
      ? activeVariant
      : "pill"
  );
  const [stepperVal, setStepperVal] = React.useState(3);
  const [stepperSize, setStepperSize] = React.useState<"sm" | "md" | "lg">("md");
  // 1. Button state
  const [btnVariant, setBtnVariant] = React.useState<any>(
    item.name === "button" && activeVariant ? activeVariant : "default"
  );
  const [btnSize, setBtnSize] = React.useState<any>("default");
  const [btnLabel, setBtnLabel] = React.useState("Action Button");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  // Magnetic Button state
  const [magneticVariant, setMagneticVariant] = React.useState<any>(
    item.name === "magnetic-button" && activeVariant ? activeVariant : "neon-glow"
  );
  const [magneticSize, setMagneticSize] = React.useState<any>("default");
  const [magneticLabel, setMagneticLabel] = React.useState("Explore Grid");
  const [magneticStrength, setMagneticStrength] = React.useState(0.35);
  const [magneticSpotlight, setMagneticSpotlight] = React.useState(true);
  const [magneticLoading, setMagneticLoading] = React.useState(false);
  const [magneticDisabled, setMagneticDisabled] = React.useState(false);

  // Border Beam Button state
  const [borderBeamVariant, setBorderBeamVariant] = React.useState<any>(
    item.name === "border-beam-button" && activeVariant ? activeVariant : "cyan-cyber"
  );
  const [borderBeamSize, setBorderBeamSize] = React.useState<any>("default");
  const [borderBeamLabel, setBorderBeamLabel] = React.useState("Initialize Core");
  const [borderBeamDuration, setBorderBeamDuration] = React.useState(4);
  const [borderBeamPulseSize, setBorderBeamPulseSize] = React.useState(28);
  const [borderBeamSpeedup, setBorderBeamSpeedup] = React.useState(true);
  const [borderBeamLoading, setBorderBeamLoading] = React.useState(false);
  const [borderBeamDisabled, setBorderBeamDisabled] = React.useState(false);

  // Cyber Glitch Button state
  const [cyberGlitchVariant, setCyberGlitchVariant] = React.useState<any>(
    item.name === "cyber-glitch-button" && activeVariant ? activeVariant : "tokyo-cyan"
  );
  const [cyberGlitchSize, setCyberGlitchSize] = React.useState<any>("default");
  const [cyberGlitchLabel, setCyberGlitchLabel] = React.useState("BREACH PROTOCOL");
  const [cyberGlitchHud, setCyberGlitchHud] = React.useState("SYS_ID // 0x8F");
  const [cyberGlitchBrackets, setCyberGlitchBrackets] = React.useState(true);
  const [cyberGlitchScanlines, setCyberGlitchScanlines] = React.useState(true);
  const [cyberGlitchLoading, setCyberGlitchLoading] = React.useState(false);
  const [cyberGlitchDisabled, setCyberGlitchDisabled] = React.useState(false);

  // Liquid Wave Button state
  const [liquidWaveVariant, setLiquidWaveVariant] = React.useState<any>(
    item.name === "liquid-wave-button" && activeVariant ? activeVariant : "ocean-deep"
  );
  const [liquidWaveSize, setLiquidWaveSize] = React.useState<any>("default");
  const [liquidWaveLabel, setLiquidWaveLabel] = React.useState("Deep Dive");
  const [liquidWaveSpeed, setLiquidWaveSpeed] = React.useState(1);
  const [liquidWaveBubbles, setLiquidWaveBubbles] = React.useState(true);
  const [liquidWaveLoading, setLiquidWaveLoading] = React.useState(false);
  const [liquidWaveDisabled, setLiquidWaveDisabled] = React.useState(false);

  // Particle Burst Button state
  const [particleBurstVariant, setParticleBurstVariant] = React.useState<any>(
    item.name === "particle-burst-button" && activeVariant ? activeVariant : "supernova-gold"
  );
  const [particleBurstSize, setParticleBurstSize] = React.useState<any>("default");
  const [particleBurstLabel, setParticleBurstLabel] = React.useState("Ignite Sparks");
  const [particleBurstCount, setParticleBurstCount] = React.useState(32);
  const [particleBurstAmbient, setParticleBurstAmbient] = React.useState(true);
  const [particleBurstLoading, setParticleBurstLoading] = React.useState(false);
  const [particleBurstDisabled, setParticleBurstDisabled] = React.useState(false);

  // Elastic Slot Button state
  const [elasticSlotVariant, setElasticSlotVariant] = React.useState<any>(
    item.name === "elastic-slot-button" && activeVariant ? activeVariant : "accent-pill"
  );
  const [elasticSlotSize, setElasticSlotSize] = React.useState<any>("default");
  const [elasticSlotLabel, setElasticSlotLabel] = React.useState("Deploy App");
  const [elasticSlotHoverLabel, setElasticSlotHoverLabel] = React.useState("Let's Ship ↗");
  const [elasticSlotDrawer, setElasticSlotDrawer] = React.useState(true);
  const [elasticSlotLoading, setElasticSlotLoading] = React.useState(false);
  const [elasticSlotDisabled, setElasticSlotDisabled] = React.useState(false);

  // Glass Prism Button state
  const [glassPrismVariant, setGlassPrismVariant] = React.useState<any>(
    item.name === "glass-prism-button" && activeVariant ? activeVariant : "spatial-glass"
  );
  const [glassPrismSize, setGlassPrismSize] = React.useState<any>("default");
  const [glassPrismLabel, setGlassPrismLabel] = React.useState("Spatial Compute");
  const [glassPrismTilt, setGlassPrismTilt] = React.useState(12);
  const [glassPrismGlare, setGlassPrismGlare] = React.useState(0.35);
  const [glassPrismBorder, setGlassPrismBorder] = React.useState(true);
  const [glassPrismLoading, setGlassPrismLoading] = React.useState(false);
  const [glassPrismDisabled, setGlassPrismDisabled] = React.useState(false);

  // Skeleton state
  const [skeletonVariant, setSkeletonVariant] = React.useState<any>(
    item.name === "skeleton" && activeVariant ? activeVariant : "shimmer"
  );
  const [skeletonShape, setSkeletonShape] = React.useState<any>("rounded");
  const [skeletonSpeed, setSkeletonSpeed] = React.useState<any>("normal");
  const [skeletonGlow, setSkeletonGlow] = React.useState(false);
  const [skeletonLines, setSkeletonLines] = React.useState(3);

  // 9 New Dialog, Notification, and Card Deck State Hooks
  const [popoverVariant, setPopoverVariant] = React.useState<any>(
    item.name === "popover-dialog" && activeVariant ? activeVariant : "contextual-actions"
  );
  const [popoverPlacement, setPopoverPlacement] = React.useState<any>("bottom");
  const [popoverShowArrow, setPopoverShowArrow] = React.useState(true);

  const [commandVariant, setCommandVariant] = React.useState<any>(
    item.name === "command-palette" && activeVariant ? activeVariant : "spotlight-dark"
  );
  const [commandOpen, setCommandOpen] = React.useState(false);

  const [drawerVariant, setDrawerVariant] = React.useState<any>(
    item.name === "drawer-dialog" && activeVariant ? activeVariant : "bottom-sheet"
  );
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerShowHandle, setDrawerShowHandle] = React.useState(true);

  const [spotlightModalVariant, setSpotlightModalVariant] = React.useState<any>(
    item.name === "spotlight-modal" && activeVariant ? activeVariant : "theatrical-glow"
  );
  const [spotlightModalOpen, setSpotlightModalOpen] = React.useState(false);
  const [spotlightReticle, setSpotlightReticle] = React.useState(true);

  const [announcementVariant, setAnnouncementVariant] = React.useState<any>(
    item.name === "announcement-bar" && activeVariant ? activeVariant : "cyber-gradient"
  );
  const [announcementCountdown, setAnnouncementCountdown] = React.useState(false);

  const [toastStackVariant, setToastStackVariant] = React.useState<any>(
    item.name === "toast-stack" && activeVariant ? activeVariant : "stacked-bottom-right"
  );
  const [toastStackExpand, setToastStackExpand] = React.useState(false);
  const [toastStackGap, setToastStackGap] = React.useState<"compact" | "normal" | "relaxed">("normal");

  const [tickerVariant, setTickerVariant] = React.useState<any>(
    item.name === "ticker-notification" && activeVariant ? activeVariant : "cyber-terminal"
  );
  const [tickerSpeed, setTickerSpeed] = React.useState<any>("normal");
  const [tickerPauseOnHover, setTickerPauseOnHover] = React.useState(true);

  const [dynamicIslandVariant, setDynamicIslandVariant] = React.useState<any>(
    (item.name === "dynamic-island-banner" || item.name === "dynamic-island") && activeVariant ? activeVariant : "compact-pill"
  );
  const [dynamicIslandAccent, setDynamicIslandAccent] = React.useState<any>("green");

  const [stackCardsVariant, setStackCardsVariant] = React.useState<any>(
    item.name === "stack-cards" && activeVariant ? activeVariant : "perspective-stack"
  );
  const [stackCardsAutoPlay, setStackCardsAutoPlay] = React.useState(false);

  // 2. Input state
  const [inputVal, setInputVal] = React.useState("production.env");
  const [inputLabel, setInputLabel] = React.useState("Target Filename");
  const [inputPlaceholder, setInputPlaceholder] = React.useState("e.g. .env");
  const [inputHelper, setInputHelper] = React.useState("Relative to workspace root");
  const [inputError, setInputError] = React.useState("");
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // Checkbox state
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [checkboxVariant, setCheckboxVariant] = React.useState<any>(
    item.name === "checkbox" && activeVariant ? activeVariant : "motion"
  );
  const [checkboxSize, setCheckboxSize] = React.useState<"sm" | "default" | "lg">("default");
  const [checkboxIndeterminate, setCheckboxIndeterminate] = React.useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = React.useState(false);
  const [checkboxLabel, setCheckboxLabel] = React.useState("Auto-deploy to edge network");
  const [checkboxDesc, setCheckboxDesc] = React.useState("Triggers pipeline sync on successful build verification");
  const [checkboxBadge, setCheckboxBadge] = React.useState("Motion");

  // Notched Navbar state
  const [notchedVariant, setNotchedVariant] = React.useState<string>(
    item.name === "notched-navbar" && activeVariant ? activeVariant : "default"
  );
  const [notchedBorderPadding, setNotchedBorderPadding] = React.useState<number>(8);
  const [notchedWidth, setNotchedWidth] = React.useState<number>(
    item.name === "notched-navbar" && (activeVariant === "left" || activeVariant === "right")
      ? 260
      : item.name === "notched-navbar" && activeVariant === "compact"
      ? 300
      : 540
  );
  const [notchedHeight, setNotchedHeight] = React.useState<number>(
    item.name === "notched-navbar" && (activeVariant === "left" || activeVariant === "right")
      ? 56
      : item.name === "notched-navbar" && activeVariant === "deep-notch"
      ? 52
      : 42
  );
  const [notchedActiveTab, setNotchedActiveTab] = React.useState<string>("home");
  const [notchedFrameBg, setNotchedFrameBg] = React.useState<string>("#222326");

  // Search Bar (Liquid Glass) state
  const [searchBarExpanded, setSearchBarExpanded] = React.useState<boolean>(false);
  const [searchBarQuery, setSearchBarQuery] = React.useState<string>("");
  const [searchBarPlaceholder, setSearchBarPlaceholder] = React.useState<string>("Search components...");
  const [searchBarVariant, setSearchBarVariant] = React.useState<string>(
    (item.name === "search-bar" || item.name === "liquid-glass-search-bar") && activeVariant
      ? activeVariant
      : "downward-expand"
  );
  const [searchBarSelectedTitle, setSearchBarSelectedTitle] = React.useState<string | null>(null);
  const [searchBarBgMode, setSearchBarBgMode] = React.useState<"refraction-grid" | "sky" | "dark">("refraction-grid");

  // 3. Switch state
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [switchLabel, setSwitchLabel] = React.useState("Cache Turbo Output");
  const [switchDesc, setSwitchDesc] = React.useState("Store compiled assets in local disk");
  const [switchDisabled, setSwitchDisabled] = React.useState(false);

  // 4. Dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("Deploy Revision #104");
  const [dialogDesc, setDialogDesc] = React.useState(
    "Are you sure you want to promote this build to production? Active connections will receive the updated worker bundle."
  );
  const [dialogTriggerLabel, setDialogTriggerLabel] = React.useState("Open Deploy Modal");

  // 5. Badge state
  const [badgeVariant, setBadgeVariant] = React.useState<any>(
    item.name === "badge" && activeVariant ? activeVariant : "default"
  );
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeText, setBadgeText] = React.useState("Operational");


  // 6. Card state
  const [cardTitle, setCardTitle] = React.useState("Edge Runtime Worker");
  const [cardDesc, setCardDesc] = React.useState("Distributed edge node instance");
  const [cardHover, setCardHover] = React.useState(true);

  // 7. Tabs state
  const [tabValue, setTabValue] = React.useState("overview");
  const [tabVariant, setTabVariant] = React.useState<"default" | "slide" | "liquid-pill" | "island" | "minimal">(
    item.name === "tabs" && activeVariant ? (activeVariant as any) : "default"
  );
  const [tabPillStyle, setTabPillStyle] = React.useState<"liquid-glow" | "solid" | "glass" | "accent">("liquid-glow");

  // 8. StatCard state
  const [statTitle, setStatTitle] = React.useState("Active Registry Users");
  const [statValue, setStatValue] = React.useState("12,840");
  const [statChange, setStatChange] = React.useState("+14.2%");
  const [statTrend, setStatTrend] = React.useState<"up" | "down" | "neutral">("up");
  const [statCaption, setStatCaption] = React.useState("vs last 30 days");
  const [statBadge, setStatBadge] = React.useState(true);

  // 9. Sidebar state
  const [sidebarDemoCollapsed, setSidebarDemoCollapsed] = React.useState(false);
  const [sidebarVariant, setSidebarVariant] = React.useState<"scrollable-categories" | "default">(
    (activeVariant as any) || "scrollable-categories"
  );

  // 10. Expanding Card state
  const [expandingTitle, setExpandingTitle] = React.useState("Components");
  const [expandingSubtitle, setExpandingSubtitle] = React.useState("Hover to reveal full showcase view");
  const [expandingForced, setExpandingForced] = React.useState(activeVariant === "expanded");

  // 11. Blurred Carousel state
  const [carouselTitle, setCarouselTitle] = React.useState("Featured Templates");
  const [carouselAutoplay, setCarouselAutoplay] = React.useState(activeVariant === "autoplay");

  // 12. TOC Content Slider state
  const [tocActiveId, setTocActiveId] = React.useState("usage");
  const [tocRubberBand, setTocRubberBand] = React.useState(true);

  // 13. Footer state
  const [footerBrandText, setFooterBrandText] = React.useState("kilo/ui");
  const [footerBlurBlend, setFooterBlurBlend] = React.useState(true);
  const [footerShowNewsletter, setFooterShowNewsletter] = React.useState(true);

  // 14. Scroll Marquee state
  const [marqueeText, setMarqueeText] = React.useState("ENGINEERED FOR HIGH VELOCITY • MINIMAL BY DESIGN • HARDWARE ACCELERATED •");
  const [marqueeVariant, setMarqueeVariant] = React.useState<"scroll-left" | "scroll-right" | "dual-scroll" | "velocity-skew">(
    (activeVariant as any) || "scroll-left"
  );
  const [marqueeOutline, setMarqueeOutline] = React.useState(false);
  const [marqueeTextColor, setMarqueeTextColor] = React.useState<string>("");
  const [marqueeBlurColor, setMarqueeBlurColor] = React.useState<string>("mask");

  // 15. Directional Marquee state
  const [dirMarqueeDir, setDirMarqueeDir] = React.useState<"auto" | "down" | "up">("auto");
  const [dirMarqueeHud, setDirMarqueeHud] = React.useState(true);
  const [dirMarqueeTextColor, setDirMarqueeTextColor] = React.useState<string>("");
  const [dirMarqueeBlurColor, setDirMarqueeBlurColor] = React.useState<string>("mask");

  // 16. Kinetic Text state
  const [kineticText, setKineticText] = React.useState("KILO / MOTION UI");
  const [kineticVariant, setKineticVariant] = React.useState<"rubber-band" | "wave-ripple" | "scramble-decode" | "magnetic-tilt">(
    (activeVariant as any) || "rubber-band"
  );

  // 17. Minimalist Login state
  const [loginVariant, setLoginVariant] = React.useState<"sharp-edges" | "rounded-corners">(
    (activeVariant as any) || "sharp-edges"
  );
  const [loginRadius, setLoginRadius] = React.useState<number>(20);
  const [loginSphereMotion, setLoginSphereMotion] = React.useState<boolean>(true);
  const [loginInteractiveDots, setLoginInteractiveDots] = React.useState<boolean>(true);
  const [loginRotationSpeed, setLoginRotationSpeed] = React.useState<number>(1);

  // 18. Concave Carousel state (Matching Image 3 controls)
  const [concavePreset, setConcavePreset] = React.useState<"Rotunda" | "Tunnel" | "Flat" | "Panoramic" | "Convex">("Rotunda");
  const [concaveAutoplay, setConcaveAutoplay] = React.useState<"Drift" | "None" | "Step">("Drift");
  const [concaveBg, setConcaveBg] = React.useState<string>("#0A0A0A");
  const [concaveAspect, setConcaveAspect] = React.useState<number>(1.25);
  const [concaveSize, setConcaveSize] = React.useState<number>(0.46);
  const [concaveCurvature, setConcaveCurvature] = React.useState<number>(0.72);
  const [concaveDistance, setConcaveDistance] = React.useState<number>(4.0);
  const [concaveTilt, setConcaveTilt] = React.useState<number>(0.0);
  const [concaveGap, setConcaveGap] = React.useState<number>(16);
  const [concaveRadius, setConcaveRadius] = React.useState<number>(14);
  const [concaveReflection, setConcaveReflection] = React.useState<number>(0.06);
  const [concaveDim, setConcaveDim] = React.useState<number>(0.35);
  const [concaveSpeed, setConcaveSpeed] = React.useState<number>(0.16);
  const [concaveInterval, setConcaveInterval] = React.useState<number>(4.0);
  const [concaveInertia, setConcaveInertia] = React.useState<number>(0.50);
  const [concaveSnap, setConcaveSnap] = React.useState<boolean>(false);
  const [concavePauseOnHover, setConcavePauseOnHover] = React.useState<boolean>(false);
  const [concaveDraggable, setConcaveDraggable] = React.useState<boolean>(true);
  const [concaveWheel, setConcaveWheel] = React.useState<boolean>(true);
  const [concaveCaptions, setConcaveCaptions] = React.useState<boolean>(true);
  const [concaveControls, setConcaveControls] = React.useState<boolean>(true);
  const [concavePaused, setConcavePaused] = React.useState<boolean>(false);

  const handleConcavePresetChange = React.useCallback((preset: "Rotunda" | "Tunnel" | "Flat" | "Panoramic" | "Convex") => {
    setConcavePreset(preset);
    if (preset === "Rotunda") {
      setConcaveCurvature(0.72);
      setConcaveDistance(4.0);
      setConcaveTilt(0.0);
      setConcaveGap(16);
      setConcaveDim(0.35);
    } else if (preset === "Tunnel") {
      setConcaveCurvature(1.25);
      setConcaveDistance(2.8);
      setConcaveTilt(4.0);
      setConcaveGap(12);
      setConcaveDim(0.55);
    } else if (preset === "Flat") {
      setConcaveCurvature(0.0);
      setConcaveDistance(5.0);
      setConcaveTilt(0.0);
      setConcaveGap(24);
      setConcaveDim(0.10);
    } else if (preset === "Panoramic") {
      setConcaveCurvature(0.45);
      setConcaveDistance(6.0);
      setConcaveTilt(0.0);
      setConcaveGap(20);
      setConcaveDim(0.25);
    } else if (preset === "Convex") {
      setConcaveCurvature(-0.72);
      setConcaveDistance(4.5);
      setConcaveTilt(0.0);
      setConcaveGap(16);
      setConcaveDim(0.35);
    }
  }, []);

  // 19. Prismatic Slats Shader state (Matching Image 5 controls)
  const [slatPreset, setSlatPreset] = React.useState<"Violet" | "Cyan" | "Sunset" | "Emerald">("Violet");
  const [slatBg, setSlatBg] = React.useState<string>("#050505");
  const [slatPrimary, setSlatPrimary] = React.useState<string>("#5227FF");
  const [slatSecondary, setSlatSecondary] = React.useState<string>("#FF9FFC");
  const [slatAngle, setSlatAngle] = React.useState<number>(28);
  const [slatFlutes, setSlatFlutes] = React.useState<number>(8);
  const [slatRefraction, setSlatRefraction] = React.useState<number>(4.0);
  const [slatAberration, setSlatAberration] = React.useState<number>(0.61);
  const [slatSoftness, setSlatSoftness] = React.useState<number>(0.50);
  const [slatWave, setSlatWave] = React.useState<number>(0.06);
  const [slatWaveFreq, setSlatWaveFreq] = React.useState<number>(1.5);
  const [slatDrift, setSlatDrift] = React.useState<number>(0.00);
  const [slatHighlight, setSlatHighlight] = React.useState<number>(0.12);
  const [slatHighlightSoft, setSlatHighlightSoft] = React.useState<number>(0.30);
  const [slatLightAngle, setSlatLightAngle] = React.useState<number>(-90);
  const [slatRadius, setSlatRadius] = React.useState<number>(6.5);
  const [slatMomentum, setSlatMomentum] = React.useState<number>(13);
  const [slatSwirl, setSlatSwirl] = React.useState<number>(0);
  const [slatIntensity, setSlatIntensity] = React.useState<number>(1.00);
  const [slatTrail, setSlatTrail] = React.useState<number>(1.00);
  const [slatTexture, setSlatTexture] = React.useState<number>(0.60);
  const [slatGrainVal, setSlatGrainVal] = React.useState<number>(0.050);
  const [slatSpeed, setSlatSpeed] = React.useState<number>(1.00);
  const [slatAutoplay, setSlatAutoplay] = React.useState<boolean>(false);
  const [slatInteractive, setSlatInteractive] = React.useState<boolean>(true);
  const [slatPaused, setSlatPaused] = React.useState<boolean>(false);

  const handleSlatPresetChange = React.useCallback((preset: "Violet" | "Cyan" | "Sunset" | "Emerald") => {
    setSlatPreset(preset);
    if (preset === "Violet") {
      setSlatPrimary("#5227FF");
      setSlatSecondary("#FF9FFC");
      setSlatBg("#050505");
    } else if (preset === "Cyan") {
      setSlatPrimary("#00d2ff");
      setSlatSecondary("#3a7bd5");
      setSlatBg("#030b14");
    } else if (preset === "Sunset") {
      setSlatPrimary("#ff416c");
      setSlatSecondary("#ff4b2b");
      setSlatBg("#0c0406");
    } else if (preset === "Emerald") {
      setSlatPrimary("#00b09b");
      setSlatSecondary("#96c93d");
      setSlatBg("#040e0a");
    }
  }, []);

  // 20. Grainy Grid Shader state
  const [gridVariant, setGridVariant] = React.useState<"rough-matte" | "tactile-kraft" | "cyber-mesh">("rough-matte");
  const [gridGrain, setGridGrain] = React.useState<number>(0.22);
  const [gridRoughness, setGridRoughness] = React.useState<number>(1.0);
  const [gridColumns, setGridColumns] = React.useState<number>(6);
  const [gridRows, setGridRows] = React.useState<number>(4);
  const [gridCellSize, setGridCellSize] = React.useState<number>(52);
  const [gridSpeed, setGridSpeed] = React.useState<number>(1.0);
  const [gridRadius, setGridRadius] = React.useState<number>(140);
  const [gridAutoWave, setGridAutoWave] = React.useState<boolean>(true);
  const [gridInteractive, setGridInteractive] = React.useState<boolean>(true);
  const [gridShowBoxes, setGridShowBoxes] = React.useState<boolean>(true);

  const handleGridVariantChange = React.useCallback((v: "rough-matte" | "tactile-kraft" | "cyber-mesh") => {
    setGridVariant(v);
  }, []);

  // 21. Grainy Horizon Shader state
  const [horizonVariant, setHorizonVariant] = React.useState<
    "ultraviolet" | "aurora-green" | "solar-amber" | "cyber-cyan" | "monochrome" | "custom"
  >("ultraviolet");
  const [horizonColor, setHorizonColor] = React.useState<string>("#6633ee");
  const [horizonSecondaryColor, setHorizonSecondaryColor] = React.useState<string>("#8b5cf6");
  const [horizonGlowIntensity, setHorizonGlowIntensity] = React.useState<number>(1.0);
  const [horizonGlowSpread, setHorizonGlowSpread] = React.useState<number>(1.25);
  const [horizonLiquidCursor, setHorizonLiquidCursor] = React.useState<boolean>(true);
  const [horizonCursorIntensity, setHorizonCursorIntensity] = React.useState<number>(0.75);

  const handleHorizonVariantChange = React.useCallback(
    (v: "ultraviolet" | "aurora-green" | "solar-amber" | "cyber-cyan" | "monochrome" | "custom") => {
      setHorizonVariant(v);
      if (v === "aurora-green") {
        setHorizonColor("#059669");
        setHorizonSecondaryColor("#10b981");
      } else if (v === "solar-amber") {
        setHorizonColor("#ea580c");
        setHorizonSecondaryColor("#f59e0b");
      } else if (v === "cyber-cyan") {
        setHorizonColor("#0284c7");
        setHorizonSecondaryColor("#06b6d4");
      } else if (v === "monochrome") {
        setHorizonColor("#52525b");
        setHorizonSecondaryColor("#a1a1aa");
      } else if (v === "ultraviolet") {
        setHorizonColor("#6633ee");
        setHorizonSecondaryColor("#8b5cf6");
      }
    },
    []
  );

  // 22. Firefly Cursor state
  const [cursorPreset, setCursorPreset] = React.useState<
    "comet" | "firefly" | "nebula" | "plasma" | "aurora"
  >("comet");
  const [cursorColor, setCursorColor] = React.useState<string>("#5f8bff");
  const [cursorCoolingColor, setCursorCoolingColor] = React.useState<string>("#5f8bff");
  const [cursorIntensity, setCursorIntensity] = React.useState<number>(0.6);
  const [cursorTrailWidth, setCursorTrailWidth] = React.useState<number>(3);
  const [cursorLinger, setCursorLinger] = React.useState<number>(1.4);
  const [cursorGlow, setCursorGlow] = React.useState<number>(1.2);
  const [cursorHotspot, setCursorHotspot] = React.useState<number>(0.8);
  const [cursorFollowSpeed, setCursorFollowSpeed] = React.useState<number>(0.6);
  const [cursorGrain, setCursorGrain] = React.useState<number>(0);
  const [cursorQuality, setCursorQuality] = React.useState<"low" | "medium" | "high">("high");
  const [cursorClickBurst, setCursorClickBurst] = React.useState<boolean>(true);
  const [cursorEnabled, setCursorEnabled] = React.useState<boolean>(true);

  const handleCursorPresetChange = React.useCallback(
    (p: "comet" | "firefly" | "nebula" | "plasma" | "aurora") => {
      setCursorPreset(p);
      if (p === "comet") {
        setCursorColor("#5f8bff");
        setCursorCoolingColor("#5f8bff");
        setCursorIntensity(0.6);
        setCursorTrailWidth(3);
        setCursorLinger(1.4);
        setCursorGlow(1.2);
        setCursorHotspot(0.8);
        setCursorFollowSpeed(0.6);
      } else if (p === "firefly") {
        setCursorColor("#f59e0b");
        setCursorCoolingColor("#fbbf24");
        setCursorIntensity(0.8);
        setCursorTrailWidth(2.5);
        setCursorLinger(1.2);
        setCursorGlow(1.5);
        setCursorHotspot(1.0);
        setCursorFollowSpeed(0.7);
      } else if (p === "nebula") {
        setCursorColor("#7c3aed");
        setCursorCoolingColor("#ec4899");
        setCursorIntensity(0.75);
        setCursorTrailWidth(3.5);
        setCursorLinger(1.8);
        setCursorGlow(1.4);
        setCursorHotspot(0.7);
        setCursorFollowSpeed(0.55);
      } else if (p === "plasma") {
        setCursorColor("#06b6d4");
        setCursorCoolingColor("#10b981");
        setCursorIntensity(0.7);
        setCursorTrailWidth(3);
        setCursorLinger(1.5);
        setCursorGlow(1.3);
        setCursorHotspot(0.8);
        setCursorFollowSpeed(0.65);
      } else if (p === "aurora") {
        setCursorColor("#6366f1");
        setCursorCoolingColor("#a855f7");
        setCursorIntensity(0.7);
        setCursorTrailWidth(3);
        setCursorLinger(1.6);
        setCursorGlow(1.3);
        setCursorHotspot(0.8);
        setCursorFollowSpeed(0.6);
      }
    },
    []
  );

  // 23. Ethereal Smoke Shader state
  const initialSmokePreset =
    (item.name === "ethereal-smoke-shader" && activeVariant && (ETHEREAL_SMOKE_PRESETS as any)[activeVariant])
      ? (activeVariant as "chai-blue" | "ethereal-violet" | "solar-flare" | "emerald-mist" | "spectral-white")
      : "chai-blue";
  const initialSmokeConf = ETHEREAL_SMOKE_PRESETS[initialSmokePreset] || ETHEREAL_SMOKE_PRESETS["chai-blue"];

  const [smokePreset, setSmokePreset] = React.useState<
    "chai-blue" | "ethereal-violet" | "solar-flare" | "emerald-mist" | "spectral-white"
  >(initialSmokePreset);
  const [smokeOrigin, setSmokeOrigin] = React.useState<"right" | "left" | "center" | "bottom">("right");
  const [smokeOriginX, setSmokeOriginX] = React.useState<number>(0.98);
  const [smokeOriginY, setSmokeOriginY] = React.useState<number>(0.50);
  const [smokeCoreColor, setSmokeCoreColor] = React.useState<string>(initialSmokeConf.coreColor);
  const [smokeColor, setSmokeColor] = React.useState<string>(initialSmokeConf.smokeColor);
  const [smokeAtmoColor, setSmokeAtmoColor] = React.useState<string>(initialSmokeConf.atmoColor);
  const [smokeBgColor, setSmokeBgColor] = React.useState<string>(initialSmokeConf.bgColor);
  const [smokeIntensity, setSmokeIntensity] = React.useState<number>(initialSmokeConf.intensity);
  const [smokeSpread, setSmokeSpread] = React.useState<number>(initialSmokeConf.spread);
  const [smokeTurbulence, setSmokeTurbulence] = React.useState<number>(initialSmokeConf.turbulence);
  const [smokeSpeed, setSmokeSpeed] = React.useState<number>(initialSmokeConf.speed);
  const [smokeMouseStrength, setSmokeMouseStrength] = React.useState<number>(0.85);
  const [smokeMouseSpread, setSmokeMouseSpread] = React.useState<number>(0.95);
  const [smokeTrailWidth, setSmokeTrailWidth] = React.useState<number>(24);
  const [smokeTrailLinger, setSmokeTrailLinger] = React.useState<number>(1.6);
  const [smokeGrain, setSmokeGrain] = React.useState<number>(0.04);
  const [smokeVignette, setSmokeVignette] = React.useState<number>(0.45);
  const [smokeInteractive, setSmokeInteractive] = React.useState<boolean>(true);

  const handleSmokeOriginChange = React.useCallback(
    (orig: "right" | "left" | "center" | "bottom") => {
      setSmokeOrigin(orig);
      if (orig === "right") {
        setSmokeOriginX(0.98);
        setSmokeOriginY(0.50);
      } else if (orig === "left") {
        setSmokeOriginX(0.02);
        setSmokeOriginY(0.50);
      } else if (orig === "center") {
        setSmokeOriginX(0.50);
        setSmokeOriginY(0.50);
      } else if (orig === "bottom") {
        setSmokeOriginX(0.50);
        setSmokeOriginY(0.95);
      }
    },
    []
  );

  const handleSmokePresetChange = React.useCallback(
    (p: "chai-blue" | "ethereal-violet" | "solar-flare" | "emerald-mist" | "spectral-white") => {
      setSmokePreset(p);
      const conf = ETHEREAL_SMOKE_PRESETS[p];
      if (conf) {
        setSmokeCoreColor(conf.coreColor);
        setSmokeColor(conf.smokeColor);
        setSmokeAtmoColor(conf.atmoColor);
        setSmokeBgColor(conf.bgColor);
        setSmokeIntensity(conf.intensity);
        setSmokeSpread(conf.spread);
        setSmokeTurbulence(conf.turbulence);
        setSmokeSpeed(conf.speed);
      }
    },
    []
  );

  // Liquid Metal Background State
  const initialMetalTone =
    activeVariant === "pure-silver" ||
    activeVariant === "liquid-gold" ||
    activeVariant === "titanium" ||
    activeVariant === "cobalt-chrome"
      ? (activeVariant as "cobalt-chrome" | "pure-silver" | "liquid-gold" | "titanium")
      : "cobalt-chrome";
  const [metalTone, setMetalTone] = React.useState<"cobalt-chrome" | "pure-silver" | "liquid-gold" | "titanium">(initialMetalTone);
  const [metalIntensity, setMetalIntensity] = React.useState<"subtle" | "balanced" | "dramatic">("balanced");
  const [metalSpeed, setMetalSpeed] = React.useState<number>(1.0);
  const [metalInteractive, setMetalInteractive] = React.useState<boolean>(true);
  const [metalTheme, setMetalTheme] = React.useState<"system" | "dark" | "light">("system");

  // 25. Horizon Login State
  const [horizonLoginSpeed, setHorizonLoginSpeed] = React.useState<number>(1.0);
  const [horizonLoginGlowIntensity, setHorizonLoginGlowIntensity] = React.useState<number>(1.0);
  const [horizonLoginGrain, setHorizonLoginGrain] = React.useState<boolean>(true);
  const [horizonLoginDefaultTab, setHorizonLoginDefaultTab] = React.useState<"login" | "signup">("login");

  // 26. Blueprint Login State
  const [bpLoginDefaultTab, setBpLoginDefaultTab] = React.useState<"login" | "signup">("login");
  const [bpExpandRatio, setBpExpandRatio] = React.useState<number>(1.42);
  const [bpNeighborWave, setBpNeighborWave] = React.useState<boolean>(true);
  const [bpRotationY, setBpRotationY] = React.useState<number>(-26);
  const [bpRotationX, setBpRotationX] = React.useState<number>(3);

  // 27. Morph Node Ring State
  const [ringLoop, setRingLoop] = React.useState<boolean>(true);
  const [ringSpeed, setRingSpeed] = React.useState<number>(1.0);
  const [ringNodeCount, setRingNodeCount] = React.useState<number>(8);
  const [ringMode, setRingMode] = React.useState<"image" | "color">("image");
  const [ringNodeSize, setRingNodeSize] = React.useState<number>(68);
  const [ringRadius, setRingRadius] = React.useState<number>(130);
  const [ringDesign, setRingDesign] = React.useState<MorphShapeDesign>("all");
  const [ringEnableRotation, setRingEnableRotation] = React.useState<boolean>(true);
  const [ringRotationSpeed, setRingRotationSpeed] = React.useState<number>(1.0);
  const [ringKeepUpright, setRingKeepUpright] = React.useState<boolean>(true);
  const [ringVariant, setRingVariant] = React.useState<string>("morph-sequence");

  // 28. Glass Reveal State (Matching all 19 controls from React Bits Pro specification)
  const [glassRevealImage, setGlassRevealImage] = React.useState<string>(
    "/images/sunflowers.jpg"
  );
  const [glassRevealShape, setGlassRevealShape] = React.useState<GlassRevealShape>("circle");
  const [glassRevealSize, setGlassRevealSize] = React.useState<number>(0.70);
  const [glassRevealSoftness, setGlassRevealSoftness] = React.useState<number>(0.00);
  const [glassRevealDistortion, setGlassRevealDistortion] = React.useState<number>(0.45);
  const [glassRevealAberration, setGlassRevealAberration] = React.useState<number>(0.000);
  const [glassRevealWobble, setGlassRevealWobble] = React.useState<number>(0.00);
  const [glassRevealWobbleSpeed, setGlassRevealWobbleSpeed] = React.useState<number>(1.5);
  const [glassRevealWaveFrequency, setGlassRevealWaveFrequency] = React.useState<number>(1);
  const [glassRevealWaveStrength, setGlassRevealWaveStrength] = React.useState<number>(0.000);
  const [glassRevealWaveSpeed, setGlassRevealWaveSpeed] = React.useState<number>(0.1);
  const [glassRevealGrain, setGlassRevealGrain] = React.useState<number>(0.020);
  const [glassRevealGrainSpeed, setGlassRevealGrainSpeed] = React.useState<number>(22);
  const [glassRevealGrayscale, setGlassRevealGrayscale] = React.useState<number>(0.85);
  const [glassRevealDim, setGlassRevealDim] = React.useState<number>(0.00);
  const [glassRevealFollow, setGlassRevealFollow] = React.useState<number>(0.00);
  const [glassRevealReturnToCenter, setGlassRevealReturnToCenter] = React.useState<boolean>(false);
  const [glassRevealFallback, setGlassRevealFallback] = React.useState<string>("#171717");
  const [glassRevealPaused, setGlassRevealPaused] = React.useState<boolean>(false);
  const [glassRevealVariant, setGlassRevealVariant] = React.useState<string>("sunflower-circle");

  // 29. Target Cursor / Magnetic Cursor State (React Bits TargetCursor)
  const [magVariant, setMagVariant] = React.useState<TargetCursorVariant>("brackets-reticle");
  const [magColor, setMagColor] = React.useState<string>("#ffffff");
  const [magColorOnTarget, setMagColorOnTarget] = React.useState<string>("");
  const [magSpinDuration, setMagSpinDuration] = React.useState<number>(2);
  const [magHoverDuration, setMagHoverDuration] = React.useState<number>(0.2);
  const [magParallaxOn, setMagParallaxOn] = React.useState<boolean>(true);
  const [magHideDefaultCursor, setMagHideDefaultCursor] = React.useState<boolean>(true);
  const [magSize, setMagSize] = React.useState<number>(36);
  const [magCornerSize, setMagCornerSize] = React.useState<number>(12);
  const [magThickness, setMagThickness] = React.useState<number>(3);
  const [magPadding, setMagPadding] = React.useState<number>(6);
  const [magMatchRadius, setMagMatchRadius] = React.useState<boolean>(true);
  const [magDotSize, setMagDotSize] = React.useState<number>(4);
  const [magBlend, setMagBlend] = React.useState<"difference" | "normal" | "screen">("difference");
  const [magShowLabel, setMagShowLabel] = React.useState<boolean>(true);
  const [magClickEffect, setMagClickEffect] = React.useState<boolean>(true);
  const targetCursorStageRef = React.useRef<HTMLDivElement>(null);

  // 30. Neon Ribbon Cursor State
  const [ribbonVariant, setRibbonVariant] = React.useState<NeonRibbonVariant>("cyber-neon");
  const [ribbonHeadColor, setRibbonHeadColor] = React.useState<string>("#00f0ff");
  const [ribbonTailColor, setRibbonTailColor] = React.useState<string>("#ff0077");
  const [ribbonWidth, setRibbonWidth] = React.useState<number>(18);
  const [ribbonTrailLength, setRibbonTrailLength] = React.useState<number>(45);
  const [ribbonTension, setRibbonTension] = React.useState<number>(0.22);
  const [ribbonGlow, setRibbonGlow] = React.useState<number>(16);
  const [ribbonWaveSpeed, setRibbonWaveSpeed] = React.useState<number>(2.5);
  const [ribbonBurst, setRibbonBurst] = React.useState<boolean>(true);

  // 31. Quantum Particles Cursor State
  const [quantumVariant, setQuantumVariant] = React.useState<QuantumVariant>("cyber-constellation");
  const [quantumColor, setQuantumColor] = React.useState<string>("#38bdf8");
  const [quantumSecondary, setQuantumSecondary] = React.useState<string>("#6366f1");
  const [quantumParticleCount, setQuantumParticleCount] = React.useState<number>(65);
  const [quantumConnectDist, setQuantumConnectDist] = React.useState<number>(90);
  const [quantumForce, setQuantumForce] = React.useState<"attract" | "repel" | "orbit">("attract");
  const [quantumGravity, setQuantumGravity] = React.useState<number>(0.8);
  const [quantumRadius, setQuantumRadius] = React.useState<number>(130);
  const [quantumShockwave, setQuantumShockwave] = React.useState<boolean>(true);

  // 32. Spotlight Cursor State
  const [spotlightVariant, setSpotlightVariant] = React.useState<SpotlightVariant>("studio-spotlight");
  const [spotlightColor, setSpotlightColor] = React.useState<string>("#ffffff");
  const [spotlightRadius, setSpotlightRadius] = React.useState<number>(220);
  const [spotlightFalloff, setSpotlightFalloff] = React.useState<number>(0.75);
  const [spotlightDarkness, setSpotlightDarkness] = React.useState<number>(0.88);
  const [spotlightTension, setSpotlightTension] = React.useState<number>(0.2);
  const [spotlightGrid, setSpotlightGrid] = React.useState<boolean>(true);
  const [spotlightSpecular, setSpotlightSpecular] = React.useState<number>(0.6);
  const [spotlightPulse, setSpotlightPulse] = React.useState<boolean>(true);

  // 33. Elastic Blob Cursor State
  const [blobVariant, setBlobVariant] = React.useState<ElasticBlobVariant>("mercury-silver");
  const [blobColor, setBlobColor] = React.useState<string>("#e2e8f0");
  const [blobSecondary, setBlobSecondary] = React.useState<string>("#94a3b8");
  const [blobSize, setBlobSize] = React.useState<number>(46);
  const [blobViscosity, setBlobViscosity] = React.useState<number>(0.35);
  const [blobTension, setBlobTension] = React.useState<number>(0.18);
  const [blobDroplets, setBlobDroplets] = React.useState<boolean>(true);
  const [blobGooeyStrength, setBlobGooeyStrength] = React.useState<number>(12);
  const [blobWobble, setBlobWobble] = React.useState<number>(2.0);
  const [blobSpecular, setBlobSpecular] = React.useState<boolean>(true);

  // 34. Contour Tide State (React Bits Pro Contour Tide)
  const [tidePreset, setTidePreset] = React.useState<ContourTidePreset>("silver");
  const [tideBg, setTideBg] = React.useState<string>("#0a0a0a");
  const [tideWater, setTideWater] = React.useState<string>("#6E6E80");
  const [tideCrest, setTideCrest] = React.useState<string>("#FFFFFF");
  const [tideDensity, setTideDensity] = React.useState<number>(1.00);
  const [tideParticleSize, setTideParticleSize] = React.useState<number>(1.00);
  const [tideWaveHeight, setTideWaveHeight] = React.useState<number>(1.00);
  const [tideChoppiness, setTideChoppiness] = React.useState<number>(0.80);
  const [tideWavelength, setTideWavelength] = React.useState<number>(1.00);
  const [tideWindAngle, setTideWindAngle] = React.useState<number>(0);
  const [tideHorizon, setTideHorizon] = React.useState<number>(0.10);
  const [tideFog, setTideFog] = React.useState<number>(1.00);
  const [tideGlow, setTideGlow] = React.useState<number>(0.35);
  const [tideFoam, setTideFoam] = React.useState<number>(1.00);
  const [tideSpeed, setTideSpeed] = React.useState<number>(1.00);
  const [tideParallax, setTideParallax] = React.useState<number>(1.00);
  const [tideSwell, setTideSwell] = React.useState<number>(1.00);
  const [tideSwellRadius, setTideSwellRadius] = React.useState<number>(0.90);
  const [tideSeed, setTideSeed] = React.useState<number>(0);
  const [tideInteractive, setTideInteractive] = React.useState<boolean>(true);
  const [tideClickRipples, setTideClickRipples] = React.useState<boolean>(true);
  const [tidePaused, setTidePaused] = React.useState<boolean>(false);

  // Available semantic variants for this component
  const variants = React.useMemo(() => {
    if (item.variants && item.variants.length > 0) return item.variants;
    if (item.name === "button") return ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"];
    if (item.name === "badge") return ["default", "secondary", "outline", "success", "destructive", "muted"];
    if (item.name === "sidebar") return ["scrollable-categories", "default"];
    if (item.name === "scroll-marquee") return ["scroll-left", "scroll-right", "dual-scroll", "velocity-skew"];
    if (item.name === "kinetic-text") return ["rubber-band", "wave-ripple", "scramble-decode", "magnetic-tilt"];
    if (item.name === "minimalist-login") return ["sharp-edges", "rounded-corners"];
    if (item.name === "concave-carousel") return ["Rotunda", "Tunnel", "Flat", "Panoramic", "Convex"];
    if (item.name === "prismatic-slats-bg") return ["Violet", "Cyan", "Sunset", "Emerald"];
    if (item.name === "grainy-grid-shader") return ["rough-matte", "tactile-kraft", "cyber-mesh"];
    if (item.name === "grainy-horizon-shader")
      return ["ultraviolet", "aurora-green", "solar-amber", "cyber-cyan", "monochrome"];
    if (item.name === "firefly-cursor")
      return ["comet", "firefly", "nebula", "plasma", "aurora"];
    if (item.name === "magnetic-cursor")
      return ["brackets-reticle", "cyber-lock", "matrix-target", "minimal-cross", "amber-tracker"];
    if (item.name === "neon-ribbon-cursor")
      return ["cyber-neon", "prismatic-rainbow", "solar-flare", "emerald-matrix", "spectral-silk"];
    if (item.name === "quantum-particles-cursor")
      return ["cyber-constellation", "synaptic-neural", "cosmic-supernova", "bioluminescent", "matrix-grid"];
    if (item.name === "spotlight-cursor")
      return ["studio-spotlight", "thermal-scanner", "cyber-radar", "ultraviolet-lens", "golden-sunbeam"];
    if (item.name === "elastic-blob-cursor")
      return ["mercury-silver", "neon-slime", "liquid-lava", "deep-ink", "aurora-metasphere"];
    if (item.name === "ethereal-smoke-shader")
      return ["chai-blue", "ethereal-violet", "solar-flare", "emerald-mist", "spectral-white"];
    if (item.name === "contour-tide")
      return ["silver", "ocean", "gold", "cyberpunk", "emerald"];
    if (item.name === "liquid-metal-background")
      return ["cobalt-chrome", "pure-silver", "liquid-gold", "titanium"];
    if (item.name === "morph-node-ring")
      return [
        "morph-sequence",
        "static-petal",
        "static-diamond",
        "static-semicircle",
        "static-squircle",
        "static-blade",
        "static-star",
        "static-circle",
        "color-palette",
        "orbital-rotation",
      ];
    if (item.name === "glass-reveal")
      return [
        "sunflower-circle",
        "liquid-squircle",
        "spectral-diamond",
        "star-portal",
        "wave-ripple",
        "vintage-grain",
        "cinematic-follow",
      ];
    if (item.name === "skeleton")
      return [
        "shimmer",
        "pulse",
        "wave",
        "card",
        "avatar",
        "text",
        "canvas",
      ];
    if (item.name === "popover-dialog")
      return ["contextual-actions", "user-card", "confirm-prompt", "color-picker", "media-preview"];
    if (item.name === "command-palette")
      return ["spotlight-dark", "cyber-matrix", "minimal-monochrome", "compact-dock"];
    if (item.name === "drawer-dialog")
      return ["bottom-sheet", "right-inspector", "left-drawer", "floating-card"];
    if (item.name === "spotlight-modal")
      return ["theatrical-glow", "cyber-scan", "golden-hour", "laser-reticle"];
    if (item.name === "announcement-bar")
      return ["cyber-gradient", "minimal-monochrome", "pulse-accent", "floating-pill"];
    if (item.name === "toast-stack")
      return ["stacked-bottom-right", "stacked-top-center", "cyber-telemetry", "minimal-list"];
    if (item.name === "ticker-notification")
      return ["cyber-terminal", "status-beacon", "news-wire", "monochrome-minimal"];
    if (item.name === "dynamic-island-banner" || item.name === "dynamic-island")
      return ["compact-pill", "expanded-hud", "media-wave", "telemetry-alert"];
    if (item.name === "biometric-scanner")
      return ["tile", "pill", "minimal"];
    if (item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper")
      return ["pill", "compact", "segmented", "minimal"];
    if (item.name === "m3-otp-input" || item.name === "otp-input")
      return ["standard", "masked", "compact", "spaced"];
    if (item.name === "stack-cards")
      return ["perspective-stack", "fan-out", "cyber-deck", "minimal-swipe"];
    return [];
  }, [item.variants, item.name]);

  const hasVariants = variants.length > 1;

  // Unified variant setter supporting all interactive components
  const applyVariant = React.useCallback(
    (v: string) => {
      if (item.name === "mobile-bottom-sheet") {
        setMobileBottomSheetVariant(v);
        setMobileBottomSheetOpen(true);
      }
      else if (item.name === "swipe-action-card") {
        setSwipeActionCardVariant(v);
      }
      else if (item.name === "thumb-segment-controller") {
        setThumbSegmentVariant(v);
      }
      else if (item.name === "pull-to-refresh") {
        setPullToRefreshVariant(v);
      }
      else if (item.name === "floating-action-dock") {
        setFloatingActionDockVariant(v);
      }
      else if (item.name === "m3-button") setM3BtnVariant(v);
      else if (item.name === "m3-fab") {
        setM3FabVariant(v);
        if (v === "small" || v === "standard" || v === "large" || v === "extended") {
          setM3FabSize(v === "small" ? "sm" : v === "standard" ? "default" : v === "large" ? "lg" : "extended");
        }
      }
      else if (item.name === "m3-segmented-button") setM3SegmentVariant(v);
      else if (item.name === "m3-icon-button") setM3IconBtnVariant(v);
      else if (item.name === "m3-switch") setM3SwitchVariant(v);
      else if (item.name === "m3-checkbox") setM3CheckboxVariant(v);
      else if (item.name === "m3-radio") setM3RadioVariant(v);
      else if (item.name === "m3-slider") setM3SliderVariant(v);
      else if (item.name === "m3-chip") setM3ChipVariant(v);
      else if (item.name === "m3-text-field") setM3TextVariant(v);
      else if (item.name === "m3-search-bar") setM3SearchVariant(v);
      else if (item.name === "m3-navigation-bar") setM3NavVariant(v);
      else if (item.name === "m3-top-app-bar") setM3AppBarVariant(v);
      else if (item.name === "m3-navigation-drawer") {
        setM3DrawerVariant(v);
        setM3DrawerOpen(true);
      }
      else if (item.name === "m3-tabs") setM3TabsVariant(v);
      else if (item.name === "m3-card") setM3CardVariant(v);
      else if (item.name === "shaped-image-card") setShapedCardLayout(v as ImageCardLayout);
      else if (item.name === "m3-dialog") {
        setM3DialogVariant(v);
        setM3DialogOpen(true);
      }
      else if (item.name === "m3-snackbar") setM3SnackbarVariant(v);
      else if (item.name === "m3-progress-indicator") setM3ProgressVariant(v);
      else if (item.name === "m3-badge") setM3BadgeVariant(v);
      else if (item.name === "m3-list") setM3ListVariant(v);
      else if (item.name === "biometric-scanner") setBiometricVariant(v);
      else if (item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper") setStepperVariant(v);
      else if (item.name === "m3-otp-input" || item.name === "otp-input") {
        if (v === "masked") setOtpMask(true);
        else setOtpMask(false);
      }
      else if (item.name === "button") setBtnVariant(v);
      else if (item.name === "magnetic-button") setMagneticVariant(v);
      else if (item.name === "border-beam-button") setBorderBeamVariant(v);
      else if (item.name === "cyber-glitch-button") setCyberGlitchVariant(v);
      else if (item.name === "liquid-wave-button") setLiquidWaveVariant(v);
      else if (item.name === "particle-burst-button") setParticleBurstVariant(v);
      else if (item.name === "elastic-slot-button") setElasticSlotVariant(v);
      else if (item.name === "glass-prism-button") setGlassPrismVariant(v);
      else if (item.name === "skeleton") {
        setSkeletonVariant(v);
        if (v === "card") setSkeletonShape("card");
        else if (v === "avatar") setSkeletonShape("circular");
        else if (v === "text") setSkeletonShape("text");
        else if (v === "canvas") setSkeletonShape("rounded");
      }
      else if (item.name === "popover-dialog") setPopoverVariant(v);
      else if (item.name === "command-palette") setCommandVariant(v);
      else if (item.name === "drawer-dialog") setDrawerVariant(v);
      else if (item.name === "spotlight-modal") setSpotlightModalVariant(v);
      else if (item.name === "announcement-bar") setAnnouncementVariant(v);
      else if (item.name === "toast-stack") setToastStackVariant(v);
      else if (item.name === "ticker-notification") setTickerVariant(v);
      else if (item.name === "dynamic-island-banner" || item.name === "dynamic-island") setDynamicIslandVariant(v);
      else if (item.name === "stack-cards") setStackCardsVariant(v);
      else if (item.name === "checkbox") {
        setCheckboxVariant(v as any);
        if (v === "lineart") {
          setCheckboxLabel("CAD Blueprint Layer");
          setCheckboxDesc("Vector line-art drafting with technical stroke-path animation");
          setCheckboxBadge("Lineart");
        } else if (v === "motion") {
          setCheckboxLabel("Physics Spring Bounce");
          setCheckboxDesc("Spring-damped bounce physics with radar wave easing");
          setCheckboxBadge("Motion");
        } else if (v === "strike") {
          setCheckboxLabel("Implement WebGPU shader pipeline");
          setCheckboxDesc("Task item with animated strikethrough transition");
          setCheckboxBadge("Task");
        } else if (v === "card") {
          setCheckboxLabel("Edge Compute Node");
          setCheckboxDesc("Global low-latency serverless edge runtime with TLS termination");
          setCheckboxBadge("Popular");
        } else if (v === "chip") {
          setCheckboxLabel("Framer Motion");
          setCheckboxDesc("");
          setCheckboxBadge("Pill");
        } else {
          setCheckboxLabel("Developer Environment");
          setCheckboxDesc("Standard developer checkbox token");
          setCheckboxBadge("Default");
        }
      }
      else if (item.name === "badge") setBadgeVariant(v);
      else if (item.name === "sidebar") setSidebarVariant((v as any) || "scrollable-categories");
      else if (item.name === "tabs") setTabVariant((v as any) || "default");
      else if (item.name === "scroll-marquee") setMarqueeVariant((v as any) || "scroll-left");
      else if (item.name === "kinetic-text") setKineticVariant((v as any) || "rubber-band");
      else if (item.name === "minimalist-login") setLoginVariant(v as any);
      else if (item.name === "expanding-card") setExpandingForced(v === "expanded");
      else if (item.name === "blurred-carousel") setCarouselAutoplay(v === "autoplay");
      else if (item.name === "notched-navbar") {
        setNotchedVariant(v);
        if (v === "down" || v === "bottom") {
          setNotchedWidth(540);
          setNotchedHeight(42);
          setNotchedBorderPadding(8);
          setNotchedFrameBg("#222326");
        } else if (v === "left" || v === "right") {
          setNotchedWidth(260);
          setNotchedHeight(56);
          setNotchedBorderPadding(8);
          setNotchedFrameBg("#222326");
        } else if (v === "compact") {
          setNotchedWidth(300);
          setNotchedHeight(38);
          setNotchedBorderPadding(6);
          setNotchedFrameBg("#222326");
        } else if (v === "deep-notch") {
          setNotchedWidth(560);
          setNotchedHeight(52);
          setNotchedBorderPadding(10);
          setNotchedFrameBg("#1c1d21");
        } else if (v === "dark-slate") {
          setNotchedWidth(540);
          setNotchedHeight(42);
          setNotchedBorderPadding(8);
          setNotchedFrameBg("#0f172a");
        } else {
          setNotchedWidth(540);
          setNotchedHeight(42);
          setNotchedBorderPadding(8);
          setNotchedFrameBg("#222326");
        }
      }
      else if (item.name === "search-bar" || item.name === "liquid-glass-search-bar") {
        setSearchBarVariant(v || "downward-expand");
      }
      else if (item.name === "concave-carousel") {
        handleConcavePresetChange(v as any);
      }
      else if (item.name === "prismatic-slats-bg") {
        handleSlatPresetChange(v as any);
      }
      else if (item.name === "grainy-grid-shader") {
        handleGridVariantChange(v as any);
      }
      else if (item.name === "grainy-horizon-shader") {
        handleHorizonVariantChange(v as any);
      }
      else if (item.name === "firefly-cursor") {
        handleCursorPresetChange(v as any);
      }
      else if (item.name === "ethereal-smoke-shader") {
        handleSmokePresetChange(v as any);
      }
            else if (item.name === "contour-tide") {
        const pr = v as ContourTidePreset;
        setTidePreset(pr);
        const pal = CONTOUR_TIDE_PRESETS[pr];
        if (pal) {
          setTideBg(pal.background);
          setTideWater(pal.water);
          setTideCrest(pal.crest);
        }
        if (pr === "silver") {
          setTideWaveHeight(1.0);
          setTideChoppiness(0.8);
          setTideGlow(0.35);
        } else if (pr === "ocean") {
          setTideWaveHeight(1.2);
          setTideChoppiness(0.9);
          setTideGlow(0.5);
        } else if (pr === "gold") {
          setTideWaveHeight(0.9);
          setTideChoppiness(0.7);
          setTideGlow(0.6);
        } else if (pr === "cyberpunk") {
          setTideWaveHeight(1.3);
          setTideChoppiness(1.1);
          setTideGlow(0.7);
        } else if (pr === "emerald") {
          setTideWaveHeight(1.0);
          setTideChoppiness(0.85);
          setTideGlow(0.45);
        }
      }
      else if (item.name === "liquid-metal-background") {
        setMetalTone(v as any);
      }
      else if (item.name === "morph-node-ring") {
        setRingVariant(v);
        if (v === "morph-sequence" || v === "all") {
          setRingDesign("all");
          setRingLoop(true);
        } else if (v === "color-palette" || v === "color") {
          setRingMode("color");
        } else if (v === "orbital-rotation") {
          setRingEnableRotation(true);
        } else {
          // Static shapes: static-petal, static-diamond, static-squircle, etc.
          const shape = v.replace(/^static-/, "") as MorphShapeDesign;
          setRingDesign(shape);
          setRingLoop(false);
        }
      }
      else if (item.name === "glass-reveal") {
        setGlassRevealVariant(v);
        if (v === "sunflower-circle") {
          setGlassRevealImage("/images/sunflowers.jpg");
          setGlassRevealShape("circle");
          setGlassRevealSize(0.70);
          setGlassRevealSoftness(0.00);
          setGlassRevealDistortion(0.45);
          setGlassRevealAberration(0.000);
          setGlassRevealWobble(0.00);
          setGlassRevealWobbleSpeed(1.5);
          setGlassRevealWaveFrequency(1);
          setGlassRevealWaveStrength(0.000);
          setGlassRevealWaveSpeed(0.1);
          setGlassRevealGrain(0.020);
          setGlassRevealGrainSpeed(22);
          setGlassRevealGrayscale(0.85);
          setGlassRevealDim(0.00);
          setGlassRevealFollow(0.00);
          setGlassRevealReturnToCenter(false);
          setGlassRevealPaused(false);
        } else if (v === "liquid-squircle") {
          setGlassRevealShape("squircle");
          setGlassRevealSize(0.65);
          setGlassRevealDistortion(1.80);
          setGlassRevealAberration(0.015);
          setGlassRevealWobble(1.20);
          setGlassRevealWobbleSpeed(3.0);
          setGlassRevealWaveFrequency(8);
        } else if (v === "spectral-diamond") {
          setGlassRevealShape("diamond");
          setGlassRevealSize(0.58);
          setGlassRevealDistortion(1.30);
          setGlassRevealAberration(0.035);
          setGlassRevealWobble(0.20);
          setGlassRevealSoftness(0.00);
        } else if (v === "star-portal") {
          setGlassRevealShape("star");
          setGlassRevealSize(0.70);
          setGlassRevealDistortion(1.40);
          setGlassRevealAberration(0.020);
          setGlassRevealWobble(0.60);
        } else if (v === "wave-ripple") {
          setGlassRevealShape("circle");
          setGlassRevealWaveFrequency(14);
          setGlassRevealWaveStrength(0.035);
          setGlassRevealWaveSpeed(2.5);
          setGlassRevealDistortion(0.80);
        } else if (v === "vintage-grain") {
          setGlassRevealGrain(0.065);
          setGlassRevealGrainSpeed(16);
          setGlassRevealDim(0.25);
          setGlassRevealGrayscale(1.00);
        } else if (v === "cinematic-follow") {
          setGlassRevealFollow(0.95);
          setGlassRevealReturnToCenter(true);
        }
      }
      else if (item.name === "magnetic-cursor") {
        setMagVariant(v as TargetCursorVariant);
        if (v === "cyber-lock") {
          setMagColor("#00f0ff");
          setMagColorOnTarget("#5CA904");
          setMagSpinDuration(1.2);
          setMagHoverDuration(0.15);
          setMagThickness(2.5);
          setMagSize(40);
          setMagCornerSize(14);
          setMagBlend("screen");
          setMagMatchRadius(false);
          setMagDotSize(4);
          setMagPadding(6);
        } else if (v === "matrix-target") {
          setMagColor("#10b981");
          setMagColorOnTarget("#86efac");
          setMagSpinDuration(3.0);
          setMagHoverDuration(0.2);
          setMagThickness(2);
          setMagSize(42);
          setMagCornerSize(16);
          setMagDotSize(5);
          setMagPadding(8);
          setMagBlend("screen");
          setMagMatchRadius(true);
        } else if (v === "minimal-cross") {
          setMagColor("#ffffff");
          setMagColorOnTarget("");
          setMagSpinDuration(0);
          setMagHoverDuration(0.1);
          setMagSize(28);
          setMagCornerSize(8);
          setMagThickness(2);
          setMagDotSize(3);
          setMagPadding(4);
          setMagBlend("difference");
          setMagMatchRadius(true);
        } else if (v === "amber-tracker") {
          setMagColor("#f59e0b");
          setMagColorOnTarget("#ef4444");
          setMagSpinDuration(1.8);
          setMagHoverDuration(0.2);
          setMagSize(40);
          setMagCornerSize(14);
          setMagThickness(3.5);
          setMagDotSize(4);
          setMagPadding(6);
          setMagBlend("normal");
          setMagMatchRadius(true);
        } else {
          // brackets-reticle default
          setMagColor("#ffffff");
          setMagColorOnTarget("");
          setMagSpinDuration(2);
          setMagHoverDuration(0.2);
          setMagSize(36);
          setMagCornerSize(12);
          setMagThickness(3);
          setMagDotSize(4);
          setMagPadding(6);
          setMagBlend("difference");
          setMagMatchRadius(true);
        }
      }
      else if (item.name === "neon-ribbon-cursor") {
        setRibbonVariant(v as NeonRibbonVariant);
        if (v === "prismatic-rainbow") { setRibbonHeadColor("#f43f5e"); setRibbonTailColor("#06b6d4"); }
        else if (v === "solar-flare") { setRibbonHeadColor("#f59e0b"); setRibbonTailColor("#ef4444"); }
        else if (v === "emerald-matrix") { setRibbonHeadColor("#10b981"); setRibbonTailColor("#059669"); }
        else if (v === "spectral-silk") { setRibbonHeadColor("#a855f7"); setRibbonTailColor("#3b82f6"); }
        else { setRibbonHeadColor("#00f0ff"); setRibbonTailColor("#ff0077"); }
      }
      else if (item.name === "quantum-particles-cursor") {
        setQuantumVariant(v as QuantumVariant);
        if (v === "synaptic-neural") { setQuantumColor("#a855f7"); setQuantumSecondary("#ec4899"); }
        else if (v === "cosmic-supernova") { setQuantumColor("#f59e0b"); setQuantumSecondary("#ef4444"); }
        else if (v === "bioluminescent") { setQuantumColor("#10b981"); setQuantumSecondary("#06b6d4"); }
        else if (v === "matrix-grid") { setQuantumColor("#22c55e"); setQuantumSecondary("#86efac"); }
        else { setQuantumColor("#38bdf8"); setQuantumSecondary("#6366f1"); }
      }
      else if (item.name === "spotlight-cursor") {
        setSpotlightVariant(v as SpotlightVariant);
        if (v === "thermal-scanner") { setSpotlightColor("#f97316"); }
        else if (v === "cyber-radar") { setSpotlightColor("#10b981"); }
        else if (v === "ultraviolet-lens") { setSpotlightColor("#a855f7"); }
        else if (v === "golden-sunbeam") { setSpotlightColor("#f59e0b"); }
        else { setSpotlightColor("#ffffff"); }
      }
      else if (item.name === "elastic-blob-cursor") {
        setBlobVariant(v as ElasticBlobVariant);
        if (v === "neon-slime") { setBlobColor("#84cc16"); setBlobSecondary("#10b981"); }
        else if (v === "liquid-lava") { setBlobColor("#f97316"); setBlobSecondary("#ef4444"); }
        else if (v === "deep-ink") { setBlobColor("#1e1b4b"); setBlobSecondary("#4338ca"); }
        else if (v === "aurora-metasphere") { setBlobColor("#06b6d4"); setBlobSecondary("#a855f7"); }
        else { setBlobColor("#e2e8f0"); setBlobSecondary("#94a3b8"); }
      }
    },
    [
      item.name,
      handleConcavePresetChange,
      handleSlatPresetChange,
      handleGridVariantChange,
      handleHorizonVariantChange,
      handleCursorPresetChange,
      handleSmokePresetChange,
    ]
  );

  // Synchronize state immediately when activeVariant prop or item changes (sidebar click, URL change, etc.)
  React.useEffect(() => {
    const targetVariant = activeVariant || (variants.length > 0 ? variants[0] : "default");
    applyVariant(targetVariant);
  }, [activeVariant, variants, applyVariant]);

  const currentVariant =
    item.name === "button"
      ? btnVariant
      : item.name === "magnetic-button"
      ? magneticVariant
      : item.name === "border-beam-button"
      ? borderBeamVariant
      : item.name === "cyber-glitch-button"
      ? cyberGlitchVariant
      : item.name === "liquid-wave-button"
      ? liquidWaveVariant
      : item.name === "particle-burst-button"
      ? particleBurstVariant
      : item.name === "elastic-slot-button"
      ? elasticSlotVariant
      : item.name === "glass-prism-button"
      ? glassPrismVariant
      : item.name === "checkbox"
      ? checkboxVariant
      : item.name === "notched-navbar"
      ? notchedVariant
      : (item.name === "search-bar" || item.name === "liquid-glass-search-bar")
      ? searchBarVariant
      : item.name === "badge"
      ? badgeVariant
      : item.name === "sidebar"
      ? sidebarVariant
      : item.name === "tabs"
      ? tabVariant
      : item.name === "scroll-marquee"
      ? marqueeVariant
      : item.name === "kinetic-text"
      ? kineticVariant
      : item.name === "minimalist-login"
      ? loginVariant
      : item.name === "concave-carousel"
      ? concavePreset
      : item.name === "prismatic-slats-bg"
      ? slatPreset
      : item.name === "grainy-grid-shader"
      ? gridVariant
      : item.name === "grainy-horizon-shader"
      ? horizonVariant
      : item.name === "firefly-cursor"
      ? cursorPreset
      : item.name === "expanding-card"
      ? (expandingForced ? "expanded" : "default")
      : item.name === "blurred-carousel"
      ? (carouselAutoplay ? "autoplay" : "default")
      : item.name === "morph-node-ring"
      ? ringVariant
      : item.name === "glass-reveal"
      ? glassRevealVariant
      : item.name === "magnetic-cursor"
      ? magVariant
      : item.name === "neon-ribbon-cursor"
      ? ribbonVariant
      : item.name === "quantum-particles-cursor"
      ? quantumVariant
      : item.name === "spotlight-cursor"
      ? spotlightVariant
      : item.name === "elastic-blob-cursor"
      ? blobVariant
      : item.name === "skeleton"
      ? skeletonVariant
      : item.name === "popover-dialog"
      ? popoverVariant
      : item.name === "command-palette"
      ? commandVariant
      : item.name === "drawer-dialog"
      ? drawerVariant
      : item.name === "spotlight-modal"
      ? spotlightModalVariant
      : item.name === "announcement-bar"
      ? announcementVariant
      : item.name === "toast-stack"
      ? toastStackVariant
      : item.name === "ticker-notification"
      ? tickerVariant
      : item.name === "dynamic-island-banner"
      ? dynamicIslandVariant
      : item.name === "stack-cards"
      ? stackCardsVariant
      : item.name === "mobile-bottom-sheet"
      ? mobileBottomSheetVariant
      : item.name === "swipe-action-card"
      ? swipeActionCardVariant
      : item.name === "thumb-segment-controller"
      ? thumbSegmentVariant
      : item.name === "pull-to-refresh"
      ? pullToRefreshVariant
      : item.name === "floating-action-dock"
      ? floatingActionDockVariant
      : item.name === "m3-button"
      ? m3BtnVariant
      : item.name === "m3-fab"
      ? m3FabVariant
      : item.name === "m3-segmented-button"
      ? m3SegmentVariant
      : item.name === "m3-icon-button"
      ? m3IconBtnVariant
      : item.name === "m3-switch"
      ? m3SwitchVariant
      : item.name === "m3-checkbox"
      ? m3CheckboxVariant
      : item.name === "m3-radio"
      ? m3RadioVariant
      : item.name === "m3-slider"
      ? m3SliderVariant
      : item.name === "m3-chip"
      ? m3ChipVariant
      : item.name === "m3-text-field"
      ? m3TextVariant
      : item.name === "m3-search-bar"
      ? m3SearchVariant
      : item.name === "m3-navigation-bar"
      ? m3NavVariant
      : item.name === "m3-top-app-bar"
      ? m3AppBarVariant
      : item.name === "m3-navigation-drawer"
      ? m3DrawerVariant
      : item.name === "m3-tabs"
      ? m3TabsVariant
      : item.name === "m3-card"
      ? m3CardVariant
      : item.name === "shaped-image-card"
      ? shapedCardLayout
      : item.name === "m3-dialog"
      ? m3DialogVariant
      : item.name === "m3-snackbar"
      ? m3SnackbarVariant
      : item.name === "m3-progress-indicator"
      ? m3ProgressVariant
      : item.name === "m3-badge"
      ? m3BadgeVariant
      : item.name === "m3-list"
      ? m3ListVariant
      : item.name === "biometric-scanner"
      ? biometricVariant
      : item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper"
      ? stepperVariant
      : item.name === "dynamic-island-banner" || item.name === "dynamic-island"
      ? dynamicIslandVariant
      : activeVariant || variants[0] || "default";

  const currentIndex = Math.max(0, variants.indexOf(currentVariant));

  const handlePrevVariant = React.useCallback(() => {
    if (!hasVariants) return;
    const prevIdx = (currentIndex - 1 + variants.length) % variants.length;
    const prevVal = variants[prevIdx];
    applyVariant(prevVal);
    onVariantChange?.(prevVal);
  }, [hasVariants, currentIndex, variants, applyVariant, onVariantChange]);

  const handleNextVariant = React.useCallback(() => {
    if (!hasVariants) return;
    const nextIdx = (currentIndex + 1) % variants.length;
    const nextVal = variants[nextIdx];
    applyVariant(nextVal);
    onVariantChange?.(nextVal);
  }, [hasVariants, currentIndex, variants, applyVariant, onVariantChange]);

  const [variantMenuOpen, setVariantMenuOpen] = React.useState(false);
  const variantMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (variantMenuRef.current && !variantMenuRef.current.contains(e.target as Node)) {
        setVariantMenuOpen(false);
      }
    }
    if (variantMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [variantMenuOpen]);

  const handleResetAll = () => {
    setMobileBottomSheetVariant("default");
    setMobileBottomSheetOpen(true);
    setMobileBottomSheetTitle("Order Summary");
    setMobileBottomSheetHandle(true);
    setMobileBottomSheetBlur(true);

    setSwipeActionCardVariant("default");
    setSwipeActionThreshold(72);
    setSwipeActionDisabled(false);
    setSwipeLastAction("");

    setThumbSegmentVariant("default");
    setThumbSegmentValue("week");
    setThumbSegmentFullWidth(true);

    setPullToRefreshVariant("default");
    setPullToRefreshThreshold(72);
    setPullToRefreshDisabled(false);

    setFloatingActionDockVariant("default");
    setFloatingDockActive("home");
    setFloatingDockShowPrimary(true);

    setBtnVariant("default");
    setBtnSize("default");
    setBtnLabel("Action Button");
    setBtnLoading(false);
    setBtnDisabled(false);

    setMagneticVariant("neon-glow");
    setMagneticSize("default");
    setMagneticLabel("Explore Grid");
    setMagneticStrength(0.35);
    setMagneticSpotlight(true);
    setMagneticLoading(false);
    setMagneticDisabled(false);

    setBorderBeamVariant("cyan-cyber");
    setBorderBeamSize("default");
    setBorderBeamLabel("Initialize Core");
    setBorderBeamDuration(4);
    setBorderBeamPulseSize(28);
    setBorderBeamSpeedup(true);
    setBorderBeamLoading(false);
    setBorderBeamDisabled(false);

    setCyberGlitchVariant("tokyo-cyan");
    setCyberGlitchSize("default");
    setCyberGlitchLabel("BREACH PROTOCOL");
    setCyberGlitchHud("SYS_ID // 0x8F");
    setCyberGlitchBrackets(true);
    setCyberGlitchScanlines(true);
    setCyberGlitchLoading(false);
    setCyberGlitchDisabled(false);

    setLiquidWaveVariant("ocean-deep");
    setLiquidWaveSize("default");
    setLiquidWaveLabel("Deep Dive");
    setLiquidWaveSpeed(1);
    setLiquidWaveBubbles(true);
    setLiquidWaveLoading(false);
    setLiquidWaveDisabled(false);

    setParticleBurstVariant("supernova-gold");
    setParticleBurstSize("default");
    setParticleBurstLabel("Ignite Sparks");
    setParticleBurstCount(32);
    setParticleBurstAmbient(true);
    setParticleBurstLoading(false);
    setParticleBurstDisabled(false);

    setElasticSlotVariant("accent-pill");
    setElasticSlotSize("default");
    setElasticSlotLabel("Deploy App");
    setElasticSlotHoverLabel("Let's Ship ↗");
    setElasticSlotDrawer(true);
    setElasticSlotLoading(false);
    setElasticSlotDisabled(false);

    setGlassPrismVariant("spatial-glass");
    setGlassPrismSize("default");
    setGlassPrismLabel("Spatial Compute");
    setGlassPrismTilt(12);
    setGlassPrismGlare(0.35);
    setGlassPrismBorder(true);
    setGlassPrismLoading(false);
    setGlassPrismDisabled(false);

    setInputVal("production.env");
    setInputLabel("Target Filename");
    setInputHelper("Relative to workspace root");
    setInputError("");
    setInputDisabled(false);

    setSwitchChecked(true);
    setSwitchLabel("Cache Turbo Output");
    setSwitchDesc("Store compiled assets in local disk");
    setSwitchDisabled(false);

    setDialogTitle("Deploy Revision #104");
    setDialogTriggerLabel("Open Deploy Modal");

    setBadgeVariant("accent");
    setBadgeDot(true);
    setBadgeText("Operational");

    setCardTitle("Edge Runtime Worker");
    setCardHover(true);

    setTabValue("overview");
    setTabVariant("default");

    setStatTitle("Active Registry Users");
    setStatValue("12,840");
    setStatChange("+14.2%");
    setStatTrend("up");
    setStatBadge(true);

    setSidebarDemoCollapsed(false);
    setSidebarVariant("scrollable-categories");

    setSearchBarExpanded(false);
    setSearchBarQuery("");
    setSearchBarPlaceholder("Search components...");
    setSearchBarVariant("downward-expand");
    setSearchBarSelectedTitle(null);
    onReset?.();
  };

  // Sync configured JSX code back to parent toolbar
  React.useEffect(() => {
    if (!onConfiguredCodeChange) return;

    let code = item.usage || item.files[0]?.content || "";
    if (item.name === "button") {
      code = `<Button variant="${btnVariant}" size="${btnSize}"${btnLoading ? " isLoading" : ""}${btnDisabled ? " disabled" : ""}>\n  ${btnLabel}\n</Button>`;
    } else if (item.name === "magnetic-button") {
      code = `<MagneticButton\n  variant="${magneticVariant}"\n  size="${magneticSize}"\n  strength={${magneticStrength}}${magneticSpotlight ? "\n  showSpotlight" : ""}${magneticLoading ? "\n  isLoading" : ""}${magneticDisabled ? "\n  disabled" : ""}\n>\n  ${magneticLabel}\n</MagneticButton>`;
    } else if (item.name === "border-beam-button") {
      code = `<BorderBeamButton\n  variant="${borderBeamVariant}"\n  size="${borderBeamSize}"\n  beamDuration={${borderBeamDuration}}\n  beamSize={${borderBeamPulseSize}}${borderBeamSpeedup ? "\n  hoverSpeedup" : ""}${borderBeamLoading ? "\n  isLoading" : ""}${borderBeamDisabled ? "\n  disabled" : ""}\n>\n  ${borderBeamLabel}\n</BorderBeamButton>`;
    } else if (item.name === "cyber-glitch-button") {
      code = `<CyberGlitchButton\n  variant="${cyberGlitchVariant}"\n  size="${cyberGlitchSize}"${cyberGlitchHud ? `\n  hudCode="${cyberGlitchHud}"` : ""}${cyberGlitchBrackets ? "\n  showBrackets" : ""}${cyberGlitchScanlines ? "\n  showScanlines" : ""}${cyberGlitchLoading ? "\n  isLoading" : ""}${cyberGlitchDisabled ? "\n  disabled" : ""}\n>\n  ${cyberGlitchLabel}\n</CyberGlitchButton>`;
    } else if (item.name === "liquid-wave-button") {
      code = `<LiquidWaveButton\n  variant="${liquidWaveVariant}"\n  size="${liquidWaveSize}"\n  waveSpeed={${liquidWaveSpeed}}${liquidWaveBubbles ? "\n  showBubbles" : ""}${liquidWaveLoading ? "\n  isLoading" : ""}${liquidWaveDisabled ? "\n  disabled" : ""}\n>\n  ${liquidWaveLabel}\n</LiquidWaveButton>`;
    } else if (item.name === "particle-burst-button") {
      code = `<ParticleBurstButton\n  variant="${particleBurstVariant}"\n  size="${particleBurstSize}"\n  particleCount={${particleBurstCount}}${particleBurstAmbient ? "\n  enableAmbient" : ""}${particleBurstLoading ? "\n  isLoading" : ""}${particleBurstDisabled ? "\n  disabled" : ""}\n>\n  ${particleBurstLabel}\n</ParticleBurstButton>`;
    } else if (item.name === "elastic-slot-button") {
      code = `<ElasticSlotButton\n  variant="${elasticSlotVariant}"\n  size="${elasticSlotSize}"${elasticSlotHoverLabel ? `\n  hoverLabel="${elasticSlotHoverLabel}"` : ""}${elasticSlotDrawer ? "\n  showDrawer" : ""}${elasticSlotLoading ? "\n  isLoading" : ""}${elasticSlotDisabled ? "\n  disabled" : ""}\n>\n  ${elasticSlotLabel}\n</ElasticSlotButton>`;
    } else if (item.name === "glass-prism-button") {
      code = `<GlassPrismButton\n  variant="${glassPrismVariant}"\n  size="${glassPrismSize}"\n  maxTilt={${glassPrismTilt}}\n  glareOpacity={${glassPrismGlare}}${glassPrismBorder ? "\n  showPrismBorder" : ""}${glassPrismLoading ? "\n  isLoading" : ""}${glassPrismDisabled ? "\n  disabled" : ""}\n>\n  ${glassPrismLabel}\n</GlassPrismButton>`;
    } else if (item.name === "skeleton") {
      if (skeletonVariant === "card") {
        code = `<SkeletonCard\n  variant="${skeletonGlow ? "glow" : "shimmer"}"\n  hasCanvas\n  lines={${skeletonLines}}\n/>`;
      } else if (skeletonVariant === "avatar") {
        code = `<div className="flex items-center gap-3">\n  <SkeletonAvatar size="md" shape="${skeletonShape === "rounded" ? "rounded" : "circular"}" variant="${skeletonVariant}" />\n  <div className="space-y-1.5 flex-1">\n    <Skeleton shape="rounded" className="h-4 w-32" />\n    <Skeleton shape="text" className="h-3 w-48" />\n  </div>\n</div>`;
      } else if (skeletonVariant === "text") {
        code = `<SkeletonText\n  lines={${skeletonLines}}\n  variant="${skeletonVariant}"\n  widths={["100%", "85%", "65%"]}\n/>`;
      } else if (skeletonVariant === "canvas") {
        code = `<SkeletonCanvas\n  label="RENDER_PIPELINE"\n  coordinates="DIM: 1920x1080 // GL_ES_3"\n  variant="${skeletonVariant}"\n  showReticle\n/>`;
      } else {
        code = `<Skeleton\n  variant="${skeletonVariant}"\n  shape="${skeletonShape}"\n  speed="${skeletonSpeed}"${skeletonGlow ? "\n  accentGlow" : ""}\n  className="h-10 w-full"\n/>`;
      }
    } else if (item.name === "mobile-bottom-sheet") {
      const snapArr = mobileBottomSheetVariant === "compact" ? "[0.26, 0.5]" : mobileBottomSheetVariant === "full-expand" ? "[0.92]" : "[0.38, 0.86]";
      code = `<MobileBottomSheet\n  open={${mobileBottomSheetOpen}}\n  onOpenChange={setOpen}\n  snapPoints={${snapArr}}\n  title="${mobileBottomSheetTitle}"\n  description="Tactile gesture drag with velocity fling physics"\n  showHandle={${mobileBottomSheetHandle}}\n  backdropBlur={${mobileBottomSheetBlur}}\n  footer={\n    <Button className="w-full" onClick={() => setOpen(false)}>\n      Confirm & Pay $49.00\n    </Button>\n  }\n>\n  <div className="space-y-3 py-2">\n    <p className="text-sm">Item order details & telemetry</p>\n  </div>\n</MobileBottomSheet>`;
    } else if (item.name === "swipe-action-card") {
      code = `<SwipeActionCard\n  threshold={${swipeActionThreshold}}\n  disabled={${swipeActionDisabled}}\n  leftActions={[\n    { id: "pin", label: "Pin", icon: <Pin className="h-4 w-4" /> },\n    { id: "archive", label: "Archive", icon: <Archive className="h-4 w-4" /> }\n  ]}\n  rightActions={[\n    { id: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" />, variant: "destructive" }\n  ]}\n  onActionTrigger={(id) => console.log("Triggered:", id)}\n>\n  <div className="p-4 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl">\n    <h4 className="font-semibold text-[var(--text-primary)]">Sync Dispatch Order</h4>\n    <p className="text-xs text-[var(--text-muted)] mt-1">Swipe left for delete, right to pin</p>\n  </div>\n</SwipeActionCard>`;
    } else if (item.name === "thumb-segment-controller") {
      code = `<ThumbSegmentController\n  size="${thumbSegmentVariant as any}"\n  value="${thumbSegmentValue}"\n  onChange={setSelected}\n  fullWidth={${thumbSegmentFullWidth}}\n  items={[\n    { id: "day", label: "Day" },\n    { id: "week", label: "Week", badge: 3 },\n    { id: "month", label: "Month" },\n    { id: "year", label: "Year" }\n  ]}\n/>`;
    } else if (item.name === "pull-to-refresh") {
      code = `<PullToRefresh\n  onRefresh={handleRefresh}\n  pullThreshold={${pullToRefreshThreshold}}\n  disabled={${pullToRefreshDisabled}}\n>\n  <div className="space-y-3 p-4">\n    <p className="text-sm font-semibold">Feed Updated Real-Time</p>\n  </div>\n</PullToRefresh>`;
    } else if (item.name === "floating-action-dock") {
      code = `<FloatingActionDock\n  position="${floatingActionDockVariant as any}"${floatingDockShowPrimary ? `\n  primaryAction={{\n    label: "Add",\n    icon: <Plus className="h-4 w-4" />,\n    onClick: () => console.log("Add clicked"),\n  }}` : ""}\n  items={[\n    { id: "home", label: "Home", icon: <Home className="h-4 w-4" />, active: active === "home", onClick: () => setActive("home") },\n    { id: "explore", label: "Explore", icon: <Compass className="h-4 w-4" />, active: active === "explore", onClick: () => setActive("explore") },\n    { id: "alerts", label: "Alerts", icon: <Bell className="h-4 w-4" />, badge: ${floatingDockBadge}, active: active === "alerts", onClick: () => setActive("alerts") }\n  ]}\n/>`;
    } else if (item.name === "m3-button") {
      code = `<M3Button variant="${m3BtnVariant}" size="${m3BtnSize}"${m3BtnLoading ? " isLoading" : ""}${m3BtnDisabled ? " disabled" : ""}>\n  ${m3BtnLabel}\n</M3Button>`;
    } else if (item.name === "m3-fab") {
      code = `<M3Fab size="${m3FabSize}" variant="${m3FabVariant === "minimal" ? "minimal" : "primary"}" label="${m3FabLabel}" />`;
    } else if (item.name === "m3-segmented-button") {
      code = `<M3SegmentedButton\n  value="${m3SegmentVal}"\n  onChange={setVal}\n  options={[{ id: "day", label: "Day" }, { id: "week", label: "Week" }, { id: "month", label: "Month" }]}\n/>`;
    } else if (item.name === "m3-icon-button") {
      code = `<M3IconButton variant="${m3IconBtnVariant}" selected={${m3IconBtnSelected}} onSelectedChange={setSelected} />`;
    } else if (item.name === "m3-switch") {
      code = `<M3Switch checked={${m3SwitchChecked}} showIcon={${m3SwitchIcons}} label="Push Telemetry" description="Real-time alerts" />`;
    } else if (item.name === "m3-checkbox") {
      code = `<M3Checkbox checked={${m3CheckboxChecked}} label="Enable Edge Analytics" />`;
    } else if (item.name === "m3-radio") {
      code = `<M3RadioGroup value="${m3RadioVal}" options={[{ id: "standard", label: "Standard 2-Day Air" }, { id: "express", label: "Express Overnight" }]} />`;
    } else if (item.name === "m3-slider") {
      code = `<M3Slider value={${m3SliderVal}} min={0} max={100} label="Gain Output" />`;
    } else if (item.name === "m3-chip") {
      code = `<M3Chip chipType="${m3ChipVariant === "minimal" ? "filter" : m3ChipVariant}" selected={${m3ChipSelected}}>Material Design</M3Chip>`;
    } else if (item.name === "m3-text-field") {
      code = `<M3TextField variant="${m3TextVariant}" label="Email Address" value="${m3TextVal}" helperText="Work or personal handle" />`;
    } else if (item.name === "m3-search-bar") {
      code = `<M3SearchBar placeholder="Search primitives..." />`;
    } else if (item.name === "m3-navigation-bar") {
      code = `<M3NavigationBar value="${m3NavTab}" destinations={[{ id: "home", label: "Home" }, { id: "explore", label: "Explore" }, { id: "alerts", label: "Alerts", badge: 3 }]} />`;
    } else if (item.name === "m3-top-app-bar") {
      code = `<M3TopAppBar variant="${m3AppBarVariant}" title="Essential Archive" subtitle="Kilo Studio" />`;
    } else if (item.name === "m3-navigation-drawer") {
      code = `<M3NavigationDrawer open={${m3DrawerOpen}} onOpenChange={setOpen} value="${m3DrawerVal}" destinations={[{ id: "inbox", label: "Inbox", badge: 12 }]} />`;
    } else if (item.name === "m3-tabs") {
      code = `<M3Tabs type="${m3TabsVariant}" value="${m3TabsVal}" tabs={[{ id: "overview", label: "Overview" }, { id: "specs", label: "Specs" }]} />`;
    } else if (item.name === "m3-card") {
      code = `<M3Card variant="${m3CardVariant}" headline="Technical Shell 3L" subhead="Oversized fit">\n  <p>Waterproof ripstop monochrome</p>\n</M3Card>`;
    } else if (item.name === "shaped-image-card") {
      code = `<ShapedImageCard\n  shape="${shapedCardShape}"\n  layout="${shapedCardLayout}"\n  aspectRatio="${shapedCardAspect}"\n  glow={${shapedCardGlow}}\n  showBorder={${shapedCardBorder}}\n  imageSrc="${SHAPED_CARD_IMAGES[shapedCardImageIdx].url}"\n  title="${SHAPED_CARD_IMAGES[shapedCardImageIdx].title}"\n  subtitle="${SHAPED_CARD_IMAGES[shapedCardImageIdx].subtitle}"\n  badge="${SHAPED_CARD_IMAGES[shapedCardImageIdx].badge}"\n  description="${SHAPED_CARD_IMAGES[shapedCardImageIdx].desc}"\n  primaryAction={{\n    label: "Explore Space",\n    onClick: () => {}\n  }}\n/>`;
    } else if (item.name === "3d-depth-carousel") {
      code = `<Depth3dCarousel\n  size="${depthCarouselSize}"\n  activeIndex={${depthCarouselIndex}}\n  onChange={setIndex}\n  onReserve={(item) => console.log("Reserve", item.title)}\n  onBookmark={(item, saved) => console.log("Bookmark", item.id, saved)}\n/>`;
    } else if (item.name === "specs-grid-card") {
      code = `<SpecsGridCard\n  title="Villa Specs"\n  badge="Instant Confirmation"\n  metrics={[\n    { label: "Max Guests", value: ${specsGuests} },\n    { label: "King Suites", value: 2 },\n    { label: "Hot Spring", value: 1 },\n  ]}\n  amenities={["High-Speed Starlink", "Matcha Ritual Bar", "Zen Garden Yoga"]}\n/>`;
    } else if (item.name === "host-trust-card") {
      code = `<HostTrustCard\n  name="Kenji Sato"\n  role="Master timber architect"\n  responseTime="Responds in 10m"\n  verified={${hostVerified}}\n  onChat={() => console.log("Open chat")}\n/>`;
    } else if (item.name === "booking-action-bar") {
      code = `<BookingActionBar\n  primaryLabel="Check Availability"\n  price={{ amount: "$420", period: "/ night" }}\n  sticky={${bookingSticky}}\n  onPrimaryClick={() => console.log("Check availability")}\n  onSecondaryClick={() => console.log("Share")}\n/>`;
    } else if (item.name === "curated-filter-bar") {
      code = `<CuratedFilterBar\n  collectionTitle="Nocturne Sanctuaries"\n  collectionTag="CURATED COLLECTION"\n  availableCount="14 available"\n  filterCount={3}\n  activeFilter="${curatedActiveFilter}"\n  onSelectFilter={(id) => console.log("Selected", id)}\n/>`;
    } else if (item.name === "m3-dialog") {
      code = `<M3Dialog open={${m3DialogOpen}} onOpenChange={setOpen} headline="Confirm Action" supportingText="Will dispatch packet to cluster." />`;
    } else if (item.name === "m3-snackbar") {
      code = `<M3Snackbar message="${m3SnackbarMsg}" actionLabel="Undo" />`;
    } else if (item.name === "m3-progress-indicator") {
      if (m3ProgressVariant === "squiggly-horizontal") {
        code = `<M3SquigglyLoader variant="horizontal" squiggles={14} amplitude={4} color="google" />`;
      } else if (m3ProgressVariant === "squiggly-circular") {
        code = `<M3SquigglyLoader variant="circular" squiggles={14} amplitude={4} color="google" size={64} />`;
      } else if (m3ProgressVariant === "shape-morph") {
        code = `<M3PhysicsLoader variant="shape-morph" theme="google" size={64} />`;
      } else if (m3ProgressVariant === "elastic-line") {
        code = `<M3PhysicsLoader variant="elastic-line" theme="google" resistance={1} />`;
      } else {
        code = `<M3ProgressIndicator type="${m3ProgressVariant === "circular" ? "circular" : "linear"}" value={${m3ProgressVal}} />`;
      }
    } else if (item.name === "m3-badge") {
      code = `<M3Badge content={${m3BadgeVal}}><Bell className="h-5 w-5" /></M3Badge>`;
    } else if (item.name === "m3-list") {
      code = `<M3List header="Transactions">\n  <M3ListItem headline="Kilo Studio" supportingText="Payment completed" trailingText="10:24 AM" />\n</M3List>`;
    } else if (item.name === "biometric-scanner") {
      code = `<BiometricScanner\n  variant="${biometricVariant}"\n  size="${biometricSize}"\n  label="Security Enclave"\n  sublabel="Touch sensor with registered finger"\n  onSuccess={() => console.log("Authenticated!")}\n/>`;
    } else if (item.name === "m3-otp-input" || item.name === "otp-input") {
      code = `<M3OtpInput\n  length={${otpLength}}\n  value="${otpVal}"\n  size="md"${otpMask ? "\n  mask" : ""}${otpError ? "\n  error" : ""}\n  onChange={(val) => console.log(val)}\n  onComplete={(code) => console.log("Verified:", code)}\n/>`;
    } else if (item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper") {
      code = `<MobileHapticStepper\n  variant="${stepperVariant}"\n  size="${stepperSize}"\n  value={${stepperVal}}\n  min={0}\n  max={20}\n  unit="pcs"\n  onChange={(qty) => console.log(qty)}\n/>`;
    } else if (item.name === "popover-dialog") {
      code = `<PopoverDialog\n  variant="${popoverVariant}"\n  placement="${popoverPlacement}"${popoverShowArrow ? "\n  showArrow" : ""}\n  title="Node Configuration"\n  description="Adjust routing priorities and edge bandwidth limits."\n/>`;
    } else if (item.name === "command-palette") {
      code = `<CommandPalette\n  variant="${commandVariant}"\n  open={${commandOpen}}\n  onOpenChange={setOpen}\n  placeholder="Type a command or search documentation..."\n/>`;
    } else if (item.name === "drawer-dialog") {
      code = `<DrawerDialog\n  variant="${drawerVariant}"\n  open={${drawerOpen}}\n  onOpenChange={setOpen}\n  title="System Diagnostics"\n  description="Real-time metrics from the active node cluster"${drawerShowHandle ? "\n  showHandle" : ""}\n/>`;
    } else if (item.name === "spotlight-modal") {
      code = `<SpotlightModal\n  variant="${spotlightModalVariant}"\n  open={${spotlightModalOpen}}\n  onOpenChange={setOpen}\n  title="Cluster Node Deployment"\n  subtitle="VERIFIED SECURE RUNTIME"${spotlightReticle ? "\n  showReticle" : ""}\n/>`;
    } else if (item.name === "announcement-bar") {
      code = `<AnnouncementBar\n  variant="${announcementVariant}"\n  badge="v0.3.0 Released"\n  message="Explore 10 new overlay primitives, fluid dynamic island, and instant CLI tools."\n  actionLabel="Explore Docs"${announcementCountdown ? "\n  showCountdown" : ""}\n/>`;
    } else if (item.name === "toast-stack") {
      code = `<ToastStack\n  variant="${toastStackVariant}"\n  gap="${toastStackGap}"${toastStackExpand ? "\n  isExpanded={true}" : ""}\n  maxVisible={3}\n/>`;
    } else if (item.name === "ticker-notification") {
      code = `<TickerNotification\n  variant="${tickerVariant}"\n  speed="${tickerSpeed}"${tickerPauseOnHover ? "\n  pauseOnHover" : ""}\n/>`;
    } else if (item.name === "dynamic-island-banner" || item.name === "dynamic-island") {
      code = `<DynamicIslandBanner\n  variant="${dynamicIslandVariant}"\n  accentColor="${dynamicIslandAccent}"\n  title="Telemetry Stream Active"\n  subtitle="Edge Node 04 // 24.8ms RTT // 99.98% Health"\n/>`;
    } else if (item.name === "stack-cards") {
      code = `<StackCards\n  variant="${stackCardsVariant}"\n  cardWidth={380}\n  cardHeight={240}${stackCardsAutoPlay ? "\n  autoPlay" : ""}\n/>`;
    } else if (item.name === "input") {
      code = `<Input\n  label="${inputLabel}"\n  value="${inputVal}"\n  placeholder="${inputPlaceholder}"\n  helperText="${inputHelper}"\n  ${inputError ? `error="${inputError}"\n  ` : ""}${inputDisabled ? "disabled\n" : ""}/>`;
    } else if (item.name === "checkbox") {
      code = `<Checkbox\n  variant="${checkboxVariant}"\n  size="${checkboxSize}"\n  checked={${checkboxChecked}}\n  label="${checkboxLabel}"\n  description="${checkboxDesc}"${checkboxBadge ? `\n  badge="${checkboxBadge}"` : ""}${checkboxIndeterminate ? "\n  indeterminate={true}" : ""}${checkboxDisabled ? "\n  disabled={true}" : ""}\n/>`;
    } else if (item.name === "switch") {
      code = `<Switch\n  checked={${switchChecked}}\n  label="${switchLabel}"\n  description="${switchDesc}"\n  ${switchDisabled ? "disabled\n" : ""}/>`;
    } else if (item.name === "badge") {
      code = `<Badge variant="${badgeVariant}"${badgeDot ? " dot" : ""}>${badgeText}</Badge>`;
    } else if (item.name === "sidebar") {
      code = `<Sidebar\n  variant="${sidebarVariant}"\n  collapsed={${sidebarDemoCollapsed}}\n/>`;
    } else if (item.name === "card") {
      code = `<Card hover={${cardHover}} className="max-w-md">\n  <CardHeader>\n    <CardTitle>${cardTitle}</CardTitle>\n    <CardDescription>${cardDesc}</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-xs text-[var(--text-secondary)]">Edge network node operational</p>\n  </CardContent>\n</Card>`;
    } else if (item.name === "stat-card") {
      code = `<StatCard\n  title="${statTitle}"\n  value="${statValue}"\n  change="${statChange}"\n  trend="${statTrend}"\n  caption="${statCaption}"\n/>`;
    } else if (item.name === "tabs") {
      code = `<Tabs defaultValue="${tabValue}" variant="${tabVariant}"${(tabVariant === "liquid-pill" || tabVariant === "island") ? ` pillStyle="${tabPillStyle}"` : ""}>
  <TabsList variant="${tabVariant}"${(tabVariant === "liquid-pill" || tabVariant === "island") ? ` pillStyle="${tabPillStyle}"` : ""}>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
    <TabsTrigger value="logs" badge="Live">Logs</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p className="text-xs p-4 text-[var(--text-secondary)]">Cluster healthy and operational across 8 zones.</p>
  </TabsContent>
  <TabsContent value="metrics">
    <p className="text-xs p-4 text-[var(--text-secondary)]">CPU: 12% • Memory: 1.4GB / 4GB</p>
  </TabsContent>
  <TabsContent value="logs">
    <p className="text-xs p-4 font-mono text-[var(--text-muted)]">[14:22:04] Ready on 0.0.0.0:3000</p>
  </TabsContent>
  <TabsContent value="settings">
    <p className="text-xs p-4 text-[var(--text-secondary)]">Workspace environment settings.</p>
  </TabsContent>
</Tabs>`;
    } else if (item.name === "notched-navbar") {
      code = `<NotchedNavbar
  variant="${notchedVariant}"
  notchWidth={${notchedWidth}}
  notchHeight={${notchedHeight}}
  whiteBoxPadding={${notchedBorderPadding}}
  frameBg="${notchedFrameBg}"
  activeLink="${notchedActiveTab}"
  onLinkClick={(id) => setActiveTab(id)}
>
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between border-b border-white/10 pb-3">
      <h3 className="text-base font-semibold text-white">Infrastructure Telemetry</h3>
      <span className="text-[11px] font-mono text-emerald-400">Operational</span>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
        <span className="text-[10px] text-neutral-400 uppercase">Requests</span>
        <div className="text-lg font-bold text-white">1.4M</div>
      </div>
      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
        <span className="text-[10px] text-neutral-400 uppercase">Latency</span>
        <div className="text-lg font-bold text-white">24ms</div>
      </div>
      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
        <span className="text-[10px] text-neutral-400 uppercase">Uptime</span>
        <div className="text-lg font-bold text-white">99.9%</div>
      </div>
    </div>
  </div>
</NotchedNavbar>`;
    } else if (item.name === "search-bar" || item.name === "liquid-glass-search-bar") {
      code = `<SearchBar
  placeholder="${searchBarPlaceholder}"
  variant="${searchBarVariant}"
  onSelectResult={(item) => console.log("Selected:", item)}
/>`;
    } else if (item.name === "minimalist-login") {
      code = `<MinimalistLogin
  variant="${loginVariant}"${loginVariant === "rounded-corners" ? `\n  borderRadius={${loginRadius}}` : ""}${!loginSphereMotion ? `\n  sphereMotion={false}` : ""}${!loginInteractiveDots ? `\n  interactiveDots={false}` : ""}
  onSubmit={(data) => console.log("Login submitted:", data)}
/>`;
    } else if (item.name === "horizon-login") {
      code = `<HorizonLogin
  defaultTab="${horizonLoginDefaultTab}"${horizonLoginSpeed !== 1 ? `\n  horizonSpeed={${horizonLoginSpeed}}` : ""}${horizonLoginGlowIntensity !== 1 ? `\n  glowIntensity={${horizonLoginGlowIntensity}}` : ""}${!horizonLoginGrain ? `\n  grain={false}` : ""}
  onLogin={(data) => console.log("Login submitted:", data)}
  onSignUp={(data) => console.log("Sign-up submitted:", data)}
/>`;
    } else if (item.name === "blueprint-login") {
      code = `<BlueprintLogin
  defaultTab="${bpLoginDefaultTab}"${bpExpandRatio !== 1.42 ? `\n  expandRatio={${bpExpandRatio}}` : ""}${!bpNeighborWave ? `\n  neighborWave={false}` : ""}${bpRotationY !== -26 ? `\n  rotationY={${bpRotationY}}` : ""}${bpRotationX !== 3 ? `\n  rotationX={${bpRotationX}}` : ""}
  onLogin={(data) => console.log("Login submitted:", data)}
  onSignUp={(data) => console.log("Sign-up submitted:", data)}
/>`;
    } else if (item.name === "concave-carousel") {
      code = `<ConcaveCarousel
  preset="${concavePreset}"
  autoplay="${concaveAutoplay}"
  aspect={${concaveAspect}}
  size={${concaveSize}}
  curvature={${concaveCurvature}}
  distance={${concaveDistance}}
  gap={${concaveGap}}
  radius={${concaveRadius}}
  reflection={${concaveReflection}}
  dim={${concaveDim}}
  inertia={${concaveInertia}}
  wheel={${concaveWheel}}
  draggable={${concaveDraggable}}
  captions={${concaveCaptions}}
  controls={${concaveControls}}
/>`;
    } else if (item.name === "prismatic-slats-bg") {
      code = `<PrismaticSlatsBg
  preset="${slatPreset}"
  primary="${slatPrimary}"
  secondary="${slatSecondary}"
  background="${slatBg}"
  angle={${slatAngle}}
  flutes={${slatFlutes}}
  refraction={${slatRefraction}}
  aberration={${slatAberration}}
  softness={${slatSoftness}}
  wave={${slatWave}}
  waveFrequency={${slatWaveFreq}}
  highlight={${slatHighlight}}
  radius={${slatRadius}}
  momentum={${slatMomentum}}
  intensity={${slatIntensity}}
  grain={${slatGrainVal}}
  interactive={${slatInteractive}}
/>`;
    } else if (item.name === "grainy-grid-shader") {
      code = `<GrainyGridShader
  variant="${gridVariant}"
  grain={${gridGrain}}
  roughness={${gridRoughness}}
  columns={${gridColumns}}
  rows={${gridRows}}
  cellSize={${gridCellSize}}
  speed={${gridSpeed}}
  interactiveRadius={${gridRadius}}
  autoWave={${gridAutoWave}}
  interactive={${gridInteractive}}
/>`;
    } else if (item.name === "grainy-horizon-shader") {
      code = `<GrainyHorizonShader
  color="${horizonColor}"
  secondaryColor="${horizonSecondaryColor}"
  glowIntensity={${horizonGlowIntensity}}
  glowSpread={${horizonGlowSpread}}
  liquidCursor={${horizonLiquidCursor}}
  cursorIntensity={${horizonCursorIntensity}}
/>`;
    } else if (item.name === "firefly-cursor") {
      code = `<FireflyCursor
  preset="${cursorPreset}"
  color="${cursorColor}"
  coolingColor="${cursorCoolingColor}"
  intensity={${cursorIntensity}}
  trailWidth={${cursorTrailWidth}}
  linger={${cursorLinger}}
  glow={${cursorGlow}}
  hotspot={${cursorHotspot}}
  followSpeed={${cursorFollowSpeed}}
  grain={${cursorGrain}}
  quality="${cursorQuality}"
  clickBurst={${cursorClickBurst}}
  enabled={${cursorEnabled}}
/>`;
    } else if (item.name === "ethereal-smoke-shader") {
      code = `<EtherealSmokeShader
  preset="${smokePreset}"
  origin="${smokeOrigin}"
  originX={${smokeOriginX}}
  originY={${smokeOriginY}}
  coreColor="${smokeCoreColor}"
  smokeColor="${smokeColor}"
  atmoColor="${smokeAtmoColor}"
  intensity={${smokeIntensity}}
  spread={${smokeSpread}}
  turbulence={${smokeTurbulence}}
  speed={${smokeSpeed}}
  mouseSpread={${smokeMouseSpread}}
  trailWidth={${smokeTrailWidth}}
  trailLinger={${smokeTrailLinger}}
  grain={${smokeGrain}}
  vignette={${smokeVignette}}
  interactive={${smokeInteractive}}
/>`;
        } else if (item.name === "contour-tide") {
      code = `<ContourTide
  preset="${tidePreset}"
  backgroundColor="${tideBg}"
  waterColor="${tideWater}"
  crestColor="${tideCrest}"
  density={${tideDensity.toFixed(2)}}
  particleSize={${tideParticleSize.toFixed(2)}}
  waveHeight={${tideWaveHeight.toFixed(2)}}
  choppiness={${tideChoppiness.toFixed(2)}}
  wavelength={${tideWavelength.toFixed(2)}}
  windAngle={${tideWindAngle}}
  horizon={${tideHorizon.toFixed(2)}}
  fog={${tideFog.toFixed(2)}}
  glow={${tideGlow.toFixed(2)}}
  foam={${tideFoam.toFixed(2)}}
  speed={${tideSpeed.toFixed(2)}}
  parallax={${tideParallax.toFixed(2)}}
  swell={${tideSwell.toFixed(2)}}
  swellRadius={${tideSwellRadius.toFixed(2)}}
  seed={${tideSeed}}
  interactive={${tideInteractive}}
  clickRipples={${tideClickRipples}}
  paused={${tidePaused}}
/>`;
    } else if (item.name === "liquid-metal-background") {
      code = `<LiquidMetalBackground
  colorTone="${metalTone}"
  intensity="${metalIntensity}"
  speed={${metalSpeed}}
  interactive={${metalInteractive}}
  theme="${metalTheme}"
/>`;
    } else if (item.name === "morph-node-ring") {
      code = `<MorphNodeRing
  nodeCount={${ringNodeCount}}
  mode="${ringMode}"
  nodeSize={${ringNodeSize}}
  radius={${ringRadius}}
  loop={${ringLoop}}
  speed={${ringSpeed}}
  design="${ringDesign}"${
    ringEnableRotation
      ? `\n  enableRotation={${ringEnableRotation}}\n  rotationSpeed={${ringRotationSpeed}}`
      : ""
  }${ringMode === "image" ? `\n  keepImagesUpright={${ringKeepUpright}}` : ""}
/>`;
    } else if (item.name === "glass-reveal") {
      code = `<GlassReveal
  image="${glassRevealImage}"
  shape="${glassRevealShape}"
  size={${glassRevealSize.toFixed(2)}}
  softness={${glassRevealSoftness.toFixed(2)}}
  distortion={${glassRevealDistortion.toFixed(2)}}
  aberration={${glassRevealAberration.toFixed(3)}}
  wobble={${glassRevealWobble.toFixed(2)}}
  wobbleSpeed={${glassRevealWobbleSpeed.toFixed(1)}}
  waveFrequency={${glassRevealWaveFrequency}}
  waveStrength={${glassRevealWaveStrength.toFixed(3)}}
  waveSpeed={${glassRevealWaveSpeed.toFixed(1)}}
  grain={${glassRevealGrain.toFixed(3)}}
  grainSpeed={${glassRevealGrainSpeed}}
  grayscale={${glassRevealGrayscale.toFixed(2)}}
  dim={${glassRevealDim.toFixed(2)}}
  follow={${glassRevealFollow.toFixed(2)}}
  returnToCenter={${glassRevealReturnToCenter}}
  fallback="${glassRevealFallback}"
  paused={${glassRevealPaused}}
/>`;
    } else if (item.name === "magnetic-cursor") {
      code = `<TargetCursor
  spinDuration={${magSpinDuration}}
  hoverDuration={${magHoverDuration}}
  cursorColor="${magColor}"${magColorOnTarget ? `\n  cursorColorOnTarget="${magColorOnTarget}"` : ""}
  size={${magSize}}
  cornerSize={${magCornerSize}}
  thickness={${magThickness}}
  padding={${magPadding}}
  dotSize={${magDotSize}}
  blendMode="${magBlend}"
  matchRadius={${magMatchRadius}}
  parallaxOn={${magParallaxOn}}
  clickEffect={${magClickEffect}}
  showLabel={${magShowLabel}}
  hideDefaultCursor={${magHideDefaultCursor}}
/>

{/* Interactive Elements to lock onto */}
<div className="flex gap-4 items-center justify-center">
  <button className="cursor-target px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium" data-cursor-label="Open">
    Click me!
  </button>
  <div className="cursor-target px-5 py-2.5 rounded-full bg-lime-500/20 text-lime-400 font-medium" data-cursor-label="Target">
    Hover target
  </div>
</div>`;
    } else if (item.name === "neon-ribbon-cursor") {
      code = `<NeonRibbonCursor
  variant="${ribbonVariant}"
  primaryColor="${ribbonHeadColor}"
  secondaryColor="${ribbonTailColor}"
  ribbonWidth={${ribbonWidth}}
  trailLength={${ribbonTrailLength}}
  tension={${ribbonTension}}
  glow={${ribbonGlow}}
  waveSpeed={${ribbonWaveSpeed}}
  clickBurst={${ribbonBurst}}
  className="w-full h-80 rounded-2xl"
>
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <p className="text-xl font-bold tracking-tight text-white">Flowing 3D Neon Ribbon</p>
    <p className="text-sm text-neutral-400 mt-1">Move your cursor swiftly across the stage</p>
  </div>
</NeonRibbonCursor>`;
    } else if (item.name === "quantum-particles-cursor") {
      code = `<QuantumParticlesCursor
  variant="${quantumVariant}"
  color="${quantumColor}"
  secondaryColor="${quantumSecondary}"
  particleCount={${quantumParticleCount}}
  connectDistance={${quantumConnectDist}}
  forceMode="${quantumForce}"
  gravity={${quantumGravity}}
  cursorRadius={${quantumRadius}}
  shockwave={${quantumShockwave}}
  className="w-full h-80 rounded-2xl"
>
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <p className="text-xl font-bold tracking-tight text-white">Quantum Filament Matrix</p>
    <p className="text-sm text-neutral-400 mt-1">Click to trigger energy shockwave ripple</p>
  </div>
</QuantumParticlesCursor>`;
    } else if (item.name === "spotlight-cursor") {
      code = `<SpotlightCursor
  variant="${spotlightVariant}"
  color="${spotlightColor}"
  radius={${spotlightRadius}}
  falloff={${spotlightFalloff}}
  ambientDarkness={${spotlightDarkness}}
  springTension={${spotlightTension}}
  revealGrid={${spotlightGrid}}
  specular={${spotlightSpecular}}
  pulseOnClick={${spotlightPulse}}
  className="w-full h-80 rounded-2xl"
>
  <div className="grid grid-cols-2 gap-4 p-8 h-full items-center">
    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold">Hidden Node Alpha</h4>
      <p className="text-xs text-neutral-400 mt-1">Revealed by spotlight focus</p>
    </div>
    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
      <h4 className="text-white font-semibold">Coordinate Array</h4>
      <p className="text-xs text-neutral-400 mt-1">Matrix alignment calibrated</p>
    </div>
  </div>
</SpotlightCursor>`;
    } else if (item.name === "elastic-blob-cursor") {
      code = `<ElasticBlobCursor
  variant="${blobVariant}"
  color="${blobColor}"
  secondaryColor="${blobSecondary}"
  blobSize={${blobSize}}
  viscosity={${blobViscosity}}
  springTension={${blobTension}}
  droplets={${blobDroplets}}
  gooeyStrength={${blobGooeyStrength}}
  wobbleSpeed={${blobWobble}}
  specular={${blobSpecular}}
  className="w-full h-80 rounded-2xl"
>
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <p className="text-xl font-bold tracking-tight text-white">Organic Liquid Metasphere</p>
    <p className="text-sm text-neutral-400 mt-1">SVG Gooey Filter with Viscous Surface Tension</p>
  </div>
</ElasticBlobCursor>`;
    }
    onConfiguredCodeChange(code);
  }, [
    item,
    loginVariant,
    loginRadius,
    loginSphereMotion,
    loginInteractiveDots,
    loginRotationSpeed,
    btnVariant,
    btnSize,
    btnLabel,
    btnLoading,
    btnDisabled,
    inputVal,
    inputLabel,
    inputPlaceholder,
    inputHelper,
    inputError,
    inputDisabled,
    checkboxChecked,
    checkboxVariant,
    checkboxSize,
    checkboxIndeterminate,
    checkboxDisabled,
    checkboxLabel,
    checkboxDesc,
    tabVariant,
    tabPillStyle,
    notchedVariant,
    notchedBorderPadding,
    notchedWidth,
    notchedHeight,
    notchedActiveTab,
    notchedFrameBg,
    switchChecked,
    switchLabel,
    switchDesc,
    switchDisabled,
    badgeVariant,
    badgeDot,
    badgeText,
    sidebarVariant,
    sidebarDemoCollapsed,
    cardTitle,
    cardDesc,
    cardHover,
    statTitle,
    statValue,
    statChange,
    statTrend,
    statCaption,
    expandingTitle,
    expandingSubtitle,
    expandingForced,
    carouselTitle,
    carouselAutoplay,
    tocActiveId,
    tocRubberBand,
    footerBrandText,
    footerBlurBlend,
    footerShowNewsletter,
    marqueeText,
    marqueeVariant,
    marqueeOutline,
    marqueeTextColor,
    marqueeBlurColor,
    dirMarqueeDir,
    dirMarqueeHud,
    dirMarqueeTextColor,
    dirMarqueeBlurColor,
    kineticText,
    kineticVariant,
    concavePreset,
    concaveAutoplay,
    concaveBg,
    concaveAspect,
    concaveSize,
    concaveCurvature,
    concaveDistance,
    concaveTilt,
    concaveGap,
    concaveRadius,
    concaveReflection,
    concaveDim,
    concaveSpeed,
    concaveInterval,
    concaveInertia,
    concaveSnap,
    concavePauseOnHover,
    concaveDraggable,
    concaveWheel,
    concaveCaptions,
    concaveControls,
    concavePaused,
    slatPreset,
    slatBg,
    slatPrimary,
    slatSecondary,
    slatAngle,
    slatFlutes,
    slatRefraction,
    slatAberration,
    slatSoftness,
    slatWave,
    slatWaveFreq,
    slatDrift,
    slatHighlight,
    slatHighlightSoft,
    slatLightAngle,
    slatRadius,
    slatMomentum,
    slatSwirl,
    slatIntensity,
    slatTrail,
    slatTexture,
    slatGrainVal,
    slatSpeed,
    slatAutoplay,
    slatInteractive,
    slatPaused,
    gridVariant,
    gridGrain,
    gridRoughness,
    gridColumns,
    gridRows,
    gridCellSize,
    gridSpeed,
    gridRadius,
    gridAutoWave,
    gridInteractive,
    horizonVariant,
    horizonColor,
    horizonSecondaryColor,
    horizonGlowIntensity,
    horizonGlowSpread,
    horizonLiquidCursor,
    horizonCursorIntensity,
    cursorPreset,
    cursorColor,
    cursorCoolingColor,
    cursorIntensity,
    cursorTrailWidth,
    cursorLinger,
    cursorGlow,
    cursorHotspot,
    cursorFollowSpeed,
    cursorGrain,
    cursorQuality,
    cursorClickBurst,
    cursorEnabled,
    smokePreset,
    smokeOrigin,
    smokeOriginX,
    smokeOriginY,
    smokeCoreColor,
    smokeColor,
    smokeAtmoColor,
    smokeIntensity,
    smokeSpread,
    smokeTurbulence,
    smokeSpeed,
    smokeMouseStrength,
    smokeMouseSpread,
    smokeTrailWidth,
    smokeTrailLinger,
    smokeGrain,
    smokeVignette,
    smokeInteractive,
    metalTone,
    metalIntensity,
    metalSpeed,
    metalInteractive,
    metalTheme,
    ringLoop,
    ringSpeed,
    ringNodeCount,
    ringMode,
    ringNodeSize,
    ringRadius,
    ringDesign,
    ringEnableRotation,
    ringRotationSpeed,
    ringKeepUpright,
    magVariant,
    magColor,
    magColorOnTarget,
    magSpinDuration,
    magHoverDuration,
    magParallaxOn,
    magHideDefaultCursor,
    magSize,
    magCornerSize,
    magThickness,
    magPadding,
    magMatchRadius,
    magDotSize,
    magBlend,
    magShowLabel,
    magClickEffect,
    ribbonVariant,
    ribbonHeadColor,
    ribbonTailColor,
    ribbonWidth,
    ribbonTrailLength,
    ribbonTension,
    ribbonGlow,
    ribbonWaveSpeed,
    ribbonBurst,
    quantumVariant,
    quantumColor,
    quantumSecondary,
    quantumParticleCount,
    quantumConnectDist,
    quantumForce,
    quantumGravity,
    quantumRadius,
    quantumShockwave,
    spotlightVariant,
    spotlightColor,
    spotlightRadius,
    spotlightFalloff,
    spotlightDarkness,
    spotlightTension,
    spotlightGrid,
    spotlightSpecular,
    spotlightPulse,
    blobVariant,
    blobColor,
    blobSecondary,
    blobSize,
    blobViscosity,
    blobTension,
    blobDroplets,
    blobGooeyStrength,
    blobWobble,
    blobSpecular,
    onConfiguredCodeChange,
  ]);

  const viewportWidth =
    viewport === "mobile"
      ? "max-w-[375px]"
      : viewport === "tablet"
      ? "max-w-[768px]"
      : "w-full max-w-full";

  return (
    <div className={cn(showKnobs ? "space-y-4" : "h-full w-full flex items-center justify-center", className)}>
      {/* 1. Canvas Viewport */}
      <div
        className={cn(
          "relative mx-auto transition-all duration-300 ease-out",
          showKnobs
            ? "p-6 sm:p-10 flex flex-col items-center justify-center min-h-[260px] rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--text-primary)] overflow-visible shadow-xs"
            : "p-0 flex items-center justify-center h-full w-full border-none bg-transparent shadow-none",
          viewportWidth,
          showGrid && "bg-[radial-gradient(var(--canvas-grid-dot)_1px,transparent_1px)] [background-size:16px_16px]",
          viewport === "mobile" && "border-[var(--border-hover)] ring-1 ring-black/5 dark:ring-white/5 shadow-2xl rounded-2xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Viewport size indicator badge */}
        {interactive && showKnobs && viewport !== "desktop" && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs font-mono text-[10px] text-[var(--text-muted)] pointer-events-none select-none">
            {viewport === "mobile" ? "375px • Mobile" : "768px • Tablet"}
          </div>
        )}
        {/* Reset Action (Top right) */}
        {interactive && showKnobs && (
          <button
            type="button"
            onClick={handleResetAll}
            className="absolute top-3 right-3 p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            title="Reset component to default properties"
            aria-label="Reset to default"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Unified Floating Variant Navigation Dock (Canvas Bottom) */}
        {interactive && showKnobs && hasVariants && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 p-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-md shadow-md select-none transition-all duration-200 hover:border-[var(--border-hover)]">
            {/* Previous Variant Button */}
            <button
              type="button"
              onClick={handlePrevVariant}
              className="h-6 w-6 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-90 transition-all cursor-pointer"
              title={`Previous variant: ${variants[(currentIndex - 1 + variants.length) % variants.length]}`}
              aria-label="Previous variant"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            {/* Center Variant Badge with Dropdown */}
            <div className="relative" ref={variantMenuRef}>
              <button
                type="button"
                onClick={() => setVariantMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full hover:bg-[var(--surface-secondary)] active:scale-98 transition-all cursor-pointer group"
                title="Select variant"
                aria-haspopup="listbox"
                aria-expanded={variantMenuOpen}
              >
                <span className="text-xs font-semibold text-[var(--text-primary)] capitalize tracking-tight">
                  {currentVariant}
                </span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] pl-0.5">
                  {currentIndex + 1}/{variants.length}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 text-[var(--text-muted)] transition-transform duration-200 group-hover:text-[var(--text-primary)]",
                    variantMenuOpen && "rotate-180 text-[var(--accent-green)]"
                  )}
                />
              </button>

              {/* Quick Jump Variant Menu Popover */}
              {variantMenuOpen && (
                <div
                  role="listbox"
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 min-w-[140px] max-h-56 overflow-y-auto rounded-xl p-1 bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Variants ({variants.length})
                  </div>
                  {variants.map((v, i) => {
                    const isSelected = v === currentVariant;
                    return (
                      <button
                        key={v}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          applyVariant(v);
                          onVariantChange?.(v);
                          setVariantMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer",
                          isSelected
                            ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] font-medium"
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="capitalize">{v}</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {i + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Next Variant Button */}
            <button
              type="button"
              onClick={handleNextVariant}
              className="h-6 w-6 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-90 transition-all cursor-pointer"
              title={`Next variant: ${variants[(currentIndex + 1) % variants.length]}`}
              aria-label="Next variant"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* --- ACTUAL LIVE COMPONENT PREVIEW --- */}
        <ScaledThumbnailWrapper
          enabled={!showKnobs}
          category={item.category}
          name={item.name}
          className={showKnobs ? "w-full flex items-center justify-center" : "w-full h-full"}
        >
          {/* Button */}
          {item.name === "button" && (
            <div className="flex flex-col items-center gap-3">
              <Button
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                disabled={btnDisabled}
              >
                {btnLabel}
              </Button>
            </div>
          )}

          {/* Magnetic Button */}
          {item.name === "magnetic-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <MagneticButton
                variant={magneticVariant}
                size={magneticSize}
                strength={magneticStrength}
                showSpotlight={magneticSpotlight}
                isLoading={magneticLoading}
                disabled={magneticDisabled}
              >
                {magneticLabel}
              </MagneticButton>
            </div>
          )}

          {/* Border Beam Button */}
          {item.name === "border-beam-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <BorderBeamButton
                variant={borderBeamVariant}
                size={borderBeamSize}
                beamDuration={borderBeamDuration}
                beamSize={borderBeamPulseSize}
                hoverSpeedup={borderBeamSpeedup}
                isLoading={borderBeamLoading}
                disabled={borderBeamDisabled}
              >
                {borderBeamLabel}
              </BorderBeamButton>
            </div>
          )}

          {/* Cyber Glitch Button */}
          {item.name === "cyber-glitch-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <CyberGlitchButton
                variant={cyberGlitchVariant}
                size={cyberGlitchSize}
                hudCode={cyberGlitchHud}
                showBrackets={cyberGlitchBrackets}
                showScanlines={cyberGlitchScanlines}
                isLoading={cyberGlitchLoading}
                disabled={cyberGlitchDisabled}
              >
                {cyberGlitchLabel}
              </CyberGlitchButton>
            </div>
          )}

          {/* Liquid Wave Button */}
          {item.name === "liquid-wave-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <LiquidWaveButton
                variant={liquidWaveVariant}
                size={liquidWaveSize}
                waveSpeed={liquidWaveSpeed}
                showBubbles={liquidWaveBubbles}
                isLoading={liquidWaveLoading}
                disabled={liquidWaveDisabled}
              >
                {liquidWaveLabel}
              </LiquidWaveButton>
            </div>
          )}

          {/* Particle Burst Button */}
          {item.name === "particle-burst-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <ParticleBurstButton
                variant={particleBurstVariant}
                size={particleBurstSize}
                particleCount={particleBurstCount}
                enableAmbient={particleBurstAmbient}
                isLoading={particleBurstLoading}
                disabled={particleBurstDisabled}
              >
                {particleBurstLabel}
              </ParticleBurstButton>
            </div>
          )}

          {/* Elastic Slot Button */}
          {item.name === "elastic-slot-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <ElasticSlotButton
                variant={elasticSlotVariant}
                size={elasticSlotSize}
                hoverLabel={elasticSlotHoverLabel}
                showDrawer={elasticSlotDrawer}
                isLoading={elasticSlotLoading}
                disabled={elasticSlotDisabled}
              >
                {elasticSlotLabel}
              </ElasticSlotButton>
            </div>
          )}

          {/* Glass Prism Button */}
          {item.name === "glass-prism-button" && (
            <div className="flex flex-col items-center justify-center p-6">
              <GlassPrismButton
                variant={glassPrismVariant}
                size={glassPrismSize}
                maxTilt={glassPrismTilt}
                glareOpacity={glassPrismGlare}
                showPrismBorder={glassPrismBorder}
                isLoading={glassPrismLoading}
                disabled={glassPrismDisabled}
              >
                {glassPrismLabel}
              </GlassPrismButton>
            </div>
          )}

          {/* Input */}
          {item.name === "input" && (
            <div className="w-full max-w-sm">
              <Input
                label={inputLabel}
                value={inputVal}
                placeholder={inputPlaceholder}
                helperText={inputHelper}
                error={inputError}
                disabled={inputDisabled}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>
          )}

          {/* Checkbox */}
          {item.name === "checkbox" && (
            <div className="w-full max-w-md space-y-4">
              {/* 1. MOTION VARIANT: Physics Spring Laboratory */}
              {checkboxVariant === "motion" && (
                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/80 backdrop-blur-md shadow-lg space-y-4 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-green)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-ping" />
                      Spring Physics Engine
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      easing: spring(0.34, 1.56)
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/60 flex items-center justify-between">
                    <Checkbox
                      variant="motion"
                      size={checkboxSize}
                      label={checkboxLabel}
                      description={checkboxDesc}
                      badge={checkboxBadge}
                      checked={checkboxChecked}
                      indeterminate={checkboxIndeterminate}
                      disabled={checkboxDisabled}
                      onCheckedChange={setCheckboxChecked}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                    <span>Micro-bounce on toggle</span>
                    <button
                      type="button"
                      onClick={() => setCheckboxChecked((c) => !c)}
                      className="text-[var(--accent-green)] hover:underline cursor-pointer"
                    >
                      Trigger Bounce →
                    </button>
                  </div>
                </div>
              )}

              {/* 2. LINEART VARIANT: Technical CAD / Blueprint Stage */}
              {checkboxVariant === "lineart" && (
                <div
                  className="p-6 rounded-2xl border-2 border-[var(--border)] bg-[var(--canvas-bg)] shadow-md space-y-4 relative overflow-hidden font-mono"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--canvas-grid-dot) 1px, transparent 1px), linear-gradient(to bottom, var(--canvas-grid-dot) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[var(--accent-green)] border-b border-[var(--border-subtle)] pb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[var(--text-muted)]">[CAD]</span>
                      SVG Path Tracing
                    </span>
                    <span className="text-[var(--text-muted)] font-mono">
                      POS: [142.8, 64.0]
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-sm">
                    <Checkbox
                      variant="lineart"
                      size={checkboxSize}
                      label={checkboxLabel}
                      description={checkboxDesc}
                      badge={checkboxBadge}
                      checked={checkboxChecked}
                      indeterminate={checkboxIndeterminate}
                      disabled={checkboxDisabled}
                      onCheckedChange={setCheckboxChecked}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                    <span>Dash offset animation (28px stroke)</span>
                    <button
                      type="button"
                      onClick={() => setCheckboxChecked((c) => !c)}
                      className="text-[var(--accent-green)] hover:underline cursor-pointer uppercase"
                    >
                      Redraw Path ↺
                    </button>
                  </div>
                </div>
              )}

              {/* 3. STRIKE VARIANT: Interactive Task Checklist */}
              {checkboxVariant === "strike" && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-md space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Sprint Task Checklist
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-green)] bg-[var(--accent-green)]/10 px-2 py-0.5 rounded-full">
                      Interactive Tasks
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <Checkbox
                      variant="strike"
                      size={checkboxSize}
                      label={checkboxLabel}
                      description={checkboxDesc}
                      badge={checkboxBadge}
                      checked={checkboxChecked}
                      onCheckedChange={setCheckboxChecked}
                    />
                    <Checkbox
                      variant="strike"
                      size={checkboxSize}
                      defaultChecked
                      label="Deploy edge worker bundle to cloudflare"
                      description="Automated CI/CD webhook on main branch"
                    />
                    <Checkbox
                      variant="strike"
                      size={checkboxSize}
                      defaultChecked={false}
                      label="Run accessibility audit with axe-core"
                      description="100% WCAG 2.1 AA compliant standard"
                    />
                  </div>
                </div>
              )}

              {/* 4. CARD VARIANT: Selectable Tiles */}
              {checkboxVariant === "card" && (
                <div className="space-y-3 w-full">
                  <Checkbox
                    variant="card"
                    size={checkboxSize}
                    label={checkboxLabel}
                    description={checkboxDesc}
                    badge={checkboxBadge}
                    checked={checkboxChecked}
                    disabled={checkboxDisabled}
                    onCheckedChange={setCheckboxChecked}
                  />
                  <Checkbox
                    variant="card"
                    size={checkboxSize}
                    defaultChecked={!checkboxChecked}
                    label="Serverless Edge Compute"
                    description="Sub-10ms TTFB across 310 global edge points of presence"
                    badge="Global"
                  />
                </div>
              )}

              {/* 5. CHIP VARIANT: Selectable Tag Pills */}
              {checkboxVariant === "chip" && (
                <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 flex flex-wrap items-center justify-center gap-2.5">
                  <Checkbox
                    variant="chip"
                    size={checkboxSize}
                    label={checkboxLabel}
                    badge={checkboxBadge}
                    checked={checkboxChecked}
                    disabled={checkboxDisabled}
                    onCheckedChange={setCheckboxChecked}
                  />
                  <Checkbox variant="chip" label="TypeScript" defaultChecked />
                  <Checkbox variant="chip" label="Tailwind CSS" defaultChecked />
                  <Checkbox variant="chip" label="Framer Motion" />
                  <Checkbox variant="chip" label="Turbopack" defaultChecked />
                </div>
              )}

              {/* 6. DEFAULT VARIANT: Minimal Clean Developer Checkbox */}
              {checkboxVariant === "default" && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/70 backdrop-blur-sm shadow-sm">
                  <Checkbox
                    variant="default"
                    size={checkboxSize}
                    label={checkboxLabel}
                    description={checkboxDesc}
                    badge={checkboxBadge}
                    checked={checkboxChecked}
                    indeterminate={checkboxIndeterminate}
                    disabled={checkboxDisabled}
                    onCheckedChange={setCheckboxChecked}
                  />
                </div>
              )}
            </div>
          )}

          {/* Notched Navbar */}
          {item.name === "notched-navbar" && (
            showKnobs ? (
              <div className="w-full max-w-4xl flex flex-col items-center justify-center p-2">
                <NotchedNavbar
                  variant={notchedVariant as any}
                  notchWidth={notchedWidth}
                  notchHeight={notchedHeight}
                  whiteBoxPadding={notchedBorderPadding}
                  frameBg={notchedFrameBg}
                  backdropBg="var(--canvas-bg)"
                  activeLink={notchedActiveTab}
                  onLinkClick={(id) => setNotchedActiveTab(id)}
                >
                  <div className="space-y-6">
                    {/* Minimal Dashboard Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                          Infrastructure Telemetry
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Edge cluster performance and real-time load
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                        <span>All Systems Operational</span>
                      </div>
                    </div>

                    {/* Minimal Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Edge Requests</span>
                        <div className="text-xl font-bold text-white tracking-tight">1.42M</div>
                        <span className="text-[10px] font-mono text-emerald-400">+14.2% vs yesterday</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Avg Latency</span>
                        <div className="text-xl font-bold text-white tracking-tight">24ms</div>
                        <span className="text-[10px] font-mono text-neutral-400">p99: 42ms worldwide</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Cache Hit Ratio</span>
                        <div className="text-xl font-bold text-white tracking-tight">99.4%</div>
                        <span className="text-[10px] font-mono text-emerald-400">Zero purge events</span>
                      </div>
                    </div>
                  </div>
                </NotchedNavbar>
              </div>
            ) : (
              /* SMALL PREVIEW CARD (on /components, carousels, sidebar hover) */
              <div className="w-full max-w-[420px] flex items-center justify-center p-1">
                <NotchedNavbar
                  variant="compact"
                  notchWidth={150}
                  notchHeight={30}
                  filletWidth={16}
                  borderRadius={12}
                  whiteBoxPadding={0}
                  backdropBg="transparent"
                  minHeight={130}
                  links={[
                    { id: "home", label: "Home", icon: <HomeIcon /> },
                    { id: "explore", label: "Explore", icon: <BriefcaseIcon /> },
                    { id: "contact", label: "Contact", icon: <MailIcon /> },
                  ]}
                  activeLink={notchedActiveTab === "experience" || notchedActiveTab === "settings" ? "explore" : notchedActiveTab}
                  onLinkClick={(id) => setNotchedActiveTab(id)}
                  className="shadow-md"
                >
                  <div className="flex flex-col items-center justify-center text-center py-2.5 px-4 space-y-1">
                    <div className="text-xs sm:text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
                      <span>Infrastructure Telemetry</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    </div>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Global edge cluster operational
                    </p>
                  </div>
                </NotchedNavbar>
              </div>
            )
          )}

          {/* Switch */}
          {item.name === "switch" && (
            <div className="w-full max-w-sm p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60">
              <Switch
                label={switchLabel}
                description={switchDesc}
                checked={switchChecked}
                disabled={switchDisabled}
                onCheckedChange={setSwitchChecked}
              />
            </div>
          )}

          {/* Dialog */}
          {item.name === "dialog" && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent">{dialogTriggerLabel}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDesc}</DialogDescription>
                  </DialogHeader>
                  <div className="py-2 space-y-2">
                    <div className="p-2.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)]">
                      SHA: 02bc9fa • Branch: main
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="accent" onClick={() => setDialogOpen(false)}>
                      Confirm Deploy
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {showKnobs && (
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Click button to test accessible modal dialog with backdrop & portal
                </span>
              )}
            </div>
          )}

          {/* Popover Dialog */}
          {item.name === "popover-dialog" && (
            <div className="flex flex-col items-center justify-center py-20 min-h-[360px]">
              <PopoverDialog
                variant={popoverVariant}
                placement={popoverPlacement}
                showArrow={popoverShowArrow}
              />
            </div>
          )}

          {/* Command Palette */}
          {item.name === "command-palette" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <div className="text-center space-y-2">
                <Button
                  variant="accent"
                  onClick={() => setCommandOpen(true)}
                  className="shadow-xl"
                >
                  Open Command Palette (Cmd+K)
                </Button>
                <p className="text-xs font-mono text-[var(--text-muted)]">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">K</kbd> to toggle anywhere
                </p>
              </div>
              <CommandPalette
                open={commandOpen}
                onOpenChange={setCommandOpen}
                variant={commandVariant}
              />
            </div>
          )}

          {/* Drawer Dialog */}
          {item.name === "drawer-dialog" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <Button
                variant="accent"
                onClick={() => setDrawerOpen(true)}
                className="shadow-xl"
              >
                Open {drawerVariant.replace("-", " ")} Drawer
              </Button>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                Slide-out inspector sheet with swipe dismiss & backdrop blur
              </p>
              <DrawerDialog
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                variant={drawerVariant}
                showHandle={drawerShowHandle}
              />
            </div>
          )}

          {/* Spotlight Modal */}
          {item.name === "spotlight-modal" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <Button
                variant="accent"
                onClick={() => setSpotlightModalOpen(true)}
                className="shadow-xl"
              >
                Launch Spotlight Modal
              </Button>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                Interactive modal with mouse-following specular beam and CAD reticles
              </p>
              <SpotlightModal
                open={spotlightModalOpen}
                onOpenChange={setSpotlightModalOpen}
                variant={spotlightModalVariant}
                showReticle={spotlightReticle}
              />
            </div>
          )}

          {/* Announcement Bar */}
          {item.name === "announcement-bar" && (
            <div className="w-full max-w-2xl px-4 py-6">
              <AnnouncementBar
                variant={announcementVariant}
                showCountdown={announcementCountdown}
              />
            </div>
          )}

          {/* Toast Stack */}
          {item.name === "toast-stack" && (
            <div className={cn(
              "relative w-full min-h-[380px] p-6 flex flex-col",
              toastStackVariant === "stacked-bottom-right" && "items-end justify-end",
              toastStackVariant === "stacked-top-center" && "items-center justify-start",
              (toastStackVariant === "cyber-telemetry" || toastStackVariant === "minimal-list") && "items-center justify-center"
            )}>
              <ToastStack
                variant={toastStackVariant}
                gap={toastStackGap}
                isExpanded={toastStackExpand}
                onExpandChange={setToastStackExpand}
              />
            </div>
          )}

          {/* Ticker Notification */}
          {item.name === "ticker-notification" && (
            <div className="w-full max-w-2xl px-4 py-6">
              <TickerNotification
                variant={tickerVariant}
                speed={tickerSpeed}
                pauseOnHover={tickerPauseOnHover}
              />
            </div>
          )}

          {/* Dynamic Island Banner */}
          {(item.name === "dynamic-island-banner" || item.name === "dynamic-island") && (
            <div className="w-full max-w-xl px-4 py-6 flex flex-col items-center">
              <DynamicIslandBanner
                variant={dynamicIslandVariant}
                accentColor={dynamicIslandAccent}
              />
              <p className="text-[11px] font-mono text-[var(--text-muted)] mt-4">
                Click the pill above to fluidly expand / collapse the telemetry HUD
              </p>
            </div>
          )}

          {/* Stack Cards */}
          {item.name === "stack-cards" && (
            <div className="w-full py-8 flex flex-col items-center">
              <StackCards
                variant={stackCardsVariant}
                autoPlay={stackCardsAutoPlay}
              />
            </div>
          )}

          {/* Badge */}
          {item.name === "badge" && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant={badgeVariant} dot={badgeDot}>
                {badgeText}
              </Badge>
              {showKnobs && (
                <>
                  <Badge variant="outline">v0.1.0</Badge>
                  <Badge variant="secondary">Turbopack</Badge>
                </>
              )}
            </div>
          )}

          {/* Card */}
          {item.name === "card" && (
            showKnobs ? (
              <Card variant={cardHover ? "interactive" : "default"} className="w-full max-w-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{cardTitle}</CardTitle>
                    <Badge variant="success" dot>
                      Active
                    </Badge>
                  </div>
                  <CardDescription>{cardDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    High-performance edge compute node running with sub-millisecond cold start times.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">us-east-1</span>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card variant="default" className="w-full max-w-[245px] shadow-xs">
                <CardHeader className="p-2.5 pb-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold leading-none truncate max-w-[150px]">
                      {cardTitle}
                    </CardTitle>
                    <Badge variant="success" dot className="text-[9px] px-1 py-0 h-4">
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="text-[10px] truncate">{cardDesc}</CardDescription>
                </CardHeader>
                <CardFooter className="p-2.5 pt-1 flex justify-between items-center border-t border-[var(--border)]/50 text-[10px] mt-1">
                  <span className="font-mono text-[9px] text-[var(--text-muted)]">us-east-1</span>
                  <span className="font-mono text-[10px] text-[var(--accent-green)] font-medium">99.9% uptime</span>
                </CardFooter>
              </Card>
            )
          )}

          {/* Tabs */}
          {item.name === "tabs" && (
            <div className="w-full max-w-lg flex flex-col items-center justify-center p-2">
              <Tabs
                value={tabValue}
                onValueChange={setTabValue}
                variant={tabVariant}
                pillStyle={tabPillStyle}
                className="w-full flex flex-col items-center"
              >
                <TabsList
                  variant={tabVariant}
                  pillStyle={tabPillStyle}
                  className="mb-4"
                >
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="logs" badge="Live">Logs</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <div className="w-full relative overflow-x-clip min-h-[100px]">
                  <TabsContent
                    value="overview"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 text-xs text-[var(--text-secondary)] space-y-1.5"
                  >
                    <div className="font-semibold text-sm text-[var(--text-primary)]">System Overview</div>
                    <p>All 8 global edge nodes are operational with continuous sub-10ms routing.</p>
                  </TabsContent>
                  <TabsContent
                    value="metrics"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 text-xs text-[var(--text-secondary)] space-y-1.5"
                  >
                    <div className="font-semibold text-sm text-[var(--text-primary)]">Telemetry</div>
                    <p className="font-mono text-xs text-[var(--accent-green)]">CPU: 12.4% • Memory: 1.4GB / 4GB • Network: 312 MB/s</p>
                  </TabsContent>
                  <TabsContent
                    value="logs"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 text-xs font-mono text-[var(--text-muted)] space-y-1"
                  >
                    <div className="font-semibold text-sm text-[var(--text-primary)] font-sans">Worker Logs</div>
                    <p>[14:22:04] info: Worker #104 ready on 0.0.0.0:3000</p>
                    <p>[14:22:07] info: S-curve notch layout calculated (tangents continuous)</p>
                  </TabsContent>
                  <TabsContent
                    value="settings"
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 text-xs text-[var(--text-secondary)] space-y-1.5"
                  >
                    <div className="font-semibold text-sm text-[var(--text-primary)]">Preferences</div>
                    <p>Turbopack build optimizations and edge worker deployment webhooks are active.</p>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}

          {/* Accordion */}
          {item.name === "accordion" && (
            showKnobs ? (
              <div className="w-full max-w-md">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does component distribution work?</AccordionTrigger>
                    <AccordionContent>
                      kiloUI provides shadcn-compatible JSON metadata endpoints for zero-dependency CLI installations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is SSR and App Router supported?</AccordionTrigger>
                    <AccordionContent>
                      Yes, fully compatible with Next.js App Router and React Server Components.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div className="w-full max-w-[400px]">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1" className="border-[var(--border)]">
                    <AccordionTrigger className="py-2.5 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">Distribution & CLI</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                      shadcn-compatible JSON endpoints for zero-dependency CLI installations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="py-2.5 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">App Router & SSR</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                      React Server Components and TurboPack ready.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )
          )}

          {/* Stat Card */}
          {item.name === "stat-card" && (
            showKnobs ? (
              <div className="w-full max-w-sm space-y-3">
                <StatCard
                  title={statTitle}
                  value={statValue}
                  change={statChange}
                  trend={statTrend}
                  caption={statCaption}
                  badge={statBadge ? "Live" : undefined}
                  sparkline={[4, 6, 8, 7, 12, 11, 15, 14, 19]}
                />
              </div>
            ) : (
              <div className="w-full max-w-[245px]">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 text-[var(--text-primary)]">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] truncate">
                      {statTitle}
                    </span>
                    {statBadge && (
                      <span className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1 py-0 font-mono text-[9px] text-[var(--text-muted)]">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <div className="text-lg font-mono font-semibold tracking-tight text-[var(--text-primary)]">
                        {statValue}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--accent-green)]">
                        <span>{statChange}</span>
                        {statCaption && <span className="text-[var(--text-muted)]">{statCaption}</span>}
                      </div>
                    </div>
                    <div className="w-20 h-6 shrink-0">
                      <svg viewBox="0 0 120 32" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="var(--accent-green)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="0,26 15,22 30,25 45,18 60,14 75,16 90,9 105,11 120,4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Sidebar - ACTUAL functioning mini interactive Sidebar */}
          {item.name === "sidebar" && (
            showKnobs ? (
              <div className="w-full max-w-2xl h-[340px] rounded-xl border border-[var(--border)] overflow-hidden shadow-xl flex bg-[var(--bg-main)]">
                {/* Miniature interactive Sidebar */}
                <div
                  className={cn(
                    "flex flex-col h-full border-r border-[var(--border)] bg-[var(--bg-sidebar)] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none shrink-0",
                    sidebarDemoCollapsed ? "w-14" : "w-52"
                  )}
                >
                  {/* Brand Header */}
                  <div className="flex h-11 items-center justify-between px-3 border-b border-[var(--border)] shrink-0">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                        <VectorKiloLogo className="h-5 w-5" />
                      </div>
                      {!sidebarDemoCollapsed && (
                        <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                          kilo<span className="text-[var(--accent-green)]">/</span>ui
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSidebarDemoCollapsed(!sidebarDemoCollapsed)}
                      className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                      title={sidebarDemoCollapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}
                    >
                      <VectorPanelLeftIcon isCollapsed={sidebarDemoCollapsed} className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Nav Items */}
                  {sidebarVariant === "scrollable-categories" ? (
                    <>
                      {/* Fixed Top Items */}
                      <div className="p-2 space-y-1 shrink-0 border-b border-[var(--border)]/40">
                        <div className="flex items-center gap-2 p-1.5 rounded bg-[var(--surface-secondary)] text-[var(--text-primary)] font-medium text-[11px]">
                          <VectorFolderIcon isActive={true} className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
                          {!sidebarDemoCollapsed && <span>Overview</span>}
                        </div>
                        <div className="flex items-center gap-2 p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] text-[11px] transition-colors cursor-pointer">
                          <VectorLayersIcon className="h-3.5 w-3.5 text-[var(--text-primary)] shrink-0" />
                          {!sidebarDemoCollapsed && (
                            <div className="flex items-center justify-between flex-1">
                              <span>Components</span>
                              <span className="font-mono text-[9px] text-[var(--text-muted)]">10</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Independently Scrollable Categories */}
                      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {!sidebarDemoCollapsed && (
                          <div className="px-1 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider pb-1 flex items-center justify-between">
                            <span>Scrollable Categories</span>
                            <span className="text-[8px] text-[var(--accent-green)]">scroll ↓</span>
                          </div>
                        )}
                        <div className="space-y-0.5">
                          {[
                            { name: "Actions", count: 4, active: true },
                            { name: "Forms & Inputs", count: 6 },
                            { name: "Overlays", count: 3 },
                            { name: "Data Display", count: 5 },
                            { name: "Navigation", count: 4 },
                            { name: "Media & Layout", count: 6 },
                            { name: "Motion Primitives", count: 5 },
                            { name: "Feedback & Status", count: 3 },
                          ].map((cat) => (
                            <div
                              key={cat.name}
                              className={cn(
                                "flex items-center gap-2 px-1.5 py-1 rounded text-[11px] transition-colors",
                                cat.active
                                  ? "text-[var(--accent-green)] bg-[var(--surface-secondary)]/60 font-medium"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              <VectorCategoryIcon
                                category={cat.name}
                                isActive={cat.active}
                                className={cn("h-3 w-3 shrink-0", cat.active ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]")}
                              />
                              {!sidebarDemoCollapsed && (
                                <div className="flex items-center justify-between flex-1">
                                  <span className="truncate">{cat.name}</span>
                                  <span className="text-[9px] font-mono text-[var(--text-muted)]">{cat.count}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Unified full scroll */
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      <div className="flex items-center gap-2 p-1.5 rounded bg-[var(--surface-secondary)] text-[var(--text-primary)] font-medium text-[11px]">
                        <VectorFolderIcon isActive={true} className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
                        {!sidebarDemoCollapsed && <span>Overview</span>}
                      </div>
                      <div className="flex items-center gap-2 p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] text-[11px] transition-colors cursor-pointer">
                        <VectorLayersIcon className="h-3.5 w-3.5 text-[var(--text-primary)] shrink-0" />
                        {!sidebarDemoCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>Components</span>
                            <span className="font-mono text-[9px] text-[var(--text-muted)]">10</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-2">
                        {!sidebarDemoCollapsed && (
                          <div className="px-1 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider pb-1">
                            Categories
                          </div>
                        )}
                        <div className="space-y-0.5">
                          {[
                            { name: "Actions", count: 4, active: true },
                            { name: "Forms & Inputs", count: 6 },
                            { name: "Overlays", count: 3 },
                            { name: "Data Display", count: 5 },
                            { name: "Navigation", count: 4 },
                            { name: "Media & Layout", count: 6 },
                            { name: "Motion Primitives", count: 5 },
                            { name: "Feedback & Status", count: 3 },
                          ].map((cat) => (
                            <div
                              key={cat.name}
                              className={cn(
                                "flex items-center gap-2 px-1.5 py-1 rounded text-[11px] transition-colors",
                                cat.active
                                  ? "text-[var(--accent-green)] bg-[var(--surface-secondary)]/60 font-medium"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              <VectorCategoryIcon
                                category={cat.name}
                                isActive={cat.active}
                                className={cn("h-3 w-3 shrink-0", cat.active ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]")}
                              />
                              {!sidebarDemoCollapsed && (
                                <div className="flex items-center justify-between flex-1">
                                  <span className="truncate">{cat.name}</span>
                                  <span className="text-[9px] font-mono text-[var(--text-muted)]">{cat.count}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="p-2 border-t border-[var(--border)] shrink-0 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
                      {!sidebarDemoCollapsed && <span>Registry Active</span>}
                    </div>
                    {!sidebarDemoCollapsed && <span className="text-[9px]">v0.1.0</span>}
                  </div>
                </div>

                {/* Main Content Pane inside Mock App */}
                <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                        Application Content
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSidebarDemoCollapsed(!sidebarDemoCollapsed)}
                        className="h-7 text-xs"
                      >
                        {sidebarDemoCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                      </Button>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      The sidebar smoothly toggles between full 208px navigation and compact 56px mini-bar icon mode.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--border)] bg-[var(--surface-secondary)]/30 p-2.5 font-mono text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                    <span>State: {sidebarDemoCollapsed ? "collapsed (56px)" : "expanded (208px)"}</span>
                    <span className="text-[var(--accent-green)]">⌘B shortcut supported</span>
                  </div>
                </div>
              </div>
            ) : interactive ? (
              <div className="w-full max-w-[400px] h-[155px] rounded-lg border border-[var(--border)] overflow-hidden flex bg-[var(--bg-sidebar)] shadow-md select-none">
                <div className="w-12 border-r border-[var(--border)] flex flex-col items-center py-3 gap-2 shrink-0 bg-[var(--bg-main)]">
                  <VectorKiloLogo className="h-4.5 w-4.5" />
                  <div className="h-px w-6 bg-[var(--border)] my-0.5" />
                  <div className="w-7 h-6 rounded bg-[var(--surface-secondary)] flex items-center justify-center">
                    <VectorFolderIcon isActive className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                  </div>
                  <div className="w-7 h-6 rounded flex items-center justify-center">
                    <VectorLayersIcon className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                  </div>
                </div>
                <div className="flex-1 p-3.5 flex flex-col justify-between bg-[var(--surface-elevated)]/40">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-24 rounded bg-[var(--surface-secondary)]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    </div>
                    <div className="h-2 w-36 rounded bg-[var(--surface-secondary)]/60" />
                    <div className="h-2 w-24 rounded bg-[var(--surface-secondary)]/40" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/60 text-[10px] font-mono text-[var(--text-muted)]">
                    <span>⌘B to toggle</span>
                    <span className="text-[var(--accent-green)]">64px / 256px</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[210px] h-20 rounded-md border border-[var(--border)] overflow-hidden flex bg-[var(--bg-sidebar)] select-none">
                <div className="w-8 border-r border-[var(--border)] flex flex-col items-center py-2 gap-1 shrink-0 bg-[var(--bg-main)]">
                  <VectorKiloLogo className="h-3 w-3" />
                  <div className="h-px w-4 bg-[var(--border)] my-0.5" />
                  <div className="w-5 h-4.5 rounded bg-[var(--surface-secondary)] flex items-center justify-center">
                    <VectorFolderIcon isActive className="h-2.5 w-2.5 text-[var(--accent-green)]" />
                  </div>
                  <div className="w-5 h-4.5 rounded flex items-center justify-center">
                    <VectorLayersIcon className="h-2.5 w-2.5 text-[var(--text-secondary)]" />
                  </div>
                </div>
                <div className="flex-1 p-2.5 flex flex-col justify-center gap-1.5 bg-[var(--surface-elevated)]/30">
                  <div className="h-2 w-16 rounded bg-[var(--surface-secondary)]" />
                  <div className="h-1.5 w-24 rounded bg-[var(--surface-secondary)]/50" />
                  <div className="h-1.5 w-12 rounded bg-[var(--accent-green)]/30 mt-0.5" />
                </div>
              </div>
            )
          )}

          {/* Expanding Card */}
          {item.name === "expanding-card" && (
            showKnobs ? (
              <div className="w-full flex items-center justify-center py-4">
                <ExpandingCard
                  title={expandingTitle}
                  subtitle={expandingSubtitle}
                  badge="Featured"
                  forcedHover={expandingForced}
                />
              </div>
            ) : interactive ? (
              <div className="w-full max-w-sm flex items-center justify-center py-1">
                <ExpandingCard
                  title="Components"
                  subtitle="Hover to expand"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="w-full max-w-[210px] pointer-events-none scale-70 origin-center -my-9">
                <ExpandingCard
                  title="Components"
                  subtitle="Hover to expand"
                  className="p-2 max-w-[210px]"
                />
              </div>
            )
          )}

          {/* Blurred Edge Carousel */}
          {item.name === "blurred-carousel" && (
            showKnobs ? (
              <div className="w-full py-2">
                <BlurredCarousel
                  title={carouselTitle}
                  autoPlay={carouselAutoplay}
                />
              </div>
            ) : interactive ? (
              <div className="w-full py-2">
                <BlurredCarousel
                  title="Featured Templates"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="w-full max-w-[270px] pointer-events-none scale-65 origin-center -my-8">
                <BlurredCarousel
                  title="Templates"
                  className="max-w-[270px]"
                />
              </div>
            )
          )}

          {/* TOC Content Slider */}
          {item.name === "content-slider" && (
            showKnobs ? (
              <div className="w-full flex items-center justify-center py-4">
                <ContentSlider
                  activeId={tocActiveId}
                  onSelect={setTocActiveId}
                  rubberBandEffect={tocRubberBand}
                />
              </div>
            ) : interactive ? (
              <div className="w-full max-w-[260px] py-1">
                <ContentSlider
                  className="max-w-[260px] p-2 text-xs"
                  items={[
                    { id: "installation", label: "Installation", level: 1 },
                    { id: "usage", label: "Usage", level: 1 },
                    { id: "animation", label: "Animation", level: 1 },
                    { id: "api-reference", label: "API Reference", level: 1 },
                  ]}
                />
              </div>
            ) : (
              <div className="w-full max-w-[220px] pointer-events-none scale-90 origin-top -my-2">
                <ContentSlider
                  className="max-w-[220px] p-2 text-[10px]"
                  items={[
                    { id: "installation", label: "Installation", level: 1 },
                    { id: "usage", label: "Usage", level: 1 },
                    { id: "animation", label: "Animation", level: 1 },
                    { id: "api-reference", label: "API Reference", level: 1 },
                  ]}
                />
              </div>
            )
          )}

          {/* Overflown Blended Footer */}
          {item.name === "footer" && (
            showKnobs ? (
              <div className="w-full rounded-xl border border-[var(--border)] overflow-hidden shadow-xs">
                <Footer
                  brandText={footerBrandText}
                  blurBlend={footerBlurBlend}
                  showNewsletter={footerShowNewsletter}
                />
              </div>
            ) : interactive ? (
              <div className="w-full rounded-xl border border-[var(--border)] overflow-hidden max-h-[380px] overflow-y-auto">
                <Footer brandText="kilo/ui" blurBlend={true} />
              </div>
            ) : (
              <div className="w-full pointer-events-none scale-75 origin-top -my-6 rounded-lg border border-[var(--border)] overflow-hidden">
                <Footer brandText="kilo/ui" blurBlend={true} showNewsletter={false} />
              </div>
            )
          )}

          {/* Scroll Marquee */}
          {item.name === "scroll-marquee" && (
            showKnobs ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-full h-80 sm:h-96 overflow-y-auto overflow-x-hidden relative flex flex-col justify-between py-6 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/25 custom-scrollbar px-2">
                  <div className="text-center font-mono text-[11px] text-[var(--text-muted)] py-2.5 select-none border-b border-[var(--border)]/40 mb-6 bg-[var(--surface-secondary)]/30 rounded-md">
                    ↓ Scroll down inside this preview box or scroll wheel to drive motion ↓
                  </div>
                  <div className="my-auto py-4 w-full">
                    <ScrollMarquee
                      text={marqueeText}
                      variant={marqueeVariant}
                      outlineText={marqueeOutline}
                      textColor={marqueeTextColor || undefined}
                      blurColor={marqueeBlurColor}
                    />
                  </div>
                  <div className="text-center font-mono text-[11px] text-[var(--text-muted)] py-2.5 select-none border-t border-[var(--border)]/40 mt-6 bg-[var(--surface-secondary)]/30 rounded-md">
                    ↑ Scroll up to reverse direction or release to spring back ↑
                  </div>
                </div>
              </div>
            ) : interactive ? (
              <div className="w-full py-2">
                <ScrollMarquee
                  text="ENGINEERED FOR HIGH VELOCITY • MINIMAL BY DESIGN • HARDWARE ACCELERATED •"
                  variant="scroll-left"
                  textColor={marqueeTextColor || undefined}
                  blurColor={marqueeBlurColor}
                />
              </div>
            ) : (
              <div className="w-full pointer-events-none scale-85 origin-center -my-2">
                <ScrollMarquee
                  text="KILO / UI • MOTION PRIMITIVES •"
                  variant="scroll-left"
                />
              </div>
            )
          )}

          {/* Directional Marquee */}
          {item.name === "directional-marquee" && (
            showKnobs ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-full h-80 sm:h-96 overflow-y-auto overflow-x-hidden relative flex flex-col justify-between py-6 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/25 custom-scrollbar px-2">
                  <div className="text-center font-mono text-[11px] text-[var(--text-muted)] py-2.5 select-none border-b border-[var(--border)]/40 mb-6 bg-[var(--surface-secondary)]/30 rounded-md">
                    ↓ Scroll down with mouse wheel to drive Track 1 ➔ / Track 2 ⬅ ↓
                  </div>
                  <div className="my-auto py-4 w-full">
                    <DirectionalMarquee
                      manualDirection={dirMarqueeDir}
                      showHud={dirMarqueeHud}
                      textColor={dirMarqueeTextColor || undefined}
                      blurColor={dirMarqueeBlurColor}
                    />
                  </div>
                  <div className="text-center font-mono text-[11px] text-[var(--text-muted)] py-2.5 select-none border-t border-[var(--border)]/40 mt-6 bg-[var(--surface-secondary)]/30 rounded-md">
                    ↑ Scroll up with mouse wheel to drive Track 1 ⬅ / Track 2 ➔ ↑
                  </div>
                </div>
              </div>
            ) : interactive ? (
              <div className="w-full py-2">
                <DirectionalMarquee
                  manualDirection="auto"
                  showHud={true}
                  textColor={dirMarqueeTextColor || undefined}
                  blurColor={dirMarqueeBlurColor}
                />
              </div>
            ) : (
              <div className="w-full pointer-events-none scale-85 origin-center -my-2">
                <DirectionalMarquee
                  manualDirection="auto"
                  showHud={false}
                />
              </div>
            )
          )}

          {/* Kinetic Motion Text */}
          {item.name === "kinetic-text" && (
            showKnobs ? (
              <div className="w-full flex items-center justify-center py-8">
                <KineticText
                  text={kineticText}
                  variant={kineticVariant}
                />
              </div>
            ) : interactive ? (
              <div className="w-full flex items-center justify-center py-6">
                <KineticText
                  text="KILO / MOTION UI"
                  variant="rubber-band"
                />
              </div>
            ) : (
              <div className="w-full flex items-center justify-center pointer-events-none scale-80 origin-center py-2">
                <KineticText
                  text="KILO / UI"
                  variant="rubber-band"
                />
              </div>
            )
          )}

          {/* Liquid Glass Search Bar */}
          {(item.name === "search-bar" || item.name === "liquid-glass-search-bar") && (
            showKnobs ? (
              <div className="w-full flex flex-col items-center">
                {/* Showcase Canvas: optical glass canvas for liquid glass, direct stage canvas for normal minimal variants */}
                {(() => {
                  const isLiquidGlass =
                    searchBarVariant === "downward-expand" ||
                    searchBarVariant === "circle-popout" ||
                    searchBarVariant === "liquid-glass" ||
                    searchBarVariant === "popout";

                  if (!isLiquidGlass) {
                    return (
                      <div className="w-full flex flex-col items-center justify-center py-12 min-h-[260px]">
                        <div className="relative z-30 flex flex-col items-center w-full">
                          <SearchBar
                            placeholder={searchBarPlaceholder}
                            value={searchBarQuery}
                            onChange={setSearchBarQuery}
                            expanded={searchBarExpanded}
                            onExpandedChange={setSearchBarExpanded}
                            variant={searchBarVariant as any}
                            onSelectResult={(selected) => {
                              setSearchBarSelectedTitle(selected.title);
                              setTimeout(() => setSearchBarSelectedTitle(null), 3500);
                            }}
                            onSearch={(q) => {
                              setSearchBarSelectedTitle(`"${q}"`);
                              setTimeout(() => setSearchBarSelectedTitle(null), 3500);
                            }}
                          />
                        </div>

                        {/* Toast notification on selection */}
                        {searchBarSelectedTitle && (
                          <div className="relative z-30 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-200 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md flex items-center gap-2 shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                            <span>Selected: <strong>{searchBarSelectedTitle}</strong></span>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      className={cn(
                        "w-full rounded-2xl border relative overflow-hidden flex flex-col items-center justify-start p-8 sm:p-14 min-h-[460px] transition-colors duration-200",
                        "bg-white border-slate-200/90 shadow-sm dark:bg-[#090c12] dark:border-white/10 dark:shadow-2xl"
                      )}
                    >
                      {/* Only render tactile grain and refractive light pools for authentic liquid-glass */}
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 dark:opacity-40" />
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply dark:opacity-25 dark:mix-blend-overlay"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "repeat",
                        }}
                      />
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-72 rounded-full pointer-events-none blur-3xl opacity-60 bg-gradient-to-b from-blue-100/70 via-indigo-100/40 to-transparent dark:opacity-30 dark:from-blue-600 dark:via-indigo-800 dark:to-transparent" />
                      <div className="absolute -bottom-24 right-10 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-40 bg-gradient-to-tr from-cyan-100/60 to-transparent dark:opacity-20 dark:from-cyan-600 dark:to-blue-900" />

                      {/* Clean Search Bar Container */}
                      <div className="relative z-30 flex flex-col items-center w-full pt-8">
                        <SearchBar
                          placeholder={searchBarPlaceholder}
                          value={searchBarQuery}
                          onChange={setSearchBarQuery}
                          expanded={searchBarExpanded}
                          onExpandedChange={setSearchBarExpanded}
                          variant={searchBarVariant as any}
                          onSelectResult={(selected) => {
                            setSearchBarSelectedTitle(selected.title);
                            setTimeout(() => setSearchBarSelectedTitle(null), 3500);
                          }}
                          onSearch={(q) => {
                            setSearchBarSelectedTitle(`"${q}"`);
                            setTimeout(() => setSearchBarSelectedTitle(null), 3500);
                          }}
                        />
                      </div>

                      {/* Toast notification on selection */}
                      {searchBarSelectedTitle && (
                        <div className="relative z-30 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-200 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md flex items-center gap-2 shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected: <strong>{searchBarSelectedTitle}</strong></span>
                        </div>
                      )}
                    </div>
                  );
                })()}
          </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full max-w-[420px] flex items-center justify-center py-5 px-6 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface-secondary)]/40 via-[var(--surface-elevated)]/30 to-[var(--surface-elevated)]/20 overflow-hidden shadow-xs">
                  {/* Subtle ambient lighting pool to reveal glass refraction */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-28 rounded-full pointer-events-none blur-2xl opacity-40 bg-gradient-to-b from-blue-500/30 to-transparent" />
                  <div className="relative z-10 w-full flex items-center justify-center">
                    <SearchBar
                      placeholder="Search components..."
                      variant={searchBarVariant as any}
                      showShortcut={true}
                    />
                  </div>
                </div>
              </div>
            )
          )}

          {/* Minimalist Login Live Preview */}
          {item.name === "minimalist-login" && (
            <div className="w-full flex items-center justify-center py-4">
              <MinimalistLogin
                variant={loginVariant}
                borderRadius={loginRadius}
                sphereMotion={loginSphereMotion}
                interactiveDots={loginInteractiveDots}
                rotationSpeed={loginRotationSpeed}
              />
            </div>
          )}

          {/* Horizon Login Live Preview */}
          {item.name === "horizon-login" && (
            <div className="w-full flex items-center justify-center py-4">
              <HorizonLogin
                defaultTab={horizonLoginDefaultTab}
                horizonSpeed={horizonLoginSpeed}
                glowIntensity={horizonLoginGlowIntensity}
                grain={horizonLoginGrain}
              />
            </div>
          )}

          {/* Blueprint Login Live Preview */}
          {item.name === "blueprint-login" && (
            <div className="w-full flex items-center justify-center py-4">
              <BlueprintLogin
                defaultTab={bpLoginDefaultTab}
                expandRatio={bpExpandRatio}
                neighborWave={bpNeighborWave}
                rotationY={bpRotationY}
                rotationX={bpRotationX}
              />
            </div>
          )}

          {/* Concave Carousel Live Preview matching Images 2 and 3 */}
          {item.name === "concave-carousel" && (
            <div className="w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl">
              <ConcaveCarousel
                preset={concavePreset}
                autoplay={concaveAutoplay}
                background={concaveBg}
                aspect={concaveAspect}
                size={concaveSize}
                curvature={concaveCurvature}
                distance={concaveDistance}
                tilt={concaveTilt}
                gap={concaveGap}
                radius={concaveRadius}
                reflection={concaveReflection}
                dim={concaveDim}
                speed={concaveSpeed}
                interval={concaveInterval}
                inertia={concaveInertia}
                snap={concaveSnap}
                wheel={concaveWheel}
                draggable={concaveDraggable}
                pauseOnHover={concavePauseOnHover}
                captions={concaveCaptions}
                controls={concaveControls}
                paused={concavePaused}
                className={showKnobs ? "h-[440px] sm:h-[500px]" : "h-full w-full"}
              />
            </div>
          )}

          {/* Prismatic Slats Background Live Preview matching Images 4 and 5 */}
          {item.name === "prismatic-slats-bg" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl"}
              style={{ height: showKnobs ? 440 : "100%" }}
            >
              <PrismaticSlatsBg
                preset={slatPreset}
                background={slatBg}
                primary={slatPrimary}
                secondary={slatSecondary}
                angle={slatAngle}
                flutes={slatFlutes}
                refraction={slatRefraction}
                aberration={slatAberration}
                softness={slatSoftness}
                wave={slatWave}
                waveFrequency={slatWaveFreq}
                drift={slatDrift}
                highlight={slatHighlight}
                highlightSoftness={slatHighlightSoft}
                lightAngle={slatLightAngle}
                radius={slatRadius}
                momentum={slatMomentum}
                swirl={slatSwirl}
                intensity={slatIntensity}
                trail={slatTrail}
                texture={slatTexture}
                grain={slatGrainVal}
                speed={slatSpeed}
                interactive={slatInteractive}
                paused={slatPaused}
                autoplay={slatAutoplay}
              />
            </div>
          )}

          {/* Grainy Grid Shader Live Preview */}
          {item.name === "grainy-grid-shader" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl"}
              style={{ height: showKnobs ? 440 : "100%" }}
            >
              <GrainyGridShader
                variant={gridVariant}
                grain={gridGrain}
                roughness={gridRoughness}
                columns={gridColumns}
                rows={gridRows}
                cellSize={gridCellSize}
                speed={gridSpeed}
                interactiveRadius={gridRadius}
                autoWave={gridAutoWave}
                interactive={gridInteractive}
              />
            </div>
          )}

          {/* Grainy Horizon Shader Live Preview (Smooth Static Radiant Shader with Liquid Aura Cursor) */}
          {item.name === "grainy-horizon-shader" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative"}
              style={{ height: showKnobs ? 440 : "100%" }}
            >
              <GrainyHorizonShader
                color={horizonColor}
                secondaryColor={horizonSecondaryColor}
                glowIntensity={horizonGlowIntensity}
                glowSpread={horizonGlowSpread}
                liquidCursor={horizonLiquidCursor}
                cursorIntensity={horizonCursorIntensity}
              />
            </div>
          )}

          {/* Firefly Cursor Live Interactive Simulation Preview */}
          {item.name === "firefly-cursor" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-black relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-black relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <FireflyCursor
                preset={cursorPreset}
                color={cursorColor}
                coolingColor={cursorCoolingColor}
                intensity={cursorIntensity}
                trailWidth={cursorTrailWidth}
                linger={cursorLinger}
                glow={cursorGlow}
                hotspot={cursorHotspot}
                followSpeed={cursorFollowSpeed}
                grain={cursorGrain}
                quality={cursorQuality}
                clickBurst={cursorClickBurst}
                enabled={cursorEnabled}
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none z-10">
                <span className="font-mono text-[10px] tracking-widest uppercase text-amber-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                  Fluid Dynamics Simulation
                </span>
                <div className="space-y-1 max-w-md mt-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Firefly Cursor
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Move swiftly across the canvas to generate advection eddies. Click to release cooling ember sparks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ethereal Smoke Shader Live Interactive Preview (Chai AI type Volumetric Smoke) */}
          {item.name === "ethereal-smoke-shader" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#05060a] relative" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#05060a] relative"}
              style={{ height: showKnobs ? 440 : "100%" }}
            >
              <EtherealSmokeShader
                preset={smokePreset}
                origin={smokeOrigin}
                originX={smokeOriginX}
                originY={smokeOriginY}
                coreColor={smokeCoreColor}
                smokeColor={smokeColor}
                atmoColor={smokeAtmoColor}
                bgColor={smokeBgColor}
                intensity={smokeIntensity}
                spread={smokeSpread}
                turbulence={smokeTurbulence}
                speed={smokeSpeed}
                mouseStrength={smokeMouseStrength}
                mouseSpread={smokeMouseSpread}
                trailWidth={smokeTrailWidth}
                trailLinger={smokeTrailLinger}
                grain={smokeGrain}
                vignette={smokeVignette}
                interactive={smokeInteractive}
                className="w-full h-full"
              />
            </div>
          )}

                    {/* Contour Tide Live Interactive Preview */}
          {item.name === "contour-tide" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative"}
              style={{ height: showKnobs ? 480 : "100%" }}
            >
              <ContourTide
                preset={tidePreset}
                backgroundColor={tideBg}
                waterColor={tideWater}
                crestColor={tideCrest}
                density={tideDensity}
                particleSize={tideParticleSize}
                waveHeight={tideWaveHeight}
                choppiness={tideChoppiness}
                wavelength={tideWavelength}
                windAngle={tideWindAngle}
                horizon={tideHorizon}
                fog={tideFog}
                glow={tideGlow}
                foam={tideFoam}
                speed={tideSpeed}
                parallax={tideParallax}
                swell={tideSwell}
                swellRadius={tideSwellRadius}
                seed={tideSeed}
                interactive={tideInteractive}
                clickRipples={tideClickRipples}
                paused={tidePaused}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center select-none pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white/80 font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    Ocean of Particles Rolling in Waves
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    Contour Tide
                  </h2>
                  <p className="text-xs sm:text-sm text-white/70 max-w-md font-sans">
                    Interactive 3D particle sea undulating with Gerstner wave harmonics, cursor swell displacement, and propagating ripple rings.
                  </p>
                  <div className="flex items-center gap-3 mt-2 pointer-events-auto">
                    <button className="px-5 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all cursor-pointer shadow-lg">
                      Explore Particles
                    </button>
                    <button className="px-5 py-2 rounded-full text-xs font-semibold border border-white/30 text-white hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md">
                      Click to Ripple
                    </button>
                  </div>
                </div>
              </ContourTide>
            </div>
          )}

          {/* Liquid Metal Background Live Interactive Preview */}
          {item.name === "liquid-metal-background" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl relative"}
              style={{ height: showKnobs ? 440 : "100%" }}
            >
              <LiquidMetalBackground
                colorTone={metalTone}
                intensity={metalIntensity}
                speed={metalSpeed}
                interactive={metalInteractive}
                theme={metalTheme}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center select-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--accent-green)] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)]/80 border border-[var(--border)] backdrop-blur-xs">
                    Raymarched Fluid SDFs
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                    Liquid Metal Background
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-sans">
                    Flowing reflective liquid-chrome ribbons with orbiting mercury beads, studio HDRI reflections, and fluid surface tension.
                  </p>
                </div>
              </LiquidMetalBackground>
            </div>
          )}

          {/* Morph Node Ring Live Interactive Preview */}
          {item.name === "morph-node-ring" && (
            <div className="w-full flex items-center justify-center p-4 sm:p-8 relative select-none">
              <MorphNodeRing
                nodeCount={ringNodeCount}
                mode={ringMode}
                nodeSize={ringNodeSize}
                radius={ringRadius}
                loop={ringLoop}
                speed={ringSpeed}
                design={ringDesign}
                enableRotation={ringEnableRotation}
                rotationSpeed={ringRotationSpeed}
                keepImagesUpright={ringKeepUpright}
              />
            </div>
          )}

          {/* Glass Reveal Live Interactive WebGL Shader Preview */}
          {item.name === "glass-reveal" && (
            <div className="w-full flex items-center justify-center p-2 sm:p-6 relative select-none">
              <GlassReveal
                image={glassRevealImage}
                shape={glassRevealShape}
                size={glassRevealSize}
                softness={glassRevealSoftness}
                distortion={glassRevealDistortion}
                aberration={glassRevealAberration}
                wobble={glassRevealWobble}
                wobbleSpeed={glassRevealWobbleSpeed}
                waveFrequency={glassRevealWaveFrequency}
                waveStrength={glassRevealWaveStrength}
                waveSpeed={glassRevealWaveSpeed}
                grain={glassRevealGrain}
                grainSpeed={glassRevealGrainSpeed}
                grayscale={glassRevealGrayscale}
                dim={glassRevealDim}
                follow={glassRevealFollow}
                returnToCenter={glassRevealReturnToCenter}
                fallback={glassRevealFallback}
                paused={glassRevealPaused}
                className="w-full max-w-4xl h-[380px] sm:h-[460px] shadow-2xl border border-[var(--border)]"
              />
            </div>
          )}

          {/* Target Cursor / Magnetic Cursor Live Interactive Preview (React Bits) */}
          {item.name === "magnetic-cursor" && (
            <div
              ref={targetCursorStageRef}
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#090b10] relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#090b10] relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <TargetCursor
                container={targetCursorStageRef}
                variant={magVariant}
                cursorColor={magColor}
                cursorColorOnTarget={magColorOnTarget || undefined}
                spinDuration={magSpinDuration}
                hoverDuration={magHoverDuration}
                parallaxOn={magParallaxOn}
                hideDefaultCursor={magHideDefaultCursor}
                size={magSize}
                cornerSize={magCornerSize}
                thickness={magThickness}
                padding={magPadding}
                matchRadius={magMatchRadius}
                dotSize={magDotSize}
                blendMode={magBlend}
                showLabel={magShowLabel}
                clickEffect={magClickEffect}
              />
              <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center select-none pointer-events-auto">
                <span className="font-mono text-[10px] tracking-widest uppercase text-lime-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                  Reticle Brackets &amp; Target Lock
                </span>
                <div className="space-y-1 max-w-md">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Target Cursor
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Spinning reticle brackets that magnetically snap to interactive targets, match corner radiuses, and show floating labels.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                  <button
                    type="button"
                    className="cursor-target px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-colors cursor-pointer"
                    data-cursor-label="EXPLORE"
                  >
                    Explore Target
                  </button>
                  <button
                    type="button"
                    className="cursor-target px-5 py-2.5 rounded-full text-xs font-semibold bg-lime-500/20 hover:bg-lime-500/30 border border-lime-500/40 text-lime-300 transition-colors cursor-pointer"
                    data-cursor-label="LAUNCH"
                  >
                    Launch System
                  </button>
                  <button
                    type="button"
                    className="cursor-target px-5 py-2.5 rounded-md text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 transition-colors cursor-pointer"
                    data-cursor-label="PLAY REEL"
                  >
                    Play Reel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Neon Ribbon Cursor Live Interactive Preview */}
          {item.name === "neon-ribbon-cursor" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#05060a] relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#05060a] relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <NeonRibbonCursor
                variant={ribbonVariant}
                primaryColor={ribbonHeadColor}
                secondaryColor={ribbonTailColor}
                ribbonWidth={ribbonWidth}
                trailLength={ribbonTrailLength}
                tension={ribbonTension}
                glow={ribbonGlow}
                waveSpeed={ribbonWaveSpeed}
                clickBurst={ribbonBurst}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center select-none pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                    Quad-Strip Ribbon Spline
                  </span>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Neon Ribbon Cursor
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Move rapidly to create flowing ribbon sweeps. Click anywhere to trigger neon spark bursts.
                    </p>
                  </div>
                  <div className="flex gap-2 text-[11px] font-mono text-neutral-500 mt-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">3D Spline</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Speed Flares</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Click Embers</span>
                  </div>
                </div>
              </NeonRibbonCursor>
            </div>
          )}

          {/* Quantum Particles Cursor Live Interactive Preview */}
          {item.name === "quantum-particles-cursor" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#060710] relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#060710] relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <QuantumParticlesCursor
                variant={quantumVariant}
                color={quantumColor}
                secondaryColor={quantumSecondary}
                particleCount={quantumParticleCount}
                connectDistance={quantumConnectDist}
                forceMode={quantumForce}
                gravity={quantumGravity}
                cursorRadius={quantumRadius}
                shockwave={quantumShockwave}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center select-none pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-sky-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                    Constellation Laser Filaments
                  </span>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Quantum Particles Cursor
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Particle network with gravitational laser filaments. Click to unleash an expanding quantum shockwave.
                    </p>
                  </div>
                  <div className="flex gap-2 text-[11px] font-mono text-neutral-500 mt-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Gravity Well</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Synaptic Mesh</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Shockwave Pulse</span>
                  </div>
                </div>
              </QuantumParticlesCursor>
            </div>
          )}

          {/* Spotlight Cursor Live Interactive Preview */}
          {item.name === "spotlight-cursor" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#040406] relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#040406] relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <SpotlightCursor
                variant={spotlightVariant}
                color={spotlightColor}
                radius={spotlightRadius}
                falloff={spotlightFalloff}
                ambientDarkness={spotlightDarkness}
                springTension={spotlightTension}
                revealGrid={spotlightGrid}
                specular={spotlightSpecular}
                pulseOnClick={spotlightPulse}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center select-none pointer-events-none">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full text-left">
                    <div className="p-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Sector 01</span>
                      <h4 className="text-sm font-semibold text-white mt-1">Optical Focus</h4>
                      <p className="text-xs text-neutral-400 mt-1">Feathered inverse-square theatrical falloff cone.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Sector 02</span>
                      <h4 className="text-sm font-semibold text-white mt-1">Grid Telemetry</h4>
                      <p className="text-xs text-neutral-400 mt-1">Cybernetic grid revealed under the light beam.</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-4 font-mono">
                    Sweep your cursor across the dark stage • Click to flash specular lens
                  </p>
                </div>
              </SpotlightCursor>
            </div>
          )}

          {/* Elastic Blob Cursor Live Interactive Preview */}
          {item.name === "elastic-blob-cursor" && (
            <div
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#08090f] relative select-none" : "w-full h-full min-h-[340px] sm:min-h-[380px] bg-[#08090f] relative select-none"}
              style={{ height: showKnobs ? 520 : "100%", minHeight: showKnobs ? 520 : 340 }}
            >
              <ElasticBlobCursor
                variant={blobVariant}
                color={blobColor}
                secondaryColor={blobSecondary}
                blobSize={blobSize}
                viscosity={blobViscosity}
                springTension={blobTension}
                droplets={blobDroplets}
                gooeyStrength={blobGooeyStrength}
                wobbleSpeed={blobWobble}
                specular={blobSpecular}
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center select-none pointer-events-none">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-violet-400 font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xs">
                    SVG Gooey Metasphere
                  </span>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Elastic Blob Cursor
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Organic liquid metasphere with feColorMatrix filter fusion, jelly wobble, and satellite droplets.
                    </p>
                  </div>
                  <div className="flex gap-2 text-[11px] font-mono text-neutral-500 mt-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Liquid Gooey</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Satellite Droplets</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Specular Glint</span>
                  </div>
                </div>
              </ElasticBlobCursor>
            </div>
          )}

          {/* Skeleton */}
          {item.name === "skeleton" && (
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto">
              {skeletonVariant === "card" ? (
                <SkeletonCard
                  variant={skeletonGlow ? "glow" : "shimmer"}
                  hasCanvas
                  canvasHeight="h-36 sm:h-40"
                  lines={skeletonLines}
                  className="w-full shadow-lg"
                />
              ) : skeletonVariant === "avatar" ? (
                <div className="w-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-4">
                  <div className="flex items-center gap-3.5">
                    <SkeletonAvatar size="lg" shape={skeletonShape === "rounded" ? "rounded" : "circular"} variant={skeletonVariant} />
                    <div className="space-y-2 flex-1">
                      <Skeleton shape="rounded" variant={skeletonVariant} accentGlow={skeletonGlow} className="h-4 w-36" />
                      <Skeleton shape="text" variant={skeletonVariant} className="h-3 w-48" />
                    </div>
                  </div>
                  <SkeletonText lines={skeletonLines} variant={skeletonVariant} />
                </div>
              ) : skeletonVariant === "text" ? (
                <div className="w-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                  <Skeleton shape="rounded" variant={skeletonVariant} accentGlow={skeletonGlow} className="h-5 w-40 mb-2" />
                  <SkeletonText lines={skeletonLines} variant={skeletonVariant} />
                  <div className="flex items-center gap-2 pt-2">
                    <SkeletonButton size="sm" variant={skeletonVariant} />
                    <SkeletonButton size="sm" variant={skeletonVariant} className="w-16" />
                  </div>
                </div>
              ) : skeletonVariant === "canvas" ? (
                <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg border border-[var(--border)]">
                  <SkeletonCanvas
                    label="RENDER_PIPELINE"
                    coordinates="DIM: 1920x1080 // GL_ES_3"
                    variant={skeletonVariant === "shimmer" ? "shimmer" : "pulse"}
                    showReticle
                    className="h-full"
                  />
                </div>
              ) : (
                /* Shimmer / Pulse / Wave / Glow Showcase */
                <div className="w-full p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-4 shadow-md">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]/60">
                    <div className="flex items-center gap-2.5">
                      <SkeletonAvatar size="sm" variant={skeletonVariant} shape={skeletonShape === "circular" ? "circular" : "rounded"} />
                      <Skeleton shape="rounded" variant={skeletonVariant} accentGlow={skeletonGlow} className="h-4 w-28" />
                    </div>
                    <SkeletonBadge variant={skeletonVariant} />
                  </div>
                  <SkeletonText lines={skeletonLines} variant={skeletonVariant} widths={["100%", "88%", "60%"]} />
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      <SkeletonButton size="sm" variant={skeletonVariant} accentGlow={skeletonGlow} />
                      <SkeletonButton size="sm" variant={skeletonVariant} className="w-16" />
                    </div>
                    <Skeleton shape="pill" variant={skeletonVariant} className="h-6 w-12" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Bottom Sheet */}
          {item.name === "mobile-bottom-sheet" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Store Checkout"
                subtitle="KILO ARCHIVE"
                actions={
                  <button
                    type="button"
                    onClick={() => setMobileBottomSheetOpen(true)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold transition-colors cursor-pointer",
                      isLightMode
                        ? "bg-black text-white hover:bg-neutral-800"
                        : "bg-white text-black hover:bg-neutral-200"
                    )}
                  >
                    Open Sheet
                  </button>
                }
              >
                {/* Screen Content Under Sheet */}
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">ORDER #RFC-902</span>
                      <h3 className="text-base font-bold">Technical Shell 3L</h3>
                    </div>
                    <span className="font-mono text-sm font-bold">$245.00</span>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-2xl border flex items-center justify-center h-40 transition-colors",
                      isLightMode ? "border-neutral-200 bg-neutral-100" : "border-neutral-800 bg-neutral-900/60"
                    )}
                  >
                    <div className="text-center space-y-1">
                      <ShoppingBag className="h-8 w-8 mx-auto text-neutral-400" />
                      <p className="text-xs font-mono text-neutral-500">[ MODULAR APPAREL 01 ]</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Colorway</span>
                      <span className="font-medium">Raw Black // Triple Dye</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Fit</span>
                      <span className="font-medium">Oversized Relaxed</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Delivery</span>
                      <span className="text-emerald-500 font-semibold">Free Express</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileBottomSheetOpen(true)}
                    className={cn(
                      "w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer mt-auto",
                      isLightMode
                        ? "bg-black text-white hover:bg-neutral-800"
                        : "bg-white text-black hover:bg-neutral-200"
                    )}
                  >
                    View Order Details
                  </button>
                </div>

                {/* In-Chassis Bottom Sheet */}
                <MobileBottomSheet
                  open={mobileBottomSheetOpen}
                  onOpenChange={setMobileBottomSheetOpen}
                  inline={true}
                  snapPoints={
                    mobileBottomSheetVariant === "compact"
                      ? [0.32, 0.55]
                      : mobileBottomSheetVariant === "full-expand"
                      ? [0.94]
                      : [0.42, 0.88]
                  }
                  title={mobileBottomSheetTitle}
                  description={
                    mobileBottomSheetVariant === "compact"
                      ? "Quick express swipe sheet"
                      : mobileBottomSheetVariant === "full-expand"
                      ? "Full-height expanded modal drawer"
                      : "M3 multi-snap physics with velocity fling"
                  }
                  showHandle={mobileBottomSheetHandle}
                  backdropBlur={mobileBottomSheetBlur}
                  footer={
                    <button
                      type="button"
                      onClick={() => setMobileBottomSheetOpen(false)}
                      className={cn(
                        "w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer active:scale-95",
                        isLightMode
                          ? "bg-black text-white hover:bg-neutral-800 shadow-2xs"
                          : "bg-white text-black hover:bg-neutral-200"
                      )}
                    >
                      Confirm & Pay $245.00
                    </button>
                  }
                >
                  <div className={cn("space-y-3 text-xs", isLightMode ? "text-neutral-700" : "text-neutral-300")}>
                    <div
                      className={cn(
                        "p-3 rounded-xl border space-y-1.5 font-mono text-[11px]",
                        isLightMode
                          ? "border-neutral-200 bg-neutral-100/70"
                          : "border-neutral-800 bg-neutral-900/60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={isLightMode ? "text-neutral-500" : "text-neutral-400"}>Item:</span>
                        <span className={cn("font-bold", isLightMode ? "text-neutral-900" : "text-white")}>Technical Shell 3L</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isLightMode ? "text-neutral-500" : "text-neutral-400"}>Dispatch:</span>
                        <span className="text-emerald-500 font-bold">Standard 2-Day Air</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={isLightMode ? "text-neutral-500" : "text-neutral-400"}>Subtotal:</span>
                        <span className={cn("font-bold", isLightMode ? "text-neutral-900" : "text-white")}>$245.00</span>
                      </div>
                    </div>
                    <p className={cn("text-[11px] leading-relaxed font-sans", isLightMode ? "text-neutral-500" : "text-neutral-400")}>
                      Swipe downward or drag the tactile monochrome handle to dismiss.
                    </p>
                  </div>
                </MobileBottomSheet>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Swipe Action Card */}
          {item.name === "swipe-action-card" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Activity Feed"
                subtitle="GESTURE SWIPES"
                actions={
                  <span className="text-[10px] font-mono text-neutral-400">
                    {swipeActionCount > 0 ? `${swipeActionCount} triggers` : "Swipe cards"}
                  </span>
                }
              >
                <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Interactive Damped Drawers
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500">
                      {swipeLastAction || "Ready"}
                    </span>
                  </div>

                  {/* Card 1 */}
                  <SwipeActionCard
                    threshold={swipeActionThreshold}
                    disabled={swipeActionDisabled}
                    leftActions={
                      swipeActionCardVariant === "destructive-right"
                        ? []
                        : [
                            {
                              id: "pin",
                              label: "Pin",
                              icon: <Pin className="h-4 w-4" />,
                              onClick: () => {
                                setSwipeActionCount((c) => c + 1);
                                setSwipeLastAction("Pinned #01");
                              },
                            },
                            ...(swipeActionCardVariant === "dual-drawer"
                              ? [
                                  {
                                    id: "archive",
                                    label: "Archive",
                                    icon: <Archive className="h-4 w-4" />,
                                    onClick: () => {
                                      setSwipeActionCount((c) => c + 1);
                                      setSwipeLastAction("Archived #01");
                                    },
                                  },
                                ]
                              : []),
                          ]
                    }
                    rightActions={[
                      {
                        id: "delete",
                        label: "Delete",
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: "destructive",
                        onClick: () => {
                          setSwipeActionCount((c) => c + 1);
                          setSwipeLastAction("Deleted #01");
                        },
                      },
                    ]}
                    onActionTrigger={(actionId) => {
                      setSwipeActionCount((c) => c + 1);
                      setSwipeLastAction(`Action: ${actionId}`);
                    }}
                  >
                    <div
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between transition-colors",
                        isLightMode
                          ? "border-neutral-200 bg-white shadow-2xs"
                          : "border-neutral-800/80 bg-neutral-900/90"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <h4 className="text-xs font-bold">Sync Dispatch #RFC-902</h4>
                        </div>
                        <p className="text-[11px] text-neutral-500">Order verification completed</p>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">Just now</span>
                    </div>
                  </SwipeActionCard>

                  {/* Card 2 */}
                  <SwipeActionCard
                    threshold={swipeActionThreshold}
                    disabled={swipeActionDisabled}
                    leftActions={
                      swipeActionCardVariant === "destructive-right"
                        ? []
                        : [
                            {
                              id: "favorite",
                              label: "Star",
                              icon: <Heart className="h-4 w-4" />,
                              onClick: () => {
                                setSwipeActionCount((c) => c + 1);
                                setSwipeLastAction("Starred #02");
                              },
                            },
                          ]
                    }
                    rightActions={[
                      {
                        id: "remove",
                        label: "Trash",
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: "destructive",
                        onClick: () => {
                          setSwipeActionCount((c) => c + 1);
                          setSwipeLastAction("Trashed #02");
                        },
                      },
                    ]}
                    onActionTrigger={(actionId) => {
                      setSwipeActionCount((c) => c + 1);
                      setSwipeLastAction(`Action: ${actionId}`);
                    }}
                  >
                    <div
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between transition-colors",
                        isLightMode
                          ? "border-neutral-200 bg-white shadow-2xs"
                          : "border-neutral-800/80 bg-neutral-900/90"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <h4 className="text-xs font-bold">Telemetry Node 04</h4>
                        </div>
                        <p className="text-[11px] text-neutral-500">Sub-millisecond frame dispatch</p>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">12m ago</span>
                    </div>
                  </SwipeActionCard>

                  {/* Card 3 */}
                  <SwipeActionCard
                    threshold={swipeActionThreshold}
                    disabled={swipeActionDisabled}
                    leftActions={
                      swipeActionCardVariant === "destructive-right"
                        ? []
                        : [
                            {
                              id: "pin",
                              label: "Pin",
                              icon: <Pin className="h-4 w-4" />,
                              onClick: () => {
                                setSwipeActionCount((c) => c + 1);
                                setSwipeLastAction("Pinned #03");
                              },
                            },
                          ]
                    }
                    rightActions={[
                      {
                        id: "dismiss",
                        label: "Dismiss",
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: "destructive",
                        onClick: () => {
                          setSwipeActionCount((c) => c + 1);
                          setSwipeLastAction("Dismissed #03");
                        },
                      },
                    ]}
                  >
                    <div
                      className={cn(
                        "p-3.5 rounded-xl border flex items-center justify-between transition-colors",
                        isLightMode
                          ? "border-neutral-200 bg-white shadow-2xs"
                          : "border-neutral-800/80 bg-neutral-900/90"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          <h4 className="text-xs font-bold">AST Schema Guard</h4>
                        </div>
                        <p className="text-[11px] text-neutral-500">All 5 mobile primitives validated</p>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">1h ago</span>
                    </div>
                  </SwipeActionCard>

                  <p className="text-[11px] text-center text-neutral-500 pt-3">
                    Drag horizontally to engage spring resistance & action drawers
                  </p>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Thumb Segment Controller */}
          {item.name === "thumb-segment-controller" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Analytics"
                subtitle="THUMB ZONE"
              >
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  {/* Thumb Segment Controller */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                      Ergonomic Segment Control
                    </span>
                    <ThumbSegmentController
                      size={thumbSegmentVariant as any}
                      value={thumbSegmentValue}
                      onChange={setThumbSegmentValue}
                      fullWidth={thumbSegmentFullWidth}
                      items={[
                        { id: "day", label: "Day" },
                        { id: "week", label: "Week", badge: 3 },
                        { id: "month", label: "Month" },
                        { id: "year", label: "Year" },
                      ]}
                    />
                  </div>

                  {/* Dynamic Metrics Card reacting to selected segment */}
                  <div
                    className={cn(
                      "p-4 rounded-2xl border space-y-3 transition-colors",
                      isLightMode
                        ? "border-neutral-200 bg-white shadow-2xs"
                        : "border-neutral-800/80 bg-neutral-900/60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        Active Period: {thumbSegmentValue.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-500">+18.4%</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-2xl font-bold font-mono tracking-tight">
                        {thumbSegmentValue === "day"
                          ? "$1,240.00"
                          : thumbSegmentValue === "week"
                          ? "$8,940.50"
                          : thumbSegmentValue === "month"
                          ? "$34,200.00"
                          : "$412,000.00"}
                      </div>
                      <p className="text-xs text-neutral-500">
                        {thumbSegmentValue === "day"
                          ? "24-hour telemetry revenue"
                          : thumbSegmentValue === "week"
                          ? "7-day rolling transaction volume"
                          : thumbSegmentValue === "month"
                          ? "30-day active gross metrics"
                          : "Annual trailing operational run-rate"}
                      </p>
                    </div>

                    <div className="h-16 flex items-end gap-1.5 pt-2">
                      {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-neutral-800/40 hover:bg-neutral-800 transition-colors relative overflow-hidden"
                          style={{ height: "100%" }}
                        >
                          <div
                            className={cn(
                              "w-full rounded-sm absolute bottom-0 transition-all duration-300",
                              i === 5
                                ? "bg-[var(--accent-green)]"
                                : isLightMode
                                ? "bg-neutral-900"
                                : "bg-neutral-600"
                            )}
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Thumb Controller demo */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                      Filter Mode
                    </span>
                    <ThumbSegmentController
                      size="sm"
                      value={thumbSegmentValue === "day" ? "all" : thumbSegmentValue === "week" ? "audio" : "gear"}
                      onChange={(val) => {
                        if (val === "all") setThumbSegmentValue("day");
                        else if (val === "audio") setThumbSegmentValue("week");
                        else setThumbSegmentValue("month");
                      }}
                      items={[
                        { id: "all", label: "All Items" },
                        { id: "audio", label: "Audio Gear" },
                        { id: "gear", label: "Accessories" },
                      ]}
                    />
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Pull To Refresh */}
          {item.name === "pull-to-refresh" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Protocol Stream"
                subtitle="FEED GESTURES"
                actions={
                  <span className="text-[10px] font-mono text-emerald-500">
                    Live Sync
                  </span>
                }
              >
                <div className="relative flex-1 h-full overflow-hidden">
                  <PullToRefresh
                    pullThreshold={
                      pullToRefreshVariant === "smooth-dampened" ? 88 : pullToRefreshThreshold
                    }
                    maxPull={pullToRefreshVariant === "smooth-dampened" ? 140 : 120}
                    disabled={pullToRefreshDisabled}
                    onRefresh={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 1100));
                      setPullRefreshCount((c) => c + 1);
                      const now = new Date();
                      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setPullItems((prev) => [
                        {
                          id: String(Date.now()),
                          title: `Buffer Sync #${prev.length + 1}`,
                          desc: "Telemetry packet refreshed with zero dropped frames",
                          time: timeStr,
                        },
                        ...prev.slice(0, 4),
                      ]);
                    }}
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pb-1">
                        <span>PULL DOWN TO REFRESH</span>
                        <span>{pullItems.length} items</span>
                      </div>

                      {pullItems.map((pi, idx) => (
                        <div
                          key={pi.id}
                          className={cn(
                            "p-3.5 rounded-xl border space-y-1 transition-all duration-300",
                            idx === 0 && pullRefreshCount > 1 && "ring-1 ring-[var(--accent-green)]/40",
                            isLightMode
                              ? "border-neutral-200 bg-white shadow-2xs"
                              : "border-neutral-800/80 bg-neutral-900/80"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{pi.title}</span>
                            <span className="text-[10px] font-mono text-neutral-400">{pi.time}</span>
                          </div>
                          <p className="text-[11px] text-neutral-500">{pi.desc}</p>
                        </div>
                      ))}

                      <div className="text-center pt-3 pb-6">
                        <p className="text-[10px] font-mono text-neutral-500">
                          {pullToRefreshVariant === "smooth-dampened"
                            ? "Dampened log tension physics active"
                            : "M3 tactile gesture threshold active"}
                        </p>
                      </div>
                    </div>
                  </PullToRefresh>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Floating Action Dock */}
          {item.name === "floating-action-dock" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Workspace"
                subtitle="DOCK NAVIGATION"
                actions={
                  <span className="text-[10px] font-mono text-neutral-400">
                    Pos: {floatingActionDockVariant}
                  </span>
                }
              >
                <div className="relative flex-1 flex flex-col h-full overflow-hidden">
                  {/* Scrollable interior body */}
                  <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold capitalize">
                        {floatingDockActive === "home"
                          ? "Home Dashboard"
                          : floatingDockActive === "explore"
                          ? "Explore Primitives"
                          : "Notifications"}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-500">Active Tab</span>
                    </div>

                    {[
                      { title: "Modular Architecture", desc: "Design system token pipeline configured", time: "10m" },
                      { title: "Mobile Gestures", desc: "Touch fling physics calibrated for 60fps", time: "42m" },
                      { title: "Dynamic Safe Areas", desc: "iOS bottom bar inset padding active", time: "2h" },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3.5 rounded-xl border space-y-1 transition-colors",
                          isLightMode
                            ? "border-neutral-200 bg-white shadow-2xs"
                            : "border-neutral-800/80 bg-neutral-900/60"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{card.title}</span>
                          <span className="text-[10px] font-mono text-neutral-400">{card.time}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500">{card.desc}</p>
                      </div>
                    ))}

                    <p className="text-[11px] text-center text-neutral-500 pt-4">
                      Tap floating action dock items below to toggle active route
                    </p>
                  </div>

                  {/* The Floating Action Dock anchored to phone simulator bottom */}
                  <FloatingActionDock
                    className="absolute"
                    position={
                      floatingActionDockVariant === "right"
                        ? "right"
                        : "center"
                    }
                    primaryAction={
                      floatingDockShowPrimary
                        ? {
                            label: "Add",
                            icon: <Plus className="h-4 w-4" />,
                            onClick: () => {
                              setFloatingDockBadge((b) => b + 1);
                            },
                          }
                        : undefined
                    }
                    items={[
                      {
                        id: "home",
                        label: "Home",
                        icon: <Home className="h-4 w-4" />,
                        active: floatingDockActive === "home",
                        onClick: () => setFloatingDockActive("home"),
                      },
                      {
                        id: "explore",
                        label: "Explore",
                        icon: <Compass className="h-4 w-4" />,
                        active: floatingDockActive === "explore",
                        onClick: () => setFloatingDockActive("explore"),
                      },
                      {
                        id: "alerts",
                        label: "Alerts",
                        icon: <Bell className="h-4 w-4" />,
                        badge: floatingDockBadge,
                        active: floatingDockActive === "alerts",
                        onClick: () => setFloatingDockActive("alerts"),
                      },
                    ]}
                  />
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Button */}
          {item.name === "m3-button" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Buttons" subtitle="ACTIONS">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured State</span>
                    <div className="flex justify-center py-2">
                      <M3Button
                        variant={m3BtnVariant}
                        size={m3BtnSize}
                        isLoading={m3BtnLoading}
                        disabled={m3BtnDisabled}
                      >
                        {m3BtnLabel}
                      </M3Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Material 3 Variants</span>
                    <div className="grid grid-cols-2 gap-2">
                      <M3Button variant="filled" size="sm">Filled</M3Button>
                      <M3Button variant="elevated" size="sm">Elevated</M3Button>
                      <M3Button variant="tonal" size="sm">Tonal</M3Button>
                      <M3Button variant="outlined" size="sm">Outlined</M3Button>
                    </div>
                    <div className="flex justify-center pt-1">
                      <M3Button variant="text" size="sm">Text Button</M3Button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Minimal SaaS Variants</span>
                    <div className="grid grid-cols-2 gap-2">
                      <M3Button variant="minimal-solid" size="sm">Minimal Solid</M3Button>
                      <M3Button variant="minimal-outline" size="sm">Minimal Outline</M3Button>
                    </div>
                    <div className="flex justify-center pt-1">
                      <M3Button variant="minimal-ghost" size="sm">Minimal Ghost</M3Button>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 FAB */}
          {item.name === "m3-fab" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis
                isLightMode={isLightMode}
                title="Tasks & Notes"
                subtitle="ACTIONS"
                actions={<M3Fab size="sm" icon={<Plus className="h-4 w-4" />} />}
              >
                <div className="relative flex-1 flex flex-col p-4 overflow-y-auto">
                  <div className="space-y-2.5 pb-20">
                    {[
                      { title: "Design Sprint Review", time: "10:00 AM", tag: "Design" },
                      { title: "M3 Palette Engine Token Sync", time: "1:30 PM", tag: "Eng" },
                      { title: "AST Guardrail Schema Test", time: "4:00 PM", tag: "Ops" },
                    ].map((task, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-3 rounded-xl border space-y-1 transition-colors",
                          isLightMode ? "border-neutral-200 bg-white" : "border-neutral-800 bg-neutral-900/60"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{task.title}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">{task.tag}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">{task.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Configured Floating FAB with Speed Dial Menu */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <M3Fab
                      size={m3FabSize}
                      variant={m3FabVariant === "minimal" ? "minimal" : "primary"}
                      label={m3FabLabel}
                      icon={<Plus className="h-5 w-5" />}
                      menuItems={[
                        { id: "note", label: "New Task", icon: <Edit3 className="h-4 w-4" /> },
                        { id: "sync", label: "Sync Telemetry", icon: <RefreshCw className="h-4 w-4" /> },
                        { id: "share", label: "Share Sprint", icon: <Share2 className="h-4 w-4" /> },
                      ]}
                    />
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Segmented Button */}
          {item.name === "m3-segmented-button" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Segmented Button" subtitle="ACTIONS">
                <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      {m3SegmentVariant === "multi-select" ? "Multi Select (Filter Tags)" : "Single Select (M3 Pill)"}
                    </span>
                    <M3SegmentedButton
                      value={m3SegmentVariant === "multi-select" ? m3MultiSegmentVal : m3SegmentVal}
                      onChange={m3SegmentVariant === "multi-select" ? setM3MultiSegmentVal : setM3SegmentVal}
                      multiSelect={m3SegmentVariant === "multi-select"}
                      options={[
                        { id: "day", label: "Day" },
                        { id: "week", label: "Week" },
                        { id: "month", label: "Month" },
                        { id: "year", label: "Year" },
                      ]}
                      variant={m3SegmentVariant === "minimal" ? "minimal" : "default"}
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Active Segment Range</span>
                    <h4 className="text-sm font-bold font-sans">
                      Metrics for: {Array.isArray(m3SegmentVariant === "multi-select" ? m3MultiSegmentVal : m3SegmentVal) ? (m3SegmentVariant === "multi-select" ? m3MultiSegmentVal : [m3SegmentVal]).join(", ").toUpperCase() : String(m3SegmentVal).toUpperCase()}
                    </h4>
                    <p className="text-xs text-neutral-500">Live preview reacts instantly to segmented control changes with smooth M3 spring indicator.</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Minimal SaaS Style</span>
                    <M3SegmentedButton
                      value={m3SegmentVal}
                      onChange={setM3SegmentVal}
                      variant="minimal"
                      options={[
                        { id: "all", label: "All" },
                        { id: "unread", label: "Unread", badge: 3 },
                        { id: "flagged", label: "Flagged" },
                      ]}
                    />
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Icon Button */}
          {item.name === "m3-icon-button" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Icon Buttons" subtitle="ACTIONS">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-center space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured State</span>
                    <div className="flex justify-center">
                      <M3IconButton
                        variant={m3IconBtnVariant}
                        selected={m3IconBtnSelected}
                        onSelectedChange={setM3IconBtnSelected}
                        icon={<Heart className="h-5 w-5" />}
                        selectedIcon={<Heart className="h-5 w-5 fill-red-500 text-red-500" />}
                      />
                    </div>
                    <span className="text-xs text-neutral-500 block">Tap to toggle selected state</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">M3 Styles</span>
                    <div className="flex items-center justify-around p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
                      <M3IconButton variant="standard" icon={<Bookmark className="h-5 w-5" />} />
                      <M3IconButton variant="filled" icon={<Share2 className="h-5 w-5" />} />
                      <M3IconButton variant="tonal" icon={<Star className="h-5 w-5" />} />
                      <M3IconButton variant="outlined" icon={<Bell className="h-5 w-5" />} />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Minimal SaaS Style</span>
                    <div className="flex items-center justify-around p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
                      <M3IconButton variant="minimal" icon={<MoreVertical className="h-4 w-4" />} />
                      <M3IconButton variant="minimal" icon={<Volume2 className="h-4 w-4" />} />
                      <M3IconButton variant="minimal" icon={<Folder className="h-4 w-4" />} />
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Switch */}
          {item.name === "m3-switch" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Switches" subtitle="SELECTION">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured Switch</span>
                    <M3Switch
                      checked={m3SwitchChecked}
                      onChange={setM3SwitchChecked}
                      showIcon={m3SwitchIcons}
                      variant={m3SwitchVariant === "minimal" ? "minimal" : "default"}
                      label="Push Notifications"
                      description="Real-time alert delivery"
                    />
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Preferences</span>
                    <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                      <M3Switch
                        defaultChecked={true}
                        showIcon={true}
                        label="Haptic Feedback"
                        description="Vibrate on action triggers"
                      />
                      <div className="h-px bg-[var(--border)]" />
                      <M3Switch
                        defaultChecked={false}
                        showIcon={true}
                        label="Location Telemetry"
                        description="Stream GPS positioning"
                      />
                      <div className="h-px bg-[var(--border)]" />
                      <M3Switch
                        defaultChecked={true}
                        variant="minimal"
                        label="Minimal SaaS Mode"
                        description="High density 1px boundary"
                      />
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Checkbox */}
          {item.name === "m3-checkbox" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Checkboxes" subtitle="SELECTION">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured Checkbox</span>
                    <M3Checkbox
                      checked={m3CheckboxChecked}
                      onChange={setM3CheckboxChecked}
                      variant={m3CheckboxVariant === "minimal" ? "minimal" : "default"}
                      label="Enable Edge Analytics"
                      description="Direct cluster sync"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Task Checklist</span>
                    <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                      <M3Checkbox defaultChecked={true} label="Material 3 tokens synced" />
                      <div className="h-px bg-[var(--border)]" />
                      <M3Checkbox defaultChecked="indeterminate" label="AST verification pass" description="Partial compliance" />
                      <div className="h-px bg-[var(--border)]" />
                      <M3Checkbox defaultChecked={false} label="Publish to npm registry" />
                      <div className="h-px bg-[var(--border)]" />
                      <M3Checkbox defaultChecked={true} variant="minimal" label="Minimal SaaS Checkbox" description="Clean sharp borders" />
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Radio */}
          {item.name === "m3-radio" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Radio Buttons" subtitle="SELECTION">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Shipping Method (M3 Concentric)</span>
                    <M3RadioGroup
                      value={m3RadioVal}
                      onChange={setM3RadioVal}
                      variant={m3RadioVariant === "minimal" ? "minimal" : "default"}
                      options={[
                        { id: "standard", label: "Standard Shipping", description: "3-5 business days • Free" },
                        { id: "express", label: "Express Overnight", description: "Guaranteed 24h • $14.00" },
                        { id: "priority", label: "Priority Courier", description: "Same day dispatch • $28.00" },
                      ]}
                    />
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Selected Carrier</span>
                    <p className="text-xs font-mono font-bold text-[var(--text-primary)]">{m3RadioVal.toUpperCase()} SELECTED</p>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Slider */}
          {item.name === "m3-slider" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Sliders" subtitle="SELECTION">
                <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured Slider</span>
                    <M3Slider
                      value={m3SliderVal}
                      onChange={setM3SliderVal}
                      min={0}
                      max={100}
                      showValue={true}
                      label="Volume Output"
                      variant={m3SliderVariant === "minimal" ? "minimal" : "default"}
                    />
                  </div>

                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Audio Equalizer</span>
                    <M3Slider defaultValue={45} min={0} max={100} label="Bass Boost" showValue />
                    <M3Slider defaultValue={80} min={0} max={100} label="Treble Frequency" showValue />
                    <M3Slider defaultValue={60} min={0} max={100} label="Minimal SaaS Slider" variant="minimal" showValue />
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Chip */}
          {item.name === "m3-chip" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Chips" subtitle="SELECTION">
                <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Interactive Filter Chips</span>
                    <div className="flex flex-wrap gap-2">
                      {m3ChipsList.map((chipName) => {
                        const isSelected = m3SelectedChips.includes(chipName);
                        return (
                          <M3Chip
                            key={chipName}
                            chipType="filter"
                            selected={isSelected}
                            onSelectedChange={() => {
                              setM3SelectedChips((prev) =>
                                isSelected ? prev.filter((c) => c !== chipName) : [...prev, chipName]
                              );
                            }}
                            icon={<Sparkles className="h-4 w-4" />}
                          >
                            {chipName}
                          </M3Chip>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Assist &amp; Input Chips</span>
                    <div className="flex flex-wrap gap-2">
                      <M3Chip chipType="assist" icon={<Calendar className="h-4 w-4" />}>
                        Add to Sprint
                      </M3Chip>
                      <M3Chip chipType="suggestion">
                        Suggest Review
                      </M3Chip>
                      <M3Chip
                        chipType="input"
                        onDelete={() => {
                          setM3ChipsList((prev) => prev.slice(0, -1));
                        }}
                      >
                        Alice (Removable)
                      </M3Chip>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Minimal SaaS Chips</span>
                    <div className="flex flex-wrap gap-2">
                      <M3Chip variant="minimal" selected={true}>SaaS Active</M3Chip>
                      <M3Chip variant="minimal">Telemetry</M3Chip>
                      <M3Chip variant="minimal">Production</M3Chip>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Text Field */}
          {item.name === "m3-text-field" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Text Fields" subtitle="INPUTS">
                <div className="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">Configured Field</span>
                    <M3TextField
                      variant={m3TextVariant}
                      label="Workspace Email"
                      value={m3TextVal}
                      labelBgClassName={isLightMode ? "bg-white" : "bg-[var(--bg-main)]"}
                      onChange={(e) => setM3TextVal(e.target.value)}
                      helperText="Your registered team email"
                      leadingIcon={<User className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[var(--border)]/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">Outlined Notch (M3)</span>
                    <M3TextField
                      variant="outlined"
                      label="Password"
                      type="password"
                      defaultValue="supersecret"
                      labelBgClassName={isLightMode ? "bg-white" : "bg-[var(--bg-main)]"}
                      leadingIcon={<Lock className="h-4 w-4" />}
                      helperText="Minimum 8 characters"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">Filled Container (M3)</span>
                    <M3TextField
                      variant="filled"
                      label="Account Handle"
                      defaultValue="@antigravity"
                      leadingIcon={<Sparkles className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/40">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">Minimal SaaS Input</span>
                    <M3TextField
                      variant="minimal"
                      label="API Key"
                      defaultValue="kilo_sec_991823a"
                    />
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Search Bar */}
          {item.name === "m3-search-bar" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Search Bar" subtitle="INPUTS">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  <M3SearchBar
                    value={m3SearchVal}
                    onChange={setM3SearchVal}
                    placeholder="Search documents & code..."
                    variant={m3SearchVariant === "minimal" ? "minimal" : "default"}
                    suggestions={["Material Design 3 tokens", "Bottom sheets", "Navigation rail", "Fling gestures"]}
                    recentSearches={["Segmented button", "Floating action dock", "Pull to refresh"]}
                  />

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Search State</span>
                    <p className="text-xs text-neutral-500">
                      {m3SearchVal ? `Filtering by: "${m3SearchVal}"` : "Tap search bar to view recent queries & suggestions"}
                    </p>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Navigation Bar */}
          {item.name === "m3-navigation-bar" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Navigation Bar" subtitle="NAVIGATION">
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Current Screen</span>
                      <h4 className="text-sm font-bold capitalize">{m3NavTab} Destination</h4>
                      <p className="text-xs text-neutral-500">Notice the active pill indicator (64x32) with spring physics and badge indicators.</p>
                    </div>
                  </div>

                  {/* Bottom Navigation Bar */}
                  <M3NavigationBar
                    value={m3NavTab}
                    onChange={setM3NavTab}
                    variant={m3NavVariant === "minimal" ? "minimal" : "default"}
                    destinations={[
                      { id: "home", label: "Home", icon: <Home className="h-5 w-5" /> },
                      { id: "explore", label: "Explore", icon: <Compass className="h-5 w-5" /> },
                      { id: "alerts", label: "Alerts", icon: <Bell className="h-5 w-5" />, badge: 3 },
                      { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
                    ]}
                  />
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Top App Bar */}
          {item.name === "m3-top-app-bar" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode}>
                <div className="flex-1 flex flex-col overflow-hidden">
                  <M3TopAppBar
                    variant={m3AppBarVariant}
                    title="Essential Archive"
                    subtitle="Kilo Studio"
                    navigationIcon={<ArrowLeft className="h-5 w-5" />}
                    actions={
                      <div className="flex items-center gap-1">
                        <M3IconButton variant="standard" icon={<Search className="h-5 w-5" />} />
                        <M3IconButton variant="standard" icon={<MoreVertical className="h-5 w-5" />} />
                      </div>
                    }
                  />

                  <div className="flex-1 p-4 space-y-2.5 overflow-y-auto">
                    {[
                      { title: "Technical Shell 3L", desc: "Triple dye waterproof ripstop monochrome", price: "$245" },
                      { title: "Oversized Heavy Tee", desc: "Raw black 320gsm jersey cotton", price: "$65" },
                      { title: "Cargo Utility Pant", desc: "Modular pouch attachments with YKK zips", price: "$180" },
                    ].map((card, i) => (
                      <div key={i} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold">{card.title}</p>
                          <p className="text-[10px] text-neutral-500">{card.desc}</p>
                        </div>
                        <span className="text-xs font-mono font-bold">{card.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Navigation Drawer */}
          {item.name === "m3-navigation-drawer" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Navigation Drawer" subtitle="NAVIGATION">
                <div className="relative flex-1 flex flex-col p-4 justify-between overflow-hidden">
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500">M3 Modal Navigation Drawer with active destination pill, scrim overlay, and badge counters.</p>
                    <button
                      type="button"
                      onClick={() => setM3DrawerOpen(true)}
                      className={cn(
                        "w-full py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer",
                        isLightMode ? "bg-black text-white hover:bg-neutral-800" : "bg-white text-black hover:bg-neutral-200"
                      )}
                    >
                      Open Modal Drawer
                    </button>
                  </div>

                  <M3NavigationDrawer
                    open={m3DrawerOpen}
                    onOpenChange={setM3DrawerOpen}
                    value={m3DrawerVal}
                    onChange={setM3DrawerVal}
                    title="Kilo Mail"
                    subtitle="dev@kiloui.com"
                    variant={m3DrawerVariant === "minimal" ? "minimal" : "default"}
                    destinations={[
                      { id: "inbox", label: "Inbox", icon: <Bell className="h-5 w-5" />, badge: 12 },
                      { id: "outbox", label: "Outbox", icon: <Send className="h-5 w-5" /> },
                      { id: "favorites", label: "Favorites", icon: <Star className="h-5 w-5" />, badge: 3 },
                      { id: "trash", label: "Trash", icon: <Trash2 className="h-5 w-5" /> },
                    ]}
                  />
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Tabs */}
          {item.name === "m3-tabs" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Tabs" subtitle="NAVIGATION">
                <div className="flex-1 flex flex-col overflow-hidden">
                  <M3Tabs
                    value={m3TabsVal}
                    onChange={setM3TabsVal}
                    type={m3TabsVariant === "secondary" ? "secondary" : m3TabsVariant === "minimal" ? "minimal" : "primary"}
                    tabs={[
                      { id: "overview", label: "Overview" },
                      { id: "specs", label: "Specs", badge: 2 },
                      { id: "reviews", label: "Reviews" },
                    ]}
                  />

                  <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {m3TabsVal === "overview" && (
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                        <h4 className="text-sm font-bold">Overview Tab Content</h4>
                        <p className="text-xs text-neutral-500">M3 Primary tabs feature underline active indicator with spring transition.</p>
                      </div>
                    )}
                    {m3TabsVal === "specs" && (
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                        <h4 className="text-sm font-bold">Specifications</h4>
                        <p className="text-xs text-neutral-500">320gsm heavyweight cotton, reinforced flatlock seams, waterproof zippers.</p>
                      </div>
                    )}
                    {m3TabsVal === "reviews" && (
                      <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                        <h4 className="text-sm font-bold">Verified Reviews (4.9/5)</h4>
                        <p className="text-xs text-neutral-500">&quot;Exceptional material quality and clean gesture physics.&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Card */}
          {item.name === "m3-card" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Cards" subtitle="SURFACES">
                <div className="flex-1 flex flex-col p-4 space-y-3.5 overflow-y-auto">
                  <M3Card
                    variant={m3CardVariant}
                    headline="Technical Shell 3L"
                    subhead="Oversized fit • Modular Series"
                    media={
                      <div className="h-32 w-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                        <ShoppingBag className="h-10 w-10 text-neutral-400" />
                      </div>
                    }
                    actions={
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-sm font-bold">$245.00</span>
                        <M3Button size="sm">Quick Buy</M3Button>
                      </div>
                    }
                  >
                    <p className="text-xs text-neutral-500">Triple dye waterproof ripstop monochrome with ergonomic magnetic storm hood.</p>
                  </M3Card>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Card Variants</span>
                    <div className="grid grid-cols-2 gap-2">
                      <M3Card variant="elevated" headline="Elevated Card"><p className="text-[10px] text-neutral-500">M3 Surface Elevation</p></M3Card>
                      <M3Card variant="outlined" headline="Outlined Card"><p className="text-[10px] text-neutral-500">1px Crisp Border</p></M3Card>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Shaped Image Card */}
          {item.name === "shaped-image-card" && (
            <div className="w-full flex flex-col items-center justify-center py-6 px-4 space-y-8 max-w-4xl mx-auto">
              {viewport === "mobile" ? (
                <MobilePreviewChassis isLightMode={isLightMode} title="Gallery" subtitle="SHAPED CARDS">
                  <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                    <ShapedImageCard
                      shape={shapedCardShape}
                      layout={shapedCardLayout}
                      aspectRatio={shapedCardAspect}
                      glow={shapedCardGlow}
                      showBorder={shapedCardBorder}
                      imageSrc={SHAPED_CARD_IMAGES[shapedCardImageIdx].url}
                      title={SHAPED_CARD_IMAGES[shapedCardImageIdx].title}
                      subtitle={SHAPED_CARD_IMAGES[shapedCardImageIdx].subtitle}
                      badge={SHAPED_CARD_IMAGES[shapedCardImageIdx].badge}
                      description={SHAPED_CARD_IMAGES[shapedCardImageIdx].desc}
                      primaryAction={{
                        label: "Explore Space",
                        onClick: () => {},
                      }}
                    />

                    {/* Quick Shape Selector in Mobile Preview */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        Quick Shapes
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(["arch", "ticket", "hexagon", "blob", "shield", "star", "diamond", "heart"] as ImageCardShape[]).map(
                          (sh) => (
                            <button
                              key={sh}
                              type="button"
                              onClick={() => setShapedCardShape(sh)}
                              className={cn(
                                "py-1.5 px-2 rounded-lg text-[10px] font-mono capitalize transition-all border cursor-pointer text-center",
                                shapedCardShape === sh
                                  ? "bg-[var(--accent-green)] text-black font-bold border-transparent"
                                  : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)]"
                              )}
                            >
                              {sh}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </MobilePreviewChassis>
              ) : (
                <div className="w-full flex flex-col items-center space-y-8">
                  {/* Hero Featured Card with current customization */}
                  <div className="w-full max-w-sm sm:max-w-md">
                    <ShapedImageCard
                      shape={shapedCardShape}
                      layout={shapedCardLayout}
                      aspectRatio={shapedCardAspect}
                      glow={shapedCardGlow}
                      showBorder={shapedCardBorder}
                      imageSrc={SHAPED_CARD_IMAGES[shapedCardImageIdx].url}
                      title={SHAPED_CARD_IMAGES[shapedCardImageIdx].title}
                      subtitle={SHAPED_CARD_IMAGES[shapedCardImageIdx].subtitle}
                      badge={SHAPED_CARD_IMAGES[shapedCardImageIdx].badge}
                      description={SHAPED_CARD_IMAGES[shapedCardImageIdx].desc}
                      primaryAction={{
                        label: "Explore Space",
                        onClick: () => {},
                      }}
                      secondaryAction={{
                        label: "Bookmark",
                        onClick: () => {},
                      }}
                    />
                  </div>

                  {/* Multi-Shape Comparison Gallery */}
                  <div className="w-full space-y-3 pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                        Shape Preset Archetypes
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        Click any shape to apply
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {(
                        [
                          { shape: "square", label: "Sharp Square" },
                          { shape: "rounded", label: "Squircle" },
                          { shape: "circle", label: "Circular Portal" },
                          { shape: "pill", label: "Capsule Pill" },
                          { shape: "arch", label: "Cathedral Arch" },
                          { shape: "ticket", label: "Cinema Ticket" },
                          { shape: "hexagon", label: "Honeycomb" },
                          { shape: "blob", label: "Organic Blob" },
                          { shape: "shield", label: "Heraldic Shield" },
                          { shape: "star", label: "Starburst" },
                          { shape: "diamond", label: "Rhombus" },
                          { shape: "scallop", label: "Floral Rosette" },
                          { shape: "cut-corner", label: "Cyber Chamfer" },
                          { shape: "heart", label: "Smooth Heart" },
                          { shape: "triangle", label: "Triangle" },
                          { shape: "parallelogram", label: "Parallelogram" },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.shape}
                          type="button"
                          onClick={() => setShapedCardShape(item.shape as ImageCardShape)}
                          className={cn(
                            "group p-2.5 rounded-2xl border transition-all text-left flex flex-col items-center space-y-2 cursor-pointer",
                            shapedCardShape === item.shape
                              ? "bg-[var(--surface-secondary)] border-[var(--accent-green)] shadow-md"
                              : "bg-[var(--surface-elevated)]/50 border-[var(--border)] hover:border-[var(--border-hover)]"
                          )}
                        >
                          <div className="w-16 h-20 overflow-hidden">
                            <ShapedImageCard
                              shape={item.shape as ImageCardShape}
                              layout="overlay"
                              aspectRatio="4/5"
                              imageSrc={SHAPED_CARD_IMAGES[shapedCardImageIdx].url}
                              showBorder={false}
                              interactive={false}
                            />
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-mono text-center truncate w-full",
                              shapedCardShape === item.shape
                                ? "text-[var(--accent-green)] font-bold"
                                : "text-[var(--text-muted)]"
                            )}
                          >
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3D Depth Carousel (Standalone Component Preview) */}
          {item.name === "3d-depth-carousel" && (
            <div className="relative w-full flex flex-col items-center justify-center py-6 px-2 sm:px-4 max-w-4xl mx-auto overflow-visible bg-transparent">
              <div className="w-full max-w-3xl py-4 flex flex-col items-center overflow-visible bg-transparent">
                <Depth3dCarousel
                  size={depthCarouselSize}
                  tiltAngle={depthCarouselTilt}
                  activeIndex={depthCarouselIndex}
                  onChange={setDepthCarouselIndex}
                  onReserve={(it) => showCarouselToast(`Reserving ${it.title}`)}
                  onBookmark={(it, saved) => showCarouselToast(saved ? `Saved ${it.title}` : `Removed ${it.title}`)}
                />
              </div>

              {carouselToast && (
                <div className="fixed bottom-6 z-50 px-4 py-2 rounded-full bg-[#1b2234] border border-[#8083ff]/40 text-xs font-mono text-[#c0c1ff] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {carouselToast}
                </div>
              )}
            </div>
          )}

          {/* Property Specs Grid Card */}
          {item.name === "specs-grid-card" && (
            <div className="w-full max-w-md mx-auto py-8 px-4 flex flex-col items-center">
              <SpecsGridCard
                title="Villa Specs"
                badge="Instant Confirmation"
                metrics={[
                  { label: "Max Guests", value: specsGuests },
                  { label: "King Suites", value: 2 },
                  { label: "Hot Spring", value: 1 },
                ]}
              />
            </div>
          )}

          {/* Host Trust Card */}
          {item.name === "host-trust-card" && (
            <div className="relative w-full max-w-md mx-auto py-8 px-4 flex flex-col items-center">
              <HostTrustCard
                name="Kenji Sato"
                role="Master timber architect"
                responseTime="Responds in 10m"
                avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                verified={hostVerified}
                onChat={() => showCarouselToast("Direct chat channel connected")}
              />
              {carouselToast && (
                <div className="fixed bottom-6 z-50 px-4 py-2 rounded-full bg-[#1b2234] border border-[#8083ff]/40 text-xs font-mono text-[#c0c1ff] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {carouselToast}
                </div>
              )}
            </div>
          )}

          {/* Booking Action Bar */}
          {item.name === "booking-action-bar" && (
            <div className="relative w-full max-w-md mx-auto py-8 px-4 flex flex-col items-center space-y-4">
              <div className="w-full p-4 rounded-2xl bg-[#090d16] border border-[#1b2234]">
                <BookingActionBar
                  primaryLabel="Check Availability"
                  price={{ amount: "$420", period: "/ night" }}
                  sticky={bookingSticky}
                  onPrimaryClick={() => showCarouselToast("Checking reservation calendar...")}
                  onSecondaryClick={() => showCarouselToast("Sanctuary URL copied to clipboard")}
                />
              </div>
              {carouselToast && (
                <div className="fixed bottom-6 z-50 px-4 py-2 rounded-full bg-[#1b2234] border border-[#8083ff]/40 text-xs font-mono text-[#c0c1ff] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {carouselToast}
                </div>
              )}
            </div>
          )}

          {/* Curated Filter Bar */}
          {item.name === "curated-filter-bar" && (
            <div className="relative w-full max-w-lg mx-auto py-8 px-4 flex flex-col items-center">
              <div className="w-full p-4 rounded-2xl bg-[#090d16] border border-[#1b2234]">
                <CuratedFilterBar
                  collectionTitle="Nocturne Sanctuaries"
                  collectionTag="CURATED COLLECTION"
                  availableCount="14 available"
                  filterCount={3}
                  activeFilter={curatedActiveFilter}
                  onSelectFilter={(id) => {
                    setCuratedActiveFilter(id);
                    showCarouselToast(`Switched to filter: ${id}`);
                  }}
                  onFilterClick={() => showCarouselToast("Opening advanced filters modal...")}
                />
              </div>
              {carouselToast && (
                <div className="fixed bottom-6 z-50 px-4 py-2 rounded-full bg-[#1b2234] border border-[#8083ff]/40 text-xs font-mono text-[#c0c1ff] shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {carouselToast}
                </div>
              )}
            </div>
          )}

          {/* M3 Dialog */}
          {item.name === "m3-dialog" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Dialogs" subtitle="SURFACES">
                <div className="relative flex-1 flex flex-col p-4 justify-between overflow-hidden">
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500">M3 Alert Dialog featuring 28px rounded corners, header icon, and tonal buttons.</p>
                    <button
                      type="button"
                      onClick={() => setM3DialogOpen(true)}
                      className={cn(
                        "w-full py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer",
                        isLightMode ? "bg-black text-white hover:bg-neutral-800" : "bg-white text-black hover:bg-neutral-200"
                      )}
                    >
                      Trigger Material Dialog
                    </button>
                  </div>

                  <M3Dialog
                    open={m3DialogOpen}
                    onOpenChange={setM3DialogOpen}
                    headline="Discard draft?"
                    supportingText="Any unsaved telemetry modifications will be permanently discarded from local device storage."
                    confirmLabel="Discard"
                    dismissLabel="Cancel"
                    icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
                    variant={m3DialogVariant === "minimal" ? "minimal" : "default"}
                    onConfirm={() => setM3DialogOpen(false)}
                    onDismiss={() => setM3DialogOpen(false)}
                  />
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Snackbar */}
          {item.name === "m3-snackbar" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Snackbars" subtitle="FEEDBACK">
                <div className="relative flex-1 flex flex-col p-4 justify-between overflow-hidden">
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500">Floating inverse-surface notification bar with action and dismiss triggers.</p>
                    <button
                      type="button"
                      onClick={() => setM3SnackbarOpen(true)}
                      className={cn(
                        "w-full py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer",
                        isLightMode ? "bg-black text-white hover:bg-neutral-800" : "bg-white text-black hover:bg-neutral-200"
                      )}
                    >
                      Show Snackbar
                    </button>
                  </div>

                  {m3SnackbarOpen && (
                    <div className="pb-2">
                      <M3Snackbar
                        message={m3SnackbarMsg}
                        actionLabel="Undo"
                        onAction={() => setM3SnackbarOpen(false)}
                        onDismiss={() => setM3SnackbarOpen(false)}
                        variant={m3SnackbarVariant === "minimal" ? "minimal" : "default"}
                      />
                    </div>
                  )}
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Progress Indicator & Physics Loaders */}
          {item.name === "m3-progress-indicator" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Loaders & Progress" subtitle="FEEDBACK">
                <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                  {/* Clean Variant Quick Filter Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[10px] font-mono shrink-0">
                    {[
                      { id: "circular", label: "Circular" },
                      { id: "linear", label: "Linear" },
                      { id: "squiggly-circular", label: "Squiggly Circle" },
                      { id: "squiggly-horizontal", label: "Squiggly Wave" },
                      { id: "shape-morph", label: "M3 Morph" },
                      { id: "elastic-line", label: "Elastic Physics" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setM3ProgressVariant(tab.id);
                          onVariantChange?.(tab.id);
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-semibold",
                          m3ProgressVariant === tab.id
                            ? "bg-[var(--accent-green)] text-[var(--bg-main)] shadow-xs"
                            : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Hero Showcase Display (Clean, Zero Box-in-Box Nesting) */}
                  <div className="flex-1 flex flex-col items-center justify-center min-h-[260px] py-6 px-2">
                    {m3ProgressVariant === "squiggly-horizontal" ? (
                      <div className="w-full py-6 flex flex-col items-center justify-center space-y-4">
                        <M3SquigglyLoader
                          variant="horizontal"
                          squiggles={m3SquiggleCount}
                          amplitude={m3SquiggleAmp}
                          color={m3ProgressColor === "google" ? "blue" : m3ProgressColor}
                          strokeWidth={3.5}
                          speed={m3ProgressSpeed}
                        />
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[var(--text-muted)] pt-2">
                          <span>Waves: {m3SquiggleCount}</span>
                          <span>•</span>
                          <span>Amplitude: {m3SquiggleAmp}px</span>
                        </div>
                      </div>
                    ) : m3ProgressVariant === "squiggly-circular" ? (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <M3SquigglyLoader
                          variant="circular"
                          squiggles={m3SquiggleCount}
                          amplitude={m3SquiggleAmp}
                          color={m3ProgressColor === "google" ? "blue" : m3ProgressColor}
                          size={m3MorphSize + 16}
                          strokeWidth={3.5}
                          speed={m3ProgressSpeed}
                        />
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Android 14+ Sinusoidal Wave Loop
                        </span>
                      </div>
                    ) : m3ProgressVariant === "shape-morph" ? (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <M3LoadingIndicator
                          variant={m3MorphVariant}
                          size={m3MorphSize + 12}
                          color={m3ProgressColor}
                          speed={m3ProgressSpeed}
                          containerShape={m3ContainerShape}
                        />
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Material 3 Expressive Morphing Sequence
                        </span>
                      </div>
                    ) : m3ProgressVariant === "elastic-line" ? (
                      <div className="w-full flex flex-col items-center justify-center space-y-4 py-2">
                        <M3PhysicsLoader
                          variant="elastic-line"
                          theme={m3ProgressColor}
                          resistance={m3ElasticResistance}
                          speed={m3ProgressSpeed}
                        />
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          Membrane Resistance &amp; Breakthrough Harmonic Physics
                        </span>
                      </div>
                    ) : m3ProgressVariant === "circular" ? (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <M3ProgressIndicator type="circular" value={m3ProgressVal} />
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          {m3ProgressVal}% Progress
                        </span>
                      </div>
                    ) : (
                      <div className="w-full px-4 flex flex-col items-center justify-center space-y-4 py-6">
                        <M3ProgressIndicator
                          type="linear"
                          value={m3ProgressVal}
                          variant={m3ProgressVariant === "minimal" ? "minimal" : "default"}
                        />
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          {m3ProgressVal}% Complete
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clean Bottom Parameters Tile */}
                  <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Speed Multiplier</span>
                      <span className="font-bold text-[var(--accent-green)]">{m3ProgressSpeed.toFixed(1)}x</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Accent Color</span>
                      <span className="font-bold uppercase text-[var(--text-primary)]">{m3ProgressColor}</span>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 Badge */}
          {item.name === "m3-badge" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Badges" subtitle="COMMUNICATION">
                <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
                  <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Configured Badge</span>
                    <div className="flex items-center justify-around py-2">
                      <M3Badge
                        content={m3BadgeVal}
                        dot={m3BadgeVariant === "dot"}
                        variant={m3BadgeVariant === "minimal" ? "minimal" : "default"}
                      >
                        <div className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <Bell className="h-6 w-6" />
                        </div>
                      </M3Badge>

                      <M3Badge content={99} max={99}>
                        <div className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <ShoppingBag className="h-6 w-6" />
                        </div>
                      </M3Badge>

                      <M3Badge dot>
                        <div className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <User className="h-6 w-6" />
                        </div>
                      </M3Badge>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--border)]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Minimal SaaS Badges</span>
                    <div className="flex items-center justify-around py-2">
                      <M3Badge variant="minimal" content={m3BadgeVal}>
                        <div className="p-2.5 rounded-lg border border-[var(--border)]">
                          <Compass className="h-5 w-5" />
                        </div>
                      </M3Badge>
                      <M3Badge variant="minimal" dot>
                        <div className="p-2.5 rounded-lg border border-[var(--border)]">
                          <Heart className="h-5 w-5" />
                        </div>
                      </M3Badge>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 List */}
          {item.name === "m3-list" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Lists" subtitle="DATA DISPLAY">
                <div className="flex-1 flex flex-col overflow-y-auto p-2">
                  {m3ListVariant === "one-line" ? (
                    <M3List header="One-Line List (56px)">
                      <M3ListItem
                        lines="1"
                        headline="Inbox Messages"
                        leading={<Bell className="h-5 w-5 text-emerald-500" />}
                        trailingText="24"
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="1"
                        headline="Starred Projects"
                        leading={<Star className="h-5 w-5 text-amber-500" />}
                        trailingText="8"
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="1"
                        headline="Telemetry Archive"
                        leading={<Archive className="h-5 w-5 text-blue-500" />}
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="1"
                        headline="Device Settings"
                        leading={<Shield className="h-5 w-5 text-purple-500" />}
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                    </M3List>
                  ) : m3ListVariant === "three-line" ? (
                    <M3List header="Three-Line List (88px)">
                      <M3ListItem
                        lines="3"
                        headline="Team Weekly Sprint Sync"
                        overline="KILO STUDIO"
                        supportingText="Reviewed component motion curves, velocity fling damping, and mobile ergonomics for M3 suite."
                        leading={
                          <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center text-xs">
                            KS
                          </div>
                        }
                        trailingSupportingText="10:42 AM"
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="3"
                        headline="Production Build Verified"
                        overline="CI/CD PIPELINE"
                        supportingText="All 101 routes compiled with Turbopack. Static pages collected and cached with zero errors."
                        leading={
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-xs">
                            CI
                          </div>
                        }
                        trailingSupportingText="Yesterday"
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="3"
                        headline="Security Dispatch Alert"
                        overline="SECURITY OPS"
                        supportingText="Hardware biometric face authentication token renewed for multi-factor root cluster."
                        leading={
                          <div className="h-10 w-10 rounded-full bg-purple-500/20 text-purple-500 font-bold flex items-center justify-center text-xs">
                            SO
                          </div>
                        }
                        trailingSupportingText="2d ago"
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                    </M3List>
                  ) : m3ListVariant === "minimal" ? (
                    <M3List header="Minimal SaaS List" variant="minimal">
                      <M3ListItem
                        variant="minimal"
                        headline="Kilo Studio Apparel"
                        supportingText="Technical Shell 3L • Express"
                        trailingSupportingText="Just now"
                        leading={<ShoppingBag className="h-4 w-4 text-emerald-500" />}
                      />
                      <M3ListItem
                        variant="minimal"
                        headline="Server Telemetry Sync"
                        supportingText="AST Validation verified"
                        trailingSupportingText="14m ago"
                        leading={<CheckCircle2 className="h-4 w-4 text-blue-500" />}
                      />
                      <M3ListItem
                        variant="minimal"
                        headline="Security Dispatch"
                        supportingText="Biometric face auth approved"
                        trailingSupportingText="1h ago"
                        leading={<Shield className="h-4 w-4 text-purple-500" />}
                      />
                    </M3List>
                  ) : (
                    <M3List header="Two-Line List (72px)">
                      <M3ListItem
                        lines="2"
                        headline="Kilo Studio Apparel"
                        supportingText="Technical Shell 3L • Express Delivery"
                        trailingSupportingText="Just now"
                        leading={<ShoppingBag className="h-5 w-5 text-emerald-500" />}
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="2"
                        headline="Server Telemetry Sync"
                        supportingText="AST Validation schema passed 100%"
                        trailingSupportingText="14m ago"
                        leading={<CheckCircle2 className="h-5 w-5 text-blue-500" />}
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                      <M3ListItem
                        lines="2"
                        headline="Security Dispatch"
                        supportingText="Biometric face auth approved"
                        trailingSupportingText="1h ago"
                        leading={<Shield className="h-5 w-5 text-purple-500" />}
                        trailing={<ChevronRight className="h-4 w-4 text-neutral-400" />}
                      />
                    </M3List>
                  )}
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Biometric Scanner */}
          {item.name === "biometric-scanner" && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Biometrics" subtitle="SECURITY">
                <div className="flex-1 flex flex-col items-center justify-center p-5 space-y-6">
                  <div className="w-full max-w-[280px] flex flex-col items-center space-y-4">
                    <BiometricScanner
                      variant={biometricVariant}
                      size={biometricSize}
                      label="Security Enclave"
                      sublabel="Touch sensor with registered finger"
                      onSuccess={() => {
                        // eslint-disable-next-line no-console
                        console.log("Hardware biometric authenticated");
                      }}
                    />
                  </div>

                  <div className="w-full p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Sensor Hardware</span>
                      <span className="text-[var(--accent-green)] font-bold">READY</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Vibration Haptics</span>
                      <span className="text-[var(--text-primary)]">Enabled</span>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* M3 OTP Input */}
          {(item.name === "m3-otp-input" || item.name === "otp-input") && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="OTP Verification" subtitle="AUTH SHIELD">
                <div className="flex-1 flex flex-col items-center justify-center p-5 space-y-6">
                  <div className="w-full flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-green)] font-semibold">
                        2-Step Verification
                      </span>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">Enter Security PIN</h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        A {otpLength}-digit code was dispatched to your enclave hardware.
                      </p>
                    </div>

                    <div className="py-3">
                      <M3OtpInput
                        length={otpLength}
                        value={otpVal}
                        onChange={setOtpVal}
                        mask={otpMask}
                        error={otpError}
                        onComplete={(code) => {
                          // eslint-disable-next-line no-console
                          console.log(`Code ${code} verified!`);
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpVal("")}
                        className="px-3 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        Clear PIN
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpError(!otpError)}
                        className={cn(
                          "px-3 py-1 rounded-lg border text-[11px] font-mono transition-colors cursor-pointer",
                          otpError
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                            : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        {otpError ? "Error: Active" : "Simulate Error"}
                      </button>
                    </div>
                  </div>

                  <div className="w-full p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 text-xs font-mono space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Entered Digits</span>
                      <span className="font-bold text-[var(--accent-green)]">{otpVal.length} / {otpLength}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Auto-advance</span>
                      <span className="text-[var(--text-primary)]">Active</span>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}

          {/* Mobile Haptic Stepper */}
          {(item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper") && (
            <div className="w-full flex justify-center py-2">
              <MobilePreviewChassis isLightMode={isLightMode} title="Haptic Stepper" subtitle="ACTIONS">
                <div className="flex-1 flex flex-col items-center justify-center p-5 space-y-6">
                  <div className="w-full max-w-[280px] p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col items-center space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      Order Quantity
                    </span>

                    <MobileHapticStepper
                      variant={stepperVariant}
                      size={stepperSize}
                      value={stepperVal}
                      onChange={setStepperVal}
                      min={0}
                      max={20}
                      unit="pcs"
                    />

                    <div className="w-full pt-3 border-t border-[var(--border)] flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-muted)]">Subtotal ($45/unit)</span>
                      <span className="font-bold text-[var(--accent-green)]">${stepperVal * 45}.00</span>
                    </div>
                  </div>

                  <div className="w-full p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 text-xs font-mono space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Haptic Vibration</span>
                      <span className="text-[var(--accent-green)] font-bold">15ms Damped</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-muted)]">Boundary Range</span>
                      <span className="text-[var(--text-primary)]">0 - 20 items</span>
                    </div>
                  </div>
                </div>
              </MobilePreviewChassis>
            </div>
          )}
        </ScaledThumbnailWrapper>
      </div>

      {/* 2. Customize Controls Panel matching photo 2 */}
      {showKnobs && (
        <div
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5 space-y-3.5 shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--text-primary)]">
              Customize
            </h3>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Live reactive properties
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* Skeleton Controls */}
            {item.name === "skeleton" && (
              <>
                <CustomizeTile label="Preset Variant">
                  <CustomizeSelect
                    value={skeletonVariant}
                    onChange={(val) => {
                      applyVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={["shimmer", "pulse", "wave", "card", "avatar", "text", "canvas"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Shape">
                  <CustomizeSelect
                    value={skeletonShape}
                    onChange={setSkeletonShape}
                    options={["rounded", "circular", "pill", "text", "card"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Speed">
                  <CustomizeSelect
                    value={skeletonSpeed}
                    onChange={setSkeletonSpeed}
                    options={["normal", "slow", "fast"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Accent Glow">
                  <Switch
                    checked={skeletonGlow}
                    onCheckedChange={setSkeletonGlow}
                  />
                </CustomizeTile>

                <CustomizeTile label="Paragraph Lines">
                  <div className="flex items-center justify-between w-full gap-2">
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={skeletonLines}
                      onChange={(e) => setSkeletonLines(Number(e.target.value))}
                      className="w-full accent-[var(--accent-green)] cursor-pointer"
                    />
                    <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums shrink-0">
                      {skeletonLines}
                    </span>
                  </div>
                </CustomizeTile>
              </>
            )}

            {/* Button Controls */}
            {item.name === "button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={btnVariant}
                    onChange={(val) => {
                      setBtnVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={btnSize}
                    onChange={setBtnSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={btnLabel}
                    onChange={setBtnLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={btnLoading}
                    onChange={setBtnLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={btnDisabled}
                    onChange={setBtnDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Magnetic Button Controls */}
            {item.name === "magnetic-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={magneticVariant}
                    onChange={(val) => {
                      setMagneticVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["neon-glow", "ghost-specular", "accent-lime", "violet-aurora", "minimal-monochrome"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={magneticSize}
                    onChange={setMagneticSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={magneticLabel}
                    onChange={setMagneticLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Pull Strength">
                  <CustomizeSlider
                    value={magneticStrength}
                    onChange={setMagneticStrength}
                    min={0.1}
                    max={0.8}
                    step={0.05}
                  />
                </CustomizeTile>

                <CustomizeTile label="Spotlight Glare">
                  <CustomizeSwitch
                    checked={magneticSpotlight}
                    onChange={setMagneticSpotlight}
                    label="Cursor spotlight"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={magneticLoading}
                    onChange={setMagneticLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={magneticDisabled}
                    onChange={setMagneticDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Border Beam Button Controls */}
            {item.name === "border-beam-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={borderBeamVariant}
                    onChange={(val) => {
                      setBorderBeamVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["cyan-cyber", "emerald-matrix", "violet-plasma", "amber-solar", "rainbow-spectrum"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={borderBeamSize}
                    onChange={setBorderBeamSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={borderBeamLabel}
                    onChange={setBorderBeamLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Beam Duration (s)">
                  <CustomizeSlider
                    value={borderBeamDuration}
                    onChange={setBorderBeamDuration}
                    min={1}
                    max={10}
                    step={0.5}
                  />
                </CustomizeTile>

                <CustomizeTile label="Beam Length">
                  <CustomizeSlider
                    value={borderBeamPulseSize}
                    onChange={setBorderBeamPulseSize}
                    min={15}
                    max={60}
                    step={1}
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Hyperdrive">
                  <CustomizeSwitch
                    checked={borderBeamSpeedup}
                    onChange={setBorderBeamSpeedup}
                    label="Accelerate on hover"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={borderBeamLoading}
                    onChange={setBorderBeamLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={borderBeamDisabled}
                    onChange={setBorderBeamDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Cyber Glitch Button Controls */}
            {item.name === "cyber-glitch-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={cyberGlitchVariant}
                    onChange={(val) => {
                      setCyberGlitchVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["matrix-neon", "tokyo-cyan", "crimson-danger", "stealth-obsidian", "synth-sunset"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={cyberGlitchSize}
                    onChange={setCyberGlitchSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={cyberGlitchLabel}
                    onChange={setCyberGlitchLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="HUD Tech Code">
                  <CustomizeInput
                    value={cyberGlitchHud}
                    onChange={setCyberGlitchHud}
                    placeholder="e.g. SYS_ID // 0x8F"
                  />
                </CustomizeTile>

                <CustomizeTile label="Target Brackets">
                  <CustomizeSwitch
                    checked={cyberGlitchBrackets}
                    onChange={setCyberGlitchBrackets}
                    label="Show HUD brackets"
                  />
                </CustomizeTile>

                <CustomizeTile label="CRT Scanlines">
                  <CustomizeSwitch
                    checked={cyberGlitchScanlines}
                    onChange={setCyberGlitchScanlines}
                    label="Show scanlines"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={cyberGlitchLoading}
                    onChange={setCyberGlitchLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={cyberGlitchDisabled}
                    onChange={setCyberGlitchDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Liquid Wave Button Controls */}
            {item.name === "liquid-wave-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={liquidWaveVariant}
                    onChange={(val) => {
                      setLiquidWaveVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["ocean-deep", "toxic-acid", "magma-flame", "mercury-chrome", "violet-nebula"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={liquidWaveSize}
                    onChange={setLiquidWaveSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={liquidWaveLabel}
                    onChange={setLiquidWaveLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Speed">
                  <CustomizeSlider
                    value={liquidWaveSpeed}
                    onChange={setLiquidWaveSpeed}
                    min={0.5}
                    max={2.5}
                    step={0.1}
                  />
                </CustomizeTile>

                <CustomizeTile label="Rising Bubbles">
                  <CustomizeSwitch
                    checked={liquidWaveBubbles}
                    onChange={setLiquidWaveBubbles}
                    label="Floating bubbles"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={liquidWaveLoading}
                    onChange={setLiquidWaveLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={liquidWaveDisabled}
                    onChange={setLiquidWaveDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Particle Burst Button Controls */}
            {item.name === "particle-burst-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={particleBurstVariant}
                    onChange={(val) => {
                      setParticleBurstVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["supernova-gold", "cosmic-starfield", "electric-emerald", "fuchsia-confetti", "monochrome-firefly"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={particleBurstSize}
                    onChange={setParticleBurstSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={particleBurstLabel}
                    onChange={setParticleBurstLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Sparks Count">
                  <CustomizeSlider
                    value={particleBurstCount}
                    onChange={setParticleBurstCount}
                    min={16}
                    max={64}
                    step={4}
                  />
                </CustomizeTile>

                <CustomizeTile label="Ambient Stardust">
                  <CustomizeSwitch
                    checked={particleBurstAmbient}
                    onChange={setParticleBurstAmbient}
                    label="Idle twinkling motes"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={particleBurstLoading}
                    onChange={setParticleBurstLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={particleBurstDisabled}
                    onChange={setParticleBurstDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Elastic Slot Button Controls */}
            {item.name === "elastic-slot-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={elasticSlotVariant}
                    onChange={(val) => {
                      setElasticSlotVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["editorial-mono", "accent-pill", "glass-tactile", "dark-carbon", "destructive-alert"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={elasticSlotSize}
                    onChange={setElasticSlotSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Primary Label">
                  <CustomizeInput
                    value={elasticSlotLabel}
                    onChange={setElasticSlotLabel}
                    placeholder="Resting text"
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Roll Label">
                  <CustomizeInput
                    value={elasticSlotHoverLabel}
                    onChange={setElasticSlotHoverLabel}
                    placeholder="Rolled text on hover"
                  />
                </CustomizeTile>

                <CustomizeTile label="Sliding Drawer">
                  <CustomizeSwitch
                    checked={elasticSlotDrawer}
                    onChange={setElasticSlotDrawer}
                    label="Arrow drawer micro-action"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={elasticSlotLoading}
                    onChange={setElasticSlotLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={elasticSlotDisabled}
                    onChange={setElasticSlotDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Glass Prism Button Controls */}
            {item.name === "glass-prism-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={glassPrismVariant}
                    onChange={(val) => {
                      setGlassPrismVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["spatial-glass", "obsidian-crystal", "aurora-prism", "champagne-gold", "cyber-frost"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={glassPrismSize}
                    onChange={setGlassPrismSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={glassPrismLabel}
                    onChange={setGlassPrismLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Max Tilt (°)">
                  <CustomizeSlider
                    value={glassPrismTilt}
                    onChange={setGlassPrismTilt}
                    min={4}
                    max={24}
                    step={1}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glare Intensity">
                  <CustomizeSlider
                    value={glassPrismGlare}
                    onChange={setGlassPrismGlare}
                    min={0.1}
                    max={0.8}
                    step={0.05}
                  />
                </CustomizeTile>

                <CustomizeTile label="Prism Rainbow Rim">
                  <CustomizeSwitch
                    checked={glassPrismBorder}
                    onChange={setGlassPrismBorder}
                    label="Refractive bevel rim"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={glassPrismLoading}
                    onChange={setGlassPrismLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={glassPrismDisabled}
                    onChange={setGlassPrismDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Input Controls */}
            {item.name === "input" && (
              <>
                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={inputLabel}
                    onChange={setInputLabel}
                    placeholder="Field label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Value">
                  <CustomizeInput
                    value={inputVal}
                    onChange={setInputVal}
                    placeholder="Input text"
                  />
                </CustomizeTile>

                <CustomizeTile label="Helper Text">
                  <CustomizeInput
                    value={inputHelper}
                    onChange={setInputHelper}
                    placeholder="Helper instructions"
                  />
                </CustomizeTile>

                <CustomizeTile label="Placeholder">
                  <CustomizeInput
                    value={inputPlaceholder}
                    onChange={setInputPlaceholder}
                    placeholder="Placeholder"
                  />
                </CustomizeTile>

                <CustomizeTile label="Simulate Error">
                  <CustomizeSwitch
                    checked={!!inputError}
                    onChange={(checked) =>
                      setInputError(checked ? "Invalid file extension (.env required)" : "")
                    }
                    label="Simulate input error state"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={inputDisabled}
                    onChange={setInputDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Checkbox Controls */}
            {item.name === "checkbox" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={checkboxVariant}
                    onChange={(val) => {
                      setCheckboxVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={["motion", "lineart", "default", "strike", "card", "chip"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={checkboxSize}
                    onChange={(val) => setCheckboxSize(val as any)}
                    options={["sm", "default", "lg"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={checkboxLabel}
                    onChange={setCheckboxLabel}
                    placeholder="Checkbox label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={checkboxDesc}
                    onChange={setCheckboxDesc}
                    placeholder="Checkbox description"
                  />
                </CustomizeTile>

                <CustomizeTile label="Badge">
                  <CustomizeInput
                    value={checkboxBadge}
                    onChange={setCheckboxBadge}
                    placeholder="Optional badge"
                  />
                </CustomizeTile>

                <CustomizeTile label="Checked State">
                  <CustomizeSwitch
                    checked={checkboxChecked}
                    onChange={setCheckboxChecked}
                    label="Toggle checked"
                  />
                </CustomizeTile>

                <CustomizeTile label="Indeterminate (Tri-state)">
                  <CustomizeSwitch
                    checked={checkboxIndeterminate}
                    onChange={setCheckboxIndeterminate}
                    label="Toggle indeterminate"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={checkboxDisabled}
                    onChange={setCheckboxDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Notched Navbar Controls */}
            {item.name === "notched-navbar" && (
              <>
                <CustomizeTile label="Variant Preset">
                  <CustomizeSelect
                    value={notchedVariant}
                    onChange={(val) => {
                      setNotchedVariant(val);
                      onVariantChange?.(val);
                      if (val === "down" || val === "bottom") {
                        setNotchedWidth(540);
                        setNotchedHeight(42);
                        setNotchedBorderPadding(8);
                        setNotchedFrameBg("#222326");
                      } else if (val === "left" || val === "right") {
                        setNotchedWidth(260);
                        setNotchedHeight(56);
                        setNotchedBorderPadding(8);
                        setNotchedFrameBg("#222326");
                      } else if (val === "compact") {
                        setNotchedWidth(300);
                        setNotchedHeight(38);
                        setNotchedBorderPadding(6);
                        setNotchedFrameBg("#222326");
                      } else if (val === "deep-notch") {
                        setNotchedWidth(560);
                        setNotchedHeight(52);
                        setNotchedBorderPadding(10);
                        setNotchedFrameBg("#1c1d21");
                      } else if (val === "dark-slate") {
                        setNotchedWidth(540);
                        setNotchedHeight(42);
                        setNotchedBorderPadding(8);
                        setNotchedFrameBg("#0f172a");
                      } else {
                        setNotchedWidth(540);
                        setNotchedHeight(42);
                        setNotchedBorderPadding(8);
                        setNotchedFrameBg("#222326");
                      }
                    }}
                    options={item.variants || ["default", "down", "left", "right"]}
                  />
                </CustomizeTile>

                <CustomizeTile label={`White Border Padding: ${notchedBorderPadding}px`}>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    step="2"
                    value={notchedBorderPadding}
                    onChange={(e) => setNotchedBorderPadding(Number(e.target.value))}
                    className="w-full accent-[var(--accent-green)] cursor-pointer"
                  />
                </CustomizeTile>

                <CustomizeTile label={`${notchedVariant === "left" || notchedVariant === "right" ? "Notch Span" : "Notch Width"}: ${notchedWidth}px`}>
                  <input
                    type="range"
                    min={notchedVariant === "left" || notchedVariant === "right" ? 140 : 240}
                    max={notchedVariant === "left" || notchedVariant === "right" ? 420 : 640}
                    step="10"
                    value={notchedWidth}
                    onChange={(e) => setNotchedWidth(Number(e.target.value))}
                    className="w-full accent-[var(--accent-green)] cursor-pointer"
                  />
                </CustomizeTile>

                <CustomizeTile label={`Notch Depth: ${notchedHeight}px`}>
                  <input
                    type="range"
                    min="28"
                    max="64"
                    step="2"
                    value={notchedHeight}
                    onChange={(e) => setNotchedHeight(Number(e.target.value))}
                    className="w-full accent-[var(--accent-green)] cursor-pointer"
                  />
                </CustomizeTile>

                <CustomizeTile label="Active Tab">
                  <CustomizeSelect
                    value={notchedActiveTab}
                    onChange={(val) => setNotchedActiveTab(val)}
                    options={["home", "experience", "contact", "settings"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Frame Background">
                  <CustomizeSelect
                    value={notchedFrameBg}
                    onChange={(val) => setNotchedFrameBg(val)}
                    options={["#222326", "#18181b", "#0f172a", "#1a1a2e"]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Switch Controls */}
            {item.name === "switch" && (
              <>
                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={switchLabel}
                    onChange={setSwitchLabel}
                    placeholder="Switch label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={switchDesc}
                    onChange={setSwitchDesc}
                    placeholder="Switch description"
                  />
                </CustomizeTile>

                <CustomizeTile label="Checked State">
                  <CustomizeSwitch
                    checked={switchChecked}
                    onChange={setSwitchChecked}
                    label="Toggle switch"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={switchDisabled}
                    onChange={setSwitchDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Dialog Controls */}
            {item.name === "dialog" && (
              <>
                <CustomizeTile label="Trigger Label">
                  <CustomizeInput
                    value={dialogTriggerLabel}
                    onChange={setDialogTriggerLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Dialog Title">
                  <CustomizeInput
                    value={dialogTitle}
                    onChange={setDialogTitle}
                    placeholder="Dialog title"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={dialogDesc}
                    onChange={setDialogDesc}
                    placeholder="Dialog description"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Popover Dialog Controls */}
            {item.name === "popover-dialog" && (
              <>
                <CustomizeTile label="Preset Variant">
                  <CustomizeSelect
                    value={popoverVariant}
                    onChange={(val) => {
                      setPopoverVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Contextual Actions", value: "contextual-actions" },
                      { label: "User Profile Card", value: "user-card" },
                      { label: "Confirm Prompt", value: "confirm-prompt" },
                      { label: "Color Palette", value: "color-picker" },
                      { label: "Media Preview", value: "media-preview" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Placement">
                  <CustomizeSelect
                    value={popoverPlacement}
                    onChange={setPopoverPlacement}
                    options={[
                      { label: "Bottom", value: "bottom" },
                      { label: "Top", value: "top" },
                      { label: "Left", value: "left" },
                      { label: "Right", value: "right" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Show Arrow">
                  <Switch
                    checked={popoverShowArrow}
                    onCheckedChange={setPopoverShowArrow}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Command Palette Controls */}
            {item.name === "command-palette" && (
              <>
                <CustomizeTile label="Aesthetic Theme">
                  <CustomizeSelect
                    value={commandVariant}
                    onChange={(val) => {
                      setCommandVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Spotlight Dark", value: "spotlight-dark" },
                      { label: "Cyber Matrix", value: "cyber-matrix" },
                      { label: "Minimal Monochrome", value: "minimal-monochrome" },
                      { label: "Compact Dock", value: "compact-dock" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Palette Open State">
                  <Switch
                    checked={commandOpen}
                    onCheckedChange={setCommandOpen}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Drawer Dialog Controls */}
            {item.name === "drawer-dialog" && (
              <>
                <CustomizeTile label="Drawer Mode">
                  <CustomizeSelect
                    value={drawerVariant}
                    onChange={(val) => {
                      setDrawerVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Bottom Sheet", value: "bottom-sheet" },
                      { label: "Right Inspector", value: "right-inspector" },
                      { label: "Left Drawer", value: "left-drawer" },
                      { label: "Floating Card", value: "floating-card" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Drawer Open State">
                  <Switch
                    checked={drawerOpen}
                    onCheckedChange={setDrawerOpen}
                  />
                </CustomizeTile>
                <CustomizeTile label="Show Drag Handle">
                  <Switch
                    checked={drawerShowHandle}
                    onCheckedChange={setDrawerShowHandle}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Spotlight Modal Controls */}
            {item.name === "spotlight-modal" && (
              <>
                <CustomizeTile label="Spotlight Theme">
                  <CustomizeSelect
                    value={spotlightModalVariant}
                    onChange={(val) => {
                      setSpotlightModalVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Theatrical Glow", value: "theatrical-glow" },
                      { label: "Cyber Scan", value: "cyber-scan" },
                      { label: "Golden Hour", value: "golden-hour" },
                      { label: "Laser Reticle", value: "laser-reticle" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Modal Open State">
                  <Switch
                    checked={spotlightModalOpen}
                    onCheckedChange={setSpotlightModalOpen}
                  />
                </CustomizeTile>
                <CustomizeTile label="Show CAD Reticle">
                  <Switch
                    checked={spotlightReticle}
                    onCheckedChange={setSpotlightReticle}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Announcement Bar Controls */}
            {item.name === "announcement-bar" && (
              <>
                <CustomizeTile label="Banner Style">
                  <CustomizeSelect
                    value={announcementVariant}
                    onChange={(val) => {
                      setAnnouncementVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Cyber Gradient", value: "cyber-gradient" },
                      { label: "Minimal Monochrome", value: "minimal-monochrome" },
                      { label: "Pulse Accent", value: "pulse-accent" },
                      { label: "Floating Pill", value: "floating-pill" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Countdown Timer">
                  <Switch
                    checked={announcementCountdown}
                    onCheckedChange={setAnnouncementCountdown}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Toast Stack Controls */}
            {item.name === "toast-stack" && (
              <>
                <CustomizeTile label="Stack Presentation">
                  <CustomizeSelect
                    value={toastStackVariant}
                    onChange={(val) => {
                      setToastStackVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Stacked Bottom-Right", value: "stacked-bottom-right" },
                      { label: "Stacked Top-Center", value: "stacked-top-center" },
                      { label: "Cyber Telemetry", value: "cyber-telemetry" },
                      { label: "Minimal List", value: "minimal-list" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Card Gap">
                  <CustomizeSelect
                    value={toastStackGap}
                    onChange={(val) => setToastStackGap(val as any)}
                    options={[
                      { label: "Compact (10px)", value: "compact" },
                      { label: "Normal (14px)", value: "normal" },
                      { label: "Relaxed (20px)", value: "relaxed" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Expand Deck">
                  <Switch
                    checked={toastStackExpand}
                    onCheckedChange={setToastStackExpand}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Ticker Notification Controls */}
            {item.name === "ticker-notification" && (
              <>
                <CustomizeTile label="Ticker Style">
                  <CustomizeSelect
                    value={tickerVariant}
                    onChange={(val) => {
                      setTickerVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Cyber Terminal", value: "cyber-terminal" },
                      { label: "Status Beacon", value: "status-beacon" },
                      { label: "News Wire", value: "news-wire" },
                      { label: "Monochrome Minimal", value: "monochrome-minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Scroll Speed">
                  <CustomizeSelect
                    value={tickerSpeed}
                    onChange={setTickerSpeed}
                    options={[
                      { label: "Slow", value: "slow" },
                      { label: "Normal", value: "normal" },
                      { label: "Fast", value: "fast" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Pause on Hover">
                  <Switch
                    checked={tickerPauseOnHover}
                    onCheckedChange={setTickerPauseOnHover}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Dynamic Island Banner Controls */}
            {item.name === "dynamic-island-banner" && (
              <>
                <CustomizeTile label="Island Mode">
                  <CustomizeSelect
                    value={dynamicIslandVariant}
                    onChange={(val) => {
                      setDynamicIslandVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Compact Pill", value: "compact-pill" },
                      { label: "Expanded Telemetry HUD", value: "expanded-hud" },
                      { label: "Media Waveform", value: "media-wave" },
                      { label: "Cluster Alert", value: "telemetry-alert" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="LED Accent">
                  <CustomizeSelect
                    value={dynamicIslandAccent}
                    onChange={setDynamicIslandAccent}
                    options={[
                      { label: "Neon Green", value: "green" },
                      { label: "Cyan Plasma", value: "cyan" },
                      { label: "Amber Warning", value: "amber" },
                      { label: "Pure White", value: "white" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Stack Cards Controls */}
            {item.name === "stack-cards" && (
              <>
                <CustomizeTile label="Stack Geometry">
                  <CustomizeSelect
                    value={stackCardsVariant}
                    onChange={(val) => {
                      setStackCardsVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Perspective Stack", value: "perspective-stack" },
                      { label: "Radial Fan-Out", value: "fan-out" },
                      { label: "Cyber CAD Deck", value: "cyber-deck" },
                      { label: "Minimal Swipe", value: "minimal-swipe" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Auto-Cycle Deck">
                  <Switch
                    checked={stackCardsAutoPlay}
                    onCheckedChange={setStackCardsAutoPlay}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Mobile Bottom Sheet Controls */}
            {item.name === "mobile-bottom-sheet" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={mobileBottomSheetVariant}
                    onChange={(val) => {
                      setMobileBottomSheetVariant(val);
                      onVariantChange?.(val);
                      setMobileBottomSheetOpen(true);
                    }}
                    options={[
                      { label: "Default (Dual Snap)", value: "default" },
                      { label: "Compact (Quick Peek)", value: "compact" },
                      { label: "Full Expand (Modal)", value: "full-expand" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Open State">
                  <CustomizeSwitch
                    checked={mobileBottomSheetOpen}
                    onChange={setMobileBottomSheetOpen}
                    label="Toggle Sheet Open"
                  />
                </CustomizeTile>
                <CustomizeTile label="Sheet Title">
                  <CustomizeInput
                    value={mobileBottomSheetTitle}
                    onChange={setMobileBottomSheetTitle}
                    placeholder="Sheet title"
                  />
                </CustomizeTile>
                <CustomizeTile label="Monochrome Handle">
                  <CustomizeSwitch
                    checked={mobileBottomSheetHandle}
                    onChange={setMobileBottomSheetHandle}
                    label="Show tactile drag handle"
                  />
                </CustomizeTile>
                <CustomizeTile label="Backdrop Blur">
                  <CustomizeSwitch
                    checked={mobileBottomSheetBlur}
                    onChange={setMobileBottomSheetBlur}
                    label="Subtle backdrop blur overlay"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Swipe Action Card Controls */}
            {item.name === "swipe-action-card" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={swipeActionCardVariant}
                    onChange={(val) => {
                      setSwipeActionCardVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Default (Pin & Delete)", value: "default" },
                      { label: "Destructive Right", value: "destructive-right" },
                      { label: "Dual Drawer (Multi-Action)", value: "dual-drawer" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Swipe Snap Threshold">
                  <CustomizeSlider
                    value={swipeActionThreshold}
                    onChange={setSwipeActionThreshold}
                    min={48}
                    max={120}
                    step={4}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>
                <CustomizeTile label="Disabled State">
                  <CustomizeSwitch
                    checked={swipeActionDisabled}
                    onChange={setSwipeActionDisabled}
                    label="Disable gesture swipe"
                  />
                </CustomizeTile>
                <CustomizeTile label="Last Action">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--accent-green)] font-semibold">
                      {swipeLastAction || "None"}
                    </span>
                    {swipeActionCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSwipeActionCount(0);
                          setSwipeLastAction("");
                        }}
                        className="p-1 rounded text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] cursor-pointer"
                        title="Reset trigger count"
                      >
                        Reset ({swipeActionCount})
                      </button>
                    )}
                  </div>
                </CustomizeTile>
              </>
            )}

            {/* Thumb Segment Controller Controls */}
            {item.name === "thumb-segment-controller" && (
              <>
                <CustomizeTile label="Size Variant">
                  <CustomizeSelect
                    value={thumbSegmentVariant}
                    onChange={(val) => {
                      setThumbSegmentVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Default (46px thumb reach)", value: "default" },
                      { label: "Compact SM (36px)", value: "sm" },
                      { label: "Expansive LG (52px)", value: "lg" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Active Segment">
                  <CustomizeSelect
                    value={thumbSegmentValue}
                    onChange={setThumbSegmentValue}
                    options={[
                      { label: "Day", value: "day" },
                      { label: "Week", value: "week" },
                      { label: "Month", value: "month" },
                      { label: "Year", value: "year" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Full Width">
                  <CustomizeSwitch
                    checked={thumbSegmentFullWidth}
                    onChange={setThumbSegmentFullWidth}
                    label="Expand across container"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Pull To Refresh Controls */}
            {item.name === "pull-to-refresh" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={pullToRefreshVariant}
                    onChange={(val) => {
                      setPullToRefreshVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Default (M3 72px)", value: "default" },
                      { label: "Smooth Dampened (88px)", value: "smooth-dampened" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Pull Trigger Threshold">
                  <CustomizeSlider
                    value={pullToRefreshThreshold}
                    onChange={setPullToRefreshThreshold}
                    min={48}
                    max={110}
                    step={4}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>
                <CustomizeTile label="Disabled State">
                  <CustomizeSwitch
                    checked={pullToRefreshDisabled}
                    onChange={setPullToRefreshDisabled}
                    label="Disable pull gesture"
                  />
                </CustomizeTile>
                <CustomizeTile label="Buffer Refresh">
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setPullRefreshCount((c) => c + 1);
                      setPullItems((prev) => [
                        {
                          id: String(Date.now()),
                          title: `Manual Sync #${prev.length + 1}`,
                          desc: "Telemetry packet refreshed from developer controls",
                          time: timeStr,
                        },
                        ...prev.slice(0, 4),
                      ]);
                    }}
                    className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[var(--surface-tertiary)] hover:bg-[var(--surface-tertiary)]/80 text-[var(--text-primary)] cursor-pointer"
                  >
                    Simulate Pull
                  </button>
                </CustomizeTile>
              </>
            )}

            {/* Floating Action Dock Controls */}
            {item.name === "floating-action-dock" && (
              <>
                <CustomizeTile label="Alignment Position">
                  <CustomizeSelect
                    value={floatingActionDockVariant}
                    onChange={(val) => {
                      setFloatingActionDockVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Default Center", value: "default" },
                      { label: "Center Aligned", value: "center" },
                      { label: "Right Aligned", value: "right" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Active Tab">
                  <CustomizeSelect
                    value={floatingDockActive}
                    onChange={setFloatingDockActive}
                    options={[
                      { label: "Home", value: "home" },
                      { label: "Explore", value: "explore" },
                      { label: "Alerts", value: "alerts" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Primary Monochrome FAB">
                  <CustomizeSwitch
                    checked={floatingDockShowPrimary}
                    onChange={setFloatingDockShowPrimary}
                    label="Show inverted Add (+) action"
                  />
                </CustomizeTile>
                <CustomizeTile label="Alerts Badge Count">
                  <CustomizeSlider
                    value={floatingDockBadge}
                    onChange={setFloatingDockBadge}
                    min={0}
                    max={9}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Button Controls */}
            {item.name === "m3-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3BtnVariant}
                    onChange={(val) => {
                      setM3BtnVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Filled (M3)", value: "filled" },
                      { label: "Elevated (M3)", value: "elevated" },
                      { label: "Tonal (M3)", value: "tonal" },
                      { label: "Outlined (M3)", value: "outlined" },
                      { label: "Text (M3)", value: "text" },
                      { label: "Minimal Solid (SaaS)", value: "minimal-solid" },
                      { label: "Minimal Outline (SaaS)", value: "minimal-outline" },
                      { label: "Minimal Ghost (SaaS)", value: "minimal-ghost" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={m3BtnSize}
                    onChange={setM3BtnSize}
                    options={[
                      { label: "Small (36px)", value: "sm" },
                      { label: "Default (40px)", value: "default" },
                      { label: "Large (48px)", value: "lg" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Button Text">
                  <CustomizeInput value={m3BtnLabel} onChange={setM3BtnLabel} />
                </CustomizeTile>
                <CustomizeTile label="Loading State">
                  <CustomizeSwitch checked={m3BtnLoading} onChange={setM3BtnLoading} label="Show spinner" />
                </CustomizeTile>
                <CustomizeTile label="Disabled State">
                  <CustomizeSwitch checked={m3BtnDisabled} onChange={setM3BtnDisabled} label="Disable button" />
                </CustomizeTile>
              </>
            )}

            {/* M3 FAB Controls */}
            {item.name === "m3-fab" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3FabVariant}
                    onChange={(val) => {
                      setM3FabVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Extended (M3)", value: "extended" },
                      { label: "Standard (M3 56px)", value: "standard" },
                      { label: "Small (M3 40px)", value: "small" },
                      { label: "Large (M3 96px)", value: "large" },
                      { label: "Minimal SaaS FAB", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="FAB Size">
                  <CustomizeSelect
                    value={m3FabSize}
                    onChange={setM3FabSize}
                    options={[
                      { label: "Extended Pill", value: "extended" },
                      { label: "Standard (56px)", value: "default" },
                      { label: "Small (40px)", value: "sm" },
                      { label: "Large (96px)", value: "lg" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="FAB Label">
                  <CustomizeInput value={m3FabLabel} onChange={setM3FabLabel} />
                </CustomizeTile>
              </>
            )}

            {/* M3 Segmented Button Controls */}
            {item.name === "m3-segmented-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3SegmentVariant}
                    onChange={(val) => {
                      setM3SegmentVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Single Select (M3)", value: "single-select" },
                      { label: "Multi Select (M3)", value: "multi-select" },
                      { label: "Minimal SaaS Style", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Active Segment">
                  <CustomizeSelect
                    value={m3SegmentVal}
                    onChange={setM3SegmentVal}
                    options={[
                      { label: "Day", value: "day" },
                      { label: "Week", value: "week" },
                      { label: "Month", value: "month" },
                      { label: "Year", value: "year" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Icon Button Controls */}
            {item.name === "m3-icon-button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3IconBtnVariant}
                    onChange={(val) => {
                      setM3IconBtnVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Tonal (M3)", value: "tonal" },
                      { label: "Filled (M3)", value: "filled" },
                      { label: "Outlined (M3)", value: "outlined" },
                      { label: "Standard (M3)", value: "standard" },
                      { label: "Minimal (SaaS)", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Selected State">
                  <CustomizeSwitch checked={m3IconBtnSelected} onChange={setM3IconBtnSelected} label="Toggle selected state" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Switch Controls */}
            {item.name === "m3-switch" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3SwitchVariant}
                    onChange={(val) => {
                      setM3SwitchVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Standard M3 (With Icon)", value: "standard-m3" },
                      { label: "With Icons In Thumb", value: "with-icons" },
                      { label: "Minimal SaaS Switch", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Checked State">
                  <CustomizeSwitch checked={m3SwitchChecked} onChange={setM3SwitchChecked} label="Switch toggled on" />
                </CustomizeTile>
                <CustomizeTile label="Thumb Icons">
                  <CustomizeSwitch checked={m3SwitchIcons} onChange={setM3SwitchIcons} label="Show check/cross inside thumb" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Checkbox Controls */}
            {item.name === "m3-checkbox" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3CheckboxVariant}
                    onChange={(val) => {
                      setM3CheckboxVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Standard M3", value: "standard-m3" },
                      { label: "Indeterminate", value: "indeterminate" },
                      { label: "Minimal SaaS Style", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Checked State">
                  <CustomizeSwitch checked={Boolean(m3CheckboxChecked)} onChange={setM3CheckboxChecked} label="Checkbox marked" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Radio Controls */}
            {item.name === "m3-radio" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3RadioVariant}
                    onChange={(val) => {
                      setM3RadioVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Standard M3", value: "standard-m3" },
                      { label: "Minimal SaaS Style", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Selected Option">
                  <CustomizeSelect
                    value={m3RadioVal}
                    onChange={setM3RadioVal}
                    options={[
                      { label: "Standard Shipping", value: "standard" },
                      { label: "Express Overnight", value: "express" },
                      { label: "Priority Courier", value: "priority" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Slider Controls */}
            {item.name === "m3-slider" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3SliderVariant}
                    onChange={(val) => {
                      setM3SliderVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Continuous (M3)", value: "continuous" },
                      { label: "Discrete Steps (M3)", value: "discrete" },
                      { label: "Minimal SaaS Slider", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Slider Value">
                  <CustomizeSlider
                    value={m3SliderVal}
                    onChange={setM3SliderVal}
                    min={0}
                    max={100}
                    step={1}
                    formatValue={(v) => `${v}%`}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Chip Controls */}
            {item.name === "m3-chip" && (
              <>
                <CustomizeTile label="Chip Type">
                  <CustomizeSelect
                    value={m3ChipVariant}
                    onChange={(val) => {
                      setM3ChipVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Filter Chip", value: "filter" },
                      { label: "Assist Chip", value: "assist" },
                      { label: "Input Chip", value: "input" },
                      { label: "Suggestion Chip", value: "suggestion" },
                      { label: "Minimal SaaS Chip", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Selected State">
                  <CustomizeSwitch checked={m3ChipSelected} onChange={setM3ChipSelected} label="Mark as active" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Text Field Controls */}
            {item.name === "m3-text-field" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3TextVariant}
                    onChange={(val) => {
                      setM3TextVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Outlined (M3 Notched)", value: "outlined" },
                      { label: "Filled (M3 Floating)", value: "filled" },
                      { label: "Minimal SaaS Input", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Value">
                  <CustomizeInput value={m3TextVal} onChange={setM3TextVal} />
                </CustomizeTile>
              </>
            )}

            {/* M3 Search Bar Controls */}
            {item.name === "m3-search-bar" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3SearchVariant}
                    onChange={(val) => {
                      setM3SearchVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Standard M3 Search Bar", value: "standard-m3" },
                      { label: "Active Expanded View", value: "active-view" },
                      { label: "Minimal SaaS Search", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Search Query">
                  <CustomizeInput value={m3SearchVal} onChange={setM3SearchVal} />
                </CustomizeTile>
              </>
            )}

            {/* M3 Navigation Bar Controls */}
            {item.name === "m3-navigation-bar" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3NavVariant}
                    onChange={(val) => {
                      setM3NavVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Standard M3 (64x32 Pill)", value: "standard-m3" },
                      { label: "With Badges", value: "with-badges" },
                      { label: "Minimal SaaS Bar", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Active Destination">
                  <CustomizeSelect
                    value={m3NavTab}
                    onChange={setM3NavTab}
                    options={[
                      { label: "Home", value: "home" },
                      { label: "Explore", value: "explore" },
                      { label: "Alerts", value: "alerts" },
                      { label: "Profile", value: "profile" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Top App Bar Controls */}
            {item.name === "m3-top-app-bar" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3AppBarVariant}
                    onChange={(val) => {
                      setM3AppBarVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Center-Aligned (M3)", value: "center-aligned" },
                      { label: "Small (M3)", value: "small" },
                      { label: "Medium (M3)", value: "medium" },
                      { label: "Large (M3)", value: "large" },
                      { label: "Minimal SaaS", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Navigation Drawer Controls */}
            {item.name === "m3-navigation-drawer" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3DrawerVariant}
                    onChange={(val) => {
                      setM3DrawerVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Modal Drawer (M3)", value: "modal-drawer" },
                      { label: "Dismissible Drawer", value: "dismissible" },
                      { label: "Minimal SaaS Drawer", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Drawer State">
                  <CustomizeSwitch checked={m3DrawerOpen} onChange={setM3DrawerOpen} label="Open Drawer Modal" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Tabs Controls */}
            {item.name === "m3-tabs" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3TabsVariant}
                    onChange={(val) => {
                      setM3TabsVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Primary (M3 Underline)", value: "primary" },
                      { label: "Secondary (M3 Tonal Pill)", value: "secondary" },
                      { label: "Minimal SaaS Style", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Active Tab">
                  <CustomizeSelect
                    value={m3TabsVal}
                    onChange={setM3TabsVal}
                    options={[
                      { label: "Overview", value: "overview" },
                      { label: "Specifications", value: "specs" },
                      { label: "Reviews", value: "reviews" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Card Controls */}
            {item.name === "m3-card" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3CardVariant}
                    onChange={(val) => {
                      setM3CardVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Outlined (M3)", value: "outlined" },
                      { label: "Elevated (M3)", value: "elevated" },
                      { label: "Filled (M3)", value: "filled" },
                      { label: "Minimal SaaS Card", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Shaped Image Card Controls */}
            {item.name === "shaped-image-card" && (
              <>
                <CustomizeTile label="Silhouette Shape">
                  <CustomizeSelect
                    value={shapedCardShape}
                    onChange={(val) => setShapedCardShape(val as ImageCardShape)}
                    options={[
                      { label: "Square (Sharp 90°)", value: "square" },
                      { label: "Rounded (Squircle)", value: "rounded" },
                      { label: "Circle (Circular Aperture)", value: "circle" },
                      { label: "Pill (Stadium Capsule)", value: "pill" },
                      { label: "Cathedral Arch", value: "arch" },
                      { label: "Cinema Ticket Notch", value: "ticket" },
                      { label: "Honeycomb Hexagon", value: "hexagon" },
                      { label: "Faceted Octagon", value: "octagon" },
                      { label: "Rhombus Diamond", value: "diamond" },
                      { label: "Celestial Starburst", value: "star" },
                      { label: "Heraldic Shield", value: "shield" },
                      { label: "Organic Fluid Blob", value: "blob" },
                      { label: "Cyberpunk Cut-Corner", value: "cut-corner" },
                      { label: "Smooth Heart", value: "heart" },
                      { label: "Floral Rosette Scallop", value: "scallop" },
                      { label: "Geometric Triangle", value: "triangle" },
                      { label: "Speed Parallelogram", value: "parallelogram" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Layout Style">
                  <CustomizeSelect
                    value={shapedCardLayout}
                    onChange={(val) => {
                      setShapedCardLayout(val as ImageCardLayout);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Overlay Hero (Immersive)", value: "overlay" },
                      { label: "Stacked Gallery (Card + Body)", value: "stacked" },
                      { label: "Compact Tile", value: "compact" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Aspect Ratio">
                  <CustomizeSelect
                    value={shapedCardAspect}
                    onChange={(val) => setShapedCardAspect(val as any)}
                    options={[
                      { label: "4:5 Portrait (Standard)", value: "4/5" },
                      { label: "1:1 Square", value: "1/1" },
                      { label: "3:4 Classical", value: "3/4" },
                      { label: "16:9 Widescreen", value: "16/9" },
                      { label: "4:3 Landscape", value: "4/3" },
                      { label: "2:3 Tall Poster", value: "2/3" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Image Preset">
                  <CustomizeSelect
                    value={String(shapedCardImageIdx)}
                    onChange={(val) => setShapedCardImageIdx(Number(val))}
                    options={SHAPED_CARD_IMAGES.map((img, idx) => ({
                      label: `${img.title} (${img.badge})`,
                      value: String(idx),
                    }))}
                  />
                </CustomizeTile>

                <CustomizeTile label="Visual Effect">
                  <CustomizeSelect
                    value={
                      shapedCardBorder && shapedCardGlow
                        ? "stroke-glow"
                        : shapedCardBorder
                        ? "stroke"
                        : shapedCardGlow
                        ? "glow"
                        : "none"
                    }
                    onChange={(val) => {
                      setShapedCardBorder(val === "stroke" || val === "stroke-glow");
                      setShapedCardGlow(val === "glow" || val === "stroke-glow");
                    }}
                    options={[
                      { label: "Contour Stroke & Glow", value: "stroke-glow" },
                      { label: "Contour Stroke Only", value: "stroke" },
                      { label: "Obsidian Glow Only", value: "glow" },
                      { label: "Clean (No Effects)", value: "none" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* 3D Depth Carousel Controls */}
            {item.name === "3d-depth-carousel" && (
              <>
                <CustomizeTile label="Scale">
                  <CustomizeSelect
                    value={depthCarouselSize}
                    onChange={(val) => setDepthCarouselSize(val as "sm" | "default" | "lg")}
                    options={[
                      { label: "Standard (345px)", value: "default" },
                      { label: "Compact (300px)", value: "sm" },
                      { label: "Expanded (415px)", value: "lg" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Active Slide">
                  <CustomizeSelect
                    value={String(depthCarouselIndex)}
                    onChange={(val) => setDepthCarouselIndex(Number(val))}
                    options={[
                      { label: "1. Kyoto Villa", value: "0" },
                      { label: "2. Nordic Fjord", value: "1" },
                      { label: "3. Amalfi Cliff", value: "2" },
                      { label: "4. Matterhorn Chalet", value: "3" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="3D Depth Tilt">
                  <CustomizeSelect
                    value={String(depthCarouselTilt)}
                    onChange={(val) => setDepthCarouselTilt(Number(val))}
                    options={[
                      { label: "Spatial (7°)", value: "7" },
                      { label: "Flat (0°)", value: "0" },
                      { label: "Subtle (4°)", value: "4" },
                      { label: "Dramatic (12°)", value: "12" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Specs Grid Card Controls */}
            {item.name === "specs-grid-card" && (
              <>
                <CustomizeTile label="Max Guests">
                  <CustomizeSelect
                    value={String(specsGuests)}
                    onChange={(val) => setSpecsGuests(Number(val))}
                    options={[
                      { label: "2 Guests (Intimate)", value: "2" },
                      { label: "4 Guests (Standard)", value: "4" },
                      { label: "6 Guests (Group)", value: "6" },
                      { label: "8 Guests (Estate)", value: "8" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Host Trust Card Controls */}
            {item.name === "host-trust-card" && (
              <>
                <CustomizeTile label="Host Identity">
                  <CustomizeSwitch
                    checked={hostVerified}
                    onChange={setHostVerified}
                    label="Verified Shield & Badge"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Booking Action Bar Controls */}
            {item.name === "booking-action-bar" && (
              <>
                <CustomizeTile label="Docking Mode">
                  <CustomizeSwitch
                    checked={bookingSticky}
                    onChange={setBookingSticky}
                    label="Sticky Floating Bar"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Curated Filter Bar Controls */}
            {item.name === "curated-filter-bar" && (
              <>
                <CustomizeTile label="Active Escape Tab">
                  <CustomizeSelect
                    value={curatedActiveFilter}
                    onChange={(val) => setCuratedActiveFilter(val)}
                    options={[
                      { label: "All Escapes", value: "all" },
                      { label: "Trending", value: "trending" },
                      { label: "Off-Grid", value: "offgrid" },
                      { label: "Within 3h", value: "within3h" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 Dialog Controls */}
            {item.name === "m3-dialog" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3DialogVariant}
                    onChange={(val) => {
                      setM3DialogVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Confirmation (M3 28px)", value: "confirmation" },
                      { label: "Basic Dialog", value: "basic" },
                      { label: "Minimal SaaS Dialog", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Dialog Visibility">
                  <CustomizeSwitch checked={m3DialogOpen} onChange={setM3DialogOpen} label="Show modal dialog" />
                </CustomizeTile>
              </>
            )}

            {/* M3 Snackbar Controls */}
            {item.name === "m3-snackbar" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3SnackbarVariant}
                    onChange={(val) => {
                      setM3SnackbarVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "With Action (M3)", value: "with-action" },
                      { label: "Single Line (M3)", value: "single-line" },
                      { label: "Minimal SaaS Toast", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Snackbar Active">
                  <CustomizeSwitch checked={m3SnackbarOpen} onChange={setM3SnackbarOpen} label="Display snackbar" />
                </CustomizeTile>
                <CustomizeTile label="Message">
                  <CustomizeInput value={m3SnackbarMsg} onChange={setM3SnackbarMsg} />
                </CustomizeTile>
              </>
            )}

            {/* M3 Progress Indicator Controls */}
            {item.name === "m3-progress-indicator" && (
              <>
                <CustomizeTile label="Type">
                  <CustomizeSelect
                    value={m3ProgressVariant}
                    onChange={(val) => {
                      setM3ProgressVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Circular Progress", value: "circular" },
                      { label: "Linear Progress", value: "linear" },
                      { label: "Squiggly Circular (M3)", value: "squiggly-circular" },
                      { label: "Squiggly Horizontal (M3)", value: "squiggly-horizontal" },
                      { label: "Shape Morph Spin (Google M3)", value: "shape-morph" },
                      { label: "Elastic Line Physics", value: "elastic-line" },
                      { label: "Minimal SaaS Style", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>

                {/* Single Accent Color Theme */}
                <CustomizeTile label="Accent Color">
                  <CustomizeSelect
                    value={m3ProgressColor}
                    onChange={(val: any) => setM3ProgressColor(val)}
                    options={[
                      { label: "Emerald Accent", value: "accent" },
                      { label: "Google Royal Blue", value: "google" },
                      { label: "Monochrome / Minimal", value: "monochrome" },
                    ]}
                  />
                </CustomizeTile>

                {/* Animation Speed */}
                <CustomizeTile label="Animation Speed">
                  <CustomizeSlider
                    value={m3ProgressSpeed}
                    onChange={setM3ProgressSpeed}
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    formatValue={(v) => `${v.toFixed(1)}x`}
                  />
                </CustomizeTile>

                {/* Shape Morph Specific Controls */}
                {m3ProgressVariant === "shape-morph" && (
                  <>
                    <CustomizeTile label="Morph Style">
                      <CustomizeSelect
                        value={m3MorphVariant}
                        onChange={(val: any) => setM3MorphVariant(val)}
                        options={[
                          { label: "Uncontained (M3)", value: "uncontained" },
                          { label: "Contained Surface (M3)", value: "contained" },
                        ]}
                      />
                    </CustomizeTile>
                    {m3MorphVariant === "contained" && (
                      <CustomizeTile label="Container Shape">
                        <CustomizeSelect
                          value={m3ContainerShape}
                          onChange={(val: any) => setM3ContainerShape(val)}
                          options={[
                            { label: "Squircle", value: "squircle" },
                            { label: "Circle", value: "circle" },
                            { label: "Rounded", value: "rounded" },
                          ]}
                        />
                      </CustomizeTile>
                    )}
                    <CustomizeTile label="Indicator Size">
                      <CustomizeSlider
                        value={m3MorphSize}
                        onChange={setM3MorphSize}
                        min={36}
                        max={72}
                        step={4}
                        formatValue={(v) => `${v}px`}
                      />
                    </CustomizeTile>
                  </>
                )}

                {/* Elastic Line Specific Controls */}
                {m3ProgressVariant === "elastic-line" && (
                  <CustomizeTile label="Membrane Tension">
                    <CustomizeSlider
                      value={m3ElasticResistance}
                      onChange={setM3ElasticResistance}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      formatValue={(v) => `${v.toFixed(1)}x`}
                    />
                  </CustomizeTile>
                )}

                {/* Squiggly Wave Specific Controls */}
                {(m3ProgressVariant === "squiggly-circular" || m3ProgressVariant === "squiggly-horizontal") && (
                  <>
                    <CustomizeTile label="Squiggle Frequency">
                      <CustomizeSlider
                        value={m3SquiggleCount}
                        onChange={setM3SquiggleCount}
                        min={8}
                        max={24}
                        step={1}
                        formatValue={(v) => `${v} waves`}
                      />
                    </CustomizeTile>
                    <CustomizeTile label="Wave Amplitude">
                      <CustomizeSlider
                        value={m3SquiggleAmp}
                        onChange={setM3SquiggleAmp}
                        min={2}
                        max={8}
                        step={0.5}
                        formatValue={(v) => `${v}px`}
                      />
                    </CustomizeTile>
                  </>
                )}

                {/* Standard Progress Controls */}
                {(m3ProgressVariant === "circular" || m3ProgressVariant === "linear" || m3ProgressVariant === "minimal") && (
                  <CustomizeTile label="Progress Value">
                    <CustomizeSlider
                      value={m3ProgressVal}
                      onChange={setM3ProgressVal}
                      min={0}
                      max={100}
                      step={1}
                      formatValue={(v) => `${v}%`}
                    />
                  </CustomizeTile>
                )}
              </>
            )}

            {/* M3 Badge Controls */}
            {item.name === "m3-badge" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3BadgeVariant}
                    onChange={(val) => {
                      setM3BadgeVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Count Badge (M3)", value: "count" },
                      { label: "Dot Badge (M3)", value: "dot" },
                      { label: "Minimal SaaS Badge", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Badge Count">
                  <CustomizeSlider
                    value={m3BadgeVal}
                    onChange={setM3BadgeVal}
                    min={0}
                    max={99}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>
              </>
            )}

            {/* M3 List Controls */}
            {item.name === "m3-list" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={m3ListVariant}
                    onChange={(val) => {
                      setM3ListVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Two-Line (M3)", value: "two-line" },
                      { label: "One-Line (M3)", value: "one-line" },
                      { label: "Three-Line (M3)", value: "three-line" },
                      { label: "Minimal SaaS List", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Biometric Scanner Controls */}
            {item.name === "biometric-scanner" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={biometricVariant}
                    onChange={(val) => {
                      setBiometricVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Tile (Card)", value: "tile" },
                      { label: "Pill (Compact)", value: "pill" },
                      { label: "Minimal (Icon)", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Sensor Size">
                  <CustomizeSelect
                    value={biometricSize}
                    onChange={(val) => setBiometricSize(val as any)}
                    options={[
                      { label: "Small (36px)", value: "sm" },
                      { label: "Medium (48px)", value: "md" },
                      { label: "Large (64px)", value: "lg" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* OTP Input Controls */}
            {(item.name === "m3-otp-input" || item.name === "otp-input") && (
              <>
                <CustomizeTile label="Length">
                  <CustomizeSelect
                    value={String(otpLength)}
                    onChange={(val) => setOtpLength(Number(val))}
                    options={[
                      { label: "4 Digits", value: "4" },
                      { label: "6 Digits (Standard)", value: "6" },
                      { label: "8 Digits", value: "8" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Mask Characters">
                  <CustomizeSwitch
                    label="Bullet Mask"
                    checked={otpMask}
                    onChange={setOtpMask}
                  />
                </CustomizeTile>
                <CustomizeTile label="Error State">
                  <CustomizeSwitch
                    label="Simulate Invalid PIN"
                    checked={otpError}
                    onChange={setOtpError}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Mobile Haptic Stepper Controls */}
            {(item.name === "mobile-haptic-stepper" || item.name === "haptic-stepper") && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={stepperVariant}
                    onChange={(val) => {
                      setStepperVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Pill Shape", value: "pill" },
                      { label: "Compact", value: "compact" },
                      { label: "Segmented Bar", value: "segmented" },
                      { label: "Minimal Outlined", value: "minimal" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Button Size">
                  <CustomizeSelect
                    value={stepperSize}
                    onChange={(val) => setStepperSize(val as any)}
                    options={[
                      { label: "Small", value: "sm" },
                      { label: "Medium", value: "md" },
                      { label: "Large", value: "lg" },
                    ]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Badge Controls */}
            {item.name === "badge" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={badgeVariant}
                    onChange={(val) => {
                      setBadgeVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={item.variants || ["default", "secondary", "outline", "success", "destructive", "muted"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Badge Text">
                  <CustomizeInput
                    value={badgeText}
                    onChange={setBadgeText}
                    placeholder="Badge label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Status Dot">
                  <CustomizeSwitch
                    checked={badgeDot}
                    onChange={setBadgeDot}
                    label="Toggle status indicator dot"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Card Controls */}
            {item.name === "card" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={cardTitle}
                    onChange={setCardTitle}
                    placeholder="Card title"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={cardDesc}
                    onChange={setCardDesc}
                    placeholder="Card description"
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Effect">
                  <CustomizeSwitch
                    checked={cardHover}
                    onChange={setCardHover}
                    label="Toggle hover glow effect"
                  />
                </CustomizeTile>
              </>
            )}

            {/* StatCard Controls */}
            {item.name === "stat-card" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={statTitle}
                    onChange={setStatTitle}
                    placeholder="Metric name"
                  />
                </CustomizeTile>

                <CustomizeTile label="Value">
                  <CustomizeInput
                    value={statValue}
                    onChange={setStatValue}
                    placeholder="12,840"
                  />
                </CustomizeTile>

                <CustomizeTile label="Change">
                  <CustomizeInput
                    value={statChange}
                    onChange={setStatChange}
                    placeholder="+14.2%"
                  />
                </CustomizeTile>

                <CustomizeTile label="Trend">
                  <CustomizeSelect
                    value={statTrend}
                    onChange={(v) => setStatTrend(v as any)}
                    options={["up", "down", "neutral"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Caption">
                  <CustomizeInput
                    value={statCaption}
                    onChange={setStatCaption}
                    placeholder="vs last month"
                  />
                </CustomizeTile>

                <CustomizeTile label="Trend Badge">
                  <CustomizeSwitch
                    checked={statBadge}
                    onChange={setStatBadge}
                    label="Show trend badge"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Sidebar Controls */}
            {item.name === "sidebar" && (
              <>
                <CustomizeTile label="Sidebar Variant">
                  <CustomizeSelect
                    value={sidebarVariant}
                    onChange={(v) => {
                      setSidebarVariant(v as any);
                      onVariantChange?.(v);
                    }}
                    options={[
                      { label: "Scrollable Categories (Fixed Overview)", value: "scrollable-categories" },
                      { label: "Default (Unified Scroll)", value: "default" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Collapsed Mode">
                  <CustomizeSwitch
                    checked={sidebarDemoCollapsed}
                    onChange={setSidebarDemoCollapsed}
                    label="Toggle sidebar collapse"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Tabs Controls */}
            {item.name === "tabs" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={tabVariant}
                    onChange={(v) => {
                      setTabVariant(v as any);
                      onVariantChange?.(v);
                    }}
                    options={["default", "slide", "liquid-pill", "island", "minimal"]}
                  />
                </CustomizeTile>
                {(tabVariant === "liquid-pill" || tabVariant === "island") && (
                  <CustomizeTile label="Pill Style">
                    <CustomizeSelect
                      value={tabPillStyle}
                      onChange={(v) => setTabPillStyle(v as any)}
                      options={["liquid-glow", "solid", "glass", "accent"]}
                    />
                  </CustomizeTile>
                )}
                <CustomizeTile label="Active Tab">
                  <CustomizeSelect
                    value={tabValue}
                    onChange={setTabValue}
                    options={["overview", "metrics", "logs", "settings"]}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Expanding Card Controls */}
            {item.name === "expanding-card" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={expandingTitle}
                    onChange={setExpandingTitle}
                    placeholder="Card Title"
                  />
                </CustomizeTile>
                <CustomizeTile label="Subtitle">
                  <CustomizeInput
                    value={expandingSubtitle}
                    onChange={setExpandingSubtitle}
                    placeholder="Subtitle description"
                  />
                </CustomizeTile>
                <CustomizeTile label="Force Expanded">
                  <CustomizeSwitch
                    checked={expandingForced}
                    onChange={setExpandingForced}
                    label="Preview 4x full card state"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Blurred Carousel Controls */}
            {item.name === "blurred-carousel" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={carouselTitle}
                    onChange={setCarouselTitle}
                    placeholder="Featured Templates"
                  />
                </CustomizeTile>
                <CustomizeTile label="AutoPlay">
                  <CustomizeSwitch
                    checked={carouselAutoplay}
                    onChange={setCarouselAutoplay}
                    label="Automated slide transition"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Content Slider Controls */}
            {item.name === "content-slider" && (
              <>
                <CustomizeTile label="Active Section">
                  <CustomizeSelect
                    value={tocActiveId}
                    onChange={setTocActiveId}
                    options={[
                      { label: "Installation", value: "installation" },
                      { label: "Usage", value: "usage" },
                      { label: "Check animation", value: "check-animation" },
                      { label: "Animation", value: "animation" },
                      { label: "API Reference", value: "api-reference" },
                      { label: "API Primitives", value: "api-primitives" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Rubber Band Motion">
                  <CustomizeSwitch
                    checked={tocRubberBand}
                    onChange={setTocRubberBand}
                    label="Enable rubber band physics"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Footer Controls */}
            {item.name === "footer" && (
              <>
                <CustomizeTile label="Brand Text">
                  <CustomizeInput
                    value={footerBrandText}
                    onChange={setFooterBrandText}
                    placeholder="kilo/ui"
                  />
                </CustomizeTile>
                <CustomizeTile label="Frosted Blur Blend">
                  <CustomizeSwitch
                    checked={footerBlurBlend}
                    onChange={setFooterBlurBlend}
                    label="Soft bottom blur blend"
                  />
                </CustomizeTile>
                <CustomizeTile label="Newsletter Subscribe">
                  <CustomizeSwitch
                    checked={footerShowNewsletter}
                    onChange={setFooterShowNewsletter}
                    label="Render newsletter input"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Scroll Marquee Controls */}
            {item.name === "scroll-marquee" && (
              <>
                <CustomizeTile label="Motion Variant">
                  <CustomizeSelect
                    value={marqueeVariant}
                    onChange={(val) => {
                      setMarqueeVariant(val as any);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Scroll Left (Slide Left)", value: "scroll-left" },
                      { label: "Scroll Right (Slide Right)", value: "scroll-right" },
                      { label: "Dual Scroll (Counter Slide)", value: "dual-scroll" },
                      { label: "Velocity Skew (Elastic Tilt)", value: "velocity-skew" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Text Color">
                  <CustomizeColorPicker
                    value={marqueeTextColor}
                    onChange={setMarqueeTextColor}
                    presets={[
                      { label: "Default", color: "" },
                      { label: "Pure White", color: "#ffffff" },
                      { label: "Neon Lime", color: "#4ade80" },
                      { label: "Electric Cyan", color: "#22d3ee" },
                      { label: "Bright Violet", color: "#c084fc" },
                      { label: "Amber Sun", color: "#fbbf24" },
                      { label: "Muted Gray", color: "#71717a" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Edge Blur Color">
                  <CustomizeColorPicker
                    value={marqueeBlurColor}
                    onChange={setMarqueeBlurColor}
                    presets={[
                      { label: "Transparent Mask (Default)", color: "mask" },
                      { label: "Theme BG (#0a0a0c)", color: "#0a0a0c" },
                      { label: "Surface (#141418)", color: "#141418" },
                      { label: "Midnight (#020617)", color: "#020617" },
                      { label: "Forest (#051e15)", color: "#051e15" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Stroke Outline">
                  <CustomizeSwitch
                    checked={marqueeOutline}
                    onChange={setMarqueeOutline}
                    label="Outline text styling"
                  />
                </CustomizeTile>
                <CustomizeTile label="Headline Text">
                  <CustomizeInput
                    value={marqueeText}
                    onChange={setMarqueeText}
                    placeholder="Headline text..."
                  />
                </CustomizeTile>
              </>
            )}

            {/* Directional Marquee Controls */}
            {item.name === "directional-marquee" && (
              <>
                <CustomizeTile label="Direction Mode">
                  <CustomizeSelect
                    value={dirMarqueeDir}
                    onChange={(val) => setDirMarqueeDir(val as any)}
                    options={[
                      { label: "Auto (Detect Page Scroll)", value: "auto" },
                      { label: "Simulate Down (T1 ➔ / T2 ⬅)", value: "down" },
                      { label: "Simulate Up (T1 ⬅ / T2 ➔)", value: "up" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Text Color">
                  <CustomizeColorPicker
                    value={dirMarqueeTextColor}
                    onChange={setDirMarqueeTextColor}
                    presets={[
                      { label: "Default", color: "" },
                      { label: "Pure White", color: "#ffffff" },
                      { label: "Neon Lime", color: "#4ade80" },
                      { label: "Electric Cyan", color: "#22d3ee" },
                      { label: "Bright Violet", color: "#c084fc" },
                      { label: "Amber Sun", color: "#fbbf24" },
                      { label: "Muted Gray", color: "#71717a" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Edge Blur Color">
                  <CustomizeColorPicker
                    value={dirMarqueeBlurColor}
                    onChange={setDirMarqueeBlurColor}
                    presets={[
                      { label: "Transparent Mask (Default)", color: "mask" },
                      { label: "Theme BG (#0a0a0c)", color: "#0a0a0c" },
                      { label: "Surface (#141418)", color: "#141418" },
                      { label: "Midnight (#020617)", color: "#020617" },
                      { label: "Forest (#051e15)", color: "#051e15" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Direction HUD">
                  <CustomizeSwitch
                    checked={dirMarqueeHud}
                    onChange={setDirMarqueeHud}
                    label="Show directional status badge"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Kinetic Text Controls */}
            {item.name === "kinetic-text" && (
              <>
                <CustomizeTile label="Motion Variant">
                  <CustomizeSelect
                    value={kineticVariant}
                    onChange={(val) => {
                      setKineticVariant(val as any);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Rubber Band (Hover Spring)", value: "rubber-band" },
                      { label: "Wave Ripple (Harmonic Sine)", value: "wave-ripple" },
                      { label: "Scramble Decode (Cyber Glyphs)", value: "scramble-decode" },
                      { label: "Magnetic Tilt (3D Angular)", value: "magnetic-tilt" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Text Content">
                  <CustomizeInput
                    value={kineticText}
                    onChange={setKineticText}
                    placeholder="KILO / MOTION UI"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Search Bar Controls */}
            {(item.name === "search-bar" || item.name === "liquid-glass-search-bar") && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={searchBarVariant}
                    onChange={(val) => {
                      setSearchBarVariant(val);
                      onVariantChange?.(val);
                    }}
                    options={[
                      { label: "Downward Expand (Liquid Glass)", value: "downward-expand" },
                      { label: "Circle Pop-out (Liquid Glass)", value: "circle-popout" },
                      { label: "Minimal SaaS (Command Pill)", value: "minimal-pill" },
                      { label: "Minimal SaaS (Expand Trigger)", value: "minimal-expand" },
                    ]}
                  />
                </CustomizeTile>
                <CustomizeTile label="Expanded State">
                  <CustomizeSwitch
                    checked={searchBarExpanded}
                    onChange={setSearchBarExpanded}
                    label="Toggle expanded search state (⌘K / Esc)"
                  />
                </CustomizeTile>
                <CustomizeTile label="Placeholder Text">
                  <CustomizeInput
                    value={searchBarPlaceholder}
                    onChange={setSearchBarPlaceholder}
                    placeholder="Search components..."
                  />
                </CustomizeTile>
              </>
            )}

            {/* Minimalist Login Controls */}
            {item.name === "minimalist-login" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={loginVariant}
                    onChange={(val) => {
                      const v = val as "sharp-edges" | "rounded-corners";
                      setLoginVariant(v);
                      onVariantChange?.(v);
                    }}
                    options={[
                      { label: "Sharp Edges", value: "sharp-edges" },
                      { label: "Rounded Corners", value: "rounded-corners" },
                    ]}
                  />
                </CustomizeTile>

                {loginVariant === "rounded-corners" && (
                  <CustomizeTile label={`Border Radius: ${loginRadius}px`}>
                    <input
                      type="range"
                      min="4"
                      max="36"
                      step="2"
                      value={loginRadius}
                      onChange={(e) => setLoginRadius(Number(e.target.value))}
                      className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                      title="Adjust border radius"
                    />
                  </CustomizeTile>
                )}

                <CustomizeTile label="Sphere Motion">
                  <Switch
                    checked={loginSphereMotion}
                    onCheckedChange={setLoginSphereMotion}
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Dot Reaction">
                  <Switch
                    checked={loginInteractiveDots}
                    onCheckedChange={setLoginInteractiveDots}
                  />
                </CustomizeTile>

                <CustomizeTile label={`Rotation Speed: ${loginRotationSpeed}x`}>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.5"
                    value={loginRotationSpeed}
                    onChange={(e) => setLoginRotationSpeed(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Adjust rotation speed"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Horizon Login Controls */}
            {item.name === "horizon-login" && (
              <>
                <CustomizeTile label="Default Tab">
                  <CustomizeSelect
                    value={horizonLoginDefaultTab}
                    onChange={(val) => setHorizonLoginDefaultTab(val as "login" | "signup")}
                    options={[
                      { label: "Login", value: "login" },
                      { label: "Sign Up", value: "signup" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label={`Speed: ${horizonLoginSpeed}x`}>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={horizonLoginSpeed}
                    onChange={(e) => setHorizonLoginSpeed(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Adjust horizon motion speed"
                  />
                </CustomizeTile>

                <CustomizeTile label={`Glow Intensity: ${horizonLoginGlowIntensity}x`}>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.1"
                    value={horizonLoginGlowIntensity}
                    onChange={(e) => setHorizonLoginGlowIntensity(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Adjust luminous glow intensity"
                  />
                </CustomizeTile>

                <CustomizeTile label="Film Grain Texture">
                  <Switch
                    checked={horizonLoginGrain}
                    onCheckedChange={setHorizonLoginGrain}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Blueprint Login Controls */}
            {item.name === "blueprint-login" && (
              <>
                <CustomizeTile label="Default Tab">
                  <CustomizeSelect
                    value={bpLoginDefaultTab}
                    onChange={(val) => setBpLoginDefaultTab(val as "login" | "signup")}
                    options={[
                      { label: "Login", value: "login" },
                      { label: "Sign Up", value: "signup" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label={`Rotation Y: ${bpRotationY}°`}>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={bpRotationY}
                    onChange={(e) => setBpRotationY(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Set Y-axis model rotation angle in degrees"
                  />
                </CustomizeTile>

                <CustomizeTile label={`Pitch X: ${bpRotationX}°`}>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={bpRotationX}
                    onChange={(e) => setBpRotationX(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Set X-axis model pitch in degrees"
                  />
                </CustomizeTile>

                <CustomizeTile label={`Expand Scale: ${bpExpandRatio}x`}>
                  <input
                    type="range"
                    min="1.15"
                    max="1.75"
                    step="0.05"
                    value={bpExpandRatio}
                    onChange={(e) => setBpExpandRatio(Number(e.target.value))}
                    className="w-28 sm:w-32 accent-[var(--accent-green)] cursor-pointer"
                    title="Adjust cylinder hover expansion scale"
                  />
                </CustomizeTile>

                <CustomizeTile label="Neighbor Wave">
                  <Switch
                    checked={bpNeighborWave}
                    onCheckedChange={setBpNeighborWave}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Concave Carousel Controls matching Image 3 */}
            {item.name === "concave-carousel" && (
              <>
                {/* Row 1 */}
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={concavePreset}
                    onChange={(val) => handleConcavePresetChange(val as any)}
                    options={["Rotunda", "Tunnel", "Flat", "Panoramic", "Convex"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Autoplay">
                  <CustomizeSelect
                    value={concaveAutoplay}
                    onChange={(val) => setConcaveAutoplay(val as any)}
                    options={["Drift", "None", "Step"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Background">
                  <CustomizeHexColorPicker
                    value={concaveBg}
                    onChange={setConcaveBg}
                  />
                </CustomizeTile>

                {/* Row 2 */}
                <CustomizeTile label="Aspect">
                  <CustomizeSlider
                    value={concaveAspect}
                    onChange={setConcaveAspect}
                    min={0.5}
                    max={2.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSlider
                    value={concaveSize}
                    onChange={setConcaveSize}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Curvature">
                  <CustomizeSlider
                    value={concaveCurvature}
                    onChange={setConcaveCurvature}
                    min={-2.0}
                    max={2.0}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 3 */}
                <CustomizeTile label="Distance">
                  <CustomizeSlider
                    value={concaveDistance}
                    onChange={setConcaveDistance}
                    min={1.0}
                    max={10.0}
                    step={0.2}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Tilt">
                  <CustomizeSlider
                    value={concaveTilt}
                    onChange={setConcaveTilt}
                    min={-30}
                    max={30}
                    step={1}
                    unit="°"
                    formatValue={(v) => `${v.toFixed(1)}°`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Gap">
                  <CustomizeSlider
                    value={concaveGap}
                    onChange={setConcaveGap}
                    min={0}
                    max={60}
                    step={2}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                {/* Row 4 */}
                <CustomizeTile label="Radius">
                  <CustomizeSlider
                    value={concaveRadius}
                    onChange={setConcaveRadius}
                    min={0}
                    max={40}
                    step={2}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Reflection">
                  <CustomizeSlider
                    value={concaveReflection}
                    onChange={setConcaveReflection}
                    min={0}
                    max={0.5}
                    step={0.01}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Dim">
                  <CustomizeSlider
                    value={concaveDim}
                    onChange={setConcaveDim}
                    min={0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 5 */}
                <CustomizeTile label="Speed">
                  <CustomizeSlider
                    value={concaveSpeed}
                    onChange={setConcaveSpeed}
                    min={0.01}
                    max={1.0}
                    step={0.01}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Interval">
                  <CustomizeSlider
                    value={concaveInterval}
                    onChange={setConcaveInterval}
                    min={1.0}
                    max={10.0}
                    step={0.5}
                    unit="s"
                    formatValue={(v) => `${v.toFixed(1)}s`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Inertia">
                  <CustomizeSlider
                    value={concaveInertia}
                    onChange={setConcaveInertia}
                    min={0.1}
                    max={0.95}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 6 */}
                <CustomizeTile label="Snap">
                  <CustomizeSwitch
                    checked={concaveSnap}
                    onChange={setConcaveSnap}
                    label="Snap"
                  />
                </CustomizeTile>

                <CustomizeTile label="Pause On Hover">
                  <CustomizeSwitch
                    checked={concavePauseOnHover}
                    onChange={setConcavePauseOnHover}
                    label="Pause On Hover"
                  />
                </CustomizeTile>

                <CustomizeTile label="Draggable">
                  <CustomizeSwitch
                    checked={concaveDraggable}
                    onChange={setConcaveDraggable}
                    label="Draggable"
                  />
                </CustomizeTile>

                {/* Row 7 */}
                <CustomizeTile label="Wheel">
                  <CustomizeSwitch
                    checked={concaveWheel}
                    onChange={setConcaveWheel}
                    label="Wheel"
                  />
                </CustomizeTile>

                <CustomizeTile label="Captions">
                  <CustomizeSwitch
                    checked={concaveCaptions}
                    onChange={setConcaveCaptions}
                    label="Captions"
                  />
                </CustomizeTile>

                <CustomizeTile label="Controls">
                  <CustomizeSwitch
                    checked={concaveControls}
                    onChange={setConcaveControls}
                    label="Controls"
                  />
                </CustomizeTile>

                {/* Row 8 */}
                <CustomizeTile label="Paused">
                  <CustomizeSwitch
                    checked={concavePaused}
                    onChange={setConcavePaused}
                    label="Paused"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Prismatic Slats Controls matching Image 5 */}
            {item.name === "prismatic-slats-bg" && (
              <>
                {/* Row 1 */}
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={slatPreset}
                    onChange={(val) => handleSlatPresetChange(val as any)}
                    options={["Violet", "Cyan", "Sunset", "Emerald"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Background">
                  <CustomizeHexColorPicker
                    value={slatBg}
                    onChange={setSlatBg}
                  />
                </CustomizeTile>

                <CustomizeTile label="Primary">
                  <CustomizeHexColorPicker
                    value={slatPrimary}
                    onChange={setSlatPrimary}
                  />
                </CustomizeTile>

                {/* Row 2 */}
                <CustomizeTile label="Secondary">
                  <CustomizeHexColorPicker
                    value={slatSecondary}
                    onChange={setSlatSecondary}
                  />
                </CustomizeTile>

                <CustomizeTile label="Angle">
                  <CustomizeSlider
                    value={slatAngle}
                    onChange={setSlatAngle}
                    min={-90}
                    max={90}
                    step={1}
                    unit="°"
                    formatValue={(v) => `${Math.round(v)}°`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Flutes">
                  <CustomizeSlider
                    value={slatFlutes}
                    onChange={setSlatFlutes}
                    min={2}
                    max={30}
                    step={1}
                    formatValue={(v) => `${Math.round(v)}`}
                  />
                </CustomizeTile>

                {/* Row 3 */}
                <CustomizeTile label="Refraction">
                  <CustomizeSlider
                    value={slatRefraction}
                    onChange={setSlatRefraction}
                    min={0}
                    max={10}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Aberration">
                  <CustomizeSlider
                    value={slatAberration}
                    onChange={setSlatAberration}
                    min={0}
                    max={2}
                    step={0.01}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Softness">
                  <CustomizeSlider
                    value={slatSoftness}
                    onChange={setSlatSoftness}
                    min={0}
                    max={1}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 4 */}
                <CustomizeTile label="Wave">
                  <CustomizeSlider
                    value={slatWave}
                    onChange={setSlatWave}
                    min={0}
                    max={0.5}
                    step={0.01}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Frequency">
                  <CustomizeSlider
                    value={slatWaveFreq}
                    onChange={setSlatWaveFreq}
                    min={0.1}
                    max={5}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Drift">
                  <CustomizeSlider
                    value={slatDrift}
                    onChange={setSlatDrift}
                    min={-1}
                    max={1}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 5 */}
                <CustomizeTile label="Highlight">
                  <CustomizeSlider
                    value={slatHighlight}
                    onChange={setSlatHighlight}
                    min={0}
                    max={1}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Highlight Softness">
                  <CustomizeSlider
                    value={slatHighlightSoft}
                    onChange={setSlatHighlightSoft}
                    min={0}
                    max={1}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Light Angle">
                  <CustomizeSlider
                    value={slatLightAngle}
                    onChange={setSlatLightAngle}
                    min={-180}
                    max={180}
                    step={5}
                    unit="°"
                    formatValue={(v) => `${Math.round(v)}°`}
                  />
                </CustomizeTile>

                {/* Row 6 */}
                <CustomizeTile label="Radius">
                  <CustomizeSlider
                    value={slatRadius}
                    onChange={setSlatRadius}
                    min={1}
                    max={20}
                    step={0.5}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Momentum">
                  <CustomizeSlider
                    value={slatMomentum}
                    onChange={setSlatMomentum}
                    min={0}
                    max={50}
                    step={1}
                    formatValue={(v) => `${Math.round(v)}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Swirl">
                  <CustomizeSlider
                    value={slatSwirl}
                    onChange={setSlatSwirl}
                    min={-10}
                    max={10}
                    step={1}
                    formatValue={(v) => `${Math.round(v)}`}
                  />
                </CustomizeTile>

                {/* Row 7 */}
                <CustomizeTile label="Intensity">
                  <CustomizeSlider
                    value={slatIntensity}
                    onChange={setSlatIntensity}
                    min={0}
                    max={2}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Trail">
                  <CustomizeSlider
                    value={slatTrail}
                    onChange={setSlatTrail}
                    min={0}
                    max={3}
                    step={0.1}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Texture">
                  <CustomizeSlider
                    value={slatTexture}
                    onChange={setSlatTexture}
                    min={0}
                    max={1}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                {/* Row 8 */}
                <CustomizeTile label="Grain">
                  <CustomizeSlider
                    value={slatGrainVal}
                    onChange={setSlatGrainVal}
                    min={0}
                    max={0.2}
                    step={0.005}
                    formatValue={(v) => v.toFixed(3)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Speed">
                  <CustomizeSlider
                    value={slatSpeed}
                    onChange={setSlatSpeed}
                    min={0}
                    max={3}
                    step={0.1}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Autoplay">
                  <CustomizeSwitch
                    checked={slatAutoplay}
                    onChange={setSlatAutoplay}
                    label="Autoplay"
                  />
                </CustomizeTile>

                {/* Row 9 */}
                <CustomizeTile label="Interactive">
                  <CustomizeSwitch
                    checked={slatInteractive}
                    onChange={setSlatInteractive}
                    label="Interactive"
                  />
                </CustomizeTile>

                <CustomizeTile label="Paused">
                  <CustomizeSwitch
                    checked={slatPaused}
                    onChange={setSlatPaused}
                    label="Paused"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Grainy Grid Shader Controls */}
            {item.name === "grainy-grid-shader" && (
              <>
                {/* Row 1: Variant, Grain, Roughness */}
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={gridVariant}
                    onChange={(val) => handleGridVariantChange(val as any)}
                    options={["rough-matte", "tactile-kraft", "cyber-mesh"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Grain">
                  <CustomizeSlider
                    value={gridGrain}
                    onChange={setGridGrain}
                    min={0}
                    max={0.6}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Roughness">
                  <CustomizeSlider
                    value={gridRoughness}
                    onChange={setGridRoughness}
                    min={0.2}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                {/* Row 2: Columns, Rows, Cell Size */}
                <CustomizeTile label="Columns">
                  <CustomizeSlider
                    value={gridColumns}
                    onChange={setGridColumns}
                    min={3}
                    max={12}
                    step={1}
                    formatValue={(v) => `${Math.round(v)}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Rows">
                  <CustomizeSlider
                    value={gridRows}
                    onChange={setGridRows}
                    min={2}
                    max={8}
                    step={1}
                    formatValue={(v) => `${Math.round(v)}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Cell Size">
                  <CustomizeSlider
                    value={gridCellSize}
                    onChange={setGridCellSize}
                    min={32}
                    max={80}
                    step={2}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                {/* Row 3: Speed, Cursor Radius */}
                <CustomizeTile label="Wave Speed">
                  <CustomizeSlider
                    value={gridSpeed}
                    onChange={setGridSpeed}
                    min={0.2}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Cursor Radius">
                  <CustomizeSlider
                    value={gridRadius}
                    onChange={setGridRadius}
                    min={60}
                    max={260}
                    step={10}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                {/* Row 4: Auto Wave, Interactive */}
                <CustomizeTile label="Auto Wave">
                  <CustomizeSwitch
                    checked={gridAutoWave}
                    onChange={setGridAutoWave}
                    label="Auto Wave"
                  />
                </CustomizeTile>

                <CustomizeTile label="Interactive">
                  <CustomizeSwitch
                    checked={gridInteractive}
                    onChange={setGridInteractive}
                    label="Interactive"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Grainy Horizon Shader Controls with Color Changing & Liquid Cursor */}
            {item.name === "grainy-horizon-shader" && (
              <>
                <CustomizeTile label="Color Theme">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={horizonColor}
                      onChange={(e) => {
                        setHorizonColor(e.target.value);
                        setHorizonVariant("custom");
                      }}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                      title="Custom Aura Color"
                    />
                    <input
                      type="text"
                      value={horizonColor}
                      onChange={(e) => {
                        setHorizonColor(e.target.value);
                        setHorizonVariant("custom");
                      }}
                      className="h-8 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 font-mono text-xs text-[var(--text-primary)]"
                      placeholder="#6633ee"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Preset Palette">
                  <CustomizeSelect
                    value={horizonVariant}
                    onChange={(val) => handleHorizonVariantChange(val as any)}
                    options={[
                      "ultraviolet",
                      "aurora-green",
                      "solar-amber",
                      "cyber-cyan",
                      "monochrome",
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glow Intensity">
                  <CustomizeSlider
                    value={horizonGlowIntensity}
                    onChange={setHorizonGlowIntensity}
                    min={0.2}
                    max={2.5}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glow Spread">
                  <CustomizeSlider
                    value={horizonGlowSpread}
                    onChange={setHorizonGlowSpread}
                    min={0.4}
                    max={2.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Liquid Aura Cursor">
                  <CustomizeSwitch
                    checked={horizonLiquidCursor}
                    onChange={setHorizonLiquidCursor}
                    label="Liquid Cursor"
                  />
                </CustomizeTile>

                <CustomizeTile label="Cursor Intensity">
                  <CustomizeSlider
                    value={horizonCursorIntensity}
                    onChange={setHorizonCursorIntensity}
                    min={0.2}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>
              </>
            )}

            {/* Firefly Cursor Controls matching user React Bits customize panel */}
            {item.name === "firefly-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={cursorPreset}
                    onChange={(val) => handleCursorPresetChange(val as any)}
                    options={["comet", "firefly", "nebula", "plasma", "aurora"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={cursorColor}
                      onChange={(e) => setCursorColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <input
                      type="text"
                      value={cursorColor}
                      onChange={(e) => setCursorColor(e.target.value)}
                      className="h-8 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 font-mono text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Cooling Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={cursorCoolingColor}
                      onChange={(e) => setCursorCoolingColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <input
                      type="text"
                      value={cursorCoolingColor}
                      onChange={(e) => setCursorCoolingColor(e.target.value)}
                      className="h-8 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 font-mono text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Intensity">
                  <CustomizeSlider
                    value={cursorIntensity}
                    onChange={setCursorIntensity}
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Trail Width">
                  <CustomizeSlider
                    value={cursorTrailWidth}
                    onChange={setCursorTrailWidth}
                    min={1}
                    max={20}
                    step={1}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Linger">
                  <CustomizeSlider
                    value={cursorLinger}
                    onChange={setCursorLinger}
                    min={0.2}
                    max={4.0}
                    step={0.1}
                    unit="s"
                    formatValue={(v) => `${v.toFixed(1)}s`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glow">
                  <CustomizeSlider
                    value={cursorGlow}
                    onChange={setCursorGlow}
                    min={0}
                    max={2.5}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Hotspot">
                  <CustomizeSlider
                    value={cursorHotspot}
                    onChange={setCursorHotspot}
                    min={0}
                    max={1.5}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Follow Speed">
                  <CustomizeSlider
                    value={cursorFollowSpeed}
                    onChange={setCursorFollowSpeed}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Grain">
                  <CustomizeSlider
                    value={cursorGrain}
                    onChange={setCursorGrain}
                    min={0}
                    max={0.5}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Quality">
                  <CustomizeSelect
                    value={cursorQuality}
                    onChange={(val) => setCursorQuality(val as any)}
                    options={["low", "medium", "high"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Click Burst">
                  <CustomizeSwitch
                    checked={cursorClickBurst}
                    onChange={setCursorClickBurst}
                    label="Click Burst"
                  />
                </CustomizeTile>

                <CustomizeTile label="Enabled">
                  <CustomizeSwitch
                    checked={cursorEnabled}
                    onChange={setCursorEnabled}
                    label="Enabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Ethereal Smoke Shader Controls (Chai AI type Volumetric Smoke) */}
            {item.name === "ethereal-smoke-shader" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={smokePreset}
                    onChange={(val) => handleSmokePresetChange(val as any)}
                    options={["chai-blue", "ethereal-violet", "solar-flare", "emerald-mist", "spectral-white"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Origin Preset">
                  <CustomizeSelect
                    value={smokeOrigin}
                    onChange={(val) => handleSmokeOriginChange(val as any)}
                    options={["right", "left", "center", "bottom"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Origin X (Panels & Offscreen)">
                  <CustomizeSlider
                    value={smokeOriginX}
                    onChange={setSmokeOriginX}
                    min={-0.5}
                    max={1.5}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Origin Y (Panels & Offscreen)">
                  <CustomizeSlider
                    value={smokeOriginY}
                    onChange={setSmokeOriginY}
                    min={-0.5}
                    max={1.5}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Core Color">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="color"
                      value={smokeCoreColor}
                      onChange={(e) => setSmokeCoreColor(e.target.value)}
                      className="w-8 h-8 rounded border border-[var(--border)] bg-transparent cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={smokeCoreColor}
                      onChange={(e) => setSmokeCoreColor(e.target.value)}
                      className="flex-1 px-2.5 py-1 text-xs font-mono rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Smoke Color">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="color"
                      value={smokeColor}
                      onChange={(e) => setSmokeColor(e.target.value)}
                      className="w-8 h-8 rounded border border-[var(--border)] bg-transparent cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={smokeColor}
                      onChange={(e) => setSmokeColor(e.target.value)}
                      className="flex-1 px-2.5 py-1 text-xs font-mono rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Atmosphere Color">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="color"
                      value={smokeAtmoColor}
                      onChange={(e) => setSmokeAtmoColor(e.target.value)}
                      className="w-8 h-8 rounded border border-[var(--border)] bg-transparent cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={smokeAtmoColor}
                      onChange={(e) => setSmokeAtmoColor(e.target.value)}
                      className="flex-1 px-2.5 py-1 text-xs font-mono rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Intensity">
                  <CustomizeSlider
                    value={smokeIntensity}
                    onChange={setSmokeIntensity}
                    min={0.2}
                    max={2.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Volumetric Spread">
                  <CustomizeSlider
                    value={smokeSpread}
                    onChange={setSmokeSpread}
                    min={0.5}
                    max={2.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Turbulence">
                  <CustomizeSlider
                    value={smokeTurbulence}
                    onChange={setSmokeTurbulence}
                    min={0.2}
                    max={2.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Flow Speed">
                  <CustomizeSlider
                    value={smokeSpeed}
                    onChange={setSmokeSpeed}
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Mouse Hover Spread Force">
                  <CustomizeSlider
                    value={smokeMouseSpread}
                    onChange={setSmokeMouseSpread}
                    min={0.0}
                    max={2.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Trail Width (Slim Wake)">
                  <CustomizeSlider
                    value={smokeTrailWidth}
                    onChange={setSmokeTrailWidth}
                    min={6}
                    max={80}
                    step={2}
                    unit="px"
                    formatValue={(v) => `${Math.round(v)}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Trail Linger Duration">
                  <CustomizeSlider
                    value={smokeTrailLinger}
                    onChange={setSmokeTrailLinger}
                    min={0.4}
                    max={4.0}
                    step={0.1}
                    unit="s"
                    formatValue={(v) => `${v.toFixed(1)}s`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Film Grain">
                  <CustomizeSlider
                    value={smokeGrain}
                    onChange={setSmokeGrain}
                    min={0.0}
                    max={0.12}
                    step={0.01}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Vignette">
                  <CustomizeSlider
                    value={smokeVignette}
                    onChange={setSmokeVignette}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Interactive Spread">
                  <CustomizeSwitch
                    checked={smokeInteractive}
                    onChange={setSmokeInteractive}
                    label="Mouse Spreading"
                  />
                </CustomizeTile>
              </>
            )}

                        {/* Contour Tide Controls (React Bits Pro) */}
            {item.name === "contour-tide" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={tidePreset}
                    onChange={(val) => applyVariant(val)}
                    options={["silver", "ocean", "gold", "cyberpunk", "emerald"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Background">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tideBg}
                      onChange={(e) => setTideBg(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={tideBg}
                      onChange={setTideBg}
                      placeholder="#0a0a0a"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Water">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tideWater}
                      onChange={(e) => setTideWater(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={tideWater}
                      onChange={setTideWater}
                      placeholder="#6E6E80"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Crest">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tideCrest}
                      onChange={(e) => setTideCrest(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={tideCrest}
                      onChange={setTideCrest}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Density">
                  <CustomizeSlider
                    value={tideDensity}
                    onChange={setTideDensity}
                    min={0.2}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Particle Size">
                  <CustomizeSlider
                    value={tideParticleSize}
                    onChange={setTideParticleSize}
                    min={0.2}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Height">
                  <CustomizeSlider
                    value={tideWaveHeight}
                    onChange={setTideWaveHeight}
                    min={0.1}
                    max={3.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Choppiness">
                  <CustomizeSlider
                    value={tideChoppiness}
                    onChange={setTideChoppiness}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wavelength">
                  <CustomizeSlider
                    value={tideWavelength}
                    onChange={setTideWavelength}
                    min={0.2}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wind Angle">
                  <CustomizeSlider
                    value={tideWindAngle}
                    onChange={setTideWindAngle}
                    min={0}
                    max={360}
                    step={5}
                    formatValue={(v) => `${v}°`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Horizon">
                  <CustomizeSlider
                    value={tideHorizon}
                    onChange={setTideHorizon}
                    min={0.0}
                    max={0.5}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Fog">
                  <CustomizeSlider
                    value={tideFog}
                    onChange={setTideFog}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glow">
                  <CustomizeSlider
                    value={tideGlow}
                    onChange={setTideGlow}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Foam">
                  <CustomizeSlider
                    value={tideFoam}
                    onChange={setTideFoam}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Speed">
                  <CustomizeSlider
                    value={tideSpeed}
                    onChange={setTideSpeed}
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Parallax">
                  <CustomizeSlider
                    value={tideParallax}
                    onChange={setTideParallax}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Swell">
                  <CustomizeSlider
                    value={tideSwell}
                    onChange={setTideSwell}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Swell Radius">
                  <CustomizeSlider
                    value={tideSwellRadius}
                    onChange={setTideSwellRadius}
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Seed">
                  <CustomizeSlider
                    value={tideSeed}
                    onChange={setTideSeed}
                    min={0}
                    max={100}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Interactive">
                  <CustomizeSwitch
                    checked={tideInteractive}
                    onChange={setTideInteractive}
                    label="Cursor Swell & Parallax"
                  />
                </CustomizeTile>

                <CustomizeTile label="Click Ripples">
                  <CustomizeSwitch
                    checked={tideClickRipples}
                    onChange={setTideClickRipples}
                    label="Spawn Ripple Rings on Click"
                  />
                </CustomizeTile>

                <CustomizeTile label="Paused">
                  <CustomizeSwitch
                    checked={tidePaused}
                    onChange={setTidePaused}
                    label="Freeze Wave Simulation"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Liquid Metal Background Controls */}
            {item.name === "liquid-metal-background" && (
              <>
                <CustomizeTile label="Metallic Tone">
                  <CustomizeSelect
                    value={metalTone}
                    onChange={(val) => setMetalTone(val as any)}
                    options={["cobalt-chrome", "pure-silver", "liquid-gold", "titanium"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Intensity">
                  <CustomizeSelect
                    value={metalIntensity}
                    onChange={(val) => setMetalIntensity(val as any)}
                    options={["subtle", "balanced", "dramatic"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Theme Override">
                  <CustomizeSelect
                    value={metalTheme}
                    onChange={(val) => setMetalTheme(val as any)}
                    options={["system", "dark", "light"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Animation Speed">
                  <CustomizeSlider
                    value={metalSpeed}
                    onChange={setMetalSpeed}
                    min={0.2}
                    max={2.5}
                    step={0.1}
                    unit="x"
                    formatValue={(v) => `${v.toFixed(1)}x`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Interactive Parallax">
                  <CustomizeSwitch
                    checked={metalInteractive}
                    onChange={setMetalInteractive}
                    label="Mouse Parallax & Tilt"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Morph Node Ring Controls */}
            {item.name === "morph-node-ring" && (
              <>
                <CustomizeTile label="Design / Morph">
                  <CustomizeSelect
                    value={ringDesign}
                    onChange={(val) => {
                      const des = val as MorphShapeDesign;
                      setRingDesign(des);
                      const nextVar = des === "all" ? "morph-sequence" : `static-${des}`;
                      setRingVariant(nextVar);
                      onVariantChange?.(nextVar);
                    }}
                    options={[
                      { label: "All (Morphing Sequence)", value: "all" },
                      { label: "Petal / Floral Leaf", value: "petal" },
                      { label: "Diamond / Square", value: "diamond" },
                      { label: "Semicircle / Fan", value: "semicircle" },
                      { label: "Squircle Pillow", value: "squircle" },
                      { label: "Blade Shutter", value: "blade" },
                      { label: "Star Points", value: "star" },
                      { label: "Circle Disc", value: "circle" },
                    ]}
                  />
                </CustomizeTile>

                {/* Morph Speed controls when morphing sequence is active */}
                {ringDesign === "all" && (
                  <>
                    <CustomizeTile label="Loop Animation">
                      <CustomizeSwitch
                        checked={ringLoop}
                        onChange={setRingLoop}
                        label="Continuous Morphing"
                      />
                    </CustomizeTile>

                    <CustomizeTile label="Morph Speed">
                      <CustomizeSlider
                        value={ringSpeed}
                        onChange={setRingSpeed}
                        min={0.2}
                        max={3.0}
                        step={0.1}
                        unit="x"
                        formatValue={(v) => `${v.toFixed(1)}x`}
                      />
                    </CustomizeTile>
                  </>
                )}

                {/* Orbital Rotation Controls: ALWAYS available in both Morphing and Static modes */}
                <CustomizeTile label="Use Rotation">
                  <CustomizeSwitch
                    checked={ringEnableRotation}
                    onChange={setRingEnableRotation}
                    label="Orbital Ring Rotation"
                  />
                </CustomizeTile>

                {ringEnableRotation && (
                  <CustomizeTile label="Rotation Speed">
                    <CustomizeSlider
                      value={ringRotationSpeed}
                      onChange={setRingRotationSpeed}
                      min={-3.0}
                      max={3.0}
                      step={0.2}
                      unit="x"
                      formatValue={(v) => `${v.toFixed(1)}x`}
                    />
                  </CustomizeTile>
                )}

                <CustomizeTile label="Render Mode">
                  <CustomizeSelect
                    value={ringMode}
                    onChange={(val) => setRingMode(val as "image" | "color")}
                    options={[
                      { label: "Use Images (Photos)", value: "image" },
                      { label: "Use Colors (Palette)", value: "color" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Nodes Count">
                  <CustomizeSlider
                    value={ringNodeCount}
                    onChange={setRingNodeCount}
                    min={3}
                    max={16}
                    step={1}
                    unit=""
                    formatValue={(v) => `${v} nodes`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Node Size">
                  <CustomizeSlider
                    value={ringNodeSize}
                    onChange={setRingNodeSize}
                    min={36}
                    max={110}
                    step={2}
                    unit="px"
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Padding / Radius">
                  <CustomizeSlider
                    value={ringRadius}
                    onChange={setRingRadius}
                    min={60}
                    max={220}
                    step={5}
                    unit="px"
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                {ringMode === "image" && (
                  <CustomizeTile label="Keep Faces Upright">
                    <CustomizeSwitch
                      checked={ringKeepUpright}
                      onChange={setRingKeepUpright}
                      label="Counter-rotate Image"
                    />
                  </CustomizeTile>
                )}
              </>
            )}

            {/* Glass Reveal Controls (Matching all 19 Controls from React Bits Pro specification) */}
            {item.name === "glass-reveal" && (
              <>
                <CustomizeTile label="Image URL">
                  <CustomizeImageSelect
                    value={glassRevealImage}
                    onChange={setGlassRevealImage}
                  />
                </CustomizeTile>

                <CustomizeTile label="Shape">
                  <CustomizeSelect
                    value={glassRevealShape}
                    onChange={(val) => setGlassRevealShape(val as GlassRevealShape)}
                    options={[
                      { label: "Circle", value: "circle" },
                      { label: "Square", value: "square" },
                      { label: "Squircle", value: "squircle" },
                      { label: "Diamond", value: "diamond" },
                      { label: "Star (5-Point)", value: "star" },
                    ]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSlider
                    value={glassRevealSize}
                    onChange={setGlassRevealSize}
                    min={0.1}
                    max={1.5}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Softness">
                  <CustomizeSlider
                    value={glassRevealSoftness}
                    onChange={setGlassRevealSoftness}
                    min={0.0}
                    max={1.0}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Distortion">
                  <CustomizeSlider
                    value={glassRevealDistortion}
                    onChange={setGlassRevealDistortion}
                    min={0.0}
                    max={3.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Aberration">
                  <CustomizeSlider
                    value={glassRevealAberration}
                    onChange={setGlassRevealAberration}
                    min={0.0}
                    max={0.05}
                    step={0.002}
                    formatValue={(v) => v.toFixed(3)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wobble">
                  <CustomizeSlider
                    value={glassRevealWobble}
                    onChange={setGlassRevealWobble}
                    min={0.0}
                    max={2.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wobble Speed">
                  <CustomizeSlider
                    value={glassRevealWobbleSpeed}
                    onChange={setGlassRevealWobbleSpeed}
                    min={0.1}
                    max={10.0}
                    step={0.2}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Frequency">
                  <CustomizeSlider
                    value={glassRevealWaveFrequency}
                    onChange={setGlassRevealWaveFrequency}
                    min={1}
                    max={20}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Strength">
                  <CustomizeSlider
                    value={glassRevealWaveStrength}
                    onChange={setGlassRevealWaveStrength}
                    min={0.0}
                    max={0.05}
                    step={0.002}
                    formatValue={(v) => v.toFixed(3)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Speed">
                  <CustomizeSlider
                    value={glassRevealWaveSpeed}
                    onChange={setGlassRevealWaveSpeed}
                    min={0.1}
                    max={5.0}
                    step={0.2}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Grain">
                  <CustomizeSlider
                    value={glassRevealGrain}
                    onChange={setGlassRevealGrain}
                    min={0.0}
                    max={0.1}
                    step={0.005}
                    formatValue={(v) => v.toFixed(3)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Grain Speed">
                  <CustomizeSlider
                    value={glassRevealGrainSpeed}
                    onChange={setGlassRevealGrainSpeed}
                    min={1}
                    max={30}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Grayscale">
                  <CustomizeSlider
                    value={glassRevealGrayscale}
                    onChange={setGlassRevealGrayscale}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Dim">
                  <CustomizeSlider
                    value={glassRevealDim}
                    onChange={setGlassRevealDim}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Follow">
                  <CustomizeSlider
                    value={glassRevealFollow}
                    onChange={setGlassRevealFollow}
                    min={0.0}
                    max={0.99}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Return To Center">
                  <CustomizeSwitch
                    checked={glassRevealReturnToCenter}
                    onChange={setGlassRevealReturnToCenter}
                    label="Center on Mouse Leave"
                  />
                </CustomizeTile>

                <CustomizeTile label="Fallback Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={glassRevealFallback}
                      onChange={(e) => setGlassRevealFallback(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded-lg border border-[var(--border)] bg-transparent p-1"
                    />
                    <CustomizeInput
                      value={glassRevealFallback}
                      onChange={setGlassRevealFallback}
                      placeholder="#171717"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Paused">
                  <CustomizeSwitch
                    checked={glassRevealPaused}
                    onChange={setGlassRevealPaused}
                    label="Freeze Animation Time"
                  />
                </CustomizeTile>
              </>
            )}

            {/* 29. Target Cursor / Magnetic Cursor Controls (React Bits) */}
            {item.name === "magnetic-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={magVariant}
                    onChange={(val) => applyVariant(val)}
                    options={["brackets-reticle", "cyber-lock", "matrix-target", "minimal-cross", "amber-tracker"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Cursor Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={magColor}
                      onChange={(e) => setMagColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={magColor}
                      onChange={setMagColor}
                      placeholder="#ffffff"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Color on Target">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={magColorOnTarget || "#5CA904"}
                      onChange={(e) => setMagColorOnTarget(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={magColorOnTarget}
                      onChange={setMagColorOnTarget}
                      placeholder="Optional, e.g. #5CA904"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Spin Duration">
                  <CustomizeSlider
                    value={magSpinDuration}
                    onChange={setMagSpinDuration}
                    min={0}
                    max={6}
                    step={0.2}
                    formatValue={(v) => v === 0 ? "Off (0s)" : `${v.toFixed(1)}s`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Duration">
                  <CustomizeSlider
                    value={magHoverDuration}
                    onChange={setMagHoverDuration}
                    min={0.05}
                    max={0.6}
                    step={0.05}
                    formatValue={(v) => `${v.toFixed(2)}s`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Reticle Size">
                  <CustomizeSlider
                    value={magSize}
                    onChange={setMagSize}
                    min={16}
                    max={80}
                    step={2}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Bracket Corner Arm">
                  <CustomizeSlider
                    value={magCornerSize}
                    onChange={setMagCornerSize}
                    min={4}
                    max={24}
                    step={1}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Stroke Thickness">
                  <CustomizeSlider
                    value={magThickness}
                    onChange={setMagThickness}
                    min={1}
                    max={6}
                    step={0.5}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Target Lock Padding">
                  <CustomizeSlider
                    value={magPadding}
                    onChange={setMagPadding}
                    min={0}
                    max={20}
                    step={1}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Center Dot Size">
                  <CustomizeSlider
                    value={magDotSize}
                    onChange={setMagDotSize}
                    min={0}
                    max={12}
                    step={1}
                    formatValue={(v) => v === 0 ? "Hidden" : `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Blend Mode">
                  <CustomizeSelect
                    value={magBlend}
                    onChange={(val) => setMagBlend(val as any)}
                    options={["difference", "normal", "screen"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Parallax Tilt">
                  <CustomizeSwitch
                    checked={magParallaxOn}
                    onChange={setMagParallaxOn}
                    label="Lean brackets toward cursor"
                  />
                </CustomizeTile>

                <CustomizeTile label="Match Corner Radius">
                  <CustomizeSwitch
                    checked={magMatchRadius}
                    onChange={setMagMatchRadius}
                    label="Round brackets to follow target"
                  />
                </CustomizeTile>

                <CustomizeTile label="Click Squeeze">
                  <CustomizeSwitch
                    checked={magClickEffect}
                    onChange={setMagClickEffect}
                    label="Compress brackets & dot on click"
                  />
                </CustomizeTile>

                <CustomizeTile label="Show Floating Label">
                  <CustomizeSwitch
                    checked={magShowLabel}
                    onChange={setMagShowLabel}
                    label="Display data-cursor-label badge"
                  />
                </CustomizeTile>

                <CustomizeTile label="Hide System Cursor">
                  <CustomizeSwitch
                    checked={magHideDefaultCursor}
                    onChange={setMagHideDefaultCursor}
                    label="Hide native mouse pointer"
                  />
                </CustomizeTile>
              </>
            )}

            {/* 30. Neon Ribbon Cursor Controls */}
            {item.name === "neon-ribbon-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={ribbonVariant}
                    onChange={(val) => applyVariant(val)}
                    options={["cyber-neon", "prismatic-rainbow", "solar-flare", "emerald-matrix", "spectral-silk"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Head Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={ribbonHeadColor}
                      onChange={(e) => setRibbonHeadColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={ribbonHeadColor}
                      onChange={setRibbonHeadColor}
                      placeholder="#00f0ff"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Tail Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={ribbonTailColor}
                      onChange={(e) => setRibbonTailColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={ribbonTailColor}
                      onChange={setRibbonTailColor}
                      placeholder="#ff0077"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Ribbon Width">
                  <CustomizeSlider
                    value={ribbonWidth}
                    onChange={setRibbonWidth}
                    min={6}
                    max={40}
                    step={2}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Trail Length">
                  <CustomizeSlider
                    value={ribbonTrailLength}
                    onChange={setRibbonTrailLength}
                    min={15}
                    max={90}
                    step={5}
                    formatValue={(v) => `${v} pts`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Follow Tension">
                  <CustomizeSlider
                    value={ribbonTension}
                    onChange={setRibbonTension}
                    min={0.05}
                    max={0.5}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Glow Radius">
                  <CustomizeSlider
                    value={ribbonGlow}
                    onChange={setRibbonGlow}
                    min={0}
                    max={30}
                    step={1}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Wave Speed">
                  <CustomizeSlider
                    value={ribbonWaveSpeed}
                    onChange={setRibbonWaveSpeed}
                    min={0}
                    max={10}
                    step={0.5}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Click Spark Burst">
                  <CustomizeSwitch
                    checked={ribbonBurst}
                    onChange={setRibbonBurst}
                    label="Explode Embers on Click"
                  />
                </CustomizeTile>
              </>
            )}

            {/* 31. Quantum Particles Cursor Controls */}
            {item.name === "quantum-particles-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={quantumVariant}
                    onChange={(val) => applyVariant(val)}
                    options={["cyber-constellation", "synaptic-neural", "cosmic-supernova", "bioluminescent", "matrix-grid"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Primary Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={quantumColor}
                      onChange={(e) => setQuantumColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={quantumColor}
                      onChange={setQuantumColor}
                      placeholder="#38bdf8"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Secondary Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={quantumSecondary}
                      onChange={(e) => setQuantumSecondary(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={quantumSecondary}
                      onChange={setQuantumSecondary}
                      placeholder="#6366f1"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Force Mode">
                  <CustomizeSelect
                    value={quantumForce}
                    onChange={(val) => setQuantumForce(val as any)}
                    options={["attract", "repel", "orbit"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Particle Count">
                  <CustomizeSlider
                    value={quantumParticleCount}
                    onChange={setQuantumParticleCount}
                    min={20}
                    max={120}
                    step={5}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Connect Distance">
                  <CustomizeSlider
                    value={quantumConnectDist}
                    onChange={setQuantumConnectDist}
                    min={40}
                    max={150}
                    step={5}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Gravity Strength">
                  <CustomizeSlider
                    value={quantumGravity}
                    onChange={setQuantumGravity}
                    min={0.1}
                    max={2.0}
                    step={0.1}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Radius of Influence">
                  <CustomizeSlider
                    value={quantumRadius}
                    onChange={setQuantumRadius}
                    min={60}
                    max={240}
                    step={10}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Shockwave Pulse">
                  <CustomizeSwitch
                    checked={quantumShockwave}
                    onChange={setQuantumShockwave}
                    label="Ripple Shockwave on Click"
                  />
                </CustomizeTile>
              </>
            )}

            {/* 32. Spotlight Cursor Controls */}
            {item.name === "spotlight-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={spotlightVariant}
                    onChange={(val) => applyVariant(val)}
                    options={["studio-spotlight", "thermal-scanner", "cyber-radar", "ultraviolet-lens", "golden-sunbeam"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Light Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={spotlightColor}
                      onChange={(e) => setSpotlightColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={spotlightColor}
                      onChange={setSpotlightColor}
                      placeholder="#ffffff"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Beam Radius">
                  <CustomizeSlider
                    value={spotlightRadius}
                    onChange={setSpotlightRadius}
                    min={80}
                    max={400}
                    step={10}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Falloff Softness">
                  <CustomizeSlider
                    value={spotlightFalloff}
                    onChange={setSpotlightFalloff}
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Ambient Darkness">
                  <CustomizeSlider
                    value={spotlightDarkness}
                    onChange={setSpotlightDarkness}
                    min={0.2}
                    max={0.98}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Follow Tension">
                  <CustomizeSlider
                    value={spotlightTension}
                    onChange={setSpotlightTension}
                    min={0.05}
                    max={0.4}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Specular Glint">
                  <CustomizeSlider
                    value={spotlightSpecular}
                    onChange={setSpotlightSpecular}
                    min={0.0}
                    max={1.0}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Reveal Grid">
                  <CustomizeSwitch
                    checked={spotlightGrid}
                    onChange={setSpotlightGrid}
                    label="Project Cyber Coordinates Grid"
                  />
                </CustomizeTile>

                <CustomizeTile label="Pulse on Click">
                  <CustomizeSwitch
                    checked={spotlightPulse}
                    onChange={setSpotlightPulse}
                    label="Flare Brightness on Down"
                  />
                </CustomizeTile>
              </>
            )}

            {/* 33. Elastic Blob Cursor Controls */}
            {item.name === "elastic-blob-cursor" && (
              <>
                <CustomizeTile label="Preset">
                  <CustomizeSelect
                    value={blobVariant}
                    onChange={(val) => applyVariant(val)}
                    options={["mercury-silver", "neon-slime", "liquid-lava", "deep-ink", "aurora-metasphere"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Primary Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={blobColor}
                      onChange={(e) => setBlobColor(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={blobColor}
                      onChange={setBlobColor}
                      placeholder="#e2e8f0"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Rim Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={blobSecondary}
                      onChange={(e) => setBlobSecondary(e.target.value)}
                      className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer bg-transparent p-0 shrink-0"
                    />
                    <CustomizeInput
                      value={blobSecondary}
                      onChange={setBlobSecondary}
                      placeholder="#94a3b8"
                    />
                  </div>
                </CustomizeTile>

                <CustomizeTile label="Blob Size">
                  <CustomizeSlider
                    value={blobSize}
                    onChange={setBlobSize}
                    min={24}
                    max={80}
                    step={2}
                    formatValue={(v) => `${v}px`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Viscosity Stretch">
                  <CustomizeSlider
                    value={blobViscosity}
                    onChange={setBlobViscosity}
                    min={0.1}
                    max={0.8}
                    step={0.05}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Spring Tension">
                  <CustomizeSlider
                    value={blobTension}
                    onChange={setBlobTension}
                    min={0.05}
                    max={0.4}
                    step={0.02}
                    formatValue={(v) => v.toFixed(2)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Gooey Merge Strength">
                  <CustomizeSlider
                    value={blobGooeyStrength}
                    onChange={setBlobGooeyStrength}
                    min={4}
                    max={20}
                    step={1}
                    formatValue={(v) => `${v}`}
                  />
                </CustomizeTile>

                <CustomizeTile label="Jelly Wobble Speed">
                  <CustomizeSlider
                    value={blobWobble}
                    onChange={setBlobWobble}
                    min={0.5}
                    max={5.0}
                    step={0.2}
                    formatValue={(v) => v.toFixed(1)}
                  />
                </CustomizeTile>

                <CustomizeTile label="Satellite Droplets">
                  <CustomizeSwitch
                    checked={blobDroplets}
                    onChange={setBlobDroplets}
                    label="Spawn Detached Droplets"
                  />
                </CustomizeTile>

                <CustomizeTile label="Specular Highlight">
                  <CustomizeSwitch
                    checked={blobSpecular}
                    onChange={setBlobSpecular}
                    label="3D Liquid Surface Glint"
                  />
                </CustomizeTile>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { RotateCcw, Check, Copy, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Mic, SlidersHorizontal, Search } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { EtherealSmokeShader, ETHEREAL_SMOKE_PRESETS } from "@/registry/ui/ethereal-smoke-shader";
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
        className="text-xs font-semibold font-mono tracking-tight text-[var(--text-secondary)] truncate shrink-0 max-w-[50%] select-none"
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
        <span className="truncate max-w-[120px] font-medium text-[var(--text-primary)]">
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
  // 1. Button state
  const [btnVariant, setBtnVariant] = React.useState<any>(
    item.name === "button" && activeVariant ? activeVariant : "default"
  );
  const [btnSize, setBtnSize] = React.useState<any>("default");
  const [btnLabel, setBtnLabel] = React.useState("Action Button");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

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
    if (item.name === "ethereal-smoke-shader")
      return ["chai-blue", "ethereal-violet", "solar-flare", "emerald-mist", "spectral-white"];
    return [];
  }, [item.variants, item.name]);

  const hasVariants = variants.length > 1;

  // Unified variant setter supporting all interactive components
  const applyVariant = React.useCallback(
    (v: string) => {
      if (item.name === "button") setBtnVariant(v);
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
    setBtnVariant("default");
    setBtnSize("default");
    setBtnLabel("Action Button");
    setBtnLoading(false);
    setBtnDisabled(false);

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
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-[var(--surface-secondary)] active:scale-98 transition-all cursor-pointer group"
                title="Select variant"
                aria-haspopup="listbox"
                aria-expanded={variantMenuOpen}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] shrink-0" />
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
                            ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] font-semibold"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] font-medium"
                        )}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              isSelected ? "bg-[var(--accent-green)]" : "bg-transparent"
                            )}
                          />
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
                      <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
              <div className="w-full max-w-[340px] flex items-center justify-center p-0.5">
                <NotchedNavbar
                  variant="compact"
                  notchWidth={140}
                  notchHeight={28}
                  filletWidth={14}
                  borderRadius={10}
                  whiteBoxPadding={0}
                  backdropBg="transparent"
                  minHeight={115}
                  links={[
                    { id: "home", label: "Home", icon: <HomeIcon /> },
                    { id: "explore", label: "Explore", icon: <BriefcaseIcon /> },
                    { id: "contact", label: "Contact", icon: <MailIcon /> },
                  ]}
                  activeLink={notchedActiveTab === "experience" || notchedActiveTab === "settings" ? "explore" : notchedActiveTab}
                  onLinkClick={(id) => setNotchedActiveTab(id)}
                  className="shadow-md"
                >
                  <div className="flex flex-col items-center justify-center text-center py-2 space-y-1">
                    <div className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                      <span>Infrastructure Telemetry</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    </div>
                    <p className="text-[10px] text-neutral-400 font-mono">
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
              <div className="w-full max-w-[245px]">
                <Accordion type="single">
                  <AccordionItem value="item-1" className="border-[var(--border)]">
                    <AccordionTrigger className="py-2 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">Distribution & CLI</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-[11px] text-[var(--text-secondary)]">
                      shadcn-compatible JSON CLI endpoints.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="py-2 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">App Router & SSR</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-[11px] text-[var(--text-secondary)]">
                      React Server Components ready.
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
              <div className="w-full max-w-[280px] h-32 rounded-lg border border-[var(--border)] overflow-hidden flex bg-[var(--bg-sidebar)] shadow-md select-none">
                <div className="w-10 border-r border-[var(--border)] flex flex-col items-center py-2.5 gap-1.5 shrink-0 bg-[var(--bg-main)]">
                  <VectorKiloLogo className="h-4 w-4" />
                  <div className="h-px w-5 bg-[var(--border)] my-0.5" />
                  <div className="w-6 h-5 rounded bg-[var(--surface-secondary)] flex items-center justify-center">
                    <VectorFolderIcon isActive className="h-3 w-3 text-[var(--accent-green)]" />
                  </div>
                  <div className="w-6 h-5 rounded flex items-center justify-center">
                    <VectorLayersIcon className="h-3 w-3 text-[var(--text-secondary)]" />
                  </div>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between bg-[var(--surface-elevated)]/40">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-20 rounded bg-[var(--surface-secondary)]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
                    </div>
                    <div className="h-1.5 w-28 rounded bg-[var(--surface-secondary)]/60" />
                    <div className="h-1.5 w-16 rounded bg-[var(--surface-secondary)]/40" />
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/50 text-[9px] font-mono text-[var(--text-muted)]">
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
              <div className="w-full flex items-center justify-center py-6">
                <SearchBar
                  placeholder="Search components..."
                  variant={searchBarVariant as any}
                  showShortcut={true}
                />
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
              className={showKnobs ? "w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-black relative" : "w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-black relative"}
              style={{ height: showKnobs ? 440 : "100%" }}
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
          </div>
        </div>
      )}
    </div>
  );
}

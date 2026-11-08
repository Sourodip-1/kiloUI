"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, X, Menu, Terminal, ChevronsUpDown, ChevronsDownUp, Sparkles, Monitor, Smartphone, Layers, ArrowUpDown, RefreshCw, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  VectorLayersIcon,
  VectorFolderIcon,
  VectorApiIcon,
  VectorPanelLeftIcon,
  VectorKiloLogo,
  VectorCategoryIcon,
  VectorComponentIcon,
  VectorCubeIcon,
  VectorMobileIcon,
} from "@/components/vector-icons";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";
import { SidebarHoverPreview, HoverState } from "@/components/sidebar-hover-preview";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  variant?: "scrollable-categories" | "default";
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  activeComponent?: string;
  activeCategory?: string;
  theme?: "dark" | "light" | "system";
  activeVariant?: string;
}

interface ComponentVariantsTreeProps {
  comp: RegistryItem;
  isCompActive: boolean;
  activeVariant?: string;
  isCollapsed: boolean;
  isVariantExpanded: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  onMouseEnter: (comp: RegistryItem, e: React.MouseEvent<HTMLElement>, variant: string) => void;
  onMouseLeave: () => void;
  onVariantSelect?: () => void;
}

function ComponentVariantsTree({
  comp,
  isCompActive,
  activeVariant,
  isCollapsed,
  isVariantExpanded,
  onMobileOpenChange,
  onMouseEnter,
  onMouseLeave,
  onVariantSelect,
}: ComponentVariantsTreeProps) {
  const treeRef = React.useRef<HTMLDivElement>(null);
  const effectiveVariant =
    activeVariant ||
    (comp.variants?.includes("default") ? "default" : comp.variants?.[0]);

  const activeVariantIdx = isCompActive
    ? (comp.variants?.findIndex((v) => v === effectiveVariant) ?? -1)
    : -1;

  // Track the exact pixel top position of the active variant item
  const [indicatorTop, setIndicatorTop] = React.useState<number>(() => {
    return activeVariantIdx >= 0 ? activeVariantIdx * 28 + 4 : 4;
  });

  const updatePosition = React.useCallback(() => {
    if (!treeRef.current || activeVariantIdx === -1) return;
    const activeEl = treeRef.current.querySelector<HTMLElement>(
      `[data-variant-idx="${activeVariantIdx}"]`
    );
    if (activeEl) {
      setIndicatorTop(activeEl.offsetTop);
    } else {
      setIndicatorTop(activeVariantIdx * 28 + 4);
    }
  }, [activeVariantIdx]);

  React.useEffect(() => {
    updatePosition();
    const timer = setTimeout(updatePosition, 50);
    window.addEventListener("resize", updatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition, isVariantExpanded]);

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        !isCollapsed && isVariantExpanded
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0 pointer-events-none"
      )}
    >
      <div className="overflow-hidden">
        <div ref={treeRef} className="relative ml-3.5 pl-3 pt-1 pb-1 space-y-1">
          {/* Animated active vertical trunk line (grows / reduces smoothly with natural spring physics) */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 -top-1 w-px bg-[var(--accent-green)] z-10 pointer-events-none transition-[height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[height]",
              activeVariantIdx !== -1 ? "opacity-100" : "opacity-0"
            )}
            style={{
              height: `${Math.max(0, indicatorTop + 4)}px`,
            }}
          />

          {/* Animated active curved branch elbow (smoothly glides up / down to the selected variant) */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-0 w-3 h-3.5 border-l border-b rounded-bl-[6px] border-[var(--accent-green)] z-20 pointer-events-none transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
              activeVariantIdx !== -1 ? "opacity-100" : "opacity-0"
            )}
            style={{
              transform: `translate3d(0, ${indicatorTop}px, 0)`,
            }}
          />

          {/* Base tree items and subtle static gray background lines */}
          {comp.variants?.map((variant, idx) => {
            const isThisVariantActive = activeVariantIdx !== -1 && idx === activeVariantIdx;
            const isLast = idx === (comp.variants?.length ?? 1) - 1;

            return (
              <div
                key={variant}
                data-variant-idx={idx}
                className="relative flex items-center h-6"
              >
                {/* Static top gray connector to parent for the first item */}
                {idx === 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 -top-1 h-1 w-px bg-[var(--border)] pointer-events-none"
                  />
                )}

                {/* Static base gray curved branch */}
                <span
                  aria-hidden="true"
                  className="absolute -left-3 top-0 w-3 h-3.5 border-l border-b rounded-bl-[6px] border-[var(--border)] pointer-events-none"
                />

                {/* Static base gray spine to subsequent siblings */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-3.5 bottom-[-4px] w-px bg-[var(--border)] pointer-events-none"
                  />
                )}

                <Link
                  href={`/components/${comp.name}?variant=${variant}`}
                  data-hover-item="true"
                  onClick={() => {
                    onMobileOpenChange?.(false);
                    onVariantSelect?.();
                  }}
                  onMouseEnter={(e) => onMouseEnter(comp, e, variant)}
                  onMouseLeave={onMouseLeave}
                  className={cn(
                    "group/v relative z-10 flex items-center gap-2 w-full px-2 py-1 rounded text-xs font-sans tracking-normal transition-colors duration-150 text-left",
                    isThisVariantActive
                      ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] font-medium border border-[var(--border)] shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-normal border border-transparent"
                  )}
                  title={`${comp.title} (${variant} variant)`}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all duration-300 shrink-0",
                      isThisVariantActive
                        ? "bg-[var(--accent-green)] scale-110"
                        : "bg-[var(--text-muted)]/50 group-hover/v:bg-[var(--text-primary)]"
                    )}
                  />
                  <span className="truncate">{variant}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SidebarBase({
  className,
  collapsed = false,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
  activeComponent,
  activeCategory,
  theme = "dark",
  activeVariant,
  variant = "scrollable-categories",
  ...props
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const registryItems = Object.values(REGISTRY_DATA);
  const categories = Array.from(new Set(registryItems.map((item) => item.category)));
  const webCategories = categories.filter((c) => c !== "Mobile App");
  const mobileItems = registryItems.filter((i) => i.category === "Mobile App");
  const webItemsCount = registryItems.filter((i) => i.category !== "Mobile App").length;

  const MOBILE_CATEGORIES = [
    "Actions",
    "Forms & Inputs",
    "Navigation",
    "Overlays",
    "Data Display",
  ] as const;

  type MobileCategory = typeof MOBILE_CATEGORIES[number];

  const MOBILE_ITEM_CATEGORY_MAP: Record<string, MobileCategory> = {
    // Actions (5)
    "m3-button": "Actions",
    "m3-fab": "Actions",
    "m3-segmented-button": "Actions",
    "m3-icon-button": "Actions",
    "floating-action-dock": "Actions",

    // Forms & Inputs (7)
    "m3-text-field": "Forms & Inputs",
    "m3-search-bar": "Forms & Inputs",
    "m3-switch": "Forms & Inputs",
    "m3-checkbox": "Forms & Inputs",
    "m3-radio": "Forms & Inputs",
    "m3-slider": "Forms & Inputs",
    "m3-chip": "Forms & Inputs",

    // Navigation (5)
    "m3-navigation-bar": "Navigation",
    "m3-top-app-bar": "Navigation",
    "m3-navigation-drawer": "Navigation",
    "m3-tabs": "Navigation",
    "thumb-segment-controller": "Navigation",

    // Overlays (4)
    "mobile-bottom-sheet": "Overlays",
    "m3-dialog": "Overlays",
    "swipe-action-card": "Overlays",
    "pull-to-refresh": "Overlays",

    // Data Display (5)
    "m3-card": "Data Display",
    "m3-list": "Data Display",
    "m3-badge": "Data Display",
    "m3-progress-indicator": "Data Display",
    "m3-snackbar": "Data Display",
  };

  const [activePlatform, setActivePlatform] = React.useState<"web" | "mobile">("web");

  React.useEffect(() => {
    if (
      pathname === "/mobile-primitives" ||
      pathname?.startsWith("/mobile-primitives") ||
      (activeComponent && REGISTRY_DATA[activeComponent]?.category === "Mobile App")
    ) {
      setActivePlatform("mobile");
    } else if (
      pathname === "/components" ||
      (activeComponent && REGISTRY_DATA[activeComponent]?.category !== "Mobile App")
    ) {
      setActivePlatform("web");
    }
  }, [pathname, activeComponent]);

  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    Actions: true,
    "Forms & Inputs": true,
    Overlays: true,
    "Data Display": true,
    Navigation: true,
    "Media & Layout": true,
    "Backgrounds & Shaders": true,
    Cursors: true,
  });

  const [expandedMobileCategories, setExpandedMobileCategories] = React.useState<Record<string, boolean>>({
    Actions: true,
    "Forms & Inputs": true,
    Navigation: true,
    Overlays: true,
    "Data Display": true,
  });

  const [expandedVariants, setExpandedVariants] = React.useState<Record<string, boolean>>({
    button: true,
    badge: true,
  });

  // Automatically expand variant tree & parent category when activeComponent is selected
  React.useEffect(() => {
    if (activeComponent) {
      setExpandedVariants((prev) => ({
        ...prev,
        [activeComponent]: true,
      }));
      const mobileCat = MOBILE_ITEM_CATEGORY_MAP[activeComponent];
      if (mobileCat) {
        setExpandedMobileCategories((prev) => ({
          ...prev,
          [mobileCat]: true,
        }));
      }
    }
  }, [activeComponent]);

  const toggleComponentVariants = (compName: string) => {
    setExpandedVariants((prev) => ({
      ...prev,
      [compName]: !prev[compName],
    }));
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const toggleMobileCategory = (cat: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const expandAllCategories = () => {
    const next: Record<string, boolean> = {};
    webCategories.forEach((cat) => {
      next[cat] = true;
    });
    setExpandedCategories(next);
  };

  const collapseAllCategories = () => {
    const next: Record<string, boolean> = {};
    webCategories.forEach((cat) => {
      next[cat] = false;
    });
    setExpandedCategories(next);
  };

  const isAllCollapsed = webCategories.every((cat) => !expandedCategories[cat]);

  const handleToggleAllCategories = () => {
    if (isAllCollapsed) {
      expandAllCategories();
    } else {
      collapseAllCategories();
    }
  };

  const expandAllMobileCategories = () => {
    const next: Record<string, boolean> = {};
    MOBILE_CATEGORIES.forEach((cat) => {
      next[cat] = true;
    });
    setExpandedMobileCategories(next);
  };

  const collapseAllMobileCategories = () => {
    const next: Record<string, boolean> = {};
    MOBILE_CATEGORIES.forEach((cat) => {
      next[cat] = false;
    });
    setExpandedMobileCategories(next);
  };

  const isAllMobileCollapsed = MOBILE_CATEGORIES.every((cat) => !expandedMobileCategories[cat]);

  const handleToggleAllMobileCategories = () => {
    if (isAllMobileCollapsed) {
      expandAllMobileCategories();
    } else {
      collapseAllMobileCategories();
    }
  };

  // Hover preview state & smooth glide tracking
  const [hoverState, setHoverState] = React.useState<HoverState | null>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const asideRef = React.useRef<HTMLElement | null>(null);

  const handleComponentMouseEnter = (
    compItem: RegistryItem,
    e: React.MouseEvent<HTMLElement>,
    variant?: string
  ) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const asideRect = asideRef.current?.getBoundingClientRect();
    const sidebarRight = asideRect ? asideRect.right : (isCollapsed ? 56 : 256);
    const centerY = rect.top + rect.height / 2;

    if (hoverState) {
      setHoverState({
        item: compItem,
        top: centerY,
        sidebarRight,
        variant,
      });
      return;
    }

    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverState({
        item: compItem,
        top: centerY,
        sidebarRight,
        variant,
      });
    }, 110);
  };

  const handleComponentMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setHoverState(null);
    }, 160);
  };

  const handleMouseEnterPreview = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeavePreview = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoverState(null);
    }, 160);
  };

  const isOverview = pathname === "/overview";
  const isAllComponents = pathname === "/components";
  const isIcons = pathname === "/icons" || pathname?.startsWith("/icons");
  const isMobilePrimitives = pathname === "/mobile-primitives" || pathname?.startsWith("/mobile-primitives");
  const isMcp = pathname === "/mcp" || pathname?.startsWith("/mcp");

  const isScrollableCategories = variant === "scrollable-categories";

  const topNavSection = (
    <div className={cn("px-2.5 pt-3 pb-1 w-64 select-none", isScrollableCategories && "shrink-0")}>
      <SlidingHighlightContainer
        className="space-y-1"
        pillClassName="bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-md shadow-2xs"
      >
        <nav className="space-y-1">
          {/* Overview */}
          <Link
            href="/overview"
            data-hover-item="true"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]",
              isOverview
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "Overview" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorFolderIcon
                isActive={isOverview}
                className={cn(
                  "h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:-translate-y-0.5",
                  isOverview
                    ? "text-[var(--accent-green)] scale-105"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <span
              className={cn(
                "ml-2.5 whitespace-nowrap transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              Overview
            </span>
          </Link>

          {/* All Components */}
          <Link
            href="/components"
            data-hover-item="true"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]",
              isAllComponents
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "All Components" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorLayersIcon
                isActive={isAllComponents}
                className={cn(
                  "h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:-translate-y-0.5",
                  isAllComponents
                    ? "text-[var(--accent-green)] scale-105"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <div
              className={cn(
                "flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              <span className="whitespace-nowrap">All Components</span>
              <span className="text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]">
                {registryItems.length}
              </span>
            </div>
          </Link>
          {/* Icons */}
          <Link
            href="/icons"
            data-hover-item="true"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]",
              isIcons
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "Icons" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorCubeIcon
                isActive={isIcons}
                className={cn(
                  "h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:rotate-6",
                  isIcons
                    ? "text-[var(--accent-green)] scale-105"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <div
              className={cn(
                "flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              <span className="whitespace-nowrap">Kilo/Icons</span>
              <span className="text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]">
                152
              </span>
            </div>
          </Link>

          {/* MCP Connect */}
          <Link
            href="/mcp"
            data-hover-item="true"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]",
              isMcp
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "MCP Connect" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorApiIcon
                isActive={isMcp}
                className={cn(
                  "h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:-translate-y-0.5",
                  isMcp
                    ? "text-[var(--accent-green)] scale-105"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <div
              className={cn(
                "flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              <span className="whitespace-nowrap">MCP Connect</span>
              <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface-secondary)]/60">
                4 tools
              </span>
            </div>
          </Link>
        </nav>
      </SlidingHighlightContainer>

      {/* Horizontal Divider before Categories */}
      <div
        className={cn(
          "border-t border-[var(--border)] mt-2 mb-1 transition-all duration-300",
          isCollapsed ? "w-8 ml-0.5" : "w-full"
        )}
      />
    </div>
  );

  const categoriesNavSection = (
    <SlidingHighlightContainer
      className="space-y-1 min-h-full"
      pillClassName="bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-md shadow-2xs"
    >
      <div className="space-y-1">
        {/* Platform Tab Switcher: Web App | Mobile App (Single Line Height & Symmetrically Centered) */}
        {!isCollapsed ? (
          <div className="flex items-center w-full p-1 bg-[var(--surface-primary)] border border-[var(--border)] rounded-lg mb-2 gap-1 select-none">
            <button
              type="button"
              onClick={() => setActivePlatform("web")}
              title={`Web App (${webItemsCount} components)`}
              className={cn(
                "flex-1 min-w-0 h-7 flex items-center justify-center gap-1.5 px-2 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer",
                activePlatform === "web"
                  ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-2xs border border-[var(--border)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:bg-[var(--surface-secondary)]/50"
              )}
            >
              <Monitor className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Web App</span>
            </button>

            <button
              type="button"
              onClick={() => setActivePlatform("mobile")}
              title={`Mobile App (${mobileItems.length} primitives)`}
              className={cn(
                "flex-1 min-w-0 h-7 flex items-center justify-center gap-1.5 px-2 rounded-md text-[11px] font-medium transition-all duration-150 cursor-pointer",
                activePlatform === "mobile"
                  ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-2xs border border-[var(--border)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:bg-[var(--surface-secondary)]/50"
              )}
            >
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Mobile App</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 p-1 bg-[var(--surface-primary)] border border-[var(--border)] rounded-lg mb-2 select-none">
            <button
              type="button"
              onClick={() => setActivePlatform("web")}
              title={`Web App (${webItemsCount} components)`}
              className={cn(
                "h-7 w-7 flex items-center justify-center rounded-md transition-all duration-150 cursor-pointer",
                activePlatform === "web"
                  ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:bg-[var(--surface-secondary)]/50"
              )}
            >
              <Monitor className="h-3.5 w-3.5 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("mobile")}
              title={`Mobile App (${mobileItems.length} components)`}
              className={cn(
                "h-7 w-7 flex items-center justify-center rounded-md transition-all duration-150 cursor-pointer",
                activePlatform === "mobile"
                  ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:bg-[var(--surface-secondary)]/50"
              )}
            >
              <Smartphone className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        )}

        {/* View according to activePlatform */}
        {activePlatform === "web" ? (
          <>
            {/* Categories Header */}
            <div className="flex items-center justify-between w-full rounded p-2 text-[10px] font-sans font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none">
              <div className="flex items-center flex-1 min-w-0">
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center cursor-default"
                  title={isCollapsed ? `Categories (${webCategories.length})` : undefined}
                >
                  <VectorCategoryIcon category="all" className="h-4 w-4 text-[var(--text-muted)]" />
                </div>
                <span
                  className={cn(
                    "ml-2.5 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-200",
                    isCollapsed && "opacity-0 pointer-events-none"
                  )}
                >
                  <span>Categories</span>
                  <span className="text-[9px] text-[var(--text-muted)] font-normal tabular-nums">({webCategories.length})</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleAllCategories}
                className={cn(
                  "p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-opacity duration-200 cursor-pointer shrink-0",
                  isCollapsed && "opacity-0 pointer-events-none"
                )}
                title={isAllCollapsed ? "Expand all categories" : "Collapse all categories"}
                aria-label={isAllCollapsed ? "Expand all categories" : "Collapse all categories"}
              >
                {isAllCollapsed ? (
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronsDownUp className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Categories List */}
            {webCategories.map((cat) => {
              const catItems = registryItems.filter((i) => i.category === cat);
              const isCategoryActive = activeCategory === cat;
              const isExpanded = expandedCategories[cat] ?? true;

              return (
                <div key={cat} className="space-y-0.5">
                  <div
                    data-hover-item="true"
                    className={cn(
                      "group/cat relative z-10 flex w-full items-center justify-between rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150",
                      isCategoryActive
                        ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                    )}
                  >
                    <Link
                      href={`/components?category=${encodeURIComponent(cat)}`}
                      onClick={() => onMobileOpenChange?.(false)}
                      onMouseEnter={(e) => {
                        if (isCollapsed && catItems[0]) {
                          handleComponentMouseEnter(catItems[0], e);
                        }
                      }}
                      onMouseLeave={() => {
                        if (isCollapsed) handleComponentMouseLeave();
                      }}
                      className="flex items-center flex-1 min-w-0 text-left"
                      title={isCollapsed ? `${cat} (${catItems.length})` : undefined}
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <VectorCategoryIcon
                          category={cat}
                          isActive={isCategoryActive}
                          className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cat:scale-115 group-hover/cat:-translate-y-0.5",
                            isCategoryActive
                              ? "text-[var(--accent-green)] scale-105"
                              : "text-[var(--text-primary)] group-hover/cat:text-[var(--accent-green)]"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "ml-2.5 truncate whitespace-nowrap transition-opacity duration-200",
                          isCollapsed && "opacity-0 pointer-events-none"
                        )}
                      >
                        {cat}
                      </span>
                    </Link>

                    <div
                      className={cn(
                        "flex items-center gap-1 transition-opacity duration-200 shrink-0",
                        isCollapsed && "opacity-0 pointer-events-none"
                      )}
                    >
                      <span className="text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]">
                        {catItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(cat);
                        }}
                        className="p-0.5 rounded hover:bg-[var(--surface-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform cursor-pointer"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            isExpanded ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Sub-items with smooth expand/collapse transition */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      !isCollapsed && isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-3.5 pl-2 border-l border-[var(--border)] py-0.5 space-y-1">
                        {catItems.map((comp) => {
                          const isCompActive =
                            pathname === `/components/${comp.name}` || activeComponent === comp.name;
                          const hasVariants = Boolean(comp.variants && comp.variants.length > 0);
                          const isVariantExpanded = Boolean(expandedVariants[comp.name]);

                          return (
                            <div key={comp.name} className="relative">
                              <div
                                data-hover-item="true"
                                className={cn(
                                  "group/comp relative z-10 flex items-center justify-between w-full rounded text-xs font-medium tracking-tight transition-colors duration-150",
                                  isCompActive && !activeVariant
                                    ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] border border-[var(--border)]"
                                    : isCompActive
                                      ? "bg-[var(--surface-secondary)]/60 text-[var(--text-primary)] border border-transparent"
                                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                                )}
                              >
                                <Link
                                  href={`/components/${comp.name}`}
                                  onClick={() => onMobileOpenChange?.(false)}
                                  onMouseEnter={(e) => handleComponentMouseEnter(comp, e)}
                                  onMouseLeave={handleComponentMouseLeave}
                                  className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1 text-left"
                                  title={comp.title}
                                >
                                  <VectorComponentIcon
                                    name={comp.name}
                                    className={cn(
                                      "h-3 w-3 shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/comp:scale-120 group-hover/comp:translate-x-0.5 group-hover/comp:rotate-3",
                                      isCompActive
                                        ? "text-[var(--accent-green)] scale-105"
                                        : "text-[var(--text-primary)] group-hover/comp:text-[var(--accent-green)]"
                                    )}
                                  />
                                  <span className="truncate font-medium">{comp.title}</span>
                                </Link>

                                {hasVariants && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      toggleComponentVariants(comp.name);
                                    }}
                                    className={cn(
                                      "flex items-center gap-0.5 px-1.5 py-0.5 mr-1 rounded text-[10px] font-sans font-medium tabular-nums transition-colors cursor-pointer select-none",
                                      isCompActive
                                        ? "text-[var(--accent-green)] hover:bg-[var(--accent-green)]/15"
                                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]"
                                    )}
                                    title={`${isVariantExpanded ? "Hide" : "Show"} ${comp.variants?.length} variants`}
                                    aria-label={`${isVariantExpanded ? "Hide" : "Show"} variants for ${comp.title}`}
                                  >
                                    <span className="text-[9px] font-bold opacity-80">{comp.variants?.length}</span>
                                    <ChevronDown
                                      className={cn(
                                        "h-2.5 w-2.5 transition-transform duration-200",
                                        isVariantExpanded ? "rotate-0" : "-rotate-90"
                                      )}
                                    />
                                  </button>
                                )}
                              </div>

                              {/* Expandable Variants Tree with animated glide & height transitions */}
                              {hasVariants && (
                                <ComponentVariantsTree
                                  comp={comp}
                                  isCompActive={isCompActive}
                                  activeVariant={activeVariant}
                                  isCollapsed={isCollapsed}
                                  isVariantExpanded={isVariantExpanded}
                                  onMobileOpenChange={onMobileOpenChange}
                                  onMouseEnter={handleComponentMouseEnter}
                                  onMouseLeave={handleComponentMouseLeave}
                                  onVariantSelect={() => setHoverState(null)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* Mobile Studio header with expand/collapse all button (aligned with Categories header, no highlight) */}
            <div className="flex items-center justify-between w-full rounded p-2 text-[10px] font-sans font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none">
              <Link
                href="/mobile-primitives"
                onClick={() => onMobileOpenChange?.(false)}
                className="flex items-center flex-1 min-w-0 hover:text-[var(--text-primary)] transition-colors group/studio"
                title={isCollapsed ? "Mobile Studio" : undefined}
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <VectorMobileIcon
                    isActive={false}
                    animated={false}
                    className="h-4 w-4 text-[var(--text-muted)] group-hover/studio:text-[var(--text-primary)] transition-colors"
                  />
                </div>
                <span
                  className={cn(
                    "ml-2.5 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-200",
                    isCollapsed && "opacity-0 pointer-events-none"
                  )}
                >
                  <span className="group-hover/studio:text-[var(--text-primary)] transition-colors">Mobile Studio</span>
                  <span className="text-[9px] text-[var(--text-muted)] font-normal tabular-nums">({mobileItems.length})</span>
                </span>
              </Link>

              {/* Expand all / Collapse all categories of primitives */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAllMobileCategories();
                }}
                className={cn(
                  "p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-opacity duration-200 cursor-pointer shrink-0",
                  isCollapsed && "opacity-0 pointer-events-none"
                )}
                title={isAllMobileCollapsed ? "Expand all categories" : "Collapse all categories"}
                aria-label={isAllMobileCollapsed ? "Expand all categories" : "Collapse all categories"}
              >
                {isAllMobileCollapsed ? (
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronsDownUp className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Mobile Categories Accordion List */}
            {MOBILE_CATEGORIES.map((cat) => {
              const catItems = mobileItems.filter((i) => MOBILE_ITEM_CATEGORY_MAP[i.name] === cat);
              const isCategoryActive = catItems.some(
                (i) => pathname === `/components/${i.name}` || activeComponent === i.name
              );
              const isExpanded = expandedMobileCategories[cat] ?? true;

              return (
                <div key={cat} className="space-y-0.5">
                  <div
                    data-hover-item="true"
                    className={cn(
                      "group/cat relative z-10 flex w-full items-center justify-between rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150",
                      isCategoryActive
                        ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileCategory(cat)}
                      className="flex items-center flex-1 min-w-0 text-left cursor-pointer"
                      title={isCollapsed ? `${cat} (${catItems.length})` : undefined}
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <VectorCategoryIcon
                          category={cat}
                          isActive={isCategoryActive}
                          className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cat:scale-115 group-hover/cat:-translate-y-0.5",
                            isCategoryActive
                              ? "text-[var(--accent-green)] scale-105"
                              : "text-[var(--text-primary)] group-hover/cat:text-[var(--accent-green)]"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "ml-2.5 truncate whitespace-nowrap transition-opacity duration-200",
                          isCollapsed && "opacity-0 pointer-events-none"
                        )}
                      >
                        {cat}
                      </span>
                    </button>

                    <div
                      className={cn(
                        "flex items-center gap-1 transition-opacity duration-200 shrink-0",
                        isCollapsed && "opacity-0 pointer-events-none"
                      )}
                    >
                      <span className="text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]">
                        {catItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMobileCategory(cat);
                        }}
                        className="p-0.5 rounded hover:bg-[var(--surface-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform cursor-pointer"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-transform duration-200",
                            isExpanded ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Sub-items with smooth expand/collapse transition */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      !isCollapsed && isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="overflow-hidden space-y-0.5">
                      <div className="pl-3 space-y-0.5">
                        {catItems.map((comp) => {
                          const isCompActive =
                            pathname === `/components/${comp.name}` || activeComponent === comp.name;
                          const hasVariants = Boolean(comp.variants && comp.variants.length > 0);
                          const isVariantExpanded = Boolean(expandedVariants[comp.name]);

                          return (
                            <div key={comp.name} className="relative">
                    <div
                      data-hover-item="true"
                      className={cn(
                        "group/comp relative z-10 flex items-center justify-between w-full rounded p-2 text-xs font-medium tracking-tight transition-colors duration-150",
                        isCompActive && !activeVariant
                          ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] border border-[var(--border)]"
                          : isCompActive
                            ? "bg-[var(--surface-secondary)]/60 text-[var(--text-primary)] border border-transparent"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                      )}
                    >
                      <Link
                        href={`/components/${comp.name}`}
                        onClick={() => onMobileOpenChange?.(false)}
                        onMouseEnter={(e) => handleComponentMouseEnter(comp, e)}
                        onMouseLeave={handleComponentMouseLeave}
                        className="flex items-center flex-1 min-w-0 text-left"
                        title={isCollapsed ? comp.title : undefined}
                      >
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                          <VectorComponentIcon
                            name={comp.name}
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/comp:scale-120 group-hover/comp:translate-x-0.5 group-hover/comp:rotate-3",
                              isCompActive
                                ? "text-[var(--accent-green)] scale-105"
                                : "text-[var(--text-primary)] group-hover/comp:text-[var(--accent-green)]"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "ml-2.5 truncate font-medium transition-opacity duration-200",
                            isCollapsed && "opacity-0 pointer-events-none"
                          )}
                        >
                          {comp.title}
                        </span>
                      </Link>

                      {hasVariants && !isCollapsed && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleComponentVariants(comp.name);
                          }}
                          className={cn(
                            "flex items-center gap-0.5 px-1.5 py-0.5 mr-0.5 rounded text-[10px] font-sans font-medium tabular-nums transition-colors cursor-pointer select-none",
                            isCompActive
                              ? "text-[var(--accent-green)] hover:bg-[var(--accent-green)]/15"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]"
                          )}
                          title={`${isVariantExpanded ? "Hide" : "Show"} ${comp.variants?.length} variants`}
                          aria-label={`${isVariantExpanded ? "Hide" : "Show"} variants for ${comp.title}`}
                        >
                          <span className="text-[9px] font-bold opacity-80">{comp.variants?.length}</span>
                          <ChevronDown
                            className={cn(
                              "h-2.5 w-2.5 transition-transform duration-200",
                              isVariantExpanded ? "rotate-0" : "-rotate-90"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {hasVariants && (
                      <ComponentVariantsTree
                        comp={comp}
                        isCompActive={isCompActive}
                        activeVariant={activeVariant}
                        isCollapsed={isCollapsed}
                        isVariantExpanded={isVariantExpanded}
                        onMobileOpenChange={onMobileOpenChange}
                        onMouseEnter={handleComponentMouseEnter}
                        onMouseLeave={handleComponentMouseLeave}
                        onVariantSelect={() => setHoverState(null)}
                      />
                    )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </SlidingHighlightContainer>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full w-64 shrink-0 bg-[var(--bg-sidebar)] text-[var(--text-primary)] select-none overflow-hidden">
      {/* 1. Header & Brand */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-[var(--border)] shrink-0 w-64">
        <Link
          href="/"
          className="flex items-center gap-2.5 group/brand py-1 px-1 rounded transition-colors overflow-visible"
          onClick={(e) => {
            if (isCollapsed) {
              e.preventDefault();
              handleToggleCollapse();
            } else {
              onMobileOpenChange?.(false);
            }
          }}
          title={isCollapsed ? "Expand sidebar (⌘B)" : "kilo/ui"}
        >
          <div className="h-6 w-6 shrink-0 flex items-center justify-center overflow-visible">
            <VectorKiloLogo theme={theme} className="h-6 w-6" />
          </div>
          <span
            className={cn(
              "font-sans text-sm font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap transition-opacity duration-200 select-none",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            kilo<span className="text-[var(--accent-green)] transition-all duration-300 group-hover/brand:scale-125 group-hover/brand:drop-shadow-[0_0_8px_var(--accent-green)] inline-block origin-center">/</span>ui
          </span>
        </Link>

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={handleToggleCollapse}
          className={cn(
            "p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-opacity duration-200 cursor-pointer hidden lg:flex items-center justify-center shrink-0",
            isCollapsed && "opacity-0 pointer-events-none"
          )}
          aria-label="Collapse sidebar"
          title="Collapse sidebar (⌘B)"
        >
          <VectorPanelLeftIcon isCollapsed={false} className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-120" />
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => onMobileOpenChange?.(false)}
          className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 2 & 3. Navigation according to variant */}
      {isScrollableCategories ? (
        <>
          {topNavSection}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2.5 py-1 w-64 custom-scrollbar">
            {categoriesNavSection}
          </div>
        </>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2.5 py-1 w-64 custom-scrollbar">
          {topNavSection}
          {categoriesNavSection}
        </div>
      )}

      {/* 4. Minimal Clean Footer */}
      <div className="border-t border-[var(--border)] p-2.5 shrink-0 w-64">
        <a
          href="https://github.com/Sourodip-1/kiloUI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-xs font-sans font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1"
          title="GitHub Repository (Sourodip-1/kiloUI)"
        >
          <span
            className={cn(
              "whitespace-nowrap transition-opacity duration-200",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            GitHub
          </span>
          <span
            className={cn(
              "text-[10px] font-mono transition-opacity duration-200",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            v0.3.0
          </span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        ref={asideRef}
        className={cn(
          "hidden lg:flex flex-col shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] h-screen sticky top-0 z-30",
          isCollapsed ? "w-14" : "w-64",
          className
        )}
        {...props}
      >
        {sidebarContent}
      </aside>

      {/* Floating Hover Preview Card with Natural Spring Physics */}
      <SidebarHoverPreview
        hoverState={hoverState}
        onMouseEnterPreview={handleMouseEnterPreview}
        onMouseLeavePreview={handleMouseLeavePreview}
        isCollapsed={isCollapsed}
      />

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => onMobileOpenChange?.(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

function SidebarWithSearchParams(props: SidebarProps) {
  const searchParams = useSearchParams();
  const activeVariant = props.activeVariant || searchParams?.get("variant") || undefined;
  return <SidebarBase {...props} activeVariant={activeVariant} />;
}

export function Sidebar(props: SidebarProps) {
  return (
    <React.Suspense fallback={<SidebarBase {...props} />}>
      <SidebarWithSearchParams {...props} />
    </React.Suspense>
  );
}

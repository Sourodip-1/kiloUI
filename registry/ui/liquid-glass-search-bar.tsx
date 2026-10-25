"use client";

/**
 * Search Bars Component
 * 
 * Features 4 distinct variants:
 * 1. "downward-expand" (Liquid Glass Pill): Translucent liquid glass pill anchored at the top
 *    that smoothly expands strictly downwards into an optical command palette.
 * 2. "circle-popout" (Liquid Glass Orb): Standalone circular liquid glass button at rest.
 *    On click, a same-diameter circle buds out and extends horizontally into a search pill.
 * 3. "minimal-pill" (Minimal SaaS Pill): Ultra-clean minimal SaaS command bar with crisp borders,
 *    subtle surface, and clean downward results list (Linear / Raycast aesthetic).
 * 4. "minimal-expand" (Minimal SaaS Expand): Minimal compact icon trigger that smoothly extends
 *    horizontally into a focused minimal search input.
 * 
 * Performance & Polish:
 * - 60/120fps hardware-accelerated CSS transitions (CSS grid for butter-smooth expanding drawer).
 * - Fixed corner radius (no transition from 9999px to 22px to eliminate animation jumping/stutter).
 * - Zero ancestor window scrolling (no scrollIntoView jumps).
 * - Full keyboard navigation (Up/Down arrows, Enter, Esc, Cmd+K).
 * - Polished adaptation to both White Theme (Light Mode) and Dark Mode.
 */

import * as React from "react";
import { Search, X, CornerDownLeft, Sparkles, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  href?: string;
  badge?: string;
}

export const DEFAULT_SEARCH_ITEMS: SearchBarItem[] = [
  {
    id: "notched-navbar",
    title: "Notched Navbar",
    description: "Adaptive floating island navbar with smooth notch and tactile tabs",
    category: "Navigation",
    href: "/components/notched-navbar",
    badge: "Popular",
  },
  {
    id: "scroll-marquee",
    title: "Scroll Marquee",
    description: "Velocity-skewed hardware-accelerated infinite text marquee",
    category: "Media & Layout",
    href: "/components/scroll-marquee",
  },
  {
    id: "sidebar",
    title: "Sidebar",
    description: "Collapsible multi-tier navigation with glide indicators and hover preview",
    category: "Navigation",
    href: "/components/sidebar",
  },
  {
    id: "switch",
    title: "Switch",
    description: "Accessible toggle switch with kinetic spring physics",
    category: "Forms & Inputs",
    href: "/components/switch",
  },
  {
    id: "button",
    title: "Button",
    description: "Interactive button primitive with press feedback and loading states",
    category: "Actions",
    href: "/components/button",
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "Modal dialog primitive with focus trap and backdrop blur",
    category: "Overlays",
    href: "/components/dialog",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "CAD line-art blueprint and tactile physics checkboxes",
    category: "Forms & Inputs",
    href: "/components/checkbox",
  },
  {
    id: "directional-marquee",
    title: "Directional Marquee",
    description: "Dual-track marquee that reverses direction on scroll wheel gestures",
    category: "Media & Layout",
    href: "/components/directional-marquee",
  },
  {
    id: "kinetic-text",
    title: "Kinetic Text",
    description: "Harmonic sine waves, cyber scramble decode, and rubber band typography",
    category: "Media & Layout",
    href: "/components/kinetic-text",
  },
];

export type SearchBarVariant =
  | "downward-expand"
  | "circle-popout"
  | "minimal-pill"
  | "minimal-expand"
  | "liquid-glass"
  | "popout";

export interface SearchBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Input placeholder text (default: "Search components...") */
  placeholder?: string;
  /** Controlled query string value */
  value?: string;
  /** Initial uncontrolled query string */
  defaultValue?: string;
  /** Callback triggered when the search query text changes */
  onChange?: (value: string) => void;
  /** Callback triggered when user submits search */
  onSearch?: (value: string) => void;
  /** Search items data source */
  items?: SearchBarItem[];
  /** Callback fired when user selects a search result */
  onSelectResult?: (item: SearchBarItem) => void;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Uncontrolled default expanded state */
  defaultExpanded?: boolean;
  /** Callback fired when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Visual presentation variant */
  variant?: SearchBarVariant;
  /** Disable interaction */
  disabled?: boolean;
  /** Enable keyboard shortcut hints (Cmd+K, Esc) */
  showShortcut?: boolean;
  /** Primary accent color (default: #3478F6 cobalt blue) */
  accentColor?: string;
}

export type LiquidGlassSearchBarProps = SearchBarProps;

export const LiquidGlassSearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      placeholder = "Search components...",
      value: controlledValue,
      defaultValue = "",
      onChange,
      onSearch,
      items = DEFAULT_SEARCH_ITEMS,
      onSelectResult,
      expanded: controlledExpanded,
      defaultExpanded = false,
      onExpandedChange,
      variant = "downward-expand",
      disabled = false,
      showShortcut = true,
      accentColor = "#3478F6",
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Normalize variant aliases
    const normalizedVariant: "downward-expand" | "circle-popout" | "minimal-pill" | "minimal-expand" =
      variant === "minimal-pill"
        ? "minimal-pill"
        : variant === "minimal-expand"
        ? "minimal-expand"
        : variant === "circle-popout" || variant === "popout"
        ? "circle-popout"
        : "downward-expand";

    const isControlledExpanded = controlledExpanded !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);
    const isExpanded = isControlledExpanded ? controlledExpanded : uncontrolledExpanded;

    const isControlledValue = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const query = isControlledValue ? controlledValue : uncontrolledValue;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resultsContainerRef = React.useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    // Expand / collapse state handler
    const setExpandedState = React.useCallback(
      (next: boolean) => {
        if (disabled) return;
        if (!isControlledExpanded) {
          setUncontrolledExpanded(next);
        }
        onExpandedChange?.(next);
      },
      [disabled, isControlledExpanded, onExpandedChange]
    );

    // Filter results matching the query
    const filteredItems = React.useMemo(() => {
      const trimmed = query.trim().toLowerCase();
      if (!trimmed) return items.slice(0, 5);
      return items.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.description?.toLowerCase().includes(trimmed) ||
          item.category?.toLowerCase().includes(trimmed)
      );
    }, [query, items]);

    // Reset active index when query changes
    React.useEffect(() => {
      setActiveIndex(0);
    }, [filteredItems]);

    // Track active item position for smooth gliding pill on mouse move & keyboard navigation
    const [activePillRect, setActivePillRect] = React.useState<{ top: number; height: number; opacity: number }>({
      top: 0,
      height: 0,
      opacity: 0,
    });

    const updateActivePill = React.useCallback(() => {
      const container = resultsContainerRef.current;
      if (!container || filteredItems.length === 0 || activeIndex < 0) {
        setActivePillRect((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
        return;
      }
      const activeEl = container.querySelector<HTMLElement>(`[data-result-index="${activeIndex}"]`);
      if (activeEl) {
        setActivePillRect({
          top: activeEl.offsetTop,
          height: activeEl.offsetHeight,
          opacity: 1,
        });
      } else {
        setActivePillRect((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    }, [activeIndex, filteredItems]);

    React.useEffect(() => {
      updateActivePill();
      const raf = requestAnimationFrame(updateActivePill);
      return () => cancelAnimationFrame(raf);
    }, [updateActivePill, isExpanded, normalizedVariant]);

    // Auto-focus input when expanded
    React.useEffect(() => {
      if (isExpanded) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
        return () => clearTimeout(timer);
      }
    }, [isExpanded]);

    // Keyboard navigation (<Down>, <Up>, <Enter>, <Esc>, Cmd+K)
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (disabled) return;

        // Cmd+K or Ctrl+K to toggle/open
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setExpandedState(!isExpanded);
          return;
        }

        if (!isExpanded) return;

        if (e.key === "Escape") {
          e.preventDefault();
          setExpandedState(false);
          inputRef.current?.blur();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) => (filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredItems[activeIndex]) {
            const selected = filteredItems[activeIndex];
            onSelectResult?.(selected);
            onSearch?.(selected.title);
            setExpandedState(false);
          } else if (query.trim()) {
            onSearch?.(query.trim());
            setExpandedState(false);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [disabled, isExpanded, filteredItems, activeIndex, query, onSearch, onSelectResult, setExpandedState]);

    // Click outside to collapse
    React.useEffect(() => {
      if (!isExpanded) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setExpandedState(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isExpanded, setExpandedState]);

    // Auto-scroll the active keyboard result strictly inside its local container (NEVER scrolls page)
    React.useEffect(() => {
      const container = resultsContainerRef.current;
      if (!container) return;
      const activeEl = container.querySelector<HTMLElement>(`[data-result-index="${activeIndex}"]`);
      if (activeEl) {
        const top = activeEl.offsetTop - container.offsetTop;
        if (top < container.scrollTop) {
          container.scrollTop = top;
        } else if (top + activeEl.offsetHeight > container.scrollTop + container.clientHeight) {
          container.scrollTop = top + activeEl.offsetHeight - container.clientHeight;
        }
      }
    }, [activeIndex]);

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlledValue) {
        setUncontrolledValue("");
      }
      onChange?.("");
      inputRef.current?.focus();
    };

    const handleSelect = (item: SearchBarItem) => {
      onSelectResult?.(item);
      onSearch?.(item.title);
      setExpandedState(false);
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative isolate select-none font-sans",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        style={{
          "--accent-cobalt": accentColor,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        {/* ===================================================================================
            VARIANT 1: DOWNWARD-EXPAND (Liquid Glass Pill)
            Translucent liquid glass pill anchored at the top that smoothly expands
            downwards using butter-smooth CSS grid transition.
            Corner radius is fixed at 24px so there is ZERO morphing stutter or snapping!
           =================================================================================== */}
        {normalizedVariant === "downward-expand" && (
          <div
            className={cn(
              "relative flex flex-col w-[320px] sm:w-[390px] max-w-full rounded-[24px] overflow-hidden",
              "backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              // Light mode: authentic physical glass with double specular highlights and ambient drop shadow
              "bg-white/80 border border-white/90 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.05),inset_0_1.5px_0_0_rgba(255,255,255,0.95),inset_0_-1px_0_0_rgba(0,0,0,0.06)]",
              // Dark mode: refractive deep glass with cyan/blue caustics, glossy sheen, and deep obsidian bevel
              "dark:bg-slate-900/60 dark:border-white/15 dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),0_0_24px_-4px_rgba(52,120,246,0.2),inset_0_1.5px_0_0_rgba(255,255,255,0.4),inset_0_0_18px_-4px_rgba(255,255,255,0.08),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]"
            )}
          >
            {/* Top Gloss Sheen Beam */}
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-0 h-[22px] pointer-events-none rounded-t-[24px] bg-gradient-to-b from-white/40 dark:from-white/15 via-white/10 dark:via-white/5 to-transparent z-[1]"
            />

            {/* Top Search Input Row (Anchored fixed position: NEVER moves, shifts, or jumps) */}
            <div
              onClick={() => {
                if (!isExpanded) setExpandedState(true);
                inputRef.current?.focus();
              }}
              className="relative z-10 flex items-center gap-2.5 px-3.5 sm:px-4 h-[46px] shrink-0 cursor-text select-none"
            >
              <div className="flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0">
                <Search className="w-4 h-4 transition-transform duration-200 group-hover:scale-105 text-blue-600 dark:text-blue-400" />
              </div>

              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={isExpanded}
                aria-autocomplete="list"
                value={query}
                onChange={(e) => {
                  const nextVal = e.target.value;
                  if (!isControlledValue) setUncontrolledValue(nextVal);
                  onChange?.(nextVal);
                  if (!isExpanded) setExpandedState(true);
                }}
                onFocus={() => {
                  if (!isExpanded) setExpandedState(true);
                }}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "w-full bg-transparent border-0 outline-none p-0 text-sm font-medium",
                  "text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500",
                  "focus:outline-none focus:ring-0 shadow-none"
                )}
              />

              <div className="flex items-center gap-1.5 shrink-0">
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search input"
                    className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {showShortcut && !isExpanded && (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/10 select-none">
                    <Command className="w-2.5 h-2.5" />K
                  </kbd>
                )}

                {isExpanded && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedState(false);
                    }}
                    className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors cursor-pointer"
                    aria-label="Close search"
                  >
                    Esc
                  </button>
                )}
              </div>
            </div>

            {/* Results Panel: CSS Grid transition (mathematically 100% butter-smooth, no max-height timing jumps) */}
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[grid-template-rows,opacity]",
                isExpanded ? "grid-rows-[1fr] opacity-100 pointer-events-auto" : "grid-rows-[0fr] opacity-0 pointer-events-none"
              )}
            >
              <div className="overflow-hidden min-h-0 flex flex-col">
                <div className="border-t border-black/5 dark:border-white/10 flex flex-col min-h-0">
                  <div className="flex items-center justify-between px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
                    <span>
                      {query.trim()
                        ? `Matching (${filteredItems.length})`
                        : "Suggested components"}
                    </span>
                    <span className="hidden sm:inline">↑↓ navigate • ↵ select</span>
                  </div>

                  <div
                    ref={resultsContainerRef}
                    className="relative flex-1 min-h-0 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar max-h-[220px]"
                  >
                    {/* Smooth Floating Glide Selection Pill (Sub-pixel spring ease on mouse move) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-2 right-2 rounded-xl pointer-events-none z-0",
                        "transition-[transform,height,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                        "bg-black/5 dark:bg-white/15 border border-black/5 dark:border-white/10 shadow-2xs",
                        activePillRect.opacity > 0 ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        transform: `translate3d(0, ${activePillRect.top}px, 0)`,
                        height: `${activePillRect.height}px`,
                      }}
                    />

                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, idx) => {
                        const isActive = idx === activeIndex;

                        return (
                          <div
                            key={item.id}
                            data-result-index={idx}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "relative z-10 group flex items-center justify-between px-3 py-2 rounded-xl text-left cursor-pointer transition-colors duration-150 select-none",
                              isActive
                                ? "text-slate-950 dark:text-white"
                                : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                  isActive
                                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                    : "bg-black/5 dark:bg-white/5 text-slate-500"
                                )}
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="text-xs sm:text-sm font-medium tracking-tight truncate">
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              {item.badge && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                                  {item.badge}
                                </span>
                              )}
                              {isActive && (
                                <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="px-4 py-6 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
                        No matching components found for &quot;{query}&quot;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================================
            VARIANT 2: CIRCLE-POPOUT (Liquid Glass Orb)
            At rest: Standalone circular liquid glass button.
            On click: A circle of the EXACT SAME diameter buds out and extends
            horizontally into a liquid glass search pill.
           =================================================================================== */}
        {normalizedVariant === "circle-popout" && (
          <div className="relative inline-flex items-center gap-2.5 sm:gap-3">
            {/* Primary Circular Glass Button */}
            <button
              type="button"
              onClick={() => {
                if (disabled) return;
                setExpandedState(!isExpanded);
              }}
              disabled={disabled}
              aria-label={isExpanded ? "Collapse search bar" : "Open search bar"}
              title={isExpanded ? "Collapse search (Esc)" : "Search components (⌘K)"}
              className={cn(
                "relative shrink-0 flex items-center justify-center rounded-full cursor-pointer select-none",
                "w-[48px] h-[48px] sm:w-[50px] sm:h-[50px]",
                "backdrop-blur-2xl backdrop-saturate-150 transition-all duration-200 active:scale-95 hover:scale-105 group",
                // Light mode:
                "bg-white/80 border border-white/90 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1),inset_0_1.5px_0_0_rgba(255,255,255,0.95),inset_0_-1px_0_0_rgba(0,0,0,0.06)]",
                // Dark mode:
                "dark:bg-slate-900/60 dark:border-white/20 dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),0_0_20px_-2px_rgba(52,120,246,0.2),inset_0_1.5px_0_0_rgba(255,255,255,0.4),inset_0_0_14px_-2px_rgba(255,255,255,0.1),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]"
              )}
            >
              {/* Crescent Specular Curved Highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-[2px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 55%)",
                }}
              />

              <Search
                className={cn(
                  "w-5 h-5 text-slate-800 dark:text-slate-100 transition-transform duration-300",
                  isExpanded ? "rotate-90 scale-105 text-blue-600 dark:text-blue-400" : "group-hover:scale-110"
                )}
              />
            </button>

            {/* Same Diameter Pop-out & Extending Pill */}
            <div
              className={cn(
                "relative flex items-center h-[48px] sm:h-[50px] rounded-full overflow-hidden",
                "backdrop-blur-2xl backdrop-saturate-150 transition-[width,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "bg-white/80 border border-white/90 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1),inset_0_1.5px_0_0_rgba(255,255,255,0.95)]",
                "dark:bg-slate-900/60 dark:border-white/15 dark:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6),inset_0_1.5px_0_0_rgba(255,255,255,0.3)]",
                isExpanded
                  ? "w-[300px] sm:w-[360px] opacity-100 scale-100 pointer-events-auto"
                  : "w-0 opacity-0 scale-90 pointer-events-none -ml-2.5 sm:-ml-3 border-transparent"
              )}
            >
              <div className="relative z-10 flex items-center w-full px-4 gap-2.5 min-w-[280px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    const nextVal = e.target.value;
                    if (!isControlledValue) setUncontrolledValue(nextVal);
                    onChange?.(nextVal);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (filteredItems[0]) handleSelect(filteredItems[0]);
                      else if (query.trim()) {
                        onSearch?.(query.trim());
                        setExpandedState(false);
                      }
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      setExpandedState(false);
                    }
                  }}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={cn(
                    "w-full bg-transparent border-0 outline-none p-0 text-sm font-medium",
                    "text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500",
                    "focus:outline-none focus:ring-0 shadow-none"
                  )}
                />

                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear input"
                    className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {showShortcut && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedState(false);
                    }}
                    className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors shrink-0 cursor-pointer"
                  >
                    Esc
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================================
            VARIANT 3: MINIMAL-PILL (Clean Minimal SaaS Pill)
            Linear / Raycast style minimal SaaS command bar with downward drawer.
           =================================================================================== */}
        {normalizedVariant === "minimal-pill" && (
          <div
            className={cn(
              "relative flex flex-col w-[320px] sm:w-[380px] max-w-full rounded-xl overflow-hidden",
              "transition-[box-shadow,border-color] duration-200 ease-out",
              // Minimal SaaS solid surface matching theme:
              "bg-white dark:bg-[#121620] border border-slate-200 dark:border-white/10 shadow-xs",
              "hover:border-slate-300 dark:hover:border-white/20",
              isExpanded && "border-slate-300 dark:border-white/25 shadow-lg"
            )}
          >
            <div
              onClick={() => {
                if (!isExpanded) setExpandedState(true);
                inputRef.current?.focus();
              }}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 h-[44px] shrink-0 cursor-text select-none"
            >
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />

              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={isExpanded}
                aria-autocomplete="list"
                value={query}
                onChange={(e) => {
                  const nextVal = e.target.value;
                  if (!isControlledValue) setUncontrolledValue(nextVal);
                  onChange?.(nextVal);
                  if (!isExpanded) setExpandedState(true);
                }}
                onFocus={() => {
                  if (!isExpanded) setExpandedState(true);
                }}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "w-full bg-transparent border-0 outline-none p-0 text-xs sm:text-sm font-medium font-sans",
                  "text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500",
                  "focus:outline-none focus:ring-0 shadow-none"
                )}
              />

              <div className="flex items-center gap-1.5 shrink-0">
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {showShortcut && !isExpanded && (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-black/[0.04] dark:bg-white/[0.06] rounded border border-black/5 dark:border-white/10 select-none">
                    <Command className="w-2.5 h-2.5" />K
                  </kbd>
                )}

                {isExpanded && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedState(false);
                    }}
                    className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 hover:text-slate-700 dark:hover:text-white rounded bg-black/[0.04] dark:bg-white/[0.06] cursor-pointer"
                  >
                    Esc
                  </button>
                )}
              </div>
            </div>

            {/* Downward Drawer: CSS grid for smooth height interpolation */}
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-240 ease-out will-change-[grid-template-rows,opacity]",
                isExpanded ? "grid-rows-[1fr] opacity-100 pointer-events-auto" : "grid-rows-[0fr] opacity-0 pointer-events-none"
              )}
            >
              <div className="overflow-hidden min-h-0 flex flex-col">
                <div className="border-t border-slate-100 dark:border-white/5 flex flex-col min-h-0">
                  <div
                    ref={resultsContainerRef}
                    className="relative flex-1 min-h-0 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar max-h-[220px]"
                  >
                    {/* Smooth Floating Glide Selection Pill (Sub-pixel spring ease on mouse move) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute left-1.5 right-1.5 rounded-lg pointer-events-none z-0",
                        "transition-[transform,height,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                        "bg-slate-200/80 dark:bg-white/10 border border-slate-300/40 dark:border-white/10 shadow-2xs",
                        activePillRect.opacity > 0 ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        transform: `translate3d(0, ${activePillRect.top}px, 0)`,
                        height: `${activePillRect.height}px`,
                      }}
                    />

                    {filteredItems.map((item, idx) => {
                      const isActive = idx === activeIndex;

                      return (
                        <div
                          key={item.id}
                          data-result-index={idx}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={cn(
                            "relative z-10 flex items-center justify-between px-3 py-2 rounded-lg text-left cursor-pointer transition-colors duration-150 text-xs font-medium select-none",
                            isActive
                              ? "text-slate-900 dark:text-white font-semibold"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="truncate">{item.title}</span>
                            {item.category && (
                              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                {item.category}
                              </span>
                            )}
                          </div>
                          {isActive && <CornerDownLeft className="w-3 h-3 text-slate-400 shrink-0 ml-2 animate-in fade-in duration-150" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================================
            VARIANT 4: MINIMAL-EXPAND (Minimal SaaS Expand Trigger)
            Compact icon button that expands into an inline minimal search input.
           =================================================================================== */}
        {normalizedVariant === "minimal-expand" && (
          <div className="relative inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (disabled) return;
                setExpandedState(!isExpanded);
              }}
              disabled={disabled}
              className={cn(
                "relative shrink-0 flex items-center justify-center rounded-lg cursor-pointer select-none",
                "w-10 h-10 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121620] hover:bg-slate-50 dark:hover:bg-[#181e2b] transition-all shadow-xs"
              )}
            >
              <Search className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>

            <div
              className={cn(
                "relative flex items-center h-10 rounded-lg overflow-hidden border transition-[width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "bg-white dark:bg-[#121620] border-slate-200 dark:border-white/10 shadow-xs",
                isExpanded
                  ? "w-[280px] sm:w-[340px] opacity-100 pointer-events-auto px-3"
                  : "w-0 opacity-0 pointer-events-none border-transparent px-0 -ml-2"
              )}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  const nextVal = e.target.value;
                  if (!isControlledValue) setUncontrolledValue(nextVal);
                  onChange?.(nextVal);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (filteredItems[0]) handleSelect(filteredItems[0]);
                    else if (query.trim()) {
                      onSearch?.(query.trim());
                      setExpandedState(false);
                    }
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    setExpandedState(false);
                  }
                }}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "w-full bg-transparent border-0 outline-none p-0 text-xs sm:text-sm font-medium font-sans min-w-[200px]",
                  "text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500",
                  "focus:outline-none focus:ring-0 shadow-none"
                )}
              />

              {query.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {showShortcut && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedState(false);
                  }}
                  className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 hover:text-slate-700 dark:hover:text-white rounded bg-black/[0.04] dark:bg-white/[0.06] shrink-0 cursor-pointer"
                >
                  Esc
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

LiquidGlassSearchBar.displayName = "LiquidGlassSearchBar";
export const SearchBar = LiquidGlassSearchBar;

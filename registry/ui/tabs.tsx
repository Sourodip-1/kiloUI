"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TabsVariant = "default" | "slide" | "liquid-pill" | "island" | "minimal";
export type TabsPillStyle = "liquid-glow" | "solid" | "glass" | "accent";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
  variant: TabsVariant;
  pillStyle: TabsPillStyle;
  direction: number; // 1 = moving right, -1 = moving left, 0 = neutral
  tabOrder: string[];
  registerTab: (val: string) => void;
  unregisterTab: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

export function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a <Tabs />");
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  pillStyle?: TabsPillStyle;
}

export function Tabs({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  variant = "default",
  pillStyle = "liquid-glow",
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [tabOrder, setTabOrder] = React.useState<string[]>([]);
  const [direction, setDirection] = React.useState<number>(0);
  const prevValueRef = React.useRef(value);

  const registerTab = React.useCallback((tabVal: string) => {
    setTabOrder((prev) => (prev.includes(tabVal) ? prev : [...prev, tabVal]));
  }, []);

  const unregisterTab = React.useCallback((tabVal: string) => {
    setTabOrder((prev) => prev.filter((t) => t !== tabVal));
  }, []);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      const prevIdx = tabOrder.indexOf(prevValueRef.current);
      const curIdx = tabOrder.indexOf(value);
      if (prevIdx !== -1 && curIdx !== -1) {
        setDirection(curIdx > prevIdx ? 1 : -1);
      }
      prevValueRef.current = value;
    }
  }, [value, tabOrder]);

  const handleValueChange = (newVal: string) => {
    const prevIdx = tabOrder.indexOf(value);
    const curIdx = tabOrder.indexOf(newVal);
    if (prevIdx !== -1 && curIdx !== -1) {
      setDirection(curIdx > prevIdx ? 1 : -1);
    }
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        variant,
        pillStyle,
        direction,
        tabOrder,
        registerTab,
        unregisterTab,
      }}
    >
      <div
        className={cn(
          "w-full flex flex-col",
          (variant === "slide" || variant === "liquid-pill" || variant === "island") &&
            "relative overflow-x-clip",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TabsVariant;
  pillStyle?: TabsPillStyle;
}

export function TabsList({
  variant: listVariantOverride,
  pillStyle: listPillStyleOverride,
  className,
  children,
  ...props
}: TabsListProps) {
  const { value, variant: contextVariant, pillStyle: contextPillStyle } = useTabs();
  const variant = listVariantOverride || contextVariant;
  const pillStyle = listPillStyleOverride || contextPillStyle;

  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
    height: number;
    top: number;
  } | null>(null);

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeTrigger = list.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]'
    );
    if (!activeTrigger) {
      setIndicatorStyle(null);
      return;
    }

    const listRect = list.getBoundingClientRect();
    const triggerRect = activeTrigger.getBoundingClientRect();
    const borderLeft = list.clientLeft || 0;
    const borderTop = list.clientTop || 0;

    setIndicatorStyle({
      left: triggerRect.left - (listRect.left + borderLeft) + list.scrollLeft,
      top: triggerRect.top - (listRect.top + borderTop) + list.scrollTop,
      width: triggerRect.width,
      height: triggerRect.height,
    });
  }, []);

  React.useEffect(() => {
    const list = listRef.current;
    updateIndicator();
    const rAf = requestAnimationFrame(updateIndicator);
    const timer1 = setTimeout(updateIndicator, 50);
    const timer2 = setTimeout(updateIndicator, 200);
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    if (list) list.addEventListener("scroll", updateIndicator);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && list) {
      ro = new ResizeObserver(() => updateIndicator());
      ro.observe(list);
      const activeTrigger = list.querySelector<HTMLElement>(
        '[role="tab"][aria-selected="true"]'
      );
      if (activeTrigger) ro.observe(activeTrigger);
    }

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(rAf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
      if (list) list.removeEventListener("scroll", updateIndicator);
      ro?.disconnect();
    };
  }, [value, variant, updateIndicator]);

  const pillThemeClasses = {
    "liquid-glow":
      "bg-[var(--accent-green)]/15 text-[var(--accent-green)] border border-[var(--accent-green)]/35 shadow-xs",
    solid:
      "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs",
    glass:
      "bg-white/10 dark:bg-white/15 backdrop-blur-md text-[var(--text-primary)] border border-white/20 shadow-xs",
    accent:
      "bg-neutral-900 dark:bg-white text-white dark:text-black border border-neutral-800 dark:border-white/20 shadow-md",
  }[pillStyle];

  const hasSlidingPill =
    variant === "slide" || variant === "liquid-pill" || variant === "island";

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        "relative inline-flex items-center select-none max-w-full overflow-x-auto scrollbar-none",
        variant === "default" &&
          "rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)]",
        variant === "slide" &&
          "rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)]",
        variant === "liquid-pill" &&
          "rounded-xl border border-[var(--border)]/70 bg-[var(--surface-secondary)]/90 backdrop-blur-md p-1.5",
        variant === "island" &&
          "rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xl shadow-lg p-2",
        variant === "minimal" &&
          "border-b border-[var(--border)] bg-transparent p-0 rounded-none gap-4 sm:gap-6 pb-px",
        className
      )}
      {...props}
    >
      {/* Sliding Active Pill Indicator */}
      {hasSlidingPill && indicatorStyle && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-0 top-0 pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0",
            variant === "slide" &&
              "rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] shadow-xs",
            (variant === "liquid-pill" || variant === "island") &&
              cn("rounded-lg", pillThemeClasses)
          )}
          style={{
            transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
            width: `${indicatorStyle.width}px`,
            height: `${indicatorStyle.height}px`,
          }}
        />
      )}

      {/* Minimal Underline Indicator */}
      {variant === "minimal" && indicatorStyle && (
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-0.5 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0"
          style={{
            transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export function TabsTrigger({
  value: triggerValue,
  badge,
  icon,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { value, onValueChange, variant, pillStyle, registerTab, unregisterTab } = useTabs();
  const isSelected = value === triggerValue;

  React.useEffect(() => {
    registerTab(triggerValue);
    return () => unregisterTab(triggerValue);
  }, [triggerValue, registerTab, unregisterTab]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => onValueChange(triggerValue)}
      className={cn(
        "relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-colors select-none cursor-pointer shrink-0",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)] active:scale-[0.97]",
        // 1. Default variant
        variant === "default" && [
          "rounded px-3 py-1.5",
          isSelected
            ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-xs"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
        ],
        // 2. Slide variant
        variant === "slide" && [
          "rounded px-3 py-1.5",
          isSelected
            ? "text-[var(--text-primary)] font-semibold"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
        ],
        // 3. Liquid Pill & Island variants
        (variant === "liquid-pill" || variant === "island") && [
          "rounded-lg px-4 py-2 font-mono text-xs sm:text-sm",
          isSelected
            ? pillStyle === "accent"
              ? "text-white dark:text-black font-semibold"
              : pillStyle === "liquid-glow"
              ? "text-[var(--accent-green)] font-semibold"
              : "text-[var(--text-primary)] font-semibold"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        ],
        // 4. Minimal variant
        variant === "minimal" && [
          "px-2 py-2.5 font-mono text-xs sm:text-sm border-0 bg-transparent rounded-none",
          isSelected
            ? "text-[var(--text-primary)] font-semibold"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        ],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {badge && (
        <span
          className={cn(
            "ml-1 rounded px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-wide transition-colors",
            isSelected
              ? pillStyle === "accent" && (variant === "liquid-pill" || variant === "island")
                ? "bg-white/20 dark:bg-black/15 text-white dark:text-black"
                : "bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
              : "bg-[var(--surface-tertiary)] text-[var(--text-muted)]"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value: contentValue,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value, variant, direction } = useTabs();
  const isSelected = value === contentValue;

  const isAnimated =
    variant === "slide" || variant === "liquid-pill" || variant === "island";

  if (isAnimated) {
    return (
      <div
        role="tabpanel"
        tabIndex={0}
        aria-hidden={!isSelected}
        className={cn(
          "w-full focus-visible:outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]",
          isSelected
            ? "opacity-100 translate-x-0 relative pointer-events-auto"
            : direction >= 0
            ? "opacity-0 -translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible h-0 max-h-0 overflow-hidden"
            : "opacity-0 translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible h-0 max-h-0 overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn("mt-3 focus-visible:outline-none text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
}

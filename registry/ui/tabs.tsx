"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export type TabsVariant = "default" | "slide";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
  variant: TabsVariant;
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
}

export function Tabs({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  variant = "default",
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
        direction,
        tabOrder,
        registerTab,
        unregisterTab,
      }}
    >
      <div
        className={cn(
          "w-full flex flex-col",
          variant === "slide" && "relative overflow-x-clip",
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
}

export function TabsList({
  variant: listVariantOverride,
  className,
  children,
  ...props
}: TabsListProps) {
  const { value, variant: contextVariant } = useTabs();
  const variant = listVariantOverride || contextVariant;

  const listRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
    height: number;
    top: number;
  } | null>(null);

  const updateIndicator = React.useCallback(() => {
    if (!listRef.current) return;
    const activeTrigger = listRef.current.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]'
    );
    if (activeTrigger) {
      const listRect = listRef.current.getBoundingClientRect();
      const triggerRect = activeTrigger.getBoundingClientRect();
      setIndicatorStyle({
        left: triggerRect.left - listRect.left,
        width: triggerRect.width,
        height: triggerRect.height,
        top: triggerRect.top - listRect.top,
      });
    } else {
      setIndicatorStyle(null);
    }
  }, []);

  React.useEffect(() => {
    updateIndicator();
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [value, updateIndicator]);

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        "relative inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)] select-none",
        className
      )}
      {...props}
    >
      {/* Sliding Active Pill Indicator */}
      {variant === "slide" && indicatorStyle && (
        <span
          aria-hidden="true"
          className="absolute rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] shadow-xs pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
            width: `${indicatorStyle.width}px`,
            height: `${indicatorStyle.height}px`,
            left: 0,
            top: 0,
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
}

export function TabsTrigger({
  value: triggerValue,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { value, onValueChange, variant, registerTab, unregisterTab } = useTabs();
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
        "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium transition-colors select-none cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]",
        variant === "slide"
          ? isSelected
            ? "text-[var(--text-primary)] font-semibold"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          : isSelected
          ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-xs"
          : "hover:text-[var(--text-primary)]",
        className
      )}
      {...props}
    >
      {children}
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

  if (variant === "slide") {
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

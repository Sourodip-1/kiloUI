"use client";

import * as React from "react";
import { cn } from "../lib/utils";

interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
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
}

export function Tabs({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn("w-full flex flex-col", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-8 items-center rounded border border-[var(--border)] bg-[var(--surface-elevated)] p-0.5 text-[var(--text-muted)]",
        className
      )}
      {...props}
    />
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
  const { value, onValueChange } = useTabs();
  const isSelected = value === triggerValue;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => onValueChange(triggerValue)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded px-2.5 py-1 text-xs font-normal transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]",
        isSelected
          ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-medium"
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
  const { value } = useTabs();
  if (value !== contentValue) return null;

  return (
    <div
      role="tabpanel"
      className={cn("mt-3 focus-visible:outline-none text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
}

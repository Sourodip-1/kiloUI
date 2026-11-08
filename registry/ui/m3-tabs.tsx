"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface M3TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface M3TabsProps {
  tabs: M3TabItem[];
  value: string;
  onChange: (id: string) => void;
  type?: "primary" | "secondary" | "minimal" | string;
  variant?: "primary" | "secondary" | "minimal" | string;
  fullWidth?: boolean;
  className?: string;
}

export function M3Tabs({
  tabs,
  value,
  onChange,
  type = "primary",
  variant,
  fullWidth = true,
  className,
}: M3TabsProps) {
  const activeType = variant || type;
  const isMinimal = activeType === "minimal";
  const isSecondary = activeType === "secondary";
  const uniqueId = React.useId();

  if (isMinimal) {
    return (
      <div
        role="tablist"
        className={cn(
          "w-full flex items-center select-none p-1 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)] gap-1 shadow-2xs font-sans",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = value === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className={cn(
                "relative flex-1 min-w-0 h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none focus-visible:outline-none",
                isActive
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50 border border-transparent"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span className="truncate">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--surface-tertiary)] text-[var(--text-muted)] shrink-0">
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      className={cn(
        "relative w-full flex items-center select-none border-b border-[var(--border)] transition-colors font-sans",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.id;

        return (
          <motion.button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={cn(
              "relative flex items-center justify-center font-sans cursor-pointer focus-visible:outline-none",
              fullWidth ? "flex-1 min-w-0" : "px-5",
              isSecondary
                ? cn(
                    "h-10 text-xs font-semibold gap-2 rounded-full m-1 transition-colors",
                    isActive
                      ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold shadow-2xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                  )
                : cn(
                    "h-12 text-sm font-semibold gap-2 transition-colors",
                    isActive
                      ? "text-[var(--accent-green)] font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--surface-secondary)] text-[var(--text-muted)] shrink-0">
                {tab.badge}
              </span>
            )}

            {/* M3 Active Bottom Indicator Bar with spring physics */}
            {!isSecondary && isActive && (
              <motion.span
                layoutId={`tab-indicator-${uniqueId}`}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute bottom-0 inset-x-2 h-0.75 rounded-t-full bg-[var(--accent-green)]"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

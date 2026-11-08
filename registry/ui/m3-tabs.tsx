"use client";

import * as React from "react";
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

  return (
    <div
      role="tablist"
      className={cn(
        "relative flex items-center select-none border-b border-[var(--border)] transition-colors",
        isMinimal && "p-1 rounded-xl bg-[var(--surface-secondary)]/50 border",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center justify-center font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none",
              fullWidth ? "flex-1" : "px-5",
              isMinimal
                ? cn(
                    "h-8 rounded-lg text-xs font-semibold gap-1.5",
                    isActive
                      ? "bg-[var(--surface-elevated)] text-[var(--accent-green)] shadow-2xs border border-[var(--border)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )
                : isSecondary
                ? cn(
                    "h-10 text-xs font-semibold gap-2 rounded-lg m-1",
                    isActive
                      ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                  )
                : cn(
                    "h-12 text-sm font-semibold gap-2",
                    isActive
                      ? "text-[var(--accent-green)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>

            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-[var(--surface-tertiary)] text-[var(--text-muted)]">
                {tab.badge}
              </span>
            )}

            {/* M3 Primary Underline Indicator */}
            {type === "primary" && isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-green)] rounded-t-full transition-all duration-200 shadow-[0_0_8px_var(--accent-green-subtle)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

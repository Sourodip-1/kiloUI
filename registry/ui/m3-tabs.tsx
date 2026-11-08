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

  if (isMinimal) {
    return (
      <div
        role="tablist"
        className={cn(
          "flex items-center select-none p-1 m-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)] gap-1 shadow-2xs font-sans",
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
                "relative flex-1 min-w-0 h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer select-none active:scale-95 focus-visible:outline-none",
                isActive
                  ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xs border border-[var(--border)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span className="truncate">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--surface-tertiary)] text-[var(--text-muted)] shrink-0">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      className={cn(
        "relative flex items-center select-none border-b border-[var(--border)] transition-colors font-sans",
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
              "relative flex items-center justify-center font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none active:scale-95 ease-[cubic-bezier(0.2,0,0,1)]",
              fullWidth ? "flex-1 min-w-0" : "px-5",
              isSecondary
                ? cn(
                    "h-10 text-xs font-semibold gap-2 rounded-full m-1",
                    isActive
                      ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold shadow-2xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                  )
                : cn(
                    "h-12 text-xs sm:text-sm font-semibold gap-2",
                    isActive
                      ? "text-[var(--accent-green)] font-bold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span className="truncate">{tab.label}</span>

            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold shrink-0",
                  isActive
                    ? "bg-[var(--accent-green)] text-[var(--bg-main)]"
                    : "bg-[var(--surface-tertiary)] text-[var(--text-muted)]"
                )}
              >
                {tab.badge}
              </span>
            )}

            {/* M3 Primary Active Underline Indicator */}
            {!isSecondary && isActive && (
              <span className="absolute bottom-0 inset-x-3 h-0.75 rounded-t-full bg-[var(--accent-green)] animate-in fade-in duration-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}

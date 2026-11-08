"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3ListItemProps {
  headline: string;
  supportingText?: string;
  overline?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  trailingText?: string;
  trailingSupportingText?: string;
  showChevron?: boolean;
  onClick?: () => void;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  divider?: boolean;
  className?: string;
}

export function M3ListItem({
  headline,
  supportingText,
  overline,
  leading,
  trailing,
  trailingText,
  trailingSupportingText,
  showChevron = false,
  onClick,
  design,
  variant,
  divider = true,
  className,
}: M3ListItemProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const isClickable = Boolean(onClick);
  const displayTrailingText = trailingSupportingText || trailingText;

  return (
    <div
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={cn(
        "flex items-center justify-between w-full font-sans transition-colors duration-150 select-none",
        isClickable && "cursor-pointer active:bg-[var(--surface-tertiary)]",
        isMinimal
          ? "px-3 py-2.5 hover:bg-[var(--surface-secondary)]/50 rounded-lg"
          : "px-4 py-3 hover:bg-[var(--surface-secondary)]/70",
        divider && "border-b border-[var(--border)]/50",
        className
      )}
    >
      {/* Leading Slot */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {leading && <div className="shrink-0 text-[var(--text-primary)]">{leading}</div>}

        {/* Content Lines */}
        <div className="min-w-0 flex-1">
          {overline && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block truncate">
              {overline}
            </span>
          )}
          <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug truncate">
            {headline}
          </h4>
          {supportingText && (
            <p className="text-xs text-[var(--text-secondary)] leading-normal truncate mt-0.5">
              {supportingText}
            </p>
          )}
        </div>
      </div>

      {/* Trailing Slot */}
      <div className="flex items-center gap-2 shrink-0 ml-3">
        {displayTrailingText && (
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {displayTrailingText}
          </span>
        )}
        {trailing}
        {showChevron && (
          <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
        )}
      </div>
    </div>
  );
}

export interface M3ListProps {
  children: React.ReactNode;
  header?: string;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  className?: string;
}

export function M3List({
  children,
  header,
  design,
  variant,
  className,
}: M3ListProps) {
  const isMinimal = design === "minimal" || variant === "minimal";

  return (
    <div
      role="list"
      className={cn(
        "w-full flex flex-col overflow-hidden font-sans",
        isMinimal
          ? "rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-1 space-y-0.5 shadow-2xs"
          : "rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xs",
        className
      )}
    >
      {header && (
        <div className="px-4 pt-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {header}
        </div>
      )}
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type M3ListLineCount = "1" | "2" | "3" | 1 | 2 | 3;

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
  lines?: M3ListLineCount;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | "one-line" | "two-line" | "three-line" | string;
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
  lines,
  design,
  variant,
  divider = true,
  className,
}: M3ListItemProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const isClickable = Boolean(onClick);
  const displayTrailingText = trailingSupportingText || trailingText;

  // Determine line mode: 1-line, 2-line, or 3-line
  const activeLines =
    lines !== undefined
      ? String(lines)
      : variant === "one-line"
      ? "1"
      : variant === "three-line"
      ? "3"
      : "2";

  return (
    <motion.div
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      whileTap={isClickable ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={cn(
        "flex w-full font-sans transition-colors select-none",
        isClickable && "cursor-pointer active:bg-[var(--surface-tertiary)]",
        isMinimal
          ? "px-3 py-2.5 min-h-[44px] items-center rounded-lg hover:bg-[var(--surface-secondary)]/50"
          : activeLines === "1"
          ? "px-4 h-14 min-h-[56px] items-center hover:bg-[var(--surface-secondary)]/70"
          : activeLines === "3"
          ? "px-4 min-h-[88px] py-3.5 items-start hover:bg-[var(--surface-secondary)]/70"
          : "px-4 min-h-[72px] py-3 items-center hover:bg-[var(--surface-secondary)]/70",
        divider && "border-b border-[var(--border)]/50",
        className
      )}
    >
      {/* Leading Slot */}
      {leading && (
        <div
          className={cn(
            "shrink-0 mr-3.5 text-[var(--text-primary)] flex items-center justify-center",
            activeLines === "3" ? "mt-0.5" : ""
          )}
        >
          {leading}
        </div>
      )}

      {/* Content Lines */}
      <div className="min-w-0 flex-1 pr-2">
        {overline && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block truncate mb-0.5">
            {overline}
          </span>
        )}
        <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-tight truncate">
          {headline}
        </h4>

        {/* 2-line: single line supporting text */}
        {activeLines === "2" && supportingText && (
          <p className="text-xs text-[var(--text-secondary)] leading-normal truncate mt-1">
            {supportingText}
          </p>
        )}

        {/* 3-line: multi-line supporting text */}
        {activeLines === "3" && supportingText && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mt-1">
            {supportingText}
          </p>
        )}
      </div>

      {/* Trailing Slot */}
      <div
        className={cn(
          "flex items-center gap-2 shrink-0 ml-auto",
          activeLines === "3" ? "mt-0.5" : ""
        )}
      >
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
    </motion.div>
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
        "w-full flex flex-col font-sans",
        isMinimal
          ? "p-1.5 space-y-1 rounded-xl bg-[var(--surface-primary)] border border-[var(--border)]"
          : "rounded-2xl bg-[var(--surface-primary)] border border-[var(--border)] overflow-hidden",
        className
      )}
    >
      {header && (
        <div className="px-4 py-2 border-b border-[var(--border)]/60 bg-[var(--surface-secondary)]/40 flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            {header}
          </span>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            M3 SPEC
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { ArrowLeft, Menu, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type M3TopAppBarVariant = "center-aligned" | "small" | "medium" | "large" | "minimal";

export interface M3TopAppBarProps {
  variant?: M3TopAppBarVariant;
  title: string;
  subtitle?: string;
  navigationIcon?: React.ReactNode;
  onNavigationClick?: () => void;
  actions?: React.ReactNode;
  scrollElevated?: boolean;
  className?: string;
}

export function M3TopAppBar({
  variant = "center-aligned",
  title,
  subtitle,
  navigationIcon,
  onNavigationClick,
  actions,
  scrollElevated = false,
  className,
}: M3TopAppBarProps) {
  const isMinimal = variant === "minimal";

  return (
    <header
      className={cn(
        "w-full transition-all duration-200 select-none border-b border-transparent",
        scrollElevated && "bg-[var(--surface-elevated)] border-[var(--border)] shadow-xs",
        variant === "center-aligned" && "h-16 px-4 flex items-center justify-between",
        variant === "small" && "h-16 px-4 flex items-center justify-between",
        variant === "medium" && "px-4 pt-3 pb-4 flex flex-col justify-between min-h-[96px]",
        variant === "large" && "px-4 pt-4 pb-6 flex flex-col justify-between min-h-[128px]",
        variant === "minimal" && "h-12 px-3 flex items-center justify-between border-[var(--border)] bg-[var(--surface-elevated)]",
        className
      )}
    >
      {/* Top Icon Row */}
      <div className={cn("flex items-center justify-between w-full", (variant === "medium" || variant === "large") && "pb-2")}>
        <div className="flex items-center gap-3">
          {navigationIcon ? (
            <button
              type="button"
              onClick={onNavigationClick}
              className="p-2 -ml-2 rounded-full text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            >
              {navigationIcon}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigationClick}
              className="p-2 -ml-2 rounded-full text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {variant === "small" && (
            <h1 className="text-lg font-bold font-sans text-[var(--text-primary)] truncate">
              {title}
            </h1>
          )}

          {variant === "minimal" && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-[var(--accent-green)]">{title}</span>
              {subtitle && <span className="text-[10px] text-[var(--text-muted)] font-mono">• {subtitle}</span>}
            </div>
          )}
        </div>

        {variant === "center-aligned" && (
          <div className="text-center truncate px-2">
            <h1 className="text-base font-bold font-sans text-[var(--text-primary)] truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-[var(--text-secondary)] truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Trailing Actions */}
        <div className="flex items-center gap-1">
          {actions ? (
            actions
          ) : (
            <button
              type="button"
              className="p-2 rounded-full text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Title for Medium & Large M3 variants */}
      {(variant === "medium" || variant === "large") && (
        <div className="pt-2">
          <h1
            className={cn(
              "font-bold font-sans text-[var(--text-primary)] tracking-tight",
              variant === "medium" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </header>
  );
}

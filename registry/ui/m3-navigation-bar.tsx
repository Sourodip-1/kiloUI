"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3NavigationDestination {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number | boolean;
}

export interface M3NavigationBarProps {
  destinations: M3NavigationDestination[];
  value: string;
  onChange: (id: string) => void;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | "with-badges" | string;
  className?: string;
  hideLabels?: boolean;
}

export function M3NavigationBar({
  destinations,
  value,
  onChange,
  design,
  variant,
  className,
  hideLabels = false,
}: M3NavigationBarProps) {
  const isMinimal = design === "minimal" || variant === "minimal";

  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "w-full flex items-center justify-around select-none border-t border-[var(--border)] transition-colors shrink-0",
        isMinimal
          ? "h-14 px-1 bg-[var(--surface-elevated)]/95 backdrop-blur-md"
          : "h-20 px-1.5 pb-2 pt-1 bg-[var(--surface-secondary)]/90 backdrop-blur-xl",
        className
      )}
    >
      {destinations.map((dest) => {
        const isActive = value === dest.id;

        return (
          <button
            key={dest.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(dest.id)}
            className={cn(
              "relative flex-1 min-w-0 max-w-[76px] h-full flex flex-col items-center justify-center transition-transform duration-150 cursor-pointer active:scale-95 group focus-visible:outline-none"
            )}
          >
            {/* Active Pill Indicator for Icon */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  isMinimal
                    ? cn(
                        "h-8 px-3 rounded-lg",
                        isActive
                          ? "bg-[var(--surface-tertiary)] text-[var(--accent-green)] font-semibold shadow-2xs"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      )
                    : cn(
                        "h-8 w-14 rounded-full",
                        isActive
                          ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] scale-100 shadow-xs"
                          : "bg-transparent text-[var(--text-secondary)] group-hover:bg-[var(--surface-tertiary)]/50"
                      )
                )}
              >
                <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                  {isActive && dest.activeIcon ? dest.activeIcon : dest.icon}
                </span>
              </div>

              {/* Destination Badge */}
              {dest.badge !== undefined && (
                <span
                  className={cn(
                    "absolute -top-1 -right-1 z-10 flex items-center justify-center rounded-full font-mono font-bold text-[9px] text-white shadow-xs pointer-events-none animate-in zoom-in-75 duration-150",
                    typeof dest.badge === "number" || typeof dest.badge === "string"
                      ? "h-4 min-w-4 px-1 bg-[var(--accent-red)]"
                      : "h-2 w-2 bg-[var(--accent-red)]"
                  )}
                >
                  {typeof dest.badge !== "boolean" ? dest.badge : null}
                </span>
              )}
            </div>

            {/* Destination Label */}
            {!hideLabels && (
              <span
                className={cn(
                  "text-[10px] font-sans transition-all duration-200 mt-1 truncate max-w-full px-0.5",
                  isActive
                    ? "font-bold text-[var(--text-primary)]"
                    : "font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                )}
              >
                {dest.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

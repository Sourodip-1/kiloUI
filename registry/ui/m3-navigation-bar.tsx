"use client";

import * as React from "react";
import { motion } from "motion/react";
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
        "w-full flex items-center justify-around select-none border-t border-[var(--border)] transition-colors shrink-0 px-1",
        isMinimal
          ? "h-14 bg-[var(--surface-elevated)]/95 backdrop-blur-md"
          : "h-20 pb-2 pt-1 bg-[var(--surface-secondary)]/90 backdrop-blur-xl",
        className
      )}
    >
      {destinations.map((dest) => {
        const isActive = value === dest.id;

        return (
          <motion.button
            key={dest.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(dest.id)}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={cn(
              "relative flex-1 min-w-0 max-w-[96px] h-full flex flex-col items-center justify-center cursor-pointer group focus-visible:outline-none"
            )}
          >
            {/* Active Pill Indicator for Icon */}
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "relative flex items-center justify-center transition-all duration-250",
                  isMinimal
                    ? cn(
                        "h-8 px-3 rounded-lg",
                        isActive
                          ? "bg-[var(--surface-tertiary)] text-[var(--accent-green)] font-semibold shadow-2xs"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      )
                    : cn(
                        "h-8 w-14 sm:w-16 rounded-full mx-auto",
                        isActive
                          ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] shadow-xs"
                          : "bg-transparent text-[var(--text-secondary)] group-hover:bg-[var(--surface-tertiary)]/50"
                      )
                )}
              >
                <span className="shrink-0 transition-transform duration-200">
                  {isActive && dest.activeIcon ? dest.activeIcon : dest.icon}
                </span>
              </div>

              {/* Destination Badge */}
              {dest.badge !== undefined && (
                <span
                  className={cn(
                    "absolute -top-1 -right-1 z-10 flex items-center justify-center rounded-full font-mono font-bold text-[9px] text-white shadow-xs pointer-events-none",
                    typeof dest.badge === "number" || typeof dest.badge === "string"
                      ? "h-4 min-w-4 px-1 bg-[var(--accent-red)]"
                      : "h-2 w-2 bg-[var(--accent-red)]"
                  )}
                >
                  {typeof dest.badge !== "boolean" ? dest.badge : null}
                </span>
              )}
            </div>

            {/* Label Text */}
            {!hideLabels && (
              <span
                className={cn(
                  "font-sans transition-colors duration-200 truncate mt-1 max-w-full px-0.5",
                  isMinimal
                    ? cn(
                        "text-[10px]",
                        isActive
                          ? "font-bold text-[var(--text-primary)]"
                          : "font-medium text-[var(--text-muted)]"
                      )
                    : cn(
                        "text-[11px]",
                        isActive
                          ? "font-bold text-[var(--accent-green)]"
                          : "font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      )
                )}
              >
                {dest.label}
              </span>
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

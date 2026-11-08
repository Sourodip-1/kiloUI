"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3DrawerDestination {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  section?: string;
}

export interface M3NavigationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinations: M3DrawerDestination[];
  value: string;
  onChange: (id: string) => void;
  title?: string;
  subtitle?: string;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  inline?: boolean;
  className?: string;
}

export function M3NavigationDrawer({
  open,
  onOpenChange,
  destinations,
  value,
  onChange,
  title = "Navigation",
  subtitle = "Kilo Studio",
  design,
  variant,
  inline = false,
  className,
}: M3NavigationDrawerProps) {
  const isMinimal = design === "minimal" || variant === "minimal";

  if (!open) return null;

  return (
    <div
      className={cn(
        inline ? "absolute inset-0 z-40" : "fixed inset-0 z-50",
        "flex select-none"
      )}
    >
      {/* Scrim Overlay */}
      <div
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "relative z-10 w-[82%] max-w-[320px] h-full flex flex-col p-4 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto",
          isMinimal
            ? "bg-[var(--surface-elevated)] border-r border-[var(--border)] rounded-r-2xl"
            : "bg-[var(--surface-secondary)] border-r border-[var(--border)] rounded-r-3xl",
          className
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-[var(--border)]/60">
          <div>
            <span className="text-[10px] font-mono text-[var(--accent-green)] font-semibold uppercase tracking-wider block">
              {subtitle}
            </span>
            <h3 className="text-base font-bold font-sans text-[var(--text-primary)]">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Destination Items */}
        <div className="flex-1 space-y-1">
          {destinations.map((dest) => {
            const isActive = value === dest.id;

            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  onChange(dest.id);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 transition-all duration-150 cursor-pointer text-left font-sans text-sm",
                  isMinimal
                    ? cn(
                        "rounded-xl",
                        isActive
                          ? "bg-[var(--surface-tertiary)] text-[var(--accent-green)] font-bold border border-[var(--border)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                      )
                    : cn(
                        "rounded-full",
                        isActive
                          ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-bold shadow-2xs"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]/60"
                      )
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="shrink-0">{dest.icon}</span>
                  <span className="truncate">{dest.label}</span>
                </div>

                {dest.badge !== undefined && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-mono font-bold",
                      isActive
                        ? "bg-[var(--accent-green)] text-[var(--bg-main)]"
                        : "bg-[var(--surface-tertiary)] text-[var(--text-muted)]"
                    )}
                  >
                    {dest.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-[var(--border)]/60 text-[10px] font-mono text-[var(--text-muted)]">
          Material 3 Navigation • v0.3.0
        </div>
      </div>
    </div>
  );
}

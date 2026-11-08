"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3SegmentOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface M3SegmentedButtonProps {
  options: M3SegmentOption[];
  value: string | string[];
  onChange: (value: any) => void;
  multiSelect?: boolean;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  size?: "sm" | "default";
  className?: string;
}

export function M3SegmentedButton({
  options,
  value,
  onChange,
  multiSelect = false,
  design,
  variant,
  size = "default",
  className,
}: M3SegmentedButtonProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const isSelected = (id: string) => {
    if (multiSelect && Array.isArray(value)) {
      return value.includes(id);
    }
    return value === id;
  };

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (multiSelect) {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(id);
      if (idx >= 0) {
        arr.splice(idx, 1);
      } else {
        arr.push(id);
      }
      onChange(arr);
    } else {
      onChange(id);
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center overflow-hidden border border-[var(--border)] select-none",
        isMinimal
          ? "rounded-lg p-0.5 bg-[var(--surface-secondary)]/50 gap-0.5"
          : "rounded-full bg-transparent divide-x divide-[var(--border)]",
        className
      )}
    >
      {options.map((opt, i) => {
        const active = isSelected(opt.id);
        const isFirst = i === 0;
        const isLast = i === options.length - 1;

        return (
          <button
            key={opt.id}
            type="button"
            disabled={opt.disabled}
            aria-pressed={active}
            onClick={() => handleSelect(opt.id, opt.disabled)}
            className={cn(
              "relative flex items-center justify-center font-sans font-medium transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none",
              size === "sm" ? "h-7 px-2.5 text-xs gap-1.5" : "h-10 px-4 text-xs sm:text-sm gap-2",
              isMinimal
                ? cn(
                    "rounded-md",
                    active
                      ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-2xs font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                  )
                : cn(
                    isFirst && "rounded-l-full",
                    isLast && "rounded-r-full",
                    active
                      ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] font-semibold"
                      : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                  )
            )}
          >
            {active && !isMinimal && (
              <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5] animate-in fade-in zoom-in-75 duration-150" />
            )}
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

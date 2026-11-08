"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  variant?: "default" | "minimal" | "single-select" | "multi-select" | string;
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
  const isMulti = multiSelect || variant === "multi-select";
  const uniqueId = React.useId();

  const isSelected = (id: string) => {
    if (isMulti) {
      if (Array.isArray(value)) {
        return value.includes(id);
      }
      return value === id;
    }
    return value === id;
  };

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (isMulti) {
      const currentList: string[] = Array.isArray(value)
        ? [...value]
        : value
        ? [value as string]
        : [];
      const idx = currentList.indexOf(id);
      if (idx >= 0) {
        currentList.splice(idx, 1);
      } else {
        currentList.push(id);
      }
      onChange(currentList);
    } else {
      onChange(id);
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "w-full flex items-center select-none border border-[var(--border)] overflow-hidden",
        isMinimal
          ? "rounded-xl p-1 bg-[var(--surface-primary)] gap-1 shadow-2xs"
          : "rounded-full bg-[var(--surface-primary)] p-1 gap-1",
        className
      )}
    >
      {options.map((opt, i) => {
        const active = isSelected(opt.id);
        const isFirst = i === 0;
        const isLast = i === options.length - 1;

        return (
          <motion.button
            key={opt.id}
            type="button"
            disabled={opt.disabled}
            aria-pressed={active}
            onClick={() => handleSelect(opt.id, opt.disabled)}
            whileTap={{ scale: opt.disabled ? 1 : 0.96 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "relative flex-1 min-w-0 flex items-center justify-center font-sans font-medium select-none cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none",
              size === "sm" ? "h-8 px-2 text-xs gap-1" : "h-10 px-2.5 text-xs sm:text-sm gap-1.5",
              isMinimal
                ? cn(
                    "rounded-lg",
                    active
                      ? "text-[var(--text-primary)] font-bold shadow-xs border border-[var(--border)] bg-[var(--surface-elevated)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                  )
                : cn(
                    "rounded-full transition-colors",
                    active
                      ? "text-[var(--accent-green)] font-bold bg-[var(--accent-green-deep)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50"
                  )
            )}
          >
            <AnimatePresence>
              {active && !isMinimal && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="shrink-0 text-[var(--accent-green)]"
                >
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </motion.span>
              )}
            </AnimatePresence>

            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span className="truncate">{opt.label}</span>
            {opt.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[var(--surface-tertiary)] text-[var(--text-muted)] shrink-0">
                {opt.badge}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

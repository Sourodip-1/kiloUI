"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3RadioOption {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface M3RadioGroupProps {
  options: M3RadioOption[];
  value: string;
  onChange: (value: string) => void;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  disabled?: boolean;
  className?: string;
}

export function M3RadioGroup({
  options,
  value,
  onChange,
  design,
  variant,
  disabled = false,
  className,
}: M3RadioGroupProps) {
  const isMinimal = design === "minimal" || variant === "minimal";

  return (
    <div
      role="radiogroup"
      className={cn("flex flex-col space-y-2 select-none", className)}
    >
      {options.map((opt) => {
        const isSelected = value === opt.id;
        const isDisabled = disabled || opt.disabled;

        return (
          <label
            key={opt.id}
            className={cn(
              "inline-flex items-start gap-3 cursor-pointer group",
              isDisabled && "opacity-40 cursor-not-allowed pointer-events-none"
            )}
          >
            <div className="relative flex items-center justify-center p-1">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isDisabled}
                onClick={() => onChange(opt.id)}
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
                  isMinimal
                    ? cn(
                        "h-4 w-4 border",
                        isSelected
                          ? "border-[var(--accent-green)]"
                          : "border-[var(--border-hover)] group-hover:border-[var(--text-secondary)]"
                      )
                    : cn(
                        "h-5 w-5 border-2",
                        isSelected
                          ? "border-[var(--accent-green)]"
                          : "border-[var(--border-hover)] group-hover:border-[var(--text-primary)]"
                      )
                )}
              >
                {isSelected && (
                  <span
                    className={cn(
                      "rounded-full bg-[var(--accent-green)] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100",
                      isMinimal ? "h-2 w-2" : "h-2.5 w-2.5"
                    )}
                  />
                )}
              </button>
            </div>

            <div className="flex flex-col pt-0.5">
              <span className="text-sm font-medium font-sans text-[var(--text-primary)] leading-tight">
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  showIcon?: boolean;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  label?: string;
  description?: string;
  className?: string;
}

export function M3Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  showIcon = true,
  design,
  variant,
  label,
  description,
  className,
}: M3SwitchProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) {
      setUncontrolledChecked(next);
    }
    onChange?.(next);
  };

  return (
    <label
      className={cn(
        "inline-flex items-center justify-between gap-3 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium font-sans text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-secondary)]">
              {description}
            </span>
          )}
        </div>
      )}

      {/* Switch Track */}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "relative inline-flex shrink-0 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
          isMinimal
            ? cn(
                "h-6 w-11 rounded-full p-0.5 border",
                isChecked
                  ? "bg-[var(--accent-green)] border-transparent"
                  : "bg-[var(--surface-secondary)] border-[var(--border)]"
              )
            : cn(
                "h-8 w-[52px] rounded-full p-1 border",
                isChecked
                  ? "bg-[var(--accent-green)] border-transparent"
                  : "bg-[var(--surface-secondary)] border-[var(--border-hover)]"
              )
        )}
      >
        {/* Switch Thumb */}
        <span
          className={cn(
            "pointer-events-none flex items-center justify-center rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isMinimal
              ? cn(
                  "h-5 w-5 bg-[var(--bg-main)] shadow-xs",
                  isChecked ? "translate-x-5" : "translate-x-0"
                )
              : cn(
                  isChecked
                    ? "h-6 w-6 translate-x-5 bg-[var(--bg-main)] text-[var(--accent-green)] shadow-md"
                    : "h-6 w-6 translate-x-0 bg-[var(--text-muted)] text-[var(--bg-main)]"
                )
          )}
        >
          {showIcon && !isMinimal && (
            isChecked ? (
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            ) : (
              <X className="h-3 w-3 stroke-[2.5]" />
            )
          )}
        </span>
      </button>
    </label>
  );
}

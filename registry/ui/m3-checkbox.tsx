"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface M3CheckboxProps {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  label?: string;
  description?: string;
  className?: string;
}

export function M3Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate: propIndeterminate = false,
  onChange,
  disabled = false,
  design,
  variant,
  label,
  description,
  className,
}: M3CheckboxProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const isIndeterminate = propIndeterminate || controlledChecked === "indeterminate" || defaultChecked === "indeterminate";
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked === true);
  const isChecked = controlledChecked !== undefined ? controlledChecked === true : uncontrolledChecked;

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
        "inline-flex items-start gap-3 cursor-pointer select-none group",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      <div className="relative flex items-center justify-center p-1">
        <motion.button
          type="button"
          role="checkbox"
          aria-checked={isIndeterminate ? "mixed" : isChecked}
          disabled={disabled}
          onClick={toggle}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
            isMinimal
              ? cn(
                  "h-4 w-4 rounded border",
                  isChecked || isIndeterminate
                    ? "bg-[var(--accent-green)] border-transparent text-[var(--bg-main)]"
                    : "bg-transparent border-[var(--border-hover)] group-hover:border-[var(--text-secondary)]"
                )
              : cn(
                  "h-5 w-5 rounded-xs border-2",
                  isChecked || isIndeterminate
                    ? "bg-[var(--accent-green)] border-transparent text-[var(--bg-main)] shadow-2xs"
                    : "bg-transparent border-[var(--border-hover)] group-hover:border-[var(--text-primary)]"
                )
          )}
        >
          <AnimatePresence>
            {isIndeterminate ? (
              <motion.span
                key="minus"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Minus className="h-3.5 w-3.5 stroke-[3]" />
              </motion.span>
            ) : isChecked ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.button>
      </div>

      {(label || description) && (
        <div className="flex flex-col pt-0.5">
          {label && (
            <span className="text-sm font-medium font-sans text-[var(--text-primary)] leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-secondary)] mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface MobileHapticStepperProps {
  value?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  variant?: "pill" | "compact" | "segmented" | "minimal";
  label?: string;
  unit?: string;
  haptic?: boolean;
  disabled?: boolean;
  className?: string;
}

export function MobileHapticStepper({
  value: controlledValue,
  defaultValue = 1,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  size = "md",
  variant = "pill",
  label,
  unit,
  haptic = true,
  disabled = false,
  className,
}: MobileHapticStepperProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState<"up" | "down">("up");

  const isControlled = controlledValue !== undefined;
  const count = isControlled ? controlledValue : internalValue;

  const triggerHaptic = (pattern: number | number[] = 12) => {
    if (haptic && typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  const handleIncrement = () => {
    if (disabled || count >= max) return;
    const next = Math.min(max, count + step);
    setDirection("up");
    triggerHaptic(15);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleDecrement = () => {
    if (disabled || count <= min) return;
    const next = Math.max(min, count - step);
    setDirection("down");
    triggerHaptic(15);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const sizeStyles = {
    sm: {
      btn: "h-7 w-7 text-xs",
      icon: "h-3.5 w-3.5",
      container: "h-8 px-1 text-xs",
      value: "min-w-[1.75rem] text-xs font-mono font-bold",
    },
    md: {
      btn: "h-9 w-9 text-sm",
      icon: "h-4 w-4",
      container: "h-11 px-1.5 text-sm",
      value: "min-w-[2.25rem] text-sm font-mono font-bold",
    },
    lg: {
      btn: "h-11 w-11 text-base",
      icon: "h-5 w-5",
      container: "h-13 px-2 text-base",
      value: "min-w-[2.75rem] text-base font-mono font-bold",
    },
  }[size];

  return (
    <div className={cn("inline-flex flex-col gap-1 select-none font-sans", className)}>
      {label && (
        <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
          {label}
        </span>
      )}

      <div
        className={cn(
          "inline-flex items-center justify-between border rounded-full transition-all duration-200",
          sizeStyles.container,
          variant === "pill" && "bg-[var(--surface-elevated)] border-[var(--border)] shadow-xs",
          variant === "compact" && "bg-[var(--surface-secondary)] border-[var(--border)]",
          variant === "segmented" && "bg-[var(--surface-secondary)]/60 border-[var(--border)] p-0.5 rounded-2xl",
          variant === "minimal" && "bg-transparent border-transparent",
          disabled && "opacity-40 pointer-events-none"
        )}
      >
        {/* Decrement Button */}
        <motion.button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || count <= min}
          whileTap={{ scale: 0.86 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90",
            sizeStyles.btn,
            count <= min
              ? "text-[var(--text-muted)]/30 cursor-not-allowed"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:bg-[var(--surface-tertiary)]"
          )}
          aria-label="Decrease quantity"
        >
          <Minus className={sizeStyles.icon} />
        </motion.button>

        {/* Dynamic Numerical Value */}
        <div className="flex items-center justify-center px-1 overflow-hidden relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              initial={{ opacity: 0, y: direction === "up" ? 8 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction === "up" ? -8 : 8 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
              className={cn("text-center text-[var(--text-primary)]", sizeStyles.value)}
            >
              {count}
            </motion.span>
          </AnimatePresence>
          {unit && (
            <span className="text-[10px] font-mono text-[var(--text-muted)] ml-1">
              {unit}
            </span>
          )}
        </div>

        {/* Increment Button */}
        <motion.button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || count >= max}
          whileTap={{ scale: 0.86 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90",
            sizeStyles.btn,
            count >= max
              ? "text-[var(--text-muted)]/30 cursor-not-allowed"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:bg-[var(--surface-tertiary)]"
          )}
          aria-label="Increase quantity"
        >
          <Plus className={sizeStyles.icon} />
        </motion.button>
      </div>
    </div>
  );
}


"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type M3ButtonVariant =
  | "filled"
  | "elevated"
  | "tonal"
  | "outlined"
  | "text"
  | "minimal-solid"
  | "minimal-outline"
  | "minimal-ghost";

export type M3ButtonDesign = "m3" | "minimal";

export interface M3ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  variant?: M3ButtonVariant;
  design?: M3ButtonDesign;
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const M3Button = React.forwardRef<HTMLButtonElement, M3ButtonProps>(
  (
    {
      className,
      variant = "filled",
      design = "m3",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isMinimal = design === "minimal" || variant.startsWith("minimal-");

    // M3 styles with authentic shape & tonal roles
    const m3Styles: Record<string, string> = {
      filled:
        "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-105 shadow-xs border border-transparent font-semibold rounded-full",
      elevated:
        "bg-[var(--surface-elevated)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)] shadow-sm hover:shadow-md border border-[var(--border)] font-semibold rounded-full",
      tonal:
        "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 border border-[var(--accent-green)]/20 font-semibold rounded-full",
      outlined:
        "bg-transparent text-[var(--accent-green)] hover:bg-[var(--accent-green-subtle)] border border-[var(--border-hover)] font-semibold rounded-full",
      text:
        "bg-transparent text-[var(--accent-green)] hover:bg-[var(--accent-green-subtle)] border border-transparent font-semibold rounded-full",
      "minimal-solid":
        "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 font-semibold rounded-lg border border-transparent shadow-2xs",
      "minimal-outline":
        "bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] font-semibold rounded-lg border border-[var(--border)] shadow-2xs",
      "minimal-ghost":
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] font-semibold rounded-lg border border-transparent",
    };

    const sizeStyles: Record<string, string> = {
      sm: isMinimal ? "h-7 px-2.5 text-xs gap-1.5" : "h-8 px-3.5 text-xs gap-1.5",
      default: isMinimal ? "h-9 px-3.5 text-xs gap-2" : "h-10 px-5 text-sm gap-2",
      lg: isMinimal ? "h-10 px-4 text-sm gap-2.5" : "h-12 px-6 text-sm font-semibold gap-2.5",
      icon: isMinimal ? "h-8 w-8 p-0 justify-center rounded-lg" : "h-10 w-10 p-0 justify-center rounded-full",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "relative inline-flex items-center justify-center font-sans transition-colors select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40",
          m3Styles[variant] || m3Styles.filled,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="opacity-80">Loading...</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);
M3Button.displayName = "M3Button";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type M3IconButtonVariant = "standard" | "filled" | "tonal" | "outlined" | "minimal";

export interface M3IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3IconButtonVariant;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  size?: "sm" | "default" | "lg";
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
}

export const M3IconButton = React.forwardRef<HTMLButtonElement, M3IconButtonProps>(
  (
    {
      className,
      variant = "standard",
      selected = false,
      onSelectedChange,
      size = "default",
      icon,
      selectedIcon,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isMinimal = variant === "minimal";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onSelectedChange?.(!selected);
      onClick?.(e);
    };

    const variantStyles: Record<M3IconButtonVariant, string> = {
      standard: selected
        ? "text-[var(--accent-green)] hover:bg-[var(--accent-green-subtle)]"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]",
      filled: selected
        ? "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-110 shadow-xs"
        : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]",
      tonal: selected
        ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110"
        : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)]",
      outlined: selected
        ? "bg-[var(--accent-green-deep)] text-[var(--accent-green)] border border-[var(--accent-green)]/40"
        : "bg-transparent text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]",
      minimal: selected
        ? "bg-[var(--surface-elevated)] text-[var(--accent-green)] border border-[var(--border)] shadow-2xs"
        : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] border border-transparent",
    };

    const sizeStyles = {
      sm: isMinimal ? "h-7 w-7 rounded-md p-1" : "h-8 w-8 rounded-full p-1.5",
      default: isMinimal ? "h-9 w-9 rounded-lg p-2" : "h-10 w-10 rounded-full p-2.5",
      lg: isMinimal ? "h-11 w-11 rounded-xl p-2.5" : "h-12 w-12 rounded-full p-3",
    }[size];

    const currentIcon = selected && selectedIcon ? selectedIcon : icon || children;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40 disabled:opacity-40 disabled:pointer-events-none select-none",
          variantStyles[variant],
          sizeStyles,
          className
        )}
        {...props}
      >
        {currentIcon}
      </button>
    );
  }
);
M3IconButton.displayName = "M3IconButton";

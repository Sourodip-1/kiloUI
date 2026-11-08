"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type M3FabSize = "sm" | "default" | "lg" | "extended";
export type M3FabVariant = "primary" | "surface" | "secondary" | "minimal";

export interface M3FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: M3FabSize;
  variant?: M3FabVariant;
  icon?: React.ReactNode;
  label?: string;
  lowered?: boolean;
}

export const M3Fab = React.forwardRef<HTMLButtonElement, M3FabProps>(
  (
    {
      className,
      size = "default",
      variant = "primary",
      icon,
      label,
      lowered = false,
      children,
      ...props
    },
    ref
  ) => {
    const isMinimal = variant === "minimal";

    const variantClasses = {
      primary:
        "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-110 border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
      surface:
        "bg-[var(--surface-elevated)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
      secondary:
        "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 border border-[var(--accent-green)]/20 shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
      minimal:
        "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 border border-transparent shadow-md active:scale-95",
    }[variant];

    const sizeClasses = {
      sm: "h-10 w-10 rounded-xl text-xs",
      default: "h-14 w-14 rounded-2xl text-sm",
      lg: "h-24 w-24 rounded-3xl text-base",
      extended: isMinimal
        ? "h-10 px-4 rounded-xl text-xs font-semibold gap-2"
        : "h-14 px-5 rounded-2xl text-sm font-semibold gap-3",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-sans transition-all duration-200 select-none cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
          lowered ? "shadow-none" : "",
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {(label || children) && (size === "extended" || isMinimal) && (
          <span className="truncate">{label || children}</span>
        )}
      </button>
    );
  }
);
M3Fab.displayName = "M3Fab";

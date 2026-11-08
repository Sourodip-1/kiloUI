"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3BadgeProps {
  content?: string | number;
  max?: number;
  dot?: boolean;
  color?: "error" | "primary" | "secondary" | "minimal";
  variant?: "default" | "minimal" | string;
  children?: React.ReactNode;
  className?: string;
}

export function M3Badge({
  content,
  max = 99,
  dot = false,
  color = "error",
  variant,
  children,
  className,
}: M3BadgeProps) {
  const displayContent =
    typeof content === "number" && content > max ? `${max}+` : content;

  const activeColor = variant === "minimal" ? "minimal" : color;
  const colorClasses = {
    error: "bg-[var(--accent-red)] text-white",
    primary: "bg-[var(--accent-green)] text-[var(--bg-main)]",
    secondary: "bg-[var(--accent-green-deep)] text-[var(--accent-green)] border border-[var(--accent-green)]/30",
    minimal: "bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border)]",
  }[activeColor];

  const badgeElement = (
    <span
      className={cn(
        "inline-flex items-center justify-center font-mono font-bold leading-none select-none rounded-full transition-transform duration-200",
        dot
          ? "h-2 w-2"
          : "h-4 min-w-4 px-1 text-[10px]",
        colorClasses,
        children && "absolute -top-1 -right-1.5 shadow-xs",
        className
      )}
    >
      {!dot && displayContent}
    </span>
  );

  if (!children) {
    return badgeElement;
  }

  return (
    <div className="relative inline-flex shrink-0">
      {children}
      {badgeElement}
    </div>
  );
}

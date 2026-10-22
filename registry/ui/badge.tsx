import * as React from "react";
import { cn } from "../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "destructive" | "muted";
  size?: "sm" | "default";
  dot?: boolean;
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-[var(--surface-secondary)] text-[var(--text-primary)] border-[var(--border)]",
  secondary:
    "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)]",
  outline:
    "bg-transparent text-[var(--text-secondary)] border-[var(--border)]",
  success:
    "bg-[var(--accent-green-subtle)] text-[var(--accent-green)] border-[var(--accent-green)]/30",
  destructive:
    "bg-[var(--accent-red-subtle)] text-[var(--accent-red)] border-[var(--accent-red)]/30",
  muted:
    "bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)]",
};

const dotColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-[var(--text-secondary)]",
  secondary: "bg-[var(--text-muted)]",
  outline: "bg-[var(--text-muted)]",
  success: "bg-[var(--accent-green)]",
  destructive: "bg-[var(--accent-red)]",
  muted: "bg-[var(--text-muted)]",
};

const badgeSizes: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-1.5 py-0.5 text-[10px] font-mono",
  default: "px-2 py-0.5 text-xs font-mono",
};

export function Badge({
  className,
  variant = "default",
  size = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded border select-none tracking-tight leading-none",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </div>
  );
}

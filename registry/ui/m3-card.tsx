"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type M3CardVariant = "elevated" | "filled" | "outlined" | "minimal";

export interface M3CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  variant?: M3CardVariant;
  media?: React.ReactNode;
  headline?: string;
  subhead?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

export function M3Card({
  variant = "outlined",
  media,
  headline,
  subhead,
  avatar,
  actions,
  children,
  className,
  onClick,
  ...props
}: M3CardProps) {
  const isMinimal = variant === "minimal";
  const isInteractive = Boolean(onClick);

  const variantStyles: Record<M3CardVariant, string> = {
    elevated:
      "bg-[var(--surface-elevated)] border border-[var(--border)] shadow-md hover:shadow-lg rounded-3xl",
    filled:
      "bg-[var(--surface-secondary)] border border-transparent shadow-xs hover:bg-[var(--surface-tertiary)] rounded-3xl",
    outlined:
      "bg-[var(--surface-elevated)]/60 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-3xl shadow-2xs",
    minimal:
      "bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xs hover:border-[var(--border-hover)]",
  };

  return (
    <motion.div
      onClick={onClick}
      whileTap={isInteractive ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn(
        "overflow-hidden select-none flex flex-col font-sans transition-colors",
        isInteractive && "cursor-pointer",
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      {/* Optional Media Hero */}
      {media && <div className="w-full overflow-hidden shrink-0">{media}</div>}

      <div className={cn("flex flex-col flex-1", isMinimal ? "p-4 space-y-2.5" : "p-5 space-y-3")}>
        {/* Header with Avatar & Headlines */}
        {(headline || subhead || avatar) && (
          <div className="flex items-start gap-3">
            {avatar && <div className="shrink-0 pt-0.5">{avatar}</div>}
            <div className="min-w-0 flex-1">
              {headline && (
                <h3 className={cn("font-bold text-[var(--text-primary)] leading-tight truncate", isMinimal ? "text-sm" : "text-base")}>
                  {headline}
                </h3>
              )}
              {subhead && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                  {subhead}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Card Body */}
        {children && (
          <div className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">
            {children}
          </div>
        )}

        {/* Actions Row */}
        {actions && (
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--border)]/40 mt-auto">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
}

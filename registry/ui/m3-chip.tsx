"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type M3ChipType = "assist" | "filter" | "input" | "suggestion";

export interface M3ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chipType?: M3ChipType;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  onRemove?: () => void;
  onDelete?: () => void;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  design?: "m3" | "minimal";
  variant?: "default" | "elevated" | "minimal" | string;
}

export const M3Chip = React.forwardRef<HTMLButtonElement, M3ChipProps>(
  (
    {
      className,
      chipType = "assist",
      selected = false,
      onSelectedChange,
      onRemove,
      onDelete,
      icon,
      avatar,
      design,
      variant,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isMinimal = design === "minimal" || variant === "minimal";
    const handleRemove = onDelete || onRemove;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (chipType === "filter") {
        onSelectedChange?.(!selected);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={chipType === "filter" ? selected : undefined}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center font-sans font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40 disabled:opacity-40 disabled:pointer-events-none",
          isMinimal
            ? cn(
                "h-7 px-2.5 rounded-md text-xs gap-1.5 border",
                selected
                  ? "bg-[var(--surface-elevated)] border-[var(--accent-green)] text-[var(--accent-green)] shadow-2xs"
                  : "bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
              )
            : cn(
                "h-8 px-3 rounded-lg text-xs gap-2 border",
                selected
                  ? "bg-[var(--accent-green-deep)] border-[var(--accent-green)]/40 text-[var(--accent-green)] font-semibold shadow-xs"
                  : "bg-[var(--surface-secondary)]/50 border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
              ),
          className
        )}
        {...props}
      >
        {selected && chipType === "filter" ? (
          <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
        ) : avatar ? (
          <span className="shrink-0 -ml-1 h-5 w-5 rounded-full overflow-hidden flex items-center justify-center">
            {avatar}
          </span>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}

        <span className="truncate">{children}</span>

        {chipType === "input" && handleRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            className="p-0.5 -mr-1 rounded-full hover:bg-[var(--surface-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="h-3 w-3" />
          </span>
        )}
      </button>
    );
  }
);
M3Chip.displayName = "M3Chip";

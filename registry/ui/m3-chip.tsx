"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type M3ChipType = "assist" | "filter" | "input" | "suggestion";

export interface M3ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chipType?: M3ChipType;
  selected?: boolean;
  defaultSelected?: boolean;
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
      selected: controlledSelected,
      defaultSelected = false,
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
    const [uncontrolledSelected, setUncontrolledSelected] = React.useState(defaultSelected);
    const selected = controlledSelected !== undefined ? controlledSelected : uncontrolledSelected;
    const isMinimal = design === "minimal" || variant === "minimal";
    const handleRemove = onDelete || onRemove;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (chipType === "filter") {
        const next = !selected;
        if (controlledSelected === undefined) {
          setUncontrolledSelected(next);
        }
        onSelectedChange?.(next);
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
          "inline-flex items-center font-sans font-medium select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40 disabled:opacity-40 disabled:pointer-events-none",
          "transition-all duration-200 active:scale-[0.95] ease-[cubic-bezier(0.2,0,0,1)]",
          isMinimal
            ? cn(
                "h-7 px-2.5 rounded-lg text-xs gap-1.5 border",
                selected
                  ? "bg-[var(--surface-elevated)] border-[var(--text-primary)] text-[var(--text-primary)] shadow-2xs font-semibold"
                  : "bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/60"
              )
            : cn(
                "h-8 px-3 rounded-lg text-xs gap-2 border",
                selected
                  ? "bg-[var(--accent-green-deep)] border-[var(--accent-green)]/40 text-[var(--accent-green)] font-bold shadow-xs"
                  : "bg-[var(--surface-secondary)]/50 border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
              ),
          className
        )}
        {...props}
      >
        {selected && chipType === "filter" ? (
          <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5] animate-in zoom-in-50 duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-[var(--accent-green)]" />
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
            className="p-0.5 -mr-1 rounded-full hover:bg-[var(--surface-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform active:scale-90"
          >
            <X className="h-3 w-3" />
          </span>
        )}
      </button>
    );
  }
);
M3Chip.displayName = "M3Chip";

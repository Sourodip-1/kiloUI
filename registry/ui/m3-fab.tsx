"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type M3FabSize = "sm" | "default" | "lg" | "extended";
export type M3FabVariant = "primary" | "surface" | "secondary" | "minimal";

export interface M3FabMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface M3FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: M3FabSize;
  variant?: M3FabVariant;
  icon?: React.ReactNode;
  label?: string;
  lowered?: boolean;
  menuItems?: M3FabMenuItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
      menuItems,
      open: controlledOpen,
      onOpenChange,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isMinimal = variant === "minimal";
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    const hasMenu = Boolean(menuItems && menuItems.length > 0);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hasMenu) {
        const next = !isOpen;
        if (controlledOpen === undefined) {
          setUncontrolledOpen(next);
        }
        onOpenChange?.(next);
      }
      onClick?.(e);
    };

    const variantClasses = {
      primary:
        "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-110 border border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]",
      surface:
        "bg-[var(--surface-elevated)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]",
      secondary:
        "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 border border-[var(--accent-green)]/20 shadow-[0_6px_16px_rgba(0,0,0,0.15)]",
      minimal:
        "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 border border-transparent shadow-md active:scale-95",
    }[variant];

    const sizeClasses = {
      sm: "h-10 w-10 rounded-xl text-xs",
      default: "h-14 w-14 rounded-2xl text-sm",
      lg: "h-20 w-20 rounded-3xl text-base",
      extended: isMinimal
        ? "h-10 px-4 rounded-xl text-xs font-semibold gap-2"
        : "h-14 px-5 rounded-2xl text-sm font-semibold gap-3",
    }[size];

    const mainFabButton = (
      <button
        ref={ref}
        type="button"
        onClick={handleToggle}
        aria-expanded={hasMenu ? isOpen : undefined}
        className={cn(
          "relative inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
          "active:scale-[0.92] ease-[cubic-bezier(0.2,0,0,1)]",
          lowered ? "shadow-none" : "",
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            hasMenu && isOpen ? "rotate-45" : "rotate-0"
          )}
        >
          {icon || <Plus className="h-6 w-6" />}
        </span>
        {(label || children) && (size === "extended" || isMinimal) && (
          <span className="truncate">{label || children}</span>
        )}
      </button>
    );

    if (!hasMenu) {
      return mainFabButton;
    }

    return (
      <div className="relative inline-flex flex-col items-end">
        {/* Backdrop Scrim when Speed Dial is open */}
        {isOpen && (
          <div
            onClick={() => {
              if (controlledOpen === undefined) setUncontrolledOpen(false);
              onOpenChange?.(false);
            }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
          />
        )}

        {/* Speed Dial Menu Items */}
        <div
          className={cn(
            "absolute bottom-full right-0 mb-3 flex flex-col items-end gap-2.5 z-50 transition-all duration-300 ease-[cubic-bezier(0.05,0.7,0.1,1)]",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none scale-90"
          )}
        >
          {menuItems?.map((item, index) => (
            <div
              key={item.id}
              style={{
                transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
              }}
              className="flex items-center gap-2.5 group/item transition-all duration-200"
            >
              {/* Pill Label */}
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-sans bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-md whitespace-nowrap">
                {item.label}
              </span>

              {/* Action Circle Button */}
              <button
                type="button"
                onClick={() => {
                  item.onClick?.();
                  if (controlledOpen === undefined) setUncontrolledOpen(false);
                  onOpenChange?.(false);
                }}
                className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer shadow-md active:scale-90",
                  isMinimal
                    ? "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                    : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)]"
                )}
              >
                {item.icon}
              </button>
            </div>
          ))}
        </div>

        {/* Main Floating Button on top of scrim */}
        <div className="relative z-50">
          {mainFabButton}
        </div>
      </div>
    );
  }
);
M3Fab.displayName = "M3Fab";

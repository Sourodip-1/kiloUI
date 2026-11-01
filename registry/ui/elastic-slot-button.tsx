"use client";

import * as React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface ElasticSlotButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "editorial-mono"
    | "accent-pill"
    | "glass-tactile"
    | "dark-carbon"
    | "destructive-alert";
  size?: "sm" | "default" | "lg" | "icon";
  /** Secondary label that rolls into view during hover. If omitted, uses children with an arrow suffix. */
  hoverLabel?: string;
  /** Whether to animate an elastic sliding icon drawer. Default: true */
  showDrawer?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<ElasticSlotButtonProps["variant"]>,
  {
    button: string;
    drawer: string;
    drawerText: string;
    badgeBg: string;
  }
> = {
  "editorial-mono": {
    button:
      "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--text-primary)]/40 shadow-xs",
    drawer: "bg-[var(--surface-secondary)] text-[var(--text-primary)] border-l border-[var(--border)]",
    drawerText: "text-[var(--text-primary)]",
    badgeBg: "bg-[var(--text-primary)]/10 text-[var(--text-primary)]",
  },
  "accent-pill": {
    button:
      "bg-[#5CA904] text-[#090a0a] border border-[#7ed806] font-semibold shadow-[0_2px_14px_rgba(92,169,4,0.3)] hover:brightness-105 active:brightness-95",
    drawer: "bg-[#4a8803] text-[#090a0a] border-l border-[#7ed806]/50",
    drawerText: "text-[#090a0a]",
    badgeBg: "bg-[#090a0a]/15 text-[#090a0a]",
  },
  "glass-tactile": {
    button:
      "bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] border border-[var(--border)] backdrop-blur-md hover:bg-[var(--surface-tertiary)] hover:border-[var(--border-hover)]",
    drawer: "bg-[var(--surface-tertiary)] text-[var(--text-primary)] border-l border-[var(--border)]",
    drawerText: "text-[var(--text-primary)]",
    badgeBg: "bg-white/10 text-white",
  },
  "dark-carbon": {
    button:
      "bg-[#0e1011] text-[#e2e8f0] border border-[#1e2326] hover:border-[#5CA904]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
    drawer: "bg-[#181d20] text-[#5CA904] border-l border-[#1e2326]",
    drawerText: "text-[#5CA904]",
    badgeBg: "bg-[#5CA904]/15 text-[#5CA904]",
  },
  "destructive-alert": {
    button:
      "bg-[#200808] text-[#fca5a5] border border-[#ef4444]/40 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-[#ef4444] hover:shadow-[0_0_24px_rgba(239,68,68,0.35)]",
    drawer: "bg-[#330f0f] text-[#fca5a5] border-l border-[#ef4444]/40",
    drawerText: "text-[#fca5a5]",
    badgeBg: "bg-[#ef4444]/20 text-[#fca5a5]",
  },
};

const sizeStyles: Record<
  NonNullable<ElasticSlotButtonProps["size"]>,
  {
    button: string;
    content: string;
    drawer: string;
    iconSize: string;
  }
> = {
  sm: {
    button: "h-8 text-xs rounded-lg",
    content: "px-3 h-8",
    drawer: "w-8 h-8",
    iconSize: "h-3 w-3",
  },
  default: {
    button: "h-10 text-xs rounded-xl",
    content: "px-4 h-10",
    drawer: "w-10 h-10",
    iconSize: "h-3.5 w-3.5",
  },
  lg: {
    button: "h-12 text-sm rounded-xl",
    content: "px-5 h-12",
    drawer: "w-12 h-12",
    iconSize: "h-4 w-4",
  },
  icon: {
    button: "h-10 w-10 p-0 rounded-xl justify-center",
    content: "w-10 h-10 justify-center p-0",
    drawer: "w-10 h-10",
    iconSize: "h-3.5 w-3.5",
  },
};

export const ElasticSlotButton = React.forwardRef<HTMLButtonElement, ElasticSlotButtonProps>(
  (
    {
      className,
      variant = "accent-pill",
      size = "default",
      hoverLabel,
      showDrawer = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const currentVariant = variantStyles[variant] || variantStyles["accent-pill"];
    const currentSize = sizeStyles[size] || sizeStyles["default"];

    const isIconOnly = size === "icon";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "group relative inline-flex items-center font-mono font-medium tracking-tight select-none cursor-pointer overflow-hidden border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA904] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.96]",
          currentVariant.button,
          currentSize.button,
          className
        )}
        {...props}
      >
        {/* Main Content Area with Slot-Machine Vertical Roll */}
        <span
          className={cn(
            "relative inline-flex items-center overflow-hidden h-full gap-2",
            currentSize.content
          )}
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="animate-spin -ml-0.5 mr-1 h-3.5 w-3.5 text-current shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Rolling...</span>
            </span>
          ) : isIconOnly ? (
            <span className="relative flex items-center justify-center w-full h-full">
              <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:opacity-0">
                {children || leftIcon || <ArrowRight className={currentSize.iconSize} />}
              </span>
              <span className="absolute transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                {rightIcon || <ChevronRight className={currentSize.iconSize} />}
              </span>
            </span>
          ) : (
            <>
              {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}

              {/* Slot-Machine Ticker Label */}
              <span className="relative inline-flex flex-col h-full justify-center overflow-hidden">
                {/* Resting Primary Label */}
                <span className="inline-flex items-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:opacity-0">
                  {children}
                </span>

                {/* Secondary Hover Label rolling up from bottom */}
                <span className="absolute inline-flex items-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 font-semibold">
                  {hoverLabel || (
                    <span className="inline-flex items-center gap-1">
                      {children} <span className="text-[10px]">↗</span>
                    </span>
                  )}
                </span>
              </span>
            </>
          )}
        </span>

        {/* Elastic Sliding Icon Drawer */}
        {showDrawer && !isIconOnly && !isLoading && (
          <span
            aria-hidden="true"
            className={cn(
              "relative flex items-center justify-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              currentVariant.drawer,
              currentSize.drawer
            )}
          >
            {/* Primary Arrow flying right on hover */}
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:opacity-0">
              {rightIcon || <ArrowRight className={currentSize.iconSize} />}
            </span>

            {/* Fresh Arrow flying in from left on hover */}
            <span className="absolute transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              {rightIcon || <ArrowRight className={currentSize.iconSize} />}
            </span>
          </span>
        )}
      </button>
    );
  }
);

ElasticSlotButton.displayName = "ElasticSlotButton";

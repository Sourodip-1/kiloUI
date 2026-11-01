"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "neon-glow"
    | "ghost-specular"
    | "accent-lime"
    | "violet-aurora"
    | "minimal-monochrome";
  size?: "sm" | "default" | "lg" | "icon";
  /** Strength of magnetic displacement pull (0.1 to 0.8). Default: 0.35 */
  strength?: number;
  /** Radius around button that triggers magnetic attraction (px). Default: 40 */
  magneticRadius?: number;
  /** Whether to render dynamic specular spotlight following the cursor */
  showSpotlight?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<MagneticButtonProps["variant"]>,
  { button: string; spotlight: string; glow: string }
> = {
  "neon-glow": {
    button:
      "bg-[#0e1710] text-[#86efac] border border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.18)] hover:border-[#4ade80] hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]",
    spotlight: "rgba(74, 222, 128, 0.25)",
    glow: "bg-[#22c55e]/20",
  },
  "ghost-specular": {
    button:
      "bg-[var(--surface-secondary)]/80 text-[var(--text-primary)] border border-[var(--border)] backdrop-blur-md hover:border-[var(--border-hover)] hover:bg-[var(--surface-tertiary)]",
    spotlight: "rgba(255, 255, 255, 0.22)",
    glow: "bg-white/5",
  },
  "accent-lime": {
    button:
      "bg-[#5CA904] text-[#090a0a] border border-[#7ed806] font-semibold shadow-[0_2px_18px_rgba(92,169,4,0.3)] hover:brightness-105 active:brightness-95",
    spotlight: "rgba(255, 255, 255, 0.45)",
    glow: "bg-[#5CA904]/40",
  },
  "violet-aurora": {
    button:
      "bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#1e1b4b] text-[#e9d5ff] border border-[#a855f7]/40 shadow-[0_0_24px_rgba(168,85,247,0.25)] hover:border-[#c084fc] hover:shadow-[0_0_36px_rgba(192,132,252,0.45)]",
    spotlight: "rgba(216, 180, 254, 0.35)",
    glow: "bg-[#a855f7]/30",
  },
  "minimal-monochrome": {
    button:
      "bg-[var(--text-primary)] text-[var(--bg-main)] border border-transparent font-medium hover:opacity-95 shadow-xs",
    spotlight: "rgba(255, 255, 255, 0.5)",
    glow: "bg-white/20",
  },
};

const sizeStyles: Record<NonNullable<MagneticButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs rounded-full gap-1.5",
  default: "h-10 px-5 text-xs rounded-full gap-2",
  lg: "h-12 px-6 text-sm rounded-full gap-2.5",
  icon: "h-10 w-10 p-0 rounded-full justify-center",
};

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      className,
      variant = "neon-glow",
      size = "default",
      strength = 0.35,
      magneticRadius = 40,
      showSpotlight = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [offset, setOffset] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = React.useState<{ x: number; y: number; opacity: number }>({
      x: 50,
      y: 50,
      opacity: 0,
    });
    const [isHovered, setIsHovered] = React.useState(false);

    // Merge forwarded ref with internal ref
    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate magnetic displacement
      setOffset({
        x: deltaX * strength,
        y: deltaY * strength,
      });

      // Calculate relative spotlight coordinates
      const spotX = ((e.clientX - rect.left) / rect.width) * 100;
      const spotY = ((e.clientY - rect.top) / rect.height) * 100;

      setSpotlight({
        x: spotX,
        y: spotY,
        opacity: 1,
      });
      setIsHovered(true);

      onMouseMove?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      setOffset({ x: 0, y: 0 });
      setSpotlight((prev) => ({ ...prev, opacity: 0 }));
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const currentVariant = variantStyles[variant] || variantStyles["neon-glow"];

    return (
      <button
        ref={buttonRef}
        disabled={disabled || isLoading}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isHovered
            ? "transform 0.12s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
        }}
        className={cn(
          "relative inline-flex items-center justify-center font-mono tracking-tight select-none cursor-pointer overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA904] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
          currentVariant.button,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Specular Spotlight Gradient Layer */}
        {showSpotlight && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              opacity: spotlight.opacity,
              background: `radial-gradient(circle 90px at ${spotlight.x}% ${spotlight.y}%, ${currentVariant.spotlight}, transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Halo Glow */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-1 z-[-1] rounded-full blur-md opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
            currentVariant.glow
          )}
        />

        {/* Content with 3D Parallax offset */}
        <span
          className="relative z-10 inline-flex items-center gap-[inherit] transition-transform duration-150 ease-out"
          style={{
            transform: `translate3d(${offset.x * 0.4}px, ${offset.y * 0.4}px, 0)`,
          }}
        >
          {isLoading ? (
            <>
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
              <span>Attracting...</span>
            </>
          ) : (
            <>
              {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            </>
          )}
        </span>
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

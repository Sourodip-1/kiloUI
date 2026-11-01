"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface BorderBeamButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "cyan-cyber"
    | "emerald-matrix"
    | "violet-plasma"
    | "amber-solar"
    | "rainbow-spectrum";
  size?: "sm" | "default" | "lg" | "icon";
  /** Normal rotation period of the laser beam in seconds. Default: 4 */
  beamDuration?: number;
  /** Length of the laser beam pulse (10 to 60). Default: 28 */
  beamSize?: number;
  /** Whether hover triggers hyperdrive acceleration. Default: true */
  hoverSpeedup?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<BorderBeamButtonProps["variant"]>,
  {
    button: string;
    beamGradient: string[];
    glowColor: string;
    textColor: string;
  }
> = {
  "cyan-cyber": {
    button: "bg-[#070d12] border-cyan-500/20 text-[#67e8f9]",
    beamGradient: ["#0891b2", "#06b6d4", "#22d3ee", "#a5f3fc"],
    glowColor: "rgba(6, 182, 212, 0.45)",
    textColor: "text-[#67e8f9] hover:text-[#a5f3fc]",
  },
  "emerald-matrix": {
    button: "bg-[#091207] border-emerald-500/20 text-[#86efac]",
    beamGradient: ["#16a34a", "#22c55e", "#4ade80", "#bbf7d0"],
    glowColor: "rgba(34, 197, 94, 0.45)",
    textColor: "text-[#86efac] hover:text-[#bbf7d0]",
  },
  "violet-plasma": {
    button: "bg-[#11071c] border-purple-500/20 text-[#d8b4fe]",
    beamGradient: ["#9333ea", "#a855f7", "#c084fc", "#f5d0fe"],
    glowColor: "rgba(168, 85, 247, 0.45)",
    textColor: "text-[#d8b4fe] hover:text-[#f5d0fe]",
  },
  "amber-solar": {
    button: "bg-[#140e05] border-amber-500/20 text-[#fde68a]",
    beamGradient: ["#d97706", "#f59e0b", "#fbbf24", "#fef3c7"],
    glowColor: "rgba(245, 158, 11, 0.45)",
    textColor: "text-[#fde68a] hover:text-[#fef3c7]",
  },
  "rainbow-spectrum": {
    button: "bg-[#0b0c10] border-white/15 text-white",
    beamGradient: ["#ff0055", "#ffaa00", "#00ffaa", "#00aaff", "#aa00ff"],
    glowColor: "rgba(168, 85, 247, 0.45)",
    textColor: "text-white",
  },
};

const sizeStyles: Record<NonNullable<BorderBeamButtonProps["size"]>, { root: string; rx: number }> = {
  sm: { root: "h-8 px-3.5 text-xs rounded-lg gap-1.5", rx: 8 },
  default: { root: "h-10 px-5 text-xs rounded-xl gap-2", rx: 12 },
  lg: { root: "h-12 px-6 text-sm rounded-xl gap-2.5", rx: 12 },
  icon: { root: "h-10 w-10 p-0 rounded-xl justify-center", rx: 12 },
};

export const BorderBeamButton = React.forwardRef<HTMLButtonElement, BorderBeamButtonProps>(
  (
    {
      className,
      variant = "cyan-cyber",
      size = "default",
      beamDuration = 4,
      beamSize = 28,
      hoverSpeedup = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [clickPulse, setClickPulse] = React.useState(false);
    const gradId = React.useId();

    const currentVariant = variantStyles[variant] || variantStyles["cyan-cyber"];
    const currentSize = sizeStyles[size] || sizeStyles["default"];

    // Speed up beam from beamDuration (e.g. 4s) to 1.2s on hover
    const activeDuration = isHovered && hoverSpeedup ? Math.max(1, beamDuration * 0.3) : beamDuration;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setClickPulse(true);
      setTimeout(() => setClickPulse(false), 600);
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          onMouseLeave?.(e);
        }}
        className={cn(
          "group relative inline-flex items-center justify-center font-mono font-medium tracking-tight select-none cursor-pointer overflow-hidden border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
          currentVariant.button,
          currentSize.root,
          className
        )}
        {...props}
      >
        {/* Animated Perimeter Beam SVG Overlay */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-10"
        >
          <defs>
            <linearGradient
              id={`beam-grad-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              {currentVariant.beamGradient.map((color, i) => (
                <stop
                  key={i}
                  offset={`${(i / (currentVariant.beamGradient.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
            <filter id={`beam-blur-${gradId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Underglow Blur Layer */}
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            rx={currentSize.rx}
            fill="none"
            stroke={`url(#beam-grad-${gradId})`}
            strokeWidth="3"
            filter={`url(#beam-blur-${gradId})`}
            pathLength="100"
            strokeDasharray={`${beamSize} ${100 - beamSize}`}
            style={{
              animation: `kiloBorderBeamOrbit ${activeDuration}s linear infinite`,
              opacity: isHovered ? 0.9 : 0.45,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Crisp Laser Core Line */}
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            rx={currentSize.rx}
            fill="none"
            stroke={`url(#beam-grad-${gradId})`}
            strokeWidth="1.5"
            pathLength="100"
            strokeDasharray={`${beamSize} ${100 - beamSize}`}
            style={{
              animation: `kiloBorderBeamOrbit ${activeDuration}s linear infinite`,
            }}
          />
        </svg>

        {/* Ambient Backlight Glow on Hover */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 blur-xl",
            isHovered && "opacity-60"
          )}
          style={{ background: currentVariant.glowColor }}
        />

        {/* Click Shockwave Ring */}
        {clickPulse && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border-2 border-white/80 animate-ping opacity-75"
          />
        )}

        {/* Button Content */}
        <span className={cn("relative z-20 inline-flex items-center gap-[inherit]", currentVariant.textColor)}>
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
              <span>Orbiting...</span>
            </>
          ) : (
            <>
              {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
            </>
          )}
        </span>

        <style jsx>{`
          @keyframes kiloBorderBeamOrbit {
            from {
              stroke-dashoffset: 100;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </button>
    );
  }
);

BorderBeamButton.displayName = "BorderBeamButton";

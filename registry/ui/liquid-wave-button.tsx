"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface LiquidWaveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "ocean-deep"
    | "toxic-acid"
    | "magma-flame"
    | "mercury-chrome"
    | "violet-nebula";
  size?: "sm" | "default" | "lg" | "icon";
  /** Speed multiplier for wave oscillation. Default: 1 */
  waveSpeed?: number;
  /** Whether to show buoyant rising bubbles on hover. Default: true */
  showBubbles?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<LiquidWaveButtonProps["variant"]>,
  {
    button: string;
    waveColor: string;
    waveGlow: string;
    textRest: string;
    textInverted: string;
    bubbleColor: string;
  }
> = {
  "ocean-deep": {
    button:
      "bg-[#040e1a] border-[#0ea5e9]/30 shadow-[0_0_20px_rgba(14,165,233,0.18)] hover:border-[#38bdf8] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]",
    waveColor: "linear-gradient(180deg, #38bdf8 0%, #0284c7 50%, #0369a1 100%)",
    waveGlow: "rgba(56, 189, 248, 0.4)",
    textRest: "text-[#7dd3fc]",
    textInverted: "text-[#031d33] font-semibold",
    bubbleColor: "rgba(224, 242, 254, 0.7)",
  },
  "toxic-acid": {
    button:
      "bg-[#0a1205] border-[#84cc16]/30 shadow-[0_0_20px_rgba(132,204,22,0.18)] hover:border-[#a3e635] hover:shadow-[0_0_30px_rgba(163,230,53,0.35)]",
    waveColor: "linear-gradient(180deg, #a3e635 0%, #65a30d 50%, #4d7c0f 100%)",
    waveGlow: "rgba(163, 230, 53, 0.4)",
    textRest: "text-[#bef264]",
    textInverted: "text-[#142306] font-semibold",
    bubbleColor: "rgba(236, 252, 203, 0.7)",
  },
  "magma-flame": {
    button:
      "bg-[#140604] border-[#f97316]/30 shadow-[0_0_20px_rgba(249,115,22,0.18)] hover:border-[#fb923c] hover:shadow-[0_0_30px_rgba(251,146,60,0.35)]",
    waveColor: "linear-gradient(180deg, #fb923c 0%, #ea580c 50%, #c2410c 100%)",
    waveGlow: "rgba(251, 146, 60, 0.4)",
    textRest: "text-[#fdba74]",
    textInverted: "text-[#270b06] font-semibold",
    bubbleColor: "rgba(255, 237, 213, 0.7)",
  },
  "mercury-chrome": {
    button:
      "bg-[#0d0f12] border-white/20 shadow-xs hover:border-white/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
    waveColor: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
    waveGlow: "rgba(255, 255, 255, 0.4)",
    textRest: "text-[#e2e8f0]",
    textInverted: "text-[#0f172a] font-semibold",
    bubbleColor: "rgba(255, 255, 255, 0.8)",
  },
  "violet-nebula": {
    button:
      "bg-[#11051c] border-[#a855f7]/30 shadow-[0_0_20px_rgba(168,85,247,0.18)] hover:border-[#c084fc] hover:shadow-[0_0_30px_rgba(192,132,252,0.35)]",
    waveColor: "linear-gradient(180deg, #c084fc 0%, #9333ea 50%, #6b21a8 100%)",
    waveGlow: "rgba(192, 132, 252, 0.4)",
    textRest: "text-[#e9d5ff]",
    textInverted: "text-[#1d0530] font-semibold",
    bubbleColor: "rgba(250, 232, 255, 0.7)",
  },
};

const sizeStyles: Record<NonNullable<LiquidWaveButtonProps["size"]>, string> = {
  sm: "h-8 px-4 text-xs rounded-full gap-1.5",
  default: "h-10 px-5 text-xs rounded-full gap-2",
  lg: "h-12 px-6 text-sm rounded-full gap-2.5",
  icon: "h-10 w-10 p-0 rounded-full justify-center",
};

export const LiquidWaveButton = React.forwardRef<HTMLButtonElement, LiquidWaveButtonProps>(
  (
    {
      className,
      variant = "ocean-deep",
      size = "default",
      waveSpeed = 1,
      showBubbles = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [tiltX, setTiltX] = React.useState(0);

    const currentVariant = variantStyles[variant] || variantStyles["ocean-deep"];

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      // Slosh tilt from -8px to +8px
      setTiltX((relativeX - 0.5) * 16);
      onMouseMove?.(e);
    };

    const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      setTiltX(0);
      onMouseLeave?.(e);
    };

    const duration = 2.4 / waveSpeed;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn(
          "group relative inline-flex items-center justify-center font-mono font-medium tracking-tight select-none cursor-pointer overflow-hidden border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
          currentVariant.button,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Liquid Fluid Container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            height: isHovered ? "120%" : "22%",
            transform: `translate3d(0, 0, 0) rotate(${tiltX * 0.4}deg)`,
          }}
        >
          {/* Wave SVG Animation Layer 1 */}
          <div
            className="absolute -top-7 -left-[100%] w-[300%] h-12 opacity-80"
            style={{
              animation: `kiloWaveRoll ${duration}s linear infinite`,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C150,90 350,-40 500,50 C650,140 850,-20 1000,60 C1150,140 1200,40 1200,40 L1200,120 L0,120 Z"
                fill="currentColor"
                className="text-white/20"
              />
            </svg>
          </div>

          {/* Wave SVG Animation Layer 2 (Main Liquid Body) */}
          <div
            className="absolute -top-6 -left-[100%] w-[300%] h-10 opacity-90"
            style={{
              animation: `kiloWaveRoll ${duration * 0.75}s linear infinite reverse`,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C150,-20 350,80 500,20 C650,-40 850,70 1000,15 C1150,-40 1200,30 1200,30 L1200,120 L0,120 Z"
                fill="currentColor"
                className="text-white/30"
              />
            </svg>
          </div>

          {/* Liquid Gradient Fill Base */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ background: currentVariant.waveColor }}
          />

          {/* Floating Buoyancy Bubbles */}
          {showBubbles && isHovered && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <span
                className="absolute bottom-1 left-[20%] w-1.5 h-1.5 rounded-full"
                style={{
                  background: currentVariant.bubbleColor,
                  animation: "kiloBubbleFloat 1.2s ease-in infinite",
                }}
              />
              <span
                className="absolute bottom-1 left-[50%] w-2 h-2 rounded-full"
                style={{
                  background: currentVariant.bubbleColor,
                  animation: "kiloBubbleFloat 1.6s ease-in 0.3s infinite",
                }}
              />
              <span
                className="absolute bottom-1 left-[75%] w-1 h-1 rounded-full"
                style={{
                  background: currentVariant.bubbleColor,
                  animation: "kiloBubbleFloat 0.9s ease-in 0.6s infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* Resting Text Layer (Visible above liquid) */}
        <span
          className={cn(
            "relative z-10 inline-flex items-center gap-[inherit] transition-opacity duration-200",
            isHovered ? "opacity-0" : "opacity-100",
            currentVariant.textRest
          )}
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
              <span>Submerging...</span>
            </>
          ) : (
            <>
              {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
            </>
          )}
        </span>

        {/* Inverted In-Liquid Text Layer (Visible when flooded) */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-[inherit] transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
            currentVariant.textInverted
          )}
        >
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </span>

        <style jsx>{`
          @keyframes kiloWaveRoll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(50%);
            }
          }
          @keyframes kiloBubbleFloat {
            0% {
              transform: translateY(0) scale(0.6);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-36px) scale(1.2);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    );
  }
);

LiquidWaveButton.displayName = "LiquidWaveButton";

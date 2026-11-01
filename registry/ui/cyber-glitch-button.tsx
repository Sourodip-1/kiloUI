"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface CyberGlitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "matrix-neon"
    | "tokyo-cyan"
    | "crimson-danger"
    | "stealth-obsidian"
    | "synth-sunset";
  size?: "sm" | "default" | "lg" | "icon";
  /** Trigger chromatic slice glitch on hover. Default: true */
  glitchOnHover?: boolean;
  /** Tactical HUD technical code badge. Set to empty string to hide. Default: "SYS_ID // 0x8F" */
  hudCode?: string;
  /** Whether to show HUD corner brackets. Default: true */
  showBrackets?: boolean;
  /** Whether to show retro CRT horizontal scanlines. Default: true */
  showScanlines?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<CyberGlitchButtonProps["variant"]>,
  {
    button: string;
    hudText: string;
    bracketColor: string;
    glow: string;
    glitchCyan: string;
    glitchMagenta: string;
  }
> = {
  "matrix-neon": {
    button:
      "bg-[#040d06] text-[#4ade80] border border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.18)] hover:border-[#4ade80] hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]",
    hudText: "text-[#22c55e]/70",
    bracketColor: "text-[#4ade80]",
    glow: "rgba(34, 197, 94, 0.4)",
    glitchCyan: "#86efac",
    glitchMagenta: "#15803d",
  },
  "tokyo-cyan": {
    button:
      "bg-[#030914] text-[#00f3ff] border border-[#00f3ff]/40 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:border-[#00f3ff] hover:shadow-[0_0_32px_rgba(0,243,255,0.4)]",
    hudText: "text-[#00f3ff]/70",
    bracketColor: "text-[#00f3ff]",
    glow: "rgba(0, 243, 255, 0.4)",
    glitchCyan: "#00f3ff",
    glitchMagenta: "#ff007f",
  },
  "crimson-danger": {
    button:
      "bg-[#140405] text-[#ff4d4d] border border-[#ff3333]/40 shadow-[0_0_20px_rgba(255,51,51,0.2)] hover:border-[#ff4d4d] hover:shadow-[0_0_32px_rgba(255,51,51,0.45)]",
    hudText: "text-[#ff4d4d]/70",
    bracketColor: "text-[#ff3333]",
    glow: "rgba(255, 51, 51, 0.4)",
    glitchCyan: "#ffcc00",
    glitchMagenta: "#ff0033",
  },
  "stealth-obsidian": {
    button:
      "bg-[#0e0f10] text-[#f2f2f0] border border-[var(--border)] hover:border-white/40 shadow-xs hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    hudText: "text-[var(--text-muted)]",
    bracketColor: "text-white/80",
    glow: "rgba(255, 255, 255, 0.2)",
    glitchCyan: "#ffffff",
    glitchMagenta: "#888888",
  },
  "synth-sunset": {
    button:
      "bg-gradient-to-r from-[#1f082c] via-[#2a0845] to-[#120421] text-[#f472b6] border border-[#f472b6]/40 shadow-[0_0_20px_rgba(244,114,182,0.25)] hover:border-[#fb7185] hover:shadow-[0_0_32px_rgba(251,113,133,0.4)]",
    hudText: "text-[#f472b6]/70",
    bracketColor: "text-[#f472b6]",
    glow: "rgba(244, 114, 182, 0.4)",
    glitchCyan: "#38bdf8",
    glitchMagenta: "#f43f5e",
  },
};

const sizeStyles: Record<NonNullable<CyberGlitchButtonProps["size"]>, string> = {
  sm: "h-8 px-3.5 text-xs rounded-none gap-1.5",
  default: "h-10 px-5 text-xs rounded-none gap-2",
  lg: "h-12 px-6 text-sm rounded-none gap-2.5",
  icon: "h-10 w-10 p-0 rounded-none justify-center",
};

export const CyberGlitchButton = React.forwardRef<HTMLButtonElement, CyberGlitchButtonProps>(
  (
    {
      className,
      variant = "tokyo-cyan",
      size = "default",
      glitchOnHover = true,
      hudCode = "SYS_ID // 0x8F",
      showBrackets = true,
      showScanlines = true,
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
    const [isGlitching, setIsGlitching] = React.useState(false);
    const [screenFlash, setScreenFlash] = React.useState(false);

    const currentVariant = variantStyles[variant] || variantStyles["tokyo-cyan"];

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      if (glitchOnHover) {
        setIsGlitching(true);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      setIsGlitching(false);
      onMouseLeave?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setScreenFlash(true);
      setTimeout(() => setScreenFlash(false), 200);
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase select-none cursor-pointer overflow-hidden transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f3ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
          currentVariant.button,
          sizeStyles[size],
          screenFlash && "brightness-200 contrast-150",
          className
        )}
        {...props}
      >
        {/* CRT Scanline Overlay */}
        {showScanlines && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40"
          />
        )}

        {/* HUD Tactical Code Top Tag */}
        {hudCode && size !== "icon" && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1 left-2 text-[8px] font-mono tracking-widest uppercase transition-opacity duration-200 select-none",
              isHovered ? "opacity-100" : "opacity-40",
              currentVariant.hudText
            )}
          >
            {hudCode}
          </span>
        )}

        {/* HUD Target Brackets [ ┌ ┐ └ ┘ ] */}
        {showBrackets && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-0.5 left-0.5 text-[10px] font-mono leading-none transition-transform duration-200",
                isHovered ? "translate-x-0 translate-y-0 opacity-100 scale-110" : "translate-x-0.5 translate-y-0.5 opacity-60",
                currentVariant.bracketColor
              )}
            >
              ┌
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute top-0.5 right-0.5 text-[10px] font-mono leading-none transition-transform duration-200",
                isHovered ? "-translate-x-0 translate-y-0 opacity-100 scale-110" : "-translate-x-0.5 translate-y-0.5 opacity-60",
                currentVariant.bracketColor
              )}
            >
              ┐
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0.5 left-0.5 text-[10px] font-mono leading-none transition-transform duration-200",
                isHovered ? "translate-x-0 -translate-y-0 opacity-100 scale-110" : "translate-x-0.5 -translate-y-0.5 opacity-60",
                currentVariant.bracketColor
              )}
            >
              └
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute bottom-0.5 right-0.5 text-[10px] font-mono leading-none transition-transform duration-200",
                isHovered ? "-translate-x-0 -translate-y-0 opacity-100 scale-110" : "-translate-x-0.5 -translate-y-0.5 opacity-60",
                currentVariant.bracketColor
              )}
            >
              ┘
            </span>
          </>
        )}

        {/* Base Content Layer */}
        <span className="relative z-10 inline-flex items-center gap-[inherit]">
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
              <span>DECRYPTING...</span>
            </>
          ) : (
            <>
              {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
            </>
          )}
        </span>

        {/* Chromatic Aberration Glitch Layer 1 (Cyan Channel Shift) */}
        {isGlitching && !isLoading && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center font-mono font-bold tracking-wider uppercase select-none"
            style={{
              color: currentVariant.glitchCyan,
              animation: "kiloGlitchSlice1 0.35s steps(2, start) infinite",
            }}
          >
            <span className="inline-flex items-center gap-[inherit]">
              {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
            </span>
          </span>
        )}

        {/* Chromatic Aberration Glitch Layer 2 (Magenta Channel Shift) */}
        {isGlitching && !isLoading && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center font-mono font-bold tracking-wider uppercase select-none"
            style={{
              color: currentVariant.glitchMagenta,
              animation: "kiloGlitchSlice2 0.35s steps(2, start) infinite",
            }}
          >
            <span className="inline-flex items-center gap-[inherit]">
              {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
            </span>
          </span>
        )}

        <style jsx>{`
          @keyframes kiloGlitchSlice1 {
            0% {
              clip-path: polygon(0 15%, 100% 15%, 100% 40%, 0 40%);
              transform: translate(-3px, -1px);
            }
            33% {
              clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
              transform: translate(2px, 1px);
            }
            66% {
              clip-path: polygon(0 30%, 100% 30%, 100% 55%, 0 55%);
              transform: translate(-2px, 0);
            }
            100% {
              clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%);
              transform: translate(3px, -2px);
            }
          }
          @keyframes kiloGlitchSlice2 {
            0% {
              clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%);
              transform: translate(3px, 1px);
            }
            33% {
              clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%);
              transform: translate(-3px, -1px);
            }
            66% {
              clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%);
              transform: translate(2px, 2px);
            }
            100% {
              clip-path: polygon(0 35%, 100% 35%, 100% 50%, 0 50%);
              transform: translate(-2px, -1px);
            }
          }
        `}</style>
      </button>
    );
  }
);

CyberGlitchButton.displayName = "CyberGlitchButton";

"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface GlassPrismButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "spatial-glass"
    | "obsidian-crystal"
    | "aurora-prism"
    | "champagne-gold"
    | "cyber-frost";
  size?: "sm" | "default" | "lg" | "icon";
  /** Maximum 3D gyroscopic tilt angle in degrees. Default: 12 */
  maxTilt?: number;
  /** Specular glare reflection opacity (0 to 1). Default: 0.35 */
  glareOpacity?: number;
  /** Whether to render chromatic dispersion rainbow border rim. Default: true */
  showPrismBorder?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<GlassPrismButtonProps["variant"]>,
  {
    button: string;
    text: string;
    glareColor: string;
    prismGradient: string;
    glow: string;
  }
> = {
  "spatial-glass": {
    button:
      "bg-white/[0.06] border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-xl hover:bg-white/[0.1] hover:border-white/35",
    text: "text-white",
    glareColor: "rgba(255, 255, 255, 0.45)",
    prismGradient:
      "linear-gradient(135deg, rgba(255,0,128,0.3), rgba(0,255,255,0.4), rgba(255,255,0,0.3), rgba(128,0,255,0.4))",
    glow: "rgba(255, 255, 255, 0.15)",
  },
  "obsidian-crystal": {
    button:
      "bg-[#0a0a0d]/70 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl hover:bg-[#121217]/80 hover:border-purple-500/30",
    text: "text-[#e2e8f0]",
    glareColor: "rgba(192, 132, 252, 0.4)",
    prismGradient:
      "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(59,130,246,0.35), rgba(236,72,153,0.35))",
    glow: "rgba(168, 85, 247, 0.2)",
  },
  "aurora-prism": {
    button:
      "bg-gradient-to-b from-[#0a1b24]/50 to-[#120e26]/60 border-cyan-400/30 shadow-[0_8px_32px_rgba(6,182,212,0.2),inset_0_1px_1px_rgba(34,211,238,0.5)] backdrop-blur-xl hover:border-cyan-300/50",
    text: "text-[#67e8f9]",
    glareColor: "rgba(103, 232, 249, 0.45)",
    prismGradient:
      "linear-gradient(135deg, rgba(34,211,238,0.5), rgba(168,85,247,0.5), rgba(52,211,153,0.5))",
    glow: "rgba(34, 211, 238, 0.25)",
  },
  "champagne-gold": {
    button:
      "bg-[#1c180e]/60 border-amber-400/30 shadow-[0_8px_32px_rgba(245,158,11,0.2),inset_0_1px_1px_rgba(251,191,36,0.5)] backdrop-blur-xl hover:border-amber-300/50",
    text: "text-[#fef3c7]",
    glareColor: "rgba(253, 230, 138, 0.45)",
    prismGradient:
      "linear-gradient(135deg, rgba(245,158,11,0.5), rgba(251,191,36,0.4), rgba(254,243,199,0.6))",
    glow: "rgba(245, 158, 11, 0.25)",
  },
  "cyber-frost": {
    button:
      "bg-[#06151f]/60 border-sky-400/30 shadow-[0_8px_32px_rgba(56,189,248,0.2),inset_0_1px_1px_rgba(125,211,252,0.5)] backdrop-blur-xl hover:border-sky-300/50",
    text: "text-[#bae6fd]",
    glareColor: "rgba(186, 230, 253, 0.45)",
    prismGradient:
      "linear-gradient(135deg, rgba(56,189,248,0.5), rgba(99,102,241,0.5), rgba(165,243,252,0.6))",
    glow: "rgba(56, 189, 248, 0.25)",
  },
};

const sizeStyles: Record<NonNullable<GlassPrismButtonProps["size"]>, string> = {
  sm: "h-8 px-4 text-xs rounded-xl gap-1.5",
  default: "h-10 px-5 text-xs rounded-2xl gap-2",
  lg: "h-12 px-6 text-sm rounded-2xl gap-2.5",
  icon: "h-10 w-10 p-0 rounded-2xl justify-center",
};

export const GlassPrismButton = React.forwardRef<HTMLButtonElement, GlassPrismButtonProps>(
  (
    {
      className,
      variant = "spatial-glass",
      size = "default",
      maxTilt = 12,
      glareOpacity = 0.35,
      showPrismBorder = true,
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
    const [tilt, setTilt] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [glare, setGlare] = React.useState<{ x: number; y: number; opacity: number }>({
      x: 50,
      y: 50,
      opacity: 0,
    });
    const [isHovered, setIsHovered] = React.useState(false);

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      // 3D rotation: rotateX responds to vertical position, rotateY to horizontal
      setTilt({
        x: -normY * maxTilt,
        y: normX * maxTilt,
      });

      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: glareOpacity,
      });
      setIsHovered(true);

      onMouseMove?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      setTilt({ x: 0, y: 0 });
      setGlare((prev) => ({ ...prev, opacity: 0 }));
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const currentVariant = variantStyles[variant] || variantStyles["spatial-glass"];

    return (
      <div style={{ perspective: "800px" }} className="inline-flex items-center justify-center">
        <button
          ref={buttonRef}
          disabled={disabled || isLoading}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 6 : 0}px)`,
            transformStyle: "preserve-3d",
            transition: isHovered
              ? "transform 0.1s ease-out, box-shadow 0.2s ease"
              : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
          }}
          className={cn(
            "group relative inline-flex items-center justify-center font-mono font-medium tracking-tight select-none cursor-pointer overflow-hidden border transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
            "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]",
            currentVariant.button,
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {/* Chromatic Dispersion Prism Bevel */}
          {showPrismBorder && (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-[1px] z-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
                isHovered && "opacity-70"
              )}
              style={{
                background: currentVariant.prismGradient,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
                padding: "1px",
              }}
            />
          )}

          {/* Dynamic Specular Light Glare Reflection */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 90px at ${glare.x}% ${glare.y}%, ${currentVariant.glareColor}, transparent 70%)`,
            }}
          />

          {/* Overhead Ambient Light 1px Catch Rim */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10"
          />

          {/* Button Content */}
          <span
            className={cn(
              "relative z-20 inline-flex items-center gap-[inherit] transition-transform duration-200",
              currentVariant.text
            )}
            style={{
              transform: `translateZ(12px)`,
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
                <span>Refracting...</span>
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
      </div>
    );
  }
);

GlassPrismButton.displayName = "GlassPrismButton";

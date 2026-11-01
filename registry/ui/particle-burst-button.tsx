"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface ParticleBurstButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "supernova-gold"
    | "cosmic-starfield"
    | "electric-emerald"
    | "fuchsia-confetti"
    | "monochrome-firefly";
  size?: "sm" | "default" | "lg" | "icon";
  /** Total number of particles in burst explosion (12 to 64). Default: 32 */
  particleCount?: number;
  /** Whether to show subtle ambient stardust motes at the edges. Default: true */
  enableAmbient?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape: "sparkle" | "diamond" | "circle";
  rotation: number;
  vRot: number;
}

const variantStyles: Record<
  NonNullable<ParticleBurstButtonProps["variant"]>,
  {
    button: string;
    colors: string[];
    ambientColor: string;
    glow: string;
  }
> = {
  "supernova-gold": {
    button:
      "bg-[#140e05] text-[#fbbf24] border border-[#f59e0b]/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-[#fbbf24] hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]",
    colors: ["#fbbf24", "#f59e0b", "#fde68a", "#ffffff", "#d97706"],
    ambientColor: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.35)",
  },
  "cosmic-starfield": {
    button:
      "bg-[#070914] text-[#a5b4fc] border border-[#6366f1]/40 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-[#818cf8] hover:shadow-[0_0_32px_rgba(129,140,248,0.4)]",
    colors: ["#818cf8", "#a5b4fc", "#38bdf8", "#c084fc", "#ffffff"],
    ambientColor: "#818cf8",
    glow: "rgba(129, 140, 248, 0.35)",
  },
  "electric-emerald": {
    button:
      "bg-[#051308] text-[#86efac] border border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-[#4ade80] hover:shadow-[0_0_32px_rgba(74,222,128,0.4)]",
    colors: ["#4ade80", "#22c55e", "#86efac", "#bbf7d0", "#ffffff"],
    ambientColor: "#4ade80",
    glow: "rgba(74, 222, 128, 0.35)",
  },
  "fuchsia-confetti": {
    button:
      "bg-[#140514] text-[#f472b6] border border-[#ec4899]/40 shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:border-[#f472b6] hover:shadow-[0_0_32px_rgba(244,114,182,0.4)]",
    colors: ["#f472b6", "#ec4899", "#a855f7", "#38bdf8", "#fbbf24"],
    ambientColor: "#f472b6",
    glow: "rgba(244, 114, 182, 0.35)",
  },
  "monochrome-firefly": {
    button:
      "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs hover:border-[var(--border-hover)] hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]",
    colors: ["#ffffff", "#e2e8f0", "#cbd5e1", "#94a3b8"],
    ambientColor: "#ffffff",
    glow: "rgba(255, 255, 255, 0.2)",
  },
};

const sizeStyles: Record<NonNullable<ParticleBurstButtonProps["size"]>, string> = {
  sm: "h-8 px-4 text-xs rounded-full gap-1.5",
  default: "h-10 px-5 text-xs rounded-full gap-2",
  lg: "h-12 px-6 text-sm rounded-full gap-2.5",
  icon: "h-10 w-10 p-0 rounded-full justify-center",
};

export const ParticleBurstButton = React.forwardRef<HTMLButtonElement, ParticleBurstButtonProps>(
  (
    {
      className,
      variant = "supernova-gold",
      size = "default",
      particleCount = 32,
      enableAmbient = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const particlesRef = React.useRef<Particle[]>([]);
    const animFrameRef = React.useRef<number | null>(null);
    const [clickPulse, setClickPulse] = React.useState(false);

    const currentVariant = variantStyles[variant] || variantStyles["supernova-gold"];

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    // Bleed in CSS pixels around button for particles to expand
    const BLEED = 48;

    // Start physics animation loop
    const startLoop = () => {
      if (animFrameRef.current !== null) return;

      const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          animFrameRef.current = null;
          return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          animFrameRef.current = null;
          return;
        }

        // Full context transform reset before clear to prevent scaling artifacts
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        const list = particlesRef.current;
        for (let i = list.length - 1; i >= 0; i--) {
          const p = list[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // Natural gravity
          p.vx *= 0.95; // Atmospheric drag
          p.alpha -= p.decay;
          p.rotation += p.vRot;

          if (p.alpha <= 0) {
            list.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "diamond") {
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 1.3);
            ctx.lineTo(p.size, 0);
            ctx.lineTo(0, p.size * 1.3);
            ctx.lineTo(-p.size, 0);
            ctx.closePath();
            ctx.fill();
          } else {
            // Sparkle 4-point star
            ctx.beginPath();
            for (let s = 0; s < 4; s++) {
              ctx.rotate(Math.PI / 2);
              ctx.lineTo(p.size * 1.6, 0);
              ctx.lineTo(p.size * 0.35, p.size * 0.35);
            }
            ctx.closePath();
            ctx.fill();
          }

          ctx.restore();
        }

        if (list.length > 0) {
          animFrameRef.current = requestAnimationFrame(loop);
        } else {
          // Final clean clear when all particles vanish
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(loop);
    };

    // Update Canvas Dimensions accurately
    const updateCanvasSize = React.useCallback(() => {
      const btn = buttonRef.current;
      const canvas = canvasRef.current;
      if (!btn || !canvas) return;

      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
      if (w <= 0 || h <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const totalW = w + BLEED * 2;
      const totalH = h + BLEED * 2;

      canvas.width = Math.round(totalW * dpr);
      canvas.height = Math.round(totalH * dpr);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, totalW, totalH);
      }
    }, [BLEED]);

    React.useEffect(() => {
      updateCanvasSize();
      window.addEventListener("resize", updateCanvasSize);
      return () => {
        window.removeEventListener("resize", updateCanvasSize);
        if (animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      };
    }, [updateCanvasSize]);

    // Spawn Burst Particles from click
    const spawnBurst = (relX: number, relY: number) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
      const originX = BLEED + relX * w;
      const originY = BLEED + relY * h;

      const colors = currentVariant.colors;
      const count = Math.max(12, particleCount);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.2 + Math.random() * 5.8;
        const shapes: ("sparkle" | "diamond" | "circle")[] = ["sparkle", "diamond", "circle"];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.4, // Upward bias
          size: 2 + Math.random() * 3.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.018 + Math.random() * 0.024,
          shape,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
        });
      }

      particlesRef.current.push(...newParticles);
      startLoop();
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        // Scale-invariant normalized click coordinates [0, 1]
        const relX = rect.width > 0 ? (e.clientX - rect.left) / rect.width : 0.5;
        const relY = rect.height > 0 ? (e.clientY - rect.top) / rect.height : 0.5;
        spawnBurst(relX, relY);

        setClickPulse(true);
        setTimeout(() => setClickPulse(false), 500);
      }
      onClick?.(e);
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        {/* Precision Hardware-Accelerated Particle Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute select-none z-30"
          style={{
            top: -BLEED,
            left: -BLEED,
            width: `calc(100% + ${BLEED * 2}px)`,
            height: `calc(100% + ${BLEED * 2}px)`,
          }}
        />

        <button
          ref={buttonRef}
          disabled={disabled || isLoading}
          onClick={handleClick}
          className={cn(
            "group relative inline-flex items-center justify-center font-mono font-medium tracking-tight select-none cursor-pointer overflow-hidden border transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-main)]",
            "disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]",
            currentVariant.button,
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {/* Subtle Stardust Motes at Safe Outer Padding (Never Overlapping Typography) */}
          {enableAmbient && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              {/* Top-left corner stardust spark */}
              <span
                className="absolute top-2 left-3 w-1 h-1 rounded-full animate-pulse opacity-70"
                style={{ background: currentVariant.ambientColor, animationDuration: "1.8s" }}
              />
              {/* Bottom-right corner stardust spark */}
              <span
                className="absolute bottom-2 right-3 w-1 h-1 rounded-full animate-pulse opacity-60"
                style={{ background: currentVariant.ambientColor, animationDuration: "2.4s", animationDelay: "0.6s" }}
              />
              {/* Top-right subtle diamond sparkle */}
              <span
                className="absolute top-2 right-5 w-1 h-1 rotate-45 opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                style={{ background: currentVariant.ambientColor }}
              />
            </span>
          )}

          {/* Click Shockwave Expansion Ring */}
          {clickPulse && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-current animate-ping opacity-75"
            />
          )}

          {/* Button Label & Icons — Protected in foreground */}
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
                <span>Igniting...</span>
              </>
            ) : (
              <>
                {leftIcon && <span className="inline-flex shrink-0 opacity-90">{leftIcon}</span>}
                <span>{children}</span>
                {rightIcon && <span className="inline-flex shrink-0 opacity-90">{rightIcon}</span>}
              </>
            )}
          </span>
        </button>
      </div>
    );
  }
);

ParticleBurstButton.displayName = "ParticleBurstButton";

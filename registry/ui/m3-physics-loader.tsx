"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { M3LoadingIndicator, M3_MORPH_SHAPES } from "@/registry/ui/m3-loading-indicator";

export interface M3PhysicsLoaderProps {
  /**
   * Loader style:
   * - "shape-morph": Official Material 3 Expressive Loading Indicator (circle -> squircle -> pill -> clover -> star -> pentagon)
   * - "elastic-line": Horizontal stretchable elastic cord with punch-through resistance & seamless shape transformation
   */
  variant?: "shape-morph" | "elastic-line";
  /**
   * Single accent theme or color:
   * - "accent": Emerald accent (var(--accent-green))
   * - "google": Google Material Royal Blue (#2563eb)
   * - "monochrome": Monochrome (currentColor / var(--text-primary))
   * - or any custom single hex color string.
   * Strictly flat vector, NO GLOW.
   */
  theme?: "accent" | "google" | "monochrome" | string;
  /** Size in pixels (standard 48-64) */
  size?: number;
  /** Speed multiplier (0.5 to 2.5, default 1) */
  speed?: number;
  /** Elastic resistance tension for the elastic-line variant (0.5 to 2, default 1) */
  resistance?: number;
  /** Additional CSS class names */
  className?: string;
}

function resolveAccentColor(theme: string): string {
  if (theme === "accent") return "var(--accent-green)";
  if (theme === "google") return "#2563eb";
  if (theme === "monochrome") return "currentColor";
  return theme;
}

export function M3PhysicsLoader({
  variant = "shape-morph",
  theme = "accent",
  size = 56,
  speed = 1,
  resistance = 1,
  className,
}: M3PhysicsLoaderProps) {
  const accent = resolveAccentColor(theme);

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 1: Official Material 3 Expressive Morphing Indicator
  // ══════════════════════════════════════════════════════════════════
  if (variant === "shape-morph") {
    return (
      <div className={cn("flex items-center justify-center select-none shrink-0", className)}>
        <M3LoadingIndicator
          variant="uncontained"
          size={size}
          color={theme}
          speed={speed}
        />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 2: High-Performance Elastic Cord Punch-Through Loader
  // 120fps direct DOM manipulation (Zero React 60fps re-render stutter)
  // ══════════════════════════════════════════════════════════════════
  return (
    <ElasticCordPhysicsEngine
      accent={accent}
      speed={speed}
      resistance={resistance}
      className={className}
    />
  );
}

// ── Silky 120 FPS Elastic Membrane Punch-Through Physics Engine ──
// Uses direct DOM refs on rAF for continuous coordinate interpolation,
// eliminating React setState reconciliation bottleneck during animation ticks.
function ElasticCordPhysicsEngine({
  accent,
  speed,
  resistance,
  className,
}: {
  accent: string;
  speed: number;
  resistance: number;
  className?: string;
}) {
  const H = 120;
  const midY = H / 2;

  // DOM Refs for high-speed sub-millisecond transforms
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cordRef = React.useRef<SVGPathElement>(null);
  const shapeWrapperRef = React.useRef<HTMLDivElement>(null);

  // Low-frequency React state: ONLY updates when shape breaches line (once per ~1.2s)
  const [shapeIndex, setShapeIndex] = React.useState(0);

  React.useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let lastBreachStage = 0;

    const cycleDuration = 2.4 / speed;
    const maxDeflection = 26 * Math.min(1.5, Math.max(0.5, resistance));
    const topApex = 40;
    const botApex = 40;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = (elapsed % cycleDuration) / cycleDuration; // 0..1

      let shapeY = midY;
      let lineDy = 0;
      let scaleX = 1;
      let scaleY = 1;

      // ── Physical Phase Timeline ──
      // [0.00 -> 0.20] Rise up to Top Apex
      // [0.20 -> 0.36] Natural Gravity Fall toward Line
      // [0.36 -> 0.50] Membrane Contact & Elastic Resistance Stretch Down
      // [0.50 -> 0.62] PUNCH-THROUGH DOWN! Line twangs, shape snaps past to bottom apex
      // [0.62 -> 0.76] Bottom Apex Reversal & Rise toward Line
      // [0.76 -> 0.90] Membrane Contact from below & Elastic Resistance Stretch Up
      // [0.90 -> 1.00] PUNCH-THROUGH UP! Line twangs, shape snaps past to top apex

      if (progress < 0.20) {
        const t = progress / 0.20;
        shapeY = midY - Math.sin((t * Math.PI) / 2) * topApex;
        lineDy = 0;
        scaleX = 0.92 + 0.08 * t;
        scaleY = 1.08 - 0.08 * t;
      } else if (progress < 0.36) {
        const t = (progress - 0.20) / 0.16;
        shapeY = midY - topApex + t * t * topApex; // quadratic gravity
        lineDy = 0;
        scaleX = 0.9;
        scaleY = 1.1;
      } else if (progress < 0.50) {
        const t = (progress - 0.36) / 0.14;
        const stretch = Math.sin((t * Math.PI) / 2);
        lineDy = stretch * maxDeflection;
        shapeY = midY + lineDy;
        scaleX = 1 + stretch * 0.26;
        scaleY = 1 - stretch * 0.18;
      } else if (progress < 0.62) {
        const t = (progress - 0.50) / 0.12;
        // Damped harmonic twang: e^(-6t) * cos(4.5 * PI * t)
        const twang = Math.exp(-6 * t) * Math.cos(t * Math.PI * 4.5);
        lineDy = -twang * maxDeflection * 0.75;
        const punch = 1 - Math.cos((t * Math.PI) / 2);
        shapeY = midY + maxDeflection * 0.3 + punch * (botApex - maxDeflection * 0.3);
        scaleX = 0.95;
        scaleY = 1.05;

        // Shape morphs cleanly on downward breach
        if (lastBreachStage !== 1) {
          lastBreachStage = 1;
          setShapeIndex((idx) => (idx + 1) % M3_MORPH_SHAPES.length);
        }
      } else if (progress < 0.76) {
        const t = (progress - 0.62) / 0.14;
        shapeY = midY + botApex - (1 - Math.cos((t * Math.PI) / 2)) * botApex;
        lineDy = 0;
        scaleX = 0.92;
        scaleY = 1.08;
      } else if (progress < 0.90) {
        const t = (progress - 0.76) / 0.14;
        const stretch = Math.sin((t * Math.PI) / 2);
        lineDy = -stretch * maxDeflection;
        shapeY = midY + lineDy;
        scaleX = 1 + stretch * 0.26;
        scaleY = 1 - stretch * 0.18;
      } else {
        const t = (progress - 0.90) / 0.10;
        const twang = Math.exp(-6 * t) * Math.cos(t * Math.PI * 4.5);
        lineDy = twang * maxDeflection * 0.75;
        const punch = 1 - Math.cos((t * Math.PI) / 2);
        shapeY = midY - maxDeflection * 0.3 - punch * (topApex - maxDeflection * 0.3);
        scaleX = 0.95;
        scaleY = 1.05;

        // Shape morphs cleanly on upward breach
        if (lastBreachStage !== 2) {
          lastBreachStage = 2;
          setShapeIndex((idx) => (idx + 1) % M3_MORPH_SHAPES.length);
        }
      }

      // Direct GPU transform manipulation (0ms React overhead, 100% stutter-free)
      if (cordRef.current) {
        cordRef.current.setAttribute("d", `M 14,${midY} Q 50,${midY + lineDy} 86,${midY}`);
        cordRef.current.setAttribute(
          "stroke-width",
          String(Math.max(1.5, 3.0 - Math.abs(lineDy) * 0.035))
        );
      }

      if (shapeWrapperRef.current) {
        shapeWrapperRef.current.style.transform = `translate3d(-50%, ${shapeY - midY}px, 0) scale(${scaleX}, ${scaleY})`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [speed, resistance, midY]);

  const currentShape = M3_MORPH_SHAPES[shapeIndex];
  const shapeSize = 30;

  return (
    <div
      ref={containerRef}
      role="progressbar"
      aria-label="Elastic Membrane Punch-Through Physics Loader"
      style={{ height: H, width: "100%" }}
      className={cn("relative flex items-center justify-center select-none overflow-hidden", className)}
    >
      {/* Dynamic 100% Width Stretchable Elastic Cord (Flat, Strictly NO GLOW) */}
      <svg
        viewBox={`0 0 100 ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Subtle resting guide track */}
        <line
          x1="14"
          y1={midY}
          x2="86"
          y2={midY}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 3"
          className="text-[var(--border)] opacity-35"
        />

        {/* Dynamic Cord: Path d and strokeWidth updated at 120fps via ref */}
        <path
          ref={cordRef}
          d={`M 14,${midY} Q 50,${midY} 86,${midY}`}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Morphing Geometry (Smooth hardware-accelerated translate3d) */}
      <div
        ref={shapeWrapperRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: shapeSize,
          height: shapeSize,
          transform: "translate3d(-50%, 0px, 0) scale(1, 1)",
          willChange: "transform",
        }}
        className="flex items-center justify-center pointer-events-none z-10"
      >
        <svg
          viewBox="0 0 100 100"
          width={shapeSize}
          height={shapeSize}
          className="overflow-visible select-none"
        >
          {/* Smooth Shape Morphing on Breach: Circle -> Squircle -> Pill -> Clover -> Star -> Pentagon */}
          <motion.path
            animate={{ d: currentShape.d }}
            transition={{
              duration: 0.35,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            fill={accent}
          />
          {/* Subtle tactile pip in center */}
          <circle cx="50" cy="50" r="4.5" fill="rgba(255,255,255,0.85)" />
        </svg>
      </div>
    </div>
  );
}

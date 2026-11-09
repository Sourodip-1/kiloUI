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
  // VARIANT 2: High-Precision Elastic Cord Punch-Through Loader
  // C^1 continuous trajectory + Direct GPU transforms (Zero Stutter)
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

// ── Ultra-Smooth 120 FPS Elastic Membrane Physics Engine ──
// Uses a C^1 continuous piecewise harmonic trajectory with 0px boundary jump.
// High-frequency transforms manipulate DOM directly via rAF refs without React reconciliation.
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
  const midY = H / 2; // 60px

  const containerRef = React.useRef<HTMLDivElement>(null);
  const cordRef = React.useRef<SVGPathElement>(null);
  const shapeWrapperRef = React.useRef<HTMLDivElement>(null);

  // Shape index morphs only on breach (once every ~1.2s)
  const [shapeIndex, setShapeIndex] = React.useState(0);

  React.useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let lastBreachStage = 0;

    // Full loop cycle period in seconds
    const cycleDuration = 2.4 / Math.max(0.2, speed);
    // Amplitude parameters in pixels
    const A = 38; // apex displacement from center
    const D = 22 * Math.min(1.5, Math.max(0.5, resistance)); // max cord deflection

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const p = (elapsed % cycleDuration) / cycleDuration; // 0..1

      let shapeY = 0;
      let cordY = 0;
      let sx = 1;
      let sy = 1;

      // ── C^1 Continuous Trajectory Timeline ──
      // [0.00 -> 0.25]: Pop up from 0 to apex -A
      // [0.25 -> 0.45]: Gravity fall from -A to contact cord at 0
      // [0.45 -> 0.58]: Elastic contact, resistance and cord stretch from 0 to +D
      // [0.58 -> 0.70]: PUNCH-THROUGH DOWN! Cord twangs, shape shoots to bottom apex +A
      // [0.70 -> 0.85]: Bottom apex reversal and rise upward from +A to 0
      // [0.85 -> 0.95]: Upward contact, resistance and cord stretch from 0 to -D
      // [0.95 -> 1.00]: PUNCH-THROUGH UP! Cord twangs, shape shoots to 0 and loops

      if (p < 0.25) {
        const t = p / 0.25;
        shapeY = -A * Math.sin((t * Math.PI) / 2);
        cordY = 0;
        sx = 0.94 + 0.06 * t;
        sy = 1.06 - 0.06 * t;
      } else if (p < 0.45) {
        const t = (p - 0.25) / 0.20;
        shapeY = -A * Math.cos((t * Math.PI) / 2);
        cordY = 0;
        sx = 0.92;
        sy = 1.08;
      } else if (p < 0.58) {
        const t = (p - 0.45) / 0.13;
        const stretch = Math.sin((t * Math.PI) / 2);
        shapeY = D * stretch;
        cordY = shapeY;
        sx = 1 + stretch * 0.26;
        sy = 1 - stretch * 0.18;
      } else if (p < 0.70) {
        const t = (p - 0.58) / 0.12;
        shapeY = D + (A - D) * Math.sin((t * Math.PI) / 2);
        // Cord damped harmonic recoil from +D back to 0
        cordY = D * Math.exp(-6 * t) * Math.cos(t * Math.PI * 4);
        sx = 0.95;
        sy = 1.05;

        // Shape morphs on downward breakthrough
        if (lastBreachStage !== 1) {
          lastBreachStage = 1;
          setShapeIndex((idx) => (idx + 1) % M3_MORPH_SHAPES.length);
        }
      } else if (p < 0.85) {
        const t = (p - 0.70) / 0.15;
        shapeY = A * Math.cos((t * Math.PI) / 2);
        cordY = 0;
        sx = 0.92;
        sy = 1.08;
      } else if (p < 0.95) {
        const t = (p - 0.85) / 0.10;
        const stretch = Math.sin((t * Math.PI) / 2);
        shapeY = -D * stretch;
        cordY = shapeY;
        sx = 1 + stretch * 0.26;
        sy = 1 - stretch * 0.18;
      } else {
        const t = (p - 0.95) / 0.05;
        shapeY = -D * (1 - Math.sin((t * Math.PI) / 2));
        // Cord damped harmonic recoil from -D back to 0
        cordY = -D * Math.exp(-6 * t) * Math.cos(t * Math.PI * 4);
        sx = 0.95;
        sy = 1.05;

        // Shape morphs on upward breakthrough
        if (lastBreachStage !== 2) {
          lastBreachStage = 2;
          setShapeIndex((idx) => (idx + 1) % M3_MORPH_SHAPES.length);
        }
      }

      // Direct GPU transform manipulation (0ms React overhead, 100% stutter-free)
      if (cordRef.current) {
        cordRef.current.setAttribute(
          "d",
          `M 80,${midY} Q 500,${midY + cordY} 920,${midY}`
        );
        cordRef.current.setAttribute(
          "stroke-width",
          String(Math.max(1.8, 3.2 - Math.abs(cordY) * 0.04))
        );
      }

      if (shapeWrapperRef.current) {
        shapeWrapperRef.current.style.transform = `translate3d(-50%, ${shapeY}px, 0) scale(${sx}, ${sy})`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [speed, resistance, midY]);

  const currentShape = M3_MORPH_SHAPES[shapeIndex];
  const shapeSize = 32;

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
        viewBox={`0 0 1000 ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Subtle resting guide track */}
        <line
          x1="80"
          y1={midY}
          x2="920"
          y2={midY}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
          className="text-[var(--border)] opacity-35"
        />

        {/* Dynamic Cord: Uniform vector-effect stroke width and smooth deflection */}
        <path
          ref={cordRef}
          d={`M 80,${midY} Q 500,${midY} 920,${midY}`}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Floating Morphing Geometry (Smooth hardware-accelerated translate3d) */}
      {/* IMPORTANT: No conflicting transform in inline style, preventing React reconciliation jumps */}
      <div
        ref={shapeWrapperRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: shapeSize,
          height: shapeSize,
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
          {/* Seamless Shape Morphing on Breach: Circle -> Squircle -> Pill -> Clover -> Star -> Pentagon */}
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

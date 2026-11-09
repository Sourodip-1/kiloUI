"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { M3LoadingIndicator } from "@/registry/ui/m3-loading-indicator";

export interface M3PhysicsLoaderProps {
  /**
   * Loader style:
   * - "shape-morph": Official Material 3 Expressive Loading Indicator (https://m3.material.io/components/loading-indicator/overview)
   * - "elastic-line": Horizontal stretchable elastic membrane with punch-through resistance & shape transformation
   */
  variant?: "shape-morph" | "elastic-line";
  /**
   * Single accent theme or color:
   * - "accent": Emerald accent (var(--accent-green))
   * - "google": Google Material Blue (#2563eb)
   * - "monochrome": Monochrome (var(--text-primary))
   * - or any custom single hex color string.
   * Strictly NO GLOW.
   */
  theme?: "accent" | "google" | "monochrome" | string;
  /** Overall size in pixels */
  size?: number;
  /** Speed multiplier (default 1) */
  speed?: number;
  /** Elastic resistance tension for the elastic-line variant (0.5 to 2, default 1) */
  resistance?: number;
  /** Additional CSS class names */
  className?: string;
}

// ── Official Material 3 Expressive Shapes for Elastic Breaches ──
const M3_SHAPES = [
  // 1. Squircle
  { name: "squircle", borderRadius: "26%" },
  // 2. Cookie 4-Sided / Quatrefoil
  { name: "cookie4", borderRadius: "30% 70% 32% 68% / 65% 35% 65% 35%" },
  // 3. SoftBurst / Star
  { name: "softburst", borderRadius: "45% 55% 60% 40% / 50% 65% 35% 50%" },
  // 4. Smooth Circle
  { name: "circle", borderRadius: "50%" },
  // 5. Pill
  { name: "pill", borderRadius: "9999px" },
];

export function M3PhysicsLoader({
  variant = "shape-morph",
  theme = "accent",
  size = 64,
  speed = 1,
  resistance = 1,
  className,
}: M3PhysicsLoaderProps) {
  // Resolve single accent color (Flat, strictly NO GLOW)
  const accentColor = React.useMemo(() => {
    if (theme === "accent") return "var(--accent-green)";
    if (theme === "google") return "#2563eb";
    if (theme === "monochrome") return "currentColor";
    return theme;
  }, [theme]);

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 1: Material 3 Expressive Loading Indicator (Official M3)
  // ══════════════════════════════════════════════════════════════════
  if (variant === "shape-morph") {
    return (
      <div className={cn("flex items-center justify-center select-none shrink-0", className)}>
        <M3LoadingIndicator
          variant="uncontained"
          size={size}
          color={accentColor}
          speed={speed}
        />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 2: Elastic Line Punch-Through & Morph Physics Loader
  // Strictly NO GLOW, NO PULSE CIRCULAR RING
  // ══════════════════════════════════════════════════════════════════
  return (
    <ElasticLinePhysicsEngine
      size={size}
      accentColor={accentColor}
      speed={speed}
      resistance={resistance}
      className={className}
    />
  );
}

// ── Minimalist Elastic Membrane Punch-Through Physics Engine ──
// Pure physics: natural gravity fall, membrane tension deflection, clean punch-through,
// damped harmonic string twang recoil, and seamless shape transformation. NO GLOW.
function ElasticLinePhysicsEngine({
  size,
  accentColor,
  speed,
  resistance,
  className,
}: {
  size: number;
  accentColor: string;
  speed: number;
  resistance: number;
  className?: string;
}) {
  const containerWidth = Math.max(size * 2.6, 210);
  const containerHeight = Math.max(size * 1.8, 140);
  const centerY = containerHeight / 2;

  // Elastic Line displacement state: dy represents the center deflection
  const [lineDy, setLineDy] = React.useState(0);
  // Shape position state: Y coordinate from top
  const [shapeY, setShapeY] = React.useState(centerY);
  // Shape morphology index
  const [shapeIndex, setShapeIndex] = React.useState(0);
  // Shape squash & stretch factors
  const [shapeScaleX, setShapeScaleX] = React.useState(1);
  const [shapeScaleY, setShapeScaleY] = React.useState(1);

  React.useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let lastBreachStage = 0;

    // Full loop cycle period in seconds
    const duration = 2.6 / speed;
    const maxDeflection = 28 * Math.min(1.5, Math.max(0.6, resistance));

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = (elapsed % duration) / duration; // 0 to 1

      let currShapeY = centerY;
      let currLineDy = 0;
      let sx = 1;
      let sy = 1;

      // ── Physical Phase Timeline ──
      // [0.00 -> 0.22] Launch from center up to Top Apex
      // [0.22 -> 0.38] Gravity Fall down toward the Elastic Line
      // [0.38 -> 0.52] Contact & Elastic Resistance Stretch Downward
      // [0.52 -> 0.64] Breakthrough Snap Down, Shape Morphs, Line Twangs (No pulse ring)
      // [0.64 -> 0.78] Bottom Apex & Launch Upward toward Elastic Line
      // [0.78 -> 0.90] Contact from below & Elastic Resistance Stretch Upward
      // [0.90 -> 1.00] Breakthrough Snap Up, Shape Morphs, Line Twangs

      if (progress < 0.22) {
        // Pop up to top apex (-46px from center)
        const p = progress / 0.22;
        const easeUp = Math.sin((p * Math.PI) / 2);
        currShapeY = centerY - easeUp * 46;
        currLineDy = 0;
        sx = 0.94 + 0.06 * (1 - p);
        sy = 1.06 - 0.06 * (1 - p);
      } else if (progress < 0.38) {
        // Free fall with gravity acceleration
        const p = (progress - 0.22) / 0.16;
        const gravityFall = p * p;
        currShapeY = (centerY - 46) + gravityFall * 46;
        currLineDy = 0;
        sx = 0.92;
        sy = 1.08;
      } else if (progress < 0.52) {
        // Contact line: Membrane resists and stretches downwards
        const p = (progress - 0.38) / 0.14;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currLineDy = easeStretch * maxDeflection;
        currShapeY = centerY + currLineDy;
        // Compression squash against elastic tension
        sx = 1 + easeStretch * 0.3;
        sy = 1 - easeStretch * 0.22;
      } else if (progress < 0.64) {
        // PUNCH-THROUGH DOWN! Line snaps back with damped harmonic twang
        const p = (progress - 0.52) / 0.12;
        // Damped harmonic oscillation: e^(-6p) * cos(4.5 * PI * p)
        const twang = Math.exp(-6 * p) * Math.cos(p * Math.PI * 4.5);
        currLineDy = -twang * (maxDeflection * 0.75);
        // Snaps past line down to bottom apex (+48px)
        const punchEase = 1 - Math.cos((p * Math.PI) / 2);
        currShapeY = centerY + maxDeflection * 0.3 + punchEase * (48 - maxDeflection * 0.3);
        sx = 0.95;
        sy = 1.05;

        // Morph shape cleanly on breach — NO PULSE RING
        if (lastBreachStage !== 1) {
          lastBreachStage = 1;
          setShapeIndex((s) => (s + 1) % M3_SHAPES.length);
        }
      } else if (progress < 0.78) {
        // Bottom Apex reversal & rise upward
        const p = (progress - 0.64) / 0.14;
        const easeRise = 1 - Math.cos((p * Math.PI) / 2);
        currShapeY = (centerY + 48) - easeRise * 48;
        currLineDy = 0;
        sx = 0.94;
        sy = 1.06;
      } else if (progress < 0.90) {
        // Contact from underneath: stretches line upwards
        const p = (progress - 0.78) / 0.12;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currLineDy = -easeStretch * maxDeflection;
        currShapeY = centerY + currLineDy;
        sx = 1 + easeStretch * 0.3;
        sy = 1 - easeStretch * 0.22;
      } else {
        // PUNCH-THROUGH UP! Line twangs, shape snaps past to top
        const p = (progress - 0.90) / 0.10;
        const twang = Math.exp(-6 * p) * Math.cos(p * Math.PI * 4.5);
        currLineDy = twang * (maxDeflection * 0.75);
        const punchEase = 1 - Math.cos((p * Math.PI) / 2);
        currShapeY = centerY - maxDeflection * 0.3 - punchEase * (46 - maxDeflection * 0.3);
        sx = 0.95;
        sy = 1.05;

        // Morph shape cleanly on upward breach — NO PULSE RING
        if (lastBreachStage !== 2) {
          lastBreachStage = 2;
          setShapeIndex((s) => (s + 1) % M3_SHAPES.length);
        }
      }

      setShapeY(currShapeY);
      setLineDy(currLineDy);
      setShapeScaleX(sx);
      setShapeScaleY(sy);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [speed, resistance, centerY]);

  const currentShape = M3_SHAPES[shapeIndex];
  const shapeSize = Math.max(26, size * 0.44);

  // Line endpoints: sleek horizontal line spanning container with subtle edge margins
  const lineStartX = 14;
  const lineEndX = containerWidth - 14;
  const lineMidX = containerWidth / 2;

  // Clean quadratic bezier curve for the flexible elastic cord (Strictly NO GLOW)
  const curvePath = `M ${lineStartX},${centerY} Q ${lineMidX},${centerY + lineDy} ${lineEndX},${centerY}`;

  return (
    <div
      role="progressbar"
      aria-label="Elastic Punch-Through Physics Loader"
      style={{ width: containerWidth, height: containerHeight }}
      className={cn(
        "relative flex items-center justify-center select-none overflow-hidden rounded-2xl bg-[var(--surface-primary)] border border-[var(--border)] shadow-xs",
        className
      )}
    >
      <svg
        width={containerWidth}
        height={containerHeight}
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        className="absolute inset-0 pointer-events-none overflow-visible"
      >
        {/* Subtle resting baseline track guide */}
        <line
          x1={lineStartX}
          y1={centerY}
          x2={lineEndX}
          y2={centerY}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 3"
          className="text-[var(--border)] opacity-30"
        />

        {/* Dynamic Stretchable Elastic Cord (Crisp Flat Vector — NO GLOW) */}
        <path
          d={curvePath}
          fill="none"
          stroke={accentColor}
          strokeWidth={Math.max(1.8, 3.2 - Math.abs(lineDy) * 0.04)} // Thins realistically as stretched
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Morphing Geometry (Flat Solid Color — Strictly NO GLOW) */}
      <motion.div
        animate={{
          borderRadius: currentShape.borderRadius,
        }}
        transition={{
          borderRadius: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] },
        }}
        style={{
          width: shapeSize,
          height: shapeSize,
          top: shapeY - shapeSize / 2,
          left: `calc(50% - ${shapeSize / 2}px)`,
          position: "absolute",
          backgroundColor: accentColor,
          transform: `scale(${shapeScaleX}, ${shapeScaleY}) rotate(${shapeIndex * 45}deg)`,
        }}
        className="flex items-center justify-center pointer-events-none z-10"
      >
        {/* Core tactile pip */}
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 dark:bg-black/40" />
      </motion.div>
    </div>
  );
}

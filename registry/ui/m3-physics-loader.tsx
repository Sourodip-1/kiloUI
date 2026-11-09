"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface M3PhysicsLoaderProps {
  /**
   * Loader style:
   * - "shape-morph": Google Material You rounded edges shape morphing & continuous spinning
   * - "elastic-line": Horizontal stretchable elastic membrane with punch-through resistance & shape transformation
   */
  variant?: "shape-morph" | "elastic-line";
  /**
   * Single accent theme or color:
   * - "accent": Single Emerald accent (var(--accent-green))
   * - "google": Single Google Royal Blue (#2563eb)
   * - "monochrome": Single Monochrome (var(--text-primary))
   * - or any custom single hex color string (e.g. "#10b981")
   * Strictly single accent color — no multi-color rainbow stops.
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

// ── Google Material You Morphable Organic Shapes ──
const MORPH_SHAPES = [
  // 0. Squircle (Superellipse)
  {
    name: "squircle",
    borderRadius: "26%",
  },
  // 1. 4-Lobed Flower / Quatrefoil (Android 14 style)
  {
    name: "flower",
    borderRadius: "32% 68% 30% 70% / 60% 40% 60% 40%",
  },
  // 2. Rounded 8-Pointed Star / Petal (Material You)
  {
    name: "star",
    borderRadius: "45% 55% 60% 40% / 50% 65% 35% 50%",
  },
  // 3. Smooth Circle
  {
    name: "circle",
    borderRadius: "50%",
  },
  // 4. Soft Diamond / Shield
  {
    name: "shield",
    borderRadius: "40% 40% 50% 50% / 30% 30% 70% 70%",
  },
];

export function M3PhysicsLoader({
  variant = "shape-morph",
  theme = "accent",
  size = 64,
  speed = 1,
  resistance = 1,
  className,
}: M3PhysicsLoaderProps) {
  // Resolve single accent color
  const accentColor = React.useMemo(() => {
    if (theme === "accent") return "var(--accent-green)";
    if (theme === "google") return "#2563eb";
    if (theme === "monochrome") return "currentColor";
    return theme;
  }, [theme]);

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 1: Google Material You Shape Morph Spin Loader
  // ══════════════════════════════════════════════════════════════════
  const [shapeIndex, setShapeIndex] = React.useState(0);

  React.useEffect(() => {
    if (variant !== "shape-morph") return;

    const intervalTime = Math.max(800, 1500 / speed);
    const timer = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % MORPH_SHAPES.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [variant, speed]);

  if (variant === "shape-morph") {
    const currentShape = MORPH_SHAPES[shapeIndex];

    return (
      <div
        role="progressbar"
        aria-label="Google Shape Morphing Loader"
        style={{ width: size, height: size }}
        className={cn(
          "relative flex items-center justify-center select-none shrink-0",
          className
        )}
      >
        {/* Continuous rotating wrapper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 3.4 / speed,
            ease: "linear",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Animated Morphing Organic Shape in Single Accent Color */}
          <motion.div
            layout
            animate={{
              borderRadius: currentShape.borderRadius,
              scale: [0.94, 1.05],
            }}
            transition={{
              borderRadius: { duration: 0.65 / speed, ease: [0.34, 1.56, 0.64, 1] },
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.85 / speed,
                ease: "easeInOut",
              },
            }}
            style={{
              width: size * 0.72,
              height: size * 0.72,
              backgroundColor: accentColor,
              boxShadow: `0 8px 24px -3px ${theme === "google" ? "rgba(37,99,235,0.4)" : "rgba(16,185,129,0.35)"}`,
            }}
            className="flex items-center justify-center cursor-default transition-all"
          >
            {/* Center soft inner core dot for depth */}
            <motion.div
              animate={{
                scale: [0.8, 1.2, 0.9],
                opacity: [0.4, 0.8, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6 / speed,
                ease: "easeInOut",
              }}
              className="w-2.5 h-2.5 rounded-full bg-white/85 shadow-xs"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 2: Elastic Line Punch-Through & Morph Physics Loader
  // ══════════════════════════════════════════════════════════════════
  return (
    <ElasticLinePhysicsEngine
      size={size}
      accentColor={accentColor}
      theme={theme}
      speed={speed}
      resistance={resistance}
      className={className}
    />
  );
}

// ── Realistic Elastic Membrane Punch-Through Physics Engine ──
function ElasticLinePhysicsEngine({
  size,
  accentColor,
  theme,
  speed,
  resistance,
  className,
}: {
  size: number;
  accentColor: string;
  theme: string;
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
  // Membrane breakthrough burst trigger
  const [isBreached, setIsBreached] = React.useState(false);

  React.useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let lastBreachStage = 0;

    // Full loop cycle period in seconds
    const duration = 2.6 / speed;
    const maxDeflection = 30 * Math.min(1.6, Math.max(0.6, resistance));

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
      // [0.52 -> 0.64] Breakthrough Snap Down, Shape Morphs, Line Twangs
      // [0.64 -> 0.78] Bottom Apex & Launch Upward toward Elastic Line
      // [0.78 -> 0.90] Contact from below & Elastic Resistance Stretch Upward
      // [0.90 -> 1.00] Breakthrough Snap Up, Shape Morphs, Line Twangs

      if (progress < 0.22) {
        // Pop up to top apex (-46px from center)
        const p = progress / 0.22;
        const easeUp = Math.sin((p * Math.PI) / 2);
        currShapeY = centerY - easeUp * 46;
        currLineDy = 0;
        // Natural airborne elongation
        sx = 0.92 + 0.08 * (1 - p);
        sy = 1.08 - 0.08 * (1 - p);
      } else if (progress < 0.38) {
        // Free fall with gravity acceleration
        const p = (progress - 0.22) / 0.16;
        const gravityFall = p * p;
        currShapeY = (centerY - 46) + gravityFall * 46;
        currLineDy = 0;
        // Aerodynamic stretching during fall
        sx = 0.9;
        sy = 1.1;
      } else if (progress < 0.52) {
        // Contact line: Membrane resists and stretches downwards
        const p = (progress - 0.38) / 0.14;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currLineDy = easeStretch * maxDeflection;
        currShapeY = centerY + currLineDy;
        // Compression squash against resistance
        sx = 1 + easeStretch * 0.32;
        sy = 1 - easeStretch * 0.24;
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

        // Trigger morph on breach
        if (lastBreachStage !== 1) {
          lastBreachStage = 1;
          setIsBreached(true);
          setTimeout(() => setIsBreached(false), 240);
          setShapeIndex((s) => (s + 1) % MORPH_SHAPES.length);
        }
      } else if (progress < 0.78) {
        // Bottom Apex reversal & rise upward
        const p = (progress - 0.64) / 0.14;
        const easeRise = 1 - Math.cos((p * Math.PI) / 2);
        currShapeY = (centerY + 48) - easeRise * 48;
        currLineDy = 0;
        sx = 0.92;
        sy = 1.08;
      } else if (progress < 0.90) {
        // Contact from underneath: stretches line upwards
        const p = (progress - 0.78) / 0.12;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currLineDy = -easeStretch * maxDeflection;
        currShapeY = centerY + currLineDy;
        // Compression squash from below
        sx = 1 + easeStretch * 0.32;
        sy = 1 - easeStretch * 0.24;
      } else {
        // PUNCH-THROUGH UP! Line twangs, shape snaps past to top
        const p = (progress - 0.90) / 0.10;
        const twang = Math.exp(-6 * p) * Math.cos(p * Math.PI * 4.5);
        currLineDy = twang * (maxDeflection * 0.75);
        const punchEase = 1 - Math.cos((p * Math.PI) / 2);
        currShapeY = centerY - maxDeflection * 0.3 - punchEase * (46 - maxDeflection * 0.3);
        sx = 0.95;
        sy = 1.05;

        // Trigger morph on upward breach
        if (lastBreachStage !== 2) {
          lastBreachStage = 2;
          setIsBreached(true);
          setTimeout(() => setIsBreached(false), 240);
          setShapeIndex((s) => (s + 1) % MORPH_SHAPES.length);
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

  const currentShape = MORPH_SHAPES[shapeIndex];
  const shapeSize = Math.max(26, size * 0.44);

  // Line endpoints: sleek horizontal line spanning container with subtle edge margins
  const lineStartX = 12;
  const lineEndX = containerWidth - 12;
  const lineMidX = containerWidth / 2;

  // Organic quadratic bezier curve for the flexible elastic cord
  const curvePath = `M ${lineStartX},${centerY} Q ${lineMidX},${centerY + lineDy} ${lineEndX},${centerY}`;
  const isDeflected = Math.abs(lineDy) > 2;

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
        <defs>
          <filter id="elastic-line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Resting baseline track guide (micro-subtle) */}
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

        {/* Dynamic Stretchable Elastic Cord (Single Accent Color) */}
        <path
          d={curvePath}
          fill="none"
          stroke={accentColor}
          strokeWidth={Math.max(2, 3.6 - Math.abs(lineDy) * 0.045)} // Thins realistically as stretched
          strokeLinecap="round"
          filter={isDeflected ? "url(#elastic-line-glow)" : undefined}
          className="transition-opacity duration-150"
          style={{ opacity: isDeflected ? 1 : 0.8 }}
        />
      </svg>

      {/* Floating Morphing Geometry with True Physical Squash & Stretch */}
      <motion.div
        animate={{
          borderRadius: currentShape.borderRadius,
        }}
        transition={{
          borderRadius: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
        }}
        style={{
          width: shapeSize,
          height: shapeSize,
          top: shapeY - shapeSize / 2,
          left: `calc(50% - ${shapeSize / 2}px)`,
          position: "absolute",
          backgroundColor: accentColor,
          transform: `scale(${shapeScaleX}, ${shapeScaleY}) rotate(${shapeIndex * 45}deg)`,
          boxShadow: `0 6px 18px -2px ${theme === "google" ? "rgba(37,99,235,0.45)" : "rgba(16,185,129,0.38)"}`,
        }}
        className="flex items-center justify-center pointer-events-none z-10 transition-shadow duration-200"
      >
        {/* Core highlight dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-2xs" />
      </motion.div>

      {/* Breakthrough Elastic Shockwave Ring in Single Accent Color */}
      <AnimatePresence>
        {isBreached && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.85 }}
            animate={{ scale: 2.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            style={{
              width: shapeSize,
              height: shapeSize,
              top: centerY - shapeSize / 2,
              left: `calc(50% - ${shapeSize / 2}px)`,
              borderColor: accentColor,
            }}
            className="absolute rounded-full border-2 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

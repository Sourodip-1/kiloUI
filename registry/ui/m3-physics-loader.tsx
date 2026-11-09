"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface M3PhysicsLoaderProps {
  /**
   * Loader style:
   * - "shape-morph": Google-style rounded edges random shape morphing & spinning
   * - "elastic-line": Horizontal stretchable elastic membrane with punch-through resistance & shape morphing
   */
  variant?: "shape-morph" | "elastic-line";
  /** Color theme: "google" (Google Blue, Red, Yellow, Green) or "minimal" (SaaS Monochrome & Emerald) */
  theme?: "google" | "minimal";
  /** Overall size in pixels */
  size?: number;
  /** Speed multiplier (default 1) */
  speed?: number;
  /** Elastic resistance tension for the elastic-line variant (0.5 to 2, default 1) */
  resistance?: number;
  /** Additional CSS class names */
  className?: string;
}

// ── Google M3 Morphable Shapes ──
// Path definitions for 48x48 viewport
const MORPH_SHAPES = [
  // 0. Smooth Circle
  {
    name: "circle",
    d: "M 24,4 A 20,20 0 1,1 23.99,4 Z",
    borderRadius: "50%",
  },
  // 1. 4-Lobed Flower / Quatrefoil (Android 14 style)
  {
    name: "flower",
    d: "M 24,4 C 30,4 34,12 37,15 C 40,18 48,22 48,28 C 48,34 40,38 37,41 C 34,44 30,52 24,52 C 18,52 14,44 11,41 C 8,38 0,34 0,28 C 0,22 8,18 11,15 C 14,12 18,4 24,4 Z",
    borderRadius: "32% 68% 30% 70% / 60% 40% 60% 40%",
  },
  // 2. Squircle (Superellipse)
  {
    name: "squircle",
    d: "M 12,6 C 24,4 36,4 40,8 C 44,12 44,24 44,36 C 44,40 40,44 36,44 C 24,44 12,44 8,40 C 4,36 4,24 4,12 C 4,8 8,4 12,6 Z",
    borderRadius: "26%",
  },
  // 3. Rounded 8-Pointed Star / Petal (Google Material You)
  {
    name: "star",
    d: "M 24,3 C 27,11 31,13 39,15 C 37,23 39,27 45,33 C 39,37 37,41 39,49 C 31,47 27,49 24,57 C 21,49 17,47 9,49 C 11,41 9,37 3,33 C 9,27 11,23 9,15 C 17,13 21,11 24,3 Z",
    borderRadius: "45% 55% 60% 40% / 50% 65% 35% 50%",
  },
  // 4. Rounded Shield / Triangle
  {
    name: "shield",
    d: "M 24,6 C 36,6 42,16 42,28 C 42,40 32,48 24,50 C 16,48 6,40 6,28 C 6,16 12,6 24,6 Z",
    borderRadius: "40% 40% 50% 50% / 30% 30% 70% 70%",
  },
];

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
const MINIMAL_COLORS = ["#10b981", "#34d399", "#ffffff", "#059669"];

export function M3PhysicsLoader({
  variant = "shape-morph",
  theme = "google",
  size = 64,
  speed = 1,
  resistance = 1,
  className,
}: M3PhysicsLoaderProps) {
  const colors = theme === "google" ? GOOGLE_COLORS : MINIMAL_COLORS;

  // ══════════════════════════════════════════════════════════════════
  // VARIANT 1: Random Rounded Edges Shape Morph Spin Loader
  // ══════════════════════════════════════════════════════════════════
  const [shapeIndex, setShapeIndex] = React.useState(0);
  const [colorIndex, setColorIndex] = React.useState(0);

  React.useEffect(() => {
    if (variant !== "shape-morph") return;

    const intervalTime = Math.max(700, 1400 / speed);
    const timer = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % MORPH_SHAPES.length);
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [variant, speed, colors.length]);

  if (variant === "shape-morph") {
    const currentShape = MORPH_SHAPES[shapeIndex];
    const currentColor = colors[colorIndex];

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
            duration: 3.2 / speed,
            ease: "linear",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Animated Morphing Organic Shape */}
          <motion.div
            layout
            animate={{
              borderRadius: currentShape.borderRadius,
              backgroundColor: currentColor,
              scale: [0.92, 1.06, 0.96],
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
              mass: 0.8,
            }}
            style={{
              width: size * 0.72,
              height: size * 0.72,
              boxShadow:
                theme === "google"
                  ? `0 6px 20px -2px ${currentColor}44`
                  : "0 6px 20px -2px rgba(16,185,129,0.35)",
            }}
            className="flex items-center justify-center cursor-default transition-shadow"
          >
            {/* Center soft inner core dot for depth */}
            <motion.div
              animate={{
                scale: [0.8, 1.2, 0.9],
                opacity: [0.4, 0.75, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6 / speed,
                ease: "easeInOut",
              }}
              className="w-2.5 h-2.5 rounded-full bg-white/70 backdrop-blur-xs"
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
      theme={theme}
      speed={speed}
      resistance={resistance}
      className={className}
    />
  );
}

// ── Elastic Line Punch-Through Physics Engine Sub-Component ──
function ElasticLinePhysicsEngine({
  size,
  theme,
  speed,
  resistance,
  className,
}: {
  size: number;
  theme: "google" | "minimal";
  speed: number;
  resistance: number;
  className?: string;
}) {
  const containerWidth = Math.max(size * 2.2, 180);
  const containerHeight = Math.max(size * 1.6, 130);
  const centerY = containerHeight / 2;

  // Elastic Line displacement state: dy represents the center stretch
  const [lineDy, setLineDy] = React.useState(0);
  // Shape position state: Y coordinate from top
  const [shapeY, setShapeY] = React.useState(centerY - 45);
  // Shape morphology index
  const [shapeIndex, setShapeIndex] = React.useState(0);
  // Shape color index
  const [colorIndex, setColorIndex] = React.useState(0);
  // Membrane breakthrough burst trigger
  const [isBreached, setIsBreached] = React.useState(false);

  const colors = theme === "google" ? GOOGLE_COLORS : MINIMAL_COLORS;

  React.useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    let prevCycleStage = -1;

    // Full loop duration in seconds
    const duration = 2.4 / speed;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = (elapsed % duration) / duration; // 0 to 1

      // ── Physics Cycle Breakdown ──
      // 0.00 - 0.20: Shape drops from top apex toward the line
      // 0.20 - 0.40: Contact! Shape pushes down on line, stretching with elastic resistance
      // 0.40 - 0.48: PUNCH-THROUGH! Snaps past, shape morphs, line recoils upward with damped oscillation
      // 0.48 - 0.50: Reaches bottom apex
      // 0.50 - 0.70: Shape travels up towards the line
      // 0.70 - 0.90: Contact from below! Shape pushes up on line, line stretches upward
      // 0.90 - 0.98: PUNCH-THROUGH UP! Snaps past, shape morphs again, line recoils
      // 0.98 - 1.00: Reaches top apex

      let currentShapeY = centerY;
      let currentLineDy = 0;
      const maxStretch = 26 * Math.min(1.6, Math.max(0.6, resistance));

      if (progress < 0.2) {
        // Approaching line from top
        const p = progress / 0.2;
        currentShapeY = (centerY - 45) + p * 35; // from -45 to -10
        currentLineDy = 0;
      } else if (progress < 0.4) {
        // Pushing line down: elastic resistance builds
        const p = (progress - 0.2) / 0.2;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currentLineDy = easeStretch * maxStretch;
        currentShapeY = centerY - 10 + currentLineDy;
      } else if (progress < 0.5) {
        // Break through! Line recoils with damped oscillation
        const p = (progress - 0.4) / 0.1;
        // Damped harmonic recoil: e^(-5p) * cos(18p)
        const recoil = Math.exp(-6 * p) * Math.cos(p * Math.PI * 4.5);
        currentLineDy = -recoil * (maxStretch * 0.7);
        currentShapeY = centerY + 16 + p * 32; // snaps downward to apex

        // Trigger morph on breach
        if (prevCycleStage !== 1) {
          prevCycleStage = 1;
          setIsBreached(true);
          setTimeout(() => setIsBreached(false), 200);
          setShapeIndex((s) => (s + 1) % MORPH_SHAPES.length);
          setColorIndex((c) => (c + 1) % colors.length);
        }
      } else if (progress < 0.7) {
        // Rising from bottom towards the line
        const p = (progress - 0.5) / 0.2;
        currentShapeY = (centerY + 48) - p * 38; // from +48 to +10
        currentLineDy = 0;
      } else if (progress < 0.9) {
        // Pushing line up: elastic resistance builds upwards
        const p = (progress - 0.7) / 0.2;
        const easeStretch = Math.sin((p * Math.PI) / 2);
        currentLineDy = -easeStretch * maxStretch;
        currentShapeY = centerY + 10 + currentLineDy;
      } else {
        // Break through upwards! Line recoils with damped oscillation
        const p = (progress - 0.9) / 0.1;
        const recoil = Math.exp(-6 * p) * Math.cos(p * Math.PI * 4.5);
        currentLineDy = recoil * (maxStretch * 0.7);
        currentShapeY = centerY - 16 - p * 29; // snaps upward to top apex

        // Trigger morph on upward breach
        if (prevCycleStage !== 2) {
          prevCycleStage = 2;
          setIsBreached(true);
          setTimeout(() => setIsBreached(false), 200);
          setShapeIndex((s) => (s + 1) % MORPH_SHAPES.length);
          setColorIndex((c) => (c + 1) % colors.length);
        }
      }

      setShapeY(currentShapeY);
      setLineDy(currentLineDy);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [speed, resistance, centerY, colors.length]);

  const currentShape = MORPH_SHAPES[shapeIndex];
  const currentColor = colors[colorIndex];
  const shapeSize = Math.max(26, size * 0.44);

  // Line endpoints: anchored at left (16) and right (width - 16)
  const lineStartX = 18;
  const lineEndX = containerWidth - 18;
  const lineMidX = containerWidth / 2;

  // SVG Quadratic bezier curve for the flexible rubber membrane
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
        <defs>
          {/* Elastic membrane neon glow */}
          <linearGradient id="elastic-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.3" />
            <stop offset="50%" stopColor={currentColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#34A853" stopOpacity="0.3" />
          </linearGradient>

          <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Anchor point pins at left and right */}
        <circle cx={lineStartX} cy={centerY} r={3.5} fill="currentColor" className="text-[var(--border-hover)]" />
        <circle cx={lineEndX} cy={centerY} r={3.5} fill="currentColor" className="text-[var(--border-hover)]" />

        {/* Baseline ghost track */}
        <line
          x1={lineStartX}
          y1={centerY}
          x2={lineEndX}
          y2={centerY}
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="2 3"
          className="text-[var(--border)] opacity-35"
        />

        {/* Dynamic Stretchable Elastic Line */}
        <path
          d={curvePath}
          fill="none"
          stroke={theme === "google" ? "url(#elastic-line-grad)" : "var(--accent-green)"}
          strokeWidth={Math.max(2.5, 4 - Math.abs(lineDy) * 0.05)} // Line thins as it stretches!
          strokeLinecap="round"
          filter={Math.abs(lineDy) > 12 ? "url(#line-glow)" : undefined}
          className="transition-colors duration-200"
        />
      </svg>

      {/* Floating Morphing Geometry with Spring Physics */}
      <motion.div
        animate={{
          borderRadius: currentShape.borderRadius,
          backgroundColor: currentColor,
          scale: isBreached ? [1.15, 0.95, 1] : 1,
          rotate: isBreached ? [0, 45, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 24,
        }}
        style={{
          width: shapeSize,
          height: shapeSize,
          top: shapeY - shapeSize / 2,
          left: `calc(50% - ${shapeSize / 2}px)`,
          position: "absolute",
          boxShadow: `0 4px 16px -2px ${currentColor}55`,
        }}
        className="flex items-center justify-center pointer-events-none z-10 transition-shadow"
      >
        {/* Core highlight dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-white/85 shadow-xs" />
      </motion.div>

      {/* Breakthrough Elastic Shockwave Ring */}
      <AnimatePresence>
        {isBreached && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              width: shapeSize,
              height: shapeSize,
              top: centerY - shapeSize / 2,
              left: `calc(50% - ${shapeSize / 2}px)`,
              borderColor: currentColor,
            }}
            className="absolute rounded-full border-2 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

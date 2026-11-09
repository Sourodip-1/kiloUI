"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface M3LoadingIndicatorProps {
  /**
   * Official Material 3 Expressive Loading Indicator style:
   * - "uncontained": The standalone shape-morphing indicator
   * - "contained": Contained inside a rounded surface container (e.g. for pull-to-refresh)
   */
  variant?: "uncontained" | "contained";
  /** Value from 0 to 100 for determinate mode; undefined for indeterminate morphing loop */
  value?: number;
  /** Size in pixels (standard M3 is 48) */
  size?: number;
  /**
   * Single accent color:
   * - "accent": var(--accent-green)
   * - "google": Google Material Blue (#0b57d0 / #2563eb)
   * - "monochrome": currentColor / var(--text-primary)
   * - or any single custom hex color.
   * Strictly NO GLOW.
   */
  color?: "accent" | "google" | "monochrome" | string;
  /** Animation speed multiplier (1 is normal) */
  speed?: number;
  /** Container shape for the contained variant */
  containerShape?: "squircle" | "circle" | "rounded";
  /** Additional CSS class names */
  className?: string;
}

// ── Official Material 3 Expressive Morphing Polygons ──
// Sourced from Jetpack Compose Material 3 Expressive: LoadingIndicatorDefaults.IndeterminateIndicatorPolygons
// (SoftBurst, Cookie9Sided, Pentagon, Pill, Sunny, Cookie4Sided, Squircle)
const M3_EXPRESSIVE_SHAPES = [
  // 1. SoftBurst / Star
  {
    name: "SoftBurst",
    borderRadius: "45% 55% 60% 40% / 50% 65% 35% 50%",
    rotation: 0,
  },
  // 2. Cookie 9-Sided
  {
    name: "Cookie9Sided",
    borderRadius: "38% 62% 42% 58% / 55% 45% 55% 45%",
    rotation: 40,
  },
  // 3. Pentagon (Rounded 5-sided)
  {
    name: "Pentagon",
    borderRadius: "50% 50% 30% 30% / 40% 40% 60% 60%",
    rotation: 72,
  },
  // 4. Pill / Capsule
  {
    name: "Pill",
    borderRadius: "9999px",
    rotation: 135,
  },
  // 5. Sunny (8-lobed rounded burst)
  {
    name: "Sunny",
    borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%",
    rotation: 180,
  },
  // 6. Cookie 4-Sided / Quatrefoil
  {
    name: "Cookie4Sided",
    borderRadius: "30% 70% 32% 68% / 65% 35% 65% 35%",
    rotation: 225,
  },
  // 7. Squircle (Superellipse)
  {
    name: "Squircle",
    borderRadius: "28%",
    rotation: 270,
  },
];

export function M3LoadingIndicator({
  variant = "uncontained",
  value,
  size = 48,
  color = "accent",
  speed = 1,
  containerShape = "squircle",
  className,
}: M3LoadingIndicatorProps) {
  const isDeterminate = typeof value === "number";
  const [shapeIndex, setShapeIndex] = React.useState(0);

  // Resolve single flat accent color (NO GLOW)
  const resolvedColor = React.useMemo(() => {
    if (color === "accent") return "var(--accent-green)";
    if (color === "google") return "#2563eb";
    if (color === "monochrome") return "currentColor";
    return color;
  }, [color]);

  // Indeterminate continuous morph progression
  React.useEffect(() => {
    if (isDeterminate) return;

    const intervalTime = Math.max(650, 1100 / speed);
    const timer = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % M3_EXPRESSIVE_SHAPES.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isDeterminate, speed]);

  // Determinate mode maps progress (0..100) to polygon sequence
  const activeShape = isDeterminate
    ? M3_EXPRESSIVE_SHAPES[
        Math.min(
          M3_EXPRESSIVE_SHAPES.length - 1,
          Math.floor(((value || 0) / 100) * M3_EXPRESSIVE_SHAPES.length)
        )
      ]
    : M3_EXPRESSIVE_SHAPES[shapeIndex];

  // Indicator core dimensions (M3 guidelines: active shape is ~70-75% of container)
  const indicatorSize = variant === "contained" ? size * 0.62 : size;

  const indicatorContent = (
    <div
      role="progressbar"
      aria-label="Material 3 Loading Indicator"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: indicatorSize, height: indicatorSize }}
      className="relative flex items-center justify-center select-none shrink-0"
    >
      {/* Continuous 360 rotation wrapper for indeterminate mode */}
      <motion.div
        animate={isDeterminate ? { rotate: activeShape.rotation } : { rotate: 360 }}
        transition={
          isDeterminate
            ? { duration: 0.4, ease: "easeOut" }
            : { repeat: Infinity, duration: 3.2 / speed, ease: "linear" }
        }
        className="w-full h-full flex items-center justify-center"
      >
        {/* Flat Morphing Organic Shape — Strictly NO GLOW */}
        <motion.div
          animate={{
            borderRadius: activeShape.borderRadius,
            scale: [0.95, 1.05],
          }}
          transition={{
            borderRadius: { duration: 0.55 / speed, ease: [0.34, 1.56, 0.64, 1] },
            scale: {
              repeat: isDeterminate ? 0 : Infinity,
              repeatType: "reverse",
              duration: 0.75 / speed,
              ease: "easeInOut",
            },
          }}
          style={{
            width: indicatorSize,
            height: indicatorSize,
            backgroundColor: resolvedColor,
          }}
          className="flex items-center justify-center cursor-default"
        >
          {/* Subtle center tactile pip for Material 3 token depth */}
          <div className="w-2 h-2 rounded-full bg-white/90 dark:bg-black/40" />
        </motion.div>
      </motion.div>
    </div>
  );

  if (variant === "contained") {
    const containerRadiusClass =
      containerShape === "circle"
        ? "rounded-full"
        : containerShape === "rounded"
        ? "rounded-xl"
        : "rounded-2xl";

    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "relative flex items-center justify-center bg-[var(--surface-secondary)] border border-[var(--border)] select-none shrink-0",
          containerRadiusClass,
          className
        )}
      >
        {indicatorContent}
      </div>
    );
  }

  return <div className={cn("inline-flex shrink-0", className)}>{indicatorContent}</div>;
}

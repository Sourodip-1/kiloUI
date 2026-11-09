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
   * - "google": Google Material Royal Blue (#2563eb)
   * - "monochrome": currentColor / var(--text-primary)
   * - or any single custom hex color.
   * Strictly flat vector, NO GLOW.
   */
  color?: "accent" | "google" | "monochrome" | string;
  /** Animation speed multiplier (1 is normal) */
  speed?: number;
  /** Container shape for the contained variant */
  containerShape?: "squircle" | "circle" | "rounded";
  /** Additional CSS class names */
  className?: string;
}

// ── Seamless Morphing Shapes (24-point C^1 continuous cubic spline) ──
// All shapes share the EXACT same 24-segment cubic bezier command structure,
// enabling Motion to interpolate coordinates seamlessly without any popping or stutter.
// Sequence: Circle -> Rounded Square -> Rounded Edge Pill -> Clover -> 8-Point Star -> Pentagon
export const M3_MORPH_SHAPES = [
  // 1. Smooth Circle
  {
    name: "circle",
    label: "Circle",
    d: "M 50.00,10.00 C 53.45,10.00 57.02,10.47 60.35,11.36 C 63.69,12.26 67.01,13.63 70.00,15.36 C 72.99,17.08 75.84,19.28 78.28,21.72 C 80.72,24.16 82.92,27.01 84.64,30.00 C 86.37,32.99 87.74,36.31 88.64,39.65 C 89.53,42.98 90.00,46.55 90.00,50.00 C 90.00,53.45 89.53,57.02 88.64,60.35 C 87.74,63.69 86.37,67.01 84.64,70.00 C 82.92,72.99 80.72,75.84 78.28,78.28 C 75.84,80.72 72.99,82.92 70.00,84.64 C 67.01,86.37 63.69,87.74 60.35,88.64 C 57.02,89.53 53.45,90.00 50.00,90.00 C 46.55,90.00 42.98,89.53 39.65,88.64 C 36.31,87.74 32.99,86.37 30.00,84.64 C 27.01,82.92 24.16,80.72 21.72,78.28 C 19.28,75.84 17.08,72.99 15.36,70.00 C 13.63,67.01 12.26,63.69 11.36,60.35 C 10.47,57.02 10.00,53.45 10.00,50.00 C 10.00,46.55 10.47,42.98 11.36,39.65 C 12.26,36.31 13.63,32.99 15.36,30.00 C 17.08,27.01 19.28,24.16 21.72,21.72 C 24.16,19.28 27.01,17.08 30.00,15.36 C 32.99,13.63 36.31,12.26 39.65,11.36 C 42.98,10.47 46.55,10.00 50.00,10.00 Z",
  },
  // 2. Rounded Square (Superellipse Squircle)
  {
    name: "rounded-square",
    label: "Rounded Square",
    d: "M 50.00,10.00 C 53.56,10.00 56.98,9.86 60.69,10.10 C 64.40,10.33 68.56,10.26 72.28,11.41 C 75.99,12.57 80.28,14.29 82.99,17.01 C 85.71,19.72 87.43,24.01 88.59,27.72 C 89.74,31.44 89.67,35.60 89.90,39.31 C 90.14,43.02 90.00,46.44 90.00,50.00 C 90.00,53.56 90.14,56.98 89.90,60.69 C 89.67,64.40 89.74,68.56 88.59,72.28 C 87.43,75.99 85.71,80.28 82.99,82.99 C 80.28,85.71 75.99,87.43 72.28,88.59 C 68.56,89.74 64.40,89.67 60.69,89.90 C 56.98,90.14 53.56,90.00 50.00,90.00 C 46.44,90.00 43.02,90.14 39.31,89.90 C 35.60,89.67 31.44,89.74 27.72,88.59 C 24.01,87.43 19.72,85.71 17.01,82.99 C 14.29,80.28 12.57,75.99 11.41,72.28 C 10.26,68.56 10.33,64.40 10.10,60.69 C 9.86,56.98 10.00,53.56 10.00,50.00 C 10.00,46.44 9.86,43.02 10.10,39.31 C 10.33,35.60 10.26,31.44 11.41,27.72 C 12.57,24.01 14.29,19.72 17.01,17.01 C 19.72,14.29 24.01,12.57 27.72,11.41 C 31.44,10.26 35.60,10.33 39.31,10.10 C 43.02,9.86 46.44,10.00 50.00,10.00 Z",
  },
  // 3. Rounded Edge Pill (Capsule / Stadium)
  {
    name: "pill",
    label: "Rounded Pill",
    d: "M 50.00,10.00 C 52.70,10.00 55.77,10.39 58.11,11.14 C 60.44,11.89 62.26,13.04 64.03,14.52 C 65.80,16.00 67.37,17.86 68.73,20.03 C 70.09,22.21 71.25,24.72 72.18,27.55 C 73.10,30.38 73.82,33.29 74.29,37.03 C 74.76,40.77 75.00,45.68 75.00,50.00 C 75.00,54.32 74.76,59.23 74.29,62.97 C 73.82,66.71 73.10,69.62 72.18,72.45 C 71.25,75.28 70.09,77.79 68.73,79.97 C 67.37,82.14 65.80,84.00 64.03,85.48 C 62.26,86.96 60.44,88.11 58.11,88.86 C 55.77,89.61 52.70,90.00 50.00,90.00 C 47.30,90.00 44.23,89.61 41.89,88.86 C 39.56,88.11 37.74,86.96 35.97,85.48 C 34.20,84.00 32.63,82.14 31.27,79.97 C 29.91,77.79 28.75,75.28 27.82,72.45 C 26.90,69.62 26.18,66.71 25.71,62.97 C 25.24,59.23 25.00,54.32 25.00,50.00 C 25.00,45.68 25.24,40.77 25.71,37.03 C 26.18,33.29 26.90,30.38 27.82,27.55 C 28.75,24.72 29.91,22.21 31.27,20.03 C 32.63,17.86 34.20,16.00 35.97,14.52 C 37.74,13.04 39.56,11.89 41.89,11.14 C 44.23,10.39 47.30,10.00 50.00,10.00 Z",
  },
  // 4. 4-Lobed Clover / Quatrefoil (M3 Cookie 4)
  {
    name: "clover",
    label: "Clover (4-Lobed)",
    d: "M 50.00,10.00 C 53.04,10.00 56.98,13.03 59.11,16.00 C 61.24,18.97 61.87,24.61 62.80,27.83 C 63.73,31.05 63.15,33.73 64.71,35.29 C 66.27,36.85 68.95,36.27 72.17,37.20 C 75.39,38.13 81.03,38.76 84.00,40.89 C 86.97,43.02 90.00,46.96 90.00,50.00 C 90.00,53.04 86.97,56.98 84.00,59.11 C 81.03,61.24 75.39,61.87 72.17,62.80 C 68.95,63.73 66.27,63.15 64.71,64.71 C 63.15,66.27 63.73,68.95 62.80,72.17 C 61.87,75.39 61.24,81.03 59.11,84.00 C 56.98,86.97 53.04,90.00 50.00,90.00 C 46.96,90.00 43.02,86.97 40.89,84.00 C 38.76,81.03 38.13,75.39 37.20,72.17 C 36.27,68.95 36.85,66.27 35.29,64.71 C 33.73,63.15 31.05,63.73 27.83,62.80 C 24.61,61.87 18.97,61.24 16.00,59.11 C 13.03,56.98 10.00,53.04 10.00,50.00 C 10.00,46.96 13.03,43.02 16.00,40.89 C 18.97,38.76 24.61,38.13 27.83,37.20 C 31.05,36.27 33.73,36.85 35.29,35.29 C 36.85,33.73 36.27,31.05 37.20,27.83 C 38.13,24.61 38.76,18.97 40.89,16.00 C 43.02,13.03 46.96,10.00 50.00,10.00 Z",
  },
  // 5. 8-Point SoftBurst Star (Sunny)
  {
    name: "star",
    label: "8-Point Star",
    d: "M 50.00,10.00 C 52.52,10.00 55.12,19.34 57.56,21.79 C 59.99,24.25 61.15,24.73 64.60,24.71 C 68.05,24.70 76.50,19.93 78.28,21.72 C 80.07,23.50 75.30,31.95 75.29,35.40 C 75.27,38.85 75.75,40.01 78.21,42.44 C 80.66,44.88 90.00,47.48 90.00,50.00 C 90.00,52.52 80.66,55.12 78.21,57.56 C 75.75,59.99 75.27,61.15 75.29,64.60 C 75.30,68.05 80.07,76.50 78.28,78.28 C 76.50,80.07 68.05,75.30 64.60,75.29 C 61.15,75.27 59.99,75.75 57.56,78.21 C 55.12,80.66 52.52,90.00 50.00,90.00 C 47.48,90.00 44.88,80.66 42.44,78.21 C 40.01,75.75 38.85,75.27 35.40,75.29 C 31.95,75.30 23.50,80.07 21.72,78.28 C 19.93,76.50 24.70,68.05 24.71,64.60 C 24.73,61.15 24.25,59.99 21.79,57.56 C 19.34,55.12 10.00,52.52 10.00,50.00 C 10.00,47.48 19.34,44.88 21.79,42.44 C 24.25,40.01 24.73,38.85 24.71,35.40 C 24.70,31.95 19.93,23.50 21.72,21.72 C 23.50,19.93 31.95,24.70 35.40,24.71 C 38.85,24.73 40.01,24.25 42.44,21.79 C 44.88,19.34 47.48,10.00 50.00,10.00 Z",
  },
  // 6. Rounded Pentagon
  {
    name: "pentagon",
    label: "Rounded Pentagon",
    d: "M 50.00,16.80 C 52.86,14.69 57.24,11.34 60.29,11.59 C 63.34,11.84 66.67,15.25 68.30,18.30 C 69.93,21.36 69.18,26.92 70.08,29.92 C 70.97,32.93 71.37,34.51 73.65,36.34 C 75.93,38.18 81.04,38.68 83.77,40.95 C 86.49,43.23 90.00,46.98 90.00,50.00 C 90.00,53.02 86.49,56.77 83.77,59.05 C 81.04,61.32 75.93,61.82 73.65,63.66 C 71.37,65.49 70.97,67.07 70.08,70.08 C 69.18,73.08 69.93,78.64 68.30,81.70 C 66.67,84.75 63.34,88.16 60.29,88.41 C 57.24,88.66 52.86,85.31 50.00,83.20 C 47.14,81.09 45.59,76.96 43.11,75.72 C 40.62,74.49 38.43,75.62 35.10,75.81 C 31.77,76.00 26.28,77.92 23.12,76.88 C 19.97,75.83 16.73,72.67 16.15,69.54 C 15.57,66.42 18.39,61.39 19.63,58.14 C 20.87,54.88 23.60,52.71 23.60,50.00 C 23.60,47.29 20.87,45.12 19.63,41.86 C 18.39,38.61 15.57,33.58 16.15,30.46 C 16.73,27.33 19.97,24.17 23.12,23.12 C 26.28,22.08 31.77,24.00 35.10,24.19 C 38.43,24.38 40.62,25.51 43.11,24.28 C 45.59,23.04 47.14,18.91 50.00,16.80 Z",
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

  // Flat single accent color (NO GLOW)
  const resolvedColor = React.useMemo(() => {
    if (color === "accent") return "var(--accent-green)";
    if (color === "google") return "#2563eb";
    if (color === "monochrome") return "currentColor";
    return color;
  }, [color]);

  // Low-frequency interval to step between shapes (e.g. every 1.5s)
  // React only updates state ONCE every 1.5s — zero 60fps re-rendering!
  React.useEffect(() => {
    if (isDeterminate) return;
    const intervalMs = Math.max(800, 1500 / speed);
    const timer = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % M3_MORPH_SHAPES.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isDeterminate, speed]);

  const activeIndex = isDeterminate
    ? Math.min(
        M3_MORPH_SHAPES.length - 1,
        Math.floor(((value || 0) / 100) * M3_MORPH_SHAPES.length)
      )
    : shapeIndex;

  const currentShape = M3_MORPH_SHAPES[activeIndex];
  const svgSize = variant === "contained" ? size * 0.65 : size;

  const indicatorSvg = (
    <div
      role="progressbar"
      aria-label="Material 3 Expressive Loading Indicator"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: svgSize, height: svgSize }}
      className="relative flex items-center justify-center select-none shrink-0"
    >
      {/* Continuous GPU-composited 360 rotation wrapper (zero React re-render) */}
      <motion.div
        animate={isDeterminate ? { rotate: activeIndex * 60 } : { rotate: 360 }}
        transition={
          isDeterminate
            ? { duration: 0.5, ease: "easeOut" }
            : { repeat: Infinity, duration: 4.8 / speed, ease: "linear" }
        }
        className="w-full h-full flex items-center justify-center will-change-transform"
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 100 100"
          className="overflow-visible select-none"
        >
          {/* Seamless Path Morphing: Animates d-attribute smoothly via identical 24-C segment coordinates */}
          <motion.path
            animate={{ d: currentShape.d }}
            transition={{
              duration: 0.85 / speed,
              ease: [0.34, 1.56, 0.64, 1], // Fluid overshoot spring easing
            }}
            fill={resolvedColor}
          />
          {/* Subtle tactile pip in center */}
          <circle cx="50" cy="50" r="4.5" fill="rgba(255,255,255,0.85)" />
        </svg>
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
        {indicatorSvg}
      </div>
    );
  }

  return <div className={cn("inline-flex shrink-0", className)}>{indicatorSvg}</div>;
}

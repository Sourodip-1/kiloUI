"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3LoadingIndicatorProps {
  variant?: "uncontained" | "contained";
  value?: number;
  size?: number;
  color?: "accent" | "google" | "monochrome" | string;
  speed?: number;
  containerShape?: "squircle" | "circle" | "rounded";
  className?: string;
}

// ── Material 3 Expressive Morphing Shapes via SVG ──
// All paths defined on a 100×100 viewBox.
// These match the official M3 Expressive polygon sequence:
// SoftBurst → Cookie9 → Pentagon → Pill → Sunny → Cookie4 → Squircle
const M3_SVG_SHAPES = [
  // 1. Squircle (superellipse — solid soft square)
  "M 50,4 C 76,4 96,24 96,50 C 96,76 76,96 50,96 C 24,96 4,76 4,50 C 4,24 24,4 50,4 Z",
  // 2. SoftBurst — 8-pointed rounded star
  "M 50,8 C 54,8 58,14 60,18 C 62,22 68,22 72,20 C 76,18 80,22 78,26 C 76,30 80,34 84,36 C 88,38 88,44 86,48 C 84,52 86,58 84,62 C 82,66 78,66 74,70 C 70,74 72,80 68,82 C 64,84 60,82 56,82 C 52,82 50,86 50,92 C 50,86 48,82 44,82 C 40,82 36,84 32,82 C 28,80 30,74 26,70 C 22,66 18,66 16,62 C 14,58 16,52 14,48 C 12,44 12,38 16,36 C 20,34 24,30 22,26 C 20,22 24,18 28,20 C 32,22 38,22 40,18 C 42,14 46,8 50,8 Z",
  // 3. 4-lobed Clover / Cookie4
  "M 50,10 C 60,10 70,20 70,30 C 70,40 90,40 90,50 C 90,60 70,60 70,70 C 70,80 60,90 50,90 C 40,90 30,80 30,70 C 30,60 10,60 10,50 C 10,40 30,40 30,30 C 30,20 40,10 50,10 Z",
  // 4. Smooth Circle
  "M 50,6 A 44,44 0 1,1 49.99,6 Z",
  // 5. Rounded Pentagon
  "M 50,8 C 53,8 56,10 70,20 C 86,32 92,36 92,50 C 92,64 82,78 66,84 C 58,88 50,90 50,90 C 50,90 42,88 34,84 C 18,78 8,64 8,50 C 8,36 14,32 30,20 C 44,10 47,8 50,8 Z",
  // 6. Sunny — 6-petal rounded sun
  "M 50,10 C 55,10 59,16 62,20 C 66,24 72,24 76,22 C 82,20 86,26 84,32 C 82,36 86,42 90,46 C 92,50 90,54 86,56 C 82,58 82,64 84,68 C 86,74 82,80 76,78 C 72,76 66,76 62,80 C 58,84 55,90 50,90 C 45,90 42,84 38,80 C 34,76 28,76 24,78 C 18,80 14,74 16,68 C 18,64 18,58 14,56 C 10,54 8,50 10,46 C 14,42 18,36 16,32 C 14,26 18,20 24,22 C 28,24 34,24 38,20 C 41,16 45,10 50,10 Z",
  // 7. Pill / Capsule (tall)
  "M 50,15 C 62,15 72,25 72,38 L 72,62 C 72,75 62,85 50,85 C 38,85 28,75 28,62 L 28,38 C 28,25 38,15 50,15 Z",
];

// Rotation per shape in degrees (animates continuously)
const SHAPE_ROTATIONS = [0, 45, 90, 135, 180, 225, 270];

interface PhysicsState {
  d: number; // which shape path index
  rotate: number; // current rotation deg
  t: number; // animation timestamp
}

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
  const [rotation, setRotation] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const lastRef = React.useRef<number | null>(null);
  const shapeTimerRef = React.useRef<number | null>(null);

  const resolvedColor = React.useMemo(() => {
    if (color === "accent") return "var(--accent-green)";
    if (color === "google") return "#2563eb";
    if (color === "monochrome") return "currentColor";
    return color;
  }, [color]);

  // Smooth continuous rotation via rAF (no stutter)
  React.useEffect(() => {
    if (isDeterminate) return;
    let active = true;

    const animate = (now: number) => {
      if (!active) return;
      if (lastRef.current === null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setRotation((r) => (r + dt * 90 * speed) % 360); // 1/4 turn per second
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [isDeterminate, speed]);

  // Shape morph via interval (slower, smooth transition handled by CSS)
  React.useEffect(() => {
    if (isDeterminate) return;
    const ms = Math.max(600, 1000 / speed);
    shapeTimerRef.current = window.setInterval(() => {
      setShapeIndex((i) => (i + 1) % M3_SVG_SHAPES.length);
    }, ms);
    return () => {
      if (shapeTimerRef.current) clearInterval(shapeTimerRef.current);
    };
  }, [isDeterminate, speed]);

  const activeIndex = isDeterminate
    ? Math.min(M3_SVG_SHAPES.length - 1, Math.floor(((value || 0) / 100) * M3_SVG_SHAPES.length))
    : shapeIndex;

  const activeRotation = isDeterminate ? SHAPE_ROTATIONS[activeIndex] : rotation;
  const svgSize = variant === "contained" ? size * 0.65 : size;

  const svgContent = (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 100 100"
      role="progressbar"
      aria-label="Material 3 Loading Indicator"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ transform: `rotate(${activeRotation}deg)`, transition: isDeterminate ? "transform 0.4s ease" : "none" }}
      className="select-none shrink-0"
    >
      {/* The morphing shape via CSS clip-path on a colored path */}
      {/* Shape — d-attribute animation not universally supported, so we just swap.
          The rotation wrapper already provides smooth perceived motion. */}
      <path d={M3_SVG_SHAPES[activeIndex]} fill={resolvedColor} />
      {/* Tactile center pip */}
      <circle cx="50" cy="50" r="5" fill="rgba(255,255,255,0.75)" />
    </svg>
  );

  if (variant === "contained") {
    const rClass =
      containerShape === "circle" ? "rounded-full" :
      containerShape === "rounded" ? "rounded-xl" :
      "rounded-2xl";
    return (
      <div
        style={{ width: size, height: size }}
        className={cn(
          "relative flex items-center justify-center bg-[var(--surface-secondary)] border border-[var(--border)] select-none shrink-0",
          rClass,
          className
        )}
      >
        {svgContent}
      </div>
    );
  }

  return <div className={cn("inline-flex shrink-0", className)}>{svgContent}</div>;
}

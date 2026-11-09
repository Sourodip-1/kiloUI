"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3SquigglyLoaderProps {
  /** Variant of the loader: horizontal bar or circular ring */
  variant?: "horizontal" | "circular";
  /** Value from 0 to 100 for determinate mode, undefined for indeterminate flowing animation */
  value?: number;
  /** Number of wave ripples / squiggles */
  squiggles?: number;
  /** Height / amplitude of the wave in pixels */
  amplitude?: number;
  /** Stroke thickness in pixels */
  strokeWidth?: number;
  /** Outer size in pixels (diameter for circular, width for horizontal) */
  size?: number;
  /** Width for horizontal variant (defaults to 100% or size) */
  width?: number | string;
  /** Color theme: "google" (Google 4-color gradient), "accent" (Emerald), "monochrome", or custom hex */
  color?: "google" | "accent" | "monochrome" | string;
  /** Animation speed multiplier (1 is normal) */
  speed?: number;
  /** Optional glow effect */
  glow?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export function M3SquigglyLoader({
  variant = "circular",
  value,
  squiggles = 14,
  amplitude = 3.5,
  strokeWidth = 3.5,
  size = 56,
  width,
  color = "google",
  speed = 1,
  glow = false,
  className,
}: M3SquigglyLoaderProps) {
  const isDeterminate = typeof value === "number";
  const [phase, setPhase] = React.useState(0);
  const animFrameRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);

  // Smooth continuous wave phase progression
  React.useEffect(() => {
    let active = true;

    const animate = (time: number) => {
      if (!active) return;
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setPhase((prev) => (prev + delta * 3.5 * speed) % (Math.PI * 20));
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [speed]);

  // Unique ID for SVG gradients
  const gradientId = React.useId();

  // ── Circular Squiggly Wave Generator ──
  if (variant === "circular") {
    const center = size / 2;
    const baseRadius = center - amplitude - strokeWidth;
    const numPoints = Math.max(72, squiggles * 10);
    const progressFactor = isDeterminate ? Math.min(1, Math.max(0, (value || 0) / 100)) : 1;

    // Generate circular sinusoidal path points
    const points: string[] = [];
    const totalAngle = isDeterminate ? Math.PI * 2 * progressFactor : Math.PI * 1.85;
    const startAngle = isDeterminate ? -Math.PI / 2 : phase * 0.8;

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      if (t > progressFactor && isDeterminate) break;

      const angle = startAngle + t * totalAngle;
      // Wavy radius: r(theta) = R0 + A * sin(N * theta - phase)
      const waveOffset = Math.sin(angle * squiggles - phase * 2.2) * amplitude;
      const r = baseRadius + waveOffset;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);

      if (i === 0) {
        points.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
      } else {
        points.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
    }

    const pathData = points.join(" ");

    return (
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: size, height: size }}
        className={cn(
          "relative inline-flex items-center justify-center select-none shrink-0",
          glow && "drop-shadow-[0_0_8px_rgba(66,133,244,0.45)]",
          className
        )}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          <defs>
            {/* Google 4-color gradient */}
            <linearGradient id={`${gradientId}-google`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="35%" stopColor="#EA4335" />
              <stop offset="70%" stopColor="#FBBC05" />
              <stop offset="100%" stopColor="#34A853" />
            </linearGradient>

            {/* Accent Emerald gradient */}
            <linearGradient id={`${gradientId}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Background guide track */}
          <circle
            cx={center}
            cy={center}
            r={baseRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.4}
            strokeDasharray="2 3"
            className="text-[var(--border)] opacity-40"
          />

          {/* Active Squiggly Path */}
          <path
            d={pathData}
            fill="none"
            stroke={
              color === "google"
                ? `url(#${gradientId}-google)`
                : color === "accent"
                ? `url(#${gradientId}-accent)`
                : color === "monochrome"
                ? "currentColor"
                : color
            }
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(color === "monochrome" && "text-[var(--text-primary)]")}
          />
        </svg>

        {isDeterminate && (
          <span className="absolute font-mono text-[10px] font-bold text-[var(--text-primary)]">
            {Math.round(value || 0)}%
          </span>
        )}
      </div>
    );
  }

  // ── Horizontal Squiggly Wave Generator ──
  const height = Math.max(24, amplitude * 3 + strokeWidth * 2);
  const containerWidth = typeof width === "number" ? width : 240;
  const numSteps = Math.max(60, squiggles * 8);
  const stepX = containerWidth / numSteps;
  const centerY = height / 2;

  const points: string[] = [];
  const progressPercent = isDeterminate ? Math.min(100, Math.max(0, value || 0)) : 100;
  const activeWidth = (containerWidth * progressPercent) / 100;

  for (let i = 0; i <= numSteps; i++) {
    const x = i * stepX;
    if (isDeterminate && x > activeWidth) break;

    // Horizontal sine wave: y(x) = Y0 + A * sin(2*PI * squiggles * (x / W) - phase)
    const waveY =
      centerY +
      Math.sin((x / containerWidth) * Math.PI * 2 * squiggles - phase * 2.5) * amplitude;

    if (i === 0) {
      points.push(`M ${x.toFixed(2)} ${waveY.toFixed(2)}`);
    } else {
      points.push(`L ${x.toFixed(2)} ${waveY.toFixed(2)}`);
    }
  }

  const squigglyPath = points.join(" ");

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: width || "100%", height }}
      className={cn(
        "relative flex items-center select-none overflow-hidden",
        glow && "drop-shadow-[0_0_8px_rgba(66,133,244,0.35)]",
        className
      )}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${containerWidth} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={`${gradientId}-h-google`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="35%" stopColor="#EA4335" />
            <stop offset="70%" stopColor="#FBBC05" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>

          <linearGradient id={`${gradientId}-h-accent`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Inactive flat track when in determinate mode */}
        {isDeterminate && progressPercent < 100 && (
          <line
            x1={activeWidth}
            y1={centerY}
            x2={containerWidth}
            y2={centerY}
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.75}
            strokeLinecap="round"
            className="text-[var(--border)] opacity-50"
          />
        )}

        {/* Active Squiggly Wave Path */}
        <path
          d={squigglyPath}
          fill="none"
          stroke={
            color === "google"
              ? `url(#${gradientId}-h-google)`
              : color === "accent"
              ? `url(#${gradientId}-h-accent)`
              : color === "monochrome"
              ? "currentColor"
              : color
          }
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(color === "monochrome" && "text-[var(--text-primary)]")}
        />
      </svg>
    </div>
  );
}

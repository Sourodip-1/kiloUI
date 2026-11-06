import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual animation style: shimmer (specular beam sweep), pulse (gentle breath), wave (gradient ripple), glow (accent pulse), or none */
  variant?: "shimmer" | "pulse" | "wave" | "glow" | "none";
  /** Shape geometry: rounded (default rounded-md), circular (1:1 avatar), pill (capsule tag/button), text (compact line), card */
  shape?: "rounded" | "circular" | "pill" | "text" | "card";
  /** Animation speed multiplier */
  speed?: "slow" | "normal" | "fast";
  /** Optional theme accent glow highlight */
  accentGlow?: boolean;
  /** Custom width override */
  width?: string | number;
  /** Custom height override */
  height?: string | number;
}

const shapeStyles: Record<NonNullable<SkeletonProps["shape"]>, string> = {
  rounded: "rounded-md",
  circular: "rounded-full aspect-square shrink-0",
  pill: "rounded-full",
  text: "rounded-xs h-3.5 w-full my-0.5",
  card: "rounded-xl border border-[var(--border)]",
};

const speedDurations: Record<NonNullable<SkeletonProps["speed"]>, { shimmer: string; pulse: string }> = {
  slow: { shimmer: "2.6s", pulse: "2.8s" },
  normal: { shimmer: "1.8s", pulse: "2.0s" },
  fast: { shimmer: "1.1s", pulse: "1.3s" },
};

/**
 * Skeleton Primitive
 * Hardware-accelerated, high-craft placeholder control supporting specular shimmer,
 * breathing pulse, wave ripples, and architectural CAD schematic canvas presets.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "shimmer",
      shape = "rounded",
      speed = "normal",
      accentGlow = false,
      width,
      height,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isShimmer = variant === "shimmer";
    const isPulse = variant === "pulse";
    const isGlow = variant === "glow" || accentGlow;
    const isWave = variant === "wave";

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
          height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
          ...style,
        }}
        className={cn(
          "bg-[var(--surface-secondary)]/80 relative overflow-hidden select-none pointer-events-none transition-colors",
          shapeStyles[shape],
          isShimmer && "kilo-shimmer",
          isPulse && "kilo-pulse",
          isGlow && "kilo-glow",
          isWave && "animate-pulse",
          accentGlow && "border border-[var(--accent-green)]/30 shadow-[0_0_12px_var(--accent-green-subtle)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Skeleton.displayName = "Skeleton";

/* ─────────────────────────────────────────────────────────────────── */
/* Composites: SkeletonText, Avatar, Button, Badge, Card, Canvas      */
/* ─────────────────────────────────────────────────────────────────── */

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  gap?: string;
  widths?: (string | number)[];
  variant?: SkeletonProps["variant"];
  accentGlow?: boolean;
}

export function SkeletonText({
  lines = 3,
  gap = "space-y-2",
  widths = ["100%", "90%", "65%"],
  variant = "shimmer",
  accentGlow = false,
  className,
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("w-full", gap, className)} {...props}>
      {Array.from({ length: lines }).map((_, idx) => {
        const width = widths[idx % widths.length];
        return (
          <Skeleton
            key={idx}
            shape="text"
            variant={variant}
            accentGlow={accentGlow}
            style={{ width: typeof width === "number" ? `${width}px` : width }}
          />
        );
      })}
    </div>
  );
}

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circular" | "rounded";
  variant?: SkeletonProps["variant"];
  accentGlow?: boolean;
}

const avatarSizes = {
  sm: "h-7 w-7",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
};

export function SkeletonAvatar({
  size = "md",
  shape = "circular",
  variant = "shimmer",
  accentGlow = false,
  className,
  ...props
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      shape={shape}
      variant={variant}
      accentGlow={accentGlow}
      className={cn(avatarSizes[size], className)}
      {...props}
    />
  );
}

export interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "icon";
  variant?: SkeletonProps["variant"];
  accentGlow?: boolean;
}

const buttonSizes = {
  sm: "h-7 w-20 rounded",
  default: "h-9 w-28 rounded-md",
  lg: "h-10 w-36 rounded-md",
  icon: "h-9 w-9 rounded-md",
};

export function SkeletonButton({
  size = "default",
  variant = "shimmer",
  accentGlow = false,
  className,
  ...props
}: SkeletonButtonProps) {
  return (
    <Skeleton
      shape="pill"
      variant={variant}
      accentGlow={accentGlow}
      className={cn(buttonSizes[size], className)}
      {...props}
    />
  );
}

export interface SkeletonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonProps["variant"];
  accentGlow?: boolean;
}

export function SkeletonBadge({
  variant = "shimmer",
  accentGlow = false,
  className,
  ...props
}: SkeletonBadgeProps) {
  return (
    <Skeleton
      shape="pill"
      variant={variant}
      accentGlow={accentGlow}
      className={cn("h-5 w-16", className)}
      {...props}
    />
  );
}

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonProps["variant"];
  accentGlow?: boolean;
  hasCanvas?: boolean;
  canvasHeight?: string;
  lines?: number;
}

export function SkeletonCard({
  variant = "shimmer",
  accentGlow = false,
  hasCanvas = true,
  canvasHeight = "h-44",
  lines = 2,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
        <div className="flex items-center gap-2.5">
          <SkeletonAvatar size="sm" variant={variant} shape="rounded" />
          <Skeleton shape="rounded" variant={variant} className="h-4 w-28" />
        </div>
        <SkeletonBadge variant={variant} />
      </div>

      {/* Canvas / Thumbnail */}
      {hasCanvas && (
        <div className={cn("p-4 bg-[var(--bg-main)]/60 flex items-center justify-center relative", canvasHeight)}>
          <SkeletonCanvas label="PREVIEW_PENDING" />
        </div>
      )}

      {/* Body / Description */}
      <div className="p-3.5 space-y-2 mt-auto border-t border-[var(--border)] bg-[var(--surface-secondary)]/15">
        <SkeletonText lines={lines} widths={["100%", "70%"]} variant={variant} />
        <div className="flex items-center justify-between pt-1">
          <Skeleton shape="rounded" variant={variant} className="h-3 w-20" />
          <SkeletonButton size="sm" variant={variant} className="w-16" />
        </div>
      </div>
    </div>
  );
}

export interface SkeletonCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  coordinates?: string;
  showReticle?: boolean;
  variant?: SkeletonProps["variant"];
}

export function SkeletonCanvas({
  label = "LOADING_PRIMITIVE",
  coordinates = "LAT: 37.77 // LNG: -122.41",
  showReticle = true,
  variant = "shimmer",
  className,
  ...props
}: SkeletonCanvasProps) {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[160px] rounded-lg border border-[var(--border)] bg-[var(--canvas-bg)] flex items-center justify-center overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* Subtle CAD dot grid pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Shimmer sweep layer */}
      {variant === "shimmer" && (
        <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-40" />
      )}

      {/* Reticle corner marks (+) */}
      {showReticle && (
        <>
          <span className="absolute top-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none opacity-50">+</span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none opacity-50">+</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[var(--text-muted)] select-none opacity-50">+</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[var(--text-muted)] select-none opacity-50">+</span>

          {/* Faint architectural crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-px bg-[var(--border)] opacity-60" />
            <div className="h-24 w-px bg-[var(--border)] opacity-60 absolute" />
          </div>
        </>
      )}

      {/* Central Telemetry HUD */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs shadow-xs">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-primary)]">
            {label}
          </span>
        </div>
        <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-tight">
          {coordinates}
        </span>
      </div>
    </div>
  );
}

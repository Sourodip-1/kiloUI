"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { M3LoadingIndicator } from "@/registry/ui/m3-loading-indicator";

export interface M3PhysicsLoaderProps {
  variant?: "shape-morph" | "elastic-line";
  /**
   * "accent" = var(--accent-green), "google" = #2563eb, "monochrome" = currentColor,
   * or any CSS color string. Strictly NO GLOW.
   */
  theme?: "accent" | "google" | "monochrome" | string;
  size?: number;
  speed?: number;
  /** Elastic resistance (0.5–2, default 1) */
  resistance?: number;
  className?: string;
}

function resolveColor(theme: string): string {
  if (theme === "accent") return "var(--accent-green)";
  if (theme === "google") return "#2563eb";
  if (theme === "monochrome") return "currentColor";
  return theme;
}

// ── Official M3 Expressive shapes for the elastic breach morph ──
const BREACH_SHAPES = [
  "M 50,4 C 76,4 96,24 96,50 C 96,76 76,96 50,96 C 24,96 4,76 4,50 C 4,24 24,4 50,4 Z",          // squircle
  "M 50,6 A 44,44 0 1,1 49.99,6 Z",                                                                // circle
  "M 50,10 C 60,10 70,20 70,30 C 70,40 90,40 90,50 C 90,60 70,60 70,70 C 70,80 60,90 50,90 C 40,90 30,80 30,70 C 30,60 10,60 10,50 C 10,40 30,40 30,30 C 30,20 40,10 50,10 Z", // clover
  "M 50,15 C 62,15 72,25 72,38 L 72,62 C 72,75 62,85 50,85 C 38,85 28,75 28,62 L 28,38 C 28,25 38,15 50,15 Z", // pill
  "M 50,8 C 54,8 58,14 60,18 C 62,22 68,22 72,20 C 76,18 80,22 78,26 C 76,30 80,34 84,36 C 88,38 88,44 86,48 C 84,52 86,58 84,62 C 82,66 78,66 74,70 C 70,74 72,80 68,82 C 64,84 60,82 56,82 C 52,82 50,86 50,92 C 50,86 48,82 44,82 C 40,82 36,84 32,82 C 28,80 30,74 26,70 C 22,66 18,66 16,62 C 14,58 16,52 14,48 C 12,44 12,38 16,36 C 20,34 24,30 22,26 C 20,22 24,18 28,20 C 32,22 38,22 40,18 C 42,14 46,8 50,8 Z", // 8-star
];

// ── Elastic Physics State (all computed per-frame, no multiple setState) ──
interface ElasticFrame {
  shapeY: number;    // pixel Y of shape center from SVG top
  lineDy: number;    // elastic cord center deflection (px)
  scaleX: number;
  scaleY: number;
  shapeIdx: number;
}

export function M3PhysicsLoader({
  variant = "shape-morph",
  theme = "accent",
  size = 64,
  speed = 1,
  resistance = 1,
  className,
}: M3PhysicsLoaderProps) {
  const accent = resolveColor(theme);

  if (variant === "shape-morph") {
    return (
      <M3LoadingIndicator
        variant="uncontained"
        size={size}
        color={accent}
        speed={speed}
        className={className}
      />
    );
  }

  return (
    <ElasticLoader
      accent={accent}
      theme={theme}
      speed={speed}
      resistance={resistance}
      className={className}
    />
  );
}

// ── Elastic Membrane Punch-Through ──
// Uses a single SVG that is 100% wide, fixed height.
// All physics computed in one rAF tick — single setState call per frame.
function ElasticLoader({
  accent,
  theme,
  speed,
  resistance,
  className,
}: {
  accent: string;
  theme: string;
  speed: number;
  resistance: number;
  className?: string;
}) {
  // Fixed display height; width is 100% of parent
  const H = 120;
  const midY = H / 2;

  // Single combined state → one re-render per frame
  const [frame, setFrame] = React.useState<ElasticFrame>({
    shapeY: midY,
    lineDy: 0,
    scaleX: 1,
    scaleY: 1,
    shapeIdx: 0,
  });

  // Ref stores mutable values that don't need to trigger render
  const stateRef = React.useRef({
    startTime: null as number | null,
    lastBreachStage: 0,
    shapeIdx: 0,
  });

  React.useEffect(() => {
    let rafId: number;
    const s = stateRef.current;
    const cycleDur = 2.4 / speed; // seconds per full loop
    const maxDef = 26 * Math.min(1.5, Math.max(0.5, resistance));
    const topApex = 42;   // px above midY
    const botApex = 42;   // px below midY

    const tick = (now: number) => {
      if (s.startTime === null) s.startTime = now;
      const p = ((now - s.startTime) / 1000 / cycleDur) % 1; // 0..1

      let sy = midY;
      let dy = 0;
      let sx = 1;
      let sy2 = 1; // reuse sy for Y-scale

      // ── Phase timeline ──
      // 0.00→0.20  rise to top apex
      // 0.20→0.36  gravity fall toward line
      // 0.36→0.50  membrane contact + stretch down
      // 0.50→0.62  punch-through, twang, snap to bottom
      // 0.62→0.76  bottom reversal + rise toward line
      // 0.76→0.90  membrane contact + stretch up
      // 0.90→1.00  punch-through, twang, snap to top

      if (p < 0.20) {
        const t = p / 0.20;
        sy = midY - Math.sin(t * Math.PI / 2) * topApex;
        sx = 0.9 + 0.1 * t; sy2 = 1.1 - 0.1 * t;
      } else if (p < 0.36) {
        const t = (p - 0.20) / 0.16;
        sy = midY - topApex + t * t * topApex; // gravity
        sx = 0.88; sy2 = 1.12;
      } else if (p < 0.50) {
        const t = (p - 0.36) / 0.14;
        const stretch = Math.sin(t * Math.PI / 2);
        dy = stretch * maxDef;
        sy = midY + dy;
        sx = 1 + stretch * 0.28; sy2 = 1 - stretch * 0.2;
      } else if (p < 0.62) {
        const t = (p - 0.50) / 0.12;
        const twang = Math.exp(-6 * t) * Math.cos(t * Math.PI * 4.5);
        dy = -twang * maxDef * 0.7;
        sy = midY + maxDef * 0.3 + (1 - Math.cos(t * Math.PI / 2)) * (botApex - maxDef * 0.3);
        sx = 0.95; sy2 = 1.05;
        if (s.lastBreachStage !== 1) {
          s.lastBreachStage = 1;
          s.shapeIdx = (s.shapeIdx + 1) % BREACH_SHAPES.length;
        }
      } else if (p < 0.76) {
        const t = (p - 0.62) / 0.14;
        sy = midY + botApex - (1 - Math.cos(t * Math.PI / 2)) * botApex;
        sx = 0.9; sy2 = 1.1;
      } else if (p < 0.90) {
        const t = (p - 0.76) / 0.14;
        const stretch = Math.sin(t * Math.PI / 2);
        dy = -stretch * maxDef;
        sy = midY + dy;
        sx = 1 + stretch * 0.28; sy2 = 1 - stretch * 0.2;
      } else {
        const t = (p - 0.90) / 0.10;
        const twang = Math.exp(-6 * t) * Math.cos(t * Math.PI * 4.5);
        dy = twang * maxDef * 0.7;
        sy = midY - maxDef * 0.3 - (1 - Math.cos(t * Math.PI / 2)) * (topApex - maxDef * 0.3);
        sx = 0.95; sy2 = 1.05;
        if (s.lastBreachStage !== 2) {
          s.lastBreachStage = 2;
          s.shapeIdx = (s.shapeIdx + 1) % BREACH_SHAPES.length;
        }
      }

      // Single setState → single re-render per frame
      setFrame({ shapeY: sy, lineDy: dy, scaleX: sx, scaleY: sy2, shapeIdx: s.shapeIdx });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [speed, resistance, midY]);

  const { shapeY, lineDy, scaleX, scaleY, shapeIdx } = frame;
  const shapeSize = 28;
  const PAD = 16; // horizontal padding inside SVG

  // SVG viewBox is 0 0 W H; we use % for X so it scales with container
  // We define the cord using 0 and 100 as X extents in viewBox "0 0 100 H"
  const cordPath = `M ${PAD},${midY} Q 50,${midY + lineDy} ${100 - PAD},${midY}`;

  return (
    <div
      role="progressbar"
      aria-label="Elastic Punch-Through Physics Loader"
      style={{ height: H, width: "100%" }}
      className={cn("relative select-none", className)}
    >
      {/* Full-width SVG cord — scales with container */}
      <svg
        viewBox={`0 0 100 ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Ghost baseline */}
        <line
          x1={PAD} y1={midY}
          x2={100 - PAD} y2={midY}
          stroke="currentColor"
          strokeWidth="0.6"
          strokeDasharray="1.5 2.5"
          className="text-[var(--border)] opacity-30"
        />
        {/* Elastic cord */}
        <path
          d={cordPath}
          fill="none"
          stroke={accent}
          strokeWidth={Math.max(0.8, 1.6 - Math.abs(lineDy) * 0.025)}
          strokeLinecap="round"
        />
      </svg>

      {/* Shape: positioned absolutely via %, centered horizontally */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: shapeY,
          transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
          width: shapeSize,
          height: shapeSize,
          transition: "top 0s", // physics drives position, no CSS lerp
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={shapeSize}
          height={shapeSize}
          style={{
            transition: "d 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <path
            d={BREACH_SHAPES[shapeIdx]}
            fill={accent}
          />
          <circle cx="50" cy="50" r="6" fill="rgba(255,255,255,0.8)" />
        </svg>
      </div>
    </div>
  );
}

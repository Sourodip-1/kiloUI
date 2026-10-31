"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────── */
/* Types matching Image 5 controls                                      */
/* ─────────────────────────────────────────────────────────────────── */
export interface PrismaticSlatsBgProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: "Violet" | "Cyan" | "Sunset" | "Emerald";
  background?: string;
  primary?: string;
  secondary?: string;
  angle?: number;
  flutes?: number;
  refraction?: number;
  aberration?: number;
  softness?: number;
  wave?: number;
  waveFrequency?: number;
  drift?: number;
  highlight?: number;
  highlightSoftness?: number;
  lightAngle?: number;
  radius?: number;
  momentum?: number;
  swirl?: number;
  intensity?: number;
  trail?: number;
  texture?: number;
  grain?: number;
  speed?: number;
  interactive?: boolean;
  paused?: boolean;
  autoplay?: boolean;
  children?: React.ReactNode;

  // Backwards compatible aliases
  slatCount?: number;
  slatWidth?: number;
  slatAngle?: number;
  prismIntensity?: number;
  influenceRadius?: number;
  bgColor?: string;
  showGrain?: boolean;
}

export type ReactiveSlatesProps = PrismaticSlatsBgProps;

/* ─────────────────────────────────────────────────────────────────── */
/* PrismaticSlatsBg Component (React Bits Pro inspired shader engine)   */
/* ─────────────────────────────────────────────────────────────────── */
export function PrismaticSlatsBg({
  preset = "Violet",
  background,
  primary = "#5227FF",
  secondary = "#FF9FFC",
  angle,
  flutes,
  refraction = 4.0,
  aberration = 0.61,
  softness = 0.50,
  wave = 0.06,
  waveFrequency = 1.5,
  drift = 0.00,
  highlight = 0.12,
  highlightSoftness = 0.30,
  lightAngle = -90,
  radius = 6.5,
  momentum = 13,
  swirl = 0,
  intensity = 1.00,
  trail = 1.00,
  texture = 0.60,
  grain = 0.050,
  speed = 1.00,
  interactive = true,
  paused = false,
  autoplay = false,
  children,
  className,
  style,

  // Backwards compat props
  bgColor,
  slatAngle,
  slatCount,
  prismIntensity,
  influenceRadius,
  showGrain,
  ...props
}: PrismaticSlatsBgProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Resolution of effective props
  const effectiveBg = background || bgColor || "#050505";
  const effectiveAngle = angle !== undefined ? angle : (slatAngle !== undefined ? slatAngle : 28);
  const effectiveFlutes = flutes !== undefined ? flutes : (slatCount !== undefined ? slatCount : 8);
  const effectiveIntensity = intensity * (prismIntensity !== undefined ? prismIntensity : 1.0);

  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({
    x: -9999,
    y: -9999,
    isOver: false,
  });

  const smoothPosRef = React.useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    glowIntensity: number;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    glowIntensity: 0.35,
  });

  const rafRef = React.useRef<number>(0);
  const timeRef = React.useRef<number>(0);

  /* ── Canvas Render Loop ── */
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const width = container.clientWidth || 640;
      const height = container.clientHeight || 320;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      if (smoothPosRef.current.x === 0 && smoothPosRef.current.y === 0) {
        smoothPosRef.current.x = width * 0.42;
        smoothPosRef.current.y = height * 0.48;
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let lastTimestamp = performance.now();

    const render = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) * 0.001, 0.1);
      lastTimestamp = timestamp;

      if (!paused) {
        timeRef.current += dt * speed;
      }
      const t = timeRef.current;

      const W = canvas.width;
      const H = canvas.height;
      const w = W / dpr;
      const h = H / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Target light position
      const isOver = mouseRef.current.isOver && interactive;
      let targetX = w * 0.45;
      let targetY = h * 0.48;
      let targetGlow = 0.45;

      if (isOver) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
        targetGlow = 1.0;
      } else if (autoplay || drift > 0) {
        // Continuous organic sweep across slates
        const driftSpeed = drift > 0 ? drift : 0.4;
        targetX = w * 0.5 + Math.cos(t * driftSpeed) * (w * 0.32);
        targetY = h * 0.5 + Math.sin(t * driftSpeed * 0.8) * (h * 0.28);
        targetGlow = 0.85;
      } else {
        // Ambient resting breathing light
        targetX = w * 0.45 + Math.cos(t * 0.4) * (w * 0.14);
        targetY = h * 0.48 + Math.sin(t * 0.3) * (h * 0.12);
        targetGlow = 0.45;
      }

      // Momentum physics & trailing lag
      const cur = smoothPosRef.current;
      const springK = Math.max(0.02, (15 - Math.min(momentum, 14)) * 0.008);
      const damping = Math.max(0.78, 0.94 - trail * 0.06);

      const ax = (targetX - cur.x) * springK;
      const ay = (targetY - cur.y) * springK;

      cur.vx = (cur.vx + ax) * damping;
      cur.vy = (cur.vy + ay) * damping;
      cur.x += cur.vx;
      cur.y += cur.vy;
      cur.glowIntensity += (targetGlow - cur.glowIntensity) * 0.06;

      const lx = cur.x;
      const ly = cur.y;
      const currentIntensity = cur.glowIntensity * effectiveIntensity;

      /* ============================================================ */
      /* 1. LAYER 1: BASE MATTE BACKGROUND                            */
      /* ============================================================ */
      ctx.fillStyle = effectiveBg;
      ctx.fillRect(0, 0, w, h);

      /* ============================================================ */
      /* 2. LAYER 2: CHROMATIC LIGHT FIELD (REFRACTION + ABERRATION)   */
      /* ============================================================ */
      // Base light field radius based on radius slider
      const lightBeamRadius = Math.max(w, h) * 0.55 * (radius / 6.5);

      // Light angle in radians (default -90deg is vertical sweep)
      const lightRad = (lightAngle * Math.PI) / 180;
      const lightDirX = Math.cos(lightRad);
      const lightDirY = Math.sin(lightRad);

      // 1. Primary Violet Glow Beam (#5227FF)
      const primaryGlow = ctx.createRadialGradient(
        lx,
        ly,
        0,
        lx + lightDirX * 30,
        ly + lightDirY * 30,
        lightBeamRadius
      );
      primaryGlow.addColorStop(0.0, `${primary}99`); // high intensity core
      primaryGlow.addColorStop(0.25 * (1 + softness * 0.4), `${primary}66`);
      primaryGlow.addColorStop(0.6 * (1 + softness * 0.3), `${primary}26`);
      primaryGlow.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = primaryGlow;
      ctx.fillRect(0, 0, w, h);

      // 2. Secondary Magenta/Pink Chromatic Aberration Fringe (#FF9FFC)
      // Aberration shifts the secondary fringe along the light perpendicular axis
      const aberOffset = aberration * 48;
      const secX = lx + perp(lightDirX, lightDirY)[0] * aberOffset;
      const secY = ly + perp(lightDirX, lightDirY)[1] * aberOffset;

      const secGlow = ctx.createRadialGradient(
        secX,
        secY,
        0,
        secX,
        secY,
        lightBeamRadius * 0.8
      );
      secGlow.addColorStop(0.0, `${secondary}73`);
      secGlow.addColorStop(0.35, `${secondary}38`);
      secGlow.addColorStop(0.8, `${secondary}0f`);
      secGlow.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = secGlow;
      ctx.fillRect(0, 0, w, h);

      /* ============================================================ */
      /* 3. LAYER 3: FLUTED DIAGONAL SLATS (IMAGE 4)                  */
      /* ============================================================ */
      const rad = (effectiveAngle * Math.PI) / 180;
      const cosA = Math.cos(rad);
      const sinA = Math.sin(rad);
      const perpX = -sinA;
      const perpY = cosA;

      const span = Math.hypot(w, h) * 2.2;
      const cx = w * 0.5;
      const cy = h * 0.5;

      // Pitch of flutes
      const totalWidth = Math.max(w, h) * 1.6;
      const fluteStep = totalWidth / Math.max(4, effectiveFlutes);
      const fluteWidth = fluteStep * 0.78;
      const fluteGap = fluteStep * 0.22;

      const numSlats = Math.ceil(span / fluteStep) + 6;

      for (let i = 0; i < numSlats; i++) {
        const offset = (i - numSlats / 2) * fluteStep;

        // Wave undulation factor along flutes
        const waveOffset = Math.sin(offset * 0.05 * waveFrequency + t * 2) * (wave * 60);

        const ox = cx + perpX * (offset + waveOffset);
        const oy = cy + perpY * (offset + waveOffset);

        // Calculate proximity of this slat to the refracted light beam
        const dmx = lx - ox;
        const dmy = ly - oy;
        const distPerp = dmx * perpX + dmy * perpY;
        const distSlat = dmx * cosA + dmy * sinA;
        const distToCursor = Math.hypot(distPerp, distSlat * 0.42);

        const influence = Math.max(0, 1 - distToCursor / (lightBeamRadius * 0.9));
        const curveInfluence = Math.pow(influence, 1.2) * currentIntensity;

        const halfW = fluteWidth * 0.5;

        // Quad corners of the slat
        const p0x = ox - cosA * span - perpX * halfW;
        const p0y = oy - sinA * span - perpY * halfW;
        const p1x = ox + cosA * span - perpX * halfW;
        const p1y = oy + sinA * span - perpY * halfW;
        const p2x = ox + cosA * span + perpX * halfW;
        const p2y = oy + sinA * span + perpY * halfW;
        const p3x = ox - cosA * span + perpX * halfW;
        const p3y = oy - sinA * span + perpY * halfW;

        // Physical Flute Slat Face (deep charcoal cylinder shading)
        const g0x = ox - perpX * halfW;
        const g0y = oy - perpY * halfW;
        const g1x = ox + perpX * halfW;
        const g1y = oy + perpY * halfW;

        const slatGrad = ctx.createLinearGradient(g0x, g0y, g1x, g1y);
        // Beveled curvature: lighter charcoal -> dark matte body -> deep recessed shadow
        slatGrad.addColorStop(0.0, "rgba(24, 24, 30, 0.98)");
        slatGrad.addColorStop(0.12, "rgba(16, 16, 20, 0.96)");
        slatGrad.addColorStop(0.65, "rgba(8, 8, 11, 0.98)");
        slatGrad.addColorStop(1.0, "rgba(4, 4, 6, 1.0)");

        ctx.beginPath();
        ctx.moveTo(p0x, p0y);
        ctx.lineTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.closePath();
        ctx.fillStyle = slatGrad;
        ctx.fill();

        // Refraction sheen on slat surface
        if (curveInfluence > 0.01) {
          const sheenGrad = ctx.createLinearGradient(g0x, g0y, g1x, g1y);
          const sheenA = Math.min(0.28, curveInfluence * (refraction / 4.0) * 0.22);
          sheenGrad.addColorStop(0.0, `rgba(255, 159, 252, ${sheenA * 0.9})`);
          sheenGrad.addColorStop(0.25, `rgba(82, 39, 255, ${sheenA * 1.2})`);
          sheenGrad.addColorStop(0.85, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = sheenGrad;
          ctx.fill();
        }

        // Specular Edge Highlight (Razor leading bevel edge)
        if (highlight > 0) {
          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.lineTo(p1x, p1y);
          const edgeAlpha = (highlight * 0.5 + curveInfluence * highlight * 2.2) * (1 - highlightSoftness * 0.4);
          ctx.strokeStyle = `rgba(255, 220, 255, ${Math.min(0.9, edgeAlpha)})`;
          ctx.lineWidth = 1.0 + highlight * 1.5;
          ctx.stroke();
        }

        // Drop shadow cast into recessed groove
        const shadowExtent = Math.min(fluteGap, 22);
        const s0x = p3x;
        const s0y = p3y;
        const s1x = p2x;
        const s1y = p2y;
        const s2x = p2x + perpX * shadowExtent;
        const s2y = p2y + perpY * shadowExtent;
        const s3x = p3x + perpX * shadowExtent;
        const s3y = p3y + perpY * shadowExtent;

        const shadowGrad = ctx.createLinearGradient(
          ox + perpX * halfW,
          oy + perpY * halfW,
          ox + perpX * (halfW + shadowExtent),
          oy + perpY * (halfW + shadowExtent)
        );
        shadowGrad.addColorStop(0.0, "rgba(0, 0, 0, 0.82)");
        shadowGrad.addColorStop(0.4, "rgba(0, 0, 0, 0.42)");
        shadowGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.moveTo(s0x, s0y);
        ctx.lineTo(s1x, s1y);
        ctx.lineTo(s2x, s2y);
        ctx.lineTo(s3x, s3y);
        ctx.closePath();
        ctx.fillStyle = shadowGrad;
        ctx.fill();
      }

      /* ============================================================ */
      /* 4. LAYER 4: VIGNETTE & FILM GRAIN                            */
      /* ============================================================ */
      const vig = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.8);
      vig.addColorStop(0.0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(0.65, "rgba(0, 0, 0, 0.38)");
      vig.addColorStop(1.0, "rgba(0, 0, 0, 0.82)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (grain > 0) {
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
        grd.addColorStop(0, `rgba(255, 255, 255, ${grain * 0.6})`);
        grd.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [
    effectiveBg,
    primary,
    secondary,
    effectiveAngle,
    effectiveFlutes,
    refraction,
    aberration,
    softness,
    wave,
    waveFrequency,
    drift,
    highlight,
    highlightSoftness,
    lightAngle,
    radius,
    momentum,
    swirl,
    effectiveIntensity,
    trail,
    texture,
    grain,
    speed,
    interactive,
    paused,
    autoplay,
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = canvas.getBoundingClientRect();
    const layoutW = container.clientWidth || 1;
    const layoutH = container.clientHeight || 1;
    const scaleX = layoutW / (rect.width || 1);
    const scaleY = layoutH / (rect.height || 1);
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      isOver: true,
    };
  };

  const handleMouseEnter = () => {
    mouseRef.current.isOver = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none", className)}
      style={{ background: effectiveBg, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
        aria-hidden="true"
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

function perp(x: number, y: number): [number, number] {
  return [-y, x];
}

export const ReactiveSlates = PrismaticSlatsBg;

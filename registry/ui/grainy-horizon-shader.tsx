"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GrainyHorizonShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual preset color palette */
  variant?: "ultraviolet" | "aurora-green" | "solar-amber" | "cyber-cyan" | "monochrome";
  /** Procedural noise & film grain density (0.0 to 0.6) */
  grain?: number;
  /** Roughness texture frequency / grit scale (0.5 to 3.0) */
  roughness?: number;
  /** Brightness multiplier of the radiant glow (0.2 to 2.5) */
  glowIntensity?: number;
  /** Curvature depth of the dark eclipse horizon (-1.0 to 1.0) */
  curvature?: number;
  /** Vertical spread and reach of the backlighting glow (0.2 to 2.0) */
  glowSpread?: number;
  /** Primary glow illumination color (hex) */
  primaryColor?: string;
  /** Secondary rim light / aberration color (hex) */
  secondaryColor?: string;
  /** Dark base background color (hex) */
  bgColor?: string;
  /** Wave undulation & breathing speed (0.1 to 3.0) */
  speed?: number;
  /** Ambient lateral drift speed (0.0 to 2.0) */
  drift?: number;
  /** Whether the horizon reacts to pointer proximity and clicks */
  interactive?: boolean;
  /** Invert curve orientation (crescent dome vs bowl) */
  inverted?: boolean;
  /** Optional children overlay (hero text, CTA, badges) */
  children?: React.ReactNode;
}

/**
 * GrainyHorizonShader:
 * A cinematic background shader featuring an organic curved dark horizon / eclipse silhouette
 * illuminated by a deep radiant chromatic glow and enveloped in tactile analog film grain and noise.
 * Inspired by modern brutalist aesthetics and high-end lighting documentation.
 */
export function GrainyHorizonShader({
  variant = "ultraviolet",
  grain = 0.26,
  roughness = 1.2,
  glowIntensity = 1.2,
  curvature = 0.52,
  glowSpread = 1.1,
  primaryColor,
  secondaryColor,
  bgColor,
  speed = 0.8,
  drift = 0.35,
  interactive = true,
  inverted = false,
  children,
  className,
  style,
  ...props
}: GrainyHorizonShaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Preset color mappings matching reference image aesthetics
  const theme = React.useMemo(() => {
    switch (variant) {
      case "aurora-green":
        return {
          bg: bgColor || "#040907",
          primary: primaryColor || "#10b981",
          secondary: secondaryColor || "#34d399",
          highlight: "#6ee7b7",
          darkBody: "#020705",
        };
      case "solar-amber":
        return {
          bg: bgColor || "#090503",
          primary: primaryColor || "#f59e0b",
          secondary: secondaryColor || "#f43f5e",
          highlight: "#fcd34d",
          darkBody: "#060302",
        };
      case "cyber-cyan":
        return {
          bg: bgColor || "#03080c",
          primary: primaryColor || "#06b6d4",
          secondary: secondaryColor || "#3b82f6",
          highlight: "#67e8f9",
          darkBody: "#020508",
        };
      case "monochrome":
        return {
          bg: bgColor || "#08080a",
          primary: primaryColor || "#d4d4d8",
          secondary: secondaryColor || "#71717a",
          highlight: "#f4f4f5",
          darkBody: "#040405",
        };
      case "ultraviolet":
      default:
        // Deep purple / ultraviolet matching media_1792862001252.png
        return {
          bg: bgColor || "#05040a",
          primary: primaryColor || "#7c3aed",
          secondary: secondaryColor || "#4f46e5",
          highlight: "#c084fc",
          darkBody: "#020106",
        };
    }
  }, [variant, bgColor, primaryColor, secondaryColor]);

  // Pointer state & physics tracking
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
    glowEnergy: number;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    glowEnergy: 1.0,
  });

  const shockwaveRef = React.useRef<number>(0);

  // Generate procedural noise tile
  React.useEffect(() => {
    const size = 320;
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = size;
    noiseCanvas.height = size;
    const nctx = noiseCanvas.getContext("2d");
    if (!nctx) return;

    const imgData = nctx.createImageData(size, size);
    const data = imgData.data;

    // Multi-frequency noise synthesis
    const freq = Math.max(0.4, roughness);
    for (let i = 0; i < data.length; i += 4) {
      const px = (i / 4) % size;
      const py = Math.floor(i / 4 / size);

      // Pseudo-random high-frequency white noise + gradient modulation
      const r1 = Math.random();
      const r2 = Math.sin(px * 0.12 * freq) * Math.cos(py * 0.12 * freq) * 0.5 + 0.5;
      const combined = r1 * 0.75 + r2 * 0.25;

      const val = Math.floor(combined * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }

    nctx.putImageData(imgData, 0, 0);
    noiseCanvasRef.current = noiseCanvas;
  }, [roughness]);

  // Main Render Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastStamp = performance.now();

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(300, Math.floor(rect.width));
      const h = Math.max(200, Math.floor(rect.height));

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      if (smoothPosRef.current.x === 0 && smoothPosRef.current.y === 0) {
        smoothPosRef.current.x = w * 0.5;
        smoothPosRef.current.y = h * 0.72;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const render = (timestamp: number) => {
      const dt = Math.min((timestamp - lastStamp) * 0.001, 0.1);
      lastStamp = timestamp;
      time += dt * speed;

      const W = canvas.width;
      const H = canvas.height;
      const w = W / dpr;
      const h = H / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Shockwave decay
      if (shockwaveRef.current > 0) {
        shockwaveRef.current = Math.max(0, shockwaveRef.current - dt * 2.5);
      }

      // Physics momentum & smoothing
      const isOver = interactive && mouseRef.current.isOver;
      let targetX = w * 0.5;
      let targetY = h * 0.74;

      if (isOver) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
      } else {
        // Natural hypnotic drift
        targetX = w * 0.5 + Math.sin(time * 0.5 * (drift || 0.35)) * (w * 0.16);
        targetY = h * 0.72 + Math.cos(time * 0.4 * (drift || 0.35)) * (h * 0.06);
      }

      const cur = smoothPosRef.current;
      const springK = isOver ? 0.08 : 0.035;
      const damping = 0.86;

      const ax = (targetX - cur.x) * springK;
      const ay = (targetY - cur.y) * springK;

      cur.vx = (cur.vx + ax) * damping;
      cur.vy = (cur.vy + ay) * damping;
      cur.x += cur.vx;
      cur.y += cur.vy;

      const targetEnergy = isOver ? 1.35 : 1.0;
      cur.glowEnergy += (targetEnergy - cur.glowEnergy) * 0.06;

      const lx = cur.x;
      const ly = cur.y;
      const effIntensity = glowIntensity * cur.glowEnergy * (1.0 + shockwaveRef.current * 0.6);

      /* ============================================================ */
      /* 1. LAYER 1: BASE MATTE BACKGROUND                            */
      /* ============================================================ */
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, w, h);

      /* ============================================================ */
      /* 2. LAYER 2: CHROMATIC RADIANT BACKLIGHT GLOW                 */
      /* ============================================================ */
      // Base glow radius modulated by spread prop
      const glowR = Math.max(w, h) * 0.65 * glowSpread;

      // Primary radiant core gradient
      const coreGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, glowR);
      coreGrad.addColorStop(0.0, `${theme.primary}e6`);
      coreGrad.addColorStop(0.2, `${theme.primary}aa`);
      coreGrad.addColorStop(0.5, `${theme.secondary}55`);
      coreGrad.addColorStop(0.8, `${theme.secondary}15`);
      coreGrad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.globalAlpha = Math.min(1, effIntensity * 0.95);
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Secondary wide ambient aura along lower base
      const auraGrad = ctx.createLinearGradient(0, h * 0.35, 0, h);
      auraGrad.addColorStop(0.0, "rgba(0, 0, 0, 0)");
      auraGrad.addColorStop(0.6, `${theme.secondary}30`);
      auraGrad.addColorStop(1.0, `${theme.primary}66`);

      ctx.save();
      ctx.globalAlpha = Math.min(1, effIntensity * 0.85);
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      /* ============================================================ */
      /* 3. LAYER 3: DARK SILHOUETTE HORIZON / ECLIPSE DOME           */
      /* ============================================================ */
      // Calculate horizon curve control points
      // In reference image: upper portion is a large dark body dipping downward into the purple glow
      const baseApexY = inverted ? h * 0.35 : h * 0.68;
      const curveDepth = curvature * (h * 0.38);

      // Lateral shift influenced by light tracking
      const apexX = w * 0.5 + (lx - w * 0.5) * 0.35;
      const apexY = baseApexY + (ly - h * 0.7) * 0.25 + Math.sin(time * 0.8) * 8 + (inverted ? -curveDepth : curveDepth);

      const leftY = inverted ? h * 0.75 : h * 0.22;
      const rightY = inverted ? h * 0.75 : h * 0.22;

      ctx.save();
      ctx.beginPath();

      if (!inverted) {
        // Curve: Top edges curve downward in center, covering the top half
        ctx.moveTo(0, 0);
        ctx.lineTo(0, leftY);
        ctx.bezierCurveTo(
          w * 0.25, leftY + curveDepth * 0.8,
          w * 0.38, apexY,
          apexX, apexY
        );
        ctx.bezierCurveTo(
          w * 0.62, apexY,
          w * 0.75, rightY + curveDepth * 0.8,
          w, rightY
        );
        ctx.lineTo(w, 0);
        ctx.closePath();
      } else {
        // Inverted: Bottom upward dome
        ctx.moveTo(0, h);
        ctx.lineTo(0, leftY);
        ctx.bezierCurveTo(
          w * 0.25, leftY - curveDepth * 0.8,
          w * 0.38, apexY,
          apexX, apexY
        );
        ctx.bezierCurveTo(
          w * 0.62, apexY,
          w * 0.75, rightY - curveDepth * 0.8,
          w, rightY
        );
        ctx.lineTo(w, h);
        ctx.closePath();
      }

      // Fill dark occluding body with rich velvety charcoal-black gradient
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, h);
      bodyGrad.addColorStop(0.0, theme.darkBody);
      bodyGrad.addColorStop(0.7, `${theme.darkBody}f5`);
      bodyGrad.addColorStop(1.0, theme.darkBody);

      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Shadow depth & ambient occlusion cast onto the horizon rim
      ctx.restore();

      /* ============================================================ */
      /* 4. LAYER 4: HORIZON RIM ILLUMINATION (EDGE GLOW)             */
      /* ============================================================ */
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, leftY);
      if (!inverted) {
        ctx.bezierCurveTo(
          w * 0.25, leftY + curveDepth * 0.8,
          w * 0.38, apexY,
          apexX, apexY
        );
        ctx.bezierCurveTo(
          w * 0.62, apexY,
          w * 0.75, rightY + curveDepth * 0.8,
          w, rightY
        );
      } else {
        ctx.bezierCurveTo(
          w * 0.25, leftY - curveDepth * 0.8,
          w * 0.38, apexY,
          apexX, apexY
        );
        ctx.bezierCurveTo(
          w * 0.62, apexY,
          w * 0.75, rightY - curveDepth * 0.8,
          w, rightY
        );
      }

      // Soft rim glow stroke
      ctx.strokeStyle = `${theme.highlight}40`;
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.stroke();

      // Razor sharp central edge
      ctx.strokeStyle = `${theme.highlight}99`;
      ctx.lineWidth = 1.25;
      ctx.stroke();
      ctx.restore();

      /* ============================================================ */
      /* 5. LAYER 5: TACTILE ANALOG FILM GRAIN & PROCEDURAL NOISE    */
      /* ============================================================ */
      const noise = noiseCanvasRef.current;
      if (noise && grain > 0) {
        ctx.save();
        // Multi-pass noise blending for rough texture without digital banding
        const pat = ctx.createPattern(noise, "repeat");
        if (pat) {
          // Pass 1: Overlay for midtone tactile roughness
          ctx.globalCompositeOperation = "overlay";
          ctx.globalAlpha = Math.min(1, grain * 1.6);
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, w, h);

          // Pass 2: Screen for luminous micro-grain specks in the glow
          ctx.globalCompositeOperation = "screen";
          ctx.globalAlpha = Math.min(1, grain * 0.75);
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.restore();
      }

      /* ============================================================ */
      /* 6. LAYER 6: CINEMATIC RADIAL VIGNETTE                         */
      /* ============================================================ */
      const vig = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.28,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.78
      );
      vig.addColorStop(0.0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(0.7, "rgba(0, 0, 0, 0.42)");
      vig.addColorStop(1.0, "rgba(0, 0, 0, 0.88)");

      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [
    theme,
    grain,
    roughness,
    glowIntensity,
    curvature,
    glowSpread,
    speed,
    drift,
    interactive,
    inverted,
  ]);

  // Mouse tracking handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isOver: true,
    };
  };

  const handleMouseEnter = () => {
    mouseRef.current.isOver = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    shockwaveRef.current = 1.0;
    props.onClick?.(e);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none bg-black", className)}
      style={{ background: theme.bg, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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

// Aliases for convenience
export const GrainyGlowShader = GrainyHorizonShader;
export const GrainyAuraBg = GrainyHorizonShader;

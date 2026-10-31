"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type NeonRibbonVariant =
  | "cyber-neon"
  | "prismatic-rainbow"
  | "solar-flare"
  | "emerald-matrix"
  | "spectral-silk";

export interface NeonRibbonCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color & visual preset */
  variant?: NeonRibbonVariant;
  /** Primary neon glow color at cursor head */
  primaryColor?: string;
  /** Secondary fading color at trail tail */
  secondaryColor?: string;
  /** Maximum width of the ribbon in px (4 to 40, default: 18) */
  ribbonWidth?: number;
  /** Length of the trailing path in points (15 to 100, default: 45) */
  trailLength?: number;
  /** Elastic lag / tension of ribbon follow (0.05 to 0.5, default: 0.22) */
  tension?: number;
  /** Glow intensity and bloom radius (0 to 30, default: 16) */
  glow?: number;
  /** Wave oscillation frequency (0 to 10, default: 2.5) */
  waveSpeed?: number;
  /** Mix blend mode ("screen", "lighter", "normal") */
  blendMode?: "screen" | "lighter" | "normal";
  /** Emits sparkling embers on click */
  clickBurst?: boolean;
  /** Overlay children */
  children?: React.ReactNode;
}

interface RibbonPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  width: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export function NeonRibbonCursor({
  variant = "cyber-neon",
  primaryColor,
  secondaryColor,
  ribbonWidth = 18,
  trailLength = 45,
  tension = 0.22,
  glow = 16,
  waveSpeed = 2.5,
  blendMode = "lighter",
  clickBurst = true,
  children,
  className,
  style,
  ...props
}: NeonRibbonCursorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Variant palette resolution
  const palette = React.useMemo(() => {
    if (primaryColor && secondaryColor) {
      return { head: primaryColor, tail: secondaryColor };
    }
    switch (variant) {
      case "prismatic-rainbow":
        return { head: "#f43f5e", tail: "#06b6d4" };
      case "solar-flare":
        return { head: "#f59e0b", tail: "#ef4444" };
      case "emerald-matrix":
        return { head: "#10b981", tail: "#059669" };
      case "spectral-silk":
        return { head: "#a855f7", tail: "#3b82f6" };
      case "cyber-neon":
      default:
        return { head: primaryColor || "#00f0ff", tail: secondaryColor || "#ff0077" };
    }
  }, [variant, primaryColor, secondaryColor]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let points: RibbonPoint[] = [];
    let sparkles: Sparkle[] = [];
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;
    let isInside = false;
    let time = 0;
    let rafId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isInside =
        targetX >= 0 && targetX <= rect.width && targetY >= 0 && targetY <= rect.height;

      if (currentX === -100) {
        currentX = targetX;
        currentY = targetY;
        prevX = targetX;
        prevY = targetY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!clickBurst) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          color: Math.random() > 0.5 ? palette.head : palette.tail,
          size: Math.random() * 3 + 1.5,
        });
      }
    };

    const onPointerLeave = () => {
      isInside = false;
    };

    const render = () => {
      time += 0.05 * waveSpeed;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Smooth lag towards target
      if (isInside) {
        currentX += (targetX - currentX) * tension;
        currentY += (targetY - currentY) * tension;

        const vx = currentX - prevX;
        const vy = currentY - prevY;
        const speed = Math.hypot(vx, vy);

        prevX = currentX;
        prevY = currentY;

        // Dynamic width flare with speed
        const dynamicW = Math.min(ribbonWidth * 1.8, Math.max(ribbonWidth * 0.6, speed * 0.8));

        points.unshift({
          x: currentX,
          y: currentY,
          vx,
          vy,
          age: 0,
          width: dynamicW,
        });
      }

      // Age points and remove old ones
      points = points.filter((p) => {
        p.age += 1;
        return p.age < trailLength;
      });

      // Render 3D-like ribbon strip if we have enough points
      if (points.length >= 3) {
        ctx.globalCompositeOperation = blendMode === "screen" ? "screen" : blendMode === "normal" ? "source-over" : "lighter";

        // Create gradient along ribbon path
        const headPoint = points[0];
        const tailPoint = points[points.length - 1];
        const gradient = ctx.createLinearGradient(
          headPoint.x,
          headPoint.y,
          tailPoint.x,
          tailPoint.y
        );
        gradient.addColorStop(0.0, palette.head);
        gradient.addColorStop(0.5, palette.tail);
        gradient.addColorStop(1.0, `${palette.tail}00`);

        // Compute normal offsets for quad strip
        const leftSide: { x: number; y: number }[] = [];
        const rightSide: { x: number; y: number }[] = [];

        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const next = points[Math.min(i + 1, points.length - 1)];
          const prev = points[Math.max(0, i - 1)];

          const dx = next.x - prev.x;
          const dy = next.y - prev.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;

          const progress = i / points.length;
          // Taper formula: wide at head, sleek at tail
          const taper = Math.pow(1 - progress, 1.4);
          const wave = Math.sin(time + progress * 8) * (progress * 4);
          const halfW = (p.width * 0.5 * taper) + wave;

          leftSide.push({ x: p.x + nx * halfW, y: p.y + ny * halfW });
          rightSide.push({ x: p.x - nx * halfW, y: p.y - ny * halfW });
        }

        // Draw ribbon body
        ctx.beginPath();
        ctx.moveTo(leftSide[0].x, leftSide[0].y);
        for (let i = 1; i < leftSide.length; i++) {
          ctx.lineTo(leftSide[i].x, leftSide[i].y);
        }
        for (let i = rightSide.length - 1; i >= 0; i--) {
          ctx.lineTo(rightSide[i].x, rightSide[i].y);
        }
        ctx.closePath();

        // Neon Glow Pass
        if (glow > 0) {
          ctx.shadowColor = palette.head;
          ctx.shadowBlur = glow;
        }

        ctx.fillStyle = gradient;
        ctx.fill();

        // Subtle core specular filament
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = Math.max(1, points[0].width * 0.15);
        ctx.shadowBlur = glow * 0.5;
        ctx.shadowColor = "#ffffff";
        ctx.stroke();
      }

      // Render sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.alpha -= 0.025;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.alpha, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [palette, ribbonWidth, trailLength, tension, glow, waveSpeed, blendMode, clickBurst]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none cursor-crosshair", className)}
      style={style}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />
      {children && (
        <div className="relative z-20 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export default NeonRibbonCursor;

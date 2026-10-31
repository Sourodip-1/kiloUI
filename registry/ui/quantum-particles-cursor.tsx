"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type QuantumVariant =
  | "cyber-constellation"
  | "synaptic-neural"
  | "cosmic-supernova"
  | "bioluminescent"
  | "matrix-grid";

export interface QuantumParticlesCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual theme preset */
  variant?: QuantumVariant;
  /** Primary node & filament laser color (hex) */
  color?: string;
  /** Secondary highlight / pulse color (hex) */
  secondaryColor?: string;
  /** Maximum number of ambient quantum particles (20 to 120, default: 65) */
  particleCount?: number;
  /** Distance in px to draw synaptic laser connection (40 to 150, default: 90) */
  connectDistance?: number;
  /** Interaction mode with cursor ("attract" | "repel" | "orbit") */
  forceMode?: "attract" | "repel" | "orbit";
  /** Strength of gravitational force from pointer (0.1 to 2.0, default: 0.8) */
  gravity?: number;
  /** Radius of influence around cursor (60 to 250, default: 130) */
  cursorRadius?: number;
  /** Base particle size (1 to 6, default: 2.5) */
  particleSize?: number;
  /** Laser connection line thickness (0.5 to 3.0, default: 1.0) */
  lineWidth?: number;
  /** Emits explosive shockwave ripple on click */
  shockwave?: boolean;
  /** Children overlay content */
  children?: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  pulsePhase: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function QuantumParticlesCursor({
  variant = "cyber-constellation",
  color,
  secondaryColor,
  particleCount = 65,
  connectDistance = 90,
  forceMode = "attract",
  gravity = 0.8,
  cursorRadius = 130,
  particleSize = 2.5,
  lineWidth = 1.0,
  shockwave = true,
  children,
  className,
  style,
  ...props
}: QuantumParticlesCursorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Preset palette resolution
  const palette = React.useMemo(() => {
    if (color && secondaryColor) {
      return { primary: color, secondary: secondaryColor };
    }
    switch (variant) {
      case "synaptic-neural":
        return { primary: "#a855f7", secondary: "#ec4899" };
      case "cosmic-supernova":
        return { primary: "#f59e0b", secondary: "#ef4444" };
      case "bioluminescent":
        return { primary: "#10b981", secondary: "#06b6d4" };
      case "matrix-grid":
        return { primary: "#22c55e", secondary: "#86efac" };
      case "cyber-constellation":
      default:
        return { primary: color || "#38bdf8", secondary: secondaryColor || "#6366f1" };
    }
  }, [variant, color, secondaryColor]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let waves: Shockwave[] = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let isInside = false;
    let rafId: number;

    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * (particleSize * 0.8) + (particleSize * 0.5),
          alpha: Math.random() * 0.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (particles.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      isInside =
        pointerX >= 0 && pointerX <= rect.width && pointerY >= 0 && pointerY <= rect.height;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!shockwave) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      waves.push({
        x: px,
        y: py,
        radius: 5,
        maxRadius: cursorRadius * 1.5,
        alpha: 1.0,
      });

      // Blast nearby particles outward
      particles.forEach((p) => {
        const dx = p.x - px;
        const dy = p.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < cursorRadius * 1.2 && dist > 1) {
          const force = (1 - dist / (cursorRadius * 1.2)) * 14;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    const onPointerLeave = () => {
      isInside = false;
      pointerX = -1000;
      pointerY = -1000;
    };

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // 1. Update and draw Shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const sw = waves[i];
        sw.radius += 5;
        sw.alpha -= 0.035;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = palette.secondary;
        ctx.lineWidth = 2.5 * sw.alpha;
        ctx.globalAlpha = sw.alpha * 0.7;
        ctx.shadowColor = palette.secondary;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // 2. Update Particles with drift and cursor gravitational force
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Keep inside bounds
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }

        // Cursor Force Field
        if (isInside) {
          const dx = pointerX - p.x;
          const dy = pointerY - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < cursorRadius && dist > 2) {
            const norm = (1 - dist / cursorRadius);
            const strength = norm * gravity * 0.4;

            if (forceMode === "attract") {
              p.vx += (dx / dist) * strength;
              p.vy += (dy / dist) * strength;
            } else if (forceMode === "repel") {
              p.vx -= (dx / dist) * strength * 1.5;
              p.vy -= (dy / dist) * strength * 1.5;
            } else if (forceMode === "orbit") {
              // Tangential rotational force + slight inward pull
              const angle = Math.atan2(dy, dx) + Math.PI / 2;
              p.vx += Math.cos(angle) * strength + (dx / dist) * strength * 0.3;
              p.vy += Math.sin(angle) * strength + (dy / dist) * strength * 0.3;
            }
          }
        }

        // Return tendency to maintain even distribution
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;

        // Pulse
        p.pulsePhase += 0.04;
      }

      // 3. Draw Synaptic Laser Filaments between proximate nodes
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectDistance) {
            const alpha = (1 - dist / connectDistance) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = palette.primary;
            ctx.globalAlpha = alpha;
            ctx.stroke();
          }
        }

        // Connect directly to pointer if proximate
        if (isInside) {
          const pDist = Math.hypot(p1.x - pointerX, p1.y - pointerY);
          if (pDist < cursorRadius) {
            const pAlpha = (1 - pDist / cursorRadius) * 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(pointerX, pointerY);
            ctx.strokeStyle = palette.secondary;
            ctx.globalAlpha = pAlpha;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // 4. Draw Quantum Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 1.0;
        const currentR = p.size * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = palette.primary;
        ctx.shadowColor = palette.primary;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Bright white center core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.fill();
      }

      // 5. Draw Pointer Quantum Core
      if (isInside) {
        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 6, 0, Math.PI * 2);
        ctx.fillStyle = palette.secondary;
        ctx.shadowColor = palette.secondary;
        ctx.shadowBlur = 16;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    resize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    palette,
    particleCount,
    connectDistance,
    forceMode,
    gravity,
    cursorRadius,
    particleSize,
    lineWidth,
    shockwave,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden select-none bg-black/90 cursor-none",
        className
      )}
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

export default QuantumParticlesCursor;

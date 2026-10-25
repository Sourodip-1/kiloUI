"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GrainyGridShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant styling */
  variant?: "rough-matte" | "tactile-kraft" | "cyber-mesh";
  /** Procedural grain & noise intensity (0.0 to 0.6) */
  grain?: number;
  /** Roughness texture frequency / grit scale (0.2 to 2.0) */
  roughness?: number;
  /** Number of grid columns */
  columns?: number;
  /** Number of grid rows */
  rows?: number;
  /** Size in pixels of each grid cell */
  cellSize?: number;
  /** Base background matte color */
  bgColor?: string;
  /** Idle stroke & grid line color */
  primaryColor?: string;
  /** Active highlight & interaction color */
  accentColor?: string;
  /** Cursor influence radius in pixels */
  influenceRadius?: number;
  /** Cursor influence radius alias */
  interactiveRadius?: number;
  /** Speed of wave pulses and ripple transitions */
  speed?: number;
  /** Whether grid exhibits ambient traveling wave illumination */
  autoWave?: boolean;
  /** Whether grid reacts to cursor proximity and clicks */
  interactive?: boolean;
  /** @deprecated Moving boxes have been removed in favor of pure tactile grid */
  showBoxes?: boolean;
  /** Content rendered above the grainy grid shader */
  children?: React.ReactNode;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

interface GridIntersection {
  x: number;
  y: number;
  col: number;
  row: number;
  waveOffset: number;
}

/**
 * GrainyGridShader:
 * An interactive canvas background featuring a tactile tactical coordinate grid
 * with responsive cursor lighting, ripple pulses, and ambient waves.
 * Coated in procedural film grain and turbulent noise for a rough, brutalist, tactile matte surface.
 */
export function GrainyGridShader({
  variant = "rough-matte",
  grain = 0.22,
  roughness = 1.0,
  columns = 8,
  rows = 6,
  cellSize = 54,
  bgColor,
  primaryColor,
  accentColor,
  influenceRadius = 140,
  interactiveRadius,
  speed = 1.0,
  autoWave = true,
  interactive = true,
  showBoxes = false,
  children,
  className,
  style,
  ...props
}: GrainyGridShaderProps) {
  const effectiveRadius = interactiveRadius ?? influenceRadius ?? 140;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // Variant default color themes
  const themeColors = React.useMemo(() => {
    switch (variant) {
      case "tactile-kraft":
        return {
          bg: bgColor || "#121110",
          primary: primaryColor || "#d4af37",
          accent: accentColor || "#f59e0b",
          lineBase: "rgba(212, 175, 55, 0.08)",
        };
      case "cyber-mesh":
        return {
          bg: bgColor || "#050608",
          primary: primaryColor || "#00f0ff",
          accent: accentColor || "#ec4899",
          lineBase: "rgba(0, 240, 255, 0.08)",
        };
      case "rough-matte":
      default:
        return {
          bg: bgColor || "#090a0a",
          primary: primaryColor || "#f4f4f5",
          accent: accentColor || "#8bc49a",
          lineBase: "rgba(255, 255, 255, 0.07)",
        };
    }
  }, [variant, bgColor, primaryColor, accentColor]);

  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({
    x: -9999,
    y: -9999,
    isOver: false,
  });

  const ripplesRef = React.useRef<Ripple[]>([]);
  const intersectionsRef = React.useRef<GridIntersection[]>([]);
  const timeRef = React.useRef<number>(0);

  // Initialize procedural noise pattern canvas (authentic analog grain without sine artifacts)
  React.useEffect(() => {
    const size = 160;
    const nCanvas = document.createElement("canvas");
    nCanvas.width = size;
    nCanvas.height = size;
    const nCtx = nCanvas.getContext("2d");
    if (!nCtx) return;

    const imgData = nCtx.createImageData(size, size);
    const data = imgData.data;
    const freq = Math.max(0.2, roughness);

    for (let i = 0; i < data.length; i += 4) {
      // Stochastic turbulent grain noise
      const n = (Math.random() * 0.8 + Math.random() * 0.2) * 255;
      data[i] = n;
      data[i + 1] = n;
      data[i + 2] = n;
      data[i + 3] = Math.floor(grain * 150 * Math.min(1.5, freq));
    }
    nCtx.putImageData(imgData, 0, 0);
    noiseCanvasRef.current = nCanvas;
  }, [grain, roughness]);

  // Main animation and physics render loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Precalculate grid intersection crosshairs
      const intersections: GridIntersection[] = [];
      const step = cellSize;
      const startX = (width % step) / 2;
      const startY = (height % step) / 2;

      let c = 0;
      for (let x = startX; x <= width + 1; x += step) {
        let r = 0;
        for (let y = startY; y <= height + 1; y += step) {
          intersections.push({
            x,
            y,
            col: c,
            row: r,
            waveOffset: (c + r) * 0.35,
          });
          r++;
        }
        c++;
      }
      intersectionsRef.current = intersections;
    };

    resize();
    window.addEventListener("resize", resize);

    // Render frame
    const render = () => {
      timeRef.current += 0.02 * speed;
      const t = timeRef.current;

      // 1. Base Matte Background
      ctx.fillStyle = themeColors.bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Active shockwave ripples update
      const activeRipples = ripplesRef.current;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rp = activeRipples[i];
        rp.radius += 6.0 * speed;
        rp.strength *= 0.955;
        if (rp.radius > rp.maxRadius || rp.strength < 0.01) {
          activeRipples.splice(i, 1);
        }
      }

      const mouse = mouseRef.current;
      const step = cellSize;
      const startX = (width % step) / 2;
      const startY = (height % step) / 2;

      // 3. Subtle Cursor Spotlight Glow
      if (interactive && mouse.isOver) {
        ctx.save();
        const spot = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          effectiveRadius * 1.4
        );
        spot.addColorStop(0, "rgba(255, 255, 255, 0.04)");
        spot.addColorStop(0.5, "rgba(255, 255, 255, 0.015)");
        spot.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 4. Draw Tactile Grid Lines with Dynamic Illumination
      ctx.save();
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = startX; x <= width + 1; x += step) {
        let lineGlow = 0;
        if (interactive && mouse.isOver) {
          const dx = Math.abs(x - mouse.x);
          if (dx < effectiveRadius) {
            lineGlow = Math.max(lineGlow, (1 - dx / effectiveRadius) * 0.18);
          }
        }
        activeRipples.forEach((rp) => {
          const dx = Math.abs(x - rp.x);
          const ringDist = Math.abs(dx - rp.radius);
          if (ringDist < 40) {
            lineGlow = Math.max(lineGlow, (1 - ringDist / 40) * 0.25 * rp.strength);
          }
        });

        ctx.strokeStyle = lineGlow > 0.02
          ? `rgba(255, 255, 255, ${0.07 + lineGlow})`
          : themeColors.lineBase;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = startY; y <= height + 1; y += step) {
        let lineGlow = 0;
        if (interactive && mouse.isOver) {
          const dy = Math.abs(y - mouse.y);
          if (dy < effectiveRadius) {
            lineGlow = Math.max(lineGlow, (1 - dy / effectiveRadius) * 0.18);
          }
        }
        activeRipples.forEach((rp) => {
          const dy = Math.abs(y - rp.y);
          const ringDist = Math.abs(dy - rp.radius);
          if (ringDist < 40) {
            lineGlow = Math.max(lineGlow, (1 - ringDist / 40) * 0.25 * rp.strength);
          }
        });

        ctx.strokeStyle = lineGlow > 0.02
          ? `rgba(255, 255, 255, ${0.07 + lineGlow})`
          : themeColors.lineBase;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 5. Draw Tactical Coordinate Markers & Intersections (+ crosshairs)
      const intersections = intersectionsRef.current;
      ctx.save();
      ctx.lineCap = "round";

      intersections.forEach((pt) => {
        let hoverInf = 0;
        if (interactive && mouse.isOver) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < effectiveRadius) {
            hoverInf = 1 - dist / effectiveRadius;
            hoverInf = hoverInf * hoverInf * (3 - 2 * hoverInf);
          }
        }

        let rippleInf = 0;
        activeRipples.forEach((rp) => {
          const dx = pt.x - rp.x;
          const dy = pt.y - rp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringDist = Math.abs(dist - rp.radius);
          if (ringDist < 50) {
            rippleInf = Math.max(rippleInf, (1 - ringDist / 50) * rp.strength);
          }
        });

        let wave = 0;
        if (autoWave) {
          wave = (Math.sin(t + pt.waveOffset) + 1) * 0.5;
          wave = Math.max(0, wave - 0.6) * 0.5;
        }

        const activeTotal = Math.min(1, hoverInf * 1.4 + rippleInf * 1.6 + wave);

        // Draw tactical crosshair at intersection
        const armLength = 3.5 + activeTotal * 3.0;
        const alpha = 0.18 + activeTotal * 0.72;

        ctx.lineWidth = activeTotal > 0.3 ? 1.5 : 1;
        ctx.strokeStyle = activeTotal > 0.2
          ? themeColors.accent
          : themeColors.primary;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        // Horizontal arm
        ctx.moveTo(pt.x - armLength, pt.y);
        ctx.lineTo(pt.x + armLength, pt.y);
        // Vertical arm
        ctx.moveTo(pt.x, pt.y - armLength);
        ctx.lineTo(pt.x, pt.y + armLength);
        ctx.stroke();
      });
      ctx.restore();

      // 6. Draw Shockwave Ripple Rings
      if (activeRipples.length > 0) {
        ctx.save();
        activeRipples.forEach((rp) => {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
          ctx.strokeStyle = themeColors.accent;
          ctx.globalAlpha = rp.strength * 0.35;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });
        ctx.restore();
      }

      // 7. Procedural Grain & Rough Texture Overlay
      const noise = noiseCanvasRef.current;
      if (noise && grain > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const pat = ctx.createPattern(noise, "repeat");
        if (pat) {
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, width, height);
        }
        ctx.restore();
      }

      // 8. Tactical Vignette Mask
      ctx.save();
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.28,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.68)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [
    themeColors,
    grain,
    roughness,
    columns,
    rows,
    cellSize,
    effectiveRadius,
    speed,
    autoWave,
    interactive,
  ]);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
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

  // Shockwave ripple on click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.85,
      strength: 1.0,
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[380px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] select-none",
        className
      )}
      style={style}
      {...props}
    >
      {/* High performance 60fps Tactical Grid Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="absolute inset-0 w-full h-full cursor-crosshair block z-0"
      />

      {/* Rough Analog Film Grain Filter Overlay */}
      {grain > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.45'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Optional Children slot (Hero content, headlines, tags) */}
      {children && (
        <div className="relative z-20 pointer-events-auto h-full w-full flex items-center justify-center p-6">
          {children}
        </div>
      )}
    </div>
  );
}

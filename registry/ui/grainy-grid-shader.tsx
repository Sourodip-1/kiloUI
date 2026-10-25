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
  /** Size in pixels of each 2x2 grid cell */
  cellSize?: number;
  /** Base background matte color */
  bgColor?: string;
  /** Idle stroke & block color */
  primaryColor?: string;
  /** Active morphed spin color */
  accentColor?: string;
  /** Cursor influence radius in pixels */
  influenceRadius?: number;
  /** Cursor influence radius alias */
  interactiveRadius?: number;
  /** Speed of rotational transitions and waves */
  speed?: number;
  /** Whether idle cells exhibit ambient traveling wave ripples */
  autoWave?: boolean;
  /** Whether cells react to cursor proximity and clicks */
  interactive?: boolean;
  /** Whether to render the 2x2 grid boxes (set to false for pure grainy backdrop) */
  showBoxes?: boolean;
  /** Content rendered above the grainy grid shader */
  children?: React.ReactNode;
}

interface GridCell {
  col: number;
  row: number;
  x: number;
  y: number;
  currentMorph: number;
  targetMorph: number;
  rotation: number;
  targetRotation: number;
  waveOffset: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

/**
 * GrainyGridShader:
 * An interactive canvas background featuring a matrix of 2x2 App Grid units
 * that spin 90° and morph between rounded app tiles and diagonal X crosshairs.
 * Coated in procedural film grain and turbulent noise for a rough, brutalist, tactile matte surface.
 */
export function GrainyGridShader({
  variant = "rough-matte",
  grain = 0.22,
  roughness = 1.0,
  columns = 6,
  rows = 4,
  cellSize = 52,
  bgColor,
  primaryColor,
  accentColor,
  influenceRadius = 140,
  interactiveRadius,
  speed = 1.0,
  autoWave = true,
  interactive = true,
  showBoxes = true,
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
        };
      case "cyber-mesh":
        return {
          bg: bgColor || "#050608",
          primary: primaryColor || "#00f0ff",
          accent: accentColor || "#ec4899",
        };
      case "rough-matte":
      default:
        return {
          bg: bgColor || "#090a0a",
          primary: primaryColor || "#f4f4f5",
          accent: accentColor || "#8bc49a",
        };
    }
  }, [variant, bgColor, primaryColor, accentColor]);

  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({
    x: -9999,
    y: -9999,
    isOver: false,
  });

  const ripplesRef = React.useRef<Ripple[]>([]);
  const cellsRef = React.useRef<GridCell[]>([]);
  const timeRef = React.useRef<number>(0);

  // Initialize procedural noise pattern canvas
  React.useEffect(() => {
    const size = 128;
    const nCanvas = document.createElement("canvas");
    nCanvas.width = size;
    nCanvas.height = size;
    const nCtx = nCanvas.getContext("2d");
    if (!nCtx) return;

    const imgData = nCtx.createImageData(size, size);
    const data = imgData.data;
    const freq = Math.max(0.2, roughness);

    for (let i = 0; i < data.length; i += 4) {
      // High-frequency turbulent noise
      const n = Math.random() * 255;
      data[i] = n;     // R
      data[i + 1] = n; // G
      data[i + 2] = n; // B
      data[i + 3] = Math.floor(grain * 140 * Math.min(1.5, freq)); // Alpha
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

      // Re-initialize cells layout
      const cells: GridCell[] = [];
      const totalWidth = columns * cellSize;
      const totalHeight = rows * cellSize;
      const startX = (width - totalWidth) / 2 + cellSize / 2;
      const startY = (height - totalHeight) / 2 + cellSize / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const cx = startX + c * cellSize;
          const cy = startY + r * cellSize;
          cells.push({
            col: c,
            row: r,
            x: cx,
            y: cy,
            currentMorph: 0,
            targetMorph: 0,
            rotation: 0,
            targetRotation: 0,
            waveOffset: (c + r) * 0.45,
          });
        }
      }
      cellsRef.current = cells;
    };

    resize();
    window.addEventListener("resize", resize);

    // Render frame
    const render = () => {
      timeRef.current += 0.02 * speed;
      const t = timeRef.current;

      // 1. Background Fill
      ctx.fillStyle = themeColors.bg;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle ambient grid background lines
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      const step = cellSize;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3. Update ripples
      const activeRipples = ripplesRef.current;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rp = activeRipples[i];
        rp.radius += 5.5 * speed;
        rp.strength *= 0.95;
        if (rp.radius > rp.maxRadius || rp.strength < 0.01) {
          activeRipples.splice(i, 1);
        }
      }

      // 4. Update & Draw Grid Cells
      const mouse = mouseRef.current;
      const cells = cellsRef.current;
      const baseSize = cellSize * 0.68;
      const halfSize = baseSize / 2;

      cells.forEach((cell) => {
        // Calculate interaction influence
        let hoverInfluence = 0;
        if (interactive && mouse.isOver) {
          const dx = cell.x - mouse.x;
          const dy = cell.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < effectiveRadius) {
            hoverInfluence = 1 - dist / effectiveRadius;
            // Ease in cubic
            hoverInfluence = hoverInfluence * hoverInfluence * (3 - 2 * hoverInfluence);
          }
        }

        // Calculate ripple impulses
        let rippleInfluence = 0;
        activeRipples.forEach((rp) => {
          const dx = cell.x - rp.x;
          const dy = cell.y - rp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringDist = Math.abs(dist - rp.radius);
          if (ringDist < 60) {
            const inf = (1 - ringDist / 60) * rp.strength;
            rippleInfluence = Math.max(rippleInfluence, inf);
          }
        });

        // Ambient traveling wave
        let wave = 0;
        if (autoWave) {
          wave = (Math.sin(t + cell.waveOffset) + 1) * 0.5;
          // Only subtle morph pulse
          wave = Math.max(0, wave - 0.7) * 0.7;
        }

        // Determine target morph state (0 = 2x2 grid, 1 = X cross)
        cell.targetMorph = Math.min(1, hoverInfluence * 1.3 + rippleInfluence * 1.5 + wave);
        cell.targetRotation = (cell.targetMorph * Math.PI) / 2 + (rippleInfluence * Math.PI);

        // Spring interpolation
        cell.currentMorph += (cell.targetMorph - cell.currentMorph) * (0.14 * speed);
        cell.rotation += (cell.targetRotation - cell.rotation) * (0.14 * speed);

        if (!showBoxes) return;

        const morph = cell.currentMorph;
        const rot = cell.rotation;

        ctx.save();
        ctx.translate(cell.x, cell.y);
        ctx.rotate(rot);

        // Compute dynamic colors between primary and accent
        const strokeColor = morph > 0.15 ? themeColors.accent : themeColors.primary;
        const fillAlpha = morph * 0.12;

        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = morph > 0.15 ? `rgba(139, 196, 154, ${fillAlpha})` : "transparent";
        ctx.lineWidth = 1.75;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        /* ── Part A: 4 Rectangles (.b1, .b2, .b3, .b4) ── */
        // In idle state: full size. As morph -> 1: scale drops to 0.2 and opacity drops to 0
        const boxOpacity = Math.max(0, 1 - morph * 1.3);
        if (boxOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = boxOpacity;

          const boxSize = halfSize * 0.76;
          const offset = halfSize * 0.52;
          const r = Math.max(1, boxSize * 0.26);

          // Helper to draw rounded rectangle
          const drawRoundRect = (x: number, y: number, w: number, h: number, radius: number) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.arcTo(x + w, y, x + w, y + radius, radius);
            ctx.lineTo(x + w, y + h - radius);
            ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
            ctx.lineTo(x + radius, y + h);
            ctx.arcTo(x, y + h, x, y + h - radius, radius);
            ctx.lineTo(x, y + radius);
            ctx.arcTo(x, y, x + radius, y, radius);
            ctx.closePath();
            ctx.stroke();
          };

          // b1: Top-Left
          drawRoundRect(-offset - boxSize / 2, -offset - boxSize / 2, boxSize, boxSize, r);
          // b2: Top-Right
          drawRoundRect(offset - boxSize / 2, -offset - boxSize / 2, boxSize, boxSize, r);
          // b3: Bottom-Left
          drawRoundRect(-offset - boxSize / 2, offset - boxSize / 2, boxSize, boxSize, r);
          // b4: Bottom-Right
          drawRoundRect(offset - boxSize / 2, offset - boxSize / 2, boxSize, boxSize, r);

          ctx.restore();
        }

        /* ── Part B: X Crosshair Lines (.x) ── */
        // In idle state: opacity 0, scale 0.4. As morph -> 1: scale 1, opacity 1
        const xOpacity = Math.min(1, Math.max(0, (morph - 0.15) * 1.3));
        if (xOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = xOpacity;
          const xSpan = halfSize * 0.85 * (0.4 + 0.6 * morph);

          ctx.beginPath();
          ctx.moveTo(-xSpan, -xSpan);
          ctx.lineTo(xSpan, xSpan);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(xSpan, -xSpan);
          ctx.lineTo(-xSpan, xSpan);
          ctx.stroke();

          ctx.restore();
        }

        ctx.restore();
      });

      // 5. Procedural Grain & Rough Texture Overlay
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

      // 6. Tactical Vignette Mask
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
    showBoxes,
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
      {/* High performance 60fps Morphing Grid Canvas */}
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

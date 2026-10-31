"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FireflyCursor } from "@/registry/ui/firefly-cursor";

export interface GrainyHorizonShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual preset color palette */
  variant?: "ultraviolet" | "aurora-green" | "solar-amber" | "cyber-cyan" | "monochrome" | "custom";
  /** Primary aura & gradient glow color (e.g. hex #6633ee, #5f8bff) */
  color?: string;
  /** Primary glow illumination color (alias for color) */
  primaryColor?: string;
  /** Secondary cooling color stop */
  secondaryColor?: string;
  /** Base dark background color (hex) */
  bgColor?: string;
  /** Brightness multiplier of the radiant glow (0.2 to 2.5) */
  glowIntensity?: number;
  /** Vertical reach and spread of the radiant backlight (0.4 to 2.0) */
  glowSpread?: number;
  /** Procedural noise & film grain density (0.0 for clean smooth shader) */
  grain?: number;
  /** Whether to enable the liquid physics glow cursor simulation */
  liquidCursor?: boolean;
  /** Liquid physics cursor trail intensity (0.1 to 3.0) */
  cursorIntensity?: number;
  /** Liquid physics cursor trail width (1 to 20) */
  cursorTrailWidth?: number;
  /** Optional children overlay (hero text, CTA, badges) */
  children?: React.ReactNode;
}

/**
 * GrainyHorizonShader (Luminous Gradient Shader with Liquid Aura Cursor):
 * A smooth, modern radiant atmospheric gradient shader.
 * Features a static, calm, non-parallax radial gradient (#000 to user-selected color)
 * coupled with a real-time WebGL2 liquid physics Navier-Stokes fluid cursor matching the same aura.
 */
export function GrainyHorizonShader({
  variant = "ultraviolet",
  color,
  primaryColor,
  secondaryColor,
  bgColor = "#000000",
  glowIntensity = 1.0,
  glowSpread = 1.25,
  grain = 0,
  liquidCursor = true,
  cursorIntensity = 0.75,
  cursorTrailWidth = 3.5,
  children,
  className,
  style,
  ...props
}: GrainyHorizonShaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Resolved primary and secondary colors
  const resolvedColor = React.useMemo(() => {
    if (color || primaryColor) return color || primaryColor || "#6633ee";
    switch (variant) {
      case "aurora-green":
        return "#059669";
      case "solar-amber":
        return "#ea580c";
      case "cyber-cyan":
        return "#0284c7";
      case "monochrome":
        return "#52525b";
      case "ultraviolet":
      default:
        return "#6633ee";
    }
  }, [variant, color, primaryColor]);

  const resolvedSecondary = React.useMemo(() => {
    if (secondaryColor) return secondaryColor;
    switch (variant) {
      case "aurora-green":
        return "#10b981";
      case "solar-amber":
        return "#f59e0b";
      case "cyber-cyan":
        return "#06b6d4";
      case "monochrome":
        return "#a1a1aa";
      case "ultraviolet":
      default:
        return "#8b5cf6";
    }
  }, [variant, secondaryColor]);

  // Static calm gradient render (NO parallax interactivity - background stays perfectly still)
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const drawBackground = () => {
      const w = Math.max(1, container.clientWidth || 640);
      const h = Math.max(1, container.clientHeight || 320);
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Base Dark Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // 2. Fixed Smooth Radial Gradient Shader (#000 at top 40% -> user color at 100%)
      // Static origin at top center (50% w, 10% h) without parallax shift
      const originX = w * 0.5;
      const originY = h * 0.10;
      const gradR = Math.max(w, h) * 1.25 * glowSpread;

      const radial = ctx.createRadialGradient(originX, originY, 0, originX, originY, gradR);
      radial.addColorStop(0.0, bgColor);
      radial.addColorStop(0.38, bgColor);
      radial.addColorStop(0.70, `${resolvedColor}88`);
      radial.addColorStop(1.0, resolvedColor);

      ctx.save();
      ctx.globalAlpha = Math.min(1, glowIntensity);
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 3. Volumetric diffuse bottom aura
      const bottomAura = ctx.createLinearGradient(0, h * 0.45, 0, h);
      bottomAura.addColorStop(0.0, "rgba(0, 0, 0, 0)");
      bottomAura.addColorStop(0.65, `${resolvedColor}40`);
      bottomAura.addColorStop(1.0, `${resolvedColor}aa`);

      ctx.save();
      ctx.globalAlpha = Math.min(1, glowIntensity * 0.85);
      ctx.fillStyle = bottomAura;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 4. Optional subtle film grain (only if grain > 0)
      if (grain > 0) {
        const size = 160;
        const nCanvas = document.createElement("canvas");
        nCanvas.width = size;
        nCanvas.height = size;
        const nctx = nCanvas.getContext("2d");
        if (nctx) {
          const imgData = nctx.createImageData(size, size);
          for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = Math.floor(grain * 120);
          }
          nctx.putImageData(imgData, 0, 0);
          const pat = ctx.createPattern(nCanvas, "repeat");
          if (pat) {
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = pat;
            ctx.fillRect(0, 0, w, h);
            ctx.restore();
          }
        }
      }

      ctx.restore();
    };

    drawBackground();
    const ro = new ResizeObserver(drawBackground);
    ro.observe(container);

    return () => {
      ro.disconnect();
    };
  }, [bgColor, resolvedColor, glowIntensity, glowSpread, grain]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none bg-black", className)}
      style={style}
      {...props}
    >
      {/* Calm, fixed radiant gradient canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
        aria-hidden="true"
      />

      {/* Embedded Liquid Physics Simulation Cursor in the same aura color */}
      {liquidCursor && (
        <FireflyCursor
          color={resolvedColor}
          coolingColor={resolvedSecondary}
          intensity={cursorIntensity}
          trailWidth={cursorTrailWidth}
          glow={1.3}
          hotspot={0.8}
          linger={1.5}
          followSpeed={0.65}
          clickBurst={true}
          className="absolute inset-0 z-10 pointer-events-auto"
        >
          {children && (
            <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
              {children}
            </div>
          )}
        </FireflyCursor>
      )}

      {/* Fallback children slot if liquidCursor is disabled */}
      {!liquidCursor && children && (
        <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
          {children}
        </div>
      )}
    </div>
  );
}

// Aliases for convenience
export const GrainyGlowShader = GrainyHorizonShader;
export const GrainyAuraBg = GrainyHorizonShader;
export const RadiantHorizonShader = GrainyHorizonShader;

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SpotlightVariant =
  | "studio-spotlight"
  | "thermal-scanner"
  | "cyber-radar"
  | "ultraviolet-lens"
  | "golden-sunbeam";

export interface SpotlightCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight visual theme preset */
  variant?: SpotlightVariant;
  /** Illumination spotlight cone color (hex, default: #ffffff) */
  color?: string;
  /** Radius of the spotlight cone in px (80 to 450, default: 220) */
  radius?: number;
  /** Softness of the light falloff feather (0.1 to 1.0, default: 0.75) */
  falloff?: number;
  /** Darkness opacity of unlit surroundings (0.3 to 0.98, default: 0.88) */
  ambientDarkness?: number;
  /** Inertia lag of spotlight follow (0.05 to 0.4, default: 0.20) */
  springTension?: number;
  /** Whether to project cybernetic radar / coordinates grid inside beam */
  revealGrid?: boolean;
  /** Brightness multiplier of central specular hot-spot (0.0 to 1.0, default: 0.6) */
  specular?: number;
  /** Pulse brightness flare on pointer down */
  pulseOnClick?: boolean;
  /** Overlay children */
  children?: React.ReactNode;
}

export function SpotlightCursor({
  variant = "studio-spotlight",
  color,
  radius = 220,
  falloff = 0.75,
  ambientDarkness = 0.88,
  springTension = 0.2,
  revealGrid = true,
  specular = 0.6,
  pulseOnClick = true,
  children,
  className,
  style,
  ...props
}: SpotlightCursorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Variant palette resolution
  const config = React.useMemo(() => {
    switch (variant) {
      case "thermal-scanner":
        return { color: color || "#f97316", rim: "#ef4444", bg: "#050505" };
      case "cyber-radar":
        return { color: color || "#10b981", rim: "#059669", bg: "#020905" };
      case "ultraviolet-lens":
        return { color: color || "#a855f7", rim: "#6366f1", bg: "#06030c" };
      case "golden-sunbeam":
        return { color: color || "#f59e0b", rim: "#d97706", bg: "#080602" };
      case "studio-spotlight":
      default:
        return { color: color || "#ffffff", rim: "#94a3b8", bg: "#030303" };
    }
  }, [variant, color]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let targetX = -1000;
    let targetY = -1000;
    let spotX = -1000;
    let spotY = -1000;
    let isInside = false;
    let isDown = false;
    let clickPulse = 0;
    let rafId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (spotX === -1000) {
        spotX = rect.width / 2;
        spotY = rect.height / 2;
        targetX = spotX;
        targetY = spotY;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      isInside =
        targetX >= 0 && targetX <= rect.width && targetY >= 0 && targetY <= rect.height;
    };

    const onPointerDown = () => {
      isDown = true;
      if (pulseOnClick) clickPulse = 1.0;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    const onPointerLeave = () => {
      isInside = false;
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Smooth lag
      if (isInside) {
        spotX += (targetX - spotX) * springTension;
        spotY += (targetY - spotY) * springTension;
      }

      // Decay click pulse
      if (clickPulse > 0.01) {
        clickPulse *= 0.92;
      } else {
        clickPulse = 0;
      }

      const activeRadius = radius * (1 + clickPulse * 0.25);

      // 1. Draw Ambient Darkness Veil
      ctx.fillStyle = config.bg;
      ctx.globalAlpha = ambientDarkness;
      ctx.fillRect(0, 0, w, h);

      // 2. Punch Spotlight Cone using 'destination-out' to reveal underneath
      ctx.globalCompositeOperation = "destination-out";
      const radGrad = ctx.createRadialGradient(
        spotX,
        spotY,
        0,
        spotX,
        spotY,
        activeRadius
      );
      radGrad.addColorStop(0.0, "rgba(0, 0, 0, 1.0)");
      radGrad.addColorStop(1.0 - falloff * 0.8, "rgba(0, 0, 0, 0.95)");
      radGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(spotX, spotY, activeRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Switch back to additive overlay to illuminate beam & grid
      ctx.globalCompositeOperation = "source-over";

      // Illuminating colored mist in the beam
      const beamGrad = ctx.createRadialGradient(
        spotX,
        spotY,
        0,
        spotX,
        spotY,
        activeRadius
      );
      beamGrad.addColorStop(0.0, `${config.color}35`);
      beamGrad.addColorStop(0.6, `${config.color}15`);
      beamGrad.addColorStop(1.0, `${config.rim}00`);

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(spotX, spotY, activeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cybernetic Radar / Coordinates Grid reveal inside beam
      if (revealGrid) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(spotX, spotY, activeRadius * 0.9, 0, Math.PI * 2);
        ctx.clip();

        ctx.strokeStyle = `${config.color}25`;
        ctx.lineWidth = 1;

        const gridSize = 32;
        const startX = Math.floor((spotX - activeRadius) / gridSize) * gridSize;
        const endX = spotX + activeRadius;
        const startY = Math.floor((spotY - activeRadius) / gridSize) * gridSize;
        const endY = spotY + activeRadius;

        for (let x = startX; x <= endX; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, spotY - activeRadius);
          ctx.lineTo(x, spotY + activeRadius);
          ctx.stroke();
        }

        for (let y = startY; y <= endY; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(spotX - activeRadius, y);
          ctx.lineTo(spotX + activeRadius, y);
          ctx.stroke();
        }

        // Radar ring reticles
        ctx.beginPath();
        ctx.arc(spotX, spotY, activeRadius * 0.35, 0, Math.PI * 2);
        ctx.arc(spotX, spotY, activeRadius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `${config.color}35`;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      }

      // 4. Central Specular Hot-spot Glint
      if (specular > 0) {
        const specGrad = ctx.createRadialGradient(
          spotX,
          spotY,
          0,
          spotX,
          spotY,
          activeRadius * 0.25
        );
        specGrad.addColorStop(0.0, `rgba(255, 255, 255, ${specular * (isDown ? 0.95 : 0.6)})`);
        specGrad.addColorStop(1.0, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = specGrad;
        ctx.beginPath();
        ctx.arc(spotX, spotY, activeRadius * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [
    config,
    radius,
    falloff,
    ambientDarkness,
    springTension,
    revealGrid,
    specular,
    pulseOnClick,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none bg-black", className)}
      style={style}
      {...props}
    >
      {/* Underlying content illuminated by spotlight */}
      {children && (
        <div className="relative z-0 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}

      {/* Cinematic Spotlight Darkness Veil Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none z-10"
        aria-hidden="true"
      />
    </div>
  );
}

export default SpotlightCursor;

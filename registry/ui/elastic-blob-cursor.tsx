"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ElasticBlobVariant =
  | "mercury-silver"
  | "neon-slime"
  | "liquid-lava"
  | "deep-ink"
  | "aurora-metasphere";

export interface ElasticBlobCursorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual fluid preset */
  variant?: ElasticBlobVariant;
  /** Primary blob color (hex) */
  color?: string;
  /** Secondary gradient / rim color (hex) */
  secondaryColor?: string;
  /** Base resting diameter of main blob in px (24 to 90, default: 46) */
  blobSize?: number;
  /** Viscosity / stretch elasticity (0.1 to 1.0, default: 0.35) */
  viscosity?: number;
  /** Spring lag / follow factor (0.05 to 0.5, default: 0.18) */
  springTension?: number;
  /** Whether satellite droplets break off at high velocity */
  droplets?: boolean;
  /** Maximum number of satellite droplets (2 to 8, default: 4) */
  dropletCount?: number;
  /** Gooey merge strength (4 to 20, default: 12) */
  gooeyStrength?: number;
  /** Natural jelly wobble frequency (0.5 to 5.0, default: 2.0) */
  wobbleSpeed?: number;
  /** Shiny 3D specular highlight */
  specular?: boolean;
  /** Hide OS cursor inside container */
  hideNativeCursor?: boolean;
  /** Overlay children */
  children?: React.ReactNode;
}

interface SatelliteDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  lag: number;
}

export function ElasticBlobCursor({
  variant = "mercury-silver",
  color,
  secondaryColor,
  blobSize = 46,
  viscosity = 0.35,
  springTension = 0.18,
  droplets = true,
  dropletCount = 4,
  gooeyStrength = 12,
  wobbleSpeed = 2.0,
  specular = true,
  hideNativeCursor = true,
  children,
  className,
  style,
  ...props
}: ElasticBlobCursorProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const blobRef = React.useRef<HTMLDivElement>(null);
  const dropletsContainerRef = React.useRef<HTMLDivElement>(null);
  const filterId = React.useId().replace(/:/g, "_");

  // Variant palette resolution
  const palette = React.useMemo(() => {
    if (color && secondaryColor) {
      return { primary: color, secondary: secondaryColor, glow: `${color}40` };
    }
    switch (variant) {
      case "neon-slime":
        return { primary: "#84cc16", secondary: "#10b981", glow: "#84cc1650" };
      case "liquid-lava":
        return { primary: "#f97316", secondary: "#ef4444", glow: "#f9731650" };
      case "deep-ink":
        return { primary: "#1e1b4b", secondary: "#4338ca", glow: "#4338ca40" };
      case "aurora-metasphere":
        return { primary: "#06b6d4", secondary: "#a855f7", glow: "#06b6d450" };
      case "mercury-silver":
      default:
        return { primary: color || "#e2e8f0", secondary: secondaryColor || "#94a3b8", glow: "#cbd5e140" };
    }
  }, [variant, color, secondaryColor]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;
    let isInside = false;
    let isDown = false;
    let time = 0;
    let rafId: number;

    const satellites: SatelliteDroplet[] = [];
    for (let i = 0; i < dropletCount; i++) {
      satellites.push({
        x: -100,
        y: -100,
        vx: 0,
        vy: 0,
        size: blobSize * (0.28 + i * 0.08),
        lag: springTension * (0.6 - i * 0.08),
      });
    }

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
        satellites.forEach((s) => {
          s.x = targetX;
          s.y = targetY;
        });
      }
    };

    const onPointerDown = () => {
      isDown = true;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    const onPointerLeave = () => {
      isInside = false;
      targetX = -100;
      targetY = -100;
    };

    const animate = () => {
      time += 0.03 * wobbleSpeed;

      if (isInside) {
        currentX += (targetX - currentX) * springTension;
        currentY += (targetY - currentY) * springTension;

        const vx = currentX - prevX;
        const vy = currentY - prevY;
        const speed = Math.hypot(vx, vy);
        const angle = Math.atan2(vy, vx);

        prevX = currentX;
        prevY = currentY;

        // Velocity-based stretch and wobble
        const stretch = Math.min(1.2, speed * viscosity * 0.08);
        const wobble = Math.sin(time) * 0.08;
        const scaleX = (isDown ? 0.75 : 1.0) + stretch + wobble;
        const scaleY = (isDown ? 0.75 : 1.0) - stretch * 0.45 - wobble;

        if (blobRef.current) {
          blobRef.current.style.opacity = isInside ? "1" : "0";
          blobRef.current.style.transform = `translate3d(${currentX - blobSize / 2}px, ${currentY - blobSize / 2}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
        }

        // Update satellite trailing droplets
        if (droplets && dropletsContainerRef.current) {
          const children = dropletsContainerRef.current.children;
          for (let i = 0; i < satellites.length; i++) {
            const s = satellites[i];
            s.x += (currentX - s.x) * s.lag;
            s.y += (currentY - s.y) * s.lag;

            const el = children[i] as HTMLElement;
            if (el) {
              el.style.opacity = isInside && speed > 1.5 ? "1" : "0";
              el.style.transform = `translate3d(${s.x - s.size / 2}px, ${s.y - s.size / 2}px, 0)`;
            }
          }
        }
      } else {
        if (blobRef.current) blobRef.current.style.opacity = "0";
        if (dropletsContainerRef.current) {
          const children = dropletsContainerRef.current.children;
          for (let i = 0; i < children.length; i++) {
            (children[i] as HTMLElement).style.opacity = "0";
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [blobSize, viscosity, springTension, droplets, dropletCount, wobbleSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden select-none",
        hideNativeCursor && "cursor-none",
        className
      )}
      style={style}
      {...props}
    >
      {/* SVG Gooey Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`gooey_${filterId}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={gooeyStrength} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Filtered Liquid Gooey Metasphere Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        style={{ filter: `url(#gooey_${filterId})` }}
        aria-hidden="true"
      >
        {/* Main Mother Droplet */}
        <div
          ref={blobRef}
          className="absolute left-0 top-0 rounded-full will-change-transform transition-opacity duration-150 flex items-center justify-center"
          style={{
            width: `${blobSize}px`,
            height: `${blobSize}px`,
            background: `radial-gradient(circle at 35% 35%, ${palette.primary}, ${palette.secondary})`,
            boxShadow: `0 0 20px ${palette.glow}`,
          }}
        >
          {/* 3D Liquid Specular Reflection */}
          {specular && (
            <div
              className="absolute top-1.5 left-2 rounded-full bg-white/70 blur-[1px] pointer-events-none"
              style={{
                width: `${blobSize * 0.28}px`,
                height: `${blobSize * 0.16}px`,
                transform: "rotate(-30deg)",
              }}
            />
          )}
        </div>

        {/* Satellite Detaching Droplets */}
        {droplets && (
          <div ref={dropletsContainerRef}>
            {Array.from({ length: dropletCount }).map((_, idx) => (
              <div
                key={idx}
                className="absolute left-0 top-0 rounded-full will-change-transform transition-opacity duration-100"
                style={{
                  width: `${blobSize * (0.28 + idx * 0.08)}px`,
                  height: `${blobSize * (0.28 + idx * 0.08)}px`,
                  backgroundColor: palette.secondary,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Children overlay */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export default ElasticBlobCursor;

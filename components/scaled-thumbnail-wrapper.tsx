"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScaledThumbnailWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
  category?: string;
  name?: string;
  className?: string;
  /** Custom base virtual width if override needed */
  baseWidth?: number;
  /** Custom base virtual height if override needed */
  baseHeight?: number;
}

/**
 * ScaledThumbnailWrapper
 * Universally scales any full-sized UI component, widescreen shader, or complex layout
 * to fit completely inside any thumbnail card, hover preview, or gallery pane without cropping,
 * overflow, or blowout.
 */
export function ScaledThumbnailWrapper({
  children,
  enabled = true,
  category = "",
  name = "",
  className,
  baseWidth: customBaseWidth,
  baseHeight: customBaseHeight,
}: ScaledThumbnailWrapperProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Widescreen / Complex / Full-bleed components render in a desktop canvas
  // UI control atoms (buttons, badges, switches) render in a compact canvas
  const isLarge =
    category === "Backgrounds & Shaders" ||
    category === "Media & Layout" ||
    name === "table" ||
    name === "card" ||
    name === "dialog" ||
    name === "expanding-card" ||
    name === "content-slider" ||
    name === "blurred-carousel" ||
    name === "concave-carousel" ||
    name === "directional-marquee" ||
    name === "scroll-marquee" ||
    name === "kinetic-motion-text" ||
    name === "footer";

  let targetBaseWidth = customBaseWidth || 320;
  let targetBaseHeight = customBaseHeight || 160;
  let defaultInitialScale = 1.0;

  if (!customBaseWidth || !customBaseHeight) {
    if (name === "minimalist-login" || name === "horizon-login" || name === "blueprint-login") {
      targetBaseWidth = 780;
      targetBaseHeight = 460;
      defaultInitialScale = 0.44;
    } else if (name === "search-bar" || name === "liquid-glass-search-bar") {
      targetBaseWidth = 460;
      targetBaseHeight = 180;
      defaultInitialScale = 0.82;
    } else if (name === "tabs") {
      targetBaseWidth = 440;
      targetBaseHeight = 165;
      defaultInitialScale = 1.0;
    } else if (name === "notched-navbar") {
      targetBaseWidth = 430;
      targetBaseHeight = 155;
      defaultInitialScale = 1.0;
    } else if (name === "accordion") {
      targetBaseWidth = 400;
      targetBaseHeight = 160;
      defaultInitialScale = 1.0;
    } else if (name === "sidebar") {
      targetBaseWidth = 400;
      targetBaseHeight = 165;
      defaultInitialScale = 1.0;
    } else if (name === "morph-node-ring") {
      targetBaseWidth = 380;
      targetBaseHeight = 260;
      defaultInitialScale = 0.68;
    } else if (name === "glass-reveal") {
      targetBaseWidth = 480;
      targetBaseHeight = 270;
      defaultInitialScale = 0.58;
    } else if (isLarge) {
      targetBaseWidth = 640;
      targetBaseHeight = 320;
      defaultInitialScale = 0.42;
    } else {
      targetBaseWidth = 320;
      targetBaseHeight = 160;
      defaultInitialScale = 1.0;
    }
  }

  // Initialize with sensible scale to avoid initial render flicker - ALL HOOKS UNCONDITIONAL
  const [scale, setScale] = React.useState<number>(defaultInitialScale);
  const [ready, setReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!enabled || category === "Cursors") return;

    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      const availW = rect.width > 0 ? rect.width : (parentRect?.width || targetBaseWidth);
      const availH = rect.height > 0 ? rect.height : (parentRect?.height || targetBaseHeight);

      if (availW > 0 && availH > 0) {
        const sX = availW / targetBaseWidth;
        const sY = availH / targetBaseHeight;
        // Fit completely inside the container (contain)
        const computed = Math.min(sX, sY, 1.0);
        setScale(Math.max(computed, 0.05));
        setReady(true);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.parentElement) {
      ro.observe(el.parentElement);
    }
    return () => ro.disconnect();
  }, [enabled, category, targetBaseWidth, targetBaseHeight]);

  // When disabled (e.g. in full playground mode) or for full-bleed interactive cursors,
  // return AFTER hooks have run so hook call order remains 100% constant across renders
  if (!enabled || category === "Cursors") {
    return (
      <div className={cn("w-full h-full min-h-[280px] flex items-center justify-center relative overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  const sizerWidth = Math.max(1, Math.round(targetBaseWidth * scale));
  const sizerHeight = Math.max(1, Math.round(targetBaseHeight * scale));

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-0 flex items-center justify-center overflow-hidden relative select-none",
        className
      )}
    >
      <div
        style={{
          width: `${sizerWidth}px`,
          height: `${sizerHeight}px`,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
        className="pointer-events-auto flex items-center justify-center max-w-full max-h-full"
      >
        <div
          style={{
            width: `${targetBaseWidth}px`,
            height: `${targetBaseHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: ready ? 1 : 0.95,
            transition: "transform 140ms ease-out, opacity 100ms ease-out",
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

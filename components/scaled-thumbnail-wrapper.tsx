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

  // When disabled (e.g. in full playground mode), render children in a standard flex container
  if (!enabled) {
    return (
      <div className={cn("w-full flex items-center justify-center", className)}>
        {children}
      </div>
    );
  }

  // Widescreen / Complex / Full-bleed components render in a desktop canvas
  // UI control atoms (buttons, badges, switches) render in a compact canvas
  const isLarge =
    category === "Backgrounds & Shaders" ||
    category === "Cursors" ||
    category === "Media & Layout" ||
    category === "Navigation" ||
    name === "notched-navbar" ||
    name === "sidebar" ||
    name === "table" ||
    name === "accordion" ||
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

  const targetBaseWidth = customBaseWidth ?? (isLarge ? 640 : 320);
  const targetBaseHeight = customBaseHeight ?? (isLarge ? 320 : 160);

  // Initialize with sensible scale to avoid initial render flicker
  const initialScale = isLarge ? 0.42 : 1.0;
  const [scale, setScale] = React.useState<number>(initialScale);
  const [ready, setReady] = React.useState<boolean>(false);

  React.useEffect(() => {
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
  }, [targetBaseWidth, targetBaseHeight]);

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

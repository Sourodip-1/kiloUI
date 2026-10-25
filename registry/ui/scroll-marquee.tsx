"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  textSecondary?: string;
  variant?: "scroll-left" | "scroll-right" | "dual-scroll" | "velocity-skew";
  speed?: number;
  baseVelocity?: number;
  skewIntensity?: number;
  repeat?: number;
  separator?: string;
  outlineText?: boolean;
  textColor?: string;
  blurColor?: string; // "mask" (default CSS alpha gradient mask) or any CSS color
  interactiveWheel?: boolean;
}

export const ScrollMarquee = React.forwardRef<HTMLDivElement, ScrollMarqueeProps>(
  (
    {
      className,
      text = "ENGINEERED FOR HIGH VELOCITY • MINIMAL BY DESIGN • HARDWARE ACCELERATED • ZERO RUNTIME OVERHEAD •",
      textSecondary = "CRAFTED WITH PRECISION • TAILWIND CSS • NEXT.JS 16 • SYSTEM LEVEL DESIGN •",
      variant = "scroll-left",
      speed = 1.2,
      baseVelocity = 0.5,
      skewIntensity = 6,
      repeat = 4,
      separator = "✦",
      outlineText = false,
      textColor,
      blurColor = "mask",
      interactiveWheel = true,
      ...props
    },
    ref
  ) => {
    const [offset1, setOffset1] = React.useState(0);
    const [offset2, setOffset2] = React.useState(0);
    const [currentSkew, setCurrentSkew] = React.useState(0);

    const prevScrollY = React.useRef(0);
    const targetOffset1 = React.useRef(0);
    const targetOffset2 = React.useRef(0);
    const targetSkew = React.useRef(0);
    const animFrameId = React.useRef<number | null>(null);

    // Track block width measurement for seamless infinite wrapping
    const track1Ref = React.useRef<HTMLDivElement>(null);
    const track2Ref = React.useRef<HTMLDivElement>(null);
    const [track1Width, setTrack1Width] = React.useState(0);
    const [track2Width, setTrack2Width] = React.useState(0);

    const updateWidths = React.useCallback(() => {
      if (track1Ref.current) {
        setTrack1Width(track1Ref.current.scrollWidth / 2 || 1600);
      }
      if (track2Ref.current) {
        setTrack2Width(track2Ref.current.scrollWidth / 2 || 1600);
      }
    }, []);

    React.useEffect(() => {
      updateWidths();
      window.addEventListener("resize", updateWidths);
      return () => window.removeEventListener("resize", updateWidths);
    }, [updateWidths, text, textSecondary, repeat]);

    // Handle scroll on window
    React.useEffect(() => {
      let isMounted = true;

      const handleScroll = () => {
        if (typeof window === "undefined") return;
        const currentY = window.scrollY;
        const delta = currentY - prevScrollY.current;
        prevScrollY.current = currentY;

        const isLeft = variant === "scroll-left" || variant === "velocity-skew" || variant === "dual-scroll";
        const factor1 = isLeft ? -1 : 1;
        const factor2 = 1;

        targetOffset1.current += delta * speed * factor1;
        targetOffset2.current += delta * speed * factor2;

        if (variant === "velocity-skew") {
          const clampedDelta = Math.max(-45, Math.min(45, delta));
          targetSkew.current = -clampedDelta * 0.35 * (skewIntensity / 6);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      // Physics loop with smooth lerp
      const updatePhysics = () => {
        if (!isMounted) return;

        const isLeft = variant === "scroll-left" || variant === "velocity-skew" || variant === "dual-scroll";
        targetOffset1.current += (isLeft ? -1 : 1) * baseVelocity;
        targetOffset2.current += baseVelocity;

        // Smooth spring dampening
        setOffset1((prev) => prev + (targetOffset1.current - prev) * 0.12);
        setOffset2((prev) => prev + (targetOffset2.current - prev) * 0.12);

        if (variant === "velocity-skew") {
          targetSkew.current *= 0.86;
          setCurrentSkew((prev) => prev + (targetSkew.current - prev) * 0.18);
        }

        animFrameId.current = requestAnimationFrame(updatePhysics);
      };

      animFrameId.current = requestAnimationFrame(updatePhysics);

      return () => {
        isMounted = false;
        window.removeEventListener("scroll", handleScroll);
        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      };
    }, [variant, speed, baseVelocity, skewIntensity]);

    // Handle interactive wheel on the component or preview panel
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      if (!interactiveWheel) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 0.5) return;

      const isLeft = variant === "scroll-left" || variant === "velocity-skew" || variant === "dual-scroll";
      const factor1 = isLeft ? -1 : 1;
      const factor2 = 1;

      targetOffset1.current += delta * speed * 0.8 * factor1;
      targetOffset2.current += delta * speed * 0.8 * factor2;

      if (variant === "velocity-skew") {
        const clampedDelta = Math.max(-50, Math.min(50, delta));
        targetSkew.current = -clampedDelta * 0.4 * (skewIntensity / 6);
      }
    };

    // Seamless infinite modulo wrapping
    const w1 = track1Width || 2000;
    const w2 = track2Width || 2000;
    const wrap1 = ((offset1 % w1) + w1) % w1 - w1;
    const wrap2 = ((offset2 % w2) + w2) % w2 - w2;

    const singleItems = React.useMemo(() => {
      return Array.from({ length: repeat }).map(() => text);
    }, [text, repeat]);

    const singleItemsSec = React.useMemo(() => {
      return Array.from({ length: repeat }).map(() => textSecondary);
    }, [textSecondary, repeat]);

    // Double sets of items for seamless infinite wrap
    const duplicatedItems = React.useMemo(() => [...singleItems, ...singleItems], [singleItems]);
    const duplicatedItemsSec = React.useMemo(() => [...singleItemsSec, ...singleItemsSec], [singleItemsSec]);

    const isMaskBlur = !blurColor || blurColor === "mask";

    return (
      <div
        ref={ref}
        onWheel={handleWheel}
        className={cn(
          "relative w-full overflow-hidden select-none py-6 sm:py-10 flex flex-col justify-center gap-4 sm:gap-6 cursor-grab active:cursor-grabbing",
          className
        )}
        style={
          isMaskBlur
            ? {
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }
            : undefined
        }
        {...props}
      >
        {/* Optional custom-color edge fade masks when blurColor is not "mask" */}
        {!isMaskBlur && (
          <>
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10"
              style={{
                background: `linear-gradient(to right, ${blurColor}, transparent)`,
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10"
              style={{
                background: `linear-gradient(to left, ${blurColor}, transparent)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Track 1 */}
        <div
          ref={track1Ref}
          className="flex whitespace-nowrap will-change-transform"
          style={{
            transform: `translate3d(${wrap1}px, 0, 0) ${
              variant === "velocity-skew" ? `skewX(${currentSkew}deg)` : ""
            }`,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span
                style={textColor ? { color: textColor } : undefined}
                className={cn(
                  "font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase px-4 transition-colors",
                  outlineText
                    ? "text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] hover:[-webkit-text-stroke:1.5px_var(--accent-green)]"
                    : !textColor && "text-[var(--text-primary)] hover:text-[var(--accent-green)]"
                )}
              >
                {item}
              </span>
              <span className="text-xl sm:text-3xl text-[var(--accent-green)] mx-3 opacity-75">
                {separator}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 for Dual Scroll Variant */}
        {variant === "dual-scroll" && (
          <div
            ref={track2Ref}
            className="flex whitespace-nowrap will-change-transform"
            style={{
              transform: `translate3d(${wrap2}px, 0, 0)`,
            }}
          >
            {duplicatedItemsSec.map((item, index) => (
              <div key={index} className="flex items-center shrink-0">
                <span
                  style={textColor ? { color: textColor } : undefined}
                  className={cn(
                    "font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase px-4 transition-colors",
                    outlineText
                      ? !textColor && "text-[var(--text-primary)]"
                      : "text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] hover:[-webkit-text-stroke:1.5px_var(--accent-green)]"
                  )}
                >
                  {item}
                </span>
                <span className="text-xl sm:text-3xl text-[var(--accent-green)] mx-3 opacity-75">
                  {separator}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ScrollMarquee.displayName = "ScrollMarquee";

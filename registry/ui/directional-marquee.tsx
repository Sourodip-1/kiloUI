"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DirectionalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  track1Text?: string;
  track2Text?: string;
  baseSpeed?: number;
  scrollMultiplier?: number;
  manualDirection?: "up" | "down" | "auto";
  showHud?: boolean;
  repeat?: number;
  separator?: string;
  textColor?: string;
  blurColor?: string; // "mask" (default CSS alpha gradient mask) or any CSS color
  interactiveWheel?: boolean;
}

export const DirectionalMarquee = React.forwardRef<HTMLDivElement, DirectionalMarqueeProps>(
  (
    {
      className,
      track1Text = "HYPER SPEED • NEURAL ENGINE • SUB-MILLISECOND LATENCY • PARALLEL COMPUTE •",
      track2Text = "CONTINUOUS DISCOVERY • QUANTUM GRAPHICS • SPATIAL INTERFACES • VECTOR PRECISION •",
      baseSpeed = 1.2,
      scrollMultiplier = 2.4,
      manualDirection = "auto",
      showHud = true,
      repeat = 4,
      separator = "✦",
      textColor,
      blurColor = "mask",
      interactiveWheel = true,
      ...props
    },
    ref
  ) => {
    // Current scroll direction state: "down" or "up"
    const [scrollDir, setScrollDir] = React.useState<"down" | "up">("down");
    const [isScrolling, setIsScrolling] = React.useState(false);

    // Track offsets
    const [offset1, setOffset1] = React.useState(0);
    const [offset2, setOffset2] = React.useState(0);

    const prevScrollY = React.useRef(0);
    const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const velocityBoost = React.useRef(0);
    const effectiveDir = React.useRef<"down" | "up">("down");
    const animId = React.useRef<number | null>(null);

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
    }, [updateWidths, track1Text, track2Text, repeat]);

    // Sync manualDirection with effectiveDir
    React.useEffect(() => {
      if (manualDirection !== "auto") {
        effectiveDir.current = manualDirection;
        setScrollDir(manualDirection);
      }
    }, [manualDirection]);

    // Track window scroll velocity and direction
    React.useEffect(() => {
      if (manualDirection !== "auto") return;

      const handleScroll = () => {
        if (typeof window === "undefined") return;
        const currentY = window.scrollY;
        const delta = currentY - prevScrollY.current;
        prevScrollY.current = currentY;

        if (Math.abs(delta) > 1.2) {
          const dir = delta > 0 ? "down" : "up";
          effectiveDir.current = dir;
          setScrollDir(dir);
          setIsScrolling(true);

          velocityBoost.current = Math.min(8, Math.abs(delta) * 0.25);

          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
          scrollTimeout.current = setTimeout(() => {
            setIsScrolling(false);
          }, 180);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      };
    }, [manualDirection]);

    // Handle interactive mouse wheel
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      if (!interactiveWheel) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 0.5) return;

      if (manualDirection === "auto") {
        const dir = delta > 0 ? "down" : "up";
        effectiveDir.current = dir;
        setScrollDir(dir);
        setIsScrolling(true);
      }

      velocityBoost.current = Math.min(10, Math.abs(delta) * 0.35);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    // Constant rotation animation loop with dynamic directional physics
    React.useEffect(() => {
      let isMounted = true;

      const loop = () => {
        if (!isMounted) return;

        // Smooth velocity boost decay
        velocityBoost.current *= 0.94;
        const currentSpeed = baseSpeed + velocityBoost.current * scrollMultiplier;

        // When moving DOWN: Track 1 slides RIGHT (+), Track 2 slides LEFT (-)
        // When moving UP: Track 1 slides LEFT (-), Track 2 slides RIGHT (+)
        const isDown = effectiveDir.current === "down";
        const dir1 = isDown ? 1 : -1;
        const dir2 = isDown ? -1 : 1;

        setOffset1((prev) => prev + dir1 * currentSpeed);
        setOffset2((prev) => prev + dir2 * currentSpeed);

        animId.current = requestAnimationFrame(loop);
      };

      animId.current = requestAnimationFrame(loop);

      return () => {
        isMounted = false;
        if (animId.current) cancelAnimationFrame(animId.current);
      };
    }, [baseSpeed, scrollMultiplier]);

    // Mathematical modulo wrap: never runs out, never cuts off
    const w1 = track1Width || 2000;
    const w2 = track2Width || 2000;
    const wrap1 = ((offset1 % w1) + w1) % w1 - w1;
    const wrap2 = ((offset2 % w2) + w2) % w2 - w2;

    const singleItems1 = React.useMemo(() => {
      return Array.from({ length: repeat }).map(() => track1Text);
    }, [track1Text, repeat]);

    const singleItems2 = React.useMemo(() => {
      return Array.from({ length: repeat }).map(() => track2Text);
    }, [track2Text, repeat]);

    // Double sets of items for seamless infinite wrap
    const duplicatedItems1 = React.useMemo(() => [...singleItems1, ...singleItems1], [singleItems1]);
    const duplicatedItems2 = React.useMemo(() => [...singleItems2, ...singleItems2], [singleItems2]);

    const isMaskBlur = !blurColor || blurColor === "mask";

    return (
      <div
        ref={ref}
        onWheel={handleWheel}
        className={cn(
          "relative w-full overflow-hidden select-none py-8 sm:py-12 flex flex-col justify-center gap-4 sm:gap-6 cursor-grab active:cursor-grabbing",
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
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20"
              style={{
                background: `linear-gradient(to right, ${blurColor}, transparent)`,
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20"
              style={{
                background: `linear-gradient(to left, ${blurColor}, transparent)`,
              }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Dynamic Directional HUD */}
        {showHud && (
          <div className="flex items-center justify-between px-4 sm:px-8 z-30 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs shadow-sm">
              <Compass className="h-3.5 w-3.5 text-[var(--accent-green)] animate-spin [animation-duration:8s]" />
              <span className="text-[var(--text-secondary)]">Scroll Direction:</span>
              <span
                className={cn(
                  "font-bold flex items-center gap-1 transition-colors",
                  scrollDir === "down" ? "text-cyan-400" : "text-amber-400"
                )}
              >
                {scrollDir === "down" ? (
                  <>
                    <ArrowDown className="h-3 w-3" />
                    <span>DOWN (T1 ➔ / T2 ⬅)</span>
                  </>
                ) : (
                  <>
                    <ArrowUp className="h-3 w-3" />
                    <span>UP (T1 ⬅ / T2 ➔)</span>
                  </>
                )}
              </span>
              {isScrolling && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-ping ml-1" />
              )}
            </div>

            <div className="hidden sm:inline-flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]">
              <span>Scroll wheel or page to flip tracks</span>
            </div>
          </div>
        )}

        {/* Track 1: Moves RIGHT on Down, LEFT on Up */}
        <div
          ref={track1Ref}
          className="flex whitespace-nowrap will-change-transform"
          style={{
            transform: `translate3d(${wrap1}px, 0, 0)`,
          }}
        >
          {duplicatedItems1.map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span
                style={textColor ? { color: textColor } : undefined}
                className={cn(
                  "font-mono font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase px-3 transition-colors",
                  !textColor && "text-[var(--text-primary)] hover:text-[var(--accent-green)]"
                )}
              >
                {item}
              </span>
              <span className="text-xl sm:text-2xl text-[var(--accent-green)] mx-2 opacity-75">
                {separator}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2: Moves LEFT on Down, RIGHT on Up */}
        <div
          ref={track2Ref}
          className="flex whitespace-nowrap will-change-transform"
          style={{
            transform: `translate3d(${wrap2}px, 0, 0)`,
          }}
        >
          {duplicatedItems2.map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span
                style={textColor ? { color: textColor } : undefined}
                className={cn(
                  "font-mono font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase px-3 transition-colors",
                  !textColor &&
                    "text-transparent [-webkit-text-stroke:1px_var(--text-primary)] hover:[-webkit-text-stroke:1px_var(--accent-green)]"
                )}
              >
                {item}
              </span>
              <span className="text-xl sm:text-2xl text-[var(--accent-green)] mx-2 opacity-75">
                {separator}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

DirectionalMarquee.displayName = "DirectionalMarquee";

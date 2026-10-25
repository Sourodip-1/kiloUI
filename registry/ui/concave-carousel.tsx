"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────── */
/* Types                                                                */
/* ─────────────────────────────────────────────────────────────────── */
export interface ConcaveCarouselItem {
  id: string | number;
  title?: string;
  subtitle?: string;
  image?: string;
  gradient?: string;
}

export interface ConcaveCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ConcaveCarouselItem[];
  preset?: "Rotunda" | "Tunnel" | "Flat" | "Panoramic" | "Convex";
  autoplay?: "Drift" | "None" | "Step";
  background?: string;
  aspect?: number;
  size?: number;
  curvature?: number;
  distance?: number;
  tilt?: number;
  gap?: number;
  radius?: number;
  reflection?: number;
  dim?: number;
  speed?: number;
  interval?: number;
  inertia?: number;
  snap?: boolean;
  wheel?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  captions?: boolean;
  controls?: boolean;
  paused?: boolean;
  onIndexChange?: (index: number) => void;
}

/* ─────────────────────────────────────────────────────────────────── */
/* Default Curated Abstract Art Items matching Image 2                  */
/* ─────────────────────────────────────────────────────────────────── */
export const DEFAULT_CONCAVE_ITEMS: ConcaveCarouselItem[] = [
  {
    id: 1,
    title: "Solar Flare",
    subtitle: "Radiant warmth in geometric harmony",
    gradient: "radial-gradient(circle at 35% 35%, #ff5e3a 0%, #ff2a6d 45%, #05051a 90%)",
  },
  {
    id: 2,
    title: "Chroma Drift",
    subtitle: "Fluid color resonance across time",
    gradient: "radial-gradient(circle at 65% 30%, #7928ca 0%, #ff0080 50%, #1a002c 95%)",
  },
  {
    id: 3,
    title: "Cosmic Horizon",
    subtitle: "Deep space nebula gradients",
    gradient: "linear-gradient(135deg, #00f2fe 0%, #4facfe 35%, #000428 95%)",
  },
  {
    id: 4,
    title: "Velvet Bloom",
    subtitle: "Organic soft curves in dusk twilight",
    gradient: "radial-gradient(circle at 25% 75%, #f12711 0%, #f5af19 50%, #430d4b 95%)",
  },
  {
    id: 5,
    title: "Neon Synthesis",
    subtitle: "Cybernetic light beam refraction",
    gradient: "linear-gradient(45deg, #11998e 0%, #38ef7d 40%, #0c2b2f 90%)",
  },
  {
    id: 6,
    title: "Rose balance",
    subtitle: "A bright point of balance",
    gradient: "radial-gradient(circle at 80% 20%, #ff0844 0%, #ffb199 45%, #7a003c 85%, #180010 100%)",
  },
  {
    id: 7,
    title: "Amber loop",
    subtitle: "Warmth around an open center",
    gradient: "radial-gradient(circle at 30% 70%, #f77062 0%, #fe5196 35%, #fbb034 75%, #300020 100%)",
  },
  {
    id: 8,
    title: "Eclipse Shadow",
    subtitle: "Monolithic contrast and quiet dusk",
    gradient: "linear-gradient(155deg, #eb3349 0%, #f45c43 40%, #14142b 85%)",
  },
];

/* ─────────────────────────────────────────────────────────────────── */
/* ConcaveCarousel Component                                            */
/* ─────────────────────────────────────────────────────────────────── */
export function ConcaveCarousel({
  items = DEFAULT_CONCAVE_ITEMS,
  preset = "Rotunda",
  autoplay = "Drift",
  background = "#0A0A0A",
  aspect = 1.25,
  size = 0.46,
  curvature = 0.72,
  distance = 4.0,
  tilt = 0.0,
  gap = 16,
  radius = 14,
  reflection = 0.06,
  dim = 0.35,
  speed = 0.16,
  interval = 4.0,
  inertia = 0.5,
  snap = false,
  wheel = true,
  draggable = true,
  pauseOnHover = true,
  captions = true,
  controls = true,
  paused = false,
  onIndexChange,
  className,
  style,
  ...props
}: ConcaveCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Position state (fractional item index, e.g. 5.0 = item 6 active)
  const [position, setPosition] = React.useState<number>(5.0);
  const targetPosRef = React.useRef<number>(5.0);
  const velocityRef = React.useRef<number>(0);
  const isHoveredRef = React.useRef<boolean>(false);
  const isDraggingRef = React.useRef<boolean>(false);
  const dragStartXRef = React.useRef<number>(0);
  const dragStartPosRef = React.useRef<number>(5.0);
  const lastDragTimeRef = React.useRef<number>(0);

  const totalItems = items.length;

  // Active integer index for controls & pagination display
  const activeIndex = (Math.round(position) % totalItems + totalItems) % totalItems;

  React.useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  // Handle Preset Overrides
  const effectiveCurvature = React.useMemo(() => {
    if (preset === "Flat") return 0.0;
    if (preset === "Tunnel") return 1.1;
    if (preset === "Panoramic") return 0.45;
    if (preset === "Convex") return -0.72;
    return curvature; // "Rotunda" or custom uses the slider curvature
  }, [preset, curvature]);

  /* ── 60 FPS Physics & Inertia Loop ── */
  React.useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const isAutoplayActive = !paused && (!pauseOnHover || !isHoveredRef.current) && !isDraggingRef.current;

      // Autoplay: Drift mode (continuous smooth revolving)
      if (isAutoplayActive && autoplay === "Drift") {
        targetPosRef.current += speed * dt * 0.9;
      }

      // Smooth lerping to target position with inertia
      const friction = 1 - Math.pow(0.001, dt * (1.1 - inertia * 0.5));
      const posDiff = targetPosRef.current - position;

      if (!isDraggingRef.current) {
        if (snap) {
          // Snap spring toward nearest integer
          const targetSnap = Math.round(targetPosRef.current);
          targetPosRef.current += (targetSnap - targetPosRef.current) * (0.08 + speed * 0.1);
        }

        velocityRef.current += posDiff * friction * 0.35;
        velocityRef.current *= Math.pow(0.2, dt);
        setPosition((prev) => prev + (targetPosRef.current - prev) * 0.14 + velocityRef.current * dt);
      } else {
        // Direct follow during drag
        setPosition((prev) => prev + (targetPosRef.current - prev) * 0.35);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [autoplay, speed, inertia, snap, paused, pauseOnHover, position]);

  // Autoplay: Step mode
  React.useEffect(() => {
    if (autoplay !== "Step" || paused) return;

    const timer = setInterval(() => {
      if (pauseOnHover && isHoveredRef.current) return;
      if (isDraggingRef.current) return;
      targetPosRef.current = Math.round(targetPosRef.current) + 1;
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [autoplay, interval, pauseOnHover, paused]);

  /* ── Wheel scroll interaction ("yea on scroll it will scroll") ── */
  const handleWheel = React.useCallback(
    (e: React.WheelEvent) => {
      if (!wheel) return;
      // Accept vertical or horizontal mouse wheel / trackpad scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 1) return;

      e.preventDefault();
      const sensitivity = 0.0022 * (speed > 0 ? speed * 6 : 1);
      targetPosRef.current += delta * sensitivity;
    },
    [wheel, speed]
  );

  /* ── Pointer Drag interaction ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = targetPosRef.current;
    lastDragTimeRef.current = performance.now();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const now = performance.now();
    const dt = Math.max(now - lastDragTimeRef.current, 1);
    lastDragTimeRef.current = now;

    const dragSensitivity = 0.0028;
    targetPosRef.current = dragStartPosRef.current - dx * dragSensitivity;
    velocityRef.current = -(dx / dt) * 0.003;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    if (snap) {
      targetPosRef.current = Math.round(targetPosRef.current);
    }
  };

  const handlePrev = () => {
    targetPosRef.current = Math.round(targetPosRef.current) - 1;
  };

  const handleNext = () => {
    targetPosRef.current = Math.round(targetPosRef.current) + 1;
  };

  /* ── Render 3D Concave Arc Layout ── */
  // View range: show 5-7 cards surrounding the center position
  const visibleCardIndices: number[] = [];
  const range = 3;
  const centerInt = Math.round(position);

  for (let offset = -range; offset <= range; offset++) {
    visibleCardIndices.push(centerInt + offset);
  }

  // Base card dimensions derived from size & aspect
  const baseCardWidth = Math.round(360 * (size / 0.46));
  const baseCardHeight = Math.round(baseCardWidth / aspect);

  // Perspective camera distance in px
  const perspectivePx = Math.round(distance * 280);

  // Active item details for caption display
  const currentActiveItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className={cn(
        "relative w-full overflow-hidden select-none flex flex-col items-center justify-center py-10 sm:py-16 cursor-grab active:cursor-grabbing",
        className
      )}
      style={{
        backgroundColor: background,
        ...style,
      }}
      {...props}
    >
      {/* 3D Scene Viewport with Concave Perspective */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          perspective: `${perspectivePx}px`,
          perspectiveOrigin: "50% 50%",
          height: `${baseCardHeight + 140}px`,
        }}
      >
        {/* Concave Arc Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt}deg)`,
          }}
        >
          {visibleCardIndices.map((virtualIdx) => {
            // Modulo wrapped real item index
            const realIdx = ((virtualIdx % totalItems) + totalItems) % totalItems;
            const item = items[realIdx];
            if (!item) return null;

            // Offset from fractional center position
            const offset = virtualIdx - position;

            // Arc Geometry:
            // When effectiveCurvature > 0: concave (sides bend backward into screen, z < 0)
            // When effectiveCurvature < 0: convex / forward-bending (sides bend forward toward viewer, z > 0)
            const spacing = baseCardWidth + gap;
            const x = offset * spacing;
            const z = -Math.abs(offset) * (effectiveCurvature * 120) - Math.pow(offset, 2) * (effectiveCurvature * 38);
            const rotateY = -offset * (effectiveCurvature * 24); // cylindrical arc turn

            // Distance dimming
            const cardDim = Math.max(0.15, 1 - Math.abs(offset) * dim);

            // Dynamic depth sorting: when bending forward (negative curvature), outer cards are physically closer in Z
            const zIndexVal = effectiveCurvature < 0
              ? Math.round(100 + Math.abs(offset) * 10)
              : Math.round(100 - Math.abs(offset) * 10);

            return (
              <div
                key={virtualIdx}
                className="absolute will-change-transform transition-opacity duration-150"
                style={{
                  width: `${baseCardWidth}px`,
                  height: `${baseCardHeight}px`,
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                  opacity: cardDim,
                  zIndex: zIndexVal,
                }}
              >
                {/* 1. Main Artwork Card */}
                <div
                  className="relative w-full h-full overflow-hidden border border-white/10 shadow-2xl transition-all duration-300"
                  style={{
                    borderRadius: `${radius}px`,
                    background: item.gradient || "linear-gradient(135deg, #ff007f 0%, #7928ca 100%)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Internal ambient highlight sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none" />

                  {/* High quality custom image artwork if present */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title || "Carousel item"}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  )}
                </div>

                {/* 2. Mirrored Surface Floor Reflection (matching Image 2 & reflection slider) */}
                {reflection > 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 pointer-events-none overflow-hidden"
                    style={{
                      top: `${baseCardHeight + 8}px`,
                      height: `${baseCardHeight * 0.45}px`,
                      borderRadius: `${radius}px`,
                      background: item.gradient || "linear-gradient(135deg, #ff007f 0%, #7928ca 100%)",
                      transform: "scaleY(-1)",
                      opacity: reflection,
                      maskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.8) 100%)",
                      WebkitMaskImage: "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.8) 100%)",
                      filter: "blur(2px)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Captions Under Active Center Item matching Image 2 */}
      {captions && currentActiveItem && (
        <div className="relative z-20 flex flex-col items-center justify-center text-center mt-3 mb-4 space-y-1 transition-opacity duration-300 pointer-events-none">
          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            {currentActiveItem.title}
          </h3>
          <p className="text-xs text-neutral-400 font-normal">
            {currentActiveItem.subtitle}
          </p>
        </div>
      )}

      {/* Bottom Navigation Controls `< 06 / 08 >` matching Image 2 */}
      {controls && (
        <div className="relative z-20 inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-lg">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="font-mono text-xs text-neutral-300 font-medium tabular-nums px-1">
            {String(activeIndex + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={handleNext}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next item"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StackCardItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  meta?: string;
  accentColor?: string;
  codeSnippet?: string;
}

export interface StackCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: StackCardItem[];
  variant?: "perspective-stack" | "fan-out" | "cyber-deck" | "minimal-swipe";
  cardWidth?: number | string;
  cardHeight?: number | string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

const defaultCards: StackCardItem[] = [
  {
    id: "card-1",
    title: "Quantum State Vectorizer",
    description: "Multi-threaded matrix multiplication pipeline running directly in WebAssembly with SIMD acceleration.",
    tag: "SIMD V4",
    meta: "LATENCY: 0.8ms",
    accentColor: "#ffffff",
    codeSnippet: "const vec = new QuantumVector({ dim: 1024, simd: true });"
  },
  {
    id: "card-2",
    title: "Reticle Coordinate Shaper",
    description: "Sub-pixel raycaster with adaptive antialiasing and GPU rasterized screen-space ambient occlusion.",
    tag: "RAY-TRACING",
    meta: "FPS: 144Hz",
    accentColor: "#00E5FF",
    codeSnippet: "gl.bindReticleBuffer(shaderPass.getUniformLocation('u_cad'));"
  },
  {
    id: "card-3",
    title: "Zero-Overhead Memory Pool",
    description: "Ring buffer allocator keeping GC pause times strictly under 200 microseconds across heavy bursts.",
    tag: "SYS-ALLOC",
    meta: "GC: 0.18ms",
    accentColor: "#A855F7",
    codeSnippet: "allocator.reservePages(64, MemoryProtection.ReadWrite);"
  },
  {
    id: "card-4",
    title: "Distributed Edge Relayer",
    description: "Ultra-low jitter P2P synchronization with cryptographic hash chains and automatic consensus healing.",
    tag: "P2P PROTOCOL",
    meta: "NODES: 4,096",
    accentColor: "#FFB000",
    codeSnippet: "peerMesh.broadcastSync(packet.sealWithKey(sessionKey));"
  }
];

export function StackCards({
  items = defaultCards,
  variant = "perspective-stack",
  cardWidth = 380,
  cardHeight = 240,
  autoPlay = false,
  autoPlayIntervalMs = 4000,
  className,
  ...props
}: StackCardsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [dragX, setDragX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartX = React.useRef(0);

  const total = items.length;

  const nextCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setDragX(0);
  }, [total]);

  const prevCard = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setDragX(0);
  }, [total]);

  React.useEffect(() => {
    if (!autoPlay || isHovered || isDragging) return;
    const interval = setInterval(nextCard, autoPlayIntervalMs);
    return () => clearInterval(interval);
  }, [autoPlay, isHovered, isDragging, autoPlayIntervalMs, nextCard]);

  // Pointer drag gestures on top card
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    setDragX(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}

    if (dragX > 70) {
      prevCard();
    } else if (dragX < -70) {
      nextCard();
    } else {
      setDragX(0);
    }
  };

  const isFanOut = variant === "fan-out";
  const isCyber = variant === "cyber-deck";
  const isMinimal = variant === "minimal-swipe";

  return (
    <div 
      className={cn("w-full flex flex-col items-center justify-center p-6 select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) {
          setIsDragging(false);
          setDragX(0);
        }
      }}
      {...props}
    >
      {/* 3D Stack Viewport */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          width: typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
          height: typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
          perspective: "1200px",
          transformStyle: "preserve-3d"
        }}
      >
        {items.map((card, idx) => {
          const offset = (idx - activeIndex + total) % total;
          const isTop = offset === 0;

          // Compute silky smooth hardware-accelerated transforms
          let transform = "";
          let opacity = 1;
          const zIndex = isTop ? 20 : total - offset;

          if (isTop && isDragging) {
            // Smoothly track pointer drag
            const rotate = dragX * 0.08;
            transform = `translate3d(${dragX}px, 0px, 0px) rotate(${rotate}deg)`;
          } else if (isFanOut && isHovered) {
            // Stable, smooth fan-out without jitter
            const spread = (offset - (total - 1) / 2) * 54;
            const rotate = (offset - (total - 1) / 2) * 7.5;
            const translateY = Math.abs(offset - (total - 1) / 2) * 8;
            transform = `translate3d(${spread}px, ${translateY}px, ${-offset * 25}px) rotate(${rotate}deg) scale(${1 - offset * 0.03})`;
            opacity = 1 - offset * 0.12;
          } else if (isMinimal) {
            // Clean offset with gentle scaling
            const hoverLift = isHovered ? offset * 4 : 0;
            const translateY = offset * 14 + hoverLift;
            const scale = 1 - offset * 0.04;
            transform = `translate3d(0px, ${translateY}px, ${-offset * 30}px) scale(${scale})`;
            opacity = offset > 2 ? 0 : 1 - offset * 0.22;
          } else {
            // Default perspective stack and cyber deck with smooth hover expansion
            const hoverLift = isHovered ? 8 : 0;
            const translateY = offset * (12 + hoverLift) + (isTop && isHovered ? -6 : 0);
            const translateZ = -offset * (32 + (isHovered ? 12 : 0));
            const scale = 1 - offset * 0.04;
            const rotateX = offset * 2.5;
            transform = `translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`;
            opacity = offset > 3 ? 0 : 1 - offset * 0.18;
          }

          const cardAccent = card.accentColor || "#5CA904";

          return (
            <div
              key={card.id}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerUp : undefined}
              onClick={() => {
                if (!isTop) {
                  setActiveIndex(idx);
                }
              }}
              className={cn(
                "absolute inset-0 rounded-2xl p-5 flex flex-col justify-between overflow-hidden",
                "bg-[#0E1013] border shadow-2xl",
                isTop ? "cursor-grab active:cursor-grabbing" : "cursor-pointer hover:border-white/30"
              )}
              style={{
                transform,
                opacity,
                zIndex,
                borderColor: isTop ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                boxShadow: isTop 
                  ? "0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)" 
                  : "0 10px 25px -5px rgba(0,0,0,0.6)",
                transition: isDragging && isTop 
                  ? "none" 
                  : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, box-shadow 0.3s ease, border-color 0.25s ease",
                willChange: "transform, opacity"
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-3 pointer-events-none">
                <div className="flex items-center gap-2">
                  {card.tag && (
                    <span 
                      className="text-[10px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/80"
                    >
                      {card.tag}
                    </span>
                  )}
                </div>
                {card.meta && (
                  <span className="text-[10px] font-mono text-white/40">
                    {card.meta}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="my-auto space-y-1.5 py-2 pointer-events-none">
                <h3 className="text-base font-semibold text-white tracking-tight flex items-center justify-between">
                  <span>{card.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/30" />
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between pointer-events-none">
                {card.codeSnippet ? (
                  <code className="text-[10px] font-mono text-white/50 truncate max-w-[280px]">
                    {card.codeSnippet}
                  </code>
                ) : (
                  <span className="text-[10px] font-mono text-white/30">
                    CLICK TO BRING TO FRONT
                  </span>
                )}
                <span className="text-[10px] font-mono text-white/40 shrink-0">
                  #{idx + 1}/{total}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Pagination Dots */}
      <div className="flex items-center gap-4 mt-8">
        <button
          type="button"
          onClick={prevCard}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
          title="Previous card"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === i 
                  ? "w-6 bg-white" 
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextCard}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
          title="Next card"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

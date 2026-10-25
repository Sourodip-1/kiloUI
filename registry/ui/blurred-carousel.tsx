"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Eye, Heart, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  category?: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  stats: {
    views: string;
    likes: number | string;
  };
  badge?: string;
  href?: string;
}

export interface BlurredCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  items?: CarouselItem[];
  autoPlay?: boolean;
  intervalMs?: number;
}

const DEFAULT_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: "apex",
    title: "Apex - Cloud Development Studio",
    category: "Developer Platform",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Acme Labs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "8.4K",
      likes: "412",
    },
    badge: "Featured",
  },
  {
    id: "flowly",
    title: "Flowly - SaaS Analytics Dashboard",
    category: "SaaS Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Alex Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "6.2K",
      likes: "358",
    },
    badge: "Popular",
  },
  {
    id: "spectra",
    title: "Spectra - Web3 Crypto Terminal",
    category: "Fintech Terminal",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Marcus Sterling",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "5.1K",
      likes: "284",
    },
    badge: "New",
  },
  {
    id: "prism",
    title: "Prism - Design System UI Kit",
    category: "UI System",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "4.9K",
      likes: "318",
    },
    badge: "Design",
  },
  {
    id: "vortex",
    title: "Vortex - Distributed Cloud Runtime",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "DevCore Studio",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "3.8K",
      likes: "215",
    },
    badge: "Enterprise",
  },
  {
    id: "omni",
    title: "Omni - Spatial 3D Experience",
    category: "Spatial UI",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Studio Mono",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "7.2K",
      likes: "490",
    },
    badge: "AI Powered",
  },
  {
    id: "hyperion",
    title: "Hyperion - Generative Audio Engine",
    category: "Neural Audio",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "SoundWave AI",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "9.1K",
      likes: "634",
    },
    badge: "Audio Lab",
  },
  {
    id: "zenith",
    title: "Zenith - Autonomous Cyber Intelligence",
    category: "Security Core",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    author: {
      name: "Cipher Works",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80",
    },
    stats: {
      views: "11.4K",
      likes: "820",
    },
    badge: "Quantum",
  },
];

export const BlurredCarousel = React.forwardRef<HTMLDivElement, BlurredCarouselProps>(
  (
    {
      className,
      title = "Featured Templates",
      subtitle,
      items = DEFAULT_CAROUSEL_ITEMS,
      autoPlay = false,
      intervalMs = 4500,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [trackOffset, setTrackOffset] = React.useState(0);
    const maxIndex = Math.max(0, items.length - 1);

    const prevSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    }, [maxIndex]);

    const nextSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, [maxIndex]);

    // Recalculate pixel offset of target slide
    const updateOffset = React.useCallback(() => {
      if (!trackRef.current) return;
      const targetChild = trackRef.current.children[currentIndex] as HTMLElement | undefined;
      if (targetChild) {
        setTrackOffset(targetChild.offsetLeft);
      }
    }, [currentIndex]);

    React.useEffect(() => {
      updateOffset();
      window.addEventListener("resize", updateOffset);
      return () => window.removeEventListener("resize", updateOffset);
    }, [updateOffset]);

    // Optional autoplay
    React.useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(() => {
        nextSlide();
      }, intervalMs);
      return () => clearInterval(timer);
    }, [autoPlay, intervalMs, nextSlide]);

    return (
      <div
        ref={ref}
        className={cn("relative w-full max-w-6xl mx-auto space-y-4 select-none", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div>
            <h2 className="font-mono text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-sans">
                {subtitle}
              </p>
            )}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  currentIndex === idx
                    ? "w-6 bg-[var(--text-primary)]"
                    : "w-1.5 bg-[var(--text-muted)] hover:bg-[var(--text-secondary)]"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Viewport Container with Soft Flowing Edge Fade */}
        <div className="relative w-full">
          {/* Masked Viewport: cards naturally and seamlessly fade at outer boundaries */}
          <div
            className="relative w-full overflow-hidden rounded-2xl py-2 px-1"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
          >
            {/* Subtle flowing left edge blur that softly dissipates into clarity */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 backdrop-blur-xs"
              style={{
                WebkitMaskImage: "linear-gradient(to right, black 15%, transparent 100%)",
                maskImage: "linear-gradient(to right, black 15%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Subtle flowing right edge blur that softly dissipates into clarity */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 backdrop-blur-xs"
              style={{
                WebkitMaskImage: "linear-gradient(to left, black 15%, transparent 100%)",
                maskImage: "linear-gradient(to left, black 15%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Sliding Cards Track with EXACT transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) */}
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 will-change-transform"
              style={{
                transform: `translate3d(-${trackOffset}px, 0, 0)`,
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {items.map((item, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "relative shrink-0 w-[85%] sm:w-[48%] md:w-[38%] lg:w-[32%] rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 transition-all duration-300 group cursor-pointer",
                      isSelected
                        ? "ring-1 ring-[var(--accent-green)]/40 shadow-xl border-[var(--border-hover)]"
                        : "opacity-90 hover:opacity-100 hover:border-[var(--border-hover)]"
                    )}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {/* Image Card Shell */}
                    <div className="relative h-48 sm:h-56 w-full rounded-lg overflow-hidden bg-[var(--surface-secondary)]/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badge */}
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5">
                          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                            {item.badge}
                          </span>
                        </div>
                      )}

                      {/* Quick Link on Hover */}
                      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Metadata Row */}
                    <div className="mt-3 flex items-center justify-between gap-2 px-1">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Author Avatar or Icon */}
                        {item.author.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.author.avatar}
                            alt={item.author.name}
                            className="h-6 w-6 rounded-full object-cover border border-[var(--border)] shrink-0"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                            {item.author.name.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="font-mono text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-green)] transition-colors">
                            {item.title}
                          </h3>
                          <div className="text-[10px] text-[var(--text-muted)] truncate">
                            {item.category || item.author.name}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2.5 font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3 opacity-70" />
                          <span>{item.stats.views}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-rose-500 fill-rose-500/20" />
                          <span>{item.stats.likes}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal Left Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute -left-3 sm:left-1 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)]/90 hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent-green)]/50 shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.25]" />
          </button>

          {/* Minimal Right Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute -right-3 sm:right-1 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)]/90 hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent-green)]/50 shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.25]" />
          </button>
        </div>
      </div>
    );
  }
);

BlurredCarousel.displayName = "BlurredCarousel";

"use client";

import * as React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandingCardImage {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

export interface ExpandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badge?: string;
  images?: ExpandingCardImage[];
  interactive?: boolean;
  forcedHover?: boolean;
}

const DEFAULT_IMAGES: ExpandingCardImage[] = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
    alt: "Modern IDE Code Architecture",
    title: "Primitives",
    subtitle: "Core UI atoms",
    tag: "Featured",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
    alt: "Realtime Analytics Dashboard",
    title: "Telemetry",
    subtitle: "Performance metrics",
    tag: "New",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80",
    alt: "Cybersecurity Terminal Stream",
    title: "Runtime",
    subtitle: "Edge worker compute",
    tag: "Popular",
  },
  {
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
    alt: "Design System UI Studio",
    title: "Systems",
    subtitle: "Components & tokens",
    tag: "Updated",
  },
];

export const ExpandingCard = React.forwardRef<HTMLDivElement, ExpandingCardProps>(
  (
    {
      className,
      title = "Components",
      subtitle = "Hover to reveal full showcase view",
      badge,
      images = DEFAULT_IMAGES,
      forcedHover = false,
      ...props
    },
    ref
  ) => {
    const [isInternalHovered, setIsInternalHovered] = React.useState(false);
    const isHovered = forcedHover || isInternalHovered;

    const imgList = images.slice(0, 4);
    const firstImg = imgList[0] || DEFAULT_IMAGES[0];
    const otherImgs = imgList.slice(1);

    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsInternalHovered(true)}
        onMouseLeave={() => setIsInternalHovered(false)}
        className={cn(
          "group relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
          "hover:border-[var(--border-hover)] hover:shadow-2xl",
          className
        )}
        {...props}
      >
        {/* Top subtle gradient glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[var(--accent-green)]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

        {/* 4-Card Stage Container */}
        <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[var(--surface-secondary)]/50 border border-[var(--border)]/70">
          {/* Background grid showing the 4 slots */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2">
            {/* Slot 1 Placeholder / Spacer behind the expanding item */}
            <div className="relative rounded-lg overflow-hidden bg-black/20" />

            {/* Slots 2, 3, 4 (fade out & shrink smoothly on hover) */}
            {otherImgs.map((img, idx) => (
              <div
                key={idx}
                className={cn(
                  "relative rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-95 group-hover:opacity-0 group-hover:blur-xs",
                  isHovered ? "scale-95 opacity-0 blur-xs" : "scale-100 opacity-100 blur-none"
                )}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Dark vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Sub-card label info */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  {img.tag && (
                    <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-xs mb-1">
                      {img.tag}
                    </span>
                  )}
                  <div className="text-xs font-bold leading-tight truncate">
                    {img.title}
                  </div>
                  {img.subtitle && (
                    <div className="text-[10px] text-white/70 truncate">
                      {img.subtitle}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FIRST IMAGE - Acquires the WHOLE 4-card space on hover! */}
          <div
            className={cn(
              "absolute z-20 overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,height,top,left]",
              // In default state: occupies top-left slot (padding 8px, roughly width calc(50% - 12px), height calc(50% - 12px))
              !isHovered &&
                "top-2 left-2 w-[calc(50%-12px)] h-[calc(50%-12px)] rounded-lg",
              // In hovered state: expands to acquire the whole 4-card space!
              isHovered &&
                "top-0 left-0 w-full h-full rounded-xl shadow-2xl"
            )}
          >
            {/* Expanded Hero Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImg.src}
              alt={firstImg.alt}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isHovered ? "scale-105" : "scale-100"
              )}
            />

            {/* Dynamic overlay tint */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                isHovered
                  ? "bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                  : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              )}
            />

            {/* First Image Content Pill */}
            <div
              className={cn(
                "absolute bottom-2.5 left-2.5 right-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-white",
                isHovered && "bottom-4 left-4 right-16"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-green)]/90 text-black">
                  <Sparkles className="h-2.5 w-2.5" />
                  <span>{firstImg.tag || "Primary"}</span>
                </span>
                {isHovered && (
                  <span className="text-[10px] font-mono text-white/70 animate-in fade-in duration-300">
                    Full Preview Active
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "font-bold leading-tight tracking-tight transition-all duration-300",
                  isHovered ? "text-base sm:text-lg" : "text-xs"
                )}
              >
                {firstImg.title}
              </div>

              <p
                className={cn(
                  "text-white/80 line-clamp-1 transition-all duration-300",
                  isHovered ? "text-xs sm:text-sm mt-0.5 opacity-100" : "text-[10px] opacity-80"
                )}
              >
                {isHovered
                  ? "Expanded to full 4-card stage with high-fidelity preview"
                  : firstImg.subtitle}
              </p>
            </div>

            {/* Bottom-right appearing Arrow */}
            <div
              className={cn(
                "absolute bottom-3.5 right-3.5 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer",
                isHovered
                  ? "opacity-100 translate-y-0 scale-100 rotate-0"
                  : "opacity-0 translate-y-3 scale-75 -rotate-45 pointer-events-none"
              )}
              title="Inspect component"
            >
              <ArrowUpRight className="h-5 w-5 stroke-[2.25]" />
            </div>
          </div>
        </div>

        {/* Bottom Card Label / Metadata */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="font-mono text-base font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
              <span>{title}</span>
              {badge && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]">
                  {badge}
                </span>
              )}
            </h3>
            {subtitle && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div
            className={cn(
              "text-[11px] font-mono text-[var(--accent-green)] transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            )}
          >
            4x expanded
          </div>
        </div>
      </div>
    );
  }
);

ExpandingCard.displayName = "ExpandingCard";

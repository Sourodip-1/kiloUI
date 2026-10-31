"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
import { RegistryItem } from "@/registry/registry-data";
import { VectorComponentIcon } from "@/components/vector-icons";
import { ComponentPreviewStage } from "@/components/component-preview-stage";
import { cn } from "@/lib/utils";

interface ComponentCarouselProps {
  title?: string;
  category?: string;
  items: RegistryItem[];
  seeAllHref?: string;
  seeAllLabel?: string;
  className?: string;
}

export function ComponentCarousel({
  title,
  category,
  items,
  seeAllHref,
  seeAllLabel = "See all",
  className = "",
}: ComponentCarouselProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, items]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.8, 380);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {/* Category / Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {title && (
            <h2 className="font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              <span>{title}</span>
              {category && (
                <span className="text-[10px] text-[var(--text-muted)] font-normal rounded border border-[var(--border)] px-1.5 py-0.5">
                  {items.length}
                </span>
              )}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-2">
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="group flex items-center gap-1 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mr-1 cursor-pointer"
            >
              <span>{seeAllLabel}</span>
              <ArrowRight className="h-3 w-3 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
            </Link>
          )}

          {/* Restrained Carousel Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-1 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-1 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Container with bottom-aligned cards */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory scroll-smooth items-end"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

function getCarouselCardConfig(name: string, category?: string): {
  widthClass: string;
  previewHeightClass: string;
  previewMaxWidthClass: string;
} {
  if (
    category === "Cursors" ||
    name === "firefly-cursor" ||
    name === "magnetic-cursor" ||
    name === "neon-ribbon-cursor" ||
    name === "quantum-particles-cursor" ||
    name === "spotlight-cursor" ||
    name === "elastic-blob-cursor"
  ) {
    return {
      widthClass: "w-[min(440px,calc(100vw-2rem))] sm:w-[500px]",
      previewHeightClass: "h-60 sm:h-64",
      previewMaxWidthClass: "max-w-none w-full",
    };
  }
  if (
    name === "blurred-carousel" ||
    name === "footer" ||
    name === "scroll-marquee" ||
    name === "directional-marquee"
  ) {
    return {
      widthClass: "w-[min(440px,calc(100vw-2rem))] sm:w-[520px]",
      previewHeightClass: "h-48 sm:h-56",
      previewMaxWidthClass: "max-w-none w-full",
    };
  }
  if (name === "expanding-card" || name === "kinetic-text") {
    return {
      widthClass: "w-[min(330px,calc(100vw-2rem))] sm:w-[370px]",
      previewHeightClass: "h-48 sm:h-56",
      previewMaxWidthClass: "max-w-xs sm:max-w-sm",
    };
  }
  if (name === "content-slider") {
    return {
      widthClass: "w-[min(290px,calc(100vw-2rem))] sm:w-[310px]",
      previewHeightClass: "h-44 sm:h-48",
      previewMaxWidthClass: "max-w-[260px]",
    };
  }
  if (name === "sidebar" || name === "tabs" || name === "card" || name === "stat-card" || name === "accordion" || name === "notched-navbar") {
    return {
      widthClass: "w-[min(280px,calc(100vw-2rem))] sm:w-[310px]",
      previewHeightClass: "h-40 sm:h-36",
      previewMaxWidthClass: "max-w-[270px]",
    };
  }
  // Compact default (button, input, switch, badge, dialog)
  return {
    widthClass: "w-[min(250px,calc(100vw-2rem))] sm:w-[270px]",
    previewHeightClass: "h-36 sm:h-32",
    previewMaxWidthClass: "max-w-[220px]",
  };
}

function CarouselItem({ item }: { item: RegistryItem }) {
  const config = getCarouselCardConfig(item.name, item.category);

  return (
    <div
      className={cn(
        "shrink-0 snap-start rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60 hover:border-[var(--border-hover)] transition-all flex flex-col group overflow-hidden",
        config.widthClass
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
        <Link
          href={`/components/${item.name}`}
          className="flex items-center gap-1.5 group/title hover:opacity-90 transition-opacity"
        >
          <VectorComponentIcon
            name={item.name}
            className="h-3.5 w-3.5 text-[var(--text-primary)] group-hover/title:text-[var(--accent-green)] transition-colors"
          />
          <span className="font-mono text-xs font-semibold text-[var(--text-primary)] group-hover/title:text-[var(--accent-green)] transition-colors">
            {item.title}
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-[var(--text-muted)] rounded bg-[var(--surface-secondary)]/60 px-1.5 py-0.5">
            {item.category}
          </span>
          <Link
            href={`/components/${item.name}`}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors"
            title={`View ${item.title} docs`}
          >
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Live Compact Preview */}
      <div
        className={cn(
          "p-3 flex items-center justify-center bg-[var(--bg-main)]/40 relative overflow-hidden",
          config.previewHeightClass
        )}
        onClick={(e) => {
          // Prevent click inside preview from navigating
          e.stopPropagation();
        }}
      >
        <div className={cn("pointer-events-auto flex items-center justify-center w-full", config.previewMaxWidthClass)}>
          <ComponentPreviewStage
            item={item}
            interactive={true}
            showKnobs={false}
            className="border-none bg-transparent p-0 shadow-none space-y-0 w-full"
          />
        </div>
      </div>

      {/* Bottom Footer Description */}
      <div className="px-3 py-2 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 mt-auto flex items-center justify-between text-[11px]">
        <p className="line-clamp-1 text-[var(--text-muted)] pr-2">
          {item.description}
        </p>
        <Link
          href={`/components/${item.name}`}
          className="font-mono text-[10px] text-[var(--accent-green)] hover:underline whitespace-nowrap shrink-0"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}

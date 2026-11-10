"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Heart, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageCardShape =
  | "square"
  | "rounded"
  | "circle"
  | "pill"
  | "arch"
  | "ticket"
  | "hexagon"
  | "octagon"
  | "diamond"
  | "star"
  | "shield"
  | "blob"
  | "cut-corner"
  | "heart"
  | "scallop"
  | "triangle"
  | "parallelogram";

export type ImageCardLayout = "overlay" | "stacked" | "compact";

export interface ShapedImageCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  shape?: ImageCardShape;
  layout?: ImageCardLayout;
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: React.ReactNode;
  aspectRatio?: "1/1" | "4/3" | "16/9" | "3/4" | "4/5" | "2/3";
  overlayVariant?: "gradient" | "glass" | "solid" | "minimal" | "glow";
  alignContent?: "auto" | "left" | "center";
  showBorder?: boolean;
  glow?: boolean;
  interactive?: boolean;
  href?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
}

/**
 * Universal SVG ClipPath definitions embedded once
 * Uses objectBoundingBox (0.0 to 1.0) so all shapes automatically scale to any aspect ratio & size
 */
export function ShapedImageCardDefs() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true" tabIndex={-1}>
      <defs>
        {/* 1. Roman / Cathedral Arch */}
        <clipPath id="kilo-shape-arch" clipPathUnits="objectBoundingBox">
          <path d="M 0,0.4 C 0,0.1 0.18,0 0.5,0 C 0.82,0 1,0.1 1,0.4 L 1,0.95 C 1,0.98 0.98,1 0.95,1 L 0.05,1 C 0.02,1 0,0.98 0,0.95 Z" />
        </clipPath>

        {/* 2. Cinema / Event Ticket with side notched insets */}
        <clipPath id="kilo-shape-ticket" clipPathUnits="objectBoundingBox">
          <path d="M 0.06,0 L 0.94,0 C 0.97,0 1,0.03 1,0.06 L 1,0.38 C 0.93,0.38 0.88,0.43 0.88,0.5 C 0.88,0.57 0.93,0.62 1,0.62 L 1,0.94 C 1,0.97 0.97,1 0.94,1 L 0.06,1 C 0.03,1 0,0.97 0,0.94 L 0,0.62 C 0.07,0.62 0.12,0.57 0.12,0.5 C 0.12,0.43 0.07,0.38 0,0.38 L 0,0.06 C 0,0.03 0.03,0 0.06,0 Z" />
        </clipPath>

        {/* 3. Heraldic Shield / Crest */}
        <clipPath id="kilo-shape-shield" clipPathUnits="objectBoundingBox">
          <path d="M 0.06,0 L 0.94,0 C 0.98,0 1,0.02 1,0.06 L 1,0.54 C 1,0.78 0.65,0.94 0.5,1 C 0.35,0.94 0,0.78 0,0.54 L 0,0.06 C 0,0.02 0.02,0 0.06,0 Z" />
        </clipPath>

        {/* 4. Organic Fluid Morph / Pebble Blob */}
        <clipPath id="kilo-shape-blob" clipPathUnits="objectBoundingBox">
          <path d="M 0.22,0.06 C 0.52,-0.02 0.84,0.04 0.95,0.28 C 1.05,0.54 0.94,0.82 0.78,0.94 C 0.58,1.04 0.26,0.99 0.12,0.82 C -0.04,0.64 -0.02,0.32 0.1,0.16 C 0.13,0.11 0.17,0.08 0.22,0.06 Z" />
        </clipPath>

        {/* 5. Smooth Heart Shape */}
        <clipPath id="kilo-shape-heart" clipPathUnits="objectBoundingBox">
          <path d="M 0.5,0.26 C 0.5,0.26 0.38,-0.02 0.18,0.01 C 0.04,0.04 -0.04,0.24 0.02,0.46 C 0.08,0.7 0.36,0.88 0.5,1 C 0.64,0.88 0.92,0.7 0.98,0.46 C 1.04,0.24 0.96,0.04 0.82,0.01 C 0.62,-0.02 0.5,0.26 0.5,0.26 Z" />
        </clipPath>

        {/* 6. Scallop / Petal Rosette */}
        <clipPath id="kilo-shape-scallop" clipPathUnits="objectBoundingBox">
          <path d="M 0.5,0 C 0.58,0 0.66,0.04 0.72,0.08 C 0.8,0.07 0.88,0.11 0.92,0.18 C 0.98,0.24 1,0.33 0.99,0.41 C 1.03,0.48 1.03,0.58 0.98,0.66 C 0.97,0.74 0.92,0.82 0.84,0.86 C 0.78,0.92 0.68,0.95 0.6,0.95 C 0.52,0.99 0.42,0.99 0.35,0.94 C 0.27,0.92 0.2,0.86 0.16,0.78 C 0.1,0.72 0.05,0.63 0.06,0.54 C 0.03,0.46 0.04,0.36 0.09,0.29 C 0.11,0.21 0.17,0.14 0.25,0.11 C 0.32,0.05 0.41,0.02 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * Returns CSS clipPath string or SVG reference for a given shape
 */
export function getShapeClipPath(shape: ImageCardShape): string {
  switch (shape) {
    case "square":
      return "inset(0 round 0px)";
    case "arch":
      return "url(#kilo-shape-arch)";
    case "ticket":
      return "url(#kilo-shape-ticket)";
    case "shield":
      return "url(#kilo-shape-shield)";
    case "blob":
      return "url(#kilo-shape-blob)";
    case "heart":
      return "url(#kilo-shape-heart)";
    case "scallop":
      return "url(#kilo-shape-scallop)";
    case "hexagon":
      return "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)";
    case "octagon":
      return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
    case "diamond":
      return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    case "star":
      return "polygon(50% 0%, 61% 22%, 85% 15%, 77% 38%, 100% 50%, 77% 62%, 85% 85%, 61% 78%, 50% 100%, 39% 78%, 15% 85%, 23% 62%, 0% 50%, 23% 38%, 15% 15%, 39% 22%)";
    case "cut-corner":
      return "polygon(14% 0%, 100% 0%, 100% 86%, 86% 100%, 0% 100%, 0% 14%)";
    case "pill":
      return "inset(0 round 9999px)";
    case "circle":
      return "circle(50% at 50% 50%)";
    case "triangle":
      return "polygon(50% 4%, 98% 96%, 2% 96%)";
    case "parallelogram":
      return "polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)";
    case "rounded":
    default:
      return "inset(0 round 24px)";
  }
}

export interface ShapeLayoutConfig {
  containerPadding: string;
  topRowPadding?: string;
  bottomAlign: "left" | "center";
  bottomPadding?: string;
  badgeAlign?: "left" | "center";
}

/**
 * Shape-aware layout metrics and boundary insets so badges, text, and buttons
 * conform harmoniously to the optical center and curvature of any geometric silhouette.
 */
export function getShapeLayoutConfig(shape: ImageCardShape): ShapeLayoutConfig {
  switch (shape) {
    case "circle":
      return {
        containerPadding: "p-8 md:p-10",
        topRowPadding: "pt-3 px-3",
        bottomAlign: "center",
        bottomPadding: "pb-4 px-3",
        badgeAlign: "center",
      };
    case "diamond":
      return {
        containerPadding: "p-9 md:p-11",
        topRowPadding: "pt-7 px-5",
        bottomAlign: "center",
        bottomPadding: "pb-8 px-5",
        badgeAlign: "center",
      };
    case "heart":
      return {
        containerPadding: "px-7 pt-8 pb-11 md:px-9 md:pt-9 md:pb-13",
        topRowPadding: "pt-3 px-3",
        bottomAlign: "center",
        bottomPadding: "pb-5 px-3",
        badgeAlign: "center",
      };
    case "shield":
      return {
        containerPadding: "px-6 pt-5 pb-9 md:px-8 md:pt-6 md:pb-11",
        topRowPadding: "px-2",
        bottomAlign: "center",
        bottomPadding: "pb-4 px-3",
        badgeAlign: "left",
      };
    case "star":
      return {
        containerPadding: "p-8 md:p-10",
        topRowPadding: "px-3",
        bottomAlign: "center",
        bottomPadding: "pb-5 px-3",
        badgeAlign: "center",
      };
    case "blob":
      return {
        containerPadding: "p-7 md:p-9",
        topRowPadding: "px-3",
        bottomAlign: "center",
        bottomPadding: "pb-5 px-4",
        badgeAlign: "center",
      };
    case "triangle":
      return {
        containerPadding: "px-10 pt-16 pb-6 md:px-12 md:pt-20 md:pb-8",
        topRowPadding: "justify-center",
        bottomAlign: "center",
        bottomPadding: "pb-2 px-4",
        badgeAlign: "center",
      };
    case "arch":
      return {
        containerPadding: "px-6 pt-9 pb-6 md:px-8 md:pt-11 md:pb-7",
        topRowPadding: "px-2 pt-2",
        bottomAlign: "left",
        bottomPadding: "pb-1",
        badgeAlign: "left",
      };
    case "ticket":
      return {
        containerPadding: "px-8 py-6 md:px-9 md:py-7",
        topRowPadding: "px-1",
        bottomAlign: "left",
        bottomPadding: "px-1",
        badgeAlign: "left",
      };
    case "scallop":
      return {
        containerPadding: "p-7 md:p-9",
        topRowPadding: "px-2",
        bottomAlign: "center",
        bottomPadding: "pb-3 px-2",
        badgeAlign: "center",
      };
    case "pill":
      return {
        containerPadding: "px-8 py-6 md:px-10 md:py-8",
        topRowPadding: "px-2",
        bottomAlign: "center",
        bottomPadding: "px-2",
        badgeAlign: "center",
      };
    case "square":
    case "rounded":
    case "cut-corner":
    case "hexagon":
    case "octagon":
    case "parallelogram":
    default:
      return {
        containerPadding: "p-5 md:p-6",
        topRowPadding: "",
        bottomAlign: "left",
        bottomPadding: "",
        badgeAlign: "left",
      };
  }
}

/**
 * ShapedImageCard
 * Multi-shape image card supporting 16+ architectural, organic, and geometric silhouettes.
 * Responsive, touch-calibrated with spring physics for Web and Mobile.
 */
export function ShapedImageCard({
  shape = "arch",
  layout = "overlay",
  imageSrc,
  imageAlt = "Card image",
  title,
  subtitle,
  description,
  badge,
  aspectRatio = "4/5",
  overlayVariant = "gradient",
  alignContent = "auto",
  showBorder = true,
  glow = false,
  interactive = true,
  href,
  primaryAction,
  secondaryAction,
  className,
  children,
  onClick,
  ...props
}: ShapedImageCardProps) {
  const clipPathStyle = getShapeClipPath(shape);
  const shapeConfig = getShapeLayoutConfig(shape);
  const isCentered = alignContent === "center" || (alignContent !== "left" && shapeConfig.bottomAlign === "center");

  const aspectRatioClass: Record<string, string> = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "3/4": "aspect-[3/4]",
    "4/5": "aspect-[4/5]",
    "2/3": "aspect-[2/3]",
  };

  const overlayVariantClasses: Record<string, string> = {
    gradient: "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
    glass: "bg-black/40 backdrop-blur-md border-t border-white/10",
    solid: "bg-[#090a0a]/90 backdrop-blur-xs",
    minimal: "bg-gradient-to-t from-black/75 to-transparent",
    glow: "bg-gradient-to-t from-black/95 via-[#5CA904]/10 to-transparent",
  };

  const CardWrapper = href ? "a" : "article";
  const wrapperProps = href ? { href } : {};

  // ── Render Overlay Layout (Hero Silhouette) ──
  if (layout === "overlay") {
    return (
      <>
        <ShapedImageCardDefs />
        <motion.article
          onClick={onClick}
          whileHover={interactive ? { y: -4, scale: 1.01 } : undefined}
          whileTap={interactive ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className={cn(
            "group relative flex flex-col font-sans select-none overflow-visible transition-all duration-300",
            glow && "drop-shadow-[0_0_24px_rgba(92,169,4,0.3)]",
            showBorder && "drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]",
            interactive && "cursor-pointer",
            className
          )}
          {...(props as any)}
        >
          {/* Outer Shaped Mask Container */}
          <div
            className={cn(
              "relative w-full overflow-hidden transition-transform duration-500",
              aspectRatioClass[aspectRatio] || "aspect-[4/5]"
            )}
            style={{
              clipPath: clipPathStyle,
              WebkitClipPath: clipPathStyle,
            }}
          >
            {/* Background Image with subtle zoom on hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
              loading="lazy"
            />

            {/* Scrim Overlay */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col justify-between transition-opacity duration-300",
                shapeConfig.containerPadding,
                overlayVariantClasses[overlayVariant]
              )}
            >
              {/* Top Row: Badge or Secondary Action */}
              <div
                className={cn(
                  "flex items-start w-full z-10 gap-2",
                  shapeConfig.topRowPadding,
                  isCentered ? "justify-center relative" : "justify-between"
                )}
              >
                {badge && (
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wide text-white uppercase shadow-sm">
                    {badge}
                  </div>
                )}

                {secondaryAction && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      secondaryAction.onClick?.();
                    }}
                    className={cn(
                      "h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-90",
                      isCentered ? "absolute right-0 top-0" : ""
                    )}
                    title={secondaryAction.label}
                    aria-label={secondaryAction.label}
                  >
                    {secondaryAction.icon || <Share2 className="h-3.5 w-3.5" />}
                  </button>
                )}
              </div>

              {/* Bottom Row: Text Content & Actions */}
              <div
                className={cn(
                  "w-full z-10 space-y-2 mt-auto",
                  shapeConfig.bottomPadding,
                  isCentered ? "flex flex-col items-center text-center" : "text-left"
                )}
              >
                {subtitle && (
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-green)] font-semibold line-clamp-1">
                    {subtitle}
                  </p>
                )}

                {title && (
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight line-clamp-2">
                    {title}
                  </h3>
                )}

                {description && (
                  <p className={cn("text-xs text-neutral-300/90 line-clamp-2 leading-relaxed", isCentered && "max-w-[88%]")}>
                    {description}
                  </p>
                )}

                {primaryAction && (
                  <div className={cn("pt-2", isCentered ? "w-full flex justify-center" : "")}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        primaryAction.onClick?.();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--accent-green)] text-black font-semibold text-xs transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md font-sans"
                    >
                      <span>{primaryAction.label}</span>
                      {primaryAction.icon || <ArrowUpRight className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                )}

                {children}
              </div>
            </div>
          </div>

          {/* Optional Matching Contour Glow Outline */}
          {showBorder && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                clipPath: clipPathStyle,
                WebkitClipPath: clipPathStyle,
                boxShadow: "inset 0 0 0 1.5px rgba(255, 255, 255, 0.15)",
              }}
            />
          )}
        </motion.article>
      </>
    );
  }

  // ── Render Stacked Layout (Gallery Media Header + Content Body) ──
  return (
    <>
      <ShapedImageCardDefs />
      <motion.article
        onClick={onClick}
        whileHover={interactive ? { y: -3 } : undefined}
        whileTap={interactive ? { scale: 0.985 } : undefined}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={cn(
          "group relative flex flex-col font-sans select-none rounded-3xl p-3.5 bg-[var(--surface-elevated)]/60 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300",
          glow && "shadow-[0_0_24px_rgba(92,169,4,0.15)]",
          interactive && "cursor-pointer",
          className
        )}
        {...(props as any)}
      >
        {/* Shaped Media Hero */}
        <div
          className={cn(
            "relative w-full overflow-hidden transition-transform duration-500",
            aspectRatioClass[aspectRatio] || "aspect-[4/3]"
          )}
          style={{
            clipPath: clipPathStyle,
            WebkitClipPath: clipPathStyle,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
            loading="lazy"
          />

          {badge && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wide text-white uppercase shadow-sm">
              {badge}
            </div>
          )}

          {showBorder && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: clipPathStyle,
                WebkitClipPath: clipPathStyle,
                boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.15)",
              }}
            />
          )}
        </div>

        {/* Content Region */}
        <div className="flex flex-col flex-1 pt-3.5 px-1 space-y-2">
          {subtitle && (
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-green)] font-semibold">
              {subtitle}
            </p>
          )}

          {title && (
            <h4 className="text-base font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors line-clamp-1">
              {title}
            </h4>
          )}

          {description && (
            <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction || children) && (
            <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
              {primaryAction && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    primaryAction.onClick?.();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>{primaryAction.label}</span>
                  {primaryAction.icon || <ArrowUpRight className="h-3 w-3 text-[var(--text-muted)]" />}
                </button>
              )}

              {secondaryAction && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    secondaryAction.onClick?.();
                  }}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-all cursor-pointer"
                  title={secondaryAction.label}
                >
                  {secondaryAction.icon || <Heart className="h-3.5 w-3.5" />}
                </button>
              )}

              {children}
            </div>
          )}
        </div>
      </motion.article>
    </>
  );
}


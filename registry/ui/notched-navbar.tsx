"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NotchedNavbarLink {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
}

export type NotchedNavbarPosition = "top" | "down" | "bottom" | "left" | "right";

export type NotchedNavbarVariant =
  | "default"
  | "down"
  | "bottom"
  | "left"
  | "right"
  | "compact"
  | "deep-notch"
  | "dark-slate";

export interface NotchedNavbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Visual variant style or position preset */
  variant?: NotchedNavbarVariant;
  /** Explicit position of the notch cutout along frame edges */
  position?: NotchedNavbarPosition;
  /** Width or length span in pixels of the recessed notch opening (default: 540 horizontal, 280 vertical) */
  notchWidth?: number;
  /** Vertical depth or inset in pixels of the notch cutout (default: 42 horizontal, 54 vertical) */
  notchHeight?: number;
  /** Horizontal or vertical span of the smooth cubic bezier S-curve fillet (default: 24) */
  filletWidth?: number;
  /** Outer frame corner border radius (default: 14) */
  borderRadius?: number;
  /** Inset padding around the dark frame exposing the backdrop (default: 8) */
  whiteBoxPadding?: number;
  /** Background color of the dark framed canvas (default: #222326) */
  frameBg?: string;
  /** Background color of the container backdrop visible in the notch (default: #ffffff) */
  backdropBg?: string;
  /** Navigation tab items */
  links?: NotchedNavbarLink[];
  /** Controlled active tab identifier */
  activeLink?: string;
  /** Uncontrolled default active tab identifier */
  defaultActiveLink?: string;
  /** Callback fired when a tab is selected */
  onLinkClick?: (id: string, link: NotchedNavbarLink) => void;
  /** Minimum height of the interior dark canvas (default: 440) */
  minHeight?: number | string;
  /** Content rendered inside the dark canvas */
  children?: React.ReactNode;
}

/**
 * Generates an SVG path for the dark frame with the continuous S-curve notch cutout.
 * Supports parametric continuous cubic bezier fillets for top, down (bottom), left, and right positions.
 */
export function createNotchCutoutPath(
  w: number,
  h: number,
  notchW: number,
  notchH: number,
  rOuter = 14,
  filletW = 24,
  position: NotchedNavbarPosition = "top"
): string {
  if (!w || !h || w <= 0 || h <= 0) return "";
  const r = Math.min(rOuter, 18, Math.floor(w / 4), Math.floor(h / 4));
  const fw = Math.max(12, Math.min(filletW, 28));

  const isDown = position === "down" || position === "bottom";
  const isLeft = position === "left";
  const isRight = position === "right";

  // CASE 1: Left Edge Notch (Vertical navbar along left edge)
  if (isLeft) {
    const maxSpan = Math.max(60, h - (r + fw) * 2);
    const actualSpan = Math.min(notchW, maxSpan);
    const depth = Math.min(notchH, Math.floor(w * 0.45));
    const y1 = (h - actualSpan) / 2;
    const y2 = y1 + actualSpan;

    return [
      `M ${r},0`,
      `L ${w - r},0`,
      `A ${r},${r} 0 0,1 ${w},${r}`,
      `L ${w},${h - r}`,
      `A ${r},${r} 0 0,1 ${w - r},${h}`,
      `L ${r},${h}`,
      `A ${r},${r} 0 0,1 0,${h - r}`,
      `L 0,${Math.min(h - r, y2 + fw)}`,
      `C 0,${y2 + fw * 0.5} ${depth},${y2 + fw * 0.5} ${depth},${y2}`,
      `L ${depth},${y1}`,
      `C ${depth},${y1 - fw * 0.5} 0,${y1 - fw * 0.5} 0,${Math.max(r, y1 - fw)}`,
      `L 0,${r}`,
      `A ${r},${r} 0 0,1 ${r},0`,
      "Z",
    ].join(" ");
  }

  // CASE 2: Right Edge Notch (Vertical navbar along right edge)
  if (isRight) {
    const maxSpan = Math.max(60, h - (r + fw) * 2);
    const actualSpan = Math.min(notchW, maxSpan);
    const depth = Math.min(notchH, Math.floor(w * 0.45));
    const y1 = (h - actualSpan) / 2;
    const y2 = y1 + actualSpan;
    const nx = w - depth;

    return [
      `M ${r},0`,
      `L ${w - r},0`,
      `A ${r},${r} 0 0,1 ${w},${r}`,
      `L ${w},${Math.max(r, y1 - fw)}`,
      `C ${w},${y1 - fw * 0.5} ${nx},${y1 - fw * 0.5} ${nx},${y1}`,
      `L ${nx},${y2}`,
      `C ${nx},${y2 + fw * 0.5} ${w},${y2 + fw * 0.5} ${w},${Math.min(h - r, y2 + fw)}`,
      `L ${w},${h - r}`,
      `A ${r},${r} 0 0,1 ${w - r},${h}`,
      `L ${r},${h}`,
      `A ${r},${r} 0 0,1 0,${h - r}`,
      `L 0,${r}`,
      `A ${r},${r} 0 0,1 ${r},0`,
      "Z",
    ].join(" ");
  }

  // CASE 3: Down / Bottom Notch (Horizontal navbar along bottom edge)
  if (isDown) {
    const maxW = Math.max(80, w - (r + fw) * 2);
    const actualNotchW = Math.min(notchW, maxW);
    const nh = Math.min(notchH, Math.floor(h * 0.45));
    const notchLeft = (w - actualNotchW) / 2;
    const notchRight = notchLeft + actualNotchW;
    const ny = h - nh;

    return [
      `M ${r},0`,
      `L ${w - r},0`,
      `A ${r},${r} 0 0,1 ${w},${r}`,
      `L ${w},${h - r}`,
      `A ${r},${r} 0 0,1 ${w - r},${h}`,
      `L ${Math.min(w - r, notchRight + fw)},${h}`,
      `C ${notchRight + fw * 0.5},${h} ${notchRight + fw * 0.5},${ny} ${notchRight},${ny}`,
      `L ${notchLeft},${ny}`,
      `C ${notchLeft - fw * 0.5},${ny} ${notchLeft - fw * 0.5},${h} ${Math.max(r, notchLeft - fw)},${h}`,
      `L ${r},${h}`,
      `A ${r},${r} 0 0,1 0,${h - r}`,
      `L 0,${r}`,
      `A ${r},${r} 0 0,1 ${r},0`,
      "Z",
    ].join(" ");
  }

  // CASE 4: Top Notch (Default: Horizontal navbar along top edge)
  const maxW = Math.max(80, w - (r + fw) * 2);
  const actualNotchW = Math.min(notchW, maxW);
  const nh = Math.min(notchH, Math.floor(h * 0.45));
  const notchLeft = (w - actualNotchW) / 2;
  const notchRight = notchLeft + actualNotchW;

  return [
    `M ${r},0`,
    `L ${Math.max(r, notchLeft - fw)},0`,
    `C ${notchLeft - fw * 0.5},0 ${notchLeft - fw * 0.5},${nh} ${notchLeft},${nh}`,
    `L ${notchRight},${nh}`,
    `C ${notchRight + fw * 0.5},${nh} ${notchRight + fw * 0.5},0 ${Math.min(w - r, notchRight + fw)},0`,
    `L ${w - r},0`,
    `A ${r},${r} 0 0,1 ${w},${r}`,
    `L ${w},${h - r}`,
    `A ${r},${r} 0 0,1 ${w - r},${h}`,
    `L ${r},${h}`,
    `A ${r},${r} 0 0,1 0,${h - r}`,
    `L 0,${r}`,
    `A ${r},${r} 0 0,1 ${r},0`,
    "Z",
  ].join(" ");
}

export const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
export const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
export const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
export const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const DEFAULT_NOTCHED_LINKS: NotchedNavbarLink[] = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "experience", label: "Experience", icon: <BriefcaseIcon /> },
  { id: "contact", label: "Contact", icon: <MailIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

/**
 * NotchedNavbar - Signature notched navigation frame with contrast backdrop.
 * Features an S-curve notch cutout allowing the backdrop surface to peek through,
 * and a dark vector canvas frame housing the page content below/around it.
 * Supports top, down (bottom), left, and right notch positions.
 */
export const NotchedNavbar = React.forwardRef<HTMLDivElement, NotchedNavbarProps>(
  (
    {
      variant = "default",
      position: customPosition,
      notchWidth: customNotchWidth,
      notchHeight: customNotchHeight,
      filletWidth = 24,
      borderRadius = 14,
      whiteBoxPadding = 0,
      frameBg: customFrameBg,
      backdropBg = "var(--canvas-bg)",
      links = DEFAULT_NOTCHED_LINKS,
      activeLink,
      defaultActiveLink,
      onLinkClick,
      minHeight = 440,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Resolve effective notch position from prop or variant name
    const effectivePosition: "top" | "down" | "left" | "right" =
      customPosition === "down" || customPosition === "bottom" || variant === "down" || variant === "bottom"
        ? "down"
        : customPosition === "left" || variant === "left"
        ? "left"
        : customPosition === "right" || variant === "right"
        ? "right"
        : "top";

    const isVertical = effectivePosition === "left" || effectivePosition === "right";
    const isCompact = variant === "compact";
    const isDeepNotch = variant === "deep-notch";
    const isDarkSlate = variant === "dark-slate";

    const defaultWidth = isVertical ? (isCompact ? 220 : 280) : isCompact ? 300 : 540;
    const notchWidth = customNotchWidth !== undefined ? customNotchWidth : defaultWidth;

    const defaultHeight = isVertical ? 54 : isDeepNotch ? 52 : 42;
    const notchHeight = customNotchHeight !== undefined ? customNotchHeight : defaultHeight;

    const frameBg = customFrameBg || (isDarkSlate ? "#111827" : "#222326");

    const darkFrameRef = React.useRef<HTMLDivElement>(null);
    const navContainerRef = React.useRef<HTMLDivElement>(null);
    const [frameDimensions, setFrameDimensions] = React.useState({
      width: 880,
      height: 480,
    });
    const [pillRect, setPillRect] = React.useState<{ left: number; top: number; width: number; height: number }>({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });

    const initialTab = activeLink || defaultActiveLink || links[0]?.id || "home";
    const [uncontrolledTab, setUncontrolledTab] = React.useState(initialTab);
    const activeTab = activeLink !== undefined ? activeLink : uncontrolledTab;
    const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
    const targetTab = hoveredTab || activeTab;

    // Subpixel-accurate indicator tracking relative to the nav container
    const updatePillPosition = React.useCallback(() => {
      const container = navContainerRef.current;
      if (!container) return;
      const activeEl = container.querySelector<HTMLElement>(
        `[data-nav-id="${targetTab}"]`
      );
      if (!activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const borderLeft = container.clientLeft || 0;
      const borderTop = container.clientTop || 0;

      setPillRect({
        left: activeRect.left - (containerRect.left + borderLeft) + container.scrollLeft,
        top: activeRect.top - (containerRect.top + borderTop) + container.scrollTop,
        width: activeRect.width,
        height: activeRect.height,
      });
    }, [targetTab]);

    React.useEffect(() => {
      const container = navContainerRef.current;
      updatePillPosition();
      const rAf = requestAnimationFrame(updatePillPosition);
      const timer1 = setTimeout(updatePillPosition, 50);
      const timer2 = setTimeout(updatePillPosition, 200);
      window.addEventListener("resize", updatePillPosition);
      if (container) container.addEventListener("scroll", updatePillPosition);

      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined" && container) {
        ro = new ResizeObserver(() => updatePillPosition());
        ro.observe(container);
        const activeEl = container.querySelector<HTMLElement>(
          `[data-nav-id="${activeTab}"]`
        );
        if (activeEl) ro.observe(activeEl);
      }

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(updatePillPosition).catch(() => {});
      }

      return () => {
        cancelAnimationFrame(rAf);
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener("resize", updatePillPosition);
        if (container) container.removeEventListener("scroll", updatePillPosition);
        ro?.disconnect();
      };
    }, [updatePillPosition, variant, effectivePosition, targetTab]);

    const handleTabClick = (link: NotchedNavbarLink) => {
      if (link.disabled) return;
      if (activeLink === undefined) {
        setUncontrolledTab(link.id);
      }
      onLinkClick?.(link.id, link);
      link.onClick?.();
    };

    // Monitor dark frame container dimensions for pixel-perfect responsive vector path
    React.useEffect(() => {
      const el = darkFrameRef.current;
      if (!el) return;

      const updateSize = () => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setFrameDimensions({
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      };

      updateSize();

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) {
              setFrameDimensions({
                width: Math.round(width),
                height: Math.round(height),
              });
            }
          }
        });
        resizeObserver.observe(el);
      } else {
        window.addEventListener("resize", updateSize);
      }

      return () => {
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener("resize", updateSize);
      };
    }, []);

    const actualNotchW = React.useMemo(() => {
      if (isVertical) {
        return Math.min(notchWidth, Math.max(120, frameDimensions.height - (borderRadius + filletWidth) * 2));
      }
      return Math.min(notchWidth, Math.max(140, frameDimensions.width - (borderRadius + filletWidth) * 2));
    }, [notchWidth, isVertical, frameDimensions.width, frameDimensions.height, borderRadius, filletWidth]);

    // Compute SVG cutout path with continuous cubic tangents
    const cutoutPath = React.useMemo(() => {
      return createNotchCutoutPath(
        frameDimensions.width,
        frameDimensions.height,
        actualNotchW,
        notchHeight,
        borderRadius,
        filletWidth,
        effectivePosition
      );
    }, [
      frameDimensions.width,
      frameDimensions.height,
      actualNotchW,
      notchHeight,
      borderRadius,
      filletWidth,
      effectivePosition,
    ]);

    const indicatorWidth = isCompact ? 20 : 28;
    const indicatorHeight = isCompact ? 18 : 24;

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-[1060px] mx-auto box-border select-none",
          "rounded-[18px]",
          whiteBoxPadding > 0 && "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)]",
          className
        )}
        style={{
          backgroundColor: backdropBg,
          padding: `${whiteBoxPadding}px`,
          ...style,
        }}
        {...props}
      >
        {/* Layer 0: Backdrop Layer Behind */}
        {whiteBoxPadding > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-0 rounded-[18px]"
            style={{ backgroundColor: backdropBg }}
          />
        )}

        {/* Layer 30: Navigation Bar Layer sitting inside the notch cutout */}
        <nav
          ref={navContainerRef}
          className={cn(
            "absolute pointer-events-auto z-30 box-border select-none",
            effectivePosition === "top" && "left-1/2 -translate-x-1/2 top-0 flex items-center justify-center px-3",
            effectivePosition === "down" && "left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center px-3",
            effectivePosition === "left" && "left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-2 px-1",
            effectivePosition === "right" && "right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-2 px-1",
            isVertical ? "gap-1 sm:gap-2" : isCompact ? "gap-2 sm:gap-4" : "gap-2 sm:gap-6"
          )}
          style={{
            width: isVertical ? `${notchHeight + whiteBoxPadding}px` : `${actualNotchW}px`,
            height: isVertical ? `${actualNotchW}px` : `${notchHeight + whiteBoxPadding}px`,
          }}
          aria-label="Main Navigation"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {/* Smooth Sliding Hover Backdrop Pill on Mouse Move */}
          {pillRect.width > 0 && hoveredTab && (
            <span
              aria-hidden="true"
              className="absolute rounded-lg bg-[var(--text-primary)]/[0.08] pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0"
              style={{
                transform: `translate3d(${pillRect.left}px, ${pillRect.top}px, 0)`,
                width: `${pillRect.width}px`,
                height: `${pillRect.height}px`,
              }}
            />
          )}

          {/* Smooth Sliding Underline / Sidebar Indicator Pill */}
          {!isVertical && pillRect.width > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-10",
                effectivePosition === "down" ? "top-2" : "bottom-2"
              )}
              style={{
                height: isCompact ? "3px" : "3.5px",
                transform: `translate3d(${pillRect.left + (pillRect.width - indicatorWidth) / 2}px, 0, 0)`,
                width: `${indicatorWidth}px`,
              }}
            />
          )}

          {isVertical && pillRect.height > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-10",
                effectivePosition === "right" ? "left-2" : "right-2"
              )}
              style={{
                width: "3.5px",
                transform: `translate3d(0, ${pillRect.top + (pillRect.height - indicatorHeight) / 2}px, 0)`,
                height: `${indicatorHeight}px`,
              }}
            />
          )}

          {links.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                data-nav-id={link.id}
                disabled={link.disabled}
                title={link.label}
                aria-label={link.label}
                onClick={() => handleTabClick(link)}
                onMouseEnter={() => setHoveredTab(link.id)}
                className={cn(
                  "relative z-10 bg-transparent border-0 inline-flex items-center justify-center cursor-pointer select-none active:scale-[0.95]",
                  "transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isVertical
                    ? "w-full p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] gap-2 text-xs font-semibold"
                    : isCompact
                    ? "p-2 sm:p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    : "px-3 sm:px-4 py-1.5 sm:py-2 text-[13px] sm:text-[14px] font-semibold tracking-tight gap-1.5 sm:gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  isActive && "text-[var(--text-primary)] font-bold",
                  link.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
              >
                {/* For compact or narrow vertical mode: render icon */}
                {isCompact || (isVertical && !link.icon) ? (
                  link.icon || <HomeIcon />
                ) : isVertical ? (
                  <>
                    {link.icon && <span className="shrink-0">{link.icon}</span>}
                    <span className="hidden sm:inline truncate max-w-[50px]">{link.label}</span>
                  </>
                ) : (
                  <>
                    {link.icon && <span className="shrink-0">{link.icon}</span>}
                    <span className="truncate">{link.label}</span>
                    {link.badge && (
                      <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold border border-[var(--border)]">
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Layer 10: Dark Frame Inset Canvas with SVG Notch Cutout */}
        <div
          ref={darkFrameRef}
          className="relative z-10 w-full box-border"
          style={{
            marginTop: `${effectivePosition === "top" && whiteBoxPadding > 4 ? 4 : 0}px`,
            minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
          }}
        >
          {/* Crisp Vector Cutout Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            viewBox={`0 0 ${frameDimensions.width} ${frameDimensions.height}`}
            width={frameDimensions.width}
            height={frameDimensions.height}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={cutoutPath}
              fill={frameBg}
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Interior Content Area (Nested seamlessly with dynamic notch padding) */}
          <div
            className="relative z-[2] w-full box-border px-5 sm:px-9 pb-8 sm:pb-12 text-[#e5e7eb]"
            style={{
              paddingTop: `${effectivePosition === "top" ? notchHeight + 20 : 24}px`,
              paddingBottom: `${effectivePosition === "down" ? notchHeight + 20 : 24}px`,
              paddingLeft: `${effectivePosition === "left" ? notchHeight + 24 : 24}px`,
              paddingRight: `${effectivePosition === "right" ? notchHeight + 24 : 24}px`,
            }}
          >
            {children || (
              <div className="space-y-6">
                {/* Clean Dashboard Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                      Infrastructure Telemetry
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Edge cluster performance and real-time load
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">
                    All Systems Operational
                  </div>
                </div>

                {/* Minimal Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Edge Requests</span>
                    <div className="text-xl font-bold text-white tracking-tight">1.42M</div>
                    <span className="text-[10px] font-mono text-emerald-400">+14.2% vs yesterday</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Avg Latency</span>
                    <div className="text-xl font-bold text-white tracking-tight">24ms</div>
                    <span className="text-[10px] font-mono text-neutral-400">p99: 42ms worldwide</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Cache Hit Ratio</span>
                    <div className="text-xl font-bold text-white tracking-tight">99.4%</div>
                    <span className="text-[10px] font-mono text-emerald-400">Zero purge events</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

NotchedNavbar.displayName = "NotchedNavbar";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SlidingHighlightContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  pillClassName?: string;
  itemSelector?: string;
  activeSelector?: string;
  activeKey?: string | number | null;
  children: React.ReactNode;
}

/**
 * SlidingHighlightContainer
 * Renders a smooth floating highlight backdrop that glides between items
 * with sub-pixel alignment using natural spring physics ease-[cubic-bezier(0.16,1,0.3,1)].
 */
export function SlidingHighlightContainer({
  children,
  className,
  pillClassName,
  itemSelector = '[data-hover-item="true"]',
  activeSelector,
  activeKey,
  ...props
}: SlidingHighlightContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeTargetRef = React.useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = React.useState(false);
  const [hoverRect, setHoverRect] = React.useState<{
    top: number;
    height: number;
    left: number;
    width: number;
    opacity: number;
  }>({ top: 0, height: 0, left: 0, width: 0, opacity: 0 });

  const leaveTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const prevActiveKeyRef = React.useRef(activeKey);

  const calculateTargetRect = React.useCallback(
    (target: HTMLElement) => {
      if (!containerRef.current) return null;
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // Account for container border thickness and scroll
      const borderLeft = container.clientLeft || 0;
      const borderTop = container.clientTop || 0;

      return {
        top: Math.round(targetRect.top - (containerRect.top + borderTop) + container.scrollTop),
        height: Math.round(targetRect.height),
        left: Math.round(targetRect.left - (containerRect.left + borderLeft) + container.scrollLeft),
        width: Math.round(targetRect.width),
        opacity: 1,
      };
    },
    []
  );

  const updateHoverTarget = React.useCallback(
    (target: HTMLElement, animate = true) => {
      const rect = calculateTargetRect(target);
      if (!rect) return;

      activeTargetRef.current = target;
      setHoverRect(rect);
      if (animate) {
        setHasEntered(true);
      }
    },
    [calculateTargetRect]
  );

  // Sync with active element if activeSelector is defined
  const syncWithActiveElement = React.useCallback(
    (animate = true) => {
      if (!containerRef.current || !activeSelector) return;
      const activeEl = containerRef.current.querySelector<HTMLElement>(activeSelector);
      if (activeEl) {
        updateHoverTarget(activeEl, animate);
      } else {
        setHoverRect((prev) => ({ ...prev, opacity: 0 }));
      }
    },
    [activeSelector, updateHoverTarget]
  );

  // Initial mount and activeKey change tracking
  React.useEffect(() => {
    const isKeyChange =
      prevActiveKeyRef.current !== activeKey && prevActiveKeyRef.current !== undefined;
    prevActiveKeyRef.current = activeKey;

    syncWithActiveElement(hasEntered || isKeyChange);
    const rAf = requestAnimationFrame(() => {
      syncWithActiveElement(hasEntered || isKeyChange);
    });
    if (isKeyChange) setHasEntered(true);

    return () => cancelAnimationFrame(rAf);
  }, [activeSelector, activeKey, syncWithActiveElement, hasEntered]);

  // Pointer over item
  const handlePointerOver = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const item = (e.target as HTMLElement).closest<HTMLElement>(itemSelector);
      if (item && containerRef.current.contains(item)) {
        if (leaveTimeoutRef.current) {
          clearTimeout(leaveTimeoutRef.current);
          leaveTimeoutRef.current = null;
        }
        if (activeTargetRef.current !== item) {
          updateHoverTarget(item, true);
        }
      }
    },
    [itemSelector, updateHoverTarget]
  );

  // Pointer leaves container -> glides back to active item
  const handlePointerLeave = React.useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      if (activeSelector && containerRef.current) {
        const activeEl = containerRef.current.querySelector<HTMLElement>(activeSelector);
        if (activeEl) {
          updateHoverTarget(activeEl, true);
          return;
        }
      }
      setHoverRect((prev) => ({ ...prev, opacity: 0 }));
      setHasEntered(false);
      activeTargetRef.current = null;
    }, 120);
  }, [activeSelector, updateHoverTarget]);

  // Recalculate on window resize, scroll, or font load
  React.useEffect(() => {
    const handleRecalculate = () => {
      if (activeTargetRef.current && containerRef.current?.contains(activeTargetRef.current)) {
        const rect = calculateTargetRect(activeTargetRef.current);
        if (rect) setHoverRect(rect);
      } else if (activeSelector) {
        syncWithActiveElement(false);
      }
    };

    window.addEventListener("resize", handleRecalculate);
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleRecalculate);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && container) {
      ro = new ResizeObserver(() => handleRecalculate());
      ro.observe(container);
    }

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(handleRecalculate).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", handleRecalculate);
      if (container) container.removeEventListener("scroll", handleRecalculate);
      ro?.disconnect();
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [calculateTargetRect, activeSelector, syncWithActiveElement]);

  return (
    <div
      ref={containerRef}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      className={cn("relative", className)}
      {...props}
    >
      {/* Sliding Floating Highlight Backdrop with Sub-pixel Precision & Spring Motion */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 rounded pointer-events-none will-change-[transform,height,width,opacity] z-0",
          pillClassName || "bg-[var(--surface-secondary)]/90 border border-[var(--border)]/50 shadow-2xs"
        )}
        style={{
          transform: `translate3d(${hoverRect.left}px, ${hoverRect.top}px, 0)`,
          width: `${hoverRect.width}px`,
          height: `${hoverRect.height}px`,
          opacity: hoverRect.opacity,
          transition: hasEntered
            ? "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), width 220ms cubic-bezier(0.16, 1, 0.3, 1), height 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 150ms ease"
            : "opacity 150ms ease",
        }}
      />
      {children}
    </div>
  );
}

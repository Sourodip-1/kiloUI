"use client";

import * as React from "react";
import { ArrowDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PullToRefreshProps {
  /** Async callback function triggered when pull threshold is reached */
  onRefresh: () => Promise<void>;
  /** Pull threshold distance in pixels required to trigger refresh (default: 72) */
  pullThreshold?: number;
  /** Maximum pull distance limit in pixels (default: 120) */
  maxPull?: number;
  /** Scrollable children content */
  children: React.ReactNode;
  /** Whether the pull-to-refresh gesture is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export function PullToRefresh({
  onRefresh,
  pullThreshold = 72,
  maxPull = 120,
  children,
  disabled = false,
  className,
}: PullToRefreshProps) {
  const [pullY, setPullY] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isPulling, setIsPulling] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const startYRef = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || isRefreshing) return;
    const scrollEl = containerRef.current;
    // Only engage if container is scrolled to the absolute top
    if (scrollEl && scrollEl.scrollTop <= 0) {
      startYRef.current = e.clientY;
      setIsPulling(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPulling || disabled || isRefreshing) return;
    const scrollEl = containerRef.current;
    if (!scrollEl || scrollEl.scrollTop > 0) {
      setIsPulling(false);
      setPullY(0);
      return;
    }

    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 0) {
      // Logarithmic tension curve: y_pull = maxPull * tanh(deltaY / maxPull)
      const calculatedPull = maxPull * Math.tanh(deltaY / maxPull);
      setPullY(calculatedPull);
    } else {
      setPullY(0);
    }
  };

  const handlePointerUp = async () => {
    if (!isPulling || disabled) return;
    setIsPulling(false);

    if (pullY >= pullThreshold && !isRefreshing) {
      // Spring to resting refresh position
      setPullY(48);
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (err) {
        console.error("Error during PullToRefresh onRefresh:", err);
      } finally {
        setIsRefreshing(false);
        setPullY(0);
      }
    } else {
      // Release without refreshing
      setPullY(0);
    }
  };

  const isTriggerReady = pullY >= pullThreshold;
  const rotationDegrees = Math.min(360, (pullY / pullThreshold) * 180);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn("relative h-full w-full overflow-y-auto overscroll-contain select-none", className)}
    >
      {/* Top Floating Indicator Container */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(-50%, ${pullY}px, 0)`,
          transition: isPulling ? "none" : "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
          opacity: pullY > 8 || isRefreshing ? 1 : 0,
        }}
        className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] shadow-lg flex items-center justify-center text-[var(--text-primary)]">
          {isRefreshing ? (
            /* Clean monochrome spinning arc */
            <div className="w-4.5 h-4.5 rounded-full border-2 border-[var(--border)] border-t-[var(--text-primary)] animate-spin" />
          ) : (
            <div
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: isPulling ? "none" : "transform 200ms ease-out",
              }}
              className="flex items-center justify-center transition-colors"
            >
              {isTriggerReady ? (
                <Check className="h-4 w-4 text-[var(--text-primary)]" />
              ) : (
                <ArrowDown className="h-4 w-4 text-[var(--text-secondary)]" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area smoothly shifted downward with tension curve */}
      <div
        style={{
          transform: `translate3d(0, ${pullY * 0.45}px, 0)`,
          transition: isPulling ? "none" : "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="w-full min-h-full"
      >
        {children}
      </div>
    </div>
  );
}

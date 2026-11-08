"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwipeAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "neutral";
}

export interface SwipeActionCardProps {
  /** The foreground card content */
  children: React.ReactNode;
  /** Actions revealed when swiped to the right (placed on the left side) */
  leftActions?: SwipeAction[];
  /** Actions revealed when swiped to the left (placed on the right side) */
  rightActions?: SwipeAction[];
  /** Threshold in pixels to snap open an action drawer (default: 72) */
  threshold?: number;
  /** Distance in pixels to automatically trigger the primary outer action (default: 180) */
  fullSwipeThreshold?: number;
  /** Callback fired when an action is selected or triggered via full-swipe */
  onActionTrigger?: (actionId: string, direction: "left" | "right") => void;
  /** Whether swiping interaction is disabled */
  disabled?: boolean;
  /** Additional CSS class names for card container */
  className?: string;
}

export function SwipeActionCard({
  children,
  leftActions = [],
  rightActions = [],
  threshold = 72,
  fullSwipeThreshold = 180,
  onActionTrigger,
  disabled = false,
  className,
}: SwipeActionCardProps) {
  const [offsetX, setOffsetX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragStartRef = React.useRef<{
    startX: number;
    startY: number;
    initialOffsetX: number;
    isLockedVertical: boolean;
    isLockedHorizontal: boolean;
  }>({
    startX: 0,
    startY: 0,
    initialOffsetX: 0,
    isLockedVertical: false,
    isLockedHorizontal: false,
  });

  const leftDrawerWidth = leftActions.length * 72;
  const rightDrawerWidth = rightActions.length * 72;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffsetX: offsetX,
      isLockedVertical: false,
      isLockedHorizontal: false,
    };
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    // Vertical scroll lock check during initial movement (8px)
    if (!dragStartRef.current.isLockedHorizontal && !dragStartRef.current.isLockedVertical) {
      const distance = Math.hypot(deltaX, deltaY);
      if (distance >= 8) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Dominant vertical motion -> release pointer capture and allow native vertical scroll
          dragStartRef.current.isLockedVertical = true;
          setIsDragging(false);
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {}
          return;
        } else {
          dragStartRef.current.isLockedHorizontal = true;
        }
      } else {
        return;
      }
    }

    if (dragStartRef.current.isLockedVertical) return;

    // Calculate raw target offset
    const rawX = dragStartRef.current.initialOffsetX + deltaX;

    // Restrict direction if no actions configured
    if (rawX > 0 && leftActions.length === 0) {
      setOffsetX(0);
      return;
    }
    if (rawX < 0 && rightActions.length === 0) {
      setOffsetX(0);
      return;
    }

    // Apply damped non-linear friction curve: x_render = x / (1 + 0.002 * |x|)
    const frictionX = rawX / (1 + 0.002 * Math.abs(rawX));
    setOffsetX(frictionX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (dragStartRef.current.isLockedVertical) return;

    // Check for full-swipe trigger
    if (offsetX >= fullSwipeThreshold && leftActions.length > 0) {
      const primaryAction = leftActions[0];
      primaryAction.onClick?.();
      onActionTrigger?.(primaryAction.id, "left");
      // Snap back smoothly
      setOffsetX(0);
      return;
    }

    if (offsetX <= -fullSwipeThreshold && rightActions.length > 0) {
      const primaryAction = rightActions[rightActions.length - 1];
      primaryAction.onClick?.();
      onActionTrigger?.(primaryAction.id, "right");
      // Snap back smoothly
      setOffsetX(0);
      return;
    }

    // Check for drawer snap reveal threshold
    if (offsetX > threshold && leftActions.length > 0) {
      setOffsetX(Math.min(leftDrawerWidth, 144));
      return;
    }

    if (offsetX < -threshold && rightActions.length > 0) {
      setOffsetX(-Math.min(rightDrawerWidth, 144));
      return;
    }

    // Otherwise snap closed
    setOffsetX(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl select-none bg-[var(--surface-secondary)] border border-[var(--border)]",
        className
      )}
    >
      {/* Left Action Drawer (revealed when swiping right) */}
      {leftActions.length > 0 && (
        <div
          aria-hidden={offsetX <= 0}
          className="absolute inset-y-0 left-0 flex items-stretch"
        >
          {leftActions.map((action) => (
            <button
              key={action.id}
              type="button"
              tabIndex={offsetX > 0 ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.();
                onActionTrigger?.(action.id, "left");
                setOffsetX(0);
              }}
              className={cn(
                "w-18 flex flex-col items-center justify-center gap-1 text-xs font-medium cursor-pointer transition-colors px-2 border-r border-[var(--border)]",
                action.variant === "destructive"
                  ? "bg-[#251919] text-[#e0a0a0] hover:bg-[#341e1e]"
                  : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]"
              )}
            >
              {action.icon && <div className="h-4 w-4 shrink-0">{action.icon}</div>}
              <span className="truncate max-w-[56px] text-[11px]">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Right Action Drawer (revealed when swiping left) */}
      {rightActions.length > 0 && (
        <div
          aria-hidden={offsetX >= 0}
          className="absolute inset-y-0 right-0 flex items-stretch"
        >
          {rightActions.map((action) => (
            <button
              key={action.id}
              type="button"
              tabIndex={offsetX < 0 ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.();
                onActionTrigger?.(action.id, "right");
                setOffsetX(0);
              }}
              className={cn(
                "w-18 flex flex-col items-center justify-center gap-1 text-xs font-medium cursor-pointer transition-colors px-2 border-l border-[var(--border)]",
                action.variant === "destructive"
                  ? "bg-[#251919] text-[#e0a0a0] hover:bg-[#341e1e]"
                  : "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]"
              )}
            >
              {action.icon && <div className="h-4 w-4 shrink-0">{action.icon}</div>}
              <span className="truncate max-w-[56px] text-[11px]">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Foreground Interactive Card Surface */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(${offsetX}px, 0, 0)`,
          transition: isDragging
            ? "none"
            : "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "relative z-10 w-full bg-[var(--surface-elevated)] p-4 transition-colors cursor-grab active:cursor-grabbing touch-pan-y",
          disabled && "cursor-default opacity-60"
        )}
      >
        {children}
      </div>
    </div>
  );
}

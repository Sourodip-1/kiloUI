"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileBottomSheetProps {
  /** Whether the sheet is currently open */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Callback invoked when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Breakpoint snap heights as fractions of container height (e.g. [0.35, 0.85]) */
  snapPoints?: number[];
  /** Default active snap point index */
  defaultSnapIndex?: number;
  /** Controlled active snap point index */
  currentSnapIndex?: number;
  /** Callback invoked when snap point changes */
  onSnapChange?: (index: number) => void;
  /** Sheet header title */
  title?: string;
  /** Sheet header description */
  description?: string;
  /** Whether to render the tactile monochrome drag handle */
  showHandle?: boolean;
  /** Whether to render the subtle backdrop blur overlay */
  backdropBlur?: boolean;
  /** Whether dragging down past threshold or clicking backdrop dismisses sheet */
  dismissable?: boolean;
  /** Optional trigger element */
  trigger?: React.ReactNode;
  /** Sheet body content */
  children?: React.ReactNode;
  /** Sheet sticky or anchored footer */
  footer?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** When true, renders inline inside container (for device simulators) instead of createPortal */
  inline?: boolean;
}

const emptySubscribe = () => () => {};

export function MobileBottomSheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  snapPoints = [0.38, 0.86],
  defaultSnapIndex = 0,
  currentSnapIndex: controlledSnapIndex,
  onSnapChange,
  title,
  description,
  showHandle = true,
  backdropBlur = true,
  dismissable = true,
  trigger,
  children,
  footer,
  className,
  inline = false,
}: MobileBottomSheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const [uncontrolledSnapIndex, setUncontrolledSnapIndex] = React.useState(defaultSnapIndex);
  const activeSnapIndex = controlledSnapIndex !== undefined ? controlledSnapIndex : uncontrolledSnapIndex;

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffsetY, setDragOffsetY] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const sheetRef = React.useRef<HTMLDivElement>(null);

  // Drag physics tracking
  const dragStartRef = React.useRef<{
    clientY: number;
    sheetHeight: number;
    timestamp: number;
    lastY: number;
    lastTime: number;
    velocity: number;
  }>({ clientY: 0, sheetHeight: 0, timestamp: 0, lastY: 0, lastTime: 0, velocity: 0 });

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
      if (!next) {
        setDragOffsetY(0);
      }
    },
    [controlledOpen, onOpenChange]
  );

  const setSnapIndex = React.useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(snapPoints.length - 1, nextIndex));
      if (controlledSnapIndex === undefined) {
        setUncontrolledSnapIndex(clamped);
      }
      onSnapChange?.(clamped);
    },
    [controlledSnapIndex, onSnapChange, snapPoints.length]
  );

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !dismissable || inline) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, dismissable, inline, setOpen]);

  // Compute container height for calculating snap heights
  const getContainerHeight = React.useCallback(() => {
    if (inline && containerRef.current?.parentElement) {
      return containerRef.current.parentElement.clientHeight || 600;
    }
    return typeof window !== "undefined" ? window.innerHeight : 800;
  }, [inline]);

  // Pointer drag event handlers for gesture physics
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isOpen) return;
    e.stopPropagation();

    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {}

    const containerHeight = getContainerHeight();
    const currentTargetSnap = snapPoints[activeSnapIndex] || 0.5;
    const currentHeight = containerHeight * currentTargetSnap;

    dragStartRef.current = {
      clientY: e.clientY,
      sheetHeight: currentHeight,
      timestamp: Date.now(),
      lastY: e.clientY,
      lastTime: Date.now(),
      velocity: 0,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();

    const now = Date.now();
    const dt = Math.max(1, now - dragStartRef.current.lastTime);
    const dySinceLast = e.clientY - dragStartRef.current.lastY;
    const instantVelocity = dySinceLast / dt; // positive means moving downward

    dragStartRef.current.velocity = instantVelocity * 0.7 + dragStartRef.current.velocity * 0.3;
    dragStartRef.current.lastY = e.clientY;
    dragStartRef.current.lastTime = now;

    const deltaY = e.clientY - dragStartRef.current.clientY;
    const containerHeight = getContainerHeight();
    const maxSnapHeight = containerHeight * Math.max(...snapPoints);
    const targetHeight = dragStartRef.current.sheetHeight - deltaY;

    // Non-linear rubber-band resistance when dragged above max snap point
    if (targetHeight > maxSnapHeight) {
      const overdrag = targetHeight - maxSnapHeight;
      const dampedOverdrag = overdrag * 0.2;
      setDragOffsetY(-(dragStartRef.current.sheetHeight + dampedOverdrag - dragStartRef.current.sheetHeight));
    } else {
      setDragOffsetY(deltaY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const velocity = dragStartRef.current.velocity;
    const containerHeight = getContainerHeight();
    const currentHeight = dragStartRef.current.sheetHeight - dragOffsetY;
    const currentFraction = Math.max(0, currentHeight / containerHeight);

    // Fast fling downward detection (v > 0.45 px/ms)
    if (velocity > 0.45) {
      if (activeSnapIndex > 0) {
        setSnapIndex(activeSnapIndex - 1);
      } else if (dismissable) {
        setOpen(false);
      }
      setDragOffsetY(0);
      return;
    }

    // Fast fling upward detection (v < -0.45 px/ms)
    if (velocity < -0.45) {
      if (activeSnapIndex < snapPoints.length - 1) {
        setSnapIndex(activeSnapIndex + 1);
      }
      setDragOffsetY(0);
      return;
    }

    // If dragged downward significantly past minimum snap point
    const minSnapFraction = snapPoints[0];
    if (currentFraction < minSnapFraction * 0.65 && dismissable) {
      setOpen(false);
      setDragOffsetY(0);
      return;
    }

    // Snap to nearest discrete snap point
    let closestIndex = 0;
    let minDistance = Infinity;
    snapPoints.forEach((point, idx) => {
      const dist = Math.abs(currentFraction - point);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setSnapIndex(closestIndex);
    setDragOffsetY(0);
  };

  const currentSnapFraction = snapPoints[activeSnapIndex] || 0.5;
  const sheetHeightPercent = `${Math.round(currentSnapFraction * 100)}%`;

  const sheetContent = (
    <div
      ref={containerRef}
      className={cn(
        inline ? "absolute inset-0 z-30" : "fixed inset-0 z-50",
        "pointer-events-none flex flex-col justify-end overflow-hidden",
        !isOpen && "hidden"
      )}
    >
      {/* Subtle Backdrop Blur */}
      <div
        onClick={() => dismissable && setOpen(false)}
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-300 pointer-events-auto",
          backdropBlur && "backdrop-blur-[2px]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sheet-title" : undefined}
        style={{
          height: sheetHeightPercent,
          transform: isDragging
            ? `translate3d(0, ${Math.max(-40, dragOffsetY)}px, 0)`
            : "translate3d(0, 0, 0)",
          transition: isDragging
            ? "none"
            : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), height 320ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={cn(
          "pointer-events-auto relative w-full flex flex-col rounded-t-2xl border-t border-x border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-2xl overflow-hidden select-none",
          className
        )}
      >
        {/* Tactile Monochrome Drag Handle Header */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex flex-col items-center justify-center pt-2.5 pb-2 cursor-grab active:cursor-grabbing touch-none shrink-0 border-b border-[var(--border-subtle)]"
        >
          {showHandle && (
            <div className="w-9 h-1 rounded-full bg-[var(--border-hover)] hover:bg-[var(--text-muted)] transition-colors" />
          )}

          {(title || description) && (
            <div className="w-full flex items-center justify-between px-4 pt-2">
              <div className="min-w-0 pr-2">
                {title && (
                  <h3
                    id="sheet-title"
                    className="text-sm font-semibold tracking-tight text-[var(--text-primary)] truncate font-sans"
                  >
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-[var(--text-secondary)] truncate font-sans">
                    {description}
                  </p>
                )}
              </div>
              {dismissable && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                  aria-label="Close bottom sheet"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 min-h-0 text-sm text-[var(--text-primary)]">
          {children}
        </div>

        {/* Optional Footer Slot */}
        {footer && (
          <div className="border-t border-[var(--border-subtle)] px-4 py-3 bg-[var(--surface-secondary)]/50 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {trigger && (
        <div
          onClick={() => setOpen(true)}
          className="inline-block cursor-pointer"
        >
          {trigger}
        </div>
      )}
      {mounted && (inline ? sheetContent : createPortal(sheetContent, document.body))}
    </>
  );
}

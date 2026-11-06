"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Check, AlertTriangle, ArrowRight, Sparkles, Sliders, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PopoverDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "contextual-actions" | "user-card" | "confirm-prompt" | "color-picker" | "media-preview";
  side?: "top" | "bottom" | "left" | "right";
  placement?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  showArrow?: boolean;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export function PopoverDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "contextual-actions",
  side = "bottom",
  placement,
  align = "center",
  showArrow = true,
  trigger,
  title,
  description,
  className,
  children,
  ...props
}: PopoverDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const [mounted, setMounted] = React.useState(false);

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const [coords, setCoords] = React.useState<{
    top: number;
    left: number;
    resolvedSide: "top" | "bottom" | "left" | "right";
    arrowOffset: number;
  }>({
    top: 0,
    left: 0,
    resolvedSide: placement || side,
    arrowOffset: 0,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  const requestedSide = placement || side;

  // Calculate position with viewport boundary collision detection and auto-flip
  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverEl = popoverRef.current;
    const popWidth = popoverEl ? popoverEl.offsetWidth : 300;
    const popHeight = popoverEl ? popoverEl.offsetHeight : 220;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const gap = 8;
    const margin = 12;

    let targetSide = requestedSide;

    // Flip logic if insufficient space
    if (requestedSide === "top" && triggerRect.top - popHeight - gap < margin) {
      if (viewportH - triggerRect.bottom > triggerRect.top) {
        targetSide = "bottom";
      }
    } else if (requestedSide === "bottom" && triggerRect.bottom + popHeight + gap > viewportH - margin) {
      if (triggerRect.top > viewportH - triggerRect.bottom) {
        targetSide = "top";
      }
    } else if (requestedSide === "left" && triggerRect.left - popWidth - gap < margin) {
      if (viewportW - triggerRect.right > triggerRect.left) {
        targetSide = "right";
      }
    } else if (requestedSide === "right" && triggerRect.right + popWidth + gap > viewportW - margin) {
      if (triggerRect.left > viewportW - triggerRect.right) {
        targetSide = "left";
      }
    }

    let top = 0;
    let left = 0;

    if (targetSide === "bottom") {
      top = triggerRect.bottom + gap;
      if (align === "start") left = triggerRect.left;
      else if (align === "end") left = triggerRect.right - popWidth;
      else left = triggerRect.left + triggerRect.width / 2 - popWidth / 2;
    } else if (targetSide === "top") {
      top = triggerRect.top - popHeight - gap;
      if (align === "start") left = triggerRect.left;
      else if (align === "end") left = triggerRect.right - popWidth;
      else left = triggerRect.left + triggerRect.width / 2 - popWidth / 2;
    } else if (targetSide === "right") {
      left = triggerRect.right + gap;
      if (align === "start") top = triggerRect.top;
      else if (align === "end") top = triggerRect.bottom - popHeight;
      else top = triggerRect.top + triggerRect.height / 2 - popHeight / 2;
    } else {
      left = triggerRect.left - popWidth - gap;
      if (align === "start") top = triggerRect.top;
      else if (align === "end") top = triggerRect.bottom - popHeight;
      else top = triggerRect.top + triggerRect.height / 2 - popHeight / 2;
    }

    // Horizontal & vertical viewport clamping
    const clampedLeft = Math.max(margin, Math.min(viewportW - popWidth - margin, left));
    const clampedTop = Math.max(margin, Math.min(viewportH - popHeight - margin, top));

    // Calculate arrow offset relative to popover center
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const arrowOffset = Math.max(16, Math.min(popWidth - 16, triggerCenter - clampedLeft));

    setCoords({
      top: clampedTop,
      left: clampedLeft,
      resolvedSide: targetSide,
      arrowOffset,
    });
  }, [requestedSide, align]);

  // Recalculate on open, scroll, or resize
  React.useEffect(() => {
    if (!isOpen) return;

    updatePosition();
    // Immediate frame check for measured sizes
    const rId = requestAnimationFrame(updatePosition);

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  // Outside click & escape listener
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setOpen]);

  return (
    <div className="relative inline-block" {...props}>
      {/* Trigger element */}
      <div
        ref={triggerRef}
        onClick={() => setOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
      >
        {trigger || (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Open Popover</span>
            <Sliders className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          </button>
        )}
      </div>

      {/* Floating Popover Container Portaled to document.body */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 99999,
            }}
            className={cn(
              "min-w-[280px] max-w-sm rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/98 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150 select-none",
              className
            )}
          >
            {/* Directional Arrow */}
            {showArrow && (
              <span
                aria-hidden="true"
                style={{
                  left:
                    coords.resolvedSide === "top" || coords.resolvedSide === "bottom"
                      ? `${coords.arrowOffset}px`
                      : undefined,
                  transform:
                    coords.resolvedSide === "top" || coords.resolvedSide === "bottom"
                      ? "translateX(-50%) rotate(45deg)"
                      : "translateY(-50%) rotate(45deg)",
                }}
                className={cn(
                  "absolute h-2.5 w-2.5 border bg-[var(--surface-elevated)] pointer-events-none z-10",
                  coords.resolvedSide === "bottom" &&
                    "-top-[6px] border-b-0 border-r-0 border-[var(--border)]",
                  coords.resolvedSide === "top" &&
                    "-bottom-[6px] border-t-0 border-l-0 border-[var(--border)]",
                  coords.resolvedSide === "right" &&
                    "-left-[6px] top-1/2 border-r-0 border-t-0 border-[var(--border)]",
                  coords.resolvedSide === "left" &&
                    "-right-[6px] top-1/2 border-l-0 border-b-0 border-[var(--border)]"
                )}
              />
            )}

            {/* Children or Pre-configured Variant Layout */}
            {children ? (
              children
            ) : variant === "contextual-actions" ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[var(--border)]/60">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
                    Quick Actions
                  </span>
                  <span className="text-[9px] font-mono text-[var(--text-muted)]">⌘K</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors text-left cursor-pointer"
                >
                  <span>Deploy Blueprint</span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">⇧D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-sans text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors text-left cursor-pointer"
                >
                  <span>Copy Registry URL</span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">⌘C</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-sans text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)] transition-colors text-left cursor-pointer"
                >
                  <span>Reset Environment</span>
                  <span className="text-[10px] font-mono opacity-70">⌫</span>
                </button>
              </div>
            ) : variant === "user-card" ? (
              <div className="space-y-3 w-64">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center font-mono text-sm font-bold text-[var(--text-primary)]">
                    KU
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-[var(--text-primary)]">
                      Sourodip // Architect
                    </h4>
                    <p className="font-mono text-[10px] text-[var(--text-muted)]">@kilo_dev • Pro</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Sculpting Next.js creative UI primitives, Navier-Stokes fluid shaders, and vector mechanical tools.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/60 text-[10px] font-mono">
                  <span className="text-[var(--text-muted)]">STATUS // ONLINE</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-2.5 py-1 rounded bg-[var(--text-primary)] text-[var(--bg-main)] font-semibold hover:opacity-90 transition-opacity cursor-pointer text-xs"
                  >
                    Follow
                  </button>
                </div>
              </div>
            ) : variant === "confirm-prompt" ? (
              <div className="space-y-3 w-64">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-[var(--accent-red-subtle)] border border-[var(--accent-red)]/30 text-[var(--accent-red)] shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                      Discard Changes?
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                      Unsaved component parameters will be permanently purged from buffer memory.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]/60">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-2.5 py-1 rounded text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--accent-red)] text-white hover:brightness-110 transition-colors cursor-pointer"
                  >
                    Confirm Purge
                  </button>
                </div>
              </div>
            ) : variant === "color-picker" ? (
              <div className="space-y-2.5 w-56">
                <div className="flex items-center justify-between pb-1 border-b border-[var(--border)]/60">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-muted)]">
                    Palette Presets
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-muted)]">5 Tones</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {["#71717a", "#2dd4bf", "#60a5fa", "#a78bfa", "#fb7185"].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setOpen(false)}
                      style={{ backgroundColor: col }}
                      className="h-7 w-7 rounded-md transition-transform hover:scale-115 active:scale-95 border border-white/20 shadow-xs cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 w-60">
                <div className="h-28 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
                  [ MEDIA_CANVAS // 1080p ]
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                    Shader_Ribbon.mp4
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">60 FPS</span>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}

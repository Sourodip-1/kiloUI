"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Sliders, Check, ArrowRight, ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "bottom-sheet" | "right-inspector" | "left-drawer" | "floating-card";
  title?: string;
  description?: string;
  showHandle?: boolean;
  trigger?: React.ReactNode;
}

export function DrawerDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "bottom-sheet",
  title = "Component Settings",
  description = "Configure runtime shader parameters and layout constraints.",
  showHandle = true,
  trigger,
  children,
  className,
  ...props
}: DrawerDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const [mounted, setMounted] = React.useState(false);

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

  // Close on Escape & manage body scroll
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, setOpen]);

  const isBottom = variant === "bottom-sheet";
  const isRight = variant === "right-inspector";
  const isLeft = variant === "left-drawer";
  const isFloating = variant === "floating-card";

  return (
    <>
      {/* Trigger Button */}
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger || (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            <span>Open Drawer</span>
          </button>
        )}
      </div>

      {/* Drawer Overlay & Panel portalled to document.body */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex select-none pointer-events-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs animate-in fade-in-0 duration-200 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          {/* Drawer Container Positioned by Variant across the whole site */}
          <div
            className={cn(
              "relative z-[100000] flex flex-col bg-[#0D0F11]/98 border-[var(--border)] shadow-2xl backdrop-blur-xl overflow-hidden duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isBottom && "fixed inset-x-0 bottom-0 w-full max-w-2xl mx-auto rounded-t-2xl border-t border-x animate-in slide-in-from-bottom max-h-[85vh]",
              isRight && "fixed inset-y-0 right-0 h-full w-full max-w-md ml-auto border-l animate-in slide-in-from-right",
              isLeft && "fixed inset-y-0 left-0 h-full w-full max-w-md mr-auto border-r animate-in slide-in-from-left",
              isFloating && "m-auto w-full max-w-lg rounded-2xl border p-1 animate-in zoom-in-95",
              className
            )}
            {...props}
          >
            {/* Top Drag Handle for Bottom Sheet */}
            {isBottom && showHandle && (
              <div className="pt-3 pb-1 flex items-center justify-center">
                <div className="w-12 h-1 rounded-full bg-[var(--border-hover)] opacity-80" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
              <div>
                <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                  {title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar">
              {children || (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)]">PARAMETER // FPS</span>
                      <span className="text-[var(--accent-green)]">120 FPS LOCK</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--surface-tertiary)] overflow-hidden">
                      <div className="w-4/5 h-full bg-[var(--accent-green)]" />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)]">TURBULENCE // NOISE</span>
                      <span className="text-[var(--text-primary)]">0.82 RATIO</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--surface-tertiary)] overflow-hidden">
                      <div className="w-2/3 h-full bg-[var(--text-primary)]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-[var(--border)]/60 text-xs">
                    <span className="text-[var(--text-secondary)]">Hardware Acceleration</span>
                    <span className="px-2 py-0.5 rounded bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-mono text-[10px]">
                      WebGL 2.0
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-secondary)]/30 flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 text-xs font-mono font-semibold transition-opacity cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

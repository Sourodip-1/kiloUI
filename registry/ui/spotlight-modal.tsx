"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, ShieldCheck, ArrowRight, Zap, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpotlightModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "theatrical-glow" | "cyber-scan" | "golden-hour" | "laser-reticle";
  title?: string;
  badge?: string;
  description?: string;
  primaryActionLabel?: string;
  showReticle?: boolean;
  trigger?: React.ReactNode;
}

export function SpotlightModal({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "theatrical-glow",
  title = "Unlock Next.js WebGL Pipeline",
  badge = "v0.3.0 • PRO CAPABILITY",
  description = "Activate real-time Navier-Stokes fluid GPU simulation with zero-dependency native copy-paste components.",
  primaryActionLabel = "Deploy Architecture",
  showReticle = true,
  trigger,
  children,
  className,
  ...props
}: SpotlightModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [mounted, setMounted] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

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

  // Close on Escape & body scroll lock
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

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const isTheatrical = variant === "theatrical-glow";
  const isCyber = variant === "cyber-scan";
  const isGold = variant === "golden-hour";
  const isLaser = variant === "laser-reticle";

  const spotlightGlowColor = isTheatrical
    ? "rgba(255, 255, 255, 0.18)"
    : isCyber
    ? "rgba(45, 212, 191, 0.24)"
    : isGold
    ? "rgba(251, 191, 36, 0.26)"
    : "rgba(244, 63, 94, 0.22)";

  const accentColor = isTheatrical
    ? "text-white"
    : isCyber
    ? "text-[#2dd4bf]"
    : isGold
    ? "text-[#fbbf24]"
    : "text-[#fb7185]";

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger || (
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-white/30 text-xs font-mono font-medium text-[var(--text-primary)] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-white/70" />
            <span>Open Spotlight</span>
          </button>
        )}
      </div>

      {/* Modal Dialog portalled to document.body */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none pointer-events-auto">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          {/* Modal Container with Interactive Specular Spotlight */}
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            className={cn(
              "relative z-50 w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[#0c0d10]/95 p-7 shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-200",
              className
            )}
            {...props}
          >
            {/* Pointer-Follow Radial Specular Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, ${spotlightGlowColor}, transparent 70%)`,
              }}
            />

            {/* Subtle Engineering CAD Grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            {/* Corner Precision CAD Marks */}
            {showReticle && (
              <>
                <span className="absolute top-3 left-3 text-[10px] font-mono text-[var(--text-muted)] opacity-50">+</span>
                <span className="absolute top-3 right-3 text-[10px] font-mono text-[var(--text-muted)] opacity-50">+</span>
                <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[var(--text-muted)] opacity-50">+</span>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[var(--text-muted)] opacity-50">+</span>
              </>
            )}

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content Body */}
            <div className="relative z-10 space-y-5">
              <div className="space-y-2">
                <span className={cn("inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10", accentColor)}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  {badge}
                </span>

                <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white pt-1">
                  {title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                  {description}
                </p>
              </div>

              {children || (
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[var(--accent-green)]" />
                      Zero Dependency CLI
                    </span>
                    <span className="text-neutral-500">352 kB</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#fbbf24]" />
                      60/120 FPS WebGL Raymarch
                    </span>
                    <span className="text-[var(--accent-green)]">ONLINE</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

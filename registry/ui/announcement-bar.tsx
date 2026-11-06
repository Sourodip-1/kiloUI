"use client";

import * as React from "react";
import { X, ArrowRight, Sparkles, Bell, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cyber-gradient" | "minimal-monochrome" | "pulse-accent" | "floating-pill";
  badge?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  showCountdown?: boolean;
}

export function AnnouncementBar({
  variant = "cyber-gradient",
  badge = "v0.3.0 Released",
  message = "Explore 7 new physics buttons, WebGL contour waves, and instant CLI tools.",
  actionLabel = "Explore Docs",
  actionHref = "/components",
  onActionClick,
  dismissible = true,
  onDismiss,
  showCountdown = false,
  className,
  ...props
}: AnnouncementBarProps) {
  const [visible, setVisible] = React.useState(true);
  const [countdown, setCountdown] = React.useState(7200); // 2 hours

  React.useEffect(() => {
    if (!showCountdown) return;
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showCountdown]);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isCyber = variant === "cyber-gradient";
  const isMinimal = variant === "minimal-monochrome";
  const isPulse = variant === "pulse-accent";
  const isFloating = variant === "floating-pill";

  return (
    <div
      className={cn(
        "relative w-full z-40 transition-all select-none overflow-hidden",
        isFloating
          ? "max-w-3xl mx-auto my-3 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md shadow-lg"
          : "border-b border-[var(--border)] bg-[var(--bg-main)]/95 px-4 py-2.5 backdrop-blur-md",
        isCyber && "bg-gradient-to-r from-[var(--surface-secondary)]/90 via-[var(--surface-elevated)] to-[var(--surface-secondary)]/90",
        isPulse && "border-white/20 bg-white/5 shadow-md",
        className
      )}
      {...props}
    >
      {/* Moving gradient lightline on top */}
      {isCyber && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70" />
      )}

      <div className="flex items-center justify-between gap-3 text-xs">
        {/* Left Message & Badge */}
        <div className="flex items-center gap-2.5 min-w-0 overflow-hidden flex-1">
          {badge && (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 tracking-wider uppercase",
                isPulse
                  ? "bg-white text-black"
                  : "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
              )}
            >
              {badge}
            </span>
          )}

          <p className="truncate font-sans text-[var(--text-secondary)]">
            <span className="font-medium text-[var(--text-primary)]">{message}</span>
          </p>
        </div>

        {/* Right CTA and Dismiss */}
        <div className="flex items-center gap-2.5 shrink-0">
          {showCountdown && (
            <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--surface-secondary)] px-2 py-0.5 rounded">
              <Clock className="h-3 w-3 text-white/60" />
              <span>{formatTime(countdown)}</span>
            </div>
          )}

          {actionLabel && (
            <a
              href={actionHref}
              onClick={onActionClick}
              className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[var(--text-primary)] hover:text-white transition-colors"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          )}

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

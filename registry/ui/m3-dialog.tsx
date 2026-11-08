"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: React.ReactNode;
  headline: string;
  supportingText?: string;
  confirmText?: string;
  confirmLabel?: string;
  dismissText?: string;
  dismissLabel?: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
  destructive?: boolean;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  inline?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function M3Dialog({
  open,
  onOpenChange,
  icon,
  headline,
  supportingText,
  confirmText = "Confirm",
  confirmLabel,
  dismissText = "Cancel",
  dismissLabel,
  onConfirm,
  onDismiss,
  destructive = false,
  design,
  variant,
  inline = false,
  children,
  className,
}: M3DialogProps) {
  if (!open) return null;

  const isMinimal = design === "minimal" || variant === "minimal";
  const confirmBtnText = confirmLabel || confirmText;
  const dismissBtnText = dismissLabel || dismissText;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        inline ? "absolute inset-0 z-50" : "fixed inset-0 z-50",
        "flex items-center justify-center p-4 select-none"
      )}
    >
      {/* Scrim Overlay */}
      <div
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
      />

      {/* Dialog Container */}
      <div
        className={cn(
          "relative z-10 w-full max-w-sm flex flex-col p-6 shadow-2xl transition-all duration-200 border border-[var(--border)] font-sans animate-in fade-in zoom-in-95 duration-150",
          isMinimal
            ? "rounded-2xl bg-[var(--surface-elevated)] space-y-4"
            : "rounded-4xl bg-[var(--surface-secondary)] space-y-5",
          className
        )}
      >
        {/* Header Icon */}
        {icon && (
          <div className="flex items-center justify-center text-[var(--accent-green)]">
            <div className="p-3 rounded-full bg-[var(--surface-tertiary)]">
              {icon}
            </div>
          </div>
        )}

        {/* Headline & Body Text */}
        <div className={cn("space-y-2", icon ? "text-center" : "text-left")}>
          <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            {headline}
          </h2>
          {supportingText && (
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {supportingText}
            </p>
          )}
          {children}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-end gap-2 pt-2">
          {dismissBtnText && (
            <button
              type="button"
              onClick={() => {
                onDismiss?.();
                onOpenChange(false);
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] transition-colors cursor-pointer"
            >
              {dismissBtnText}
            </button>
          )}

          {confirmBtnText && (
            <button
              type="button"
              onClick={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95",
                destructive
                  ? "bg-[var(--accent-red)] text-white hover:brightness-110"
                  : "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-110"
              )}
            >
              {confirmBtnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

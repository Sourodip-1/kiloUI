"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3SnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  onDismiss?: () => void;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  className?: string;
}

export function M3Snackbar({
  message,
  actionLabel = "Action",
  onAction,
  onClose,
  onDismiss,
  design,
  variant,
  className,
}: M3SnackbarProps) {
  const isMinimal = design === "minimal" || variant === "minimal";
  const handleClose = onDismiss || onClose;

  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 p-3 select-none transition-all duration-200 shadow-xl font-sans",
        isMinimal
          ? "rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)]"
          : "rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-tertiary)] text-[var(--text-primary)] shadow-2xl",
        className
      )}
    >
      <span className="text-xs font-medium truncate flex-1 pl-1">
        {message}
      </span>

      <div className="flex items-center gap-2 shrink-0">
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="px-2.5 py-1 rounded text-xs font-bold font-mono text-[var(--accent-green)] hover:bg-[var(--accent-green-subtle)] transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )}

        {handleClose && (
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

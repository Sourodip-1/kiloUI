"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface MobileActionSheetItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "primary";
  disabled?: boolean;
  onClick?: () => void;
}

export interface MobileActionSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  actions: MobileActionSheetItem[];
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function MobileActionSheet({
  open = false,
  onOpenChange,
  title,
  description,
  actions = [],
  cancelLabel = "Cancel",
  onCancel,
  className,
}: MobileActionSheetProps) {
  // Close on Escape key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange?.(false);
        onCancel?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, onCancel]);

  const handleActionClick = (action: MobileActionSheetItem) => {
    if (action.disabled) return;
    action.onClick?.();
    onOpenChange?.(false);
  };

  const handleCancelClick = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center sm:p-4 select-none pointer-events-auto">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCancelClick}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Action Sheet Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            className={cn(
              "relative z-10 w-full max-w-sm sm:max-w-md flex flex-col gap-2 p-3 pb-6 sm:pb-3",
              className
            )}
          >
            {/* Main Action Group Card */}
            <div className="w-full rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Drag Pill Handle */}
              <div className="w-full pt-2.5 pb-1 flex justify-center">
                <div className="w-9 h-1 rounded-full bg-[var(--text-muted)]/40" />
              </div>

              {/* Optional Header */}
              {(title || description) && (
                <div className="px-5 pt-1.5 pb-3.5 text-center border-b border-[var(--border)]/60">
                  {title && (
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      {title}
                    </h4>
                  )}
                  {description && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons List */}
              <div className="divide-y divide-[var(--border)]/50">
                {actions.map((action) => {
                  const isDestructive = action.variant === "destructive";
                  const isPrimary = action.variant === "primary";

                  return (
                    <button
                      key={action.id}
                      type="button"
                      disabled={action.disabled}
                      onClick={() => handleActionClick(action)}
                      className={cn(
                        "w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors duration-150 cursor-pointer active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed",
                        isDestructive
                          ? "text-rose-500 hover:bg-rose-500/10 active:bg-rose-500/20"
                          : isPrimary
                            ? "text-[var(--accent-green)] hover:bg-[var(--accent-green)]/10 active:bg-[var(--accent-green)]/20"
                            : "text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/80 active:bg-[var(--surface-secondary)]"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {action.icon && (
                          <span
                            className={cn(
                              "h-5 w-5 shrink-0 flex items-center justify-center",
                              isDestructive
                                ? "text-rose-500"
                                : isPrimary
                                  ? "text-[var(--accent-green)]"
                                  : "text-[var(--text-muted)]"
                            )}
                          >
                            {action.icon}
                          </span>
                        )}
                        <div className="min-w-0">
                          <span className="text-sm font-semibold block truncate">
                            {action.label}
                          </span>
                          {action.description && (
                            <span className="text-[11px] text-[var(--text-muted)] block truncate mt-0.5">
                              {action.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Isolated Cancel Action Pill */}
            {cancelLabel && (
              <button
                type="button"
                onClick={handleCancelClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] text-sm font-semibold font-sans text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-[0.99] transition-all cursor-pointer shadow-lg text-center"
              >
                {cancelLabel}
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


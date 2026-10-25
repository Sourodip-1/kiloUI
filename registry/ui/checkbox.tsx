"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckboxVariant = "default" | "motion" | "lineart" | "strike" | "card" | "chip";
export type CheckboxSize = "sm" | "default" | "lg";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: React.ReactNode;
  description?: React.ReactNode;
  badge?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      indeterminate = false,
      variant = "default",
      size = "default",
      label,
      description,
      badge,
      error,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;
    const [isAnimating, setIsAnimating] = React.useState(false);

    const toggle = () => {
      if (disabled) return;
      setIsAnimating(true);
      const next = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
      setTimeout(() => setIsAnimating(false), 400);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    };

    // Sizing maps
    const sizeMap = {
      sm: {
        box: "h-3.5 w-3.5 rounded",
        icon: "h-2.5 w-2.5",
        text: "text-xs",
        desc: "text-[10px]",
        dashLen: 14,
      },
      default: {
        box: "h-4.5 w-4.5 rounded-md",
        icon: "h-3 w-3",
        text: "text-xs",
        desc: "text-[11px]",
        dashLen: 18,
      },
      lg: {
        box: "h-5.5 w-5.5 rounded-lg",
        icon: "h-3.5 w-3.5",
        text: "text-sm",
        desc: "text-xs",
        dashLen: 22,
      },
    }[size];

    // =========================================================================
    // 1. CHIP / PILL VARIANT
    // =========================================================================
    if (variant === "chip") {
      return (
        <button
          type="button"
          role="checkbox"
          aria-checked={isChecked}
          disabled={disabled}
          ref={ref}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 select-none cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]",
            isChecked
              ? "border-[var(--accent-green)] bg-[var(--accent-green)]/15 text-[var(--accent-green)] shadow-xs"
              : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]",
            disabled && "opacity-40 cursor-not-allowed hover:border-[var(--border)]",
            className
          )}
          {...props}
        >
          {/* Micro animated check indicator */}
          <span
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isChecked
                ? "h-3.5 w-3.5 bg-[var(--accent-green)] text-black scale-100 rotate-0"
                : "h-2 w-2 bg-[var(--text-muted)]/40 scale-75 -rotate-45"
            )}
          >
            {isChecked && (
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-2 w-2"
              >
                <polyline points="2.5 6 4.5 8.5 9.5 3.5" />
              </svg>
            )}
          </span>

          <span className="font-medium tracking-tight truncate">{label}</span>

          {badge && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider transition-colors",
                isChecked
                  ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)]"
                  : "bg-[var(--surface-secondary)] text-[var(--text-muted)]"
              )}
            >
              {badge}
            </span>
          )}
        </button>
      );
    }

    // =========================================================================
    // 2. CARD / TILE SELECTOR VARIANT
    // =========================================================================
    if (variant === "card") {
      return (
        <div
          onClick={toggle}
          role="checkbox"
          aria-checked={isChecked}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggle();
            }
          }}
          className={cn(
            "group relative flex w-full max-w-md items-start justify-between gap-4 rounded-xl border p-4 transition-all duration-200 select-none cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]",
            isChecked
              ? "border-[var(--accent-green)] bg-[var(--surface-elevated)] shadow-md shadow-[var(--accent-green)]/5"
              : "border-[var(--border)] bg-[var(--surface-elevated)]/60 hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)]",
            disabled && "opacity-40 cursor-not-allowed hover:border-[var(--border)]",
            className
          )}
        >
          {/* Subtle Ambient Radial Highlight on Checked */}
          {isChecked && (
            <div
              className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent"
              aria-hidden="true"
            />
          )}

          <div className="flex flex-col text-left space-y-1 min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-semibold tracking-tight transition-colors",
                  isChecked
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                )}
              >
                {label}
              </span>
              {badge && (
                <span className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.2 font-mono text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  {badge}
                </span>
              )}
            </div>
            {description && (
              <span className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {description}
              </span>
            )}
          </div>

          {/* Interactive Checkbox Node */}
          <div
            className={cn(
              "relative flex shrink-0 items-center justify-center border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              sizeMap.box,
              isChecked
                ? "border-[var(--accent-green)] bg-[var(--accent-green)] text-black shadow-xs scale-105"
                : "border-[var(--border)] bg-[var(--surface-secondary)] group-hover:border-[var(--border-hover)]"
            )}
          >
            {isChecked && (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(sizeMap.icon, "animate-in zoom-in-50 duration-150")}
              >
                <polyline points="3 8.5 6.5 12 13 4.5" />
              </svg>
            )}
          </div>
        </div>
      );
    }

    // =========================================================================
    // 3. CORE CHECKBOX (MOTION, LINEART, STRIKE, DEFAULT)
    // =========================================================================
    return (
      <div
        className={cn(
          "inline-flex items-start gap-2.5 select-none",
          disabled && "cursor-not-allowed opacity-40",
          className
        )}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : isChecked}
          disabled={disabled}
          ref={ref}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative shrink-0 flex items-center justify-center transition-all cursor-pointer",
            sizeMap.box,
            "focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]",

            // -------------------------------------------------------------
            // VARIANT: MOTION (Spring Bounce & Elastic Scale)
            // -------------------------------------------------------------
            variant === "motion" && [
              "border-2 rounded-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isChecked
                ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-md scale-105"
                : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-green)] hover:scale-110",
              isAnimating && isChecked && "scale-125",
              isAnimating && !isChecked && "scale-90",
            ],

            // -------------------------------------------------------------
            // VARIANT: LINEART (Technical CAD / Blueprint SVG Path Draw)
            // -------------------------------------------------------------
            variant === "lineart" && [
              "border-2 rounded-[2px] bg-transparent font-mono transition-all duration-200",
              isChecked
                ? "border-[var(--accent-green)] text-[var(--accent-green)] bg-[var(--accent-green)]/10 shadow-[0_0_10px_rgba(34,197,94,0.25)]"
                : "border-[var(--text-muted)]/60 hover:border-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/40",
            ],

            // -------------------------------------------------------------
            // VARIANT: STRIKE (Task completion checklist)
            // -------------------------------------------------------------
            variant === "strike" && [
              "border border-[var(--border)] rounded-md transition-colors",
              isChecked
                ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-xs"
                : "bg-[var(--surface-elevated)] hover:border-[var(--border-hover)]",
            ],

            // -------------------------------------------------------------
            // VARIANT: DEFAULT (Clean Minimal Developer Aesthetic)
            // -------------------------------------------------------------
            variant === "default" && [
              "border border-[var(--border)] rounded-md bg-[var(--surface-elevated)] transition-colors duration-150",
              isChecked
                ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-2xs"
                : "hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]",
            ],

            error && "border-[var(--accent-red)] focus-visible:ring-[var(--accent-red)]"
          )}
          {...props}
        >
          {/* -----------------------------------------------------------
              VARIANT-SPECIFIC CHECKMARK RENDERING
          ----------------------------------------------------------- */}

          {/* A. LINEART: Technical SVG with Path Draw Animation & CAD Reticles */}
          {variant === "lineart" && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={cn(sizeMap.icon, "overflow-visible text-[var(--accent-green)]")}
            >
              {/* Corner crosshairs / Reticles */}
              <path
                d="M1 5h3M5 1v3M23 5h-3M19 1v3M1 19h3M5 23v-3M23 19h-3M19 23v-3"
                strokeWidth="1.5"
                stroke="currentColor"
                opacity={isChecked ? "0.9" : "0.4"}
              />

              {/* Unchecked CAD Center Crosshair */}
              {!isChecked && !indeterminate && (
                <path
                  d="M12 9v6M9 12h6"
                  strokeWidth="1.25"
                  stroke="currentColor"
                  opacity="0.35"
                />
              )}

              {/* Indeterminate minus line */}
              {indeterminate && (
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  className="animate-in fade-in duration-150"
                />
              )}

              {/* Animated precision path draw checkmark */}
              {isChecked && !indeterminate && (
                <polyline
                  points="4 12.5 9 17.5 20 6"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 28,
                    strokeDashoffset: 0,
                    animation: "lineartTick 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  }}
                />
              )}
            </svg>
          )}

          {/* B. MOTION: Dynamic Pop & Spring Overshoot */}
          {variant === "motion" && (
            <>
              {/* Subtle expanding ring radar pulse on check */}
              {isAnimating && isChecked && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-full border border-[var(--accent-green)] animate-ping opacity-60"
                />
              )}

              {indeterminate ? (
                <span className="h-0.5 w-2.5 rounded-full bg-current transition-all" />
              ) : isChecked ? (
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    sizeMap.icon,
                    "animate-in zoom-in-75 duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  )}
                >
                  <polyline points="2.5 7.5 5.5 10.5 11.5 3.5" />
                </svg>
              ) : null}
            </>
          )}

          {/* C. DEFAULT & STRIKE: Minimal Crisp Check */}
          {(variant === "default" || variant === "strike") && (
            <>
              {indeterminate ? (
                <span className="h-0.5 w-2 rounded-full bg-current" />
              ) : isChecked ? (
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(sizeMap.icon, "animate-in zoom-in-90 duration-150")}
                >
                  <polyline points="2.5 7.5 5.5 10.5 11.5 3.5" />
                </svg>
              ) : null}
            </>
          )}
        </button>

        {/* Labels & Descriptions */}
        {(label || description || error) && (
          <div className="flex flex-col text-left space-y-0.5 cursor-pointer" onClick={toggle}>
            {label && (
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "font-medium transition-all duration-200 select-none",
                    sizeMap.text,
                    variant === "lineart" && "font-mono tracking-tight",
                    isChecked
                      ? "text-[var(--text-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                    // Strike-through effect on checked
                    variant === "strike" &&
                      isChecked &&
                      "line-through text-[var(--text-muted)] opacity-70"
                  )}
                >
                  {label}
                </span>

                {badge && (
                  <span className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.2 font-mono text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {badge}
                  </span>
                )}
              </div>
            )}

            {description && (
              <span className={cn("text-[var(--text-muted)] leading-relaxed select-none", sizeMap.desc)}>
                {description}
              </span>
            )}

            {error && (
              <span className="text-[10px] font-mono text-[var(--accent-red)] animate-in fade-in duration-150">
                {error}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

"use client";

import * as React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type M3TextFieldVariant = "filled" | "outlined" | "minimal";

export interface M3TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: M3TextFieldVariant;
  label: string;
  helperText?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  labelBgClassName?: string;
}

export const M3TextField = React.forwardRef<HTMLInputElement, M3TextFieldProps>(
  (
    {
      className,
      variant = "outlined",
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      clearable = false,
      onClear,
      labelBgClassName,
      value,
      defaultValue,
      onChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [innerVal, setInnerVal] = React.useState(defaultValue || "");

    const currentVal = value !== undefined ? value : innerVal;
    const hasValue = String(currentVal).length > 0;
    const isFloating = isFocused || hasValue;
    const isMinimal = variant === "minimal";
    const isFilled = variant === "filled";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerVal(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn("w-full space-y-1.5 font-sans select-none", disabled && "opacity-40 pointer-events-none", className)}>
        {/* Minimal SaaS variant: clean label above */}
        {isMinimal && (
          <label className="block text-xs font-semibold text-[var(--text-secondary)]">
            {label}
          </label>
        )}

        {/* Input container */}
        <div
          className={cn(
            "relative flex items-center transition-all duration-200",
            isMinimal
              ? cn(
                  "h-10 px-3 rounded-lg border bg-[var(--surface-elevated)]",
                  error
                    ? "border-[var(--accent-red)] ring-1 ring-[var(--accent-red)]/20"
                    : isFocused
                    ? "border-[var(--accent-green)] ring-1 ring-[var(--accent-green)]/30"
                    : "border-[var(--border)] hover:border-[var(--border-hover)]"
                )
              : isFilled
              ? cn(
                  "h-14 px-4 rounded-t-xl border-b-2 bg-[var(--surface-secondary)]/80 transition-colors",
                  error
                    ? "border-[var(--accent-red)]"
                    : isFocused
                    ? "border-[var(--accent-green)] bg-[var(--surface-secondary)]"
                    : "border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]/95"
                )
              : cn(
                  "h-14 px-4 rounded-2xl border transition-colors",
                  error
                    ? "border-[var(--accent-red)] ring-1 ring-[var(--accent-red)]/30"
                    : isFocused
                    ? "border-2 border-[var(--accent-green)]"
                    : "border-[var(--border)] hover:border-[var(--text-secondary)]"
                )
          )}
        >
          {leadingIcon && (
            <span className={cn("shrink-0 mr-3 text-[var(--text-muted)] transition-colors", isFocused && "text-[var(--accent-green)]")}>
              {leadingIcon}
            </span>
          )}

          {/* Floating label for M3 Filled / Outlined */}
          {!isMinimal && (
            <span
              className={cn(
                "absolute transition-all duration-200 pointer-events-none truncate max-w-[80%]",
                leadingIcon ? (isFloating ? "left-9" : "left-11") : "left-4",
                isFilled
                  ? isFloating
                    ? "top-1.5 text-[10px] font-bold text-[var(--accent-green)] tracking-wider uppercase"
                    : "top-4 text-sm text-[var(--text-muted)]"
                  : isFloating
                  ? cn(
                      "-top-2.5 px-1.5 text-[11px] font-bold tracking-tight rounded-xs z-10",
                      labelBgClassName || "bg-[#0c0d0e] dark:bg-[#0c0d0e]",
                      error
                        ? "text-[var(--accent-red)]"
                        : isFocused
                        ? "text-[var(--accent-green)]"
                        : "text-[var(--text-secondary)]"
                    )
                  : "top-4 text-sm text-[var(--text-muted)]"
              )}
            >
              {label}
            </span>
          )}

          <input
            ref={ref}
            value={currentVal}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={isMinimal ? label : ""}
            className={cn(
              "w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-medium",
              isFilled && isFloating && "pt-4"
            )}
            {...props}
          />

          {clearable && hasValue && (
            <button
              type="button"
              onClick={() => {
                setInnerVal("");
                onClear?.();
              }}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {error ? (
            <AlertCircle className="h-4 w-4 text-[var(--accent-red)] shrink-0 ml-2 animate-in zoom-in-75 duration-150" />
          ) : trailingIcon ? (
            <span className="shrink-0 ml-2 text-[var(--text-muted)]">{trailingIcon}</span>
          ) : null}
        </div>

        {/* Supporting / Error Helper Text */}
        {(helperText || error) && (
          <p
            className={cn(
              "text-xs px-1 pt-0.5",
              error ? "text-[var(--accent-red)] font-medium" : "text-[var(--text-muted)]"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
M3TextField.displayName = "M3TextField";

"use client";

import * as React from "react";
import { AlertCircle, X, Eye, EyeOff } from "lucide-react";
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
      type = "text",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [innerVal, setInnerVal] = React.useState(defaultValue || "");
    const [showPassword, setShowPassword] = React.useState(false);

    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

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
                    ? "top-2 text-[10px] font-bold text-[var(--accent-green)] tracking-wider uppercase"
                    : "top-4 text-sm text-[var(--text-muted)]"
                  : isFloating
                  ? cn(
                      "-top-2.5 px-1.5 text-[11px] font-medium tracking-wide z-10",
                      labelBgClassName || "bg-[var(--surface-primary)]",
                      error
                        ? "text-[var(--accent-red)]"
                        : isFocused
                        ? "text-[var(--accent-green)] font-semibold"
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
            type={inputType}
            value={currentVal}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={isMinimal ? label : ""}
            className={cn(
              "w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-medium",
              isFilled && isFloating && "pt-3.5"
            )}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shrink-0 ml-1"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}

          {clearable && hasValue && (
            <button
              type="button"
              onClick={() => {
                setInnerVal("");
                onClear?.();
              }}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] transition-colors cursor-pointer shrink-0 ml-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {trailingIcon && !clearable && !isPasswordType && (
            <span className="shrink-0 ml-2 text-[var(--text-muted)]">
              {trailingIcon}
            </span>
          )}

          {error && (
            <span className="shrink-0 ml-2 text-[var(--accent-red)]">
              <AlertCircle className="h-4 w-4" />
            </span>
          )}
        </div>

        {/* Helper or error message */}
        {(helperText || error) && (
          <p
            className={cn(
              "text-[11px] font-sans px-1",
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

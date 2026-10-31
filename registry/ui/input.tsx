import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {startIcon && (
            <div className="pointer-events-none absolute left-2.5 flex items-center justify-center text-[var(--text-muted)]">
              {startIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex h-8 w-full rounded border border-[var(--border)] bg-[var(--bg-main)] px-2.5 py-1 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
              "focus-visible:outline-none focus-visible:border-[var(--accent-green)] focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]",
              "disabled:cursor-not-allowed disabled:opacity-40",
              startIcon && "pl-8",
              endIcon && "pr-8",
              error &&
                "border-[var(--accent-red)] focus-visible:border-[var(--accent-red)] focus-visible:ring-[var(--accent-red)]",
              className
            )}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-2.5 flex items-center justify-center text-[var(--text-muted)]">
              {endIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-[var(--accent-red)]">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[var(--text-muted)]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

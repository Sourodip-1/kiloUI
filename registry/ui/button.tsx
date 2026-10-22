import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "accent"
    | "destructive"
    | "link";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99] border border-transparent font-medium shadow-none",
  secondary:
    "bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] active:scale-[0.99] border border-[var(--border)]",
  outline:
    "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-[0.99] border border-[var(--border)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-[0.99] border border-transparent",
  accent:
    "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 active:scale-[0.99] border border-[var(--accent-green)]/30 font-medium",
  destructive:
    "bg-[var(--accent-red-deep)] text-[var(--accent-red)] hover:brightness-110 active:scale-[0.99] border border-[var(--accent-red)]/30 font-medium",
  link:
    "bg-transparent text-[var(--accent-green)] hover:underline border-none p-0 h-auto font-normal",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-7 px-2.5 text-xs rounded gap-1.5",
  default: "h-9 px-3.5 text-xs rounded-md gap-2",
  lg: "h-10 px-4 text-sm rounded-md gap-2.5",
  icon: "h-9 w-9 p-0 rounded-md justify-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-normal transition-colors select-none tracking-tight",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-main)]",
          "disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0 opacity-80">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0 opacity-80">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

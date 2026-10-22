import * as React from "react";
import { cn } from "../lib/utils";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const toggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <div className="flex items-center justify-between gap-3 select-none">
        {(label || description) && (
          <div className="flex flex-col text-left">
            {label && (
              <span
                onClick={toggle}
                className={cn(
                  "text-xs font-medium text-[var(--text-primary)] cursor-pointer",
                  disabled && "opacity-40 cursor-not-allowed"
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <span className="text-[11px] text-[var(--text-muted)]">
                {description}
              </span>
            )}
          </div>
        )}
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          ref={ref}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-150 ease-in-out",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
            isChecked
              ? "bg-[var(--accent-green)]"
              : "bg-[var(--surface-secondary)] border-[var(--border)]",
            className
          )}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-4 w-4 transform rounded-full shadow transition duration-150 ease-in-out",
              isChecked
                ? "translate-x-4 bg-[var(--bg-main)]"
                : "translate-x-0.5 bg-[var(--text-muted)]"
            )}
          />
        </button>
      </div>
    );
  }
);

Switch.displayName = "Switch";

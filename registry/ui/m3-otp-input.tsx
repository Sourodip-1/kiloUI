"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  mask?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function M3OtpInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  autoFocus = false,
  disabled = false,
  error = false,
  success = false,
  mask = false,
  size = "md",
  className,
}: M3OtpInputProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const handleUpdate = React.useCallback(
    (newValue: string) => {
      const sanitized = newValue.replace(/\D/g, "").slice(0, length);
      if (controlledValue === undefined) {
        setInternalValue(sanitized);
      }
      onChange?.(sanitized);
      if (sanitized.length === length) {
        onComplete?.(sanitized);
      }
    },
    [controlledValue, length, onChange, onComplete]
  );

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        // Clear current digit
        const newChars = [...digits];
        newChars[index] = "";
        handleUpdate(newChars.join(""));
      } else if (index > 0) {
        // Move back and clear previous
        const newChars = [...digits];
        newChars[index - 1] = "";
        handleUpdate(newChars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputChar = e.target.value.replace(/\D/g, "");
    if (!inputChar) {
      const newChars = [...digits];
      newChars[index] = "";
      handleUpdate(newChars.join(""));
      return;
    }

    // Single digit entry
    const char = inputChar.slice(-1);
    const newChars = [...digits];
    newChars[index] = char;
    const combined = newChars.join("");
    handleUpdate(combined);

    // Auto advance
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    handleUpdate(pasted);
    const targetIdx = Math.min(pasted.length, length - 1);
    inputRefs.current[targetIdx]?.focus();
  };

  const sizeClasses = {
    sm: "w-8 h-10 text-sm rounded-lg",
    md: "w-10 h-13 text-base rounded-xl",
    lg: "w-12 h-15 text-lg rounded-2xl",
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-2 select-none", className)}>
      {Array.from({ length }, (_, i) => {
        const isFilled = Boolean(digits[i]);
        const isFocused = focusedIndex === i;

        return (
          <div
            key={i}
            className={cn(
              "relative flex items-center justify-center font-mono font-bold transition-all duration-150",
              sizeClasses,
              disabled && "opacity-40 pointer-events-none",
              error
                ? "border-2 border-rose-500/80 bg-rose-500/10 text-rose-300"
                : success
                ? "border-2 border-emerald-500/80 bg-emerald-500/10 text-emerald-400"
                : isFocused
                ? "border-2 border-[var(--accent-green)] bg-[var(--surface-tertiary)] text-[var(--text-primary)] scale-[1.03] shadow-sm"
                : isFilled
                ? "border border-[var(--border-hover)] bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                : "border border-[var(--border)] bg-[var(--surface-primary)] text-[var(--text-muted)]"
            )}
            onClick={() => inputRefs.current[i]?.focus()}
          >
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={1}
              value={digits[i]}
              disabled={disabled}
              autoFocus={autoFocus && i === 0}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer caret-transparent"
              aria-label={`Digit ${i + 1} of ${length}`}
            />
            {/* Visual character or subtle dot */}
            <span className={cn("transition-transform duration-100", isFilled ? "scale-100" : "scale-75 opacity-40")}>
              {mask && isFilled ? "•" : digits[i] || (isFocused ? "" : "·")}
            </span>

            {/* Crisp non-glowing active caret indicator */}
            {isFocused && !isFilled && (
              <span className="absolute w-0.5 h-4 bg-[var(--accent-green)] rounded-full opacity-90" />
            )}
          </div>
        );
      })}
    </div>
  );
}

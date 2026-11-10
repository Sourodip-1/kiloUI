"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Delete, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileNumericKeypadProps {
  value?: string;
  onChange?: (val: string) => void;
  maxLength?: number;
  showLetters?: boolean;
  leftAction?: {
    icon?: React.ReactNode;
    label?: string;
    onClick?: () => void;
  };
  onComplete?: (val: string) => void;
  className?: string;
  disabled?: boolean;
}

const KEYPAD_DIGITS = [
  { digit: "1", sub: "" },
  { digit: "2", sub: "ABC" },
  { digit: "3", sub: "DEF" },
  { digit: "4", sub: "GHI" },
  { digit: "5", sub: "JKL" },
  { digit: "6", sub: "MNO" },
  { digit: "7", sub: "PQRS" },
  { digit: "8", sub: "TUV" },
  { digit: "9", sub: "WXYZ" },
];

export function MobileNumericKeypad({
  value = "",
  onChange,
  maxLength = 6,
  showLetters = true,
  leftAction,
  onComplete,
  className,
  disabled = false,
}: MobileNumericKeypadProps) {
  const [internalVal, setInternalVal] = React.useState(value);
  const currentVal = value !== undefined ? value : internalVal;

  const handleDigitPress = (digit: string) => {
    if (disabled) return;
    if (currentVal.length >= maxLength) return;

    const next = currentVal + digit;
    setInternalVal(next);
    onChange?.(next);

    if (next.length === maxLength) {
      onComplete?.(next);
    }
  };

  const handleDeletePress = () => {
    if (disabled || currentVal.length === 0) return;
    const next = currentVal.slice(0, -1);
    setInternalVal(next);
    onChange?.(next);
  };

  const handleClearPress = () => {
    if (disabled || currentVal.length === 0) return;
    setInternalVal("");
    onChange?.("");
  };

  return (
    <div
      className={cn(
        "w-full max-w-[320px] mx-auto grid grid-cols-3 gap-2.5 sm:gap-3 p-3 select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {/* Digits 1-9 */}
      {KEYPAD_DIGITS.map(({ digit, sub }) => (
        <motion.button
          key={digit}
          type="button"
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          onClick={() => handleDigitPress(digit)}
          className="h-14 sm:h-16 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] active:border-[var(--accent-green)]/50 flex flex-col items-center justify-center cursor-pointer shadow-xs transition-colors group"
        >
          <span className="text-xl font-bold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors leading-none">
            {digit}
          </span>
          {showLetters && sub && (
            <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] mt-0.5 uppercase leading-none opacity-80">
              {sub}
            </span>
          )}
        </motion.button>
      ))}

      {/* Bottom Left: Custom Action / Biometric Sensor */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        onClick={leftAction?.onClick}
        className={cn(
          "h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-colors shadow-xs",
          leftAction
            ? "bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent-green)] cursor-pointer"
            : "bg-transparent border border-transparent cursor-default pointer-events-none"
        )}
      >
        {leftAction?.icon ? (
          leftAction.icon
        ) : (
          <Fingerprint className="h-5 w-5 text-[var(--accent-green)]" />
        )}
        {leftAction?.label && (
          <span className="text-[9px] font-mono text-[var(--text-muted)] mt-1 uppercase leading-none">
            {leftAction.label}
          </span>
        )}
      </motion.button>

      {/* Bottom Center: Zero */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        onClick={() => handleDigitPress("0")}
        className="h-14 sm:h-16 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] active:border-[var(--accent-green)]/50 flex flex-col items-center justify-center cursor-pointer shadow-xs transition-colors group"
      >
        <span className="text-xl font-bold font-mono text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors leading-none">
          0
        </span>
      </motion.button>

      {/* Bottom Right: Delete / Backspace */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        onClick={handleDeletePress}
        onContextMenu={(e) => {
          e.preventDefault();
          handleClearPress();
        }}
        className="h-14 sm:h-16 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] active:border-rose-500/50 flex flex-col items-center justify-center cursor-pointer shadow-xs transition-colors group text-[var(--text-muted)] hover:text-rose-400"
        title="Tap to delete, long-press to clear all"
      >
        <Delete className="h-5 w-5 transition-transform group-hover:scale-110" />
      </motion.button>
    </div>
  );
}


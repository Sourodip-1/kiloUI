"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  discrete?: boolean;
  showValueBubble?: boolean;
  showValue?: boolean;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function M3Slider({
  value: controlledValue,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  discrete = false,
  showValueBubble = true,
  showValue,
  design,
  variant,
  disabled = false,
  label,
  className,
}: M3SliderProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const isMinimal = design === "minimal" || variant === "minimal";
  const [isDragging, setIsDragging] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const updateFromPointer = (clientX: number) => {
    if (!trackRef.current || disabled) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rawRatio = (clientX - rect.left) / rect.width;
    const clampedRatio = Math.min(1, Math.max(0, rawRatio));
    let nextVal = min + clampedRatio * (max - min);
    if (step > 0) {
      nextVal = Math.round(nextVal / step) * step;
    }
    if (controlledValue === undefined) {
      setUncontrolledValue(nextVal);
    }
    onChange?.(nextVal);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className={cn("w-full space-y-2 select-none", disabled && "opacity-40 pointer-events-none", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-medium font-sans">
          <span className="text-[var(--text-secondary)]">{label}</span>
          <span className="font-mono text-[var(--accent-green)] font-semibold">{value}</span>
        </div>
      )}

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex items-center h-8 cursor-pointer touch-none"
      >
        {/* Track Background */}
        <div
          className={cn(
            "w-full rounded-full transition-colors relative overflow-hidden",
            isMinimal ? "h-1.5 bg-[var(--surface-secondary)]" : "h-3 bg-[var(--surface-secondary)]/80"
          )}
        >
          {/* Active Filled Track */}
          <div
            className="h-full bg-[var(--accent-green)] transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb with Optional Floating Value Pin Bubble */}
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none"
          style={{ left: `${percentage}%` }}
        >
          {/* M3 Balloon Value Bubble on Drag */}
          {showValueBubble && isDragging && (
            <div className="absolute -top-10 px-2 py-0.5 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] font-mono text-[11px] font-bold shadow-md animate-in fade-in zoom-in-75 duration-100">
              {value}
            </div>
          )}

          {/* Thumb circle */}
          <div
            className={cn(
              "rounded-full transition-transform duration-150",
              isMinimal
                ? "h-4 w-4 bg-[var(--text-primary)] border-2 border-[var(--bg-main)] shadow-sm"
                : "h-5 w-5 bg-[var(--accent-green)] border-2 border-[var(--bg-main)] shadow-md",
              isDragging && "scale-125"
            )}
          />
        </div>
      </div>
    </div>
  );
}

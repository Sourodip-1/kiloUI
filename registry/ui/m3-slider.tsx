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
  variant?: "default" | "minimal" | "continuous" | "discrete" | string;
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
  const isDiscrete = discrete || variant === "discrete";
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
    const clampedVal = Math.min(max, Math.max(min, nextVal));
    if (controlledValue === undefined) {
      setUncontrolledValue(clampedVal);
    }
    onChange?.(clampedVal);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
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
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium font-sans">
          {label && <span className="text-[var(--text-secondary)]">{label}</span>}
          <span className="font-mono text-[var(--accent-green)] font-bold">{value}%</span>
        </div>
      )}

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex items-center h-9 cursor-pointer touch-none group/slider"
      >
        {/* Track Background */}
        <div
          className={cn(
            "w-full rounded-full transition-colors relative overflow-hidden",
            isMinimal ? "h-1.5 bg-[var(--surface-secondary)]" : "h-3.5 bg-[var(--surface-secondary)]/80 border border-[var(--border)]/40"
          )}
        >
          {/* Active Filled Track */}
          <div
            className={cn(
              "h-full transition-all duration-100 ease-[cubic-bezier(0.2,0,0,1)]",
              isMinimal ? "bg-[var(--text-primary)]" : "bg-[var(--accent-green)]"
            )}
            style={{ width: `${percentage}%` }}
          />

          {/* Discrete Step Markers */}
          {isDiscrete && (
            <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
              {[0, 25, 50, 75, 100].map((stepPct) => (
                <div
                  key={stepPct}
                  className={cn(
                    "w-1 h-1 rounded-full transition-colors",
                    percentage >= stepPct ? "bg-[var(--bg-main)]/60" : "bg-[var(--text-muted)]/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumb with Elastic Spring Value Pin Balloon */}
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-none transition-[left] duration-100 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{ left: `${percentage}%` }}
        >
          {/* M3 Balloon Pin Bubble with spring pop */}
          {showValueBubble && isDragging && (
            <div className="absolute -top-11 flex flex-col items-center animate-in zoom-in-75 fade-in duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <div className="px-2.5 py-0.5 rounded-full bg-[var(--accent-green)] text-[var(--bg-main)] font-mono text-[11px] font-bold shadow-lg">
                {value}
              </div>
              {/* Pointer triangle */}
              <div className="w-2 h-1.5 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--accent-green)]" />
            </div>
          )}

          {/* Thumb circle with Spring Halo Ring */}
          <div
            className={cn(
              "rounded-full transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isMinimal
                ? "h-4 w-4 bg-[var(--text-primary)] border-2 border-[var(--bg-main)] shadow-sm"
                : "h-5 w-5 bg-[var(--accent-green)] border-2 border-[var(--bg-main)] shadow-md",
              isDragging && "scale-125 ring-8 ring-[var(--accent-green)]/25"
            )}
          />
        </div>
      </div>
    </div>
  );
}

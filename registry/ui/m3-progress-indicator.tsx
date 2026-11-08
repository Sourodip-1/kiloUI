"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface M3ProgressIndicatorProps {
  type?: "linear" | "circular";
  value?: number; // 0 to 100 for determinate, undefined for indeterminate
  indeterminate?: boolean;
  bufferValue?: number; // 0 to 100 for linear buffer
  size?: "sm" | "default" | "lg";
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  className?: string;
}

export function M3ProgressIndicator({
  type = "linear",
  value,
  indeterminate = false,
  bufferValue,
  size = "default",
  design,
  variant,
  className,
}: M3ProgressIndicatorProps) {
  const isDeterminate = !indeterminate && value !== undefined;
  const isMinimal = design === "minimal" || variant === "minimal";

  if (type === "circular") {
    const sizePixels = { sm: 32, default: 44, lg: 60 }[size];
    const strokeWidth = isMinimal ? 3 : 4;
    const radius = (sizePixels - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = isDeterminate
      ? circumference - ((value || 0) / 100) * circumference
      : 0;

    return (
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn("relative inline-flex items-center justify-center select-none", className)}
      >
        <svg
          width={sizePixels}
          height={sizePixels}
          className={cn(!isDeterminate && "animate-spin")}
          style={{ animationDuration: "1.4s" }}
        >
          {/* Background track circle */}
          <circle
            cx={sizePixels / 2}
            cy={sizePixels / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-[var(--surface-secondary)]"
          />

          {/* Active progress arc */}
          <circle
            cx={sizePixels / 2}
            cy={sizePixels / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isDeterminate ? offset : circumference * 0.75}
            strokeLinecap="round"
            className={cn(
              "text-[var(--accent-green)] transition-all duration-300",
              !isDeterminate && "animate-pulse"
            )}
            transform={`rotate(-90 ${sizePixels / 2} ${sizePixels / 2})`}
          />
        </svg>

        {isDeterminate && size !== "sm" && (
          <span className="absolute font-mono text-[10px] font-bold text-[var(--text-primary)]">
            {Math.round(value)}%
          </span>
        )}
      </div>
    );
  }

  // Linear Progress
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative w-full rounded-full overflow-hidden select-none",
        isMinimal ? "h-1 bg-[var(--surface-secondary)]" : "h-1.5 bg-[var(--surface-secondary)]",
        className
      )}
    >
      {/* Buffer bar if present */}
      {bufferValue !== undefined && (
        <div
          className="absolute inset-y-0 left-0 bg-[var(--surface-tertiary)] transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, bufferValue))}%` }}
        />
      )}

      {/* Active progress bar */}
      <div
        className={cn(
          "h-full bg-[var(--accent-green)] transition-all duration-300 rounded-full",
          !isDeterminate && "animate-[indeterminate_1.5s_infinite_linear] w-1/3"
        )}
        style={isDeterminate ? { width: `${Math.min(100, Math.max(0, value))}%` } : undefined}
      />
    </div>
  );
}

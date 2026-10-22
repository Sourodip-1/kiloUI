"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  caption?: string;
  sparkline?: number[];
  badge?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  caption,
  sparkline = [4, 7, 5, 8, 12, 10, 15, 14, 18],
  badge,
  className,
  ...props
}: StatCardProps) {
  const minVal = Math.min(...sparkline);
  const maxVal = Math.max(...sparkline);
  const range = maxVal - minVal || 1;

  // Build clean SVG polyline points
  const points = sparkline
    .map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * 120;
      const y = 32 - ((val - minVal) / range) * 24;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--text-muted)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-2">
        <span className="text-xs font-medium text-[var(--text-secondary)]">{title}</span>
        {badge && (
          <span className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-2xl font-mono font-semibold tracking-tight text-[var(--text-primary)]">
            {value}
          </div>
          {change && (
            <div className="flex items-center gap-1 pt-1 text-xs font-mono">
              {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-[var(--accent-green)]" />}
              {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-rose-500" />}
              <span
                className={
                  trend === "up"
                    ? "text-[var(--accent-green)] font-medium"
                    : trend === "down"
                    ? "text-rose-500 font-medium"
                    : "text-[var(--text-muted)]"
                }
              >
                {change}
              </span>
              {caption && <span className="text-[var(--text-muted)] ml-1">{caption}</span>}
            </div>
          )}
        </div>

        {/* Dynamic Vector Sparkline */}
        <div className="w-24 h-8 shrink-0">
          <svg viewBox="0 0 120 32" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={trend === "up" ? "var(--accent-green)" : "var(--text-muted)"}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

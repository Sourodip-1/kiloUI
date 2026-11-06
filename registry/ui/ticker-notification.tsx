"use client";

import * as React from "react";
import { Sparkles, Terminal, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TickerItem {
  id: string;
  tag: string;
  text: string;
  highlight?: boolean;
  link?: string;
}

export interface TickerNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cyber-terminal" | "status-beacon" | "news-wire" | "monochrome-minimal";
  speed?: "slow" | "normal" | "fast";
  items?: TickerItem[];
  pauseOnHover?: boolean;
}

const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  { id: "1", tag: "RELEASE", text: "kilo/ui v0.3.0 deployed to npm registry", highlight: true },
  { id: "2", tag: "PIPELINE", text: "Contour Tide WebGL Gerstner wave shader rendering at 120 FPS" },
  { id: "3", tag: "SECURITY", text: "Zero third-party runtime dependencies across all button primitives" },
  { id: "4", tag: "MEMORY", text: "Hardware cursor spring damping running in container scope" },
];

export function TickerNotification({
  variant = "cyber-terminal",
  speed = "normal",
  items = DEFAULT_TICKER_ITEMS,
  pauseOnHover = true,
  className,
  ...props
}: TickerNotificationProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  const speedDuration: Record<string, string> = {
    slow: "45s",
    normal: "28s",
    fast: "16s",
  };

  const isCyber = variant === "cyber-terminal";
  const isBeacon = variant === "status-beacon";
  const isMinimal = variant === "monochrome-minimal";

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      className={cn(
        "relative w-full overflow-hidden border-y border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md py-2.5 select-none",
        isCyber && "bg-black border-white/10",
        isMinimal && "py-1.5 bg-transparent",
        className
      )}
      {...props}
    >
      {/* Side Vignette Fades */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10" />

      {/* Self-contained marquee keyframe definition */}
      <style>{`
        @keyframes kiloMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      {/* Marquee Track */}
      <div
        style={{
          animationName: "kiloMarquee",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isPaused ? "paused" : "running",
          animationDuration: speedDuration[speed] || speedDuration.normal,
          willChange: "transform",
        }}
        className="flex w-max"
      >
        {/* Render twice for continuous seamless loop */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8 shrink-0 pr-8">
            {items.map((item) => (
              <div key={`${copyIndex}-${item.id}`} className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider",
                    item.highlight
                      ? "bg-white text-black"
                      : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border)]"
                  )}
                >
                  {item.tag}
                </span>

                <span className="font-mono text-xs text-[var(--text-primary)] font-medium whitespace-nowrap">
                  {item.text}
                </span>

                <span className="text-[var(--border-hover)] font-mono text-xs select-none">///</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

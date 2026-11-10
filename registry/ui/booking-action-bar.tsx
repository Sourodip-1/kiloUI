"use client";

import * as React from "react";
import { Calendar, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryLabel?: string;
  primaryIcon?: React.ReactNode;
  onPrimaryClick?: () => void;
  secondaryIcon?: React.ReactNode;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  price?: {
    amount: string | number;
    period?: string;
  };
  sticky?: boolean;
  className?: string;
}

/**
 * BookingActionBar
 * Floating or static bottom action container with high-contrast primary CTA
 * and complementary secondary action button.
 */
export function BookingActionBar({
  primaryLabel = "Check Availability",
  primaryIcon = <Calendar className="h-4 w-4" />,
  onPrimaryClick,
  secondaryIcon = <Share2 className="h-4 w-4 text-[#c0c1ff]" />,
  secondaryLabel = "Share",
  onSecondaryClick,
  price,
  sticky = false,
  className,
  ...props
}: BookingActionBarProps) {
  return (
    <div
      className={cn(
        "w-full flex items-center gap-2.5",
        sticky && "sticky bottom-4 z-30 p-3 rounded-2xl bg-[#0b0f19]/90 backdrop-blur-xl border border-[#1e2638] shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Optional Price display if provided */}
      {price && (
        <div className="flex flex-col pr-2">
          <span className="text-[10px] text-[#9196ab] uppercase tracking-wider font-mono">From</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-white font-mono">{price.amount}</span>
            {price.period && <span className="text-xs text-[#9196ab]">{price.period}</span>}
          </div>
        </div>
      )}

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onPrimaryClick}
        className="flex-1 py-3 px-5 rounded-2xl bg-[#8083ff] hover:bg-[#9295ff] active:bg-[#7275f0] text-[#1000a9] font-sans font-semibold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(128,131,255,0.35)] active:scale-[0.98] transition-all cursor-pointer select-none"
      >
        {primaryIcon}
        <span>{primaryLabel}</span>
      </button>

      {/* Secondary Action (Share / Bookmark) */}
      <button
        type="button"
        onClick={onSecondaryClick}
        aria-label={secondaryLabel}
        className="h-11 w-11 rounded-2xl bg-[#182030] hover:bg-[#20293d] border border-[#232c40] flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer shadow-sm"
      >
        {secondaryIcon}
      </button>
    </div>
  );
}


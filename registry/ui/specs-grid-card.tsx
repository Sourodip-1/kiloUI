"use client";

import * as React from "react";
import { Users, Bed, Bath, Sparkles, Wifi, Coffee, Wind, Flame, Tv, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpecMetric {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface SpecsGridCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleIcon?: React.ReactNode;
  badge?: React.ReactNode;
  metrics?: SpecMetric[];
  amenities?: Array<{
    label: string;
    icon?: React.ReactNode;
  } | string>;
  className?: string;
}

const DEFAULT_METRICS: SpecMetric[] = [
  { label: "Max Guests", value: 4, icon: <Users className="h-4 w-4 text-[#8083ff]" /> },
  { label: "King Suites", value: 2, icon: <Bed className="h-4 w-4 text-[#8083ff]" /> },
  { label: "Hot Spring", value: 1, icon: <Bath className="h-4 w-4 text-[#ffb0cd]" /> },
];

const DEFAULT_AMENITIES = [
  { label: "High-Speed Starlink", icon: <Wifi className="h-3 w-3 text-[#4cd7f6]" /> },
  { label: "Matcha Ritual Bar", icon: <Coffee className="h-3 w-3 text-[#ffb0cd]" /> },
  { label: "Zen Garden Yoga", icon: <Wind className="h-3 w-3 text-[#8083ff]" /> },
];

/**
 * SpecsGridCard
 * Architectural property specification card with 3-column metric tiles
 * and horizontal amenity chips matching Stitch mobile design standards.
 */
export function SpecsGridCard({
  title = "Villa Specs",
  titleIcon = <Sparkles className="h-4 w-4 text-[#8083ff]" />,
  badge = "Instant Confirmation",
  metrics = DEFAULT_METRICS,
  amenities = DEFAULT_AMENITIES,
  className,
  ...props
}: SpecsGridCardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#111622] border border-[#1e2638] p-4 text-white font-sans shadow-lg space-y-4",
        className
      )}
      {...props}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {titleIcon}
          <h3 className="text-sm font-semibold tracking-tight text-[#f2f4ff]">{title}</h3>
        </div>
        {badge && (
          <span className="text-[11px] font-medium text-[#ffb0cd] tracking-wide">
            {badge}
          </span>
        )}
      </div>

      {/* 3-Column Metrics Grid */}
      {metrics && metrics.length > 0 && (
        <div
          className={cn(
            "grid gap-2",
            metrics.length === 2 && "grid-cols-2",
            metrics.length === 3 && "grid-cols-3",
            metrics.length >= 4 && "grid-cols-2 sm:grid-cols-4"
          )}
        >
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#182030] border border-[#232c40]/70 text-center transition-all hover:border-[#8083ff]/30"
            >
              <div className="mb-1.5 flex h-6 w-6 items-center justify-center">
                {metric.icon || (i === 1 ? <Bed className="h-4 w-4 text-[#8083ff]" /> : i === 2 ? <Bath className="h-4 w-4 text-[#ffb0cd]" /> : <Users className="h-4 w-4 text-[#8083ff]" />)}
              </div>
              <span className="text-base font-bold text-[#f2f4ff] font-mono leading-none">
                {metric.value}
              </span>
              <span className="text-[10px] text-[#9196ab] font-medium mt-1 truncate max-w-full">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Amenity Chips */}
      {amenities && amenities.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {amenities.map((amenity, i) => {
            const label = typeof amenity === "string" ? amenity : amenity.label;
            const icon = typeof amenity === "string" ? <Sparkles className="h-3 w-3 text-[#8083ff]" /> : amenity.icon;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#182030]/90 border border-[#232c40] text-[11px] font-medium text-[#c0c1ff]"
              >
                {icon}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Alias for backwards-compatibility
export const VillaSpecsCard = SpecsGridCard;

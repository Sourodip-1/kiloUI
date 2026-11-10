"use client";

import * as React from "react";
import { Sparkles, Flame, TreePine, Compass, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CuratedFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  collectionTitle?: string;
  collectionTag?: string;
  availableCount?: string | number;
  filterCount?: number;
  onFilterClick?: () => void;
  filters?: FilterItem[];
  activeFilter?: string;
  onSelectFilter?: (id: string) => void;
  showHeader?: boolean;
  className?: string;
}

const DEFAULT_FILTERS: FilterItem[] = [
  { id: "all", label: "All Escapes", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "trending", label: "Trending", icon: <Flame className="h-3.5 w-3.5" /> },
  { id: "offgrid", label: "Off-Grid", icon: <TreePine className="h-3.5 w-3.5" /> },
  { id: "within3h", label: "Within 3h", icon: <Compass className="h-3.5 w-3.5" /> },
];

/**
 * CuratedFilterBar
 * Mobile-first collection header and horizontal pill filter bar
 * with active spring indicators and secondary filter triggers.
 */
export function CuratedFilterBar({
  collectionTitle = "Nocturne Sanctuaries",
  collectionTag = "CURATED COLLECTION",
  availableCount = "14 available",
  filterCount = 3,
  onFilterClick,
  filters = DEFAULT_FILTERS,
  activeFilter = "all",
  onSelectFilter,
  showHeader = true,
  className,
  ...props
}: CuratedFilterBarProps) {
  const [internalActive, setInternalActive] = React.useState(activeFilter);
  const currentActive = activeFilter !== undefined ? activeFilter : internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onSelectFilter?.(id);
  };

  return (
    <div className={cn("w-full space-y-3 font-sans text-white", className)} {...props}>
      {/* Optional Header Row */}
      {showHeader && (
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffb0cd]" />
              <span className="text-[10px] font-mono tracking-widest text-[#ffb0cd] uppercase font-medium">
                {collectionTag}
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#f2f4ff]">
              {collectionTitle}
            </h2>
          </div>

          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              onClick={onFilterClick}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#182030] hover:bg-[#20293d] border border-[#232c40] text-xs font-medium text-[#c0c1ff] transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Filter ({filterCount})</span>
            </button>
            {availableCount && (
              <span className="text-[10px] font-mono text-[#8083ff]">
                {availableCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Horizontal Scrolling Pill Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        {filters.map((tab) => {
          const isActive = currentActive === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelect(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer shadow-sm select-none",
                isActive
                  ? "bg-[#8083ff] text-[#1000a9] font-semibold shadow-[0_2px_12px_rgba(128,131,255,0.35)]"
                  : "bg-[#182030] text-[#9196ab] border border-[#232c40] hover:text-[#f2f4ff] hover:border-[#8083ff]/40"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


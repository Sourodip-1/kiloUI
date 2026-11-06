"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface LikedSkeletonProps {
  className?: string;
}

export function LikedSkeleton({ className }: LikedSkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none animate-fade-rise", className)}>
      {/* 1. Page Header Skeleton */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Skeleton shape="circular" className="h-4 w-4 bg-rose-500/40" />
              </div>
              <Skeleton shape="rounded" className="h-7 w-48" />
              <Skeleton shape="pill" className="h-5 w-8 bg-rose-500/10" />
            </div>
            <Skeleton shape="text" className="h-3 w-80 mt-2" />
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton shape="rounded" className="h-8.5 w-24 rounded-md" />
            <div className="w-full sm:w-64 h-8.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-3 flex items-center gap-2">
              <Skeleton shape="circular" className="h-3.5 w-3.5" />
              <Skeleton shape="text" className="h-3 w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Liked Components 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col overflow-hidden shadow-xs"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
              <div className="flex items-center gap-2">
                <Skeleton shape="rounded" className="h-4 w-4 rounded" accentGlow />
                <Skeleton shape="rounded" className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-2">
                <SkeletonBadge className="h-4 w-16" />
                <Skeleton shape="circular" className="h-4 w-4 bg-rose-500/30" />
              </div>
            </div>

            {/* Card Preview Stage Canvas */}
            <div className="p-6 min-h-[190px] flex items-center justify-center bg-[var(--bg-main)]/60 relative overflow-hidden">
              <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-25" />
              
              {/* Corner CAD reticles */}
              <span className="absolute top-2 left-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
              <span className="absolute top-2 right-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
              <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>

              <div className="relative z-10 flex flex-col items-center gap-2.5">
                <Skeleton shape="rounded" className="h-9 w-32 rounded-lg" accentGlow />
                <Skeleton shape="text" className="h-2.5 w-20" />
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 flex items-center justify-between">
              <Skeleton shape="text" className="h-3 w-48" />
              <Skeleton shape="rounded" className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

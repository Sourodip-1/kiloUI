"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ComponentsDiscoverySkeletonProps {
  className?: string;
}

export function ComponentsDiscoverySkeleton({ className }: ComponentsDiscoverySkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-rise", className)}>
      {/* 1. Header & Quick Search Skeleton */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Skeleton shape="rounded" className="h-5 w-5 rounded-md" accentGlow />
              <Skeleton shape="rounded" className="h-7 w-48 sm:w-56" />
            </div>
            <Skeleton shape="text" className="h-3 w-72 sm:w-80" />
          </div>

          {/* Quick search input skeleton */}
          <div className="w-full sm:w-72 h-8.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-3 flex items-center gap-2">
            <Skeleton shape="circular" className="h-3.5 w-3.5" />
            <Skeleton shape="text" className="h-3 w-32" />
          </div>
        </div>

        {/* Category Pill Filters Skeleton */}
        <div className="flex items-center gap-1.5 overflow-x-hidden pt-2">
          {["All (44)", "Actions", "Forms & Inputs", "Overlays", "Data Display", "Navigation", "Media & Layout", "Backgrounds", "Cursors"].map((cat, i) => (
            <Skeleton
              key={i}
              shape="pill"
              className={cn(
                "h-7 shrink-0",
                i === 0 ? "w-20" : i % 2 === 0 ? "w-28" : "w-24"
              )}
              accentGlow={i === 0}
            />
          ))}
        </div>
      </div>

      {/* 2. Components Grid Skeletons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton shape="rounded" className="h-4 w-4 rounded" accentGlow />
            <Skeleton shape="rounded" className="h-4 w-28" />
            <Skeleton shape="rounded" className="h-3.5 w-12 rounded" />
          </div>
          <Skeleton shape="text" className="h-3 w-24" />
        </div>

        {/* 6 Component Cards in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/40 flex flex-col overflow-hidden shadow-2xs"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
                <div className="flex items-center gap-2.5">
                  <Skeleton shape="rounded" className="h-4 w-4 rounded" />
                  <Skeleton shape="rounded" className="h-4 w-32" />
                </div>
                <SkeletonBadge />
              </div>

              {/* Card Live Preview Stage Canvas */}
              <div className="p-4 sm:p-5 min-h-[220px] flex items-center justify-center bg-[var(--bg-main)]/60 relative overflow-hidden">
                {/* Subtle blueprint dot grid */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                />

                {/* Shimmer wave */}
                <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-30" />

                {/* Corner reticles */}
                <span className="absolute top-2 left-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
                <span className="absolute top-2 right-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[var(--text-muted)] opacity-35">+</span>

                {/* Centered Component Mock Primitive */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton shape="rounded" className="h-8 w-28 rounded-md" />
                  </div>
                  <Skeleton shape="text" className="h-2 w-16" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 text-xs flex items-center justify-between">
                <Skeleton shape="text" className="h-3 w-48 sm:w-64" />
                <Skeleton shape="rounded" className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

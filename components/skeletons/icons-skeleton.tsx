"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface IconsSkeletonProps {
  className?: string;
}

export function IconsSkeleton({ className }: IconsSkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none animate-fade-rise", className)}>
      {/* 1. Header with Breadcrumbs & Title */}
      <div className="space-y-3 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-2">
          <Skeleton shape="text" className="h-3 w-14" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-24" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-20" accentGlow />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Skeleton shape="rounded" className="h-8 sm:h-9 w-40 sm:w-48" />
              <SkeletonBadge className="h-5 w-18" accentGlow />
            </div>
            <Skeleton shape="text" className="h-3.5 w-72 sm:w-96" />
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Tabs Skeleton */}
            <div className="inline-flex items-center p-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
              <Skeleton shape="rounded" className="h-7 w-32 rounded-md" accentGlow />
              <Skeleton shape="rounded" className="h-7 w-36 rounded-md ml-1" />
            </div>
            <Skeleton shape="text" className="h-3.5 w-16" />
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout: Icons Canvas (Left 3 cols) + Customization & Filters (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* LEFT 3 COLS: Icon Canvas */}
        <div className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 sm:p-8 min-h-[560px] relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-20" />

          {/* 6-column icon grid (24 items) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-7 gap-x-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--border)]/40 bg-[var(--surface-secondary)]/30 space-y-2.5"
              >
                {/* Glyph box */}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center">
                  <Skeleton shape="rounded" className="h-7 w-7 rounded-md" accentGlow={i % 5 === 0} />
                </div>
                {/* Icon name */}
                <Skeleton shape="text" className="h-2.5 w-14" />
                {/* Category tag */}
                <Skeleton shape="text" className="h-2 w-10 opacity-60" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT 1 COL: Filters & Controls Sidebar */}
        <div className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
          {/* Search Bar Skeleton */}
          <div className="space-y-1.5">
            <Skeleton shape="text" className="h-3 w-16" />
            <div className="h-9 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-3 flex items-center gap-2">
              <Skeleton shape="circular" className="h-3.5 w-3.5" />
              <Skeleton shape="text" className="h-3 w-28" />
            </div>
          </div>

          {/* Categories Filter Skeleton */}
          <div className="space-y-2 pt-2 border-t border-[var(--border)]">
            <Skeleton shape="text" className="h-3 w-24" />
            <div className="space-y-1.5">
              {["Navigation", "Actions", "Interface", "Media", "Status"].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 rounded-md bg-[var(--surface-secondary)]/30">
                  <div className="flex items-center gap-2">
                    <Skeleton shape="rounded" className="h-3.5 w-3.5 rounded" accentGlow={i === 0} />
                    <Skeleton shape="text" className="h-3 w-20" />
                  </div>
                  <Skeleton shape="text" className="h-2.5 w-6" />
                </div>
              ))}
            </div>
          </div>

          {/* Stroke Width Buttons Skeleton */}
          <div className="space-y-2 pt-2 border-t border-[var(--border)]">
            <Skeleton shape="text" className="h-3 w-24" />
            <div className="grid grid-cols-3 gap-1.5">
              <Skeleton shape="rounded" className="h-8 rounded-md" accentGlow />
              <Skeleton shape="rounded" className="h-8 rounded-md" />
              <Skeleton shape="rounded" className="h-8 rounded-md" />
            </div>
          </div>

          {/* Style Mode Switcher */}
          <div className="space-y-2 pt-2 border-t border-[var(--border)]">
            <Skeleton shape="text" className="h-3 w-20" />
            <div className="grid grid-cols-2 gap-1.5">
              <Skeleton shape="rounded" className="h-8 rounded-md" accentGlow />
              <Skeleton shape="rounded" className="h-8 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

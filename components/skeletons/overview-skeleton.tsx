"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonButton, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface OverviewSkeletonProps {
  className?: string;
}

export function OverviewSkeleton({ className }: OverviewSkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12 animate-fade-rise", className)}>
      {/* 1. Hero Section Skeleton */}
      <section className="relative rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface-primary)] p-6 sm:p-10 shadow-sm min-h-[320px] flex flex-col justify-center">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-25" />

        <div className="relative z-10 max-w-2xl space-y-4">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <Skeleton shape="pill" className="h-6 w-44" accentGlow />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <Skeleton shape="rounded" className="h-9 sm:h-11 w-4/5" />
            <Skeleton shape="rounded" className="h-9 sm:h-11 w-3/5" />
          </div>

          {/* Subtitle */}
          <SkeletonText lines={2} widths={["100%", "75%"]} className="pt-1 max-w-lg" />

          {/* Action buttons & CLI */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <SkeletonButton size="lg" className="w-36" accentGlow />
            <SkeletonButton size="lg" className="w-32" />
            <div className="h-10 w-56 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center px-3">
              <Skeleton shape="text" className="h-3 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quickstart 3-card Pipeline Skeleton */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton shape="rounded" className="h-5 w-40" />
          <Skeleton shape="text" className="h-3 w-28" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton shape="rounded" className="h-6 w-12 rounded" accentGlow={i === 0} />
                <Skeleton shape="circular" className="h-5 w-5" />
              </div>
              <Skeleton shape="rounded" className="h-4 w-32" />
              <SkeletonText lines={2} widths={["100%", "70%"]} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Horizontal Carousel Skeleton */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton shape="rounded" className="h-4 w-36" />
            <SkeletonBadge className="h-4 w-8" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton shape="rounded" className="h-6 w-6 rounded" />
            <Skeleton shape="rounded" className="h-6 w-6 rounded" />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-hidden pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[280px] shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton shape="rounded" className="h-4 w-24" />
                <SkeletonBadge className="h-4 w-12" />
              </div>
              <Skeleton shape="rounded" className="h-32 w-full rounded-md" />
              <SkeletonText lines={1} widths={["80%"]} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

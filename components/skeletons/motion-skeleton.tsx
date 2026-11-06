"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface MotionSkeletonProps {
  className?: string;
}

export function MotionSkeleton({ className }: MotionSkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none animate-fade-rise", className)}>
      {/* 1. Header with Breadcrumbs & Title */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Skeleton shape="text" className="h-3 w-14" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-24" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-24" accentGlow />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <Skeleton shape="rounded" className="h-8 sm:h-9 w-48" />
              <SkeletonBadge className="h-5 w-24" accentGlow />
            </div>
            <Skeleton shape="text" className="h-3.5 w-80 sm:w-96" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton shape="pill" className="h-6 w-44 font-mono" />
          </div>
        </div>

        {/* Quick trigger preset chips skeleton */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Skeleton shape="text" className="h-3 w-20" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              shape="rounded"
              className={cn("h-7 rounded-md", i === 0 ? "w-44" : "w-36")}
              accentGlow={i === 0}
            />
          ))}
        </div>
      </div>

      {/* 2. Category Selector Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-hidden border-b border-[var(--border)] pb-2">
        {["All Motion Demos", "1. Container Transform", "2. Shared Axis", "3. Fade Through", "4. Pop & Fade", "5. Physics Atoms"].map((tab, i) => (
          <Skeleton
            key={i}
            shape="rounded"
            className={cn("h-9 rounded-lg shrink-0", i === 0 ? "w-36" : "w-40")}
            accentGlow={i === 0}
          />
        ))}
      </div>

      {/* 3. Motion Stage Demo Cards Skeleton */}
      <div className="space-y-6">
        {/* Container Transform Demo Box */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Skeleton shape="rounded" className="h-4.5 w-56" />
                <SkeletonBadge className="h-4 w-20" accentGlow />
              </div>
              <Skeleton shape="text" className="h-3 w-80" />
            </div>
            <Skeleton shape="text" className="h-3 w-36 font-mono" />
          </div>

          {/* Interactive Search Pill Mock */}
          <div className="w-full max-w-md mx-auto h-12 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 px-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <Skeleton shape="circular" className="h-4 w-4" accentGlow />
              <Skeleton shape="text" className="h-3 w-48 font-mono" />
            </div>
            <Skeleton shape="rounded" className="h-5 w-8 rounded" />
          </div>
        </div>

        {/* Shared Axis Demo Box */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Skeleton shape="rounded" className="h-4.5 w-48" />
                <SkeletonBadge className="h-4 w-24" />
              </div>
              <Skeleton shape="text" className="h-3 w-72" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton shape="rounded" className="h-7 w-16 rounded-md" />
              <Skeleton shape="rounded" className="h-7 w-16 rounded-md" />
            </div>
          </div>

          {/* Shared Axis Viewport Canvas */}
          <div className="h-64 rounded-xl border border-[var(--border)] bg-[var(--bg-main)]/60 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-20" />
            <Skeleton shape="rounded" className="h-10 w-44 rounded-lg" accentGlow />
            <Skeleton shape="text" className="h-3 w-64 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

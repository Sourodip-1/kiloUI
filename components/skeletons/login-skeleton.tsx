"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonButton } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface LoginSkeletonProps {
  className?: string;
}

export function LoginSkeleton({ className }: LoginSkeletonProps) {
  return (
    <div className={cn("flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none animate-fade-rise", className)}>
      {/* 1. Top Breadcrumb Navigation & Mode Toggle */}
      <div className="w-full max-w-[1020px] mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Skeleton shape="text" className="h-3 w-14" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-20" />
          <span className="text-[var(--text-muted)]">/</span>
          <Skeleton shape="text" className="h-3 w-24" accentGlow />
        </div>

        {/* Style Variant Switcher Skeleton */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 gap-1">
            <Skeleton shape="rounded" className="h-7 w-28 rounded-md" accentGlow />
            <Skeleton shape="rounded" className="h-7 w-36 rounded-md" />
          </div>
          <Skeleton shape="text" className="h-3 w-12 hidden sm:block" />
        </div>
      </div>

      {/* 2. Main Authentication Card Skeleton (Split Grid) */}
      <div className="w-full max-w-[1020px] rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
        {/* Left Column: 3D Stage / Isometric Blueprint Skeleton */}
        <div className="relative border-b md:border-b-0 md:border-r border-[var(--border)] bg-[var(--bg-main)]/90 p-8 flex flex-col justify-between overflow-hidden">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Shimmer sweep */}
          <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-20" />

          {/* Corner CAD reticles */}
          <span className="absolute top-3 left-3 text-xs font-mono text-[var(--text-muted)] opacity-50">+</span>
          <span className="absolute top-3 right-3 text-xs font-mono text-[var(--text-muted)] opacity-50">+</span>
          <span className="absolute bottom-3 left-3 text-xs font-mono text-[var(--text-muted)] opacity-50">+</span>
          <span className="absolute bottom-3 right-3 text-xs font-mono text-[var(--text-muted)] opacity-50">+</span>

          {/* Header CAD spec */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton shape="text" className="h-3 w-28 font-mono" />
            </div>
            <Skeleton shape="text" className="h-3 w-16 font-mono" />
          </div>

          {/* Centered 3D Mechanical Isometric Graphic Skeleton */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-12 space-y-4">
            <div className="h-36 w-36 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]/40 flex items-center justify-center rotate-6 shadow-xl relative">
              <div className="h-24 w-24 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-center -rotate-12">
                <Skeleton shape="circular" className="h-10 w-10" />
              </div>
            </div>
            <Skeleton shape="text" className="h-3 w-44 font-mono text-center" />
          </div>

          {/* Footer CAD telemetry */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[var(--border)]/40 font-mono text-[10px]">
            <Skeleton shape="text" className="h-2.5 w-32" />
            <Skeleton shape="text" className="h-2.5 w-20" />
          </div>
        </div>

        {/* Right Column: Precision Auth Form Skeleton */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <Skeleton shape="rounded" className="h-7 w-40" />
            <Skeleton shape="text" className="h-3.5 w-64" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 my-auto">
            {/* Field 1: Email */}
            <div className="space-y-1.5">
              <Skeleton shape="text" className="h-3 w-20" />
              <Skeleton shape="rounded" className="h-10 w-full rounded-lg" />
            </div>

            {/* Field 2: Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Skeleton shape="text" className="h-3 w-18" />
                <Skeleton shape="text" className="h-3 w-24" />
              </div>
              <Skeleton shape="rounded" className="h-10 w-full rounded-lg" />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <Skeleton shape="rounded" className="h-4 w-4 rounded" />
              <Skeleton shape="text" className="h-3 w-28" />
            </div>

            {/* Primary Submit Button */}
            <SkeletonButton size="lg" className="w-full rounded-lg mt-2" accentGlow />
          </div>

          {/* Alternate SSO Logins */}
          <div className="space-y-3 pt-4 border-t border-[var(--border)]">
            <Skeleton shape="text" className="h-2.5 w-32 mx-auto" />
            <div className="grid grid-cols-2 gap-2.5">
              <Skeleton shape="rounded" className="h-9 rounded-lg" />
              <Skeleton shape="rounded" className="h-9 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

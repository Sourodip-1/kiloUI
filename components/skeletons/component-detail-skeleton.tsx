"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonButton, SkeletonBadge } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ComponentDetailSkeletonProps {
  className?: string;
  name?: string;
}

export function ComponentDetailSkeleton({ className, name }: ComponentDetailSkeletonProps) {
  return (
    <div className={cn("flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-rise", className)}>
      {/* 1. Header & Breadcrumbs Skeleton */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        {/* Breadcrumb line */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <Skeleton shape="text" className="h-3 w-10" />
          <span>/</span>
          <Skeleton shape="text" className="h-3 w-16" />
          <span>/</span>
          <Skeleton shape="text" className="h-3 w-24" />
        </div>

        {/* Title, Description & CLI Pill */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Skeleton shape="rounded" className="h-6 w-6 rounded-md shrink-0" accentGlow />
              <Skeleton shape="rounded" className="h-8 w-52 sm:w-64" />
              <SkeletonBadge className="h-5 w-20" />
            </div>
            <SkeletonText lines={2} widths={["420px", "280px"]} className="pt-1 max-w-xl" />
          </div>

          {/* Quick CLI Pill Skeleton */}
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 h-9 w-64 sm:w-72 shadow-xs">
            <Skeleton shape="circular" className="h-3.5 w-3.5" accentGlow />
            <Skeleton shape="text" className="h-3 w-full" />
            <Skeleton shape="rounded" className="h-5 w-5 shrink-0" />
          </div>
        </div>
      </div>

      {/* 2. Unified Preview / Code Toolbar and Stage */}
      <div className="space-y-4">
        {/* Toolbar row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* View switcher (Preview / Code) */}
          <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 gap-1 h-9">
            <Skeleton shape="rounded" className="h-7 w-20 rounded-md" />
            <Skeleton shape="rounded" className="h-7 w-16 rounded-md" />
          </div>

          {/* Right action controls */}
          <div className="flex items-center gap-1.5">
            <Skeleton shape="rounded" className="h-8 w-24 rounded-lg hidden sm:block" />
            <Skeleton shape="rounded" className="h-8 w-8 rounded-lg" />
            <Skeleton shape="rounded" className="h-8 w-8 rounded-lg" />
            <Skeleton shape="rounded" className="h-8 w-8 rounded-lg" />
            <Skeleton shape="rounded" className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        {/* Large Main Interactive Preview Stage Skeleton */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--canvas-bg)] p-4 sm:p-6 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between relative overflow-hidden shadow-xs">
          {/* Subtle architectural CAD dot grid */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          {/* Shimmer wave across canvas */}
          <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-30" />

          {/* Stage Top Bar inside canvas */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton shape="rounded" className="h-7 w-7 rounded-md" />
              <Skeleton shape="rounded" className="h-7 w-28 rounded-md hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton shape="rounded" className="h-7 w-16 rounded-md" />
              <Skeleton shape="rounded" className="h-7 w-7 rounded-md" />
            </div>
          </div>

          {/* Reticle corner marks (+) */}
          <span className="absolute top-3 left-3 text-[10px] font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute top-3 right-3 text-[10px] font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[var(--text-muted)] opacity-40">+</span>

          {/* Central CAD Crosshairs and Status HUD */}
          <div className="relative z-10 flex flex-col items-center justify-center py-16 my-auto">
            {/* Center crosshairs */}
            <div className="absolute flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-32 h-px bg-[var(--border)]" />
              <div className="h-32 w-px bg-[var(--border)] absolute" />
            </div>

            {/* Central HUD Card */}
            <div className="relative flex flex-col items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--text-primary)]">
                  INITIALIZING // {name ? name.toUpperCase() : "COMPONENT_PRIMITIVE"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono text-[var(--text-muted)]">
                <span>BUFFER // ALLOCATED</span>
                <span>•</span>
                <span className="text-[var(--text-secondary)]">STATUS // COMPILING</span>
              </div>
            </div>
          </div>

          {/* Bottom Variant Switcher Floating Dock Skeleton */}
          <div className="relative z-10 flex items-center justify-center pt-4">
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs shadow-xs">
              <Skeleton shape="pill" className="h-6 w-16" accentGlow />
              <Skeleton shape="pill" className="h-6 w-20" />
              <Skeleton shape="pill" className="h-6 w-18" />
              <Skeleton shape="pill" className="h-6 w-16 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* 3. Customize Panel Skeleton */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5 space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Skeleton shape="text" className="h-3.5 w-24" />
              <Skeleton shape="text" className="h-3 w-32 hidden sm:block" />
            </div>
            <Skeleton shape="text" className="h-3 w-28" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/50 h-24 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Skeleton shape="text" className="h-3 w-16" />
                  <Skeleton shape="text" className="h-3 w-8" />
                </div>
                <Skeleton shape="rounded" className="h-2 w-full rounded-full" />
                <Skeleton shape="text" className="h-2.5 w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Installation & Code Block Preview Skeleton */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <Skeleton shape="rounded" className="h-5 w-32" />
            <Skeleton shape="rounded" className="h-7 w-20 rounded-md" />
          </div>

          {/* Mock Code Block Skeleton with line numbers */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 font-mono space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <Skeleton shape="text" className="h-3 w-28" />
              <Skeleton shape="rounded" className="h-5 w-16 rounded" />
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton shape="text" className="h-3 w-3/4" />
              <Skeleton shape="text" className="h-3 w-1/2" />
              <Skeleton shape="text" className="h-3 w-5/6" />
              <Skeleton shape="text" className="h-3 w-2/3" />
              <Skeleton shape="text" className="h-3 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

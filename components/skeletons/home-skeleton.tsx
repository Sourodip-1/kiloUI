"use client";

import * as React from "react";
import { Skeleton, SkeletonText, SkeletonButton } from "@/registry/ui/skeleton";
import { cn } from "@/lib/utils";

export interface HomeSkeletonProps {
  className?: string;
}

export function HomeSkeleton({ className }: HomeSkeletonProps) {
  return (
    <div className={cn("relative w-full min-h-screen bg-[var(--bg-main)] overflow-hidden select-none animate-fade-rise", className)}>
      {/* 1. Header / Navbar Skeleton */}
      <nav className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 py-3.5 border-b border-[var(--border)]/60 bg-[var(--bg-main)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Skeleton shape="rounded" className="h-6 w-6 rounded" accentGlow />
              <Skeleton shape="rounded" className="h-5 w-20" />
            </div>
            <Skeleton shape="pill" className="h-5 w-12 hidden sm:block" />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Skeleton shape="text" className="h-3 w-16" />
            <Skeleton shape="text" className="h-3 w-20" />
            <Skeleton shape="text" className="h-3 w-14" />
            <Skeleton shape="text" className="h-3 w-16" />
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton shape="rounded" className="h-8 w-24 rounded-lg hidden sm:block" />
            <Skeleton shape="rounded" className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </nav>

      {/* 2. Hero Section Skeleton */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Subtle grid dots background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient Shimmer Sweep */}
        <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-20" />

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center">
          {/* Main Title Heading */}
          <div className="space-y-3 w-full flex flex-col items-center">
            <Skeleton shape="rounded" className="h-12 sm:h-16 md:h-20 w-4/5 max-w-3xl rounded-xl" />
            <Skeleton shape="rounded" className="h-12 sm:h-16 md:h-20 w-3/5 max-w-2xl rounded-xl" />
          </div>

          {/* Subtitle */}
          <div className="w-full max-w-xl space-y-2 pt-2 flex flex-col items-center">
            <Skeleton shape="text" className="h-4 w-full" />
            <Skeleton shape="text" className="h-4 w-3/4" />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none">
            <Skeleton shape="rounded" className="h-12 w-full sm:w-48 rounded-lg" accentGlow />
            <Skeleton shape="rounded" className="h-12 w-full sm:w-44 rounded-lg" />
          </div>

          {/* CLI Terminal Pill */}
          <div className="pt-3">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/90 shadow-xl">
              <Skeleton shape="rounded" className="h-4 w-4 rounded" />
              <Skeleton shape="text" className="h-3.5 w-44 font-mono" />
              <Skeleton shape="rounded" className="h-5 w-5 rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Component Showcase Viewport Skeleton */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-3">
            <Skeleton shape="rounded" className="h-5 w-5 rounded" accentGlow />
            <Skeleton shape="rounded" className="h-6 w-48" />
          </div>
          <Skeleton shape="pill" className="h-6 w-28" />
        </div>

        {/* Big Preview Stage Canvas */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/60 min-h-[460px] p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 kilo-shimmer pointer-events-none opacity-25" />
          
          {/* CAD Reticles */}
          <span className="absolute top-3 left-3 text-xs font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute top-3 right-3 text-xs font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute bottom-3 left-3 text-xs font-mono text-[var(--text-muted)] opacity-40">+</span>
          <span className="absolute bottom-3 right-3 text-xs font-mono text-[var(--text-muted)] opacity-40">+</span>

          {/* Centered Preview Primitive */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Skeleton shape="circular" className="h-16 w-16" accentGlow />
            <Skeleton shape="rounded" className="h-8 w-48 rounded-lg" />
            <Skeleton shape="text" className="h-3 w-64" />
          </div>
        </div>
      </section>
    </div>
  );
}

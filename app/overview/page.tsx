"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";
import { VectorKiloLogo, VectorCategoryIcon } from "@/components/vector-icons";
import { ComponentCarousel } from "@/components/component-carousel";
import { useAppShell } from "@/components/app-shell";
import { LiquidMetalBackground } from "@/components/liquid-metal-background";

export default function OverviewPage() {
  const { showToast, theme } = useAppShell();
  const [copiedCli, setCopiedCli] = React.useState(false);

  const allItems = Object.values(REGISTRY_DATA);
  const categories = Array.from(new Set(allItems.map((item) => item.category)));

  // Latest components for the horizontal carousel
  const latestComponents = [
    REGISTRY_DATA["liquid-metal-background"],
    REGISTRY_DATA["sidebar"],
    REGISTRY_DATA["stat-card"],
    REGISTRY_DATA["dialog"],
    REGISTRY_DATA["switch"],
    REGISTRY_DATA["button"],
    REGISTRY_DATA["input"],
    REGISTRY_DATA["badge"],
    REGISTRY_DATA["card"],
    REGISTRY_DATA["tabs"],
    REGISTRY_DATA["accordion"],
  ].filter(Boolean) as RegistryItem[];

  const handleCopyCli = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCli(true);
      showToast("Copied CLI command to clipboard");
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      showToast("Failed to copy command");
    }
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* 1. Animated Liquid Metal Hero Section */}
      <section className="relative rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface-primary)] p-6 sm:p-10 shadow-sm transition-colors duration-300">
        {/* Real-time 3D Raymarched Liquid Chrome Canvas (Background layer) */}
        <LiquidMetalBackground
          className="absolute inset-0 z-0 pointer-events-none"
          intensity="balanced"
          colorTone="cobalt-chrome"
          speed={1.0}
          interactive={true}
        />

        {/* Full-Area Organic Frosted Glass Overlay — gives crystal-clear text on left while keeping 3D chrome razor-sharp on right */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] backdrop-saturate-150"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.3) 68%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.3) 68%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Soft atmospheric gradient for crisp typography contrast */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black/90 via-black/60 via-35% to-transparent"
          aria-hidden="true"
        />

        {/* Foreground Content Layer — Clean open layout with crisp white typography on frosted black blur */}
        <div className="relative z-10 space-y-4 max-w-2xl text-white">
          {/* Clean Logo without background container or decorative frame */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group/logo inline-flex items-center gap-3 cursor-pointer"
              aria-label="kilo/ui Home"
            >
              {/* Logo has green slash, crisp white K on black blur, kinetic blade animation on hover */}
              <div className="h-10 w-10 flex items-center justify-center">
                <VectorKiloLogo
                  kColor="#ffffff"
                  className="h-10 w-10"
                />
              </div>
              <div>
                <h1
                  className="font-mono text-2xl font-bold tracking-tight select-none drop-shadow-md"
                  style={{ color: "#ffffff" }}
                >
                  kilo<span className="text-[var(--accent-green)]">/</span>ui
                </h1>
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "rgba(255, 255, 255, 0.75)" }}
                >
                  v0.1.0 • Component Library &amp; Interactive Playground
                </p>
              </div>
            </Link>
          </div>

          {/* Concise Description — White with drop shadow for pristine legibility on black blur */}
          <p
            className="text-sm leading-relaxed drop-shadow-sm font-sans font-normal"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            A minimal, precision-engineered component library and interactive playground with a dark visual identity, clean navigation, subtle animations, and a complete documentation and editing experience for every component.
          </p>

          {/* Quick Actions & CLI Command */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Explore Components</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>

            {/* Quick CLI snippet with frosted glass button */}
            <button
              type="button"
              onClick={() => handleCopyCli("npx @kilo-ui/cli add button")}
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md border border-white/20 bg-black/45 hover:bg-black/60 hover:border-white/40 backdrop-blur-md font-mono text-xs text-white/90 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Click to copy CLI installation command"
            >
              <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)]" />
              <span>npx @kilo-ui/cli add button</span>
              {copiedCli ? (
                <Check className="h-3.5 w-3.5 text-[var(--accent-green)] ml-1" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-white/60 ml-1" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Latest Components Horizontal Carousel */}
      <section className="space-y-4 pt-1">
        <ComponentCarousel
          title="Latest Components"
          items={latestComponents}
          seeAllHref="/components"
          seeAllLabel="See all components"
        />
      </section>

      {/* 3. Browse by Category */}
      <section className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            Component Categories
          </h2>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {categories.length} categories • {allItems.length} components
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const count = allItems.filter((i) => i.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/components?category=${encodeURIComponent(cat)}`}
                className="group flex flex-col justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50 hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]/60 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <VectorCategoryIcon
                    category={cat}
                    className="h-4 w-4 text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors"
                  />
                  <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                    {count}
                  </span>
                </div>
                <div className="font-mono text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors truncate">
                  {cat}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

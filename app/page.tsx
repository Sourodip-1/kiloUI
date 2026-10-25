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

export default function OverviewPage() {
  const { showToast, theme } = useAppShell();
  const [copiedCli, setCopiedCli] = React.useState(false);

  const allItems = Object.values(REGISTRY_DATA);
  const categories = Array.from(new Set(allItems.map((item) => item.category)));

  // Latest components for the horizontal carousel
  const latestComponents = [
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
      {/* 1. Quiet, Focused Hero Section */}
      <section className="space-y-4">
        {/* Clean Logo without background container or decorative frame */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group/logo inline-flex items-center gap-3 cursor-pointer"
            aria-label="kilo/ui Home"
          >
            {/* Logo has green slash, adaptive K, animated slash on hover, no size zoom */}
            <div className="h-10 w-10 flex items-center justify-center">
              <VectorKiloLogo
                theme={theme}
                className="h-10 w-10"
              />
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--text-primary)] select-none">
                kilo<span className="text-[var(--accent-green)]">/</span>ui
              </h1>
              <p className="font-mono text-[11px] text-[var(--text-muted)]">
                v0.1.0 • Component Library & Interactive Playground
              </p>
            </div>
          </Link>
        </div>

        {/* Concise Description */}
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          A minimal, precision-engineered component library and interactive playground with a dark visual identity, clean navigation, subtle animations, and a complete documentation and editing experience for every component.
        </p>

        {/* Quick Actions & CLI Command */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-[var(--text-primary)] text-[var(--bg-main)] font-mono text-xs font-medium hover:opacity-90 active:scale-98 transition-all cursor-pointer"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Explore Components</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Link>

          {/* Quick CLI snippet */}
          <button
            type="button"
            onClick={() => handleCopyCli("npx kilo-ui add button")}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-[var(--border)] bg-[var(--surface-secondary)]/50 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all cursor-pointer"
            title="Click to copy CLI installation command"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)]" />
            <span>npx kilo-ui add button</span>
            {copiedCli ? (
              <Check className="h-3.5 w-3.5 text-[var(--accent-green)] ml-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-[var(--text-muted)] ml-1" />
            )}
          </button>
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

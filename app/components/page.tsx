"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  Check,
  Code,
  Terminal,
} from "lucide-react";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";
import { ComponentCarousel } from "@/components/component-carousel";
import { VectorCategoryIcon, VectorComponentIcon } from "@/components/vector-icons";
import { ComponentPreviewStage } from "@/components/component-preview-stage";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import { cn } from "@/lib/utils";

export default function AllComponentsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 text-xs text-[var(--text-muted)] font-mono">
          Loading components...
        </div>
      }
    >
      <ComponentsDiscoveryContent />
    </React.Suspense>
  );
}

function ComponentsDiscoveryContent() {
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams.get("category");
  const [filterQuery, setFilterQuery] = React.useState("");

  const allItems = Object.values(REGISTRY_DATA);
  const categories = Array.from(new Set(allItems.map((item) => item.category)));

  // Filter items if search is active
  const filteredItems = filterQuery.trim()
    ? allItems.filter(
        (i) =>
          i.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : null;

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 1. Page Header & Quick Search - CONSTANT FIXED POSITION (NO LAYOUT SHIFT) */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-[var(--text-primary)]" />
              <span>All Components</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Explore {allItems.length} production primitives with live previews and visual editors.
            </p>
          </div>

          {/* Quick in-page search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter components..."
              className="w-full h-8.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Category Pill Filters with Smooth Rubbery Sliding Highlight */}
        <SlidingHighlightContainer
          className="flex w-full max-w-full flex-nowrap items-center gap-1 overflow-x-auto overscroll-x-contain scroll-smooth rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-md shadow-2xs"
          activeSelector='[data-active="true"]'
          activeKey={activeCategoryParam || "all"}
        >
          <Link
            href="/components"
            data-hover-item="true"
            data-active={!activeCategoryParam ? "true" : undefined}
            className={cn(
              "relative z-10 shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-150 select-none whitespace-nowrap",
              !activeCategoryParam
                ? "text-[var(--text-primary)] font-semibold"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium"
            )}
          >
            All ({allItems.length})
          </Link>
          {categories.map((cat) => {
            const count = allItems.filter((i) => i.category === cat).length;
            const isSelected = activeCategoryParam === cat;
            return (
              <Link
                key={cat}
                href={`/components?category=${encodeURIComponent(cat)}`}
                data-hover-item="true"
                data-active={isSelected ? "true" : undefined}
                className={cn(
                  "relative z-10 shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-150 select-none whitespace-nowrap",
                  isSelected
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium"
                )}
              >
                {cat} ({count})
              </Link>
            );
          })}
        </SlidingHighlightContainer>
      </div>

      {/* 2. Dynamic Bottom Content Area with Smooth Motion Transition */}
      <div key={activeCategoryParam || (filteredItems ? "search" : "all")} className="animate-fade-rise duration-200">
        {filteredItems ? (
          /* Search Results */
          <div className="space-y-4">
            <div className="font-mono text-xs text-[var(--text-muted)]">
              Found {filteredItems.length} {filteredItems.length === 1 ? "component" : "components"} matching &quot;{filterQuery}&quot;
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {filteredItems.map((item) => {
                const isWide =
                  item.name === "blurred-carousel" ||
                  item.name === "footer" ||
                  item.name === "scroll-marquee" ||
                  item.name === "directional-marquee";
                const isFeatured = item.name === "expanding-card";
                const isSlider = item.name === "content-slider";
                const isAtom = item.name === "button" || item.name === "badge" || item.name === "switch";

                return (
                  <div
                    key={item.name}
                    className={cn(
                      "rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/40 hover:border-[var(--border-hover)] transition-all flex flex-col overflow-hidden",
                      isWide && "col-span-1 md:col-span-2"
                    )}
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
                      <Link
                        href={`/components/${item.name}`}
                        className="flex items-center gap-2 group/link"
                      >
                        <VectorComponentIcon
                          name={item.name}
                          className="h-4 w-4 text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors"
                        />
                        <span className="font-mono text-sm font-semibold text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors">
                          {item.title}
                        </span>
                      </Link>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] rounded bg-[var(--surface-secondary)] px-1.5 py-0.5">
                        {item.category}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex items-center justify-center bg-[var(--bg-main)]/60 relative",
                        isWide
                          ? "p-4 sm:p-6 min-h-[300px]"
                          : isFeatured
                          ? "p-4 sm:p-6 min-h-[290px]"
                          : isSlider
                          ? "p-4 min-h-[220px]"
                          : isAtom
                          ? "p-4 min-h-[140px]"
                          : "p-5 min-h-[180px]"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className={cn(
                          "w-full flex items-center justify-center",
                          isWide ? "max-w-4xl" : isFeatured ? "max-w-md" : isSlider ? "max-w-[260px]" : "max-w-sm"
                        )}
                      >
                        <ComponentPreviewStage
                          item={item}
                          interactive={true}
                          showKnobs={false}
                          className="border-none bg-transparent p-0 shadow-none w-full"
                        />
                      </div>
                    </div>
                    <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 text-xs text-[var(--text-secondary)] flex items-center justify-between">
                      <span className="line-clamp-1">{item.description}</span>
                      <Link
                        href={`/components/${item.name}`}
                        className="font-mono text-xs text-[var(--accent-green)] hover:underline shrink-0 ml-2"
                      >
                        Inspect →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : activeCategoryParam && categories.includes(activeCategoryParam as any) ? (
          /* Specific Category Selected View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--text-primary)]">
                <VectorCategoryIcon
                  category={activeCategoryParam}
                  className="h-4 w-4 text-[var(--accent-green)]"
                />
                <span>{activeCategoryParam}</span>
                <span className="text-xs font-normal text-[var(--text-muted)] rounded border border-[var(--border)] px-1.5 py-0.5">
                  {allItems.filter((i) => i.category === activeCategoryParam).length} components
                </span>
              </div>

              <Link
                href="/components"
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
              >
                <span>View all categories</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {allItems
                .filter((i) => i.category === activeCategoryParam)
                .map((item) => {
                  const isWide =
                    item.name === "blurred-carousel" ||
                    item.name === "footer" ||
                    item.name === "scroll-marquee" ||
                    item.name === "directional-marquee";
                  const isFeatured = item.name === "expanding-card";
                  const isSlider = item.name === "content-slider";
                  const isAtom = item.name === "button" || item.name === "badge" || item.name === "switch";

                  return (
                    <div
                      key={item.name}
                      className={cn(
                        "rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/40 hover:border-[var(--border-hover)] transition-all flex flex-col overflow-hidden group",
                        isWide && "col-span-1 md:col-span-2"
                      )}
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
                        <Link
                          href={`/components/${item.name}`}
                          className="flex items-center gap-2.5 group/link"
                        >
                          <VectorComponentIcon
                            name={item.name}
                            className="h-4 w-4 text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors"
                          />
                          <span className="font-mono text-sm font-semibold text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors">
                            {item.title}
                          </span>
                        </Link>

                        <Link
                          href={`/components/${item.name}`}
                          className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent-green)] hover:underline"
                        >
                          <span>Docs & Code</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div
                        className={cn(
                          "flex items-center justify-center bg-[var(--bg-main)]/60 relative",
                          isWide
                            ? "p-4 sm:p-6 min-h-[300px]"
                            : isFeatured
                            ? "p-4 sm:p-6 min-h-[290px]"
                            : isSlider
                            ? "p-4 min-h-[220px]"
                            : isAtom
                            ? "p-4 min-h-[140px]"
                            : "p-5 min-h-[180px]"
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={cn(
                            "w-full flex items-center justify-center",
                            isWide ? "max-w-4xl" : isFeatured ? "max-w-md" : isSlider ? "max-w-[260px]" : "max-w-sm"
                          )}
                        >
                          <ComponentPreviewStage
                            item={item}
                            interactive={true}
                            showKnobs={false}
                            className="border-none bg-transparent p-0 shadow-none w-full"
                          />
                        </div>
                      </div>

                      <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 text-xs text-[var(--text-secondary)] flex items-center justify-between">
                        <span className="line-clamp-1">{item.description}</span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)] shrink-0 ml-2">
                          {item.files[0]?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          /* All Categories Carousel View */
          <div className="space-y-12">
            {categories.map((category) => {
              const catItems = allItems.filter((i) => i.category === category);
              return (
                <section key={category} className="space-y-3">
                  <ComponentCarousel
                    title={category}
                    category={category}
                    items={catItems}
                    seeAllHref={`/components?category=${encodeURIComponent(category)}`}
                    seeAllLabel={`See all ${category}`}
                  />
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

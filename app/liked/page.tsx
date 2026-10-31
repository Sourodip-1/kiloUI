"use client";

import * as React from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  ChevronRight,
  Terminal,
  Copy,
  Trash2,
  Layers,
} from "lucide-react";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";
import { VectorComponentIcon } from "@/components/vector-icons";
import { ComponentPreviewStage } from "@/components/component-preview-stage";
import { useAppShell } from "@/components/app-shell";
import { cn } from "@/lib/utils";

export default function LikedComponentsPage() {
  const { favorites, toggleFavorite, clearFavorites, showToast } = useAppShell();
  const [filterQuery, setFilterQuery] = React.useState("");

  const likedItems = React.useMemo(() => {
    return favorites
      .map((name) => REGISTRY_DATA[name])
      .filter((item): item is RegistryItem => Boolean(item));
  }, [favorites]);

  const filteredItems = filterQuery.trim()
    ? likedItems.filter(
        (i) =>
          i.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : likedItems;

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-rise duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Page Header */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500" />
              </div>
              <span>Liked Components</span>
              {likedItems.length > 0 && (
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {likedItems.length}
                </span>
              )}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Your bookmarked primitives saved across sessions for quick access and implementation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {likedItems.length > 0 && (
              <button
                type="button"
                onClick={clearFavorites}
                className="h-8.5 px-3 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-rose-500/40 hover:text-rose-500 text-xs font-mono text-[var(--text-secondary)] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Clear all liked components"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear all</span>
              </button>
            )}

            {/* Quick in-page search */}
            {likedItems.length > 2 && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Filter liked..."
                  className="w-full h-8.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {likedItems.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <Heart className="h-8 w-8" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-base font-bold text-[var(--text-primary)] font-mono">
              No liked components yet
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Explore our primitives in the registry and click the heart icon on any component to curate your personalized toolkit.
            </p>
          </div>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
          >
            <Layers className="h-4 w-4" />
            <span>Browse all components</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-[var(--text-muted)] border border-[var(--border)] rounded-xl bg-[var(--surface-elevated)]/20">
          No liked components matching &quot;{filterQuery}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/40 hover:border-[var(--border-hover)] transition-all flex flex-col overflow-hidden shadow-xs group"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
                <Link
                  href={`/components/${item.name}`}
                  className="flex items-center gap-2 group/link min-w-0"
                >
                  <VectorComponentIcon
                    name={item.name}
                    className="h-4 w-4 text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors shrink-0"
                  />
                  <span className="font-mono text-sm font-semibold text-[var(--text-primary)] group-hover/link:text-[var(--accent-green)] transition-colors truncate">
                    {item.title}
                  </span>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] rounded bg-[var(--surface-secondary)] px-1.5 py-0.5 border border-[var(--border)]">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(item.name, item.title)}
                    className="p-1.5 rounded text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Remove from favorites"
                    aria-label={`Remove ${item.title} from favorites`}
                  >
                    <Heart className="h-4 w-4 fill-rose-500" />
                  </button>
                </div>
              </div>

              {/* Preview Stage */}
              <div
                className={cn(
                  "flex items-center justify-center bg-[var(--bg-main)]/60 relative overflow-hidden",
                  item.category === "Cursors"
                    ? "p-0 h-[320px] w-full"
                    : "p-6 min-h-[180px]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={cn(
                    "w-full flex items-center justify-center",
                    item.category === "Cursors" ? "w-full h-full max-w-full" : "max-w-sm"
                  )}
                >
                  <ComponentPreviewStage
                    item={item}
                    interactive={true}
                    showKnobs={false}
                    className={cn(
                      "border-none bg-transparent p-0 shadow-none",
                      item.category === "Cursors" ? "w-full h-full min-h-[320px]" : ""
                    )}
                  />
                </div>
              </div>

              {/* Footer with CLI Copy & Link */}
              <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 text-xs text-[var(--text-secondary)] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`npx @kilo-ui/cli add ${item.name}`);
                    showToast(`Copied "npx @kilo-ui/cli add ${item.name}"`);
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer truncate"
                  title="Copy install command"
                >
                  <Terminal className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">npx @kilo-ui/cli add {item.name}</span>
                  <Copy className="h-3 w-3 opacity-60 shrink-0" />
                </button>

                <Link
                  href={`/components/${item.name}`}
                  className="font-mono text-xs text-[var(--accent-green)] hover:underline shrink-0 inline-flex items-center gap-0.5 font-semibold"
                >
                  <span>Inspect</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

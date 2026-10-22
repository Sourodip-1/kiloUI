"use client";

import * as React from "react";
import { Plus, X, Check, Heart, Sparkles, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

export interface BentoClusterItem {
  id: string;
  title?: string;
  src: string;
  alt?: string;
  caption?: string;
}

export interface BentoClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  items?: [BentoClusterItem, BentoClusterItem, BentoClusterItem, BentoClusterItem] | BentoClusterItem[];
  onAccept?: () => void;
  onDismiss?: () => void;
  showActions?: boolean;
  className?: string;
}

// Built-in curated high-res celebration imagery matching the reference
const DEFAULT_ITEMS: BentoClusterItem[] = [
  {
    id: "moment-1",
    title: "Birthday Feast",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    alt: "Friends sharing a birthday slice",
    caption: "Birthday moment",
  },
  {
    id: "moment-2",
    title: "Vanilla & Chocolate Cake",
    src: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=700&q=80",
    alt: "Artisanal celebration cake with chocolate drizzle",
    caption: "Birthday cake",
  },
  {
    id: "moment-3",
    title: "Outdoor Procession",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80",
    alt: "Festive celebration on the open street",
    caption: "Festive procession",
  },
  {
    id: "moment-4",
    title: "Friends Gathering",
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    alt: "Gathering and sharing treats on the floor",
    caption: "Friends gathering",
  },
];

export function BentoCluster({
  title = "Add to your moments?",
  subtitle = "27 Dec 2022 • 7 items",
  items = DEFAULT_ITEMS,
  onAccept,
  onDismiss,
  showActions = true,
  className,
  ...props
}: BentoClusterProps) {
  const [accepted, setAccepted] = React.useState<boolean | null>(null);
  const [activePreview, setActivePreview] = React.useState<BentoClusterItem | null>(null);
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const displayItems = items.length >= 4 ? items.slice(0, 4) : DEFAULT_ITEMS;

  const handleAccept = () => {
    setAccepted(true);
    onAccept?.();
    setTimeout(() => setAccepted(null), 3200);
  };

  const handleDismiss = () => {
    setAccepted(false);
    onDismiss?.();
    setTimeout(() => setAccepted(null), 3200);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[380px] rounded-[36px] border border-[var(--border)] bg-[#13161c] p-5 shadow-2xl text-[var(--text-primary)] transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Header Section */}
      <div className="text-center pt-2 pb-5 select-none">
        <h3 className="text-lg font-medium tracking-tight text-[#e5e9f0]">
          {title}
        </h3>
        <p className="mt-1 text-xs font-normal tracking-wide text-[#8a94a6]">
          {subtitle}
        </p>
      </div>

      {/* Asymmetric Organic Bento Collage */}
      <div className="grid grid-cols-12 gap-2.5 aspect-square max-h-[340px]">
        {/* Slot 1: Top-Left Tall Capsule (Cols 1-5, Rows 1-7) */}
        <div
          onClick={() => setActivePreview(displayItems[0])}
          className="group relative col-span-5 row-span-7 cursor-pointer overflow-hidden rounded-[26px] bg-[#1a1f29] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-inner"
        >
          {!imageErrors[displayItems[0]?.id] ? (
            <img
              src={displayItems[0]?.src}
              alt={displayItems[0]?.alt || "Moment 1"}
              onError={() => handleImageError(displayItems[0]?.id)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-950/60 to-slate-900 p-2 text-center">
              <Sparkles className="h-5 w-5 text-indigo-400 opacity-60 mb-1" />
              <span className="text-[10px] text-slate-400 font-mono">Portrait</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Slot 2: Top-Right Dominant Squircle (Cols 6-12, Rows 1-8) */}
        <div
          onClick={() => setActivePreview(displayItems[1])}
          className="group relative col-span-7 row-span-8 cursor-pointer overflow-hidden rounded-[34px] bg-[#1e2430] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-inner"
        >
          {!imageErrors[displayItems[1]?.id] ? (
            <img
              src={displayItems[1]?.src}
              alt={displayItems[1]?.alt || "Moment 2"}
              onError={() => handleImageError(displayItems[1]?.id)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-amber-950/50 to-slate-900 p-3 text-center">
              <ImageIcon className="h-6 w-6 text-amber-400 opacity-60 mb-1" />
              <span className="text-[10px] text-slate-400 font-mono">Cake & Candles</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Slot 3: Bottom-Left Rounded Landscape (Cols 1-7, Rows 8-12) */}
        <div
          onClick={() => setActivePreview(displayItems[2])}
          className="group relative col-span-7 row-span-5 cursor-pointer overflow-hidden rounded-[26px] bg-[#1a202a] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-inner"
        >
          {!imageErrors[displayItems[2]?.id] ? (
            <img
              src={displayItems[2]?.src}
              alt={displayItems[2]?.alt || "Moment 3"}
              onError={() => handleImageError(displayItems[2]?.id)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-950/50 to-slate-900 p-2 text-center">
              <span className="text-[10px] text-emerald-400 font-mono">Celebration</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Slot 4: Bottom-Right Landscape Card (Cols 8-12, Rows 9-12) */}
        <div
          onClick={() => setActivePreview(displayItems[3])}
          className="group relative col-span-5 row-span-4 cursor-pointer overflow-hidden rounded-[24px] bg-[#161c24] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/5 shadow-inner"
        >
          {!imageErrors[displayItems[3]?.id] ? (
            <img
              src={displayItems[3]?.src}
              alt={displayItems[3]?.alt || "Moment 4"}
              onError={() => handleImageError(displayItems[3]?.id)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-rose-950/50 to-slate-900 p-2 text-center">
              <span className="text-[10px] text-rose-400 font-mono">Friends</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      {/* Floating Action Buttons */}
      {showActions && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {/* Plus / Accept Button - Soft Google Photos Blue / Accent Pill */}
          <button
            type="button"
            onClick={handleAccept}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c2e7ff] text-[#001d35] shadow-lg transition-all duration-200 hover:bg-[#d8efff] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#c2e7ff]/60"
            aria-label="Add moment"
            title="Add to your moments"
          >
            <Plus className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Close / Dismiss Button - Dark Charcoal Circular Pill */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e232c] text-[#c4c7c5] border border-white/5 shadow-lg transition-all duration-200 hover:bg-[#282e3a] hover:text-white hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Dismiss moment"
            title="Dismiss suggestion"
          >
            <X className="h-5 w-5 stroke-[2.2]" />
          </button>
        </div>
      )}

      {/* Interactive Toast / Feedback Notice */}
      {accepted !== null && (
        <div
          className={cn(
            "absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
            accepted
              ? "bg-[var(--accent-green)] text-[var(--bg-main)]"
              : "bg-[#282e3a] text-white border border-white/10"
          )}
        >
          {accepted ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Added to Moments timeline</span>
            </>
          ) : (
            <>
              <X className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Suggestion dismissed</span>
            </>
          )}
        </div>
      )}

      {/* Quick Lightbox Preview Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-[28px] overflow-hidden border border-white/10 bg-[#161a22] shadow-2xl p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h4 className="text-sm font-medium text-white">{activePreview.title || "Moment Preview"}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{activePreview.caption || "High-resolution photo"}</p>
              </div>
              <button
                onClick={() => setActivePreview(null)}
                className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-black/50">
              <img
                src={activePreview.src}
                alt={activePreview.alt || "Preview"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

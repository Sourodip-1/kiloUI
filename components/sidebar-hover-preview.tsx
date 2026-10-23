"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegistryItem } from "@/registry/registry-data";
import { VectorComponentIcon } from "@/components/vector-icons";
import { ComponentPreviewStage } from "@/components/component-preview-stage";

export interface HoverState {
  item: RegistryItem;
  top: number;
  sidebarRight: number;
  variant?: string;
}

interface SidebarHoverPreviewProps {
  hoverState: HoverState | null;
  onMouseEnterPreview?: () => void;
  onMouseLeavePreview?: () => void;
  isCollapsed?: boolean;
}

export function SidebarHoverPreview({
  hoverState,
  onMouseEnterPreview,
  onMouseLeavePreview,
  isCollapsed = false,
}: SidebarHoverPreviewProps) {
  const [mounted, setMounted] = React.useState(false);
  const [current, setCurrent] = React.useState<HoverState | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth item tracking
  React.useEffect(() => {
    if (hoverState) {
      setCurrent(hoverState);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setCurrent(null);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [hoverState]);

  const handleMouseLeave = () => {
    onMouseLeavePreview?.();
  };

  if (!mounted || !current) return null;

  // Viewport vertical clamping
  const cardHeight = 290;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 900;
  const rawTop = current.top - cardHeight / 2;
  const clampedTop = Math.max(16, Math.min(viewportHeight - cardHeight - 16, rawTop));

  const item = current.item;
  const leftPosition = current.sidebarRight + 12;

  const content = (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnterPreview}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        top: `${clampedTop}px`,
        left: `${leftPosition}px`,
        transform: isVisible ? "scale(1)" : "scale(0.96)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition:
          "top 260ms cubic-bezier(0.16, 1, 0.3, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease",
      }}
      className={cn(
        "z-50 w-[310px] rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/95 shadow-2xl backdrop-blur-xl overflow-hidden select-none",
        "ring-1 ring-white/10 dark:ring-white/5",
        "shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]"
      )}
    >
      {/* 1. Header with Physics Icon & Tags */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/50">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[var(--surface-tertiary)] flex items-center justify-center shrink-0 border border-[var(--border)]">
            <VectorComponentIcon
              name={item.name}
              className="h-3.5 w-3.5 text-[var(--accent-green)] transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)] leading-tight flex items-center gap-1.5">
              <span>{item.title}</span>
              {current.variant && (
                <span className="text-[10px] text-[var(--accent-green)] font-mono font-bold capitalize">
                  ({current.variant})
                </span>
              )}
            </h4>
            <span className="font-mono text-[9px] text-[var(--text-muted)]">
              {item.category} {current.variant ? "• Variant Preview" : ""}
            </span>
          </div>
        </div>

        <Link
          href={
            current.variant
              ? `/components/${item.name}?variant=${encodeURIComponent(current.variant)}`
              : `/components/${item.name}`
          }
          className="flex items-center gap-1 font-mono text-[10px] text-[var(--accent-green)] hover:underline shrink-0 group/link"
        >
          <span>Explore</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </Link>
      </div>

      {/* 2. Interactive Live Physics Preview Canvas */}
      <div className="p-3 bg-[var(--canvas-bg)] flex items-center justify-center min-h-[140px] relative border-b border-[var(--border)] overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(var(--canvas-grid-dot) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="w-full flex items-center justify-center pointer-events-none relative z-10">
          <ComponentPreviewStage
            item={item}
            interactive={false}
            showKnobs={false}
            activeVariant={current.variant}
            className="border-none bg-transparent p-0 shadow-none w-full"
          />
        </div>
      </div>

      {/* 3. Description & Metadata Footer */}
      <div className="p-3 bg-[var(--surface-secondary)]/30 space-y-2">
        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/60 text-[10px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] shrink-0 animate-pulse" />
            <span className="truncate">{item.files[0]?.name || `${item.name}.tsx`}</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] shrink-0 ml-2">
            Click to open
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

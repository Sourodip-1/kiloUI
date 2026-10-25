"use client";

import * as React from "react";
import { AlignLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  label: string;
  level?: 1 | 2; // 1 = main section, 2 = sub-section / nested
  description?: string;
}

export interface ContentSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  items?: TOCItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  rubberBandEffect?: boolean;
}

export const DEFAULT_TOC_ITEMS: TOCItem[] = [
  { id: "installation", label: "Installation", level: 1 },
  { id: "usage", label: "Usage", level: 1 },
  { id: "check-animation", label: "Check animation", level: 2 },
  { id: "animation", label: "Animation", level: 1 },
  { id: "api-reference", label: "API Reference", level: 1 },
  {
    id: "api-primitives",
    label: "Root, Trigger, Portal, Group, Label, RadioGroup, Separator, Arrow, Sub",
    level: 2,
  },
  {
    id: "api-items",
    label: "Item, CheckboxItem, RadioItem, SubTrigger",
    level: 2,
  },
  {
    id: "api-content",
    label: "Content, SubContent",
    level: 2,
  },
  {
    id: "api-indicator",
    label: "ItemIndicator",
    level: 2,
  },
];

export const ContentSlider = React.forwardRef<HTMLDivElement, ContentSliderProps>(
  (
    {
      className,
      title = "On this page",
      items = DEFAULT_TOC_ITEMS,
      activeId: controlledActiveId,
      onSelect,
      rubberBandEffect = true,
      ...props
    },
    ref
  ) => {
    const [internalActiveId, setInternalActiveId] = React.useState<string>(
      controlledActiveId || items[0]?.id || ""
    );
    const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

    // Hover state tracking
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    // Refs to track pixel coordinates of each item relative to the container
    const listRef = React.useRef<HTMLDivElement>(null);
    const itemRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    // Coordinate positions for the Big Slider (Active indicator) and Small Slider (Hover indicator)
    const [activeIndicatorStyle, setActiveIndicatorStyle] = React.useState<{
      top: number;
      height: number;
    }>({ top: 0, height: 18 });

    const [hoverIndicatorStyle, setHoverIndicatorStyle] = React.useState<{
      top: number;
      height: number;
      opacity: number;
    }>({ top: 0, height: 10, opacity: 0 });

    // Update the Big Slider position whenever activeId changes
    const updateActivePosition = React.useCallback(() => {
      if (!listRef.current) return;
      const el = itemRefs.current.get(activeId);
      if (el) {
        const listTop = listRef.current.getBoundingClientRect().top;
        const elRect = el.getBoundingClientRect();
        const top = elRect.top - listTop + (elRect.height - 18) / 2;
        setActiveIndicatorStyle({ top, height: 18 });
      }
    }, [activeId]);

    // Update the Small Slider position whenever hoveredId changes
    const updateHoverPosition = React.useCallback(() => {
      if (!listRef.current || !hoveredId) {
        setHoverIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const el = itemRefs.current.get(hoveredId);
      if (el) {
        const listTop = listRef.current.getBoundingClientRect().top;
        const elRect = el.getBoundingClientRect();
        const top = elRect.top - listTop + (elRect.height - 10) / 2;
        setHoverIndicatorStyle({ top, height: 10, opacity: 1 });
      } else {
        setHoverIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    }, [hoveredId]);

    React.useEffect(() => {
      updateActivePosition();
      window.addEventListener("resize", updateActivePosition);
      return () => window.removeEventListener("resize", updateActivePosition);
    }, [updateActivePosition]);

    React.useEffect(() => {
      updateHoverPosition();
    }, [updateHoverPosition]);

    const handleItemClick = (id: string) => {
      setInternalActiveId(id);
      onSelect?.(id);
    };

    return (
      <nav
        ref={ref}
        aria-label="Table of contents"
        className={cn(
          "w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-lg select-none",
          className
        )}
        {...props}
      >
        {/* Header Icon + "On this page" matching Image 3 */}
        <div className="flex items-center gap-2.5 pb-3 mb-2 border-b border-[var(--border)]/60">
          <div className="h-6 w-6 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]">
            <AlignLeft className="h-3.5 w-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-tight">
            {title}
          </span>
        </div>

        {/* Vertical Rail + Items Container */}
        <div
          ref={listRef}
          onMouseLeave={() => setHoveredId(null)}
          className="relative pl-4 space-y-1 py-1"
        >
          {/* Continuous Vertical Rail Line */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-px bg-[var(--border)] pointer-events-none"
          />

          {/* 1. BIG SLIDER (Active Section Indicator) with rubber band smooth animation */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-[-1.5px] w-[3px] rounded-full bg-[var(--text-primary)] z-20 pointer-events-none shadow-xs will-change-[transform,top]",
              rubberBandEffect
                ? "transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                : "transition-all duration-200"
            )}
            style={{
              top: `${activeIndicatorStyle.top}px`,
              height: `${activeIndicatorStyle.height}px`,
            }}
          />

          {/* 2. SMALL SLIDER (Hover tracker) moving along the cursor with rubber band animation */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-[-1.5px] w-[3px] rounded-full bg-[var(--accent-green)] z-10 pointer-events-none shadow-xs will-change-[transform,top,opacity]",
              rubberBandEffect
                ? "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                : "transition-all duration-150"
            )}
            style={{
              top: `${hoverIndicatorStyle.top}px`,
              height: `${hoverIndicatorStyle.height}px`,
              opacity: hoverIndicatorStyle.opacity,
            }}
          />

          {/* TOC Items List */}
          {items.map((item) => {
            const isActive = item.id === activeId;
            const isHovered = item.id === hoveredId;
            const isNested = item.level === 2;

            return (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                  else itemRefs.current.delete(item.id);
                }}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={cn(
                  "group flex items-start text-left w-full py-1.5 px-2 rounded-md transition-all duration-200 cursor-pointer text-xs",
                  isNested ? "pl-5 text-[11px]" : "font-medium text-xs",
                  isActive
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {/* Text moves slightly to the right on hover with rubber band spring ease! */}
                <span
                  className={cn(
                    "inline-block transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] leading-relaxed",
                    isHovered ? "translate-x-1.5 text-[var(--text-primary)]" : "translate-x-0",
                    isActive && !isHovered && "text-[var(--text-primary)] font-semibold"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subtle active status tag at bottom */}
        <div className="mt-4 pt-2.5 border-t border-[var(--border)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>Active Section:</span>
          <span className="text-[var(--accent-green)] font-semibold truncate max-w-[150px]">
            {items.find((i) => i.id === activeId)?.label || activeId}
          </span>
        </div>
      </nav>
    );
  }
);

ContentSlider.displayName = "ContentSlider";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DockActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  badge?: string | number;
}

export interface FloatingActionDockProps {
  /** Optional primary inverted monochrome FAB button */
  primaryAction?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
  /** Secondary dock action items */
  items: DockActionItem[];
  /** Whether dock auto-hides when scrolling downward and reveals when scrolling upward */
  scrollHide?: boolean;
  /** Alignment of the floating dock: center, left, or right */
  position?: "center" | "right" | "left";
  /** Additional CSS class names */
  className?: string;
  /** Inner dock element class name */
  dockClassName?: string;
}

export function FloatingActionDock({
  primaryAction,
  items,
  scrollHide = false,
  position = "center",
  className,
  dockClassName,
}: FloatingActionDockProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    if (!scrollHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollYRef.current + 10 && currentScrollY > 60) {
        // Scrolling down -> hide dock
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 10) {
        // Scrolling up -> show dock
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollHide]);

  const isRelative = className?.includes("relative");
  const isAbsolute = className?.includes("absolute");
  const isCustomPosition = isRelative || isAbsolute || className?.includes("static");

  const hasCustomHorizontal =
    isCustomPosition ||
    className?.includes("inset-x-") ||
    className?.includes("w-full") ||
    className?.includes("justify-center") ||
    className?.includes("left-") ||
    className?.includes("right-");

  const positionClasses = hasCustomHorizontal
    ? ""
    : {
        center: "left-1/2 -translate-x-1/2",
        left: "left-4 sm:left-6",
        right: "right-4 sm:right-6",
      }[position];

  return (
    <div
      style={
        isRelative
          ? undefined
          : {
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }
      }
      className={cn(
        isRelative ? "relative" : isAbsolute ? "absolute" : "fixed",
        !isRelative && "bottom-0",
        "z-40 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        positionClasses,
        !isVisible && "translate-y-24 opacity-0 pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full backdrop-blur-xl bg-[var(--surface-elevated)]/90 border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.35)] select-none",
          dockClassName
        )}
      >
        {/* Navigation Action Items */}
        <div className="flex items-center gap-1 px-1">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              aria-label={item.label}
              className={cn(
                "relative group flex items-center justify-center h-10 w-10 rounded-full transition-all duration-150 active:scale-95 cursor-pointer",
                item.active
                  ? "bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/60"
              )}
            >
              <span className="h-4.5 w-4.5 shrink-0 flex items-center justify-center">
                {item.icon}
              </span>

              {item.badge !== undefined && (
                <span className="absolute top-1.5 right-1.5 flex h-3.5 min-w-3.5 px-0.5 items-center justify-center rounded-full bg-[var(--surface-tertiary)] border border-[var(--border)] text-[9px] font-mono font-bold text-[var(--text-primary)]">
                  {item.badge}
                </span>
              )}

              {/* Minimal Tooltip on Hover */}
              <span className="absolute -top-8 px-2 py-0.5 rounded-md bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border)] text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Inverted Monochrome Primary FAB */}
        {primaryAction && (
          <div className="pl-1 border-l border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={primaryAction.onClick}
              aria-label={primaryAction.label}
              className="relative group flex items-center justify-center h-10 px-3.5 gap-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-main)] font-semibold text-xs transition-all duration-150 active:scale-95 hover:opacity-90 shadow-md cursor-pointer"
            >
              <span className="h-4 w-4 shrink-0 flex items-center justify-center">
                {primaryAction.icon}
              </span>
              <span className="truncate hidden sm:inline">{primaryAction.label}</span>

              {/* Minimal Tooltip on Hover */}
              <span className="absolute -top-8 px-2 py-0.5 rounded-md bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border)] text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                {primaryAction.label}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

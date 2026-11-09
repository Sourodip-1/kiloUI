"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface ThumbSegmentControllerProps {
  /** Array of segment items to display */
  items: SegmentItem[];
  /** Controlled active segment id */
  value?: string;
  /** Initial active segment id when uncontrolled */
  defaultValue?: string;
  /** Callback fired when selected segment changes */
  onChange?: (value: string) => void;
  /** Size variant: default is calibrated to 46px for ergonomic thumb reach */
  size?: "sm" | "default" | "lg";
  /** Whether the segmented controller expands to full container width */
  fullWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export function ThumbSegmentController({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  size = "default",
  fullWidth = true,
  className,
}: ThumbSegmentControllerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(() => {
    return defaultValue || items[0]?.id || "";
  });

  const activeValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const [isPressed, setIsPressed] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  // Pill position state
  const [pillStyle, setPillStyle] = React.useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const updatePill = React.useCallback(() => {
    const activeEl = itemsRef.current.get(activeValue);
    const containerEl = containerRef.current;
    if (activeEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setPillStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        ready: true,
      });
    }
  }, [activeValue]);

  React.useEffect(() => {
    updatePill();
    // Update on resize
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill, items]);

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setUncontrolledValue(id);
    }
    onChange?.(id);
  };

  // Keyboard navigation for accessible tablist
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIndex = enabledItems.findIndex((item) => item.id === activeValue);

    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex >= 0 && enabledItems[nextIndex]) {
      e.preventDefault();
      const nextItem = enabledItems[nextIndex];
      handleSelect(nextItem.id);
      itemsRef.current.get(nextItem.id)?.focus();
    }
  };

  // Height calibrated to M3 touch ergonomics: sm = 38px, default = 46px, lg = 52px
  const sizeHeight = {
    sm: "h-[38px] p-0.5 text-xs",
    default: "h-[46px] p-1 text-xs sm:text-sm",
    lg: "h-[52px] p-1.5 text-sm",
  }[size];

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      className={cn(
        "relative flex items-center rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] select-none transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
        sizeHeight,
        fullWidth ? "w-full" : "w-auto inline-flex",
        isPressed && "scale-[0.985]",
        className
      )}
    >
      {/* Sliding Active Pill with M3 Spring Easing */}
      {pillStyle.ready && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${pillStyle.left}px, 0, 0)`,
            width: `${pillStyle.width}px`,
            transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), width 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute inset-y-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xs pointer-events-none z-0"
        />
      )}

      {/* Segment Option Buttons */}
      {items.map((item) => {
        const isActive = item.id === activeValue;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) itemsRef.current.set(item.id, el);
              else itemsRef.current.delete(item.id);
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onClick={() => handleSelect(item.id, item.disabled)}
            className={cn(
              "relative z-10 flex-1 min-w-0 h-full flex items-center justify-center gap-1 px-1.5 sm:px-2.5 rounded-lg font-medium transition-colors cursor-pointer select-none",
              isActive
                ? "text-[var(--text-primary)] font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              item.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
            <span className="truncate text-xs sm:text-sm">{item.label}</span>
            {item.badge !== undefined && (
              <span
                className={cn(
                  "ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono leading-tight border shrink-0",
                  isActive
                    ? "bg-[var(--surface-tertiary)] text-[var(--text-primary)] border-[var(--border)]"
                    : "bg-[var(--surface-secondary)] text-[var(--text-muted)] border-[var(--border-subtle)]"
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

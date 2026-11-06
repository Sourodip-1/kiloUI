"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Search, Command, ArrowRight, CornerDownLeft, Sparkles, Layers, Sliders, Moon, Sun, Terminal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  category: "Primitives" | "Actions" | "Preferences" | "System";
  shortcut?: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
}

export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "spotlight-dark" | "cyber-matrix" | "minimal-monochrome" | "compact-dock";
  items?: CommandItem[];
  placeholder?: string;
  enableGlobalShortcut?: boolean;
}

const DEFAULT_COMMANDS: CommandItem[] = [
  { id: "1", label: "Contour Tide WebGL Ocean", category: "Primitives", shortcut: "⌘1" },
  { id: "2", label: "Liquid Metal Chrome Ribbon", category: "Primitives", shortcut: "⌘2" },
  { id: "3", label: "Target Cursor Spring Physics", category: "Primitives", shortcut: "⌘3" },
  { id: "4", label: "Copy CLI Installation Command", category: "Actions", shortcut: "⇧C" },
  { id: "5", label: "Toggle Dark / Light Mode", category: "Preferences", shortcut: "⌘T" },
  { id: "6", label: "View System Telemetry & FPS", category: "System", shortcut: "⌥S" },
];

export function CommandPalette({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "spotlight-dark",
  items = DEFAULT_COMMANDS,
  placeholder = "Search primitives, commands, shaders...",
  enableGlobalShortcut = true,
  className,
  ...props
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  // Manage body scroll on open
  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Global Cmd+K trigger
  React.useEffect(() => {
    if (!enableGlobalShortcut) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableGlobalShortcut, isOpen, setOpen]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter commands
  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filtered[selectedIndex];
      if (current) {
        current.onSelect?.();
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  const isCyber = variant === "cyber-matrix";
  const isMinimal = variant === "minimal-monochrome";

  return (
    <>
      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-green)]/40 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-xs cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span>Quick command...</span>
        </div>
        <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-muted)]">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop & Palette Box portalled to document.body */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 sm:pt-28 px-4 select-none pointer-events-auto">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md animate-in fade-in-0 duration-200 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          {/* Palette Container */}
          <div
            className={cn(
              "relative z-50 w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/98 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 flex flex-col",
              isCyber && "border-[var(--accent-green)]/40 shadow-[0_0_30px_rgba(92,169,4,0.15)]",
              isMinimal && "rounded-lg border-white/20 bg-black",
              className
            )}
            onKeyDown={handleKeyDown}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30 h-13 shrink-0">
              <Search className={cn("h-4 w-4 shrink-0 mr-3 text-[var(--text-muted)]", isCyber && "text-[var(--accent-green)]")} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Command Results List */}
            <div className="max-h-[320px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[var(--text-muted)]">
                  No matching primitives or commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.onSelect?.();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer",
                        isSelected
                          ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full transition-transform",
                            isSelected ? "bg-[var(--accent-green)] scale-125" : "bg-[var(--text-muted)]/40"
                          )}
                        />
                        <span className="font-sans font-medium">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-[var(--surface-tertiary)]">
                          {item.category}
                        </span>
                        {item.shortcut && (
                          <kbd className="font-mono text-[10px] text-[var(--text-muted)]">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="h-3 w-3 text-[var(--accent-green)] ml-1" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Telemetry */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)] bg-[var(--surface-secondary)]/20 text-[10px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Execute</span>
                <span>Esc Dismiss</span>
              </div>
              <span className="text-[var(--accent-green)]">kilo/ui v0.3.0</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

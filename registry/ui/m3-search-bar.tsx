"use client";

import * as React from "react";
import { Search, ArrowLeft, X, Mic, Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface M3SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: (val: string) => void;
  design?: "m3" | "minimal";
  variant?: "default" | "minimal" | string;
  suggestions?: string[];
  recentSearches?: string[];
  avatar?: React.ReactNode;
  className?: string;
}

export function M3SearchBar({
  placeholder = "Search apps, contacts, files...",
  value: controlledValue,
  onChange,
  onSearch,
  design,
  variant,
  suggestions = ["Component library", "Material Design 3 tokens", "Mobile gesture physics", "Next.js Turbopack"],
  recentSearches,
  avatar,
  className,
}: M3SearchBarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const searchVal = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const isMinimal = design === "minimal" || variant === "minimal";

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUncontrolledValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchVal);
      setIsExpanded(false);
    } else if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* Docked Search Bar */}
      <div
        onClick={() => setIsExpanded(true)}
        className={cn(
          "flex items-center transition-all duration-200 cursor-pointer shadow-xs",
          isMinimal
            ? "h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--border-hover)]"
            : "h-14 px-4 rounded-full border border-transparent bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)]"
        )}
      >
        <Search className="h-4 w-4 text-[var(--text-muted)] shrink-0 mr-3" />
        <span
          className={cn(
            "flex-1 text-sm truncate",
            searchVal ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)]"
          )}
        >
          {searchVal || placeholder}
        </span>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {searchVal && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUncontrolledValue("");
                onChange?.("");
              }}
              className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            className="p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <Mic className="h-4 w-4" />
          </button>

          {avatar && <div className="shrink-0">{avatar}</div>}
        </div>
      </div>

      {/* Expanded Search View Overlay / Dropdown */}
      {isExpanded && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 z-50 p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          )}
        >
          {/* Header Input */}
          <div className="flex items-center pb-2 border-b border-[var(--border)]/60">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1.5 mr-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <input
              autoFocus
              type="text"
              value={searchVal}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />

            {searchVal && (
              <button
                type="button"
                onClick={() => {
                  setUncontrolledValue("");
                  onChange?.("");
                }}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Suggestions & Recent queries */}
          <div className="pt-2 space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Recent Queries
            </div>
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setUncontrolledValue(item);
                  onChange?.(item);
                  onSearch?.(item);
                  setIsExpanded(false);
                }}
                className="flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>{item}</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

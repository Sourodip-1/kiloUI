"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Menu, Terminal, ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  VectorLayersIcon,
  VectorFolderIcon,
  VectorApiIcon,
  VectorPanelLeftIcon,
  VectorKiloLogo,
  VectorCategoryIcon,
  VectorComponentIcon,
} from "@/components/vector-icons";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  activeComponent?: string;
  activeCategory?: string;
  theme?: "dark" | "light" | "system";
}

export function Sidebar({
  className,
  collapsed = false,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
  activeComponent,
  activeCategory,
  theme = "dark",
  ...props
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const registryItems = Object.values(REGISTRY_DATA);
  const categories = Array.from(new Set(registryItems.map((item) => item.category)));

  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({
    Actions: true,
    "Forms & Inputs": true,
    Overlays: true,
    "Data Display": true,
    Navigation: true,
    "Media & Layout": true,
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const expandAllCategories = () => {
    const next: Record<string, boolean> = {};
    categories.forEach((cat) => {
      next[cat] = true;
    });
    setExpandedCategories(next);
  };

  const collapseAllCategories = () => {
    const next: Record<string, boolean> = {};
    categories.forEach((cat) => {
      next[cat] = false;
    });
    setExpandedCategories(next);
  };

  const isAllCollapsed = categories.every((cat) => !expandedCategories[cat]);

  const handleToggleAllCategories = () => {
    if (isAllCollapsed) {
      expandAllCategories();
    } else {
      collapseAllCategories();
    }
  };

  const isOverview = pathname === "/";
  const isAllComponents = pathname === "/components";
  const isDocs = pathname === "/docs" || pathname?.startsWith("/docs");

  const sidebarContent = (
    <div className="flex flex-col h-full w-64 shrink-0 bg-[var(--bg-sidebar)] text-[var(--text-primary)] select-none overflow-hidden">
      {/* 1. Header & Brand */}
      <div className="flex h-14 items-center justify-between px-3 border-b border-[var(--border)] shrink-0 w-64">
        <Link
          href="/"
          className="flex items-center gap-2.5 group/brand py-1 px-1 rounded transition-colors overflow-hidden"
          onClick={(e) => {
            if (isCollapsed) {
              e.preventDefault();
              handleToggleCollapse();
            } else {
              onMobileOpenChange?.(false);
            }
          }}
          title={isCollapsed ? "Expand sidebar (⌘B)" : "kilo/ui"}
        >
          <div className="h-6 w-6 shrink-0 flex items-center justify-center">
            <VectorKiloLogo theme={theme} className="h-6 w-6" />
          </div>
          <span
            className={cn(
              "font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap transition-opacity duration-200 select-none",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            kilo<span className="text-[var(--accent-green)]">/</span>ui
          </span>
        </Link>

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={handleToggleCollapse}
          className={cn(
            "p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-opacity duration-200 cursor-pointer hidden lg:flex items-center justify-center shrink-0",
            isCollapsed && "opacity-0 pointer-events-none"
          )}
          aria-label="Collapse sidebar"
          title="Collapse sidebar (⌘B)"
        >
          <VectorPanelLeftIcon isCollapsed={false} className="h-3.5 w-3.5" />
        </button>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => onMobileOpenChange?.(false)}
          className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Primary Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4 w-64">
        <nav className="space-y-1">
          {/* Overview */}
          <Link
            href="/"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group flex items-center w-full rounded p-2 text-xs font-medium transition-colors active:scale-[0.98]",
              isOverview
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "Overview" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorFolderIcon
                isActive={isOverview}
                className={cn(
                  "h-4 w-4 transition-colors",
                  isOverview
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <span
              className={cn(
                "ml-2.5 whitespace-nowrap transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              Overview
            </span>
          </Link>

          {/* All Components */}
          <Link
            href="/components"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group flex items-center w-full rounded p-2 text-xs font-medium transition-colors active:scale-[0.98]",
              isAllComponents
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "All Components" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorLayersIcon
                isActive={isAllComponents}
                className={cn(
                  "h-4 w-4 transition-colors",
                  isAllComponents
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <div
              className={cn(
                "flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              <span className="whitespace-nowrap">All Components</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {registryItems.length}
              </span>
            </div>
          </Link>

          {/* Registry API */}
          <Link
            href="/docs"
            onClick={() => onMobileOpenChange?.(false)}
            className={cn(
              "group flex items-center w-full rounded p-2 text-xs font-medium transition-colors active:scale-[0.98]",
              isDocs
                ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent"
            )}
            title={isCollapsed ? "Registry API" : undefined}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              <VectorApiIcon
                isActive={isDocs}
                className={cn(
                  "h-4 w-4 transition-colors",
                  isDocs
                    ? "text-[var(--accent-green)]"
                    : "text-[var(--text-primary)] group-hover:text-[var(--accent-green)]"
                )}
              />
            </div>
            <span
              className={cn(
                "ml-2.5 whitespace-nowrap transition-opacity duration-200",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
            >
              Registry API
            </span>
          </Link>
        </nav>

        {/* Horizontal Divider before Categories */}
        <div
          className={cn(
            "border-t border-[var(--border)] my-1 transition-all duration-300",
            isCollapsed ? "w-8 ml-0.5" : "w-full"
          )}
        />

        {/* 3. Categories & Components */}
        <div className="space-y-1">
          {/* Categories Header */}
          <div className="flex items-center justify-between w-full rounded p-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] select-none">
            <div className="flex items-center flex-1 min-w-0">
              <div
                className="flex h-5 w-5 shrink-0 items-center justify-center cursor-default"
                title={isCollapsed ? `Categories (${categories.length})` : undefined}
              >
                <VectorCategoryIcon category="all" className="h-4 w-4 text-[var(--text-muted)]" />
              </div>
              <span
                className={cn(
                  "ml-2.5 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-200",
                  isCollapsed && "opacity-0 pointer-events-none"
                )}
              >
                <span>Categories</span>
                <span className="text-[9px] text-[var(--text-muted)] font-normal">({categories.length})</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleAllCategories}
              className={cn(
                "p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-opacity duration-200 cursor-pointer shrink-0",
                isCollapsed && "opacity-0 pointer-events-none"
              )}
              title={isAllCollapsed ? "Expand all categories" : "Collapse all categories"}
              aria-label={isAllCollapsed ? "Expand all categories" : "Collapse all categories"}
            >
              {isAllCollapsed ? (
                <ChevronsUpDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronsDownUp className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Categories List */}
          {categories.map((cat) => {
            const catItems = registryItems.filter((i) => i.category === cat);
            const isCategoryActive = activeCategory === cat;
            const isExpanded = expandedCategories[cat] ?? true;

            return (
              <div key={cat} className="space-y-0.5">
                <div
                  className={cn(
                    "group/cat flex w-full items-center justify-between rounded p-2 text-xs transition-colors",
                    isCategoryActive
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-medium"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  <Link
                    href={`/components?category=${encodeURIComponent(cat)}`}
                    onClick={() => onMobileOpenChange?.(false)}
                    className="flex items-center flex-1 min-w-0 text-left"
                    title={isCollapsed ? `${cat} (${catItems.length})` : undefined}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <VectorCategoryIcon
                        category={cat}
                        isActive={isCategoryActive}
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isCategoryActive
                            ? "text-[var(--accent-green)]"
                            : "text-[var(--text-primary)] group-hover/cat:text-[var(--accent-green)]"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "ml-2.5 truncate whitespace-nowrap transition-opacity duration-200",
                        isCollapsed && "opacity-0 pointer-events-none"
                      )}
                    >
                      {cat}
                    </span>
                  </Link>

                  <div
                    className={cn(
                      "flex items-center gap-1 transition-opacity duration-200 shrink-0",
                      isCollapsed && "opacity-0 pointer-events-none"
                    )}
                  >
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {catItems.length}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(cat);
                      }}
                      className="p-0.5 rounded hover:bg-[var(--surface-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform cursor-pointer"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          isExpanded ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    </button>
                  </div>
                </div>

                {/* Sub-items with smooth expand/collapse transition */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    !isCollapsed && isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="ml-3.5 pl-2 border-l border-[var(--border)] py-0.5 space-y-0.5">
                      {catItems.map((comp) => {
                        const isCompActive =
                          pathname === `/components/${comp.name}` || activeComponent === comp.name;

                        return (
                          <Link
                            key={comp.name}
                            href={`/components/${comp.name}`}
                            onClick={() => onMobileOpenChange?.(false)}
                            className={cn(
                              "group/comp flex items-center gap-2 w-full px-2 py-1 rounded text-[11px] transition-colors text-left",
                              isCompActive
                                ? "bg-[var(--surface-secondary)] text-[var(--accent-green)] font-medium border border-[var(--border)]"
                                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                            )}
                          >
                            <VectorComponentIcon
                              name={comp.name}
                              className={cn(
                                "h-3 w-3 shrink-0 transition-colors",
                                isCompActive
                                  ? "text-[var(--accent-green)]"
                                  : "text-[var(--text-primary)] group-hover/comp:text-[var(--accent-green)]"
                              )}
                            />
                            <span className="truncate">{comp.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Minimal Clean Footer */}
      <div className="border-t border-[var(--border)] p-2.5 shrink-0 w-64">
        <Link
          href="/docs"
          className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1"
          title="Registry Documentation"
        >
          <span
            className={cn(
              "whitespace-nowrap transition-opacity duration-200",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            Documentation
          </span>
          <span
            className={cn(
              "text-[10px] transition-opacity duration-200",
              isCollapsed && "opacity-0 pointer-events-none"
            )}
          >
            /docs
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] h-screen sticky top-0 z-30",
          isCollapsed ? "w-14" : "w-64",
          className
        )}
        {...props}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => onMobileOpenChange?.(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

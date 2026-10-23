"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Moon,
  Sun,
  Monitor,
  Menu,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Code,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { VectorKiloLogo, VectorPanelLeftIcon, VectorComponentIcon } from "@/components/vector-icons";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";

type ThemeMode = "dark" | "light" | "system";
export type AccentColor = "green" | "violet" | "blue" | "amber" | "rose" | "cyan";

export const ACCENT_PALETTES: { id: AccentColor; name: string; hex: string; lightHex: string }[] = [
  { id: "green", name: "Sage Green", hex: "#8bc49a", lightHex: "#1b7337" },
  { id: "violet", name: "Violet", hex: "#a78bfa", lightHex: "#6d28d9" },
  { id: "blue", name: "Cobalt Blue", hex: "#60a5fa", lightHex: "#1d4ed8" },
  { id: "amber", name: "Amber Gold", hex: "#fbbf24", lightHex: "#b45309" },
  { id: "rose", name: "Rose", hex: "#fb7185", lightHex: "#be123c" },
  { id: "cyan", name: "Teal Cyan", hex: "#2dd4bf", lightHex: "#0f766e" },
];

interface AppShellContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  showToast: (message: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppShellContext = React.createContext<AppShellContextType | null>(null);

export function useAppShell() {
  const context = React.useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used within an <AppShell />");
  }
  return context;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = React.useState<ThemeMode>("dark");
  const [accent, setAccent] = React.useState<AccentColor>("green");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const showToast = React.useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Theme Sync
  React.useEffect(() => {
    const saved = localStorage.getItem("kilo-theme") as ThemeMode | null;
    if (saved) setTheme(saved);
    const savedAccent = localStorage.getItem("kilo-accent") as AccentColor | null;
    if (savedAccent) setAccent(savedAccent);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("kilo-theme", theme);

    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.remove("light");
      } else {
        root.classList.add("light");
      }
    } else if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem("kilo-accent", accent);
    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  // Global Keyboard Shortcuts (Cmd+K, Cmd+B)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      }
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Determine active component from pathname
  const activeComponent = pathname?.startsWith("/components/")
    ? pathname.replace("/components/", "")
    : undefined;

  const currentItem = activeComponent ? REGISTRY_DATA[activeComponent] : null;

  // Filter items for search palette
  const allItems = Object.values(REGISTRY_DATA);
  const searchResults = searchQuery.trim()
    ? allItems.filter(
        (i) =>
          i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems;

  return (
    <AppShellContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
        showToast,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      <div className="h-screen max-h-screen flex bg-[var(--bg-main)] text-[var(--text-primary)] antialiased font-sans overflow-hidden">
        {/* Reusable Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapsedChange={setSidebarCollapsed}
          mobileOpen={mobileMenuOpen}
          onMobileOpenChange={setMobileMenuOpen}
          activeComponent={activeComponent}
          activeCategory={currentItem?.category}
          theme={theme}
        />

        {/* Main Content Area with dedicated vertical scrolling */}
        <div className="flex flex-1 flex-col h-full overflow-y-auto overflow-x-hidden min-w-0">
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-main)]/95 backdrop-blur px-4 sm:px-6 shrink-0">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded lg:hidden cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Collapsed Sidebar Expand Button */}
              {sidebarCollapsed && (
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(false)}
                  className="hidden lg:flex p-1.5 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-95 transition-all animate-in fade-in duration-200 cursor-pointer"
                  aria-label="Expand sidebar"
                  title="Expand sidebar (⌘B)"
                >
                  <VectorPanelLeftIcon isCollapsed={true} className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                <Link
                  href="/"
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5 font-bold"
                >
                  <span>kilo</span>
                  <span className="text-[var(--accent-green)] font-bold">/</span>
                  <span>ui</span>
                </Link>

                {pathname === "/" && (
                  <>
                    <span>/</span>
                    <span className="text-[var(--text-primary)] font-bold">Overview</span>
                  </>
                )}

                {pathname === "/components" && (
                  <>
                    <span>/</span>
                    <span className="text-[var(--text-primary)] font-bold">All Components</span>
                  </>
                )}

                {pathname?.startsWith("/components/") && currentItem && (
                  <>
                    <span>/</span>
                    <Link
                      href={`/components?category=${encodeURIComponent(currentItem.category)}`}
                      className="hover:text-[var(--text-primary)] transition-colors hidden sm:inline font-semibold"
                    >
                      {currentItem.category}
                    </Link>
                    <span className="hidden sm:inline">/</span>
                    <span className="text-[var(--text-primary)] font-bold">{currentItem.title}</span>
                  </>
                )}

                {pathname?.startsWith("/icons") && (
                  <>
                    <span>/</span>
                    <span className="text-[var(--text-primary)] font-bold">Icon Pack</span>
                  </>
                )}

                {pathname?.startsWith("/docs") && (
                  <>
                    <span>/</span>
                    <span className="text-[var(--text-primary)] font-bold">Registry API</span>
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="relative hidden sm:flex items-center gap-2 h-8 w-48 md:w-56 rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 text-xs text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <span className="truncate font-medium">Search primitives...</span>
                <kbd className="ml-auto pointer-events-none rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1 py-0.5 font-mono text-[9px] font-bold text-[var(--text-muted)]">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Dynamic Accent Color Palette Picker */}
              <div className="hidden sm:inline-flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--surface-elevated)] p-1">
                {ACCENT_PALETTES.map((p) => {
                  const isSelected = accent === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setAccent(p.id)}
                      className={cn(
                        "h-3.5 w-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center",
                        isSelected
                          ? "ring-1.5 ring-offset-1 ring-[var(--text-primary)] ring-offset-[var(--bg-main)] scale-110"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      )}
                      style={{ backgroundColor: theme === "light" ? p.lightHex : p.hex }}
                      title={`Accent: ${p.name}`}
                      aria-label={`Select ${p.name} accent`}
                    />
                  );
                })}
              </div>

              {/* Theme Switcher: Dark / Light / System */}
              <div className="inline-flex rounded border border-[var(--border)] bg-[var(--surface-elevated)] p-0.5">
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    theme === "dark"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="Dark mode"
                  title="Dark mode"
                >
                  <Moon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    theme === "light"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="Light mode"
                  title="Light mode"
                >
                  <Sun className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    theme === "system"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label="System mode"
                  title="System mode"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Clean Bounded Footer */}
          <footer className="border-t border-[var(--border)] py-6 px-4 sm:px-6 lg:px-8 text-xs text-[var(--text-muted)] mt-auto shrink-0 bg-[var(--bg-main)]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="font-semibold text-[var(--text-primary)]">kilo/ui</span>
                <span>•</span>
                <span>10 Components</span>
                <span>•</span>
                <span>100 Animated Icons</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <Link href="/icons" className="hover:text-[var(--text-primary)] transition-colors">
                  Icon Pack
                </Link>
                <Link href="/components" className="hover:text-[var(--text-primary)] transition-colors">
                  All Components
                </Link>
                <Link href="/docs" className="hover:text-[var(--text-primary)] transition-colors">
                  Registry Docs
                </Link>
              </div>
            </div>
          </footer>
        </div>

        {/* Global Command Palette / Search Modal */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
              onClick={() => setSearchOpen(false)}
            />
            <div className="relative z-50 w-full max-w-xl rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="flex items-center border-b border-[var(--border)] px-3 py-2.5">
                <Search className="h-4 w-4 text-[var(--text-secondary)] mr-2.5 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a component name, category, or keyword..."
                  className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-sans"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded cursor-pointer"
                >
                  <kbd className="font-mono text-[10px] text-[var(--text-muted)]">ESC</kbd>
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-xs font-mono text-[var(--text-muted)]">
                    No components matching "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        router.push(`/components/${item.name}`);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-[var(--surface-secondary)] group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <VectorComponentIcon
                          name={item.name}
                          className="h-4 w-4 text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider rounded border border-[var(--border)] px-1.5 py-0.5 shrink-0 whitespace-nowrap bg-[var(--surface-secondary)]/50">
                        {item.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Global Floating Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-[var(--accent-green)]/40 bg-[var(--surface-elevated)]/95 px-4 py-2.5 text-xs font-mono text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Check className="h-4 w-4 text-[var(--accent-green)] animate-pop" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </AppShellContext.Provider>
  );
}

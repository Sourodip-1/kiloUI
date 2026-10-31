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
  Heart,
  Trash2,
  Copy,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/registry/ui/footer";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import {
  VectorKiloLogo,
  VectorPanelLeftIcon,
  VectorComponentIcon,
  VectorGithubIcon,
} from "@/components/vector-icons";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";

type ThemeMode = "dark" | "light" | "system";
export type AccentColor = "green" | "violet" | "blue" | "amber" | "rose" | "cyan";

export const ACCENT_PALETTES: { id: AccentColor; name: string; hex: string; lightHex: string }[] = [
  { id: "green", name: "Lime Green", hex: "#5CA904", lightHex: "#5CA904" },
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
  favorites: string[];
  isFavorited: (name: string) => boolean;
  toggleFavorite: (name: string, title?: string) => void;
  clearFavorites: () => void;
  likedDrawerOpen: boolean;
  setLikedDrawerOpen: (open: boolean) => void;
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
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [likedDrawerOpen, setLikedDrawerOpen] = React.useState<boolean>(false);
  const [likedFilterQuery, setLikedFilterQuery] = React.useState<string>("");

  const showToast = React.useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Apply theme to DOM and localStorage on explicit user action
  const applyTheme = React.useCallback((newTheme: ThemeMode) => {
    const root = document.documentElement;
    try {
      localStorage.setItem("kilo-theme", newTheme);
    } catch {
      // ignore
    }

    if (newTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    } else if (newTheme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, []);

  const handleSetTheme = React.useCallback(
    (newTheme: ThemeMode) => {
      setTheme(newTheme);
      applyTheme(newTheme);
    },
    [applyTheme]
  );

  const applyAccent = React.useCallback((newAccent: AccentColor) => {
    try {
      localStorage.setItem("kilo-accent", newAccent);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-accent", newAccent);
  }, []);

  const handleSetAccent = React.useCallback(
    (newAccent: AccentColor) => {
      setAccent(newAccent);
      applyAccent(newAccent);
    },
    [applyAccent]
  );

  // Theme & Accent Sync on mount: read saved preference WITHOUT overwriting localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("kilo-theme") as ThemeMode | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setTheme(saved);
        if (saved === "system") {
          const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          if (systemDark) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
          }
        }
      } else if (document.documentElement.classList.contains("light")) {
        setTheme("light");
      }

      const savedAccent = localStorage.getItem("kilo-accent") as AccentColor | null;
      if (savedAccent) {
        setAccent(savedAccent);
      }
    } catch {
      // ignore
    }
  }, []);

  // System theme dynamic listener (only active when in system mode)
  React.useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  // Synchronize favorites with localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("kiloui_favorites");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {
      // ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "kiloui_favorites") {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          if (Array.isArray(parsed)) setFavorites(parsed);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isFavorited = React.useCallback(
    (name: string) => favorites.includes(name),
    [favorites]
  );

  const toggleFavorite = React.useCallback(
    (name: string, customTitle?: string) => {
      setFavorites((prev) => {
        const exists = prev.includes(name);
        const next = exists ? prev.filter((n) => n !== name) : [...prev, name];
        try {
          localStorage.setItem("kiloui_favorites", JSON.stringify(next));
        } catch {
          // ignore
        }
        if (exists) {
          showToast(`Removed from favorites`);
        } else {
          showToast(customTitle ? `Saved "${customTitle}" to favorites` : "Saved to favorites");
        }
        return next;
      });
    },
    [showToast]
  );

  const clearFavorites = React.useCallback(() => {
    setFavorites([]);
    try {
      localStorage.setItem("kiloui_favorites", JSON.stringify([]));
    } catch {
      // ignore
    }
    showToast("Cleared all favorites");
  }, [showToast]);

  // Global Keyboard Shortcuts (Cmd+K, Cmd+B, Escape)
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
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        if (likedDrawerOpen) setLikedDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, likedDrawerOpen]);

  // Determine active component from pathname
  const activeComponent = pathname?.startsWith("/components/")
    ? pathname.replace("/components/", "")
    : undefined;

  const currentItem = activeComponent ? REGISTRY_DATA[activeComponent] : null;

  // Liked items resolved from registry
  const likedItems = React.useMemo(() => {
    return favorites
      .map((name) => REGISTRY_DATA[name])
      .filter((item): item is RegistryItem => Boolean(item));
  }, [favorites]);

  const filteredLikedItems = likedFilterQuery.trim()
    ? likedItems.filter(
        (i) =>
          i.title.toLowerCase().includes(likedFilterQuery.toLowerCase()) ||
          i.name.toLowerCase().includes(likedFilterQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(likedFilterQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(likedFilterQuery.toLowerCase())
      )
    : likedItems;

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

  // Main content scroll container ref
  const mainScrollRef = React.useRef<HTMLDivElement>(null);

  // Reset scroll to top whenever navigating to a different component/route
  React.useEffect(() => {
    const scrollToTop = () => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTop = 0;
      }
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    };
    scrollToTop();
    const raf = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <AppShellContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        accent,
        setAccent: handleSetAccent,
        showToast,
        sidebarCollapsed,
        setSidebarCollapsed,
        favorites,
        isFavorited,
        toggleFavorite,
        clearFavorites,
        likedDrawerOpen,
        setLikedDrawerOpen,
      }}
    >
      {pathname === "/" || !["/components", "/overview", "/icons", "/motion", "/liked", "/login"].some(r => pathname === r || pathname?.startsWith(r + "/")) ? (
        <div className="min-h-screen w-full bg-[#070709] text-white antialiased font-sans">
          {children}
        </div>
      ) : (
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
          <div
            ref={mainScrollRef}
            id="main-scroll-container"
            className="flex flex-1 flex-col h-full overflow-y-auto overflow-x-hidden min-w-0"
          >
            {/* Top Sticky Header */}
            <header className="sticky top-0 z-40 flex min-h-14 items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--bg-main)]/95 backdrop-blur px-3 sm:px-6 py-2 shrink-0">
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
                <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                  <Link
                    href="/"
                    className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5 font-bold"
                  >
                    <span>kilo</span>
                    <span className="text-[var(--accent-green)] font-bold">/</span>
                    <span>ui</span>
                  </Link>

                  {pathname === "/overview" && (
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

                  {pathname?.startsWith("/liked") && (
                    <>
                      <span>/</span>
                      <span className="text-[var(--text-primary)] font-bold">Liked Components</span>
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
                      <span className="max-w-[35vw] truncate text-[var(--text-primary)] font-bold">{currentItem.title}</span>
                    </>
                  )}
                </nav>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">

              {/* Liked Navigation Button */}
              <Link
                href="/liked"
                className={cn(
                  "relative hidden sm:flex items-center gap-1.5 h-8 px-2.5 rounded border text-xs transition-all cursor-pointer font-medium",
                  pathname === "/liked"
                    ? "border-[var(--accent-green)] bg-[var(--surface-secondary)] text-[var(--text-primary)] shadow-xs"
                    : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                )}
                title="Liked components"
                aria-label="Liked components"
              >
                <Heart
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    favorites.length > 0 || pathname === "/liked"
                      ? "fill-rose-500 text-rose-500"
                      : "text-[var(--text-secondary)]"
                  )}
                />
                <span>Liked</span>
                {favorites.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-rose-500/10 text-rose-500 font-mono text-[10px] font-bold border border-rose-500/20">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/liked"
                className={cn(
                  "sm:hidden relative p-2 rounded transition-colors cursor-pointer",
                  pathname === "/liked"
                    ? "text-[var(--text-primary)] bg-[var(--surface-secondary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                )}
                aria-label="Liked components"
                title="Liked components"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    favorites.length > 0 || pathname === "/liked"
                      ? "fill-rose-500 text-rose-500"
                      : "text-[var(--text-secondary)]"
                  )}
                />
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[var(--surface-elevated)]" />
                )}
              </Link>

              {/* GitHub Link Button */}
              <a
                href="https://github.com/sourodip-1/kiloUI"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 rounded border border-[var(--border)] bg-[var(--surface-elevated)] text-xs text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-medium"
                title="GitHub (sourodip-1/kiloUI)"
                aria-label="GitHub repository"
              >
                <VectorGithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://github.com/sourodip-1/kiloUI"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded cursor-pointer"
                aria-label="GitHub repository"
                title="GitHub: sourodip-1/kiloUI"
              >
                <VectorGithubIcon className="h-4 w-4" />
              </a>

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
              <div
                suppressHydrationWarning
                className="hidden sm:inline-flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--surface-elevated)] p-1"
              >
                {ACCENT_PALETTES.map((p) => {
                  const isSelected = accent === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSetAccent(p.id)}
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

              {/* Theme Switcher: Dark / Light / System with smooth spring glide */}
              <SlidingHighlightContainer
                suppressHydrationWarning
                activeSelector='[data-state="active"]'
                activeKey={theme}
                className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-0.5 select-none"
                pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)]/70 rounded shadow-xs"
              >
                <button
                  type="button"
                  data-hover-item="true"
                  data-state={theme === "dark" ? "active" : "inactive"}
                  onClick={() => handleSetTheme("dark")}
                  className={cn(
                    "group relative z-10 p-1 rounded transition-colors cursor-pointer",
                    theme === "dark"
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                  aria-label="Dark mode"
                  title="Dark mode"
                >
                  <Moon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  data-hover-item="true"
                  data-state={theme === "light" ? "active" : "inactive"}
                  onClick={() => handleSetTheme("light")}
                  className={cn(
                    "group relative z-10 p-1 rounded transition-colors cursor-pointer",
                    theme === "light"
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                  aria-label="Light mode"
                  title="Light mode"
                >
                  <Sun className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  data-hover-item="true"
                  data-state={theme === "system" ? "active" : "inactive"}
                  onClick={() => handleSetTheme("system")}
                  className={cn(
                    "group relative z-10 p-1 rounded transition-colors cursor-pointer",
                    theme === "system"
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                  aria-label="System mode"
                  title="System mode"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
              </SlidingHighlightContainer>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Overflown Blended Footer */}
          <Footer brandText="kilo/ui" blurBlend={true} className="mt-auto shrink-0" />
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

        {/* Liked Components Slide-Over Drawer Tab */}
        {likedDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setLikedDrawerOpen(false)}
            />
            <div className="relative z-50 h-full w-full max-w-md sm:max-w-lg border-l border-[var(--border)] bg-[var(--bg-main)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 ease-out">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 bg-[var(--surface-elevated)]">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <span>Liked Components</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]">
                        {likedItems.length}
                      </span>
                    </h2>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Your saved primitives & components
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Link
                    href="/liked"
                    onClick={() => setLikedDrawerOpen(false)}
                    className="p-1.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors text-xs flex items-center gap-1"
                    title="View full page"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline text-[11px] font-medium font-mono">Full view</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setLikedDrawerOpen(false)}
                    className="p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                    aria-label="Close drawer"
                    title="Close (ESC)"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Optional Quick Filter if more than 3 liked components */}
              {likedItems.length > 3 && (
                <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--surface-secondary)]/30">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={likedFilterQuery}
                      onChange={(e) => setLikedFilterQuery(e.target.value)}
                      placeholder="Filter liked components..."
                      className="w-full h-7.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] pl-8 pr-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                {likedItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        No liked components yet
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
                        Click the heart icon on any component to save it here for instant reference and quick CLI installation.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLikedDrawerOpen(false);
                        router.push("/components");
                      }}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all cursor-pointer"
                    >
                      <span>Explore all components</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : filteredLikedItems.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-[var(--text-muted)]">
                    No saved components matching &quot;{likedFilterQuery}&quot;
                  </div>
                ) : (
                  filteredLikedItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        setLikedDrawerOpen(false);
                        router.push(`/components/${item.name}`);
                      }}
                      className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--border-hover)] hover:shadow-md transition-all cursor-pointer group space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <VectorComponentIcon
                            name={item.name}
                            className="h-4 w-4 text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-green)] transition-colors block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Unlike / Remove Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.name, item.title);
                          }}
                          className="p-1 rounded text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                          title="Remove from favorites"
                          aria-label={`Remove ${item.title} from favorites`}
                        >
                          <Heart className="h-3.5 w-3.5 fill-rose-500" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-[var(--border)] text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(`npx @kilo-ui/cli add ${item.name}`);
                            showToast(`Copied "npx @kilo-ui/cli add ${item.name}"`);
                          }}
                          className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono text-[10px] cursor-pointer"
                          title="Copy install command"
                        >
                          <Terminal className="h-3 w-3" />
                          <span>npx @kilo-ui/cli add {item.name}</span>
                          <Copy className="h-2.5 w-2.5 ml-0.5 opacity-60" />
                        </button>

                        <span className="inline-flex items-center gap-0.5 text-[var(--accent-green)] font-mono text-[10px] group-hover:translate-x-0.5 transition-transform">
                          <span>View</span>
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {likedItems.length > 0 && (
                <div className="border-t border-[var(--border)] p-3 bg-[var(--surface-elevated)] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={clearFavorites}
                    className="inline-flex items-center gap-1.5 text-[var(--text-muted)] hover:text-rose-500 transition-colors font-mono text-xs cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear all</span>
                  </button>

                  <Link
                    href="/liked"
                    onClick={() => setLikedDrawerOpen(false)}
                    className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-primary)] hover:text-[var(--accent-green)] transition-colors font-medium"
                  >
                    <span>Open full tab page</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              )}
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
      )}
    </AppShellContext.Provider>
  );
}

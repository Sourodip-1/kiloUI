"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Terminal,
  Copy,
  Sparkles,
  Code,
  FileCode,
  Share2,
  Heart,
  Eye,
  Square,
  Laptop,
  Smartphone,
  LayoutGrid,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { RegistryItem, REGISTRY_DATA } from "@/registry/registry-data";
import { VectorComponentIcon } from "@/components/vector-icons";
import { ComponentPreviewStage } from "@/components/component-preview-stage";
import { PropsTable } from "@/components/props-table";
import { CodeBlock } from "@/components/code-block";
import { ComponentCarousel } from "@/components/component-carousel";
import { useAppShell } from "@/components/app-shell";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";
import { cn } from "@/lib/utils";

function OpenAILogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1636a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6862zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.6602v-.0067zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4598a.7948.7948 0 0 0-.3927.6813l-.0048 6.7219zm1.0977-2.3655l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function ClaudeLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h2.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H4.5zm12.5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h2.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H17zm-6.5-6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V4.5zm0 12.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V17zM6.93 6.93c-.59-.59-1.54-.59-2.12 0s-.59 1.54 0 2.12l1.77 1.77c.59.59 1.54.59 2.12 0s.59-1.54 0-2.12L6.93 6.93zm10.24 10.24c-.59-.59-2.12 0s-.59 1.54 0 2.12l1.77 1.77c.59.59 1.54.59 2.12 0s.59-1.54 0-2.12l-1.77-1.77zm0-10.24l-1.77 1.77c-.59.59-.59 1.54 0 2.12s1.54.59 2.12 0l1.77-1.77c.59-.59.59-1.54 0-2.12s-1.53-.59-2.12 0zM8.7 17.17l-1.77 1.77c-.59.59-.59 1.54 0 2.12s1.54.59 2.12 0l1.77-1.77c.59-.59.59-1.54 0-2.12s-1.53-.59-2.12 0z" />
    </svg>
  );
}

function V0Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3.5L21.5 19.5H2.5L12 3.5Z" />
    </svg>
  );
}

interface ComponentDetailClientProps {
  item: RegistryItem;
  initialVariant?: string;
}

export function ComponentDetailClient({ item, initialVariant }: ComponentDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeVariant = searchParams?.get("variant") || initialVariant;

  const handleVariantChange = React.useCallback(
    (variant: string) => {
      const currentParams = searchParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
      currentParams.set("variant", variant);
      router.replace(`/components/${item.name}?${currentParams.toString()}`, { scroll: false });
    },
    [router, searchParams, item.name]
  );

  const { showToast, isFavorited: checkFavorited, toggleFavorite } = useAppShell();
  const isFavorited = checkFavorited(item.name);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showGrid, setShowGrid] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [configuredCode, setConfiguredCode] = React.useState("");

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const frame = requestAnimationFrame(() => setViewport("mobile"));
    return () => cancelAnimationFrame(frame);
  }, []);

  const mainFile = item.files[0];
  const sourceCode = mainFile?.content || "";

  // Guarantee page always opens at the top when navigating between components
  React.useEffect(() => {
    const scrollToTop = () => {
      const mainEl = document.getElementById("main-scroll-container");
      if (mainEl) mainEl.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    scrollToTop();
    const raf = requestAnimationFrame(scrollToTop);
    const timer = setTimeout(scrollToTop, 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [item.name]);

  // Click outside to close dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  // Escape key handler for fullscreen & dropdown
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (dropdownOpen) setDropdownOpen(false);
        if (isFullscreen) setIsFullscreen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen, isFullscreen]);

  const relatedItems = Object.values(REGISTRY_DATA).filter(
    (i) => i.name !== item.name && i.name !== "bento-cluster"
  );

  const promptWriting =
    item.aiPrompt ||
    `Create and integrate a production-ready ${item.title} component for kilo/ui in React (TypeScript) and Tailwind CSS.\n\nDescription: ${item.description}\nCategory: ${item.category}`;

  const aiPrompt = `${promptWriting}

### Component Source Code (${mainFile?.name || `${item.name}.tsx`}):
\`\`\`tsx
${sourceCode.trim()}
\`\`\`
${(configuredCode || item.usage) ? `
### Example Usage:
\`\`\`tsx
${(configuredCode || item.usage || "").trim()}
\`\`\`
` : ""}`.trim();

  const handleToggleFavorite = () => {
    toggleFavorite(item.name, item.title);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Component link copied to clipboard!");
      }
    } catch {
      showToast("Failed to copy link");
    }
  };

  const handleCopyAction = async (type: "prompt" | "configured" | "source" | "cli") => {
    setDropdownOpen(false);
    try {
      let content = "";
      let label = "";
      if (type === "prompt") {
        content = aiPrompt;
        label = "Copied AI prompt with code!";
      } else if (type === "configured") {
        content = configuredCode || item.usage || sourceCode;
        label = "Copied configured code!";
      } else if (type === "source") {
        content = sourceCode;
        label = "Copied TSX component source!";
      } else if (type === "cli") {
        content = `npx @kilo-ui/cli add ${item.name}`;
        label = `Copied 'npx @kilo-ui/cli add ${item.name}'`;
      }
      await navigator.clipboard.writeText(content);
      showToast(label);
    } catch {
      showToast("Failed to copy to clipboard");
    }
  };

  const handleOpenIn = async (platform: "chatgpt" | "claude" | "v0") => {
    setDropdownOpen(false);
    // Also copy prompt with code to clipboard for convenience
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(aiPrompt);
      }
    } catch {
      // ignore
    }

    let url = "";
    if (platform === "chatgpt") {
      url = `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`;
      showToast("Prompt copied & opening in ChatGPT...");
    } else if (platform === "claude") {
      url = `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`;
      showToast("Prompt copied & opening in Claude...");
    } else if (platform === "v0") {
      url = `https://v0.dev?q=${encodeURIComponent(aiPrompt)}`;
      showToast("Prompt copied & opening in v0...");
    }
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 pb-6">
      {/* 1. Header Section */}
      <div className="space-y-4 border-b border-[var(--border)] pb-5">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5">
            <span>kilo</span>
            <span className="text-[var(--accent-green)] font-semibold">/</span>
            <span>ui</span>
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
            <span>Components</span>
          </Link>
          <span>/</span>
          <Link
            href={`/components?category=${encodeURIComponent(item.category)}`}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            {item.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-medium">{item.title}</span>
        </nav>

        {/* Title & Quick Install Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <VectorComponentIcon name={item.name} className="h-5 w-5 text-[var(--accent-green)] shrink-0" />
              <h1 className="min-w-0 break-words font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </h1>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl pt-1">
              {item.description}
            </p>
          </div>

          {/* Quick CLI Pill */}
          <div className="flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)] shadow-xs">
            <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
            <span className="truncate select-all">npx @kilo-ui/cli add {item.name}</span>
            <button
              type="button"
              onClick={() => handleCopyAction("cli")}
              className="ml-1 p-1 hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors cursor-pointer"
              title="Copy install command"
              aria-label="Copy install command"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Unified Preview / Code Toolbar and Stage */}
      <div className="space-y-3">
        {/* View Switcher Tabs with Slide Physics */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "preview" | "code")}
          variant="slide"
          className="space-y-6"
        >
          {/* Toolbar with Slide Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: View Switcher (Preview / Code) with smooth spring highlight */}
            <SlidingHighlightContainer
              activeSelector='[data-state="active"]'
              activeKey={activeTab}
              className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 shadow-xs select-none"
              pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)] rounded-md shadow-xs"
            >
              <button
                type="button"
                data-hover-item="true"
                data-state={activeTab === "preview" ? "active" : "inactive"}
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "group relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer select-none",
                  activeTab === "preview"
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                data-hover-item="true"
                data-state={activeTab === "code" ? "active" : "inactive"}
                onClick={() => setActiveTab("code")}
                className={cn(
                  "group relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer select-none",
                  activeTab === "code"
                    ? "text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <Code className="h-3.5 w-3.5" />
                <span>Code</span>
              </button>
            </SlidingHighlightContainer>

            {/* Right: Viewport Sizing + Favorites + Share + Copy for AI */}
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
              {/* Viewport size buttons (active in preview mode) */}
              {activeTab === "preview" && (
                <SlidingHighlightContainer
                  activeSelector='[data-state="active"]'
                  activeKey={`${viewport}-${isFullscreen}-${showGrid}`}
                  className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 shadow-xs select-none"
                  pillClassName="bg-[var(--surface-secondary)] border border-[var(--border)]/70 rounded-md shadow-2xs"
                >
                  <button
                    type="button"
                    data-hover-item="true"
                    data-state={viewport === "desktop" && !isFullscreen ? "active" : "inactive"}
                    onClick={() => {
                      setViewport("desktop");
                      setIsFullscreen(false);
                    }}
                    className={cn(
                      "group relative z-10 p-1.5 rounded-md transition-colors cursor-pointer",
                      viewport === "desktop" && !isFullscreen
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                    title="Desktop viewport (100%)"
                    aria-label="Desktop viewport"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    data-hover-item="true"
                    data-state={viewport === "tablet" && !isFullscreen ? "active" : "inactive"}
                    onClick={() => {
                      setViewport("tablet");
                      setIsFullscreen(false);
                    }}
                    className={cn(
                      "group relative z-10 p-1.5 rounded-md transition-colors cursor-pointer",
                      viewport === "tablet" && !isFullscreen
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                    title="Tablet viewport (768px)"
                    aria-label="Tablet viewport"
                  >
                    <Laptop className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    data-hover-item="true"
                    data-state={viewport === "mobile" && !isFullscreen ? "active" : "inactive"}
                    onClick={() => {
                      setViewport("mobile");
                      setIsFullscreen(false);
                    }}
                    className={cn(
                      "group relative z-10 p-1.5 rounded-md transition-colors cursor-pointer",
                      viewport === "mobile" && !isFullscreen
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                    title="Mobile viewport (375px)"
                    aria-label="Mobile viewport"
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    data-hover-item="true"
                    data-state={showGrid ? "active" : "inactive"}
                    onClick={() => setShowGrid(!showGrid)}
                    className={cn(
                      "group relative z-10 p-1.5 rounded-md transition-colors cursor-pointer",
                      showGrid
                        ? "text-[var(--accent-green)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                    title="Toggle canvas grid"
                    aria-label="Toggle canvas grid"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    data-hover-item="true"
                    data-state={isFullscreen ? "active" : "inactive"}
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className={cn(
                      "group relative z-10 p-1.5 rounded-md transition-colors cursor-pointer",
                      isFullscreen
                        ? "text-[var(--accent-green)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                    title="Toggle fullscreen preview"
                    aria-label="Toggle fullscreen preview"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </SlidingHighlightContainer>
              )}

              {/* Favorite Button */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={cn(
                  "p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] transition-all cursor-pointer shadow-xs active:scale-95",
                  isFavorited
                    ? "text-rose-500 border-rose-500/40 bg-rose-500/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                )}
                title={isFavorited ? "Saved in favorites" : "Add to favorites"}
                aria-label="Favorite component"
              >
                <Heart className={cn("h-4 w-4", isFavorited && "fill-rose-500 text-rose-500")} />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-all cursor-pointer shadow-xs active:scale-95"
                title="Copy component link"
                aria-label="Share component"
              >
                <Share2 className="h-4 w-4" />
              </button>

              {/* Copy for AI Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    "flex items-center gap-2 h-9 px-3.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-[var(--text-primary)] text-xs font-mono font-medium transition-all cursor-pointer active:scale-98 shadow-xs",
                    dropdownOpen && "border-[var(--accent-green)]/60 ring-1 ring-[var(--accent-green)]/30"
                  )}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <Copy className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                  <span>Copy for AI</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Menu matching Screenshot */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-64 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/98 backdrop-blur-md shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Copy
                    </div>
                    <SlidingHighlightContainer
                      className="space-y-0.5"
                      pillClassName="bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-lg shadow-2xs"
                    >
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleCopyAction("prompt")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <Sparkles className="h-4 w-4 text-[var(--accent-green)] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Copy prompt</span>
                      </button>
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleCopyAction("configured")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <Code className="h-4 w-4 text-[var(--text-secondary)] shrink-0 group-hover:text-[var(--accent-green)] transition-colors" />
                        <span className="font-medium">Copy configured code</span>
                      </button>
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleCopyAction("source")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <FileCode className="h-4 w-4 text-[var(--text-secondary)] shrink-0 group-hover:text-[var(--accent-green)] transition-colors" />
                        <span className="font-medium">Copy component source</span>
                      </button>
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleCopyAction("cli")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <Terminal className="h-4 w-4 text-[var(--text-secondary)] shrink-0 group-hover:text-[var(--accent-green)] transition-colors" />
                        <span className="font-medium">Copy install command</span>
                      </button>
                    </SlidingHighlightContainer>

                    <div className="h-px bg-[var(--border)] my-1.5" />

                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                      Open in
                    </div>
                    <SlidingHighlightContainer
                      className="space-y-0.5"
                      pillClassName="bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-lg shadow-2xs"
                    >
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleOpenIn("chatgpt")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <OpenAILogo className="h-4 w-4 text-[var(--text-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Open in ChatGPT</span>
                      </button>
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleOpenIn("claude")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <ClaudeLogo className="h-4 w-4 text-[#d97706] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Open in Claude</span>
                      </button>
                      <button
                        type="button"
                        data-hover-item="true"
                        onClick={() => handleOpenIn("v0")}
                        className="group relative z-10 flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                      >
                        <V0Logo className="h-4 w-4 text-[var(--text-primary)] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Open in v0</span>
                      </button>
                    </SlidingHighlightContainer>
                  </div>
                )}
            </div>
          </div>
        </div>

          {/* Primary View (Live Preview with Knobs OR TSX Source Code) with Slide Physics */}
          <div className="relative w-full overflow-x-clip min-h-[360px] sm:min-h-[460px]">
            <TabsContent value="preview" className="space-y-12 mt-0">
              <section className="space-y-3">
                <ComponentPreviewStage
                  item={item}
                  interactive={true}
                  showKnobs={true}
                  viewport={viewport}
                  showGrid={showGrid}
                  onConfiguredCodeChange={setConfiguredCode}
                  activeVariant={activeVariant}
                  onVariantChange={handleVariantChange}
                />
              </section>

              {/* Props Table (React Bits style) */}
              {item.props && item.props.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                  <PropsTable props={item.props} title="Component API & Props" />
                </section>
              )}

              {/* Usage Snippet */}
              {item.usage && (
                <section className="space-y-3 pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm font-bold tracking-tight text-[var(--text-primary)] uppercase">
                      Usage Example
                    </h3>
                  </div>
                  <CodeBlock
                    code={item.usage}
                    language="tsx"
                    filename={`example-${item.name}.tsx`}
                  />
                </section>
              )}
            </TabsContent>

            <TabsContent value="code" className="space-y-8 mt-0">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-sm font-bold tracking-tight text-[var(--text-primary)] uppercase">
                      Full TSX Source Implementation
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Complete copy-pasteable implementation matching the live component preview.
                    </p>
                  </div>
                </div>

                <CodeBlock
                  code={sourceCode}
                  language="tsx"
                  filename={mainFile?.name || `${item.name}.tsx`}
                />
              </section>

              {item.props && item.props.length > 0 && (
                <section className="space-y-4 pt-4 border-t border-[var(--border)]">
                  <PropsTable props={item.props} title="Component API & Props" />
                </section>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--bg-main)] p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] shrink-0">
            <div className="flex items-center gap-2 font-mono text-sm">
              <VectorComponentIcon name={item.name} className="h-4 w-4 text-[var(--accent-green)]" />
              <span className="font-semibold text-[var(--text-primary)]">{item.title}</span>
              <span className="text-[var(--text-muted)]">• Fullscreen Interactive Stage</span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-primary)] cursor-pointer transition-colors"
            >
              <kbd className="text-[10px] text-[var(--text-muted)]">ESC</kbd>
              <span>Exit Fullscreen</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center py-6">
            <div className="w-full">
              <ComponentPreviewStage
                item={item}
                interactive={true}
                showKnobs={true}
                viewport={viewport}
                showGrid={showGrid}
                onConfiguredCodeChange={setConfiguredCode}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Related Components Carousel */}
      <section className="space-y-4 pt-8 border-t border-[var(--border)]">
        <ComponentCarousel
          title="Related Components"
          items={relatedItems}
          seeAllHref="/components"
          seeAllLabel="Browse all"
        />
      </section>
    </div>
  );
}

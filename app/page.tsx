"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  ArrowUpRight,
  Crosshair,
  Waves,
  Type,
  LayoutGrid,
  Droplets,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContourTide, ContourTidePreset } from "@/registry/ui/contour-tide";
import TargetCursor from "@/registry/ui/target-cursor";
import { KineticText } from "@/registry/ui/kinetic-text";
import { ExpandingCard } from "@/registry/ui/expanding-card";
import { LiquidMetalBackground } from "@/registry/ui/liquid-metal-background";
import { OptionWheel } from "@/registry/ui/option-wheel";
import { Footer } from "@/components/footer";
import { VectorKiloLogo } from "@/components/vector-icons";
import { useAppShell } from "@/components/app-shell";

function LogJsonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logjson-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"
        stroke="url(#logjson-logo-grad)"
      />
      <path
        d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
        stroke="url(#logjson-logo-grad)"
      />
    </svg>
  );
}

interface ProductItem {
  name: string;
  domain: string;
  href: string;
  desc: string;
  badge: string;
  imageSrc?: string;
  renderLogo?: () => React.ReactNode;
  accentColor: string;
  containerBg?: string;
}

const ECOSYSTEM_PRODUCTS: ProductItem[] = [
  {
    name: "postpipe",
    domain: "postpipe.in",
    href: "https://postpipe.in",
    desc: "Multi-channel form backend, database integration & auth orchestration.",
    badge: "Platform",
    imageSrc: "/postpipe.png",
    containerBg: "bg-white p-0.5",
    accentColor: "#5CA904",
  },
  {
    name: "kontext",
    domain: "kontext.postpipe.in",
    href: "https://kontext.postpipe.in",
    desc: "Autonomous persistent project memory engine for AI coding agents & MCP.",
    badge: "AI Memory",
    imageSrc: "/Kontext-light.svg",
    containerBg: "bg-white p-1",
    accentColor: "#38bdf8",
  },
  {
    name: "logJson",
    domain: "logjson.postpipe.in",
    href: "https://logjson.postpipe.in/",
    desc: "High-velocity structured JSON logging & live telemetry explorer.",
    badge: "Telemetry",
    renderLogo: () => <LogJsonIcon className="h-4 w-4" />,
    containerBg: "bg-zinc-950 border border-zinc-800 p-0.5",
    accentColor: "#a855f7",
  },
  {
    name: "Dev Portfolio",
    domain: "sourodip.me",
    href: "https://sourodip.me",
    desc: "Interactive UI systems, creative engineering & shaders by Sourodip.",
    badge: "Creator",
    imageSrc: "/sourodip.webp",
    containerBg: "bg-zinc-800",
    accentColor: "#f59e0b",
  },
];

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const WHEEL_ITEMS = [
  "Contour Tide",
  "Target Cursor",
  "Kinetic Text",
  "Liquid Metal",
  "Expanding Card",
];

export default function LandingPage() {
  const { showToast } = useAppShell();
  const [scrolled, setScrolled] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const productsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 180);
  };
  const [copiedStageCli, setCopiedStageCli] = React.useState(false);

  // Sticky Scroll Pinned Section Ref & Active Index
  const showcaseSectionRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Stage component states
  const [shaderPreset, setShaderPreset] = React.useState<ContourTidePreset>("silver");
  const [metalTone, setMetalTone] = React.useState<
    "pure-silver" | "cobalt-chrome" | "liquid-gold" | "titanium"
  >("pure-silver");
  const [kineticVariant, setKineticVariant] = React.useState<
    "scramble-decode" | "wave-ripple" | "rubber-band" | "magnetic-tilt"
  >("scramble-decode");

  // Ref for scoped TargetCursor container
  const cursorSandboxRef = React.useRef<HTMLDivElement>(null);

  // Track scroll position to compact navbar and compute sticky scroll progress
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (showcaseSectionRef.current) {
        const rect = showcaseSectionRef.current.getBoundingClientRect();
        const totalDist = showcaseSectionRef.current.offsetHeight - window.innerHeight;
        if (totalDist > 0) {
          const scrolledDist = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolledDist / totalDist));
          setScrollProgress(progress);

          // Map progress directly to the 5 components (0 to 4)
          const count = WHEEL_ITEMS.length;
          const computedIndex = Math.min(
            count - 1,
            Math.max(0, Math.floor(progress * count * 0.9999))
          );
          setActiveIndex(computedIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCli(true);
      showToast("Copied command to clipboard");
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      showToast("Failed to copy");
    }
  };

  const handleCopyStageCli = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStageCli(true);
      showToast("Copied installation command");
      setTimeout(() => setCopiedStageCli(false), 2000);
    } catch {
      showToast("Failed to copy");
    }
  };

  // Smooth scroll to an item when clicked on the wheel
  const scrollToItem = (index: number) => {
    if (!showcaseSectionRef.current) return;
    const rect = showcaseSectionRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const sectionTop = currentScroll + rect.top;
    const totalDist = showcaseSectionRef.current.offsetHeight - window.innerHeight;
    const count = WHEEL_ITEMS.length;
    const targetProgress = (index + 0.45) / count;
    const targetScroll = sectionTop + targetProgress * totalDist;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Active component metadata
  const currentMeta = React.useMemo(() => {
    switch (activeIndex) {
      case 0:
        return {
          title: "Contour Tide",
          category: "Backgrounds & Shaders",
          slug: "contour-tide",
          tag: "WebGL2 • Raymarching",
          command: "npx @kilo-ui/cli add contour-tide",
          desc: "Ocean of particles rolling in mathematical Gerstner waves with interactive swells.",
          icon: Waves,
        };
      case 1:
        return {
          title: "Target Cursor",
          category: "Precision Cursors",
          slug: "target-cursor",
          tag: "Physics • Magnetic Lock",
          command: "npx @kilo-ui/cli add target-cursor",
          desc: "Hardware reticle cursor that snaps corner brackets onto interactive UI targets.",
          icon: Crosshair,
        };
      case 2:
        return {
          title: "Kinetic Text",
          category: "Motion Primitives",
          slug: "kinetic-text",
          tag: "Zero-Bundle • CSS / SVG",
          command: "npx @kilo-ui/cli add kinetic-text",
          desc: "Physics-driven typography supporting scramble decodes and rubber-band spring releases.",
          icon: Type,
        };
      case 3:
        return {
          title: "Liquid Metal",
          category: "Backgrounds & Shaders",
          slug: "liquid-metal-background",
          tag: "Raymarched SDF • Mercury Physics",
          command: "npx @kilo-ui/cli add liquid-metal-background",
          desc: "Viscous liquid chrome fluid simulation on GPU fragment shaders with cursor stretching.",
          icon: Droplets,
        };
      case 4:
      default:
        return {
          title: "Expanding Card",
          category: "Media & Layout",
          slug: "expanding-card",
          tag: "Fluid Grid • Layout Spring",
          command: "npx @kilo-ui/cli add expanding-card",
          desc: "Adaptive multi-card layout that smoothly expands on hover while fading adjacent items.",
          icon: LayoutGrid,
        };
    }
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[var(--accent-green)] selection:text-black">
      {/* 1. Dynamic Sticky Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
            ? "py-3 bg-[#070709]/85 backdrop-blur-md border-b border-white/[0.08] shadow-md shadow-black/20"
            : "py-5 sm:py-6 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="kilo/ui Home"
          >
            <VectorKiloLogo kColor="#ffffff" className="h-6 w-6 sm:h-7 sm:w-7" />
            <div className="font-mono text-base sm:text-lg font-bold tracking-tight text-white flex items-center">
              <span>kilo</span>
              <span className="text-[var(--accent-green)]">/</span>
              <span>ui</span>
            </div>
            <span className="hidden sm:inline-flex ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/60">
              v1.0
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
            <Link
              href="/overview"
              className="hover:text-white transition-colors py-1"
            >
              Overview
            </Link>
            <Link
              href="/components"
              className="hover:text-white transition-colors py-1"
            >
              Components
            </Link>
            <Link
              href="/icons"
              className="hover:text-white transition-colors py-1"
            >
              Icons
            </Link>

            {/* Products Opener with Hover Slide-Down Panel */}
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className={cn(
                  "hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1 select-none",
                  productsOpen && "text-white"
                )}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    productsOpen ? "rotate-180 text-[var(--accent-green)]" : "opacity-60"
                  )}
                />
              </button>

              {/* Slide-Down Mega Area */}
              <div
                className={cn(
                  "absolute top-full -left-28 sm:left-1/2 sm:-translate-x-1/2 pt-3 w-[360px] sm:w-[500px] md:w-[560px] z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  productsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                )}
              >
                <div className="rounded-2xl border border-zinc-800/90 bg-[#0a0a0d]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl shadow-black/90 ring-1 ring-white/10">
                  {/* Panel Top Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 px-1 font-mono text-[11px]">
                    <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                      <Sparkles className="h-3 w-3 text-[var(--accent-green)]" />
                      <span>Ecosystem & Products</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Engineered by Sourodip</span>
                  </div>

                  {/* 2x2 Grid of Products */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ECOSYSTEM_PRODUCTS.map((prod) => {
                      return (
                        <a
                          key={prod.name}
                          href={prod.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col justify-between p-3 sm:p-3.5 rounded-xl border border-zinc-800/70 bg-zinc-900/40 hover:bg-zinc-800/80 hover:border-zinc-700/80 transition-all duration-150 cursor-pointer text-left"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={cn(
                                    "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-xs overflow-hidden",
                                    prod.containerBg || "bg-zinc-900"
                                  )}
                                >
                                  {prod.imageSrc ? (
                                    <img
                                      src={prod.imageSrc}
                                      alt={prod.name}
                                      className={cn(
                                        "h-full w-full",
                                        prod.name === "Dev Portfolio" ? "object-cover" : "object-contain"
                                      )}
                                      loading="lazy"
                                    />
                                  ) : prod.renderLogo ? (
                                    prod.renderLogo()
                                  ) : null}
                                </div>
                                <span className="font-mono text-xs font-bold text-white group-hover:text-[var(--accent-green)] transition-colors">
                                  {prod.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                  {prod.badge}
                                </span>
                                <ArrowUpRight className="h-3 w-3 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                              </div>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2">
                              {prod.desc}
                            </p>
                          </div>

                          <div className="pt-2.5 font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors flex items-center justify-between">
                            <span>{prod.domain}</span>
                            <span className="text-[var(--accent-green)] opacity-0 group-hover:opacity-100 transition-opacity">Visit →</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Panel Sub-Footer */}
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/60 px-1 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <span>Part of the kilo/ui software family</span>
                    <a
                      href="https://sourodip.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[var(--accent-green)] transition-colors"
                    >
                      sourodip.me ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/Sourodip-1/kiloUI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 py-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="https://github.com/Sourodip-1/kiloUI"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-all cursor-pointer"
              title="Star on GitHub"
            >
              <GitHubIcon className="h-3.5 w-3.5 text-zinc-300" />
              <span>Star on GitHub</span>
            </a>

            <Link
              href="/overview"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono font-semibold transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Browse</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section: Contour Tide Background */}
      <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <ContourTide
          preset="silver"
          backgroundColor="#070709"
          waterColor="#a8a8be"
          crestColor="#ffffff"
          density={0.95}
          particleSize={0.95}
          waveHeight={0.65}
          choppiness={0.55}
          speed={0.75}
          horizon={0.20}
          fog={0.55}
          glow={0.45}
          swell={1.15}
          swellRadius={0.95}
          clickRipples={true}
          interactive={true}
          className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden"
        >
          {/* Hero Foreground Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7 pointer-events-none">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase font-sans leading-[1.06]">
                Precision UI Primitives For Modern React
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Open-source, copy-and-paste components engineered for speed. Real-time WebGL, interactive physics, and clean TypeScript. Zero external bloat.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
              <Link
                href="/overview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                <span>Browse Components</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://github.com/Sourodip-1/kiloUI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-medium backdrop-blur-sm active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                <GitHubIcon className="h-4 w-4 text-zinc-300" />
                <span>Star on GitHub</span>
              </a>
            </div>

            {/* General NPX Command Box */}
            <div className="pt-2 flex flex-col items-center justify-center gap-2 pointer-events-auto">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-black/80 border border-zinc-800 backdrop-blur-md font-mono text-xs text-zinc-300 shadow-xl">
                <Terminal className="h-3.5 w-3.5 text-zinc-500" />
                <span className="text-zinc-600 select-none">$</span>
                <span className="text-white font-medium">npx @kilo-ui/cli init</span>
                <button
                  type="button"
                  onClick={() => handleCopy("npx @kilo-ui/cli init")}
                  className="ml-3 p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy installation command"
                  aria-label="Copy installation command"
                >
                  {copiedCli ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[11px] font-mono text-zinc-500">
                Interactive CLI drops source code directly into your repository.
              </p>
            </div>
          </div>
        </ContourTide>
      </section>

      {/* 3. Section Divider: Black Colour Blur Transition */}
      <div
        className="relative w-full h-24 sm:h-32 -mt-12 sm:-mt-16 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070709]/75 to-[#070709]"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 75%)",
          }}
        />
      </div>

      {/* 4. Scroll-Driven Interactive Showcase (Sticky Lock: Pins firmly through 5 Components, then continues down) */}
      <section
        ref={showcaseSectionRef}
        className="relative w-full z-20"
        style={{ height: "480vh" }}
      >
        {/* Sticky Pinned Viewport Container with explicit inline style */}
        <div
          className="w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 sm:pt-20 pb-8 overflow-visible select-none"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          {/* Unboxed Section Header matching 2nd pic */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Wheel Through The Primitives
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span>Scroll page to rotate wheel ({activeIndex + 1}/5)</span>
            </div>
          </div>

          {/* 5-Step Progress Bar Track */}
          <div className="grid grid-cols-5 gap-2 mb-6 sm:mb-8">
            {WHEEL_ITEMS.map((item, idx) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollToItem(idx)}
                className="group flex flex-col gap-1 text-left cursor-pointer transition-all"
              >
                <div
                  className={`h-1 w-full rounded-full transition-all duration-300 ${activeIndex === idx
                      ? "bg-[var(--accent-green)]"
                      : activeIndex > idx
                        ? "bg-zinc-600"
                        : "bg-zinc-800"
                    }`}
                />
                <span
                  className={`text-[10px] font-mono tracking-wider transition-colors truncate ${activeIndex === idx
                      ? "text-white font-semibold"
                      : "text-zinc-600 group-hover:text-zinc-400"
                    }`}
                >
                  0{idx + 1} {item}
                </span>
              </button>
            ))}
          </div>

          {/* Master Unboxed Layout: Left (OptionWheel) + Right (Live Floating Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 max-h-[70vh]">
            {/* LEFT: Typographic OptionWheel directly on page background */}
            <div className="lg:col-span-5 h-[320px] sm:h-[420px] relative flex items-center overflow-visible">
              <OptionWheel
                items={WHEEL_ITEMS}
                value={activeIndex}
                disableWheelCapture={true}
                onItemClick={scrollToItem}
                side="left"
                fontSize={2.9}
                spacing={1.5}
                curve={1.2}
                tilt={7}
                blur={2.2}
                fade={0.34}
                minOpacity={0.08}
                smoothing={180}
                inset={50}
                loop={false}
                draggable={true}
                textColor="#52525b"
                activeColor="#ffffff"
                className="w-full h-full"
              />
            </div>

            {/* RIGHT: Live Component Display (No enclosing outer card box) */}
            <div className="lg:col-span-7 flex flex-col justify-center relative">
              {/* Option 0: Contour Tide WebGL Shader */}
              {activeIndex === 0 && (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-black">
                    <ContourTide
                      preset={shaderPreset}
                      density={0.95}
                      waveHeight={0.85}
                      choppiness={0.65}
                      speed={0.85}
                      swell={1.25}
                      clickRipples={true}
                      interactive={true}
                      className="w-full h-full"
                    >
                      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                          Click To Spawn Ripples • Move Mouse To Lift Waves
                        </span>
                      </div>
                    </ContourTide>
                  </div>

                  {/* Preset Pills Bar */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">PRESET:</span>
                      {(["silver", "ocean", "emerald", "cyberpunk"] as ContourTidePreset[]).map(
                        (p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setShaderPreset(p)}
                            className={`px-2.5 py-1 rounded text-xs capitalize transition-all cursor-pointer ${shaderPreset === p
                                ? "bg-white text-black font-semibold"
                                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                              }`}
                          >
                            {p}
                          </button>
                        )
                      )}
                    </div>
                    <Link
                      href="/components/contour-tide"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent-green)] transition-colors"
                    >
                      <span>Inspect Primitive</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Option 1: Target Cursor (Directly matching 2nd pic) */}
              {activeIndex === 1 && (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div
                    ref={cursorSandboxRef}
                    className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-zinc-800/90 bg-black/80 p-8 flex flex-col justify-between select-none shadow-2xl"
                  >
                    <TargetCursor
                      container={cursorSandboxRef}
                      targetSelector=".stage-target"
                      variant="cyber-lock"
                      cursorColor="#ffffff"
                      cursorColorOnTarget="var(--accent-green)"
                      padding={8}
                      showLabel={true}
                    />

                    {/* Subtle CAD Grid overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />

                    {/* Telemetry Header */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>HOVER_ZONE // ACTIVE</span>
                      <span className="text-[var(--accent-green)] font-semibold">MOVE MOUSE INSIDE</span>
                    </div>

                    {/* Interactive Reticle Target Buttons */}
                    <div className="relative z-10 flex flex-wrap items-center justify-around gap-4 my-auto">
                      <button
                        type="button"
                        data-cursor-label="LOCK_ALPHA"
                        className="stage-target px-5 py-3 rounded-lg border border-zinc-700 bg-zinc-900/80 text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer"
                      >
                        [LOCK_ALPHA]
                      </button>
                      <button
                        type="button"
                        data-cursor-label="DEPLOY_SHIELD"
                        className="stage-target px-5 py-3 rounded-lg border border-zinc-700 bg-zinc-900/80 text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer"
                      >
                        [DEPLOY_SHIELD]
                      </button>
                      <button
                        type="button"
                        data-cursor-label="ORBIT_STATION"
                        className="stage-target px-5 py-3 rounded-lg border border-zinc-700 bg-zinc-900/80 text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer"
                      >
                        [ORBIT_STATION]
                      </button>
                    </div>

                    <div className="relative z-10 text-center text-[11px] font-mono text-zinc-500">
                      Brackets dynamically match radius and snap with spring physics.
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500">PRECISION RETICLE CURSOR</span>
                    <Link
                      href="/components/target-cursor"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent-green)] transition-colors"
                    >
                      <span>Inspect Primitive</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Option 2: Kinetic Text Interactive Playground */}
              {activeIndex === 2 && (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div className="p-8 sm:p-12 rounded-2xl border border-zinc-800/90 bg-black/80 w-full text-center flex flex-col items-center justify-center min-h-[260px] sm:min-h-[320px] shadow-2xl">
                    <KineticText
                      text="KILO / MOTION"
                      variant={kineticVariant}
                      className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white cursor-pointer select-none"
                    />
                    <p className="text-[11px] font-mono text-zinc-500 mt-6">
                      Hover individual characters or click to trigger animation.
                    </p>
                  </div>

                  {/* Variant Switcher */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">EFFECT:</span>
                      {(
                        [
                          "scramble-decode",
                          "wave-ripple",
                          "rubber-band",
                          "magnetic-tilt",
                        ] as const
                      ).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setKineticVariant(v)}
                          className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${kineticVariant === v
                              ? "bg-white text-black font-semibold"
                              : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                            }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <Link
                      href="/components/kinetic-text"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent-green)] transition-colors"
                    >
                      <span>Inspect Primitive</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Option 3: Liquid Metal Raymarched SDF Shader */}
              {activeIndex === 3 && (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-black">
                    <LiquidMetalBackground
                      colorTone={metalTone}
                      intensity="balanced"
                      speed={1.0}
                      interactive={true}
                      className="w-full h-full"
                    >
                      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                          Raymarched Viscous Fluid • Hover To Displace
                        </span>
                      </div>
                    </LiquidMetalBackground>
                  </div>

                  {/* Metal Tone Selector */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">COLOR TONE:</span>
                      {(
                        [
                          "pure-silver",
                          "cobalt-chrome",
                          "liquid-gold",
                          "titanium",
                        ] as const
                      ).map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => setMetalTone(tone)}
                          className={`px-2.5 py-1 rounded text-xs capitalize transition-all cursor-pointer ${metalTone === tone
                              ? "bg-white text-black font-semibold"
                              : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                            }`}
                        >
                          {tone.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                    <Link
                      href="/components/liquid-metal-background"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent-green)] transition-colors"
                    >
                      <span>Inspect Primitive</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Option 4: Expanding Card Multi-Panel Spring Preview */}
              {activeIndex === 4 && (
                <div className="w-full space-y-4 animate-in fade-in duration-300">
                  <div className="w-full flex items-center justify-center py-2">
                    <ExpandingCard
                      title="Component Showcase"
                      subtitle="Hover to expand cards fluidly"
                      className="w-full max-w-md shadow-2xl border-zinc-800"
                    />
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span className="text-zinc-500">FLUID LAYOUT SPRINGS</span>
                    <Link
                      href="/components/expanding-card"
                      className="inline-flex items-center gap-1 text-white hover:text-[var(--accent-green)] transition-colors"
                    >
                      <span>Inspect Primitive</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick CLI Copy Bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{currentMeta.desc}</span>
                <button
                  type="button"
                  onClick={() => handleCopyStageCli(currentMeta.command)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer shrink-0 ml-4"
                  title="Copy command"
                >
                  <Terminal className="h-3 w-3 text-zinc-500" />
                  <span>{currentMeta.command}</span>
                  {copiedStageCli ? (
                    <Check className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Copy className="h-3 w-3 text-zinc-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Minimal Monochrome Bento Box (Zero Circus Colors • Minimal Text • Clean SVGs) */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              <span>// ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Core Principles
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            0 runtime overhead • 100% strict TypeScript
          </span>
        </div>

        {/* Bento Grid: Clean Monochrome with Single Subtle Green Accent */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Tile 1: Code Ownership (8 cols) — Clean Pipeline Schematic */}
          <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-zinc-500 text-[11px]">01 // OWNERSHIP</span>
              <span className="text-zinc-500 text-[11px]">0 KB RUNTIME</span>
            </div>

            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Direct Code Ownership
              </h3>
            </div>

            {/* Clean Monochrome SVG: Registry to Local Source */}
            <div className="w-full bg-black/60 rounded-xl border border-zinc-800/80 p-4">
              <svg viewBox="0 0 680 110" fill="none" className="w-full h-auto text-zinc-400 font-mono text-[11px]">
                {/* Node 1: CLI */}
                <rect x="10" y="20" width="150" height="70" rx="8" fill="#121316" stroke="#27272a" strokeWidth="1" />
                <circle cx="28" cy="40" r="3.5" fill="var(--accent-green)" />
                <text x="40" y="44" fill="#ffffff" fontWeight="600">@kilo-ui/cli</text>
                <text x="28" y="65" fill="#71717a">npx @kilo-ui/cli add</text>

                {/* Laser flow connection path */}
                <path d="M 160 55 L 290 55" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
                <polygon points="295,55 287,51 287,59" fill="#71717a" />

                {/* Middle zero overhead badge */}
                <rect x="185" y="43" width="70" height="24" rx="12" fill="#070709" stroke="#3f3f46" strokeWidth="1" />
                <text x="198" y="59" fill="#a1a1aa" fontSize="10">RAW TSX</text>

                {/* Node 2: Local Project Components */}
                <rect x="300" y="15" width="370" height="80" rx="8" fill="#121316" stroke="#27272a" strokeWidth="1" />
                <text x="320" y="38" fill="#71717a" fontSize="10">src/components/ui/</text>

                {/* File items inside project */}
                <rect x="320" y="48" width="155" height="26" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                <text x="332" y="65" fill="#e4e4e7">contour-tide.tsx</text>

                <rect x="495" y="48" width="155" height="26" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                <text x="507" y="65" fill="#e4e4e7">target-cursor.tsx</text>
              </svg>
            </div>
          </div>

          {/* Tile 2: GPU Raymarching (4 cols) — Monochrome 3D Wave Wireframe */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-zinc-500 text-[11px]">02 // WEBGL2</span>
              <span className="text-zinc-400 text-[11px]">60.0 FPS</span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Hardware Raymarching
              </h3>
            </div>

            {/* Clean Monochrome Waveform with subtle green accent */}
            <div className="w-full bg-black/60 rounded-xl border border-zinc-800/80 p-3">
              <svg viewBox="0 0 320 110" fill="none" className="w-full h-auto">
                <path d="M 10 65 Q 50 15, 90 65 T 170 65 T 250 65 T 310 65" stroke="#3f3f46" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M 10 55 Q 60 10, 110 55 T 190 55 T 270 55 T 310 55" stroke="#71717a" strokeWidth="1.2" />
                <path d="M 10 70 Q 70 30, 130 70 T 210 70 T 290 70 T 310 70" stroke="var(--accent-green)" strokeWidth="1.5" strokeOpacity="0.9" />
                <circle cx="130" cy="70" r="3" fill="var(--accent-green)" />
                <text x="15" y="100" fill="#52525b" fontSize="10" fontFamily="monospace">FRAME BUDGET</text>
                <text x="250" y="100" fill="#a1a1aa" fontSize="10" fontFamily="monospace">16.6ms</text>
              </svg>
            </div>
          </div>

          {/* Tile 3: Design Tokens (4 cols) — Monochrome Swatches */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-zinc-500 text-[11px]">03 // TOKENS</span>
              <span className="text-zinc-500 text-[11px]">TAILWIND V4</span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                CSS Variables Ready
              </h3>
            </div>

            {/* Clean Monochrome Swatch Grid */}
            <div className="w-full bg-black/60 rounded-xl border border-zinc-800/80 p-3">
              <svg viewBox="0 0 320 110" fill="none" className="w-full h-auto font-mono text-[10px]">
                {/* 4 Neutral Tones with 1 Accent */}
                <rect x="15" y="15" width="58" height="42" rx="6" fill="var(--accent-green)" />
                <text x="15" y="75" fill="#a1a1aa">--accent</text>
                <text x="15" y="90" fill="#52525b">#5CA904</text>

                <rect x="88" y="15" width="58" height="42" rx="6" fill="#070709" stroke="#27272a" strokeWidth="1" />
                <text x="88" y="75" fill="#a1a1aa">--bg-main</text>
                <text x="88" y="90" fill="#52525b">#070709</text>

                <rect x="162" y="15" width="58" height="42" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                <text x="162" y="75" fill="#a1a1aa">--surface</text>
                <text x="162" y="90" fill="#52525b">#18181b</text>

                <rect x="236" y="15" width="58" height="42" rx="6" fill="#ffffff" />
                <text x="236" y="75" fill="#a1a1aa">--text</text>
                <text x="236" y="90" fill="#52525b">#ffffff</text>
              </svg>
            </div>
          </div>

          {/* Tile 4: CLI Engine (4 cols) — Minimal Terminal */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-zinc-500 text-[11px]">04 // CLI ENGINE</span>
              <span className="text-zinc-500 text-[11px]">NPX / PNPM</span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Single Command Add
              </h3>
            </div>

            {/* Clean Monospace Terminal Output */}
            <div className="w-full bg-black/60 rounded-xl border border-zinc-800/80 p-3">
              <svg viewBox="0 0 320 110" fill="none" className="w-full h-auto font-mono text-[10px]">
                <text x="15" y="30" fill="#52525b">$</text>
                <text x="28" y="30" fill="#ffffff">npx @kilo-ui/cli add</text>
                <text x="160" y="30" fill="var(--accent-green)">target-cursor</text>

                <text x="15" y="58" fill="var(--accent-green)">✔</text>
                <text x="28" y="58" fill="#71717a">Resolved dependencies</text>

                <text x="15" y="80" fill="var(--accent-green)">✔</text>
                <text x="28" y="80" fill="#a1a1aa">Wrote components/ui/target-cursor.tsx</text>
              </svg>
            </div>
          </div>

          {/* Tile 5: Type Safety (4 cols) — Strict Interface Inspector */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className="text-zinc-500 text-[11px]">05 // TYPESCRIPT</span>
              <span className="text-zinc-500 text-[11px]">100% STRICT</span>
            </div>

            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Strict Type Contracts
              </h3>
            </div>

            {/* Clean Monochrome Code Definition */}
            <div className="w-full bg-black/60 rounded-xl border border-zinc-800/80 p-3">
              <svg viewBox="0 0 320 110" fill="none" className="w-full h-auto font-mono text-[10px]">
                <text x="12" y="24" fill="#71717a">interface</text>
                <text x="75" y="24" fill="#ffffff" fontWeight="600">ContourTideProps</text>
                <text x="195" y="24" fill="#52525b">&#123;</text>

                <text x="22" y="46" fill="#a1a1aa">preset?:</text>
                <text x="80" y="46" fill="#71717a">&apos;silver&apos; | &apos;ocean&apos; | &apos;gold&apos;</text>

                <text x="22" y="68" fill="#a1a1aa">waveHeight?:</text>
                <text x="100" y="68" fill="#71717a">number</text>

                <text x="12" y="94" fill="#52525b">&#125;</text>
                <rect x="210" y="80" width="95" height="20" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                <text x="222" y="94" fill="#a1a1aa" fontSize="9">TYPES: STRICT</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quickstart 3-Step Continuous Pipeline */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
            <span>// QUICKSTART</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Install and Deploy
          </h2>
        </div>

        <div className="border border-zinc-800/80 rounded-2xl bg-zinc-950/40 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-300 font-bold">01 // INIT</span>
                <span className="text-zinc-500">Setup Tokens</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Initialize your project with Tailwind utilities and theme primitives.
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <code>npx @kilo-ui/cli init</code>
                <button
                  type="button"
                  onClick={() => handleCopy("npx @kilo-ui/cli init")}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-300 font-bold">02 // ADD</span>
                <span className="text-zinc-500">Target Cursor</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Pull component source code straight into your components folder.
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <code>npx @kilo-ui/cli add target-cursor</code>
                <button
                  type="button"
                  onClick={() => handleCopy("npx @kilo-ui/cli add target-cursor")}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-300 font-bold">03 // SHIP</span>
                <span className="text-zinc-500">Direct Import</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Import and render directly in your page with zero configuration.
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-zinc-800 font-mono text-xs text-zinc-300 flex items-center justify-between">
                <code>import TargetCursor from ...</code>
                <button
                  type="button"
                  onClick={() => handleCopy('import TargetCursor from "@/components/ui/target-cursor";')}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer: Clean Dark Theme (Zero Whitish Glow) */}
      <Footer theme="dark" />
    </div>
  );
}

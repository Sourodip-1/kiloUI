"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, Terminal, Copy, Compass } from "lucide-react";
import { VectorKiloLogo } from "@/components/vector-icons";

export default function NotFound() {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search.toLowerCase();
      if (search.includes("success=true")) {
        setIsSuccess(true);
      }
    }
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-white flex flex-col justify-between selection:bg-[var(--accent-green)] selection:text-black overflow-hidden font-sans">
      {/* Subtle Background Radial Grid & Accent Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(92,169,4,0.06),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Minimal Top Header */}
      <header className="relative z-10 p-5 sm:px-10 flex items-center justify-between border-b border-white/[0.06] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <VectorKiloLogo kColor="#ffffff" className="h-6 w-6" />
          <span className="font-mono text-sm font-bold tracking-tight text-white">
            kilo<span className="text-[var(--accent-green)]">/</span>ui
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <Link
            href="/components"
            className="hover:text-white transition-colors"
          >
            Components
          </Link>
          <span className="text-zinc-600">/</span>
          <Link
            href="/overview"
            className="hover:text-white transition-colors"
          >
            Overview
          </Link>
        </div>
      </header>

      {/* Main Hero Viewport */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 text-center">
        {isSuccess ? (
          <div className="max-w-md w-full p-8 rounded-2xl border border-emerald-500/30 bg-zinc-950/80 backdrop-blur-xl space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="h-12 w-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Check className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Subscription Confirmed
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Subscribed Successfully!
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Thank you for subscribing to kilo/ui updates. You will receive immediate notifications when new primitives drop.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center font-mono">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <span>Return to Home</span>
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <span>Browse Components</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-lg w-full space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Minimal Vector Coordinate Reticle */}
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
              {/* Outer rotating radar ring */}
              <div className="absolute inset-0 rounded-full border border-zinc-800 border-dashed animate-[spin_18s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-white/[0.08]" />
              
              {/* Center crosshair */}
              <div className="absolute w-8 h-[1px] bg-zinc-700" />
              <div className="absolute h-8 w-[1px] bg-zinc-700" />

              {/* Pulsing center green target dot */}
              <div className="relative h-2.5 w-2.5 rounded-full bg-[var(--accent-green)] animate-ping" />
              <div className="absolute h-2 w-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_12px_var(--accent-green)]" />
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 font-mono text-[11px] text-zinc-400">
                <Compass className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                <span>404 // COORDINATE_UNRESOLVED</span>
              </div>

              <h1 className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
                404
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed font-mono">
                The requested primitive or route does not exist in the kilo/ui registry.
              </p>
            </div>

            {/* Quick CLI Fallback Pill */}
            <div className="max-w-sm mx-auto">
              <div className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md font-mono text-xs text-zinc-300 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
                  <span className="text-zinc-600 select-none">$</span>
                  <span className="truncate">npx @kilo-ui/cli list</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("npx @kilo-ui/cli list")}
                  className="ml-2 p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copiedCli ? (
                    <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center font-mono text-xs pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all cursor-pointer shadow-md active:scale-98"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Landing</span>
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <span>Explore 44 Primitives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 p-5 text-center border-t border-white/[0.06] font-mono text-xs text-zinc-600 flex items-center justify-between max-w-7xl mx-auto w-full px-6 sm:px-10">
        <div>kilo/ui • precision UI primitives</div>
        <div className="text-[11px] text-zinc-500">
          Status: 200 OK • Node Network
        </div>
      </footer>
    </div>
  );
}

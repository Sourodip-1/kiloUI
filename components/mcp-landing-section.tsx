"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Terminal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlidingHighlightContainer } from "@/components/sliding-highlight";

function KiloLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none">
      <path
        fill="#ffffff"
        d="m144.4 264.7l-5.6 12.1v106.2h-79.6v-251.1h79.6v110.6l56.8-110.6h92.9l-72 120.4 72 130.7h-92.9z"
      />
      <path fill="#a6d33d" d="m385.2 127.1h85.2l-73.8 261.1h-79.6z" />
    </svg>
  );
}

interface AgentItem {
  id: string;
  name: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  configPath: string;
}

const AGENTS: AgentItem[] = [
  {
    id: "claude",
    name: "Claude",
    icon: "/images/agents/claude.svg",
    badgeBg: "bg-[#1c1310]",
    badgeBorder: "border-[#D97757]/30",
    configPath: "claude_desktop_config.json",
  },
  {
    id: "devin",
    name: "Devin",
    icon: "/images/agents/devin.png",
    badgeBg: "bg-[#0e1015]",
    badgeBorder: "border-white/15",
    configPath: "devin.json / MCP Settings",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    icon: "/images/agents/antigravity.png",
    badgeBg: "bg-[#09090b]",
    badgeBorder: "border-white/15",
    configPath: "~/.gemini/config/mcp_config.json",
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "/images/agents/cursor.png",
    badgeBg: "bg-[#141418]",
    badgeBorder: "border-white/15",
    configPath: ".cursor/mcp.json",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "/images/agents/vscode.svg",
    badgeBg: "bg-[#091522]",
    badgeBorder: "border-[#007acc]/30",
    configPath: ".vscode/settings.json",
  },
];

export function McpLandingSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Auto-cycle through agent icons every 2.8s
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % AGENTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeAgent = AGENTS[activeIndex];

  const handleCopyEndpoint = async () => {
    try {
      await navigator.clipboard.writeText("https://www.kiloui.dev/api/mcp");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
        
        {/* ── Split Bridge Button (Auto-changing icon) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="inline-flex items-center gap-3 p-2 rounded-full bg-[#131316] border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-white/20 select-none cursor-pointer active:scale-98"
          title="Click agent pills below or view MCP docs"
        >
          {/* Left: Kilo UI Logo */}
          <div
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#09090b] border border-white/15 shadow-inner"
            title="Kilo UI"
          >
            <KiloLogoIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          {/* Bridge Divider */}
          <div className="h-5 w-px bg-white/15" />

          {/* Right: Dynamic Auto-cycling Agent Logo */}
          <div
            key={activeAgent.id}
            className={cn(
              "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border shadow-inner transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform animate-in fade-in zoom-in-95",
              activeAgent.badgeBg,
              activeAgent.badgeBorder
            )}
            title={`${activeAgent.name} Agent`}
          >
            <img
              src={activeAgent.icon}
              alt={activeAgent.name}
              className={cn(
                "h-6 w-6 sm:h-7 sm:w-7 object-contain select-none",
                activeAgent.id === "devin" && "rounded-full"
              )}
            />
          </div>
        </div>

        {/* ── Headline & Context ── */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-zinc-500">
            <span>// MODEL CONTEXT PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Connect your AI agent to Kilo UI.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Expose 61 primitives, Material 3 design tokens, and AST validation directly to Claude, Devin, Antigravity, Cursor, and VS Code.
          </p>
        </div>

        {/* ── Agent Segmented Tabs (Tactile spring physics) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full max-w-xl"
        >
          <SlidingHighlightContainer
            activeSelector='[data-state="active"]'
            activeKey={activeAgent.id}
            className="p-1 rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-md"
            pillClassName="bg-zinc-900 border border-zinc-700/60 rounded-lg shadow-xs"
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 relative z-10">
              {AGENTS.map((agent, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={agent.id}
                    type="button"
                    data-hover-item="true"
                    data-state={isActive ? "active" : "inactive"}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsPaused(true);
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.96]",
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    <img
                      src={agent.icon}
                      alt={agent.name}
                      className={cn(
                        "h-3.5 w-3.5 object-contain shrink-0",
                        agent.id === "devin" && "rounded-full"
                      )}
                    />
                    <span>{agent.name}</span>
                  </button>
                );
              })}
            </div>
          </SlidingHighlightContainer>
        </div>

        {/* ── Minimalist Endpoint Bar & CTAs ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 sm:px-4 rounded-xl border border-zinc-800 bg-black/60 font-mono text-xs w-full max-w-xl">
          <div className="flex items-center gap-2 text-zinc-400 truncate w-full sm:w-auto">
            <Globe className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span className="text-zinc-600 select-none">Endpoint:</span>
            <code className="text-zinc-200 select-all font-medium truncate">
              https://www.kiloui.dev/api/mcp
            </code>
          </div>
          <button
            type="button"
            onClick={handleCopyEndpoint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all active:scale-95 cursor-pointer text-[11px] font-medium shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>

        {/* ── Main Action Buttons ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/mcp"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-md cursor-pointer"
          >
            <span>Open MCP Guide & Configs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 px-3 py-2">
            <span>Config target:</span>
            <span className="text-zinc-300 font-medium">{activeAgent.configPath}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

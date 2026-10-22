"use client";

import * as React from "react";
import Link from "next/link";
import {
  Terminal,
  Code,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { REGISTRY_DATA } from "@/registry/registry-data";
import { CodeBlock } from "@/components/code-block";
import { useAppShell } from "@/components/app-shell";

export default function DocsPage() {
  const { showToast } = useAppShell();
  const [copiedCli, setCopiedCli] = React.useState(false);

  const allItems = Object.values(REGISTRY_DATA);

  const sampleRegistryIndex = {
    name: "kilo/ui",
    homepage: "https://kilo-ui.dev",
    items: allItems.map((item) => ({
      name: item.name,
      type: item.type || "components:ui",
      title: item.title,
      description: item.description,
      category: item.category,
      dependencies: item.dependencies,
    })),
  };

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

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* 1. Header */}
      <div className="space-y-3 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-white transition-colors">
            kilo/ui
          </Link>
          <span>/</span>
          <span className="text-white font-medium">Docs & Registry API</span>
        </div>

        <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Code className="h-6 w-6 text-[var(--accent-green)]" />
          <span>Registry Architecture & API</span>
        </h1>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          kilo/ui provides standard, headless JSON metadata endpoints compatible with shadcn/ui and custom CLI tooling. Install components directly into your Next.js or React projects with zero lock-in.
        </p>
      </div>

      {/* 2. CLI Usage */}
      <section className="space-y-4">
        <h2 className="font-mono text-base font-semibold text-white flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[var(--accent-green)]" />
          <span>Quick CLI Installation</span>
        </h2>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Install any component from the kilo/ui registry using the standard command line tool.
        </p>

        <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[#0d0e0e] p-3 font-mono text-xs text-[#d4d4d4]">
          <code>npx kilo-ui add button</code>
          <button
            type="button"
            onClick={() => handleCopy("npx kilo-ui add button")}
            className="flex items-center gap-1.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1 text-[11px] text-white hover:text-[var(--accent-green)] active:scale-95 transition-all cursor-pointer"
          >
            {copiedCli ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                <span className="text-[var(--accent-green)]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 3. HTTP Endpoints */}
      <section className="space-y-6">
        <h2 className="font-mono text-base font-semibold text-white flex items-center gap-2">
          <span>HTTP API Endpoints</span>
        </h2>

        {/* Index Endpoint */}
        <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[var(--accent-green-deep)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--accent-green)]">
                GET
              </span>
              <code className="font-mono text-xs text-white">/api/registry</code>
            </div>
            <Link
              href="/api/registry"
              target="_blank"
              className="font-mono text-xs text-[var(--accent-green)] hover:underline flex items-center gap-1"
            >
              <span>View JSON</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Returns the complete directory of registered components with descriptions, categories, and dependencies.
          </p>
          <CodeBlock
            code={JSON.stringify(sampleRegistryIndex, null, 2)}
            language="json"
            filename="registry-index.json"
          />
        </div>

        {/* Single Component Endpoint */}
        <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[var(--accent-green-deep)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--accent-green)]">
                GET
              </span>
              <code className="font-mono text-xs text-white">/api/registry/[name]</code>
            </div>
            <Link
              href="/api/registry/button"
              target="_blank"
              className="font-mono text-xs text-[var(--accent-green)] hover:underline flex items-center gap-1"
            >
              <span>View button.json</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Returns full component definition, required dependencies, and complete uncompiled TSX source code for programmatic code injection.
          </p>
        </div>
      </section>

      {/* 4. Directory of Components */}
      <section className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-base font-semibold text-white">
            Available Components ({allItems.length})
          </h2>
          <Link
            href="/components"
            className="font-mono text-xs text-[var(--accent-green)] hover:underline flex items-center gap-1"
          >
            <span>Explore Playground</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allItems.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50 hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]/60 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="font-mono text-xs font-semibold text-white">
                  {item.title}
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)]">
                  {item.category}
                </div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-white/40" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

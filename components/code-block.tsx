"use client";

import * as React from "react";
import { Copy, Check, Terminal, FileCode } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[#0d0e0e] overflow-hidden ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)]/60 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 font-mono text-[var(--text-muted)]">
          <FileCode className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
          <span>{filename || `${language.toUpperCase()} Source`}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:text-[var(--accent-green)] active:scale-95 transition-all cursor-pointer"
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[var(--accent-green)]" />
              <span className="text-[var(--accent-green)] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text with Horizontal Scroll */}
      <div className="relative overflow-x-auto p-4 text-xs font-mono leading-relaxed text-[#d4d4d4] selection:bg-[var(--accent-green)]/30 selection:text-white">
        <pre className="tab-[2]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

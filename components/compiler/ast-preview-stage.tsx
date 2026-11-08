"use client";

/**
 * Interactive AST Preview Stage & Device Chassis Simulator
 *
 * Provides a production-grade inspection canvas with:
 * - Live interactive preview of KiloASTRenderer
 * - Generated TypeScript / JSX source code inspector with copy-to-clipboard
 * - Device viewport frame toggling (iPhone, Pixel, Compact, Responsive)
 * - Material 3 seed color picker and light/dark mode switch
 */

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  Code2,
  Eye,
  Sun,
  Moon,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignAST } from "@/lib/compiler/types";
import { KiloASTRenderer } from "@/lib/compiler/compiler";
import { emitTypeScriptSource } from "@/lib/compiler/emitter";

export interface ASTPreviewStageProps {
  initialAst: DesignAST;
  title?: string;
  className?: string;
  showCodeTab?: boolean;
}

type DeviceMode = "responsive" | "iphone" | "pixel" | "compact";

const DEVICE_DIMENSIONS: Record<
  DeviceMode,
  { name: string; width: number | string; height?: number | string; icon: typeof Smartphone }
> = {
  responsive: { name: "Responsive", width: "100%", icon: Monitor },
  iphone: { name: "iPhone 16", width: 393, height: 852, icon: Smartphone },
  pixel: { name: "Pixel 9", width: 412, height: 915, icon: Smartphone },
  compact: { name: "Compact", width: 360, height: 780, icon: Tablet },
};

export function ASTPreviewStage({
  initialAst,
  title,
  className,
  showCodeTab = true,
}: ASTPreviewStageProps) {
  const [ast, setAst] = useState<DesignAST>(initialAst);
  const [device, setDevice] = useState<DeviceMode>("iphone");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState<boolean>(false);
  const [seedColor, setSeedColor] = useState<string>(
    initialAst.theme?.seedHex || initialAst.meta?.seedColor || "#737673"
  );
  const [mode, setMode] = useState<"dark" | "light">(
    initialAst.theme?.mode === "light" ? "light" : "dark"
  );

  // Synchronize AST when seedColor or mode changes
  const activeAst = useMemo(() => {
    return {
      ...ast,
      meta: {
        ...ast.meta,
        seedColor,
        colorScheme: mode,
      },
      theme: {
        ...ast.theme,
        seedHex: seedColor,
        mode,
      },
    };
  }, [ast, seedColor, mode]);

  // Generate source code
  const emittedCode = useMemo(() => {
    return emitTypeScriptSource(activeAst, {
      componentName: "GeneratedPreview",
    });
  }, [activeAst]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(emittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const currentDevice = DEVICE_DIMENSIONS[device];

  return (
    <div
      className={cn(
        "flex flex-col border border-[var(--border,#292b29)] rounded-2xl bg-[var(--surface-secondary,#141515)] overflow-hidden shadow-2xl",
        className
      )}
    >
      {/* Stage Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border,#292b29)] bg-[var(--surface-elevated,#1b1c1c)]">
        {/* Title & Tabs */}
        <div className="flex items-center gap-3">
          {title && (
            <span className="font-sans font-semibold text-sm tracking-tight text-[var(--text-primary,#f2f2f0)]">
              {title}
            </span>
          )}

          {showCodeTab && (
            <div className="flex items-center rounded-lg bg-[var(--bg-main,#090a0a)] p-0.5 border border-[var(--border,#292b29)]">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab === "preview"
                    ? "bg-[var(--surface-elevated,#1b1c1c)] text-[var(--text-primary,#f2f2f0)] shadow-sm"
                    : "text-[var(--text-secondary,#a3a5a3)] hover:text-[var(--text-primary,#f2f2f0)]"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors",
                  activeTab === "code"
                    ? "bg-[var(--surface-elevated,#1b1c1c)] text-[var(--text-primary,#f2f2f0)] shadow-sm"
                    : "text-[var(--text-secondary,#a3a5a3)] hover:text-[var(--text-primary,#f2f2f0)]"
                )}
              >
                <Code2 className="h-3.5 w-3.5" />
                TSX Code
              </button>
            </div>
          )}
        </div>

        {/* Device & Controls */}
        <div className="flex items-center gap-2">
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center rounded-lg bg-[var(--bg-main,#090a0a)] p-0.5 border border-[var(--border,#292b29)]">
              {(["responsive", "iphone", "pixel", "compact"] as DeviceMode[]).map((d) => {
                const conf = DEVICE_DIMENSIONS[d];
                const Icon = conf.icon;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDevice(d)}
                    title={conf.name}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors",
                      device === d
                        ? "bg-[var(--surface-elevated,#1b1c1c)] text-[var(--text-primary,#f2f2f0)] shadow-sm"
                        : "text-[var(--text-secondary,#a3a5a3)] hover:text-[var(--text-primary,#f2f2f0)]"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden md:inline">{conf.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Seed Color Input */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-main,#090a0a)] border border-[var(--border,#292b29)]">
            <input
              type="color"
              value={seedColor}
              onChange={(e) => setSeedColor(e.target.value)}
              className="w-4 h-4 rounded cursor-pointer border-0 bg-transparent p-0"
              title="M3 Seed Color"
            />
            <span className="font-mono text-[11px] text-[var(--text-secondary,#a3a5a3)]">
              {seedColor}
            </span>
          </div>

          {/* Theme Mode Switch */}
          <button
            type="button"
            onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
            className="p-1.5 rounded-lg bg-[var(--bg-main,#090a0a)] border border-[var(--border,#292b29)] text-[var(--text-secondary,#a3a5a3)] hover:text-[var(--text-primary,#f2f2f0)] transition-colors"
            title={`Toggle ${mode === "dark" ? "Light" : "Dark"} Mode`}
          >
            {mode === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {/* Copy Button (in Code tab) */}
          {activeTab === "code" && (
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--text-primary,#f2f2f0)] text-[var(--bg-main,#090a0a)] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy TSX"}
            </button>
          )}
        </div>
      </div>

      {/* Stage Canvas Body */}
      <div className="relative min-h-[520px] flex items-center justify-center p-4 sm:p-8 bg-[var(--bg-main,#090a0a)] overflow-auto">
        {activeTab === "preview" ? (
          device === "responsive" ? (
            <div className="w-full h-full flex justify-center">
              <KiloASTRenderer ast={activeAst} />
            </div>
          ) : (
            /* Phone Chassis Bezel */
            <div
              className="relative rounded-[48px] p-3 bg-[#1e2020] border-4 border-[#2b2d2d] shadow-2xl transition-all duration-300"
              style={{
                width: typeof currentDevice.width === "number" ? `${currentDevice.width}px` : currentDevice.width,
                height: typeof currentDevice.height === "number" ? `${currentDevice.height}px` : currentDevice.height,
              }}
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]" />
              </div>

              {/* Inner Screen */}
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-[var(--md-sys-color-surface,#090a0a)] flex flex-col relative pt-7">
                <div className="flex-1 overflow-y-auto">
                  <KiloASTRenderer ast={activeAst} />
                </div>

                {/* Home Indicator Bar */}
                <div className="py-2 flex justify-center z-20 pointer-events-none">
                  <div className="w-32 h-1 bg-neutral-600 rounded-full opacity-60" />
                </div>
              </div>
            </div>
          )
        ) : (
          /* Code View */
          <div className="w-full h-full max-h-[640px] overflow-auto rounded-xl p-4 bg-[#0d0e0e] border border-[var(--border,#292b29)]">
            <pre className="font-mono text-xs leading-relaxed text-[#d7dbd7]">
              <code>{emittedCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

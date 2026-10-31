"use client";

import * as React from "react";
import Link from "next/link";
import { BlueprintLogin } from "@/registry/ui/blueprint-login";
import { HorizonLogin } from "@/registry/ui/horizon-login";
import { cn } from "@/lib/utils";

export function LoginViewClient() {
  const [styleMode, setStyleMode] = React.useState<"blueprint" | "horizon">("blueprint");

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* Top Breadcrumb Navigation & Mode Toggle */}
      <div className="w-full max-w-[1020px] mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
            kilo/ui
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-[var(--text-primary)] transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold">
            {styleMode === "blueprint" ? "Blueprint Login" : "Horizon Login"}
          </span>
        </div>

        {/* Style Variant Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setStyleMode("blueprint")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1.5",
                styleMode === "blueprint"
                  ? "bg-[var(--accent-green)] text-black font-semibold shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <span>📐 Blueprint (3D)</span>
            </button>
            <button
              type="button"
              onClick={() => setStyleMode("horizon")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1.5",
                styleMode === "horizon"
                  ? "bg-[var(--accent-green)] text-black font-semibold shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <span>🌌 Atmospheric Horizon</span>
            </button>
          </div>

          <Link
            href={styleMode === "blueprint" ? "/components/blueprint-login" : "/components/horizon-login"}
            className="hover:text-[var(--accent-green)] transition-colors hidden sm:flex items-center gap-1"
          >
            <span>Docs</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Main Authentication Card */}
      {styleMode === "blueprint" ? (
        <BlueprintLogin />
      ) : (
        <HorizonLogin />
      )}
    </div>
  );
}

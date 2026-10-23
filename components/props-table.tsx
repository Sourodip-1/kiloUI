"use client";

import * as React from "react";
import { PropDefinition } from "@/registry/registry-data";

interface PropsTableProps {
  props: PropDefinition[];
  title?: string;
  className?: string;
}

export function PropsTable({ props, title = "Props", className = "" }: PropsTableProps) {
  if (!props || props.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with Title and Property Count */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h3 className="font-mono text-sm font-bold tracking-tight uppercase text-[var(--text-primary)] flex items-center gap-2">
          <span>{title}</span>
        </h3>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface-secondary)] px-2 py-0.5 rounded border border-[var(--border)]">
          {props.length} {props.length === 1 ? "prop" : "props"}
        </span>
      </div>

      {/* React Bits Style Restrained Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50">
        <table className="w-full text-left font-sans text-xs">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]/40 text-[var(--text-muted)] font-mono text-[10px] uppercase font-bold tracking-wider">
              <th scope="col" className="py-2.5 px-4">Property</th>
              <th scope="col" className="py-2.5 px-4">Type</th>
              <th scope="col" className="py-2.5 px-4">Default</th>
              <th scope="col" className="py-2.5 px-4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)] font-normal">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="hover:bg-[var(--surface-secondary)]/30 transition-colors"
              >
                {/* Property Name */}
                <td className="py-3 px-4 font-mono font-bold text-xs text-[var(--accent-green)] whitespace-nowrap align-top">
                  <span>{prop.name}</span>
                  {prop.required && (
                    <span className="ml-1 text-[var(--accent-red)] text-[10px] font-bold" title="Required">
                      *
                    </span>
                  )}
                </td>

                {/* Type */}
                <td className="py-3 px-4 font-mono font-semibold text-[var(--text-secondary)] text-[11px] whitespace-pre-wrap max-w-xs align-top">
                  <span className="break-words">{prop.type}</span>
                </td>

                {/* Default */}
                <td className="py-3 px-4 font-mono font-bold text-[var(--text-primary)] text-[11px] whitespace-nowrap align-top">
                  {prop.defaultValue ? (
                    <code className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.5 text-[11px] font-bold">
                      {prop.defaultValue}
                    </code>
                  ) : (
                    <span className="text-[var(--text-muted)] opacity-50">—</span>
                  )}
                </td>

                {/* Description */}
                <td className="py-3 px-4 leading-relaxed text-[var(--text-secondary)] min-w-[220px] align-top">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

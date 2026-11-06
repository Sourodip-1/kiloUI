"use client";

import * as React from "react";
import { 
  Check, 
  AlertCircle, 
  Info, 
  X, 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  CheckCheck,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info" | "telemetry";
  timestamp?: string;
  badge?: string;
  telemetry?: {
    latency?: string;
    node?: string;
    fps?: string;
  };
}

export interface ToastStackProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stacked-bottom-right" | "stacked-top-center" | "cyber-telemetry" | "minimal-list";
  items?: ToastItem[];
  onDismiss?: (id: string) => void;
  expandOnHover?: boolean;
  isExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  gap?: "compact" | "normal" | "relaxed";
  maxVisible?: number;
}

const DEFAULT_TOASTS: ToastItem[] = [
  {
    id: "1",
    title: "Shader Pipeline Compiled",
    description: "Raymarched WebGL2 contour waves online at 120 FPS.",
    type: "success",
    timestamp: "10:42:01",
    badge: "SYS_OK",
    telemetry: { latency: "1.8ms", fps: "120 FPS", node: "worker-01" },
  },
  {
    id: "2",
    title: "CLI Component Installed",
    description: "Successfully added @kilo-ui/cli target-cursor to /components.",
    type: "info",
    timestamp: "10:41:45",
    badge: "CLI_ADD",
    telemetry: { latency: "4.2ms", node: "registry-edge" },
  },
  {
    id: "3",
    title: "Buffer Memory Synced",
    description: "Allocated 14.2 MB frame buffer across 3 dynamic workers.",
    type: "telemetry",
    timestamp: "10:41:10",
    badge: "BUF_SYNC",
    telemetry: { latency: "0.6ms", node: "gpu-node-03" },
  },
];

export function ToastStack({
  variant = "stacked-bottom-right",
  items = DEFAULT_TOASTS,
  onDismiss,
  expandOnHover = true,
  isExpanded: controlledExpanded,
  onExpandChange,
  gap = "normal",
  maxVisible = 3,
  className,
  ...props
}: ToastStackProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>(items);
  const [internalExpanded, setInternalExpanded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setToasts(items);
  }, [items]);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : (internalExpanded || (isHovered && expandOnHover));

  const toggleExpand = () => {
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onExpandChange?.(next);
  };

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    onDismiss?.(id);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const isBottom = variant === "stacked-bottom-right";
  const isTop = variant === "stacked-top-center";
  const isCyber = variant === "cyber-telemetry";
  const isList = variant === "minimal-list";

  // Gap spacing values
  const gapPx = gap === "compact" ? 10 : gap === "relaxed" ? 20 : 14;
  const cardHeight = isCyber ? 92 : 82;
  const stepDistance = cardHeight + gapPx;

  const visibleToasts = toasts.slice(0, maxVisible);
  const totalDeckHeight = isExpanded 
    ? (visibleToasts.length - 1) * stepDistance + cardHeight 
    : cardHeight + (visibleToasts.length - 1) * 14;

  const typeIcons: Record<string, React.ReactNode> = {
    success: <Check className="h-3.5 w-3.5 text-white/90" />,
    error: <AlertCircle className="h-3.5 w-3.5 text-red-400" />,
    info: <Info className="h-3.5 w-3.5 text-blue-400" />,
    telemetry: <Terminal className="h-3.5 w-3.5 text-zinc-300" />,
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-sm flex flex-col select-none",
        isTop ? "items-center" : isBottom ? "items-end" : "items-center",
        className
      )}
      {...props}
    >
      {/* 1. MINIMAL LIST VARIANT: Flat flex stack with distinct physical gaps */}
      {isList ? (
        <div 
          className={cn(
            "w-full flex flex-col transition-all duration-300",
            gap === "compact" ? "gap-2.5" : gap === "relaxed" ? "gap-4" : "gap-3.5"
          )}
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="w-full rounded-xl border border-white/10 bg-[#0d0f12]/98 p-3.5 shadow-xl backdrop-blur-xl transition-all duration-200 hover:border-white/20 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5 shrink-0 text-white/80">
                    {typeIcons[toast.type || "info"]}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-mono text-xs font-semibold text-white tracking-wide truncate">
                        {toast.title}
                      </h4>
                      {toast.timestamp && (
                        <span className="font-mono text-[10px] text-white/40 shrink-0">
                          {toast.timestamp}
                        </span>
                      )}
                    </div>
                    {toast.description && (
                      <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                        {toast.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(toast.id);
                  }}
                  className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  aria-label="Dismiss alert"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {toasts.length === 0 && (
            <div className="p-6 text-center text-xs font-mono text-white/40 border border-dashed border-white/10 rounded-xl">
              No active notifications
            </div>
          )}
        </div>
      ) : (
        /* 2. STACKED DECK VARIANTS (Bottom-Right, Top-Center, Cyber Telemetry) */
        <div
          style={{ height: `${Math.max(cardHeight, totalDeckHeight)}px` }}
          className="relative w-full transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {visibleToasts.map((toast, index) => {
            // Index 0 is the newest / active toast
            const isFront = index === 0;

            // Positioning math:
            // For Bottom-Right: Toast 0 sits at bottom: 0. Toast 1 & 2 sit stepped ABOVE it.
            // For Top-Center: Toast 0 sits at top: 0. Toast 1 & 2 sit stepped BELOW it.
            const offsetMultiplier = isBottom ? -1 : 1;
            
            // Collapsed: Stepped deck showing clean rims
            // Expanded: Generous physical gap between every card
            const stepY = isExpanded 
              ? index * stepDistance * offsetMultiplier
              : index * 14 * offsetMultiplier;

            const scale = isExpanded ? 1.0 : Math.max(0.9, 1.0 - index * 0.04);
            const opacity = isExpanded ? 1.0 : Math.max(0.55, 1.0 - index * 0.2);
            const zIndex = 30 - index;

            return (
              <div
                key={toast.id}
                style={{
                  transform: `translate3d(0, ${stepY}px, 0) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease, box-shadow 300ms ease",
                  willChange: "transform, opacity",
                  top: isBottom ? undefined : 0,
                  bottom: isBottom ? 0 : undefined,
                }}
                className={cn(
                  "absolute left-0 w-full rounded-xl border bg-[#0d0f12]/98 shadow-2xl backdrop-blur-2xl transition-colors",
                  isCyber 
                    ? "p-3.5 border-white/15 font-mono" 
                    : "p-3.5 border-white/10 hover:border-white/20",
                  !isFront && !isExpanded && "pointer-events-none select-none shadow-[0_-8px_24px_rgba(0,0,0,0.6)]"
                )}
              >
                {/* CYBER TELEMETRY LAYOUT */}
                {isCyber ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/80 tracking-wider uppercase">
                          {toast.badge || "ALERT"}
                        </span>
                        <h4 className="text-xs font-semibold text-white tracking-wide truncate">
                          {toast.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {toast.timestamp && (
                          <span className="text-[10px] text-white/40 font-mono">
                            {toast.timestamp}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismiss(toast.id);
                          }}
                          className="p-1 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {toast.description && (
                      <p className="text-[11px] text-white/60 leading-relaxed font-sans line-clamp-1">
                        {toast.description}
                      </p>
                    )}

                    {/* Telemetry metadata footer */}
                    <div className="flex items-center justify-between pt-0.5 text-[10px] text-white/40">
                      <div className="flex items-center gap-3">
                        {toast.telemetry?.latency && (
                          <span>RTT // {toast.telemetry.latency}</span>
                        )}
                        {toast.telemetry?.node && (
                          <span>NODE // {toast.telemetry.node}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(toast.id, `${toast.title}: ${toast.description}`);
                        }}
                        className="flex items-center gap-1 text-[9px] text-white/50 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === toast.id ? (
                          <>
                            <CheckCheck className="h-2.5 w-2.5 text-white" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-2.5 w-2.5" />
                            <span>COPY LOG</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STANDARD STACKED LAYOUT */
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5 shrink-0 text-white/80">
                        {typeIcons[toast.type || "info"]}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-mono text-xs font-semibold text-white tracking-wide truncate">
                            {toast.title}
                          </h4>
                          {toast.timestamp && (
                            <span className="font-mono text-[10px] text-white/40 shrink-0">
                              {toast.timestamp}
                            </span>
                          )}
                        </div>
                        {toast.description && (
                          <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                            {toast.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(toast.id);
                      }}
                      className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                      aria-label="Dismiss alert"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Expand / Collapse Toggle Bar */}
      {!isList && visibleToasts.length > 1 && (
        <div className="pt-3 flex items-center justify-center w-full">
          <button
            type="button"
            onClick={toggleExpand}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-mono text-white/60 hover:text-white transition-all cursor-pointer"
          >
            <span>
              {isExpanded ? "Collapse deck" : `+${visibleToasts.length - 1} more alert${visibleToasts.length > 2 ? "s" : ""}`}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-3 w-3 text-white/50" />
            ) : (
              <ChevronDown className="h-3 w-3 text-white/50" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import * as React from "react";
import { 
  Play, 
  Pause, 
  Radio, 
  Activity, 
  Maximize2, 
  Minimize2, 
  ChevronRight, 
  Volume2, 
  Wifi, 
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DynamicIslandBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "compact-pill" | "expanded-hud" | "media-wave" | "telemetry-alert";
  title?: string;
  subtitle?: string;
  statusText?: string;
  isExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  accentColor?: "white" | "cyan" | "amber" | "neutral";
  autoCollapseMs?: number;
}

export function DynamicIslandBanner({
  variant = "compact-pill",
  title = "Telemetry Stream Active",
  subtitle = "Edge Node 04 // 24.8ms RTT // 99.98% Health",
  statusText = "LIVE",
  isExpanded: controlledExpanded,
  onExpandChange,
  accentColor = "neutral",
  className,
  ...props
}: DynamicIslandBannerProps) {
  const [internalExpanded, setInternalExpanded] = React.useState(
    variant === "expanded-hud" || variant === "telemetry-alert"
  );
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [volume, setVolume] = React.useState(75);

  React.useEffect(() => {
    if (variant === "expanded-hud" || variant === "telemetry-alert") {
      setInternalExpanded(true);
    } else if (variant === "compact-pill") {
      setInternalExpanded(false);
    }
  }, [variant]);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const toggleExpand = () => {
    const next = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(next);
    }
    onExpandChange?.(next);
  };

  return (
    <div className={cn("w-full flex items-center justify-center p-3 select-none", className)} {...props}>
      <div
        onClick={!isExpanded ? toggleExpand : undefined}
        className={cn(
          "relative overflow-hidden bg-[#0c0d10]/98 border backdrop-blur-2xl shadow-2xl rounded-[26px]",
          "transition-[max-width,padding,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[max-width]",
          isExpanded 
            ? "w-full max-w-[560px] p-4 sm:p-5 cursor-default border-white/15 shadow-black/80" 
            : "w-full max-w-[340px] py-2.5 px-4 cursor-pointer border-white/10 hover:border-white/25 shadow-black/60"
        )}
      >
        {/* TOP ROW: PERSISTENT HEADER AREA */}
        <div className="relative">
          {/* COMPACT PILL STATE */}
          <div
            className={cn(
              "flex items-center justify-between gap-3 text-xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isExpanded 
                ? "opacity-0 pointer-events-none -translate-y-2 invisible absolute inset-x-0 top-0" 
                : "opacity-100 relative translate-y-0 visible pointer-events-auto"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-white/50 bg-white/5 px-1.5 py-0.5 rounded">
                {statusText}
              </span>
            </div>

            <div className="flex items-center gap-2 truncate px-1 flex-1 min-w-0">
              <span className="font-medium text-white/90 text-xs truncate">
                {variant === "media-wave" ? "Cyberpunk Synthesis Radio" : title}
              </span>
            </div>

            {/* Micro visualizer or icon */}
            <div className="flex items-center gap-1.5 shrink-0">
              {variant === "media-wave" ? (
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-0.5 bg-white/70 animate-[pulse_0.6s_ease-in-out_infinite] h-2 rounded-full" />
                  <span className="w-0.5 bg-white/70 animate-[pulse_0.9s_ease-in-out_infinite] h-3.5 rounded-full" />
                  <span className="w-0.5 bg-white/70 animate-[pulse_0.4s_ease-in-out_infinite] h-1.5 rounded-full" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <Maximize2 className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          </div>

          {/* EXPANDED HEADER */}
          <div
            className={cn(
              "flex items-center justify-between pb-3 border-b border-white/5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isExpanded 
                ? "opacity-100 relative translate-y-0 visible" 
                : "opacity-0 pointer-events-none translate-y-2 invisible absolute inset-x-0 top-0"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/80 shrink-0">
                {variant === "media-wave" ? (
                  <Radio className="w-4 h-4" />
                ) : variant === "telemetry-alert" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white tracking-wide truncate">
                    {variant === "media-wave" ? "Cyberpunk Synthesis Radio" : title}
                  </h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/70 tracking-widest uppercase font-bold shrink-0">
                    {statusText}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 font-mono mt-0.5 truncate">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Close / minimize toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
              title="Collapse"
              aria-label="Collapse HUD"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* EXPANDABLE BODY WITH SEAMLESS CSS GRID MORPHING */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isExpanded 
              ? "grid-rows-[1fr] opacity-100 pointer-events-auto" 
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          )}
        >
          <div className="overflow-hidden min-h-0 w-full">
            <div className="space-y-4 pt-3.5" onClick={(e) => e.stopPropagation()}>
              {/* Body content based on variant */}
              {variant === "media-wave" ? (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                    <span>Track 04: Matrix Harmonics</span>
                    <span>02:44 / 04:18</span>
                  </div>
                  {/* Waveform track */}
                  <div className="w-full h-10 bg-black/40 rounded-lg p-2 flex items-end justify-between gap-1 border border-white/5">
                    {[40, 65, 80, 45, 90, 100, 70, 30, 85, 95, 60, 40, 75, 90, 50, 35, 60, 85, 45, 95, 70, 55, 80, 60].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full transition-all duration-300"
                        style={{
                          height: isPlaying ? `${h}%` : "15%",
                          backgroundColor: i % 3 === 0 ? "#ffffff" : "rgba(255,255,255,0.25)"
                        }}
                      />
                    ))}
                  </div>
                  {/* Audio controls */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                      </button>
                      <span className="text-xs text-white/80 font-mono font-medium">Stereo 48kHz / 24bit</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Volume2 className="w-3.5 h-3.5" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        aria-label="Volume slider"
                      />
                    </div>
                  </div>
                </div>
              ) : variant === "telemetry-alert" ? (
                <div className="space-y-3 pt-1">
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-lg p-3 text-xs text-amber-300 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white/90">Anomaly in Distributed Node Cluster</div>
                      <p className="text-white/60 text-[11px] mt-0.5 font-mono">
                        Spike detected on worker #12 (Memory 92.4%). Auto-mitigation initiated.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1 font-mono text-xs">
                    <button
                      type="button"
                      onClick={toggleExpand}
                      className="px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                    >
                      Inspect Worker
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Expanded HUD */
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Latency</div>
                      <div className="text-sm font-mono font-semibold text-white mt-0.5">24.8 ms</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Throughput</div>
                      <div className="text-sm font-mono font-semibold text-white mt-0.5">14.2 GB/s</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Cluster Load</div>
                      <div className="text-sm font-mono font-semibold text-white mt-0.5">Optimal</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                      <Wifi className="w-3.5 h-3.5 text-white/70" />
                      <span>Synchronized with Edge Mesh</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleExpand}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Minimize HUD</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
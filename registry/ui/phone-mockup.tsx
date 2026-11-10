"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, BatteryMedium, Sparkles, PhoneCall, Music, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export type DeviceModel = "iphone" | "android" | "minimal";
export type DeviceFinish = "titanium-natural" | "titanium-black" | "midnight" | "silver";
export type DynamicIslandState = "idle" | "compact" | "call" | "music" | "alert";

export interface PhoneMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  model?: DeviceModel;
  finish?: DeviceFinish;
  statusTime?: string;
  batteryLevel?: number;
  isCharging?: boolean;
  showStatusBar?: boolean;
  showHomeIndicator?: boolean;
  showButtons?: boolean;
  islandState?: DynamicIslandState;
  onIslandClick?: () => void;
  scale?: number;
  children?: React.ReactNode;
}

const FINISH_STYLES: Record<
  DeviceFinish,
  {
    outerBorder: string;
    bezelBg: string;
    bezelHighlight: string;
    buttonColor: string;
    innerBorder: string;
  }
> = {
  "titanium-natural": {
    outerBorder: "border-[#8a8885]/40",
    bezelBg: "bg-gradient-to-b from-[#2e2b28] via-[#1a1816] to-[#121110]",
    bezelHighlight: "ring-1 ring-white/10",
    buttonColor: "bg-[#45423f] border-[#6b6762]/50",
    innerBorder: "border-black/80",
  },
  "titanium-black": {
    outerBorder: "border-[#383a42]/40",
    bezelBg: "bg-gradient-to-b from-[#1b1d24] via-[#111217] to-[#0a0b0e]",
    bezelHighlight: "ring-1 ring-white/10",
    buttonColor: "bg-[#282a33] border-[#444754]/50",
    innerBorder: "border-black/90",
  },
  midnight: {
    outerBorder: "border-[#1e293b]/50",
    bezelBg: "bg-gradient-to-b from-[#161f30] via-[#0d131f] to-[#070a10]",
    bezelHighlight: "ring-1 ring-cyan-500/10",
    buttonColor: "bg-[#1f2c42] border-[#2d4060]/50",
    innerBorder: "border-[#070a10]",
  },
  silver: {
    outerBorder: "border-[#d1d5db]/50",
    bezelBg: "bg-gradient-to-b from-[#e5e7eb] via-[#9ca3af] to-[#4b5563]",
    bezelHighlight: "ring-1 ring-white/30",
    buttonColor: "bg-[#d1d5db] border-[#9ca3af]/50",
    innerBorder: "border-[#111827]",
  },
};

export function PhoneMockup({
  model = "iphone",
  finish = "titanium-black",
  statusTime,
  batteryLevel = 94,
  isCharging = false,
  showStatusBar = true,
  showHomeIndicator = true,
  showButtons = true,
  islandState = "idle",
  onIslandClick,
  scale = 1,
  className,
  children,
  ...props
}: PhoneMockupProps) {
  const [internalTime, setInternalTime] = React.useState("9:41");
  const finishConfig = FINISH_STYLES[finish] || FINISH_STYLES["titanium-black"];

  React.useEffect(() => {
    if (statusTime) {
      setInternalTime(statusTime);
      return;
    }
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setInternalTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [statusTime]);

  // Dimensions: Standard 390x844 (iPhone 16 Pro scaled canvas)
  return (
    <div
      className={cn("relative flex items-center justify-center select-none py-4", className)}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
      {...props}
    >
      {/* Outer Chassis */}
      <div
        className={cn(
          "relative w-[340px] sm:w-[370px] h-[700px] sm:h-[750px] p-[10px] rounded-[52px] shadow-2xl border transition-all duration-300",
          finishConfig.outerBorder,
          finishConfig.bezelBg,
          finishConfig.bezelHighlight
        )}
      >
        {/* Hardware Buttons (External Bezel Wings) */}
        {showButtons && model !== "minimal" && (
          <>
            {/* Left Side: Action Button & Volume Up/Down */}
            <div
              className={cn(
                "absolute -left-[3.5px] top-[110px] w-[3px] h-[26px] rounded-l-xs border-l border-y",
                finishConfig.buttonColor
              )}
            />
            <div
              className={cn(
                "absolute -left-[3.5px] top-[150px] w-[3px] h-[46px] rounded-l-xs border-l border-y",
                finishConfig.buttonColor
              )}
            />
            <div
              className={cn(
                "absolute -left-[3.5px] top-[205px] w-[3px] h-[46px] rounded-l-xs border-l border-y",
                finishConfig.buttonColor
              )}
            />

            {/* Right Side: Power Button & Camera Control */}
            <div
              className={cn(
                "absolute -right-[3.5px] top-[165px] w-[3px] h-[64px] rounded-r-xs border-r border-y",
                finishConfig.buttonColor
              )}
            />
            <div
              className={cn(
                "absolute -right-[3.5px] top-[250px] w-[3px] h-[36px] rounded-r-xs border-r border-y",
                finishConfig.buttonColor
              )}
            />
          </>
        )}

        {/* Glossy Edge Reflection Overlay */}
        <div className="absolute inset-0 rounded-[52px] pointer-events-none ring-1 ring-inset ring-white/10" />

        {/* Inner Screen Display */}
        <div className="relative w-full h-full bg-[#0a0d14] rounded-[42px] overflow-hidden flex flex-col border border-black/90 shadow-inner">
          {/* Status Bar */}
          {showStatusBar && (
            <div className="relative z-30 w-full h-11 px-6 flex items-center justify-between text-white shrink-0 select-none">
              {/* Left: Clock */}
              <div className="w-16 flex items-center justify-start">
                <span className="font-semibold text-xs tracking-tight font-sans text-white/95">
                  {internalTime}
                </span>
              </div>

              {/* Center: Dynamic Island or Camera Hole */}
              <div className="flex-1 flex items-center justify-center pointer-events-auto">
                {model === "iphone" && (
                  <motion.div
                    layout
                    onClick={onIslandClick}
                    initial={false}
                    animate={{
                      width:
                        islandState === "idle"
                          ? 90
                          : islandState === "compact"
                          ? 105
                          : islandState === "music"
                          ? 170
                          : islandState === "call"
                          ? 180
                          : 150,
                      height: islandState === "music" || islandState === "call" ? 34 : 26,
                      borderRadius: 20,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className={cn(
                      "bg-black flex items-center justify-between px-2.5 text-white shadow-md cursor-pointer border border-white/5",
                      onIslandClick && "hover:bg-zinc-950 active:scale-95"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {islandState === "idle" && (
                        <div className="w-full flex items-center justify-between">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-zinc-800" />
                          <span className="w-2 h-2 rounded-full bg-[#1b2b40]/80 ring-1 ring-blue-500/20" />
                        </div>
                      )}

                      {islandState === "compact" && (
                        <motion.div
                          key="compact"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="w-full flex items-center justify-between text-[10px] font-mono text-emerald-400"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Connected</span>
                        </motion.div>
                      )}

                      {islandState === "music" && (
                        <motion.div
                          key="music"
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 2 }}
                          className="w-full flex items-center justify-between text-[11px] gap-2 font-sans"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Music className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span className="truncate text-white/90 text-[10px] font-medium">
                              Sanctuary Ambient
                            </span>
                          </div>
                          <div className="flex items-end gap-[1.5px] h-3">
                            <span className="w-[2px] h-2 bg-pink-400 rounded-full animate-pulse" />
                            <span className="w-[2px] h-3 bg-pink-400 rounded-full animate-bounce" />
                            <span className="w-[2px] h-1.5 bg-pink-400 rounded-full animate-pulse" />
                          </div>
                        </motion.div>
                      )}

                      {islandState === "call" && (
                        <motion.div
                          key="call"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full flex items-center justify-between text-[11px] font-sans gap-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            <span className="text-[10px] text-white/90 font-medium">
                              Villa Concierge
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-emerald-400">01:42</span>
                        </motion.div>
                      )}

                      {islandState === "alert" && (
                        <motion.div
                          key="alert"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="w-full flex items-center justify-between text-[10px] font-sans text-cyan-400 gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span className="font-semibold text-[10px]">Passkey Verified</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {model === "android" && (
                  <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-zinc-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#182335]/90" />
                  </div>
                )}

                {model === "minimal" && (
                  <div className="w-12 h-1 rounded-full bg-white/10" />
                )}
              </div>

              {/* Right: Cellular, WiFi, Battery */}
              <div className="w-16 flex items-center justify-end gap-1.5 text-white/90">
                {/* Cellular Signal (4 bars) */}
                <div className="flex items-end gap-[1.5px] h-2.5">
                  <span className="w-[2px] h-1 bg-white/90 rounded-[0.5px]" />
                  <span className="w-[2px] h-1.5 bg-white/90 rounded-[0.5px]" />
                  <span className="w-[2px] h-2 bg-white/90 rounded-[0.5px]" />
                  <span className="w-[2px] h-2.5 bg-white/90 rounded-[0.5px]" />
                </div>

                {/* WiFi Icon */}
                <Wifi className="w-3 h-3 text-white/90" />

                {/* Battery Glyph */}
                <div className="relative flex items-center">
                  <div className="w-5 h-2.5 rounded-[3px] border border-white/70 p-[1px] flex items-center">
                    <div
                      className={cn(
                        "h-full rounded-[1.5px] transition-all",
                        batteryLevel > 20 ? "bg-white" : "bg-red-400",
                        isCharging && "bg-emerald-400"
                      )}
                      style={{ width: `${Math.min(100, Math.max(10, batteryLevel))}%` }}
                    />
                  </div>
                  <div className="w-[1px] h-1 bg-white/70 rounded-r-xs ml-[1px]" />
                  {isCharging && (
                    <Zap className="absolute -left-1 w-2.5 h-2.5 text-emerald-300 fill-emerald-300" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Screen Body Content Slot */}
          <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar bg-[#0a0d14]">
            {children}
          </div>

          {/* Home Swipe Indicator */}
          {showHomeIndicator && (
            <div className="relative z-30 w-full h-6 flex items-center justify-center shrink-0 pointer-events-none pb-1">
              <div className="w-32 h-1 rounded-full bg-white/40 backdrop-blur-md transition-all hover:bg-white/70 pointer-events-auto cursor-grab" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


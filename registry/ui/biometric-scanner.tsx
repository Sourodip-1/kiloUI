"use client";

import * as React from "react";
import { Fingerprint, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type BiometricStatus = "idle" | "scanning" | "authenticated" | "failed";

export interface BiometricScannerProps {
  status?: BiometricStatus;
  defaultStatus?: BiometricStatus;
  onStatusChange?: (status: BiometricStatus) => void;
  onSuccess?: () => void;
  onError?: () => void;
  label?: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  variant?: "tile" | "pill" | "minimal";
  autoResetDuration?: number;
  className?: string;
}

export function BiometricScanner({
  status: controlledStatus,
  defaultStatus = "idle",
  onStatusChange,
  onSuccess,
  onError,
  label = "Hardware Biometrics",
  sublabel = "Touch sensor to authenticate",
  size = "md",
  variant = "tile",
  autoResetDuration = 3200,
  className,
}: BiometricScannerProps) {
  const [internalStatus, setInternalStatus] = React.useState<BiometricStatus>(defaultStatus);
  const status = controlledStatus !== undefined ? controlledStatus : internalStatus;

  const updateStatus = React.useCallback(
    (newStatus: BiometricStatus) => {
      if (controlledStatus === undefined) {
        setInternalStatus(newStatus);
      }
      onStatusChange?.(newStatus);
    },
    [controlledStatus, onStatusChange]
  );

  const triggerHaptic = (pattern: number | number[]) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  const handleScan = () => {
    if (status === "scanning") return;

    updateStatus("scanning");
    triggerHaptic(20);

    // Simulate authentic security handshake
    setTimeout(() => {
      updateStatus("authenticated");
      triggerHaptic([30, 60, 30]);
      onSuccess?.();

      if (autoResetDuration > 0) {
        setTimeout(() => {
          updateStatus("idle");
        }, autoResetDuration);
      }
    }, 1100);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateStatus("idle");
  };

  const sizeStyles = {
    sm: {
      tile: "p-3 rounded-xl min-w-[140px]",
      sensor: "h-11 w-11 rounded-xl",
      icon: "h-5 w-5",
      title: "text-xs",
      sub: "text-[10px]",
    },
    md: {
      tile: "p-4.5 rounded-2xl min-w-[180px]",
      sensor: "h-15 w-15 rounded-2xl",
      icon: "h-7 w-7",
      title: "text-sm",
      sub: "text-[11px]",
    },
    lg: {
      tile: "p-6 rounded-3xl min-w-[220px]",
      sensor: "h-20 w-20 rounded-3xl",
      icon: "h-9 w-9",
      title: "text-base",
      sub: "text-xs",
    },
  }[size];

  return (
    <div
      onClick={handleScan}
      className={cn(
        "group relative border transition-all duration-200 cursor-pointer select-none font-sans",
        variant === "tile" &&
          "flex flex-col items-center text-center space-y-3 bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--accent-green)]/60 shadow-xs",
        variant === "pill" &&
          "flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-[var(--surface-elevated)] border-[var(--border)] hover:border-[var(--accent-green)]/60",
        variant === "minimal" &&
          "flex flex-col items-center bg-transparent border-transparent p-2",
        status === "authenticated" && "border-emerald-500/60 bg-emerald-950/15",
        status === "failed" && "border-rose-500/60 bg-rose-950/15",
        sizeStyles.tile,
        className
      )}
    >
      {/* Sensor Target Box */}
      <div
        className={cn(
          "relative flex items-center justify-center border transition-all duration-300 overflow-hidden",
          sizeStyles.sensor,
          status === "idle" &&
            "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--accent-green)]/50",
          status === "scanning" &&
            "bg-[var(--accent-green-deep)]/40 border-[var(--accent-green)] text-[var(--accent-green)] scale-105",
          status === "authenticated" &&
            "bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-105",
          status === "failed" &&
            "bg-rose-500/20 border-rose-500 text-rose-400"
        )}
      >
        <AnimatePresence mode="wait">
          {status === "authenticated" ? (
            <motion.div
              key="auth"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <CheckCircle2 className={sizeStyles.icon} />
            </motion.div>
          ) : status === "failed" ? (
            <motion.div
              key="failed"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <AlertCircle className={sizeStyles.icon} />
            </motion.div>
          ) : (
            <motion.div
              key="fingerprint"
              animate={
                status === "scanning"
                  ? { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }
                  : { scale: 1, opacity: 1 }
              }
              transition={
                status === "scanning"
                  ? { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
                  : undefined
              }
            >
              <Fingerprint className={sizeStyles.icon} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean scanning bar without blurry glow */}
        {status === "scanning" && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            className="absolute inset-x-0 h-0.5 bg-[var(--accent-green)] shadow-xs pointer-events-none"
          />
        )}
      </div>

      {/* Label and Status Details */}
      <div className="space-y-0.5 text-center">
        <h4 className={cn("font-semibold text-[var(--text-primary)]", sizeStyles.title)}>
          {status === "authenticated"
            ? "Enclave Verified"
            : status === "scanning"
            ? "Authenticating..."
            : status === "failed"
            ? "Scan Rejected"
            : label}
        </h4>
        <p className={cn("font-mono text-[var(--text-muted)]", sizeStyles.sub)}>
          {status === "authenticated"
            ? "Hardware token confirmed"
            : status === "scanning"
            ? "Reading cryptographic enclave"
            : status === "failed"
            ? "Try again"
            : sublabel}
        </p>
      </div>

      {/* Reset button when completed */}
      {status === "authenticated" && (
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] font-mono text-[var(--accent-green)] hover:underline pt-0.5 cursor-pointer flex items-center gap-1"
        >
          <RefreshCw className="h-2.5 w-2.5" />
          <span>Reset Passkey</span>
        </button>
      )}
    </div>
  );
}


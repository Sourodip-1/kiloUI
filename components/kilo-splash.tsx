"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface KiloSplashProps {
  isLoading?: boolean;
  minDuration?: number;
  onComplete?: () => void;
  targetLabel?: string;
}

export function KiloSplash({
  isLoading = false,
  minDuration = 1800,
  onComplete,
  targetLabel,
}: KiloSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const startTimeRef = useRef<number>(Date.now());
  const exitTriggeredRef = useRef<boolean>(false);
  const onCompleteCalledRef = useRef<boolean>(false);

  // Trigger onComplete safely once
  const triggerComplete = React.useCallback(() => {
    if (!onCompleteCalledRef.current) {
      onCompleteCalledRef.current = true;
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Keep splash active until loading finishes AND minDuration has passed
  useEffect(() => {
    if (!isLoading && !exitTriggeredRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, minDuration - elapsed);

      const timer = setTimeout(() => {
        exitTriggeredRef.current = true;
        setIsVisible(false);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [isLoading, minDuration]);

  // Fallback safety timeout (max 5s) in case loading hangs indefinitely
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!exitTriggeredRef.current) {
        exitTriggeredRef.current = true;
        setIsVisible(false);
      }
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // When isVisible becomes false, the exit animation will take ~2.2s.
  // Fallback timer to guarantee onComplete is called even if onExitComplete fails.
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        triggerComplete();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isVisible, triggerComplete]);

  // The 'K' is mathematically unified into a single, perfect geometric path 
  // with sharp 45-degree inner angles and a 45px stem width.
  const kPath =
    "M 40 50 L 85 50 L 85 100 L 135 50 L 195 50 L 120 125 L 195 200 L 135 200 L 85 150 L 85 200 L 40 200 Z";

  // The Slash matches the 45px stem width and aligns perfectly to the baseline and cap-height.
  const slashPath = "M 215 200 L 260 50 L 305 50 L 260 200 Z";

  // Animation Variants for Reverse Sequence
  const kVariants = {
    hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)", strokeOpacity: 1 },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
      strokeOpacity: 0,
      transition: {
        pathLength: { duration: 1.2, ease: [0.8, 0, 0.2, 1] as const },
        fill: { duration: 0.5, delay: 1.2, ease: "easeOut" as const },
        strokeOpacity: { duration: 0.5, delay: 1.2, ease: "linear" as const },
      },
    },
    exit: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
      strokeOpacity: 1,
      transition: {
        fill: { duration: 0.4, ease: "easeIn" as const },
        strokeOpacity: { duration: 0.4, ease: "linear" as const },
        pathLength: { duration: 1.2, delay: 0.4, ease: [0.8, 0, 0.2, 1] as const },
      },
    },
  };

  const slashVariants = {
    hidden: { pathLength: 0, fill: "rgba(163, 230, 53, 0)", strokeOpacity: 1 },
    visible: {
      pathLength: 1,
      fill: "rgba(163, 230, 53, 1)",
      strokeOpacity: 0,
      transition: {
        pathLength: { duration: 1.2, delay: 0.2, ease: [0.8, 0, 0.2, 1] as const },
        fill: { duration: 0.5, delay: 1.4, ease: "easeOut" as const },
        strokeOpacity: { duration: 0.5, delay: 1.4, ease: "linear" as const },
      },
    },
    exit: {
      pathLength: 0,
      fill: "rgba(163, 230, 53, 0)",
      strokeOpacity: 1,
      transition: {
        fill: { duration: 0.4, ease: "easeIn" as const },
        strokeOpacity: { duration: 0.4, ease: "linear" as const },
        // Slightly stagger the reverse slash path undraw
        pathLength: { duration: 1.2, delay: 0.5, ease: [0.8, 0, 0.2, 1] as const },
      },
    },
  };

  return (
    <AnimatePresence onExitComplete={triggerComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
            exit: {
              opacity: 0,
              // Wait for the paths to undraw before fading out the container background
              transition: { duration: 0.4, delay: 1.8 },
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden select-none cursor-wait"
        >
          {/* Ambient Pulse - Exits smoothly with the rest */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: [0, 0.25, 0.15],
                scale: [0.5, 1.2, 1],
                transition: { duration: 3.5, ease: "easeInOut" },
              },
              exit: {
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-[#A3E635] rounded-full blur-[100px] pointer-events-none"
          />

          <motion.svg
            viewBox="0 0 345 250"
            className="relative w-56 h-56 md:w-72 md:h-72 drop-shadow-2xl z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Unified K Path */}
            <motion.path
              d={kPath}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinejoin="miter"
              variants={kVariants}
            />

            {/* Forward Slash */}
            <motion.path
              d={slashPath}
              stroke="#A3E635"
              strokeWidth="2"
              strokeLinejoin="miter"
              variants={slashVariants}
            />
          </motion.svg>

          {targetLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.75, y: 0, transition: { delay: 0.6, duration: 0.4 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.3 } }}
              className="relative z-10 mt-2 flex items-center justify-center font-mono text-xs tracking-wider uppercase text-neutral-400"
            >
              <span>{targetLabel}</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


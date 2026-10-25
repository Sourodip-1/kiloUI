"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface KineticTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  variant?: "rubber-band" | "wave-ripple" | "scramble-decode" | "magnetic-tilt";
  className?: string;
  charClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export const KineticText = React.forwardRef<HTMLDivElement, KineticTextProps>(
  (
    {
      className,
      charClassName,
      text = "KILO / MOTION UI",
      variant = "rubber-band",
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const [scrambledText, setScrambledText] = React.useState<string>(text);
    const [isScrambling, setIsScrambling] = React.useState<boolean>(false);

    // Scramble decode effect
    const triggerScramble = React.useCallback(() => {
      if (isScrambling) return;
      setIsScrambling(true);

      let iteration = 0;
      const original = text;
      const interval = setInterval(() => {
        setScrambledText(
          original
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return original[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        if (iteration >= original.length) {
          clearInterval(interval);
          setIsScrambling(false);
          setScrambledText(original);
        }

        iteration += 1 / 2;
      }, 35);
    }, [text, isScrambling]);

    React.useEffect(() => {
      setScrambledText(text);
      if (variant === "scramble-decode") {
        triggerScramble();
      }
    }, [text, variant, triggerScramble]);

    const characters = (variant === "scramble-decode" ? scrambledText : text).split("");

    return (
      <div
        ref={ref}
        className={cn("inline-flex flex-wrap items-center justify-center select-none py-2", className)}
        {...props}
      >
        <Component
          className="flex flex-wrap items-center justify-center font-mono font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase"
          onMouseEnter={variant === "scramble-decode" ? triggerScramble : undefined}
        >
          {characters.map((char, idx) => {
            const isHovered = hoveredIndex === idx;

            // Compute variant animations
            let transformStyle = "";
            let animClass = "";

            if (variant === "rubber-band") {
              animClass = isHovered
                ? "scale-y-125 scale-x-90 -translate-y-2 text-[var(--accent-green)]"
                : "scale-100 translate-y-0 text-[var(--text-primary)]";
            } else if (variant === "wave-ripple") {
              const delay = idx * 60;
              animClass = "animate-bounce [animation-duration:1.4s]";
              transformStyle = `animation-delay: ${delay}ms`;
            } else if (variant === "magnetic-tilt") {
              animClass = isHovered
                ? "rotate-12 scale-110 text-[var(--accent-green)]"
                : "rotate-0 scale-100 text-[var(--text-primary)]";
            } else {
              animClass = "text-[var(--text-primary)]";
            }

            return (
              <span
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={variant === "wave-ripple" ? { animationDelay: `${idx * 80}ms` } : undefined}
                className={cn(
                  "inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer px-[1px]",
                  char === " " ? "w-3 sm:w-4" : "",
                  animClass,
                  charClassName
                )}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </Component>
      </div>
    );
  }
);

KineticText.displayName = "KineticText";

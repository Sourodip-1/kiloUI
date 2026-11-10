"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type M3FabSize = "sm" | "default" | "lg" | "extended";
export type M3FabVariant = "primary" | "surface" | "secondary" | "minimal";

export interface M3FabMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface M3FabProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  size?: M3FabSize;
  variant?: M3FabVariant;
  icon?: React.ReactNode;
  label?: string;
  lowered?: boolean;
  menuItems?: M3FabMenuItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showBackdrop?: boolean;
}

export const M3Fab = React.forwardRef<HTMLButtonElement, M3FabProps>(
  (
    {
      className,
      size = "default",
      variant = "primary",
      icon,
      label,
      lowered = false,
      menuItems,
      open: controlledOpen,
      onOpenChange,
      showBackdrop = false,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isMinimal = variant === "minimal";
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    const hasMenu = Boolean(menuItems && menuItems.length > 0);

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hasMenu) {
        const next = !isOpen;
        if (controlledOpen === undefined) {
          setUncontrolledOpen(next);
        }
        onOpenChange?.(next);
      }
      onClick?.(e);
    };

    const variantClasses = {
      primary:
        "bg-[var(--accent-green)] text-[var(--bg-main)] hover:brightness-105 border border-transparent shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.32)]",
      surface:
        "bg-[var(--surface-elevated)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]",
      secondary:
        "bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 border border-[var(--accent-green)]/20 shadow-[0_6px_16px_rgba(0,0,0,0.15)]",
      minimal:
        "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 border border-transparent shadow-md",
    }[variant];

    const sizeClasses = {
      sm: "h-10 w-10 rounded-xl text-xs",
      default: "h-14 w-14 rounded-2xl text-sm",
      lg: "h-20 w-20 rounded-3xl text-base",
      extended: isMinimal
        ? "h-10 px-4 rounded-xl text-xs font-semibold gap-2"
        : "h-14 px-5 rounded-2xl text-sm font-semibold gap-3",
    }[size];

    const mainFabButton = (
      <motion.button
        ref={ref}
        type="button"
        onClick={handleToggle}
        aria-expanded={hasMenu ? isOpen : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className={cn(
          "relative inline-flex items-center justify-center font-sans font-semibold select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]/40",
          lowered ? "shadow-none" : "",
          variantClasses,
          sizeClasses,
          className
        )}
        {...(props as any)}
      >
        <motion.span
          animate={{ rotate: hasMenu && isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="shrink-0 flex items-center justify-center"
        >
          {icon || <Plus className="h-6 w-6" />}
        </motion.span>
        {(label || children) && (size === "extended" || isMinimal) && (
          <span className="truncate">{label || children}</span>
        )}
      </motion.button>
    );

    if (!hasMenu) {
      return mainFabButton;
    }

    return (
      <div className={cn("relative inline-flex flex-col items-end", isOpen ? "z-50" : "z-10")}>
        {/* Optional Scrim Backdrop (Disabled by default so page is not blurred) */}
        <AnimatePresence>
          {isOpen && showBackdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (controlledOpen === undefined) setUncontrolledOpen(false);
                onOpenChange?.(false);
              }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            />
          )}
        </AnimatePresence>

        {/* Speed Dial Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
                closed: {
                  transition: { staggerChildren: 0.04, staggerDirection: 1 },
                },
              }}
              className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-2.5 z-50 pointer-events-auto"
            >
              {menuItems?.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 14, scale: 0.85 },
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="flex items-center gap-2.5 group/item"
                >
                  {/* Pill Label */}
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold font-sans bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-md whitespace-nowrap">
                    {item.label}
                  </span>

                  {/* Action Circle Button */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    onClick={() => {
                      item.onClick?.();
                      if (controlledOpen === undefined) setUncontrolledOpen(false);
                      onOpenChange?.(false);
                    }}
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center cursor-pointer shadow-md",
                      isMinimal
                        ? "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                        : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent-green)] hover:bg-[var(--surface-secondary)]"
                    )}
                  >
                    {item.icon}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button on top of speed dial */}
        <div className={cn("relative", isOpen ? "z-50" : "z-10")}>
          {mainFabButton}
        </div>
      </div>
    );
  }
);
M3Fab.displayName = "M3Fab";

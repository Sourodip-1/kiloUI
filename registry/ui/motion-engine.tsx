"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CONTAINER TRANSFORM
// Morphs an element's bounds seamlessly between collapsed and expanded states.
// ============================================================================

export interface ContainerTransformProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded: boolean;
  onExpandChange?: (expanded: boolean) => void;
  collapsedContent: React.ReactNode;
  expandedContent: React.ReactNode;
  duration?: number;
}

export function ContainerTransform({
  expanded,
  onExpandChange,
  collapsedContent,
  expandedContent,
  className,
  duration = 300,
  ...props
}: ContainerTransformProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      <div
        className={cn(
          "transition-opacity duration-200",
          expanded ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100 relative"
        )}
      >
        {collapsedContent}
      </div>
      <div
        className={cn(
          "transition-opacity duration-300",
          expanded ? "opacity-100 relative" : "opacity-0 pointer-events-none absolute inset-0"
        )}
      >
        {expandedContent}
      </div>
    </div>
  );
}

// ============================================================================
// 2. SHARED AXIS
// Coordinates transitions along the X, Y, or Z spatial axis.
// ============================================================================

export type SharedAxisType = "x" | "y" | "z";

export interface SharedAxisProps extends React.HTMLAttributes<HTMLDivElement> {
  axis?: SharedAxisType;
  forward?: boolean;
  stepKey: string | number;
  children: React.ReactNode;
}

export function SharedAxis({
  axis = "x",
  forward = true,
  stepKey,
  children,
  className,
  ...props
}: SharedAxisProps) {
  const getTransitionClass = () => {
    if (axis === "x") {
      return forward
        ? "animate-in fade-in slide-in-from-right-8 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        : "animate-in fade-in slide-in-from-left-8 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
    }
    if (axis === "y") {
      return forward
        ? "animate-in fade-in slide-in-from-bottom-8 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        : "animate-in fade-in slide-in-from-top-8 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
    }
    // Z axis (scale/frustum)
    return forward
      ? "animate-in fade-in zoom-in-90 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      : "animate-in fade-in zoom-in-110 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
  };

  return (
    <div key={stepKey} className={cn("w-full", getTransitionClass(), className)} {...props}>
      {children}
    </div>
  );
}

// ============================================================================
// 3. FADE THROUGH
// Outgoing item fades out and scales down; incoming item fades in and scales up.
// ============================================================================

export interface FadeThroughProps extends React.HTMLAttributes<HTMLDivElement> {
  viewKey: string | number;
  children: React.ReactNode;
}

export function FadeThrough({ viewKey, children, className, ...props }: FadeThroughProps) {
  return (
    <div
      key={viewKey}
      className={cn(
        "w-full animate-in fade-in zoom-in-95 duration-250 ease-[cubic-bezier(0.05,0.7,0.1,1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 4. FADE
// Clean opacity crossfade for popovers, notifications, and micro-dialogs.
// ============================================================================

export interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
  children: React.ReactNode;
}

export function Fade({ visible = true, children, className, ...props }: FadeProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "animate-in fade-in duration-200 ease-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import "./target-cursor.css";

const CORNER_ANGLES = [0, 90, 180, 270];
const QUARTER = Math.PI / 2;

interface SpringState {
  x: number;
  v: number;
}

const spring = (state: SpringState, goal: number, stiffness: number, damping: number, dt: number) => {
  const steps = 2;
  const h = dt / steps;
  for (let i = 0; i < steps; i++) {
    state.v += (stiffness * (goal - state.x) - damping * state.v) * h;
    state.x += state.v * h;
  }
};

const resolveElement = (value: any): HTMLElement | null =>
  (value && "current" in value ? value.current : value) || null;

export type TargetCursorVariant =
  | "brackets-reticle"
  | "cyber-lock"
  | "matrix-target"
  | "minimal-cross"
  | "amber-tracker";

export interface TargetCursorProps {
  /** Optional visual preset variant */
  variant?: TargetCursorVariant;
  /** CSS selector for the elements the brackets lock onto (default: '.cursor-target') */
  targetSelector?: string;
  /** Color of the brackets and dot (default: '#ffffff') */
  cursorColor?: string;
  /** Color the cursor blends to while locked onto a target */
  cursorColorOnTarget?: string;
  /** Seconds per turn while the cursor roams. 0 stops the spin (default: 2) */
  spinDuration?: number;
  /** How long the brackets take to snap onto a target, in seconds (default: 0.2) */
  hoverDuration?: number;
  /** Lets the locked brackets lean slightly toward the cursor (default: true) */
  parallaxOn?: boolean;
  /** Hides the system cursor while this cursor is shown (default: true) */
  hideDefaultCursor?: boolean;
  /** Size of the reticle while roaming, in px (default: 36) */
  size?: number;
  /** Length of each bracket arm, in px (default: 12) */
  cornerSize?: number;
  /** Stroke width of the brackets, in px (default: 3) */
  thickness?: number;
  /** Gap between a locked target and the brackets, in px (default: 6) */
  padding?: number;
  /** Rounds the brackets to follow the target's corner radius (default: true) */
  matchRadius?: boolean;
  /** Size of the center dot, in px. 0 hides it (default: 4) */
  dotSize?: number;
  /** CSS blend mode of the cursor (default: 'difference') */
  blendMode?: "difference" | "normal" | "screen" | (string & {});
  /** Shows the data-cursor-label text of a locked target above the brackets (default: true) */
  showLabel?: boolean;
  /** Squeezes the brackets and dot while the mouse button is held (default: true) */
  clickEffect?: boolean;
  /** Limits the cursor to one element. By default it works across the whole page */
  container?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  /** Optional wrapped children for convenient container scoping */
  children?: React.ReactNode;
  /** Class name if wrapper is rendered for children */
  className?: string;
}

export function TargetCursor({
  variant = "brackets-reticle",
  targetSelector = ".cursor-target",
  cursorColor,
  cursorColorOnTarget,
  spinDuration,
  hoverDuration,
  parallaxOn = true,
  hideDefaultCursor = true,
  size,
  cornerSize,
  thickness,
  padding = 6,
  matchRadius = true,
  dotSize,
  blendMode,
  showLabel = true,
  clickEffect = true,
  container,
  children,
  className,
}: TargetCursorProps) {
  // Apply visual preset defaults if not explicitly passed
  let resolvedColor = cursorColor ?? "#ffffff";
  let resolvedColorOnTarget = cursorColorOnTarget;
  let resolvedSpin = spinDuration ?? 2;
  let resolvedHover = hoverDuration ?? 0.2;
  let resolvedSize = size ?? 36;
  let resolvedCorner = cornerSize ?? 12;
  let resolvedThickness = thickness ?? 3;
  let resolvedDot = dotSize ?? 4;
  let resolvedBlend = blendMode ?? "difference";
  let resolvedMatchRadius = matchRadius;

  if (variant === "cyber-lock") {
    resolvedColor = cursorColor ?? "#00f0ff";
    resolvedColorOnTarget = cursorColorOnTarget ?? "#5CA904";
    resolvedSpin = spinDuration ?? 1.2;
    resolvedHover = hoverDuration ?? 0.15;
    resolvedThickness = thickness ?? 2.5;
    resolvedSize = size ?? 40;
    resolvedCorner = cornerSize ?? 14;
    resolvedBlend = blendMode ?? "screen";
    resolvedMatchRadius = matchRadius ?? false;
  } else if (variant === "matrix-target") {
    resolvedColor = cursorColor ?? "#10b981";
    resolvedColorOnTarget = cursorColorOnTarget ?? "#86efac";
    resolvedSpin = spinDuration ?? 3.0;
    resolvedThickness = thickness ?? 2;
    resolvedSize = size ?? 42;
    resolvedCorner = cornerSize ?? 16;
    resolvedDot = dotSize ?? 5;
    resolvedBlend = blendMode ?? "screen";
  } else if (variant === "minimal-cross") {
    resolvedColor = cursorColor ?? "#ffffff";
    resolvedSpin = spinDuration ?? 0;
    resolvedSize = size ?? 28;
    resolvedCorner = cornerSize ?? 8;
    resolvedThickness = thickness ?? 2;
    resolvedDot = dotSize ?? 3;
    resolvedBlend = blendMode ?? "difference";
  } else if (variant === "amber-tracker") {
    resolvedColor = cursorColor ?? "#f59e0b";
    resolvedColorOnTarget = cursorColorOnTarget ?? "#ef4444";
    resolvedSpin = spinDuration ?? 1.8;
    resolvedSize = size ?? 40;
    resolvedCorner = cornerSize ?? 14;
    resolvedThickness = thickness ?? 3.5;
    resolvedBlend = blendMode ?? "normal";
  }

  const [host, setHost] = React.useState<HTMLElement | null>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const cornerRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = React.useRef<HTMLSpanElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);
  const wakeRef = React.useRef<(() => void) | null>(null);
  const internalWrapperRef = React.useRef<HTMLDivElement>(null);

  // Effective container: either explicitly passed container or internal wrapper for children
  const effectiveContainer = container !== undefined ? container : children ? internalWrapperRef : null;

  const settings = {
    targetSelector,
    cursorColor: resolvedColor,
    cursorColorOnTarget: resolvedColorOnTarget,
    spinDuration: resolvedSpin,
    hoverDuration: Math.max(0.05, resolvedHover),
    parallaxOn,
    hideDefaultCursor,
    size: Math.max(4, resolvedSize),
    cornerSize: Math.max(2, resolvedCorner),
    thickness: Math.max(0.5, resolvedThickness),
    padding,
    matchRadius: resolvedMatchRadius,
    dotSize: Math.max(0, resolvedDot),
    showLabel,
    clickEffect,
    container: effectiveContainer,
  };

  const settingsRef = React.useRef(settings);
  settingsRef.current = settings;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      if (finePointer.matches) {
        setHost(document.body);
      }
    };
    update();
    finePointer.addEventListener("change", update);

    const onFirstPointer = (e: PointerEvent | MouseEvent) => {
      if ((e as PointerEvent).pointerType && (e as PointerEvent).pointerType !== "mouse") return;
      setHost(document.body);
      window.removeEventListener("pointermove", onFirstPointer as any);
      window.removeEventListener("mousemove", onFirstPointer as any);
    };
    window.addEventListener("pointermove", onFirstPointer as any, { passive: true, once: true });
    window.addEventListener("mousemove", onFirstPointer as any, { passive: true, once: true });

    return () => {
      finePointer.removeEventListener("change", update);
      window.removeEventListener("pointermove", onFirstPointer as any);
      window.removeEventListener("mousemove", onFirstPointer as any);
    };
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!host || !root) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const style = document.createElement("style");
    document.head.appendChild(style);

    const pointer = { x: 0, y: 0, inside: false, seen: false, pressed: false };
    const centerX: SpringState = { x: 0, v: 0 };
    const centerY: SpringState = { x: 0, v: 0 };
    const halfW: SpringState = { x: 0, v: 0 };
    const halfH: SpringState = { x: 0, v: 0 };
    const radius: SpringState = { x: 0, v: 0 };
    const turn: SpringState = { x: 0, v: 0 };
    const lock: SpringState = { x: 0, v: 0 };
    const press: SpringState = { x: 0, v: 0 };
    const presence: SpringState = { x: 0, v: 0 };
    let target: HTMLElement | null = null;
    let targetRadius = 0;
    let quarter = 0;
    let spinSpeed = 0;
    let raf = 0;
    let last = 0;
    let lastLabel = "";
    let lastColor = "";
    let lastScope: HTMLElement | null = null;

    const scopeOf = () => resolveElement(settingsRef.current.container);

    const hideCursor = () => {
      const s = settingsRef.current;
      const scope = scopeOf();
      if (scope !== lastScope) {
        lastScope?.removeAttribute("data-target-cursor-scope");
        scope?.setAttribute("data-target-cursor-scope", "");
        lastScope = scope;
      }
      const selector = scope ? "[data-target-cursor-scope]" : "html";
      const rule =
        s.hideDefaultCursor && pointer.inside
          ? `${selector}, ${selector} * { cursor: none !important; }`
          : "";
      if (style.textContent !== rule) style.textContent = rule;
    };

    const findTarget = (x: number, y: number, element?: Element | null): HTMLElement | null => {
      const s = settingsRef.current;
      const node = element || document.elementFromPoint(x, y);
      const found = (node?.closest?.(s.targetSelector) as HTMLElement) || null;
      const scope = scopeOf();
      if (found && scope && !scope.contains(found)) return null;
      return found;
    };

    const lockOn = (next: HTMLElement | null) => {
      if (next === target) return;
      target = next;
      if (target) {
        const angle = turn.x;
        quarter = Math.round(angle / QUARTER);
        const corner = parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0;
        targetRadius = corner;
        spinSpeed = 0;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      if (target && !target.isConnected) lockOn(null);
      const rect = target ? target.getBoundingClientRect() : null;
      const locked = !!rect && pointer.inside;
      const snapW = 4.6 / s.hoverDuration;
      const snapK = snapW * snapW;
      const snapC = 2 * 0.62 * snapW;

      spring(presence, pointer.inside ? 1 : 0, 260, 32, dt);
      spring(lock, locked ? 1 : 0, snapK, 2 * snapW, dt);
      spring(press, pointer.pressed && s.clickEffect ? 1 : 0, 900, 40, dt);

      let goalX = pointer.x;
      let goalY = pointer.y;
      let goalW = s.size / 2;
      let goalH = s.size / 2;
      let goalR = Math.min(2, s.cornerSize / 4);
      if (locked && rect) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const lean = s.parallaxOn ? 0.08 : 0;
        goalX = cx + (pointer.x - cx) * lean;
        goalY = cy + (pointer.y - cy) * lean;
        const odd = Math.abs(quarter) % 2 === 1;
        const w = rect.width / 2 + s.padding;
        const h = rect.height / 2 + s.padding;
        goalW = odd ? h : w;
        goalH = odd ? w : h;
        goalR = s.matchRadius ? Math.min(targetRadius + Math.max(0, s.padding), s.cornerSize) : 0;
      }

      if (!pointer.inside && presence.x < 0.01) pointer.seen = false;
      if (!pointer.seen) {
        centerX.x = goalX;
        centerY.x = goalY;
        halfW.x = goalW;
        halfH.x = goalH;
        pointer.seen = pointer.inside;
      }

      const follow = locked ? snapK : 2200;
      const followC = locked ? snapC : 2 * Math.sqrt(2200);
      spring(centerX, goalX, follow, followC, dt);
      spring(centerY, goalY, follow, followC, dt);
      spring(halfW, goalW, snapK, snapC, dt);
      spring(halfH, goalH, snapK, snapC, dt);
      spring(radius, goalR, snapK, 2 * snapW, dt);

      if (locked) {
        spring(turn, quarter * QUARTER, snapK, snapC, dt);
      } else {
        const speed = s.spinDuration > 0 && !reduce ? (Math.PI * 2) / s.spinDuration : 0;
        spinSpeed += (speed - spinSpeed) * (1 - Math.exp(-dt * 3));
        turn.v = spinSpeed;
        turn.x += spinSpeed * dt;
      }

      const squeeze = 1 - press.x * 0.14;
      const cos = Math.cos(turn.x);
      const sin = Math.sin(turn.x);
      const w = Math.max(0, halfW.x) * squeeze;
      const h = Math.max(0, halfH.x) * squeeze;
      const local = [
        [-w, -h],
        [w, -h],
        [w, h],
        [-w, h],
      ];
      const r = Math.max(0, Math.min(radius.x, s.cornerSize));
      const degrees = (turn.x * 180) / Math.PI;
      let left = Infinity;
      let top = Infinity;
      cornerRefs.current.forEach((corner, i) => {
        if (!corner) return;
        const [lx, ly] = local[i];
        const x = centerX.x + lx * cos - ly * sin;
        const y = centerY.x + lx * sin + ly * cos;
        left = Math.min(left, x);
        top = Math.min(top, y);
        corner.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(CORNER_ANGLES[i] + degrees).toFixed(2)}deg)`;
        corner.style.width = `${s.cornerSize}px`;
        corner.style.height = `${s.cornerSize}px`;
        corner.style.borderWidth = `${s.thickness}px 0 0 ${s.thickness}px`;
        corner.style.borderTopLeftRadius = `${r.toFixed(2)}px`;
      });

      const dot = dotRef.current;
      if (dot) {
        const dotScale = 1 - press.x * 0.35;
        dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
        dot.style.width = `${s.dotSize}px`;
        dot.style.height = `${s.dotSize}px`;
      }

      const label = labelRef.current;
      if (label) {
        const text = s.showLabel && target ? target.getAttribute("data-cursor-label") || "" : "";
        if (text && text !== lastLabel) label.textContent = text;
        if (text) lastLabel = text;
        const shown = text ? Math.max(0, Math.min(1, lock.x)) : 0;
        label.style.transform = `translate3d(${left.toFixed(2)}px, ${(top - 8).toFixed(2)}px, 0) translateY(-100%) translateY(${((1 - shown) * 4).toFixed(2)}px)`;
        label.style.opacity = shown.toFixed(3);
      }

      const mix = s.cursorColorOnTarget ? Math.round(Math.max(0, Math.min(1, lock.x)) * 100) : 0;
      const color = mix
        ? `color-mix(in oklab, ${s.cursorColorOnTarget} ${mix}%, ${s.cursorColor})`
        : s.cursorColor;
      if (color !== lastColor) {
        root.style.setProperty("--target-cursor-color", color);
        lastColor = color;
      }
      root.style.opacity = Math.max(0, Math.min(1, presence.x)).toFixed(3);

      const resting =
        !pointer.inside &&
        presence.x < 0.002 &&
        Math.abs(presence.v) < 0.002 &&
        Math.abs(lock.x) < 0.002 &&
        Math.abs(press.x) < 0.002;
      const spinning = pointer.inside && !locked && spinSpeed > 0.0001;
      const moving =
        Math.abs(centerX.v) + Math.abs(centerY.v) + Math.abs(halfW.v) + Math.abs(halfH.v) + Math.abs(turn.v) > 0.01 ||
        Math.abs(goalX - centerX.x) + Math.abs(goalY - centerY.x) > 0.05 ||
        Math.abs(lock.v) + Math.abs(press.v) + Math.abs(presence.v) > 0.001;
      if (!resting && (spinning || moving || locked)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    wakeRef.current = () => {
      hideCursor();
      wake();
    };

    const insideScope = (x: number, y: number, element?: Element | null) => {
      const scope = scopeOf();
      if (!scope) return true;
      if (element && scope.contains(element)) return true;
      const box = scope.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      const inside = insideScope(pointer.x, pointer.y, event.target as Element);
      if (inside !== pointer.inside) {
        pointer.inside = inside;
        hideCursor();
      }
      lockOn(inside ? findTarget(pointer.x, pointer.y, event.target as Element) : null);
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointer.pressed = true;
      wake();
    };

    const onPointerUp = () => {
      pointer.pressed = false;
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.pressed = false;
      lockOn(null);
      hideCursor();
      wake();
    };

    const onScroll = () => {
      if (!pointer.inside) return;
      lockOn(findTarget(pointer.x, pointer.y));
      wake();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      lastScope?.removeAttribute("data-target-cursor-scope");
      style.remove();
    };
  }, [host]);

  React.useEffect(() => {
    wakeRef.current?.();
  });

  const portalContent = host
    ? createPortal(
        <div
          ref={rootRef}
          className="target-cursor"
          style={{ mixBlendMode: resolvedBlend as any, opacity: 0 }}
          aria-hidden="true"
        >
          {CORNER_ANGLES.map((angle, i) => (
            <span
              key={angle}
              ref={(element) => {
                cornerRefs.current[i] = element;
              }}
              className="target-cursor__corner"
            />
          ))}
          <span ref={dotRef} className="target-cursor__dot" />
          <span ref={labelRef} className="target-cursor__label" />
        </div>,
        host
      )
    : null;

  if (children) {
    return (
      <div ref={internalWrapperRef} className={cn("relative w-full h-full", className)}>
        {portalContent}
        {children}
      </div>
    );
  }

  return portalContent;
}

// Aliases for unified kiloUI naming
export const MagneticCursor = TargetCursor;
export type MagneticCursorProps = TargetCursorProps;
export type MagneticCursorVariant = TargetCursorVariant;
export default TargetCursor;

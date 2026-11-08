/**
 * Layout and Style Bindings Translator
 *
 * Converts DesignASTLayout and DesignASTStyleBindings into Tailwind CSS classes
 * and inline React CSSProperties.
 */

import type { DesignASTLayout, DesignASTStyleBindings } from "./types";
import { cn } from "@/lib/utils";

export interface ResolvedStyle {
  className: string;
  style: React.CSSProperties;
}

/**
 * Translates AST layout specification into Tailwind classes and inline styles
 */
export function resolveLayout(layout?: DesignASTLayout): ResolvedStyle {
  if (!layout) {
    return { className: "", style: {} };
  }

  const classes: string[] = [];
  const style: React.CSSProperties = {};

  // Display
  switch (layout.display) {
    case "flex":
      classes.push("flex");
      break;
    case "grid":
      classes.push("grid");
      break;
    case "block":
      classes.push("block");
      break;
    case "inline-block":
      classes.push("inline-block");
      break;
    case "inline-flex":
      classes.push("inline-flex");
      break;
    case "none":
      classes.push("hidden");
      break;
    default:
      // Default to flex if direction or align is specified without explicit display
      if (layout.direction || layout.align || layout.justify) {
        classes.push("flex");
      }
      break;
  }

  // Flex Direction
  switch (layout.direction) {
    case "row":
      classes.push("flex-row");
      break;
    case "column":
      classes.push("flex-col");
      break;
    case "row-reverse":
      classes.push("flex-row-reverse");
      break;
    case "column-reverse":
      classes.push("flex-col-reverse");
      break;
  }

  // Align Items
  switch (layout.align) {
    case "start":
      classes.push("items-start");
      break;
    case "center":
      classes.push("items-center");
      break;
    case "end":
      classes.push("items-end");
      break;
    case "stretch":
      classes.push("items-stretch");
      break;
    case "baseline":
      classes.push("items-baseline");
      break;
  }

  // Justify Content
  switch (layout.justify) {
    case "start":
      classes.push("justify-start");
      break;
    case "center":
      classes.push("justify-center");
      break;
    case "end":
      classes.push("justify-end");
      break;
    case "between":
      classes.push("justify-between");
      break;
    case "around":
      classes.push("justify-around");
      break;
    case "evenly":
      classes.push("justify-evenly");
      break;
  }

  // Wrap
  if (layout.wrap) {
    classes.push("flex-wrap");
  }

  // Gap
  if (layout.gap !== undefined) {
    switch (layout.gap) {
      case "none":
      case 0:
        classes.push("gap-0");
        break;
      case "xs":
        classes.push("gap-1");
        break;
      case "sm":
        classes.push("gap-2");
        break;
      case "md":
        classes.push("gap-4");
        break;
      case "lg":
        classes.push("gap-6");
        break;
      case "xl":
        classes.push("gap-8");
        break;
      default:
        if (typeof layout.gap === "number") {
          style.gap = `${layout.gap}px`;
        } else if (typeof layout.gap === "string") {
          if (/^\d+$/.test(layout.gap)) {
            style.gap = `${layout.gap}px`;
          } else {
            classes.push(layout.gap);
          }
        }
        break;
    }
  }

  // Padding
  if (layout.padding !== undefined) {
    if (typeof layout.padding === "number") {
      style.padding = `${layout.padding}px`;
    } else if (typeof layout.padding === "string") {
      if (/^\d+$/.test(layout.padding)) {
        style.padding = `${layout.padding}px`;
      } else {
        classes.push(layout.padding);
      }
    } else if (typeof layout.padding === "object") {
      if (layout.padding.top !== undefined) style.paddingTop = typeof layout.padding.top === "number" ? `${layout.padding.top}px` : layout.padding.top;
      if (layout.padding.right !== undefined) style.paddingRight = typeof layout.padding.right === "number" ? `${layout.padding.right}px` : layout.padding.right;
      if (layout.padding.bottom !== undefined) style.paddingBottom = typeof layout.padding.bottom === "number" ? `${layout.padding.bottom}px` : layout.padding.bottom;
      if (layout.padding.left !== undefined) style.paddingLeft = typeof layout.padding.left === "number" ? `${layout.padding.left}px` : layout.padding.left;
    }
  }

  // Margin
  if (layout.margin !== undefined) {
    if (typeof layout.margin === "number") {
      style.margin = `${layout.margin}px`;
    } else if (typeof layout.margin === "string") {
      if (/^\d+$/.test(layout.margin)) {
        style.margin = `${layout.margin}px`;
      } else {
        classes.push(layout.margin);
      }
    } else if (typeof layout.margin === "object") {
      if (layout.margin.top !== undefined) style.marginTop = typeof layout.margin.top === "number" ? `${layout.margin.top}px` : layout.margin.top;
      if (layout.margin.right !== undefined) style.marginRight = typeof layout.margin.right === "number" ? `${layout.margin.right}px` : layout.margin.right;
      if (layout.margin.bottom !== undefined) style.marginBottom = typeof layout.margin.bottom === "number" ? `${layout.margin.bottom}px` : layout.margin.bottom;
      if (layout.margin.left !== undefined) style.marginLeft = typeof layout.margin.left === "number" ? `${layout.margin.left}px` : layout.margin.left;
    }
  }

  // Width
  switch (layout.width) {
    case "auto":
      classes.push("w-auto");
      break;
    case "full":
      classes.push("w-full");
      break;
    case "screen":
      classes.push("w-screen");
      break;
    default:
      if (typeof layout.width === "number") {
        style.width = `${layout.width}px`;
      } else if (typeof layout.width === "string") {
        style.width = layout.width;
      }
      break;
  }

  // Height
  switch (layout.height) {
    case "auto":
      classes.push("h-auto");
      break;
    case "full":
      classes.push("h-full");
      break;
    case "screen":
      classes.push("h-screen");
      break;
    default:
      if (typeof layout.height === "number") {
        style.height = `${layout.height}px`;
      } else if (typeof layout.height === "string") {
        style.height = layout.height;
      }
      break;
  }

  // Max Width
  switch (layout.maxWidth) {
    case "sm":
      classes.push("max-w-sm");
      break;
    case "md":
      classes.push("max-w-md");
      break;
    case "lg":
      classes.push("max-w-lg");
      break;
    case "xl":
      classes.push("max-w-xl");
      break;
    case "2xl":
      classes.push("max-w-2xl");
      break;
    case "full":
      classes.push("max-w-full");
      break;
    default:
      if (typeof layout.maxWidth === "number") {
        style.maxWidth = `${layout.maxWidth}px`;
      } else if (typeof layout.maxWidth === "string") {
        style.maxWidth = layout.maxWidth;
      }
      break;
  }

  // Scrollable
  if (layout.scrollable === true || layout.scrollable === "y") {
    classes.push("overflow-y-auto");
  } else if (layout.scrollable === "x") {
    classes.push("overflow-x-auto");
  }

  return {
    className: cn(classes),
    style,
  };
}

/**
 * Translates AST style bindings into Tailwind classes and inline styles
 */
export function resolveStyleBindings(bindings?: DesignASTStyleBindings): ResolvedStyle {
  if (!bindings) {
    return { className: "", style: {} };
  }

  const classes: string[] = [];
  const style: React.CSSProperties = {};

  // Surface Role
  switch (bindings.surfaceRole) {
    case "surface":
      classes.push("bg-[var(--md-sys-color-surface)]");
      break;
    case "surfaceDim":
      classes.push("bg-[var(--md-sys-color-surface-dim)]");
      break;
    case "surfaceBright":
      classes.push("bg-[var(--md-sys-color-surface-bright)]");
      break;
    case "surfaceContainerLowest":
      classes.push("bg-[var(--md-sys-color-surface-container-lowest)]");
      break;
    case "surfaceContainerLow":
      classes.push("bg-[var(--md-sys-color-surface-container-low)]");
      break;
    case "surfaceContainer":
      classes.push("bg-[var(--md-sys-color-surface-container)]");
      break;
    case "surfaceContainerHigh":
      classes.push("bg-[var(--md-sys-color-surface-container-high)]");
      break;
    case "surfaceContainerHighest":
      classes.push("bg-[var(--md-sys-color-surface-container-highest)]");
      break;
  }

  // Elevation Level
  switch (bindings.elevationLevel) {
    case 0:
      classes.push("shadow-none");
      break;
    case 1:
      classes.push("shadow-[var(--md-sys-elevation-level1)]");
      break;
    case 2:
      classes.push("shadow-[var(--md-sys-elevation-level2)]");
      break;
    case 3:
      classes.push("shadow-[var(--md-sys-elevation-level3)]");
      break;
    case 4:
      classes.push("shadow-[var(--md-sys-elevation-level4)]");
      break;
    case 5:
      classes.push("shadow-[var(--md-sys-elevation-level5)]");
      break;
  }

  // Shape Corner
  switch (bindings.shapeCorner) {
    case "none":
      classes.push("rounded-none");
      break;
    case "xs":
      classes.push("rounded-sm");
      break;
    case "sm":
      classes.push("rounded");
      break;
    case "md":
      classes.push("rounded-md");
      break;
    case "lg":
      classes.push("rounded-lg");
      break;
    case "xl":
      classes.push("rounded-2xl");
      break;
    case "full":
      classes.push("rounded-full");
      break;
  }

  // Border Role
  switch (bindings.borderRole) {
    case "none":
      classes.push("border-0");
      break;
    case "outline":
      classes.push("border border-[var(--md-sys-color-outline)]");
      break;
    case "outlineVariant":
      classes.push("border border-[var(--md-sys-color-outline-variant)]");
      break;
    case "subtle":
      classes.push("border border-[var(--border)]");
      break;
  }

  // Text Role
  switch (bindings.textRole) {
    case "display":
      classes.push("font-display text-4xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]");
      break;
    case "headline":
      classes.push("text-2xl font-semibold tracking-tight text-[var(--md-sys-color-on-surface)]");
      break;
    case "title":
      classes.push("text-lg font-medium text-[var(--md-sys-color-on-surface)]");
      break;
    case "body":
      classes.push("text-sm font-normal text-[var(--md-sys-color-on-surface-variant)]");
      break;
    case "label":
      classes.push("text-xs font-medium uppercase tracking-wider text-[var(--md-sys-color-on-surface-variant)]");
      break;
    case "code":
      classes.push("font-mono text-xs text-[var(--md-sys-color-on-surface)]");
      break;
  }

  if (bindings.className) {
    classes.push(bindings.className);
  }

  if (bindings.style) {
    Object.assign(style, bindings.style);
  }

  return {
    className: cn(classes),
    style,
  };
}

/**
 * Merges layout and style bindings
 */
export function mergeStyles(
  layout?: DesignASTLayout,
  styleBindings?: DesignASTStyleBindings,
  userClassName?: string,
  userStyle?: React.CSSProperties
): ResolvedStyle {
  const l = resolveLayout(layout);
  const s = resolveStyleBindings(styleBindings);

  return {
    className: cn(l.className, s.className, userClassName),
    style: {
      ...l.style,
      ...s.style,
      ...userStyle,
    },
  };
}

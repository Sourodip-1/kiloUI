"use client";

/**
 * Kilo UI Declarative AST Compiler & Interactive UI Renderer
 *
 * Implements:
 * 1. Primitive Resolution against the authoritative component registry.
 * 2. Recursive Slot Resolution into component props or structured child containers.
 * 3. Scoped Material 3 Token Injection (--md-sys-color-*, --md-sys-elevation-*).
 * 4. Responsive Layout & Style Bindings Translation (flex, grid, gaps, padding).
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  DesignAST,
  DesignASTNode,
  KiloASTRendererProps,
  CompileResult,
} from "./types";
import { resolveM3Tokens, resolvePropTokens } from "./m3-theme";
import { mergeStyles, resolveLayout, resolveStyleBindings } from "./layout";
import { COMPONENT_REGISTRY_MAP, resolveIcon } from "./registry-map";

/**
 * Default fallback renderer when a primitive is not found in the registry
 */
function DefaultFallbackComponent({
  node,
  error,
}: {
  node: DesignASTNode;
  error?: string;
}) {
  const primitiveName = node.component || node.name || "unknown";
  return (
    <div
      data-unregistered-primitive={primitiveName}
      className="p-3 my-1 border border-dashed border-[var(--md-sys-color-outline,#737673)]/50 rounded-lg bg-[var(--md-sys-color-surface-container-low,#141515)] text-[var(--md-sys-color-on-surface,#f2f2f0)] font-mono text-xs"
    >
      <div className="flex items-center justify-between mb-1 opacity-70">
        <span className="font-semibold uppercase tracking-wider">
          Primitive: {primitiveName}
        </span>
        {error && <span className="text-[10px] text-amber-400">{error}</span>}
      </div>
      {node.text && <div className="font-sans text-sm mb-1">{node.text}</div>}
    </div>
  );
}

/**
 * Core recursive node renderer
 */
function renderASTNode(
  node: DesignASTNode,
  ast: DesignAST,
  options: {
    onNodeClick?: (nodeId: string, node: DesignASTNode) => void;
    fallbackComponent?: React.ComponentType<{ node: DesignASTNode; error?: string }>;
  },
  keyPrefix: string = "node"
): React.ReactNode {
  if (!node) return null;

  const nodeKey = `${keyPrefix}-${node.id || Math.random().toString(36).substring(2, 9)}`;

  // 1. Text Node Kind
  if (
    node.kind === "text" ||
    (node.text !== undefined && !node.component && (!node.children || node.children.length === 0))
  ) {
    const Tag = (node.name || "span") as keyof React.JSX.IntrinsicElements;
    const { className, style } = mergeStyles(
      node.layout,
      node.styleBindings,
      typeof node.props?.className === "string" ? node.props.className : undefined,
      node.props?.style as React.CSSProperties
    );

    const textContent =
      node.text ?? (typeof node.props?.text === "string" ? node.props.text : "");

    return (
      <Tag
        key={nodeKey}
        id={node.id}
        data-ast-id={node.id}
        className={className || undefined}
        style={style}
        onClick={
          options.onNodeClick
            ? (e: React.MouseEvent) => {
                e.stopPropagation();
                options.onNodeClick?.(node.id, node);
              }
            : undefined
        }
      >
        {textContent}
        {node.children?.map((child, idx) =>
          renderASTNode(child, ast, options, `${nodeKey}-c${idx}`)
        )}
      </Tag>
    );
  }

  // 2. Container Node Kind (stack, row, grid, box, div, etc.)
  if (node.kind === "container" || (!node.component && (!node.name || isContainerName(node.name)))) {
    const Tag = (node.name && !isContainerAlias(node.name) ? node.name : "div") as keyof React.JSX.IntrinsicElements;
    const { className, style } = mergeStyles(
      node.layout,
      node.styleBindings,
      typeof node.props?.className === "string" ? node.props.className : undefined,
      node.props?.style as React.CSSProperties
    );

    // Render Slots
    const renderedSlots: Record<string, React.ReactNode> = {};
    if (node.slots) {
      for (const [slotName, slotContent] of Object.entries(node.slots)) {
        if (Array.isArray(slotContent)) {
          renderedSlots[slotName] = slotContent.map((childNode, idx) =>
            renderASTNode(childNode, ast, options, `${nodeKey}-s-${slotName}-${idx}`)
          );
        } else if (slotContent) {
          renderedSlots[slotName] = renderASTNode(
            slotContent,
            ast,
            options,
            `${nodeKey}-s-${slotName}`
          );
        }
      }
    }

    // Render Children
    const renderedChildren = node.children?.map((childNode, idx) =>
      renderASTNode(childNode, ast, options, `${nodeKey}-c${idx}`)
    );

    return (
      <Tag
        key={nodeKey}
        id={node.id}
        data-ast-id={node.id}
        data-ast-kind="container"
        className={className || undefined}
        style={style}
        onClick={
          options.onNodeClick
            ? (e: React.MouseEvent) => {
                e.stopPropagation();
                options.onNodeClick?.(node.id, node);
              }
            : undefined
        }
      >
        {renderedSlots.header && (
          <div key={`${nodeKey}-header`} className="kilo-slot-header w-full">
            {renderedSlots.header}
          </div>
        )}
        {renderedSlots.media && (
          <div key={`${nodeKey}-media`} className="kilo-slot-media w-full">
            {renderedSlots.media}
          </div>
        )}
        {renderedSlots.content && (
          <div key={`${nodeKey}-content`} className="kilo-slot-content w-full">
            {renderedSlots.content}
          </div>
        )}
        {renderedChildren}
        {renderedSlots.actions && (
          <div key={`${nodeKey}-actions`} className="kilo-slot-actions flex items-center gap-2">
            {renderedSlots.actions}
          </div>
        )}
        {renderedSlots.footer && (
          <div key={`${nodeKey}-footer`} className="kilo-slot-footer w-full pt-2">
            {renderedSlots.footer}
          </div>
        )}
        {/* Render any non-standard remaining slots */}
        {Object.entries(renderedSlots).map(([slotName, slotElement]) => {
          if (["header", "media", "content", "actions", "footer"].includes(slotName)) {
            return null;
          }
          return (
            <div key={`${nodeKey}-slot-${slotName}`} data-slot={slotName}>
              {slotElement}
            </div>
          );
        })}
      </Tag>
    );
  }

  // 3. Component Primitive Resolution
  const primitiveName = (node.component || node.name || "").toLowerCase().trim();
  const ComponentImpl = COMPONENT_REGISTRY_MAP[primitiveName];

  if (!ComponentImpl) {
    const Fallback = options.fallbackComponent || DefaultFallbackComponent;
    return (
      <Fallback
        key={nodeKey}
        node={node}
        error={`Unregistered primitive '${primitiveName}'`}
      />
    );
  }

  // Resolve Props & TokenBindings
  const rawProps = resolvePropTokens(node.props as Record<string, unknown>);

  // Resolve Styles & Layout
  const { className: layoutClass, style: layoutStyle } = mergeStyles(
    node.layout,
    node.styleBindings,
    typeof rawProps.className === "string" ? rawProps.className : undefined,
    rawProps.style as React.CSSProperties
  );

  const resolvedProps: Record<string, unknown> = {
    ...rawProps,
    className: layoutClass || undefined,
    style: Object.keys(layoutStyle).length > 0 ? layoutStyle : undefined,
  };

  // Resolve Icons in props if strings are passed (e.g. leftIcon: "Plus", icon: "Archive")
  if (typeof resolvedProps.leftIcon === "string") {
    resolvedProps.leftIcon = resolveIcon(resolvedProps.leftIcon);
  }
  if (typeof resolvedProps.rightIcon === "string") {
    resolvedProps.rightIcon = resolveIcon(resolvedProps.rightIcon);
  }
  if (typeof resolvedProps.icon === "string") {
    resolvedProps.icon = resolveIcon(resolvedProps.icon);
  }

  // Resolve Named Slots
  const renderedSlots: Record<string, React.ReactNode> = {};
  if (node.slots) {
    for (const [slotName, slotContent] of Object.entries(node.slots)) {
      if (Array.isArray(slotContent)) {
        renderedSlots[slotName] = slotContent.map((childNode, idx) =>
          renderASTNode(childNode, ast, options, `${nodeKey}-s-${slotName}-${idx}`)
        );
      } else if (slotContent) {
        renderedSlots[slotName] = renderASTNode(
          slotContent,
          ast,
          options,
          `${nodeKey}-s-${slotName}`
        );
      }
    }
  }

  // Map designated slot names directly to component props if the component accepts them
  // e.g. trigger, footer, leftAction, header
  for (const [slotName, slotElement] of Object.entries(renderedSlots)) {
    if (["trigger", "footer", "header", "startIcon", "endIcon", "icon"].includes(slotName)) {
      if (resolvedProps[slotName] === undefined) {
        resolvedProps[slotName] = slotElement;
      }
    }
  }

  // Render Children
  const renderedChildren = node.children?.map((childNode, idx) =>
    renderASTNode(childNode, ast, options, `${nodeKey}-c${idx}`)
  );

  // Assemble Child Hierarchy:
  // Slots that were not mapped directly into props (like content, body, or default slotted layout)
  // are assembled along with node.children
  const childElements: React.ReactNode[] = [];

  if (renderedSlots.header && resolvedProps.header !== renderedSlots.header) {
    childElements.push(
      <div key={`${nodeKey}-header`} className="kilo-slot-header w-full">
        {renderedSlots.header}
      </div>
    );
  }
  if (renderedSlots.content) {
    childElements.push(renderedSlots.content);
  }
  if (renderedSlots.body) {
    childElements.push(renderedSlots.body);
  }
  if (renderedChildren && renderedChildren.length > 0) {
    childElements.push(...renderedChildren);
  }
  if (node.text) {
    childElements.push(node.text);
  }
  if (renderedSlots.actions) {
    childElements.push(
      <div key={`${nodeKey}-actions`} className="kilo-slot-actions flex items-center gap-2">
        {renderedSlots.actions}
      </div>
    );
  }
  if (renderedSlots.footer && resolvedProps.footer !== renderedSlots.footer) {
    childElements.push(
      <div key={`${nodeKey}-footer`} className="kilo-slot-footer w-full pt-2">
        {renderedSlots.footer}
      </div>
    );
  }

  // If node click callback provided
  if (options.onNodeClick) {
    const originalOnClick = resolvedProps.onClick as ((e: React.MouseEvent) => void) | undefined;
    resolvedProps.onClick = (e: React.MouseEvent) => {
      originalOnClick?.(e);
      options.onNodeClick?.(node.id, node);
    };
  }

  const elementProps = {
    key: nodeKey,
    id: node.id,
    "data-ast-id": node.id,
    "data-ast-primitive": primitiveName,
    ...resolvedProps,
  };

  if (childElements.length > 0) {
    return React.createElement(
      ComponentImpl,
      elementProps,
      childElements.length === 1 ? childElements[0] : childElements
    );
  }

  return React.createElement(ComponentImpl, elementProps);
}

/**
 * Checks whether a container name is a recognized container type
 */
function isContainerName(name: string): boolean {
  const normalized = name.toLowerCase();
  return [
    "container",
    "stack",
    "vstack",
    "hstack",
    "row",
    "col",
    "column",
    "grid",
    "box",
    "div",
    "section",
    "main",
    "aside",
    "article",
  ].includes(normalized);
}

function isContainerAlias(name: string): boolean {
  const normalized = name.toLowerCase();
  return ["stack", "vstack", "hstack", "row", "col", "column", "grid", "box", "container"].includes(normalized);
}

/**
 * Interactive React component rendering a complete Declarative Design AST
 */
export function KiloASTRenderer({
  ast,
  className,
  style,
  onNodeClick,
  fallbackComponent,
}: KiloASTRendererProps): React.ReactElement {
  // 1. Material 3 Token Injection
  const m3Tokens = React.useMemo(() => resolveM3Tokens(ast), [ast]);

  // 2. Viewport Dimension Constraint
  const viewportClass = React.useMemo(() => {
    switch (ast.meta?.viewport) {
      case "mobile":
        return "max-w-[420px] mx-auto";
      case "tablet":
        return "max-w-[768px] mx-auto";
      case "desktop":
      default:
        return "w-full";
    }
  }, [ast.meta?.viewport]);

  // Combine scoped CSS variables into style
  const containerStyle = React.useMemo(() => {
    return {
      ...(m3Tokens as unknown as React.CSSProperties),
      ...style,
    };
  }, [m3Tokens, style]);

  return (
    <div
      data-kilo-ast-id={ast.meta?.id || "ast-root"}
      data-kilo-theme-mode={ast.theme?.mode || "dark"}
      className={cn(
        "kilo-m3-container font-sans antialiased text-[var(--md-sys-color-on-surface,#f2f2f0)] selection:bg-[var(--md-sys-color-primary,#5CA904)] selection:text-[var(--md-sys-color-on-primary,#090a0a)]",
        viewportClass,
        className
      )}
      style={containerStyle}
    >
      {renderASTNode(ast.root, ast, { onNodeClick, fallbackComponent })}
    </div>
  );
}

/**
 * Functional compilation helper compiling an AST into a React element tree
 */
export function compileASTToReact(
  ast: DesignAST,
  options?: {
    className?: string;
    style?: React.CSSProperties;
    onNodeClick?: (nodeId: string, node: DesignASTNode) => void;
  }
): React.ReactElement {
  return (
    <KiloASTRenderer
      ast={ast}
      className={options?.className}
      style={options?.style}
      onNodeClick={options?.onNodeClick}
    />
  );
}

/**
 * Kilo UI Compiler Type Definitions
 *
 * Re-exports core AST types from lib/ast/schema and defines compiler-specific
 * configuration, rendering options, and emission contracts.
 */

import type {
  DesignAST,
  DesignASTMeta,
  DesignASTTheme,
  DesignASTNode,
  DesignASTNodeKind,
  ASTPropValue,
  TokenBinding,
  DesignASTLayout,
  DesignASTStyleBindings,
} from "@/lib/ast/schema";

export type {
  DesignAST,
  DesignASTMeta,
  DesignASTTheme,
  DesignASTNode,
  DesignASTNodeKind,
  ASTPropValue,
  TokenBinding,
  DesignASTLayout,
  DesignASTStyleBindings,
};

export { isTokenBinding, isComponentNode, isContainerNode, isTextNode } from "@/lib/ast/schema";

/**
 * Options passed to KiloASTRenderer
 */
export interface KiloASTRendererProps {
  /** The declarative Design AST to compile and render */
  ast: DesignAST;
  /** Optional container class names */
  className?: string;
  /** Optional inline styles merged on the root M3 container */
  style?: React.CSSProperties;
  /** Optional interactive node click handler */
  onNodeClick?: (nodeId: string, node: DesignASTNode) => void;
  /** Custom fallback component for unregistered primitives */
  fallbackComponent?: React.ComponentType<{ node: DesignASTNode; error?: string }>;
}

/**
 * Static code generator options for emitTypeScriptSource
 */
export interface EmitOptions {
  /** Name of the exported functional component (default: "GeneratedDesign") */
  componentName?: string;
  /** Whether to inject "use client"; at top (default: true) */
  useClient?: boolean;
  /** Target framework (default: "nextjs") */
  target?: "nextjs" | "react";
  /** Whether to inject inline CSS variables for M3 theme tokens (default: true) */
  injectThemeStyles?: boolean;
  /** Indentation spaces (default: 2) */
  indent?: number;
}

/**
 * Output of compileASTToReact helper
 */
export interface CompileResult {
  element: React.ReactElement;
  tokens: Record<string, string>;
  componentCount: number;
}

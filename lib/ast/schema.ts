/**
 * Authoritative Declarative Design AST Schema
 * Version: 1.0.0
 *
 * Defines the strongly-typed Abstract Syntax Tree representing Kilo UI + Material 3
 * component hierarchies, named slots, props, layouts, and token bindings.
 */

export interface DesignAST {
  version: "1.0.0";
  meta: DesignASTMeta;
  theme?: DesignASTTheme;
  root: DesignASTNode;
}

export interface DesignASTMeta {
  id: string;
  title: string;
  description?: string;
  viewport?: "mobile" | "tablet" | "desktop";
  colorScheme?: "dark" | "light" | "system";
  seedColor?: string; // Hex seed color, e.g. "#737673"
  createdAt?: string;
  author?: string;
  [key: string]: unknown;
}

export interface DesignASTTheme {
  mode?: "dark" | "light" | "system";
  seedHex?: string;
  tokens?: Record<string, string>;
  m3?: {
    primary?: string;
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;
    secondary?: string;
    onSecondary?: string;
    surface?: string;
    surfaceDim?: string;
    surfaceBright?: string;
    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainer?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    onSurface?: string;
    onSurfaceVariant?: string;
    outline?: string;
    outlineVariant?: string;
    [key: string]: string | undefined;
  };
}

export type DesignASTNodeKind = "component" | "container" | "text";

export interface TokenBinding {
  $token: string; // e.g. "m3.color.surfaceContainerHigh", "var(--surface-elevated)"
  fallback?: string;
}

export type ASTPropValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ASTPropValue[]
  | { [key: string]: ASTPropValue }
  | TokenBinding;

export interface DesignASTLayout {
  display?: "flex" | "grid" | "block" | "inline-block" | "inline-flex" | "none";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: number | "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  padding?:
    | number
    | string
    | { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string };
  margin?:
    | number
    | string
    | { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string };
  width?: "auto" | "full" | "screen" | number | string;
  height?: "auto" | "full" | "screen" | number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | number | string;
  maxHeight?: number | string;
  scrollable?: boolean | "x" | "y";
}

export interface DesignASTStyleBindings {
  surfaceRole?:
    | "surface"
    | "surfaceDim"
    | "surfaceBright"
    | "surfaceContainerLowest"
    | "surfaceContainerLow"
    | "surfaceContainer"
    | "surfaceContainerHigh"
    | "surfaceContainerHighest";
  elevationLevel?: 0 | 1 | 2 | 3 | 4 | 5;
  shapeCorner?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
  borderRole?: "outline" | "outlineVariant" | "subtle" | "none";
  textRole?: "display" | "headline" | "title" | "body" | "label" | "code";
  className?: string;
  style?: Record<string, string | number>;
}

export interface DesignASTNode {
  id: string;
  kind: DesignASTNodeKind;
  component?: string; // Primitive name (e.g. "button", "mobile-bottom-sheet")
  name?: string;      // Tag / primitive name alias (e.g. "button", "stack", "h1")
  props?: Record<string, ASTPropValue>;
  slots?: Record<string, DesignASTNode | DesignASTNode[]>;
  children?: DesignASTNode[];
  text?: string;      // Text content when kind === "text"
  layout?: DesignASTLayout;
  styleBindings?: DesignASTStyleBindings;
}

/**
 * Type guard for TokenBinding
 */
export function isTokenBinding(val: unknown): val is TokenBinding {
  return (
    typeof val === "object" &&
    val !== null &&
    "$token" in val &&
    typeof (val as TokenBinding).$token === "string"
  );
}

/**
 * Type guards for node kinds
 */
export function isComponentNode(node: DesignASTNode): boolean {
  return node.kind === "component";
}

export function isContainerNode(node: DesignASTNode): boolean {
  return node.kind === "container";
}

export function isTextNode(node: DesignASTNode): boolean {
  return node.kind === "text";
}

/**
 * JSON Schema specification for Draft 2020-12
 */
export const DESIGN_AST_JSON_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "KiloUIDesignAST",
  type: "object",
  required: ["version", "meta", "root"],
  properties: {
    version: { type: "string", const: "1.0.0" },
    meta: {
      type: "object",
      required: ["id", "title"],
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        viewport: { type: "string", enum: ["mobile", "tablet", "desktop"] },
        colorScheme: { type: "string", enum: ["dark", "light", "system"] },
        seedColor: { type: "string", pattern: "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$" },
        createdAt: { type: "string" },
        author: { type: "string" },
      },
    },
    theme: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["dark", "light", "system"] },
        seedHex: { type: "string" },
        tokens: { type: "object", additionalProperties: { type: "string" } },
        m3: { type: "object" },
      },
    },
    root: { $ref: "#/$defs/DesignASTNode" },
  },
  $defs: {
    DesignASTNode: {
      type: "object",
      required: ["id", "kind"],
      properties: {
        id: { type: "string" },
        kind: { type: "string", enum: ["component", "container", "text"] },
        component: { type: "string" },
        name: { type: "string" },
        props: { type: "object" },
        slots: {
          type: "object",
          additionalProperties: {
            oneOf: [
              { $ref: "#/$defs/DesignASTNode" },
              { type: "array", items: { $ref: "#/$defs/DesignASTNode" } },
            ],
          },
        },
        children: {
          type: "array",
          items: { $ref: "#/$defs/DesignASTNode" },
        },
        text: { type: "string" },
        layout: { type: "object" },
        styleBindings: { type: "object" },
      },
    },
  },
} as const;

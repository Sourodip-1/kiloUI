/**
 * Kilo UI Declarative Compiler & Interactive Renderer Module
 *
 * Authoritative entrypoint exposing:
 * - KiloASTRenderer: Interactive React component rendering Declarative Design ASTs
 * - compileASTToReact: Programmatic React element transpiler
 * - emitTypeScriptSource: Static production-grade TypeScript/JSX source code generator
 * - M3 Theme & Token resolvers
 * - Layout & Primitive registry maps
 */

export { KiloASTRenderer, compileASTToReact } from "./compiler";
export { emitTypeScriptSource } from "./emitter";
export {
  resolveM3Tokens,
  generateM3Palette,
  normalizeHex,
  resolveTokenValue,
  resolvePropTokens,
} from "./m3-theme";
export {
  resolveLayout,
  resolveStyleBindings,
  mergeStyles,
} from "./layout";
export {
  COMPONENT_REGISTRY_MAP,
  LUCIDE_ICON_MAP,
  resolveIcon,
} from "./registry-map";

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
  KiloASTRendererProps,
  EmitOptions,
  CompileResult,
} from "./types";

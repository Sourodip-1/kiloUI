/**
 * Authoritative Declarative Design AST Validation Engine
 *
 * Implements the 6-stage validation pipeline:
 * 1. Structure & schema integrity (JSON structure, version, meta, unique node IDs)
 * 2. Primitive registry resolution (checks component name, suggests closest match)
 * 3. Prop type and enum conformance (validates prop types and variant enums)
 * 4. Slot rules and allowed children (verifies slot cardinality and containment)
 * 5. Touch target ergonomics (minimum 44x44px for mobile interactive nodes)
 * 6. Strict aesthetic boundary enforcement (rejects glowing circles, green pulsing dots, and colorful gradients)
 */

import {
  DesignAST,
  DesignASTNode,
  TokenBinding,
  isTokenBinding,
} from "./schema";
import {
  DIAGNOSTIC_CODES,
  DiagnosticItem,
  ASTValidationResult,
  PROHIBITED_PATTERNS,
  autoRepairAST,
} from "./diagnostics";

export interface PrimitiveSchemaDefinition {
  name: string;
  category?: string;
  variants?: string[];
  slots?: string[];
  allowedChildren?: string[];
  requiredProps?: string[];
  propTypes?: Record<string, "string" | "number" | "boolean" | "object" | "array">;
}

export interface ASTValidatorOptions {
  registry?: Record<string, PrimitiveSchemaDefinition>;
  strictAesthetics?: boolean; // Default true: aesthetic violations treated as errors
  autoRepair?: boolean;       // Default true: generate deterministic correctedAst
  maxDepth?: number;          // Default 64: maximum AST nesting depth
}

/**
 * Standard Built-in Kilo UI Primitives and Mobile App Suite
 */
export const STANDARD_PRIMITIVES: Record<string, PrimitiveSchemaDefinition> = {
  // Mobile Suite
  "mobile-bottom-sheet": {
    name: "mobile-bottom-sheet",
    category: "Mobile",
    variants: ["default", "inset-card", "compact", "full-screen"],
    slots: ["header", "content", "footer", "handle"],
    propTypes: {
      open: "boolean",
      snapPoints: "array",
      dismissible: "boolean",
      showHandle: "boolean",
    },
  },
  "swipe-action-card": {
    name: "swipe-action-card",
    category: "Mobile",
    variants: ["default", "compact", "elevated", "flat"],
    slots: ["leftAction", "rightAction", "content", "indicator"],
    propTypes: {
      threshold: "number",
      disabled: "boolean",
    },
  },
  "thumb-segment-controller": {
    name: "thumb-segment-controller",
    category: "Mobile",
    variants: ["default", "compact", "pill", "bottom-bar"],
    slots: ["icon", "label", "addon"],
    propTypes: {
      value: "string",
      options: "array",
      disabled: "boolean",
    },
  },
  "pull-to-refresh": {
    name: "pull-to-refresh",
    category: "Mobile",
    variants: ["default", "subtle-bar", "minimal-spinner"],
    slots: ["indicator", "content"],
    propTypes: {
      threshold: "number",
      refreshing: "boolean",
    },
  },
  "floating-action-dock": {
    name: "floating-action-dock",
    category: "Mobile",
    variants: ["default", "pill", "expanded-hud", "compact"],
    slots: ["primaryAction", "secondaryActions", "trigger"],
    propTypes: {
      position: "string",
      open: "boolean",
    },
  },
  // Core Actions & Inputs
  button: {
    name: "button",
    category: "Actions",
    variants: ["default", "secondary", "outline", "ghost", "destructive", "link", "glass", "cad-crosshair", "retro-pill"],
    slots: ["leftIcon", "rightIcon", "icon", "prefix", "suffix"],
    propTypes: {
      disabled: "boolean",
      variant: "string",
      size: "string",
      asChild: "boolean",
    },
  },
  "icon-button": {
    name: "icon-button",
    category: "Actions",
    variants: ["default", "outline", "ghost", "secondary"],
    slots: ["icon"],
    propTypes: {
      disabled: "boolean",
      size: "string",
    },
  },
  card: {
    name: "card",
    category: "Data Display",
    variants: ["default", "elevated", "outline", "surface-secondary"],
    slots: ["header", "content", "footer", "title", "description"],
  },
  input: {
    name: "input",
    category: "Forms & Inputs",
    variants: ["default", "outline", "filled", "mono"],
    slots: ["prefix", "suffix", "icon"],
    propTypes: {
      disabled: "boolean",
      required: "boolean",
      readOnly: "boolean",
      type: "string",
      placeholder: "string",
    },
  },
  switch: {
    name: "switch",
    category: "Forms & Inputs",
    variants: ["default", "compact"],
    propTypes: {
      checked: "boolean",
      disabled: "boolean",
    },
  },
  checkbox: {
    name: "checkbox",
    category: "Forms & Inputs",
    variants: ["default", "cad-square"],
    propTypes: {
      checked: "boolean",
      disabled: "boolean",
    },
  },
  badge: {
    name: "badge",
    category: "Data Display",
    variants: ["default", "secondary", "outline", "destructive", "monochrome"],
    slots: ["icon"],
  },
  dialog: {
    name: "dialog",
    category: "Overlays",
    variants: ["default", "cad-modal"],
    slots: ["header", "content", "footer", "trigger"],
  },
  "drawer-dialog": {
    name: "drawer-dialog",
    category: "Overlays",
    variants: ["bottom-sheet", "right-inspector", "left-drawer", "floating-card"],
    slots: ["header", "content", "footer", "trigger"],
  },
  "popover-dialog": {
    name: "popover-dialog",
    category: "Overlays",
    variants: ["compact-pill", "expanded-hud", "default"],
    slots: ["trigger", "content"],
  },
  slider: {
    name: "slider",
    category: "Forms & Inputs",
    variants: ["default"],
    propTypes: {
      min: "number",
      max: "number",
      step: "number",
      value: "number",
      disabled: "boolean",
    },
  },
  tabs: {
    name: "tabs",
    category: "Navigation",
    variants: ["default", "outline", "pills"],
    slots: ["tabList", "content"],
  },
};

/**
 * Standard container names
 */
const VALID_CONTAINER_NAMES = new Set([
  "container",
  "stack",
  "row",
  "column",
  "box",
  "grid",
  "flex",
  "section",
  "header",
  "footer",
  "aside",
  "main",
  "div",
  "card",
]);

/**
 * Standard text tags
 */
const VALID_TEXT_NAMES = new Set([
  "text",
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "label",
  "code",
  "pre",
  "blockquote",
  "caption",
]);

/**
 * Calculate Levenshtein distance for fuzzy matching primitive names
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * Find closest matching primitive from registered keys
 */
function findClosestPrimitive(name: string, candidates: string[]): string | null {
  const target = name.toLowerCase().trim();
  let bestMatch: string | null = null;
  let minDistance = Infinity;

  for (const c of candidates) {
    const dist = levenshteinDistance(target, c.toLowerCase());
    if (dist < minDistance && dist <= 4) {
      minDistance = dist;
      bestMatch = c;
    }
  }

  return bestMatch;
}

/**
 * Validate a Declarative Design AST against schema, primitive definitions,
 * slot constraints, ergonomics, and aesthetic guidelines.
 */
export function validateDesignAST(
  rawAst: unknown,
  options: ASTValidatorOptions = {}
): ASTValidationResult {
  const diagnostics: DiagnosticItem[] = [];
  const primitivesUsed = new Set<string>();
  let totalNodes = 0;

  const registry = { ...STANDARD_PRIMITIVES, ...(options.registry || {}) };
  const registeredPrimitiveKeys = Object.keys(registry);
  const strictAesthetics = options.strictAesthetics ?? true;
  const shouldAutoRepair = options.autoRepair ?? true;
  const maxDepth = options.maxDepth ?? 64;

  // --------------------------------------------------------------------------
  // Stage 1: Structure & Schema Integrity Check
  // --------------------------------------------------------------------------
  if (!rawAst || typeof rawAst !== "object" || Array.isArray(rawAst)) {
    diagnostics.push({
      code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
      severity: "error",
      nodeId: "",
      path: "",
      message: "AST root must be a valid JSON object.",
      suggestion: "Provide an AST object with 'version', 'meta', and 'root' keys.",
    });
    return {
      valid: false,
      errorCount: 1,
      warningCount: 0,
      diagnostics,
      autoCorrectable: false,
      summary: { totalNodes: 0, primitivesUsed: [] },
    };
  }

  const ast = rawAst as Record<string, unknown>;

  // Check version
  if (ast.version !== "1.0.0") {
    diagnostics.push({
      code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
      severity: "error",
      nodeId: "",
      path: "version",
      message: `Invalid or missing AST 'version'. Expected '1.0.0', got '${String(ast.version)}'.`,
      suggestion: "Set version to '1.0.0'.",
      suggestedFix: {
        action: "replace_value",
        property: "version",
        value: "1.0.0",
        description: "Set version to '1.0.0'",
      },
    });
  }

  // Check meta
  if (!ast.meta || typeof ast.meta !== "object" || Array.isArray(ast.meta)) {
    diagnostics.push({
      code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
      severity: "error",
      nodeId: "",
      path: "meta",
      message: "AST 'meta' field must be an object with 'id' and 'title'.",
      suggestion: "Include meta: { id: '...', title: '...' }.",
    });
  } else {
    const meta = ast.meta as Record<string, unknown>;
    if (!meta.id || typeof meta.id !== "string") {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId: "",
        path: "meta.id",
        message: "AST 'meta.id' must be a non-empty string identifier.",
        suggestion: "Add a unique string id to meta.",
      });
    }
    if (!meta.title || typeof meta.title !== "string") {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId: "",
        path: "meta.title",
        message: "AST 'meta.title' must be a string title.",
        suggestion: "Add a title describing this design screen.",
      });
    }
  }

  // Check root node existence
  if (!ast.root || typeof ast.root !== "object" || Array.isArray(ast.root)) {
    diagnostics.push({
      code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
      severity: "error",
      nodeId: "",
      path: "root",
      message: "AST 'root' must be a valid DesignASTNode object.",
      suggestion: "Supply a root container or component node.",
    });
    return {
      valid: false,
      errorCount: diagnostics.filter((d) => d.severity === "error").length,
      warningCount: diagnostics.filter((d) => d.severity === "warning").length,
      diagnostics,
      autoCorrectable: false,
      summary: { totalNodes: 0, primitivesUsed: [] },
    };
  }

  const isMobileViewport =
    ast.meta && typeof ast.meta === "object"
      ? (ast.meta as Record<string, unknown>).viewport === "mobile"
      : false;

  // Track node IDs across the tree for uniqueness
  const seenNodeIds = new Set<string>();

  // --------------------------------------------------------------------------
  // Recursive Node Validation (Stages 2-6)
  // --------------------------------------------------------------------------
  function validateNode(
    nodeRaw: unknown,
    path: string,
    depth: number = 0,
    currentMaxDepth: number = maxDepth
  ): void {
    if (depth > currentMaxDepth) {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId:
          nodeRaw && typeof nodeRaw === "object" && !Array.isArray(nodeRaw) && typeof (nodeRaw as Record<string, unknown>).id === "string"
            ? ((nodeRaw as Record<string, unknown>).id as string)
            : "",
        path,
        message: "Exceeded maximum AST nesting depth of 64.",
        suggestion: "Flatten your component hierarchy to have nesting depth <= 64.",
      });
      return;
    }

    if (!nodeRaw || typeof nodeRaw !== "object" || Array.isArray(nodeRaw)) {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId: "",
        path,
        message: `Node at '${path}' must be a JSON object, got ${typeof nodeRaw}.`,
      });
      return;
    }

    const node = nodeRaw as Record<string, unknown>;
    totalNodes++;

    // Stage 1: ID uniqueness and valid string
    const nodeId = typeof node.id === "string" ? node.id.trim() : "";
    if (!nodeId) {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId: "",
        path: `${path}.id`,
        message: `Node at '${path}' is missing a valid string 'id'.`,
        suggestion: "Provide a unique identifier string for this node.",
      });
    } else {
      if (seenNodeIds.has(nodeId)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
          severity: "error",
          nodeId,
          path: `${path}.id`,
          message: `Duplicate node ID '${nodeId}' detected at '${path}'. Node IDs must be unique across the tree.`,
          suggestion: `Change this node id to '${nodeId}_1' or another unique string.`,
          suggestedFix: {
            action: "deduplicate_id",
            property: "id",
            description: `Deduplicate node id '${nodeId}'`,
          },
        });
      } else {
        seenNodeIds.add(nodeId);
      }
    }

    // Node kind validation
    const kind = node.kind;
    if (kind !== "component" && kind !== "container" && kind !== "text") {
      diagnostics.push({
        code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
        severity: "error",
        nodeId,
        path: `${path}.kind`,
        message: `Invalid node kind '${String(kind)}' at '${path}'. Expected 'component', 'container', or 'text'.`,
        suggestion: "Set kind to 'component', 'container', or 'text'.",
      });
      return;
    }

    // Stage 2: Primitive Registry Resolution
    const compNameRaw =
      typeof node.component === "string"
        ? node.component
        : typeof node.name === "string"
        ? node.name
        : "";
    const compName = compNameRaw.toLowerCase().trim();

    if (kind === "component") {
      if (!compName) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
          severity: "error",
          nodeId,
          path: `${path}.component`,
          message: `Component node at '${path}' is missing 'component' name.`,
          suggestion: "Specify a registered component name (e.g. 'button', 'mobile-bottom-sheet').",
        });
      } else {
        primitivesUsed.add(compName);
        const primitiveDef = registry[compName];

        if (!primitiveDef) {
          const closest = findClosestPrimitive(compName, registeredPrimitiveKeys);
          const suggestion = closest
            ? `Did you mean '${closest}'? See kilo://registry/catalog for all available primitives.`
            : "Check kilo://registry/catalog for authoritative registered primitives.";

          diagnostics.push({
            code: DIAGNOSTIC_CODES.UNREGISTERED_PRIMITIVE,
            severity: "error",
            nodeId,
            path: `${path}.component`,
            message: `Unregistered primitive '${compNameRaw}' at '${path}'.`,
            suggestion,
            suggestedFix: closest
              ? {
                  action: "rename_node",
                  property: "component",
                  value: closest,
                  description: `Rename '${compNameRaw}' to '${closest}'`,
                }
              : undefined,
          });
        } else {
          // Stage 3: Prop Type and Enum Conformance
          validatePrimitiveProps(node, path, nodeId, compName, primitiveDef);

          // Stage 4: Slot Rules and Allowed Children
          validatePrimitiveSlots(node, path, nodeId, compName, primitiveDef);
        }
      }
    } else if (kind === "container") {
      if (compName && !VALID_CONTAINER_NAMES.has(compName)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
          severity: "warning",
          nodeId,
          path: `${path}.name`,
          message: `Non-standard container name '${compNameRaw}' at '${path}'.`,
          suggestion: `Common container names: ${Array.from(VALID_CONTAINER_NAMES).join(", ")}.`,
        });
      }
    } else if (kind === "text") {
      if (compName && !VALID_TEXT_NAMES.has(compName)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.SCHEMA_VIOLATION,
          severity: "warning",
          nodeId,
          path: `${path}.name`,
          message: `Non-standard text tag name '${compNameRaw}' at '${path}'.`,
          suggestion: `Common text names: ${Array.from(VALID_TEXT_NAMES).join(", ")}.`,
        });
      }
    }

    // Stage 5: Touch Target Ergonomics Check
    checkTouchErgonomics(node, path, nodeId, compName, isMobileViewport);

    // Stage 6: Strict Aesthetic Boundary Enforcement
    checkAestheticBoundaries(node, path, nodeId, strictAesthetics);

    // Check Token Bindings
    checkTokenBindings(node, path, nodeId);

    // Recursively validate slots
    if (node.slots && typeof node.slots === "object") {
      for (const [slotKey, slotVal] of Object.entries(
        node.slots as Record<string, unknown>
      )) {
        const slotPath = `${path}.slots.${slotKey}`;
        if (Array.isArray(slotVal)) {
          slotVal.forEach((sn, idx) => validateNode(sn, `${slotPath}[${idx}]`, depth + 1, currentMaxDepth));
        } else if (slotVal && typeof slotVal === "object") {
          validateNode(slotVal, slotPath, depth + 1, currentMaxDepth);
        }
      }
    }

    // Recursively validate children
    if (Array.isArray(node.children)) {
      node.children.forEach((child, idx) =>
        validateNode(child, `${path}.children[${idx}]`, depth + 1, currentMaxDepth)
      );
    }
  }

  // --------------------------------------------------------------------------
  // Stage 3 Helper: Prop Type and Enum Conformance
  // --------------------------------------------------------------------------
  function validatePrimitiveProps(
    node: Record<string, unknown>,
    path: string,
    nodeId: string,
    compName: string,
    def: PrimitiveSchemaDefinition
  ): void {
    const props = node.props;
    if (!props || typeof props !== "object") return;
    const propsObj = props as Record<string, unknown>;

    // 1. Variant enum verification
    if (propsObj.variant !== undefined) {
      const variantVal = propsObj.variant;
      if (typeof variantVal !== "string") {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.INVALID_PROP_TYPE,
          severity: "error",
          nodeId,
          path: `${path}.props.variant`,
          message: `Prop 'variant' on '${compName}' must be a string, got ${typeof variantVal}.`,
        });
      } else if (def.variants && def.variants.length > 0) {
        if (!def.variants.includes(variantVal)) {
          diagnostics.push({
            code: DIAGNOSTIC_CODES.INVALID_PROP_VALUE,
            severity: "error",
            nodeId,
            path: `${path}.props.variant`,
            message: `Invalid variant '${variantVal}' for primitive '${compName}'.`,
            suggestion: `Supported variants: ${def.variants.join(", ")}.`,
            suggestedFix: {
              action: "replace_value",
              property: "variant",
              value: def.variants[0] || "default",
              description: `Replace variant with default '${def.variants[0] || "default"}'`,
            },
          });
        }
      }
    }

    // 2. Expected Prop Types
    if (def.propTypes) {
      for (const [expectedProp, expectedType] of Object.entries(def.propTypes)) {
        if (propsObj[expectedProp] !== undefined) {
          const val = propsObj[expectedProp];
          let actualType: string = typeof val;
          if (Array.isArray(val)) actualType = "array";

          if (actualType !== expectedType && !isTokenBinding(val)) {
            diagnostics.push({
              code: DIAGNOSTIC_CODES.INVALID_PROP_TYPE,
              severity: "error",
              nodeId,
              path: `${path}.props.${expectedProp}`,
              message: `Prop '${expectedProp}' on '${compName}' has type '${actualType}', expected '${expectedType}'.`,
              suggestion: `Provide a valid ${expectedType} value.`,
              suggestedFix:
                expectedType === "boolean" && typeof val === "string"
                  ? {
                      action: "replace_value",
                      property: expectedProp,
                      value: val.toLowerCase() === "true",
                      description: `Coerce string to boolean ${val.toLowerCase() === "true"}`,
                    }
                  : undefined,
            });
          }
        }
      }
    }

    // 3. Required props
    if (def.requiredProps) {
      for (const reqProp of def.requiredProps) {
        if (propsObj[reqProp] === undefined) {
          diagnostics.push({
            code: DIAGNOSTIC_CODES.MISSING_REQUIRED_PROP,
            severity: "error",
            nodeId,
            path: `${path}.props.${reqProp}`,
            message: `Missing required property '${reqProp}' on primitive '${compName}'.`,
            suggestion: `Provide required prop '${reqProp}'.`,
          });
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // Stage 4 Helper: Slot Rules and Allowed Children
  // --------------------------------------------------------------------------
  function validatePrimitiveSlots(
    node: Record<string, unknown>,
    path: string,
    nodeId: string,
    compName: string,
    def: PrimitiveSchemaDefinition
  ): void {
    if (node.slots && typeof node.slots === "object") {
      const slotsObj = node.slots as Record<string, unknown>;
      const declaredSlotKeys = Object.keys(slotsObj);

      if (def.slots && def.slots.length > 0) {
        for (const slotKey of declaredSlotKeys) {
          if (!def.slots.includes(slotKey)) {
            diagnostics.push({
              code: DIAGNOSTIC_CODES.SLOT_RULE_VIOLATION,
              severity: "error",
              nodeId,
              path: `${path}.slots.${slotKey}`,
              message: `Slot '${slotKey}' is not supported by primitive '${compName}'.`,
              suggestion: `Supported slots for '${compName}': ${def.slots.join(", ")}.`,
              suggestedFix: {
                action: "remove_prop",
                property: slotKey,
                description: `Remove unsupported slot '${slotKey}'`,
              },
            });
          }
        }
      }
    }

    // Allowed children containment
    if (def.allowedChildren && Array.isArray(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i] as Record<string, unknown>;
        if (child && typeof child === "object") {
          const childComp = String(child.component || child.name || "").toLowerCase();
          if (childComp && !def.allowedChildren.includes(childComp)) {
            diagnostics.push({
              code: DIAGNOSTIC_CODES.SLOT_RULE_VIOLATION,
              severity: "warning",
              nodeId,
              path: `${path}.children[${i}]`,
              message: `Child component '${childComp}' may not be allowed inside '${compName}'.`,
              suggestion: `Allowed children: ${def.allowedChildren.join(", ")}.`,
            });
          }
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // Stage 5 Helper: Touch Target Ergonomics Check (44x44px minimum)
  // --------------------------------------------------------------------------
  function checkTouchErgonomics(
    node: Record<string, unknown>,
    path: string,
    nodeId: string,
    compName: string,
    isMobile: boolean
  ): void {
    if (!isMobile) return;

    const interactivePrimitives = [
      "button",
      "icon-button",
      "switch",
      "checkbox",
      "thumb-segment-controller",
      "floating-action-dock",
      "swipe-action-card",
      "toggle",
    ];

    if (node.kind === "component" && interactivePrimitives.includes(compName)) {
      const layout = node.layout as Record<string, unknown> | undefined;
      const props = node.props as Record<string, unknown> | undefined;

      let widthBelow44 = false;
      let heightBelow44 = false;

      if (layout) {
        if (typeof layout.width === "number" && layout.width < 44) widthBelow44 = true;
        if (typeof layout.height === "number" && layout.height < 44) heightBelow44 = true;
        if (typeof layout.minWidth === "number" && layout.minWidth < 44) widthBelow44 = true;
        if (typeof layout.minHeight === "number" && layout.minHeight < 44) heightBelow44 = true;
      }

      if (props && (props.size === "xs" || props.size === "sm")) {
        // Small icon button or xs button without 44px container
        heightBelow44 = true;
      }

      if (widthBelow44 || heightBelow44) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.TOUCH_TARGET_TOO_SMALL,
          severity: "warning",
          nodeId,
          path: `${path}.layout`,
          message: `Touch target for interactive '${compName}' at '${path}' is below the 44x44px mobile touch boundary.`,
          suggestion: "Set layout minWidth: 44, minHeight: 44 or size: 'default' to ensure thumb-friendly mobile ergonomics.",
          suggestedFix: {
            action: "adjust_size",
            description: "Pad container or enforce minHeight: 44, minWidth: 44",
          },
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // Stage 6 Helper: Strict Aesthetic Boundary Enforcement
  // --------------------------------------------------------------------------
  function checkAestheticBoundaries(
    node: Record<string, unknown>,
    path: string,
    nodeId: string,
    isStrict: boolean
  ): void {
    const severity = isStrict ? "error" : "warning";

    // Check props
    if (node.props && typeof node.props === "object") {
      const propsString = JSON.stringify(node.props);

      if (PROHIBITED_PATTERNS.GLOW.test(propsString)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.PROHIBITED_AESTHETIC_DECORATION,
          severity,
          nodeId,
          path: `${path}.props`,
          message: "Prohibited glowing circle, neon shadow, or saturated color glow detected.",
          suggestion: "Remove neon glows. Adhere to clean monochrome styling and subtle M3 neutral surface tokens (e.g. var(--surface-secondary)).",
          suggestedFix: {
            action: "strip_class",
            property: "className",
            description: "Strip glowing classes and replace with subtle M3 surface container",
          },
        });
      }

      if (PROHIBITED_PATTERNS.PULSE.test(propsString)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.PROHIBITED_AESTHETIC_DECORATION,
          severity,
          nodeId,
          path: `${path}.props`,
          message: "Prohibited pulsing green dot or animated status radar detected.",
          suggestion: "Remove animated pulsing green circles. Use static monochrome indicators or var(--text-muted).",
          suggestedFix: {
            action: "strip_class",
            property: "className",
            description: "Replace pulsing green dot with clean monochrome badge",
          },
        });
      }

      if (PROHIBITED_PATTERNS.GRADIENT.test(propsString)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.PROHIBITED_AESTHETIC_DECORATION,
          severity,
          nodeId,
          path: `${path}.props`,
          message: "Prohibited colorful rainbow gradient detected.",
          suggestion: "Remove multi-hue linear gradients. Use clean monochrome fills and subtle M3 tonal borders.",
          suggestedFix: {
            action: "strip_class",
            property: "className",
            description: "Replace colorful gradient with neutral surface token",
          },
        });
      }
    }

    // Check styleBindings
    if (node.styleBindings && typeof node.styleBindings === "object") {
      const sbString = JSON.stringify(node.styleBindings);
      if (PROHIBITED_PATTERNS.GLOW.test(sbString) || PROHIBITED_PATTERNS.PULSE.test(sbString) || PROHIBITED_PATTERNS.GRADIENT.test(sbString)) {
        diagnostics.push({
          code: DIAGNOSTIC_CODES.PROHIBITED_AESTHETIC_DECORATION,
          severity,
          nodeId,
          path: `${path}.styleBindings`,
          message: "Prohibited aesthetic decoration in styleBindings (glowing circle, pulsing dot, or colorful gradient).",
          suggestion: "Adhere strictly to clean monochrome M3 surfaces.",
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // Token Resolution Verification
  // --------------------------------------------------------------------------
  function checkTokenBindings(
    node: Record<string, unknown>,
    path: string,
    nodeId: string
  ): void {
    if (node.props && typeof node.props === "object") {
      for (const [k, v] of Object.entries(node.props as Record<string, unknown>)) {
        if (isTokenBinding(v)) {
          const tok = v.$token;
          if (!tok.startsWith("m3.") && !tok.startsWith("var(--") && !tok.startsWith("--")) {
            diagnostics.push({
              code: DIAGNOSTIC_CODES.TOKEN_RESOLUTION_ERROR,
              severity: "warning",
              nodeId,
              path: `${path}.props.${k}`,
              message: `Invalid token reference '${tok}'. Expected 'm3.*' or 'var(--*)'.`,
              suggestion: "Use format 'm3.color.surfaceContainer' or 'var(--surface-elevated)'.",
            });
          }
        }
      }
    }
  }

  // Run recursive tree validation from root
  validateNode(ast.root, "root", 0, maxDepth);

  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");
  const isValid = errors.length === 0;

  // Generate deterministic auto-repaired AST if requested and recoverable
  let correctedAst: DesignAST | undefined = undefined;
  let autoCorrectable = false;

  if (shouldAutoRepair && (errors.length > 0 || warnings.length > 0)) {
    try {
      const repairResult = autoRepairAST(ast as unknown as DesignAST, diagnostics);
      correctedAst = repairResult.repairedAst;
      autoCorrectable = repairResult.repairsCount > 0;
    } catch {
      autoCorrectable = false;
    }
  }

  return {
    valid: isValid,
    errorCount: errors.length,
    warningCount: warnings.length,
    diagnostics,
    autoCorrectable,
    correctedAst,
    summary: {
      totalNodes,
      primitivesUsed: Array.from(primitivesUsed).sort(),
    },
  };
}

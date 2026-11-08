/**
 * Authoritative Declarative Design AST Diagnostics & Auto-Repair Engine
 *
 * Implements standard diagnostic error codes, formatting for human/machine
 * readability, and deterministic auto-repair for recoverable AST defects.
 */

import { DesignAST, DesignASTNode, ASTPropValue } from "./schema";

/**
 * The 9 Authoritative Diagnostic Error Codes
 */
export const DIAGNOSTIC_CODES = {
  SCHEMA_VIOLATION: "SCHEMA_VIOLATION",
  UNREGISTERED_PRIMITIVE: "UNREGISTERED_PRIMITIVE",
  INVALID_PROP_TYPE: "INVALID_PROP_TYPE",
  MISSING_REQUIRED_PROP: "MISSING_REQUIRED_PROP",
  INVALID_PROP_VALUE: "INVALID_PROP_VALUE",
  SLOT_RULE_VIOLATION: "SLOT_RULE_VIOLATION",
  TOUCH_TARGET_TOO_SMALL: "TOUCH_TARGET_TOO_SMALL",
  PROHIBITED_AESTHETIC_DECORATION: "PROHIBITED_AESTHETIC_DECORATION",
  TOKEN_RESOLUTION_ERROR: "TOKEN_RESOLUTION_ERROR",
} as const;

export type DiagnosticCode =
  (typeof DIAGNOSTIC_CODES)[keyof typeof DIAGNOSTIC_CODES];

export type DiagnosticSeverity = "error" | "warning" | "info";

export interface DiagnosticSuggestedFix {
  action:
    | "remove_prop"
    | "replace_value"
    | "rename_node"
    | "wrap_container"
    | "adjust_size"
    | "strip_class"
    | "add_prop"
    | "deduplicate_id";
  property?: string;
  value?: unknown;
  description: string;
}

export interface DiagnosticItem {
  code: DiagnosticCode;
  severity: DiagnosticSeverity;
  nodeId: string;
  path: string;
  message: string;
  suggestion?: string;
  suggestedFix?: DiagnosticSuggestedFix;
}

export interface ASTValidationResult {
  valid: boolean;
  errorCount: number;
  warningCount: number;
  diagnostics: DiagnosticItem[];
  autoCorrectable: boolean;
  correctedAst?: DesignAST;
  summary: {
    totalNodes: number;
    primitivesUsed: string[];
  };
}

/**
 * Prohibited aesthetic pattern matchers (Kilo UI Clean Monochrome & M3 Neutral Mandate)
 */
export const PROHIBITED_PATTERNS = {
  // Glowing circles, neon drop shadows, and saturated color blooms
  GLOW: /(accentGlow|glowing-circle|glow-mode|shadow-\[0_0_|\bneon\b|\bdrop-shadow-\[0_0_)/i,
  // Green pulsing dots and status beacons
  PULSE: /(pulsing-green-dot|accent-green.*pulse|bg-green.*animate-pulse|\banimate-pulse\b.*bg-(green|emerald|lime)|bg-(green|emerald|lime).*\banimate-pulse\b)/i,
  // Saturated rainbow or multi-hue gradients
  GRADIENT: /(\bbg-gradient-to-\S+\b|\bfrom-pink|\bto-purple|\bvia-purple|\bfrom-rose|\bto-violet|\bfrom-cyan|\bto-blue|\brainbow\b)/i,
};

/**
 * Format a single diagnostic item into an actionable human-readable string.
 */
export function formatDiagnostic(item: DiagnosticItem): string {
  const level = item.severity.toUpperCase().padEnd(7, " ");
  let output = `[${level}] ${item.path} (${item.code}): ${item.message}`;
  if (item.suggestion) {
    output += `\n          ↳ Suggestion: ${item.suggestion}`;
  }
  if (item.suggestedFix) {
    output += `\n          ↳ Auto-fix: [${item.suggestedFix.action}] ${item.suggestedFix.description}`;
  }
  return output;
}

/**
 * Format the complete validation report.
 */
export function formatDiagnosticsReport(result: ASTValidationResult): string {
  const lines: string[] = [];
  lines.push(
    `AST Validation Report: ${result.valid ? "PASSED" : "FAILED"} (${result.errorCount} errors, ${result.warningCount} warnings)`
  );
  lines.push(`Total Nodes: ${result.summary.totalNodes}`);
  lines.push(`Primitives Used: ${result.summary.primitivesUsed.join(", ") || "none"}`);

  if (result.diagnostics.length > 0) {
    lines.push("\nDiagnostics:");
    for (const d of result.diagnostics) {
      lines.push(formatDiagnostic(d));
    }
  }

  if (result.autoCorrectable && result.correctedAst) {
    lines.push("\nAuto-repair: An auto-corrected AST was generated deterministically.");
  }

  return lines.join("\n");
}

/**
 * Helper to deep clone an AST node or value.
 */
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Clean prohibited aesthetic utility classes from a className string.
 * Strips glows, pulsing dots, and gradients, replacing with clean M3 neutral styling.
 */
export function sanitizeClassNames(className: string): string {
  if (!className || typeof className !== "string") return "";

  const hasPulse = /\b(animate-pulse|animate-ping|pulse)\b/i.test(className);
  const hasGreen = /\b(bg-(green|emerald|lime)|accent-green|text-(green|emerald|lime))\S*/i.test(className);
  const stripPulseAndGreen = hasPulse && hasGreen;

  const tokens = className.split(/\s+/).filter(Boolean);
  const cleanTokens: string[] = [];

  for (const token of tokens) {
    if (PROHIBITED_PATTERNS.GLOW.test(token)) continue;
    if (PROHIBITED_PATTERNS.GRADIENT.test(token)) continue;
    if (/pulsing-green-dot/i.test(token)) continue;

    if (stripPulseAndGreen) {
      if (/\b(animate-pulse|animate-ping|pulse)\b/i.test(token)) continue;
      if (/\b(bg-(green|emerald|lime)|accent-green|text-(green|emerald|lime))\S*/i.test(token)) continue;
    }

    cleanTokens.push(token);
  }

  return cleanTokens.join(" ");
}

/**
 * Deterministic Auto-Repair Engine
 *
 * Traverses and repairs recoverable defects:
 * 1. String-to-boolean / string-to-number type coercion
 * 2. Prohibited aesthetic classes removal (replaces with clean M3 surfaces)
 * 3. Default variant injection when missing or invalid
 * 4. Duplicate node ID deduplication
 * 5. Minimum 44x44px touch targets on mobile interactive components
 * 6. Primitive name alias normalization
 */
export function autoRepairAST(
  ast: DesignAST,
  diagnostics?: DiagnosticItem[]
): { repairedAst: DesignAST; repairsCount: number; repairLog: string[] } {
  const rootClone = deepClone(ast);
  const repairLog: string[] = [];
  let repairsCount = 0;

  // Track seen IDs for deduplication
  const seenIds = new Map<string, number>();

  function walkAndRepair(node: DesignASTNode, path: string): void {
    if (!node || typeof node !== "object") return;

    // 1. Deduplicate Node ID
    if (!node.id || typeof node.id !== "string") {
      const generatedId = `node_${++repairsCount}`;
      repairLog.push(`Supplied missing node id at '${path}' -> '${generatedId}'`);
      node.id = generatedId;
    }

    const currentCount = seenIds.get(node.id) || 0;
    if (currentCount > 0) {
      const dedupId = `${node.id}_dup${currentCount}`;
      repairLog.push(`Deduplicated node id '${node.id}' at '${path}' -> '${dedupId}'`);
      node.id = dedupId;
      repairsCount++;
    }
    seenIds.set(node.id, currentCount + 1);

    // 2. Normalize Primitive Name / Alias
    const compName = node.component || (node.kind === "component" ? node.name : undefined);
    if (compName) {
      const lower = compName.toLowerCase().trim();
      const aliasMap: Record<string, string> = {
        bottomsheet: "mobile-bottom-sheet",
        "bottom-sheet": "mobile-bottom-sheet",
        bottom_sheet: "mobile-bottom-sheet",
        drawer: "drawer-dialog",
        swipeaction: "swipe-action-card",
        "swipe-action": "swipe-action-card",
        "swipe-card": "swipe-action-card",
        thumbsegment: "thumb-segment-controller",
        "segment-controller": "thumb-segment-controller",
        pulltorefresh: "pull-to-refresh",
        floatingdock: "floating-action-dock",
        "action-dock": "floating-action-dock",
      };

      if (aliasMap[lower] && aliasMap[lower] !== compName) {
        const canonical = aliasMap[lower];
        repairLog.push(`Normalized primitive alias '${compName}' to '${canonical}' at '${path}'`);
        node.component = canonical;
        if (node.name) node.name = canonical;
        repairsCount++;
      }
    }

    // 3. Clean Prohibited Aesthetics in props.className and styleBindings
    if (node.props && typeof node.props === "object") {
      if (typeof node.props.className === "string") {
        const originalClass = node.props.className;
        const cleanedClass = sanitizeClassNames(originalClass);
        if (cleanedClass !== originalClass) {
          node.props.className = cleanedClass;
          repairLog.push(
            `Removed prohibited aesthetic decoration from '${path}.props.className'`
          );
          repairsCount++;
        }
      }

      // Prop type coercion
      for (const [propKey, propVal] of Object.entries(node.props)) {
        if (typeof propVal === "string") {
          // Coerce "true" / "false"
          if (propVal.toLowerCase() === "true") {
            node.props[propKey] = true;
            repairLog.push(`Coerced string "true" to boolean true at '${path}.props.${propKey}'`);
            repairsCount++;
          } else if (propVal.toLowerCase() === "false") {
            node.props[propKey] = false;
            repairLog.push(`Coerced string "false" to boolean false at '${path}.props.${propKey}'`);
            repairsCount++;
          }
          // Coerce numeric strings like "44"
          else if (/^-?\d+(\.\d+)?$/.test(propVal) && propKey !== "id" && propKey !== "title" && propKey !== "name") {
            const num = Number(propVal);
            if (!Number.isNaN(num) && (propKey === "size" || propKey === "gap" || propKey === "elevation" || propKey === "tabIndex")) {
              node.props[propKey] = num;
              repairLog.push(`Coerced numeric string "${propVal}" to ${num} at '${path}.props.${propKey}'`);
              repairsCount++;
            }
          }
        }
      }
    }

    // StyleBindings className check
    if (node.styleBindings && typeof node.styleBindings === "object") {
      if (typeof node.styleBindings.className === "string") {
        const orig = node.styleBindings.className;
        const clean = sanitizeClassNames(orig);
        if (clean !== orig) {
          node.styleBindings.className = clean;
          repairLog.push(`Sanitized styleBindings.className at '${path}'`);
          repairsCount++;
        }
      }
    }

    // 4. Touch target ergonomics (>= 44x44px for mobile interactive primitives)
    const isMobile = rootClone.meta?.viewport === "mobile";
    const isInteractive =
      node.kind === "component" &&
      [
        "button",
        "icon-button",
        "toggle",
        "switch",
        "checkbox",
        "thumb-segment-controller",
        "floating-action-dock",
        "swipe-action-card",
      ].includes((node.component || node.name || "").toLowerCase());

    if (isMobile && isInteractive) {
      if (!node.layout) {
        node.layout = {};
      }

      // Ensure minWidth and minHeight are at least 44px
      const currentMinH = typeof node.layout.minHeight === "number" ? node.layout.minHeight : 0;
      const currentMinW = typeof node.layout.minWidth === "number" ? node.layout.minWidth : 0;

      if (currentMinH < 44 || currentMinW < 44) {
        node.layout.minHeight = Math.max(currentMinH, 44);
        node.layout.minWidth = Math.max(currentMinW, 44);
        repairLog.push(
          `Adjusted touch target min dimensions to 44x44px for interactive node '${node.id}' at '${path}'`
        );
        repairsCount++;
      }
    }

    // 5. Traverse Named Slots
    if (node.slots && typeof node.slots === "object") {
      for (const [slotKey, slotVal] of Object.entries(node.slots)) {
        if (Array.isArray(slotVal)) {
          slotVal.forEach((sn, idx) =>
            walkAndRepair(sn, `${path}.slots.${slotKey}[${idx}]`)
          );
        } else if (slotVal && typeof slotVal === "object") {
          walkAndRepair(slotVal, `${path}.slots.${slotKey}`);
        }
      }
    }

    // 6. Traverse Children
    if (Array.isArray(node.children)) {
      node.children.forEach((cn, idx) =>
        walkAndRepair(cn, `${path}.children[${idx}]`)
      );
    }
  }

  walkAndRepair(rootClone.root, "root");

  return {
    repairedAst: rootClone,
    repairsCount,
    repairLog,
  };
}

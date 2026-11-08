/**
 * Static TypeScript / TSX Source Code Generator
 *
 * Transpiles a Declarative Design AST into clean, human-readable, production-ready
 * Next.js React component code with all necessary imports and Tailwind classes.
 */

import type { DesignAST, DesignASTNode, EmitOptions } from "./types";
import { resolveM3Tokens } from "./m3-theme";
import { mergeStyles } from "./layout";
import { LUCIDE_ICON_MAP } from "./registry-map";

/**
 * Registry mapping from primitive name to its export symbol and module import path
 */
interface ComponentMeta {
  exportName: string;
  modulePath: string;
}

const PRIMITIVE_IMPORT_MAP: Record<string, ComponentMeta> = {
  // Mobile Primitives
  "mobile-bottom-sheet": { exportName: "MobileBottomSheet", modulePath: "@/registry/ui/mobile-bottom-sheet" },
  "bottom-sheet": { exportName: "MobileBottomSheet", modulePath: "@/registry/ui/mobile-bottom-sheet" },
  "swipe-action-card": { exportName: "SwipeActionCard", modulePath: "@/registry/ui/swipe-action-card" },
  "swipe-card": { exportName: "SwipeActionCard", modulePath: "@/registry/ui/swipe-action-card" },
  "thumb-segment-controller": { exportName: "ThumbSegmentController", modulePath: "@/registry/ui/thumb-segment-controller" },
  "segment-controller": { exportName: "ThumbSegmentController", modulePath: "@/registry/ui/thumb-segment-controller" },
  "segmented-control": { exportName: "ThumbSegmentController", modulePath: "@/registry/ui/thumb-segment-controller" },
  "pull-to-refresh": { exportName: "PullToRefresh", modulePath: "@/registry/ui/pull-to-refresh" },
  "floating-action-dock": { exportName: "FloatingActionDock", modulePath: "@/registry/ui/floating-action-dock" },
  "action-dock": { exportName: "FloatingActionDock", modulePath: "@/registry/ui/floating-action-dock" },
  "dock": { exportName: "FloatingActionDock", modulePath: "@/registry/ui/floating-action-dock" },

  // Existing Primitives
  "button": { exportName: "Button", modulePath: "@/registry/ui/button" },
  "btn": { exportName: "Button", modulePath: "@/registry/ui/button" },
  "card": { exportName: "Card", modulePath: "@/registry/ui/card" },
  "badge": { exportName: "Badge", modulePath: "@/registry/ui/badge" },
  "tag": { exportName: "Badge", modulePath: "@/registry/ui/badge" },
  "input": { exportName: "Input", modulePath: "@/registry/ui/input" },
  "text-input": { exportName: "Input", modulePath: "@/registry/ui/input" },
  "switch": { exportName: "Switch", modulePath: "@/registry/ui/switch" },
  "toggle": { exportName: "Switch", modulePath: "@/registry/ui/switch" },
  "checkbox": { exportName: "Checkbox", modulePath: "@/registry/ui/checkbox" },
  "dialog": { exportName: "Dialog", modulePath: "@/registry/ui/dialog" },
  "modal": { exportName: "Dialog", modulePath: "@/registry/ui/dialog" },
  "drawer-dialog": { exportName: "DrawerDialog", modulePath: "@/registry/ui/drawer-dialog" },
  "drawer": { exportName: "DrawerDialog", modulePath: "@/registry/ui/drawer-dialog" },
  "tabs": { exportName: "Tabs", modulePath: "@/registry/ui/tabs" },
  "accordion": { exportName: "Accordion", modulePath: "@/registry/ui/accordion" },
  "stat-card": { exportName: "StatCard", modulePath: "@/registry/ui/stat-card" },
  "skeleton": { exportName: "Skeleton", modulePath: "@/registry/ui/skeleton" },
  "command-palette": { exportName: "CommandPalette", modulePath: "@/registry/ui/command-palette" },
  "popover-dialog": { exportName: "PopoverDialog", modulePath: "@/registry/ui/popover-dialog" },
  "spotlight-modal": { exportName: "SpotlightModal", modulePath: "@/registry/ui/spotlight-modal" },
  "toast-stack": { exportName: "ToastStack", modulePath: "@/registry/ui/toast-stack" },
  "ticker-notification": { exportName: "TickerNotification", modulePath: "@/registry/ui/ticker-notification" },
  "dynamic-island-banner": { exportName: "DynamicIslandBanner", modulePath: "@/registry/ui/dynamic-island-banner" },
  "stack-cards": { exportName: "StackCards", modulePath: "@/registry/ui/stack-cards" },

  // Subcomponents
  "card-header": { exportName: "CardHeader", modulePath: "@/registry/ui/card" },
  "card-title": { exportName: "CardTitle", modulePath: "@/registry/ui/card" },
  "card-description": { exportName: "CardDescription", modulePath: "@/registry/ui/card" },
  "card-content": { exportName: "CardContent", modulePath: "@/registry/ui/card" },
  "card-footer": { exportName: "CardFooter", modulePath: "@/registry/ui/card" },
  "dialog-trigger": { exportName: "DialogTrigger", modulePath: "@/registry/ui/dialog" },
  "dialog-content": { exportName: "DialogContent", modulePath: "@/registry/ui/dialog" },
  "dialog-header": { exportName: "DialogHeader", modulePath: "@/registry/ui/dialog" },
  "dialog-title": { exportName: "DialogTitle", modulePath: "@/registry/ui/dialog" },
  "dialog-description": { exportName: "DialogDescription", modulePath: "@/registry/ui/dialog" },
  "dialog-footer": { exportName: "DialogFooter", modulePath: "@/registry/ui/dialog" },
  "tabs-list": { exportName: "TabsList", modulePath: "@/registry/ui/tabs" },
  "tabs-trigger": { exportName: "TabsTrigger", modulePath: "@/registry/ui/tabs" },
  "tabs-content": { exportName: "TabsContent", modulePath: "@/registry/ui/tabs" },
  "accordion-item": { exportName: "AccordionItem", modulePath: "@/registry/ui/accordion" },
  "accordion-trigger": { exportName: "AccordionTrigger", modulePath: "@/registry/ui/accordion" },
  "accordion-content": { exportName: "AccordionContent", modulePath: "@/registry/ui/accordion" },
  "skeleton-text": { exportName: "SkeletonText", modulePath: "@/registry/ui/skeleton" },
  "skeleton-avatar": { exportName: "SkeletonAvatar", modulePath: "@/registry/ui/skeleton" },
  "skeleton-button": { exportName: "SkeletonButton", modulePath: "@/registry/ui/skeleton" },
  "skeleton-badge": { exportName: "SkeletonBadge", modulePath: "@/registry/ui/skeleton" },
  "skeleton-card": { exportName: "SkeletonCard", modulePath: "@/registry/ui/skeleton" },
};

/**
 * Scans AST to collect referenced primitives, Lucide icons, and state requirements
 */
function scanAST(node: DesignASTNode): {
  primitives: Set<string>;
  icons: Set<string>;
  hasMobileBottomSheet: boolean;
  hasSegmentController: boolean;
  hasSwitch: boolean;
  hasPullToRefresh: boolean;
} {
  const primitives = new Set<string>();
  const icons = new Set<string>();
  let hasMobileBottomSheet = false;
  let hasSegmentController = false;
  let hasSwitch = false;
  let hasPullToRefresh = false;

  function traverse(curr?: DesignASTNode) {
    if (!curr) return;

    const name = (curr.component || curr.name || "").toLowerCase().trim();
    if (PRIMITIVE_IMPORT_MAP[name]) {
      primitives.add(name);
      if (name.includes("bottom-sheet")) hasMobileBottomSheet = true;
      if (name.includes("segment")) hasSegmentController = true;
      if (name === "switch" || name === "toggle") hasSwitch = true;
      if (name === "pull-to-refresh") hasPullToRefresh = true;
    }

    // Inspect props for icons
    if (curr.props) {
      for (const [key, val] of Object.entries(curr.props)) {
        if (
          (key.toLowerCase().includes("icon") || key === "icon") &&
          typeof val === "string" &&
          LUCIDE_ICON_MAP[val]
        ) {
          icons.add(val);
        }
        // Inspect actions array in swipe cards or docks
        if (Array.isArray(val)) {
          for (const item of val) {
            if (
              typeof item === "object" &&
              item !== null &&
              "icon" in item &&
              typeof (item as any).icon === "string" &&
              LUCIDE_ICON_MAP[(item as any).icon]
            ) {
              icons.add((item as any).icon);
            }
          }
        }
      }
    }

    // Traverse slots
    if (curr.slots) {
      for (const slotContent of Object.values(curr.slots)) {
        if (Array.isArray(slotContent)) {
          slotContent.forEach(traverse);
        } else if (slotContent) {
          traverse(slotContent);
        }
      }
    }

    // Traverse children
    curr.children?.forEach(traverse);
  }

  traverse(node);

  return {
    primitives,
    icons,
    hasMobileBottomSheet,
    hasSegmentController,
    hasSwitch,
    hasPullToRefresh,
  };
}

/**
 * Formats prop values into valid JSX attribute strings
 */
function formatPropJSX(key: string, value: unknown, indent: string): string {
  if (value === undefined) return "";
  if (value === true) return key;
  if (typeof value === "string") {
    // Check if it's an icon string that should be an icon component
    if (key.toLowerCase().includes("icon") && LUCIDE_ICON_MAP[value]) {
      return `${key}={<${value} className="h-4 w-4" />}`;
    }
    return `${key}="${value.replace(/"/g, '&quot;')}"`;
  }
  if (typeof value === "number") {
    return `${key}={${value}}`;
  }
  if (typeof value === "boolean") {
    return `${key}={${value}}`;
  }
  if (Array.isArray(value)) {
    // Format array items
    const formattedItems = value.map((item) => {
      if (typeof item === "object" && item !== null) {
        const entries = Object.entries(item).map(([k, v]) => {
          if (k === "icon" && typeof v === "string" && LUCIDE_ICON_MAP[v]) {
            return `${k}: <${v} className="h-4 w-4" />`;
          }
          return `${k}: ${JSON.stringify(v)}`;
        });
        return `{ ${entries.join(", ")} }`;
      }
      return JSON.stringify(item);
    });
    return `${key}={[\n${indent}  ${formattedItems.join(`,\n${indent}  `)}\n${indent}]}`;
  }
  if (typeof value === "object" && value !== null) {
    return `${key}={${JSON.stringify(value, null, 2)}}`;
  }
  return "";
}

/**
 * Recursively generates JSX for a node
 */
function emitNodeJSX(
  node: DesignASTNode,
  ast: DesignAST,
  depth: number,
  indentStr: string
): string {
  const currentIndent = indentStr.repeat(depth);
  const childIndent = indentStr.repeat(depth + 1);

  // 1. Text Node
  if (
    node.kind === "text" ||
    (node.text !== undefined && !node.component && (!node.children || node.children.length === 0))
  ) {
    const Tag = node.name || "span";
    const { className, style } = mergeStyles(
      node.layout,
      node.styleBindings,
      typeof node.props?.className === "string" ? node.props.className : undefined,
      node.props?.style as React.CSSProperties
    );

    const classAttr = className ? ` className="${className}"` : "";
    const styleAttr =
      Object.keys(style).length > 0
        ? ` style={${JSON.stringify(style)}}`
        : "";

    const textContent =
      node.text ?? (typeof node.props?.text === "string" ? node.props.text : "");

    return `${currentIndent}<${Tag}${classAttr}${styleAttr}>${textContent}</${Tag}>`;
  }

  // 2. Container Node
  const isContainer =
    node.kind === "container" ||
    (!node.component &&
      (!node.name ||
        ["stack", "vstack", "hstack", "row", "col", "column", "grid", "box", "div", "container"].includes(
          node.name.toLowerCase()
        )));

  if (isContainer) {
    const Tag =
      node.name && !["stack", "vstack", "hstack", "row", "col", "column", "grid", "box", "container"].includes(node.name.toLowerCase())
        ? node.name
        : "div";

    const { className, style } = mergeStyles(
      node.layout,
      node.styleBindings,
      typeof node.props?.className === "string" ? node.props.className : undefined,
      node.props?.style as React.CSSProperties
    );

    const classAttr = className ? ` className="${className}"` : "";
    const styleAttr =
      Object.keys(style).length > 0
        ? ` style={${JSON.stringify(style)}}`
        : "";

    // Children & Slots
    const childPieces: string[] = [];

    // Slots
    if (node.slots) {
      if (node.slots.header) {
        const headerNodes = Array.isArray(node.slots.header) ? node.slots.header : [node.slots.header];
        childPieces.push(
          `${childIndent}<div className="kilo-slot-header w-full">\n${headerNodes
            .map((c) => emitNodeJSX(c, ast, depth + 2, indentStr))
            .join("\n")}\n${childIndent}</div>`
        );
      }
      if (node.slots.content) {
        const contentNodes = Array.isArray(node.slots.content) ? node.slots.content : [node.slots.content];
        childPieces.push(
          contentNodes.map((c) => emitNodeJSX(c, ast, depth + 1, indentStr)).join("\n")
        );
      }
    }

    // Children
    if (node.children) {
      node.children.forEach((c) => {
        childPieces.push(emitNodeJSX(c, ast, depth + 1, indentStr));
      });
    }

    // Text inside container
    if (node.text) {
      childPieces.push(`${childIndent}${node.text}`);
    }

    // Actions slot
    if (node.slots?.actions) {
      const actionNodes = Array.isArray(node.slots.actions) ? node.slots.actions : [node.slots.actions];
      childPieces.push(
        `${childIndent}<div className="kilo-slot-actions flex items-center gap-2">\n${actionNodes
          .map((c) => emitNodeJSX(c, ast, depth + 2, indentStr))
          .join("\n")}\n${childIndent}</div>`
      );
    }

    // Footer slot
    if (node.slots?.footer) {
      const footerNodes = Array.isArray(node.slots.footer) ? node.slots.footer : [node.slots.footer];
      childPieces.push(
        `${childIndent}<div className="kilo-slot-footer w-full pt-2">\n${footerNodes
          .map((c) => emitNodeJSX(c, ast, depth + 2, indentStr))
          .join("\n")}\n${childIndent}</div>`
      );
    }

    if (childPieces.length === 0) {
      return `${currentIndent}<${Tag}${classAttr}${styleAttr} />`;
    }

    return `${currentIndent}<${Tag}${classAttr}${styleAttr}>\n${childPieces.join("\n")}\n${currentIndent}</${Tag}>`;
  }

  // 3. Primitive Component Node
  const rawPrimitiveName = (node.component || node.name || "").toLowerCase().trim();
  const meta = PRIMITIVE_IMPORT_MAP[rawPrimitiveName];
  const Tag = meta ? meta.exportName : "div";

  const { className, style } = mergeStyles(
    node.layout,
    node.styleBindings,
    typeof node.props?.className === "string" ? node.props.className : undefined,
    node.props?.style as React.CSSProperties
  );

  const propEntries: string[] = [];

  if (className) {
    propEntries.push(`className="${className}"`);
  }
  if (Object.keys(style).length > 0) {
    propEntries.push(`style={${JSON.stringify(style)}}`);
  }

  // Props
  if (node.props) {
    for (const [k, v] of Object.entries(node.props)) {
      if (k === "className" || k === "style") continue;
      const formatted = formatPropJSX(k, v, currentIndent);
      if (formatted) propEntries.push(formatted);
    }
  }

  // Slot Props (e.g. trigger={<Button>Open</Button>})
  if (node.slots) {
    for (const [slotName, slotContent] of Object.entries(node.slots)) {
      if (["trigger", "footer", "header"].includes(slotName)) {
        const slotNodes = Array.isArray(slotContent) ? slotContent : [slotContent];
        if (slotNodes.length === 1) {
          const innerJSX = emitNodeJSX(slotNodes[0], ast, depth + 1, indentStr).trim();
          propEntries.push(`${slotName}={${innerJSX}}`);
        } else if (slotNodes.length > 1) {
          const innerJSX = slotNodes
            .map((c) => emitNodeJSX(c, ast, depth + 2, indentStr))
            .join("\n");
          propEntries.push(
            `${slotName}={(\n${childIndent}<>\n${innerJSX}\n${childIndent}</>\n${currentIndent})}`
          );
        }
      }
    }
  }

  // Formatted Props string
  const propsStr = propEntries.length > 0 ? " " + propEntries.join(" ") : "";

  // Children and non-prop slots
  const childPieces: string[] = [];

  if (node.slots?.content) {
    const contentNodes = Array.isArray(node.slots.content) ? node.slots.content : [node.slots.content];
    contentNodes.forEach((c) => childPieces.push(emitNodeJSX(c, ast, depth + 1, indentStr)));
  }

  if (node.children) {
    node.children.forEach((c) => childPieces.push(emitNodeJSX(c, ast, depth + 1, indentStr)));
  }

  if (node.text) {
    childPieces.push(`${childIndent}${node.text}`);
  }

  if (childPieces.length === 0) {
    return `${currentIndent}<${Tag}${propsStr} />`;
  }

  return `${currentIndent}<${Tag}${propsStr}>\n${childPieces.join("\n")}\n${currentIndent}</${Tag}>`;
}

/**
 * Static TSX Code Generator
 *
 * Compiles a DesignAST into clean, standalone TypeScript React code
 */
export function emitTypeScriptSource(ast: DesignAST, options: EmitOptions = {}): string {
  const {
    componentName = sanitizeIdentifier(ast.meta?.title) || "GeneratedDesign",
    useClient = true,
    injectThemeStyles = true,
    indent = 2,
  } = options;

  const indentStr = " ".repeat(indent);
  const scan = scanAST(ast.root);

  // Group imports by module
  const importGroups: Record<string, Set<string>> = {};

  for (const primitive of scan.primitives) {
    const meta = PRIMITIVE_IMPORT_MAP[primitive];
    if (meta) {
      if (!importGroups[meta.modulePath]) {
        importGroups[meta.modulePath] = new Set();
      }
      importGroups[meta.modulePath].add(meta.exportName);
    }
  }

  // Build Import Statements
  const lines: string[] = [];

  if (useClient) {
    lines.push('"use client";\n');
  }

  // React imports
  const reactHooks: string[] = [];
  if (scan.hasMobileBottomSheet || scan.hasSegmentController || scan.hasSwitch) {
    reactHooks.push("useState");
  }
  if (scan.hasPullToRefresh) {
    reactHooks.push("useCallback");
  }

  if (reactHooks.length > 0) {
    lines.push(`import * as React from "react";`);
    lines.push(`import { ${reactHooks.join(", ")} } from "react";`);
  } else {
    lines.push(`import * as React from "react";`);
  }

  // Lucide Icons
  if (scan.icons.size > 0) {
    const iconNames = Array.from(scan.icons).sort().join(", ");
    lines.push(`import { ${iconNames} } from "lucide-react";`);
  }

  // Primitive Component imports
  for (const [modulePath, exportNames] of Object.entries(importGroups)) {
    const sortedNames = Array.from(exportNames).sort().join(", ");
    lines.push(`import { ${sortedNames} } from "${modulePath}";`);
  }

  lines.push("");

  // Material 3 CSS Variables Theme definition
  if (injectThemeStyles) {
    const tokens = resolveM3Tokens(ast);
    lines.push("const themeTokens: React.CSSProperties = {");
    for (const [varName, varVal] of Object.entries(tokens)) {
      lines.push(`${indentStr}"${varName}": "${varVal}",`);
    }
    lines.push("} as React.CSSProperties;\n");
  }

  // Component definition
  lines.push(`export default function ${componentName}() {`);

  // Interactive hooks inside component body
  if (scan.hasMobileBottomSheet) {
    lines.push(`${indentStr}const [isSheetOpen, setIsSheetOpen] = useState(false);`);
  }
  if (scan.hasSegmentController) {
    lines.push(`${indentStr}const [selectedSegment, setSelectedSegment] = useState("all");`);
  }
  if (scan.hasSwitch) {
    lines.push(`${indentStr}const [isToggled, setIsToggled] = useState(false);`);
  }
  if (scan.hasPullToRefresh) {
    lines.push(
      `${indentStr}const handleRefresh = useCallback(async () => {\n${indentStr}${indentStr}await new Promise((r) => setTimeout(r, 1000));\n${indentStr}}, []);`
    );
  }

  if (
    scan.hasMobileBottomSheet ||
    scan.hasSegmentController ||
    scan.hasSwitch ||
    scan.hasPullToRefresh
  ) {
    lines.push("");
  }

  // Viewport container constraint
  const viewportClass =
    ast.meta?.viewport === "mobile"
      ? "max-w-[420px] mx-auto "
      : ast.meta?.viewport === "tablet"
      ? "max-w-[768px] mx-auto "
      : "";

  const containerClass = `kilo-m3-container ${viewportClass}w-full min-h-screen p-4 font-sans antialiased text-[var(--md-sys-color-on-surface)] bg-[var(--md-sys-color-surface)]`.trim();

  lines.push(`${indentStr}return (`);
  if (injectThemeStyles) {
    lines.push(`${indentStr}${indentStr}<div className="${containerClass}" style={themeTokens}>`);
  } else {
    lines.push(`${indentStr}${indentStr}<div className="${containerClass}">`);
  }

  // Root JSX
  const rootJSX = emitNodeJSX(ast.root, ast, 3, indentStr);
  lines.push(rootJSX);

  lines.push(`${indentStr}${indentStr}</div>`);
  lines.push(`${indentStr});`);
  lines.push("}\n");

  return lines.join("\n");
}

/**
 * Sanitizes titles into valid JavaScript identifier names
 */
function sanitizeIdentifier(name?: string): string {
  if (!name) return "";
  const cleaned = name.replace(/[^a-zA-Z0-9_]/g, " ").trim();
  const pascal = cleaned
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return pascal;
}

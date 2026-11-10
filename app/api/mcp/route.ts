import { NextRequest, NextResponse } from "next/server";
import { REGISTRY_DATA, RegistryItem } from "@/registry/registry-data";
import { calculateM3Palette } from "@/lib/m3/palette";
import { validateDesignAST } from "@/lib/ast/validator";

// ─── Authoritative Tool Definitions ──────────────────────────────────────────
const MCP_TOOLS = [
  {
    name: "list_kilo_primitives",
    description:
      "Query registered Kilo UI component primitives and their variants. Returns component metadata, categories, variant names, and descriptions.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            'Filter by category (e.g. "Actions", "Forms & Inputs", "Overlays", "Data Display", "Navigation", "Media & Layout", "Backgrounds & Shaders", "Cursors", "Mobile App"). If omitted, returns all primitives.',
        },
      },
      required: [],
    },
  },
  {
    name: "get_primitive_schema",
    description:
      "Retrieve full authoritative schema, variants, props, and design constraints for a named Kilo UI primitive.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description:
            'Exact primitive name (e.g. "button", "dialog", "toast-stack", "dynamic-island-banner", "mobile-bottom-sheet").',
        },
      },
      required: ["name"],
    },
  },
  {
    name: "calculate_m3_palette",
    description:
      "Calculate complete Material 3 tonal palettes, semantic light/dark schemes, and --md-sys-color-* CSS variables from a hex seed color.",
    inputSchema: {
      type: "object",
      properties: {
        seed: {
          type: "string",
          description: 'Seed color hex code (e.g. "#5CA904", "#6750A4").',
        },
      },
      required: ["seed"],
    },
  },
  {
    name: "validate_design_ast",
    description:
      "Validate a declarative design AST against Kilo UI component schemas, prop types, variants, and strict monochrome aesthetic guardrails.",
    inputSchema: {
      type: "object",
      properties: {
        ast: {
          type: "object",
          description: "Declarative design AST document conforming to the Kilo UI schema.",
        },
        strict_aesthetics: {
          type: "boolean",
          description:
            "Enforce strict aesthetic guardrails (reject neon glows, green pulsing dots, rainbow gradients). Defaults to true.",
        },
      },
      required: ["ast"],
    },
  },
];

const MCP_RESOURCES = [
  {
    uri: "kilo://registry/catalog",
    name: "Kilo UI Primitive Catalog",
    description: "Complete machine-readable catalog of all registered primitives.",
    mimeType: "application/json",
  },
  {
    uri: "m3://guidelines/surface-hierarchy",
    name: "Material 3 Surface Elevation Guidelines",
    description: "Surface container elevation hierarchy guidelines.",
    mimeType: "application/json",
  },
];

const MCP_PROMPTS = [
  {
    name: "kilo_m3_architect",
    description: "System instructions for the Kilo UI + Material 3 UI Architect agent.",
  },
  {
    name: "section_composition_pattern",
    description: "Composition patterns for hero sections, dashboards, and mobile overlays.",
  },
];

// ─── Dispatch RPC Request ───────────────────────────────────────────────────
function handleRpc(body: any): any {
  const { id, method, params } = body;

  switch (method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: { listChanged: false },
            resources: { listChanged: false },
            prompts: { listChanged: false },
          },
          serverInfo: {
            name: "kilo-ui-hosted",
            version: "1.38.10",
          },
        },
      };

    case "notifications/initialized":
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: MCP_TOOLS,
        },
      };

    case "tools/call": {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === "list_kilo_primitives") {
        const categoryFilter = args?.category?.toLowerCase();
        const items = Object.values(REGISTRY_DATA).filter((item) =>
          categoryFilter ? item.category.toLowerCase() === categoryFilter : true
        );
        const catalog = items.map((i) => ({
          name: i.name,
          title: i.title,
          category: i.category,
          variants: i.variants || ["default"],
          description: i.description,
          dependencies: i.dependencies,
        }));
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({ count: catalog.length, primitives: catalog }, null, 2),
              },
            ],
          },
        };
      }

      if (toolName === "get_primitive_schema") {
        const rawName = String(args?.name || "").toLowerCase().trim();
        const item = REGISTRY_DATA[rawName];
        if (!item) {
          const available = Object.keys(REGISTRY_DATA);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [
                {
                  type: "text",
                  text: `Primitive "${rawName}" not found in registry. Available: ${available.slice(0, 10).join(", ")}... (${available.length} total)`,
                },
              ],
            },
          };
        }
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    name: item.name,
                    title: item.title,
                    category: item.category,
                    variants: item.variants || ["default"],
                    description: item.description,
                    dependencies: item.dependencies,
                    schema: {
                      slots: ["header", "content", "footer"],
                      design_rules: [
                        "Subtle 1px border with var(--border)",
                        "Neutral surface container backgrounds",
                        "No green pulse dots or glowing neon drop shadows",
                      ],
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          },
        };
      }

      if (toolName === "calculate_m3_palette") {
        const seed = String(args?.seed || "#5CA904");
        try {
          const palette = calculateM3Palette(seed);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [{ type: "text", text: JSON.stringify(palette, null, 2) }],
            },
          };
        } catch (err: any) {
          return {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [{ type: "text", text: `Error calculating M3 palette: ${err?.message}` }],
            },
          };
        }
      }

      if (toolName === "validate_design_ast") {
        const ast = args?.ast;
        const strict = args?.strict_aesthetics !== false;
        if (!ast) {
          return {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [{ type: "text", text: "Missing required argument 'ast'." }],
            },
          };
        }
        const validation = validateDesignAST(ast, { strictAesthetics: strict, autoRepair: true });
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(validation, null, 2) }],
          },
        };
      }

      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool "${toolName}" not found.` },
      };
    }

    case "resources/list":
      return {
        jsonrpc: "2.0",
        id,
        result: { resources: MCP_RESOURCES },
      };

    case "resources/read": {
      const uri = params?.uri;
      if (uri === "kilo://registry/catalog") {
        const items = Object.values(REGISTRY_DATA);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify({ count: items.length, primitives: items }, null, 2),
              },
            ],
          },
        };
      }
      if (uri === "m3://guidelines/surface-hierarchy") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            contents: [
              {
                uri,
                mimeType: "application/json",
                text: JSON.stringify(
                  {
                    title: "Material 3 Surface Elevation Hierarchy",
                    levels: [
                      { level: 0, role: "surface", tone_dark: 6, tone_light: 98 },
                      { level: 1, role: "surface-container-low", tone_dark: 10, tone_light: 96 },
                      { level: 2, role: "surface-container", tone_dark: 12, tone_light: 94 },
                      { level: 3, role: "surface-container-high", tone_dark: 17, tone_light: 92 },
                      { level: 4, role: "surface-container-highest", tone_dark: 22, tone_light: 90 },
                    ],
                  },
                  null,
                  2
                ),
              },
            ],
          },
        };
      }
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: `Resource "${uri}" not found.` },
      };
    }

    case "prompts/list":
      return {
        jsonrpc: "2.0",
        id,
        result: { prompts: MCP_PROMPTS },
      };

    default:
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method "${method}" not recognized.` },
      };
  }
}

// ─── HTTP POST Handler (Streamable HTTP / JSON-RPC) ──────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (Array.isArray(body)) {
      const responses = body.map((single) => handleRpc(single));
      return NextResponse.json(responses, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    const response = handleRpc(body);
    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: `Parse error: ${err?.message}` },
      },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
  }
}

// ─── HTTP GET Handler (SSE or Info) ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const accept = req.headers.get("accept") || "";

  // If client requests text/event-stream, return an SSE handshake
  if (accept.includes("text/event-stream")) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`event: endpoint\ndata: /api/mcp\n\n`));
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Standard JSON response describing the hosted MCP server
  return NextResponse.json(
    {
      name: "kilo-ui-hosted-mcp",
      version: "1.38.10",
      description: "Official Kilo UI Hosted Model Context Protocol (MCP) Server",
      protocolVersion: "2024-11-05",
      transports: ["streamable-http", "sse", "http-post"],
      endpoints: {
        http: "/api/mcp",
        sse: "/api/mcp",
      },
      tools: MCP_TOOLS.map((t) => t.name),
      resources: MCP_RESOURCES.map((r) => r.uri),
      usage: {
        cursor: {
          mcpServers: {
            "kilo-ui": {
              url: "https://www.kiloui.dev/api/mcp",
            },
          },
        },
        claude_desktop: {
          mcpServers: {
            "kilo-ui": {
              command: "npx",
              args: ["-y", "mcp-remote", "https://www.kiloui.dev/api/mcp"],
            },
          },
        },
      },
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}

// ─── CORS Preflight ──────────────────────────────────────────────────────────
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
      "Access-Control-Max-Age": "86400",
    },
  });
}

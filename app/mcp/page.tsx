"use client";

import * as React from "react";
import { Copy, Check, Terminal, Cpu, Zap, Database } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────
type ClientId = "claude" | "cursor" | "vscode" | "windsurf" | "antigravity";

interface ClientConfig {
  id: ClientId;
  label: string;
  configPath: string;
  stdioJson: string;
  sseJson: string;
  steps: string[];
}

// ─── Config Data ─────────────────────────────────────────────────────────────
const CLIENTS: ClientConfig[] = [
  {
    id: "claude",
    label: "Claude Desktop",
    configPath: "~/.config/Claude/claude_desktop_config.json",
    stdioJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/path/to/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    }
  }
}`,
    sseJson: `{
  "mcpServers": {
    "kilo-ui-sse": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:8000/sse"]
    }
  }
}`,
    steps: [
      "Open Claude Desktop → Settings → Developer → Edit Config",
      "Paste the mcpServers block, replacing /path/to/kiloUI with your local clone path",
      "Restart Claude Desktop — the tool icon confirms connection",
    ],
  },
  {
    id: "cursor",
    label: "Cursor",
    configPath: ".cursor/mcp.json",
    stdioJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/path/to/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    },
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    sseJson: `{
  "mcpServers": {
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    steps: [
      "Save to .cursor/mcp.json in your workspace root",
      "Open Cursor Settings → Features → MCP Servers",
      "Click Refresh — a status indicator confirms connection",
    ],
  },
  {
    id: "vscode",
    label: "VS Code",
    configPath: ".vscode/settings.json",
    stdioJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "\${workspaceFolder}/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "\${workspaceFolder}"
      }
    },
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    sseJson: `{
  "mcpServers": {
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    steps: [
      "Save to .vscode/settings.json (or .vscode/mcp.json for Cline / Roo Code)",
      "Open the extension's MCP tab",
      "Verify tools: list_kilo_primitives, calculate_m3_palette are listed",
    ],
  },
  {
    id: "windsurf",
    label: "Windsurf",
    configPath: "~/.codeium/windsurf/mcp_config.json",
    stdioJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/path/to/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    },
    "kilo-ui-sse": {
      "serverUrl": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    sseJson: `{
  "mcpServers": {
    "kilo-ui-sse": {
      "serverUrl": "http://127.0.0.1:8000/sse"
    }
  }
}`,
    steps: [
      "Save to ~/.codeium/windsurf/mcp_config.json or .windsurf/mcp_config.json",
      "Press Ctrl+Shift+P → Developer: Reload Window",
      "Windsurf's AI panel will show Kilo UI in connected tools",
    ],
  },
  {
    id: "antigravity",
    label: "Antigravity",
    configPath: "~/.gemini/config/mcp_config.json",
    stdioJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/path/to/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    },
    "kilo-ui-streamable-http": {
      "url": "http://127.0.0.1:8000/mcp"
    }
  }
}`,
    sseJson: `{
  "mcpServers": {
    "kilo-ui-streamable-http": {
      "url": "http://127.0.0.1:8000/mcp"
    }
  }
}`,
    steps: [
      "Merge into ~/.gemini/config/mcp_config.json",
      "Antigravity natively supports Streamable HTTP — use the /mcp endpoint",
      "Restart the agent. kilo-ui tools will appear in your tool list",
    ],
  },
];

// ─── Capability Cards ─────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: Database,
    title: "Registry Access",
    description:
      "61 primitives across 9 categories. Query schemas, variants, and props with list_kilo_primitives.",
  },
  {
    icon: Cpu,
    title: "M3 Token Engine",
    description:
      "Calculate full Material 3 palettes from any hex seed — light, dark, semantic color roles.",
  },
  {
    icon: Zap,
    title: "AST Validation",
    description:
      "Validate declarative design trees before compilation. Catches invalid props and style violations.",
  },
];

// ─── CopyButton ───────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-medium transition-all duration-150",
        copied
          ? "text-[var(--text-primary)] bg-[var(--surface-secondary)]"
          : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
      )}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3 w-3" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── CodePanel ────────────────────────────────────────────────────────────────
function CodePanel({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--surface-primary)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/40">
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
          {label}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-xs font-mono text-[var(--text-secondary)] leading-relaxed overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MCPPage() {
  const [activeClient, setActiveClient] = React.useState<ClientId>("claude");
  const [transportMode, setTransportMode] = React.useState<"stdio" | "sse">(
    "stdio"
  );

  const client = CLIENTS.find((c) => c.id === activeClient)!;
  const activeCode =
    transportMode === "stdio" ? client.stdioJson : client.sseJson;

  const startCommand = `python3 -m server.cli --transport ${transportMode === "stdio" ? "stdio" : "sse --port 8000"}`;

  return (
    <div className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ── Header ── */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-medium text-[var(--text-muted)] tracking-widest uppercase">
              Model Context Protocol
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Connect your agent
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg">
            The Kilo UI MCP server exposes the full component registry, Material
            3 token generation, and AST validation to any MCP-compatible AI
            client — locally via stdio or over the network via SSE.
          </p>
        </div>

        {/* ── Capabilities ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CAPABILITIES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/30 space-y-3"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-secondary)]">
                <Icon className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                  {title}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Prerequisites ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Prerequisites
          </h2>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/30">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Terminal className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
              <span className="text-xs text-[var(--text-secondary)]">
                Clone the repo and install Python dependencies
              </span>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                {
                  cmd: "git clone https://github.com/your-org/kiloUI.git && cd kiloUI",
                  note: "Clone repo",
                },
                {
                  cmd: "pip install mcp materialyoucolor",
                  note: "Install MCP SDK + M3 palette engine",
                },
                {
                  cmd: startCommand,
                  note:
                    transportMode === "stdio"
                      ? "Start server — stdio (managed by IDE)"
                      : "Start server — SSE daemon on port 8000",
                },
              ].map(({ cmd, note }) => (
                <div key={cmd} className="space-y-1">
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">{note}</p>
                  <div className="flex items-center justify-between gap-3 font-mono text-xs text-[var(--text-secondary)] bg-[var(--surface-primary)] rounded px-3 py-2.5 border border-[var(--border)]">
                    <code className="truncate">{cmd}</code>
                    <CopyButton text={cmd} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Client Config ── */}
        <div className="space-y-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Client Configuration
          </h2>

          {/* Transport toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/30 w-fit">
            {(["stdio", "sse"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTransportMode(mode)}
                className={cn(
                  "px-3 py-1.5 rounded text-[11px] font-mono font-medium transition-all duration-150",
                  transportMode === mode
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                )}
              >
                {mode === "stdio" ? "stdio (local)" : "sse (network)"}
              </button>
            ))}
          </div>

          {/* Client tab strip */}
          <div className="flex flex-wrap gap-1">
            {CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClient(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-150",
                  activeClient === c.id
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Config path */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="text-[var(--text-muted)]/50">Config file →</span>
            <span className="text-[var(--text-secondary)]">
              {client.configPath}
            </span>
          </div>

          {/* JSON block */}
          <CodePanel code={activeCode} label="JSON Configuration" />

          {/* Steps */}
          <ol className="space-y-2">
            {client.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-[var(--text-secondary)]">
                <span className="shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[9px] font-semibold font-mono text-[var(--text-muted)]">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Available Tools ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Available Tools
          </h2>
          <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] overflow-hidden">
            {[
              {
                tool: "list_kilo_primitives",
                desc: "Returns all 61 registered components with categories and variant counts",
              },
              {
                tool: "get_primitive_schema",
                desc: "Returns full prop definitions, variants, slots, and design constraints for a named primitive",
              },
              {
                tool: "calculate_m3_palette",
                desc: "Generates a full Material 3 palette — HCT tones, semantic roles, CSS variables — from any hex seed",
              },
              {
                tool: "validate_design_ast",
                desc: "Validates a declarative design AST against the registry; flags invalid primitives and style violations",
              },
            ].map(({ tool, desc }) => (
              <div
                key={tool}
                className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 bg-[var(--surface-secondary)]/20 hover:bg-[var(--surface-secondary)]/40 transition-colors"
              >
                <code className="text-[11px] font-mono text-[var(--text-primary)] shrink-0 w-52">
                  {tool}
                </code>
                <span className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Resources ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            MCP Resources
          </h2>
          <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] overflow-hidden">
            {[
              { uri: "kilo://registry/catalog", desc: "Full component catalog" },
              {
                uri: "kilo://primitives/{name}",
                desc: "Individual primitive specification",
              },
              {
                uri: "m3://tokens/palette?seed={hex}",
                desc: "Material 3 token palette",
              },
              {
                uri: "m3://guidelines/surface-hierarchy",
                desc: "Surface elevation guidelines",
              },
            ].map(({ uri, desc }) => (
              <div
                key={uri}
                className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 bg-[var(--surface-secondary)]/20"
              >
                <code className="text-[11px] font-mono text-[var(--text-secondary)] shrink-0 w-52">
                  {uri}
                </code>
                <span className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-6">
          Full setup guide, reverse proxy configuration, systemd service, and
          troubleshooting steps in{" "}
          <a
            href="https://github.com/your-org/kiloUI/blob/main/docs/mcp/INTEGRATION_GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors"
          >
            docs/mcp/INTEGRATION_GUIDE.md
          </a>
          .
        </p>
      </div>
    </div>
  );
}

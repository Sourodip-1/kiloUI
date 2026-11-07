"use client";

import * as React from "react";
import { Copy, Check, Terminal, Cpu, Zap, Database, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────
type ConnectionMode = "cloud" | "npx" | "python";
type ClientId = "cursor" | "claude" | "vscode" | "windsurf" | "antigravity";

interface ClientSnippet {
  id: ClientId;
  label: string;
  configPath: string;
  cloudJson: string;
  npxJson: string;
  pythonJson: string;
  steps: {
    cloud: string[];
    npx: string[];
    python: string[];
  };
}

// ─── Authoritative Configurations ────────────────────────────────────────────
const CLIENTS: ClientSnippet[] = [
  {
    id: "cursor",
    label: "Cursor",
    configPath: ".cursor/mcp.json",
    cloudJson: `{
  "mcpServers": {
    "kilo-ui": {
      "url": "https://www.kiloui.dev/api/mcp"
    }
  }
}`,
    npxJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "@kilo-ui/cli", "mcp"]
    }
  }
}`,
    pythonJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": ["/path/to/kiloUI/server/mcp_server.py", "--transport", "stdio"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    }
  }
}`,
    steps: {
      cloud: [
        "Open .cursor/mcp.json in your workspace root (or Settings → Features → MCP Servers)",
        "Paste the kilo-ui block above pointing directly to the hosted server URL",
        "Click Refresh in Cursor's MCP panel — tools connect instantly with zero local processes",
      ],
      npx: [
        "Open .cursor/mcp.json in your workspace root",
        "Paste the npx command block — Cursor will spin up the stdio bridge on demand",
        "No git clone or python dependencies required",
      ],
      python: [
        "Clone the repository and install requirements: pip install mcp materialyoucolor",
        "Set /path/to/kiloUI to your local clone path in .cursor/mcp.json",
        "Restart Cursor or click Refresh in MCP Settings",
      ],
    },
  },
  {
    id: "claude",
    label: "Claude Desktop",
    configPath: "~/.config/Claude/claude_desktop_config.json",
    cloudJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://www.kiloui.dev/api/mcp"]
    }
  }
}`,
    npxJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "@kilo-ui/cli", "mcp"]
    }
  }
}`,
    pythonJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": ["/path/to/kiloUI/server/mcp_server.py", "--transport", "stdio"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    }
  }
}`,
    steps: {
      cloud: [
        "Open Claude Desktop → Settings → Developer → Edit Config",
        "Paste the mcpServers configuration using the lightweight mcp-remote proxy",
        "Restart Claude Desktop — all Kilo UI tools will appear under the hammer icon",
      ],
      npx: [
        "Open Claude Desktop Settings → Developer → Edit Config",
        "Add the npx @kilo-ui/cli mcp command configuration",
        "Restart Claude Desktop",
      ],
      python: [
        "Clone the repository and run pip install mcp materialyoucolor",
        "Update the configuration with your local server path",
        "Restart Claude Desktop",
      ],
    },
  },
  {
    id: "vscode",
    label: "VS Code",
    configPath: ".vscode/settings.json",
    cloudJson: `{
  "mcpServers": {
    "kilo-ui": {
      "url": "https://www.kiloui.dev/api/mcp"
    }
  }
}`,
    npxJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "@kilo-ui/cli", "mcp"]
    }
  }
}`,
    pythonJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": ["\${workspaceFolder}/server/mcp_server.py", "--transport", "stdio"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "\${workspaceFolder}"
      }
    }
  }
}`,
    steps: {
      cloud: [
        "Open .vscode/settings.json (or .vscode/mcp.json if using Cline / Roo Code)",
        "Paste the remote URL configuration",
        "Check the MCP sidebar tab to confirm list_kilo_primitives is discovered",
      ],
      npx: [
        "Add the npx command configuration to .vscode/settings.json",
        "Reload the MCP extension",
      ],
      python: [
        "Set up the local workspace python environment and run the server script",
        "Reload VS Code",
      ],
    },
  },
  {
    id: "windsurf",
    label: "Windsurf",
    configPath: "~/.codeium/windsurf/mcp_config.json",
    cloudJson: `{
  "mcpServers": {
    "kilo-ui": {
      "serverUrl": "https://www.kiloui.dev/api/mcp"
    }
  }
}`,
    npxJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "@kilo-ui/cli", "mcp"]
    }
  }
}`,
    pythonJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": ["/path/to/kiloUI/server/mcp_server.py", "--transport", "stdio"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    }
  }
}`,
    steps: {
      cloud: [
        "Open ~/.codeium/windsurf/mcp_config.json (or .windsurf/mcp_config.json)",
        "Paste the remote serverUrl configuration",
        "Reload window (Ctrl+Shift+P → Developer: Reload Window) — Cascade AI connects immediately",
      ],
      npx: [
        "Paste the npx command into ~/.codeium/windsurf/mcp_config.json",
        "Reload window to activate",
      ],
      python: [
        "Install python packages and configure local path",
        "Reload window",
      ],
    },
  },
  {
    id: "antigravity",
    label: "Antigravity",
    configPath: "~/.gemini/config/mcp_config.json",
    cloudJson: `{
  "mcpServers": {
    "kilo-ui": {
      "url": "https://www.kiloui.dev/api/mcp"
    }
  }
}`,
    npxJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "npx",
      "args": ["-y", "@kilo-ui/cli", "mcp"]
    }
  }
}`,
    pythonJson: `{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": ["/path/to/kiloUI/server/mcp_server.py", "--transport", "stdio"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/path/to/kiloUI"
      }
    }
  }
}`,
    steps: {
      cloud: [
        "Add the entry to ~/.gemini/config/mcp_config.json",
        "Antigravity connects natively over HTTP POST / Streamable HTTP",
        "The agent will automatically use kilo-ui tools to construct and validate UI",
      ],
      npx: [
        "Configure the npx command in ~/.gemini/config/mcp_config.json",
        "Restart the agent session",
      ],
      python: [
        "Run the local Python server script via stdio or SSE",
        "Restart the agent session",
      ],
    },
  },
];

// ─── Capability Cards ─────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: Database,
    title: "Registry Discovery",
    description: "Access all 61 primitives across 9 categories with variants, props, and design rules.",
  },
  {
    icon: Cpu,
    title: "M3 Palette Engine",
    description: "Generate complete tonal palettes and --md-sys-color-* variables from any hex seed.",
  },
  {
    icon: Zap,
    title: "AST Validation",
    description: "Validate declarative design AST trees with strict monochrome aesthetic guardrails.",
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
        "flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-medium transition-all duration-150 cursor-pointer",
        copied
          ? "text-[var(--text-primary)] bg-[var(--surface-secondary)]"
          : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
      )}
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── CodePanel ────────────────────────────────────────────────────────────────
function CodePanel({ code, label }: { code: string; label: string }) {
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
  const [activeClient, setActiveClient] = React.useState<ClientId>("cursor");
  const [connMode, setConnMode] = React.useState<ConnectionMode>("cloud");
  const [showSelfHosted, setShowSelfHosted] = React.useState<boolean>(false);

  const client = CLIENTS.find((c) => c.id === activeClient)!;

  let activeCode = client.cloudJson;
  let activeSteps = client.steps.cloud;
  if (connMode === "npx") {
    activeCode = client.npxJson;
    activeSteps = client.steps.npx;
  } else if (connMode === "python") {
    activeCode = client.pythonJson;
    activeSteps = client.steps.python;
  }

  return (
    <div className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* ── Header ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-medium text-[var(--text-muted)] tracking-widest uppercase">
              Model Context Protocol
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Connect your AI agent
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
            Give Cursor, Claude Desktop, VS Code, Windsurf, or Antigravity direct access to the Kilo UI registry, Material 3 design tokens, and AST validation. No local repository cloning or background terminal required.
          </p>
        </div>

        {/* ── Capabilities ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CAPABILITIES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/30 space-y-2.5"
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

        {/* ── Connection Method Selector ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
              Choose Connection Method
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Mode 1: Cloud Server */}
            <button
              type="button"
              onClick={() => setConnMode("cloud")}
              className={cn(
                "p-4 rounded-lg border text-left transition-all duration-150 cursor-pointer space-y-1.5",
                connMode === "cloud"
                  ? "bg-[var(--surface-secondary)] border-[var(--text-muted)] shadow-xs"
                  : "bg-[var(--surface-secondary)]/20 border-[var(--border)] hover:border-[var(--text-muted)]/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[var(--text-primary)]" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    Cloud Server
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface-primary)]">
                  Recommended
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Zero installation. Just paste the URL into your IDE config. No terminal or Python process needed.
              </p>
            </button>

            {/* Mode 2: NPX One-Liner */}
            <button
              type="button"
              onClick={() => setConnMode("npx")}
              className={cn(
                "p-4 rounded-lg border text-left transition-all duration-150 cursor-pointer space-y-1.5",
                connMode === "npx"
                  ? "bg-[var(--surface-secondary)] border-[var(--text-muted)] shadow-xs"
                  : "bg-[var(--surface-secondary)]/20 border-[var(--border)] hover:border-[var(--text-muted)]/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[var(--text-primary)]" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    NPX One-Liner
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface-primary)]">
                  Zero clone
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Runs locally via npx without cloning the repository or installing Python dependencies.
              </p>
            </button>
          </div>
        </div>

        {/* ── Client Configuration Block ── */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
              Client Setup
            </h2>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-muted)]">
              <span>Endpoint:</span>
              <code className="text-[var(--text-secondary)] bg-[var(--surface-secondary)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                https://www.kiloui.dev/api/mcp
              </code>
            </div>
          </div>

          {/* Client tabs */}
          <div className="flex flex-wrap gap-1">
            {CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClient(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-150 cursor-pointer",
                  activeClient === c.id
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Config file path */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="text-[var(--text-muted)]/60">Config file:</span>
            <span className="text-[var(--text-secondary)]">{client.configPath}</span>
          </div>

          {/* Code panel */}
          <CodePanel
            code={activeCode}
            label={connMode === "cloud" ? "Remote URL Config" : "Local Stdio Config"}
          />

          {/* Steps */}
          <ol className="space-y-2">
            {activeSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-[var(--text-secondary)]">
                <span className="shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded border border-[var(--border)] bg-[var(--surface-secondary)] text-[9px] font-semibold font-mono text-[var(--text-muted)]">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Authoritative Tools ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Available Tools
          </h2>
          <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] overflow-hidden">
            {[
              {
                tool: "list_kilo_primitives",
                desc: "Returns all 61 registered components with categories, variants, and descriptions",
              },
              {
                tool: "get_primitive_schema",
                desc: "Returns full prop schemas, slot rules, variants, and design constraints for a named primitive",
              },
              {
                tool: "calculate_m3_palette",
                desc: "Calculates full Material 3 HCT tones, semantic light/dark schemes, and CSS variables from a hex seed",
              },
              {
                tool: "validate_design_ast",
                desc: "Validates declarative AST design trees against the registry; enforces clean monochrome guardrails",
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

        {/* ── Advanced: Self-Hosted Python FastMCP ── */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/20 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSelfHosted(!showSelfHosted)}
            className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-[var(--surface-secondary)]/40 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              {showSelfHosted ? (
                <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
              ) : (
                <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
              )}
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Advanced: Self-Hosted Python FastMCP Server
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              For local contributors & custom forks
            </span>
          </button>

          {showSelfHosted && (
            <div className="p-4 border-t border-[var(--border)] space-y-4">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If you are contributing to Kilo UI or running custom local components, you can run the official Python FastMCP server directly:
              </p>
              <div className="space-y-2">
                {[
                  {
                    label: "Install dependencies",
                    cmd: "pip install mcp materialyoucolor uvicorn starlette",
                  },
                  {
                    label: "Run local stdio server",
                    cmd: "python3 -m server.cli --transport stdio",
                  },
                  {
                    label: "Run local SSE daemon (port 8000)",
                    cmd: "python3 -m server.cli --transport sse --port 8000",
                  },
                ].map(({ label, cmd }) => (
                  <div key={cmd} className="space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{label}</span>
                    <div className="flex items-center justify-between gap-3 font-mono text-xs text-[var(--text-secondary)] bg-[var(--surface-primary)] rounded px-3 py-2 border border-[var(--border)]">
                      <code className="truncate">{cmd}</code>
                      <CopyButton text={cmd} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-[11px] text-[var(--text-muted)]">
          <span>Official MCP Specification 2024-11-05 Compliant</span>
          <a
            href="https://github.com/Sourodip-1/kiloUI/blob/main/docs/mcp/INTEGRATION_GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-2 transition-colors"
          >
            docs/mcp/INTEGRATION_GUIDE.md →
          </a>
        </div>
      </div>
    </div>
  );
}

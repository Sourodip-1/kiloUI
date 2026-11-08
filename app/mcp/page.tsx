"use client";

import * as React from "react";
import { Copy, Check, Terminal, Cpu, Zap, Database, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Client Definition Types ──────────────────────────────────────────────────
type ClientId = "cursor" | "claude" | "vscode" | "devin" | "antigravity";
type ConnectionMode = "cloud" | "npx" | "python";

interface ClientConfig {
  id: ClientId;
  label: string;
  configPath: string;
  themeColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeIconColor: string;
  cloudJson: string;
  npxJson: string;
  pythonJson: string;
  steps: {
    cloud: string[];
    npx: string[];
    python: string[];
  };
}

// ─── Official Brand Vector Icons ──────────────────────────────────────────────
function KiloLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className}>
      <path
        fill="#ffffff"
        d="m144.4 264.7l-5.6 12.1v106.2h-79.6v-251.1h79.6v110.6l56.8-110.6h92.9l-72 120.4 72 130.7h-92.9z"
      />
      <path fill="#a6d33d" d="m385.2 127.1h85.2l-73.8 261.1h-79.6z" />
    </svg>
  );
}

// Official Cursor Icon
function CursorLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/images/agents/cursor.png"
      alt="Cursor"
      className={cn(className, "object-contain select-none")}
    />
  );
}

// Official Claude Icon
function ClaudeLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/images/agents/claude.svg"
      alt="Claude"
      className={cn(className, "object-contain select-none")}
    />
  );
}

// Official VS Code Ribbon Icon
function VSCodeLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/images/agents/vscode.svg"
      alt="VS Code"
      className={cn(className, "object-contain select-none")}
    />
  );
}

// Official Devin Icon (devin.ai/icon.png)
function DevinLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/images/agents/devin.png"
      alt="Devin"
      className={cn(className, "object-contain rounded-full select-none")}
    />
  );
}

// Official Google Antigravity Icon (antigravity.google full-color)
function AntigravityLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <img
      src="/images/agents/antigravity.png"
      alt="Antigravity"
      className={cn(className, "object-contain select-none")}
    />
  );
}

// ─── Authoritative Configurations ────────────────────────────────────────────
const CLIENTS: ClientConfig[] = [
  {
    id: "cursor",
    label: "Cursor",
    configPath: ".cursor/mcp.json",
    themeColor: "#ffffff",
    badgeBg: "bg-[#141418]",
    badgeBorder: "border-white/15",
    badgeIconColor: "text-white",
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
    label: "Claude",
    configPath: "~/.config/Claude/claude_desktop_config.json",
    themeColor: "#D97757",
    badgeBg: "bg-[#1c1310]",
    badgeBorder: "border-[#D97757]/30",
    badgeIconColor: "text-white",
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
    themeColor: "#007acc",
    badgeBg: "bg-[#091522]",
    badgeBorder: "border-[#007acc]/30",
    badgeIconColor: "text-white",
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
    id: "devin",
    label: "Devin",
    configPath: "devin.json / MCP Settings",
    themeColor: "#10b981",
    badgeBg: "bg-[#0e1015]",
    badgeBorder: "border-white/15",
    badgeIconColor: "text-white",
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
        "Open Devin Settings → Integrations → MCP Servers",
        "Add a new server with endpoint: https://www.kiloui.dev/api/mcp",
        "Devin automatically discovers and imports Kilo UI primitives for your codebases",
      ],
      npx: [
        "Configure Devin's machine environment to run npx -y @kilo-ui/cli mcp",
        "Verify connectivity in the session environment tools list",
      ],
      python: [
        "Clone the repo in your Devin workspace and start server/mcp_server.py",
        "Devin interacts via local stdio",
      ],
    },
  },
  {
    id: "antigravity",
    label: "Antigravity",
    configPath: "~/.gemini/config/mcp_config.json",
    themeColor: "#3186FF",
    badgeBg: "bg-[#09090b]",
    badgeBorder: "border-white/15",
    badgeIconColor: "text-white",
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
    description: "Access 61 primitives across 9 categories with variants, props, and design rules.",
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

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
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
        "flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all duration-150 cursor-pointer select-none",
        copied
          ? "text-[var(--text-primary)] bg-[var(--surface-secondary)]"
          : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
      )}
      aria-label="Copy code"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

// ─── Code Panel ───────────────────────────────────────────────────────────────
function CodePanel({ code, label, onCopyPrompt }: { code: string; label: string; onCopyPrompt?: () => void }) {
  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--surface-primary)] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-secondary)]/40">
        <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {onCopyPrompt && (
            <button
              onClick={onCopyPrompt}
              className="text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            >
              Copy as prompt
            </button>
          )}
          <CopyButton text={code} label="Copy config" />
        </div>
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

  const renderClientIcon = (id: ClientId, className = "w-6 h-6") => {
    switch (id) {
      case "cursor":
        return <CursorLogoIcon className={className} />;
      case "claude":
        return <ClaudeLogoIcon className={className} />;
      case "vscode":
        return <VSCodeLogoIcon className={className} />;
      case "devin":
        return <DevinLogoIcon className={className} />;
      case "antigravity":
        return <AntigravityLogoIcon className={className} />;
    }
  };

  const handleCopyPrompt = () => {
    const prompt = `Connect Kilo UI to my agent via MCP:
Server endpoint: https://www.kiloui.dev/api/mcp
Tools available: list_kilo_primitives, get_primitive_schema, calculate_m3_palette, validate_design_ast
Resources: kilo://registry/catalog, m3://guidelines/surface-hierarchy
Please query the Kilo UI registry whenever composing components, ensuring zero neon drop shadows, no glowing green circles, and clean Material 3 surface hierarchy.`;
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">

        {/* ── Top Hero Bridge Split Badge (Inspired by 21st.dev) ── */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-3 p-2 rounded-full bg-[#131316] border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md">
            {/* Left Badge: Kilo UI */}
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#09090b] border border-white/15 shadow-inner"
              title="Kilo UI"
            >
              <KiloLogoIcon className="h-7 w-7" />
            </div>

            {/* Split Divider / Bridge Indicator */}
            <div className="h-5 w-px bg-white/15" />

            {/* Right Badge: Selected App Logo (Dynamic) */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full border shadow-inner transition-all duration-300 transform",
                client.badgeBg,
                client.badgeBorder,
                client.badgeIconColor
              )}
              title={`${client.label} Agent`}
            >
              {renderClientIcon(client.id, "h-7 w-7")}
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              Connect your AI agent to Kilo UI.
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Expose 61 primitives, Material 3 design tokens, and AST validation directly to your agent.
            </p>
          </div>
        </div>

        {/* ── Client Selection Bar (Segmented like 21st.dev) ── */}
        <div className="space-y-4">
          <div className="p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/30">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1">
              {CLIENTS.map((c) => {
                const isActive = activeClient === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveClient(c.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer select-none",
                      isActive
                        ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50 border border-transparent"
                    )}
                  >
                    <span className="shrink-0 flex items-center justify-center">
                      {renderClientIcon(c.id, "h-4 w-4")}
                    </span>
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Bar: Connection Mode Pills + Live Endpoint */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]/40">
              <button
                type="button"
                onClick={() => setConnMode("cloud")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer",
                  connMode === "cloud"
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)] shadow-2xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Cloud Server</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[var(--surface-primary)] border border-[var(--border)] text-[var(--text-muted)]">
                  Zero Install
                </span>
              </button>

              <button
                type="button"
                onClick={() => setConnMode("npx")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer",
                  connMode === "npx"
                    ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)] shadow-2xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                )}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>NPX One-Liner</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[var(--surface-primary)] border border-[var(--border)] text-[var(--text-muted)]">
                  Zero Clone
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
              <span>Endpoint:</span>
              <code className="text-[var(--text-secondary)] bg-[var(--surface-secondary)] px-2 py-0.5 rounded border border-[var(--border)]">
                https://www.kiloui.dev/api/mcp
              </code>
            </div>
          </div>
        </div>

        {/* ── Client Configuration Block ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-muted)]/60">Config target:</span>
              <span className="text-[var(--text-secondary)] font-medium">{client.configPath}</span>
            </div>
          </div>

          {/* Code block */}
          <CodePanel
            code={activeCode}
            label={connMode === "cloud" ? `${client.label} Cloud Configuration` : `${client.label} NPX Configuration`}
            onCopyPrompt={handleCopyPrompt}
          />

          {/* Numbered Setup Steps */}
          <ol className="space-y-2 pt-1">
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

        {/* ── Capabilities Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {CAPABILITIES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/25 space-y-2.5"
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

        {/* ── Authoritative Tools Table ── */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)]">
            Available Tools (4)
          </h2>
          <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] overflow-hidden">
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
                className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 bg-[var(--surface-secondary)]/15 hover:bg-[var(--surface-secondary)]/30 transition-colors"
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
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)]/20 overflow-hidden">
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

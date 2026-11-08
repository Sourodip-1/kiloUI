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
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

// Official Claude Icon (SimpleIcons)
function ClaudeLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
  );
}

// Official VS Code Ribbon Icon
function VSCodeLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
      />
    </svg>
  );
}

// Official Devin Icon (devin.ai)
function DevinLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 425 425" className={className} fill="currentColor">
      <path d="M70 159.333V91.3471C70 88.3592 71.594 85.5983 74.1816 84.1044L133.043 50.1205C135.631 48.6265 138.819 48.6265 141.407 50.1205L200.269 84.1044C202.856 85.5983 204.45 88.3592 204.45 91.3471V126.068C204.708 137.606 210.806 148.734 221.531 154.926C232.256 161.117 244.942 160.834 255.063 155.289L285.132 137.929C287.719 136.435 290.907 136.435 293.495 137.929L352.357 171.913C354.944 173.406 356.538 176.167 356.538 179.155V247.123C356.538 250.111 354.944 252.872 352.357 254.366L293.495 288.35C290.907 289.844 287.719 289.844 285.132 288.35L255.306 271.13C245.146 265.456 232.344 265.117 221.534 271.358C210.809 277.55 204.711 288.678 204.453 300.215V334.926C204.453 337.914 202.859 340.675 200.271 342.169L141.41 376.153C138.822 377.647 135.634 377.647 133.046 376.153L74.1845 342.169C71.5969 340.675 70.0028 337.914 70.0028 334.926V266.959C70.0029 263.971 71.5969 261.21 74.1845 259.716L133.046 225.732C135.634 224.238 138.822 224.238 141.41 225.732L171.547 243.132C181.656 248.638 194.306 248.906 205.005 242.729C215.815 236.488 221.922 225.231 222.088 213.595C221.83 202.057 215.732 189.737 205.008 183.545C194.283 177.353 181.597 177.636 171.476 183.181L141.269 200.72C138.67 202.229 135.461 202.228 132.864 200.716L74.1576 166.562C71.5835 165.065 70 162.311 70 159.333Z" />
    </svg>
  );
}

// Official Google Antigravity Icon (antigravity.google/press)
function AntigravityLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="currentColor">
      <path d="M144.248 149.062C151.748 154.688 162.998 150.938 152.685 140.625C121.748 110.625 128.31 28.125 89.8727 28.125C51.4352 28.125 57.9977 110.625 27.0602 140.625C15.8102 151.875 27.9977 154.688 35.4977 149.062C64.5602 129.375 62.6852 94.6875 89.8727 94.6875C117.06 94.6875 115.185 129.375 144.248 149.062Z" />
    </svg>
  );
}

// ─── Authoritative Configurations ────────────────────────────────────────────
const CLIENTS: ClientConfig[] = [
  {
    id: "cursor",
    label: "Cursor",
    configPath: ".cursor/mcp.json",
    themeColor: "#ffffff",
    badgeBg: "bg-[#18181b]",
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
    badgeBg: "bg-[#c25737]",
    badgeBorder: "border-[#ea8868]/40",
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
    badgeBg: "bg-[#0066b8]",
    badgeBorder: "border-[#40a9ff]/40",
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
    badgeBg: "bg-[#062419]",
    badgeBorder: "border-[#10b981]/35",
    badgeIconColor: "text-[#34d399]",
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
    badgeBg: "bg-[#141b36]",
    badgeBorder: "border-[#3186FF]/40",
    badgeIconColor: "text-[#82b1ff]",
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
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#09090b] border border-white/15 shadow-inner transition-transform hover:scale-105"
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
                    <span className={cn("shrink-0", isActive ? c.badgeIconColor : "text-[var(--text-muted)]")}>
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

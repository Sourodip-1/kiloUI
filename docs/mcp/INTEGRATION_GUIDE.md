# Kilo UI + Material 3 MCP Server Integration Guide

Comprehensive deployment, configuration, and integration manual for the **Kilo UI + Material 3 FastMCP Server**.

---

## Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Local vs. External Hosting Requirements](#2-local-vs-external-hosting-requirements)
3. [Step-by-Step Server Startup Guide](#3-step-by-step-server-startup-guide)
4. [Authoritative MCP Resources Reference](#4-authoritative-mcp-resources-reference)
5. [Authoritative MCP Tools Reference](#5-authoritative-mcp-tools-reference)
6. [Authoritative MCP Prompts Reference](#6-authoritative-mcp-prompts-reference)
7. [Cross-IDE Client Configuration Guide](#7-cross-ide-client-configuration-guide)
8. [Connection Verification & Troubleshooting](#8-connection-verification--troubleshooting)

---

## 1. Architectural Overview

The **Kilo UI + Material 3 FastMCP Server** provides an intelligent bridge between Model Context Protocol (MCP) clients—including **Claude Desktop**, **Cursor**, **VS Code**, **Windsurf**, and **Google Antigravity**—and the Kilo UI design system and React component registry.

Built with Python 3.10+ and Anthropic's official `mcp` SDK (`mcp.server.fastmcp`), the server exposes an authoritative component registry (61 primitives across 9 categories, including clean mobile primitives), dynamic Material 3 (M3) color token generation via Google Material Color Utilities (`materialyoucolor`), surface elevation hierarchy guidelines, and declarative Design Abstract Syntax Tree (AST) validation.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   External IDE Clients (Claude Desktop, Cursor, VS Code, Windsurf, Antigravity)  │
└──────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                               │ JSON-RPC 2.0
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             Python FastMCP Server (server/mcp_server.py)                         │
│                                                                                                  │
│   Transports:                                                                                    │
│   ├─ stdio             : Bidirectional standard I/O for direct IDE subprocesses                  │
│   ├─ sse               : Starlette/Uvicorn Server-Sent Events (/sse + /messages/)                │
│   └─ streamable-http   : Streamable HTTP POST/GET protocol (/mcp)                                │
│                                                                                                  │
│   Exposed Capabilities:                                                                          │
│   ├─ Resources (4)     : kilo://registry/catalog, kilo://primitives/{name},                      │
│   │                      m3://tokens/palette?seed={hex}, m3://guidelines/surface-hierarchy       │
│   ├─ Tools (4)         : list_kilo_primitives, get_primitive_schema,                             │
│   │                      calculate_m3_palette, validate_design_ast                               │
│   └─ Prompts (2)       : kilo_m3_architect, section_composition_pattern                          │
└───────────────┬───────────────────────────────┬──────────────────────────────────┬───────────────┘
                │                               │                                  │
                ▼                               ▼                                  ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐ ┌──────────────────────────────┐
│  Authoritative Registry       │ │  Material 3 Token Engine      │ │  Declarative AST Engine      │
│  ├─ registry/registry-data.ts │ │  ├─ HCT Color Space Solver    │ │  ├─ Structural Integrity     │
│  ├─ server/registry_loader.py │ │  ├─ CorePalette (Tones 0-100) │ │  ├─ Prop & Variant Checking  │
│  └─ 61 Registered Primitives  │ │  ├─ Light/Dark Semantic Roles │ │  └─ Monochrome Style Guard   │
│     (56 Web + 5 Mobile)       │ │  └─ CSS Custom Properties     │ │     (Flags glow/neon/pulse)  │
└───────────────────────────────┘ └───────────────────────────────┘ └──────────────────────────────┘
```

### Key Architectural Tenets

1. **Zero-Drift Registry Parsing**: The Python server reads `registry/registry-data.ts` directly via `server/registry_loader.py`, parsing the TypeScript constant into native Python dictionaries with sub-millisecond latency. Frontend component definitions and MCP server schemas remain synchronized at all times.
2. **Authoritative Material 3 Generation**: The M3 engine calculates full HCT color coordinates, 6 tonal palettes (`a1`, `a2`, `a3`, `n1`, `n2`, `error`) from tone 0 to 100, light and dark semantic color roles, 5 surface container elevation levels, and complete `--md-sys-color-*` CSS variables from any valid hex seed.
3. **Strict Aesthetic Monochrome Guardrails**: The AST validation engine enforces Kilo UI's design ethos: precision typography, 1px solid borders, and subtle neutral surface containers. Any attempt to introduce neon drop shadows, glowing circles, pulsing green dots, or rainbow gradients triggers automated warnings and actionable replacement suggestions.
4. **Universal Transport Flexibility**: Supports standard input/output (`stdio`) for local IDE processes, Server-Sent Events (`sse`) for networked IDE clients, and modern Streamable HTTP (`streamable-http`) for cloud environments and Google Antigravity.

---

## 2. Local vs. External Hosting Requirements

Depending on your team's workflow, the MCP server can be run as a **local child process** managed directly by your IDE, or as an **external network service** hosted on a workstation, internal server, or container cluster.

### Comparison Matrix

| Aspect | Local Subprocess (`stdio`) | External Service (`sse` / `streamable-http`) |
|---|---|---|
| **Lifecycle** | Spun up and terminated automatically by IDE | Managed independently via systemd, Docker, or CLI |
| **Transport** | Standard In/Out (Unix pipe / stdin/stdout) | HTTP / Server-Sent Events over TCP |
| **Port Requirement** | None (no network port bound) | Dedicated TCP port (e.g. `8000`) |
| **Concurrency** | Dedicated process per IDE window | Multi-client concurrency via Uvicorn/ASGI |
| **Remote Access** | Local machine only | Accessible across local network, VPN, or Internet |
| **Reverse Proxy** | Not applicable | NGINX, Caddy, or Cloudflare Tunnel recommended |
| **Ideal Clients** | Claude Desktop, local Cursor, VS Code | Shared team servers, Google Antigravity, Cloud IDEs |

---

### External Hosting Requirements

When hosting the server externally over `sse` or `streamable-http`:

#### 1. Network Interface & Port Binding
- **Local Testing**: Bind to `127.0.0.1` (`--host 127.0.0.1 --port 8000`) to prevent unauthorized network access.
- **Production / Container**: Bind to `0.0.0.0` (`--host 0.0.0.0 --port 8000`) inside Docker or behind a firewall/VPN. Never expose unauthenticated HTTP endpoints directly to the public internet.

#### 2. ASGI Server (Uvicorn)
The FastMCP SSE and Streamable HTTP transports use Starlette and Uvicorn under the hood. Uvicorn manages asynchronous event loops (`asyncio` / `anyio`) and handles concurrent client sessions.

#### 3. Reverse Proxy Configuration (SSE & Streaming Requirements)
SSE streams require an unbuffered HTTP connection. Standard reverse proxy configurations that buffer server responses will break real-time event delivery.

##### NGINX Production Configuration

```nginx
upstream kilo_mcp_backend {
    server 127.0.0.1:8000;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name mcp.internal.yourcompany.com;

    ssl_certificate     /etc/ssl/certs/mcp.crt;
    ssl_certificate_key /etc/ssl/private/mcp.key;

    # SSE endpoint: requires disabling proxy buffering
    location /sse {
        proxy_pass http://kilo_mcp_backend/sse;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Disable buffering for real-time SSE delivery
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        chunked_transfer_encoding on;
    }

    # Message posting endpoint for SSE sessions
    location /messages/ {
        proxy_pass http://kilo_mcp_backend/messages/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Streamable HTTP endpoint for Google Antigravity & modern clients
    location /mcp {
        proxy_pass http://kilo_mcp_backend/mcp;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_set_header Host $host;
        proxy_buffering off;
        proxy_read_timeout 3600s;
    }
}
```

##### Caddy Production Configuration

```caddy
mcp.internal.yourcompany.com {
    reverse_proxy 127.0.0.1:8000 {
        flush_interval -1
    }
}
```

#### 4. CORS (Cross-Origin Resource Sharing)
When IDE clients access the server from browser environments or web extensions, ensure CORS headers are permitted. FastMCP's internal Starlette application handles CORS for incoming preflight `OPTIONS` requests and sets `Access-Control-Allow-Origin: *` for development setups.

#### 5. Systemd Service Deployment
To run the server as a persistent background daemon on Linux:

Create `/etc/systemd/system/kilo-mcp.service`:

```ini
[Unit]
Description=Kilo UI + Material 3 FastMCP Server
After=network.target

[Service]
Type=simple
User=souro
WorkingDirectory=/home/souro/Documents/Codes/kiloUI
Environment=PYTHONUNBUFFERED=1
Environment=PYTHONPATH=/home/souro/Documents/Codes/kiloUI
ExecStart=/usr/bin/python3 server/mcp_server.py --transport sse --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now kilo-mcp.service
sudo systemctl status kilo-mcp.service
```

---

## 3. Step-by-Step Server Startup Guide

### Prerequisites

Ensure Python 3.10 or higher is installed with required dependencies:

```bash
# Verify Python version
python3 --version  # Output: Python 3.10+ (tested on Python 3.14.7)

# Install required packages (if not already installed)
pip install "mcp>=1.28.0" uvicorn starlette pydantic jsonschema materialyoucolor
```

---

### Transport Mode 1: stdio (Standard Input / Output)

The `stdio` transport is the primary protocol for IDE desktop applications (Claude Desktop, Cursor, VS Code, Windsurf) running on the same host. The IDE executes Python as a child subprocess and talks JSON-RPC 2.0 through standard I/O pipes.

#### Startup Command

```bash
# Run from repository root:
PYTHONPATH=. python3 server/mcp_server.py --transport stdio

# Or alternatively via module invocation:
python3 -m server.mcp_server --transport stdio
```

> **Note**: In `stdio` mode, the server will not print readable text to stdout; it awaits JSON-RPC input. To exit, send `EOF` (Ctrl+D) or terminate the process (Ctrl+C).

---

### Transport Mode 2: SSE (Server-Sent Events)

The `sse` transport starts a persistent HTTP server using Uvicorn. Clients establish an open HTTP GET stream to `/sse` to receive server notifications and send JSON-RPC requests via HTTP POST to `/messages/?session_id={id}`.

#### Startup Command

```bash
# Default binding (127.0.0.1:8000)
PYTHONPATH=. python3 server/mcp_server.py --transport sse --host 127.0.0.1 --port 8000

# Custom host and port
PYTHONPATH=. python3 server/mcp_server.py --transport sse --host 0.0.0.0 --port 9090
```

#### Endpoints
- **SSE Stream**: `http://127.0.0.1:8000/sse`
- **Session Messages**: `http://127.0.0.1:8000/messages/?session_id=<SESSION_ID>`

---

### Transport Mode 3: Streamable HTTP

The `streamable-http` transport provides a streamlined bidirectional HTTP streaming interface compliant with the latest MCP specification, ideal for **Google Antigravity** and modern remote agents.

#### Startup Command

```bash
# Default binding (127.0.0.1:8000)
PYTHONPATH=. python3 server/mcp_server.py --transport streamable-http --host 127.0.0.1 --port 8000
```

#### Endpoint
- **Streamable HTTP Endpoint**: `http://127.0.0.1:8000/mcp`

---

### CLI Reference

```
usage: mcp_server.py [-h] [--transport {stdio,sse,streamable-http}]
                     [--host HOST] [--port PORT]

Kilo UI + Material 3 FastMCP Server

options:
  -h, --help            Show this help message and exit
  --transport {stdio,sse,streamable-http}
                        Transport protocol to use (default: stdio)
  --host HOST           Host address to bind for SSE or Streamable HTTP (default: 127.0.0.1)
  --port PORT           Port number to bind for SSE or Streamable HTTP (default: 8000)
```

---

## 4. Authoritative MCP Resources Reference

The server exposes **4 authoritative resources** delivering component definitions, design tokens, and aesthetic rules.

### Summary Table

| Resource URI Template | MIME Type | Purpose | Parameters |
|---|---|---|---|
| `kilo://registry/catalog` | `application/json` | Catalog of all primitives grouped by category | None |
| `kilo://primitives/{name}` | `application/json` | Full schema, props, slots, and code files for a primitive | `name`: primitive name |
| `m3://tokens/palette?seed={hex}` | `application/json` | M3 tonal palettes, semantic roles, and CSS variables | `hex`: 3/6-digit hex color |
| `m3://guidelines/surface-hierarchy` | `application/json` | Surface container elevations & Kilo UI token mappings | None |

---

### Resource 1: `kilo://registry/catalog`

- **URI**: `kilo://registry/catalog`
- **MIME Type**: `application/json`
- **Description**: Returns the comprehensive index of all registered Kilo UI components, total primitive count, and supported categories.

#### Example Output

```json
{
  "name": "kilo-ui",
  "version": "0.3.0",
  "description": "Authoritative Kilo UI Component Registry",
  "total": 61,
  "total_primitives": 61,
  "categories": [
    "Actions",
    "Backgrounds & Shaders",
    "Cursors",
    "Data Display",
    "Forms & Inputs",
    "Media & Layout",
    "Mobile App",
    "Navigation",
    "Overlays"
  ],
  "primitives": [
    {
      "name": "button",
      "title": "Button",
      "category": "Actions",
      "description": "Interactive button control supporting 7 semantic variants, icon slots, loading spinners, and keyboard focus rings.",
      "variants": ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"]
    },
    {
      "name": "mobile-bottom-sheet",
      "title": "Mobile Bottom Sheet",
      "category": "Mobile App",
      "description": "Clean monochrome swipeable bottom sheet with gesture velocity tracking, snap points, and subtle M3 neutral surfaces.",
      "variants": ["default", "compact", "full-expand"]
    }
  ]
}
```

---

### Resource 2: `kilo://primitives/{name}`

- **URI Template**: `kilo://primitives/{name}`
- **MIME Type**: `application/json`
- **Description**: Returns the authoritative schema, property types, default values, slot definitions, design constraints, and implementation file content for any component.
- **Parameters**: `name` (string, case-insensitive, normalized e.g. `button`, `bottom-sheet`, `search-bar`, `mobile-bottom-sheet`).

#### Example Output (`kilo://primitives/button`)

```json
{
  "name": "button",
  "title": "Button",
  "category": "Actions",
  "description": "Interactive button control supporting 7 semantic variants, icon slots, loading spinners, and keyboard focus rings.",
  "variants": ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"],
  "dependencies": ["clsx", "tailwind-merge"],
  "registryDependencies": ["utils"],
  "props": [
    {
      "name": "variant",
      "type": "'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive' | 'link'",
      "defaultValue": "'default'",
      "description": "Visual hierarchy and semantic styling.",
      "required": false
    },
    {
      "name": "size",
      "type": "'sm' | 'md' | 'lg' | 'icon'",
      "defaultValue": "'md'",
      "description": "Touch target size and padding dimensions.",
      "required": false
    },
    {
      "name": "loading",
      "type": "boolean",
      "defaultValue": "false",
      "description": "Renders an accessible loading spinner and disables user interaction.",
      "required": false
    }
  ],
  "slots": ["leftIcon", "rightIcon", "children"],
  "allowedChildren": ["*"],
  "constraints": [
    "Maintain clean monochrome styling; do not add neon glowing drop shadows.",
    "Touch target must be at least 44x44px when rendered on mobile viewports."
  ],
  "files": [
    {
      "name": "button.tsx",
      "type": "components:ui",
      "content": "import * as React from 'react';\n..."
    }
  ]
}
```

#### Error Handling
If an unrecognized primitive is requested, the resource raises an actionable error containing close fuzzy matches:
```json
{
  "error": "Primitive 'serch-bar' not found. Did you mean: ['search-bar']?"
}
```

---

### Resource 3: `m3://tokens/palette?seed={hex}`

- **URI Template**: `m3://tokens/palette?seed={hex}`
- **MIME Type**: `application/json`
- **Description**: Generates Material 3 tonal palettes (tones 0–100), light and dark semantic color roles, 5 surface container elevation levels, and ready-to-inject CSS custom properties from any valid hex color.
- **Parameters**: `hex` (string, 3-digit or 6-digit hex format, with or without `#`, or URL-encoded `%23`).

#### Example Output (`m3://tokens/palette?seed=6750A4`)

```json
{
  "seed": "#6750a4",
  "hct": {
    "hue": 298.98,
    "chroma": 47.86,
    "tone": 40.08
  },
  "palettes": {
    "primary": {
      "0": "#000000",
      "10": "#22005d",
      "20": "#381e72",
      "40": "#6750a4",
      "80": "#cfbcff",
      "90": "#e9ddff",
      "100": "#ffffff"
    },
    "secondary": { "0": "#000000", "40": "#625b71", "80": "#cbc2db", "100": "#ffffff" },
    "tertiary": { "0": "#000000", "40": "#7e5260", "80": "#efb8c8", "100": "#ffffff" },
    "neutral": { "0": "#000000", "40": "#605d62", "90": "#e6e1e6", "100": "#ffffff" },
    "neutralVariant": { "0": "#000000", "40": "#605d66", "80": "#cac4d0", "100": "#ffffff" },
    "error": { "0": "#000000", "40": "#ba1a1a", "80": "#ffb4ab", "100": "#ffffff" }
  },
  "schemes": {
    "light": {
      "primary": "#6750a4",
      "onPrimary": "#ffffff",
      "primaryContainer": "#e9ddff",
      "onPrimaryContainer": "#22005d",
      "surface": "#fffbff",
      "onSurface": "#1c1b1e",
      "surfaceVariant": "#e7e0eb",
      "onSurfaceVariant": "#49454e",
      "surfaceContainerLowest": "#ffffff",
      "surfaceContainerLow": "#f7f2f7",
      "surfaceContainer": "#f2ecf1",
      "surfaceContainerHigh": "#ece7eb",
      "surfaceContainerHighest": "#e6e1e6",
      "outline": "#7a757f",
      "outlineVariant": "#cac4d0"
    },
    "dark": {
      "primary": "#cfbcff",
      "onPrimary": "#381e72",
      "primaryContainer": "#4f378a",
      "onPrimaryContainer": "#e9ddff",
      "surface": "#1c1b1e",
      "onSurface": "#e6e1e6",
      "surfaceVariant": "#49454e",
      "onSurfaceVariant": "#cac4d0",
      "surfaceContainerLowest": "#0f0e11",
      "surfaceContainerLow": "#1c1b1e",
      "surfaceContainer": "#201f22",
      "surfaceContainerHigh": "#2b292d",
      "surfaceContainerHighest": "#363438",
      "outline": "#948f99",
      "outlineVariant": "#49454e"
    }
  },
  "cssVariables": {
    "light": {
      "--md-sys-color-primary": "#6750a4",
      "--md-sys-color-on-primary": "#ffffff",
      "--md-sys-color-surface": "#fffbff",
      "--md-sys-color-surface-container": "#f2ecf1"
    },
    "dark": {
      "--md-sys-color-primary": "#cfbcff",
      "--md-sys-color-on-primary": "#381e72",
      "--md-sys-color-surface": "#1c1b1e",
      "--md-sys-color-surface-container": "#201f22"
    },
    "rootCss": ":root { --md-sys-color-primary: #6750a4; ... } .dark { --md-sys-color-primary: #cfbcff; ... }"
  }
}
```

---

### Resource 4: `m3://guidelines/surface-hierarchy`

- **URI**: `m3://guidelines/surface-hierarchy`
- **MIME Type**: `application/json`
- **Description**: Defines Material Design 3 surface elevations (Levels 0–5), container role mappings to Kilo UI design tokens, and aesthetic constraints.

#### Example Output

```json
{
  "version": "1.0.0",
  "surfaces": {
    "level_0": {
      "level": 0,
      "name": "Base Canvas / Page Body",
      "m3_role": "surface",
      "kilo_token": "--bg-main",
      "kilo_dark_value": "#090a0a",
      "kilo_light_value": "#f8f9fa",
      "elevation_dp": 0,
      "tailwind_class": "bg-[var(--bg-main)]"
    },
    "level_1": {
      "level": 1,
      "name": "Low Surface Container",
      "m3_role": "surface-container-low",
      "kilo_token": "--bg-sidebar",
      "kilo_dark_value": "#0d0e0e",
      "kilo_light_value": "#f1f2f3",
      "elevation_dp": 1,
      "tailwind_class": "bg-[var(--bg-sidebar)]"
    },
    "level_2": {
      "level": 2,
      "name": "Standard Surface Container / Elevated",
      "m3_role": "surface-container",
      "kilo_token": "--surface-elevated",
      "kilo_dark_value": "#141515",
      "kilo_light_value": "#ffffff",
      "elevation_dp": 2,
      "tailwind_class": "bg-[var(--surface-elevated)]"
    },
    "level_3": {
      "level": 3,
      "name": "High Surface Container / Secondary Surface",
      "m3_role": "surface-container-high",
      "kilo_token": "--surface-secondary",
      "kilo_dark_value": "#1b1c1c",
      "kilo_light_value": "#e9ebec",
      "elevation_dp": 6,
      "tailwind_class": "bg-[var(--surface-secondary)]"
    },
    "level_4": {
      "level": 4,
      "name": "Highest Surface Container / Modals & Sheets",
      "m3_role": "surface-container-highest",
      "kilo_token": "--surface-tertiary",
      "kilo_dark_value": "#222424",
      "kilo_light_value": "#dfdede",
      "elevation_dp": 8,
      "tailwind_class": "bg-[var(--surface-tertiary)]"
    }
  },
  "aesthetic_constraints": {
    "clean_monochrome_mandate": true,
    "prohibited_patterns": [
      "Glowing circles or neon blur drop shadows (e.g. shadow-[0_0_*] with saturated colors)",
      "Green pulsing dots (e.g. animate-ping with bright green accent)",
      "Rainbow, pastel, or multi-hue gradient backgrounds",
      "Harsh saturated neon accents as primary container fills"
    ],
    "required_patterns": [
      "Monochrome neutral palette with subtle M3 tonal shifts",
      "Precision 1px solid borders using --border or --border-subtle",
      "Subtle container elevation hierarchy (surface-container 1-5)",
      "Touch target dimensions >= 44x44px for thumb-friendly mobile ergonomics"
    ]
  }
}
```

---

## 5. Authoritative MCP Tools Reference

The server exposes **4 high-performance tools** callable by AI agents and IDE assistants.

---

### Tool 1: `list_kilo_primitives`

- **Purpose**: Retrieves a list of available Kilo UI primitives, optionally filtered by category.
- **Parameters**:
  - `category` *(string, optional)*: Filter by category (e.g. `"Actions"`, `"Forms & Inputs"`, `"Overlays"`, `"Data Display"`, `"Navigation"`, `"Media & Layout"`, `"Backgrounds & Shaders"`, `"Cursors"`, `"Mobile App"`). If omitted, returns all 61 primitives.
- **Returns**: `list[dict]` containing name, title, category, description, and supported variants.

#### Example Invocation

```json
{
  "name": "list_kilo_primitives",
  "arguments": {
    "category": "Mobile App"
  }
}
```

#### Example Response

```json
[
  {
    "name": "floating-action-dock",
    "title": "Floating Action Dock",
    "category": "Mobile App",
    "description": "Ergonomic bottom-anchored floating action dock with subtle M3 neutral surface.",
    "variants": ["default", "compact", "expanded"]
  },
  {
    "name": "mobile-bottom-sheet",
    "title": "Mobile Bottom Sheet",
    "category": "Mobile App",
    "description": "Clean monochrome swipeable bottom sheet with gesture velocity tracking.",
    "variants": ["default", "compact", "full-expand"]
  },
  {
    "name": "pull-to-refresh",
    "title": "Pull to Refresh",
    "category": "Mobile App",
    "description": "Rubber-band pull-to-refresh container with clean monochrome loading indicator.",
    "variants": ["default", "minimal"]
  },
  {
    "name": "swipe-action-card",
    "title": "Swipe Action Card",
    "category": "Mobile App",
    "description": "Mobile card with bidirectional swipe-to-reveal action drawers and spring physics.",
    "variants": ["default", "destructive-left", "archive-right"]
  },
  {
    "name": "thumb-segment-controller",
    "title": "Thumb Segment Controller",
    "category": "Mobile App",
    "description": "Thumb-friendly segmented controller with animated sliding pill indicator.",
    "variants": ["default", "pill", "underline"]
  }
]
```

---

### Tool 2: `get_primitive_schema`

- **Purpose**: Retrieves the detailed specification for a specific primitive, including TypeScript prop types, default values, slot definitions, variants, and design constraints.
- **Parameters**:
  - `name` *(string, required)*: The primitive name (e.g. `"button"`, `"thumb-segment-controller"`, `"card"`).
- **Returns**: `dict` containing complete primitive metadata.

#### Example Invocation

```json
{
  "name": "get_primitive_schema",
  "arguments": {
    "name": "thumb-segment-controller"
  }
}
```

#### Example Response

```json
{
  "name": "thumb-segment-controller",
  "title": "Thumb Segment Controller",
  "category": "Mobile App",
  "description": "Thumb-friendly segmented controller with animated sliding pill indicator.",
  "variants": ["default", "pill", "underline"],
  "props": [
    {
      "name": "options",
      "type": "Array<{ label: string; value: string; icon?: string }>",
      "description": "Segmented items to display in the control.",
      "required": true
    },
    {
      "name": "value",
      "type": "string",
      "description": "Currently selected option value.",
      "required": false
    },
    {
      "name": "onChange",
      "type": "(value: string) => void",
      "description": "Callback triggered upon option selection.",
      "required": false
    }
  ],
  "slots": ["leadingIcon", "trailingIcon"],
  "constraints": [
    "Strict clean monochrome styling.",
    "No neon glow or pulsing animations.",
    "Minimum touch target height of 44px."
  ]
}
```

---

### Tool 3: `calculate_m3_palette`

- **Purpose**: Generates Material 3 tonal palettes, light/dark color schemes, and CSS custom properties from a seed hex color.
- **Parameters**:
  - `seed` *(string, required)*: Seed hex color string (e.g. `"#6750A4"`, `"6750A4"`, `"#f0c"`).
  - `format` *(string, optional, default `"all"`)*: Output format (`"all"`, `"json"`, `"css"`, or `"tokens"`).
- **Returns**: `dict` containing tones, schemes, and CSS custom property definitions.

#### Example Invocation

```json
{
  "name": "calculate_m3_palette",
  "arguments": {
    "seed": "#737673",
    "format": "all"
  }
}
```

#### Example Response

```json
{
  "seed": "#737673",
  "hct": { "hue": 120.0, "chroma": 1.5, "tone": 49.0 },
  "schemes": {
    "light": {
      "primary": "#5b5f5b",
      "onPrimary": "#ffffff",
      "surface": "#f8f9f8",
      "onSurface": "#191c19",
      "surfaceContainer": "#edeeed"
    },
    "dark": {
      "primary": "#c3c8c2",
      "onPrimary": "#2d312d",
      "surface": "#111411",
      "onSurface": "#e1e3e0",
      "surfaceContainer": "#1d201d"
    }
  },
  "cssVariables": {
    "light": {
      "--md-sys-color-primary": "#5b5f5b",
      "--md-sys-color-surface": "#f8f9f8",
      "--md-sys-color-surface-container": "#edeeed"
    },
    "dark": {
      "--md-sys-color-primary": "#c3c8c2",
      "--md-sys-color-surface": "#111411",
      "--md-sys-color-surface-container": "#1d201d"
    }
  }
}
```

---

### Tool 4: `validate_design_ast`

- **Purpose**: Validates a declarative Design AST against primitive schemas, prop constraints, variant sets, and Kilo UI monochrome aesthetic rules.
- **Parameters**:
  - `ast` *(dict or JSON string, required)*: The declarative UI AST object.
- **Returns**: `dict` containing `valid` (boolean), `errors` (list), `warnings` (list), and `summary` (node counts and primitives used).

#### Validation Criteria Checked:
1. **Structural Integrity**: Valid `version` string, `meta` object, and `root` node.
2. **Registry Membership**: Every component node references an authoritative primitive registered in Kilo UI.
3. **Prop & Variant Validity**: Variants must match the component's registered variant list.
4. **Monochrome Style Guard**: Flags prohibited patterns:
   - Neon glow or drop-shadow blurs (`shadow-[0_0_*]`, `accentGlow`).
   - Pulsing status dots (`animate-pulse`, `bg-green-* animate-pulse`, `pulsing-green-dot`).
   - Saturated rainbow gradients (`bg-gradient-to-*`, `from-pink-*`, `to-purple-*`).

#### Example Invocation (Valid AST)

```json
{
  "name": "validate_design_ast",
  "arguments": {
    "ast": {
      "version": "1.0.0",
      "meta": { "id": "screen-1", "title": "Settings", "viewport": "mobile" },
      "root": {
        "id": "node-root",
        "kind": "container",
        "props": { "className": "p-4 bg-[var(--bg-main)]" },
        "children": [
          {
            "id": "node-btn",
            "kind": "component",
            "component": "button",
            "props": { "variant": "secondary" }
          }
        ]
      }
    }
  }
}
```

#### Example Response (Valid)

```json
{
  "valid": true,
  "errors": [],
  "warnings": [],
  "summary": {
    "total_nodes": 2,
    "primitives_used": ["button"]
  }
}
```

#### Example Invocation (Invalid AST with Violations)

```json
{
  "name": "validate_design_ast",
  "arguments": {
    "ast": {
      "version": "1.0.0",
      "meta": { "id": "screen-bad", "title": "Bad Design", "viewport": "mobile" },
      "root": {
        "id": "node-bad",
        "kind": "component",
        "component": "laser-cannon",
        "props": {
          "className": "shadow-[0_0_20px_#ff00ff] animate-pulse bg-green-500"
        }
      }
    }
  }
}
```

#### Example Response (Actionable Diagnostics)

```json
{
  "valid": false,
  "errors": [
    {
      "path": "root.component",
      "issue": "Unknown primitive 'laser-cannon' at 'root'.",
      "suggestion": "See kilo://registry/catalog for available primitives."
    }
  ],
  "warnings": [
    {
      "path": "root.props",
      "issue": "Prohibited glowing circle or neon shadow detected. Kilo UI enforces clean monochrome styling.",
      "suggestion": "Replace neon glows with subtle M3 neutral surface tokens (e.g. var(--surface-secondary))."
    },
    {
      "path": "root.props",
      "issue": "Prohibited pulsing green dot detected. Kilo UI avoids animated pulsing radars.",
      "suggestion": "Use subtle static indicators with var(--text-muted) or clean monochrome badges."
    }
  ],
  "summary": {
    "total_nodes": 1,
    "primitives_used": ["laser-cannon"]
  }
}
```

---

## 6. Authoritative MCP Prompts Reference

The server provides **2 pre-engineered system prompts** to guide LLMs and AI coding assistants in generating compliant UI designs.

---

### Prompt 1: `kilo_m3_architect`

- **Purpose**: System prompt instructing an AI model to act as the Kilo UI + Material 3 Architect, generating strongly typed declarative design ASTs complying with monochrome styling and M3 surface elevations.
- **Arguments**:
  - `task` *(string, required)*: Description of the screen or interface to design (e.g. `"Mobile checkout sheet with order summary and pay button"`).
  - `platform` *(string, optional, default `"mobile"`)*: Target viewport (`"mobile"`, `"tablet"`, or `"desktop"`).
  - `seed` *(string, optional, default `"#737673"`)*: Material 3 seed hex color.

#### Example Invocation
```json
{
  "name": "kilo_m3_architect",
  "arguments": {
    "task": "Mobile profile drawer with dark mode switch and logout action",
    "platform": "mobile",
    "seed": "#737673"
  }
}
```

#### Core Prompt Instructions Generated:
1. **Clean Monochrome Mandate**: Use high-contrast typography (`text-primary`, `text-secondary`) and neutral backgrounds; strictly omit glowing circles, green pulsing dots, and multi-hue gradients.
2. **M3 Surface Elevation**:
   - Level 0: `var(--bg-main)` (Canvas)
   - Level 1: `var(--surface-subtle)` (Low container grouping)
   - Level 2: `var(--surface-secondary)` (Standard cards and inputs)
   - Level 3: `var(--surface-elevated)` (Hover cards, dropdowns)
   - Level 4: `var(--surface-highest)` (Bottom sheets, modals)
3. **Mandatory AST Validation**: Prompts the LLM to call `validate_design_ast` prior to returning the final output.

---

### Prompt 2: `section_composition_pattern`

- **Purpose**: Provides structural layout templates and surface elevation blueprints for standard UI sections.
- **Arguments**:
  - `section_type` *(string, required)*: Section pattern (`"hero"`, `"features"`, `"auth"`, `"navigation"`, `"mobile-bottom-sheet"`, `"dashboard-card"`, `"mobile-feed"`).
  - `platform` *(string, optional, default `"mobile"`)*: Target viewport (`"mobile"`, `"tablet"`, or `"desktop"`).

#### Example Invocation
```json
{
  "name": "section_composition_pattern",
  "arguments": {
    "section_type": "mobile-bottom-sheet",
    "platform": "mobile"
  }
}
```

#### Core Blueprint Instructions Generated:
- Layout hierarchy (Root container → Backdrop scrim → Sheet chassis → Snap points → Action footer).
- Recommended primitives for the pattern (`mobile-bottom-sheet`, `floating-action-dock`, `thumb-segment-controller`).
- Elevation token mappings for each visual layer.

---

## 7. Cross-IDE Client Configuration Guide

The repository includes ready-to-use configuration files in `docs/mcp/` tailored for each major AI IDE.

### Configuration Files Summary

| IDE / Client | Local Example File | Config Destination on Host | Supported Transports |
|---|---|---|---|
| **Claude Desktop** | `docs/mcp/claude_desktop_config.json` | `~/.config/Claude/claude_desktop_config.json` (Linux)<br>`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) | stdio, SSE via `mcp-remote` |
| **Cursor** | `docs/mcp/cursor_mcp.json` | `.cursor/mcp.json` (workspace) or Global Cursor Settings | stdio, direct SSE (`url`) |
| **VS Code** | `docs/mcp/vscode_settings.json` | `.vscode/settings.json` or `.vscode/mcp.json` | stdio, direct SSE (`url`) |
| **Windsurf** | `docs/mcp/windsurf_mcp.json` | `~/.codeium/windsurf/mcp_config.json` or `.windsurf/mcp_config.json` | stdio, direct SSE (`serverUrl`) |
| **Google Antigravity** | `docs/mcp/antigravity_config.json` | `~/.gemini/config/mcp_config.json` | stdio, Streamable HTTP (`/mcp`), `mcp-remote` |

---

### 1. Claude Desktop

Claude Desktop executes local MCP servers via standard input/output (`stdio`). For remote SSE servers, Claude Desktop connects using the `mcp-remote` bridge.

File: `docs/mcp/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/home/souro/Documents/Codes/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/home/souro/Documents/Codes/kiloUI"
      }
    },
    "kilo-ui-sse": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://127.0.0.1:8000/sse"
      ]
    }
  }
}
```

#### Setup Steps:
1. Open Claude Desktop Settings → **Developer** → **Edit Config**.
2. Copy the `mcpServers` block from `docs/mcp/claude_desktop_config.json`.
3. Restart Claude Desktop. The hammer icon in the prompt input will display Kilo UI tools.

---

### 2. Cursor IDE

Cursor supports both direct `stdio` child processes and networked SSE endpoints natively.

File: `docs/mcp/cursor_mcp.json`

```json
{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/home/souro/Documents/Codes/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/home/souro/Documents/Codes/kiloUI"
      }
    },
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}
```

#### Setup Steps:
1. In the Kilo UI workspace, ensure `.cursor/mcp.json` contains this configuration (or navigate to Cursor **Settings** → **Features** → **MCP Servers**).
2. Click **Refresh** in Cursor's MCP panel. A green status indicator confirms connection.

---

### 3. Visual Studio Code (Official MCP / Cline / Roo Code)

In VS Code, MCP can be configured at workspace scope using `${workspaceFolder}` substitution variables.

File: `docs/mcp/vscode_settings.json`

```json
{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "${workspaceFolder}/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "${workspaceFolder}"
      }
    },
    "kilo-ui-sse": {
      "url": "http://127.0.0.1:8000/sse"
    }
  }
}
```

#### Setup Steps:
1. Save this configuration to `.vscode/settings.json` (or `.vscode/mcp.json` if using Cline/Roo Code).
2. Open the extension MCP tab and verify tools (`list_kilo_primitives`, `calculate_m3_palette`, etc.) are recognized.

---

### 4. Windsurf IDE (Codeium)

Windsurf supports stdio commands and SSE servers.

File: `docs/mcp/windsurf_mcp.json`

```json
{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/home/souro/Documents/Codes/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/home/souro/Documents/Codes/kiloUI"
      }
    },
    "kilo-ui-sse": {
      "serverUrl": "http://127.0.0.1:8000/sse"
    }
  }
}
```

#### Setup Steps:
1. Place this file in `~/.codeium/windsurf/mcp_config.json` or `.windsurf/mcp_config.json`.
2. Reload Windsurf window (Ctrl+Shift+P → *Developer: Reload Window*).

---

### 5. Google Antigravity (Gemini CLI / AGY Agent)

Google Antigravity natively supports **Streamable HTTP** endpoints (`/mcp`) for direct network connections without intermediate proxies, as well as `stdio` and `mcp-remote` bridges.

File: `docs/mcp/antigravity_config.json`

```json
{
  "mcpServers": {
    "kilo-ui": {
      "command": "python3",
      "args": [
        "/home/souro/Documents/Codes/kiloUI/server/mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "PYTHONPATH": "/home/souro/Documents/Codes/kiloUI"
      }
    },
    "kilo-ui-streamable-http": {
      "url": "http://127.0.0.1:8000/mcp"
    },
    "kilo-ui-remote-bridge": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://127.0.0.1:8000/mcp"
      ],
      "env": {}
    }
  }
}
```

#### Setup Steps:
1. Merge the configuration into `~/.gemini/config/mcp_config.json`.
2. When launching the server over Streamable HTTP:
   ```bash
   PYTHONPATH=. python3 server/mcp_server.py --transport streamable-http --host 127.0.0.1 --port 8000
   ```
3. The Antigravity agent discovers all tools and resources at `http://127.0.0.1:8000/mcp`.

---

## 8. Connection Verification & Troubleshooting

### Method 1: Verification with MCP Inspector

Anthropic's official MCP Inspector allows interactive browser testing of all tools, resources, and prompts over stdio or SSE.

```bash
# Verify stdio transport:
npx @modelcontextprotocol/inspector python3 /home/souro/Documents/Codes/kiloUI/server/mcp_server.py --transport stdio

# Verify SSE transport (launch server first on port 8000):
npx @modelcontextprotocol/inspector http://127.0.0.1:8000/sse
```

The inspector will open a browser window at `http://localhost:5173`. You can list resources, invoke `calculate_m3_palette`, and test `validate_design_ast` in real time.

---

### Method 2: Verification with Python Programmatic Test Harness

You can verify server functionality programmatically without an IDE using Python's `mcp.client.session.ClientSession`:

```python
import asyncio
from mcp.client.session import ClientSession
from mcp.client.stdio import StdioServerParameters, stdio_client

async def verify_kilo_server():
    server_params = StdioServerParameters(
        command="python3",
        args=["server/mcp_server.py", "--transport", "stdio"],
        env={"PYTHONPATH": ".", "PYTHONUNBUFFERED": "1"}
    )
    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            # 1. Initialize
            init_result = await session.initialize()
            print(f"Connected: {init_result.serverInfo.name} v{init_result.serverInfo.version}")

            # 2. List tools
            tools_response = await session.list_tools()
            tool_names = [t.name for t in tools_response.tools]
            print(f"Available Tools ({len(tool_names)}): {tool_names}")

            # 3. Call tool: calculate_m3_palette
            palette_call = await session.call_tool(
                "calculate_m3_palette",
                {"seed": "#6750A4", "format": "all"}
            )
            print(f"M3 Palette Seed: {palette_call.content[0].text[:60]}...")

            # 4. Read resource: kilo://registry/catalog
            catalog_res = await session.read_resource("kilo://registry/catalog")
            print(f"Catalog Resource Loaded: {len(catalog_res.contents[0].text)} bytes")

asyncio.run(verify_kilo_server())
```

Save as `test_client.py` and run:
```bash
python3 test_client.py
```

Expected output:
```
Connected: kilo-m3-server v...
Available Tools (4): ['list_kilo_primitives', 'get_primitive_schema', 'calculate_m3_palette', 'validate_design_ast']
M3 Palette Seed: {"seed": "#6750a4", "hct": {"hue": 298.98...
Catalog Resource Loaded: 21840 bytes
```

---

### Method 3: HTTP Endpoint Verification with `curl`

To check the SSE or Streamable HTTP server from the command line:

```bash
# 1. Check SSE handshake (will stream initial endpoint event)
curl -N -H "Accept: text/event-stream" http://127.0.0.1:8000/sse

# Expected output:
# event: endpoint
# data: /messages/?session_id=...

# 2. Check Streamable HTTP endpoint
curl -X POST http://127.0.0.1:8000/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'
```

---

### Troubleshooting Matrix

| Symptom | Probable Cause | Actionable Fix |
|---|---|---|
| `ModuleNotFoundError: No module named 'server'` when launching stdio | `PYTHONPATH` does not point to the repository root | Set `"PYTHONPATH": "/absolute/path/to/kiloUI"` in IDE config's `"env"` block or run with `PYTHONPATH=. python3 server/mcp_server.py`. |
| IDE hangs on connection or reports *"Server process closed before sending response"* | Unbuffered Python output not enabled | Add `"PYTHONUNBUFFERED": "1"` to IDE configuration `"env"` dictionary. |
| SSE connection connects but no events are delivered through NGINX | Reverse proxy buffering SSE events | Add `proxy_buffering off;` and `proxy_read_timeout 3600s;` in NGINX location block. |
| Resource `m3://tokens/palette?seed=6750A4` fails with ResourceNotFound in older FastMCP | Query parameter regex quantifier issue in FastMCP 1.28.0 | Verified resolved by the `_robust_resource_matches` adapter in `server/mcp_server.py`. |
| `calculate_m3_palette` fails with `ValueError: Invalid seed hex color` | Malformed hex code passed | Use 3 or 6 hex digits (e.g. `6750A4`, `#6750A4`, or URL-encoded `%236750a4`). |
| Port `8000` is already in use (`Errno 98 Address already in use`) | Another server instance is active | Kill old process (`lsof -i :8000`) or pass `--port <NEW_PORT>` (e.g. `--port 8008`). |
| `TypeError` when importing `theme_utils` from `materialyoucolor` | Upstream package missing `string_utils.py` | Verified resolved: `server/m3_palette.py` directly leverages `CorePalette`, `Scheme`, `Hct`, and `color_utils`. |

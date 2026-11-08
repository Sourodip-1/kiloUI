# Project: Kilo UI + Material 3 FastMCP Architecture

## Architecture
The system integrates a Python FastMCP server, an authoritative component registry, Material 3 design token generation, declarative AST validation, and an AST-to-React UI compiler with a dedicated Mobile App Primitives suite in the Kilo UI Next.js application.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ External IDE Clients (Claude Desktop, Cursor, VS Code, Windsurf, Antigravity)   │
└────────────────────────────────────┬────────────────────────────────────────────┘
                                     │ JSON-RPC (stdio or SSE/Streamable HTTP)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Python FastMCP Server (server/mcp_server.py)                                    │
│ ├─ Resources:                                                                   │
│ │  ├─ kilo://registry/catalog                                                   │
│ │  ├─ kilo://primitives/{name}                                                  │
│ │  ├─ m3://tokens/palette?seed={hex}                                            │
│ │  └─ m3://guidelines/surface-hierarchy                                         │
│ ├─ Tools:                                                                       │
│ │  ├─ list_kilo_primitives()                                                    │
│ │  ├─ get_primitive_schema(name)                                                │
│ │  ├─ calculate_m3_palette(seed, format)                                        │
│ │  └─ validate_design_ast(ast)                                                  │
│ └─ Prompts:                                                                     │
│    ├─ kilo_m3_architect(task, constraints, seed)                                │
│    └─ section_composition_pattern(section_type, platform)                       │
└───────────────┬───────────────────────────────┬─────────────────────────────────┘
                │                               │
                ▼                               ▼
┌───────────────────────────────┐ ┌───────────────────────────────────────────────┐
│ Authoritative Registry & M3   │ │ Declarative AST Engine                        │
│ ├─ registry/registry-data.ts  │ │ ├─ Schema: lib/ast/schema.ts                  │
│ ├─ server/registry_loader.py  │ │ ├─ Validator: lib/ast/validator.ts & Python    │
│ └─ server/m3_palette.py       │ │ └─ Diagnostics: lib/ast/diagnostics.ts        │
└───────────────┬───────────────┘ └──────────────────────┬────────────────────────┘
                │                                        │
                ▼                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Kilo UI Compiler & Interactive Renderer (lib/compiler/ & components/compiler/)  │
│ ├─ AST Resolver -> Primitive Registry (56 existing + 5 mobile primitives)       │
│ ├─ M3 Theme Scoper -> Inject CSS variables (--md-sys-color-*)                   │
│ ├─ Dynamic <KiloASTRenderer /> Component Preview                                │
│ └─ Static TypeScript/JSX Code Generator                                         │
└────────────────────────────────────┬────────────────────────────────────────────┘
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Mobile App Primitives & UI Section                                              │
│ ├─ Primitives: Bottom Sheet, Swipe Actions, Segment Control, Pull-to-Refresh,   │
│ │  Floating Dock (Strictly monochrome / subtle M3 neutral surfaces)             │
│ ├─ Registry: registered under category "Mobile App" in registry-data.ts         │
│ └─ UI Route: /mobile-primitives with Interactive Phone Simulator Chassis        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | FastMCP Server Dual Transport | Support both stdio and SSE/HTTP (Streamable HTTP) transports with CLI flags | M1 | ORIGINAL_REQUEST §R1 |
| F2 | FastMCP 4 Resources | Expose catalog, primitive detail, M3 palette query, and surface guidelines | M1 | ORIGINAL_REQUEST §R1 |
| F3 | FastMCP 4 Tools | Implement list_kilo_primitives, get_primitive_schema, calculate_m3_palette, validate_design_ast | M1 | ORIGINAL_REQUEST §R1 |
| F4 | FastMCP 2 Prompts | Implement kilo_m3_architect and section_composition_pattern prompts | M1 | ORIGINAL_REQUEST §R1 |
| F5 | Authoritative Registry Loader | High-speed direct parsing of registry/registry-data.ts in Python (<5ms) with zero drift | M2 | ORIGINAL_REQUEST §R2 |
| F6 | Primitive JSON Schemas | Authoritative schema definitions with props, slots, constraints for all primitives | M2 | ORIGINAL_REQUEST §R2 |
| F7 | Material 3 Color Generator | Google M3 tonal palettes (0-100), light/dark semantic roles, surface containers, CSS vars | M2 | ORIGINAL_REQUEST §R2 |
| F8 | Surface Hierarchy Guidelines | Standardized M3 neutral surface elevation mappings to Kilo UI tokens | M2 | ORIGINAL_REQUEST §R2 |
| F9 | Declarative AST Specification | Strongly-typed JSON AST format (version, meta, theme, root, node kinds, slots, props) | M3 | ORIGINAL_REQUEST §R3 |
| F10 | AST Validation Engine | Dual-runtime schema, primitive existence, prop type, slot rule, and aesthetic rule checker | M3 | ORIGINAL_REQUEST §R3 |
| F11 | Diagnostic Error Reporting | Actionable diagnostic codes, node paths, and deterministic auto-correction / repair | M3 | ORIGINAL_REQUEST §R3 |
| F12 | AI Architect Prompt Integration | Prompt constraints and retry guidance instructing LLMs on valid AST generation | M3 | ORIGINAL_REQUEST §R3 |
| F13 | AST Dynamic Compiler | Live React tree transpiler (<KiloASTRenderer />) mapping AST nodes to registry components | M4 | ORIGINAL_REQUEST §R4 |
| F14 | M3 Token Scoper | Runtime injection of M3 CSS custom properties onto compiled components | M4 | ORIGINAL_REQUEST §R4 |
| F15 | Static Code Emitter | Transpiles AST to standalone, clean TypeScript JSX source code | M4 | ORIGINAL_REQUEST §R4 |
| F16 | Mobile Bottom Sheet | Clean monochrome swipeable bottom sheet with gesture velocity, snap points, drag handle | M5 | ORIGINAL_REQUEST §R5 |
| F17 | Swipe Action Card | Mobile card with bidirectional swipe-to-reveal action drawers and spring physics | M5 | ORIGINAL_REQUEST §R5 |
| F18 | Thumb Segment Controller | Ergonomic reach segmented controller with animated pill transition | M5 | ORIGINAL_REQUEST §R5 |
| F19 | Pull-to-Refresh Indicator | Rubber-band tension physics and clean monochrome loading indicator | M5 | ORIGINAL_REQUEST §R5 |
| F20 | Floating Action Dock | Ergonomic bottom-anchored floating action dock with subtle M3 neutral surface | M5 | ORIGINAL_REQUEST §R5 |
| F21 | Registry Mobile Categorization | Register 5 mobile primitives in registry/registry-data.ts under "Mobile App" | M5 | ORIGINAL_REQUEST §R5 |
| F22 | Dedicated Mobile UI Page | /mobile-primitives page with phone chassis frame, live gesture playground, telemetry | M5 | ORIGINAL_REQUEST §R5 |
| F23 | Navigation Integration | Top-level sidebar links, category accordion, and AppShell route whitelisting | M5 | ORIGINAL_REQUEST §R5 |
| F24 | Cross-IDE Client Configurations | Configs for Claude Desktop, Cursor, VS Code, Windsurf, Antigravity (stdio & SSE) | M6 | ORIGINAL_REQUEST §R6 |
| F25 | Setup & Deployment Guide | Step-by-step local execution and external hosting instructions | M6 | ORIGINAL_REQUEST §R6 |
| F26 | E2E Testing Suite (Tiers 1-4) | Comprehensive test suite verifying server, tools, tokens, AST, compiler, and mobile UI | M7 | Acceptance Criteria |
| F27 | Adversarial Hardening (Tier 5) | White-box adversarial testing and edge-case hardening | M7 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design test infrastructure (TEST_INFRA.md), test runner, and test cases | none | DONE (TEST_READY.md) |
| M1 | FastMCP Server & Core Transports | Implement Python FastMCP server, transports (stdio & SSE/HTTP), resources, tools, prompts | none | DONE |
| M2 | Primitive Registry & M3 Token Engine | Authoritative registry schemas, Python registry loader, and Material 3 color engine | none | DONE |
| M3 | Declarative AST & AI Architect | AST schema, validation engine with diagnostic codes, auto-correction, and prompts | M1, M2 | DONE |
| M4 | Compiler Integration & UI Rendering | <KiloASTRenderer />, M3 token CSS injector, static code emitter, preview stage | M2, M3 | DONE |
| M5 | Mobile App Primitives & UI Section | 5 clean monochrome mobile primitives, /mobile-primitives route, navigation integration | M2 | DONE |
| M6 | Cross-IDE Configs & Documentation | Config files for Claude, Cursor, VS Code, Windsurf, Antigravity, and setup docs | M1 | DONE |
| M7 | Final E2E Test Suite & Coverage Hardening | 100% pass of E2E tests (Tiers 1-4) and Tier 5 adversarial hardening | M1-M6 | DONE |

## Interface Contracts

### 1. FastMCP Server ↔ External Clients (MCP Protocol)
- **Transport stdio**: `python3 server/mcp_server.py --transport stdio`
- **Transport sse**: `python3 server/mcp_server.py --transport sse --host 127.0.0.1 --port 8000`
- **Transport streamable-http**: `python3 server/mcp_server.py --transport streamable-http --host 127.0.0.1 --port 8000` (at `/mcp`)
- **Resources**:
  - `kilo://registry/catalog` -> `{ "total": int, "categories": list[str], "primitives": list[dict] }`
  - `kilo://primitives/{name}` -> `{ "name": str, "category": str, "description": str, "props": list[dict], "slots": list[dict], "constraints": list[str] }`
  - `m3://tokens/palette?seed={hex}` -> `{ "seed": str, "tones": dict, "light": dict, "dark": dict, "cssVariables": dict }`
  - `m3://guidelines/surface-hierarchy` -> `{ "surfaces": dict, "elevation_mappings": dict }`
- **Tools**:
  - `list_kilo_primitives(category: str | None = None) -> list[dict]`
  - `get_primitive_schema(name: str) -> dict`
  - `calculate_m3_palette(seed: str, format: str = "all") -> dict`
  - `validate_design_ast(ast: dict) -> dict`
- **Prompts**:
  - `kilo_m3_architect(task: str, platform: str = "mobile", seed: str = "#737673")`
  - `section_composition_pattern(section_type: str, platform: str = "mobile")`

### 2. Registry Loader ↔ Kilo UI Component Data
- `server/registry_loader.py:load_registry() -> dict[str, dict]`
- Reads `registry/registry-data.ts`, extracts pure JSON object without Node.js execution.

### 3. Declarative AST Schema
```json
{
  "version": "1.0.0",
  "meta": {
    "id": "string",
    "title": "string",
    "viewport": "mobile | tablet | desktop",
    "colorScheme": "dark | light | system",
    "seedColor": "string (hex)"
  },
  "theme": {
    "tokens": { "string": "string" },
    "m3": { "primary": "string", "surface": "string" }
  },
  "root": {
    "id": "string",
    "kind": "component | container | text",
    "component": "string (registered primitive name)",
    "props": { "string": "any" },
    "slots": { "slot_name": [ "DesignASTNode" ] },
    "children": [ "DesignASTNode" ]
  }
}
```

### 4. Compiler ↔ React Component Render
- `compileASTToReact(ast: DesignAST) -> React.ReactElement`
- `emitTypeScriptSource(ast: DesignAST) -> string`

## Code Layout
- `server/`: Python FastMCP server, transports, M3 palette generation, registry loader, and AST validator.
  - `server/mcp_server.py`: FastMCP server entrypoint and CLI.
  - `server/m3_palette.py`: Google Material 3 color token engine.
  - `server/registry_loader.py`: High-speed parser for `registry/registry-data.ts`.
  - `server/ast_validator.py`: Python implementation of AST validator.
- `lib/ast/`: Declarative AST schemas, TypeScript validator, diagnostics, and auto-repair.
  - `lib/ast/schema.ts`: TypeScript interfaces for `DesignAST`.
  - `lib/ast/validator.ts`: TypeScript AST validator and rule checker.
  - `lib/ast/diagnostics.ts`: Error codes, diagnostics, and auto-correction.
- `lib/compiler/`: AST-to-React compiler and code emitter.
  - `lib/compiler/compiler.tsx`: Dynamic AST renderer `<KiloASTRenderer />`.
  - `lib/compiler/emitter.ts`: Standalone TSX code generator.
- `registry/ui/`: New mobile primitives.
  - `registry/ui/mobile-bottom-sheet.tsx`
  - `registry/ui/swipe-action-card.tsx`
  - `registry/ui/thumb-segment-controller.tsx`
  - `registry/ui/pull-to-refresh.tsx`
  - `registry/ui/floating-action-dock.tsx`
- `components/ui/`: Re-exports of mobile primitives for consumer imports.
- `registry/registry-data.ts`: Registration of mobile primitives with props, variants, and code files.
- `app/mobile-primitives/`: Dedicated mobile primitives page and interactive phone chassis playground.
- `docs/mcp/`: Cross-IDE integration documentation and configuration examples.
  - `docs/mcp/claude_desktop_config.json`
  - `docs/mcp/cursor_mcp.json`
  - `docs/mcp/vscode_settings.json`
  - `docs/mcp/windsurf_mcp.json`
  - `docs/mcp/antigravity_config.json`
  - `docs/mcp/INTEGRATION_GUIDE.md`
- `tests/`: Automated test suite.
  - `tests/test_mcp_server.py`: Python tests for FastMCP server, transports (stdio & SSE), resources, tools, prompts.
  - `tests/test_m3_palette.py`: Python tests for M3 tonal palettes and CSS variables.
  - `tests/test_ast_validator.py`: Python & TS tests for AST validation and error recovery.
  - `tests/test_e2e_integration.py` / `tests/e2e.test.ts`: End-to-end integration tests.

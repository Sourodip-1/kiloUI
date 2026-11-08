# Kilo UI + Material 3 MCP Test Infrastructure

## Overview

This document specifies the end-to-end (E2E) test infrastructure, architecture, runners, 4-tier methodology, and coverage criteria for the **Kilo UI + Material 3 FastMCP Architecture**.

The test suite provides opaque-box and grey-box verification of:
1. Python FastMCP Server running across dual transports (`stdio` and `sse`/Streamable HTTP).
2. Authoritative Kilo UI Primitive Registry (56 web primitives + 5 mobile primitives).
3. Google Material 3 color generation (HCT color space, tonal palettes 0–100, light/dark schemes, and scoped CSS variables).
4. Declarative Design AST Schema and multi-phase validation engine with deterministic auto-correction.
5. End-to-end compiler integration and UI rendering contracts.
6. Mobile App Primitives with clean monochrome styling, subtle M3 neutral surfaces, and precision typography (strictly zero glowing circles, green pulsing dots, or colorful gradients).

---

## Test Architecture & Framework

### Test Engine
- **Runner**: Python `unittest` framework with `unittest.IsolatedAsyncioTestCase` for structured async MCP communication.
- **Async Runtime**: Python `asyncio` and `anyio` event loop.
- **MCP Client Harness**: Anthropic `mcp` SDK (`mcp.client.stdio.stdio_client`, `mcp.client.sse.sse_client`, `mcp.client.session.ClientSession`) for over-the-wire JSON-RPC protocol testing, along with in-process FastMCP server session verification.
- **Transport Drivers**:
  - `stdio`: Spawns the server as a background subprocess using Python stdin/stdout pipes.
  - `sse`: Runs the server ASGI application via `uvicorn`/`starlette` over localhost HTTP, performing SSE stream handshakes and POST message delivery.

### Directory Structure

```
tests/
├── __init__.py
├── test_e2e_suite.py               # Master E2E runner & aggregated test suite
└── e2e/
    ├── __init__.py
    ├── fixtures.py                  # Authoritative fixtures (ASTs, seeds, schemas, palettes)
    ├── test_tier1_coverage.py       # Tier 1: MCP Server Transports, 4 Resources, 4 Tools, 2 Prompts
    ├── test_tier2_boundaries.py     # Tier 2: Boundary, Negative & Prohibited Aesthetic Cases
    ├── test_tier3_combinations.py   # Tier 3: Cross-Feature (AST + M3 + Slots + Auto-Repair)
    ├── test_tier4_scenarios.py      # Tier 4: Real-World AI UI Architect Mobile App Workflows
    ├── test_stdio_transport.py      # Tier 1 Wire: Live stdio subprocess transport test
    └── test_sse_transport.py        # Tier 1 Wire: Live SSE / HTTP server transport test
```

---

## 4-Tier Test Methodology

The E2E test suite is organized into 4 rigorous, non-overlapping tiers ensuring both contract fidelity and real-world robustness:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Tier 4: Real-World Scenarios (AI UI Architect Multi-Screen Workflows)  │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 3: Cross-Feature Combinations (AST + M3 + Slots + Auto-Repair)   │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 2: Boundary & Corner Cases (Malformed, Invalids, Prohibitions)   │
├────────────────────────────────────────────────────────────────────────┤
│  Tier 1: Feature Coverage (Transports, 4 Resources, 4 Tools, 2 Prompts)│
└────────────────────────────────────────────────────────────────────────┘
```

### Tier 1: Feature Coverage (Happy Path)
Verifies nominal, compliant behavior for all functional interfaces:
- **Server Startup & Transports**:
  - Verification of stdio transport communication.
  - Verification of SSE / Streamable HTTP transport initialization and session establishment.
- **4 MCP Resources**:
  - `kilo://registry/catalog`: Complete catalog indexing 56+ primitives, categories, and version metadata.
  - `kilo://primitives/{name}`: Full primitive detail schema, prop types, slots, allowed children, and code files.
  - `m3://tokens/palette?seed={hex}`: Complete M3 tonal palette, light/dark semantic color roles, and scoped CSS variables.
  - `m3://guidelines/surface-hierarchy`: Material 3 surface elevation mappings and Kilo UI monochrome design rules.
- **4 MCP Tools**:
  - `list_kilo_primitives(category)`: Category filtering, total counts, and schema summaries.
  - `get_primitive_schema(name)`: Schema inspection for web and mobile primitives.
  - `calculate_m3_palette(seed, format)`: Tonal palettes (0–100), HCT extraction, and CSS variables.
  - `validate_design_ast(ast)`: Validation of structurally sound Declarative Design ASTs.
- **2 MCP Prompts**:
  - `kilo_m3_architect`: AI UI Architect system prompt with M3 seed and monochrome rules.
  - `section_composition_pattern`: Page and screen section structural templates.

### Tier 2: Boundary and Corner Cases
Tests system resilience against malformed, out-of-bounds, or hostile inputs:
- **Invalid Seed Hex Colors**: Non-hex strings (`"not-a-color"`), empty strings (`""`), incomplete hex (`"#12"`, `"#GGGGGG"`), and extreme lengths (`"#123456789"`).
- **Malformed AST Payloads**: Missing mandatory keys (`version`, `meta`, `root`), null values, empty dictionaries, non-dictionary inputs.
- **Unregistered Primitives**: Primitives not in catalog (e.g. `"laser-cannon"`, `"neon-pulse"`).
- **Prop Type & Enum Violations**: Passing strings for booleans, invalid variant enums, negative numbers where positive integers are required.
- **Prohibited Aesthetic Violations**:
  - Detection and rejection of pulsing green dots (`bg-green-500 animate-pulse`, `pulse-dot`).
  - Detection and rejection of glowing circles (`rounded-full blur-xl glow`, `box-shadow: 0 0 20px #00ff00`).
  - Detection and rejection of colorful rainbow gradients (`bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500`).
- **Touch Target Ergonomics**: Warnings for mobile interactive elements under the 44×44px physical touch boundary.
- **Extreme Viewports**: Boundary validation of `viewport` values (`"mobile"`, `"tablet"`, `"desktop"`, rejection of invalid targets).

### Tier 3: Cross-Feature Combinations
Validates interoperability across distinct functional modules:
- **AST with Embedded M3 Tokens**: Dynamic generation of M3 palettes injected into `theme.tokens` and `styleBindings.surfaceRole`, verified through `validate_design_ast`.
- **Hybrid Composition**: Mobile primitives (e.g. `mobile-bottom-sheet`) embedding desktop/general primitives (e.g. `button`, `search-bar`, `switch`, `avatar`).
- **Slot Constraint Auditing**: Deeply nested named slots (`header`, `content`, `actions`, `trigger`) with cardinality and type verification.
- **Deterministic Error Auto-Repair**: Roundtrip test where an AST containing recoverable defects (e.g. typo in primitive name, type coercion, missing required defaults, or prohibited styling) is submitted, diagnostics are inspected, and the auto-repaired AST is verified to pass subsequent validation.
- **Registry → Schema → AST → Validation Lifecycle**: Discovery of primitives via `list_kilo_primitives`, schema fetch via `get_primitive_schema`, algorithmic composition into a valid AST, and confirmation through `validate_design_ast`.

### Tier 4: Real-World Scenarios
Simulates realistic, multi-step AI Architect production workflows:
- **Workflow A: Mobile Settings Drawer**
  - AI Architect queries mobile primitives.
  - Generates a `mobile-bottom-sheet` containing a `thumb-segment-controller` (Theme mode: System / Light / Dark), `switch` controls for push notifications, and a `button` group for account actions.
  - Validates AST cleanly and verifies compiler readiness.
- **Workflow B: Swipeable Content Feed**
  - AI Architect constructs a mobile feed container with `pull-to-refresh` header, a stack of `swipe-action-card` components with revealable delete and bookmark drawers, and clean typography.
  - Validates AST against schema and surface contrast guidelines.
- **Workflow C: Ergonomic Floating Action Dock**
  - AI Architect builds a bottom-anchored `floating-action-dock` housing primary navigation buttons, search trigger, and contextual modal trigger.
  - Validates AST and ensures all interactive touch targets satisfy the 44px ergonomic baseline.
- **Workflow D: Compiler Output Contract**
  - Verification that valid ASTs produce well-formed React JSX trees and M3 CSS variable bindings (`--md-sys-color-surface`, `--md-sys-color-primary`).

---

## Invocation Commands

### Master Test Suite
To run the full end-to-end test suite across all 4 tiers:
```bash
python3 tests/test_e2e_suite.py
```

### Python Unittest Discovery
To run tests using standard unittest discovery:
```bash
python3 -m unittest discover -s tests -p "test_e2e_*.py" -v
```

### Individual Tier Execution
To execute specific test tiers independently:
```bash
# Tier 1: Feature Coverage (Transports, Resources, Tools, Prompts)
python3 -m unittest tests/e2e/test_tier1_coverage.py -v

# Tier 2: Boundary & Corner Cases
python3 -m unittest tests/e2e/test_tier2_boundaries.py -v

# Tier 3: Cross-Feature Combinations & Auto-Repair
python3 -m unittest tests/e2e/test_tier3_combinations.py -v

# Tier 4: Real-World AI UI Architect Workflows
python3 -m unittest tests/e2e/test_tier4_scenarios.py -v

# Live Over-the-Wire Transports (Subprocess stdio & SSE HTTP)
python3 -m unittest tests/e2e/test_stdio_transport.py -v
python3 -m unittest tests/e2e/test_sse_transport.py -v
```

---

## Pass / Fail Semantics

- **Success (Exit Code 0)**:
  - All test cases across Tiers 1 through 4 pass without assertion errors, unhandled exceptions, or protocol timeout.
  - 100% of required resources, tools, and prompts respond with valid payloads conforming to interface contracts.
  - All boundary inputs are safely rejected or handled with descriptive diagnostics.
  - All real-world screen ASTs validate successfully.
- **Failure (Exit Code != 0)**:
  - Any unhandled exception, syntax error, or assertion failure.
  - Missing MCP resources or tools.
  - Non-conforming payload structures or broken schema contracts.
  - Subprocess connection or transport handshake failures.

---

## Feature Checklist & Coverage Thresholds

| Feature | Scope | Target Coverage | Tier Assigned |
|---|---|---|---|
| F1 | FastMCP Server Dual Transport (stdio & SSE) | 100% | Tier 1 (Wire) |
| F2 | FastMCP 4 Resources (`kilo://*`, `m3://*`) | 100% (4/4) | Tier 1 |
| F3 | FastMCP 4 Tools (`list`, `schema`, `palette`, `validate`) | 100% (4/4) | Tier 1 |
| F4 | FastMCP 2 Prompts (`architect`, `section_pattern`) | 100% (2/2) | Tier 1 |
| F5 | Authoritative Registry Loader (`registry-data.ts`) | 100% | Tier 1 & 3 |
| F6 | Primitive JSON Schemas (props, slots, constraints) | 100% | Tier 1 & 2 |
| F7 | Material 3 Color Generator (Tones 0–100, Light/Dark, CSS) | 100% | Tier 1 & 2 |
| F8 | Surface Hierarchy Guidelines (Elevation, Monochrome) | 100% | Tier 1 |
| F9 | Declarative AST Specification (version 1.0.0, meta, root) | 100% | Tier 1 & 3 |
| F10 | AST Validation Engine (6 phases) | 100% | Tier 1, 2, 3 |
| F11 | Diagnostic Error Reporting & Auto-Correction | 100% | Tier 2 & 3 |
| F12 | AI Architect Prompt Integration | 100% | Tier 1 & 4 |
| F13 | AST Compiler Mapping | 100% | Tier 4 |
| F14 | M3 Scoped CSS Variable Injection | 100% | Tier 1 & 4 |
| F16–F20 | 5 Mobile App Primitives (Sheet, Card, Segment, Pull, Dock)| 100% (5/5) | Tier 1, 3, 4 |
| F21 | Registry Mobile Categorization ("Mobile App") | 100% | Tier 1 & 4 |
| F26 | E2E Testing Suite (Tiers 1–4) | 100% | Master Suite |

# kilo/ui

> **Minimal, high-performance copy-paste UI primitives, shaders, and animations for React and Next.js.**

[![npm version](https://img.shields.io/npm/v/@kilo-ui/cli.svg?style=flat-square&color=5ca904)](https://www.npmjs.com/package/@kilo-ui/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Next.js 16 Ready](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

**Explore interactive demos & documentation:** [https://www.kiloui.dev](https://www.kiloui.dev)

---

## ⚡ Quickstart

### 1. Initialize your project
Scaffolds design tokens, Tailwind utilities (`cn`), and target component folders:

```bash
# npm
npx @kilo-ui/cli init

# pnpm
pnpm dlx @kilo-ui/cli init

# bun
bunx @kilo-ui/cli init
```

### 2. Add primitives
Drop production-ready TypeScript source code directly into your `@/components/ui` folder:

```bash
# Featured interactive components
npx @kilo-ui/cli add target-cursor
npx @kilo-ui/cli add option-wheel
npx @kilo-ui/cli add contour-tide
npx @kilo-ui/cli add kinetic-text
npx @kilo-ui/cli add liquid-metal

# Material Motion Engine
npx @kilo-ui/cli add motion-engine

# Core form & layout primitives
npx @kilo-ui/cli add button input dialog card
```

### 3. List all components
Explore the full registry directly from your terminal:

```bash
npx @kilo-ui/cli list
```

---

## 📦 What Makes kilo/ui Different?

- **0 KB Dependency Overhead**: Source code drops directly into your repository. You own every line — zero opaque npm node_module runtime wrappers.
- **Hardware-Accelerated WebGL & Raymarching**: Viscous fluids, Gerstner wave ocean simulation, and CRT phosphor matrices calculated on the GPU under 16.6ms frame budgets.
- **Tailwind CSS v4 Native**: Built from the ground up for `@theme` tokens and CSS custom properties.
- **Strict TypeScript Contracts**: Exhaustive autocomplete, strict types, zero `any` shortcuts, and accessible WAI-ARIA keys.

---

## 🎨 Component Highlights

### 🎯 `<TargetCursor />`
Tactile reticle crosshair cursor with 5 visual presets, spring dynamics, corner snapping, and audio lock feedback.
```tsx
import { TargetCursor } from "@/components/ui/target-cursor";

export default function App() {
  return (
    <TargetCursor variant="brackets-reticle">
      <button className="cursor-target">Hover me to lock reticle</button>
    </TargetCursor>
  );
}
```

### 🎡 `<OptionWheel />`
Kinetic circular option selector with inertial dragging, depth blur, spring settling physics, and click sounds.
```tsx
import OptionWheel from "@/components/ui/option-wheel";

export default function Menu() {
  return (
    <OptionWheel
      items={["Contour Tide", "Target Cursor", "Kinetic Text", "Expanding Card"]}
      defaultSelected={1}
      onChange={(index, item) => console.log(index, item)}
    />
  );
}
```

### 🌊 `<ContourTide />`
Interactive 3D Gerstner wave ocean field rendered via WebGL point-particles with cursor swell and ripple wave physics.
```tsx
import { ContourTide } from "@/components/ui/contour-tide";

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full">
      <ContourTide preset="silver" density={1.2} swell={1.0} interactive />
    </div>
  );
}
```

### 🎬 `<MotionEngine />`
Zero-dependency Material Motion patterns implementing ContainerTransform, SharedAxis (X/Y/Z), and FadeThrough.
```tsx
import { ContainerTransform, SharedAxis, FadeThrough } from "@/components/ui/motion-engine";
```

---

## 🛠 Available Primitives (44+)

| Category | Primitives |
| :--- | :--- |
| **Cursors** | `target-cursor`, `magnetic-cursor`, `firefly-cursor`, `spotlight-cursor`, `quantum-particles-cursor`, `neon-ribbon-cursor`, `elastic-blob-cursor` |
| **Shaders & Backgrounds** | `contour-tide`, `liquid-metal-background`, `ethereal-smoke-shader`, `grainy-grid-shader`, `grainy-horizon-shader`, `morph-node-ring`, `prismatic-slats-bg`, `glass-reveal` |
| **Navigation & Motion** | `option-wheel`, `motion-engine`, `notched-navbar`, `tabs`, `sidebar`, `blurred-carousel`, `concave-carousel`, `content-slider` |
| **Media & Layout** | `kinetic-text`, `expanding-card`, `bento-cluster`, `scroll-marquee`, `directional-marquee`, `footer` |
| **Actions & Inputs** | `button`, `input`, `switch`, `checkbox`, `search-bar`, `stat-card`, `card`, `dialog`, `badge`, `accordion` |
| **Authentication Screens** | `blueprint-login`, `horizon-login`, `minimalist-login` |

---

## 📄 License

MIT License © 2026 Sourodip • Free for personal and commercial projects.

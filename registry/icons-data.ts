export type IconCategory =
  | "core"
  | "dev"
  | "cloud"
  | "security"
  | "system"
  | "metrics"
  | "files"
  | "actions";

export interface AnimatedIcon {
  num: number;
  id: string;
  name: string;
  category: IconCategory;
  animType: string;
  tags?: string[];
  svg: string;
}

export const ICON_CATEGORIES = [
  { id: "all", label: "All Primitives", count: 100 },
  { id: "core", label: "Core UI", count: 12 },
  { id: "dev", label: "Dev & Git", count: 18 },
  { id: "cloud", label: "Cloud & Infra", count: 12 },
  { id: "security", label: "Security & Auth", count: 10 },
  { id: "system", label: "System & Hardware", count: 12 },
  { id: "metrics", label: "Telemetry & Metrics", count: 12 },
  { id: "files", label: "Files & Data", count: 12 },
  { id: "actions", label: "Actions & Feedback", count: 12 },
] as const;

export const ICONS_DATA: AnimatedIcon[] = [
  // ==========================================================================
  // 1. CORE UI & NAVIGATION (12 ICONS)
  // ==========================================================================
  {
    num: 1, id: "menu", name: "Menu", category: "core",
    animType: "Transforms into close X",
    tags: ["navigation", "hamburger", "toggle"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary anim-menu-top" x1="4" y1="6" x2="20" y2="6"/><line class="stroke-accent anim-menu-mid" x1="4" y1="12" x2="20" y2="12"/><line class="stroke-primary anim-menu-bot" x1="4" y1="18" x2="20" y2="18"/></svg>`
  },
  {
    num: 2, id: "close", name: "Close", category: "core",
    animType: "Rotates and focuses",
    tags: ["exit", "dismiss", "x"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="origin-center-svg anim-close-spin"><line class="stroke-primary" x1="18" y1="6" x2="6" y2="18"/><line class="stroke-accent" x1="6" y1="6" x2="18" y2="18"/></g></svg>`
  },
  {
    num: 3, id: "arrow-right", name: "Arrow Right", category: "core",
    animType: "Glides forward with spring",
    tags: ["next", "forward", "direction"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="anim-el anim-slide-right"><line class="stroke-primary" x1="4" y1="12" x2="20" y2="12"/><polyline class="stroke-accent" points="14 6 20 12 14 18"/></g></svg>`
  },
  {
    num: 4, id: "arrow-down", name: "Arrow Down", category: "core",
    animType: "Bounces downward subtly",
    tags: ["down", "scroll", "expand"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="anim-el anim-bounce-down"><line class="stroke-primary" x1="12" y1="4" x2="12" y2="20"/><polyline class="stroke-accent" points="18 14 12 20 6 14"/></g></svg>`
  },
  {
    num: 5, id: "arrow-left", name: "Arrow Left", category: "core",
    animType: "Glides backward with spring",
    tags: ["back", "previous", "return"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="anim-el anim-slide-left"><line class="stroke-primary" x1="20" y1="12" x2="4" y2="12"/><polyline class="stroke-accent" points="10 18 4 12 10 6"/></g></svg>`
  },
  {
    num: 6, id: "arrow-up", name: "Arrow Up", category: "core",
    animType: "Glides upward with spring",
    tags: ["up", "top", "scroll"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="anim-el anim-bounce-up"><line class="stroke-primary" x1="12" y1="20" x2="12" y2="4"/><polyline class="stroke-accent" points="6 10 12 4 18 10"/></g></svg>`
  },
  {
    num: 7, id: "chevron-right", name: "Chevron Right", category: "core",
    animType: "Accents glide forward",
    tags: ["expand", "arrow", "menu"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-primary" points="8 4 16 12 8 20"/><polyline class="stroke-accent anim-el anim-slide-right" points="13 4 21 12 13 20"/></svg>`
  },
  {
    num: 8, id: "chevron-down", name: "Chevron Down", category: "core",
    animType: "Dropdown pulse indicator",
    tags: ["dropdown", "accordion", "select"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-primary" points="4 8 12 16 20 8"/><polyline class="stroke-accent anim-el anim-bounce-down" points="4 13 12 21 20 13"/></svg>`
  },
  {
    num: 9, id: "external-link", name: "External Link", category: "core",
    animType: "Arrow exits boundary",
    tags: ["target", "new-tab", "outbound"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><g class="anim-el anim-ext-arrow"><polyline class="stroke-accent" points="15 3 21 3 21 9"/><line class="stroke-accent" x1="10" y1="14" x2="21" y2="3"/></g></svg>`
  },
  {
    num: 10, id: "expand", name: "Expand / Maximize", category: "core",
    animType: "Opposing corners expand",
    tags: ["fullscreen", "zoom", "scale"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/><g class="anim-el anim-expand"><polyline class="stroke-accent" points="15 3 21 3 21 9"/><polyline class="stroke-accent" points="9 21 3 21 3 15"/></g></svg>`
  },
  {
    num: 11, id: "minimize", name: "Minimize / Shrink", category: "core",
    animType: "Corners contract inward",
    tags: ["collapse", "dock", "window"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M4 14h6v6m10-10h-6V4M14 10l7-7M3 21l7-7"/><polyline class="stroke-accent anim-el anim-pop" points="9 4 9 9 4 9"/></svg>`
  },
  {
    num: 12, id: "compass", name: "Compass / Navigation", category: "core",
    animType: "Magnetic dial oscillates",
    tags: ["explore", "orient", "gps"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><polygon class="stroke-accent origin-center-svg anim-compass" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
  },

  // ==========================================================================
  // 2. DEVELOPER & GIT (18 ICONS)
  // ==========================================================================
  {
    num: 13, id: "terminal", name: "Terminal CLI", category: "dev",
    animType: "Cursor blinks & prompt glides",
    tags: ["bash", "sh", "console", "command"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="4" width="20" height="16" rx="2"/><polyline class="stroke-accent anim-el anim-slide-right" points="6 9 10 12 6 15"/><line class="stroke-accent anim-el anim-cursor" x1="12" y1="15" x2="16" y2="15"/></svg>`
  },
  {
    num: 14, id: "git-branch", name: "Git Branch", category: "dev",
    animType: "Branch commit line connects",
    tags: ["vcs", "branch", "git", "tree"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary" x1="6" y1="3" x2="6" y2="15"/><circle class="stroke-primary" cx="6" cy="18" r="3"/><circle class="stroke-accent anim-el anim-pop" cx="18" cy="6" r="3"/><path class="stroke-accent anim-draw-36" d="M18 9a9 9 0 0 1-9 9"/></svg>`
  },
  {
    num: 15, id: "git-commit", name: "Git Commit", category: "dev",
    animType: "Commit node pulses on line",
    tags: ["git", "history", "hash", "log"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary" x1="2" y1="12" x2="8" y2="12"/><line class="stroke-primary" x1="16" y1="12" x2="22" y2="12"/><circle class="stroke-accent anim-el anim-heartbeat" cx="12" cy="12" r="4"/><circle class="fill-accent anim-el anim-pop" cx="12" cy="12" r="1.5"/></svg>`
  },
  {
    num: 16, id: "git-pull-request", name: "Pull Request", category: "dev",
    animType: "Merge nodes align",
    tags: ["pr", "review", "merge", "github"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="18" cy="18" r="3"/><circle class="stroke-accent" cx="6" cy="6" r="3"/><path class="stroke-primary" d="M13 6h3a2 2 0 0 1 2 2v7"/><line class="stroke-accent anim-draw-36" x1="6" y1="9" x2="6" y2="21"/></svg>`
  },
  {
    num: 17, id: "git-merge", name: "Git Merge", category: "dev",
    animType: "Divergent branches fuse",
    tags: ["git", "branch", "fuse", "combine"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="18" cy="18" r="3"/><circle class="stroke-primary" cx="6" cy="6" r="3"/><circle class="stroke-accent" cx="6" cy="18" r="3"/><path class="stroke-accent anim-draw-36" d="M6 9v9m0 0a9 9 0 0 0 9-9"/></svg>`
  },
  {
    num: 18, id: "git-diff", name: "Git Diff / Delta", category: "dev",
    animType: "Plus & minus changes pulse",
    tags: ["changes", "patch", "staging"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="18" height="18" rx="2"/><line class="stroke-primary" x1="12" y1="3" x2="12" y2="21"/><line class="stroke-accent anim-el anim-slide-right" x1="15" y1="9" x2="19" y2="9"/><line class="stroke-accent anim-el anim-pop" x1="17" y1="7" x2="17" y2="11"/><line class="stroke-primary anim-el anim-slide-left" x1="5" y1="9" x2="9" y2="9"/></svg>`
  },
  {
    num: 19, id: "code", name: "Code Brackets", category: "dev",
    animType: "Brackets assemble horizontally",
    tags: ["html", "jsx", "script", "syntax"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-primary anim-el anim-slide-left" points="8 6 2 12 8 18"/><polyline class="stroke-primary anim-el anim-slide-right" points="16 6 22 12 16 18"/><line class="stroke-accent" x1="14" y1="4" x2="10" y2="20"/></svg>`
  },
  {
    num: 20, id: "bug", name: "Bug Tracker", category: "dev",
    animType: "Sensors tick and detect",
    tags: ["debug", "issue", "error", "trace"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="8" y="7" width="8" height="13" rx="4"/><path class="stroke-accent origin-bottom-svg anim-swing" d="M9 7L7 4m8 3l2-4"/><line class="stroke-primary" x1="4" y1="13" x2="8" y2="13"/><line class="stroke-primary" x1="16" y1="13" x2="20" y2="13"/><line class="stroke-accent" x1="8" y1="13" x2="16" y2="13"/></svg>`
  },
  {
    num: 21, id: "api-webhook", name: "API / Webhook", category: "dev",
    animType: "Packets stream through nodes",
    tags: ["endpoint", "payload", "socket"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-accent anim-dash-flow" x1="7.5" y1="10.5" x2="16.5" y2="6.5"/><line class="stroke-accent anim-dash-flow" x1="7.5" y1="13.5" x2="16.5" y2="17.5"/><circle class="stroke-primary" cx="5" cy="12" r="3"/><circle class="stroke-primary" cx="19" cy="5" r="3"/><circle class="stroke-accent anim-el anim-expand" cx="19" cy="19" r="3"/></svg>`
  },
  {
    num: 22, id: "dom-tree", name: "DOM Tree / AST", category: "dev",
    animType: "Signal cascades down tree",
    tags: ["react", "hierarchy", "ast", "nodes"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 7v5m0 0H6v4m6-4h6v4"/><rect class="stroke-primary" x="9" y="3" width="6" height="4" rx="1"/><rect class="stroke-primary" x="3" y="16" width="6" height="5" rx="1"/><rect class="stroke-accent anim-el anim-expand" x="15" y="16" width="6" height="5" rx="1"/></svg>`
  },
  {
    num: 23, id: "hot-reload", name: "Hot Module Reload (HMR)", category: "dev",
    animType: "Fast orbit + lightning spark",
    tags: ["fast-refresh", "vite", "nextjs", "hmr"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="origin-center-svg anim-spin-360"><path class="stroke-primary" d="M21 12a9 9 0 0 0-15-6.7L3 8"/><path class="stroke-primary" d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></g><polygon class="fill-accent anim-el anim-heartbeat" points="13 7 9 13 12 13 11 17 15 11 12 11 13 7"/></svg>`
  },
  {
    num: 24, id: "css-grid", name: "CSS Grid Layout", category: "dev",
    animType: "Target column cell highlights",
    tags: ["layout", "flex", "css", "template"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="18" height="18" rx="2"/><line class="stroke-primary" x1="3" y1="9" x2="21" y2="9"/><line class="stroke-primary" x1="9" y1="21" x2="9" y2="9"/><rect class="stroke-accent anim-el anim-expand" x="12" y="12" width="6" height="6" rx="1"/></svg>`
  },
  {
    num: 25, id: "component-blocks", name: "Component Blocks", category: "dev",
    animType: "Component tile detaches and snaps",
    tags: ["primitives", "atomic", "lego", "ui"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="7" height="7" rx="1.5"/><rect class="stroke-primary" x="3" y="14" width="7" height="7" rx="1.5"/><rect class="stroke-primary" x="14" y="14" width="7" height="7" rx="1.5"/><rect class="stroke-accent anim-el anim-separate" x="14" y="3" width="7" height="7" rx="1.5"/></svg>`
  },
  {
    num: 26, id: "responsive-layout", name: "Responsive Layout", category: "dev",
    animType: "Mobile viewport scales up",
    tags: ["media-query", "breakpoints", "device"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M13 17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><line class="stroke-primary" x1="8" y1="21" x2="12" y2="21"/><rect class="stroke-accent anim-el anim-bounce-up" x="15" y="11" width="7" height="10" rx="1.5"/></svg>`
  },
  {
    num: 27, id: "package-box", name: "NPM Package", category: "dev",
    animType: "Top facet seals down",
    tags: ["npm", "dependency", "bundle", "yarn"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M21 8.5V16.5L12 21.5L3 16.5V8.5"/><line class="stroke-primary" x1="12" y1="13" x2="12" y2="21.5"/><polygon class="stroke-accent anim-el anim-bounce-up" points="12 3 21 8 12 13 3 8 12 3"/></svg>`
  },
  {
    num: 28, id: "workflow", name: "CI/CD Pipeline", category: "dev",
    animType: "Action nodes light up",
    tags: ["automation", "actions", "pipeline"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="6" height="6" rx="1"/><rect class="stroke-accent anim-el anim-pop" x="15" y="3" width="6" height="6" rx="1"/><rect class="stroke-primary" x="9" y="15" width="6" height="6" rx="1"/><path class="stroke-accent anim-draw-36" d="M9 6h6m-3 9V9"/></svg>`
  },
  {
    num: 29, id: "brackets", name: "Curly Braces / JSON", category: "dev",
    animType: "Braces pulse symmetrically",
    tags: ["object", "json", "types"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-el anim-slide-left" d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path class="stroke-accent anim-el anim-slide-right" d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/></svg>`
  },
  {
    num: 30, id: "function", name: "Function Lambda", category: "dev",
    animType: "Curved integral draws",
    tags: ["lambda", "method", "math"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-draw-64" d="M4 17a4 4 0 0 1 4-4V7a4 4 0 0 1 4-4"/><line class="stroke-accent anim-el anim-slide-right" x1="4" y1="11" x2="12" y2="11"/><circle class="stroke-accent anim-el anim-pop" cx="18" cy="12" r="3"/></svg>`
  },

  // ==========================================================================
  // 3. CLOUD & INFRASTRUCTURE (12 ICONS)
  // ==========================================================================
  {
    num: 31, id: "database", name: "SQL Database", category: "cloud",
    animType: "Top cylinder disk floats",
    tags: ["postgres", "sqlite", "table", "sql"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><ellipse class="stroke-accent anim-el anim-expand" cx="12" cy="5" rx="9" ry="3"/><path class="stroke-primary" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path class="stroke-primary" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
  },
  {
    num: 32, id: "server", name: "Server Rack", category: "cloud",
    animType: "Telemetry LED lights pulse",
    tags: ["host", "linux", "cluster", "metal"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="2" width="20" height="8" rx="2"/><rect class="stroke-primary" x="2" y="14" width="20" height="8" rx="2"/><circle class="fill-accent anim-el anim-cursor" cx="6" cy="6" r="1.5"/><circle class="fill-accent anim-el anim-seq-2" cx="6" cy="18" r="1.5"/><line class="stroke-primary" x1="12" y1="6" x2="18" y2="6"/><line class="stroke-primary" x1="12" y1="18" x2="18" y2="18"/></svg>`
  },
  {
    num: 33, id: "cloud", name: "Cloud Compute", category: "cloud",
    animType: "Cloud floats gently with hover",
    tags: ["aws", "gcp", "hosting", "saas"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-el anim-bounce-up" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><circle class="fill-accent anim-el anim-pop" cx="12" cy="14" r="1.5"/></svg>`
  },
  {
    num: 34, id: "cloud-upload", name: "Cloud Sync Upload", category: "cloud",
    animType: "Arrow ascends into cloud",
    tags: ["deploy", "push", "storage"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><g class="anim-el anim-bounce-up"><polyline class="stroke-accent" points="16 16 12 12 8 16"/><line class="stroke-accent" x1="12" y1="12" x2="12" y2="21"/></g></svg>`
  },
  {
    num: 35, id: "cloud-download", name: "Cloud Sync Download", category: "cloud",
    animType: "Arrow descends from cloud",
    tags: ["pull", "fetch", "s3"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><g class="anim-el anim-bounce-down"><polyline class="stroke-accent" points="8 17 12 21 16 17"/><line class="stroke-accent" x1="12" y1="12" x2="12" y2="21"/></g></svg>`
  },
  {
    num: 36, id: "container-docker", name: "Container / Docker", category: "cloud",
    animType: "Modular blocks hover into place",
    tags: ["docker", "podman", "k8s"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M2 19h20M2 14c0 3 3 5 8 5s8-2 8-5"/><rect class="stroke-accent anim-el anim-slide-right" x="6" y="8" width="4" height="4" rx="0.5"/><rect class="stroke-primary" x="11" y="8" width="4" height="4" rx="0.5"/><rect class="stroke-accent anim-el anim-bounce-up" x="11" y="3" width="4" height="4" rx="0.5"/></svg>`
  },
  {
    num: 37, id: "kubernetes-pod", name: "Kubernetes Cluster", category: "cloud",
    animType: "Hexagonal helm rotates",
    tags: ["k8s", "cluster", "orchestration"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polygon class="stroke-primary origin-center-svg anim-spin-360" points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7"/><circle class="stroke-accent anim-el anim-expand" cx="12" cy="12" r="3.5"/></svg>`
  },
  {
    num: 38, id: "network-node", name: "Network Mesh", category: "cloud",
    animType: "Hub routes packets outward",
    tags: ["topology", "p2p", "mesh"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-accent anim-el anim-heartbeat" cx="12" cy="12" r="3"/><circle class="stroke-primary" cx="4" cy="6" r="2.5"/><circle class="stroke-primary" cx="20" cy="6" r="2.5"/><circle class="stroke-primary" cx="12" cy="20" r="2.5"/><line class="stroke-primary" x1="6.5" y1="7.5" x2="9.8" y2="10.2"/><line class="stroke-primary" x1="17.5" y1="7.5" x2="14.2" y2="10.2"/><line class="stroke-primary" x1="12" y1="15" x2="12" y2="17.5"/></svg>`
  },
  {
    num: 39, id: "router", name: "Edge Router", category: "cloud",
    animType: "Antenna signals emit waves",
    tags: ["edge", "cdn", "dns", "gateway"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="14" width="20" height="8" rx="2"/><line class="stroke-primary" x1="6" y1="14" x2="6" y2="6"/><line class="stroke-primary" x1="18" y1="14" x2="18" y2="6"/><circle class="fill-accent anim-el anim-pop" cx="6" cy="4" r="1.5"/><circle class="fill-accent anim-el anim-pop" cx="18" cy="4" r="1.5"/><circle class="fill-accent anim-el anim-cursor" cx="12" cy="18" r="1"/></svg>`
  },
  {
    num: 40, id: "firewall", name: "Firewall Gateway", category: "cloud",
    animType: "Security shield absorbs packets",
    tags: ["waf", "ddos", "security"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="18" height="18" rx="2"/><line class="stroke-primary" x1="3" y1="9" x2="21" y2="9"/><line class="stroke-primary" x1="3" y1="15" x2="21" y2="15"/><line class="stroke-primary" x1="9" y1="3" x2="9" y2="9"/><line class="stroke-primary" x1="15" y1="9" x2="15" y2="15"/><line class="stroke-primary" x1="9" y1="15" x2="9" y2="21"/><polygon class="stroke-accent anim-el anim-heartbeat" points="12 4 10 11 14 11 12 18"/></svg>`
  },
  {
    num: 41, id: "lambda", name: "Serverless Lambda", category: "cloud",
    animType: "Execution pulse triggers",
    tags: ["faas", "function", "vercel", "cloudflare"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><path class="stroke-accent anim-draw-36" d="M8 18l4.5-9L16 18"/><line class="stroke-accent" x1="7" y1="18" x2="10" y2="18"/></svg>`
  },
  {
    num: 42, id: "globe", name: "Global CDN", category: "cloud",
    animType: "Equatorial longitude oscillates",
    tags: ["edge", "worldwide", "latency", "dns"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><line class="stroke-primary" x1="2" y1="12" x2="22" y2="12"/><path class="stroke-accent origin-center-svg anim-globe" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
  },

  // ==========================================================================
  // 4. SECURITY & AUTHENTICATION (10 ICONS)
  // ==========================================================================
  {
    num: 43, id: "lock", name: "Lock / Encrypted", category: "security",
    animType: "Mechanical shackle clicks shut",
    tags: ["auth", "crypto", "ssl", "private"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="11" width="18" height="11" rx="2"/><path class="stroke-accent anim-el anim-shackle-close" d="M7 11V7a5 5 0 0 1 10 0v4"/><circle class="fill-accent" cx="12" cy="16.5" r="1.5"/></svg>`
  },
  {
    num: 44, id: "unlock", name: "Unlock / Decrypted", category: "security",
    animType: "Shackle springs upward",
    tags: ["open", "public", "access"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="11" width="18" height="11" rx="2"/><path class="stroke-accent anim-el anim-shackle-open" d="M7 11V7a5 5 0 0 1 9.9-1"/><circle class="fill-accent" cx="12" cy="16.5" r="1.5"/></svg>`
  },
  {
    num: 45, id: "key", name: "API Key", category: "security",
    animType: "Key turns inside cylinder",
    tags: ["token", "secret", "bearer", "oauth"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="origin-center-svg anim-key"><circle class="stroke-primary" cx="7.5" cy="15.5" r="4.5"/><path class="stroke-accent" d="M10.7 12.3L19 4l2 2-2 2 2 2-3 3"/></g></svg>`
  },
  {
    num: 46, id: "shield", name: "Security Shield", category: "security",
    animType: "Hairline perimeter draws closed",
    tags: ["defense", "safe", "firewall"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path class="stroke-accent anim-draw-64" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    num: 47, id: "shield-check", name: "Verified Shield", category: "security",
    animType: "Checkmark draws inside shield",
    tags: ["pass", "audit", "compliance", "soc2"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline class="stroke-accent anim-draw-36" points="9 12 11 14 15 10"/></svg>`
  },
  {
    num: 48, id: "eye", name: "Reveal Password", category: "security",
    animType: "Eyelid blinks and focuses",
    tags: ["visible", "show", "inspect"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="origin-center-svg anim-blink-eye"><path class="stroke-primary" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle class="stroke-accent" cx="12" cy="12" r="3"/></g></svg>`
  },
  {
    num: 49, id: "eye-off", name: "Hide Password", category: "security",
    animType: "Diagonal slash reveals and hides",
    tags: ["hidden", "masked", "protect"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line class="stroke-accent anim-draw-36" x1="1" y1="1" x2="23" y2="23"/></svg>`
  },
  {
    num: 50, id: "fingerprint", name: "Biometric Auth", category: "security",
    animType: "Concentric ridge lines scan",
    tags: ["webauthn", "fido2", "passkey"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path class="stroke-primary" d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path class="stroke-accent anim-draw-36" d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path class="stroke-primary" d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path class="stroke-accent anim-draw-64" d="M8.65 22c.21-.66.45-1.32.57-2"/></svg>`
  },
  {
    num: 51, id: "token", name: "JWT Bearer Token", category: "security",
    animType: "Cryptographic hash flips",
    tags: ["jwt", "session", "claims"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="9"/><circle class="stroke-accent anim-el anim-pop" cx="12" cy="12" r="4"/><line class="stroke-primary" x1="12" y1="3" x2="12" y2="8"/><line class="stroke-primary" x1="12" y1="16" x2="12" y2="21"/></svg>`
  },
  {
    num: 52, id: "verified", name: "Verified Signature", category: "security",
    animType: "Geometric ribbon pulses",
    tags: ["badge", "trust", "cert"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 2l2.4 2.4 3.4-.4.8 3.3 3.1 1.5-1.1 3.2 1.1 3.2-3.1 1.5-.8 3.3-3.4-.4L12 22l-2.4-2.4-3.4.4-.8-3.3-3.1-1.5 1.1-3.2-1.1-3.2 3.1-1.5.8-3.3 3.4.4z"/><polyline class="stroke-accent anim-draw-36" points="8.5 12.5 11 15 16 9.5"/></svg>`
  },

  // ==========================================================================
  // 5. SYSTEM & HARDWARE (12 ICONS)
  // ==========================================================================
  {
    num: 53, id: "cpu-chip", name: "CPU / WebAssembly", category: "system",
    animType: "Silicon processor core pulses",
    tags: ["processor", "wasm", "threads"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="4" y="4" width="16" height="16" rx="2"/><rect class="stroke-accent anim-el anim-heartbeat" x="9" y="9" width="6" height="6"/><path class="stroke-primary" d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3"/></svg>`
  },
  {
    num: 54, id: "memory-ram", name: "Memory / RAM", category: "system",
    animType: "Bus pins glow sequentially",
    tags: ["heap", "v8", "buffer", "memory"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="6" width="20" height="12" rx="2"/><rect class="stroke-accent anim-el anim-seq-1" x="5" y="9" width="3" height="6"/><rect class="stroke-accent anim-el anim-seq-2" x="10.5" y="9" width="3" height="6"/><rect class="stroke-accent anim-el anim-seq-3" x="16" y="9" width="3" height="6"/><line class="stroke-primary" x1="6" y1="18" x2="6" y2="20"/><line class="stroke-primary" x1="12" y1="18" x2="12" y2="20"/><line class="stroke-primary" x1="18" y1="18" x2="18" y2="20"/></svg>`
  },
  {
    num: 55, id: "hard-drive", name: "NVMe / Storage", category: "system",
    animType: "Read/write head slides",
    tags: ["disk", "ssd", "nvme", "io"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary" x1="22" y1="12" x2="2" y2="12"/><path class="stroke-primary" d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><circle class="fill-accent anim-el anim-cursor" cx="6" cy="16" r="1.5"/><circle class="fill-accent anim-el anim-seq-2" cx="10" cy="16" r="1.5"/></svg>`
  },
  {
    num: 56, id: "wifi", name: "WiFi / Connection", category: "system",
    animType: "Signal wave arcs pulse",
    tags: ["wireless", "signal", "bandwidth"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="fill-accent" cx="12" cy="20" r="1.5"/><path class="stroke-primary anim-el anim-seq-1" d="M8.5 16.5a5 5 0 0 1 7 0"/><path class="stroke-accent anim-el anim-seq-2" d="M5 12.5a10 10 0 0 1 14 0"/><path class="stroke-primary anim-el anim-seq-3" d="M1.5 8.5a15 15 0 0 1 21 0"/></svg>`
  },
  {
    num: 57, id: "bluetooth", name: "Bluetooth Mesh", category: "system",
    animType: "Geometry draws inward",
    tags: ["wireless", "ble", "iot"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-accent anim-draw-36" points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/></svg>`
  },
  {
    num: 58, id: "battery-charging", name: "Battery / Power", category: "system",
    animType: "Lightning bolt surges",
    tags: ["charge", "energy", "performance"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="7" width="16" height="10" rx="2"/><line class="stroke-primary" x1="20" y1="11" x2="20" y2="13"/><polyline class="stroke-accent anim-el anim-heartbeat" points="10 9 7 13 11 13 8 17"/></svg>`
  },
  {
    num: 59, id: "power", name: "Power State", category: "system",
    animType: "Standby line pulses",
    tags: ["shutdown", "restart", "reboot"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line class="stroke-accent anim-el anim-bounce-down" x1="12" y1="2" x2="12" y2="12"/></svg>`
  },
  {
    num: 60, id: "gauge-speed", name: "Speedometer / Perf", category: "system",
    animType: "Needle revs forward",
    tags: ["benchmark", "fps", "performance"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5"/><path class="stroke-primary" d="M21.16 12A10 10 0 0 0 12 2"/><line class="stroke-accent origin-bottom-svg anim-compass" x1="12" y1="12" x2="17" y2="7"/><circle class="fill-accent" cx="12" cy="12" r="2"/></svg>`
  },
  {
    num: 61, id: "fan-cooler", name: "Cooler Fan", category: "system",
    animType: "Blades spin rapidly",
    tags: ["thermal", "rpm", "hardware"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><circle class="fill-accent" cx="12" cy="12" r="2"/><g class="origin-center-svg anim-spin-fast"><path class="stroke-accent" d="M12 10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4a2 2 0 0 0 2 2z"/><path class="stroke-accent" d="M14 12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z"/><path class="stroke-accent" d="M12 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/><path class="stroke-accent" d="M10 12a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4a2 2 0 0 0 2-2z"/></g></svg>`
  },
  {
    num: 62, id: "motherboard", name: "PCB Circuit", category: "system",
    animType: "Signal flows through circuit",
    tags: ["bus", "hardware", "board"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="2" width="20" height="20" rx="2"/><circle class="stroke-accent anim-el anim-pop" cx="6" cy="6" r="2"/><circle class="stroke-accent anim-el anim-pop" cx="18" cy="18" r="2"/><path class="stroke-accent anim-draw-36" d="M8 6h4l2 4h4M6 8v4l4 2v4"/></svg>`
  },
  {
    num: 63, id: "monitor", name: "Display Monitor", category: "system",
    animType: "Screen scanline fades in",
    tags: ["desktop", "screen", "viewport"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="2" y="3" width="20" height="14" rx="2"/><line class="stroke-primary" x1="8" y1="21" x2="16" y2="21"/><line class="stroke-primary" x1="12" y1="17" x2="12" y2="21"/><line class="stroke-accent anim-el anim-slide-right" x1="6" y1="8" x2="14" y2="8"/></svg>`
  },
  {
    num: 64, id: "smartphone", name: "Mobile Device", category: "system",
    animType: "Home indicator slides",
    tags: ["ios", "android", "touch"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="5" y="2" width="14" height="20" rx="2.5"/><line class="stroke-accent anim-el anim-slide-right" x1="10" y1="18" x2="14" y2="18"/></svg>`
  },

  // ==========================================================================
  // 6. TELEMETRY & METRICS (12 ICONS)
  // ==========================================================================
  {
    num: 65, id: "activity-pulse", name: "Telemetry Heartbeat", category: "metrics",
    animType: "Continuous EKG waveform draws",
    tags: ["vitals", "health", "uptime", "ping"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-accent anim-draw-64" points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
  },
  {
    num: 66, id: "chart-bar", name: "Bar Analytics", category: "metrics",
    animType: "Bars scale to peak values",
    tags: ["histogram", "traffic", "stats"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary origin-bottom-svg anim-bar-1" x1="6" y1="20" x2="6" y2="14"/><line class="stroke-accent origin-bottom-svg anim-bar-2" x1="12" y1="20" x2="12" y2="4"/><line class="stroke-primary origin-bottom-svg anim-bar-3" x1="18" y1="20" x2="18" y2="10"/></svg>`
  },
  {
    num: 67, id: "chart-line", name: "Trend Line Graph", category: "metrics",
    animType: "Data curve renders forward",
    tags: ["growth", "series", "trend"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-primary" points="3 3 3 21 21 21"/><polyline class="stroke-accent anim-draw-36" points="7 16 11 11 15 14 20 7"/></svg>`
  },
  {
    num: 68, id: "chart-pie", name: "Resource Allocation", category: "metrics",
    animType: "Pie slice separates",
    tags: ["quota", "breakdown", "storage"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path class="stroke-accent anim-el anim-separate" d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`
  },
  {
    num: 69, id: "radar-scan", name: "Radar Sweep", category: "metrics",
    animType: "Radar beam scans 360 degrees",
    tags: ["detect", "security", "scan"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><circle class="stroke-primary" cx="12" cy="12" r="6"/><circle class="stroke-primary" cx="12" cy="12" r="2"/><line class="stroke-accent origin-center-svg anim-spin-360" x1="12" y1="12" x2="19" y2="5"/></svg>`
  },
  {
    num: 70, id: "zap-speed", name: "Instant Execution", category: "metrics",
    animType: "Lightning bolt flashes",
    tags: ["speed", "boost", "fast"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polygon class="stroke-accent anim-el anim-heartbeat" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    num: 71, id: "flame-hot", name: "High Load / Hot Path", category: "metrics",
    animType: "Flame flickers subtly",
    tags: ["flamegraph", "cpu-hot", "load"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary origin-bottom-svg anim-flicker" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/><path class="stroke-accent origin-bottom-svg anim-flicker" d="M12 18a2.5 2.5 0 0 0 2.5-2.5c0-1.2-1-2-2.5-3.5-1.5 1.5-2.5 2.3-2.5 3.5A2.5 2.5 0 0 0 12 18z"/></svg>`
  },
  {
    num: 72, id: "sparkles", name: "AI Agent / Inference", category: "metrics",
    animType: "Twin stars twinkle symmetrically",
    tags: ["ai", "llm", "smart", "assist"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-el anim-expand" d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/><path class="stroke-accent anim-el anim-seq-2" d="M5 3v4M3 5h4M19 17v4M17 19h4"/></svg>`
  },
  {
    num: 73, id: "filter", name: "Filter Telemetry", category: "metrics",
    animType: "Funnel passes data stream",
    tags: ["sort", "query", "grep"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polygon class="stroke-primary" points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/><line class="stroke-accent anim-el anim-bounce-down" x1="6" y1="7" x2="18" y2="7"/></svg>`
  },
  {
    num: 74, id: "sliders", name: "Tuning Knobs", category: "metrics",
    animType: "Faders adjust horizontally",
    tags: ["parameters", "config", "threshold"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary" x1="4" y1="6" x2="20" y2="6"/><line class="stroke-primary" x1="4" y1="12" x2="20" y2="12"/><line class="stroke-primary" x1="4" y1="18" x2="20" y2="18"/><circle class="fill-accent anim-el anim-slide-right" cx="9" cy="6" r="2.5"/><circle class="fill-accent anim-el anim-slide-left" cx="15" cy="12" r="2.5"/><circle class="fill-accent anim-el anim-slide-right" cx="10" cy="18" r="2.5"/></svg>`
  },
  {
    num: 75, id: "timer-clock", name: "Latency Clock", category: "metrics",
    animType: "Clock hand rotates continuously",
    tags: ["rtt", "timeout", "duration"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><line class="stroke-primary" x1="12" y1="6" x2="12" y2="12"/><line class="stroke-accent origin-center-svg anim-spin-360" x1="12" y1="12" x2="16" y2="14"/></svg>`
  },
  {
    num: 76, id: "calendar", name: "Cron Schedule", category: "metrics",
    animType: "Calendar marker checks",
    tags: ["cron", "date", "events"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="4" width="18" height="18" rx="2"/><line class="stroke-primary" x1="16" y1="2" x2="16" y2="6"/><line class="stroke-primary" x1="8" y1="2" x2="8" y2="6"/><line class="stroke-primary" x1="3" y1="10" x2="21" y2="10"/><rect class="stroke-accent anim-el anim-pop" x="8" y="14" width="3" height="3" rx="0.5"/></svg>`
  },

  // ==========================================================================
  // 7. FILES & DATA (12 ICONS)
  // ==========================================================================
  {
    num: 77, id: "file-code", name: "Source File", category: "files",
    animType: "File fold flaps smoothly",
    tags: ["source", "typescript", "module"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline class="stroke-primary origin-top-left-svg anim-flap" points="14 2 14 8 20 8"/><polyline class="stroke-accent anim-el anim-slide-right" points="9.5 12.5 8 14 9.5 15.5"/><polyline class="stroke-accent anim-el anim-slide-left" points="14.5 12.5 16 14 14.5 15.5"/></svg>`
  },
  {
    num: 78, id: "file-text", name: "Document / Markdown", category: "files",
    animType: "Text lines type in",
    tags: ["readme", "docs", "spec"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline class="stroke-primary" points="14 2 14 8 20 8"/><line class="stroke-accent anim-el anim-slide-right" x1="8" y1="13" x2="16" y2="13"/><line class="stroke-accent anim-el anim-slide-right" x1="8" y1="17" x2="13" y2="17"/></svg>`
  },
  {
    num: 79, id: "folder", name: "Folder Tree", category: "files",
    animType: "Folder flap opens and closes",
    tags: ["directory", "catalog", "fs"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><line class="stroke-accent origin-bottom-svg anim-fold" x1="2" y1="11" x2="22" y2="11"/></svg>`
  },
  {
    num: 80, id: "folder-git", name: "Git Repo Folder", category: "files",
    animType: "Git branch reveals inside folder",
    tags: ["repo", "project", "workspace"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><circle class="stroke-accent anim-el anim-pop" cx="12" cy="15" r="2"/><line class="stroke-accent" x1="12" y1="11" x2="12" y2="13"/></svg>`
  },
  {
    num: 81, id: "archive-zip", name: "Tarball / ZIP", category: "files",
    animType: "Zipper tooth slides down",
    tags: ["zip", "tar", "bundle"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M21 8v13H3V8"/><path class="stroke-primary" d="M1 3h22v5H1z"/><line class="stroke-accent anim-el anim-bounce-down" x1="10" y1="12" x2="14" y2="12"/><line class="stroke-primary" x1="10" y1="16" x2="14" y2="16"/></svg>`
  },
  {
    num: 82, id: "table", name: "Data Grid Table", category: "files",
    animType: "Active cell highlights",
    tags: ["csv", "rows", "columns"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><rect class="stroke-primary" x="3" y="3" width="18" height="18" rx="2"/><line class="stroke-primary" x1="3" y1="9" x2="21" y2="9"/><line class="stroke-primary" x1="9" y1="21" x2="9" y2="9"/><rect class="stroke-accent anim-el anim-pop" x="11" y="11" width="8" height="8" rx="1"/></svg>`
  },
  {
    num: 83, id: "json-brackets", name: "Config JSON / YAML", category: "files",
    animType: "Array brackets embrace",
    tags: ["json", "yaml", "config"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-primary anim-el anim-slide-left" points="7 4 3 4 3 20 7 20"/><polyline class="stroke-primary anim-el anim-slide-right" points="17 4 21 4 21 20 17 20"/><line class="stroke-accent anim-el anim-cursor" x1="9" y1="12" x2="15" y2="12"/></svg>`
  },
  {
    num: 84, id: "layers-stack", name: "Z-Index Hierarchy", category: "files",
    animType: "Top plane floats upward",
    tags: ["stack", "context", "z-index"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polygon class="stroke-accent anim-el anim-bounce-up" points="12 2 2 7 12 12 22 7 12 2"/><polyline class="stroke-primary" points="2 12 12 17 22 12"/><polyline class="stroke-primary" points="2 17 12 22 22 17"/></svg>`
  },
  {
    num: 85, id: "copy", name: "Copy Clipboard", category: "files",
    animType: "Foreground sheet lifts off",
    tags: ["duplicate", "clone", "copy"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><rect class="stroke-accent anim-el anim-separate" x="9" y="9" width="13" height="13" rx="2"/></svg>`
  },
  {
    num: 86, id: "clipboard-check", name: "Clipboard Verify", category: "files",
    animType: "Checkmark draws on pad",
    tags: ["paste", "task", "audit"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect class="stroke-primary" x="8" y="2" width="8" height="4" rx="1"/><polyline class="stroke-accent anim-draw-36" points="9 14 11 16 15 11"/></svg>`
  },
  {
    num: 87, id: "download", name: "Artifact Download", category: "files",
    animType: "Vector arrow drops into tray",
    tags: ["fetch", "install", "save"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><g class="anim-el anim-bounce-down"><polyline class="stroke-accent" points="7 10 12 15 17 10"/><line class="stroke-accent" x1="12" y1="15" x2="12" y2="3"/></g></svg>`
  },
  {
    num: 88, id: "upload", name: "Artifact Upload", category: "files",
    animType: "Vector arrow rises from tray",
    tags: ["push", "release", "publish"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><g class="anim-el anim-bounce-up"><polyline class="stroke-accent" points="17 8 12 3 7 8"/><line class="stroke-accent" x1="12" y1="3" x2="12" y2="15"/></g></svg>`
  },

  // ==========================================================================
  // 8. ACTIONS & FEEDBACK (12 ICONS)
  // ==========================================================================
  {
    num: 89, id: "check", name: "Success Check", category: "actions",
    animType: "Polyline draws cleanly",
    tags: ["success", "done", "confirm", "pass"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-accent anim-draw-36" points="4 12.5 9 17.5 20 6.5"/></svg>`
  },
  {
    num: 90, id: "cross", name: "Failure Cross", category: "actions",
    animType: "Cross strokes draw together",
    tags: ["cancel", "fail", "reject", "remove"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><line class="stroke-primary anim-draw-36" x1="6" y1="6" x2="18" y2="18"/><line class="stroke-accent anim-draw-36" x1="18" y1="6" x2="6" y2="18"/></svg>`
  },
  {
    num: 91, id: "warning-alert", name: "Warning Alert", category: "actions",
    animType: "Exclamation point pulses",
    tags: ["caution", "danger", "warn"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-el anim-expand" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line class="stroke-accent" x1="12" y1="9" x2="12" y2="13"/><circle class="fill-accent" cx="12" cy="17" r="1"/></svg>`
  },
  {
    num: 92, id: "info-circle", name: "Info Notification", category: "actions",
    animType: "Center stem reveals upward",
    tags: ["help", "hint", "about"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="10"/><g class="anim-el anim-pop"><line class="stroke-accent" x1="12" y1="16" x2="12" y2="12"/><circle class="fill-accent" cx="12" cy="8" r="1"/></g></svg>`
  },
  {
    num: 93, id: "loading-spinner", name: "Spinner Loader", category: "actions",
    animType: "Smooth continuous circular spin",
    tags: ["busy", "wait", "pending"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><circle class="stroke-primary" cx="12" cy="12" r="9" stroke-opacity="0.25"/><path class="stroke-accent origin-center-svg anim-spin-fast" d="M21 12a9 9 0 0 0-9-9"/></svg>`
  },
  {
    num: 94, id: "refresh-cw", name: "Refresh / Retry", category: "actions",
    animType: "Orbital arrow rotates 360 degrees",
    tags: ["re-run", "reload", "update"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="origin-center-svg anim-spin-360"><path class="stroke-primary" d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline class="stroke-accent" points="21 3 21 9 15 9"/></g></svg>`
  },
  {
    num: 95, id: "trash", name: "Delete Trash", category: "actions",
    animType: "Canister lid lifts open",
    tags: ["remove", "purge", "destroy"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><line class="stroke-primary" x1="10" y1="11" x2="10" y2="17"/><line class="stroke-primary" x1="14" y1="11" x2="14" y2="17"/><g class="origin-left-svg anim-lid"><polyline class="stroke-accent" points="3 6 5 6 21 6"/><path class="stroke-accent" d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></g></svg>`
  },
  {
    num: 96, id: "edit-pencil", name: "Edit / Mutate", category: "actions",
    animType: "Pencil draws underline",
    tags: ["rename", "modify", "update"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary anim-el anim-slide-right" d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/><line class="stroke-accent anim-draw-36" x1="12" y1="20" x2="21" y2="20"/></svg>`
  },
  {
    num: 97, id: "save-disk", name: "Save / Commit", category: "actions",
    animType: "Disk cartridge presses down",
    tags: ["floppy", "store", "persist"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><g class="anim-el anim-press"><path class="stroke-primary" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline class="stroke-primary" points="17 21 17 13 7 13 7 21"/><polyline class="stroke-accent" points="7 3 7 8 15 8"/></g></svg>`
  },
  {
    num: 98, id: "undo", name: "Undo Operation", category: "actions",
    animType: "Arrow draws backward",
    tags: ["revert", "history", "rollback"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-accent anim-el anim-slide-left" points="9 14 4 9 9 4"/><path class="stroke-primary anim-draw-rev" d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>`
  },
  {
    num: 99, id: "redo", name: "Redo Operation", category: "actions",
    animType: "Arrow draws forward",
    tags: ["reapply", "step", "forward"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><polyline class="stroke-accent anim-el anim-slide-right" points="15 14 20 9 15 4"/><path class="stroke-primary anim-draw-36" d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>`
  },
  {
    num: 100, id: "command-key", name: "Command Shortcut", category: "actions",
    animType: "Loops pulse simultaneously",
    tags: ["cmd", "ctrl", "meta", "keybinding"],
    svg: `<svg class="kilo-icon dev-icon" viewBox="0 0 24 24"><path class="stroke-primary" d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/><rect class="stroke-accent anim-el anim-expand" x="9" y="9" width="6" height="6"/></svg>`
  }
];

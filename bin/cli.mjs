#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = "0.1.0";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/Sourodip-1/kiloUI/main";
const DEFAULT_REGISTRY_URL = process.env.KILO_REGISTRY_URL || "https://www.kiloui.dev/api/registry";

// Local bundled registry directory inside the npm package
const BUNDLED_REGISTRY_DIR = path.resolve(__dirname, "..", "registry", "ui");

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

// Component aliases mapping
const COMPONENT_ALIASES = {
  "target-cursor": "target-cursor",
  "magnetic-cursor": "target-cursor",
  "liquid-metal": "liquid-metal-background",
  "liquid-metal-background": "liquid-metal-background",
  "search-bar": "liquid-glass-search-bar",
  "liquid-glass-search-bar": "liquid-glass-search-bar",
  "option-wheel": "option-wheel",
  "motion-engine": "motion-engine",
  "contour-tide": "contour-tide",
  "kinetic-text": "kinetic-text",
  "expanding-card": "expanding-card",
};

// Associated companion files (e.g. CSS files)
const COMPANION_FILES = {
  "target-cursor": ["target-cursor.css"],
  "magnetic-cursor": ["target-cursor.css", "magnetic-cursor.css"],
  "option-wheel": ["option-wheel.css"],
};

// Peer dependencies by component keywords or names
const COMPONENT_DEPS = {
  three: ["contour-tide", "liquid-metal-background", "liquid-metal", "ethereal-smoke-shader", "grainy-grid-shader", "grainy-horizon-shader", "morph-node-ring", "glass-reveal", "prismatic-slats-bg"],
  "lucide-react": ["button", "search-bar", "liquid-glass-search-bar", "footer", "blueprint-login", "horizon-login", "minimalist-login", "dialog", "tabs", "sidebar", "notched-navbar"],
};

function log(msg = "") {
  console.log(msg);
}

function success(msg) {
  console.log(`${ANSI.green}✓${ANSI.reset} ${msg}`);
}

function info(msg) {
  console.log(`${ANSI.cyan}ℹ${ANSI.reset} ${msg}`);
}

function warn(msg) {
  console.log(`${ANSI.yellow}⚠${ANSI.reset} ${msg}`);
}

function error(msg) {
  console.error(`${ANSI.red}✖${ANSI.reset} ${msg}`);
}

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) return "bun";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function detectProjectDir() {
  const cwd = process.cwd();
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  return {
    cwd,
    hasSrc,
    componentsDir: hasSrc ? path.join(cwd, "src", "components", "ui") : path.join(cwd, "components", "ui"),
    libDir: hasSrc ? path.join(cwd, "src", "lib") : path.join(cwd, "lib"),
  };
}

function detectGlobalCssPath(cwd) {
  const candidates = [
    path.join(cwd, "app", "globals.css"),
    path.join(cwd, "src", "app", "globals.css"),
    path.join(cwd, "styles", "globals.css"),
    path.join(cwd, "src", "index.css"),
    path.join(cwd, "src", "styles", "globals.css"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function ensureUtilsFile(libDir) {
  const utilsPath = path.join(libDir, "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    fs.mkdirSync(libDir, { recursive: true });
    const content = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(utilsPath, content, "utf-8");
    success(`Created utils helper at ${path.relative(process.cwd(), utilsPath)}`);
  }
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "kilo-ui-cli" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchJson(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}: Failed to fetch ${url}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "kilo-ui-cli" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(fetchText(res.headers.location));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}: Failed to fetch ${url}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

/**
 * Resolves component source code either from local bundled package files,
 * or remotely via Registry API / GitHub raw fallback.
 */
async function resolveComponentSource(componentName) {
  const normalized = componentName.replace(/\.tsx$/, "").toLowerCase();
  const canonicalName = COMPONENT_ALIASES[normalized] || normalized;

  // 1. Check local bundled files first (installed npm package)
  if (fs.existsSync(BUNDLED_REGISTRY_DIR)) {
    const localTsx = path.join(BUNDLED_REGISTRY_DIR, `${canonicalName}.tsx`);
    if (fs.existsSync(localTsx)) {
      const code = fs.readFileSync(localTsx, "utf-8");
      const companions = [];

      const companionNames = COMPANION_FILES[canonicalName] || [];
      for (const compName of companionNames) {
        const localCompPath = path.join(BUNDLED_REGISTRY_DIR, compName);
        if (fs.existsSync(localCompPath)) {
          companions.push({
            name: compName,
            content: fs.readFileSync(localCompPath, "utf-8"),
          });
        }
      }

      return {
        name: canonicalName,
        code,
        companions,
        source: "bundled",
      };
    }
  }

  // 2. Fetch metadata from registry API endpoint
  try {
    const metadata = await fetchJson(`${DEFAULT_REGISTRY_URL}/${canonicalName}`);
    if (metadata && metadata.files && metadata.files.length > 0) {
      const mainFile = metadata.files.find((f) => f.name.endsWith(".tsx")) || metadata.files[0];
      const companionFiles = metadata.files.filter((f) => f.name !== mainFile.name);
      return {
        name: canonicalName,
        code: mainFile.content,
        companions: companionFiles.map((f) => ({ name: f.name, content: f.content })),
        dependencies: metadata.dependencies || [],
        source: "registry-api",
      };
    }
  } catch {
    // Registry API not reachable, try GitHub raw fallback
  }

  // 3. Fallback: GitHub raw content
  try {
    const code = await fetchText(`${GITHUB_RAW_BASE}/registry/ui/${canonicalName}.tsx`);
    const companions = [];

    const companionNames = COMPANION_FILES[canonicalName] || [];
    for (const compName of companionNames) {
      try {
        const compContent = await fetchText(`${GITHUB_RAW_BASE}/registry/ui/${compName}`);
        companions.push({ name: compName, content: compContent });
      } catch {
        // optional companion
      }
    }

    return {
      name: canonicalName,
      code,
      companions,
      source: "github-raw",
    };
  } catch (err) {
    throw new Error(`Component "${componentName}" was not found in kilo/ui registry.`);
  }
}

async function addComponent(componentName, options = {}) {
  const { cwd, componentsDir, libDir } = detectProjectDir();
  const pkgManager = detectPackageManager(cwd);

  const resolved = await resolveComponentSource(componentName);
  const targetFileName = `${resolved.name}.tsx`;

  // Ensure lib/utils.ts helper exists
  ensureUtilsFile(libDir);

  // Ensure target components/ui directory exists
  fs.mkdirSync(componentsDir, { recursive: true });

  const targetFilePath = path.join(componentsDir, targetFileName);
  if (fs.existsSync(targetFilePath) && !options.overwrite) {
    warn(`File ${path.relative(cwd, targetFilePath)} already exists. (Use ${ANSI.cyan}--overwrite${ANSI.reset} to replace)`);
  } else {
    const normalizedCode = resolved.code.replaceAll("../lib/utils", "@/lib/utils");
    fs.writeFileSync(targetFilePath, normalizedCode, "utf-8");
    success(`Installed ${ANSI.bold}${targetFileName}${ANSI.reset} to ${ANSI.dim}${path.relative(cwd, targetFilePath)}${ANSI.reset}`);
  }

  // Write any accompanying companion files (like .css files)
  if (resolved.companions && resolved.companions.length > 0) {
    for (const companion of resolved.companions) {
      const compPath = path.join(componentsDir, companion.name);
      if (!fs.existsSync(compPath) || options.overwrite) {
        fs.writeFileSync(compPath, companion.content, "utf-8");
        success(`Installed companion ${ANSI.bold}${companion.name}${ANSI.reset} to ${ANSI.dim}${path.relative(cwd, compPath)}${ANSI.reset}`);
      }
    }
  }

  // Check peer dependencies
  const pkgJsonPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

      const neededDeps = ["clsx", "tailwind-merge"];
      if (COMPONENT_DEPS.three.includes(resolved.name)) {
        neededDeps.push("three", "@types/three");
      }
      if (COMPONENT_DEPS["lucide-react"].includes(resolved.name)) {
        neededDeps.push("lucide-react");
      }

      const missing = neededDeps.filter((d) => !deps[d]);
      if (missing.length > 0) {
        log();
        info(`Missing peer dependencies: ${ANSI.bold}${missing.join(", ")}${ANSI.reset}`);
        const installCmd = pkgManager === "npm" ? `npm install ${missing.join(" ")}`
          : pkgManager === "pnpm" ? `pnpm add ${missing.join(" ")}`
          : pkgManager === "bun" ? `bun add ${missing.join(" ")}`
          : `yarn add ${missing.join(" ")}`;
        log(`Run: ${ANSI.cyan}${installCmd}${ANSI.reset}`);
      }
    } catch {
      // ignore pkg json read error
    }
  }

  // Generate PascalCase component name for import tip
  const pascalName = resolved.name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

  log();
  log(`Import with: ${ANSI.cyan}import { ${pascalName} } from "@/components/ui/${resolved.name}";${ANSI.reset}`);
}

async function runInit(options = {}) {
  const { cwd, componentsDir, libDir } = detectProjectDir();
  const pkgManager = detectPackageManager(cwd);

  log();
  log(`${ANSI.bold}${ANSI.green}kilo/ui CLI${ANSI.reset} ${ANSI.dim}v${VERSION}${ANSI.reset}`);
  info(`Initializing kilo/ui project setup in ${ANSI.bold}${path.relative(path.dirname(cwd), cwd) || "."}${ANSI.reset}...`);
  log();

  // 1. Create components directory
  fs.mkdirSync(componentsDir, { recursive: true });
  success(`Ensured components folder at ${ANSI.dim}${path.relative(cwd, componentsDir)}${ANSI.reset}`);

  // 2. Ensure utils.ts
  ensureUtilsFile(libDir);

  // 3. Inject CSS Variables / Design Tokens into globals.css if missing
  const globalCssPath = detectGlobalCssPath(cwd);
  if (fs.existsSync(globalCssPath)) {
    let css = fs.readFileSync(globalCssPath, "utf-8");
    if (!css.includes("--accent-green") && !css.includes("#5ca904") && !css.includes("#5CA904")) {
      const tokensBlock = `
/* kilo/ui design tokens */
:root {
  --accent-green: #5ca904;
  --bg-main: #070709;
  --surface-secondary: #141416;
  --surface-elevated: #1a1a1e;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --border: #27272a;
}
`;
      fs.appendFileSync(globalCssPath, tokensBlock, "utf-8");
      success(`Added design tokens to ${ANSI.dim}${path.relative(cwd, globalCssPath)}${ANSI.reset}`);
    } else {
      info(`Design tokens already present in ${ANSI.dim}${path.relative(cwd, globalCssPath)}${ANSI.reset}`);
    }
  }

  // 4. Verify package dependencies
  const pkgJsonPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      const missing = ["clsx", "tailwind-merge"].filter((d) => !deps[d]);
      if (missing.length > 0) {
        log();
        warn(`Required base dependencies missing: ${missing.join(", ")}`);
        const installCmd = pkgManager === "npm" ? `npm install ${missing.join(" ")}`
          : pkgManager === "pnpm" ? `pnpm add ${missing.join(" ")}`
          : pkgManager === "bun" ? `bun add ${missing.join(" ")}`
          : `yarn add ${missing.join(" ")}`;
        log(`Run: ${ANSI.cyan}${installCmd}${ANSI.reset}`);
      }
    } catch {
      // ignore
    }
  }

  log();
  success(`${ANSI.bold}kilo/ui initialized successfully!${ANSI.reset}`);
  log();
  log(`Next step: Add your first primitive!`);
  log(`  ${ANSI.cyan}npx @kilo-ui/cli add target-cursor${ANSI.reset}`);
  log(`  ${ANSI.cyan}npx @kilo-ui/cli add option-wheel${ANSI.reset}`);
  log(`  ${ANSI.cyan}npx @kilo-ui/cli add contour-tide${ANSI.reset}`);
  log();
}

async function listComponents() {
  log();
  log(`${ANSI.bold}${ANSI.green}kilo/ui Component Registry${ANSI.reset}`);
  log(`${ANSI.dim}Explore previews & docs at https://www.kiloui.dev${ANSI.reset}`);
  log();

  // Try reading local bundled registry directory if available
  if (fs.existsSync(BUNDLED_REGISTRY_DIR)) {
    const files = fs.readdirSync(BUNDLED_REGISTRY_DIR)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => f.replace(/\.tsx$/, ""))
      .sort();

    log(`${ANSI.bold}${ANSI.cyan}Available Components (${files.length})${ANSI.reset}`);
    for (const name of files) {
      const isNew = ["contour-tide", "target-cursor", "option-wheel", "kinetic-text", "motion-engine"].includes(name);
      const tag = isNew ? ` ${ANSI.green}[featured]${ANSI.reset}` : "";
      log(`  ${ANSI.green}•${ANSI.reset} ${ANSI.bold}${name.padEnd(28)}${ANSI.reset}${tag}`);
    }
    log();
    log(`Run: ${ANSI.cyan}npx @kilo-ui/cli add <component>${ANSI.reset}`);
    log();
    return;
  }

  // Remote registry fetch fallback
  try {
    const data = await fetchJson(DEFAULT_REGISTRY_URL);
    const components = data.components || [];

    const categories = {};
    for (const item of components) {
      const cat = item.category || "Other";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(item);
    }

    for (const [cat, items] of Object.entries(categories)) {
      log(`${ANSI.bold}${ANSI.magenta}${cat}${ANSI.reset} (${items.length})`);
      for (const item of items) {
        log(`  ${ANSI.green}•${ANSI.reset} ${ANSI.bold}${item.name.padEnd(26)}${ANSI.reset} ${ANSI.dim}${item.description?.slice(0, 60)}...${ANSI.reset}`);
      }
      log();
    }
  } catch (err) {
    log(`Registry fetch error: ${err.message}`);
    log(`View registry online at: ${ANSI.cyan}https://github.com/Sourodip-1/kiloUI${ANSI.reset}`);
  }
}

function printHelp() {
  log(`
${ANSI.bold}${ANSI.green}kilo/ui CLI${ANSI.reset} - Modern copy-paste React & Next.js UI primitives.

${ANSI.bold}USAGE${ANSI.reset}
  $ ${ANSI.cyan}npx @kilo-ui/cli${ANSI.reset} <command> [options]
  $ ${ANSI.cyan}pnpm dlx @kilo-ui/cli${ANSI.reset} <command> [options]
  $ ${ANSI.cyan}bunx @kilo-ui/cli${ANSI.reset} <command> [options]

${ANSI.bold}COMMANDS${ANSI.reset}
  ${ANSI.cyan}init${ANSI.reset}                    Initialize kilo/ui design tokens and utils
  ${ANSI.cyan}add <component...>${ANSI.reset}     Add one or more components to your project
  ${ANSI.cyan}list${ANSI.reset}                    List all components available in the registry
  ${ANSI.cyan}help${ANSI.reset}                    Display this help message

${ANSI.bold}OPTIONS${ANSI.reset}
  ${ANSI.cyan}--overwrite${ANSI.reset}             Overwrite existing component files without asking
  ${ANSI.cyan}-v, --version${ANSI.reset}           Output version number
  ${ANSI.cyan}-h, --help${ANSI.reset}              Display help

${ANSI.bold}EXAMPLES${ANSI.reset}
  $ npx @kilo-ui/cli init
  $ npx @kilo-ui/cli add target-cursor
  $ npx @kilo-ui/cli add option-wheel contour-tide
  $ npx @kilo-ui/cli add button --overwrite
  $ npx @kilo-ui/cli list
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp();
    return;
  }

  if (command === "--version" || command === "-v" || command === "version") {
    log(`kiloui v${VERSION}`);
    return;
  }

  if (command === "init") {
    await runInit();
    return;
  }

  if (command === "add") {
    const rawNames = args.slice(1).filter((a) => !a.startsWith("-"));
    if (rawNames.length === 0) {
      error("Please specify a component name to add. Example: npx kiloui add target-cursor");
      log();
      log(`Run ${ANSI.cyan}npx kiloui list${ANSI.reset} to see all available components.`);
      process.exit(1);
    }

    const overwrite = args.includes("--overwrite");
    for (const name of rawNames) {
      await addComponent(name, { overwrite });
    }
    return;
  }

  if (command === "list") {
    await listComponents();
    return;
  }

  error(`Unknown command: "${command}"`);
  printHelp();
  process.exit(1);
}

main().catch((err) => {
  error(err.message || String(err));
  process.exit(1);
});

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { execSync } from "node:child_process";

const VERSION = "0.1.0";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/Sourodip-1/kiloUI/main";
const DEFAULT_REGISTRY_URL = process.env.KILO_REGISTRY_URL || "https://kilo-ui.vercel.app/api/registry";

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

function detectProjectDir() {
  const cwd = process.cwd();
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  return {
    cwd,
    componentsDir: hasSrc ? path.join(cwd, "src", "components", "ui") : path.join(cwd, "components", "ui"),
    libDir: hasSrc ? path.join(cwd, "src", "lib") : path.join(cwd, "lib"),
  };
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

async function addComponent(componentName, options = {}) {
  const name = componentName.toLowerCase().trim();
  const { cwd, componentsDir, libDir } = detectProjectDir();

  log();
  log(`${ANSI.bold}${ANSI.green}kilo/ui${ANSI.reset} ${ANSI.dim}v${VERSION}${ANSI.reset}`);
  info(`Installing ${ANSI.bold}${name}${ANSI.reset} into project...`);

  // 1. Fetch metadata
  let metadata = null;
  try {
    metadata = await fetchJson(`${DEFAULT_REGISTRY_URL}/${name}`);
  } catch (err) {
    // Fallback to fetching raw file from GitHub
    log(`${ANSI.dim}Note: Registry endpoint not reachable, fetching directly from GitHub raw...${ANSI.reset}`);
  }

  let codeContent = null;
  if (metadata && metadata.files && metadata.files[0] && metadata.files[0].content) {
    codeContent = metadata.files[0].content;
  } else {
    try {
      codeContent = await fetchText(`${GITHUB_RAW_BASE}/registry/ui/${name}.tsx`);
    } catch (e) {
      error(`Component "${name}" was not found in kilo/ui registry.`);
      log();
      log(`Run ${ANSI.cyan}npx kiloui list${ANSI.reset} to see all available components.`);
      process.exit(1);
    }
  }

  // 2. Ensure utils helper exists
  ensureUtilsFile(libDir);

  // 3. Write component file
  fs.mkdirSync(componentsDir, { recursive: true });
  const targetFile = path.join(componentsDir, `${name}.tsx`);

  if (fs.existsSync(targetFile) && !options.overwrite) {
    warn(`File ${path.relative(cwd, targetFile)} already exists.`);
    log(`  Use ${ANSI.cyan}--overwrite${ANSI.reset} to replace existing file.`);
    return;
  }

  fs.writeFileSync(targetFile, codeContent, "utf-8");
  success(`Added ${ANSI.bold}${name}.tsx${ANSI.reset} to ${ANSI.dim}${path.relative(cwd, targetFile)}${ANSI.reset}`);

  // 4. Check dependencies in package.json
  const pkgJsonPath = path.join(cwd, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
      const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

      const requiredDeps = metadata?.dependencies || ["clsx", "tailwind-merge"];
      if (name.includes("shader") || name.includes("reveal") || name.includes("liquid") || name.includes("metal")) {
        if (!requiredDeps.includes("three")) requiredDeps.push("three");
        if (!requiredDeps.includes("@types/three")) requiredDeps.push("@types/three");
      }
      if (!requiredDeps.includes("lucide-react")) {
        requiredDeps.push("lucide-react");
      }

      const missing = requiredDeps.filter((d) => !deps[d]);
      if (missing.length > 0) {
        log();
        info(`Missing peer dependencies: ${ANSI.bold}${missing.join(", ")}${ANSI.reset}`);
        log(`Run: ${ANSI.cyan}npm install ${missing.join(" ")}${ANSI.reset}`);
      }
    } catch {
      // ignore
    }
  }

  log();
  success(`Done! You can now import it in your project:`);
  log(`${ANSI.cyan}import { ${name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")} } from "@/components/ui/${name}";${ANSI.reset}`);
  log();
}

async function listComponents() {
  log();
  log(`${ANSI.bold}${ANSI.green}kilo/ui Component Registry${ANSI.reset}`);
  log(`${ANSI.dim}Explore interactive previews at https://kilo-ui.vercel.app${ANSI.reset}`);
  log();

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
    // Fallback list of known registry items
    log(`Fetch error: ${err.message}`);
    log(`View registry online at: ${ANSI.cyan}https://github.com/Sourodip-1/kiloUI${ANSI.reset}`);
  }
}

function printHelp() {
  log(`
${ANSI.bold}${ANSI.green}kilo/ui CLI${ANSI.reset} - Modern copy-paste React & Next.js UI primitives.

${ANSI.bold}USAGE${ANSI.reset}
  $ ${ANSI.cyan}npx kiloui${ANSI.reset} <command> [options]

${ANSI.bold}COMMANDS${ANSI.reset}
  ${ANSI.cyan}add <component>${ANSI.reset}    Add a component to your project
  ${ANSI.cyan}list${ANSI.reset}               List all components available in the registry
  ${ANSI.cyan}init${ANSI.reset}               Initialize kilo/ui utilities in your project
  ${ANSI.cyan}help${ANSI.reset}               Display this help message

${ANSI.bold}OPTIONS${ANSI.reset}
  ${ANSI.cyan}--overwrite${ANSI.reset}        Overwrite existing component files without asking
  ${ANSI.cyan}-v, --version${ANSI.reset}      Output version number
  ${ANSI.cyan}-h, --help${ANSI.reset}         Display help

${ANSI.bold}EXAMPLES${ANSI.reset}
  $ npx kiloui add glass-reveal
  $ npx kiloui add button --overwrite
  $ npx kiloui list
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp();
    return;
  }

  if (command === "--version" || command === "-v") {
    log(`kilo-ui v${VERSION}`);
    return;
  }

  if (command === "add") {
    const componentName = args[1];
    if (!componentName) {
      error("Please specify a component name to add. Example: npx kiloui add glass-reveal");
      process.exit(1);
    }
    const overwrite = args.includes("--overwrite");
    await addComponent(componentName, { overwrite });
    return;
  }

  if (command === "list") {
    await listComponents();
    return;
  }

  if (command === "init") {
    const { libDir } = detectProjectDir();
    ensureUtilsFile(libDir);
    success("kilo/ui initialized successfully!");
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

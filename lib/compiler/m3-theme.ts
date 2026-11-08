/**
 * Material 3 Token Injection and CSS Custom Properties Resolver
 *
 * Translates theme metadata and seed hex colors into full Material 3 design tokens
 * and CSS variables scoped to the AST container.
 */

import type { DesignAST, TokenBinding } from "./types";
import { isTokenBinding } from "./types";

/**
 * Normalizes hex string into standard #rrggbb format
 */
export function normalizeHex(seed: string): string {
  let clean = seed.trim();
  if (clean.startsWith("%23") || clean.startsWith("%20")) {
    clean = clean.slice(3).trim();
  }
  if (clean.startsWith("#")) {
    clean = clean.slice(1).trim();
  }
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    return "#737673"; // Neutral fallback
  }
  return `#${clean.toLowerCase()}`;
}

/**
 * Converts RGB [0..255] to HSL [0..360, 0..1, 0..1]
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    if (max === rf) {
      h = ((gf - bf) / delta + (gf < bf ? 6 : 0)) * 60;
    } else if (max === gf) {
      h = ((bf - rf) / delta + 2) * 60;
    } else {
      h = ((rf - gf) / delta + 4) * 60;
    }
  }

  return [h, s, l];
}

/**
 * Converts HSL [0..360, 0..1, 0..1] to hex #rrggbb
 */
function hslToHex(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;
  const normS = Math.max(0, Math.min(1, s));
  const normL = Math.max(0, Math.min(1, l));

  const c = (1 - Math.abs(2 * normL - 1)) * normS;
  const x = c * (1 - Math.abs(((normH / 60) % 2) - 1));
  const m = normL - c / 2;
  let rf = 0;
  let gf = 0;
  let bf = 0;

  if (normH < 60) {
    rf = c;
    gf = x;
    bf = 0;
  } else if (normH < 120) {
    rf = x;
    gf = c;
    bf = 0;
  } else if (normH < 180) {
    rf = 0;
    gf = c;
    bf = x;
  } else if (normH < 240) {
    rf = 0;
    gf = x;
    bf = c;
  } else if (normH < 300) {
    rf = x;
    gf = 0;
    bf = c;
  } else {
    rf = c;
    gf = 0;
    bf = x;
  }

  const r = Math.round((rf + m) * 255);
  const g = Math.round((gf + m) * 255);
  const b = Math.round((bf + m) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Converts camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Generates an M3 tonal shade from hue, saturation, and tone (0-100)
 */
function toneToHex(hue: number, sat: number, tone: number): string {
  const lightness = tone / 100;
  const sAdjusted =
    tone < 20 || tone > 80 ? sat * (1.0 - Math.abs(tone - 50) / 70.0) : sat;
  return hslToHex(hue, Math.max(0.04, sAdjusted), lightness);
}

/**
 * Generates standard Material 3 color variables for light and dark modes
 */
export function generateM3Palette(seedHex: string, mode: "dark" | "light" = "dark"): Record<string, string> {
  const norm = normalizeHex(seedHex);
  const r = parseInt(norm.slice(1, 3), 16);
  const g = parseInt(norm.slice(3, 5), 16);
  const b = parseInt(norm.slice(5, 7), 16);
  const [hue, sat] = rgbToHsl(r, g, b);

  // Secondary & Tertiary
  const secHue = hue;
  const secSat = sat * 0.4;
  const tertHue = (hue + 60) % 360;
  const tertSat = sat * 0.6;
  const neuHue = hue;
  const neuSat = 0.04;
  const nvHue = hue;
  const nvSat = 0.08;
  const errHue = 15;
  const errSat = 0.85;

  const isDark = mode === "dark";

  const scheme: Record<string, string> = isDark
    ? {
        "primary": toneToHex(hue, sat, 80),
        "on-primary": toneToHex(hue, sat, 20),
        "primary-container": toneToHex(hue, sat, 30),
        "on-primary-container": toneToHex(hue, sat, 90),
        "secondary": toneToHex(secHue, secSat, 80),
        "on-secondary": toneToHex(secHue, secSat, 20),
        "secondary-container": toneToHex(secHue, secSat, 30),
        "on-secondary-container": toneToHex(secHue, secSat, 90),
        "tertiary": toneToHex(tertHue, tertSat, 80),
        "on-tertiary": toneToHex(tertHue, tertSat, 20),
        "tertiary-container": toneToHex(tertHue, tertSat, 30),
        "on-tertiary-container": toneToHex(tertHue, tertSat, 90),
        "surface": toneToHex(neuHue, neuSat, 6),
        "on-surface": toneToHex(neuHue, neuSat, 90),
        "surface-variant": toneToHex(nvHue, nvSat, 30),
        "on-surface-variant": toneToHex(nvHue, nvSat, 80),
        "surface-dim": toneToHex(neuHue, neuSat, 6),
        "surface-bright": toneToHex(neuHue, neuSat, 24),
        "surface-container-lowest": toneToHex(neuHue, neuSat, 4),
        "surface-container-low": toneToHex(neuHue, neuSat, 10),
        "surface-container": toneToHex(neuHue, neuSat, 12),
        "surface-container-high": toneToHex(neuHue, neuSat, 17),
        "surface-container-highest": toneToHex(neuHue, neuSat, 22),
        "outline": toneToHex(nvHue, nvSat, 60),
        "outline-variant": toneToHex(nvHue, nvSat, 30),
        "background": toneToHex(neuHue, neuSat, 6),
        "on-background": toneToHex(neuHue, neuSat, 90),
        "error": toneToHex(errHue, errSat, 80),
        "on-error": toneToHex(errHue, errSat, 20),
      }
    : {
        "primary": toneToHex(hue, sat, 40),
        "on-primary": toneToHex(hue, sat, 100),
        "primary-container": toneToHex(hue, sat, 90),
        "on-primary-container": toneToHex(hue, sat, 10),
        "secondary": toneToHex(secHue, secSat, 40),
        "on-secondary": toneToHex(secHue, secSat, 100),
        "secondary-container": toneToHex(secHue, secSat, 90),
        "on-secondary-container": toneToHex(secHue, secSat, 10),
        "tertiary": toneToHex(tertHue, tertSat, 40),
        "on-tertiary": toneToHex(tertHue, tertSat, 100),
        "tertiary-container": toneToHex(tertHue, tertSat, 90),
        "on-tertiary-container": toneToHex(tertHue, tertSat, 10),
        "surface": toneToHex(neuHue, neuSat, 98),
        "on-surface": toneToHex(neuHue, neuSat, 10),
        "surface-variant": toneToHex(nvHue, nvSat, 90),
        "on-surface-variant": toneToHex(nvHue, nvSat, 30),
        "surface-dim": toneToHex(neuHue, neuSat, 87),
        "surface-bright": toneToHex(neuHue, neuSat, 98),
        "surface-container-lowest": toneToHex(neuHue, neuSat, 100),
        "surface-container-low": toneToHex(neuHue, neuSat, 96),
        "surface-container": toneToHex(neuHue, neuSat, 94),
        "surface-container-high": toneToHex(neuHue, neuSat, 92),
        "surface-container-highest": toneToHex(neuHue, neuSat, 90),
        "outline": toneToHex(nvHue, nvSat, 50),
        "outline-variant": toneToHex(nvHue, nvSat, 80),
        "background": toneToHex(neuHue, neuSat, 98),
        "on-background": toneToHex(neuHue, neuSat, 10),
        "error": toneToHex(errHue, errSat, 40),
        "on-error": toneToHex(errHue, errSat, 100),
      };

  const cssVars: Record<string, string> = {};
  for (const [role, hex] of Object.entries(scheme)) {
    cssVars[`--md-sys-color-${role}`] = hex;
  }

  // Elevation Level Shadows
  cssVars["--md-sys-elevation-level0"] = "none";
  cssVars["--md-sys-elevation-level1"] = "0 1px 3px 1px rgba(0, 0, 0, 0.25)";
  cssVars["--md-sys-elevation-level2"] = "0 2px 6px 2px rgba(0, 0, 0, 0.30)";
  cssVars["--md-sys-elevation-level3"] = "0 4px 12px 3px rgba(0, 0, 0, 0.35)";
  cssVars["--md-sys-elevation-level4"] = "0 6px 16px 4px rgba(0, 0, 0, 0.40)";
  cssVars["--md-sys-elevation-level5"] = "0 8px 24px 6px rgba(0, 0, 0, 0.45)";

  // Bridge to Kilo UI Variables
  cssVars["--bg-main"] = cssVars["--md-sys-color-surface"];
  cssVars["--surface-elevated"] = cssVars["--md-sys-color-surface-container"];
  cssVars["--surface-secondary"] = cssVars["--md-sys-color-surface-container-low"];
  cssVars["--surface-tertiary"] = cssVars["--md-sys-color-surface-container-high"];
  cssVars["--text-primary"] = cssVars["--md-sys-color-on-surface"];
  cssVars["--text-secondary"] = cssVars["--md-sys-color-on-surface-variant"];
  cssVars["--border"] = cssVars["--md-sys-color-outline-variant"];
  cssVars["--border-subtle"] = cssVars["--md-sys-color-outline-variant"];
  cssVars["--accent-green"] = cssVars["--md-sys-color-primary"];

  return cssVars;
}

/**
 * Resolves all CSS custom properties for a given DesignAST
 */
export function resolveM3Tokens(ast: DesignAST): Record<string, string> {
  const seedHex =
    ast.theme?.seedHex ||
    (typeof ast.meta?.seedColor === "string" ? ast.meta.seedColor : "#737673");

  const mode =
    ast.theme?.mode === "light" || ast.meta?.colorScheme === "light"
      ? "light"
      : "dark";

  // Base palette generated from seed
  const variables = generateM3Palette(seedHex, mode);

  // Override with explicit ast.theme.m3 properties
  if (ast.theme?.m3) {
    for (const [key, value] of Object.entries(ast.theme.m3)) {
      if (typeof value === "string") {
        const kebabKey = camelToKebab(key);
        variables[`--md-sys-color-${kebabKey}`] = value;
      }
    }
  }

  // Override with explicit ast.theme.tokens
  if (ast.theme?.tokens) {
    for (const [key, value] of Object.entries(ast.theme.tokens)) {
      if (typeof value === "string") {
        if (key.startsWith("--")) {
          variables[key] = value;
        } else {
          variables[`--md-sys-color-${camelToKebab(key)}`] = value;
        }
      }
    }
  }

  return variables;
}

/**
 * Resolves a token binding to its CSS variable representation
 */
export function resolveTokenValue(binding: TokenBinding): string {
  let token = binding.$token.trim();
  if (token.startsWith("m3.color.")) {
    const role = token.replace("m3.color.", "");
    token = `--md-sys-color-${camelToKebab(role)}`;
  } else if (token.startsWith("m3.elevation.")) {
    const level = token.replace("m3.elevation.", "");
    token = `--md-sys-elevation-${level}`;
  }

  if (binding.fallback) {
    return `var(${token}, ${binding.fallback})`;
  }
  return `var(${token})`;
}

/**
 * Recursively resolves any TokenBindings in props
 */
export function resolvePropTokens(props?: Record<string, unknown>): Record<string, unknown> {
  if (!props) return {};
  const result: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(props)) {
    if (isTokenBinding(val)) {
      result[key] = resolveTokenValue(val);
    } else if (Array.isArray(val)) {
      result[key] = val.map((item) =>
        isTokenBinding(item) ? resolveTokenValue(item) : item
      );
    } else if (typeof val === "object" && val !== null) {
      result[key] = resolvePropTokens(val as Record<string, unknown>);
    } else {
      result[key] = val;
    }
  }

  return result;
}

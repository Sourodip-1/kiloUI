/**
 * Material 3 Design Token Generator (TypeScript Edition)
 *
 * Generates Material 3 tonal palettes (0-100), light and dark semantic color
 * schemes, surface container elevation levels, and --md-sys-color-* CSS variables.
 */

export const STANDARD_TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

export function normalizeHexColor(seed: string): string {
  let clean = seed.trim();
  if (clean.startsWith("%23") || clean.startsWith("%20")) {
    clean = clean.substring(3).trim();
  }
  if (clean.startsWith("#")) {
    clean = clean.substring(1).trim();
  }
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(clean)) {
    throw new Error(`Invalid seed hex color "${seed}". Expected 3 or 6 hex digits.`);
  }
  return `#${clean.toLowerCase()}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function calculateM3Palette(seedHex: string) {
  const normHex = normalizeHexColor(seedHex);
  const r = parseInt(normHex.slice(1, 3), 16);
  const g = parseInt(normHex.slice(3, 5), 16);
  const b = parseInt(normHex.slice(5, 7), 16);

  const [hue, sat] = rgbToHsl(r, g, b);

  const toneToHex = (h: number, s: number, t: number): string => {
    const lightness = t / 100;
    const sAdjusted = t < 20 || t > 80 ? s * (1 - Math.abs(t - 50) / 70) : s;
    return hslToHex(h, Math.max(0.05, sAdjusted), lightness);
  };

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

  const palettes: Record<string, Record<string, string>> = {
    primary: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(hue, sat, t)])),
    secondary: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(secHue, secSat, t)])),
    tertiary: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(tertHue, tertSat, t)])),
    neutral: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(neuHue, neuSat, t)])),
    neutralVariant: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(nvHue, nvSat, t)])),
    error: Object.fromEntries(STANDARD_TONES.map((t) => [String(t), toneToHex(errHue, errSat, t)])),
  };

  const lightScheme: Record<string, string> = {
    primary: toneToHex(hue, sat, 40),
    onPrimary: toneToHex(hue, sat, 100),
    primaryContainer: toneToHex(hue, sat, 90),
    onPrimaryContainer: toneToHex(hue, sat, 10),
    inversePrimary: toneToHex(hue, sat, 80),
    secondary: toneToHex(secHue, secSat, 40),
    onSecondary: toneToHex(secHue, secSat, 100),
    secondaryContainer: toneToHex(secHue, secSat, 90),
    onSecondaryContainer: toneToHex(secHue, secSat, 10),
    tertiary: toneToHex(tertHue, tertSat, 40),
    onTertiary: toneToHex(tertHue, tertSat, 100),
    tertiaryContainer: toneToHex(tertHue, tertSat, 90),
    onTertiaryContainer: toneToHex(tertHue, tertSat, 10),
    error: toneToHex(errHue, errSat, 40),
    onError: toneToHex(errHue, errSat, 100),
    errorContainer: toneToHex(errHue, errSat, 90),
    onErrorContainer: toneToHex(errHue, errSat, 10),
    surface: toneToHex(neuHue, neuSat, 98),
    onSurface: toneToHex(neuHue, neuSat, 10),
    surfaceVariant: toneToHex(nvHue, nvSat, 90),
    onSurfaceVariant: toneToHex(nvHue, nvSat, 30),
    inverseSurface: toneToHex(neuHue, neuSat, 20),
    inverseOnSurface: toneToHex(neuHue, neuSat, 95),
    surfaceContainerLowest: toneToHex(neuHue, neuSat, 100),
    surfaceContainerLow: toneToHex(neuHue, neuSat, 96),
    surfaceContainer: toneToHex(neuHue, neuSat, 94),
    surfaceContainerHigh: toneToHex(neuHue, neuSat, 92),
    surfaceContainerHighest: toneToHex(neuHue, neuSat, 90),
    outline: toneToHex(nvHue, nvSat, 50),
    outlineVariant: toneToHex(nvHue, nvSat, 80),
    background: toneToHex(neuHue, neuSat, 98),
    onBackground: toneToHex(neuHue, neuSat, 10),
    scrim: "#000000",
    shadow: "#000000",
  };

  const darkScheme: Record<string, string> = {
    primary: toneToHex(hue, sat, 80),
    onPrimary: toneToHex(hue, sat, 20),
    primaryContainer: toneToHex(hue, sat, 30),
    onPrimaryContainer: toneToHex(hue, sat, 90),
    inversePrimary: toneToHex(hue, sat, 40),
    secondary: toneToHex(secHue, secSat, 80),
    onSecondary: toneToHex(secHue, secSat, 20),
    secondaryContainer: toneToHex(secHue, secSat, 30),
    onSecondaryContainer: toneToHex(secHue, secSat, 90),
    tertiary: toneToHex(tertHue, tertSat, 80),
    onTertiary: toneToHex(tertHue, tertSat, 20),
    tertiaryContainer: toneToHex(tertHue, tertSat, 30),
    onTertiaryContainer: toneToHex(tertHue, tertSat, 90),
    error: toneToHex(errHue, errSat, 80),
    onError: toneToHex(errHue, errSat, 20),
    errorContainer: toneToHex(errHue, errSat, 30),
    onErrorContainer: toneToHex(errHue, errSat, 90),
    surface: toneToHex(neuHue, neuSat, 6),
    onSurface: toneToHex(neuHue, neuSat, 90),
    surfaceVariant: toneToHex(nvHue, nvSat, 30),
    onSurfaceVariant: toneToHex(nvHue, nvSat, 80),
    inverseSurface: toneToHex(neuHue, neuSat, 90),
    inverseOnSurface: toneToHex(neuHue, neuSat, 20),
    surfaceContainerLowest: toneToHex(neuHue, neuSat, 4),
    surfaceContainerLow: toneToHex(neuHue, neuSat, 10),
    surfaceContainer: toneToHex(neuHue, neuSat, 12),
    surfaceContainerHigh: toneToHex(neuHue, neuSat, 17),
    surfaceContainerHighest: toneToHex(neuHue, neuSat, 22),
    outline: toneToHex(nvHue, nvSat, 60),
    outlineVariant: toneToHex(nvHue, nvSat, 30),
    background: toneToHex(neuHue, neuSat, 6),
    onBackground: toneToHex(neuHue, neuSat, 90),
    scrim: "#000000",
    shadow: "#000000",
  };

  const cssVariables: Record<string, string> = {};
  for (const [role, hex] of Object.entries(darkScheme)) {
    cssVariables[`--md-sys-color-${camelToKebab(role)}`] = hex;
  }
  for (const [role, hex] of Object.entries(lightScheme)) {
    cssVariables[`--md-sys-color-${camelToKebab(role)}-light`] = hex;
  }

  return {
    seed: normHex,
    palettes,
    schemes: {
      light: lightScheme,
      dark: darkScheme,
    },
    css_variables: cssVariables,
  };
}

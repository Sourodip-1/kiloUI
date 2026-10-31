"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAppShell } from "@/components/app-shell";

export interface LiquidMetalBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Theme override: 'dark', 'light', or 'system' (inherits from app shell by default) */
  theme?: "dark" | "light" | "system";
  /** Visual intensity: subtle (quieter), balanced (default), or dramatic (rich reflections) */
  intensity?: "subtle" | "balanced" | "dramatic";
  /** Animation speed multiplier (default: 1.0) */
  speed?: number;
  /** Whether cursor hover influences camera parallax and viscous fluid displacement */
  interactive?: boolean;
  /** Metallic color reflection tone */
  colorTone?: "cobalt-chrome" | "pure-silver" | "liquid-gold" | "titanium";
  /** Optional foreground children overlay (hero copy, CTA, badges) */
  children?: React.ReactNode;
}

/* ─────────────────────────────────────────────────────────────────── */
/* GLSL Shaders (Raymarched Viscous Fluid SDF Ribbons & Mercury Physics) */
/* ─────────────────────────────────────────────────────────────────── */

const VS_SOURCE_ES3 = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FS_SOURCE_ES3 = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;           // Camera parallax tilt [-1, 1]
uniform vec3 uCursor3D;        // Exact 3D world position of cursor on fluid focal plane
uniform vec2 uCursorVel;       // Cursor velocity vector for viscous stretching
uniform float uCursorActive;   // 0.0 = cursor off/hidden, 1.0 = cursor active in fluid
uniform float uMouseEnergy;    // Viscous turbulence & surface ripple energy
uniform vec4 uClickRipple;     // (x, y, startTime, active)
uniform float uTheme;          // 0.0 = Dark, 1.0 = Light (smoothly interpolated)
uniform float uIntensity;      // 0.75 = subtle, 1.0 = balanced, 1.35 = dramatic
uniform int uColorTone;        // 0 = cobalt-chrome, 1 = pure-silver, 2 = liquid-gold, 3 = titanium
uniform float uSpeed;

// Smooth minimum for organic fluid fusion & surface tension
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// 2D Rotation matrix
mat2 rot2D(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

// Global Scene Signed Distance Field with Real-Time Viscous Fluid Interaction
float map(vec3 p) {
  float t = uTime * 0.42 * uSpeed;

  // -------------------------------------------------------------
  // 0. VISCOUS FLUID FIELD INTERACTION (Magnetic Meniscus Pull & Ripples)
  // -------------------------------------------------------------
  vec3 pMod = p;
  if (uCursorActive > 0.01) {
    // Viscous attraction: ribbons physically stretch & bulge towards the mouse cursor
    float distToCursor = length(p.xy - uCursor3D.xy);
    float pull = exp(-distToCursor * 2.5) * 0.35 * uCursorActive;
    pMod.xy += (uCursor3D.xy - p.xy) * pull;

    // Viscous fluid wake ripples radiating outward from cursor motion
    float ripple = sin(distToCursor * 13.0 - uTime * 5.0) * exp(-distToCursor * 3.0) * 0.09 * uMouseEnergy * uCursorActive;
    pMod.z += ripple;
  }

  // Click shockwave ripple
  float clickAge = uTime - uClickRipple.z;
  if (uClickRipple.w > 0.5 && clickAge > 0.0 && clickAge < 2.5) {
    float waveDist = length(p.xy - uClickRipple.xy);
    float wavePhase = waveDist - clickAge * 2.2;
    float wave = sin(wavePhase * 15.0) * exp(-abs(wavePhase) * 3.6) * exp(-clickAge * 1.4) * 0.18;
    pMod.z += wave;
  }

  // -------------------------------------------------------------
  // 1. PRIMARY FLOWING CHROME RIBBON (Upper-Right into Center-Right)
  // -------------------------------------------------------------
  vec3 p1 = pMod - vec3(0.85, 0.45, 0.05);
  float wave1 = sin(p1.x * 1.1 + t * 0.8) * 0.42 + cos(p1.y * 1.3 - t * 0.5) * 0.25;
  float waveZ1 = cos(p1.x * 0.85 + t * 0.45) * 0.38;
  vec3 pos1 = vec3(p1.x, p1.y - wave1, p1.z - waveZ1);
  float twist1 = p1.x * 0.85 + t * 0.65;
  pos1.yz = rot2D(twist1) * pos1.yz;
  float dRibbon1 = length(vec2(pos1.y * 2.0, pos1.z * 0.72)) - (0.28 + 0.08 * sin(pMod.x * 1.5 - t));

  // -------------------------------------------------------------
  // 2. SECONDARY FLOWING CHROME RIBBON (Bottom-Right Undulation)
  // -------------------------------------------------------------
  vec3 p2 = pMod - vec3(0.70, -0.70, -0.15);
  float wave2 = sin(p2.x * 1.35 - t * 0.75) * 0.35 + cos(p2.z * 1.05 + t * 0.55) * 0.26;
  vec3 pos2 = vec3(p2.x, p2.y - wave2, p2.z);
  float twist2 = p2.x * 0.95 - t * 0.7;
  pos2.yz = rot2D(twist2) * pos2.yz;
  float dRibbon2 = length(vec2(pos2.y * 2.3, pos2.z * 0.7)) - (0.24 + 0.06 * cos(pMod.x * 1.7 + t));

  // -------------------------------------------------------------
  // 3. TERTIARY FLUID STREAM (Far Left Edge Perimeter Frame)
  // -------------------------------------------------------------
  vec3 p3 = pMod - vec3(-1.45, 0.55, -0.35);
  float wave3 = sin(p3.y * 1.25 + t * 0.6) * 0.32 + cos(p3.x * 0.9 - t * 0.4) * 0.22;
  vec3 pos3 = vec3(p3.x - wave3, p3.y, p3.z);
  float twist3 = p3.y * 0.8 + t * 0.5;
  pos3.xz = rot2D(twist3) * pos3.xz;
  float dRibbon3 = length(vec2(pos3.x * 1.8, pos3.z * 0.75)) - 0.20;

  // -------------------------------------------------------------
  // 4. ORBITING FLUID METALLIC DROPLETS (Mercury Beads)
  // -------------------------------------------------------------
  vec3 dropPos1 = vec3(
    0.95 + sin(t * 1.2) * 0.85,
    0.45 + cos(t * 0.95) * 0.48,
    sin(t * 0.75) * 0.35
  );
  float dDrop1 = length(pMod - dropPos1) - 0.16;

  vec3 dropPos2 = vec3(
    0.65 + cos(t * 0.85) * 0.75,
    -0.55 + sin(t * 1.05) * 0.42,
    cos(t * 0.65) * 0.32
  );
  vec3 vel2 = vec3(-sin(t * 0.85) * 0.6, cos(t * 1.05) * 0.4, 0.1);
  vec3 normVel = normalize(vel2);
  vec3 dp2 = pMod - dropPos2;
  float dDrop2 = length(dp2 - clamp(dot(dp2, normVel), -0.12, 0.12) * normVel) - 0.14;

  vec3 dropPos3 = vec3(
    1.45 + sin(t * 0.7) * 0.35,
    0.85 + cos(t * 0.55) * 0.25,
    0.15
  );
  float dDrop3 = length(pMod - dropPos3) - 0.11;

  vec3 dropPos4 = vec3(
    -0.25 + cos(t * 0.8 + 2.2) * 0.65,
    -0.85 + sin(t * 0.65) * 0.25,
    -0.12
  );
  float dDrop4 = length(pMod - dropPos4) - 0.12;

  // -------------------------------------------------------------
  // 5. VISCOUS CURSOR MERCURY DROPLET (Directly under Pointer)
  // -------------------------------------------------------------
  float dCursor = 100.0;
  if (uCursorActive > 0.01) {
    vec3 cOffset = p - uCursor3D;
    float dropRadius = (0.24 + 0.03 * sin(t * 3.5)) * uCursorActive;
    dCursor = length(cOffset) - dropRadius;

    // Viscous elongation along cursor movement velocity
    float curSpeed = length(uCursorVel);
    if (curSpeed > 0.005) {
      vec3 normCVel = normalize(vec3(uCursorVel, 0.0));
      float stretch = min(curSpeed * 0.8, 0.26);
      float proj = clamp(dot(cOffset, normCVel), -stretch, stretch);
      dCursor = min(dCursor, length(cOffset - proj * normCVel) - dropRadius * 0.82);
    }
  }

  // -------------------------------------------------------------
  // 6. SMOOTH FLUID UNION (Surface Tension & Meniscus Fusion)
  // -------------------------------------------------------------
  float d = smin(dRibbon1, dRibbon2, 0.38);
  d = smin(d, dRibbon3, 0.34);
  d = smin(d, dDrop1, 0.35);
  d = smin(d, dDrop2, 0.32);
  d = smin(d, dDrop3, 0.26);
  d = smin(d, dDrop4, 0.28);

  // Viscous fluid fusion with cursor droplet
  if (uCursorActive > 0.01) {
    d = smin(d, dCursor, 0.48 * uCursorActive);
  }

  return d;
}

// Tetrahedron normal calculation (ultra-fast & numerically stable)
vec3 calcNormal(vec3 p) {
  const vec2 e = vec2(0.002, -0.002);
  return normalize(
    e.xyy * map(p + e.xyy) +
    e.yyx * map(p + e.yyx) +
    e.yxy * map(p + e.yxy) +
    e.xxx * map(p + e.xxx)
  );
}

// Studio HDRI Environment Reflection Model
vec3 sampleStudioHDRI(vec3 r, float theme, int tone) {
  vec3 baseMetal;
  vec3 highlightColor;
  vec3 rimColor;
  vec3 ambientGlow;

  if (tone == 2) {
    // Liquid Gold: 24k molten gold with rich amber & dark bronze depths
    baseMetal = vec3(0.24, 0.16, 0.05);
    highlightColor = vec3(1.0, 0.94, 0.68);
    rimColor = vec3(1.0, 0.80, 0.28);
    ambientGlow = vec3(0.85, 0.60, 0.18);
  } else if (tone == 1) {
    // Pure Silver / Platinum: mirror chrome with crisp neutral sheen
    baseMetal = vec3(0.18, 0.20, 0.23);
    highlightColor = vec3(1.0, 1.0, 1.0);
    rimColor = vec3(0.88, 0.93, 1.0);
    ambientGlow = vec3(0.70, 0.75, 0.85);
  } else if (tone == 3) {
    // Titanium Smoke: gunmetal sheen with cool slate tones
    baseMetal = vec3(0.14, 0.16, 0.20);
    highlightColor = vec3(0.92, 0.95, 1.0);
    rimColor = vec3(0.60, 0.72, 0.92);
    ambientGlow = vec3(0.50, 0.58, 0.70);
  } else {
    // Cobalt Chrome (Default): liquid mirror chrome with electric cobalt-blue caustics
    baseMetal = vec3(0.12, 0.15, 0.22);
    highlightColor = vec3(0.96, 0.98, 1.0);
    rimColor = vec3(0.25, 0.65, 1.0);
    ambientGlow = vec3(0.38, 0.62, 0.98);
  }

  // 1. Studio Softbox Dome (Upper ambient ceiling illumination)
  float dome = max(0.0, r.y * 0.5 + 0.5);
  float studioCeiling = pow(dome, 1.8) * 0.45;

  // 2. Primary Large Softbox Key Strip (Overhead angled light card)
  vec3 keyDir = normalize(vec3(0.45, 0.85, 0.35));
  float dotKey = max(0.0, dot(r, keyDir));
  float keyStrip = pow(dotKey, 5.0) * 1.5 + pow(dotKey, 28.0) * 2.2;

  // 3. Lateral Fill Strip (Accent side lighting)
  vec3 fillDir = normalize(vec3(-0.75, 0.35, 0.55));
  float dotFill = max(0.0, dot(r, fillDir));
  float fillStrip = pow(dotFill, 7.0) * 1.1;

  // 4. Studio Dark Graphite Panels (creates the iconic chrome bands)
  float bands = 0.5 + 0.5 * sin(r.x * 3.5 + r.y * 2.5 + r.z * 1.8);
  float darkCard = pow(bands, 2.0) * 0.55;

  // Dark Mode Material
  vec3 darkMetal = baseMetal + ambientGlow * (studioCeiling + darkCard) + highlightColor * (keyStrip + fillStrip);

  // Light Mode Material: crisp silver/gold with sharp graphite reflections
  vec3 lightMetal = mix(vec3(0.92, 0.94, 0.97), vec3(0.18, 0.20, 0.25), darkCard * 0.75);
  if (tone == 2) {
    lightMetal = mix(vec3(0.98, 0.88, 0.60), vec3(0.35, 0.22, 0.08), darkCard * 0.75);
  }
  lightMetal += highlightColor * (keyStrip * 0.7 + 0.18);
  lightMetal += rimColor * (fillStrip * 0.4);

  return mix(darkMetal, lightMetal, theme);
}

// Background Canvas
vec3 getBackground(vec2 uv, float theme, int tone) {
  // Dark mode background: deep obsidian with subtle center luminescence
  vec3 darkBg = mix(vec3(0.045, 0.050, 0.065), vec3(0.016, 0.018, 0.025), length(uv * 0.85));

  // Light mode background: clean white / soft cool platinum #f8f9fa
  vec3 lightBg = mix(vec3(0.985, 0.988, 0.992), vec3(0.925, 0.938, 0.955), length(uv * 0.8));

  return mix(darkBg, lightBg, theme);
}

void main() {
  vec2 res = max(uResolution, vec2(1.0, 1.0));
  vec2 uv = (gl_FragCoord.xy - 0.5 * res.xy) / min(res.x, res.y);

  // Parallax camera setup with smooth mouse reaction
  vec3 ro = vec3(uMouse.x * 0.45, uMouse.y * 0.35, 3.2);
  vec3 rd = normalize(vec3(uv, -1.9));

  // Background base
  vec3 col = getBackground(uv, uTheme, uColorTone);

  // Raymarching Loop
  float t = 0.4;
  float tMax = 5.5;
  bool hit = false;
  vec3 p = ro;
  float minD = 100.0;

  for (int i = 0; i < 54; i++) {
    p = ro + rd * t;
    float d = map(p);
    minD = min(minD, d);

    if (d < 0.002) {
      hit = true;
      break;
    }
    t += d * 0.85;
    if (t > tMax) break;
  }

  // Accent rim color per tone
  vec3 rimAccent;
  if (uColorTone == 2) rimAccent = vec3(1.0, 0.78, 0.28);
  else if (uColorTone == 1) rimAccent = vec3(0.85, 0.92, 1.0);
  else if (uColorTone == 3) rimAccent = vec3(0.60, 0.72, 0.92);
  else rimAccent = vec3(0.25, 0.65, 1.0);

  if (hit) {
    vec3 n = calcNormal(p);
    vec3 ref = reflect(rd, n);

    // Fresnel reflectance equation
    float fresnel = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);

    // Chrome Environment Reflection
    vec3 chrome = sampleStudioHDRI(ref, uTheme, uColorTone);

    // Dynamic Rim Illumination along grazing silhouettes
    chrome += rimAccent * fresnel * (uTheme < 0.5 ? 1.25 : 0.65);

    // Key Specular Glint
    vec3 keyLight = normalize(vec3(0.7, 1.1, 0.8));
    vec3 h = normalize(keyLight - rd);
    float spec = pow(max(dot(n, h), 0.0), 56.0);
    chrome += vec3(1.0) * spec * 1.35;

    // Apply intensity multiplier
    chrome *= uIntensity;

    // Depth fog blend into background
    float depthFade = smoothstep(tMax * 0.75, tMax, t);
    col = mix(chrome, col, depthFade);
  } else {
    // Atmospheric ambient halo around the ribbons in dark mode
    if (uTheme < 0.95) {
      float glow = exp(-max(minD, 0.0) * 4.2) * 0.22 * (1.0 - uTheme * 0.6);
      col += rimAccent * glow * uIntensity;
    }

    // Soft contact shadow on background plane in Light Mode
    if (uTheme > 0.01) {
      vec3 shadowPlaneP = ro + rd * ((-1.6 - ro.z) / rd.z);
      if (shadowPlaneP.z < -1.5) {
        float shadowDist = map(vec3(shadowPlaneP.xy, -0.2));
        float shadowFactor = smoothstep(0.0, 0.65, shadowDist);
        col = mix(col * mix(0.72, 1.0, shadowFactor), col, 1.0 - uTheme);
      }
    }
  }

  // Subtle film grain dither to eliminate 8-bit color banding
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.012;
  col += vec3(grain);

  fragColor = vec4(col, 1.0);
}
`;

/* ─────────────────────────────────────────────────────────────────── */
/* Component Implementation                                            */
/* ─────────────────────────────────────────────────────────────────── */

export function LiquidMetalBackground({
  theme: themeProp,
  intensity = "balanced",
  speed = 1.0,
  interactive = true,
  colorTone = "cobalt-chrome",
  children,
  className,
  style,
  ...props
}: LiquidMetalBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // App shell theme integration
  let appShellTheme: "dark" | "light" | "system" | null = null;
  try {
    const shell = useAppShell();
    appShellTheme = shell.theme;
  } catch {
    appShellTheme = null;
  }

  const effectiveThemeProp = themeProp || appShellTheme || "system";

  // Track active light/dark state
  const [resolvedIsLight, setResolvedIsLight] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (effectiveThemeProp === "light") return true;
    if (effectiveThemeProp === "dark") return false;
    return (
      document.documentElement.classList.contains("light") ||
      (!document.documentElement.classList.contains("dark") &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    );
  });

  const targetThemeRef = React.useRef<number>(resolvedIsLight ? 1.0 : 0.0);

  React.useEffect(() => {
    const checkTheme = () => {
      let isLight = false;
      if (effectiveThemeProp === "light") {
        isLight = true;
      } else if (effectiveThemeProp === "dark") {
        isLight = false;
      } else {
        const isHtmlLight = document.documentElement.classList.contains("light");
        const isHtmlDark = document.documentElement.classList.contains("dark");
        if (isHtmlLight) isLight = true;
        else if (isHtmlDark) isLight = false;
        else isLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      }
      setResolvedIsLight(isLight);
      targetThemeRef.current = isLight ? 1.0 : 0.0;
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const mql = window.matchMedia("(prefers-color-scheme: light)");
    mql.addEventListener("change", checkTheme);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", checkTheme);
    };
  }, [effectiveThemeProp]);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Settings ref: keeps all dynamic props up-to-date without rebuilding the WebGL context
  let toneId = 0;
  if (colorTone === "pure-silver") toneId = 1;
  else if (colorTone === "liquid-gold") toneId = 2;
  else if (colorTone === "titanium") toneId = 3;

  let intensityVal = 1.0;
  if (intensity === "subtle") intensityVal = 0.75;
  else if (intensity === "dramatic") intensityVal = 1.35;

  const settingsRef = React.useRef({
    toneId,
    intensity: intensityVal,
    speed,
    interactive,
    prefersReducedMotion,
  });

  settingsRef.current = {
    toneId,
    intensity: intensityVal,
    speed,
    interactive,
    prefersReducedMotion,
  };

  // Viscous Fluid Interaction References
  const fluidStateRef = React.useRef({
    targetMouseParallax: { x: 0, y: 0 },
    currentMouseParallax: { x: 0, y: 0 },
    targetCursor3D: { x: 0, y: 0, z: 0.05 },
    currentCursor3D: { x: 0, y: 0, z: 0.05 },
    prevCursor3D: { x: 0, y: 0, z: 0.05 },
    cursorVel: { x: 0, y: 0 },
    targetActive: 0.0,
    currentActive: 0.0,
    mouseEnergy: 0.0,
    clickRipple: { x: 0, y: 0, time: -100, active: 0 },
  });

  // WebGL Animation & Render Lifecycle (initialized ONCE on mount)
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // WebGL2 Context initialization
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL2 not supported for LiquidMetalBackground.");
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("LiquidMetal Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VS_SOURCE_ES3);
    const fs = createShader(gl.FRAGMENT_SHADER, FS_SOURCE_ES3);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("LiquidMetal Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, "uResolution");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uCursor3DLoc = gl.getUniformLocation(program, "uCursor3D");
    const uCursorVelLoc = gl.getUniformLocation(program, "uCursorVel");
    const uCursorActiveLoc = gl.getUniformLocation(program, "uCursorActive");
    const uMouseEnergyLoc = gl.getUniformLocation(program, "uMouseEnergy");
    const uClickRippleLoc = gl.getUniformLocation(program, "uClickRipple");
    const uThemeLoc = gl.getUniformLocation(program, "uTheme");
    const uIntensityLoc = gl.getUniformLocation(program, "uIntensity");
    const uColorToneLoc = gl.getUniformLocation(program, "uColorTone");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");

    // Exact 3D Fluid Focal Projection Scale (Camera Z / Focal Dist = 3.2 / 1.9)
    const PROJ_SCALE = 3.2 / 1.9;

    const handlePointerMove = (e: PointerEvent) => {
      if (!settingsRef.current.interactive) return;
      const rect = container.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        fluidStateRef.current.targetActive = 1.0;
        const mouseXPixels = (e.clientX - rect.left) - rect.width * 0.5;
        const mouseYPixels = rect.height * 0.5 - (e.clientY - rect.top);
        const minDim = Math.min(rect.width, rect.height) || 1;
        const normX = mouseXPixels / minDim;
        const normY = mouseYPixels / minDim;

        // Map directly into 3D world space at the liquid ribbon focal plane
        fluidStateRef.current.targetCursor3D.x = normX * PROJ_SCALE;
        fluidStateRef.current.targetCursor3D.y = normY * PROJ_SCALE;

        // Subtle camera parallax
        const px = (mouseXPixels / (rect.width * 0.5 || 1));
        const py = (mouseYPixels / (rect.height * 0.5 || 1));
        fluidStateRef.current.targetMouseParallax.x = Math.max(-1, Math.min(1, px));
        fluidStateRef.current.targetMouseParallax.y = Math.max(-1, Math.min(1, py));

        // Inject kinetic energy into fluid
        fluidStateRef.current.mouseEnergy = Math.min(fluidStateRef.current.mouseEnergy + 0.35, 1.6);
      } else {
        fluidStateRef.current.targetActive = 0.0;
        fluidStateRef.current.targetMouseParallax.x *= 0.5;
        fluidStateRef.current.targetMouseParallax.y *= 0.5;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (!settingsRef.current.interactive) return;
      const rect = container.getBoundingClientRect();
      const mouseXPixels = (e.clientX - rect.left) - rect.width * 0.5;
      const mouseYPixels = rect.height * 0.5 - (e.clientY - rect.top);
      const minDim = Math.min(rect.width, rect.height) || 1;
      const normX = (mouseXPixels / minDim) * PROJ_SCALE;
      const normY = (mouseYPixels / minDim) * PROJ_SCALE;

      fluidStateRef.current.clickRipple = {
        x: normX,
        y: normY,
        time: performance.now() * 0.001,
        active: 1,
      };
      fluidStateRef.current.mouseEnergy = 1.8;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown, { passive: true });

    // Smooth theme interpolation state
    let themeProgress = targetThemeRef.current;

    // Responsive Canvas Resize Observer
    const resize = () => {
      const width = container.clientWidth || 640;
      const height = container.clientHeight || 360;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const pixelWidth = Math.max(1, Math.round(width * dpr));
      const pixelHeight = Math.max(1, Math.round(height * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Animation Loop with Visibility & Intersection pausing
    let isVisible = true;
    let animId = 0;
    let startTime = performance.now();
    let lastTime = startTime;
    let totalTime = 0;

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((e) => e.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    io.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      const s = settingsRef.current;
      const effectiveSpeed = s.prefersReducedMotion ? 0.15 : s.speed;
      totalTime += dt * effectiveSpeed;

      const fluid = fluidStateRef.current;

      // Smooth camera parallax spring
      fluid.currentMouseParallax.x += (fluid.targetMouseParallax.x - fluid.currentMouseParallax.x) * 0.06;
      fluid.currentMouseParallax.y += (fluid.targetMouseParallax.y - fluid.currentMouseParallax.y) * 0.06;

      // Viscous spring tracking for 3D cursor droplet
      fluid.prevCursor3D.x = fluid.currentCursor3D.x;
      fluid.prevCursor3D.y = fluid.currentCursor3D.y;
      fluid.currentCursor3D.x += (fluid.targetCursor3D.x - fluid.currentCursor3D.x) * 0.14;
      fluid.currentCursor3D.y += (fluid.targetCursor3D.y - fluid.currentCursor3D.y) * 0.14;

      // Compute cursor velocity vector for viscous droplet elongation
      fluid.cursorVel.x = (fluid.currentCursor3D.x - fluid.prevCursor3D.x) / Math.max(dt, 0.016);
      fluid.cursorVel.y = (fluid.currentCursor3D.y - fluid.prevCursor3D.y) / Math.max(dt, 0.016);

      // Smooth active transition (fades droplet in/out when cursor enters/leaves)
      fluid.currentActive += (fluid.targetActive - fluid.currentActive) * 0.08;

      // Dissipate viscous mouse energy
      fluid.mouseEnergy *= 0.94;

      // Smooth theme transitions (no pops or animation resets)
      themeProgress += (targetThemeRef.current - themeProgress) * 0.08;

      // Viewport and dynamic resolution update
      const cWidth = canvas.width || 640;
      const cHeight = canvas.height || 360;
      gl.viewport(0, 0, cWidth, cHeight);

      // Uniform bindings for 3D viscous fluid simulation
      gl.uniform2f(uResLoc, cWidth, cHeight);
      gl.uniform1f(uTimeLoc, totalTime);
      gl.uniform2f(uMouseLoc, fluid.currentMouseParallax.x, fluid.currentMouseParallax.y);
      gl.uniform3f(uCursor3DLoc, fluid.currentCursor3D.x, fluid.currentCursor3D.y, fluid.currentCursor3D.z);
      gl.uniform2f(uCursorVelLoc, fluid.cursorVel.x * 0.18, fluid.cursorVel.y * 0.18);
      gl.uniform1f(uCursorActiveLoc, fluid.currentActive);
      gl.uniform1f(uMouseEnergyLoc, fluid.mouseEnergy);
      gl.uniform4f(
        uClickRippleLoc,
        fluid.clickRipple.x,
        fluid.clickRipple.y,
        fluid.clickRipple.time,
        fluid.clickRipple.active
      );
      gl.uniform1f(uThemeLoc, themeProgress);
      gl.uniform1f(uIntensityLoc, s.intensity);
      gl.uniform1i(uColorToneLoc, s.toneId);
      gl.uniform1f(uSpeedLoc, effectiveSpeed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    // Complete cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ro.disconnect();
      io.disconnect();

      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none", className)}
      style={style}
      {...props}
    >
      {/* 3D Viscous Liquid Chrome Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Optional Foreground Content Slot */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

export default LiquidMetalBackground;

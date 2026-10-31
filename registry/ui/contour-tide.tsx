"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ContourTidePreset = "silver" | "ocean" | "gold" | "cyberpunk" | "emerald";

export interface ContourTideProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual theme preset */
  preset?: ContourTidePreset;
  /** Canvas background color (hex, default '#0a0a0a') */
  backgroundColor?: string;
  /** Deep water trough particle color (hex, default '#6E6E80') */
  waterColor?: string;
  /** Wave crest and foam particle highlight color (hex, default '#FFFFFF') */
  crestColor?: string;
  /** Particle density multiplier (0.2 - 2.0, default 1.00) */
  density?: number;
  /** Base particle point size (0.2 - 3.0, default 1.00) */
  particleSize?: number;
  /** Vertical wave displacement amplitude (0.1 - 3.0, default 1.00) */
  waveHeight?: number;
  /** Gerstner choppiness for steep crests (0.0 - 2.0, default 0.80) */
  choppiness?: number;
  /** Base wave frequency scale (0.2 - 3.0, default 1.00) */
  wavelength?: number;
  /** Wind direction angle in degrees (0 - 360, default 0) */
  windAngle?: number;
  /** Camera horizon height factor (0.0 - 0.5, default 0.10) */
  horizon?: number;
  /** Atmospheric horizon fog depth decay (0.0 - 2.0, default 1.00) */
  fog?: number;
  /** Particle crest glow intensity (0.0 - 1.0, default 0.35) */
  glow?: number;
  /** Wave peak foam brightness multiplier (0.0 - 2.0, default 1.00) */
  foam?: number;
  /** Wave propagation speed multiplier (0.1 - 3.0, default 1.00) */
  speed?: number;
  /** Camera parallax tilt on mouse move (0.0 - 2.0, default 1.00) */
  parallax?: number;
  /** Cursor swell water lift amplitude (0.0 - 2.0, default 1.00) */
  swell?: number;
  /** Cursor swell influence radius (0.1 - 2.0, default 0.90) */
  swellRadius?: number;
  /** Wave noise seed offset (0 - 100, default 0) */
  seed?: number;
  /** Whether mouse moves interact with the water swell and camera parallax (default true) */
  interactive?: boolean;
  /** Whether clicking spawns radiating ripple rings (default true) */
  clickRipples?: boolean;
  /** Freeze wave animation time (default false) */
  paused?: boolean;
  /** Optional foreground children overlay (hero copy, CTA, badges) */
  children?: React.ReactNode;
}

// Preset color definitions
export const CONTOUR_TIDE_PRESETS: Record<
  ContourTidePreset,
  { background: string; water: string; crest: string }
> = {
  silver: {
    background: "#070709",
    water: "#A4A4B8",
    crest: "#FFFFFF",
  },
  ocean: {
    background: "#030712",
    water: "#1e3a8a",
    crest: "#60a5fa",
  },
  gold: {
    background: "#0a0804",
    water: "#785924",
    crest: "#fde047",
  },
  cyberpunk: {
    background: "#09030e",
    water: "#581c87",
    crest: "#f43f5e",
  },
  emerald: {
    background: "#020f09",
    water: "#064e3b",
    crest: "#34d399",
  },
};

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [1, 1, 1];
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

/**
 * Analytical Camera Unprojection:
 * Casts a ray from camera eye through screen pixel (clientX, clientY)
 * and intersects with the horizontal water surface plane Y = 0.
 * Guarantees pixel-perfect matching between screen cursor and 3D water field.
 */
function unprojectToWaterPlane(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  horizon: number,
  camOffsetX: number = 0
): { worldX: number; worldZ: number; isValid: boolean } {
  const width = rect.width;
  const height = rect.height;
  if (width <= 0 || height <= 0) return { worldX: 0, worldZ: 10, isValid: false };

  const aspect = width / height;

  // Normalized Device Coordinates: x in [-1, 1] (left to right), y in [-1, 1] (bottom to top)
  const ndcX = ((clientX - rect.left) / width) * 2.0 - 1.0;
  const ndcY = 1.0 - ((clientY - rect.top) / height) * 2.0;

  // Camera definition matching shader
  const camY = 3.6 + (0.5 - horizon) * 4.5;
  const camZ = -2.8;
  const eyeX = camOffsetX;
  const eyeY = camY;
  const eyeZ = camZ;

  const targetX = 0.0;
  const targetY = horizon * 3.5;
  const targetZ = 30.0;

  // Forward vector
  let fx = targetX - eyeX;
  let fy = targetY - eyeY;
  let fz = targetZ - eyeZ;
  const fLen = Math.hypot(fx, fy, fz);
  fx /= fLen;
  fy /= fLen;
  fz /= fLen;

  // Right vector: cross(forward, [0, 1, 0])
  let rx = fz;
  let ry = 0.0;
  let rz = -fx;
  const rLen = Math.hypot(rx, rz);
  rx /= rLen;
  rz /= rLen;

  // Up vector: cross(forward, right)
  const ux = fy * rz - fz * ry;
  const uy = fz * rx - fx * rz;
  const uz = fx * ry - fy * rx;

  // Camera ray direction with FOV 1.25 rad (~55 deg)
  const halfTan = Math.tan(1.25 * 0.5);
  const rayCamX = ndcX * aspect * halfTan;
  const rayCamY = ndcY * halfTan;
  const rayCamZ = 1.0;

  // World ray direction
  let dx = rx * rayCamX + ux * rayCamY + fx * rayCamZ;
  let dy = ry * rayCamX + uy * rayCamY + fy * rayCamZ;
  let dz = rz * rayCamX + uz * rayCamY + fz * rayCamZ;
  const dLen = Math.hypot(dx, dy, dz);
  dx /= dLen;
  dy /= dLen;
  dz /= dLen;

  let worldX = 0;
  let worldZ = 20;

  // Continuous intersection with water surface plane Y = 0
  if (dy < -0.001) {
    const tPlane = -eyeY / dy;
    const testZ = eyeZ + tPlane * dz;
    if (testZ >= 1.2 && testZ <= 48.0) {
      worldX = eyeX + tPlane * dx;
      worldZ = testZ;
    } else if (testZ > 48.0) {
      // Ray aims beyond visible ocean field: intersect back boundary at Z = 48.0
      const tEdge = (48.0 - eyeZ) / Math.max(0.01, dz);
      worldX = eyeX + tEdge * dx;
      worldZ = 48.0;
    } else {
      // Ray aims in front of ocean near eye: clamp to front edge at Z = 1.2
      const tFront = (1.2 - eyeZ) / Math.max(0.01, dz);
      worldX = eyeX + tFront * dx;
      worldZ = 1.2;
    }
  } else {
    // Looking at or above horizon: track along the distant edge at Z = 48.0
    const tEdge = (48.0 - eyeZ) / Math.max(0.01, dz);
    worldX = eyeX + tEdge * dx;
    worldZ = 48.0;
  }

  // Smoothly clamp to ocean particle grid world bounds
  worldX = Math.max(-22.0, Math.min(22.0, worldX));
  worldZ = Math.max(1.2, Math.min(48.0, worldZ));

  return { worldX, worldZ, isValid: true };
}

/* ─────────────────────────────────────────────────────────────────── */
/* WebGL Shaders (3D Perspective Gerstner Wave Ocean Particle Field)  */
/* ─────────────────────────────────────────────────────────────────── */

const VS_SOURCE = `
attribute vec2 aGridCoord; // (u, v) normalized grid coordinates [0, 1]

uniform float uTime;
uniform vec2 uResolution;
uniform float uWaveHeight;
uniform float uChoppiness;
uniform float uWavelength;
uniform float uWindAngle;
uniform float uHorizon;
uniform float uFoam;
uniform float uParticleSize;
uniform float uSpeed;
uniform float uParallax;
uniform float uSwell;
uniform float uSwellRadius;
uniform float uSeed;
uniform vec2 uCursorWorld;  // Exact unprojected 3D water surface point under cursor
uniform float uCursorActive;
uniform vec4 uRipples[4];   // (worldX, worldZ, age, amplitude)

varying float vElevation;
varying float vFoam;
varying float vDepth;
varying float vRelativeZ;

#define PI 3.14159265359

// Gerstner Wave evaluation helper
vec3 gerstnerWave(vec2 pos, float dirAngle, float amp, float len, float speed, float chop, float time) {
  vec2 d = vec2(cos(dirAngle), sin(dirAngle));
  float k = 2.0 * PI / max(0.1, len);
  float c = sqrt(9.8 / k) * speed;
  float f = k * (dot(d, pos) - c * time + uSeed);
  
  float sinF = sin(f);
  float cosF = cos(f);
  
  float dx = -d.x * chop * amp * sinF;
  float dz = -d.y * chop * amp * sinF;
  float dy = amp * cosF;
  
  return vec3(dx, dy, dz);
}

void main() {
  // Map grid [0, 1] to world ocean plane [-22.0, 22.0] x [1.0, 48.0]
  float baseX = (aGridCoord.x - 0.5) * 44.0;
  float baseZ = aGridCoord.y * 47.0 + 1.2;
  vec2 pos = vec2(baseX, baseZ);
  
  float t = uTime * 0.45;
  float windRad = uWindAngle * (PI / 180.0);
  
  // 4 Gerstner Wave harmonics
  vec3 disp = vec3(0.0);
  disp += gerstnerWave(pos, windRad + 0.05, 0.85 * uWaveHeight, 14.0 * uWavelength, 1.2 * uSpeed, uChoppiness, t);
  disp += gerstnerWave(pos, windRad - 0.35, 0.45 * uWaveHeight, 7.5 * uWavelength, 1.4 * uSpeed, uChoppiness * 1.1, t);
  disp += gerstnerWave(pos, windRad + 0.40, 0.25 * uWaveHeight, 4.2 * uWavelength, 1.7 * uSpeed, uChoppiness * 1.2, t);
  disp += gerstnerWave(pos, windRad - 0.70, 0.12 * uWaveHeight, 2.3 * uWavelength, 2.1 * uSpeed, uChoppiness * 1.3, t);
  
  vec3 worldPos = vec3(baseX + disp.x, disp.y, baseZ + disp.z);
  
  // Interactive Cursor Swell (lifts water surface exactly under pointer)
  if (uSwell > 0.001 && uCursorActive > 0.01) {
    float distToCursor = length(worldPos.xz - uCursorWorld);
    float rad = max(0.4, uSwellRadius * 3.8);
    float swellLift = exp(-(distToCursor * distToCursor) / (rad * rad)) * uSwell * 1.7;
    worldPos.y += swellLift;
  }
  
  // Click Ripples (originate from exact clicked water coordinates)
  for (int i = 0; i < 4; i++) {
    if (uRipples[i].w > 0.01) {
      vec2 ripOrigin = uRipples[i].xy;
      float age = uRipples[i].z;
      float amp = uRipples[i].w;
      
      float d = length(worldPos.xz - ripOrigin);
      float phase = d * 2.8 - age * 8.5;
      float ripShape = sin(phase) * exp(-abs(d - age * 3.0) * 0.65) * exp(-age * 1.2) * amp;
      worldPos.y += ripShape * 0.85;
    }
  }
  
  // 3D Perspective Camera Setup
  float camX = 0.0;
  float camY = 3.6 + (0.5 - uHorizon) * 4.5;
  float camZ = -2.8;
  
  vec3 eye = vec3(camX, camY, camZ);
  vec3 target = vec3(0.0, uHorizon * 3.5, 30.0);
  
  // View matrix calculation: standard right-handed camera facing +Z
  vec3 forward = normalize(target - eye);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);
  
  vec3 p = worldPos - eye;
  vec3 viewPos = vec3(dot(p, right), dot(p, up), dot(p, forward));
  
  // Perspective projection matrix
  float aspect = uResolution.x / max(1.0, uResolution.y);
  float fov = 1.25; // ~55 degrees in radians
  float near = 0.5;
  float far = 65.0;
  
  float z = max(0.1, viewPos.z);
  float projX = (viewPos.x / (z * tan(fov * 0.5))) / aspect;
  float projY = viewPos.y / (z * tan(fov * 0.5));
  float projZ = (z - near) / (far - near) * 2.0 - 1.0;
  
  gl_Position = vec4(projX, projY, projZ, 1.0);
  
  // Point size attenuation by perspective distance
  float distFactor = max(0.65, z * 0.07);
  gl_PointSize = clamp(uParticleSize * (uResolution.y * 0.0022 / distFactor), 1.0, 6.5);
  
  vElevation = worldPos.y;
  vFoam = clamp((worldPos.y - 0.45 * uWaveHeight) * 1.8 * uFoam, 0.0, 1.0);
  vDepth = z;
  vRelativeZ = aGridCoord.y;
}
`;

const FS_SOURCE = `
precision highp float;

uniform vec3 uBgColor;
uniform vec3 uWaterColor;
uniform vec3 uCrestColor;
uniform float uFog;
uniform float uGlow;

varying float vElevation;
varying float vFoam;
varying float vDepth;
varying float vRelativeZ;

void main() {
  // Circular point shape with anti-aliased edge
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  
  float circleAlpha = smoothstep(0.5, 0.18, dist);
  
  // Color blending: deep water in troughs, bright crest on peaks
  // Elevate trough baseline so white dots remain luminous and visible throughout the field
  float elevFactor = clamp(0.40 + (vElevation + 0.6) * 0.45, 0.0, 1.0);
  vec3 col = mix(uWaterColor, uCrestColor, elevFactor);
  
  // Add foam highlight on wave crests
  col = mix(col, uCrestColor * 1.25, vFoam * 0.85);
  
  // Point glow bloom in center
  col += uCrestColor * uGlow * max(0.0, 1.0 - dist * 2.0) * (0.7 + vFoam * 0.4);
  
  // Atmospheric depth fog (particles blend smoothly into background towards horizon)
  float fogFactor = clamp((vDepth - 9.0) / (42.0 / max(0.1, uFog)), 0.0, 1.0);
  col = mix(col, uBgColor, fogFactor * 0.70);
  
  // Fade alpha near distant horizon
  float finalAlpha = circleAlpha * (1.0 - fogFactor * 0.65);
  
  gl_FragColor = vec4(col, finalAlpha);
}
`;

export const ContourTide = React.forwardRef<HTMLDivElement, ContourTideProps>(
  (
    {
      preset = "silver",
      backgroundColor,
      waterColor,
      crestColor,
      density = 1.0,
      particleSize = 1.0,
      waveHeight = 1.0,
      choppiness = 0.8,
      wavelength = 1.0,
      windAngle = 0,
      horizon = 0.1,
      fog = 1.0,
      glow = 0.35,
      foam = 1.0,
      speed = 1.0,
      parallax = 1.0,
      swell = 1.0,
      swellRadius = 0.9,
      seed = 0,
      interactive = true,
      clickRipples = true,
      paused = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    // Color resolution with preset defaults
    const presetPalette = CONTOUR_TIDE_PRESETS[preset] || CONTOUR_TIDE_PRESETS.silver;
    const resolvedBg = backgroundColor || presetPalette.background;
    const resolvedWater = waterColor || presetPalette.water;
    const resolvedCrest = crestColor || presetPalette.crest;

    // Active ripples tracking: [x, z, age, amplitude]
    const ripplesRef = React.useRef<Float32Array>(new Float32Array(16)); // 4 ripples * 4 floats
    const nextRippleIdxRef = React.useRef(0);

    // Unprojected mouse world target & current smooth position
    const cursorWorldRef = React.useRef({
      x: 0,
      z: 15,
      targetX: 0,
      targetZ: 15,
      active: 0,
      targetActive: 0,
    });

    // Store settings in ref for requestAnimationFrame loop
    const settingsRef = React.useRef({
      density,
      particleSize,
      waveHeight,
      choppiness,
      wavelength,
      windAngle,
      horizon,
      fog,
      glow,
      foam,
      speed,
      parallax,
      swell,
      swellRadius,
      seed,
      interactive,
      clickRipples,
      paused,
      bg: hexToRgb(resolvedBg),
      water: hexToRgb(resolvedWater),
      crest: hexToRgb(resolvedCrest),
    });

    React.useEffect(() => {
      settingsRef.current = {
        density,
        particleSize,
        waveHeight,
        choppiness,
        wavelength,
        windAngle,
        horizon,
        fog,
        glow,
        foam,
        speed,
        parallax,
        swell,
        swellRadius,
        seed,
        interactive,
        clickRipples,
        paused,
        bg: hexToRgb(resolvedBg),
        water: hexToRgb(resolvedWater),
        crest: hexToRgb(resolvedCrest),
      };
    }, [
      density,
      particleSize,
      waveHeight,
      choppiness,
      wavelength,
      windAngle,
      horizon,
      fog,
      glow,
      foam,
      speed,
      parallax,
      swell,
      swellRadius,
      seed,
      interactive,
      clickRipples,
      paused,
      resolvedBg,
      resolvedWater,
      resolvedCrest,
    ]);

    // Handle mouse move & ripple clicks with analytical raycasting
    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handlePointerMove = (e: PointerEvent) => {
        if (!settingsRef.current.interactive) return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        // Unproject screen mouse position to exact 3D water coordinates
        const { worldX, worldZ, isValid } = unprojectToWaterPlane(
          e.clientX,
          e.clientY,
          rect,
          settingsRef.current.horizon,
          0
        );

        if (isValid) {
          if (cursorWorldRef.current.active < 0.05) {
            cursorWorldRef.current.x = worldX;
            cursorWorldRef.current.z = worldZ;
          }
          cursorWorldRef.current.targetX = worldX;
          cursorWorldRef.current.targetZ = worldZ;
          cursorWorldRef.current.targetActive = 1.0;
        }
      };

      const handlePointerLeave = () => {
        cursorWorldRef.current.targetActive = 0.0;
      };

      let lastRippleTime = 0;
      const triggerRipple = (clientX: number, clientY: number) => {
        if (!settingsRef.current.clickRipples) return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;

        // Unproject exact click location onto water plane
        const { worldX, worldZ, isValid } = unprojectToWaterPlane(
          clientX,
          clientY,
          rect,
          settingsRef.current.horizon,
          0
        );

        if (isValid) {
          const idx = nextRippleIdxRef.current % 4;
          const offset = idx * 4;
          ripplesRef.current[offset + 0] = worldX;
          ripplesRef.current[offset + 1] = worldZ;
          ripplesRef.current[offset + 2] = 0.0; // initial age
          ripplesRef.current[offset + 3] = 1.8; // strong visible amplitude

          nextRippleIdxRef.current = (idx + 1) % 4;
        }
      };

      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.closest("button") || target.closest("a") || target.closest("input"))) {
          return;
        }
        const now = performance.now();
        if (now - lastRippleTime < 60) return;
        lastRippleTime = now;
        triggerRipple(e.clientX, e.clientY);
      };

      container.addEventListener("pointermove", handlePointerMove, { passive: true });
      container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
      container.addEventListener("pointerdown", handlePointerDown, { passive: true });

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
        container.removeEventListener("pointerdown", handlePointerDown);
      };
    }, []);

    // Main WebGL Render Loop
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: "high-performance",
      });

      if (!gl) {
        console.warn("WebGL not supported for ContourTide, skipping.");
        return;
      }

      // Compile Shaders
      const compileShader = (type: number, src: string) => {
        const s = gl.createShader(type);
        if (!s) return null;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.error("Shader compile error:", gl.getShaderInfoLog(s));
          gl.deleteShader(s);
          return null;
        }
        return s;
      };

      const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
      const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
      if (!vs || !fs) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return;
      }

      gl.useProgram(program);

      // Attribute & Uniform locations
      const aGridCoord = gl.getAttribLocation(program, "aGridCoord");
      const uTime = gl.getUniformLocation(program, "uTime");
      const uResolution = gl.getUniformLocation(program, "uResolution");
      const uWaveHeight = gl.getUniformLocation(program, "uWaveHeight");
      const uChoppiness = gl.getUniformLocation(program, "uChoppiness");
      const uWavelength = gl.getUniformLocation(program, "uWavelength");
      const uWindAngle = gl.getUniformLocation(program, "uWindAngle");
      const uHorizon = gl.getUniformLocation(program, "uHorizon");
      const uFoam = gl.getUniformLocation(program, "uFoam");
      const uParticleSize = gl.getUniformLocation(program, "uParticleSize");
      const uSpeed = gl.getUniformLocation(program, "uSpeed");
      const uParallax = gl.getUniformLocation(program, "uParallax");
      const uSwell = gl.getUniformLocation(program, "uSwell");
      const uSwellRadius = gl.getUniformLocation(program, "uSwellRadius");
      const uSeed = gl.getUniformLocation(program, "uSeed");
      const uCursorWorld = gl.getUniformLocation(program, "uCursorWorld");
      const uCursorActive = gl.getUniformLocation(program, "uCursorActive");
      const uRipples = gl.getUniformLocation(program, "uRipples");
      const uBgColor = gl.getUniformLocation(program, "uBgColor");
      const uWaterColor = gl.getUniformLocation(program, "uWaterColor");
      const uCrestColor = gl.getUniformLocation(program, "uCrestColor");
      const uFog = gl.getUniformLocation(program, "uFog");
      const uGlow = gl.getUniformLocation(program, "uGlow");

      // Generate regular grid mesh vertices based on density
      const resX = Math.round(180 * Math.sqrt(Math.max(0.2, settingsRef.current.density)));
      const resY = Math.round(180 * Math.sqrt(Math.max(0.2, settingsRef.current.density)));
      const vertexCount = resX * resY;
      const coords = new Float32Array(vertexCount * 2);

      let ptr = 0;
      for (let j = 0; j < resY; j++) {
        const v = j / (resY - 1);
        for (let i = 0; i < resX; i++) {
          const u = i / (resX - 1);
          coords[ptr++] = u;
          coords[ptr++] = v;
        }
      }

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);

      gl.enableVertexAttribArray(aGridCoord);
      gl.vertexAttribPointer(aGridCoord, 2, gl.FLOAT, false, 0, 0);

      // Blending configuration for glowing additive/alpha particles
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      let animId = 0;
      let startTime = performance.now();
      let lastTime = startTime;
      let simTime = 0;

      let cachedW = canvas.clientWidth || 300;
      let cachedH = canvas.clientHeight || 300;
      let sizeDirty = true;

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = Math.round(entry.contentRect.width);
          const h = Math.round(entry.contentRect.height);
          if (w > 0 && h > 0 && (w !== cachedW || h !== cachedH)) {
            cachedW = w;
            cachedH = h;
            sizeDirty = true;
          }
        }
      });
      ro.observe(canvas);

      const render = (now: number) => {
        const dt = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;

        const s = settingsRef.current;
        if (!s.paused) {
          simTime += dt * s.speed;
        }

        // Smooth cursor world glide
        const c = cursorWorldRef.current;
        c.x += (c.targetX - c.x) * (1 - Math.exp(-dt * 24));
        c.z += (c.targetZ - c.z) * (1 - Math.exp(-dt * 24));
        c.active += (c.targetActive - c.active) * (1 - Math.exp(-dt * 18));

        // Age ripples
        for (let i = 0; i < 4; i++) {
          const off = i * 4;
          if (ripplesRef.current[off + 3] > 0.005) {
            ripplesRef.current[off + 2] += dt * 1.5; // age
            ripplesRef.current[off + 3] *= Math.exp(-dt * 1.2); // amplitude decay
          }
        }

        // Resize viewport only when dimension changes, avoiding layout thrashing
        if (sizeDirty) {
          sizeDirty = false;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const targetW = Math.round(cachedW * dpr);
          const targetH = Math.round(cachedH * dpr);

          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
            gl.viewport(0, 0, targetW, targetH);
          }
        }

        // Clear canvas
        gl.clearColor(s.bg[0], s.bg[1], s.bg[2], 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Upload uniforms
        gl.uniform1f(uTime, simTime);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uWaveHeight, s.waveHeight);
        gl.uniform1f(uChoppiness, s.choppiness);
        gl.uniform1f(uWavelength, s.wavelength);
        gl.uniform1f(uWindAngle, s.windAngle);
        gl.uniform1f(uHorizon, s.horizon);
        gl.uniform1f(uFoam, s.foam);
        gl.uniform1f(uParticleSize, s.particleSize);
        gl.uniform1f(uSpeed, s.speed);
        gl.uniform1f(uParallax, s.parallax);
        gl.uniform1f(uSwell, s.interactive ? s.swell : 0.0);
        gl.uniform1f(uSwellRadius, s.swellRadius);
        gl.uniform1f(uSeed, s.seed);

        gl.uniform2f(uCursorWorld, c.x, c.z);
        gl.uniform1f(uCursorActive, c.active);
        gl.uniform4fv(uRipples, ripplesRef.current);

        gl.uniform3fv(uBgColor, s.bg);
        gl.uniform3fv(uWaterColor, s.water);
        gl.uniform3fv(uCrestColor, s.crest);
        gl.uniform1f(uFog, s.fog);
        gl.uniform1f(uGlow, s.glow);

        // Draw points
        gl.drawArrays(gl.POINTS, 0, vertexCount);

        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      };
    }, [density]);

    const setContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <div
        ref={setContainerRef}
        className={cn("relative w-full h-full min-h-[320px] overflow-hidden select-none", className)}
        style={{
          backgroundColor: resolvedBg,
          ...style,
        }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none block"
          style={{ width: "100%", height: "100%" }}
        />

        {children && (
          <div className="relative z-10 h-full w-full pointer-events-none">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ContourTide.displayName = "ContourTide";
export default ContourTide;

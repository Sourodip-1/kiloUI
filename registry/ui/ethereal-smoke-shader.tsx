"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Fullscreen Quad Vertex Shader with Stencil Neighbor Offsets
// ----------------------------------------------------------------------------
const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// ----------------------------------------------------------------------------
// Liquid Physics Shaders: Real Navier-Stokes Velocity Simulation with Analytical Sweep
// ----------------------------------------------------------------------------
const FLUID_SPLAT_VELOCITY = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uA;
uniform vec2 uB;
uniform float uRadius;
uniform vec2 uForce;

// Analytical Gaussian line integral for seamless unbroken strokes at any speed
float erf(float x) {
  float x2 = x * x;
  float a = 0.147;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + a * x2) / (1.0 + a * x2)));
}

float sweep(float along, float length, float across, float radius) {
  return exp(-across * across / (radius * radius)) * 0.5 * (erf(along / radius) - erf((along - length) / radius));
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  vec2 a = vec2(uA.x * uAspect, uA.y);
  vec2 b = vec2(uB.x * uAspect, uB.y);
  vec2 ab = b - a;
  float len = length(ab);
  vec2 ap = p - a;
  vec2 base = texture(uTarget, vUv).xy;
  
  float falloff;
  if (len < 1e-6) {
    float r2 = dot(ap, ap);
    falloff = exp(-r2 / (uRadius * uRadius));
  } else {
    vec2 dir = ab / len;
    float along = dot(ap, dir);
    float across = dot(ap, vec2(-dir.y, dir.x));
    falloff = sweep(along, len, across, uRadius);
  }
  
  outColor = vec4(base + uForce * falloff, 0.0, 1.0);
}
`;

const FLUID_SPLAT_TRAIL = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uA;
uniform vec2 uB;
uniform float uRadius;
uniform float uIntensity;

float erf(float x) {
  float x2 = x * x;
  float a = 0.147;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + a * x2) / (1.0 + a * x2)));
}

float sweep(float along, float length, float across, float radius) {
  return exp(-across * across / (radius * radius)) * 0.5 * (erf(along / radius) - erf((along - length) / radius));
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  vec2 a = vec2(uA.x * uAspect, uA.y);
  vec2 b = vec2(uB.x * uAspect, uB.y);
  vec2 ab = b - a;
  float len = length(ab);
  vec2 ap = p - a;
  float base = texture(uTarget, vUv).r;
  
  float falloff;
  if (len < 1e-6) {
    float r2 = dot(ap, ap);
    falloff = exp(-r2 / (uRadius * uRadius));
  } else {
    vec2 dir = ab / len;
    float along = dot(ap, dir);
    float across = dot(ap, vec2(-dir.y, dir.x));
    falloff = sweep(along, len, across, uRadius);
  }
  
  outColor = vec4(base + uIntensity * falloff, 0.0, 0.0, 1.0);
}
`;

const FLUID_DIVERGENCE = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
uniform sampler2D uVelocity;
void main() {
  vec2 center = texture(uVelocity, vUv).xy;
  float left = vL.x < 0.0 ? -center.x : texture(uVelocity, vL).x;
  float right = vR.x > 1.0 ? -center.x : texture(uVelocity, vR).x;
  float bottom = vB.y < 0.0 ? -center.y : texture(uVelocity, vB).y;
  float top = vT.y > 1.0 ? -center.y : texture(uVelocity, vT).y;
  outColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
}
`;

const FLUID_PRESSURE = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  vec2 center = texture(uPressure, vUv).xy;
  float left = vL.x < 0.0 ? center.x : texture(uPressure, vL).x;
  float right = vR.x > 1.0 ? center.x : texture(uPressure, vR).x;
  float bottom = vB.y < 0.0 ? center.x : texture(uPressure, vB).x;
  float top = vT.y > 1.0 ? center.x : texture(uPressure, vT).x;
  float divergence = texture(uDivergence, vUv).x;
  outColor = vec4((left + right + bottom + top - divergence) * 0.25, 0.0, 0.0, 1.0);
}
`;

const FLUID_GRADIENT = `#version 300 es
precision highp float;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  vec2 center = texture(uPressure, vUv).xy;
  float left = vL.x < 0.0 ? center.x : texture(uPressure, vL).x;
  float right = vR.x > 1.0 ? center.x : texture(uPressure, vR).x;
  float bottom = vB.y < 0.0 ? center.x : texture(uPressure, vB).x;
  float top = vT.y > 1.0 ? center.x : texture(uPressure, vT).x;
  vec2 velocity = texture(uVelocity, vUv).xy - 0.5 * vec2(right - left, top - bottom);
  outColor = vec4(velocity, 0.0, 1.0);
}
`;

const FLUID_ADVECT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uVelocityTexel;
uniform float uDt;
uniform float uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  outColor = texture(uSource, coord) * uDecay;
}
`;

// ----------------------------------------------------------------------------
// Volumetric Smoke Fragment Shader: Pure Smoke Manipulation via Fluid Dynamics
// (Zero artificial brush strokes added on top - purely manipulates the smoke itself)
// ----------------------------------------------------------------------------
const SMOKE_FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform vec2 uResolution;
uniform vec2 uOrigin;
uniform sampler2D uFluidVelocity;
uniform sampler2D uFluidTrail;
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSpread;
uniform float uTurbulence;
uniform float uMouseSpread;
uniform float uGrain;
uniform float uVignette;

uniform vec3 uCoreColor;
uniform vec3 uSmokeColor;
uniform vec3 uAtmoColor;
uniform vec3 uBgColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.52;
  vec2 shift = vec2(37.0, 19.0);
  mat2 rot = mat2(cos(0.45), sin(0.45), -sin(0.45), cos(0.45));
  for (int i = 0; i < 5; i++) {
    v += a * smoothNoise(p);
    p = rot * p * 2.02 + shift;
    a *= 0.5;
  }
  return v;
}

float smokeFlow(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, t * 0.06)),
    fbm(p + vec2(5.2, -t * 0.08))
  );
  vec2 r = vec2(
    fbm(p + 1.8 * q + vec2(1.7, 9.2) + vec2(-t * 0.11, t * 0.05)),
    fbm(p + 1.8 * q + vec2(8.3, 2.8) + vec2(t * 0.07, -t * 0.09))
  );
  float f = fbm(p + 1.7 * r * uTurbulence + vec2(-t * 0.04, 0.0));
  float billow = sin(f * 3.14159265 * 1.4);
  return mix(f, billow * 0.5 + 0.5, 0.3);
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 origin = vec2(uOrigin.x * aspect, uOrigin.y);

  // Sample real Navier-Stokes liquid velocity & continuous advected wake
  vec2 fluidVel = texture(uFluidVelocity, uv).xy;
  float trailWake = texture(uFluidTrail, uv).r;
  float fluidSpeed = length(fluidVel);

  // Liquid displacement: coordinates warped along fluid flow streamlines
  // Aspect ratio correction guarantees organic, non-stretched circular eddies
  vec2 fluidWarp = vec2(fluidVel.x * aspect, fluidVel.y) * (uMouseSpread * 0.55);
  vec2 warpedP = p + fluidWarp;

  // Anisotropic horizontal plume distance:
  vec2 offset = p - origin;
  float plumeDist = length(vec2(offset.x * 0.72, offset.y * 1.15));

  // Soft exponential falloff for the overarching light atmosphere
  float spread = max(uSpread, 0.1);
  float plumeFalloff = exp(-plumeDist * (1.75 / spread));

  // Volumetric multi-scale smoke animation on liquid-warped field
  float t = uTime * uSpeed;
  float smoke1 = smokeFlow(warpedP * 0.8, t);
  float smoke2 = smokeFlow(warpedP * 1.35 + vec2(8.0, 4.0), t * 0.85);
  float combinedSmoke = mix(smoke1, smoke2, 0.35);

  // Base smoke density modulated by plume falloff
  float density = combinedSmoke * plumeFalloff * 2.3;

  // Liquid flow manipulation of the smoke:
  // Manipulates the existing smoke density along the wake:
  // - Smoke parts through the wake channel
  // - Pushes rolling billow curls on the outer shear borders
  if (trailWake > 0.0001 || fluidSpeed > 0.0001) {
    float parting = smoothstep(0.015, 0.65, trailWake) * 0.42 * uMouseSpread;
    float rollingCurl = sin((warpedP.x + warpedP.y) * 9.0 + t * 2.2) * 0.18 * smoothstep(0.03, 0.55, trailWake);
    float fluidPush = smoothstep(0.0, 0.75, fluidSpeed) * 0.22;
    density = density * (1.0 - parting) + ((rollingCurl + fluidPush) * plumeFalloff * uMouseSpread);
  }
  density = smoothstep(0.04, 0.95, density);

  // Core illumination: soft blooming white-hot center
  float coreDist = length(vec2(offset.x * 0.95, offset.y * 1.25));
  float coreGlow = exp(-coreDist * (2.8 / spread));
  float coreIntense = pow(coreGlow, 2.0) * 1.7;

  // Authentic Chai AI color grading & scattering (Pure Smoke Colors Only)
  // 1. Base dark void
  vec3 col = uBgColor;

  // 2. Wide atmospheric scatter (deep nocturnal nebula wash)
  float atmoMask = smoothstep(0.01, 0.65, plumeFalloff);
  col = mix(col, uAtmoColor, atmoMask * 0.8);

  // 3. Silky volumetric blue smoke plume
  vec3 smokeBody = mix(uAtmoColor * 1.15, uSmokeColor, smoothstep(0.08, 0.7, density));
  col = mix(col, smokeBody, smoothstep(0.06, 0.78, density));

  // 4. Luminous crest highlights on billow peaks
  float highlight = smoothstep(0.5, 1.05, density);
  vec3 crestColor = mix(uSmokeColor, uCoreColor, 0.68);
  col = mix(col, crestColor, highlight * 0.85);

  // 5. Seamless incandescent core bloom
  col = mix(col, uCoreColor, clamp(coreIntense * 0.85, 0.0, 1.0));
  col += uCoreColor * (coreGlow * 0.38);

  // Master intensity multiplier
  col *= uIntensity;

  // 6. Subtle analog film grain
  if (uGrain > 0.001) {
    float g = (hash(gl_FragCoord.xy + fract(uTime * 11.3) * 71.0) - 0.5) * uGrain;
    col += g;
  }

  // 7. Smooth cinematic vignette
  if (uVignette > 0.01) {
    vec2 vigUv = uv * (1.0 - uv.yx);
    float vig = vigUv.x * vigUv.y * 16.0;
    vig = clamp(pow(vig, 0.25 * uVignette), 0.0, 1.0);
    col *= vig;
  }

  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export interface EtherealSmokePreset {
  coreColor: string;
  smokeColor: string;
  atmoColor: string;
  bgColor: string;
  intensity: number;
  spread: number;
  turbulence: number;
  speed: number;
}

export const ETHEREAL_SMOKE_PRESETS: Record<string, EtherealSmokePreset> = {
  "chai-blue": {
    coreColor: "#ffffff",
    smokeColor: "#4f8df7",
    atmoColor: "#0f1738",
    bgColor: "#020307",
    intensity: 1.15,
    spread: 1.45,
    turbulence: 1.0,
    speed: 0.75,
  },
  "ethereal-violet": {
    coreColor: "#ffffff",
    smokeColor: "#a855f7",
    atmoColor: "#2e1065",
    bgColor: "#05020a",
    intensity: 1.2,
    spread: 1.4,
    turbulence: 1.05,
    speed: 0.8,
  },
  "solar-flare": {
    coreColor: "#ffffff",
    smokeColor: "#f59e0b",
    atmoColor: "#451a03",
    bgColor: "#060302",
    intensity: 1.25,
    spread: 1.5,
    turbulence: 1.1,
    speed: 0.85,
  },
  "emerald-mist": {
    coreColor: "#ffffff",
    smokeColor: "#10b981",
    atmoColor: "#022c22",
    bgColor: "#020805",
    intensity: 1.15,
    spread: 1.4,
    turbulence: 1.0,
    speed: 0.7,
  },
  "spectral-white": {
    coreColor: "#ffffff",
    smokeColor: "#94a3b8",
    atmoColor: "#1e293b",
    bgColor: "#040608",
    intensity: 1.1,
    spread: 1.3,
    turbulence: 0.95,
    speed: 0.65,
  },
};

export interface EtherealSmokeShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color & atmospheric preset theme */
  preset?: "chai-blue" | "ethereal-violet" | "solar-flare" | "emerald-mist" | "spectral-white";
  /** Origin location preset */
  origin?: "right" | "left" | "center" | "bottom" | { x: number; y: number };
  /** Explicit Origin X coordinate (can be negative or > 1.0 to position source outside the container) */
  originX?: number;
  /** Explicit Origin Y coordinate (can be negative or > 1.0 to position source outside the container) */
  originY?: number;
  /** Incandescent source core color hex */
  coreColor?: string;
  /** Primary billowing smoke color hex */
  smokeColor?: string;
  /** Ambient scatter / deep nebula wash color hex */
  atmoColor?: string;
  /** Base background void color hex */
  bgColor?: string;
  /** Luminance & emission multiplier (0.2 to 3.0) */
  intensity?: number;
  /** Volumetric plume reach & expansion (0.5 to 2.5) */
  spread?: number;
  /** Curl & swirl complexity multiplier (0.2 to 3.0) */
  turbulence?: number;
  /** Flow & billowing progression speed (0.1 to 3.0) */
  speed?: number;
  /** Mouse dispersion & spreading force (0.0 to 2.5) */
  mouseStrength?: number;
  /** Mouse dispersion & spreading amount alias */
  mouseSpread?: number;
  /** Slim cursor wake diameter in pixels (6 to 120, default 24) */
  trailWidth?: number;
  /** Legacy alias for trailWidth */
  mouseRadius?: number;
  /** Duration in seconds that the trailing liquid wake advects and lingers (0.4 to 4.0, default 1.6) */
  trailLinger?: number;
  /** Procedural film grain noise overlay (0.0 to 0.2) */
  grain?: number;
  /** Vignette darkening intensity (0.0 to 1.0) */
  vignette?: number;
  /** Whether cursor proximity actively spreads the smoke */
  interactive?: boolean;
  /** Children elements rendered directly on top of the shader */
  children?: React.ReactNode;
}

const hexToRgb = (hex: string, fallback: [number, number, number]): [number, number, number] => {
  if (!hex) return fallback;
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    return [r, g, b];
  }
  if (clean.length >= 6) {
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    return [r, g, b];
  }
  return fallback;
};

export function EtherealSmokeShader({
  preset = "chai-blue",
  origin = "right",
  originX,
  originY,
  coreColor,
  smokeColor,
  atmoColor,
  bgColor,
  intensity,
  spread,
  turbulence,
  speed,
  mouseStrength,
  mouseSpread = 0.95,
  trailWidth,
  mouseRadius = 24,
  trailLinger = 1.6,
  grain = 0.0,
  vignette = 0.45,
  interactive = true,
  children,
  className,
  style,
  ...props
}: EtherealSmokeShaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const config = ETHEREAL_SMOKE_PRESETS[preset] || ETHEREAL_SMOKE_PRESETS["chai-blue"];

  const effCore = coreColor || config.coreColor;
  const effSmoke = smokeColor || config.smokeColor;
  const effAtmo = atmoColor || config.atmoColor;
  const effBg = bgColor || config.bgColor;
  const effIntensity = intensity ?? config.intensity;
  const effSpread = spread ?? config.spread;
  const effTurbulence = turbulence ?? config.turbulence;
  const effSpeed = speed ?? config.speed;
  const effMouseSpread = mouseSpread ?? mouseStrength ?? 0.95;
  const effTrailWidth = trailWidth ?? mouseRadius ?? 24;

  // Resolve origin coords [x, y] allowing values outside 0..1 (can go outside preview panel)
  const originCoords = React.useMemo<[number, number]>(() => {
    let base: [number, number];
    if (typeof origin === "object" && origin !== null) {
      base = [origin.x, origin.y];
    } else {
      switch (origin) {
        case "left":
          base = [0.02, 0.5];
          break;
        case "center":
          base = [0.5, 0.5];
          break;
        case "bottom":
          base = [0.5, 0.95];
          break;
        case "right":
        default:
          base = [0.98, 0.5];
          break;
      }
    }
    return [
      originX !== undefined ? originX : base[0],
      originY !== undefined ? originY : base[1],
    ];
  }, [origin, originX, originY]);

  const settingsRef = React.useRef({
    origin: originCoords,
    core: hexToRgb(effCore, [1, 1, 1]),
    smoke: hexToRgb(effSmoke, [0.31, 0.55, 0.97]),
    atmo: hexToRgb(effAtmo, [0.06, 0.09, 0.22]),
    bg: hexToRgb(effBg, [0.01, 0.01, 0.03]),
    intensity: effIntensity,
    spread: effSpread,
    turbulence: effTurbulence,
    speed: effSpeed,
    mouseSpread: effMouseSpread,
    trailWidth: effTrailWidth,
    trailLinger,
    grain,
    vignette,
    interactive,
  });

  // Keep settings ref current
  settingsRef.current = {
    origin: originCoords,
    core: hexToRgb(effCore, [1, 1, 1]),
    smoke: hexToRgb(effSmoke, [0.31, 0.55, 0.97]),
    atmo: hexToRgb(effAtmo, [0.06, 0.09, 0.22]),
    bg: hexToRgb(effBg, [0.01, 0.01, 0.03]),
    intensity: effIntensity,
    spread: effSpread,
    turbulence: effTurbulence,
    speed: effSpeed,
    mouseSpread: effMouseSpread,
    trailWidth: effTrailWidth,
    trailLinger,
    grain,
    vignette,
    interactive,
  };

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    gl.getExtension("EXT_color_buffer_float");
    gl.getExtension("OES_texture_float_linear");

    // Compile shader helper
    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    };

    // Build program helper
    const buildProgram = (fsSource: string, vsSource = VERTEX_SHADER) => {
      const vs = compile(gl.VERTEX_SHADER, vsSource);
      const fs = compile(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return null;
      const prog = gl.createProgram();
      if (!prog) return null;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.bindAttribLocation(prog, 0, "aPosition");
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return null;
      }
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(prog, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(prog, info.name);
      }
      return { program: prog, uniforms };
    };

    // Initialize fluid velocity passes, advected trail passes, and smoke render pass
    const passes = {
      splatVelocity: buildProgram(FLUID_SPLAT_VELOCITY),
      splatTrail: buildProgram(FLUID_SPLAT_TRAIL),
      divergence: buildProgram(FLUID_DIVERGENCE),
      pressure: buildProgram(FLUID_PRESSURE),
      gradient: buildProgram(FLUID_GRADIENT),
      advect: buildProgram(FLUID_ADVECT),
      smoke: buildProgram(SMOKE_FRAGMENT_SHADER),
    };

    if (!passes.smoke) return;

    // Fullscreen quad geometry
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Liquid simulation resolution (128x128 for velocity solver, 256x256 for silky high-res trail)
    const SIM_RES = 128;
    const TRAIL_RES = 256;

    const createTarget = (w: number, h: number) => {
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texel: [1 / w, 1 / h] };
    };

    const createPair = (w: number, h: number) => {
      let read = createTarget(w, h);
      let write = createTarget(w, h);
      return {
        get read() { return read; },
        get write() { return write; },
        swap() {
          const tmp = read;
          read = write;
          write = tmp;
        },
        destroy() {
          gl.deleteTexture(read.texture);
          gl.deleteFramebuffer(read.fbo);
          gl.deleteTexture(write.texture);
          gl.deleteFramebuffer(write.fbo);
        }
      };
    };

    let velocityPair: ReturnType<typeof createPair> | null = null;
    let pressurePair: ReturnType<typeof createPair> | null = null;
    let divergenceTarget: ReturnType<typeof createTarget> | null = null;
    let trailPair: ReturnType<typeof createPair> | null = null;

    try {
      velocityPair = createPair(SIM_RES, SIM_RES);
      pressurePair = createPair(SIM_RES, SIM_RES);
      divergenceTarget = createTarget(SIM_RES, SIM_RES);
      trailPair = createPair(TRAIL_RES, TRAIL_RES);
    } catch {
      // Fallback if FBO allocation fails on constrained contexts
    }

    // Dummy 1x1 texture in case FBOs fail
    const dummyTexture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, dummyTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    const drawQuad = (targetFbo: WebGLFramebuffer | null, w: number, h: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, targetFbo);
      gl.viewport(0, 0, w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Smooth emitter tracking state
    const state = {
      pointer: { x: 0.5, y: 0.5, inside: false },
      emitter: { x: 0.5, y: 0.5, px: 0.5, py: 0.5, vx: 0, vy: 0 },
      ready: false,
    };

    let rafId = 0;
    let startTime = performance.now();
    let lastTime = performance.now();
    let isVisible = true;
    let width = 1;
    let height = 1;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisible = entries.some((e) => e.isIntersecting);
    });
    intersectionObserver.observe(container);

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible || document.hidden) return;

      const s = settingsRef.current;
      const dt = Math.min((now - lastTime) * 0.001, 0.033);
      lastTime = now;

      // ----------------------------------------------------------------------
      // Step 1: Smooth Continuous Spring Integrator for Emitter
      // ----------------------------------------------------------------------
      state.emitter.px = state.emitter.x;
      state.emitter.py = state.emitter.y;

      if (state.pointer.inside && state.ready) {
        const omega = 42; // Fast, silky spring-damper following
        const steps = Math.max(1, Math.ceil(dt / 0.003));
        const h = dt / steps;
        for (let k = 0; k < steps; k++) {
          state.emitter.vx += (omega * omega * (state.pointer.x - state.emitter.x) - 2 * omega * state.emitter.vx) * h;
          state.emitter.vy += (omega * omega * (state.pointer.y - state.emitter.y) - 2 * omega * state.emitter.vy) * h;
          state.emitter.x += state.emitter.vx * h;
          state.emitter.y += state.emitter.vy * h;
        }
      }

      const dx = state.emitter.x - state.emitter.px;
      const dy = state.emitter.y - state.emitter.py;
      const moveDist = Math.hypot(dx, dy);

      // Slim radius calculation in UV space
      const slimRadius = Math.max((s.trailWidth / Math.max(height, 1)) * 0.6, 0.008);

      // ----------------------------------------------------------------------
      // Step 2: Navier-Stokes Liquid Simulation with Analytical Continuous Sweep
      // ----------------------------------------------------------------------
      if (
        velocityPair &&
        pressurePair &&
        divergenceTarget &&
        trailPair &&
        passes.splatVelocity &&
        passes.splatTrail &&
        passes.divergence &&
        passes.pressure &&
        passes.gradient &&
        passes.advect
      ) {
        if (s.interactive && state.pointer.inside && state.ready && moveDist > 0.00005) {
          // A. Splat continuous velocity wake using analytical line sweep
          gl.useProgram(passes.splatVelocity.program);
          gl.bindVertexArray(vao);
          if (passes.splatVelocity.uniforms.uTexel) {
            gl.uniform2f(passes.splatVelocity.uniforms.uTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
          }
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, velocityPair.read.texture);
          if (passes.splatVelocity.uniforms.uTarget) gl.uniform1i(passes.splatVelocity.uniforms.uTarget, 0);
          if (passes.splatVelocity.uniforms.uAspect) gl.uniform1f(passes.splatVelocity.uniforms.uAspect, width / Math.max(height, 1));
          if (passes.splatVelocity.uniforms.uA) gl.uniform2f(passes.splatVelocity.uniforms.uA, state.emitter.px, state.emitter.py);
          if (passes.splatVelocity.uniforms.uB) gl.uniform2f(passes.splatVelocity.uniforms.uB, state.emitter.x, state.emitter.y);
          if (passes.splatVelocity.uniforms.uRadius) gl.uniform1f(passes.splatVelocity.uniforms.uRadius, slimRadius * 1.6);

          const forceX = (dx / Math.max(dt, 0.001)) * 0.32;
          const forceY = (dy / Math.max(dt, 0.001)) * 0.32;
          if (passes.splatVelocity.uniforms.uForce) gl.uniform2f(passes.splatVelocity.uniforms.uForce, forceX, forceY);

          drawQuad(velocityPair.write.fbo, SIM_RES, SIM_RES);
          velocityPair.swap();

          // B. Splat continuous wake channel using analytical line sweep (never dotted!)
          gl.useProgram(passes.splatTrail.program);
          gl.bindVertexArray(vao);
          if (passes.splatTrail.uniforms.uTexel) {
            gl.uniform2f(passes.splatTrail.uniforms.uTexel, trailPair.read.texel[0], trailPair.read.texel[1]);
          }
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, trailPair.read.texture);
          if (passes.splatTrail.uniforms.uTarget) gl.uniform1i(passes.splatTrail.uniforms.uTarget, 0);
          if (passes.splatTrail.uniforms.uAspect) gl.uniform1f(passes.splatTrail.uniforms.uAspect, width / Math.max(height, 1));
          if (passes.splatTrail.uniforms.uA) gl.uniform2f(passes.splatTrail.uniforms.uA, state.emitter.px, state.emitter.py);
          if (passes.splatTrail.uniforms.uB) gl.uniform2f(passes.splatTrail.uniforms.uB, state.emitter.x, state.emitter.y);
          if (passes.splatTrail.uniforms.uRadius) gl.uniform1f(passes.splatTrail.uniforms.uRadius, slimRadius);
          if (passes.splatTrail.uniforms.uIntensity) gl.uniform1f(passes.splatTrail.uniforms.uIntensity, 1.25);

          drawQuad(trailPair.write.fbo, TRAIL_RES, TRAIL_RES);
          trailPair.swap();
        }

        // Divergence pass
        gl.useProgram(passes.divergence.program);
        gl.bindVertexArray(vao);
        if (passes.divergence.uniforms.uTexel) {
          gl.uniform2f(passes.divergence.uniforms.uTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocityPair.read.texture);
        if (passes.divergence.uniforms.uVelocity) gl.uniform1i(passes.divergence.uniforms.uVelocity, 0);
        drawQuad(divergenceTarget.fbo, SIM_RES, SIM_RES);

        // Pressure Jacobi solve (12 iterations for crisp incompressibility)
        gl.useProgram(passes.pressure.program);
        gl.bindVertexArray(vao);
        if (passes.pressure.uniforms.uTexel) {
          gl.uniform2f(passes.pressure.uniforms.uTexel, pressurePair.read.texel[0], pressurePair.read.texel[1]);
        }
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, divergenceTarget.texture);
        if (passes.pressure.uniforms.uDivergence) gl.uniform1i(passes.pressure.uniforms.uDivergence, 1);

        for (let i = 0; i < 12; i++) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, pressurePair.read.texture);
          if (passes.pressure.uniforms.uPressure) gl.uniform1i(passes.pressure.uniforms.uPressure, 0);
          drawQuad(pressurePair.write.fbo, SIM_RES, SIM_RES);
          pressurePair.swap();
        }

        // Gradient subtract pass
        gl.useProgram(passes.gradient.program);
        gl.bindVertexArray(vao);
        if (passes.gradient.uniforms.uTexel) {
          gl.uniform2f(passes.gradient.uniforms.uTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressurePair.read.texture);
        if (passes.gradient.uniforms.uPressure) gl.uniform1i(passes.gradient.uniforms.uPressure, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, velocityPair.read.texture);
        if (passes.gradient.uniforms.uVelocity) gl.uniform1i(passes.gradient.uniforms.uVelocity, 1);
        drawQuad(velocityPair.write.fbo, SIM_RES, SIM_RES);
        velocityPair.swap();

        // Advection of velocity field
        gl.useProgram(passes.advect.program);
        gl.bindVertexArray(vao);
        if (passes.advect.uniforms.uTexel) {
          gl.uniform2f(passes.advect.uniforms.uTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
        }
        if (passes.advect.uniforms.uVelocityTexel) {
          gl.uniform2f(passes.advect.uniforms.uVelocityTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocityPair.read.texture);
        if (passes.advect.uniforms.uVelocity) gl.uniform1i(passes.advect.uniforms.uVelocity, 0);
        if (passes.advect.uniforms.uSource) gl.uniform1i(passes.advect.uniforms.uSource, 0);
        if (passes.advect.uniforms.uDt) gl.uniform1f(passes.advect.uniforms.uDt, dt);

        const velDecay = Math.exp(-dt * 1.5);
        if (passes.advect.uniforms.uDecay) gl.uniform1f(passes.advect.uniforms.uDecay, velDecay);
        drawQuad(velocityPair.write.fbo, SIM_RES, SIM_RES);
        velocityPair.swap();

        // Advection of slim trailing wake along fluid velocity
        if (passes.advect.uniforms.uTexel) {
          gl.uniform2f(passes.advect.uniforms.uTexel, trailPair.read.texel[0], trailPair.read.texel[1]);
        }
        if (passes.advect.uniforms.uVelocityTexel) {
          gl.uniform2f(passes.advect.uniforms.uVelocityTexel, velocityPair.read.texel[0], velocityPair.read.texel[1]);
        }
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, velocityPair.read.texture);
        if (passes.advect.uniforms.uVelocity) gl.uniform1i(passes.advect.uniforms.uVelocity, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, trailPair.read.texture);
        if (passes.advect.uniforms.uSource) gl.uniform1i(passes.advect.uniforms.uSource, 1);
        if (passes.advect.uniforms.uDt) gl.uniform1f(passes.advect.uniforms.uDt, dt);

        const trailDecay = Math.exp(-dt * (2.1 / Math.max(s.trailLinger, 0.2)));
        if (passes.advect.uniforms.uDecay) gl.uniform1f(passes.advect.uniforms.uDecay, trailDecay);
        drawQuad(trailPair.write.fbo, TRAIL_RES, TRAIL_RES);
        trailPair.swap();
      }

      // ----------------------------------------------------------------------
      // Step 3: Render Volumetric Smoke Manipulated by the Fluid Streamlines
      // ----------------------------------------------------------------------
      const elapsedTime = (now - startTime) * 0.001;
      const smokeProg = passes.smoke!.program;
      const smokeU = passes.smoke!.uniforms;

      gl.useProgram(smokeProg);
      gl.bindVertexArray(vao);

      if (smokeU.uResolution) gl.uniform2f(smokeU.uResolution, width, height);
      if (smokeU.uOrigin) gl.uniform2f(smokeU.uOrigin, s.origin[0], s.origin[1]);
      if (smokeU.uTime) gl.uniform1f(smokeU.uTime, elapsedTime);
      if (smokeU.uSpeed) gl.uniform1f(smokeU.uSpeed, s.speed);
      if (smokeU.uIntensity) gl.uniform1f(smokeU.uIntensity, s.intensity);
      if (smokeU.uSpread) gl.uniform1f(smokeU.uSpread, s.spread);
      if (smokeU.uTurbulence) gl.uniform1f(smokeU.uTurbulence, s.turbulence);
      if (smokeU.uMouseSpread) gl.uniform1f(smokeU.uMouseSpread, s.interactive ? s.mouseSpread : 0);
      if (smokeU.uGrain) gl.uniform1f(smokeU.uGrain, s.grain);
      if (smokeU.uVignette) gl.uniform1f(smokeU.uVignette, s.vignette);

      if (smokeU.uCoreColor) gl.uniform3f(smokeU.uCoreColor, s.core[0], s.core[1], s.core[2]);
      if (smokeU.uSmokeColor) gl.uniform3f(smokeU.uSmokeColor, s.smoke[0], s.smoke[1], s.smoke[2]);
      if (smokeU.uAtmoColor) gl.uniform3f(smokeU.uAtmoColor, s.atmo[0], s.atmo[1], s.atmo[2]);
      if (smokeU.uBgColor) gl.uniform3f(smokeU.uBgColor, s.bg[0], s.bg[1], s.bg[2]);

      // Bind liquid velocity texture to unit 0
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocityPair ? velocityPair.read.texture : dummyTexture);
      if (smokeU.uFluidVelocity) gl.uniform1i(smokeU.uFluidVelocity, 0);

      // Bind advected trailing wake texture to unit 1
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trailPair ? trailPair.read.texture : dummyTexture);
      if (smokeU.uFluidTrail) gl.uniform1i(smokeU.uFluidTrail, 1);

      // Render to main display canvas
      drawQuad(null, width, height);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const ny = 1.0 - (e.clientY - rect.top) / Math.max(rect.height, 1);

      if (!state.ready) {
        state.emitter.x = nx;
        state.emitter.y = ny;
        state.emitter.px = nx;
        state.emitter.py = ny;
        state.emitter.vx = 0;
        state.emitter.vy = 0;
        state.ready = true;
      }
      state.pointer.x = nx;
      state.pointer.y = ny;
      state.pointer.inside = true;
    };

    const onPointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      const ny = 1.0 - (e.clientY - rect.top) / Math.max(rect.height, 1);
      state.emitter.x = nx;
      state.emitter.y = ny;
      state.emitter.px = nx;
      state.emitter.py = ny;
      state.emitter.vx = 0;
      state.emitter.vy = 0;
      state.pointer.x = nx;
      state.pointer.y = ny;
      state.pointer.inside = true;
      state.ready = true;
    };

    const onPointerLeave = () => {
      state.pointer.inside = false;
      state.ready = false;
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);

      if (velocityPair) velocityPair.destroy();
      if (pressurePair) pressurePair.destroy();
      if (divergenceTarget) {
        gl.deleteTexture(divergenceTarget.texture);
        gl.deleteFramebuffer(divergenceTarget.fbo);
      }
      if (trailPair) trailPair.destroy();
      gl.deleteTexture(dummyTexture);

      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);

      Object.values(passes).forEach((p) => {
        if (p) gl.deleteProgram(p.program);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[380px] overflow-hidden rounded-xl bg-[#020307] select-none",
        className
      )}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}

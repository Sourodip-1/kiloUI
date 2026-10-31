"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type GlassRevealShape =
  | "circle"
  | "square"
  | "squircle"
  | "diamond"
  | "star";

export interface GlassRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo URL shown in full colour inside the lens */
  image?: string;
  /** Shape geometry of the glass portal lens (default: 'circle') */
  shape?: GlassRevealShape;
  /** Lens size relative to container diameter (0.1 to 1.5, default: 0.70) */
  size?: number;
  /** Edge softness / feathering of the lens perimeter (0.0 to 1.0, default: 0.00) */
  softness?: number;
  /** Optical refraction & curvature distortion strength (0.0 to 3.0, default: 0.45) */
  distortion?: number;
  /** Chromatic aberration RGB spectral dispersion (0.0 to 0.05, default: 0.000) */
  aberration?: number;
  /** Organic liquid wobble amplitude of the lens edge (0.0 to 2.0, default: 0.00) */
  wobble?: number;
  /** Wobble animation speed (0.1 to 10.0, default: 1.5) */
  wobbleSpeed?: number;
  /** Surface ripple wave frequency (1 to 20, default: 1) */
  waveFrequency?: number;
  /** Surface ripple wave amplitude (0.0 to 0.05, default: 0.000) */
  waveStrength?: number;
  /** Surface ripple wave propagation speed (0.1 to 5.0, default: 0.1) */
  waveSpeed?: number;
  /** Background film grain intensity (0.0 to 0.1, default: 0.020) */
  grain?: number;
  /** Animated film grain update speed (1 to 30, default: 22) */
  grainSpeed?: number;
  /** Desaturation level of outer area, 1.0 = full B&W (0.0 to 1.0, default: 0.85) */
  grayscale?: number;
  /** Darkening vignette of outer area (0.0 to 1.0, default: 0.00) */
  dim?: number;
  /** Pointer follow smoothing inertia, 0 = instant, 1 = heavy ease (0.0 to 0.99, default: 0.00) */
  follow?: number;
  /** Automatically glide lens back to center when cursor leaves (default: false) */
  returnToCenter?: boolean;
  /** Background fallback hex color if image fails or while loading (default: '#171717') */
  fallback?: string;
  /** Pause time-based wave and wobble animation (default: false) */
  paused?: boolean;
  /** Optional overlay children (e.g. badges, controls, titles) */
  children?: React.ReactNode;
}

const VERTEX_SHADER_SRC = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform bool uHasTexture;
uniform vec3 uFallbackColor;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uAspect;

uniform int uShape;          // 0: circle, 1: square, 2: squircle, 3: diamond, 4: star
uniform float uSize;
uniform float uSoftness;
uniform float uDistortion;
uniform float uAberration;
uniform float uWobble;
uniform float uWobbleSpeed;
uniform float uWaveFrequency;
uniform float uWaveStrength;
uniform float uWaveSpeed;
uniform float uGrain;
uniform float uGrainSpeed;
uniform float uGrayscale;
uniform float uDim;

// Aspect ratio cover mapping preserving photo proportions
vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
  if (imgRes.x <= 1.0 || imgRes.y <= 1.0) return uv;
  float sAspect = screenRes.x / screenRes.y;
  float iAspect = imgRes.x / imgRes.y;
  vec2 factor = vec2(1.0);
  if (sAspect > iAspect) {
    factor = vec2(1.0, iAspect / sAspect);
  } else {
    factor = vec2(sAspect / iAspect, 1.0);
  }
  return (uv - 0.5) * factor + 0.5;
}

// Signed distance functions
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdSquare(vec2 p, float r) {
  vec2 d = abs(p) - vec2(r);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdSquircle(vec2 p, float r) {
  vec2 ap = abs(p);
  float d4 = pow(ap.x, 4.0) + pow(ap.y, 4.0);
  return pow(d4, 0.25) - r;
}

float sdDiamond(vec2 p, float r) {
  vec2 ap = abs(p);
  return (ap.x + ap.y) * 0.70710678 - r;
}

float sdStar5(vec2 p, float r) {
  float an = atan(p.y, p.x);
  float modR = r * (1.0 + 0.22 * cos(5.0 * an));
  return length(p) - modR;
}

// Pseudo-random hash for animated film grain
float hash(vec2 p, float seed) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031 + seed * 0.0137);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  if (!uHasTexture) {
    fragColor = vec4(uFallbackColor, 1.0);
    return;
  }

  // Position relative to lens center, aspect-corrected
  vec2 p = vUv - uPointer;
  p.x *= uAspect;

  float baseR = max(0.01, uSize * 0.35);

  // Organic perimeter wobble
  float angle = atan(p.y, p.x);
  float wobbleOffset = 0.0;
  if (uWobble > 0.001) {
    wobbleOffset = (
      sin(angle * 4.0 + uTime * uWobbleSpeed) * 0.035 +
      cos(angle * 7.0 - uTime * (uWobbleSpeed * 0.65)) * 0.018
    ) * uWobble * baseR;
  }
  float r = max(0.01, baseR + wobbleOffset);

  // Evaluate shape distance
  float d = 0.0;
  if (uShape == 0) {
    d = sdCircle(p, r);
  } else if (uShape == 1) {
    d = sdSquare(p, r);
  } else if (uShape == 2) {
    d = sdSquircle(p, r);
  } else if (uShape == 3) {
    d = sdDiamond(p, r);
  } else {
    d = sdStar5(p, r);
  }

  // Smooth mask transition with softness control
  float edgeFeather = max(0.002, uSoftness * 0.35 + 0.003);
  float inside = 1.0 - smoothstep(-edgeFeather, edgeFeather, d);

  // Lens surface normal & optical refraction
  float normDist = clamp(length(p) / r, 0.0, 1.0);
  vec2 radialDir = length(p) > 1e-5 ? normalize(p) : vec2(0.0);
  vec2 uvRadialDir = vec2(radialDir.x / uAspect, radialDir.y);

  // Surface ripples (concentric waves)
  float wave = sin(normDist * uWaveFrequency * 6.28318 - uTime * uWaveSpeed * 3.14159);
  float waveDisp = wave * uWaveStrength * (1.0 - normDist * 0.7);

  // Non-linear dome glass displacement
  float refrMagnitude = pow(normDist, 1.6) * uDistortion * 0.08 + waveDisp;
  vec2 refrOffset = uvRadialDir * refrMagnitude;

  vec2 baseCoverUv = getCoverUv(vUv, uResolution, uImageResolution);
  vec2 lensUv = baseCoverUv - refrOffset;

  // Chromatic Aberration RGB channel split along refraction normal
  vec2 aberrOffset = uvRadialDir * (pow(normDist, 1.2) * uAberration * 1.8);
  
  vec2 uvR = clamp(lensUv + aberrOffset, vec2(0.001), vec2(0.999));
  vec2 uvG = clamp(lensUv, vec2(0.001), vec2(0.999));
  vec2 uvB = clamp(lensUv - aberrOffset, vec2(0.001), vec2(0.999));

  float colR = texture(uTexture, uvR).r;
  float colG = texture(uTexture, uvG).g;
  float colB = texture(uTexture, uvB).b;
  vec3 insideColor = vec3(colR, colG, colB);

  // Subtle glass sheen / rim reflection
  float rim = smoothstep(0.04, 0.0, abs(d)) * (1.0 - clamp(uSoftness * 1.5, 0.0, 0.8));
  insideColor += vec3(0.9, 0.95, 1.0) * (rim * 0.22);

  // Outside background processing: Grayscale + Grain + Dim
  vec3 outsideRaw = texture(uTexture, baseCoverUv).rgb;
  float luma = dot(outsideRaw, vec3(0.299, 0.587, 0.114));
  vec3 outsideGray = mix(outsideRaw, vec3(luma), uGrayscale);

  // Dynamic film grain
  if (uGrain > 0.0005) {
    float frameSeed = floor(uTime * uGrainSpeed);
    float noise = hash(gl_FragCoord.xy, frameSeed);
    outsideGray += (noise - 0.5) * (uGrain * 3.5);
  }

  // Dimming vignette
  outsideGray *= (1.0 - uDim);

  // Final composite
  vec3 finalColor = mix(outsideGray, insideColor, inside);

  fragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`;

export function GlassReveal({
  image = "/images/sunflowers.jpg",
  shape = "circle",
  size = 0.7,
  softness = 0.0,
  distortion = 0.45,
  aberration = 0.0,
  wobble = 0.0,
  wobbleSpeed = 1.5,
  waveFrequency = 1,
  waveStrength = 0.0,
  waveSpeed = 0.1,
  grain = 0.02,
  grainSpeed = 22,
  grayscale = 0.85,
  dim = 0.0,
  follow = 0.0,
  returnToCenter = false,
  fallback = "#171717",
  paused = false,
  children,
  className,
  style,
  ...props
}: GlassRevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Pointer position tracking & smooth spring/lerp physics
  const pointerTarget = React.useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const pointerCurrent = React.useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isHovered = React.useRef<boolean>(false);

  // Texture state
  const textureRef = React.useRef<WebGLTexture | null>(null);
  const imageSizeRef = React.useRef<{ width: number; height: number }>({ width: 1, height: 1 });
  const [hasTexture, setHasTexture] = React.useState<boolean>(false);

  // WebGL Context & Program References
  const glRef = React.useRef<WebGL2RenderingContext | null>(null);
  const programRef = React.useRef<WebGLProgram | null>(null);
  const animFrameRef = React.useRef<number | null>(null);
  const timeRef = React.useRef<number>(0);
  const lastTimestampRef = React.useRef<number | null>(null);

  // Shape map
  const shapeIndex = React.useMemo(() => {
    switch (shape) {
      case "square":
        return 1;
      case "squircle":
        return 2;
      case "diamond":
        return 3;
      case "star":
        return 4;
      case "circle":
      default:
        return 0;
    }
  }, [shape]);

  // Convert hex color to normalized RGB
  const fallbackRgb = React.useMemo(() => {
    const clean = fallback.replace("#", "");
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16) / 255;
      const g = parseInt(clean.substring(2, 4), 16) / 255;
      const b = parseInt(clean.substring(4, 6), 16) / 255;
      return [r, g, b];
    }
    return [0.09, 0.09, 0.09];
  }, [fallback]);

  // Handle pointer interactions
  const handlePointerMove = React.useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height)); // WebGL bottom-left origin
    pointerTarget.current = { x: nx, y: ny };
    isHovered.current = true;
  }, []);

  const handlePointerEnter = React.useCallback(() => {
    isHovered.current = true;
  }, []);

  const handlePointerLeave = React.useCallback(() => {
    isHovered.current = false;
    if (returnToCenter) {
      pointerTarget.current = { x: 0.5, y: 0.5 };
    }
  }, [returnToCenter]);

  // 1. Initialize WebGL Context & Quad Geometry
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("GlassReveal: WebGL2 not supported in this browser.");
      return;
    }
    glRef.current = gl;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("GlassReveal Shader Error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const frag = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("GlassReveal Program Link Error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;

    // Fullscreen quad buffer [-1, -1] to [1, 1]
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const aPosLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    return () => {
      if (programRef.current) gl.deleteProgram(programRef.current);
      if (textureRef.current) gl.deleteTexture(textureRef.current);
      if (vbo) gl.deleteBuffer(vbo);
      if (vao) gl.deleteVertexArray(vao);
    };
  }, []);

  // 2. Load Image Texture with Cross-Origin Support
  React.useEffect(() => {
    const gl = glRef.current;
    if (!gl || !image) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (!isMounted || !glRef.current) return;
      const gl = glRef.current;

      imageSizeRef.current = { width: img.naturalWidth || img.width, height: img.naturalHeight || img.height };

      let tex = textureRef.current;
      if (!tex) {
        tex = gl.createTexture();
        textureRef.current = tex;
      }

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      setHasTexture(true);
    };

    img.onerror = () => {
      console.warn("GlassReveal: Failed to load image texture from", image);
      setHasTexture(false);
    };

    img.src = image;

    return () => {
      isMounted = false;
    };
  }, [image]);

  // 3. Render Loop with Variable Frame-Rate Delta Time & Uniform Binding
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const program = programRef.current;
    if (!canvas || !gl || !program) return;

    const uTextureLoc = gl.getUniformLocation(program, "uTexture");
    const uHasTextureLoc = gl.getUniformLocation(program, "uHasTexture");
    const uFallbackColorLoc = gl.getUniformLocation(program, "uFallbackColor");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uImageResolutionLoc = gl.getUniformLocation(program, "uImageResolution");
    const uPointerLoc = gl.getUniformLocation(program, "uPointer");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uAspectLoc = gl.getUniformLocation(program, "uAspect");

    const uShapeLoc = gl.getUniformLocation(program, "uShape");
    const uSizeLoc = gl.getUniformLocation(program, "uSize");
    const uSoftnessLoc = gl.getUniformLocation(program, "uSoftness");
    const uDistortionLoc = gl.getUniformLocation(program, "uDistortion");
    const uAberrationLoc = gl.getUniformLocation(program, "uAberration");
    const uWobbleLoc = gl.getUniformLocation(program, "uWobble");
    const uWobbleSpeedLoc = gl.getUniformLocation(program, "uWobbleSpeed");
    const uWaveFrequencyLoc = gl.getUniformLocation(program, "uWaveFrequency");
    const uWaveStrengthLoc = gl.getUniformLocation(program, "uWaveStrength");
    const uWaveSpeedLoc = gl.getUniformLocation(program, "uWaveSpeed");
    const uGrainLoc = gl.getUniformLocation(program, "uGrain");
    const uGrainSpeedLoc = gl.getUniformLocation(program, "uGrainSpeed");
    const uGrayscaleLoc = gl.getUniformLocation(program, "uGrayscale");
    const uDimLoc = gl.getUniformLocation(program, "uDim");

    const render = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      if (!paused) {
        timeRef.current += dt;
      }

      // Smooth pointer follower lerp physics
      // follow: 0 = immediate, 0.99 = slow cinematic follow
      const followFactor = Math.max(0.01, 1.0 - Math.min(0.98, follow));
      const lerpSpeed = 1.0 - Math.pow(1.0 - followFactor, dt * 60.0);

      pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * lerpSpeed;
      pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * lerpSpeed;

      // Handle retina resolution & canvas sizing
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.useProgram(program);

      // Bind texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.uniform1i(uTextureLoc, 0);

      gl.uniform1i(uHasTextureLoc, hasTexture ? 1 : 0);
      gl.uniform3f(uFallbackColorLoc, fallbackRgb[0], fallbackRgb[1], fallbackRgb[2]);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(uImageResolutionLoc, imageSizeRef.current.width, imageSizeRef.current.height);
      gl.uniform2f(uPointerLoc, pointerCurrent.current.x, pointerCurrent.current.y);
      gl.uniform1f(uTimeLoc, timeRef.current);
      gl.uniform1f(uAspectLoc, canvas.width / Math.max(1, canvas.height));

      // Controls uniforms
      gl.uniform1i(uShapeLoc, shapeIndex);
      gl.uniform1f(uSizeLoc, size);
      gl.uniform1f(uSoftnessLoc, softness);
      gl.uniform1f(uDistortionLoc, distortion);
      gl.uniform1f(uAberrationLoc, aberration);
      gl.uniform1f(uWobbleLoc, wobble);
      gl.uniform1f(uWobbleSpeedLoc, wobbleSpeed);
      gl.uniform1f(uWaveFrequencyLoc, waveFrequency);
      gl.uniform1f(uWaveStrengthLoc, waveStrength);
      gl.uniform1f(uWaveSpeedLoc, waveSpeed);
      gl.uniform1f(uGrainLoc, grain);
      gl.uniform1f(uGrainSpeedLoc, grainSpeed);
      gl.uniform1f(uGrayscaleLoc, grayscale);
      gl.uniform1f(uDimLoc, dim);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    lastTimestampRef.current = null;
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    hasTexture,
    fallbackRgb,
    shapeIndex,
    size,
    softness,
    distortion,
    aberration,
    wobble,
    wobbleSpeed,
    waveFrequency,
    waveStrength,
    waveSpeed,
    grain,
    grainSpeed,
    grayscale,
    dim,
    follow,
    paused,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative w-full h-full min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-2xl select-none touch-none bg-neutral-950",
        className
      )}
      style={style}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover pointer-events-none"
      />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}
export default GlassReveal;

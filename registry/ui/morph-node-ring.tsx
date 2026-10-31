"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CanonicalShape =
  | "petal"
  | "diamond"
  | "semicircle"
  | "squircle"
  | "blade"
  | "star"
  | "circle";

export type MorphShapeDesign =
  | "all"
  | CanonicalShape
  | `static-${CanonicalShape}`
  | "morph-sequence"
  | "orbital-rotation"
  | "color-palette";

export interface MorphNodeItem {
  id: string | number;
  image?: string;
  color?: string | [string, string];
  label?: string;
  subtitle?: string;
  onClick?: () => void;
}

export interface MorphNodeRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional custom node items (defaults to high-res portrait avatars or vibrant palettes) */
  items?: MorphNodeItem[];
  /** Total number of nodes / leafs rendered in the radial ring (default: 8) */
  nodeCount?: number;
  /** Render mode: photo image or vibrant gradient color (default: 'image') */
  mode?: "image" | "color";
  /** Diameter of each individual node in pixels (default: 68) */
  nodeSize?: number;
  /** Distance from center to node centers in pixels (default: 130) */
  radius?: number;
  /** Continuously cycle through morphing designs (default: true) */
  loop?: boolean;
  /** Speed multiplier for shape morphing (default: 1) */
  speed?: number;
  /** Choose 'all' to morph between all designs, or select a single static design (default: 'all') */
  design?: MorphShapeDesign;
  /** Enable continuous orbital rotation of the ring (supports both morphing and static designs) (default: false) */
  enableRotation?: boolean;
  /** Orbital rotation speed multiplier (positive for clockwise, negative for counter-clockwise) (default: 1) */
  rotationSpeed?: number;
  /** Counter-rotate images so portrait photos remain right-side up regardless of radial angle (default: true) */
  keepImagesUpright?: boolean;
  /** Optional callback fired when a node is clicked */
  onNodeClick?: (item: MorphNodeItem, index: number) => void;
  /** Optional center hub element */
  centerContent?: React.ReactNode;
}

interface BezierSegment {
  cp1: [number, number];
  cp2: [number, number];
  end: [number, number];
}

interface BezierShape {
  start: [number, number];
  segments: BezierSegment[];
}

// 7 Pristine 8-segment Bezier shapes normalized in [-50, 50] coordinate box
function makeCircle(r = 44): BezierShape {
  const segments: BezierSegment[] = [];
  const n = 8;
  const dTheta = (2 * Math.PI) / n;
  const tanFactor = (4 / 3) * Math.tan(dTheta / 4);
  const l = tanFactor * r;

  const getPt = (th: number): [number, number] => [r * Math.cos(th), r * Math.sin(th)];
  const getTan = (th: number): [number, number] => [-Math.sin(th) * l, Math.cos(th) * l];

  const p0 = getPt(0);
  for (let i = 0; i < n; i++) {
    const th1 = i * dTheta;
    const th2 = (i + 1) * dTheta;
    const pA = getPt(th1);
    const pB = getPt(th2);
    const tA = getTan(th1);
    const tB = getTan(th2);
    segments.push({
      cp1: [pA[0] + tA[0], pA[1] + tA[1]],
      cp2: [pB[0] - tB[0], pB[1] - tB[1]],
      end: [pB[0], pB[1]],
    });
  }
  return { start: p0, segments };
}

function makeSquircle(size = 42, radius = 18): BezierShape {
  const s = size;
  const r = radius;
  const k = r * 0.55228475;
  const p0: [number, number] = [s, 0];
  const segments: BezierSegment[] = [
    { cp1: [s, s - r], cp2: [s, s - r + k], end: [s - r + k, s] },
    { cp1: [s - r, s], cp2: [0, s], end: [0, s] },
    { cp1: [-s + r, s], cp2: [-s + r - k, s], end: [-s, s - r + k] },
    { cp1: [-s, s - r], cp2: [-s, 0], end: [-s, 0] },
    { cp1: [-s, -s + r], cp2: [-s, -s + r - k], end: [-s + r - k, -s] },
    { cp1: [-s + r, -s], cp2: [0, -s], end: [0, -s] },
    { cp1: [s - r, -s], cp2: [s - r + k, -s], end: [s, -s + r - k] },
    { cp1: [s, -s + r], cp2: [s, 0], end: [s, 0] },
  ];
  return { start: p0, segments };
}

function makeDiamond(s = 46): BezierShape {
  const p0: [number, number] = [s, 0];
  const segments: BezierSegment[] = [
    { cp1: [s * 0.75, s * 0.25], cp2: [s * 0.75, s * 0.25], end: [s * 0.5, s * 0.5] },
    { cp1: [s * 0.25, s * 0.75], cp2: [s * 0.25, s * 0.75], end: [0, s] },
    { cp1: [-s * 0.25, s * 0.75], cp2: [-s * 0.25, s * 0.75], end: [-s * 0.5, s * 0.5] },
    { cp1: [-s * 0.75, s * 0.25], cp2: [-s * 0.75, s * 0.25], end: [-s, 0] },
    { cp1: [-s * 0.75, -s * 0.25], cp2: [-s * 0.75, -s * 0.25], end: [-s * 0.5, -s * 0.5] },
    { cp1: [-s * 0.25, -s * 0.75], cp2: [-s * 0.25, -s * 0.75], end: [0, -s] },
    { cp1: [s * 0.25, -s * 0.75], cp2: [s * 0.25, -s * 0.75], end: [s * 0.5, -s * 0.5] },
    { cp1: [s * 0.75, -s * 0.25], cp2: [s * 0.75, -s * 0.25], end: [s, 0] },
  ];
  return { start: p0, segments };
}

function makePetal(w = 36, l = 46): BezierShape {
  const p0: [number, number] = [0, -l];
  const segments: BezierSegment[] = [
    { cp1: [-w * 0.35, -l * 0.7], cp2: [-w * 0.8, -l * 0.3], end: [-w * 0.9, 0] },
    { cp1: [-w * 0.95, l * 0.3], cp2: [-w * 0.7, l * 0.65], end: [-w * 0.45, l * 0.8] },
    { cp1: [-w * 0.25, l * 0.9], cp2: [-w * 0.1, l * 0.95], end: [0, l * 0.95] },
    { cp1: [w * 0.1, l * 0.95], cp2: [w * 0.25, l * 0.9], end: [w * 0.45, l * 0.8] },
    { cp1: [w * 0.7, l * 0.65], cp2: [w * 0.95, l * 0.3], end: [w * 0.9, 0] },
    { cp1: [w * 0.8, -l * 0.3], cp2: [w * 0.35, -l * 0.7], end: [0, -l] },
    { cp1: [0, -l], cp2: [0, -l], end: [0, -l] },
    { cp1: [0, -l], cp2: [0, -l], end: [0, -l] },
  ];
  return { start: p0, segments };
}

function makeSemicircle(r = 44): BezierShape {
  const base = 18;
  const p0: [number, number] = [r, base];
  const segments: BezierSegment[] = [
    { cp1: [r * 0.5, base], cp2: [0, base], end: [0, base] },
    { cp1: [0, base], cp2: [-r * 0.5, base], end: [-r, base] },
    { cp1: [-r, base - 5], cp2: [-r * 0.95, -5], end: [-r * 0.85, -18] },
    { cp1: [-r * 0.65, -36], cp2: [-r * 0.35, -r], end: [0, -r] },
    { cp1: [r * 0.35, -r], cp2: [r * 0.65, -36], end: [r * 0.85, -18] },
    { cp1: [r * 0.95, -5], cp2: [r, base - 5], end: [r, base] },
    { cp1: [r, base], cp2: [r, base], end: [r, base] },
    { cp1: [r, base], cp2: [r, base], end: [r, base] },
  ];
  return { start: p0, segments };
}

function makeBlade(s = 44): BezierShape {
  const p0: [number, number] = [0, -s];
  const segments: BezierSegment[] = [
    { cp1: [-s * 0.4, -s * 0.8], cp2: [-s * 0.7, -s * 0.3], end: [-s * 0.8, 0] },
    { cp1: [-s * 0.9, s * 0.3], cp2: [-s * 0.7, s * 0.7], end: [-s * 0.3, s * 0.9] },
    { cp1: [0, s], cp2: [s * 0.3, s * 0.8], end: [s * 0.6, s * 0.5] },
    { cp1: [s * 0.9, s * 0.2], cp2: [s * 0.95, -s * 0.2], end: [s * 0.7, -s * 0.5] },
    { cp1: [s * 0.5, -s * 0.7], cp2: [s * 0.2, -s * 0.9], end: [0, -s] },
    { cp1: [0, -s], cp2: [0, -s], end: [0, -s] },
    { cp1: [0, -s], cp2: [0, -s], end: [0, -s] },
    { cp1: [0, -s], cp2: [0, -s], end: [0, -s] },
  ];
  return { start: p0, segments };
}

function makeStar(s = 46): BezierShape {
  const rOuter = s;
  const rInner = s * 0.35;
  const pts: [number, number][] = [
    [rOuter, 0],
    [rInner, rInner],
    [0, rOuter],
    [-rInner, rInner],
    [-rOuter, 0],
    [-rInner, -rInner],
    [0, -rOuter],
    [rInner, -rInner],
  ];
  const p0 = pts[0];
  const segments: BezierSegment[] = [];
  for (let i = 0; i < 8; i++) {
    const pA = pts[i];
    const pB = pts[(i + 1) % 8];
    segments.push({
      cp1: [pA[0] * 0.65 + pB[0] * 0.35, pA[1] * 0.65 + pB[1] * 0.35],
      cp2: [pA[0] * 0.35 + pB[0] * 0.65, pA[1] * 0.35 + pB[1] * 0.65],
      end: [pB[0], pB[1]],
    });
  }
  return { start: p0, segments };
}

const CANONICAL_SHAPES: Record<CanonicalShape, BezierShape> = {
  petal: makePetal(),
  diamond: makeDiamond(),
  semicircle: makeSemicircle(),
  squircle: makeSquircle(),
  blade: makeBlade(),
  star: makeStar(),
  circle: makeCircle(),
};

const MORPH_SEQUENCE: BezierShape[] = [
  CANONICAL_SHAPES.petal,
  CANONICAL_SHAPES.diamond,
  CANONICAL_SHAPES.semicircle,
  CANONICAL_SHAPES.squircle,
  CANONICAL_SHAPES.blade,
  CANONICAL_SHAPES.star,
  CANONICAL_SHAPES.circle,
];

function lerpShape(sA: BezierShape, sB: BezierShape, t: number): BezierShape {
  const lerp = (a: number, b: number) => a + (b - a) * t;
  const lerpPt = (p1: [number, number], p2: [number, number]): [number, number] => [
    lerp(p1[0], p2[0]),
    lerp(p1[1], p2[1]),
  ];
  return {
    start: lerpPt(sA.start, sB.start),
    segments: sA.segments.map((segA, i) => {
      const segB = sB.segments[i];
      return {
        cp1: lerpPt(segA.cp1, segB.cp1),
        cp2: lerpPt(segA.cp2, segB.cp2),
        end: lerpPt(segA.end, segB.end),
      };
    }),
  };
}

function shapeToD(shape: BezierShape): string {
  let d = `M ${shape.start[0].toFixed(2)},${shape.start[1].toFixed(2)}`;
  for (const seg of shape.segments) {
    d += ` C ${seg.cp1[0].toFixed(2)},${seg.cp1[1].toFixed(2)} ${seg.cp2[0].toFixed(2)},${seg.cp2[1].toFixed(2)} ${seg.end[0].toFixed(2)},${seg.end[1].toFixed(2)}`;
  }
  d += " Z";
  return d;
}

const DEFAULT_AVATARS: string[] = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=240&auto=format&fit=crop&q=80",
];

const DEFAULT_GRADIENTS: [string, string][] = [
  ["#38bdf8", "#0284c7"], // Sky
  ["#818cf8", "#4f46e5"], // Indigo
  ["#c084fc", "#9333ea"], // Purple
  ["#f472b6", "#db2777"], // Pink
  ["#fb7185", "#e11d48"], // Rose
  ["#fb923c", "#ea580c"], // Orange
  ["#facc15", "#ca8a04"], // Amber
  ["#4ade80", "#16a34a"], // Emerald
  ["#2dd4bf", "#0d9488"], // Teal
  ["#60a5fa", "#2563eb"], // Blue
  ["#a855f7", "#7e22ce"], // Violet
  ["#ec4899", "#be185d"], // Fuchsia
  ["#f87171", "#dc2626"], // Red
  ["#34d399", "#059669"], // Green
  ["#38bdf8", "#6366f1"], // Sky-Indigo
  ["#f43f5e", "#fb923c"], // Sunset
];

export function resolveCanonicalDesign(d?: string): CanonicalShape | "all" {
  if (!d || d === "all" || d === "morph-sequence" || d === "orbital-rotation" || d === "color-palette") return "all";
  const clean = d.replace(/^static-/, "") as CanonicalShape;
  if (clean in CANONICAL_SHAPES) {
    return clean;
  }
  return "all";
}

export function MorphNodeRing({
  items,
  nodeCount = 8,
  mode = "image",
  nodeSize = 68,
  radius = 130,
  loop = true,
  speed = 1,
  design = "all",
  enableRotation = false,
  rotationSpeed = 1,
  keepImagesUpright = true,
  onNodeClick,
  centerContent,
  className,
  ...props
}: MorphNodeRingProps) {
  const instanceId = React.useId().replace(/[:]/g, "");
  const resolvedDesign = resolveCanonicalDesign(design);

  const [activeD, setActiveD] = React.useState<string>(() => {
    if (resolvedDesign !== "all" && CANONICAL_SHAPES[resolvedDesign]) {
      return shapeToD(CANONICAL_SHAPES[resolvedDesign]);
    }
    return shapeToD(MORPH_SEQUENCE[0]);
  });
  const [ringAngle, setRingAngle] = React.useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Normalise count between 3 and 16
  const count = Math.max(3, Math.min(16, nodeCount));

  // Resolved list of nodes
  const displayItems = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const customItem = items && items[i % items.length];
      const image = customItem?.image || DEFAULT_AVATARS[i % DEFAULT_AVATARS.length];
      const color = customItem?.color || DEFAULT_GRADIENTS[i % DEFAULT_GRADIENTS.length];
      return {
        id: customItem?.id ?? `node-${i}`,
        image,
        color,
        label: customItem?.label || `Leaf ${i + 1}`,
        subtitle: customItem?.subtitle,
        onClick: customItem?.onClick,
      };
    });
  }, [items, count]);

  // Animation Loop for morphing and orbital rotation
  const animRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);
  const morphProgressRef = React.useRef<number>(0);
  const currentAngleRef = React.useRef<number>(0);

  // Sync static design changes immediately
  React.useEffect(() => {
    if (resolvedDesign !== "all" && CANONICAL_SHAPES[resolvedDesign]) {
      setActiveD(shapeToD(CANONICAL_SHAPES[resolvedDesign]));
    }
  }, [resolvedDesign]);

  React.useEffect(() => {
    const isMorphing = resolvedDesign === "all";
    const isRotating = Boolean(enableRotation);

    if (!isMorphing && !isRotating) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const cycleDuration = 3.2 / Math.max(0.1, speed); // duration per transition step

    const frame = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // 1. Morph Animation (active when design is 'all')
      if (isMorphing && loop) {
        morphProgressRef.current += dt / cycleDuration;
        const totalStages = MORPH_SEQUENCE.length;
        const totalProgress = morphProgressRef.current % totalStages;
        const stageIndex = Math.floor(totalProgress);
        const nextIndex = (stageIndex + 1) % totalStages;
        const rawT = totalProgress - stageIndex;

        // Smooth ease-in-out cubic
        const t =
          rawT < 0.5
            ? 4 * rawT * rawT * rawT
            : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

        const morphed = lerpShape(
          MORPH_SEQUENCE[stageIndex],
          MORPH_SEQUENCE[nextIndex],
          t
        );
        setActiveD(shapeToD(morphed));
      }

      // 2. Orbital Ring Rotation (active in both morphing and static designs)
      if (isRotating) {
        // 360 deg in 16 seconds * rotationSpeed
        const degPerSec = (360 / 16) * rotationSpeed;
        currentAngleRef.current = (currentAngleRef.current + degPerSec * dt) % 360;
        setRingAngle(currentAngleRef.current);
      } else {
        setRingAngle(0);
      }

      animRef.current = requestAnimationFrame(frame);
    };

    lastTimeRef.current = null;
    animRef.current = requestAnimationFrame(frame);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [resolvedDesign, loop, speed, enableRotation, rotationSpeed]);

  // Overall SVG dimensions: radius * 2 + nodeSize * 2 + padding
  const svgPadding = 48;
  const totalDim = Math.ceil((radius + nodeSize / 2) * 2 + svgPadding);
  const half = totalDim / 2;
  const scaleRatio = nodeSize / 92; // shapes are authored around radius 46 (diameter 92)

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none overflow-hidden",
        className
      )}
      {...props}
    >
      <svg
        width={totalDim}
        height={totalDim}
        viewBox={`-${half} -${half} ${totalDim} ${totalDim}`}
        className="overflow-visible"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      >
        <defs>
          {/* Reusable Morph Clip Path */}
          <clipPath id={`morph-clip-${instanceId}`}>
            <path d={activeD} />
          </clipPath>

          {/* Color Gradients */}
          {displayItems.map((item, i) => {
            const gradId = `node-grad-${instanceId}-${i}`;
            const c = Array.isArray(item.color)
              ? item.color
              : [item.color || "#38bdf8", item.color || "#0284c7"];
            return (
              <linearGradient
                key={gradId}
                id={gradId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={c[0]} />
                <stop offset="100%" stopColor={c[1]} />
              </linearGradient>
            );
          })}

          {/* Glowing Drop Shadow Filter for nodes */}
          <filter id={`node-glow-${instanceId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Orbit Guide Track (subtle aesthetic dashed line) */}
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-[var(--border)] opacity-35"
          strokeDasharray="4 6"
          strokeWidth="1.2"
        />

        {/* Radial Nodes Container (Orbits if rotation is enabled) */}
        <g transform={`rotate(${ringAngle.toFixed(2)})`}>
          {displayItems.map((item, i) => {
            const angle = (i * 2 * Math.PI) / count;
            const cx = radius * Math.cos(angle);
            const cy = radius * Math.sin(angle);
            const deg = (angle * 180) / Math.PI + 90; // Radiate outward
            const isHovered = hoveredIndex === i;
            const gradId = `node-grad-${instanceId}-${i}`;

            // Image upright rotation correction
            const imgCorrection = keepImagesUpright
              ? -(deg + ringAngle)
              : 0;

            return (
              <g
                key={item.id}
                transform={`translate(${cx.toFixed(2)}, ${cy.toFixed(2)})`}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: "center",
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  item.onClick?.();
                  onNodeClick?.(item, i);
                }}
              >
                {/* Node Leaf / Shape */}
                <g
                  transform={`rotate(${deg.toFixed(2)}) scale(${
                    isHovered ? (scaleRatio * 1.1).toFixed(3) : scaleRatio.toFixed(3)
                  })`}
                  style={{
                    transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {mode === "image" ? (
                    <>
                      {/* Dark backing disc */}
                      <path d={activeD} fill="#0d0e15" opacity="0.9" />

                      {/* Image clipped to morphing shape */}
                      <g clipPath={`url(#morph-clip-${instanceId})`}>
                        <g transform={`rotate(${imgCorrection.toFixed(2)})`}>
                          <image
                            href={item.image}
                            x={-52}
                            y={-52}
                            width={104}
                            height={104}
                            preserveAspectRatio="xMidYMid slice"
                            className="transition-opacity duration-300"
                            style={{
                              opacity: isHovered ? 1 : 0.9,
                            }}
                          />
                        </g>
                      </g>

                      {/* Subtle Glass Tint / Border Highlight */}
                      <path
                        d={activeD}
                        fill="none"
                        stroke={isHovered ? "var(--accent)" : "rgba(255, 255, 255, 0.45)"}
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className="transition-colors duration-200"
                      />
                    </>
                  ) : (
                    <>
                      {/* Gradient Fill with Glow */}
                      <path
                        d={activeD}
                        fill={`url(#${gradId})`}
                        filter={`url(#node-glow-${instanceId})`}
                        className="transition-opacity duration-200"
                        style={{
                          opacity: isHovered ? 1 : 0.88,
                        }}
                      />

                      {/* Crisp Rim Stroke */}
                      <path
                        d={activeD}
                        fill="none"
                        stroke={isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.55)"}
                        strokeWidth={isHovered ? 2.2 : 1.4}
                      />
                    </>
                  )}
                </g>
              </g>
            );
          })}
        </g>

        {/* Center Hub Display */}
        <g className="pointer-events-none">
          {centerContent ? (
            <foreignObject
              x={-50}
              y={-50}
              width={100}
              height={100}
              className="pointer-events-auto"
            >
              <div className="flex h-full w-full items-center justify-center">
                {centerContent}
              </div>
            </foreignObject>
          ) : (
            <g>
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="var(--surface-elevated)"
                stroke="var(--border)"
                strokeWidth="1.5"
                className="opacity-90 drop-shadow-sm"
              />
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="var(--accent)"
                className="animate-pulse"
              />
            </g>
          )}
        </g>
      </svg>

      {/* Floating Tooltip when hovering a node */}
      {hoveredIndex !== null && displayItems[hoveredIndex] && (
        <div
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 px-3.5 py-1 text-xs font-mono font-medium text-[var(--text-primary)] shadow-lg backdrop-blur-md transition-opacity duration-150 animate-in fade-in"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span>{displayItems[hoveredIndex].label}</span>
          {displayItems[hoveredIndex].subtitle && (
            <span className="text-[var(--text-muted)] font-sans">
              · {displayItems[hoveredIndex].subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default MorphNodeRing;

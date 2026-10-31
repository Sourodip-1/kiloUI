"use client";

import * as React from "react";
import * as THREE from "three";
import { Eye, EyeOff, Loader2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────── */
/* 1. InteractiveMechanicalScene (Static Outline + Expand/Shrink)       */
/* ─────────────────────────────────────────────────────────────────── */

export interface CylinderData {
  id: number;
  label: string;
  height: number;
  radius: number;
  xPos: number;
  dimNote: string;
}

// 11 Cylindrical elements replicating the reference architectural isometric distribution
export const CYLINDER_DEFINITIONS: CylinderData[] = [
  { id: 1, label: "01", height: 2.7, radius: 0.52, xPos: -4.3, dimNote: "h: 27mm" },
  { id: 2, label: "02", height: 3.9, radius: 0.52, xPos: -3.44, dimNote: "h: 39mm" },
  { id: 3, label: "03", height: 4.8, radius: 0.54, xPos: -2.58, dimNote: "h: 48mm (peak)" },
  { id: 4, label: "04", height: 3.8, radius: 0.52, xPos: -1.72, dimNote: "h: 38mm" },
  { id: 5, label: "05", height: 3.1, radius: 0.52, xPos: -0.86, dimNote: "h: 31mm" },
  { id: 6, label: "06", height: 1.8, radius: 0.44, xPos: 0.0, dimNote: "h: 18mm" },
  { id: 7, label: "07", height: 3.4, radius: 0.52, xPos: 0.86, dimNote: "h: 34mm" },
  { id: 8, label: "08", height: 3.7, radius: 0.52, xPos: 1.72, dimNote: "h: 37mm" },
  { id: 9, label: "09", height: 1.0, radius: 0.44, xPos: 2.58, dimNote: "h: 10mm (base)" },
  { id: 10, label: "10", height: 2.4, radius: 0.52, xPos: 3.44, dimNote: "h: 24mm" },
  { id: 11, label: "11", height: 1.4, radius: 0.48, xPos: 4.3, dimNote: "h: 14mm" },
];

interface CylinderEntity {
  group: THREE.Group;
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  rulingLines: THREE.LineSegments;
  def: CylinderData;
  currentScaleY: number;
  targetScaleY: number;
  currentScaleXZ: number;
  targetScaleXZ: number;
}

export interface InteractiveMechanicalSceneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum expansion multiplier when a cylinder is hovered (default: 1.42) */
  expandRatio?: number;
  /** Whether adjacent cylinders gently swell in a wave (default: true) */
  neighborWave?: boolean;
  /** Y-axis rotation of the model in degrees (default: -26) */
  rotationY?: number;
  /** X-axis pitch rotation of the model in degrees (default: 3) */
  rotationX?: number;
  /** Callback fired when a cylinder hover state changes */
  onHoverCylinder?: (cyl: CylinderData | null) => void;
}

export function InteractiveMechanicalScene({
  expandRatio = 1.42,
  neighborWave = true,
  rotationY = -26,
  rotationX = 3,
  onHoverCylinder,
  className,
  ...props
}: InteractiveMechanicalSceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // HUD state for hovered cylinder
  const [hoveredCyl, setHoveredCyl] = React.useState<CylinderData | null>(null);
  const [hudPos, setHudPos] = React.useState<{ x: number; y: number } | null>(null);

  // Animation & Interaction refs
  const sceneStateRef = React.useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    modelGroup: THREE.Group;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    cylinderEntities: CylinderEntity[];
    hoveredIndex: number | null;
    isPointerOver: boolean;
    animId: number;
    clock: THREE.Clock;
    isReducedMotion: boolean;
  } | null>(null);

  // Setup Three.js Scene
  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 580;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent so off-white container and background SVG construction lines show

    // 2. Camera (Static axonometric/isometric perspective matching reference image)
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(31, aspect, 0.1, 100);
    // Locked static camera position
    camera.position.set(13.8, 12.2, 16.0);
    camera.lookAt(0, 2.2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lights (Soft architectural ambient occlusion & diffuse illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfdfcf7, 0.85);
    mainLight.position.set(14, 26, 16);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xededed, 0.35);
    fillLight.position.set(-12, 12, -10);
    scene.add(fillLight);

    // 5. Model Group (Oriented by rotation props)
    const modelGroup = new THREE.Group();
    modelGroup.rotation.y = (rotationY * Math.PI) / 180;
    modelGroup.rotation.x = (rotationX * Math.PI) / 180;
    scene.add(modelGroup);

    // Shared Materials
    // A. Architectural off-white paper matte surface
    const surfaceMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f4ee,
      roughness: 0.92,
      metalness: 0.02,
      flatShading: false,
    });

    // B. Base groove recessed surface
    const grooveMaterial = new THREE.MeshStandardMaterial({
      color: 0xebe9e2,
      roughness: 0.95,
      metalness: 0.0,
    });

    // C. Charcoal ink edge line material (thin, technical blueprint line)
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x2e2d2a,
      linewidth: 1,
      transparent: true,
      opacity: 0.88,
    });

    // D. Faint drafting interior ruling lines
    const internalRulingMaterial = new THREE.LineBasicMaterial({
      color: 0x6e6c66,
      linewidth: 1,
      transparent: true,
      opacity: 0.38,
    });

    // ─────────────────────────────────────────────────────────────
    // Geometry Part 1: Plinth / Stadium Base (STATIC)
    // ─────────────────────────────────────────────────────────────
    const createStadiumShape = (length: number, radius: number) => {
      const shape = new THREE.Shape();
      const halfL = length / 2;
      shape.absarc(halfL, 0, radius, -Math.PI / 2, Math.PI / 2, false);
      shape.absarc(-halfL, 0, radius, Math.PI / 2, (3 * Math.PI) / 2, false);
      return shape;
    };

    // Outer Base Slab
    const baseShape = createStadiumShape(11.8, 1.35);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.44,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    baseGeo.rotateX(Math.PI / 2);
    baseGeo.translate(0, 0.44, 0);

    const baseMesh = new THREE.Mesh(baseGeo, surfaceMaterial);
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    modelGroup.add(baseMesh);

    const baseEdgesGeo = new THREE.EdgesGeometry(baseGeo, 24);
    const baseEdges = new THREE.LineSegments(baseEdgesGeo, edgeMaterial);
    modelGroup.add(baseEdges);

    // Inner Recessed Slot/Track
    const slotShape = createStadiumShape(10.2, 0.76);
    const slotGeo = new THREE.ExtrudeGeometry(slotShape, {
      depth: 0.12,
      bevelEnabled: false,
    });
    slotGeo.rotateX(Math.PI / 2);
    slotGeo.translate(0, 0.45, 0);

    const slotMesh = new THREE.Mesh(slotGeo, grooveMaterial);
    slotMesh.receiveShadow = true;
    modelGroup.add(slotMesh);

    const slotEdgesGeo = new THREE.EdgesGeometry(slotGeo, 24);
    const slotEdges = new THREE.LineSegments(slotEdgesGeo, edgeMaterial);
    modelGroup.add(slotEdges);

    // ─────────────────────────────────────────────────────────────
    // Geometry Part 2: End Support Posts & Overhead Rail (STATIC)
    // ─────────────────────────────────────────────────────────────
    // Calibrated height so expanded cylinders never clip through the crossbar
    const postHeight = 7.4;
    const postRadius = 0.14;
    const postGeo = new THREE.CylinderGeometry(postRadius, postRadius, postHeight, 20);
    const postEdgesGeo = new THREE.EdgesGeometry(postGeo, 24);

    // Left Support Post
    const leftPostX = -5.35;
    const leftPost = new THREE.Mesh(postGeo, surfaceMaterial);
    leftPost.position.set(leftPostX, 0.45 + postHeight / 2, 0);
    leftPost.castShadow = true;
    modelGroup.add(leftPost);

    const leftPostEdges = new THREE.LineSegments(postEdgesGeo, edgeMaterial);
    leftPostEdges.position.copy(leftPost.position);
    modelGroup.add(leftPostEdges);

    // Left Post Bottom Collar
    const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20);
    const collarEdgesGeo = new THREE.EdgesGeometry(collarGeo, 24);

    const leftCollar = new THREE.Mesh(collarGeo, surfaceMaterial);
    leftCollar.position.set(leftPostX, 0.48, 0);
    modelGroup.add(leftCollar);
    const leftCollarEdges = new THREE.LineSegments(collarEdgesGeo, edgeMaterial);
    leftCollarEdges.position.copy(leftCollar.position);
    modelGroup.add(leftCollarEdges);

    // Right Support Post
    const rightPostX = 5.35;
    const rightPost = new THREE.Mesh(postGeo, surfaceMaterial);
    rightPost.position.set(rightPostX, 0.45 + postHeight / 2, 0);
    rightPost.castShadow = true;
    modelGroup.add(rightPost);

    const rightPostEdges = new THREE.LineSegments(postEdgesGeo, edgeMaterial);
    rightPostEdges.position.copy(rightPost.position);
    modelGroup.add(rightPostEdges);

    // Right Post Bottom Collar
    const rightCollar = new THREE.Mesh(collarGeo, surfaceMaterial);
    rightCollar.position.set(rightPostX, 0.48, 0);
    modelGroup.add(rightCollar);
    const rightCollarEdges = new THREE.LineSegments(collarEdgesGeo, edgeMaterial);
    rightCollarEdges.position.copy(rightCollar.position);
    modelGroup.add(rightCollarEdges);

    // Overhead Rail / Crossbar (Narrower rounded stadium bar)
    const railShape = createStadiumShape(11.2, 0.42);
    const railGeo = new THREE.ExtrudeGeometry(railShape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    railGeo.rotateX(Math.PI / 2);
    railGeo.translate(0, 0.45 + postHeight + 0.11, 0);

    const railMesh = new THREE.Mesh(railGeo, surfaceMaterial);
    railMesh.castShadow = true;
    modelGroup.add(railMesh);

    const railEdgesGeo = new THREE.EdgesGeometry(railGeo, 24);
    const railEdges = new THREE.LineSegments(railEdgesGeo, edgeMaterial);
    modelGroup.add(railEdges);

    // ─────────────────────────────────────────────────────────────
    // Geometry Part 3: The 11 Cylinders (Interactive Expand / Shrink)
    // ─────────────────────────────────────────────────────────────
    const cylinderEntities: CylinderEntity[] = [];

    CYLINDER_DEFINITIONS.forEach((def) => {
      // Cylinder group anchored at slot floor (y = 0.45) so scaling y scales upwards!
      const cylGroup = new THREE.Group();
      cylGroup.position.set(def.xPos, 0.45, 0);
      modelGroup.add(cylGroup);

      // Cylinder body geometry: translated so base sits at local y = 0
      const cylGeo = new THREE.CylinderGeometry(def.radius, def.radius, def.height, 32);
      cylGeo.translate(0, def.height / 2, 0);

      const cylMesh = new THREE.Mesh(
        cylGeo,
        new THREE.MeshStandardMaterial({
          color: 0xf5f4ee,
          roughness: 0.9,
          metalness: 0.02,
        })
      );
      cylMesh.castShadow = true;
      cylMesh.receiveShadow = true;
      cylMesh.userData = { cylinderDef: def };
      cylGroup.add(cylMesh);

      // Top & Bottom circular rim edges
      const cylEdgesGeo = new THREE.EdgesGeometry(cylGeo, 28);
      const cylEdges = new THREE.LineSegments(
        cylEdgesGeo,
        new THREE.LineBasicMaterial({
          color: 0x2e2d2a,
          linewidth: 1,
          transparent: true,
          opacity: 0.88,
        })
      );
      cylGroup.add(cylEdges);

      // Architectural vertical silhouette & internal drafting ruling lines
      const rulingPoints: THREE.Vector3[] = [];
      const numRulings = 4;
      for (let r = 0; r < numRulings; r++) {
        const angle = (r * Math.PI) / (numRulings / 2);
        const rx = Math.cos(angle) * def.radius;
        const rz = Math.sin(angle) * def.radius;
        rulingPoints.push(new THREE.Vector3(rx, 0, rz));
        rulingPoints.push(new THREE.Vector3(rx, def.height, rz));
      }
      const rulingGeo = new THREE.BufferGeometry().setFromPoints(rulingPoints);
      const rulingLines = new THREE.LineSegments(rulingGeo, internalRulingMaterial);
      cylGroup.add(rulingLines);

      cylinderEntities.push({
        group: cylGroup,
        mesh: cylMesh,
        edges: cylEdges,
        rulingLines,
        def,
        currentScaleY: 1.0,
        targetScaleY: 1.0,
        currentScaleXZ: 1.0,
        targetScaleXZ: 1.0,
      });
    });

    // ─────────────────────────────────────────────────────────────
    // Geometry Part 4: Ambient Occlusion Ground Contact Shadow
    // ─────────────────────────────────────────────────────────────
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 512;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(256, 64, 10, 256, 64, 240);
      grad.addColorStop(0, "rgba(40, 38, 34, 0.18)");
      grad.addColorStop(0.35, "rgba(40, 38, 34, 0.10)");
      grad.addColorStop(0.7, "rgba(40, 38, 34, 0.03)");
      grad.addColorStop(1, "rgba(40, 38, 34, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 512, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneGeo = new THREE.PlaneGeometry(16, 4.8);
    shadowPlaneGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowPlaneGeo, shadowMat);
    shadowMesh.position.set(0, 0.02, 0);
    modelGroup.add(shadowMesh);

    // Save scene state
    sceneStateRef.current = {
      scene,
      camera,
      renderer,
      modelGroup,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(-999, -999),
      cylinderEntities,
      hoveredIndex: null,
      isPointerOver: false,
      animId: 0,
      clock: new THREE.Clock(),
      isReducedMotion: prefersReducedMotion,
    };

    // ─────────────────────────────────────────────────────────────
    // Animation Loop: Smooth Cylinder Expansion / Shrinking
    // ─────────────────────────────────────────────────────────────
    const renderLoop = () => {
      const state = sceneStateRef.current;
      if (!state) return;

      // Smooth interpolation for cylinder expansion and shrinkage
      const lerpSpeed = 0.14; // smooth, physical spring-like rate
      state.cylinderEntities.forEach((cyl) => {
        cyl.currentScaleY += (cyl.targetScaleY - cyl.currentScaleY) * lerpSpeed;
        cyl.currentScaleXZ += (cyl.targetScaleXZ - cyl.currentScaleXZ) * lerpSpeed;
        cyl.group.scale.set(cyl.currentScaleXZ, cyl.currentScaleY, cyl.currentScaleXZ);
      });

      // Raycasting for individual cylinder hover detection
      if (state.isPointerOver) {
        state.raycaster.setFromCamera(state.mouse, camera);
        const intersectableMeshes = state.cylinderEntities.map((c) => c.mesh);
        const intersects = state.raycaster.intersectObjects(intersectableMeshes, false);

        if (intersects.length > 0) {
          const hitMesh = intersects[0].object as THREE.Mesh;
          const hitIdx = state.cylinderEntities.findIndex((c) => c.mesh === hitMesh);

          if (hitIdx !== state.hoveredIndex) {
            state.hoveredIndex = hitIdx;

            // Apply expansion heights
            state.cylinderEntities.forEach((cyl, idx) => {
              const dist = Math.abs(idx - hitIdx);
              if (dist === 0) {
                // Primary hovered cylinder: expands to full ratio
                cyl.targetScaleY = expandRatio;
                cyl.targetScaleXZ = 1.06;
                (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xe8e6dc);
                (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x111111);
                (cyl.edges.material as THREE.LineBasicMaterial).opacity = 1.0;
              } else if (neighborWave && dist === 1) {
                // Immediate neighbor: expands moderately
                cyl.targetScaleY = 1.0 + (expandRatio - 1.0) * 0.48;
                cyl.targetScaleXZ = 1.03;
                (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xf0eee5);
                (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x222220);
                (cyl.edges.material as THREE.LineBasicMaterial).opacity = 0.95;
              } else if (neighborWave && dist === 2) {
                // Secondary neighbor: subtle lift
                cyl.targetScaleY = 1.0 + (expandRatio - 1.0) * 0.18;
                cyl.targetScaleXZ = 1.01;
                (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xf5f4ee);
                (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x2e2d2a);
                (cyl.edges.material as THREE.LineBasicMaterial).opacity = 0.88;
              } else {
                // Rest of cylinders stay at / shrink to base height
                cyl.targetScaleY = 1.0;
                cyl.targetScaleXZ = 1.0;
                (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xf5f4ee);
                (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x2e2d2a);
                (cyl.edges.material as THREE.LineBasicMaterial).opacity = 0.88;
              }
            });

            const activeCyl = state.cylinderEntities[hitIdx];
            setHoveredCyl(activeCyl.def);
            if (onHoverCylinder) onHoverCylinder(activeCyl.def);

            // Compute 2D screen coordinate for technical HUD tag right above cylinder
            const worldPos = new THREE.Vector3(
              activeCyl.def.xPos,
              0.45 + activeCyl.def.height * expandRatio + 0.35,
              0
            );
            worldPos.applyMatrix4(modelGroup.matrixWorld);
            worldPos.project(camera);

            const screenX = ((worldPos.x + 1) * width) / 2;
            const screenY = ((-worldPos.y + 1) * height) / 2;
            setHudPos({ x: screenX, y: screenY });
          }
        } else {
          // Pointer is over scene but not over any cylinder -> shrink all cylinders back
          if (state.hoveredIndex !== null) {
            state.hoveredIndex = null;
            state.cylinderEntities.forEach((cyl) => {
              cyl.targetScaleY = 1.0;
              cyl.targetScaleXZ = 1.0;
              (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xf5f4ee);
              (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x2e2d2a);
              (cyl.edges.material as THREE.LineBasicMaterial).opacity = 0.88;
            });
            setHoveredCyl(null);
            setHudPos(null);
            if (onHoverCylinder) onHoverCylinder(null);
          }
        }
      }

      renderer.render(scene, camera);
      state.animId = requestAnimationFrame(renderLoop);
    };

    if (sceneStateRef.current) {
      sceneStateRef.current.animId = requestAnimationFrame(renderLoop);
    }

    // Resize Observer for responsive sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup resources
    return () => {
      resizeObserver.disconnect();
      const state = sceneStateRef.current;
      if (state) {
        if (state.animId) cancelAnimationFrame(state.animId);

        state.cylinderEntities.forEach((c) => {
          c.mesh.geometry.dispose();
          c.edges.geometry.dispose();
          c.rulingLines.geometry.dispose();
          if (c.mesh.material instanceof THREE.Material) c.mesh.material.dispose();
          if (c.edges.material instanceof THREE.Material) c.edges.material.dispose();
        });
      }

      baseGeo.dispose();
      baseEdgesGeo.dispose();
      slotGeo.dispose();
      slotEdgesGeo.dispose();
      postGeo.dispose();
      postEdgesGeo.dispose();
      collarGeo.dispose();
      collarEdgesGeo.dispose();
      railGeo.dispose();
      railEdgesGeo.dispose();
      shadowPlaneGeo.dispose();
      shadowTexture.dispose();
      surfaceMaterial.dispose();
      grooveMaterial.dispose();
      edgeMaterial.dispose();
      internalRulingMaterial.dispose();

      renderer.dispose();
      sceneStateRef.current = null;
    };
  }, [expandRatio, neighborWave, onHoverCylinder]);

  // Reactive rotation updates without tearing down the WebGL scene
  React.useEffect(() => {
    const state = sceneStateRef.current;
    if (!state) return;
    state.modelGroup.rotation.y = (rotationY * Math.PI) / 180;
    state.modelGroup.rotation.x = (rotationX * Math.PI) / 180;
  }, [rotationY, rotationX]);

  // Pointer Movement Handler (Only raycasts to expand/shrink cylinders — NO parallax)
  const handlePointerMove = (e: React.PointerEvent) => {
    const state = sceneStateRef.current;
    if (!state) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized Device Coordinates for Three.js (-1 to +1)
    state.mouse.x = (x / rect.width) * 2 - 1;
    state.mouse.y = -(y / rect.height) * 2 + 1;
    state.isPointerOver = true;
  };

  const handlePointerLeave = () => {
    const state = sceneStateRef.current;
    if (!state) return;
    state.isPointerOver = false;
    state.mouse.set(-999, -999);
    state.hoveredIndex = null;

    // All cylinders smoothly shrink back to rest height
    state.cylinderEntities.forEach((cyl) => {
      cyl.targetScaleY = 1.0;
      cyl.targetScaleXZ = 1.0;
      (cyl.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xf5f4ee);
      (cyl.edges.material as THREE.LineBasicMaterial).color.setHex(0x2e2d2a);
      (cyl.edges.material as THREE.LineBasicMaterial).opacity = 0.88;
    });

    setHoveredCyl(null);
    setHudPos(null);
    if (onHoverCylinder) onHoverCylinder(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative w-full h-full min-h-[460px] select-none overflow-hidden",
        hoveredCyl ? "cursor-pointer" : "cursor-default",
        className
      )}
      {...props}
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* Precision Vector Construction Lines & Compass Arcs (Static)   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="kilo-blueprint-subgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E3E1D9" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>

        {/* Delicate background subgrid */}
        <rect width="100%" height="100%" fill="url(#kilo-blueprint-subgrid)" opacity="0.38" />

        {/* Central Large Technical Compass Circle */}
        <circle cx="48%" cy="43%" r="148" fill="none" stroke="#D3D0C6" strokeWidth="0.8" strokeDasharray="3 4" />
        <circle cx="48%" cy="43%" r="148" fill="none" stroke="#BBB7AA" strokeWidth="0.5" />
        <circle cx="48%" cy="43%" r="2" fill="#7A776E" />

        {/* Orthogonal Technical Axis Crosshairs */}
        <line x1="16%" y1="43%" x2="80%" y2="43%" stroke="#DFDDD5" strokeWidth="0.75" strokeDasharray="4 6" />
        <line x1="48%" y1="12%" x2="48%" y2="76%" stroke="#DFDDD5" strokeWidth="0.75" strokeDasharray="4 6" />

        {/* Isometric 30-degree Drafting Projection Rays */}
        <line x1="24%" y1="78%" x2="72%" y2="28%" stroke="#DCD9D0" strokeWidth="0.75" />
        <line x1="18%" y1="36%" x2="82%" y2="68%" stroke="#E2E0D8" strokeWidth="0.5" strokeDasharray="2 4" />

        {/* Secondary Lower-Left Reference Circle */}
        <circle cx="16%" cy="74%" r="38" fill="none" stroke="#CBC7BA" strokeWidth="0.8" />
        <circle cx="16%" cy="74%" r="1.5" fill="#7A776E" />
        <line x1="8%" y1="74%" x2="38%" y2="74%" stroke="#D6D3C8" strokeWidth="0.5" />

        {/* Top-Right Secondary Guide Circle */}
        <circle cx="78%" cy="26%" r="28" fill="none" stroke="#DFDDD5" strokeWidth="0.75" strokeDasharray="2 2" />

        {/* Registration Marks / Corner Precision Ticks */}
        <g stroke="#99958A" strokeWidth="0.8">
          <line x1="18" y1="22" x2="26" y2="22" />
          <line x1="22" y1="18" x2="22" y2="26" />

          <line x1="calc(100% - 26)" y1="22" x2="calc(100% - 18)" y2="22" />
          <line x1="calc(100% - 22)" y1="18" x2="calc(100% - 22)" y2="26" />

          <line x1="18" y1="calc(100% - 22)" x2="26" y2="calc(100% - 22)" />
          <line x1="22" y1="calc(100% - 26)" x2="22" y2="calc(100% - 18)" />

          <line x1="calc(100% - 26)" y1="calc(100% - 22)" x2="calc(100% - 18)" y2="22" />
          <line x1="calc(100% - 22)" y1="calc(100% - 26)" x2="calc(100% - 22)" y2="calc(100% - 18)" />
        </g>
      </svg>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Three.js Static Outline Canvas with Dynamic Cylinder Piston   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* Floating Precision Technical HUD Tag for Expanded Cylinder   */}
      {/* ───────────────────────────────────────────────────────────── */}
      {hoveredCyl && hudPos && (
        <div
          className="pointer-events-none absolute z-30 flex items-center gap-1.5 transition-all duration-150 animate-in fade-in"
          style={{
            left: `${hudPos.x}px`,
            top: `${hudPos.y}px`,
            transform: "translate(-50%, -100%) translateY(-14px)",
          }}
        >
          <div className="flex flex-col items-start bg-[#FAF9F5]/95 border border-[#1E1E1E]/25 shadow-md px-2.5 py-1.5 rounded text-[10px] font-mono tracking-wider backdrop-blur-xs">
            <div className="flex items-center gap-1 text-[#1A1A1A] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] animate-pulse" />
              <span>NODE [{hoveredCyl.label}] // EXPANDED</span>
            </div>
            <div className="text-[#66635A] text-[9px] pt-0.5">{hoveredCyl.dimNote}</div>
          </div>
          <div className="absolute left-1/2 bottom-[-14px] w-[1px] h-[14px] bg-[#1E1E1E]/40 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 2. BlueprintLogin Props & Component                                 */
/* ─────────────────────────────────────────────────────────────────── */

export interface BlueprintLoginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Active default tab */
  defaultTab?: "login" | "signup";
  /** Maximum expansion multiplier when a cylinder is hovered */
  expandRatio?: number;
  /** Whether neighboring cylinders gently expand in a wave */
  neighborWave?: boolean;
  /** Y-axis rotation of the mechanical model in degrees (default: -26) */
  rotationY?: number;
  /** X-axis pitch rotation of the mechanical model in degrees (default: 3) */
  rotationX?: number;
  /** Callback fired on login submit */
  onLogin?: (data: { email: string; password: string }) => Promise<void> | void;
  /** Callback fired on sign up submit */
  onSignUp?: (data: { name: string; email: string; password: string }) => Promise<void> | void;
  /** Callback fired on password reset submit */
  onForgotPassword?: (email: string) => Promise<void> | void;
}

export function BlueprintLogin({
  defaultTab = "login",
  expandRatio = 1.42,
  neighborWave = true,
  rotationY = -26,
  rotationX = 3,
  onLogin,
  onSignUp,
  onForgotPassword,
  className,
  ...props
}: BlueprintLoginProps) {
  const [tab, setTab] = React.useState<"login" | "signup">(defaultTab);
  const [isForgotView, setIsForgotView] = React.useState(false);

  // Form Fields
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [showLoginPassword, setShowLoginPassword] = React.useState(false);

  const [signupName, setSignupName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = React.useState("");
  const [showSignupPassword, setShowSignupPassword] = React.useState(false);

  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotSuccess, setForgotSuccess] = React.useState(false);

  // Feedback & Loading
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  // Clear messages on tab switch
  const handleTabSwitch = (newTab: "login" | "signup") => {
    setTab(newTab);
    setIsForgotView(false);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  /* ── Submit Login ── */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.trim() || !isValidEmail(loginEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!loginPassword) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (onLogin) {
        await onLogin({ email: loginEmail, password: loginPassword });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 850));
        setSuccessMsg("Authentication verified. Proceeding...");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Invalid credentials. Please verify and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit Sign Up ── */
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!signupName.trim()) {
      setErrorMsg("Please provide your full name.");
      return;
    }
    if (!signupEmail.trim() || !isValidEmail(signupEmail)) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (signupPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSignUp) {
        await onSignUp({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 950));
        setSuccessMsg("Account registered successfully. You may now sign in.");
        setTimeout(() => {
          setTab("login");
          setLoginEmail(signupEmail);
          setSuccessMsg(null);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Could not complete registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit Forgot Password ── */
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (onForgotPassword) {
        await onForgotPassword(forgotEmail);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setForgotSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Unable to send recovery instructions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[1020px] mx-auto rounded-3xl border border-[#E3E1DA] bg-[#F8F7F4] text-[#1E1E1E] shadow-xl overflow-hidden font-sans",
        className
      )}
      {...props}
    >
      <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px]">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* LEFT PANEL: Static Mechanical Drawing with Interactive Pistons */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-[56%] min-h-[340px] sm:min-h-[420px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#E3E1DA] bg-[#F8F7F4] flex flex-col justify-between overflow-hidden">
          {/* Three.js Canvas with static isometric mechanical drawing */}
          <div className="absolute inset-0 h-full w-full">
            <InteractiveMechanicalScene
              expandRatio={expandRatio}
              neighborWave={neighborWave}
              rotationY={rotationY}
              rotationX={rotationX}
              className="h-full w-full"
            />
          </div>

          {/* Left Panel Typography matching Reference Image */}
          <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-9 lg:p-12 pointer-events-none select-none">
            {/* Top Row: Title on Left + Keyword Index on Right */}
            <div className="flex items-start justify-between w-full">
              {/* Top-Left: A DIFFERENT PERSPECTIVE */}
              <div className="space-y-3 max-w-[240px]">
                <h2 className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#33322E] leading-[1.65] uppercase font-medium">
                  A DIFFERENT
                  <br />
                  PERSPECTIVE
                </h2>
                <div className="w-6 h-[1px] bg-[#6E6B62]" />
                <p className="text-[11px] sm:text-[12px] font-sans text-[#78756C] tracking-wide leading-relaxed pt-0.5">
                  Move through
                  <br />
                  your space.
                </p>
              </div>

              {/* Top-Right: IDEAS / PROJECTS / LEARNING / GROWTH */}
              <div className="flex items-start gap-2.5">
                <div className="text-right space-y-1 text-[9px] sm:text-[10px] font-mono tracking-[0.26em] text-[#7A776E] uppercase">
                  <div>IDEAS</div>
                  <div>PROJECTS</div>
                  <div>LEARNING</div>
                  <div>GROWTH</div>
                </div>
                <div className="w-[1px] h-12 bg-[#8C887E]/40" />
              </div>
            </div>

            {/* Bottom-Left: BUILD / LEARN / EXPLORE / AT YOUR OWN PACE */}
            <div className="space-y-2.5 max-w-[240px] pt-14 lg:pt-0">
              <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#33322E] leading-[1.7] uppercase font-medium">
                BUILD
                <br />
                LEARN
                <br />
                EXPLORE
                <br />
                AT YOUR OWN PACE
              </p>
              <div className="w-6 h-[1px] bg-[#6E6B62]" />
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* RIGHT PANEL: Static Clean Authentication Form                */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-[44%] flex flex-col justify-center bg-[#F8F7F4] p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-[380px] mx-auto space-y-6">
            {/* View Mode 1: Forgot Password View */}
            {isForgotView ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotView(false);
                      setForgotSuccess(false);
                      setErrorMsg(null);
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#66635A] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to login</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <h3 className="text-xl font-medium tracking-tight text-[#1A1A1A]">Reset Password</h3>
                  <p className="text-xs text-[#737066] leading-relaxed">
                    Enter the email address tied to your account and we&apos;ll send recovery instructions.
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="p-4 rounded-xl bg-[#EFECE3] border border-[#DDD9CD] text-xs text-[#33322D] space-y-2">
                    <div className="flex items-center gap-2 font-medium text-[#1E1E1E]">
                      <Check className="h-4 w-4 text-[#1E1E1E]" />
                      <span>Instructions Dispatched</span>
                    </div>
                    <p className="text-[#66635A] leading-relaxed text-[11px]">
                      If an account exists for <span className="font-mono text-[#1E1E1E]">{forgotEmail}</span>, a secure recovery link is on its way.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
                    {errorMsg && (
                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label htmlFor="blueprint-forgot-email" className="block text-[11px] font-sans font-medium tracking-wider text-[#55524A] uppercase">
                        Email Address
                      </label>
                      <input
                        id="blueprint-forgot-email"
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#DDD9CD] text-sm text-[#1A1A1A] placeholder-[#A09D94] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 mt-2 rounded-xl text-xs font-medium tracking-wide text-white bg-[#222222] hover:bg-[#111111] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Recovery Link</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* View Mode 2: Login & Sign Up Forms */
              <div className="space-y-6">
                {/* ── Tabs: Login | Sign Up (Matching reference image underline) ── */}
                <div role="tablist" className="flex items-center gap-8 border-b border-[#E3E1DA] pb-2 relative">
                  <button
                    type="button"
                    role="tab"
                    id="tab-bp-login"
                    aria-selected={tab === "login"}
                    aria-controls="panel-bp-login"
                    onClick={() => handleTabSwitch("login")}
                    className={cn(
                      "text-base tracking-tight transition-colors relative pb-2.5 cursor-pointer font-medium",
                      tab === "login" ? "text-[#1A1A1A]" : "text-[#88857C] hover:text-[#33322E]"
                    )}
                  >
                    Login
                    {tab === "login" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#1E1E1E] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    role="tab"
                    id="tab-bp-signup"
                    aria-selected={tab === "signup"}
                    aria-controls="panel-bp-signup"
                    onClick={() => handleTabSwitch("signup")}
                    className={cn(
                      "text-base tracking-tight transition-colors relative pb-2.5 cursor-pointer font-medium",
                      tab === "signup" ? "text-[#1A1A1A]" : "text-[#88857C] hover:text-[#33322E]"
                    )}
                  >
                    Sign Up
                    {tab === "signup" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#1E1E1E] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Inline Error / Success Messages */}
                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* ── Form Body: Login Form ── */}
                {tab === "login" ? (
                  <form
                    id="panel-bp-login"
                    role="tabpanel"
                    aria-labelledby="tab-bp-login"
                    onSubmit={handleLoginSubmit}
                    className="space-y-4 pt-1"
                  >
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="bp-login-email"
                        className="block text-xs font-sans font-medium text-[#44423B]"
                      >
                        Email
                      </label>
                      <input
                        id="bp-login-email"
                        type="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all font-sans"
                      />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="bp-login-password"
                        className="block text-xs font-sans font-medium text-[#44423B]"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="bp-login-password"
                          type={showLoginPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-3 text-[#88857C] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right-aligned Forgot Password Link */}
                    <div className="flex justify-end pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotView(true);
                          setErrorMsg(null);
                          setSuccessMsg(null);
                        }}
                        className="text-xs font-sans text-[#737066] hover:text-[#1E1E1E] hover:underline transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 mt-3 rounded-xl text-sm font-medium tracking-wide text-white bg-[#222222] hover:bg-[#111111] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Login</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ── Form Body: Sign Up Form ── */
                  <form
                    id="panel-bp-signup"
                    role="tabpanel"
                    aria-labelledby="tab-bp-signup"
                    onSubmit={handleSignUpSubmit}
                    className="space-y-3.5 pt-1"
                  >
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="bp-signup-name" className="block text-xs font-sans font-medium text-[#44423B]">
                        Full Name
                      </label>
                      <input
                        id="bp-signup-name"
                        type="text"
                        autoComplete="name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Alex Morgan"
                        required
                        className="w-full h-10.5 px-3.5 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label htmlFor="bp-signup-email" className="block text-xs font-sans font-medium text-[#44423B]">
                        Email
                      </label>
                      <input
                        id="bp-signup-email"
                        type="email"
                        autoComplete="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full h-10.5 px-3.5 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label htmlFor="bp-signup-password" className="block text-xs font-sans font-medium text-[#44423B]">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="bp-signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          required
                          className="w-full h-10.5 pl-3.5 pr-10 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          aria-label={showSignupPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-2.5 text-[#88857C] hover:text-[#1E1E1E] transition-colors cursor-pointer"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label htmlFor="bp-signup-confirm" className="block text-xs font-sans font-medium text-[#44423B]">
                        Confirm Password
                      </label>
                      <input
                        id="bp-signup-confirm"
                        type="password"
                        autoComplete="new-password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        required
                        className="w-full h-10.5 px-3.5 rounded-xl bg-white border border-[#DFDDD6] text-sm text-[#1A1A1A] placeholder-[#A3A096] focus:outline-none focus:border-[#1E1E1E] focus:ring-1 focus:ring-[#1E1E1E]/20 transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 mt-2.5 rounded-xl text-sm font-medium tracking-wide text-white bg-[#222222] hover:bg-[#111111] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

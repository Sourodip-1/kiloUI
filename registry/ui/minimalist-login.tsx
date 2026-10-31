"use client";

import * as React from "react";
import { ArrowRight, ArrowLeft, Loader2, Sparkles, Check, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalistLoginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Visual variant: sharp edges (0px radius) or rounded corners (customizable radius) */
  variant?: "sharp-edges" | "rounded-corners";
  /** Border radius in pixels (active for rounded-corners variant) */
  borderRadius?: number;
  /** Whether the 3D particle sphere continuously rotates */
  sphereMotion?: boolean;
  /** Speed multiplier for sphere rotation (0.5 to 3) */
  rotationSpeed?: number;
  /** Whether sphere dots react to cursor hover with bulge */
  interactiveDots?: boolean;
  /** Top technical portal tag */
  portalTitle?: string;
  /** Bottom sub-branding label */
  portalSubtitle?: string;
  /** Welcome tagline on right card */
  welcomeTitle?: string;
  /** Main form title */
  title?: string;
  /** Email field label */
  emailLabel?: string;
  /** Password field label */
  passwordLabel?: string;
  /** Primary submit button label */
  submitLabel?: string;
  /** Forgot password link text */
  forgotPasswordLabel?: string;
  /** Create account link text */
  createAccountLabel?: string;
  /** Callback fired on login form submission */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Callback fired on sign-up form submission */
  onSignUp?: (data: { name: string; email: string; password: string }) => void;
  /** Callback when forgot password link is clicked */
  onForgotPassword?: () => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  latIdx: number;
  lonIdx: number;
  isOrbit?: boolean;
}

/* ─────────────────────────────────────────────────────────────────── */
/* MinimalistLogin                                                      */
/* ─────────────────────────────────────────────────────────────────── */
export function MinimalistLogin({
  variant = "sharp-edges",
  borderRadius = 20,
  sphereMotion = true,
  rotationSpeed = 1,
  interactiveDots = true,
  portalTitle = "// ACCESS PORTAL",
  portalSubtitle = "SPATIAL LOGIN",
  welcomeTitle = "WELCOME BACK",
  title = "Sign in",
  emailLabel = "EMAIL",
  passwordLabel = "PASSWORD",
  submitLabel = "Sign in",
  forgotPasswordLabel = "Forgot password?",
  createAccountLabel = "Create account",
  onSubmit,
  onSignUp,
  onForgotPassword,
  className,
  ...props
}: MinimalistLoginProps) {
  const isRounded = variant === "rounded-corners";
  const activeRadius = isRounded ? Math.max(0, borderRadius) : 0;

  /* ── Form states ── */
  const [formMode, setFormMode] = React.useState<"login" | "signup">("login");
  const [transitionState, setTransitionState] = React.useState<"idle" | "exit" | "enter">("idle");

  // Login fields
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Sign-up fields
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [signUpConfirm, setSignUpConfirm] = React.useState("");
  const [showSignUpPassword, setShowSignUpPassword] = React.useState(false);
  const [showSignUpConfirm, setShowSignUpConfirm] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(null);

  /* ── Canvas / sphere refs ── */
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({
    x: -9999,
    y: -9999,
    isOver: false,
  });
  const pulseAnimRef = React.useRef<number>(0);

  /* ── Generate 3D sphere vertices ── */
  const sphereData = React.useMemo(() => {
    const points: Point3D[] = [];
    const numLat = 16;
    const numLon = 28;

    for (let i = 1; i < numLat; i++) {
      const phi = (i / numLat) * Math.PI;
      const y = -Math.cos(phi);
      const ringR = Math.sin(phi);
      for (let j = 0; j < numLon; j++) {
        const theta = (j / numLon) * Math.PI * 2;
        const x = ringR * Math.cos(theta);
        const z = ringR * Math.sin(theta);
        points.push({ x, y, z, latIdx: i, lonIdx: j, isOrbit: false });
      }
    }

    // Poles
    points.push({ x: 0, y: -1, z: 0, latIdx: 0, lonIdx: 0, isOrbit: false });
    points.push({ x: 0, y: 1, z: 0, latIdx: numLat, lonIdx: 0, isOrbit: false });

    // Tilted orbital ring
    const orbitPoints = 46;
    const orbitFactor = 1.25;
    const tiltAngle = (28 * Math.PI) / 180;
    for (let k = 0; k < orbitPoints; k++) {
      const theta = (k / orbitPoints) * Math.PI * 2;
      const ox = orbitFactor * Math.cos(theta);
      const oz = orbitFactor * Math.sin(theta);
      const oy = oz * Math.sin(tiltAngle);
      const ozTilted = oz * Math.cos(tiltAngle);
      points.push({ x: ox, y: oy, z: ozTilted, latIdx: -1, lonIdx: k, isOrbit: true });
    }

    return { points, numLat, numLon };
  }, []);

  /* ── Animation + interaction loop ── */
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angleY = 0.4;
    let angleX = 0.22;
    let targetAngleX = 0.22;
    let targetAngleY = 0.4;

    const render = () => {
      pulseAnimRef.current += 0.04;

      const width = canvas.clientWidth || 320;
      const height = canvas.clientHeight || 440;
      const dpr = window.devicePixelRatio || 1;
      if (
        canvas.width !== Math.round(width * dpr) ||
        canvas.height !== Math.round(height * dpr)
      ) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const baseR = Math.min(width * 0.58, height * 0.46);
      const sphereRadius = Math.max(70, Math.min(baseR, 215));
      const cx = width * 0.24;
      const cy = height * 0.49;

      if (sphereMotion) {
        targetAngleY += 0.0055 * rotationSpeed;
      }

      angleY += (targetAngleY - angleY) * 0.08;
      angleX += (targetAngleX - angleX) * 0.08;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cameraDist = sphereRadius * 2.5;

      /* ── Project 3D → 2D with BULGE effect ── */
      const projected = sphereData.points.map((p) => {
        const pxScaled = p.x * sphereRadius;
        const pyScaled = p.y * sphereRadius;
        const pzScaled = p.z * sphereRadius;

        // Y-axis rotation
        const x1 = pxScaled * cosY + pzScaled * sinY;
        const z1 = -pxScaled * sinY + pzScaled * cosY;
        // X-axis rotation
        const y2 = pyScaled * cosX - z1 * sinX;
        const z2 = pyScaled * sinX + z1 * cosX;

        const scale = cameraDist / (cameraDist + z2);
        let px = cx + x1 * scale;
        let py = cy + y2 * scale;

        let bulgeAmount = 0;
        let distToCursor = 9999;

        if (interactiveDots && mouseRef.current.isOver) {
          const dx = px - mouseRef.current.x;
          const dy = py - mouseRef.current.y;
          distToCursor = Math.sqrt(dx * dx + dy * dy);

          // Bulge zone: dots within 70px push outward along normal
          if (distToCursor < 70 && z2 > -60) {
            const influence = 1 - distToCursor / 70;
            // Smooth cubic falloff
            const eased = influence * influence * (3 - 2 * influence);
            // Outward bulge (normalize the surface normal of the sphere)
            const nx = p.x; // already on unit sphere
            const ny = p.y;
            const nz = p.z;
            // Project the normal into screen space direction
            const nx2d = nx * cosY + nz * sinY;
            const ny2d = ny * cosX - (-nx * sinY + nz * cosY) * sinX;
            const nLen = Math.sqrt(nx2d * nx2d + ny2d * ny2d) || 1;
            const bulgePx = 14 * eased;
            bulgeAmount = bulgePx;
            px += (nx2d / nLen) * bulgePx;
            py += (ny2d / nLen) * bulgePx;
          }
        }

        return { px, py, scale, z: z2, isOrbit: p.isOrbit, latIdx: p.latIdx, lonIdx: p.lonIdx, distToCursor, bulgeAmount };
      });

      /* ── Closest node for accent highlight ── */
      let closestNodeIdx = -1;
      let minCursorDist = 65;
      if (interactiveDots && mouseRef.current.isOver) {
        projected.forEach((p, idx) => {
          if (p.z > -20 && p.distToCursor < minCursorDist) {
            minCursorDist = p.distToCursor;
            closestNodeIdx = idx;
          }
        });
      }

      const isDark =
        document.documentElement.classList.contains("dark") ||
        window.getComputedStyle(canvas).color === "rgb(255, 255, 255)";
      const wireStrokeBase = isDark ? "rgba(255, 255, 255," : "rgba(0, 0, 0,";
      const dotFillBase = isDark ? "rgba(255, 255, 255," : "rgba(10, 10, 10,";

      /* ── Floor shadow ── */
      ctx.save();
      const shadowY = cy + sphereRadius * 0.96;
      const shadowGrad = ctx.createRadialGradient(
        cx + sphereRadius * 0.2,
        shadowY,
        4,
        cx + sphereRadius * 0.2,
        shadowY,
        sphereRadius * 0.55
      );
      shadowGrad.addColorStop(0, isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.12)");
      shadowGrad.addColorStop(0.6, isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.04)");
      shadowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx + sphereRadius * 0.2, shadowY, sphereRadius * 0.55, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* ── Latitude wireframe rings ── */
      for (let lat = 1; lat < sphereData.numLat; lat++) {
        ctx.beginPath();
        let started = false;
        for (let lon = 0; lon <= sphereData.numLon; lon++) {
          const lonWrapped = lon % sphereData.numLon;
          const pt = projected.find((p) => p.latIdx === lat && p.lonIdx === lonWrapped);
          if (!pt) continue;
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.strokeStyle = `${wireStrokeBase} 0.07)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      /* ── Longitude arcs ── */
      for (let lon = 0; lon < sphereData.numLon; lon += 2) {
        ctx.beginPath();
        let started = false;
        for (let lat = 1; lat < sphereData.numLat; lat++) {
          const pt = projected.find((p) => p.latIdx === lat && p.lonIdx === lon);
          if (!pt) continue;
          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.strokeStyle = `${wireStrokeBase} 0.06)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      /* ── Tilted orbital ring (dashed) ── */
      ctx.beginPath();
      let orbitStarted = false;
      const orbitNodes = projected.filter((p) => p.isOrbit);
      orbitNodes.forEach((pt) => {
        if (!orbitStarted) { ctx.moveTo(pt.px, pt.py); orbitStarted = true; }
        else ctx.lineTo(pt.px, pt.py);
      });
      if (orbitNodes.length > 0) ctx.lineTo(orbitNodes[0].px, orbitNodes[0].py);
      ctx.setLineDash([2.5, 3.5]);
      ctx.strokeStyle = `${wireStrokeBase} 0.22)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      /* ── Dots with BULGE size ── */
      projected.forEach((p, idx) => {
        if (p.isOrbit) return;
        const depthAlpha = Math.max(0.12, Math.min(0.9, (p.z + 120) / 240));
        const isHovered = idx === closestNodeIdx;

        // Base dot size + bulge enlargement
        let radius = Math.max(0.7, p.scale * 1.7);
        if (p.bulgeAmount > 0) {
          // Scale up the dot proportionally to bulge
          radius = radius + p.bulgeAmount * 0.18;
        }
        if (isHovered) radius = Math.max(radius, 3.6);

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);

        if (isHovered) {
          // Clean subtle white highlight on hovered dot (no green, no radar rings)
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.95)";
        } else if (p.bulgeAmount > 0) {
          // Slightly brighter/larger bulge dots
          const ba = Math.min(1, depthAlpha + p.bulgeAmount * 0.025);
          ctx.fillStyle = `${dotFillBase} ${ba})`;
        } else {
          ctx.fillStyle = `${dotFillBase} ${depthAlpha})`;
        }
        ctx.fill();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [sphereData, sphereMotion, rotationSpeed, interactiveDots]);

  /* ── Canvas mouse handlers ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const layoutW = canvas.clientWidth || 1;
    const layoutH = canvas.clientHeight || 1;
    const scaleX = layoutW / (rect.width || 1);
    const scaleY = layoutH / (rect.height || 1);
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      isOver: true,
    };
  };
  const handleMouseEnter = () => { mouseRef.current.isOver = true; };
  const handleMouseLeave = () => { mouseRef.current.isOver = false; };

  /* ── Form transitions ── */
  const switchToSignUp = () => {
    setTransitionState("exit");
    setSubmittedMessage(null);
    setTimeout(() => {
      setFormMode("signup");
      setTransitionState("enter");
      setTimeout(() => setTransitionState("idle"), 350);
    }, 280);
  };

  const switchToLogin = () => {
    setTransitionState("exit");
    setSubmittedMessage(null);
    setTimeout(() => {
      setFormMode("login");
      setTransitionState("enter");
      setTimeout(() => setTransitionState("idle"), 350);
    }, 280);
  };

  /* ── Submit handlers ── */
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmittedMessage(null);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage("Authenticated session initialized.");
      onSubmit?.({ email, password });
    }, 800);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (signUpPassword !== signUpConfirm) {
      setSubmittedMessage("⚠ Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setSubmittedMessage(null);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage("Account created successfully!");
      onSignUp?.({ name: signUpName, email: signUpEmail, password: signUpPassword });
    }, 900);
  };

  /* ── Transition style helpers ── */
  const transitionStyle: React.CSSProperties = {
    transition: "opacity 0.28s ease, transform 0.28s ease",
    opacity: transitionState === "exit" ? 0 : 1,
    transform:
      transitionState === "exit"
        ? formMode === "login"
          ? "translateX(-24px)"
          : "translateX(24px)"
        : transitionState === "enter"
        ? `translateX(${formMode === "signup" ? "-12px" : "12px"})`
        : "translateX(0)",
  };

  return (
    <div
      className={cn(
        "kilo-ml-card w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-2 sm:p-4 select-none",
        className
      )}
      {...props}
    >
      {/* ============================================================ */}
      {/* 1. LEFT CARD: 3D SPATIAL SPHERE ACCESS PORTAL                */}
      {/* ============================================================ */}
      <div
        style={{ borderRadius: `${activeRadius}px` }}
        className={cn(
          "relative flex flex-col justify-between aspect-[3/4] min-h-[440px] p-5 sm:p-6 overflow-hidden transition-all duration-300",
          "border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm",
          "hover:border-[var(--border-hover)]"
        )}
      >
        {/* Corner reticles */}
        <span className="absolute top-3.5 left-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none" aria-hidden="true">┌</span>
        <span className="absolute bottom-3.5 left-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none" aria-hidden="true">└</span>
        <span className="absolute bottom-3.5 right-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none" aria-hidden="true">┘</span>

        {/* Full-bleed 3D Sphere Canvas — cursor-default, no pointer */}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute inset-0 w-full h-full cursor-default block z-0"
          style={{ pointerEvents: "auto" }}
        />

        {/* Top Bar */}
        <div className="relative z-10 pointer-events-none flex items-start justify-between w-full">
          <div className="flex items-center gap-2 pl-3 pt-0.5">
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-secondary)] font-medium uppercase">{portalTitle}</span>
          </div>
          <div className="flex items-center gap-3 pr-2">
            <span className="font-mono text-xs text-[var(--text-muted)] font-light">+</span>
            <div className="grid grid-cols-5 gap-1 opacity-40">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="h-0.5 w-0.5 rounded-full bg-[var(--text-secondary)]" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 pointer-events-none" />

        {/* Bottom Bar */}
        <div className="relative z-10 pointer-events-none flex items-end justify-between w-full">
          <div className="flex items-center gap-2.5 pl-3 pb-0.5">
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-pulse" />
              <span className="w-0.5 h-3.5 bg-[var(--text-primary)] rounded-full" />
              <span className="w-0.5 h-2.5 bg-[var(--text-secondary)] rounded-full animate-pulse" />
              <span className="w-0.5 h-4 bg-[var(--text-primary)] rounded-full" />
              <span className="w-0.5 h-1 bg-[var(--text-secondary)] rounded-full" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[var(--text-secondary)] font-semibold uppercase">{portalSubtitle}</span>
          </div>
          <div className="flex items-center gap-2.5 pr-2 pb-0.5">
            <span className="font-mono text-xs text-[var(--text-muted)] font-light">+</span>
            <div className="grid grid-cols-5 gap-1 opacity-40">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="h-0.5 w-0.5 rounded-full bg-[var(--text-secondary)]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. RIGHT CARD: LOGIN / SIGN-UP FORM (animated transition)    */}
      {/* ============================================================ */}
      <div
        style={{ borderRadius: `${activeRadius}px` }}
        className={cn(
          "relative flex flex-col justify-between aspect-[3/4] min-h-[440px] overflow-hidden transition-all duration-300",
          "border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm",
          "hover:border-[var(--border-hover)]"
        )}
      >
        {/* Animated form wrapper */}
        <div className="flex flex-col justify-between h-full p-6 sm:p-9" style={transitionStyle}>

          {/* ─── LOGIN FORM ─── */}
          {formMode === "login" && (
            <form onSubmit={handleLoginSubmit} className="flex flex-col justify-between h-full">
              {/* Header */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] tracking-[0.25em] font-medium text-[var(--text-muted)] uppercase">{welcomeTitle}</div>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[var(--text-primary)]">{title}</h2>
              </div>

              {/* Fields */}
              <div className="space-y-4 my-auto py-4">
                {/* Email Field */}
                <div className="space-y-1.5 group">
                  <label htmlFor="ml-email" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">
                    {emailLabel}
                  </label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-11 px-3.5 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <Mail className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="ml-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-transparent border-0 p-0 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 group">
                  <label htmlFor="ml-password" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">
                    {passwordLabel}
                  </label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-11 px-3.5 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <Lock className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="ml-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent border-0 p-0 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ borderRadius: isRounded ? `${Math.max(4, activeRadius * 0.4)}px` : "0px" }}
                    className={cn(
                      "w-full h-11 flex items-center justify-center font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer",
                      "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99]",
                      "disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /><span>Verifying...</span></span>
                    ) : (
                      <span>{submitLabel}</span>
                    )}
                  </button>
                  <div className="flex items-center justify-start">
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      {forgotPasswordLabel}
                    </button>
                  </div>
                </div>

                {submittedMessage && (
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-green)] flex items-center gap-2 animate-in fade-in">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span>{submittedMessage}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[var(--border)]/60">
                <button
                  type="button"
                  onClick={switchToSignUp}
                  className="group/create inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-[var(--text-primary)] hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span>{createAccountLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/create:translate-x-1" />
                </button>
              </div>
            </form>
          )}

          {/* ─── SIGN-UP FORM ─── */}
          {formMode === "signup" && (
            <form onSubmit={handleSignUpSubmit} className="flex flex-col justify-between h-full">
              {/* Header */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] tracking-[0.25em] font-medium text-[var(--text-muted)] uppercase">NEW IDENTITY</div>
                <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[var(--text-primary)]">Sign up</h2>
              </div>

              {/* Fields */}
              <div className="space-y-3.5 my-auto py-2">
                {/* Name */}
                <div className="space-y-1 group">
                  <label htmlFor="su-name" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">FULL NAME</label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-10 px-3 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <User className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="su-name"
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1 group">
                  <label htmlFor="su-email" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">EMAIL</label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-10 px-3 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <Mail className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="su-email"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1 group">
                  <label htmlFor="su-password" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">PASSWORD</label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-10 px-3 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <Lock className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="su-password"
                      type={showSignUpPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      tabIndex={-1}
                      aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0"
                    >
                      {showSignUpPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1 group">
                  <label htmlFor="su-confirm" className="block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase">CONFIRM PASSWORD</label>
                  <div
                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : "0px" }}
                    className={cn(
                      "relative flex items-center h-10 px-3 transition-all duration-200",
                      "bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80",
                      "border transition-colors",
                      signUpConfirm && signUpPassword !== signUpConfirm
                        ? "border-red-400 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400/20"
                        : "border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20"
                    )}
                  >
                    <Lock className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5" />
                    <input
                      id="su-confirm"
                      type={showSignUpConfirm ? "text" : "password"}
                      required
                      value={signUpConfirm}
                      onChange={(e) => setSignUpConfirm(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpConfirm(!showSignUpConfirm)}
                      tabIndex={-1}
                      aria-label={showSignUpConfirm ? "Hide password" : "Show password"}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0"
                    >
                      {showSignUpConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ borderRadius: isRounded ? `${Math.max(4, activeRadius * 0.4)}px` : "0px" }}
                    className={cn(
                      "w-full h-11 flex items-center justify-center font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer",
                      "bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99]",
                      "disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /><span>Creating...</span></span>
                    ) : submittedMessage?.startsWith("Account") ? (
                      <span className="flex items-center gap-2"><Check className="h-4 w-4" /><span>Done!</span></span>
                    ) : (
                      <span>Create account</span>
                    )}
                  </button>
                </div>

                {submittedMessage && (
                  <div className={cn(
                    "p-2.5 rounded border text-xs font-mono flex items-center gap-2 animate-in fade-in",
                    submittedMessage.startsWith("⚠")
                      ? "bg-red-500/10 border-red-400/30 text-red-400"
                      : "bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--accent-green)]"
                  )}>
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span>{submittedMessage}</span>
                  </div>
                )}
              </div>

              {/* Footer — back to login */}
              <div className="pt-4 border-t border-[var(--border)]/60">
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="group/back inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-1" />
                  <span>Back to sign in</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .kilo-ml-card input:-webkit-autofill,
            .kilo-ml-card input:-webkit-autofill:hover,
            .kilo-ml-card input:-webkit-autofill:focus,
            .kilo-ml-card input:-webkit-autofill:active {
              -webkit-box-shadow: 0 0 0 1000px #18191c inset !important;
              -webkit-text-fill-color: #f2f2f0 !important;
              caret-color: #f2f2f0 !important;
              transition: background-color 5000s ease-in-out 0s;
            }
          `,
        }}
      />
    </div>
  );
}

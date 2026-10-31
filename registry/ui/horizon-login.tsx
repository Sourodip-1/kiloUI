"use client";

import * as React from "react";
import { Eye, EyeOff, Loader2, Check, ArrowRight, ArrowLeft, Mail, Lock, User, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────── */
/* Keyframe CSS & Styles for Horizon Light Layers                       */
/* ─────────────────────────────────────────────────────────────────── */
const HORIZON_KEYFRAME_CSS = `
  @keyframes horizon-breathe-1 {
    0%, 100% {
      transform: translateY(0px) scaleY(1);
      opacity: 0.72;
    }
    50% {
      transform: translateY(-8px) scaleY(1.12);
      opacity: 0.94;
    }
  }

  @keyframes horizon-breathe-2 {
    0%, 100% {
      transform: translateY(0px) scaleX(1);
      opacity: 0.85;
    }
    50% {
      transform: translateY(6px) scaleX(1.08);
      opacity: 0.65;
    }
  }

  @keyframes horizon-breathe-3 {
    0%, 100% {
      transform: translateY(0px) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-5px) scale(1.05);
      opacity: 0.82;
    }
  }

  @keyframes horizon-shimmer-edge {
    0%, 100% {
      opacity: 0.75;
      transform: scaleX(1);
    }
    50% {
      opacity: 0.98;
      transform: scaleX(1.04);
    }
  }

  @keyframes horizon-ambient-pulse {
    0%, 100% {
      opacity: 0.55;
      transform: scale(1);
    }
    50% {
      opacity: 0.78;
      transform: scale(1.06);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .horizon-anim-1,
    .horizon-anim-2,
    .horizon-anim-3,
    .horizon-shimmer,
    .horizon-ambient {
      animation: none !important;
      transform: none !important;
    }
  }
`;

export interface AnimatedHorizonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animation speed multiplier (0.5 to 2.5) */
  speed?: number;
  /** Overall illumination and brightness scale (0.5 to 2.0) */
  glowIntensity?: number;
  /** Whether to render the subtle monochromatic film grain overlay */
  grain?: boolean;
  children?: React.ReactNode;
}

/**
 * AnimatedHorizon:
 * Independent multi-layered atmospheric purple horizon with soft blurred light swathes,
 * narrow luminous filaments, and procedural film grain texture.
 */
export function AnimatedHorizon({
  speed = 1,
  glowIntensity = 1,
  grain = true,
  className,
  children,
  ...props
}: AnimatedHorizonProps) {
  const dur1 = `${13 / speed}s`;
  const dur2 = `${18 / speed}s`;
  const dur3 = `${11 / speed}s`;
  const durEdge = `${8 / speed}s`;
  const durAmbient = `${20 / speed}s`;

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full h-full bg-[#06020c] select-none",
        className
      )}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: HORIZON_KEYFRAME_CSS }} />

      {/* ── Layer A: Deep Atmospheric Violet Glow ── */}
      <div
        className="horizon-ambient absolute inset-0 pointer-events-none transition-opacity duration-1000 will-change-transform"
        style={{
          animation: `horizon-ambient-pulse ${durAmbient} ease-in-out infinite`,
          opacity: 0.7 * glowIntensity,
          background:
            "radial-gradient(ellipse 130% 80% at 50% 64%, rgba(109, 40, 217, 0.38) 0%, rgba(76, 29, 149, 0.22) 42%, rgba(20, 7, 38, 0.8) 72%, #06020c 100%)",
        }}
      />

      {/* ── Layer B: Soft Horizon Bands (Multi-Layered Volumetric Glow) ── */}

      {/* Upper Atmospheric Mist */}
      <div
        className="horizon-anim-3 absolute left-[-15%] right-[-15%] top-[42%] h-[110px] pointer-events-none rounded-[100%] blur-[45px] will-change-transform"
        style={{
          animation: `horizon-breathe-3 ${dur3} ease-in-out infinite`,
          opacity: 0.55 * glowIntensity,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(139, 92, 246, 0.18) 30%, rgba(192, 132, 252, 0.32) 50%, rgba(139, 92, 246, 0.18) 70%, transparent 95%)",
        }}
      />

      {/* Deep Base Horizon Swathe */}
      <div
        className="horizon-anim-1 absolute left-[-20%] right-[-20%] top-[52%] h-[150px] pointer-events-none rounded-[100%] blur-[36px] will-change-transform"
        style={{
          animation: `horizon-breathe-1 ${dur1} ease-in-out infinite`,
          opacity: 0.82 * glowIntensity,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168, 85, 247, 0.48) 0%, rgba(126, 34, 206, 0.32) 40%, rgba(88, 28, 135, 0.12) 75%, transparent 100%)",
        }}
      />

      {/* Core Luminous Band */}
      <div
        className="horizon-anim-2 absolute left-[-10%] right-[-10%] top-[57%] h-[68px] pointer-events-none rounded-[100%] blur-[22px] will-change-transform"
        style={{
          animation: `horizon-breathe-2 ${dur2} ease-in-out infinite`,
          opacity: 0.9 * glowIntensity,
          background:
            "linear-gradient(90deg, transparent 8%, rgba(147, 51, 234, 0.45) 25%, rgba(216, 180, 254, 0.75) 50%, rgba(147, 51, 234, 0.45) 75%, transparent 92%)",
        }}
      />

      {/* Lower Abyssal Horizon Falloff */}
      <div
        className="horizon-anim-3 absolute left-[-15%] right-[-15%] top-[65%] h-[90px] pointer-events-none rounded-[100%] blur-[32px] will-change-transform"
        style={{
          animation: `horizon-breathe-3 ${dur3} ease-in-out infinite reverse`,
          opacity: 0.65 * glowIntensity,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192, 38, 211, 0.32) 0%, rgba(126, 34, 206, 0.18) 50%, transparent 100%)",
        }}
      />

      {/* ── Layer C: Luminous Horizon Edges (Razor Filaments) ── */}
      {/* Primary Luminous Core Filament */}
      <div
        className="horizon-shimmer absolute left-0 right-0 top-[59%] h-[1.5px] pointer-events-none will-change-transform"
        style={{
          animation: `horizon-shimmer-edge ${durEdge} ease-in-out infinite`,
          opacity: 0.85 * glowIntensity,
          background:
            "linear-gradient(90deg, transparent 4%, rgba(168, 85, 247, 0.35) 20%, rgba(245, 208, 254, 0.95) 50%, rgba(168, 85, 247, 0.35) 80%, transparent 96%)",
          boxShadow:
            "0 0 12px 1.5px rgba(216, 180, 254, 0.65), 0 0 28px 4px rgba(168, 85, 247, 0.4)",
        }}
      />

      {/* Secondary Soft Magenta Horizon Echo */}
      <div
        className="horizon-shimmer absolute left-[-5%] right-[-5%] top-[62%] h-[1px] pointer-events-none will-change-transform"
        style={{
          animation: `horizon-shimmer-edge ${durEdge} ease-in-out infinite reverse`,
          opacity: 0.55 * glowIntensity,
          background:
            "linear-gradient(90deg, transparent 15%, rgba(217, 70, 239, 0.4) 35%, rgba(240, 171, 252, 0.8) 50%, rgba(217, 70, 239, 0.4) 65%, transparent 85%)",
          boxShadow: "0 0 10px 1px rgba(217, 70, 239, 0.45)",
        }}
      />

      {/* ── Layer D: Subtle Monochromatic Film Grain Texture ── */}
      {grain && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.055] mix-blend-overlay"
        >
          <filter id="kilo-horizon-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#kilo-horizon-grain)" />
        </svg>
      )}

      {/* ── Static Foreground Content (Quotes / Badges) ── */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* HorizonLogin Props                                                  */
/* ─────────────────────────────────────────────────────────────────── */
export interface HorizonLoginProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** Active default tab view */
  defaultTab?: "login" | "signup";
  /** Animation speed multiplier for the horizon */
  horizonSpeed?: number;
  /** Light intensity scale of the horizon glow */
  glowIntensity?: number;
  /** Enable or disable film grain overlay */
  grain?: boolean;
  /** Callback fired on login submit */
  onLogin?: (data: { email: string; password: string }) => Promise<void> | void;
  /** Callback fired on sign up submit */
  onSignUp?: (data: { name: string; email: string; password: string }) => Promise<void> | void;
  /** Callback fired on forgot password submit */
  onForgotPassword?: (email: string) => Promise<void> | void;
}

/* ─────────────────────────────────────────────────────────────────── */
/* HorizonLogin Component                                              */
/* ─────────────────────────────────────────────────────────────────── */
export function HorizonLogin({
  defaultTab = "login",
  horizonSpeed = 1,
  glowIntensity = 1,
  grain = true,
  onLogin,
  onSignUp,
  onForgotPassword,
  className,
  ...props
}: HorizonLoginProps) {
  const [tab, setTab] = React.useState<"login" | "signup">(defaultTab);
  const [isForgotView, setIsForgotView] = React.useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [showLoginPassword, setShowLoginPassword] = React.useState(false);

  // Signup form state
  const [signupName, setSignupName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = React.useState("");
  const [showSignupPassword, setShowSignupPassword] = React.useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = React.useState(false);

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = React.useState("");
  const [forgotSuccess, setForgotSuccess] = React.useState(false);

  // Submission & Validation feedback
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

  // Simple email validator
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  /* ── Submit Login ── */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginEmail.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    if (!isValidEmail(loginEmail)) {
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
        // High fidelity simulated response
        await new Promise((resolve) => setTimeout(resolve, 900));
        setSuccessMsg("Welcome back. Authentication successful.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Invalid credentials. Please try again.");
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
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!signupEmail.trim() || !isValidEmail(signupEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (signupPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccessMsg("Account created successfully. You may now log in.");
        setTimeout(() => {
          setTab("login");
          setLoginEmail(signupEmail);
          setSuccessMsg(null);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Submit Forgot Password ── */
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) {
      setErrorMsg("Please enter a valid email address to receive instructions.");
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
      setErrorMsg(err?.message || "Unable to send reset instructions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[1020px] mx-auto rounded-3xl border border-purple-500/15 bg-[#090611] text-zinc-200 shadow-2xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px]">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* LEFT PANEL: Animated Horizon (~55% width on desktop)         */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-[55%] min-h-[260px] sm:min-h-[320px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-purple-500/15">
          <AnimatedHorizon
            speed={horizonSpeed}
            glowIntensity={glowIntensity}
            grain={grain}
            className="absolute inset-0 h-full w-full"
          >
            {/* Left Panel Text Typography matching reference */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-9 lg:p-12 pointer-events-none select-none">
              {/* Top-left: A QUIETER SPACE FOR BRIGHTER IDEAS */}
              <div className="space-y-2.5 max-w-[260px]">
                <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#a798c4]/85 leading-[1.65] uppercase">
                  A QUIETER
                  <br />
                  SPACE FOR
                  <br />
                  BRIGHTER IDEAS
                </p>
                <div className="w-5 h-[1px] bg-purple-400/40" />
              </div>

              {/* Bottom-left: BUILD LEARN EXPLORE AT YOUR OWN PACE */}
              <div className="space-y-2.5 max-w-[260px] pt-12 lg:pt-0">
                <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#a798c4]/85 leading-[1.65] uppercase">
                  BUILD
                  <br />
                  LEARN
                  <br />
                  EXPLORE
                  <br />
                  AT YOUR OWN PACE
                </p>
                <div className="w-5 h-[1px] bg-purple-400/40" />
              </div>
            </div>
          </AnimatedHorizon>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* RIGHT PANEL: Authentication Form (~45% width on desktop)     */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full lg:w-[45%] flex flex-col justify-center bg-[#090712] p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-[390px] mx-auto space-y-6">
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
                    className="flex items-center gap-1.5 text-xs font-mono text-[#a798c4] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to login</span>
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <h3 className="text-xl font-medium tracking-tight text-white font-sans">
                    Reset Password
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Enter the email address associated with your account and we&apos;ll send recovery instructions.
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 font-sans space-y-2">
                    <div className="flex items-center gap-2 font-medium text-purple-300">
                      <Check className="h-4 w-4 text-purple-400" />
                      <span>Instructions Dispatched</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-[11px]">
                      If an account exists for <span className="text-white font-mono">{forgotEmail}</span>, a secure password reset link has been dispatched to your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
                    {errorMsg && (
                      <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label
                        htmlFor="horizon-forgot-email"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="horizon-forgot-email"
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                          className="w-full h-10 px-3.5 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 mt-2 rounded-xl text-xs font-medium tracking-wide text-white bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 hover:brightness-110 active:scale-[0.99] border-t border-purple-400/30 shadow-[0_4px_20px_rgba(147,51,234,0.22)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                {/* ── Tabs: Login | Sign Up (Minimal with thin purple active underline) ── */}
                <div
                  role="tablist"
                  className="flex items-center gap-7 border-b border-white/[0.08] pb-2 relative"
                >
                  <button
                    type="button"
                    role="tab"
                    id="tab-login"
                    aria-selected={tab === "login"}
                    aria-controls="panel-login"
                    onClick={() => handleTabSwitch("login")}
                    className={cn(
                      "text-sm font-sans tracking-wide transition-colors relative pb-2.5 cursor-pointer",
                      tab === "login"
                        ? "text-white font-medium"
                        : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    Login
                    {tab === "login" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    role="tab"
                    id="tab-signup"
                    aria-selected={tab === "signup"}
                    aria-controls="panel-signup"
                    onClick={() => handleTabSwitch("signup")}
                    className={cn(
                      "text-sm font-sans tracking-wide transition-colors relative pb-2.5 cursor-pointer",
                      tab === "signup"
                        ? "text-white font-medium"
                        : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    Sign Up
                    {tab === "signup" && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full" />
                    )}
                  </button>
                </div>

                {/* Inline Error Message */}
                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2 animate-in fade-in duration-150">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Inline Success Message */}
                {successMsg && (
                  <div className="p-2.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2 animate-in fade-in duration-150">
                    <Check className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* ── Form Body: Login Form ── */}
                {tab === "login" ? (
                  <form
                    id="panel-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                    onSubmit={handleLoginSubmit}
                    className="space-y-4 pt-1"
                  >
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="horizon-login-email"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Email
                      </label>
                      <input
                        id="horizon-login-email"
                        type="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full h-10 px-3.5 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                      />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="horizon-login-password"
                          className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          id="horizon-login-password"
                          type={showLoginPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full h-10 pl-3.5 pr-10 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
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
                        className="text-xs font-sans text-purple-400/80 hover:text-purple-300 hover:underline transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 mt-3 rounded-xl text-xs font-medium tracking-wide text-white bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 hover:brightness-110 active:scale-[0.99] border-t border-purple-400/30 shadow-[0_4px_20px_rgba(147,51,234,0.24)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Login</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ── Form Body: Sign Up Form ── */
                  <form
                    id="panel-signup"
                    role="tabpanel"
                    aria-labelledby="tab-signup"
                    onSubmit={handleSignUpSubmit}
                    className="space-y-3.5 pt-1"
                  >
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label
                        htmlFor="horizon-signup-name"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Full Name
                      </label>
                      <input
                        id="horizon-signup-name"
                        type="text"
                        autoComplete="name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Alex Morgan"
                        required
                        className="w-full h-9.5 px-3.5 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label
                        htmlFor="horizon-signup-email"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Email
                      </label>
                      <input
                        id="horizon-signup-email"
                        type="email"
                        autoComplete="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="w-full h-9.5 px-3.5 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label
                        htmlFor="horizon-signup-password"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="horizon-signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          required
                          className="w-full h-9.5 pl-3.5 pr-10 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          aria-label={showSignupPassword ? "Hide password" : "Show password"}
                          className="absolute right-3 top-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
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
                      <label
                        htmlFor="horizon-signup-confirm"
                        className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="horizon-signup-confirm"
                          type={showSignupConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full h-9.5 pl-3.5 pr-10 rounded-xl bg-[#120f1e]/80 border border-purple-500/20 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                          aria-label={showSignupConfirm ? "Hide password" : "Show password"}
                          className="absolute right-3 top-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                        >
                          {showSignupConfirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 mt-2 rounded-xl text-xs font-medium tracking-wide text-white bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 hover:brightness-110 active:scale-[0.99] border-t border-purple-400/30 shadow-[0_4px_20px_rgba(147,51,234,0.24)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign Up</span>
                          <ArrowRight className="h-3.5 w-3.5" />
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

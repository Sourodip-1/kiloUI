"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function KiloLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`${className} overflow-visible group/logo select-none shrink-0`}
    >
      <path
        d="m144.4 264.7l-5.6 12.1v106.2h-79.6v-251.1h79.6v110.6l56.8-110.6h92.9l-72 120.4 72 130.7h-92.9z"
        fill="var(--text-primary)"
        className="transition-colors duration-200"
      />
      <path
        d="m385.2 127.1h85.2l-73.8 261.1h-79.6z"
        fill="var(--accent-green)"
        className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:-translate-y-4 group-hover/logo:translate-x-2"
      />
    </svg>
  );
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandText?: string;
  tagline?: string;
  blurBlend?: boolean;
  blurHeight?: "sm" | "md" | "lg";
  showNewsletter?: boolean;
  columns?: FooterColumn[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Primitives",
    links: [
      { label: "Blurred Carousel", href: "/components?category=Media%20%26%20Layout" },
      { label: "Content Slider", href: "/components?category=Navigation" },
      { label: "Scroll Marquee", href: "/components?category=Media%20%26%20Layout", badge: "New" },
      { label: "Directional Marquee", href: "/components?category=Media%20%26%20Layout", badge: "New" },
      { label: "Kinetic Text", href: "/components?category=Media%20%26%20Layout", badge: "New" },
      { label: "Expanding Card", href: "/components?category=Media%20%26%20Layout" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "Next.js 16 App Router", href: "https://nextjs.org", external: true },
      { label: "Tailwind CSS v4", href: "https://tailwindcss.com", external: true },
      { label: "Hardware Accelerated CSS", href: "#" },
      { label: "Zero-Bundle Primitives", href: "#" },
      { label: "TypeScript Strict Mode", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Component Registry", href: "/components" },
      { label: "GitHub Repository", href: "https://github.com/sourodip-1/kiloUI", external: true },
      { label: "CLI Generator", href: "/docs#cli" },
      { label: "Changelog", href: "/docs#changelog" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "MIT License", href: "https://github.com/sourodip-1/kiloUI/blob/main/LICENSE", external: true },
      { label: "Privacy Policy", href: "#" },
      { label: "Brand Assets", href: "#" },
      { label: "Security Report", href: "#" },
    ],
  },
];

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      brandText = "kilo/ui",
      tagline = "Modern, copy-pasteable UI primitives engineered for high-performance React & Next.js applications.",
      blurBlend = true,
      blurHeight = "md",
      showNewsletter = true,
      columns = DEFAULT_COLUMNS,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [subscribed, setSubscribed] = React.useState(false);

    const handleCopyCli = () => {
      navigator.clipboard?.writeText("npx kilo-ui add footer");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !email.includes("@")) return;
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3500);
    };

    const blurHeightClass = {
      sm: "h-5 sm:h-7",
      md: "h-8 sm:h-12",
      lg: "h-12 sm:h-16",
    }[blurHeight];

    return (
      <footer
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden border-t border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200",
          className
        )}
        {...props}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[42rem] max-w-full rounded-full bg-[var(--accent-green)]/5 blur-3xl opacity-60"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
          {/* Top Section: Branding, Tagline & CLI copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[var(--border)]/70">
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2.5 group/logo"
                >
                  <KiloLogo className="h-6 w-6" />
                  <span>{brandText}</span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
                {tagline}
              </p>

              {/* CLI command snippet pill */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-green)]/50 transition-all font-mono text-xs text-[var(--text-secondary)] cursor-pointer"
                  title="Copy installation command"
                >
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent-green)]" />
                  <span>npx kilo-ui add footer</span>
                  <span className="ml-auto pl-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Newsletter & Updates Column */}
            {showNewsletter && (
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-green)]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Sync with Registry Releases</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Receive immediate updates when new primitives, motions, and interactive templates drop.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@company.com"
                    required
                    className="flex-1 h-10 px-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-sans"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-lg bg-[var(--text-primary)] text-[var(--bg-main)] hover:bg-[var(--text-primary)]/90 text-xs font-mono font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap"
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Navigation Columns Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <span>{link.label}</span>
                          {link.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-[var(--accent-green)]/15 text-[var(--accent-green)] border border-[var(--accent-green)]/30">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Metabar */}
          <div className="pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
            <div>
              © 2026 kilo/ui • Open-source under MIT License.
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/sourodip-1/kiloUI"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span>•</span>
              <span>100% Free Primitives</span>
              <span>•</span>
              <span>v1.0.4</span>
            </div>
          </div>
        </div>

        {/* OVERFLOWING BRAND SIGNATURE TYPOGRAPHY - CLEAR & PROMINENT */}
        <div
          className="relative w-full overflow-hidden flex justify-center items-end select-none pt-4 sm:pt-6 md:pt-8 -mb-3 sm:-mb-5 md:-mb-7 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-mono font-black text-[20vw] sm:text-[19vw] lg:text-[210px] tracking-tighter leading-none whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)]/85 via-[var(--text-primary)]/75 to-[var(--text-primary)]/50 transition-all duration-500 select-none"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
              textShadow: "0 0 50px rgba(139, 196, 154, 0.12)",
            }}
          >
            {brandText}
          </span>
        </div>

        {/* SOFT BOTTOM BLUR BLEND (ONLY SUBTLE BOTTOM RIM FEATHERING) */}
        {blurBlend && (
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 right-0 w-full z-20 transition-all duration-300",
              blurHeightClass
            )}
            style={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            }}
            aria-hidden="true"
          >
            {/* Subtle feathered bottom tint */}
            <div className="w-full h-full bg-gradient-to-t from-[var(--bg-main)]/50 to-transparent" />
          </div>
        )}
      </footer>
    );
  }
);

Footer.displayName = "Footer";

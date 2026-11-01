import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kiloui.dev"),
  title: {
    default: "kilo/ui — Precision UI Primitives & Hardware Shaders",
    template: "%s | kilo/ui",
  },
  description:
    "Minimal, high-performance copy-paste UI primitives, WebGL shaders, precision motion engines, and interactive animations for React & Next.js. Zero runtime wrappers.",
  keywords: [
    "kilo ui",
    "kiloui",
    "kiloui.dev",
    "kilo-ui",
    "React components",
    "Next.js 16",
    "Tailwind CSS v4",
    "WebGL shaders",
    "copy paste UI",
    "UI primitives",
    "Target Cursor",
    "Contour Tide",
    "Liquid Metal",
    "Kinetic Text",
    "shadcn alternative",
    "creative developer",
    "creative UI",
    "TypeScript strict",
  ],
  authors: [{ name: "Sourodip", url: "https://sourodip.me" }],
  creator: "Sourodip",
  publisher: "kilo/ui",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.kiloui.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.kiloui.dev",
    siteName: "kilo/ui",
    title: "kilo/ui — Precision UI Primitives & Hardware Shaders",
    description:
      "Minimal, high-performance copy-paste UI primitives, WebGL shaders, precision motion engines, and interactive animations for React & Next.js.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "kilo/ui - Precision UI Primitives",
      },
      {
        url: "/KiloUi-logo-darkmode.svg",
        width: 1200,
        height: 630,
        alt: "kilo/ui - Precision UI Primitives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kilo/ui — Precision UI Primitives & Hardware Shaders",
    description:
      "Minimal, high-performance copy-paste UI primitives, WebGL shaders, and precision animations for React & Next.js.",
    creator: "@sourodip",
    images: ["/KiloUi-logo-darkmode.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "48x48",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/KiloUi-logo-darkmode.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/KiloUi-logo-lightmode.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${googleSans.variable} ${googleSansCode.variable} min-h-full antialiased`}
    >
      <head>
        {/* Favicon & Web Manifest explicitly linked for search crawlers & browsers */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('kilo-theme');
                  var isLight = false;
                  if (saved === 'light') {
                    isLight = true;
                  } else if (saved === 'system') {
                    isLight = !window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isLight) {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                  var accent = localStorage.getItem('kilo-accent');
                  if (accent) {
                    document.documentElement.setAttribute('data-accent', accent);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.kiloui.dev/#website",
                  "name": "kilo/ui",
                  "alternateName": ["kilo ui", "kiloui", "kiloui.dev", "kilo-ui"],
                  "url": "https://www.kiloui.dev",
                  "description":
                    "Minimal, high-performance copy-paste UI primitives, WebGL shaders, precision motion engines, and interactive animations for React & Next.js.",
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://www.kiloui.dev/#organization",
                    "name": "kilo/ui",
                    "url": "https://www.kiloui.dev",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.kiloui.dev/android-chrome-512x512.png",
                    },
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate":
                        "https://www.kiloui.dev/components?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.kiloui.dev/#organization",
                  "name": "kilo/ui",
                  "url": "https://www.kiloui.dev",
                  "logo": "https://www.kiloui.dev/android-chrome-512x512.png",
                  "founder": {
                    "@type": "Person",
                    "name": "Sourodip",
                    "url": "https://sourodip.me",
                  },
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "Components",
                  "description":
                    "Browse 39+ interactive React & Next.js UI primitives, WebGL shaders, and tactile cursors.",
                  "url": "https://www.kiloui.dev/components",
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Overview",
                  "description":
                    "Learn kilo/ui architecture, zero-dependency philosophy, CLI installation, and TypeScript contracts.",
                  "url": "https://www.kiloui.dev/overview",
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Motion",
                  "description":
                    "Zero-dependency spring physics, spatial continuity, and choreography primitives.",
                  "url": "https://www.kiloui.dev/motion",
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "Icons",
                  "description":
                    "Curated collection of pixel-perfect SVG vector icons for developer dashboards.",
                  "url": "https://www.kiloui.dev/icons",
                },
              ],
            }),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

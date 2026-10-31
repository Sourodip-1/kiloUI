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
    "React components",
    "Next.js 16",
    "Tailwind CSS v4",
    "WebGL shaders",
    "copy paste UI",
    "UI primitives",
    "Target Cursor",
    "Contour Tide",
    "Option Wheel",
    "Motion Engine",
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
        url: "/KiloUi-logo-darkmode.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/KiloUi-logo-lightmode.svg",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
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
              "@type": "WebApplication",
              "name": "kilo/ui",
              "url": "https://www.kiloui.dev",
              "description":
                "Minimal, high-performance copy-paste UI primitives, shaders, and animations for React and Next.js.",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "author": {
                "@type": "Person",
                "name": "Sourodip",
                "url": "https://sourodip.me",
              },
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

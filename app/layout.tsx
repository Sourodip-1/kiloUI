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
  title: "kilo/ui — Component Library & Interactive Playground",
  description: "Minimal, premium developer-focused component library, interactive playground, and registry.",
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
      className={`${googleSans.variable} ${googleSansCode.variable} h-full antialiased`}
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
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

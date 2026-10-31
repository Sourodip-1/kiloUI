import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precision Vector Icons",
  description: "Curated collection of lightweight, pixel-perfect SVG icons for developer dashboards and modern interfaces.",
  alternates: {
    canonical: "https://www.kiloui.dev/icons",
  },
};

export default function IconsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

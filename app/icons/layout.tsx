import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kilo/Icons — kilo/ui",
  description: "A crafted collection of clean vector icons, morphing menu actions, and responsive 60fps SVG loaders.",
};

export default function IconsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview & Architecture",
  description: "Explore kilo/ui architecture, zero-dependency philosophy, strict TypeScript contracts, and GPU-accelerated shaders.",
  alternates: {
    canonical: "https://www.kiloui.dev/overview",
  },
};

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

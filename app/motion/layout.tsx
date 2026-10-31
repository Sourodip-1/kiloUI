import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Material Motion Engine & Spatial Continuity",
  description: "Zero-dependency spring physics and choreography: ContainerTransform, SharedAxis (X/Y/Z), FadeThrough, and Fade.",
  alternates: {
    canonical: "https://www.kiloui.dev/motion",
  },
};

export default function MotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

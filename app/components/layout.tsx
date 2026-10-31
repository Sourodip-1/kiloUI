import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Registry & Interactive Playground",
  description: "Browse 44+ precision-crafted copy-paste React & Next.js UI primitives, shaders, reticle cursors, and layout systems.",
  alternates: {
    canonical: "https://www.kiloui.dev/components",
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

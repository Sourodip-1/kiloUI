import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Primitives & Favorites",
  description: "View and manage your bookmarked kilo/ui components, quick-copy commands, and custom presets.",
  alternates: {
    canonical: "https://www.kiloui.dev/liked",
  },
};

export default function LikedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

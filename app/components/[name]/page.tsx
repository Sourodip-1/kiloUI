import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { REGISTRY_DATA } from "@/registry/registry-data";
import { ComponentDetailClient } from "./component-detail-client";
import { ComponentDetailSkeleton } from "@/components/skeletons";

export function generateStaticParams() {
  const names = Object.keys(REGISTRY_DATA);
  const aliases = [
    "dynamic-island",
    "otp-input",
    "haptic-stepper",
    "liquid-glass-search-bar",
    "action-sheet",
    "numeric-keypad",
    "image-card",
    "image-card-shapes",
    "shaped-card",
    "depth-carousel",
    "3d-carousel",
    "cards-carousel",
    "depth-card-carousel",
  ];
  return Array.from(new Set([...names, ...aliases])).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const item =
    REGISTRY_DATA[name] ||
    (name === "dynamic-island" ? REGISTRY_DATA["dynamic-island-banner"] : undefined) ||
    (name === "otp-input" ? REGISTRY_DATA["m3-otp-input"] : undefined) ||
    (name === "haptic-stepper" ? REGISTRY_DATA["mobile-haptic-stepper"] : undefined) ||
    (name === "liquid-glass-search-bar" ? REGISTRY_DATA["search-bar"] : undefined) ||
    (name === "action-sheet" ? REGISTRY_DATA["mobile-action-sheet"] : undefined) ||
    (name === "numeric-keypad" ? REGISTRY_DATA["mobile-numeric-keypad"] : undefined) ||
    (name === "image-card" || name === "image-card-shapes" || name === "shaped-card" ? REGISTRY_DATA["shaped-image-card"] : undefined) ||
    (name === "depth-carousel" || name === "3d-carousel" || name === "cards-carousel" || name === "depth-card-carousel" ? REGISTRY_DATA["3d-depth-carousel"] : undefined) ||
    (name === "villa-specs" || name === "specs-card" || name === "property-specs" ? REGISTRY_DATA["specs-grid-card"] : undefined) ||
    (name === "host-card" || name === "trust-card" || name === "author-card" ? REGISTRY_DATA["host-trust-card"] : undefined) ||
    (name === "booking-bar" || name === "action-bar" || name === "sticky-action-bar" ? REGISTRY_DATA["booking-action-bar"] : undefined) ||
    (name === "filter-bar" || name === "collection-filter-bar" || name === "pill-filter-bar" ? REGISTRY_DATA["curated-filter-bar"] : undefined) ||
    (name === "reactive-slates" || name === "reactive-slats" ? REGISTRY_DATA["prismatic-slats-bg"] : undefined);
  if (!item) return { title: "Component Not Found — kilo/ui" };

  return {
    title: `${item.title} — React & Next.js Primitive`,
    description: item.description,
    alternates: {
      canonical: `https://www.kiloui.dev/components/${name}`,
    },
    openGraph: {
      title: `${item.title} — kilo/ui Primitive`,
      description: item.description,
      url: `https://www.kiloui.dev/components/${name}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — kilo/ui Primitive`,
      description: item.description,
    },
  };
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <React.Suspense fallback={<ComponentDetailSkeleton />}>
      <ComponentPageContent params={params} />
    </React.Suspense>
  );
}

async function ComponentPageContent({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item =
    REGISTRY_DATA[name] ||
    (name === "dynamic-island" ? REGISTRY_DATA["dynamic-island-banner"] : undefined) ||
    (name === "otp-input" ? REGISTRY_DATA["m3-otp-input"] : undefined) ||
    (name === "haptic-stepper" ? REGISTRY_DATA["mobile-haptic-stepper"] : undefined) ||
    (name === "liquid-glass-search-bar" ? REGISTRY_DATA["search-bar"] : undefined) ||
    (name === "action-sheet" ? REGISTRY_DATA["mobile-action-sheet"] : undefined) ||
    (name === "numeric-keypad" ? REGISTRY_DATA["mobile-numeric-keypad"] : undefined) ||
    (name === "image-card" || name === "image-card-shapes" || name === "shaped-card" ? REGISTRY_DATA["shaped-image-card"] : undefined) ||
    (name === "depth-carousel" || name === "3d-carousel" || name === "cards-carousel" || name === "depth-card-carousel" ? REGISTRY_DATA["3d-depth-carousel"] : undefined) ||
    (name === "villa-specs" || name === "specs-card" || name === "property-specs" ? REGISTRY_DATA["specs-grid-card"] : undefined) ||
    (name === "host-card" || name === "trust-card" || name === "author-card" ? REGISTRY_DATA["host-trust-card"] : undefined) ||
    (name === "booking-bar" || name === "action-bar" || name === "sticky-action-bar" ? REGISTRY_DATA["booking-action-bar"] : undefined) ||
    (name === "filter-bar" || name === "collection-filter-bar" || name === "pill-filter-bar" ? REGISTRY_DATA["curated-filter-bar"] : undefined) ||
    (name === "reactive-slates" || name === "reactive-slats" ? REGISTRY_DATA["prismatic-slats-bg"] : undefined);

  if (!item) {
    notFound();
  }

  return <ComponentDetailClient item={item} />;
}


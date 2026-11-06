import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { REGISTRY_DATA } from "@/registry/registry-data";
import { ComponentDetailClient } from "./component-detail-client";
import { ComponentDetailSkeleton } from "@/components/skeletons";

export function generateStaticParams() {
  return Object.keys(REGISTRY_DATA).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const item =
    REGISTRY_DATA[name] ||
    (name === "liquid-glass-search-bar" ? REGISTRY_DATA["search-bar"] : undefined) ||
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
    (name === "liquid-glass-search-bar" ? REGISTRY_DATA["search-bar"] : undefined) ||
    (name === "reactive-slates" || name === "reactive-slats" ? REGISTRY_DATA["prismatic-slats-bg"] : undefined);

  if (!item) {
    notFound();
  }

  return <ComponentDetailClient item={item} />;
}


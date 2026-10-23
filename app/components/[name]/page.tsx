import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { REGISTRY_DATA } from "@/registry/registry-data";
import { ComponentDetailClient } from "./component-detail-client";

export function generateStaticParams() {
  return Object.keys(REGISTRY_DATA).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const item = REGISTRY_DATA[name];
  if (!item) return { title: "Component Not Found — kilo/ui" };

  return {
    title: `${item.title} — kilo/ui Component Library`,
    description: item.description,
  };
}

export default function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  return (
    <React.Suspense
      fallback={
        <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 text-xs text-[var(--text-muted)] font-mono animate-pulse">
          Loading component...
        </div>
      }
    >
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
  const item = REGISTRY_DATA[name];

  if (!item) {
    notFound();
  }

  return <ComponentDetailClient item={item} />;
}


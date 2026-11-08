import type { MetadataRoute } from "next";
import { REGISTRY_DATA } from "@/registry/registry-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.kiloui.dev";
  const now = new Date();

  // Core high-value pages for search engines & rich sitelinks
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/overview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/icons`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic component pages for all active primitives in the registry (39 verified components)
  const componentRoutes: MetadataRoute.Sitemap = Object.keys(REGISTRY_DATA).map((name) => ({
    url: `${baseUrl}/components/${name}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...componentRoutes];
}


import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/favicon.ico",
          "/favicon-16x16.png",
          "/favicon-32x32.png",
          "/apple-touch-icon.png",
          "/android-chrome-192x192.png",
          "/android-chrome-512x512.png",
          "/site.webmanifest",
        ],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.kiloui.dev/sitemap.xml",
    host: "https://www.kiloui.dev",
  };
}


import type { MetadataRoute } from "next";
import { legalDocs } from "@/content/legal";
import { servicePages, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...servicePages.map((o) => ({
      url: `${SITE_URL}/services/${o.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...legalDocs.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

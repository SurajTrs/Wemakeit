import type { MetadataRoute } from "next";
import { legalDocs } from "@/content/legal";
import { offer, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...offer.items.map((o) => ({
      url: `${SITE_URL}/services/${o.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...legalDocs.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

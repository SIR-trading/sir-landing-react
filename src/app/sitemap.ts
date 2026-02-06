import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sir.trading", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://sir.trading/team", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://sir.trading/audits", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://sir.trading/allocations", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];
}

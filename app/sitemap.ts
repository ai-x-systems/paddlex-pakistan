import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paddlex-pakistan.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
  ];
}

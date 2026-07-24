import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thepadelx.vercel.app/";
  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
  ];
}

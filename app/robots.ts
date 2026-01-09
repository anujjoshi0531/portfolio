import type { MetadataRoute } from "next";
import { config } from "@/lib/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [],
    },
    sitemap: `${config.BASE_URL}/sitemap.xml`,
  };
}
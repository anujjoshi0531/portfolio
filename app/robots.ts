import type { MetadataRoute } from "next";
import { clientConfig } from "@/lib/constant/config.client";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [],
    },
    sitemap: `${clientConfig.BASE_URL}/sitemap.xml`,
  };
}
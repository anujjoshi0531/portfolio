import type { MetadataRoute } from "next";
import { clientConfig } from "@/lib/constant/config.client";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/?source=web_app_manifest",
    name: "Anuj Joshi - Portfolio",
    short_name: "Anuj Joshi",
    description:
      "Portfolio of Anuj Joshi — a full-stack developer, AI/ML engineer, and Web3 & Robotics enthusiast from DTU. Featuring projects, blogs, open-source work, UI experiments & research in modern technologies.",

    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    dir: "ltr",
    orientation: "portrait-primary",

    theme_color: "#000000",
    background_color: "#000000",

    categories: [
      "technology",
      "developer tools",
      "education",
      "portfolio",
      "software",
      "engineering"
    ],

    icons: [
      { src: "/icon.webp", sizes: "16x16", type: "image/webp" },
      { src: "/icon.webp", sizes: "32x32", type: "image/webp" },
      { src: "/icon.webp", sizes: "72x72", type: "image/webp" },
      { src: "/icon.webp", sizes: "96x96", type: "image/webp" },
      { src: "/icon.webp", sizes: "128x128", type: "image/webp" },
      { src: "/icon.webp", sizes: "144x144", type: "image/webp" },
      { src: "/icon.webp", sizes: "192x192", type: "image/webp" },
      { src: "/icon.webp", sizes: "256x256", type: "image/webp" },
      { src: "/icon.webp", sizes: "384x384", type: "image/webp" },
      { src: "/icon.webp", sizes: "512x512", type: "image/webp" },
      {
        src: "/icon-maskable.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable"
      }
    ],

    screenshots: [
      {
        src: "/opengraph-image.webp",
        sizes: "1080x1920",
        type: "image/webp",
      }
    ],

    shortcuts: [
      {
        name: "Projects",
        url: "/projects",
        description: "View featured engineering & development projects.",
        icons: [{ src: "/icon.webp", sizes: "96x96", type: "image/webp" }]
      },
      {
        name: "Blog",
        url: "/blog",
        description: "Read technical articles & research notes.",
        icons: [{ src: "/icon.webp", sizes: "96x96", type: "image/webp" }]
      },
      {
        name: "Contact",
        url: "/contact",
        description: "Get in touch for work or collaborations.",
        icons: [{ src: "/icon.webp", sizes: "96x96", type: "image/webp" }]
      }
    ],

    related_applications: [
      {
        platform: "webapp",
        url: clientConfig.BASE_URL,
      }
    ],
    prefer_related_applications: false,
  };
}

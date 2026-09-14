import type { Metadata } from "next";
import { clientConfig } from "@/lib/config/client";

type PageMetadata = {
  title: string;
  description: string;
  alternates: {
    canonical: string;
  };
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(clientConfig.BASE_URL),
  applicationName: "Anuj Joshi - Portfolio",
  title: {
    default: "Anuj Joshi - Portfolio",
    template: "%s - Anuj Joshi",
  },
  description:
    "Explore the portfolio of Anuj Joshi, a full-stack developer specialized in building scalable systems, intuitive user experiences, and reliable end-to-end solutions. Showcasing high-impact projects, engineering insights, open-source contributions, and strong problem-solving capabilities.",
  keywords: [
    "Anuj Joshi",
    "Portfolio",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [
    {
      name: "Anuj Joshi",
      url: clientConfig.BASE_URL,
    },
  ],
  creator: "Anuj Joshi",
  publisher: "Anuj Joshi",
  icons: {
    icon: [
      { url: "/icon.webp", sizes: "32x32", type: "image/webp" },
      { url: "/icon.webp", sizes: "16x16", type: "image/webp" },
    ],
    shortcut: "/icon.webp",
    apple: [{ url: "/icon.webp", sizes: "180x180", type: "image/webp" }],
    other: [
      {
        rel: "icon",
        url: "/icon.webp",
        sizes: "192x192",
        type: "image/webp",
      },
    ],
  },
  openGraph: {
    title: "Anuj Joshi - Portfolio",
    description:
      "Discover the innovative portfolio of Anuj Joshi, a skilled Computer Science Engineer from DTU specializing in full-stack web development, AI/ML, Web3, and robotics. Featuring cutting-edge projects, insightful technical blogs, and open-source contributions that showcase expertise in modern web technologies and emerging tech trends.",
    url: clientConfig.BASE_URL,
    siteName: "Anuj Joshi - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Anuj Joshi - Portfolio",
        type: "image/webp",
      },
      {
        url: "/opengraph-image.webp",
        width: 600,
        height: 600,
        alt: "Anuj Joshi Portfolio Logo",
        type: "image/webp",
      },
    ],
    emails: ["anujjoshi3105@gmail.com"],
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    site: "@anujjoshi3105",
    creator: "@anujjoshi3105",
    title: "Anuj Joshi - Portfolio",
    description:
      "Computer Science Engineer from DTU | Full Stack Developer | AI/ML Enthusiast | Web3 & Robotics Explorer | Building innovative solutions with modern web technologies. Check out my latest projects and technical insights!",
    images: {
      url: "/opengraph-image.webp",
      alt: "Anuj Joshi - Portfolio",
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: clientConfig.BASE_URL,
    languages: {
      "x-default": clientConfig.BASE_URL,
    },
  },
  category: "Technology",
  classification: "Portfolio Website",
  verification: {
    google: clientConfig.GOOGLE_VERIFICATION_ID,
  },
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const pagesMetadata: Record<string, PageMetadata> = {
  about: {
    title: "About",
    description:
      "Learn about Anuj Joshi, a Computer Science Engineer from DTU specializing in full-stack development, AI/ML, Web3, and robotics. Explore my professional journey, technical expertise, and passion for building impactful digital solutions.",
    alternates: {
      canonical: "/about",
    },
  },
  blog: {
    title: "Blogs",
    description:
      "Explore insightful articles, tutorials, and technical deep-dives on web development, AI/ML, Web3, and emerging technologies. Stay informed with well-researched explanations and practical development guidance.",
    alternates: {
      canonical: "/blog",
    },
  },
  project: {
    title: "Projects",
    description:
      "Discover my portfolio of innovative projects across full-stack development, AI/ML, Web3, and robotics. Browse detailed breakdowns, live demos, and real-world applications showcasing modern engineering and problem-solving.",
    alternates: {
      canonical: "/project",
    },
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch for collaborations, freelance opportunities, or technical discussions. Connect with me to explore web development, AI/ML, Web3, or robotics projects and build meaningful solutions together.",
    alternates: {
      canonical: "/contact",
    },
  },
};

export const getMetadata = (page: keyof typeof pagesMetadata): PageMetadata => {
  return pagesMetadata[page];
};

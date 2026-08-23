import { Poppins, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DarkProvider } from "@/components/providers/dark-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import ThemePicker from '@/components/global/ThemePicker';
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { clientConfig } from "@/lib/constant/config.client";
import { LazyMotion, domAnimation } from "framer-motion";

const PopupChatbot = dynamic(() => import("@/components/providers/chatbot-provider"));

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});


export const metadata: Metadata = {
  metadataBase: new URL(clientConfig.BASE_URL),

  // Basic Information
  applicationName: "Anuj Joshi - Portfolio",
  title: {
    default: "Anuj Joshi - Portfolio",
    template: `%s - Anuj Joshi`,
  },
  description: "Explore the portfolio of Anuj Joshi, a full-stack developer specialized in building scalable systems, intuitive user experiences, and reliable end-to-end solutions. Showcasing high-impact projects, engineering insights, open-source contributions, and strong problem-solving capabilities.",

  keywords: [
    "Anuj Joshi", "Portfolio", "Full Stack Developer", "Next.js", "TypeScript", "Software Engineer"
  ],

  // Author Information
  authors: [
    {
      name: "Anuj Joshi",
      url: clientConfig.BASE_URL
    }
  ],
  creator: "Anuj Joshi",
  publisher: "Anuj Joshi",

  // Favicon and Icons
  icons: {
    icon: [
      { url: "/icon.webp", sizes: "32x32", type: "image/webp" },
      { url: "/icon.webp", sizes: "16x16", type: "image/webp" }
    ],
    shortcut: "/icon.webp",
    apple: [
      { url: "/icon.webp", sizes: "180x180", type: "image/webp" }
    ],
    other: [
      {
        rel: "icon",
        url: "/icon.webp",
        sizes: "192x192",
        type: "image/webp"
      }
    ]
  },

  // Enhanced Open Graph
  openGraph: {
    title: "Anuj Joshi - Portfolio",
    description: "Discover the innovative portfolio of Anuj Joshi, a skilled Computer Science Engineer from DTU specializing in full-stack web development, AI/ML, Web3, and robotics. Featuring cutting-edge projects, insightful technical blogs, and open-source contributions that showcase expertise in modern web technologies and emerging tech trends.",
    url: clientConfig.BASE_URL,
    siteName: "Anuj Joshi - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `/opengraph-image.webp`,
        width: 1200,
        height: 630,
        alt: "Anuj Joshi - Portfolio",
        type: "image/webp"
      },
      {
        url: `/opengraph-image.webp`,
        width: 600,
        height: 600,
        alt: "Anuj Joshi Portfolio Logo",
        type: "image/webp"
      }
    ],
    emails: ["anujjoshi3105@gmail.com"],
    countryName: "India",
  },

  // Enhanced Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@anujjoshi3105",
    creator: "@anujjoshi3105",
    title: "Anuj Joshi - Portfolio",
    description: "🚀 Computer Science Engineer from DTU | Full Stack Developer | AI/ML Enthusiast | Web3 & Robotics Explorer | Building innovative solutions with modern web technologies. Check out my latest projects and technical insights!",
    images: {
      url: `/opengraph-image.webp`,
      alt: "Anuj Joshi - Portfolio",
      width: 1200,
      height: 630
    }
  },

  // Enhanced Robots Configuration
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
      "max-snippet": -1
    },
  },

  // Canonical URL
  alternates: {
    canonical: clientConfig.BASE_URL,
    languages: {
      "x-default": clientConfig.BASE_URL
    }
  },

  // Additional Metadata
  category: "Technology",
  classification: "Portfolio Website",

  // Verification
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
    "msapplication-config": "/browserconfig.xml"
  }
};

import JsonLd from "@/components/global/JsonLd";

export default async function Layout({
  children,
}: PropsWithChildren) {
  const contestApiOrigin = clientConfig.CONTEST_API
    ? new URL(clientConfig.CONTEST_API).origin
    : null;

  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth overflow-x-clip">
      <head>
        <link rel="shortcut icon" href="/icon.webp" type="image/x-icon" />
        {contestApiOrigin && (
          <link rel="dns-prefetch" href={contestApiOrigin} />
        )}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Anuj Joshi",
            url: clientConfig.BASE_URL,
            jobTitle: "Full Stack Developer",
            sameAs: [
              "https://github.com/anujjoshi0531",
              "https://www.linkedin.com/in/anujjoshi0531",
              "https://x.com/anujjoshi3105"
            ]
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: clientConfig.BASE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${clientConfig.BASE_URL}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: clientConfig.BASE_URL
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: `${clientConfig.BASE_URL}/about`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Project",
                item: `${clientConfig.BASE_URL}/project`
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Blog",
                item: `${clientConfig.BASE_URL}/blog`
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Contact",
                item: `${clientConfig.BASE_URL}/contact`
              }
            ]
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem("themeColor");if(s)document.documentElement.style.setProperty("--theme",s)}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${poppins.className} ${playfair.variable} overflow-x-clip`}
        suppressHydrationWarning>
        <ThemeProvider>
          <DarkProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            storageKey="station-theme"
            defaultTheme="dark">
            <LazyMotion features={domAnimation}>
              <NextTopLoader easing="ease" speed={200} initialPosition={0.08} showSpinner={false} color="#fff" />
              <Navbar />
              <div className="overflow-x-clip max-w-[100dvw] flex flex-col min-h-[100dvh]">
                <main className="lg:mx-32 md:mx-16 my-12 sm:mx-8 mx-6">
                  {children}
                </main>
                <Footer />
              </div>
              <PopupChatbot />
              <ThemePicker />
              <Toaster richColors />
            </LazyMotion>
          </DarkProvider>
        </ThemeProvider>
      </body>
      {clientConfig.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={clientConfig.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
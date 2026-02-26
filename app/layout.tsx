import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DarkProvider } from "@/components/providers/dark-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import ThemePicker from '@/components/global/ThemePicker';
import Navbar from "@/components/site/Navbar";
import PopupChatbot from "@/components/providers/chatbot-provider";
import Footer from "@/components/site/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { clientConfig } from "@/lib/constant/config.client";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  preload: true,
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
    // Personal & Professional
    "Anuj Joshi", "Anuj Joshi Portfolio", "Anuj Joshi Developer", "Anuj Joshi DTU",

    // Technical Skills
    "Full Stack Developer", "Frontend Developer", "Backend Developer",
    "React Developer", "Next.js Developer", "JavaScript Developer", "TypeScript Developer",
    "Python Developer", "Node.js Developer", "Web Developer",

    // Technologies & Frameworks
    "React", "Next.js", "JavaScript", "TypeScript", "Python", "Node.js",
    "HTML5", "CSS3", "Tailwind CSS", "MongoDB", "PostgreSQL", "MySQL",
    "Express.js", "API Development", "REST API", "GraphQL",

    // Specializations
    "AI Developer", "Machine Learning Engineer", "Data Scientist",
    "Web3 Developer", "Blockchain Developer", "Smart Contracts",
    "Robotics Engineer", "IoT Developer",

    // Education & Experience
    "Computer Science Engineer", "DTU", "Delhi Technological University",
    "CSE Student", "Tech Enthusiast", "Software Engineer",

    // Project Types
    "Portfolio Projects", "Open Source", "Technical Blog", "Code Repository",
    "Software Projects", "Web Applications", "Mobile Apps",

    // Industry Terms
    "Hire Full Stack Developer", "Freelance Developer", "Remote Developer",
    "Software Development", "Web Development Services",
    "Custom Web Applications", "Responsive Design", "Progressive Web Apps",

    // Location
    "Delhi Developer", "India Developer", "Remote Work",

    // Societies & Organizations
    "Society of Robotics", "LIMSTIR", "Tech Communities",

    // Additional Technologies
    "Docker", "AWS", "Firebase", "Vercel", "Netlify", "Git", "GitHub",
    "Redux", "Context API", "Prisma", "Mongoose", "Socket.io"
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

export default async function Layout({
  children,
}: PropsWithChildren) {
  const contestApiOrigin = clientConfig.CONTEST_API
    ? new URL(clientConfig.CONTEST_API).origin
    : null;

  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <link rel="shortcut icon" href="/icon.webp" type="image/x-icon" />
        {contestApiOrigin && (
          <>
            <link rel="preconnect" href={contestApiOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={contestApiOrigin} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: clientConfig.BASE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${clientConfig.BASE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedColor = localStorage.getItem("themeColor");
                if (savedColor) {
                  document.documentElement.style.setProperty("--theme", savedColor);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.className} overflow-x-hidden`}
        suppressHydrationWarning>
        <ThemeProvider>
          <DarkProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            storageKey="station-theme"
            defaultTheme="dark">
            <NextTopLoader easing="ease" speed={200} initialPosition={0.08} showSpinner={false} color="#fff" />
            <Navbar />
            <div className="overflow-x-hidden max-w-[100dvw] flex flex-col min-h-[100dvh]">
              <main className="lg:mx-32 md:mx-16 my-12 sm:mx-8 mx-6">
                {children}
              </main>
              <Footer />
            </div>
            <PopupChatbot />
            <ThemePicker />
            <Toaster richColors />
          </DarkProvider>
        </ThemeProvider>
      </body>
      {clientConfig.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={clientConfig.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
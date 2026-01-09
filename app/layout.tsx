import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DarkProvider } from "@/components/providers/dark-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import ThemePicker from "@/components/global/theme-picker";
import Navbar from "@/components/site/Navbar";
import PopupChatbot from "@/components/global/popup-chatbot";
import Footer from "@/components/site/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import { config } from "@/lib/constant";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  preload: true,
});


export const metadata: Metadata = {
  metadataBase: new URL(config.BASE_URL),

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
      url: config.BASE_URL
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
    url: config.BASE_URL,
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
    canonical: config.BASE_URL,
    languages: {
      "x-default": config.BASE_URL
    }
  },

  // Additional Metadata
  category: "Technology",
  classification: "Portfolio Website",

  // Verification
  verification: {
    google: config.GOOGLE_VERIFICATION_ID,
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
  const contestApiOrigin = config.CONTEST_API
    ? new URL(config.CONTEST_API).origin
    : null;

  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/icon.webp" type="image/x-icon" />
        {contestApiOrigin && (
          <>
            <link rel="preconnect" href={contestApiOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={contestApiOrigin} />
          </>
        )}
      </head>
      <body
        className={`overflow-x-hidden ${poppins.className}`}
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
            <main className="lg:mx-[8rem] md:mx-[4rem] my-[3rem] sm:mx-[2rem] mx-6 max-w-screen">
              {children}
              <PopupChatbot />
              <ThemePicker />
            </main>
            <Footer />
            <Toaster richColors />
          </DarkProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={config.GOOGLE_ANALYTICS_ID!} />
    </html>
  );
}
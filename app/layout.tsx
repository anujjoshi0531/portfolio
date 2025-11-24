import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/notion.css";
import "@/styles/prism-theme.css"
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DarkProvider } from "@/components/providers/dark-provider";
import { Toaster } from "@/components/ui/sonner";
import HolyLoader from "holy-loader";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import ThemePicker from "@/components/global/theme-picker";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  // Basic Information
  applicationName: "Anuj Joshi - Portfolio",
  title: {
    default: "Anuj Joshi - Portfolio",
    template: `%s - Anuj Joshi`,
  },  
  description: "Anuj Joshi is a Computer Science Engineer from DTU and passionate full-stack web developer specializing in modern web technologies, AI/ML, Web3, and robotics. Explore my portfolio featuring innovative projects, technical blogs, open-source contributions, and cutting-edge experiments that demonstrate expertise in React, Next.js, Python, JavaScript, and emerging technologies.",
  
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
      url: baseUrl 
    }
  ],
  creator: "Anuj Joshi",
  publisher: "Anuj Joshi",
  
  // Favicon and Icons
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/icon.png",
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "icon",
        url: "/icon.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  },
  
  // Enhanced Open Graph
  openGraph: {
    title: "Anuj Joshi - Portfolio",
    description: "Discover the innovative portfolio of Anuj Joshi, a skilled Computer Science Engineer from DTU specializing in full-stack web development, AI/ML, Web3, and robotics. Featuring cutting-edge projects, insightful technical blogs, and open-source contributions that showcase expertise in modern web technologies and emerging tech trends.",
    url: baseUrl,
    siteName: "Anuj Joshi - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Anuj Joshi - Portfolio",
        type: "image/png"
      },
      {
        url: `${baseUrl}/opengraph-image-square.png`,
        width: 600,
        height: 600,
        alt: "Anuj Joshi Portfolio Logo",
        type: "image/png"
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
      url: `${baseUrl}/opengraph-image.png`,
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
    canonical: baseUrl,
    languages: {
      "en-US": baseUrl,
      "en": baseUrl
    }
  },
  
  // Additional Metadata
  category: "Technology",
  classification: "Portfolio Website",
  
  // Verification (you can add more as needed)
  verification: {
    google: "a-tlC7lxqKDFcOSkl7QSrELzrggflM2cjPn8ishZQs8",
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
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
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
              <HolyLoader color="white" />
              <Navbar />
              <main className="lg:mx-[8rem] md:mx-[4rem] my-[3rem] sm:mx-[2rem] mx-6 max-w-screen">
                {children}
                <ThemePicker />
              </main>
              <Footer />
              <Toaster richColors />
            </DarkProvider>
          </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG || "G-95C2TB6XZZ"} />
    </html>
  );
}
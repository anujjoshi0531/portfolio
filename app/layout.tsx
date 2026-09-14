import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import ThemePicker from "@/components/global/ThemePicker";
import { StructuredData } from "@/components/layout/StructuredData";
import { AppProviders } from "@/components/providers/AppProviders";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { clientConfig } from "@/lib/config/client";
import { playfair, poppins } from "@/lib/config/fonts";
import { siteMetadata } from "@/lib/config/metadata";
import NextTopLoader from "nextjs-toploader";

const PopupChatbot = dynamic(() => import("@/components/providers/chatbot-provider"));

export const metadata: Metadata = siteMetadata;

export default async function Layout({ children }: PropsWithChildren) {
  const contestApiOrigin = clientConfig.CONTEST_API
    ? new URL(clientConfig.CONTEST_API).origin
    : null;

  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth overflow-x-clip">
      <head>
        <link rel="shortcut icon" href="/icon.webp" type="image/x-icon" />
        {contestApiOrigin && <link rel="dns-prefetch" href={contestApiOrigin} />}
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=localStorage.getItem("themeColor");if(s)document.documentElement.style.setProperty("--theme",s)}catch(e){}',
          }}
        />
      </head>
      <body
        className={`${poppins.className} ${playfair.variable} overflow-x-clip`}
        suppressHydrationWarning
      >
        <AppProviders>
          <NextTopLoader
            easing="ease"
            speed={200}
            initialPosition={0.08}
            showSpinner={false}
            color="#fff"
          />
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
        </AppProviders>
      </body>
      {clientConfig.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={clientConfig.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}

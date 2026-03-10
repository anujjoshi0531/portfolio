import "@/styles/notion.css";
import "@/styles/prism-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import { Metadata } from "next";
import { getMetadata } from "@/lib";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = getMetadata("blog");

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
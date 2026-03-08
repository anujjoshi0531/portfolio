import "@/styles/notion.css";
import "@/styles/prism-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import { Metadata } from "next";
import { getMetadata } from "@/lib";
import { Source_Serif_4, Outfit } from "next/font/google";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  preload: false,
});

export const metadata: Metadata = getMetadata("blog");

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sourceSerif.variable} ${outfit.variable}`}>
      {children}
    </div>
  );
}
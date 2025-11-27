import "@/styles/notion.css";
import "@/styles/prism-theme.css";
import { Metadata } from "next";
import { getMetadata } from "@/lib";

export const metadata: Metadata = getMetadata("blog");

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
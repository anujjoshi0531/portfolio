import { pages } from "@/lib/utils";
import { Metadata } from "next";
import "@/styles/notion.css";
import "@/styles/prism-theme.css";

export const metadata: Metadata = {
  title: pages.blog.title,
  description: pages.blog.description,
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
import { pages } from "@/lib/utils";
import { Metadata } from "next";

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
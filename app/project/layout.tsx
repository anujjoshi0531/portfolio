import { pages } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pages.project.title,
  description: pages.project.description,
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

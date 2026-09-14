import { Metadata } from "next";
import { getMetadata } from "@/lib/config/metadata";

export const metadata: Metadata = getMetadata("project");

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

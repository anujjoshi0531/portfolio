import { Metadata } from "next";
import { getMetadata } from "@/lib";

export const metadata: Metadata = getMetadata("about");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

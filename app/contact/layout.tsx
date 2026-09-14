import { Metadata } from "next";
import { getMetadata } from "@/lib/config/metadata";

export const metadata: Metadata = getMetadata("contact");

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

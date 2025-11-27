import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ms from "ms";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo,
  }: {
    withAgo?: boolean;
  } = {}
): string => {
  if (!timestamp) return "Never";
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 1000) {
    return "Just now";
  } else if (diff > 82800000) {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return `${ms(diff)}${withAgo ? " ago" : ""}`;
};

export const extractPlainText = (richText: any): string =>
  Array.isArray(richText) ? richText.map((item) => item.plain_text || "").join("") : ""

export const hexToHSL = (hex: string): string => {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
};
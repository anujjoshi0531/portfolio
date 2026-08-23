import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const numberFormatter = new Intl.NumberFormat();

export const timeAgo = (
  timestamp: Date | string | number | null
): string => {
  if (!timestamp) return "Never";

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid date";

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (Math.abs(seconds) < 60) return rtf.format(-Math.floor(seconds), "second");
  const minutes = Math.floor(seconds / 60);
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, "minute");
  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.floor(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, "day");
  const months = Math.floor(days / 30);
  if (Math.abs(months) < 12) return rtf.format(-months, "month");
  const years = Math.floor(days / 365);
  return rtf.format(-years, "year");
};

export const hexToHSL = (hex: string): string => {
  hex = hex.replace(/^#/, "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
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

export const formatDate = (dateInput: Date | string | number | null): string => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "Invalid date";
  return longDateFormatter.format(date);
};

export function getUserId() {
  if (typeof window === "undefined") return null;

  let userId = localStorage.getItem("portfolio-user-id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("portfolio-user-id", userId);
  }

  return userId;
}

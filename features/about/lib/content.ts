import { cache } from "react";
import { readCollection } from "@/lib/content/collections";

export const getExperiences = cache(() => {
  const items = readCollection("experience");
  return items.sort((a, b) => (b.end || b.start || "").localeCompare(a.end || a.start || ""));
});

export const getEducations = cache(() => {
  const items = readCollection("education");
  return items.sort((a, b) => (b.end || b.start || "").localeCompare(a.end || a.start || ""));
});

export const getTestimonials = cache(() => {
  const items = readCollection("testimonials");
  return items.sort((a, b) => (b.date || b.created || "").localeCompare(a.date || a.created || ""));
});

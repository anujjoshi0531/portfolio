import { cache } from "react";
import { readCollection } from "@/lib/content/collections";
import type { ContentItem } from "@/lib/content/types";

export function toProject(item: ContentItem): Project {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    category: item.category,
    status: item.status,
    start: item.start,
    end: item.end,
    tags: item.tags,
    skills: item.skills,
    thumbnail: item.thumbnail,
    github: item.github,
    url: item.url,
    likes: item.likes,
    views: item.views,
    content: item.content,
  };
}

export const getProjects = cache((): Project[] => {
  const items = readCollection("projects");
  return items
    .sort((a, b) => (b.end || b.start || "").localeCompare(a.end || a.start || ""))
    .map(toProject);
});

export const getProjectBySlug = cache((slug: string): Project | null => {
  const projects = getProjects();
  return projects.find((project) => project.slug === slug || project.id === slug) || null;
});

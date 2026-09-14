import { cache } from "react";
import { readCollection } from "@/lib/content/collections";
import type { ContentItem } from "@/lib/content/types";

export function toBlogPost(item: ContentItem): BlogPost {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    author: item.frontmatter.author ? String(item.frontmatter.author) : undefined,
    category: item.category,
    tags: item.tags,
    thumbnail: item.thumbnail,
    published: item.published ?? item.date,
    created: item.created,
    updated: item.updated,
    likes: item.likes,
    views: item.views,
    content: item.content,
  };
}

export const getBlogs = cache((): BlogPost[] => {
  const items = readCollection("blog");
  return items
    .sort((a, b) =>
      (b.published || b.date || b.created || "").localeCompare(
        a.published || a.date || a.created || ""
      )
    )
    .map(toBlogPost);
});

export const getBlogBySlug = cache((slug: string): BlogPost | null => {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug || blog.id === slug) || null;
});

export const getBlogFilters = cache(async () => {
  const blogs = getBlogs();
  const tagSet = new Set<string>();
  const categorySet = new Set<string>();

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tagSet.add(tag));
    if (blog.category) categorySet.add(blog.category);
  });

  return {
    tags: Array.from(tagSet),
    categories: Array.from(categorySet),
  };
});

export const searchBlogs = cache(
  async ({
    query,
    tags,
    category,
    limit = 10,
    page = 1,
  }: {
    query?: string;
    tags?: string[];
    category?: string;
    limit?: number;
    page?: number;
  }): Promise<{ results: BlogPost[]; total: number; has_more: boolean }> => {
    let blogs = getBlogs();

    if (category) {
      blogs = blogs.filter((blog) => blog.category?.toLowerCase() === category.toLowerCase());
    }

    if (tags && tags.length > 0) {
      blogs = blogs.filter((blog) => tags.some((tag) => blog.tags.includes(tag)));
    }

    if (query) {
      const searchQuery = query.toLowerCase();
      blogs = blogs.filter(
        (blog) =>
          (blog.title || "").toLowerCase().includes(searchQuery) ||
          (blog.description || "").toLowerCase().includes(searchQuery) ||
          (blog.content || "").toLowerCase().includes(searchQuery)
      );
    }

    const total = blogs.length;
    const startIndex = (page - 1) * limit;
    const pageResults = blogs.slice(startIndex, startIndex + limit);

    return {
      results: pageResults,
      total,
      has_more: startIndex + limit < total,
    };
  }
);

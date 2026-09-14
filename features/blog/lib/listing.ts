import { cache } from "react";
import { getBlogs } from "@/features/blog/lib/content";
import { getBlogPlaylists } from "@/features/blog/playlists/lib/playlists";
import { getAlgorithmCatalog } from "@/features/algorithms/lib/catalog";
import type { Difficulty } from "@/features/algorithms/lib/types";

export type BlogListingKind = "post" | "playlist" | "visualizer";
export type BlogsFilter = "all" | "blogs" | "playlists" | "visualizers";

export interface BlogListingItem {
  id: string;
  kind: BlogListingKind;
  href: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  thumbnail?: string;
  published?: string;
  created?: string;
  updated?: string;
  views?: number;
  itemCount?: number;
  content?: string;
  difficulty?: Difficulty;
}

interface SearchBlogListingsOptions {
  query?: string;
  tags?: string[];
  category?: string;
  blogsFilter?: BlogsFilter;
  sortBy?: string;
  limit?: number;
  page?: number;
  difficulty?: string;
  publishedFrom?: string;
  publishedTo?: string;
}

export const getVisualizerListingItems = cache((): BlogListingItem[] =>
  getAlgorithmCatalog().map((algorithm) => ({
    id: algorithm.id,
    kind: "visualizer",
    href: `/algorithms/${algorithm.id}`,
    slug: algorithm.id,
    title: algorithm.name,
    description: algorithm.description || "Step through this interactive algorithm visualizer.",
    category: algorithm.category,
    tags: [algorithm.category],
    difficulty: algorithm.difficulty,
  }))
);

function toPostListingItem(blog: BlogPost): BlogListingItem {
  return {
    id: blog.id,
    kind: "post",
    href: `/blog/${blog.slug || blog.id}`,
    slug: blog.slug || blog.id,
    title: blog.title,
    description: blog.description,
    category: blog.category,
    tags: blog.tags,
    thumbnail: blog.thumbnail,
    published: blog.published,
    created: blog.created,
    updated: blog.updated,
    views: blog.views,
    content: blog.content,
  };
}

export function toPlaylistListingItem(playlist: ReturnType<typeof getBlogPlaylists>[number]): BlogListingItem {
  const articles = playlist.sections.flatMap((section) => section.items);
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags)));
  const categories = Array.from(
    new Set(articles.map((article) => article.category).filter(Boolean))
  );

  return {
    id: playlist.id,
    kind: "playlist",
    href: `/blog/playlists/${playlist.id}`,
    slug: playlist.id,
    title: playlist.title,
    description: playlist.description,
    category: categories.length === 1 ? categories[0] : "Playlist",
    tags: tags.slice(0, 4),
    thumbnail: "/icon.webp",
    itemCount: playlist.itemCount,
    content: [playlist.summary, ...articles.map((article) => article.title)].filter(Boolean).join(" "),
  };
}

export const getBlogPlaylistListingItems = cache((): BlogListingItem[] =>
  getBlogPlaylists().map(toPlaylistListingItem)
);

function normalizeBlogsFilter(value?: string): BlogsFilter {
  return value === "blogs" || value === "playlists" || value === "visualizers" ? value : "all";
}

function compareDate(a?: string, b?: string) {
  return (a || "").localeCompare(b || "");
}

function sortListings(items: BlogListingItem[], sortBy = "published-descending") {
  return [...items].sort((a, b) => {
    // Undated learning resources follow dated articles for either date direction.
    if (sortBy.startsWith("published") || sortBy.startsWith("updated")) {
      const dateA = sortBy.startsWith("updated") ? a.updated : a.published || a.created;
      const dateB = sortBy.startsWith("updated") ? b.updated : b.published || b.created;
      if (!dateA && !dateB) return a.title.localeCompare(b.title);
      if (!dateA) return 1;
      if (!dateB) return -1;
    }
    switch (sortBy) {
      case "published-ascending":
        return compareDate(a.published || a.created, b.published || b.created);
      case "name-ascending":
        return a.title.localeCompare(b.title);
      case "name-descending":
        return b.title.localeCompare(a.title);
      case "updated-ascending":
        return compareDate(a.updated, b.updated);
      case "updated-descending":
        return compareDate(b.updated, a.updated);
      case "published-descending":
      default:
        return compareDate(b.published || b.created, a.published || a.created);
    }
  });
}

export const searchBlogListings = cache(
  async ({
    query,
    tags,
    category,
    blogsFilter = "all",
    sortBy,
    limit = 10,
    page = 1,
    difficulty,
    publishedFrom,
    publishedTo,
  }: SearchBlogListingsOptions): Promise<{
    results: BlogListingItem[];
    total: number;
    has_more: boolean;
  }> => {
    const normalizedFilter = normalizeBlogsFilter(blogsFilter);
    const posts = normalizedFilter === "all" || normalizedFilter === "blogs" ? getBlogs().map(toPostListingItem) : [];
    const playlists =
      normalizedFilter === "all" || normalizedFilter === "playlists" ? getBlogPlaylists().map(toPlaylistListingItem) : [];
    const visualizers = normalizedFilter === "all" || normalizedFilter === "visualizers" ? getVisualizerListingItems() : [];

    let items = [...posts, ...playlists, ...visualizers];

    if (normalizedFilter === "visualizers" && difficulty) {
      items = items.filter((item) => item.difficulty === difficulty);
    }
    if (normalizedFilter === "blogs" && (publishedFrom || publishedTo)) {
      items = items.filter((item) => {
        const date = (item.published || item.created || "").slice(0, 10);
        return !!date && (!publishedFrom || date >= publishedFrom) && (!publishedTo || date <= publishedTo);
      });
    }

    if (category) {
      items = items.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
    }

    if (tags && tags.length > 0) {
      items = items.filter((item) => tags.some((tag) => item.tags.includes(tag)));
    }

    if (query) {
      const searchQuery = query.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.category?.toLowerCase().includes(searchQuery) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
          (item.content || "").toLowerCase().includes(searchQuery)
      );
    }

    const sortedItems = sortListings(items, sortBy || ((normalizedFilter === "visualizers" || normalizedFilter === "playlists") ? "name-ascending" : undefined));
    const total = sortedItems.length;
    const safeLimit = Number.isFinite(limit) ? Math.min(60, Math.max(1, Math.floor(limit))) : 9;
    const totalPages = Math.max(1, Math.ceil(total / safeLimit));
    const safePage = Number.isFinite(page) ? Math.min(totalPages, Math.max(1, Math.floor(page))) : 1;
    const startIndex = (safePage - 1) * safeLimit;
    const pageResults = sortedItems.slice(startIndex, startIndex + safeLimit);

    return {
      results: pageResults,
      total,
      has_more: startIndex + safeLimit < total,
    };
  }
);

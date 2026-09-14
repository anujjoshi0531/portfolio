import { cache } from "react";
import { getBlogs } from "@/features/blog/lib/content";
import { getBlogPlaylists } from "@/features/blog/playlists/lib/playlists";

export type BlogListingKind = "post" | "playlist";
export type BlogsFilter = "all" | "blogs" | "playlists";

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
}

interface SearchBlogListingsOptions {
  query?: string;
  tags?: string[];
  category?: string;
  blogsFilter?: BlogsFilter;
  sortBy?: string;
  limit?: number;
  page?: number;
}

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
  return value === "blogs" || value === "playlists" ? value : "all";
}

function compareDate(a?: string, b?: string) {
  return (a || "").localeCompare(b || "");
}

function sortListings(items: BlogListingItem[], sortBy = "published-descending") {
  return [...items].sort((a, b) => {
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
  }: SearchBlogListingsOptions): Promise<{
    results: BlogListingItem[];
    total: number;
    has_more: boolean;
  }> => {
    const normalizedFilter = normalizeBlogsFilter(blogsFilter);
    const posts = normalizedFilter === "playlists" ? [] : getBlogs().map(toPostListingItem);
    const playlists =
      normalizedFilter === "blogs" ? [] : getBlogPlaylists().map(toPlaylistListingItem);

    let items = [...posts, ...playlists];

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
          (item.content || "").toLowerCase().includes(searchQuery)
      );
    }

    const sortedItems = sortListings(items, sortBy);
    const total = sortedItems.length;
    const startIndex = (page - 1) * limit;
    const pageResults = sortedItems.slice(startIndex, startIndex + limit);

    return {
      results: pageResults,
      total,
      has_more: startIndex + limit < total,
    };
  }
);

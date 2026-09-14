import fs from "fs";
import path from "path";
import { cache } from "react";
import { parseFrontmatter } from "@/lib/content/frontmatter";
import { getContentDirectory } from "@/lib/content/root";
import { getBlogs } from "@/features/blog/lib/content";
import type {
  BlogPlaylist,
  BlogPlaylistArticle,
  BlogPlaylistContext,
  BlogPlaylistManifest,
  BlogPlaylistSectionManifest,
} from "@/features/blog/playlists/types";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizePlaylistManifest(raw: unknown, source: string): BlogPlaylistManifest {
  if (!raw || typeof raw !== "object") {
    throw new Error(`Blog playlist manifest ${source} must be an object.`);
  }

  const manifest = raw as Record<string, unknown>;
  const sections = manifest.sections;

  if (
    typeof manifest.id !== "string" ||
    typeof manifest.title !== "string" ||
    typeof manifest.description !== "string" ||
    !Array.isArray(sections)
  ) {
    throw new Error(
      `Blog playlist manifest ${source} is missing id, title, description, or sections.`
    );
  }

  return {
    id: manifest.id,
    title: manifest.title,
    description: manifest.description,
    summary: typeof manifest.summary === "string" ? manifest.summary : undefined,
    sections: sections.map((section, index): BlogPlaylistSectionManifest => {
      if (!section || typeof section !== "object") {
        throw new Error(`Blog playlist manifest ${source} has an invalid section at index ${index}.`);
      }

      const sectionData = section as Record<string, unknown>;

      if (typeof sectionData.title !== "string" || !isStringArray(sectionData.items)) {
        throw new Error(`Blog playlist manifest ${source} has an invalid section at index ${index}.`);
      }

      return {
        title: sectionData.title,
        items: sectionData.items,
      };
    }),
  };
}

function readPlaylistManifest(filePath: string): BlogPlaylistManifest {
  const raw = fs.readFileSync(filePath, "utf-8");
  return normalizePlaylistManifest(parseFrontmatter(raw).frontmatter, path.basename(filePath));
}

function getBlogArticleMap() {
  return new Map(
    getBlogs().map((blog): [string, BlogPlaylistArticle] => [
      blog.slug,
      {
        slug: blog.slug,
        title: blog.title,
        description: blog.description,
        href: `/blog/${blog.slug}`,
        category: blog.category,
        tags: blog.tags,
      },
    ])
  );
}

export const getBlogPlaylistManifests = cache((): BlogPlaylistManifest[] => {
  const playlistDirectory = path.join(getContentDirectory(), "playlists");
  if (!fs.existsSync(playlistDirectory)) return [];

  return fs
    .readdirSync(playlistDirectory)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => readPlaylistManifest(path.join(playlistDirectory, file)));
});

function resolvePlaylist(
  manifest: BlogPlaylistManifest,
  articleMap: Map<string, BlogPlaylistArticle>
): BlogPlaylist {
  const missing: string[] = [];
  const sections = manifest.sections.map((section) => ({
    title: section.title,
    items: section.items.flatMap((slug) => {
      const article = articleMap.get(slug);
      if (!article) {
        missing.push(slug);
        return [];
      }
      return [article];
    }),
  }));

  if (missing.length > 0 && process.env.NODE_ENV !== "production") {
    throw new Error(`Blog playlist ${manifest.id} references missing posts: ${missing.join(", ")}`);
  }

  return {
    id: manifest.id,
    title: manifest.title,
    description: manifest.description,
    summary: manifest.summary,
    sections,
    itemCount: sections.reduce((count, section) => count + section.items.length, 0),
  };
}

export const getBlogPlaylists = cache((): BlogPlaylist[] => {
  const articleMap = getBlogArticleMap();
  return getBlogPlaylistManifests().map((manifest) => resolvePlaylist(manifest, articleMap));
});

export const getBlogPlaylistBySlug = cache((slug: string): BlogPlaylist | null => {
  return getBlogPlaylists().find((playlist) => playlist.id === slug) ?? null;
});

export const getBlogPlaylistContexts = cache((slug: string): BlogPlaylistContext[] => {
  return getBlogPlaylists().flatMap((playlist) => {
    const flattened = playlist.sections.flatMap((section) => section.items);
    const index = flattened.findIndex((item) => item.slug === slug);

    if (index === -1) return [];

    return [
      {
        playlist: {
          id: playlist.id,
          title: playlist.title,
          description: playlist.description,
          itemCount: playlist.itemCount,
        },
        previous: flattened[index - 1],
        current: flattened[index],
        next: flattened[index + 1],
        position: index + 1,
      },
    ];
  });
});

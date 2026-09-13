import fs from "fs";
import path from "path";
import { cache } from "react";

export interface Frontmatter {
  title?: string;
  name?: string;
  description?: string;
  category?: string;
  status?: string;
  start?: string;
  end?: string;
  date?: string;
  published?: string;
  tags?: string[];
  skills?: string[];
  url?: string;
  github?: string;
  thumbnail?: string;
  avatar?: string;
  company?: string;
  position?: string;
  institution?: string;
  organization?: string;
  location?: string;
  grade?: string;
  type?: string;
  slug?: string;
  likes?: number;
  views?: number;
  created?: string;
  updated?: string;
  [key: string]: unknown;
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  status?: string;
  start?: string;
  end?: string;
  date?: string;
  published?: string;
  tags: string[];
  skills: string[];
  url?: string;
  github?: string;
  thumbnail?: string;
  avatar?: string;
  company?: string;
  position?: string;
  institution?: string;
  organization?: string;
  location?: string;
  grade?: string;
  type?: string;
  likes: number;
  views: number;
  created?: string;
  updated?: string;
  content: string;
  frontmatter: Frontmatter;
}

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

const getContentDirectory = () => {
  const primaryPath = path.join(process.cwd(), "content");
  if (fs.existsSync(primaryPath)) {
    try {
      const files = fs.readdirSync(primaryPath);
      if (files.length > 0) return primaryPath;
    } catch {
      // Fallback if readdirSync fails
    }
  }
  const secondaryPath = path.resolve(process.cwd(), "../portfolio-content");
  if (fs.existsSync(secondaryPath)) {
    return secondaryPath;
  }
  return primaryPath;
};

/**
 * Simple zero-dependency YAML Frontmatter parser.
 */
export function parseFrontmatter(fileContent: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const frontmatter: Frontmatter = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentKey) {
      const val = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      (frontmatter[currentKey] as string[]).push(val);
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let rawVal = line.slice(colonIdx + 1).trim();

      if (rawVal === "") {
        currentKey = key;
        frontmatter[key] = [];
      } else {
        currentKey = null;
        if ((rawVal.startsWith('"') && rawVal.endsWith('"')) || (rawVal.startsWith("'") && rawVal.endsWith("'"))) {
          rawVal = rawVal.slice(1, -1);
        }
        if (rawVal === "true") frontmatter[key] = true;
        else if (rawVal === "false") frontmatter[key] = false;
        else if (!isNaN(Number(rawVal)) && rawVal !== "") frontmatter[key] = Number(rawVal);
        else frontmatter[key] = rawVal;
      }
    }
  }

  return { frontmatter, content };
}

function normalizeAssetPath(assetPath?: string): string | undefined {
  if (!assetPath) return undefined;
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) return assetPath;
  if (assetPath.startsWith("_assets/")) return "/" + assetPath;
  if (assetPath.startsWith("/_assets/")) return assetPath;
  return "/" + assetPath;
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  if (!content) return "";
  
  const text = content
    .replace(/^>\s*\[!.*?\]\s*.*$/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/^#+\s+.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/^\|.*\|$/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length > maxLength) {
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
  }

  return text;
}

export function readCollection(collectionName: string): ContentItem[] {
  const dir = path.join(getContentDirectory(), collectionName);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const items: ContentItem[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(rawContent);

    const slug = frontmatter.slug || file.replace(/\.md$/, "");
    const title = frontmatter.title || frontmatter.name || slug;
    const description = (frontmatter.description ? String(frontmatter.description) : "") || extractExcerpt(content);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const skills = Array.isArray(frontmatter.skills) ? frontmatter.skills : [];

    items.push({
      id: slug,
      slug,
      title,
      description,
      category: frontmatter.category,
      status: frontmatter.status,
      start: frontmatter.start ? String(frontmatter.start) : undefined,
      end: frontmatter.end ? String(frontmatter.end) : undefined,
      date: frontmatter.date ? String(frontmatter.date) : frontmatter.published ? String(frontmatter.published) : undefined,
      published: frontmatter.published ? String(frontmatter.published) : undefined,
      tags,
      skills,
      url: frontmatter.url,
      github: frontmatter.github,
      thumbnail: normalizeAssetPath(frontmatter.thumbnail),
      avatar: normalizeAssetPath(frontmatter.avatar),
      company: frontmatter.company,
      position: frontmatter.position,
      institution: frontmatter.institution,
      organization: frontmatter.organization,
      location: frontmatter.location,
      grade: frontmatter.grade,
      type: frontmatter.type,
      likes: typeof frontmatter.likes === "number" ? frontmatter.likes : 0,
      views: typeof frontmatter.views === "number" ? frontmatter.views : 0,
      created: frontmatter.created ? String(frontmatter.created) : undefined,
      updated: frontmatter.updated ? String(frontmatter.updated) : undefined,
      content,
      frontmatter,
    });
  }

  return items;
}

export const getProjects = cache((): Project[] => {
  const items = readCollection("projects");
  return items
    .sort((a, b) => (b.end || b.start || "").localeCompare(a.end || a.start || ""))
    .map(toProject);
});

export const getBlogs = cache((): BlogPost[] => {
  const items = readCollection("blog");
  return items
    .sort((a, b) => (b.published || b.date || b.created || "").localeCompare(a.published || a.date || a.created || ""))
    .map(toBlogPost);
});

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

export const getBlogBySlug = cache((slug: string): BlogPost | null => {
  const blogs = getBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug) || null;
});

export const getProjectBySlug = cache((slug: string): Project | null => {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug || p.id === slug) || null;
});

export const getBlogFilters = cache(async () => {
  const blogs = getBlogs();
  const tagSet = new Set<string>();
  const categorySet = new Set<string>();

  blogs.forEach((b) => {
    b.tags.forEach((t) => tagSet.add(t));
    if (b.category) categorySet.add(b.category);
  });

  return {
    tags: Array.from(tagSet),
    categories: Array.from(categorySet),
  };
});

export const searchBlogs = cache(async ({
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
    blogs = blogs.filter((b) => b.category?.toLowerCase() === category.toLowerCase());
  }

  if (tags && tags.length > 0) {
    blogs = blogs.filter((b) => tags.some((t) => b.tags.includes(t)));
  }

  if (query) {
    const q = query.toLowerCase();
    blogs = blogs.filter(
      (b) =>
        (b.title || "").toLowerCase().includes(q) ||
        (b.description || "").toLowerCase().includes(q) ||
        (b.content || "").toLowerCase().includes(q)
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
});

/* ------------------------------------------------------------------ */
/* Quartz Digital Garden Graph & Backlinks Data Access                */
/* ------------------------------------------------------------------ */

export interface GraphNode {
  id: string;
  title: string;
  category?: string;
  tags: string[];
  url: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface BacklinkItem {
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags: string[];
  published?: string;
}

function extractOutgoingLinksFromContent(content: string): string[] {
  const links: string[] = [];
  const wikiRegex = /\[\[([^\]|#]+)?(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g;
  let match: RegExpExecArray | null;

  while ((match = wikiRegex.exec(content)) !== null) {
    if (match[1]) {
      const slug = match[1]
        .trim()
        .toLowerCase()
        .replace(/\.md$/, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (slug) links.push(slug);
    }
  }

  const stdLinkRegex = /\[[^\]]+\]\(\/blog\/([a-zA-Z0-9_-]+)[^)]*\)/g;
  while ((match = stdLinkRegex.exec(content)) !== null) {
    if (match[1]) {
      links.push(match[1].toLowerCase());
    }
  }

  return Array.from(new Set(links));
}

export const getGraphData = cache((): GraphData => {
  const blogs = getBlogs() || [];
  const nodes: GraphNode[] = blogs.map((b) => ({
    id: b.slug,
    title: b.title || b.slug || "Untitled",
    category: b.category,
    tags: Array.isArray(b.tags) ? b.tags : [],
    url: `/blog/${b.slug}`,
  }));

  const nodeMap = new Set(nodes.map((n) => n.id));
  const linkSet = new Set<string>();
  const links: GraphLink[] = [];

  // 1. Wikilink-based connections (explicit references)
  for (const b of blogs) {
    const outgoing = extractOutgoingLinksFromContent(b.content);
    for (const target of outgoing) {
      if (nodeMap.has(target) && target !== b.slug) {
        const linkKey = [b.slug, target].sort().join("<->");
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey);
          links.push({ source: b.slug, target });
        }
      }
    }
  }

  // 2. Tag-based connections (posts sharing ≥1 tag)
  for (let i = 0; i < blogs.length; i++) {
    const a = blogs[i];
    const aTags = new Set(Array.isArray(a.tags) ? a.tags.map((t) => t.toLowerCase()) : []);
    if (aTags.size === 0) continue;

    for (let j = i + 1; j < blogs.length; j++) {
      const b = blogs[j];
      const bTags = Array.isArray(b.tags) ? b.tags : [];
      const hasSharedTag = bTags.some((t) => aTags.has(t.toLowerCase()));
      if (hasSharedTag) {
        const linkKey = [a.slug, b.slug].sort().join("<->");
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey);
          links.push({ source: a.slug, target: b.slug });
        }
      }
    }
  }

  // 3. Category-based connections (posts in same category)
  for (let i = 0; i < blogs.length; i++) {
    const a = blogs[i];
    if (!a.category) continue;

    for (let j = i + 1; j < blogs.length; j++) {
      const b = blogs[j];
      if (a.category.toLowerCase() === (b.category || "").toLowerCase()) {
        const linkKey = [a.slug, b.slug].sort().join("<->");
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey);
          links.push({ source: a.slug, target: b.slug });
        }
      }
    }
  }

  return { nodes, links };
});


export const getBacklinks = cache((targetSlug: string): BacklinkItem[] => {
  const blogs = getBlogs();
  const backlinks: BacklinkItem[] = [];

  for (const b of blogs) {
    if (b.slug === targetSlug) continue;
    const outgoing = extractOutgoingLinksFromContent(b.content);
    if (outgoing.includes(targetSlug.toLowerCase())) {
      backlinks.push({
        slug: b.slug,
        title: b.title,
        description: b.description,
        category: b.category,
        tags: b.tags,
        published: b.published || b.created,
      });
    }
  }

  return backlinks;
});

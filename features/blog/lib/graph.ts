import { cache } from "react";
import { getBlogs } from "@/features/blog/lib/content";

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
  const nodes: GraphNode[] = blogs.map((blog) => ({
    id: blog.slug,
    title: blog.title || blog.slug || "Untitled",
    category: blog.category,
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    url: `/blog/${blog.slug}`,
  }));

  const nodeMap = new Set(nodes.map((node) => node.id));
  const linkSet = new Set<string>();
  const links: GraphLink[] = [];

  for (const blog of blogs) {
    const outgoing = extractOutgoingLinksFromContent(blog.content);
    for (const target of outgoing) {
      if (nodeMap.has(target) && target !== blog.slug) {
        const linkKey = [blog.slug, target].sort().join("<->");
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey);
          links.push({ source: blog.slug, target });
        }
      }
    }
  }

  for (let i = 0; i < blogs.length; i++) {
    const a = blogs[i];
    const aTags = new Set(Array.isArray(a.tags) ? a.tags.map((tag) => tag.toLowerCase()) : []);
    if (aTags.size === 0) continue;

    for (let j = i + 1; j < blogs.length; j++) {
      const b = blogs[j];
      const bTags = Array.isArray(b.tags) ? b.tags : [];
      const hasSharedTag = bTags.some((tag) => aTags.has(tag.toLowerCase()));
      if (hasSharedTag) {
        const linkKey = [a.slug, b.slug].sort().join("<->");
        if (!linkSet.has(linkKey)) {
          linkSet.add(linkKey);
          links.push({ source: a.slug, target: b.slug });
        }
      }
    }
  }

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

  for (const blog of blogs) {
    if (blog.slug === targetSlug) continue;
    const outgoing = extractOutgoingLinksFromContent(blog.content);
    if (outgoing.includes(targetSlug.toLowerCase())) {
      backlinks.push({
        slug: blog.slug,
        title: blog.title,
        description: blog.description,
        category: blog.category,
        tags: blog.tags,
        published: blog.published || blog.created,
      });
    }
  }

  return backlinks;
});

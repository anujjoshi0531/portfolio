import fs from "fs";
import path from "path";
import { getContentDirectory } from "@/lib/content/root";
import { parseFrontmatter } from "@/lib/content/frontmatter";
import { normalizeAssetPath, normalizeFrontmatterArray, normalizeFrontmatterString } from "@/lib/content/normalize";
import { extractExcerpt } from "@/lib/content/search";
import type { ContentItem } from "@/lib/content/types";

export function readCollection(collectionName: string): ContentItem[] {
  const dir = path.join(getContentDirectory(), collectionName);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
  const items: ContentItem[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(rawContent);

    const slug = frontmatter.slug || file.replace(/\.md$/, "");
    const title = frontmatter.title || frontmatter.name || slug;
    const description = (frontmatter.description ? String(frontmatter.description) : "") || extractExcerpt(content);

    items.push({
      id: slug,
      slug,
      title,
      description,
      category: frontmatter.category,
      status: frontmatter.status,
      start: normalizeFrontmatterString(frontmatter.start),
      end: normalizeFrontmatterString(frontmatter.end),
      date: frontmatter.date
        ? String(frontmatter.date)
        : frontmatter.published
          ? String(frontmatter.published)
          : undefined,
      published: normalizeFrontmatterString(frontmatter.published),
      tags: normalizeFrontmatterArray(frontmatter.tags),
      skills: normalizeFrontmatterArray(frontmatter.skills),
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
      created: normalizeFrontmatterString(frontmatter.created),
      updated: normalizeFrontmatterString(frontmatter.updated),
      content,
      frontmatter,
    });
  }

  return items;
}

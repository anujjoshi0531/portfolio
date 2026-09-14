import type { Image, PhrasingContent, Root, Text } from "mdast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";
import type { MarkdownFileData } from "@/lib/content/markdown/types";

const WIKILINK_EMBED = /!\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/g;
const WIKILINK_REGEX = /\[\[([^\]|#]+)?(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;

function resolveAssetPath(target: string): string {
  const value = target.trim();
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  const normalized = value.replace(/^\.?\//, "");
  if (normalized.startsWith("_assets/")) return `/${normalized}`;
  return `/_assets/${normalized}`;
}

function slugifyWikiTarget(target?: string): string {
  if (!target) return "";
  return target
    .trim()
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function remarkWikiEmbeds(): Transformer<Root> {
  return (tree) => {
    visit(tree, "text", (node: Text, index: number | undefined, parent: unknown) => {
      if (!parent || index === undefined) return;

      WIKILINK_EMBED.lastIndex = 0;
      if (!WIKILINK_EMBED.test(node.value)) return;

      WIKILINK_EMBED.lastIndex = 0;
      const replacement: PhrasingContent[] = [];
      const value = node.value;
      let last = 0;
      let match: RegExpExecArray | null;
      while ((match = WIKILINK_EMBED.exec(value)) !== null) {
        if (match.index > last) replacement.push({ type: "text", value: value.slice(last, match.index) });
        const target = match[1];
        const image: Image = {
          type: "image",
          title: null,
          url: resolveAssetPath(target),
          alt: target.trim().replace(/\.[a-zA-Z0-9]+$/, ""),
        };
        replacement.push(image);
        last = match.index + match[0].length;
      }
      WIKILINK_EMBED.lastIndex = 0;
      if (last < value.length) replacement.push({ type: "text", value: value.slice(last) });

      const parentNode = parent as { children: PhrasingContent[] };
      parentNode.children.splice(index, 1, ...replacement);
      return index + replacement.length;
    });
  };
}

export function remarkWikiLinks(): Transformer<Root> {
  return (tree, file) => {
    const outgoingLinks: string[] = [];

    visit(tree, "text", (node: Text, index: number | undefined, parent: unknown) => {
      if (!parent || index === undefined) return;

      WIKILINK_REGEX.lastIndex = 0;
      if (!WIKILINK_REGEX.test(node.value)) return;

      WIKILINK_REGEX.lastIndex = 0;
      const replacement: PhrasingContent[] = [];
      const value = node.value;
      let last = 0;
      let match: RegExpExecArray | null;

      while ((match = WIKILINK_REGEX.exec(value)) !== null) {
        if (match.index > 0 && value[match.index - 1] === "!") {
          continue;
        }

        if (match.index > last) {
          replacement.push({ type: "text", value: value.slice(last, match.index) });
        }

        const rawTarget = match[1] ?? "";
        const rawHeading = match[2] ?? "";
        const rawAlias = match[3] ?? "";

        const targetSlug = slugifyWikiTarget(rawTarget);
        if (targetSlug) {
          outgoingLinks.push(targetSlug);
        }

        const headingSlug = rawHeading ? "#" + slugifyWikiTarget(rawHeading) : "";
        const href = targetSlug ? `/blog/${targetSlug}${headingSlug}` : headingSlug || "#";
        const displayText = rawAlias.trim() || rawHeading.trim() || rawTarget.trim() || targetSlug;

        replacement.push({
          type: "link",
          url: href,
          data: {
            hProperties: {
              className: ["internal-link", "quartz-wikilink"],
              "data-slug": targetSlug,
              "data-heading": rawHeading,
            },
          },
          children: [{ type: "text", value: displayText }],
        });

        last = match.index + match[0].length;
      }

      WIKILINK_REGEX.lastIndex = 0;
      if (replacement.length > 0) {
        if (last < value.length) replacement.push({ type: "text", value: value.slice(last) });
        const parentNode = parent as { children: PhrasingContent[] };
        parentNode.children.splice(index, 1, ...replacement);
        return index + replacement.length;
      }
    });

    const fileDataRef = file.data as MarkdownFileData;
    fileDataRef.outgoingLinks = outgoingLinks;
  };
}

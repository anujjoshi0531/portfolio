import { unified } from "unified";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

import type { Blockquote, Image, Paragraph, PhrasingContent, Root, Text } from "mdast";
import type { Element, Root as HastRoot } from "hast";
import type { VFile } from "vfile";

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

const READING_WPM = 200;

function fileData(file: VFile): MarkdownFileData {
  return file.data as MarkdownFileData;
}

/* ------------------------------------------------------------------ */
/* Custom remark plugin: Obsidian-style callouts (> [!info] Title)    */
/* ------------------------------------------------------------------ */

const CALLOUT_MARKER = /^\[!([A-Za-z]+)\]([-+]?)\s*/;

export function remarkCallouts(): Transformer<Root> {
  return (tree) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      transformCallout(node);
    });
  };
}

function transformCallout(node: Blockquote) {
  const first = node.children[0];
  if (!first || first.type !== "paragraph") return;

  const firstChild = first.children[0];
  if (!firstChild || firstChild.type !== "text") return;

  const match = CALLOUT_MARKER.exec(firstChild.value);
  if (!match) return;

  const kind = match[1].toLowerCase();
  const afterMarker = firstChild.value.slice(match[0].length);
  const newlineIdx = afterMarker.indexOf("\n");
  const titleText = (newlineIdx === -1 ? afterMarker : afterMarker.slice(0, newlineIdx)).trim();
  const bodyText = newlineIdx === -1 ? "" : afterMarker.slice(newlineIdx + 1).replace(/^\s+/, "");

  const newChildren: Paragraph[] = [];

  if (titleText) {
    newChildren.push({
      type: "paragraph",
      data: { hName: "p", hProperties: { className: ["callout-title"] } },
      children: [{ type: "text", value: titleText }],
    });
  }

  const restInline = first.children.slice(1);
  const hasBody =
    bodyText.length > 0 || restInline.some((c) => c.type !== "break" && !(c.type === "text" && !c.value.trim()));

  if (hasBody) {
    let bodyInline: PhrasingContent[] = [];
    if (bodyText) bodyInline.push({ type: "text", value: bodyText });
    bodyInline = bodyInline.concat(restInline);
    while (
      bodyInline.length &&
      (bodyInline[0].type === "break" || (bodyInline[0].type === "text" && !bodyInline[0].value.trim()))
    ) {
      bodyInline = bodyInline.slice(1);
    }
    if (bodyInline.length) {
      newChildren.push({ type: "paragraph", children: bodyInline });
    }
  }

  node.children = [...newChildren, ...node.children.slice(1)];
  node.data = {
    hName: "div",
    hProperties: { className: ["callout", `callout-${kind}`] },
  };
}

/* ------------------------------------------------------------------ */
/* Custom remark plugin: wikilink embeds (![[image.png]])             */
/* ------------------------------------------------------------------ */

const WIKILINK_EMBED = /!\[\[([^\]|]+?)(?:\|[^\]]*)?\]\]/g;

function resolveAssetPath(target: string): string {
  const t = target.trim();
  if (/^(https?:)?\/\//.test(t) || t.startsWith("/")) return t;
  const normalized = t.replace(/^\.?\//, "");
  if (normalized.startsWith("_assets/")) return `/${normalized}`;
  return `/_assets/${normalized}`;
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

/* ------------------------------------------------------------------ */
/* Custom remark plugin: Obsidian Wikilinks ([[slug|alias]])          */
/* ------------------------------------------------------------------ */

const WIKILINK_REGEX = /\[\[([^\]|#]+)?(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;

function slugifyWikiTarget(target?: string): string {
  if (!target) return "";
  return target
    .trim()
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function remarkWikiLinks(): Transformer<Root> {
  return (tree, file) => {
    const outgoingLinks: string[] = [];

    visit(tree, "text", (node: Text, index: number | undefined, parent: unknown) => {
      if (!parent || index === undefined) return;

      // Ignore text inside wikilink embed (![[...]])
      WIKILINK_REGEX.lastIndex = 0;
      if (!WIKILINK_REGEX.test(node.value)) return;

      WIKILINK_REGEX.lastIndex = 0;
      const replacement: PhrasingContent[] = [];
      const value = node.value;
      let last = 0;
      let match: RegExpExecArray | null;

      while ((match = WIKILINK_REGEX.exec(value)) !== null) {
        // Skip match if preceded by '!' (handled by remarkWikiEmbeds)
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

    const fileDataRef = file.data as MarkdownFileData & { outgoingLinks?: string[] };
    fileDataRef.outgoingLinks = outgoingLinks;
  };
}

/* ------------------------------------------------------------------ */
/* Stats collection: word count + ToC into vfile data                 */
/* ------------------------------------------------------------------ */

export function remarkWordCount(): Transformer<Root> {
  return (tree, file) => {
    let words = 0;
    // Code content lives on `code`/`inlineCode` values, not `text` nodes,
    // so it is excluded from reading time automatically.
    visit(tree, "text", (node: Text) => {
      words += node.value.split(/\s+/).filter(Boolean).length;
    });
    fileData(file).words = words;
  };
}

function elementText(el: Element): string {
  let text = "";
  visit(el, "text", (node: Text) => {
    text += node.value;
  });
  // Drop the trailing '#' contributed by rehype-autolink-headings
  return text.replace(/#\s*$/, "").trim();
}

function rehypeCollectToc(): Transformer<HastRoot> {
  return (tree, file) => {
    const toc: TocEntry[] = [];
    visit(tree, "element", (node: Element) => {
      if (!/^h[1-3]$/.test(node.tagName)) return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      toc.push({ id, depth: Number(node.tagName[1]), text: elementText(node) });
    });
    fileData(file).toc = toc;
  };
}

function rehypeLazyImages(): Transformer<HastRoot> {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      node.properties = node.properties ?? {};
      if (!node.properties.loading) node.properties.loading = "lazy";
      if (!node.properties.decoding) node.properties.decoding = "async";
    });
  };
}

/* ------------------------------------------------------------------ */
/* Custom remark plugin: Algorithm Visualizer Embeds                  */
/* ------------------------------------------------------------------ */

const ALGO_JSX_TAG = /<(?:AlgorithmVisualizer|algo)\s+(?:algorithm|id)=["']([^"']+)["']\s*(?:\/>|>.*?<\/(?:AlgorithmVisualizer|algo)>)/i;

export function remarkAlgorithmEmbeds(): Transformer<Root> {
  return (tree) => {
    // 1. Check code blocks: ```algo:binary-search or ```algo \n binary-search
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      let slug: string | null = null;

      if (node.lang?.startsWith("algo:")) {
        slug = node.lang.slice(5).trim();
      } else if (node.lang === "algo" || node.lang === "algorithm") {
        slug = node.value.trim();
      }

      if (slug) {
        parent.children[index] = {
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: {
              className: ["algo-embed-placeholder", "algo-embed-container"],
              "data-algorithm": slug,
            },
          },
          children: [],
        };
      }
    });

    // 2. Check HTML / Text nodes: <AlgorithmVisualizer algorithm="binary-search" />
    visit(tree, ["html", "text"], (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined || typeof node.value !== "string") return;

      const match = ALGO_JSX_TAG.exec(node.value);
      if (match) {
        const slug = match[1].trim();
        parent.children[index] = {
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: {
              className: ["algo-embed-placeholder", "algo-embed-container"],
              "data-algorithm": slug,
            },
          },
          children: [],
        };
      }
    });
  };
}

export interface RenderedMarkdown {
  html: string;
  toc: TocEntry[];
  wordCount: number;
  readingTimeMinutes: number;
  outgoingLinks: string[];
}

interface MarkdownFileData {
  words?: number;
  toc?: TocEntry[];
  outgoingLinks?: string[];
}

/* ------------------------------------------------------------------ */
/* Processor                                                          */
/* ------------------------------------------------------------------ */

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkCallouts)
  .use(remarkWikiEmbeds)
  .use(remarkWikiLinks)
  .use(remarkAlgorithmEmbeds)
  .use(remarkWordCount)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeHighlight, { detect: false })
  .use(rehypeKatex, { errorColor: "#f87171", throwOnError: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
    content: { type: "text", value: "#" },
  })
  .use(rehypeCollectToc)
  .use(rehypeLazyImages)
  .use(rehypeStringify, { allowDangerousHtml: true });

/** Render markdown to HTML with generated ToC and reading-time stats. */
export async function renderMarkdown(content: string): Promise<RenderedMarkdown> {
  const file = await processor.process(content);
  const data = fileData(file);
  return {
    html: String(file),
    toc: data.toc ?? [],
    wordCount: data.words ?? 0,
    readingTimeMinutes: Math.max(1, Math.ceil((data.words ?? 0) / READING_WPM)),
    outgoingLinks: data.outgoingLinks ?? [],
  };
}

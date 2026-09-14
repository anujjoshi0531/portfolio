import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { remarkAlgorithmEmbeds } from "@/lib/content/markdown/algorithms";
import { remarkCallouts } from "@/lib/content/markdown/callouts";
import {
  rehypeCollectToc,
  rehypeLazyImages,
  remarkWordCount,
} from "@/lib/content/markdown/stats";
import {
  remarkWikiEmbeds,
  remarkWikiLinks,
} from "@/lib/content/markdown/wikilinks";
import type { MarkdownFileData, RenderedMarkdown } from "@/lib/content/markdown/types";

const READING_WPM = 200;

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

export async function renderMarkdown(content: string): Promise<RenderedMarkdown> {
  const file = await processor.process(content);
  const data = file.data as MarkdownFileData;

  return {
    html: String(file),
    toc: data.toc ?? [],
    wordCount: data.words ?? 0,
    readingTimeMinutes: Math.max(1, Math.ceil((data.words ?? 0) / READING_WPM)),
    outgoingLinks: data.outgoingLinks ?? [],
  };
}

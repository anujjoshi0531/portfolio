import type { Root, Text } from "mdast";
import type { Element, Root as HastRoot } from "hast";
import type { Transformer } from "unified";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";
import type { MarkdownFileData, TocEntry } from "@/lib/content/markdown/types";

function fileData(file: VFile): MarkdownFileData {
  return file.data as MarkdownFileData;
}

export function remarkWordCount(): Transformer<Root> {
  return (tree, file) => {
    let words = 0;
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
  return text.replace(/#\s*$/, "").trim();
}

export function rehypeCollectToc(): Transformer<HastRoot> {
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

export function rehypeLazyImages(): Transformer<HastRoot> {
  return (tree) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      node.properties = node.properties ?? {};
      if (!node.properties.loading) node.properties.loading = "lazy";
      if (!node.properties.decoding) node.properties.decoding = "async";
    });
  };
}

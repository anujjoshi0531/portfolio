import type { Root } from "mdast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

const ALGO_JSX_TAG =
  /<(?:AlgorithmVisualizer|algo)\s+(?:algorithm|id)=["']([^"']+)["']\s*(?:\/>|>.*?<\/(?:AlgorithmVisualizer|algo)>)/i;

export function remarkAlgorithmEmbeds(): Transformer<Root> {
  return (tree) => {
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

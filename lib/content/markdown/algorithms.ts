import type { Root } from "mdast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

const ALGO_JSX_TAG =
  /<(?:AlgorithmVisualizer|algo)\s+(?:algorithm|id)=["']([^"']+)["']\s*(?:\/>|>.*?<\/(?:AlgorithmVisualizer|algo)>)/i;

function parseAlgorithmFence(node: { lang?: string; value?: string }) {
  let raw = "";
  let caption = "";

  if (node.lang?.startsWith("algo:")) {
    raw = node.lang.slice(5).trim();
    caption = node.value?.trim() ?? "";
  } else if (node.lang === "algo" || node.lang === "algorithm") {
    const lines = (node.value ?? "").split(/\r?\n/);
    raw = lines.shift()?.trim() ?? "";
    caption = lines.join("\n").trim();
  }

  if (!raw) return null;

  const match = raw.match(/^([a-z0-9-]+)(?:\s+(\{.*\}))?$/i);
  if (!match) return { slug: raw, caption };

  const [, slug, rawOptions] = match;
  let autoPlay: boolean | undefined;
  let speed: number | undefined;

  if (rawOptions) {
    try {
      const options = JSON.parse(rawOptions) as { autoplay?: unknown; autoPlay?: unknown; speed?: unknown };
      const optionAutoPlay = options.autoPlay ?? options.autoplay;
      if (typeof optionAutoPlay === "boolean") autoPlay = optionAutoPlay;
      if (typeof options.speed === "number" && Number.isFinite(options.speed)) speed = options.speed;
    } catch {
      // Invalid options should not prevent the visualizer from rendering.
    }
  }

  return { slug, caption, autoPlay, speed };
}

function algorithmPlaceholder(parsed: ReturnType<typeof parseAlgorithmFence>) {
  if (!parsed) return null;

  return {
    type: "paragraph",
    data: {
      hName: "div",
      hProperties: {
        className: ["algo-embed-placeholder", "algo-embed-container"],
        "data-algorithm": parsed.slug,
        ...(parsed.caption ? { "data-caption": parsed.caption } : {}),
        ...(typeof parsed.autoPlay === "boolean" ? { "data-autoplay": String(parsed.autoPlay) } : {}),
        ...(typeof parsed.speed === "number" ? { "data-speed": String(parsed.speed) } : {}),
      },
    },
    children: [],
  };
}

export function remarkAlgorithmEmbeds(): Transformer<Root> {
  return (tree) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;

      const placeholder = algorithmPlaceholder(parseAlgorithmFence(node));
      if (placeholder) {
        parent.children[index] = placeholder;
      }
    });

    visit(tree, ["html", "text"], (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined || typeof node.value !== "string") return;

      const match = ALGO_JSX_TAG.exec(node.value);
      if (match) {
        const slug = match[1].trim();
        parent.children[index] = algorithmPlaceholder({ slug, caption: "" });
      }
    });
  };
}

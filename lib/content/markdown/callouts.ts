import type { Blockquote, Paragraph, PhrasingContent } from "mdast";
import type { Root } from "mdast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

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
    bodyText.length > 0 ||
    restInline.some(
      (child) => child.type !== "break" && !(child.type === "text" && !child.value.trim())
    );

  if (hasBody) {
    let bodyInline: PhrasingContent[] = [];
    if (bodyText) bodyInline.push({ type: "text", value: bodyText });
    bodyInline = bodyInline.concat(restInline);
    while (
      bodyInline.length &&
      (bodyInline[0].type === "break" ||
        (bodyInline[0].type === "text" && !bodyInline[0].value.trim()))
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

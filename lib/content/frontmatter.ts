import { parse as parseYaml } from "yaml";
import type { Frontmatter } from "@/lib/content/types";

export function parseFrontmatter(fileContent: string): {
  frontmatter: Frontmatter;
  content: string;
} {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const parsed = parseYaml(yamlBlock);
  const frontmatter = parsed && typeof parsed === "object" ? (parsed as Frontmatter) : {};

  return { frontmatter, content };
}

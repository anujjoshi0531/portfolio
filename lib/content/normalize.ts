import type { Frontmatter } from "@/lib/content/types";

export function normalizeAssetPath(assetPath?: string): string | undefined {
  if (!assetPath) return undefined;
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://")) return assetPath;
  if (assetPath.startsWith("_assets/")) return "/" + assetPath;
  if (assetPath.startsWith("/_assets/")) return assetPath;
  return "/" + assetPath;
}

export function normalizeFrontmatterString(value: unknown): string | undefined {
  return value ? String(value) : undefined;
}

export function normalizeFrontmatterArray(value: Frontmatter[keyof Frontmatter]): string[] {
  return Array.isArray(value) ? value : [];
}

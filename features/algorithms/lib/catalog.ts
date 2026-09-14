import { cache } from "react";
import { readCollection } from "@/lib/content/collections";
import type { ContentItem } from "@/lib/content/types";
import type {
  AlgorithmSummary,
  CategorySummary,
  Difficulty,
  VisualizationType,
} from "@/features/algorithms/lib/types";

export const ALGORITHM_CATEGORY_ORDER = [
  "Concepts",
  "Data Structures",
  "Sorting",
  "Searching",
  "Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Divide and Conquer",
  "Math",
  "Compression",
] as const;

function toAlgorithmSummary(item: ContentItem): AlgorithmSummary {
  return {
    id: item.slug,
    name: item.title,
    category: item.category || "Concepts",
    difficulty: (item.frontmatter.difficulty || "easy") as Difficulty,
    visualization: (item.frontmatter.visualization || "concept") as VisualizationType,
    description: item.description,
  };
}

export const getAlgorithmContentBySlug = cache((slug: string): ContentItem | null => {
  const algorithms = readCollection("algorithms");
  return algorithms.find((algorithm) => algorithm.slug === slug || algorithm.id === slug) || null;
});

export const getAlgorithmCatalog = cache((): AlgorithmSummary[] => {
  const categoryRank = new Map<string, number>(
    ALGORITHM_CATEGORY_ORDER.map((category, index) => [category, index])
  );

  return readCollection("algorithms")
    .map(toAlgorithmSummary)
    .sort((a, b) => {
      const rankA = categoryRank.get(a.category) ?? Number.MAX_SAFE_INTEGER;
      const rankB = categoryRank.get(b.category) ?? Number.MAX_SAFE_INTEGER;

      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name);
    });
});

export const getAlgorithmCatalogEntry = cache((id: string): AlgorithmSummary | undefined => {
  return getAlgorithmCatalog().find((algorithm) => algorithm.id === id);
});

export const getAlgorithmCatalogCategories = cache((): CategorySummary[] => {
  const catalog = getAlgorithmCatalog();
  const knownCategories = ALGORITHM_CATEGORY_ORDER.map((name) => ({
    name,
    algorithms: catalog.filter((algorithm) => algorithm.category === name),
  })).filter((category) => category.algorithms.length > 0);

  const knownCategoryNames = new Set(ALGORITHM_CATEGORY_ORDER);
  const extraCategories = Array.from(
    new Set(
      catalog
        .map((algorithm) => algorithm.category)
        .filter(
          (category) =>
            !knownCategoryNames.has(category as (typeof ALGORITHM_CATEGORY_ORDER)[number])
        )
    )
  )
    .sort()
    .map((name) => ({
      name,
      algorithms: catalog.filter((algorithm) => algorithm.category === name),
    }));

  return [...knownCategories, ...extraCategories];
});

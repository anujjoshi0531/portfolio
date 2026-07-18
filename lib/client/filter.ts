export const availableParams = new Set([
  "tags",
  "published_gte",
  "published_lte",
  "limit",
  "sort_by",
  "page",
  "q",
]);

export function filterDiscoverParams(
  params?: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([key]) => availableParams.has(key))
  );
}
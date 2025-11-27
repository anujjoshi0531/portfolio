export function filterDiscoverParams(
    params?: Record<string, string>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries(params ?? {}).filter(([key]) =>
        availableParams.includes(key)
      )
    );
  }
  export const availableParams = [
    "tags",
    "published_gte",
    "published_lte",
    "limit",
    "sort_by",
    "page",
    "q",
  ];
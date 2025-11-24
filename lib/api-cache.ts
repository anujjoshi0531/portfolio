const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute

export async function cachedFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data as T;
  } catch (error) {
    // If there's cached data, return it even if expired
    if (cached) {
      return cached.data as T;
    }
    throw error;
  }
}

export function clearCache() {
  cache.clear();
}


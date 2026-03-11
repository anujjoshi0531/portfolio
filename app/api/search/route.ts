import { searchPages } from "@/lib/server/notion";
import { Redis } from "@upstash/redis";

export const revalidate = 3600;

// Initialize Redis from Environment variables
const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Create a deterministic cache key from the search body
    const cacheKey = `notion:search:${JSON.stringify(body)}`;
    
    // Check if the result exists in Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return Response.json(cachedData);
    }

    // Fetch from Notion API if not cached
    const res = await searchPages(body);
    
    // Cache the result in Redis for 1 hour (3600 seconds)
    await redis.set(cacheKey, res, { ex: 3600 });
    
    return Response.json(res);
  } catch (error) {
    console.error('Error in search-notion:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

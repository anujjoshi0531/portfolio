import { searchBlogs } from "@/lib/server/local-content";
import { Redis } from "@upstash/redis";

export const revalidate = 3600;

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch {
  redis = null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const cacheKey = `blog:search:${JSON.stringify(body)}`;
    
    if (redis) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return Response.json(cachedData);
      }
    }

    const res = await searchBlogs(body);
    
    if (redis) {
      await redis.set(cacheKey, res, { ex: 3600 });
    }
    
    return Response.json(res);
  } catch (error) {
    console.error('Error in search-blogs:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

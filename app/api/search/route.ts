import { searchBlogs } from "@/features/blog/lib/content";
import { redis } from "@/lib/server/redis";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const cacheKey = `blog:search:${JSON.stringify(body)}`;
    
    if (redis) {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    }

    const res = await searchBlogs(body);
    
    if (redis) {
      await redis.set(cacheKey, res, { ex: 3600 });
    }
    
    return NextResponse.json(res);
  } catch (error) {
    console.error('Error in search-blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

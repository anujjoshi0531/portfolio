import { redis, getClientIP } from "@/lib/server/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { slug, action } = await req.json();
    const ip = getClientIP(req);
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    let changed = 0;
    if (action === "decrement") {
        changed = await redis.srem(`likes:ips:${slug}`, ip); // Remove IP from set (returns 1 if removed, 0 if not)
    } else {
        changed = await redis.sadd(`likes:ips:${slug}`, ip); // Add IP to set (returns 1 if added, 0 if already exists)
    }

    // Track this slug in Redis stats, only if a change actually occurred.
    if (changed > 0) {
        await redis.sadd("stats:dirty", slug);
    }

    // Total likes = legacy integer count + unique IPs in the set
    const [uniqueIpsCount, legacyRaw] = await Promise.all([
        redis.scard(`likes:ips:${slug}`),
        redis.get<string>(`likes:blog:${slug}`),
    ]);
    const totalLikes = uniqueIpsCount + parseInt(legacyRaw ?? "0", 10);

    return NextResponse.json({ likes: totalLikes });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const ip = getClientIP(req);

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const [uniqueIpsCount, legacyRaw, hasLiked] = await Promise.all([
      redis.scard(`likes:ips:${slug}`),
      redis.get<string>(`likes:blog:${slug}`),
      redis.sismember(`likes:ips:${slug}`, ip),
    ]);
    const totalLikes = uniqueIpsCount + parseInt(legacyRaw ?? "0", 10);
    
    return NextResponse.json({ likes: totalLikes, hasLiked: !!hasLiked });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: "Internal Server Error", likes: 0, hasLiked: false }, { status: 500 });
  }
}

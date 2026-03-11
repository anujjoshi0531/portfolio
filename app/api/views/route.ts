import { redis, getClientIP } from "@/lib/server/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    const ip = getClientIP(req);
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const getCounts = async () => {
        // We'll migrate away from `scard` set counts to a strict total counter over time.
        // For backwards compatibility, still add the `scard` items if any exist from before, plus the master total.
        const [legacySetCount, legacyRaw, masterRaw] = await Promise.all([
            redis.scard(`pageviews:ips:${slug}`),
            redis.get<string>(`pageviews:blog:${slug}`),
            redis.get<string>(`pageviews:total:${slug}`),
        ]);
        
        // This makes sure our old data merges perfectly with the new system without duplication
        return legacySetCount + parseInt(legacyRaw ?? "0", 10) + parseInt(masterRaw ?? "0", 10);
    };

    // If in development mode, do not increment the counter, just return the current value
    if (process.env.NODE_ENV === "development") {
        return NextResponse.json({ views: await getCounts() });
    }

    // Try to set a lock for this IP and Slug that expires in exactly 30 minutes (1800 seconds).
    // `nx: true` ensures the lock is ONLY created if it doesn't already exist.
    const lockKey = `pageviews:lock:${slug}:${ip}`;
    const acquiredLock = await redis.set(lockKey, "viewed", { nx: true, ex: 1800 });
    
    // If we successfully acquired the lock (meaning the IP hasn't viewed in 30 mins)
    if (acquiredLock) {
        // Increment the absolute master total.
        await redis.incr(`pageviews:total:${slug}`);
        // Mark this slug as needing a Notion sync tonight.
        await redis.sadd("stats:dirty", slug);
    }
    
    return NextResponse.json({ views: await getCounts() });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const [legacySetCount, legacyRaw, masterRaw] = await Promise.all([
      redis.scard(`pageviews:ips:${slug}`),
      redis.get<string>(`pageviews:blog:${slug}`),
      redis.get<string>(`pageviews:total:${slug}`),
    ]);
    const totalViews = legacySetCount + parseInt(legacyRaw ?? "0", 10) + parseInt(masterRaw ?? "0", 10);
    
    return NextResponse.json({ views: totalViews });
  } catch (error) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: "Internal Server Error", views: 0 }, { status: 500 });
  }
}

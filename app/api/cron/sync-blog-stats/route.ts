import { NextResponse } from "next/server";
import { redis } from "@/lib/server/redis";
import { getBlogs, updateBlogStats } from "@/lib/server/notion";
import { extractPlainText } from "@/lib";

/** Compute total view count for a slug — mirrors the logic in /api/views. */
async function getViewCount(slug: string): Promise<number> {
  const [legacySetCount, legacyRaw, masterRaw] = await Promise.all([
    redis.scard(`pageviews:ips:${slug}`),
    redis.get<string>(`pageviews:blog:${slug}`),
    redis.get<string>(`pageviews:total:${slug}`),
  ]);
  return (
    legacySetCount +
    parseInt(legacyRaw ?? "0", 10) +
    parseInt(masterRaw ?? "0", 10)
  );
}

/** Compute total like count for a slug — mirrors the logic in /api/likes. */
async function getLikeCount(slug: string): Promise<number> {
  const [uniqueIpsCount, legacyRaw] = await Promise.all([
    redis.scard(`likes:ips:${slug}`),
    redis.get<string>(`likes:blog:${slug}`),
  ]);
  return uniqueIpsCount + parseInt(legacyRaw ?? "0", 10);
}

export async function POST(request: Request) {
  // --- Auth ---
  if (!process.env.CRON_SECRET) {
    console.error("[sync-blog-stats] CRON_SECRET is not configured.");
    return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Read the dirty set — only slugs that had activity since last sync.
    const dirtySlugs = await redis.smembers("stats:dirty");

    if (dirtySlugs.length === 0) {
      console.log("[sync-blog-stats] No active slugs today, skipping.");
      return NextResponse.json({ message: "No activity since last sync.", synced: 0 });
    }

    console.log(`[sync-blog-stats] Active slugs today: ${dirtySlugs.join(", ")}`);

    // 2. Fetch all public blogs from Notion and build a slug → pageId map.
    //    One list call instead of one lookup call per slug.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allBlogs = (await getBlogs()) as any[];
    const slugToPageId = new Map<string, string>();
    for (const page of allBlogs) {
      const slug = extractPlainText(page.properties?.Slug?.rich_text);
      if (slug) slugToPageId.set(slug, page.id as string);
    }

    // 3. Sync only the active slugs — read Redis counts and write to Notion.
    const results = await Promise.allSettled(
      dirtySlugs.map(async (slug) => {
        const pageId = slugToPageId.get(slug);
        if (!pageId) return { slug, status: "skipped", reason: "not found in Notion" };

        const [views, likes] = await Promise.all([getViewCount(slug), getLikeCount(slug)]);
        await updateBlogStats(pageId, views, likes);
        return { slug, views, likes };
      })
    );

    // 4. Flush the dirty set atomically — fresh slate for the next 24h.
    await redis.del("stats:dirty");

    const synced = results.filter((r) => r.status === "fulfilled").length;
    const failed = results
      .filter((r): r is PromiseRejectedResult => r.status === "rejected")
      .map((r) => r.reason?.message ?? String(r.reason));

    console.log(`[sync-blog-stats] synced=${synced} failed=${failed.length}`);

    return NextResponse.json({
      message: "Blog stats sync complete.",
      synced,
      failed: failed.length > 0 ? failed : undefined,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[sync-blog-stats] Fatal error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAllSubscribers } from "@/lib/server/newsletter";
import { Client } from "@upstash/qstash";
import { searchBlogs } from "@/lib/server/local-content";

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN || "",
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    // Ensure we have a cron secret set in env, or fall back to checking
    if (!process.env.CRON_SECRET) {
      console.warn("CRON_SECRET is not set in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.QSTASH_TOKEN) {
      console.warn("QSTASH_TOKEN is not set in environment variables");
      return NextResponse.json({ error: "Queue Configuration Error" }, { status: 500 });
    }

    const subscribers = await getAllSubscribers();

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to send to." }, { status: 200 });
    }

    // Fetch top 5 blog posts
    const { results } = await searchBlogs({ limit: 5 });

    const recentBlogs = results.map((blog) => {
      const title = blog.title || "Untitled";
      const description = blog.description || "";
      const slug = blog.slug || blog.id;
      const image = blog.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
      return { title, description, slug, image };
    }).filter(blog => blog.slug);

    // Determine the base URL to send webhooks to.
    // Use NEXT_PUBLIC_BASE_URL or VERCEL_URL if available, otherwise fallback to request host.
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
    const host = request.headers.get("host") || "your-production-url.com";
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    const baseUrl = siteUrl || `${protocol}://${host}`;

    // Log a warning if we're on localhost as QStash cannot reach local loopback addresses without a tunnel.
    if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1") || baseUrl.includes("::1")) {
      console.warn("WARNING: Detected local loopback address for QStash webhook URL. Upstash will reject this unless a tunnel (like ngrok) is used.");
    }

    // Send emails asynchronously by dispatching to the QStash queue.
    // NOTE: Upstash/QStash requires a public URL. Localhost will not work.
    const promises = subscribers.map(sub =>
      qstashClient.publishJSON({
        url: `${baseUrl}/api/queue/send-newsletter`,
        body: { email: sub.email, name: sub.name, id: sub.id, recentBlogs }
      })
    );

    const queueResults = await Promise.allSettled(promises);
    const successes = queueResults.filter(r => r.status === "fulfilled").length;
    const failures = queueResults.filter(r => r.status === "rejected").length;

    if (failures > 0) {
      console.error(`Failed to queue ${failures} out of ${subscribers.length} newsletters.`);
      // Log specific errors for debugging
      queueResults.forEach((res, index) => {
        if (res.status === "rejected") {
          console.error(`Failed to queue for ${subscribers[index].email}:`, res.reason);
        }
      });
    }

    return NextResponse.json({
      message: failures === 0 ? "Weekly newsletters queued successfully via QStash" : `Queuing partially completed.`,
      successCount: successes,
      failureCount: failures,
      totalCount: subscribers.length
    }, { status: successes > 0 ? 200 : 400 });
  } catch (error: unknown) {
    console.error("Cron Newsletter Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

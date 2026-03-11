import { NextResponse } from "next/server";
import { getAllSubscribers } from "@/lib/server/newsletter";
import { Client } from "@upstash/qstash";
import { searchPages } from "@/lib/server/notion";
import { extractPlainText } from "@/lib";

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
    const { results } = await searchPages({ limit: 5 });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentBlogs = results.map((page: any) => {
      const title = extractPlainText(page.properties.Name?.title) || "Untitled";
      const description = extractPlainText(page.properties.Description?.rich_text) || "";
      const slug = extractPlainText(page.properties.Slug?.rich_text) || "";
      const image = page.properties.Thumbnail?.url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop";
      return { title, description, slug, image };
    }).filter(blog => blog.slug);

    // Determine the base URL to send webhooks to
    const host = request.headers.get("host") || "your-production-url.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    // Usually NEXT_PUBLIC_SITE_URL or VERCEL_URL or URL are provided.
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

    // Send emails asynchronously by dispatching to the QStash queue
    const promises = subscribers.map(sub => 
      qstashClient.publishJSON({
        url: `${baseUrl}/api/queue/send-newsletter`,
        body: { email: sub.email, name: sub.name, id: sub.id, recentBlogs }
      }).catch(err => {
        console.error(`Failed to queue newsletter for ${sub.email}:`, err);
      })
    );
    
    await Promise.allSettled(promises);

    return NextResponse.json({ message: "Weekly newsletters queued successfully via QStash", count: subscribers.length }, { status: 200 });
  } catch (error: unknown) {
    console.error("Cron Newsletter Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

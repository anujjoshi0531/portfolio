import { NextResponse } from "next/server";
import { getBlogBySlug } from "@/features/blog/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
  }

  const blog = getBlogBySlug(slug);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({
    title: blog.title,
    description: blog.description,
    category: blog.category,
    tags: blog.tags,
    thumbnail: blog.thumbnail,
    published: blog.published || blog.created,
  });
}

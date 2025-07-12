import Blog from "@/components/blog/Blog";
import { getAllTags, getPages, totalPages } from "@/lib/notion";

interface SearchProps {
  searchParams: Promise<{ 
    q: string; 
    page: number; 
    limit: number; 
    published_gte: Date;
    published_lte: Date;
    tags: string;}>
}

export default async function BlogPage({ searchParams }: SearchProps) {
  const allTags = await getAllTags();
  const { q, page, limit, tags, published_gte, published_lte } = await searchParams;
  const total = await totalPages();
  const arr = tags ? tags.split(",") : [];
  const posts = await getPages({query: q, tags: arr, dateFilter: {property: "Published", before: published_lte, after: published_gte}, sortBy: "Last Updated", sortDirection: "descending", page: page});
  const blogs = [...posts.results]

  return (
    <main className="space-y-6">
      <Blog posts={blogs} tags={allTags} total={total/limit} />
    </main>
  );
}
import Blog from "@/components/blog/Blog";
import { getBlogFilters, searchBlogs } from "@/features/blog/lib/content";

export const revalidate = 3600; // Revalidate every hour

interface SearchProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    limit?: string;
    published_gte?: string;
    published_lte?: string;
    sort_by?: string;
    tags?: string;
  }>
}
export async function generateMetadata({ searchParams }: SearchProps) {
  const params = await searchParams;
  const q = params.q || undefined;
  return {
    title: q ? `Search Results for "${q}"` : "Blog",
  }
}
export default async function BlogPage({ searchParams }: SearchProps) {
  const { tags: allTags, categories: allCategories } = await getBlogFilters();
  const params = await searchParams;
  const q = params.q || undefined;
  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 9;
  const tags = params.tags ? params.tags.split(",").filter(Boolean) : [];

  // Get posts with pagination
  const data = await searchBlogs({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    page,
    limit,
  });

  const total = data.total;
  const blogs = data.results;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));

  return (
    <main className="space-y-6">
      <Blog
        posts={blogs}
        tags={allTags}
        categories={allCategories}
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={total}
        limit={limit}
      />
    </main>
  );
}
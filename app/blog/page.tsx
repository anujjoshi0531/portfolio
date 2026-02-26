import Blog from "@/components/blog/Blog";
import { getBlogFilters, searchPages, getPagesCount } from "@/lib/server/notion";

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
  const published_gte = params.published_gte ? new Date(params.published_gte) : undefined;
  const published_lte = params.published_lte ? new Date(params.published_lte) : undefined;
  const sort_by = params.sort_by || "published-descending";

  const dateFilter = (published_gte || published_lte) ? {
    property: "Published",
    after: published_gte,
    before: published_lte,
  } : undefined;

  // Get posts with pagination
  const data = await searchPages({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    dateFilter,
    sort_by,
    page,
    limit,
  });

  const { total } = await getPagesCount({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    dateFilter,
  });

  const blogs = data.results as unknown as NotionBlogPage[];
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
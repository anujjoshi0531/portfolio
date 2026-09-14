import Blog from "@/components/blog/Blog";
import { getBlogFilters } from "@/features/blog/lib/content";
import { getBlogPlaylistListingItems, getVisualizerListingItems, searchBlogListings, type BlogsFilter } from "@/features/blog/lib/listing";

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
    category?: string;
    blogsFilter?: BlogsFilter;
    difficulty?: string;
  }>
}
export async function generateMetadata({ searchParams }: SearchProps) {
  const params = await searchParams;
  const q = params.q || undefined;
  return {
    title: q ? `Search Results for "${q}"` : "Blog & Learning Library",
    description: "Explore articles, interactive algorithm visualizers, and learning playlists.",
  }
}
export default async function BlogPage({ searchParams }: SearchProps) {
  const { tags: allTags, categories: allCategories } = await getBlogFilters();
  const resources = [...getVisualizerListingItems(), ...getBlogPlaylistListingItems()];
  const categories = Array.from(new Set([...allCategories, ...resources.flatMap((item) => item.category ? [item.category] : [])])).sort();
  const tagsForFilters = Array.from(new Set([...allTags, ...resources.flatMap((item) => item.tags)])).sort();
  const params = await searchParams;
  const q = params.q || undefined;
  const requestedPage = Number(params.page);
  const page = Number.isFinite(requestedPage) ? Math.max(1, Math.floor(requestedPage)) : 1;
  const limit = Math.min(60, Math.max(1, Math.floor(Number(params.limit) || 9)));
  const tags = params.tags ? params.tags.split(",").filter(Boolean) : [];
  const category = params.category || undefined;
  const blogsFilter = params.blogsFilter || "all";

  // Get posts with pagination
  const data = await searchBlogListings({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    category,
    blogsFilter,
    difficulty: params.difficulty,
    publishedFrom: params.published_gte,
    publishedTo: params.published_lte,
    sortBy: params.sort_by,
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
        tags={tagsForFilters}
        categories={categories}
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={total}
        limit={limit}
      />
    </main>
  );
}

import Blog from "@/components/blog/Blog";
import { getAllTags, searchPages, getPagesCount } from "@/lib/server/notion";

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

export default async function BlogPage({ searchParams }: SearchProps) {
  const allTags = await getAllTags();
  const params = await searchParams;
  
  // Parse search params with defaults
  const q = params.q || undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const limit = params.limit ? parseInt(params.limit, 10) : 9;
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
  const posts = await searchPages({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    dateFilter,
    sort_by,
    page,
    limit,
  });
  
  // Get total count with same filters
  const { total } = await getPagesCount({
    query: q,
    tags: tags.length > 0 ? tags : undefined,
    dateFilter,
  });
  
  const blogs = [...posts.results];
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));


  return (
    <main className="space-y-6">
      <Blog 
        posts={blogs} 
        tags={allTags} 
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={total}
        limit={limit}
      />
    </main>
  );
}
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, X } from "lucide-react";
import BlogCard from "./blog-card";
import { SearchInput } from "./search-input";
import { BlogFilter } from "./filter/blog-filter";
import { BlogPagination } from "./blog-pagination";
import { PageTemplate } from "../global/template";
import NoWork from "../site/NoWork";
import { useSearchParams, useRouter } from "next/navigation";

interface BlogProps {
  posts: any;
  tags: string[];
  categories: string[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
  limit: number;
}

export default function Blog({ 
  posts, 
  tags, 
  categories,
  totalPages, 
  currentPage, 
  totalCount,
  limit 
}: BlogProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get active filters from URL
  const activeTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const activeDateFrom = searchParams.get("published_gte");
  const activeDateTo = searchParams.get("published_lte");
  
  const hasActiveFilters = activeTags.length > 0 || activeDateFrom || activeDateTo;
  
  // Calculate result range
  const startResult = totalCount > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endResult = Math.min(currentPage * limit, totalCount);
  
  // Memoize the grid columns class
  const gridCols = useMemo(() => 
    layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "",
    [layout]
  );

  const blogCards = useMemo(() => {
    if (!posts || posts.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="max-w-lg w-full text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="size-64 md:size-128 text-muted-foreground/80">
                <NoWork className="w-full h-full" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                No Blogs Available
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                We couldn&apos;t find any blog posts matching your criteria.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return posts.map((blog: any) => (
      <BlogCard
        key={blog.id}
        blog={blog as NotionPage}
        variant={layout === "grid" ? "vertical" : "horizontal"}
        className={layout === "grid" ? "" : "sm:h-[280px]"}
      />
    ));
  }, [posts, layout]);

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (key === "tags" && value) {
      const currentTags = params.get("tags")?.split(",").filter(Boolean) || [];
      const newTags = currentTags.filter(tag => tag !== value);
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      } else {
        params.delete("tags");
      }
    } else {
      params.delete(key);
    }
    
    // Reset to page 1 when filters change
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/blog");
  };

  return (
    <>
      <PageTemplate title="Recent Blogs" subtitle="Insights, Tutorials and Tech Trends" />
      
      {/* Search and Controls */}
      <div className="flex w-full justify-between gap-2 items-center flex-wrap">
        <div className="w-full max-w-xl md:max-w-2xl mb-4">
          <SearchInput placeholder="Search Blogs, Project, Articles.." />
        </div>
        <div className="space-x-2 flex items-center">
          <BlogFilter tags={tags} categories={categories} />
          <Button
            variant="secondary"
            size="icon"
            className="hidden md:inline-flex"
            onClick={() => setLayout(layout === "grid" ? "list" : "grid")} 
            aria-label={`Switch blog layout to ${layout === "grid" ? "list" : "grid"} view`}>
            {layout === "grid" ? <List /> : <Grid />} 
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {activeTags.map((tag) => (
              <Button
                key={tag}
                size="sm"  
                onClick={() => removeFilter("tags", tag)}
                aria-label={`Remove ${tag} filter`}
              >{tag}
                <X />
              </Button>
          ))}
          {activeDateFrom && (
              <Button
                size="sm"  
                onClick={() => removeFilter("published_gte")}
                aria-label="Remove date from filter"
              >
                From: {new Date(activeDateFrom).toLocaleDateString()}
                <X />
              </Button>
          )}
          {activeDateTo && (
              <Button
                size="sm"  
                onClick={() => removeFilter("published_lte")}
                aria-label="Remove date to filter"
              >
                To: {new Date(activeDateTo).toLocaleDateString()}
                <X />
              </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={clearAllFilters}
            aria-label="Clear all filters"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      {totalCount > 0 && (
        <div className="text-sm text-muted-foreground mb-4">
          Showing {startResult}-{endResult} of {totalCount} {totalCount === 1 ? "result" : "results"}
        </div>
      )}

      {/* Blog Grid */}
      <div className={`grid grid-cols-1 ${gridCols} mb-8`}>
        {blogCards}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}

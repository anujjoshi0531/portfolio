"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, X } from "lucide-react";
import BlogCard from "./BlogCard";
import { SearchInput } from './SearchInput';
import { BlogFilter } from "./filter/BlogFilter";
import { BlogPagination } from './BlogPagination';
import { PageTemplate } from '../global/SectionTemplate';
import Image from "next/image";
import { useFilters } from '@/hooks/useFilters';
import type { BlogListingItem } from "@/features/blog/lib/listing";

interface BlogProps {
  posts: BlogListingItem[];
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
  const searchParams = useSearchParams();
  const contentTypeHref = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("difficulty");
    params.delete("published_gte");
    params.delete("published_lte");
    params.delete("sort_by");
    if (type === "all") params.delete("blogsFilter");
    else params.set("blogsFilter", type);
    return `/blog?${params.toString()}`;
  };
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [hovered, setHovered] = useState<number | null>(null);
  const {
    activeTags,
    activeDateFrom,
    activeDateTo,
    activeBlogsFilter,
    activeCategory,
    activeDifficulty,
    hasActiveFilters,
    removeFilter,
    clearAllFilters,
  } = useFilters();

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
              <div className="relative size-64 md:size-128 text-muted-foreground/80">
                <Image src="/no-work.svg" alt="No Work Found" fill className="object-contain" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                No matching resources
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Try a different search or clear your filters.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return posts.map((blog, i) => (
      <BlogCard
        key={`${blog.kind}:${blog.id}`}
        blog={blog}
        variant={layout === "grid" ? "vertical" : "horizontal"}
        className={layout === "grid" ? "" : "sm:h-[280px]"}
        index={i}
        hovered={hovered}
        setHovered={setHovered}
      />
    ));
  }, [posts, layout, hovered, setHovered]);

  return (
    <>
      <PageTemplate title="Blog & Learning Library" subtitle="Articles, interactive visualizers, and playlists to explore at your own pace." />
      <nav aria-label="Content type" className="flex flex-wrap gap-2">
        {([
          ["all", "All"], ["blogs", "Articles"], ["visualizers", "Visualizers"], ["playlists", "Playlists"],
        ] as const).map(([value, label]) => (
          <Button key={value} asChild variant={activeBlogsFilter === value ? "default" : "secondary"}>
            <Link href={contentTypeHref(value)} aria-current={activeBlogsFilter === value ? "page" : undefined}>{label}</Link>
          </Button>
        ))}
      </nav>

      {/* Search and Controls */}
      <div className="flex w-full justify-between gap-2 items-center flex-wrap">
        <div className="w-full max-w-xl md:max-w-2xl mb-4">
          <SearchInput placeholder="Search articles, visualizers, and playlists..." />
        </div>
        <div className="space-x-2 flex items-center">
          <BlogFilter tags={tags} categories={categories} />
          <Button
            variant="secondary"
            size="icon"
            className="hidden md:inline-flex"
            onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
            aria-label={`Switch resource layout to ${layout === "grid" ? "list" : "grid"} view`}>
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
          {activeCategory && <Button size="sm" onClick={() => removeFilter("category")} aria-label="Remove topic filter">{activeCategory}<X /></Button>}
          {activeDifficulty && <Button size="sm" onClick={() => removeFilter("difficulty")} aria-label="Remove difficulty filter">{activeDifficulty}<X /></Button>}
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
          {activeBlogsFilter !== "all" && (
            <Button
              size="sm"
              onClick={() => removeFilter("blogsFilter")}
              aria-label="Remove content type filter"
            >
              {activeBlogsFilter === "blogs" ? "Articles" : activeBlogsFilter === "visualizers" ? "Visualizers" : "Playlists"}
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

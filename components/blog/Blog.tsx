"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import BlogCard from "./blog-card";
import { SearchInput } from "./search-input";
import { BlogFilter } from "./filter/blog-filter";
import { PageTemplate } from "../global/template";
import NoWork from "../site/NoWork";

export default function Blog({ posts, tags, total }: { posts: any, tags: string[], total: number }) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  
  // Memoize the grid columns class
  const gridCols = useMemo(() => 
    layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "",
    [layout]
  );

  const blogCards = useMemo(() => {
    if (!posts || posts.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center">
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

  return (
    <>
      <PageTemplate title="Recent Blogs" subtitle="Insights, Tutorials and Tech Trends" />
      <div className="flex w-full justify-between gap-2 items-center">
        <div className="w-full max-w-xl md:max-w-2xl mb-4">
          <SearchInput placeholder="Search Blogs, Project, Articles.." />
        </div>
        <div className="space-x-2 flex items-center">
          <BlogFilter tags={tags} />
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
      <div className={`grid grid-cols-1 ${gridCols}`}>
        {blogCards}
      </div>
    </>
  );
}

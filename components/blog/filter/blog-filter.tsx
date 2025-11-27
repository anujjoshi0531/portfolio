"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFilters } from "@/components/blog/hooks";
import { cn } from "@/lib";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BlogFilterDate } from "./blog-filter-date";
import { BlogFiltertag } from "./blog-tag";
import { BlogSort } from "./blog-sort";

export const BlogFilter= ({tags}: {tags: string[]}) => {
  const { count, getFilter, setFilter, saveFilters, clearFilters } =
    useFilters();
  const [contentTypes, setContentTypes] = useState<string[]>([]);

  const handleContentTypeChange = (type: string, checked: boolean) => {
    setContentTypes((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "secondary", size: "md" }))} aria-label={`Open blog filters${count > 0 ? ` (${count} active)` : ""}`}>
        <SlidersHorizontal className="h-5 w-5" />
        {count > 0 && (
          <Badge className="text-xs">{count}</Badge>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="px-4 md:px-6">
          <SheetTitle className="text-2xl text-primary">Filters</SheetTitle>
          <SheetDescription>
            Narrow down your search results with the following filters.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)] px-4 md:px-6">
          <div className="space-y-6 py-2">
            {/* Date Range Filters */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Date Range</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <BlogFilterDate
                  label="From"
                  align="start"
                  value={getFilter("published_gte")}
                  disableAfter={getFilter("published_lte")}
                  onChange={(value) =>
                    setFilter({ "published_gte": value })
                  }
                />
                <BlogFilterDate
                  label="To"
                  align="end"
                  value={getFilter("published_lte")}
                  disableBefore={getFilter("published_gte")}
                  onChange={(value) =>
                    setFilter({ "published_lte": value })
                  }
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div className="space-y-2">
              <BlogFiltertag 
                tags={tags}
                value={getFilter("tags")}
                onChange={(value) => setFilter({ tags: value })}
              />
            </div>

            {/* Sort and Display Options */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Sort & Display</h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Sort By</Label>
                  <BlogSort 
                    defaultValue={getFilter("sort_by") || "published-descending"}
                    onSortChange={(value) => setFilter({ sort_by: value })}
                  />
                </div>
                <div>
                  <Label htmlFor="limit" className="mb-2 block">Blogs Per Page</Label>
                  <Input
                    id="limit"
                    className="w-24"
                    type="number"
                    min={6}
                    max={50}
                    step={1}
                    value={getFilter("limit") || "9"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFilter({ limit: val });
                    }}
                    placeholder="9"
                  />
                </div>
              </div>
            </div>

            {/* Content Type Filter */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Content Type</h3>
              <div className="space-y-2">
                {["Posts", "Projects"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.toLowerCase()}
                      checked={contentTypes.includes(type)}
                      onCheckedChange={(checked) =>
                        handleContentTypeChange(type, checked as boolean)
                      }
                    />
                    <Label htmlFor={type.toLowerCase()} className="cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2 flex flex-row">
          <SheetClose onClick={saveFilters} className={cn(buttonVariants({ variant: "default", size: "sm" }))} aria-label="Save Changes">
            Save
          </SheetClose>
          <Button size="sm" variant="secondary" onClick={clearFilters} aria-label="Clear Filters">
            Clear
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

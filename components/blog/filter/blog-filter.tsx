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
import { cn } from "@/lib/utils";
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
      <SheetTrigger className={cn(buttonVariants({ variant: "secondary", size: "md" }))}>
        <SlidersHorizontal size="icon" className="rounded-full" />
        {count > 0 && (
          <Badge className="text-xs">{count}</Badge>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0">
        <SheetHeader className="px-4 md:px-6">
          <SheetTitle className="text-2xl text-primary">Filters</SheetTitle>
          <SheetDescription>
            Narrow down your search results with the following filters.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="px-4 md:px-6 overflow-y-scroll">
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
          <BlogFiltertag 
              tags={tags}
              value={getFilter("tags")}
              onChange={(value) => setFilter({ tags: value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2">Sort By</h4>
              <BlogSort />
            </div>
            <div>
              <h4 className="mb-1">Blogs Per Page</h4>
              <Input
                className="w-20"
                type="number"
                min={0}
                max={20}
                defaultValue={9}
                value={getFilter("limit")}
                onChange={(e) => setFilter({ limit: e.target.value })}
              />
            </div>
          </div>
          <div>
            <h4 className="mb-1">Content Type</h4>
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
                  <Label htmlFor={type.toLowerCase()}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2 flex flex-row">
          <Button size="md" variant="outline" onClick={clearFilters}>
            Clear
          </Button>
          <SheetClose onClick={saveFilters} className={cn(buttonVariants({ variant: "default", size: "md" }))}>
            Save Changes
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

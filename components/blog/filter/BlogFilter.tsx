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
import { useFilters } from "@/hooks/useFilters";
import { cn } from "@/lib/utils/styles";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BlogFilterDate } from './BlogFilterDate';
import { BlogTag } from './BlogTag';
import { BlogSort } from './BlogSort';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const BlogFilter = ({ tags, categories }: { tags: string[], categories: string[] }) => {
  const { count, getFilter, setFilter, saveFilters, clearFilters } =
    useFilters();

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "secondary", size: "md" }))} aria-label={`Open library filters${count > 0 ? ` (${count} active)` : ""}`}>
        <SlidersHorizontal />
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
            {/* Tags Filter */}
            <div className="space-y-2">
              <BlogTag
                tags={tags}
                value={getFilter("tags")}
                onChange={(value) => setFilter({ tags: value })}
              />
            </div>

            <div className="space-y-4">
              {getFilter("blogsFilter") === "blogs" && <>
              <BlogFilterDate
                label="Published From"
                align="start"
                value={getFilter("published_gte")}
                disableAfter={getFilter("published_lte")}
                onChange={(value) => setFilter({ "published_gte": value })}
              />
              <BlogFilterDate
                label="Published To"
                align="end"
                value={getFilter("published_lte")}
                disableBefore={getFilter("published_gte")}
                onChange={(value) => setFilter({ "published_lte": value })}
              />
              </>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                <Label className="flex text-muted-foreground" htmlFor="sort_by">Sort By</Label>
                <BlogSort
                  namesOnly={getFilter("blogsFilter") === "visualizers" || getFilter("blogsFilter") === "playlists"}
                  defaultValue={getFilter("sort_by") || (getFilter("blogsFilter") === "visualizers" || getFilter("blogsFilter") === "playlists" ? "name-ascending" : "published-descending")}
                  onSortChange={(value) => setFilter({ sort_by: value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                <Label className="flex text-muted-foreground" htmlFor="limit">Results Per Page</Label>
                <Input
                  id="limit"
                  className="w-full"
                  type="number"
                  min={6}
                  max={60}
                  step={1}
                  value={getFilter("limit") ? Number(getFilter("limit")) : 9}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilter({ limit: val });
                  }}
                  placeholder="9"
                />
              </div>
            </div>

            {/* Content Type Filter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
              <Label className="flex text-muted-foreground" htmlFor="blogsFilter">Show</Label>
              <RadioGroup
                id="blogsFilter"
                className="w-full"
                value={getFilter("blogsFilter") || "all"}
                onValueChange={(value) => setFilter({ blogsFilter: value, difficulty: "", published_gte: "", published_lte: "", sort_by: "" })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="blogsFilter-all" value="all" />
                  <Label htmlFor="blogsFilter-all">All resources</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="blogsFilter-blogs" value="blogs" />
                  <Label htmlFor="blogsFilter-blogs">Articles only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="blogsFilter-visualizers" value="visualizers" />
                  <Label htmlFor="blogsFilter-visualizers">Visualizers only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="blogsFilter-playlists" value="playlists" />
                  <Label htmlFor="blogsFilter-playlists">Playlists only</Label>
                </div>
              </RadioGroup>
            </div>

            {getFilter("blogsFilter") === "visualizers" && (
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <RadioGroup id="difficulty" value={getFilter("difficulty") || "all"} onValueChange={(value) => setFilter({ difficulty: value === "all" ? "" : value })}>
                  {["all", "easy", "intermediate", "advanced"].map((difficulty) => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <RadioGroupItem id={`difficulty-${difficulty}`} value={difficulty} />
                      <Label className="capitalize" htmlFor={`difficulty-${difficulty}`}>{difficulty}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
              <Label className="flex text-muted-foreground" htmlFor="category">Topic</Label>
              <RadioGroup className="w-full" value={getFilter("category")} onValueChange={(value) => setFilter({ category: value })}>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem id={category} value={category} />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="grid grid-cols-2 gap-2">
          <SheetClose onClick={() => saveFilters()} className={cn(buttonVariants({ variant: "default", size: "sm" }))} aria-label="Save Changes">
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

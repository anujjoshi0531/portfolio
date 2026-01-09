"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMultiSelect } from "@/hooks";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogFiltertagProps {
  value: string;
  tags: string[];
  onChange: (value: string) => void;
}

export const BlogFiltertag: React.FC<BlogFiltertagProps> = ({
  value,
  tags,
  onChange,
}) => {
  const { selection, toggleSelection } = useMultiSelect({
    value,
    logic: "and",
    onChange,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return tags;
    const query = searchQuery.toLowerCase();
    return tags.filter(tag => tag.toLowerCase().includes(query));
  }, [tags, searchQuery]);

  const selectedTags = useMemo(() => {
    return tags.filter(tag => selection.includes(tag));
  }, [tags, selection]);

  const unselectedTags = useMemo(() => {
    return filteredTags.filter(tag => !selection.includes(tag));
  }, [filteredTags, selection]);

  return (
    <div className="space-y-2">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-0.5 max-h-36 overflow-y-auto">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => toggleSelection(tag)}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${tag} filter`}
              aria-pressed={true}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleSelection(tag);
                }
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Available Tags */}
      {unselectedTags.length > 0 ? (
        <div className="flex flex-wrap gap-0.5 max-h-36 overflow-y-auto">
          {unselectedTags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => toggleSelection(tag)}
              variant="outline"
              role="button"
              tabIndex={0}
              aria-label={`Add ${tag} filter`}
              aria-pressed={false}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleSelection(tag);
                }
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      ) : searchQuery ? (
        <p className="text-sm text-muted-foreground">No tags found matching &quot;{searchQuery}&quot;</p>
      ) : null}
      
    </div>
  );
};
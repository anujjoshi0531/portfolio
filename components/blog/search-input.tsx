"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/components/blog/hooks/useSearch";
import { cn } from "@/lib/utils";
import { Search, XIcon, Loader2 } from "lucide-react";
import React, { useRef } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  auto?: boolean;
  loading?: boolean;
  searchPath?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  auto = true,
  value: propValue,
  name = "q",
  type = "text",
  searchPath = "/blog",
  placeholder = "Search Blogs, Project, Articles..",
  className,
  loading = false,
  ...props
}) => {
  const { term, clearSearch, handleChange, handleKeyDown } = useSearch(
    auto,
    searchPath
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const value = propValue ?? term;

  return (
    <div ref={containerRef} className="relative flex w-full">
      <Input
        ref={inputRef}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "pl-6 pr-20 h-14 rounded-full w-full bg-background text-base border border-muted focus:ring-2 focus:ring-theme focus:border-transparent transition-all duration-300",
          className
        )}
        {...props}
      />
      {value && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-16 top-1/2 -translate-y-1/2 rounded-full h-9 w-9"
          onClick={(e) => {
            e.stopPropagation();
            clearSearch();
          }}
          aria-label="Clear search"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      )}
      <Button
        type="submit"
        className="absolute right-0 top-0 h-14 w-16 bg-theme hover:bg-theme/80 rounded-l-none rounded-r-full flex items-center justify-center transition-all"
        disabled={loading}
        aria-label="Search"
      >
        {loading ? (
          <Loader2 className="animate-spin text-white" />
        ) : (
          <Search className="text-white" />
        )}
      </Button>
    </div>
  );
};

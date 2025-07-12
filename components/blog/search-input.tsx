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
  placeholder = "Search...",
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
    <div
      ref={containerRef}
      className="relative flex w-full cursor-pointer">
      <Input
        ref={inputRef}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "pl-6 h-14 rounded-full transition-all duration-300 ease-in-out w-full bg-background hover:bg-muted/50",
          className
        )}
        {...props}
      />
      {value && (
        <Button
          size="mdIcon"
          variant="ghost"
          className="absolute rounded-full right-16 -translate-x-1/3 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            clearSearch();
          }}
          aria-label="Clear search">
          <XIcon />
        </Button>
      )}
      <Button
        type="submit"
        className="absolute right-0 top-0 rounded-l-none rounded-r-full"
        disabled={loading}
        aria-label="Search">
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Search className="size-4" />
        )}
      </Button>
    </div>
  );
};

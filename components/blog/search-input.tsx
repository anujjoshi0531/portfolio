"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { useSearchDropdown } from "@/hooks/useSearchDropdown";
import { SearchResults } from "@/components/site/search/search-results";
import { cn } from "@/lib";
import { Search, XIcon, Loader2 } from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";

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
  const {
    query: dropdownQuery,
    setQuery: setDropdownQuery,
    searchResult,
    searchError,
    hasQuery,
  } = useSearchDropdown();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const value = String(propValue ?? term);

  // Sync dropdown query with input value
  useEffect(() => {
    setDropdownQuery(value);
  }, [value, setDropdownQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event);
    setDropdownQuery(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      clearSearch();
    } else {
      handleKeyDown(event);
    }
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearSearch();
    setDropdownQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative z-[1000]">
      <div ref={containerRef} className="relative flex w-full">
        <Input
          ref={inputRef}
          name={name}
          type={type}
          value={value}
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => {
            if (value.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          className={cn("pl-6 pr-20 h-14 rounded-full w-full backdrop-blur-md", className)}
          {...props}
        />
        {value && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-16 top-1/2 -translate-y-1/2 rounded-full h-9 w-9"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          className="absolute right-0 top-0 h-14 w-16 bg-theme hover:bg-theme/80 rounded-l-none rounded-r-full flex items-center justify-center transition-all"
          disabled={loading}
          aria-label={loading ? "Searching blogs" : "Search blogs"}
        >
          {loading ? (
            <Loader2 className="animate-spin text-white" />
          ) : (
            <Search className="text-white" />
          )}
        </Button>
      </div>
      {hasQuery && (
      <SearchResults
        className="absolute -z-10 top-[calc(100%-40px)] pt-8 left-2 w-[calc(100%-20px)] bg-background border"
        hasQuery={hasQuery}
        query={dropdownQuery}
        searchResult={searchResult}
        searchError={searchError}
        onClose={handleClose}
      />
      )}
    </div>
      
  );
};

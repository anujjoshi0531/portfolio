"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/features/search/hooks/useDebounce";

interface UseSearchProps {
  auto?: boolean;
  searchPath?: string;
  gaEventCategory?: string;
  syncUrl?: boolean;
  enableFetch?: boolean;
}

export const useSearch = ({
  auto = true,
  searchPath = "/blog",
  gaEventCategory = "blog",
  syncUrl = true,
  enableFetch = false,
}: UseSearchProps = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramQuery = syncUrl ? searchParams.get("q") : null;

  const [page, setPage] = useState<string>();
  const [term, setTerm] = useState(paramQuery ?? "");
  const value = useDebounce<string>(term, 500);

  // -- Merged from useSearchData --
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchError, setSearchError] = useState<any>(null);
  const hasQuery = useMemo(() => term.trim().length > 0, [term]);

  useEffect(() => {
    if (pathname !== searchPath) {
      setPage(pathname);
    }
    if (!paramQuery && pathname === searchPath && syncUrl) {
      setTerm("");
    }
  }, [pathname, paramQuery, searchPath, syncUrl]);

  const handleSearch = useCallback((searchValue: string) => {
    if (!syncUrl) return;
    if (searchValue === (searchParams.get("q") || "")) return;

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue !== "") {
      params.set("q", searchValue);
      params.delete("page"); // Reset to page 1 when searching
      router.push(`${searchPath}?${params.toString()}`);
      sendGAEvent("event", gaEventCategory, {
        search_term: searchValue,
      });
      return;
    }

    if (searchValue === "" && pathname === searchPath) {
      params.delete("q");
      params.delete("page");
      if (params.toString()) {
        router.push(`${searchPath}?${params.toString()}`);
      } else {
        router.push(searchPath);
      }
      return;
    }

    if (!page && pathname === searchPath) {
      router.replace("/", { scroll: true });
      return;
    }

    if (page && pathname !== page) {
      router.replace(page, { scroll: true });
      return;
    }
  }, [syncUrl, searchParams, router, searchPath, gaEventCategory, pathname, page]);

  useEffect(() => {
    if (auto && syncUrl && pathname === searchPath) {
      handleSearch(value);
    }
  }, [value, auto, syncUrl, pathname, searchPath, handleSearch]);

  useEffect(() => {
    if (!enableFetch) return;

    const controller = new AbortController();

    const performSearch = async () => {
      if (!value.trim()) {
        setIsLoading(false);
        setSearchResult(null);
        setSearchError(null);
        return;
      }

      setIsLoading(true);
      setSearchError(null);

      try {
        const result = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: value }),
          signal: controller.signal,
        });

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }

        const res = await result.json();
        setSearchResult(res);
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }
        console.error("Search error:", error);
        setSearchError({ error: "Search failed" });
        setSearchResult(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      controller.abort();
    };
  }, [value, enableFetch]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof event === "string") {
      setTerm(event);
    } else {
      setTerm(event.target.value);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setTerm("");
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && paramQuery !== value && !auto && syncUrl) {
      handleSearch(value);
    }

    if (event.key === "Escape") {
      clearSearch();
    }
  }, [paramQuery, value, auto, syncUrl, handleSearch, clearSearch]);

  return {
    term,
    setTerm,
    handleChange,
    handleKeyDown,
    clearSearch,
    isLoading,
    searchResult,
    searchError,
    hasQuery,
  };
};

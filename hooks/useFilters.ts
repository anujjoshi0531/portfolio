"use client";


import { filterDiscoverParams } from "@/lib"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";

export const useFilters = (pathname: string = "/blog") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters(filterDiscoverParams(params));
  }, [searchParams]);

  const getFilter = useCallback((key: string) => filters[key] ?? undefined, [filters]);

  const setFilter = useCallback((value: Record<string, string>) => {
    setFilters((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const saveFilters = useCallback((value?: Record<string, string>) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...filters, ...value };
    const query = new URLSearchParams(updatedParams);
    router.replace(`${pathname}?${query.toString()}`);
  }, [searchParams, filters, router, pathname]);

  const clearFilters = useCallback(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const filteredParams = Object.fromEntries(
      Object.entries(currentParams).filter(([key]) => !filters[key])
    );

    const query = new URLSearchParams(filteredParams);
    setFilters({});
    router.replace(`${pathname}?${query.toString()}`);
  }, [searchParams, filters, router, pathname]);

  const count = useMemo(() => Object.values(filters).filter((v) => v).length, [filters]);

  // ── Derived active-filter state (replaces useBlogFilters) ──
  const activeTags = useMemo(() => searchParams.get("tags")?.split(",").filter(Boolean) ?? [], [searchParams]);
  const activeDateFrom = useMemo(() => searchParams.get("published_gte") ?? null, [searchParams]);
  const activeDateTo = useMemo(() => searchParams.get("published_lte") ?? null, [searchParams]);
  const hasActiveFilters = useMemo(() => activeTags.length > 0 || !!activeDateFrom || !!activeDateTo, [activeTags, activeDateFrom, activeDateTo]);

  const removeFilter = useCallback((key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "tags" && value) {
      const newTags = (params.get("tags")?.split(",").filter(Boolean) ?? []).filter(
        (tag) => tag !== value
      );
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      } else {
        params.delete("tags");
      }
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  const clearAllFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return {
    filters,
    count,
    getFilter,
    setFilter,
    saveFilters,
    clearFilters,
    // Active filter reads + mutations (replaces useBlogFilters)
    activeTags,
    activeDateFrom,
    activeDateTo,
    hasActiveFilters,
    removeFilter,
    clearAllFilters,
  };
};

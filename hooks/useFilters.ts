"use client";


import { filterDiscoverParams } from "@/lib"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const useFilters = (pathname: string = "/blog") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters(filterDiscoverParams(params));
  }, [searchParams]);

  const getFilter = (key: string) => filters[key] ?? undefined;

  const setFilter = (value: Record<string, string>) => {
    setFilters((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const saveFilters = (value?: Record<string, string>) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...filters, ...value };
    const query = new URLSearchParams(updatedParams);
    router.replace(`${pathname}?${query.toString()}`);
  };

  const clearFilters = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const filteredParams = Object.keys(currentParams).reduce((acc, key) => {
      if (!filters[key]) {
        acc[key] = currentParams[key];
      }
      return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(filteredParams);
    setFilters({});
    router.replace(`${pathname}?${query.toString()}`);
  };

  const count = Object.values(filters).filter((v) => v).length;

  // ── Derived active-filter state (replaces useBlogFilters) ──
  const activeTags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
  const activeDateFrom = searchParams.get("published_gte") ?? null;
  const activeDateTo = searchParams.get("published_lte") ?? null;
  const hasActiveFilters = activeTags.length > 0 || !!activeDateFrom || !!activeDateTo;

  const removeFilter = (key: string, value?: string) => {
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
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

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

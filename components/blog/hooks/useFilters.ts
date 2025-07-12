"use client";


import { filterDiscoverParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const useFilters = (pathname: string = "/blog") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setFilters(filterDiscoverParams(params)); // Retain only relevant params
  }, [searchParams]);

  const getFilter = (key: string) => filters[key] ?? undefined;

  const setFilter = (value: Record<string, string>) => {
    setFilters((prev) => ({
      ...prev,
      ...value,
    }));
  };

  const saveFilters = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...filters };
    const query = new URLSearchParams(updatedParams);
    router.replace(`${pathname}?${query.toString()}`);
  };

  const clearFilters = () => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const filteredParams = Object.keys(currentParams).reduce((acc, key) => {
      if (!filters[key]) {
        acc[key] = currentParams[key]; // Retain params that aren't filters
      }
      return acc;
    }, {} as Record<string, string>);

    const query = new URLSearchParams(filteredParams);
    setFilters({});
    router.replace(`${pathname}?${query.toString()}`);
  };

  const count = Object.values(filters).filter((v) => v).length;

  return {
    filters,
    count,
    getFilter,
    setFilter,
    saveFilters,
    clearFilters,
  };
};

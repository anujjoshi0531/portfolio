"use client";

import {
  CalendarArrowDown,
  CalendarArrowUp,
  ArrowUpDown,
  ArrowUpAZ,
  ArrowDownZA,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const useSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options = [
    {
      label: "Published (Newest First)",
      value: "published-descending",
      icon: CalendarArrowUp,
    },
    {
      label: "Published (Oldest First)",
      value: "published-ascending",
      icon: CalendarArrowDown,
    },
    {
      label: "Title (A-Z)",
      value: "name-ascending",
      icon: ArrowUpAZ,
    },
    {
      label: "Title (Z-A)",
      value: "name-descending",
      icon: ArrowDownZA,
    },
    {
      label: "Last Updated (Recent)",
      value: "updates-descending",
      icon: CalendarArrowUp,
    },
    {
      label: "Last Updated (Oldest)",
      value: "updates-ascending",
      icon: CalendarArrowDown,
    },
  ];

  const getSort = () => {
    return searchParams.get("sort_by") ?? "published-descending";
  };

  const setSort = (value: string) => {
    const search = new URLSearchParams(searchParams);

    search.set("sort_by", value);
    search.delete("page");

    router.replace(`/blog?${search.toString()}`);
  };

  return {
    options,
    getSort,
    setSort,
  };
};

"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearch = (
  auto = true,
  searchPath = "/blog",
  gaEventCategory = "blog"
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [page, setPage] = useState<string>();
  const [term, setTerm] = useState(query ?? "");
  const [value] = useDebounce(term, 500);

  useEffect(() => {
    if (pathname !== searchPath) {
      setPage(pathname);
    }
    if (!query) {
      setTerm("");
    }
  }, [pathname, query, searchPath]);

  useEffect(() => {
    if (auto) {
      handleSearch(value);
    }
  }, [value, auto]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(value: string) {
    if (value !== "") {
      router.push(`${searchPath}?q=${value}`);
      sendGAEvent("event", gaEventCategory, {
        search_term: value,
      });
      return;
    }

    if (value === "" && pathname === searchPath) {
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
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && query !== value && !auto) {
      handleSearch(value);
    }

    if (event.key === "Escape") {
      clearSearch();
    }
  }

  function clearSearch() {
    setTerm("");
  }

  return {
    term,
    handleChange,
    handleKeyDown,
    clearSearch,
  };
};

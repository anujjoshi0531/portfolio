"use client";

import React, { useMemo } from "react";
import { useFilters } from "@/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const { saveFilters } = useFilters();

  const numbers = useMemo(() => {
    const pageNumbers: (number | string)[] = [];

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) {
      pageNumbers.push(1, "ellipsis1");
    } else if (startPage === 2) {
      pageNumbers.push(1);
    }

    for (let num = startPage; num <= endPage; num++) {
      pageNumbers.push(num);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis2", totalPages);
    } else if (endPage === totalPages - 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious className="hidden md:flex" onClick={() => saveFilters({ page: (currentPage - 1).toString() })} />
          </PaginationItem>
        )}

        {totalPages > 1 &&
          numbers.map((number) =>
            number === "ellipsis1" || number === "ellipsis2" ? (
              <PaginationEllipsis className="hidden md:flex" key={number} />
            ) : (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={number === currentPage}
                  onClick={() => saveFilters({ page: number.toString() })}>
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext className="hidden md:flex" onClick={() => saveFilters({ page: (currentPage + 1).toString() })} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

"use client"

import { SearchResultItem, EmptyState, SearchFooter } from "@/components/site/search"

interface SearchResultsProps {
  className?: string;
  hasQuery: boolean
  query: string
  searchResult: unknown
  searchError: unknown
  onClose: () => void
}

export function SearchResults({ className, hasQuery, query, searchResult, searchError, onClose }: SearchResultsProps) {
  return (
    <div className={className}>
      <div className="max-h-[500px] overflow-y-auto">
        {!hasQuery ? (
          <EmptyState message="Start typing to search pages..." />
        ) : hasQuery && searchResult && Array.isArray((searchResult as { results?: unknown[] }).results) ? (
          (searchResult as { results: unknown[] }).results.length > 0 ? (
            <div>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(searchResult as any).results.map((page: NotionBlogPage) => (
                <SearchResultItem key={page.id} page={page as any} onClose={onClose} /> // eslint-disable-line @typescript-eslint/no-explicit-any
              ))}
            </div>
          ) : (
            <EmptyState title="No pages found" message={`Try different search terms for "${query}"`} />
          )
        ) : hasQuery && searchError ? (
          <EmptyState variant="error" title="Search error" message="Please try again or contact support" />
        ) : null}
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {hasQuery && searchResult && (searchResult as any).results && <SearchFooter count={(searchResult as any).results.length || 0} />}
    </div>
  )
}

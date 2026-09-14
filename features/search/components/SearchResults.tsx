"use client"

import { EmptyState } from "@/features/search/components/EmptyState"
import { SearchFooter } from "@/features/search/components/SearchFooter"
import { SearchResultItem } from "@/features/search/components/SearchResultItem"
import type { BlogListingItem } from "@/features/blog/lib/listing"

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
              {(searchResult as { results: BlogListingItem[] }).results.map((page) => (
                <SearchResultItem key={`${page.kind}:${page.id}`} page={page} onClose={onClose} />
              ))}
            </div>
          ) : (
            <EmptyState title="No pages found" message={`Try different search terms for "${query}"`} />
          )
        ) : hasQuery && searchError ? (
          <EmptyState variant="error" title="Search error" message="Please try again or contact support" />
        ) : null}
      </div>
      {hasQuery && searchResult && (searchResult as any).results && <SearchFooter count={(searchResult as any).results.length || 0} />}
    </div>
  )
}

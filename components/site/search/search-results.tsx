"use client"

import { SearchResultItem } from "./search-result-item"
import { EmptyState } from "./empty-state"
import { SearchFooter } from "./search-footer"

interface SearchResultsProps {
  hasQuery: boolean
  query: string
  searchResult: any
  searchError: any
  onClose: () => void
}

export function SearchResults({ hasQuery, query, searchResult, searchError, onClose }: SearchResultsProps) {
  return (
    <>
      <div className="max-h-[500px] overflow-y-auto">
        {!hasQuery ? (
          <EmptyState message="Start typing to search pages..." />
        ) : hasQuery && searchResult ? (
          searchResult.results?.length > 0 ? (
            <div>
              {searchResult.results.map((page: any) => (
                <SearchResultItem key={page.id} page={page} onClose={onClose} />
              ))}
            </div>
          ) : (
            <EmptyState title="No pages found" message={`Try different search terms for "${query}"`} />
          )
        ) : hasQuery && searchError ? (
          <EmptyState variant="error" title="Search error" message="Please try again or contact support" />
        ) : null}
      </div>

      {hasQuery && searchResult && searchResult.results && <SearchFooter count={searchResult.results.length || 0} />}
    </>
  )
}

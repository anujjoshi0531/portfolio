"use client"

import type React from "react"
import { forwardRef, useCallback } from "react"
import { Loader2, SearchIcon } from "lucide-react"

interface SearchInputProps {
  query: string
  setQuery: (query: string) => void
  isLoading: boolean
  onClose: () => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ query, setQuery, isLoading, onClose }, ref) => {
    const handleQueryChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
      },
      [setQuery],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") onClose()
      },
      [onClose],
    )

    return (
      <div className="px-6">
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="flex-shrink-0">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            ) : (
              <SearchIcon className="w-5 h-5 text-muted-foreground" />
            )}
          </div>

          <input
            ref={ref}
            className="flex-1 text-base placeholder:text-muted-foreground border-none outline-none bg-transparent"
            placeholder="Search pages..."
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            autoComplete="on"
            spellCheck={false}
          />
        </div>
      </div>
    )
  },
)

SearchInput.displayName = "SearchInput"
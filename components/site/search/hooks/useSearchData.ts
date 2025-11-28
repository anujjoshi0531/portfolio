"use client"

import { useState, useEffect, useMemo } from "react"
import { useDebounce } from "@/hooks/useDebounce"

export function useSearchData() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<any>(null)
  const [searchError, setSearchError] = useState<any>(null)

  const value = useDebounce<string>(query, 300)
  const hasQuery = useMemo(() => query.trim().length > 0, [query])

  useEffect(() => {
    const performSearch = async () => {
      if (!value.trim()) {
        setIsLoading(false)
        setSearchResult(null)
        setSearchError(null)
        return
      }

      setIsLoading(true)
      setSearchError(null)

      try {
        const result = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: value }),
        })

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`)
        }

        const res = await result.json()
        setSearchResult(res)
      } catch (error: any) {
        console.error("Search error:", error)
        setSearchError({ error: "Search failed" })
        setSearchResult(null)
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
  }, [value])

  return {
    query,
    setQuery,
    isLoading,
    searchResult,
    searchError,
    hasQuery,
  }
}

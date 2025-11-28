"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Search } from "lucide-react"
import { useKeyboardShortcut , useSearchData } from "@/components/site/search/hooks"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TooltipComponent from "@/components/global/tooltip-component"
import { SearchInput } from "./search-input"
import { SearchResults } from "./search-results"

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { query, setQuery, isLoading, searchResult, searchError, hasQuery } = useSearchData()

  useKeyboardShortcut(() => setIsOpen(true), isOpen)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipComponent message="Search pages (Ctrl+K)">
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open search dialog (Ctrl+K)">
            <Search />
          </Button>
        </DialogTrigger>
      </TooltipComponent>

      <DialogContent className="max-w-4xl p-0 z-[1000000]">
        <DialogHeader className="px-6 py-2">
          <DialogTitle className="sr-only">Search</DialogTitle>
        </DialogHeader>

        <SearchInput ref={inputRef} query={query} setQuery={setQuery} isLoading={isLoading} onClose={handleClose} />

        <SearchResults
          hasQuery={hasQuery}
          query={query}
          searchResult={searchResult}
          searchError={searchError}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

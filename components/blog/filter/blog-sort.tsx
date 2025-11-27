"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownWideNarrow, ChevronDown, ChevronUp, Check } from "lucide-react"

interface SortOption {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

interface BlogSortProps {
  onSortChange?: (value: string) => void
  defaultValue?: string
}

export const BlogSort: React.FC<BlogSortProps> = ({ onSortChange, defaultValue = "date-desc" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const options: SortOption[] = [
    {
      label: "Most Recent",
      value: "date-desc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Least Recent",
      value: "date-asc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Most Popular",
      value: "views-desc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Least Popular",
      value: "views-asc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Most Likes",
      value: "likes-desc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Least Likes",
      value: "likes-asc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Reading Time (Shortest)",
      value: "reading_time-asc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Reading Time (Longest)",
      value: "reading_time-desc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Title (A-Z)",
      value: "title-asc",
      icon: ArrowDownWideNarrow,
    },
    {
      label: "Title (Z-A)",
      value: "title-desc",
      icon: ArrowDownWideNarrow,
    },
  ]

  const selectedOption = options.find((option) => option.value === selectedValue)

  const handleSortChange = (value: string) => {
    setSelectedValue(value)
    onSortChange?.(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap justify-start" aria-label={`Sort blogs by ${selectedOption?.label?.toLowerCase() || "default"}`}>
          <ArrowDownWideNarrow className="size-4" />
          {selectedOption?.label || "Sort by"}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <option.icon className="size-4" />
              {option.label}
            </span>
            <div className="flex items-center gap-1">
              {option.value.includes("asc") ? (
                <ChevronUp className="size-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground" />
              )}
              {selectedValue === option.value && <Check className="size-4 text-primary" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

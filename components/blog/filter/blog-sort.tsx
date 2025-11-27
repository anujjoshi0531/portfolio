"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownWideNarrow, ChevronDown, ChevronUp, Check, CalendarArrowUp, CalendarArrowDown, ArrowUpAZ, ArrowDownZA } from "lucide-react"

interface SortOption {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

interface BlogSortProps {
  onSortChange?: (value: string) => void
  defaultValue?: string
}

export const BlogSort: React.FC<BlogSortProps> = ({ onSortChange, defaultValue = "published-descending" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const options: SortOption[] = [
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
  ]

  const selectedOption = options.find((option) => option.value === selectedValue)

  const handleSortChange = (value: string) => {
    setSelectedValue(value)
    onSortChange?.(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap justify-start" aria-label={`Sort blogs by ${selectedOption?.label?.toLowerCase() || "default"}`}>
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
              {option.value.includes("ascending") ? (
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

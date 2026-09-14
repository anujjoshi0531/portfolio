"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"
import { sortOptions } from "@/lib/client/data"

interface BlogSortProps {
  onSortChange?: (value: string) => void
  defaultValue?: string
  namesOnly?: boolean
}

export const BlogSort: React.FC<BlogSortProps> = ({ onSortChange, defaultValue = "published-descending", namesOnly = false }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  const selectedOption = sortOptions.find((option) => option.value === selectedValue)

  const handleSortChange = (value: string) => {
    setSelectedValue(value)
    onSortChange?.(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary"
          className="rounded-md h-9 px-2 w-full justify-start"
          size="sm" aria-label={`Sort resources by ${selectedOption?.label?.toLowerCase() || "default"}`}>
          {selectedOption?.icon && <selectedOption.icon />}
          {selectedOption?.label || "Sort by"}
          <ChevronDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {sortOptions.filter((option) => !namesOnly || option.value.startsWith("name-")).map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className="cursor-pointer w-full">
            <span className="flex items-center gap-2 text-sm">
              <option.icon />
              {option.label}
            </span>
            {selectedValue === option.value && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

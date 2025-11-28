"use client"

import Link from "next/link"
import { FileIcon, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { extractPlainText, timeAgo } from "@/lib"

interface SearchResultItemProps {
  page: any
  onClose: () => void
}

export const SearchResultItem = (function SearchResultItem({ page, onClose }: SearchResultItemProps) {
  const title = extractPlainText(page.properties.Name?.title || [])
  const description = extractPlainText(page.properties.Description?.rich_text || [])
  const author = extractPlainText(page.properties.Author?.rich_text || [])
  const publishedDate = page.properties.Published?.date?.start
  const tags = page.properties.Tags?.multi_select || []
  const slug = extractPlainText(page.properties.Slug?.rich_text || [])
  const type = page.properties.Type?.select?.name
  const pageUrl = slug || page.id

  return (
    <Link
      href={`/blog/${pageUrl}`}
      className="block cursor-pointer px-6 py-4 hover:bg-accent transition-colors"
      onClick={onClose}
      aria-label={`View ${title || "page"}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {page.icon?.emoji ? (
            <span className="text-lg">{page.icon.emoji}</span>
          ) : (
            <FileIcon className="size-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-base truncate">{title || "Untitled"}</h3>
            {type && (<Badge>{type}</Badge>)}
          </div>

          {description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>}

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {author && (
              <div className="flex items-center gap-1">
                <User className="size-3" />
                <span>{author}</span>
              </div>
            )}
            {publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>{timeAgo(publishedDate)}</span>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag: any) => (
                <Badge key={tag.id} variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
})

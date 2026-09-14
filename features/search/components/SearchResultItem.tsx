"use client"

import Link from "next/link"
import { FileIcon, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { timeAgo } from "@/lib/utils/dates";
import type { BlogListingItem } from "@/features/blog/lib/listing";

interface SearchResultItemProps {
  page: BlogPost | BlogListingItem
  onClose: () => void
}

export const SearchResultItem = (function SearchResultItem({ page, onClose }: SearchResultItemProps) {
  const title = page.title
  const description = page.description
  const author = "author" in page ? page.author : undefined
  const publishedDate = page.published ?? page.created
  const tags = page.tags ? page.tags.map((t, i) => ({ id: `${i}`, name: t })) : []
  const category = page.category
  const pageUrl = page.slug || page.id

  return (
    <Link
      href={"href" in page ? page.href : `/blog/${pageUrl}`}
      className="block cursor-pointer px-6 py-4 hover:bg-accent transition-colors"
      onClick={onClose}
      aria-label={`View ${title || "page"}`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          <FileIcon className="size-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-base truncate">{title || "Untitled"}</h3>
            {"kind" in page && <span className="text-xs capitalize">{page.kind === "post" ? "Article" : page.kind}</span>}
            {category && (<Badge>{category}</Badge>)}
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
                <span>{timeAgo(new Date(publishedDate))}</span>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
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

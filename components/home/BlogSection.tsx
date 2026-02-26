import { searchPages } from "@/lib/server/notion"
import BlogClient from "./BlogClient"
import { Suspense } from "react"
import BlogCardSkeleton from '@/components/blog/BlogCardSkeleton'

function BlogSkeleton() {
  return (
    <div className="flex space-x-1 overflow-hidden px-8 py-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  )
}

async function BlogData({ tags }: { tags?: string[] }) {
  const data = await searchPages({
    limit: 5,
    tags,
  })

  return <BlogClient blogs={data.results as unknown as NotionBlogPage[]} />
}

export default function BlogSection({ tags }: { tags?: string[] }) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogData tags={tags} />
    </Suspense>
  )
}

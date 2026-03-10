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

async function BlogData({ tags, excludeId }: { tags?: string[], excludeId?: string }) {
  const data = await searchPages({
    limit: excludeId ? 6 : 5,
    tags,
  })

  let results = data.results as unknown as NotionBlogPage[];
  
  if (excludeId) {
    results = results.filter((post) => post.id !== excludeId);
  }

  results = results.slice(0, 5);

  return <BlogClient blogs={results} />
}

export default function BlogSection({ tags, excludeId }: { tags?: string[], excludeId?: string }) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogData tags={tags} excludeId={excludeId} />
    </Suspense>
  )
}

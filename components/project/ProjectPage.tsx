import { getProject, getProjectType } from "@/lib/server/notion"
import ProjectPageClient from "./ProjectPageClient"
import { Suspense } from "react"
import { PageTemplate } from "@/components/global/template"
import { Skeleton } from "@/components/ui/skeleton"

function ProjectPageSkeleton() {
  return (
    <>
      <PageTemplate title="Project" subtitle="My Recent Works" />
      <div className="py-12 min-h-screen">
        {/* Tabs skeleton */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <Skeleton className="h-10 w-16 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-22 rounded-md" />
        </div>
        {/* Grid skeleton */}
        <div className="grid py-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg border p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

async function ProjectPageData() {
  const [projects, types] = await Promise.all([
    getProject(),
    getProjectType(),
  ])

  return <ProjectPageClient projects={projects} types={types || []} />
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <ProjectPageData />
    </Suspense>
  )
}
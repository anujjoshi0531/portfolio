import { getProject } from "@/lib/server/notion"
import ProjectClient from "./ProjectClient"
import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

function ProjectSkeleton() {
  return (
    <section className="relative h-[300vh]" aria-label="Projects showcase">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[450px] w-[450px] rounded-lg shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}

async function ProjectData({ className }: { className?: string }) {
  const projects = await getProject()
  return <ProjectClient projects={projects as unknown as NotionProjectPage[]} className={className} />
}

export default function ProjectSection({ className }: { className?: string }) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectData className={className} />
    </Suspense>
  )
}

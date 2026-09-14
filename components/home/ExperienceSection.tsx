import { getExperiences } from "@/features/about/lib/content"
import type { ContentItem } from "@/lib/content/types"
import ExperienceClient from "./ExperienceClient"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionTemplate } from '@/components/global/SectionTemplate'

function formatExperience(exp: ContentItem) {
  const descLines = exp.content
    ? exp.content.split("\n").map((l: string) => l.replace(/^- /, "").trim()).filter(Boolean)
    : [exp.description || ""];

  return {
    company: exp.organization || exp.company || "",
    role: exp.title || "",
    start: exp.start ? new Date(exp.start) : new Date(),
    end: exp.end ? new Date(exp.end) : null,
    place: exp.location || "",
    link: exp.url || "#",
    description: descLines.length > 0 ? descLines : [exp.description || ""],
    skills: exp.skills || [],
    certificate: exp.frontmatter?.certificate ? String(exp.frontmatter.certificate) : null,
  }
}

function ExperienceSkeleton() {
  return (
    <SectionTemplate title="Experience" subtitle="Where I've worked" id="experience">
      <div className="mx-auto max-w-4xl grid grid-rows-1 md:h-[40vh] md:grid-cols-7 gap-4 md:gap-8">
        <ul className="relative h-max-content flex md:block md:col-span-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="h-10 px-4 flex text-lg items-center w-content text-nowrap">
              <Skeleton className="h-8 w-24 md:w-32" />
            </li>
          ))}
        </ul>
        <div className="h-max duration-200 md:col-span-5 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-5 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </SectionTemplate>
  )
}

function groupAndSortExperiences(data: ContentItem[]) {
  const grouped: Record<string, ReturnType<typeof formatExperience>[]> = {}
  data.forEach((exp) => {
    const type = exp.type || "Other"
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(formatExperience(exp))
  })

  return { grouped, sortedTypes: Object.keys(grouped).sort() }
}

async function ExperienceData() {
  const data = getExperiences()
  const { grouped, sortedTypes } = groupAndSortExperiences(data)

  return (
    <ExperienceClient
      groupedExperiences={grouped}
      types={sortedTypes}
    />
  )
}

export default function ExperienceSection() {
  return (
    <Suspense fallback={<ExperienceSkeleton />}>
      <ExperienceData />
    </Suspense>
  )
}

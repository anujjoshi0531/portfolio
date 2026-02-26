import { getExperience } from "@/lib/server/notion"
import { extractPlainText } from "@/lib"
import ExperienceClient from "./ExperienceClient"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionTemplate } from "@/components/global/template"

function formatExperience(exp: NotionExperience) {
  return {
    company: extractPlainText(exp.properties?.Organization.rich_text) || "",
    role: extractPlainText(exp.properties?.Role.title) || "",
    start: new Date(exp.properties?.Start.date.start),
    end: exp.properties?.End.date?.start ? new Date(exp.properties.End.date.start) : null,
    place: extractPlainText(exp.properties?.Place.rich_text) || "",
    link: exp.properties?.URL.url || "#",
    description: extractPlainText(exp.properties?.Description.rich_text)
      .split("\n")
      .filter((line) => line.trim() !== ""),
    skills: exp.properties?.Skills.multi_select.map((skill) => skill.name) || [],
    certificate: exp.properties?.Certificate.url || null,
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

function groupAndSortExperiences(data: NotionExperience[]) {
  const grouped: Record<string, ReturnType<typeof formatExperience>[]> = {}
  data.forEach((exp) => {
    const type = exp.properties?.Type?.select?.name || "Other"
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(formatExperience(exp))
  })

  return { grouped, sortedTypes: Object.keys(grouped).sort() }
}

async function ExperienceData() {
  const data = (await getExperience()) as unknown as NotionExperience[]
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

"use client"

import { SectionTemplate } from "@/components/global/template"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, extractPlainText, timeAgo } from "@/lib/utils"
import { Award, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import ErrorCard from "../global/Error-Card"

type NotionExperience = {
  id: string
  properties: {
    Role: { title: { plain_text: string }[] }
    Type: { select: { name: string } | null }
    Organization: { rich_text: { plain_text: string }[] }
    Description: { rich_text: { plain_text: string }[] }
    Start: { date: { start: string } }
    End: { date: { start: string | null } }
    Place: { rich_text: { plain_text: string }[] }
    URL: { url: string | null }
    Certificate: { url: string | null }
    Skills: { multi_select: { name: string }[] }
  }
}

export default function ExperienceSection() {
  const [groupedExperiences, setGroupedExperiences] = useState<Record<string, NotionExperience[]>>({})
  const [types, setTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("")
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience")
        const data: NotionExperience[] = await response.json()

        const grouped: Record<string, NotionExperience[]> = {}
        data.forEach((exp) => {
          const type = exp.properties?.Type?.select?.name || "Other"
          if (!grouped[type]) grouped[type] = []
          grouped[type].push(exp)
        })

        const sortedTypes = Object.keys(grouped).sort()
        setGroupedExperiences(grouped)
        setTypes(sortedTypes)
        setSelectedType(sortedTypes[0] || "")
        setLoading(false)
      } catch (error) {
        console.error("Error fetching experiences:", error)
        setError(true)
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  useEffect(() => {
    setCurrentExperienceIndex(0)
  }, [selectedType])

  const formatExperience = (exp: NotionExperience) => ({
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
    certificate: exp.properties?.Certificate.url,
  })

  const renderContent = () => {
    if (error) return <ErrorCard />
    if (loading) return <ExperienceSkeleton />

    if (!groupedExperiences || types.length === 0) {
      return <div className="mx-auto max-w-4xl text-center">No experiences found</div>
    }

    const selectedExperiences = groupedExperiences[selectedType]
    const currentExperience = selectedExperiences[currentExperienceIndex]

    return (
      <div className="mx-auto max-w-5xl grid grid-rows-1 md:grid-cols-7 gap-4 md:gap-8">
        {/* Experience Type Tabs */}
        <ul className="relative h-max-content flex md:block overflow-x-scroll md:overflow-auto md:col-span-2 pr-2">
          {types.map((type) => (
            <li
              key={type}
              className={`h-10 px-4 flex text-lg items-center justify-between cursor-pointer w-fit md:w-full text-nowrap hover:bg-muted group relative ${
                type === selectedType ? "bg-muted border-l-2 border-theme" : ""
              }`}
              onClick={() => setSelectedType(type)}
            >
              <span className={`group-hover:text-theme font-semibold ${type === selectedType ? "text-theme" : ""}`}>
                {type} <Badge className="ml-4">{groupedExperiences[type]?.length}</Badge>
              </span>
            </li>
          ))}
        </ul>

        {/* Single Experience Display */}
        <div className="md:col-span-5 relative pr-6 space-y-8">
          {currentExperience && (
            <>
              <ExperienceContent
                key={currentExperience.id}
                formattedExperience={formatExperience(currentExperience)}
                handleCertificateDownload={() => {
                  const cert = formatExperience(currentExperience).certificate
                  if (cert) window.open(cert, "_blank")
                }}
              />
              <div className="w-full absolute top-[40%] left-0 right-0 flex justify-end">
                <button
                  onClick={() =>
                    setCurrentExperienceIndex((prev) => (prev + 1) % selectedExperiences.length)
                  }
                  className={cn(
                    "cursor-pointer transform font-bold bg-primary",
                    "ring-2 ring-primary border-2 rounded-full p-1 border-background hover:text-primary duration-150",
                    "top-1/2 left-0 -translate-x-2 -translate-y-1/2 z-10 group",
                    "size-8 rounded-full",
                    "bg-primary/80 backdrop-blur-md",
                    "shadow-lg",
                    "hover:bg-primary",
                    "disabled:opacity-0",
                    "transition-all duration-300 ease-out",
                    "hover:scale-110 active:scale-95",
                  )}
                >
                  <ChevronRight className="size-5 mx-auto text-background transition-colors duration-300" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="w-full mt-4 flex justify-center gap-2">
                {selectedExperiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExperienceIndex(index)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all duration-300",
                      index === currentExperienceIndex
                        ? "bg-theme scale-125"
                        : "bg-muted hover:bg-theme/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <SectionTemplate title="Experience" subtitle="Where I've worked">
      {renderContent()}
    </SectionTemplate>
  )
}

function ExperienceContent({
  formattedExperience,
  handleCertificateDownload,
}: {
  formattedExperience: any
  handleCertificateDownload: () => void
}) {
  return (
    <div className="h-max duration-200 space-y-2">
      <div className="sm:flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-xl text-theme">{formattedExperience.role}</h3>
          {formattedExperience.certificate && (
            <Button variant="ghost" size="mdIcon" onClick={handleCertificateDownload}>
              <Award className="text-theme" />
            </Button>
          )}
        </div>
        <time className="text-sm">
          {timeAgo(formattedExperience.start)} –{" "}
          {formattedExperience.end ? timeAgo(formattedExperience.end) : "Present"}
        </time>
      </div>
      <a href={formattedExperience.link} className="link cursor-pointer">
        {formattedExperience.company}
        {formattedExperience.place && <span>,&nbsp;{formattedExperience.place}</span>}
      </a>
      <ul className="list-none flex flex-col gap-1 mt-4 px-5">
        {formattedExperience.description.map((desc: string, index: number) => (
          <li key={index} className="custom-bullet">
            {desc}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-2">
        {formattedExperience.skills.map((skill: string) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </div>
  )
}

export function ExperienceSkeleton() {
  return (
    <div className="mx-auto max-w-4xl grid grid-rows-1 md:h-[40vh] md:grid-cols-7 gap-4 md:gap-8">
      <ul className="relative h-max-content flex md:block md:col-span-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="h-10 px-4 flex text-lg items-center w-content text-nowrap">
            <Skeleton className="h-8 w-24 md:w-32" />
          </li>
        ))}
      </ul>
      <div className="h-max duration-200 md:col-span-5">
        <div className="sm:flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-4 w-32 mt-2 sm:mt-0" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-40" />
        </div>
        <ul className="list-none flex flex-col gap-2 mt-4 pl-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-muted rounded-full mt-2 flex-shrink-0" />
              <Skeleton className="h-4 w-full max-w-md" />
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

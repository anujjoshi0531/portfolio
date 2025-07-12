"use client"

import { SectionTemplate } from "@/components/global/template"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { extractPlainText, timeAgo } from "@/lib/utils"
import { Award } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import ErrorCard from "../global/Error-Card"

type NotionExperience = {
  id: string
  properties: {
    Role: { title: { plain_text: string }[] }
    Organization: { rich_text: { plain_text: string }[] }
    Description: { rich_text: { plain_text: string }[] }
    Start: { date: { start: string } }
    End: { date: { start: string } }
    Place: { rich_text: { plain_text: string }[] }
    URL: { url: string | null }
    Certificate: { url: string | null }
    Skills: { multi_select: { name: string }[] }
  }
}

export function ExperienceSkeleton() {
  return (
    <div className="mx-auto max-w-4xl grid grid-rows-1 md:h-[40vh] md:grid-cols-7 gap-4 md:gap-8">
      {/* Left sidebar - Organization tabs skeleton */}
      <ul className="relative h-max-content flex md:block md:col-span-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="h-10 px-4 flex text-lg items-center w-content text-nowrap">
            <Skeleton className="h-8 w-24 md:w-32" />
          </li>
        ))}
      </ul>

      {/* Right content - Experience details skeleton */}
      <div className="h-max duration-200 md:col-span-5">
        {/* Header with role and certificate */}
        <div className="sm:flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
          <Skeleton className="h-4 w-32 mt-2 sm:mt-0" />
        </div>

        {/* Company and location */}
        <div className="mt-2">
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Description list */}
        <ul className="list-none flex flex-col gap-2 mt-4 pl-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-muted rounded-full mt-2 flex-shrink-0" />
              <Skeleton className="h-4 w-full max-w-md" />
            </li>
          ))}
        </ul>

        {/* Skills badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<NotionExperience[]>([])
  const [selected, setSelected] = useState(0)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience')
        const data = await response.json()
        setExperiences(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.error('Error fetching experiences:', error)
        setLoading(false)
      }
    }
    
    fetchExperiences()
  }, [])

  // Format experience data
  const formatExperience = (exp: any) => {
    return {
      company: extractPlainText(exp.properties.Organization.rich_text) || "",
      role: extractPlainText(exp.properties.Role.title) || "",
      start: new Date(exp.properties.Start.date.start),
      end: new Date(exp.properties.End.date.start),
      place: extractPlainText(exp.properties.Place.rich_text) || "",
      link: exp.properties.URL.url || "#",
      description: extractPlainText(exp.properties.Description.rich_text).split("\n").filter((line) => line.trim() !== ""),
      skills: exp.properties.Skills.multi_select.map((skill: any) => skill.name),
      certificate: exp.properties.Certificate.url,
    }
  }
  
  // Render appropriate content based on state
  const renderContent = () => {
    if (error) {
      return <ErrorCard />
    }
    
    if (loading) {
      return <ExperienceSkeleton />
    }
    
    if (experiences.length == 0) {
      return <div className="mx-auto max-w-4xl text-center">No experiences found</div>
    }

    const selectedExperience = experiences[selected];
    const formattedExperience = formatExperience(selectedExperience);

    const handleCertificateDownload = () => {
      if (formattedExperience.certificate) {
        window.open(formattedExperience.certificate, "_blank")
      }
    }

    return (
      <div className="mx-auto max-w-4xl grid grid-rows-1 md:h-[40vh] md:grid-cols-7 gap-4 md:gap-8">
        <ul className="relative h-max-content flex md:block overflow-x-scroll overflow-y-clip md:overflow-auto md:col-span-2">
          {experiences.map((experience, index) => (
            <li
              className={`h-10 px-4 flex text-lg items-center cursor-pointer w-content text-nowrap hover:bg-muted group relative ${
                index === selected && " bg-muted border-b-2 border-l-0 md:border-b-0 md:border-l-2 border-theme"
              }`}
              onClick={() => setSelected(index)}
              key={experience.id}
            >
              <span
                className={`flex justify-center items-center select-none group-hover:text-theme font-semibold ${
                  index === selected && " text-theme"
                }`}
              >
                {experience.properties.Organization.rich_text[0]?.plain_text || ""}
              </span>
            </li>
          ))}
        </ul>
        <div className="h-max duration-200 md:col-span-5">
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
              {timeAgo(formattedExperience.start)}
              &nbsp;-&nbsp;
              {timeAgo(formattedExperience.end)}
            </time>
          </div>
          <a href={formattedExperience.link} className="link cursor-pointer">
            {formattedExperience.company}
            {formattedExperience.place && <span>,&nbsp;{formattedExperience.place}</span>}
          </a>
          <ul className="list-none flex flex-col gap-1 mt-4 pl-5">
            {formattedExperience.description.map((desc, index) => (
              <li key={index} className="custom-bullet">
                {desc}
              </li>
            ))}
          </ul>
          <div className="space-x-2 m-4">
            {formattedExperience.skills.map((skill: any) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
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

"use client"

import { motion } from "framer-motion"
import { useMemo, useState, useEffect } from "react"
import { childVariants, containerVariants } from "@/components/animate/animate"
import { PageTemplate } from "@/components/global/template"
import ProjectCard from "@/components/global/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import NoWork from "../site/NoWork"

// Loading skeleton components
const ProjectCardSkeleton = () => (
  <div className="bg-card rounded-lg border p-4 space-y-4">
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
)

const TabsSkeleton = () => (
  <div className="flex flex-wrap justify-center mb-8 gap-2">
    <Skeleton className="h-10 w-16 rounded-md" />
    <Skeleton className="h-10 w-24 rounded-md" />
    <Skeleton className="h-10 w-20 rounded-md" />
    <Skeleton className="h-10 w-28 rounded-md" />
    <Skeleton className="h-10 w-22 rounded-md" />
  </div>
)

const ProjectGridSkeleton = () => (
  <div className="grid py-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <ProjectCardSkeleton key={index} />
    ))}
  </div>
)

const ProjectPageSkeleton = () => (
  <div className="py-12 min-h-screen">
    <TabsSkeleton />
    <ProjectGridSkeleton />
  </div>
)

export default function ProjectPage() {
  const [projects, setProjects] = useState<any>(null)
  const [types, setTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch projects
        const projectsResponse = await fetch("/api/project", {
          headers: {
            'Cache-Control': 'max-age=3600',
          },
        })
        const projectsData = await projectsResponse.json()

        // Fetch types/categories
        const typesResponse = await fetch("/api/project-type", {
          headers: {
            'Cache-Control': 'max-age=3600',
          },
        })
        const typesData = await typesResponse.json()

        setProjects(projectsData)
        setTypes(typesData)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const allProjects = useMemo(() => {
    if (!projects) return []
    return projects
  }, [projects])

  const getFilteredProjects = (categoryId: string) => {
    if (categoryId === "-1") return allProjects
    return allProjects.filter((project: any) => project?.properties?.Category?.select?.id === categoryId)
  }

  const renderProjectCards = (categoryId: string) => {
    const filteredProjects = getFilteredProjects(categoryId)
    return filteredProjects.length > 0 ? (
      <div
        className="grid py-2 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project: any) => (
            <ProjectCard key={project.id} project={project} size={true} />
        ))}
      </div>
    ) : (
      <div className="mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
        <NoWork />
        <p className="text-xl font-semibold">No projects found in this category.</p>
        <p className="text-muted-foreground mt-2">Check back later for new projects.</p>

      </div>
    )
  }

  if (loading) {
    return (
      <>
        <PageTemplate title="Project" subtitle="My Recent Works" />
        <ProjectPageSkeleton />
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageTemplate title="Project" subtitle="My Recent Works" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              aria-label="Try again to load projects"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageTemplate title="Project" subtitle="My Recent Works" />
      <div className="py-12 min-h-screen">
        <Tabs defaultValue="-1" className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-center mb-8 bg-transparent mx-auto gap-2">
            <TabsTrigger
              value="-1"
              className="text-nowrap w-fit p-2 px-4 sm:text-lg font-semibold hover:bg-muted/50 transition-colors data-[state=active]:border-b-theme dark:data-[state=active]:border-b-theme"
              aria-label="Show all projects"
            >
              All
            </TabsTrigger>
            {types?.map((type: any) => (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="text-nowrap w-fit p-2 px-4 sm:text-lg font-semibold hover:bg-muted/50 transition-colors data-[state=active]:border-b-theme dark:data-[state=active]:border-b-theme"
                aria-label={`Show ${type.name} projects`}
              >
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="-1">{renderProjectCards("-1")}</TabsContent>

          {types?.map((type: any) => (
            <TabsContent key={type.id} value={type.id}>
              {renderProjectCards(type.id)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}

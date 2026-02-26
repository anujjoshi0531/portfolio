"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { childVariants, containerVariants } from "@/components/animate/animate"
import { PageTemplate } from "@/components/global/template"
import ProjectCard from "@/components/global/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoWork from "../site/NoWork"

interface ProjectPageClientProps {
    projects: NotionProjectPage[]
    types: NotionProjectType[]
}

export default function ProjectPageClient({ projects, types }: ProjectPageClientProps) {
    const allProjects = useMemo(() => {
        if (!projects) return []
        return projects
    }, [projects])

    const getFilteredProjects = (categoryId: string) => {
        if (categoryId === "-1") return allProjects
        return allProjects.filter((project) => project?.properties?.Category?.select?.id === categoryId)
    }

    const renderProjectCards = (categoryId: string) => {
        const filteredProjects = getFilteredProjects(categoryId)
        return filteredProjects.length > 0 ? (
            <div className="grid py-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
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
                        {types?.map((type) => (
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

                    {types?.map((type) => (
                        <TabsContent key={type.id} value={type.id}>
                            {renderProjectCards(type.id)}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </>
    )
}

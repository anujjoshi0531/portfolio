"use client"

import { useRef, useState } from "react"
import { m, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { FileIcon } from "lucide-react"
import Link from "next/link"
import { MagnetBtn } from "@/components/animate/MagnetBtn"
import ProjectCard from "@/components/global/ProjectCard"

interface ProjectClientProps {
    projects: Project[]
    className?: string
}

export default function ProjectClient({ projects, className }: ProjectClientProps) {
    const [hovered, setHovered] = useState<number | null>(null)
    const targetRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    })

    const x = useTransform(scrollYProgress, [0, 1], ["50%", "-120%"])

    if (!projects?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileIcon className="size-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">No projects found</p>
                <p className="text-muted-foreground">Check back later for new projects</p>
            </div>
        )
    }

    return (
        <section ref={targetRef} className={`relative h-[100vh] ${className}`} aria-label="Projects showcase">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <m.div
                    style={{ x }}
                    className="flex gap-4 will-change-transform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id ?? `project-${index}`}
                            project={project}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                        />
                    ))}
                    <div className="flex items-center justify-center shrink-0 mx-8">
                        <Link href="/project" aria-label="View all projects">
                            <MagnetBtn text="Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp;">
                                <ArrowUpRight className="ml-2 size-5" />
                            </MagnetBtn>
                        </Link>
                    </div>
                </m.div>
            </div>
        </section>
    )
}

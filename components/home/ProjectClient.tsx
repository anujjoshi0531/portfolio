"use client"

import { useRef, useState } from "react"
import { MagnetBtn } from "@/components/animate/MagnetBtn"
import { motion, useTransform, useScroll } from "framer-motion"
import { MdArrowOutward } from "react-icons/md"
import ProjectCard from '../global/ProjectCard'
import Link from "next/link"
import { FileIcon } from "lucide-react"

interface ProjectClientProps {
    projects: NotionProjectPage[]
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

    const renderContent = () => {
        if (!projects || projects.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                    <FileIcon className="size-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">No projects found</p>
                    <p>Check back later for new projects</p>
                </div>
            )
        }

        return (
            <>
                {projects.map((project, index: number) => (
                    <ProjectCard
                        key={project.id || `project-${index}`}
                        project={project}
                        index={index}
                        hovered={hovered}
                        setHovered={setHovered}
                    />
                ))}
                <div className="flex items-center justify-center my-auto mx-8 shrink-0">
                    <Link href="/project" className="block" aria-label="View all projects">
                        <MagnetBtn text="Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp; Projects &nbsp;&#183;&nbsp;">
                            <MdArrowOutward className="ml-2" />
                        </MagnetBtn>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <section ref={targetRef} className={`relative h-[300vh] ${className || ""}`} aria-label="Projects showcase">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex gap-4 will-change-transform"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {renderContent()}
                </motion.div>
            </div>
        </section>
    )
}

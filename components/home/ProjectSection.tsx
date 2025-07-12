"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { MagnetBtn } from "@/components/animate/MagnetBtn"
import { motion, useTransform, useScroll } from "framer-motion"
import { MdArrowOutward } from "react-icons/md"
import ProjectCard from "../global/project-card"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"
import { FileIcon } from "lucide-react"
import ErrorCard from "../global/Error-Card"

interface ProjectSectionProps {
  className?: string
}

export default function ProjectSection({ className }: ProjectSectionProps) {
  const [projects, setProjects] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const targetRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["50%", "-120%"])

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/project")

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const renderContent = () => {
    // Loading state - show skeletons
    if (loading) {
      return (
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-[450px] w-[450px] rounded-lg flex-shrink-0" />
          ))}
        </div>
      )
    }

    if (error) {
      return <ErrorCard className="w-[450px]" />
    }

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
        {projects.map((project: any, index: number) => (
          <ProjectCard key={`project-${index}`} project={project} />
        ))}
        <div className="flex items-center justify-center my-auto mx-8 flex-shrink-0">
          <Link href="/project" className="block">
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

"use client"

import { SectionTemplate } from '@/components/global/SectionTemplate'
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, timeAgo } from "@/lib"
import { Award, ChevronRight } from "lucide-react"
import { LinkPreview } from "@/components/animate/LinkPreview"

interface FormattedExperience {
    company: string
    role: string
    start: Date
    end: Date | null
    place: string
    link: string
    description: string[]
    skills: string[]
    certificate: string | null
}

interface ExperienceClientProps {
    groupedExperiences: Record<string, FormattedExperience[]>
    types: string[]
}

export default function ExperienceClient({ groupedExperiences, types }: ExperienceClientProps) {
    const [selectedType, setSelectedType] = useState<string>(types[0] || "")
    const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0)

    useEffect(() => {
        setCurrentExperienceIndex(0)
    }, [selectedType])

    if (!groupedExperiences || types.length === 0) {
        return (
            <SectionTemplate title="Experience" subtitle="Where I've worked" id="experience">
                <div className="mx-auto max-w-4xl text-center">No experiences found</div>
            </SectionTemplate>
        )
    }

    const selectedExperiences = groupedExperiences[selectedType]
    const currentExperience = selectedExperiences?.[currentExperienceIndex]

    return (
        <SectionTemplate title="Experience" subtitle="Where I've worked" id="experience">
            <div className="mx-auto max-w-5xl grid grid-rows-1 md:grid-cols-7 gap-4 md:gap-8">
                {/* Experience Type Tabs */}
                <ul className="relative h-max-content flex md:block overflow-x-scroll md:overflow-auto md:col-span-2 pr-2">
                    {types.map((type) => (
                        <li
                            key={type}
                            className={`w-fit md:w-full ${type === selectedType ? "bg-muted border-l-2 border-theme" : ""
                                }`}
                        >
                            <button
                                className="h-10 px-4 flex text-lg items-center justify-between cursor-pointer w-full text-nowrap hover:bg-muted group relative"
                                onClick={() => setSelectedType(type)}
                                aria-label={`Filter experiences by ${type}`}
                            >
                                <span className={`group-hover:text-theme font-semibold ${type === selectedType ? "text-theme" : ""}`}>
                                    {type} <Badge className="ml-4">{groupedExperiences[type]?.length}</Badge>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Single Experience Display */}
                <div className="md:col-span-5 relative pr-6 space-y-8">
                    {currentExperience && (
                        <>
                            <ExperienceContent
                                key={`${selectedType}-${currentExperienceIndex}`}
                                formattedExperience={currentExperience}
                                handleCertificateDownload={() => {
                                    if (currentExperience.certificate) window.open(currentExperience.certificate, "_blank", "noopener,noreferrer")
                                }}
                            />
                            <div className="w-full absolute top-[40%] left-0 right-0 flex justify-end">
                                <button
                                    onClick={() =>
                                        setCurrentExperienceIndex((prev) => (prev + 1) % selectedExperiences.length)
                                    }
                                    aria-label="Next experience"
                                    className={cn(
                                        "navButtonStyles group",
                                        "top-1/2 left-0 -translate-x-2 -translate-y-1/2 size-8"
                                    )}
                                >
                                    <ChevronRight className="size-5 mx-auto text-background transition-colors duration-300" />
                                </button>
                            </div>

                            {/* Dot Indicators */}
                            <div className="w-full mt-4 flex justify-center gap-2" role="tablist" aria-label="Experience indicators">
                                {selectedExperiences.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentExperienceIndex(index)}
                                        role="tab"
                                        aria-label={`Go to experience ${index + 1}`}
                                        aria-selected={index === currentExperienceIndex}
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
        </SectionTemplate>
    )
}

function ExperienceContent({
    formattedExperience,
    handleCertificateDownload,
}: {
    formattedExperience: FormattedExperience
    handleCertificateDownload: () => void
}) {
    return (
        <div className="h-max duration-200 space-y-2">
            <div className="sm:flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl text-theme">{formattedExperience.role}</h3>
                    {formattedExperience.certificate && (
                        <Button variant="ghost" size="mdIcon" onClick={handleCertificateDownload} aria-label="Download certificate">
                            <Award className="text-theme" />
                        </Button>
                    )}
                </div>
                <time className="text-sm">
                    {timeAgo(formattedExperience.start)} –{" "}
                    {formattedExperience.end ? timeAgo(formattedExperience.end) : "Present"}
                </time>
            </div>
            <LinkPreview url={formattedExperience.link} className="link cursor-pointer" aria-label={`Visit ${formattedExperience.company} website`}>
                {formattedExperience.company}
                {formattedExperience.place && <span>,&nbsp;{formattedExperience.place}</span>}
            </LinkPreview>
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

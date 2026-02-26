"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { SectionTemplate } from '@/components/global/SectionTemplate';
import { FaGraduationCap } from "react-icons/fa";
import { timeAgo } from "@/lib";
import { Badge } from "../ui/badge";
import { LinkPreview } from "@/components/animate/LinkPreview";

interface Education {
    id: string;
    course: string;
    institution: string;
    place: string;
    grade: string;
    description: string[];
    start: string;
    end: string;
    skills: string[];
    type: string;
    url: string;
}

const EduCard = ({ edu }: { edu: Education }) => {
    const ref = useRef(null);
    const [hasPassed, setHasPassed] = useState(false);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start center"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (value) => {
            if (value >= 1 && !hasPassed) {
                setHasPassed(true);
            } else if (value < 1 && hasPassed) {
                setHasPassed(false);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, hasPassed]);

    const startAgo = useMemo(() => edu.start ? timeAgo(new Date(edu.start)) : "", [edu.start]);
    const endAgo = useMemo(() => edu.end ? timeAgo(new Date(edu.end)) : "Present", [edu.end]);

    return (
        <div
            ref={ref}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
            {/* Icon */}
            <motion.div
                className={`md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative isolate rounded-full p-2 transition-all duration-150 shrink-0 ${hasPassed
                    ? "bg-theme text-muted scale-110 shadow-lg shadow-theme"
                    : "bg-muted text-theme"
                    }`}
            >
                <FaGraduationCap className="text-2xl" />
            </motion.div>
            {/* Card */}
            <motion.div
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] px-8 py-6 rounded-lg shadow-md transition-all bg-muted/40 border border-border group-hover:shadow-lg group-hover:shadow-theme/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <div className="flex-1">
                        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
                            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                                {edu.course}
                                {edu.grade && <Badge>{edu.grade}</Badge>}
                            </h3>
                            <time className="text-xs text-muted-foreground">
                                {startAgo} - {endAgo}
                            </time>
                        </div>
                        <LinkPreview url={edu.url || "#"} className="font-medium link text-sm my-1" aria-label={`Visit ${edu.institution} website`}>
                            {edu.institution},&nbsp;
                            <span>{edu.place}</span>
                        </LinkPreview>
                    </div>
                </div>

                {/* Description */}
                {edu.description && edu.description.length > 0 && (
                    <ul className="list-none my-2 pl-5 text-sm text-muted-foreground">
                        {edu.description.map((desc: string, index: number) => (
                            <li key={index} className="custom-bullet">
                                {desc}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Skills */}
                {edu.skills && edu.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                        {edu.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

interface EducationClientProps {
    education: Education[];
}

export default function EducationClient({ education }: EducationClientProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });
    const bgHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <SectionTemplate title="Academics" subtitle="My Academic Journey" id="education">
            <div ref={ref} className="space-y-20 relative">
                <div className="absolute inset-0 ml-5 -translate-x-1 md:mx-auto md:translate-x-0 translate-y-32 h-[72%] w-1 bg-muted" />
                <motion.div
                    style={{ height: bgHeight }}
                    className="absolute inset-0 ml-5 -translate-x-1 md:mx-auto md:translate-x-0 translate-y-16 max-h-[72%] w-1 bg-theme"
                />
                {education.map((edu, index) => <EduCard edu={edu} key={edu.id || index} />)}
            </div>
        </SectionTemplate>
    );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTemplate } from "@/components/global/template";
import { FaGraduationCap } from "react-icons/fa";
import { extractPlainText, timeAgo } from "@/lib";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

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
                {timeAgo(new Date(edu.start))} - {timeAgo(new Date(edu.end))}
              </time>
            </div>
            <Link href={edu.url || "#"} className="font-medium link text-sm my-1" aria-label={`Visit ${edu.institution} website`}>
              {edu.institution},&nbsp;
              <span>{edu.place}</span>
            </Link>
          </div>
        </div>

        {/* Description */}
        {edu.description && edu.description.length > 0 && (
          <ul className="list-none my-2 pl-5 text-sm text-muted-foreground">
            {edu.description.map((desc: any, index: number) => (
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

const LoadingSkeleton = () => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
    {/* Icon Skeleton */}
    <div className="md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative isolate rounded-full p-2 bg-muted shrink-0">
      <Skeleton className="w-6 h-6 rounded" />
    </div>

    {/* Card Skeleton */}
    <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg shadow-md">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-16 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  </div>
);

export default function EducationSection() {
  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState<Education[]>([]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const bgHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/education");
        if (!res.ok) {
          throw new Error(`Failed to fetch education data: ${res.status}`);
        }

        const data = await res.json();
        const transformedData: Education[] = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          course: extractPlainText(item.properties?.Course?.title) || "Course not specified",
          institution: extractPlainText(item.properties?.Institution?.rich_text) || "Institution not specified",
          place: extractPlainText(item.properties?.Place?.rich_text) || "",
          grade: extractPlainText(item.properties?.Grade?.rich_text) || "",
          description: extractPlainText(item.properties?.Description?.rich_text).split("\n").filter((line) => line.trim() !== "") || [],
          start: item.properties?.Start?.date?.start || "",
          end: item.properties?.End?.date?.start || "",
          skills: item.properties?.Skills?.multi_select?.map((skill: any) => skill.name) || [],
          type: item.properties?.Type?.select?.name || "",
          url: item.properties?.URL?.url || "",
        }));

        transformedData.sort((a, b) => {
          const dateA = a.start ? new Date(a.start).getTime() : 0;
          const dateB = b.start ? new Date(b.start).getTime() : 0;
          return dateB - dateA;
        });

        setEducation(transformedData);
      } catch (err) {
        console.error("Error fetching education data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <SectionTemplate title="Academics" subtitle="My Academic Journey" id="education">
      <div ref={ref} className="space-y-20 relative">
        <div className="absolute inset-0 ml-5 -translate-x-1 md:mx-auto md:translate-x-0 translate-y-32 h-[72%] w-1 bg-muted" />
        <motion.div
          style={{ height: bgHeight }}
          className="absolute inset-0 ml-5 -translate-x-1 md:mx-auto md:translate-x-0 translate-y-16 max-h-[72%] w-1 bg-theme"
        />
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          education.map((edu, index) => <EduCard edu={edu} key={edu.id || index} />)
        )}
      </div>
    </SectionTemplate>
  );
}

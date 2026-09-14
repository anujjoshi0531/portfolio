import { getEducations } from "@/features/about/lib/content";
import type { ContentItem } from "@/lib/content/types";
import EducationClient from "./EducationClient";
import { Suspense } from "react";
import { SectionTemplate } from '@/components/global/SectionTemplate';
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

function LoadingSkeleton() {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      <div className="md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative isolate rounded-full p-2 bg-muted shrink-0">
        <Skeleton className="w-6 h-6 rounded" />
      </div>

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
}

function EducationSkeleton() {
  return (
    <SectionTemplate title="Academics" subtitle="My Academic Journey" id="education">
      <div className="space-y-20 relative">
        <div className="absolute inset-0 ml-5 -translate-x-1 md:mx-auto md:translate-x-0 translate-y-32 h-[72%] w-1 bg-muted" />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    </SectionTemplate>
  );
}

function processEducation(data: ContentItem[]) {
  const education = data.map((item) => {
    const descLines = item.content
      ? item.content.split("\n").map((l: string) => l.replace(/^- /, "").trim()).filter(Boolean)
      : [item.description || ""];

    return {
      id: item.id || item.slug,
      course: item.title || "Course not specified",
      institution: item.institution || "Institution not specified",
      place: item.location || "",
      grade: item.grade || "",
      description: descLines.length > 0 ? descLines : [item.description || ""],
      start: item.start || "",
      end: item.end || "",
      skills: item.skills || [],
      type: item.type || "",
      url: item.url || "",
      certificate: item.frontmatter?.certificate ? String(item.frontmatter.certificate) : "",
    };
  });

  return education.sort((a, b) => {
    const dateA = a.start ? new Date(a.start).getTime() : 0;
    const dateB = b.start ? new Date(b.start).getTime() : 0;
    return dateB - dateA;
  });
}

async function EducationData() {
  const data = getEducations();
  const education = processEducation(data);

  return <EducationClient education={education} />;
}

export default function EducationSection() {
  return (
    <Suspense fallback={<EducationSkeleton />}>
      <EducationData />
    </Suspense>
  );
}

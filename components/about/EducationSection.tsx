import { getEducation } from "@/lib/server/notion";
import { extractPlainText } from "@/lib";
import EducationClient from "./EducationClient";
import { Suspense } from "react";
import { SectionTemplate } from "@/components/global/template";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

function LoadingSkeleton() {
  return (
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

type NotionEduProps = {
  id?: string;
  properties?: {
    Course?: { title?: NotionRichTextItem[] };
    Institution?: { rich_text?: NotionRichTextItem[] };
    Place?: { rich_text?: NotionRichTextItem[] };
    Grade?: { rich_text?: NotionRichTextItem[] };
    Description?: { rich_text?: NotionRichTextItem[] };
    Start?: { date?: { start?: string } };
    End?: { date?: { start?: string } };
    Skills?: { multi_select?: NotionSelectOption[] };
    Type?: { select?: NotionSelectOption };
    URL?: { url?: string };
  };
};

function processEducation(data: NotionEduProps[]) {
  const education = data.map((item) => ({
    id: item.id || Math.random().toString(),
    course: extractPlainText(item.properties?.Course?.title) || "Course not specified",
    institution: extractPlainText(item.properties?.Institution?.rich_text) || "Institution not specified",
    place: extractPlainText(item.properties?.Place?.rich_text) || "",
    grade: extractPlainText(item.properties?.Grade?.rich_text) || "",
    description: extractPlainText(item.properties?.Description?.rich_text).split("\n").filter((line: string) => line.trim() !== "") || [],
    start: item.properties?.Start?.date?.start || "",
    end: item.properties?.End?.date?.start || "",
    skills: item.properties?.Skills?.multi_select?.map((skill) => skill.name) || [],
    type: item.properties?.Type?.select?.name || "",
    url: item.properties?.URL?.url || "",
  }));

  return education.sort((a, b) => {
    const dateA = a.start ? new Date(a.start).getTime() : 0;
    const dateB = b.start ? new Date(b.start).getTime() : 0;
    return dateB - dateA;
  });
}

async function EducationData() {
  const data = await getEducation();
  const education = processEducation(data as NotionEduProps[]);

  return <EducationClient education={education} />;
}

export default function EducationSection() {
  return (
    <Suspense fallback={<EducationSkeleton />}>
      <EducationData />
    </Suspense>
  );
}

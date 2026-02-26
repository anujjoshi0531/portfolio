import { getTestimonials } from "@/lib/server/notion";
import { extractPlainText } from "@/lib";
import TestimonialClient from "./TestimonialClient";
import { Suspense } from "react";
import { SectionTemplate } from "@/components/global/template";
import { Skeleton } from "../ui/skeleton";

function TestimonialSkeleton() {
  return (
    <SectionTemplate
      title="Testimonials"
      subtitle="What others say about me"
      id="testimonials"
      className="lg:flex items-baseline justify-between"
    >
      <div className="lg:w-4/5 mx-auto mt-6">
        <div className="text-center min-w-64 mx-auto">
          <Skeleton className="block rounded-md p-4 text-md relative isolate">
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </Skeleton>
          <div className="text-sm flex flex-col items-center gap-2 mt-6 duration-500">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}

function transformNotionData(notionData: any[]) {
  return notionData.map((item) => ({
    id: item.id,
    name: extractPlainText(item.properties.Name.rich_text) || "Anonymous",
    company: extractPlainText(item.properties.Company.rich_text) || "Unknown Company",
    position: extractPlainText(item.properties.Position.rich_text) || "Unknown Position",
    rating: item.properties.Rating.select?.name || "⭐⭐⭐⭐⭐ (5/5)",
    platform: item.properties.Platform.select?.name || "Unknown Platform",
    project: extractPlainText(item.properties.Project.rich_text) || "Unknown Project",
    avatar: item.properties.Avatar.url,
    review: extractPlainText(item.properties.Remark.title) || "No review provided",
    date: item.properties.Date.date?.start || new Date().toISOString().split("T")[0],
  }));
}

async function TestimonialData() {
  const data = await getTestimonials();
  const testimonials = transformNotionData(data);

  return <TestimonialClient testimonials={testimonials} />;
}

export default function TestimonialSection() {
  return (
    <Suspense fallback={<TestimonialSkeleton />}>
      <TestimonialData />
    </Suspense>
  );
}

import { getTestimonials } from "@/features/about/lib/content";
import type { ContentItem } from "@/lib/content/types";
import TestimonialClient from "./TestimonialClient";
import { Suspense } from "react";
import { SectionTemplate } from '@/components/global/SectionTemplate';
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

function transformData(data: ContentItem[]) {
  return data.map((item) => {
    const reviewText = item.content
      ? item.content.replace(/^>\s*/gm, "").trim()
      : "No review provided";

    return {
      id: item.id || item.slug,
      name: (item.frontmatter?.name ? String(item.frontmatter.name) : item.title) || "Anonymous",
      company: item.company || "Unknown Company",
      position: item.position || "Unknown Position",
      rating: item.frontmatter?.rating ? String(item.frontmatter.rating) : "⭐⭐⭐⭐⭐ (5/5)",
      project: item.frontmatter?.project ? String(item.frontmatter.project) : "Unknown Project",
      contact: item.frontmatter?.contact ? String(item.frontmatter.contact) : item.url || "",
      avatar: item.avatar || null,
      review: reviewText,
      date: item.date || item.created || new Date().toISOString().split("T")[0],
    };
  });
}

async function TestimonialData() {
  const data = getTestimonials();
  const testimonials = transformData(data);

  return <TestimonialClient testimonials={testimonials} />;
}

export default function TestimonialSection() {
  return (
    <Suspense fallback={<TestimonialSkeleton />}>
      <TestimonialData />
    </Suspense>
  );
}

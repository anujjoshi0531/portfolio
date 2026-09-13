import "@/styles/sprite.css"; // Only used by HeroImage — scoped to home page
import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/about/AboutSection";
import { SectionTemplate } from "@/components/global/SectionTemplate";
import ExperienceSection from "@/components/home/ExperienceSection";
import ProjectSection from "@/components/home/ProjectSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import { Skeleton } from "@/components/ui/skeleton";

// ── Lightweight page-level skeletons ────────────────────────────────────────
// These show while each section's async data call is in-flight.
// They intentionally mirror the rough layout of their real counterpart so
// the page doesn't shift dramatically when content streams in.

function AboutSkeleton() {
  return (
    <SectionTemplate title="About Me" subtitle="My Introduction" id="about">
      <div className="mb-5 flex flex-col lg:grid lg:grid-cols-5 lg:gap-56 items-center">
        <div className="relative w-[225px] sm:w-[400px] mb-10 lg:col-span-2" style={{ aspectRatio: "610/752" }}>
          <Skeleton className="w-full h-full rounded-md" />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-3 w-full">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-28 rounded-lg w-full" />
          <Skeleton className="h-28 rounded-lg w-full" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg w-full" />
          ))}
        </div>
      </div>
    </SectionTemplate>
  );
}

function ExperienceSkeleton() {
  return (
    <SectionTemplate title="Experience" subtitle="Where I've worked" id="experience">
      <div className="mx-auto max-w-4xl grid grid-rows-1 md:min-h-[400px] md:grid-cols-7 gap-4 md:gap-8">
        <ul className="flex md:block md:col-span-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="h-10 mb-2">
              <Skeleton className="h-10 w-24 md:w-full rounded-md" />
            </li>
          ))}
        </ul>
        <div className="md:col-span-5 space-y-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <div className="flex flex-wrap gap-2 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}

function ProjectSkeleton() {
  return (
    <section className="relative h-[100vh]" aria-label="Projects showcase">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="flex gap-4 px-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[450px] w-[350px] md:w-[450px] rounded-xl shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSkeleton() {
  return (
    <SectionTemplate title="Recent Blogs" subtitle="Insights, Thoughts, and Stories" id="blogs">
      <div className="flex space-x-4 overflow-hidden px-2 py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shrink-0 w-[300px] md:w-[350px] space-y-3">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </SectionTemplate>
  );
}

function TestimonialSkeleton() {
  return (
    <SectionTemplate
      title="Testimonials"
      subtitle="What others say about me"
      id="testimonials"
      className="lg:flex items-baseline justify-between"
    >
      <div className="lg:w-4/5 mx-auto mt-6 sm:grid grid-cols-[40px_auto_40px] items-center gap-4 md:gap-6 min-h-[220px]">
        <Skeleton className="hidden sm:block size-10 rounded-full" />
        <div className="text-center w-full space-y-4">
          <Skeleton className="h-24 w-full rounded-md" />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="hidden sm:block size-10 rounded-full" />
      </div>
    </SectionTemplate>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
// Each below-fold section is wrapped in its own <Suspense> boundary.
// Next.js streams the Hero shell in the first TCP burst, then flushes each
// section independently as its local content / Redis data resolves — without waiting
// for all API calls to complete before sending any bytes to the client.

export const revalidate = 3600; // Revalidate every hour

export default function Page() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero is synchronous — always in the first TCP window */}
      <Hero />

      <SectionTemplate title="About Me" subtitle="My Introduction" id="about">
        <AboutSection />
      </SectionTemplate>

      <ExperienceSection />

      <ProjectSection />

      <SectionTemplate title="Recent Blogs" subtitle="Insights, Thoughts, and Stories" id="blogs">
        <BlogSection />
      </SectionTemplate>

      <TestimonialSection />
    </div>
  );
}

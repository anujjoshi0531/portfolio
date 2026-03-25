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
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex gap-3 mt-6 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </SectionTemplate>
  );
}

function ExperienceSkeleton() {
  return (
    <SectionTemplate title="Experience" subtitle="Where I've worked" id="experience">
      <div className="mx-auto max-w-4xl grid md:grid-cols-7 gap-4 md:gap-8">
        <ul className="flex md:block md:col-span-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 md:w-full rounded" />
          ))}
        </ul>
        <div className="md:col-span-5 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
}

function ProjectSkeleton() {
  return (
    <section className="relative h-[100vh]" aria-label="Projects loading">
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
          <div key={i} className="shrink-0 w-[300px] space-y-3">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
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
    >
      <div className="text-center max-w-xl mx-auto space-y-4 mt-6">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="w-12 h-12 rounded-full mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-3 w-16 mx-auto" />
      </div>
    </SectionTemplate>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
// Each below-fold section is wrapped in its own <Suspense> boundary.
// Next.js streams the Hero shell in the first TCP burst, then flushes each
// section independently as its Notion / Redis data resolves — without waiting
// for all API calls to complete before sending any bytes to the client.

export const revalidate = 3600; // Revalidate every hour

export default function Page() {
  return (
    <main className="space-y-24 pb-24">
      {/* Hero is synchronous — always in the first TCP window */}
      <Hero />

      <Suspense fallback={<AboutSkeleton />}>
        <SectionTemplate title="About Me" subtitle="My Introduction" id="about">
          <AboutSection />
        </SectionTemplate>
      </Suspense>

      <Suspense fallback={<ExperienceSkeleton />}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectSection />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <SectionTemplate title="Recent Blogs" subtitle="Insights, Thoughts, and Stories" id="blogs">
          <BlogSection />
        </SectionTemplate>
      </Suspense>

      <Suspense fallback={<TestimonialSkeleton />}>
        <TestimonialSection />
      </Suspense>
    </main>
  );
}

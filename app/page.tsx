import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/about/AboutSection";
import { SectionTemplate } from "@/components/global/template";

const ExperienceSection = dynamic(() => import("@/components/home/ExperienceSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const ProjectSection = dynamic(() => import("@/components/home/ProjectSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const BlogSection = dynamic(() => import("@/components/home/BlogSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const QuoteSection = dynamic(() => import("@/components/about/QuoteSection"), {
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />,
});
const TestimonialSection = dynamic(() => import("@/components/home/TestimonialSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});

export default async function Page() {
  return (
    <main className="space-y-24">
      <Hero />
      <SectionTemplate title="About Me" subtitle="My Introduction" id="about">
        <AboutSection />
      </SectionTemplate>
      <ExperienceSection />
      <ProjectSection />
      <SectionTemplate title="Recent Blogs" subtitle="Insights, Thoughts, and Stories" id="blogs">
        <BlogSection />
      </SectionTemplate>
      <QuoteSection />
      <TestimonialSection />
    </main>
  );
}

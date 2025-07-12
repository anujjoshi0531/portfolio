import Hero from "@/components/home/Hero";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ProjectSection from "@/components/home/ProjectSection";
import { SectionTemplate } from "@/components/global/template";
import BlogSection from "@/components/home/BlogSection";
import QuoteSection from "@/components/about/QuoteSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export default async function Page() {
  return (
    <main className="space-y-24">
      <Hero />
      <SectionTemplate title="About Me" subtitle="My Introduction">
        <AboutSection />
      </SectionTemplate>
      <ExperienceSection />
      <ProjectSection />
      <BlogSection />
      <QuoteSection />
      <TestimonialSection />
    </main>
  );
}

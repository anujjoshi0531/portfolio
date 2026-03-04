import Hero from "@/components/home/Hero";
import AboutSection from "@/components/about/AboutSection";
import { SectionTemplate } from '@/components/global/SectionTemplate';
import ExperienceSection from "@/components/home/ExperienceSection";
import ProjectSection from "@/components/home/ProjectSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialSection from "@/components/home/TestimonialSection";

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
      <TestimonialSection />
    </main>
  );
}

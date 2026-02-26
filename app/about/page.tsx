import { PageTemplate } from '@/components/global/SectionTemplate';
import AboutSection from "@/components/about/AboutSection";
import EducationSection from "@/components/about/EducationSection";
import SkillSection from "@/components/about/SkillSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import QuoteSection from "@/components/about/QuoteSection";

export default async function AboutPage() {
  return (
    <>
      <PageTemplate title="About Me" subtitle="My Introduction" />
      <div className="my-12">
        <AboutSection />
      </div>
      <EducationSection />
      <SkillSection />
      <ExperienceSection />
      <QuoteSection />
    </>
  );
}

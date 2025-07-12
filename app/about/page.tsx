import EducationSection from "@/components/about/EducationSection";
import SkillSection from "@/components/about/SkillSection";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import QuoteSection from "@/components/about/QuoteSection";
import { PageTemplate } from "@/components/global/template";

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

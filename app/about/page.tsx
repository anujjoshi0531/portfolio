import dynamic from "next/dynamic";
import { PageTemplate } from "@/components/global/template";

const ExperienceSection = dynamic(() => import("@/components/home/ExperienceSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const EducationSection = dynamic(() => import("@/components/about/EducationSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const SkillSection = dynamic(() => import("@/components/about/SkillSection"), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
});
const QuoteSection = dynamic(() => import("@/components/about/QuoteSection"), {
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />,
});

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

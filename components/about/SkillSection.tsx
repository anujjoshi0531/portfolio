"use client";

import { SectionTemplate } from '@/components/global/SectionTemplate';
import { m } from "framer-motion";
import { childVariants, containerVariants } from '@/lib/animate';
import { skills } from "@/lib/client/data";

interface SkillGroup {
  title: string;
  skill: Skill[];
}

const SkillItem = ({ skill }: { skill: Skill }) => {
  return (
    <m.div
      variants={childVariants}
      className="group text-center md:w-[calc(50%-0.5rem)] lg:w-[calc(33%-1rem)] sm:flex sm:justify-start items-center sm:flex-col gap-2 w-auto hover:scale-[1.02] transition-all delay-150 font-semibold">
      <div className="sm:p-2.5 p-1 flex justify-center items-center group-hover:bg-theme/10 rounded-full relative overflow-hidden group-hover:[&::after]:absolute group-hover:[&::after]:top-0 group-hover:[&::after]:w-full group-hover:[&::after]:h-2.5 group-hover:[&::after]:content-[''] group-hover:[&::after]:bg-theme group-hover:[&::after]:animate-animate-icon">
        <span className="text-xl sm:text-2xl mx-auto">{skill.icon}</span>
      </div>
      <h4 className="group-hover:text-theme w-full sm:text-md text-sm text-nowrap">
        {skill.name}
      </h4>
    </m.div>
  );
};

export default function SkillSection() {
  return (
    <SectionTemplate title="My Skills" subtitle="Technologies I work with" id="skills">
      <m.div
        className="flex justify-center items-start w-full gap-8 flex-wrap text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {skills.map((skillGroup: SkillGroup, index: number) => (
          <m.div
            key={index}
            variants={childVariants}
            className="lg:w-[calc(33%-2rem)] md:w-[calc(50%-1rem)] w-full flex justify-start md:items-center items-start flex-col gap-6 mb-4">
            <h3 className="text-xl lg:text-2xl color-theme font-semibold capitalize">
              {skillGroup.title}
            </h3>
            <m.div
              className="flex justify-start items-start gap-6 sm:gap-2 flex-wrap"
              variants={containerVariants}>
              {skillGroup.skill.map((skill, j) => (
                <SkillItem key={j} skill={skill} />
              ))}
            </m.div>
          </m.div>
        ))}
      </m.div>
    </SectionTemplate>
  );
}

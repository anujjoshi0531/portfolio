"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { childVariants, containerVariants } from "@/components/animate/animate";
import PerkSection from "@/components/about/PerkSection";

export default function AboutSection() {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="mb-5 justify-center items-center flex-col lg:grid lg:grid-cols-5 lg:gap-56">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 5 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative w-max h-max group lg:col-span-2 group mb-10">
          <div className="absolute bg-theme group-hover:-translate-x-3 group-hover:-translate-y-3 left-5 top-5 size-[225px] sm:size-[400px] h-max-1/2 w-max-1/2 rounded-md transition-all duration-150"></div>
          <div className="size-[225px] sm:size-[400px] h-max-1/2 w-max-1/2 object-cover">
            <Image src="/me.webp" alt="profile" className="rounded-md" fill />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-[1rem] lg:col-span-3"
          variants={childVariants}>
          <p className="md:mr-0 mr-[10%] tracking-[0.08rem] leading-[1.6rem] font-[450]">
            Hello! My name is Anuj Joshi, and I am a passionate software engineer with a keen interest in Web Development and Machine Learning.
          </p>
          <p className="md:mr-0 mr-[10%] tracking-[0.08rem] leading-[1.6rem] font-[450]">
            At <a className="link text-theme" target="_blank" href="#">LIMSTIR-DTU</a> and as a member of the Robotic Society at <a className="link text-theme" target="_blank" href="#">SR-DTU</a>, I strive to craft sustainable solutions for global challenges.
          </p>
          <p className="md:mr-0 mr-[10%] tracking-[0.08rem] leading-[1.6rem] font-[450]">
            Additionally, I share my knowledge and passion with the world through my <a className="link text-theme" target="_blank" href="/blog">blogs</a>, where I demonstrate how to build full-stack applications.
          </p>
          <p className="md:mr-0 mr-[10%] tracking-[0.08rem] leading-[1.6rem] font-[450]">
            Currently, I&apos;m leading a project called <a className="link text-theme" target="_blank" href="https://netrai.netlify.app/">NetrAI</a>, a vision API SaaS that delivers cutting-edge tools like image colorization and super-resolution. Join me in this exciting endeavor to push the boundaries of computer vision technology!
          </p>
        </motion.div></motion.div>
      <PerkSection />
    </>
  );
}

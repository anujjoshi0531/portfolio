"use client";

import { m } from "framer-motion";
import { HeroSocial } from '@/components/global/Social';
import { Send, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { childVariants, containerVariants } from '@/lib/animate';
import { socialLinks } from "@/lib";
import Link from "next/link";
import { FlipWords } from "@/components/animate/FlipWords";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-4 pt-20 min-h-[85vh]" suppressHydrationWarning>
      {/* Profile Image */}
      <HeroImage />

      {/* Profile Text */}
      <div className="space-y-12 translate-y-8 w-full">
        <div className="md:space-y-8 md:py-12 sm:py-5 px-2 w-full text-center lg:text-left">
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-2 md:space-y-4 select-none flex flex-col items-center lg:items-start lg:text-left text-center w-full">
            <m.h1
              variants={childVariants}
              className="font-bold text-[2rem] sm:text-[3rem] md:text-6xl w-full">
              Hi, I&apos;m&nbsp;
              <span className="text-theme whitespace-nowrap">Anuj Joshi</span>
            </m.h1>
            <m.h2
              variants={childVariants}
              className="overflow-hidden w-full">
              <FlipWords
                words={["A Fullstack Developer", "A Machine Learning Enthusiast", "Software Development Engineer", "Problem Solver at Scale", "Building AI-Powered Systems"]}
                className="h-8 font-medium text-[1rem] sm:text-[1.5rem] md:text-2xl text-center lg:text-left w-full px-0"
              />
            </m.h2>
          </m.div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap gap-5 py-10 justify-center lg:justify-start">
            <m.div variants={childVariants}>
              <Link href="/contact" passHref>
                <Button aria-label="Go to contact page">
                  <Send className="size-4" />
                  Contact Me
                </Button>
              </Link>
            </m.div>

            <m.div variants={childVariants}>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer">
                <Button variant="secondary" aria-label="Download resume (opens in new tab)">
                  <Link2 className="size-4" />
                  Resume
                </Button>
              </Link>
            </m.div>
          </m.div>
        </div>

        {/* Social Links */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex lg:justify-start justify-center items-center lg:gap-20 gap-10">
          {socialLinks
            .filter((l) => ["LinkedIn", "Twitter", "Telegram"].includes(l.title))
            .map(({ title, name, href, icon }) => (
              <m.div variants={childVariants} key={title}>
                <HeroSocial
                  title={title}
                  name={name}
                  href={href}
                  icon={icon}
                />
              </m.div>
            ))}
        </m.div>
      </div>
    </div>
  );
};
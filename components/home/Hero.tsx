"use client";

import { motion } from "framer-motion";
import { HeroSocial } from '@/components/global/Social';
import { FaPaperPlane, FaLink } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { childVariants, containerVariants } from '@/lib/animate';
import { socialLinks } from "@/lib";
import Link from "next/link";
import { FlipWords } from "@/components/animate/FlipWords";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <div className="flex lg:flex-row-reverse flex-col items-center justify-between gap-4 pt-20">
      {/* Profile Image */}
      <HeroImage />

      {/* Profile Text */}
      <div className="space-y-12 translate-y-8">
        <div className="md:space-y-8 md:py-12 sm:py-5 px-2 mx-auto md:mx-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-2 md:space-y-4 select-none">
            <motion.h1
              variants={childVariants}
              className="text-nowrap font-bold text-[2rem] sm:text-[3rem] md:text-6xl">
              Hi, I&apos;m&nbsp;
              <span className="text-theme">Anuj Joshi</span>
            </motion.h1>
            <motion.h2
              variants={childVariants}
              className="overflow-hidden whitespace-nowrap">
              <FlipWords
                words={["A Fullstack Developer", "A Machine Learning Enthusiast", "Software Development Engineer", "Problem Solver at Scale", "Building AI-Powered Systems"]}
                className="h-8 font-medium text-[1rem] sm:text-[1.5rem] md:text-2xl"
              />
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="flex flex-wrap gap-5 py-10 justify-center lg:justify-start">
            <motion.div variants={childVariants}>
              <Link href="/contact" passHref>
                <Button aria-label="Go to contact page">
                  <FaPaperPlane />
                  Contact Me
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={childVariants}>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer">
                <Button variant="secondary" aria-label="Download resume (opens in new tab)">
                  <FaLink />
                  Resume
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex justify-center items-center lg:gap-20 gap-10">
          {socialLinks
            .filter((l) => ["LinkedIn", "Twitter", "Telegram"].includes(l.title))
            .map(({ title, name, href, icon }) => (
              <motion.div variants={childVariants} key={title}>
                <HeroSocial
                  title={title}
                  name={name}
                  href={href}
                  icon={icon}
                />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};
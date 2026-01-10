"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface TemplateProps {
  title?: string;
  subtitle?: string;
  id?: string;
  children?: ReactNode;
  className?: string;
}

const SectionTemplate: React.FC<TemplateProps> = React.memo(({
  title,
  subtitle,
  id,
  children,
  className = "",
}) => {
  return (
    <section className={`w-full pt-8 ${className}`} id={id}>
      <motion.div
        className="border-l-[2.5px] border-theme px-4 my-12 select-none"
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.1 }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: -50 },
        }}>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <h2 className="font-medium text-theme">{subtitle}</h2>
      </motion.div>
      <motion.div
        className="my-16 px-2 mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 80 },
        }}>
        {children}
      </motion.div>
    </section>
  );
});

const PageTemplate: React.FC<TemplateProps> = React.memo(({
  title,
  subtitle,
  children,
}) => {
  return (
    <>
      {/* Background section */}
      <div className="absolute -z-10 h-2/5 min-h-[280px] w-screen bg-muted inset-0"></div>

      {/* Content section */}
      <motion.div
        className="h-2/5 min-h-[140px] flex flex-col justify-end py-4"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}>
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.2 }}>
          {title}
        </motion.h1>
        <motion.h2
          className="font-medium text-lg md:text-xl text-theme"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.4 }}>
          {subtitle}
          {children}
        </motion.h2>
      </motion.div>
    </>
  );
});

// Add display names for better debugging
SectionTemplate.displayName = 'SectionTemplate';
PageTemplate.displayName = 'PageTemplate';

export { SectionTemplate, PageTemplate };

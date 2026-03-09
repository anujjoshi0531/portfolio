"use client";

import React, { ReactNode } from "react";
import { m } from "framer-motion";

interface TemplateProps {
  title?: string;
  subtitle?: string;
  id?: string;
  children?: ReactNode;
  className?: string;
}

const headerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, ease: "easeOut" },
  },
};

const pageChildVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const SectionTemplate: React.FC<TemplateProps> = React.memo(({
  title,
  subtitle,
  id,
  children,
  className = "",
}) => {
  return (
    <section className={`w-full pt-8 ${className}`} id={id}>
      {(title || subtitle) && (
        <m.div
          className="border-l-[2.5px] border-theme px-4 mt-8 mb-10 select-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}>
          {title && <h2 className="text-4xl font-bold mb-1">{title}</h2>}
          {subtitle && <p className="font-medium text-theme">{subtitle}</p>}
        </m.div>
      )}
      <m.div
        className="mb-16 px-2 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={contentVariants}>
        {children}
      </m.div>
    </section>
  );
});

const PageTemplate: React.FC<TemplateProps> = React.memo(({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen flex flex-col justify-end min-h-[280px] -mt-12 mb-10 px-6 sm:px-8 md:px-16 lg:px-32">
      {/* Full-bleed muted background */}
      <div className="absolute inset-0 bg-muted" aria-hidden="true" />

      {/* Text pinned to bottom */}
      <m.div
        className="relative pb-8 md:pt-24 pt-16 flex flex-col"
        initial="hidden"
        animate="visible"
        variants={pageContainerVariants}>
        <m.h1
          className="text-4xl md:text-5xl font-bold mb-1 sm:mb-2"
          variants={pageChildVariants}>
          {title}
        </m.h1>
        {(subtitle || children) && (
          <m.p
            className="font-medium text-lg md:text-xl text-theme"
            variants={pageChildVariants}>
            {subtitle}
            {children}
          </m.p>
        )}
      </m.div>
    </div>
  );
});

SectionTemplate.displayName = "SectionTemplate";
PageTemplate.displayName = "PageTemplate";

export { SectionTemplate, PageTemplate };

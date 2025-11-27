"use client";

import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { socialLinks } from "@/lib/data";
import { TbHexagonLetterAFilled } from "react-icons/tb";
import ModeToggle from "@/components/global/mode-toggle";
import ThemePicker from "@/components/global/theme-picker";
import { SocialIcon } from "@/components/global/social";
import { containerVars, menuVars, mobileLinkVars } from "@/components/animate/animate";
import Link from "next/link";
import SearchButton from "@/components/site/search/search-button";
import { Button } from "../ui/button";

export default function Navbar() {
  const navLinks = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/project", title: "Project" },
    { href: "/blog", title: "Blog" },
    { href: "/contact", title: "Contact" },
  ];

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !open) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setOpen((prevOpen) => !prevOpen);
  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top fixed z-[100] top-0 left-0 h-screen w-screen bg-muted text-center font-semibold uppercase">
            <button
              className="absolute right-10 top-8 cursor-pointer text-2xl active:scale-75"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <FaX />
            </button>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col justify-center items-center h-full gap-6 sm:gap-8 md:gap-10 text-xl sm:text-2xl lg:text-3xl">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={mobileLinkVars}
                  className="tracking-wide hover:text-theme">
                  <Link href={link.href} onClick={closeMenu}>
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileLinkVars}>
                <ModeToggle />
              </motion.div>
              <motion.div
                variants={mobileLinkVars}
                className="my-2 sm:my-4 flex space-x-6 sm:text-lg md:text-2xl">
                {socialLinks.map((link, index) => (
                  <SocialIcon key={index} href={link.href} title={link.title}>
                    {link.icon}
                  </SocialIcon>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Menu */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="h-24 flex items-center justify-between p-4 lg:px-16 lg:py-2 sticky top-0 z-10 backdrop-blur-md">
        {/* Logo with spring animation */}
        <motion.div
          variants={{
            initial: { scale: 0 },
            animate: {
              scale: 1,
              transition: { type: "spring", stiffness: 300 },
            },
          }}
          initial="initial"
          animate="animate">
          <Link href="/" aria-label="Go to homepage">
            <TbHexagonLetterAFilled className="text-5xl font-bold hover:text-theme hover:scale-110 duration-150 transition-all" />
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.div
          className="hidden lg:flex justify-center items-center space-x-9 uppercase font-semibold"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                when: "beforeChildren",
              },
            },
          }}
          initial="initial"
          animate="animate">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                initial: { scale: 0.9 },
                animate: {
                  scale: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}>
              <Link
                href={link.href}
                className="link">
                {link.title}
              </Link>
            </motion.div>
          ))}

          {/* Mode Toggle */}
          <motion.div
            variants={{
              initial: { scale: 0.9, opacity: 0 },
              animate: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 300 },
              },
            }}>
              <div className="flex space-x-2">
                <ModeToggle />
                <SearchButton />
              </div>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center space-x-2">
          <SearchButton />
          <Button variant="ghost" className="rounded-full" onClick={toggleMenu} aria-label="Open menu">
            <FaBars/>
          </Button>
        </div>
      </motion.header>
      <ThemePicker />
    </>
  );
}

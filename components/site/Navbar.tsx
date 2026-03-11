"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { socialLinks } from "@/lib";
import ModeToggle from '@/components/global/ModeToggle';
import { SocialIcon } from '@/components/global/Social';
import { containerVars, menuVars, mobileLinkVars } from '@/lib/animate';
import Link from "next/link";
import SearchButton from "@/components/site/search/SearchButton";
import { Button } from "../ui/button";
import Logo from "./Logo";

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
      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {open && (
          <m.div
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
              <X className="size-5" />
            </button>
            <m.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col justify-center items-center h-full gap-6 sm:gap-8 md:gap-10 text-xl sm:text-2xl lg:text-3xl">
              {navLinks.map((link) => (
                <m.div
                  key={link.href}
                  variants={mobileLinkVars}
                  className="tracking-wide hover:text-theme">
                  <Link href={link.href} onClick={closeMenu}>
                    {link.title}
                  </Link>
                </m.div>
              ))}
              <m.div variants={mobileLinkVars}>
                <ModeToggle />
              </m.div>
              <m.div
                variants={mobileLinkVars}
                className="my-2 sm:my-4 flex space-x-6 sm:text-lg md:text-2xl">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <SocialIcon key={link.title} href={link.href} title={link.title}>
                      <Icon />
                    </SocialIcon>
                  );
                })}
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-150%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-[100000] w-screen  backdrop-blur-[200px]"
      >
        <header className="flex items-center justify-between p-4 py-6 lg:px-6 w-[95%] mx-auto">

          {/* Logo */}
          <m.div
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
              <Logo className="bg-primary/80 rounded-full hover:border-theme border-2" />
            </Link>
          </m.div>

          {/* Desktop Navigation Links */}
          <m.nav
            className="hidden lg:flex justify-center items-center space-x-7 uppercase font-semibold text-sm"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  when: "beforeChildren",
                },
              },
            }}
            initial="initial"
            animate="animate">
            {navLinks.map((link) => (
              <m.div
                key={link.href}
                variants={{
                  initial: { y: -8, opacity: 0 },
                  animate: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300 },
                  },
                }}>
                <Link
                  href={link.href}
                  className="link tracking-wide font-semibold">
                  {link.title}
                </Link>
              </m.div>
            ))}

            {/* Actions */}
            <m.div
              variants={{
                initial: { y: -8, opacity: 0 },
                animate: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}>
              <div className="flex items-center space-x-2">
                <ModeToggle />
                <SearchButton />
              </div>
            </m.div>
          </m.nav>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <SearchButton />
            <Button variant="ghost" className="rounded-full" onClick={toggleMenu} aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>

        </header>
      </m.div>
    </>
  );
}

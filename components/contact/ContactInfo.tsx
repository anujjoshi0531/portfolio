"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { m } from "framer-motion";
import { SocialLink } from '@/components/global/Social';
import { LinkPreview } from "@/components/animate/LinkPreview";

export default function ContactInfo() {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-1/2 my-auto">
      <h3 className="font-bold lg:text-3xl text-2xl">Let&apos;s talk about everything!</h3>
      <p className="mb-8 mt-2">Have a question or want to work together? Don&apos;t hesitate to reach out. I&apos;m always eager to connect and explore opportunities to bring my skills and passion to your projects or teams.</p>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Phone</p>
          <SocialLink
            title="+91 98111 84995"
            href="tel:+919811184995"
            icon={Phone}
          />
        </div>
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Email</p>
          <SocialLink
            title="anujjoshi3105@gmail.com"
            href="mailto:anujjoshi3105@gmail.com"
            icon={Mail}
          />
        </div>
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Location</p>
          <LinkPreview title="New Delhi, India" url="https://share.google/IqMNA0wxT6dyQ2fsS" className="flex gap-2 items-center">
            <MapPin className="size-4 text-theme" />
            <span className="link">New Delhi, India</span>
          </LinkPreview>
        </div>
      </div>
    </m.div>
  );
}

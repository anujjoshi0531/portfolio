"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { SocialLink } from "@/components/global/social";


export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-1/2 my-auto">
      <h5 className="font-bold lg:text-3xl text-2xl">Let&apos;s talk about everything!</h5>
      <p className="mb-8 mt-2">Have a question or want to work together? Don&apos;t hesitate to reach out. I&apos;m always eager to connect and explore opportunities to bring my skills and passion to your projects or teams.</p>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Phone</p>
          <SocialLink
            title="+91 981118 XXXX"
            href="tel:9811184995"
            icon={FaPhoneAlt}
          />
        </div>
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Email</p>
          <SocialLink
            title="anujjoshi3105@gmail.com"
            href="#"
            icon={FaEnvelope}
          />
        </div>
        <div className="hover:-translate-y-1 duration-150">
          <p className="font-semibold">Location</p>
          <SocialLink
            title="New Delhi, India"
            href="https://www.google.com/maps/d/u/0/viewer?ie=UTF&msa=0&mid=1ugPBH9-MCw7w7lSrdNWcjO9_y7M&ll=28.577502328473237%2C77.171527&z=12"
            icon={FaMapMarkerAlt}
          />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Message Sent", {
        description: "Thank you for reaching out! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Error", {
        description: "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-[500px] h-fit rounded-md p-4 py-10 sm:m-0 bg-muted dark:bg-muted/25">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mx-auto w-full max-w-[450px]">
        <Input
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Textarea
          id="message"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full min-h-[150px]"
          required
        />
        <Button
          type="submit"
          className="text-muted"
          size="md"
          disabled={isLoading}
          aria-label={isLoading ? "Sending message" : "Send contact message"}>
          {isLoading ? (
            <>
              <div className="size-4 mr-2 animate-spin rounded-full border-2 border-t-theme" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" /> Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}

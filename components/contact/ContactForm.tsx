"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ---------- tiny helpers (Aceternity-style) ---------- */

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-foreground mb-2"
    >
      {children}
    </label>
  );
}

function LabelInputContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col w-full", className)}>{children}</div>
  );
}

const inputBase =
  "w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-theme/50 focus:border-theme transition-all duration-200 shadow-inner";

/* ---------- BottomGradient helper (submit button effect) ---------- */

function BottomGradient() {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-theme to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-theme/60 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
}

/* ---------- Main Component ---------- */

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.company
            ? `[Company: ${formData.company}]\n\n${formData.message}`
            : formData.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      toast.success("Message Sent", {
        description: "Thank you for reaching out! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      toast.error("Error", {
        description:
          "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      className="relative w-full max-w-md rounded-2xl border border-border bg-muted/30 p-8 shadow-xl backdrop-blur-sm overflow-hidden"
    >
      {/* subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
        {/* Row 1 – Name + Email */}
        <div className="flex flex-col sm:flex-row gap-4">
          <LabelInputContainer>
            <Label htmlFor="name">Full name</Label>
            <input
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputBase}
              required
              aria-required="true"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputBase}
              required
              aria-required="true"
            />
          </LabelInputContainer>
        </div>

        {/* Row 2 – Company */}
        <LabelInputContainer>
          <Label htmlFor="company">Company</Label>
          <input
            id="company"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className={inputBase}
          />
        </LabelInputContainer>

        {/* Row 3 – Message */}
        <LabelInputContainer>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={cn(inputBase, "resize-y")}
            required
            aria-required="true"
          />
        </LabelInputContainer>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          aria-label={isLoading ? "Sending message" : "Send contact message"}
          className="group/btn relative mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending…
            </>
          ) : (
            "Submit"
          )}
          <BottomGradient />
        </button>
      </form>
    </motion.div>
  );
}

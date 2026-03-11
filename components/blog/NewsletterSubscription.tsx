"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast.success(data.message || "Thank you for subscribing!");
      setEmail("");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative isolate overflow-hidden bg-muted/40 border border-border px-6 py-16 sm:py-20 shadow-2xl rounded-2xl sm:px-20">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Subscribe to My Newsletter
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-muted-foreground">
          Get the latest articles on software engineering, web development, and tech trends delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-2 sm:gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="min-w-0 flex-auto rounded-md border border-border bg-background/50 px-3.5 py-2 text-foreground shadow-sm focus:ring-2 focus:ring-ring sm:text-sm sm:leading-6 outline-none"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe
              </>
            )}
          </button>
        </form>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 size-[128rem] -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.2"></circle>
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="hsl(var(--theme))"></stop>
              <stop offset="1" stopColor="hsl(var(--theme))" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";
import { after } from "next/server";
import { sendToRecipient, sendThankYouEmail } from "@/lib/server/mail";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getClientIP } from "@/lib/server/redis";

// Create a new ratelimiter, that allows 5 requests per 1 hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

const EmailSchema = z.object({
  name: z.string().max(100),
  email: z.string().email().max(255),
  message: z.string().max(5000),
});

export async function POST(request: Request) {
  const ip = getClientIP(request);

  // Check rate limit via Upstash Redis
  const { success } = await ratelimit.limit(`ratelimit_${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  // 1. Strict Request Body Size Limit
  const rawBody = await request.text();
  if (rawBody.length > 10000) { // Reject if body exceeds ~10KB
    return NextResponse.json({ error: "Payload Too Large" }, { status: 413 });
  }

  // 2. Parse JSON
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3. Schema Validation with Zod
  const parsed = EmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input data", details: parsed.error.format() }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  // HTML sanitization
  const escapeHTML = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  const safeName = escapeHTML(name);
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br>");

  // Trigger the email sending in the background to reduce UI wait time 
  after(async () => {
    try {
      await Promise.all([
        sendToRecipient(safeName, email, safeMessage),
        sendThankYouEmail(safeName, email, safeMessage),
      ]);
      console.log(`Contact emails successfully sent for ${email}`);
    } catch (error) {
      console.error("Error sending contact email in background:", error);
    }
  });

  return NextResponse.json({ success: true });
}
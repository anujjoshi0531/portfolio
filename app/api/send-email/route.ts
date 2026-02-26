import { NextResponse } from "next/server";
import { sendToRecipient, sendThankYouEmail } from "@/lib/server/mail";

// Basic in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // Max emails per IP
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const rateData = rateLimitMap.get(ip);
  if (rateData) {
    if (now - rateData.timestamp < TIME_WINDOW) {
      if (rateData.count >= RATE_LIMIT) {
        return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
      }
      rateLimitMap.set(ip, { count: rateData.count + 1, timestamp: rateData.timestamp });
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  const body = await request.json().catch(() => ({}));
  const { name, email, message } = body;

  // Validation
  if (!name || typeof name !== "string" || name.length > 100) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 255) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.length > 5000) {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }

  // HTML sanitization
  const escapeHTML = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  const safeName = escapeHTML(name);
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br>");

  try {
    await Promise.all([
      sendToRecipient(safeName, email, safeMessage),
      sendThankYouEmail(safeName, email),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
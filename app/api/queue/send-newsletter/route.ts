import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { sendWeeklyNewsletter } from "@/lib/server/email";

// This queue handler will be called by QStash
async function handler(request: Request) {
  try {
    const body = await request.json();
    const { email, name, id, recentBlogs } = body;
    
    if (!email || !id || !recentBlogs) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send the email for this specific subscriber
    await sendWeeklyNewsletter(email, name, id, recentBlogs);

    console.log(`Successfully sent queue email to: ${email}`);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Queue Worker Error:", error);
    // Returning 500 will tell QStash to retry this message later
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

// Wrap the handler with Upstash signature verification to ensure requests only come from QStash
export const POST = verifySignatureAppRouter(handler);

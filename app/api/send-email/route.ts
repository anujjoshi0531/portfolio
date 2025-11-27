import { NextResponse } from "next/server";
import { sendToRecipient, sendThankYouEmail } from "@/lib/server/mail";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    await Promise.all([
      sendToRecipient(name, email, message),
      sendThankYouEmail(name, email),
    ]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
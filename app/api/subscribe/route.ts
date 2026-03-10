import { NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { checkSubscriberExists, addSubscriber, updateSubscriberStatus } from "@/lib/server/newsletter";
import { sendSubscriptionEmail } from "@/lib/server/mail";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = subscribeSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parsedData.data;

    const existingPageId = await checkSubscriberExists(email.toLowerCase());

    let subscriberId: string;

    if (existingPageId) {
      // Re-subscribe them if they already exist
      await updateSubscriberStatus(existingPageId, "Subscribed");
      subscriberId = existingPageId;
    } else {
      // Add new subscriber
      subscriberId = await addSubscriber(email);
      // Send welcome email only to new subscribers in the background to reduce user wait time
      after(async () => {
        try {
          await sendSubscriptionEmail(email, subscriberId);
          console.log(`Welcome email successfully sent to ${email}`);
        } catch (mailError) {
          console.error("Failed to send welcome email in background:", mailError);
        }
      });
    }

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

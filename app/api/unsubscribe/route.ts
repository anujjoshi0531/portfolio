import { NextResponse } from "next/server";
import { z } from "zod";
import { updateSubscriberStatus } from "@/lib/server/newsletter";

const unsubscribeSchema = z.object({
  id: z.string().min(1, { message: "Subscriber ID is required" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = unsubscribeSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.issues[0].message },
        { status: 400 }
      );
    }

    const { id } = parsedData.data;

    // We rely on the subscriber ID being inherently secure and hard to guess.
    await updateSubscriberStatus(id, "Unsubscribed");

    return NextResponse.json(
      { message: "Unsubscribed successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. The provided ID may be invalid." },
      { status: 500 }
    );
  }
}

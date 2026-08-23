import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function checkSubscriberExists(email: string): Promise<string | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const result = await db
    .select({ id: subscribers.id })
    .from(subscribers)
    .where(eq(sql`LOWER(${subscribers.email})`, normalizedEmail))
    .limit(1);

  return result.length > 0 ? result[0].id : null;
}

export async function addSubscriber(email: string): Promise<string> {
  const normalizedEmail = email.toLowerCase().trim();
  const defaultName = normalizedEmail.split("@")[0] || "Subscriber";

  const existingId = await checkSubscriberExists(normalizedEmail);
  if (existingId) {
    await updateSubscriberStatus(existingId, "Subscribed");
    return existingId;
  }

  const [newSub] = await db
    .insert(subscribers)
    .values({
      email: normalizedEmail,
      name: defaultName,
      status: "subscribed",
    })
    .returning({ id: subscribers.id });

  return newSub.id;
}

export async function updateSubscriberStatus(
  id: string,
  status: "Subscribed" | "Unsubscribed" | "subscribed" | "unsubscribed"
) {
  const dbStatus = status.toLowerCase() === "unsubscribed" ? "unsubscribed" : "subscribed";

  await db
    .update(subscribers)
    .set({
      status: dbStatus,
      updatedAt: new Date(),
    })
    .where(eq(subscribers.id, id));
}

export async function getAllSubscribers(): Promise<{ id: string; email: string; name: string }[]> {
  const activeSubscribers = await db
    .select({
      id: subscribers.id,
      email: subscribers.email,
      name: subscribers.name,
    })
    .from(subscribers)
    .where(eq(subscribers.status, "subscribed"));

  return activeSubscribers.map((sub) => ({
    id: sub.id,
    email: sub.email,
    name: sub.name || sub.email.split("@")[0] || "Subscriber",
  }));
}

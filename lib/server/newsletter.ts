import { requireId } from "./notion";
import { serverConfig } from "../constant/config.server";
import { Client } from "@notionhq/client";

const newsletterNotionClient = new Client({
  auth: serverConfig.NOTION_NEWSLETTER_TOKEN,
});

const dsIdCache = new Map<string, string>();

async function getNewsletterDataSourceId(databaseId: string): Promise<string> {
  const cached = dsIdCache.get(databaseId);
  if (cached) return cached;

  const db = await newsletterNotionClient.databases.retrieve({ database_id: databaseId });
  const sources = (db as unknown as { data_sources?: { id: string }[] }).data_sources;
  const dsId = sources?.[0]?.id;
  if (!dsId) throw new Error(`No data source found for database: ${databaseId}`);

  dsIdCache.set(databaseId, dsId);
  return dsId;
}

export async function checkSubscriberExists(email: string): Promise<string | null> {
  const dbId = requireId(serverConfig.NOTION_NEWSLETTER_ID, "NOTION_NEWSLETTER_ID");
  const dsId = await getNewsletterDataSourceId(dbId);
  const { results } = await newsletterNotionClient.dataSources.query({
    data_source_id: dsId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: {
      property: "Email",
      email: { equals: email },
    } as any,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (results[0] as any)?.id || null;
}

export async function addSubscriber(email: string): Promise<string> {
  const dbId = requireId(serverConfig.NOTION_NEWSLETTER_ID, "NOTION_NEWSLETTER_ID");

  const response = await newsletterNotionClient.pages.create({
    parent: { database_id: dbId },
    properties: {
      Subscriber: {
        title: [
          {
            text: { content: email.split("@")[0] || "Subscriber" },
          },
        ],
      },
      Email: {
        email: email,
      }
    },
  });

  return response.id;
}

export async function updateSubscriberStatus(pageId: string, status: "Subscribed" | "Unsubscribed") {
  await newsletterNotionClient.pages.update({
    page_id: pageId,
    properties: {
      Status: {
        status: { name: status },
      },
    },
  });
}

export async function getAllSubscribers(): Promise<{ id: string; email: string; name: string }[]> {
  const dbId = requireId(serverConfig.NOTION_NEWSLETTER_ID, "NOTION_NEWSLETTER_ID");
  let hasMore = true;
  let nextCursor: string | undefined = undefined;
  const dsId = await getNewsletterDataSourceId(dbId);
  const subscribers: { id: string; email: string; name: string }[] = [];

  while (hasMore) {
    const response = await newsletterNotionClient.dataSources.query({
      data_source_id: dsId,
      start_cursor: nextCursor,
      filter: {
        property: "Status",
        status: {
          does_not_equal: "Unsubscribed",
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const page of response.results as any[]) {
      const email = page.properties.Email?.email;
      const name = page.properties.Subscriber?.title?.[0]?.plain_text || page.properties.Subscriber?.title?.[0]?.text?.content || "Subscriber";
      if (email) {
        subscribers.push({ id: page.id, email, name });
      }
    }

    hasMore = response.has_more;
    nextCursor = response.next_cursor || undefined;
  }

  return subscribers;
}

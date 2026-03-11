import { requireId, getDataSourceId, notionClient } from "./notion";
import { serverConfig } from "../constant/config.server";

// We now use the main notionClient from ./notion.ts for all newsletter operations.


export async function checkSubscriberExists(email: string): Promise<string | null> {
  const dbId = requireId(serverConfig.NOTION_NEWSLETTER_ID, "NOTION_NEWSLETTER_ID");
  const dsId = await getDataSourceId(dbId, notionClient);
  const { results } = await notionClient.dataSources.query({
    data_source_id: dsId,
    filter: {
      property: "Email",
      email: { equals: email },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (results[0] as any)?.id || null;
}

export async function addSubscriber(email: string): Promise<string> {
  const dbId = requireId(serverConfig.NOTION_NEWSLETTER_ID, "NOTION_NEWSLETTER_ID");

  const response = await notionClient.pages.create({
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
  await notionClient.pages.update({
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
  const dsId = await getDataSourceId(dbId, notionClient);
  const subscribers: { id: string; email: string; name: string }[] = [];

  while (hasMore) {
    const response = await notionClient.dataSources.query({
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

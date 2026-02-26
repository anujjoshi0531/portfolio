import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { validate } from "uuid";
import { serverConfig } from "../constant/config.server";

export const notion = new NotionAPI();
export const notionClient = new Client({
  auth: serverConfig.NOTION_TOKEN,
});

export const fetchPage = async (param: string) => {
  const isUUID = validate(param);
  let page;

  if (isUUID) {
    page = await notionClient.pages.retrieve({ page_id: param }).catch(() => null);
  } else {
    if (!serverConfig.NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
    const { results } = await notionClient.databases.query({
      database_id: serverConfig.NOTION_DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: { equals: param },
      },
    });

    page = results[0] ?? null;
    if (!page) return { data: null, recordMap: null };

    param = page.id;
  }

  if (!page) return { data: null, recordMap: null };

  const recordMap = await notion.getPage(param);
  return { data: page, recordMap };
};

export const buildFilter = ({
  query,
  tags,
  dateFilter,
  isPublic = true,
  category,
}: {
  query?: string;
  tags?: string[];
  dateFilter?: {
    property: string;
    after?: Date;
    before?: Date;
  };
  isPublic?: boolean;
  category?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseFilter: any[] = [
    {
      property: "Public",
      checkbox: { equals: isPublic },
    },
  ];

  if (category !== undefined) {
    baseFilter.push({
      property: "Category",
      select: { equals: category },
    });
  }
  if (query) {
    baseFilter.push({
      or: [
        {
          property: "Name",
          rich_text: { contains: query },
        },
        {
          property: "Description",
          rich_text: { contains: query },
        },
      ],
    });
  }

  if (tags?.length) {
    tags.forEach(tag => {
      baseFilter.push({
        property: "Tags",
        multi_select: {
          contains: tag,
        },
      });
    });
  }

  if (dateFilter) {
    if (dateFilter.after) {
      baseFilter.push({
        property: dateFilter.property,
        date: { on_or_after: dateFilter.after.toISOString() },
      });
    }
    if (dateFilter.before) {
      baseFilter.push({
        property: dateFilter.property,
        date: { on_or_before: dateFilter.before.toISOString() },
      });
    }
  }
  return baseFilter;
};

export const getPagesCount = async ({
  query,
  tags,
  dateFilter,
  isPublic = true,
  category,
}: {
  query?: string;
  tags?: string[];
  dateFilter?: {
    property: string;
    after?: Date;
    before?: Date;
  };
  isPublic?: boolean;
  category?: string;
}) => {
  const baseFilter = buildFilter({ query, tags, dateFilter, isPublic, category });
  if (!serverConfig.NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_DATABASE_ID,
    filter: {
      and: baseFilter,
    },
  });
  return { total: results.length };
};

export const searchPages = async ({
  query,
  tags,
  dateFilter,
  limit = 10,
  page = 1,
  sort_by = "published-descending",
  isPublic = true,
  category,
}: {
  query?: string;
  tags?: string[];
  dateFilter?: {
    property: string;
    after?: Date;
    before?: Date;
  };
  limit?: number;
  page?: number;
  sort_by?: string;
  isPublic?: boolean;
  category?: string;
}) => {
  const baseFilter = buildFilter({ query, tags, dateFilter, isPublic, category });

  const parseSort = (sortParam: string) => {
    const [property, direction] = sortParam.split("-");
    const validDirection = direction === "ascending" || direction === "descending"
      ? direction as "ascending" | "descending"
      : "descending";

    const propertyMap: Record<string, string> = {
      "published": "Published",
      "name": "Name",
      "updated": "Updated",
    };

    const notionProperty = propertyMap[property?.toLowerCase()] || "Published";

    return {
      property: notionProperty,
      direction: validDirection,
    };
  };

  const sortConfig = parseSort(sort_by);
  const sorts = [sortConfig];

  // Fetch all results up to the end of the requested page in a single query.
  // Notion's max page_size is 100, so for large offsets we may need to paginate,
  // but this is still far fewer calls than the previous approach.
  const totalNeeded = page * limit;
  const allResults: unknown[] = [];
  let startCursor: string | undefined = undefined;

  while (allResults.length < totalNeeded) {
    const batchSize = Math.min(100, totalNeeded - allResults.length);
    if (!serverConfig.NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
    const response = await notionClient.databases.query({
      database_id: serverConfig.NOTION_DATABASE_ID,
      filter: {
        and: baseFilter,
      },
      sorts,
      start_cursor: startCursor,
      page_size: batchSize,
    });

    allResults.push(...response.results);

    if (!response.has_more || !response.next_cursor) {
      break;
    }
    startCursor = response.next_cursor;
  }

  // Slice the results for the requested page
  const startIndex = (page - 1) * limit;
  const pageResults = allResults.slice(startIndex, startIndex + limit);

  return {
    results: pageResults,
    has_more: allResults.length > startIndex + limit || (startCursor !== undefined),
    next_cursor: null, // Cursor-based pagination is not exposed to the client
  };
};

export const getBlogFilters = async () => {
  if (!serverConfig.NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
  const database = await notionClient.databases.retrieve({
    database_id: serverConfig.NOTION_DATABASE_ID,
  });
  const tagsProperty = database.properties.Tags as { multi_select?: { options: { name: string }[] } };
  const categoriesProperty = database.properties.Category as { select?: { options: { name: string }[] } };
  const tags = tagsProperty?.multi_select?.options.map((tag) => (tag.name)) || [];
  const categories = categoriesProperty?.select?.options.map((option) => (option.name)) || [];
  return { tags, categories };
};

export const getProjectType = async () => {
  if (!serverConfig.NOTION_PROJECT_ID) throw new Error("Missing NOTION_PROJECT_ID");
  const database = await notionClient.databases.retrieve({
    database_id: serverConfig.NOTION_PROJECT_ID,
  });
  const typeProperty = database.properties.Category as { select?: { options: { id: string; name: string }[] } };
  return typeProperty.select?.options;
};

export const getProject = async () => {
  if (!serverConfig.NOTION_PROJECT_ID) throw new Error("Missing NOTION_PROJECT_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_PROJECT_ID,
    sorts: [
      {
        property: "End",
        direction: "descending",
      },
    ],
  });
  return results;
};

export const getExperience = async () => {
  if (!serverConfig.NOTION_EXPERIENCE_ID) throw new Error("Missing NOTION_EXPERIENCE_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_EXPERIENCE_ID,
    sorts: [
      {
        property: "End",
        direction: "descending",
      },
    ],
  });
  return results;
};

export const getEducation = async () => {
  if (!serverConfig.NOTION_EDUCATION_ID) throw new Error("Missing NOTION_EDUCATION_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_EDUCATION_ID,
    sorts: [
      {
        property: "End",
        direction: "descending",
      },
    ],
  });
  return results;
};

export const getTestimonials = async () => {
  if (!serverConfig.NOTION_TESTIMONIAL_ID) throw new Error("Missing NOTION_TESTIMONIAL_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_TESTIMONIAL_ID,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  return results;
};

export const getBlogs = async () => {
  if (!serverConfig.NOTION_DATABASE_ID) throw new Error("Missing NOTION_DATABASE_ID");
  const { results } = await notionClient.databases.query({
    database_id: serverConfig.NOTION_DATABASE_ID,
    filter: {
      property: "Public",
      checkbox: { equals: true },
    },
  });
  return results;
};
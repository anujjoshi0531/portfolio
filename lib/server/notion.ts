import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { validate } from "uuid";

export const notion = new NotionAPI();
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPage = async (param: string) => {
  const isUUID = validate(param);
  let page;

  if (isUUID) {
    page = await notionClient.pages.retrieve({ page_id: param }).catch(() => null);
  } else {
    const { results } = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
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
  isProject,
}: {
  query?: string;
  tags?: string[];
  dateFilter?: {
    property: string;
    after?: Date;
    before?: Date;
  };
  isPublic?: boolean;
  isProject?: boolean;
}) => {
  const baseFilter: any[] = [
    {
      property: "Public",
      checkbox: { equals: isPublic },
    },
  ];

  if (isProject !== undefined) {
    baseFilter.push({
      property: "Project",
      checkbox: { equals: isProject },
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
  isProject,
}: {
  query?: string;
  tags?: string[];
  dateFilter?: {
    property: string;
    after?: Date;
    before?: Date;
  };
  isPublic?: boolean;
  isProject?: boolean;
}) => {
  const baseFilter = buildFilter({ query, tags, dateFilter, isPublic, isProject });
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
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
  isProject,
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
  isProject?: boolean;
}) => {
  const baseFilter = buildFilter({ query, tags, dateFilter, isPublic, isProject });
  
  const parseSort = (sortParam: string) => {
    const [property, direction] = sortParam.split("-");
    const validDirection = direction === "ascending" || direction === "descending" 
      ? direction as "ascending" | "descending"
      : "descending";
    
    const propertyMap: Record<string, string> = {
      "published": "Published",
      "name": "Name",
      "updates": "Last Updated",
      "last_updated": "Last Updated",
    };
    
    const notionProperty = propertyMap[property?.toLowerCase()] || "Published";
    
    return {
      property: notionProperty,
      direction: validDirection,
    };
  };
  
  const sortConfig = parseSort(sort_by);
  
  // Calculate how many pages to skip
  const pagesToSkip = Math.max(0, (page - 1));
  let startCursor: string | undefined = undefined;
  const sorts = [sortConfig];
  
  if (pagesToSkip > 0) {
    let currentPage = 1;
    while (currentPage < page) {
      const skipPage = await notionClient.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          and: baseFilter,
        },
        sorts,
        start_cursor: startCursor,
        page_size: limit,
      });
      
      if (!skipPage.has_more || !skipPage.next_cursor) {
        // No more pages, return empty result
        return {
          results: [],
          has_more: false,
          next_cursor: null,
        };
      }
      
      startCursor = skipPage.next_cursor;
      currentPage++;
    }
  }
  
  return await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: baseFilter,
    },
    sorts,
    start_cursor: startCursor,
    page_size: limit,
  });
};

export const getAllTags = async () => {
  const database = await notionClient.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  const tagsProperty = database.properties.Tags as any;
  const tags = tagsProperty.multi_select?.options.map((tag: any) => (tag.name)) || [];  
  return tags;

};

export const getProjectType = async () => {
  const database = await notionClient.databases.retrieve({
    database_id: process.env.NOTION_PROJECT_ID!,
  });
  const typeProperty = database.properties.Category as any;
  return typeProperty.select?.options;
};

export const getProject = async () => {
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_PROJECT_ID!,
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
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_EXPERIENCE_ID!,
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
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_EDUCATION_ID!,
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
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_TESTIMONIAL_ID!,
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
  const { results } = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  return results;
};
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { validate } from "uuid";
import { config } from "../constant";

export const notion = new NotionAPI();
export const notionClient = new Client({
  auth: config.NOTION_TOKEN,
});

export const fetchPage = async (param: string) => {
  const isUUID = validate(param);
  let page;

  if (isUUID) {
    page = await notionClient.pages.retrieve({ page_id: param }).catch(() => null);
  } else {
    const { results } = await notionClient.databases.query({
      database_id: config.NOTION_DATABASE_ID!,
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
  const { results } = await notionClient.databases.query({
    database_id: config.NOTION_DATABASE_ID!,
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
  
  // Calculate how many pages to skip
  const pagesToSkip = Math.max(0, (page - 1));
  let startCursor: string | undefined = undefined;
  const sorts = [sortConfig];
  
  if (pagesToSkip > 0) {
    let currentPage = 1;
    while (currentPage < page) {
      const skipPage = await notionClient.databases.query({
        database_id: config.NOTION_DATABASE_ID!,
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
    database_id: config.NOTION_DATABASE_ID!,
    filter: {
      and: baseFilter,
    },
    sorts,
    start_cursor: startCursor,
    page_size: limit,
  });
};

export const getBlogFilters = async () => {
  const database = await notionClient.databases.retrieve({
    database_id: config.NOTION_DATABASE_ID!,
  });
  const tagsProperty = database.properties.Tags as any;
  const categoriesProperty = database.properties.Category as any;
  const tags = tagsProperty?.multi_select?.options.map((tag: any) => (tag.name)) || [];
  const categories = categoriesProperty?.select?.options.map((option: any) => (option.name)) || [];
  return { tags, categories };
};

export const getProjectType = async () => {
  const database = await notionClient.databases.retrieve({
    database_id: config.NOTION_PROJECT_ID!,
  });
  const typeProperty = database.properties.Category as any;
  return typeProperty.select?.options;
};

export const getProject = async () => {
  const { results } = await notionClient.databases.query({
    database_id: config.NOTION_PROJECT_ID!,
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
    database_id: config.NOTION_EXPERIENCE_ID!,
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
    database_id: config.NOTION_EDUCATION_ID!,
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
    database_id: config.NOTION_TESTIMONIAL_ID!,
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
    database_id: config.NOTION_DATABASE_ID!,
    filter: {
      property: "Public",
      checkbox: { equals: true },
    },
  });
  return results;
};
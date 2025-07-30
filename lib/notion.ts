import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notion = new NotionAPI();
export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getRecordMap = async (pageId: string) => {
  const data = await notion.getPage(pageId);
  return data;
};

export const getPageById = async (id: string) => {
  const response = await notionClient.pages.retrieve({
    page_id: id,
  });
  return response;
};

export const getPages = async ({
  query,
  tags,
  dateFilter,
  limit = 10,
  sortBy = "Last Updated",
  sortDirection = "descending",
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
  sortBy?: string;
  isPublic?: boolean;
  isProject?: boolean;
  sortDirection?: "ascending" | "descending";
}) => {
  const baseFilter: any[] = [
    {
      property: "Public",
      checkbox: { equals: isPublic },
    },
  ];

  if( isProject !== undefined) {
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
  return await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: baseFilter,
    },
    sorts: [
      {
        property: sortBy,
        direction: sortDirection,
      },
    ],
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

export const totalPages = async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
   });
  return response.results.length;
};

export const getProjectType = async () => {
  const database = await notionClient.databases.retrieve({
    database_id: process.env.NOTION_PROJECT_ID!,
  });
  const typeProperty = database.properties.Category as any;
  return typeProperty.select?.options;
};

export const getProject = async () => {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_PROJECT_ID!,
  });
  return response.results;
};

export const getExperience = async () => {
  const experiences = await notionClient.databases.query({
    database_id: process.env.NOTION_EXPERIENCE_ID!,
  });
  return experiences.results;
};

export const getEducation = async () => {
  const education = await notionClient.databases.query({
    database_id: process.env.NOTION_EDUCATION_ID!,
  });
  return education.results;
};

export const getTestimonials = async () => {
  const testimonials = await notionClient.databases.query({
    database_id: process.env.NOTION_TESTIMONIAL_ID!,
  });
  return testimonials.results;
};
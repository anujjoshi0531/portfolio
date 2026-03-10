import { Client } from "@notionhq/client";
import type { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

import { serverConfig } from "../constant/config.server";

type DataSourceFilter = NonNullable<QueryDataSourceParameters["filter"]>;

export const notion = new NotionAPI();
export const notionClient = new Client({
  auth: serverConfig.NOTION_TOKEN,
});

// Resolves a database ID to its primary data source ID (v5 / API 2025-09-03).
// Results are cached in-memory for the lifetime of the process.
const dsIdCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
  const cached = dsIdCache.get(databaseId);
  if (cached) return cached;

  const db = await notionClient.databases.retrieve({ database_id: databaseId });
  const sources = (db as unknown as { data_sources?: { id: string }[] }).data_sources;
  const dsId = sources?.[0]?.id;
  if (!dsId) throw new Error(`No data source found for database: ${databaseId}`);

  dsIdCache.set(databaseId, dsId);
  return dsId;
}

export function requireId(id: string | undefined, name: string): string {
  if (!id) throw new Error(`Missing ${name}`);
  return id;
}

// --- Types ---

interface DateFilterConfig {
  property: string;
  after?: Date;
  before?: Date;
}

interface FilterOptions {
  query?: string;
  tags?: string[];
  dateFilter?: DateFilterConfig;
  isPublic?: boolean;
  category?: string;
}

type FilterEntry = Record<string, unknown> & { property: string };
type CompoundFilterEntry = { or: FilterEntry[] };
type NotionFilter = FilterEntry | CompoundFilterEntry;

// --- Core helpers ---

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseSort(sortParam: string) {
  const [property, direction] = sortParam.split("-");
  const validDirection =
    direction === "ascending" || direction === "descending"
      ? direction
      : "descending";

  const propertyMap: Record<string, string> = {
    published: "Published",
    name: "Name",
    updated: "Updated",
  };

  return {
    property: propertyMap[property?.toLowerCase()] || "Published",
    direction: validDirection as "ascending" | "descending",
  };
}

// --- Exported functions ---

export async function fetchPage(param: string) {
  let page;

  if (UUID_PATTERN.test(param)) {
    page = await notionClient.pages.retrieve({ page_id: param }).catch(() => null);
  } else {
    const dbId = requireId(serverConfig.NOTION_DATABASE_ID, "NOTION_DATABASE_ID");
    const dsId = await getDataSourceId(dbId);
    const { results } = await notionClient.dataSources.query({
      data_source_id: dsId,
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
}

export function buildFilter({
  query,
  tags,
  dateFilter,
  isPublic = true,
  category,
}: FilterOptions): NotionFilter[] {
  const filters: NotionFilter[] = [];

  if (isPublic !== undefined) {
    filters.push({ property: "Public", checkbox: { equals: isPublic } });
  }

  if (category !== undefined) {
    filters.push({ property: "Category", select: { equals: category } });
  }

  if (query) {
    const sanitized = query.replace(/[^a-zA-Z0-9 -]/g, "").slice(0, 100);
    if (sanitized) {
      filters.push({
        or: [
          { property: "Name", rich_text: { contains: sanitized } },
          { property: "Description", rich_text: { contains: sanitized } },
        ],
      });
    }
  }

  if (tags?.length) {
    filters.push({
      or: tags.map((tag) => ({
        property: "Tags",
        multi_select: { contains: tag },
      })),
    });
  }

  if (dateFilter?.after) {
    const date = dateFilter.after;
    const isValidDate = date instanceof Date && !isNaN(date.getTime());
    const dateStr = isValidDate ? date.toISOString().split("T")[0] : date;

    if (dateStr) {
      filters.push({
        property: dateFilter.property,
        date: { on_or_after: dateStr as string },
      });
    }
  }
  if (dateFilter?.before) {
    const date = dateFilter.before;
    const isValidDate = date instanceof Date && !isNaN(date.getTime());
    const dateStr = isValidDate ? date.toISOString().split("T")[0] : date;

    if (dateStr) {
      filters.push({
        property: dateFilter.property,
        date: { on_or_before: dateStr as string },
      });
    }
  }

  return filters;
}

export async function getPagesCount(options: FilterOptions) {
  const filters = buildFilter(options);
  const dbId = requireId(serverConfig.NOTION_DATABASE_ID, "NOTION_DATABASE_ID");
  const dsId = await getDataSourceId(dbId);

  let total = 0;
  let cursor: string | undefined;

  do {
    const response = await notionClient.dataSources.query({
      data_source_id: dsId,
      filter: { and: filters } as DataSourceFilter,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    total += response.results.length;
    cursor = response.has_more && response.next_cursor
      ? response.next_cursor
      : undefined;
  } while (cursor);

  return { total };
}

export async function searchPages({
  query,
  tags,
  dateFilter,
  limit = 10,
  page = 1,
  sort_by = "published-descending",
  isPublic = true,
  category,
}: FilterOptions & {
  limit?: number;
  page?: number;
  sort_by?: string;
}) {
  const filters = buildFilter({ query, tags, dateFilter, isPublic, category });
  const dbId = requireId(serverConfig.NOTION_DATABASE_ID, "NOTION_DATABASE_ID");
  const dsId = await getDataSourceId(dbId);
  const sortConfig = parseSort(sort_by);

  const totalNeeded = page * limit;
  const allResults: unknown[] = [];
  let startCursor: string | undefined;

  while (allResults.length < totalNeeded) {
    const batchSize = Math.min(100, totalNeeded - allResults.length);
    const response = await notionClient.dataSources.query({
      data_source_id: dsId,
      filter: { and: filters } as DataSourceFilter,
      sorts: [sortConfig],
      page_size: batchSize,
      ...(startCursor ? { start_cursor: startCursor } : {}),
    });

    allResults.push(...response.results);
    if (!response.has_more || !response.next_cursor) break;
    startCursor = response.next_cursor;
  }

  const startIndex = (page - 1) * limit;
  const pageResults = allResults.slice(startIndex, startIndex + limit);

  return {
    results: pageResults,
    has_more: allResults.length > startIndex + limit || startCursor !== undefined,
    next_cursor: null,
  };
}

export async function getBlogFilters() {
  const dbId = requireId(serverConfig.NOTION_DATABASE_ID, "NOTION_DATABASE_ID");
  const dsId = await getDataSourceId(dbId);
  const dataSource = await notionClient.dataSources.retrieve({ data_source_id: dsId });

  const props = (dataSource as Record<string, unknown>).properties as
    Record<string, Record<string, unknown>> | undefined;

  const tagsProperty = props?.Tags as
    { multi_select?: { options: { name: string }[] } } | undefined;
  const categoriesProperty = props?.Category as
    { select?: { options: { name: string }[] } } | undefined;

  const tags = tagsProperty?.multi_select?.options.map((t) => t.name) ?? [];
  const categories = categoriesProperty?.select?.options.map((o) => o.name) ?? [];

  return { tags, categories };
}

export async function getProjectType() {
  const dbId = requireId(serverConfig.NOTION_PROJECT_ID, "NOTION_PROJECT_ID");
  const dsId = await getDataSourceId(dbId);
  const dataSource = await notionClient.dataSources.retrieve({ data_source_id: dsId });

  const props = (dataSource as Record<string, unknown>).properties as
    Record<string, Record<string, unknown>> | undefined;
  const typeProperty = props?.Category as
    { select?: { options: { id: string; name: string }[] } } | undefined;

  return typeProperty?.select?.options;
}

export async function fetchCollection(
  dbId: string | undefined,
  sortProp: string,
  dbName: string,
) {
  const id = requireId(dbId, dbName);
  const dsId = await getDataSourceId(id);
  const { results } = await notionClient.dataSources.query({
    data_source_id: dsId,
    sorts: [{ property: sortProp, direction: "descending" }],
  });
  return results;
}

export const getProject = () =>
  fetchCollection(serverConfig.NOTION_PROJECT_ID, "End", "NOTION_PROJECT_ID");

export const getExperience = () =>
  fetchCollection(serverConfig.NOTION_EXPERIENCE_ID, "End", "NOTION_EXPERIENCE_ID");

export const getEducation = () =>
  fetchCollection(serverConfig.NOTION_EDUCATION_ID, "End", "NOTION_EDUCATION_ID");

export const getTestimonials = () =>
  fetchCollection(serverConfig.NOTION_TESTIMONIAL_ID, "Date", "NOTION_TESTIMONIAL_ID");

export async function getBlogs() {
  const dbId = requireId(serverConfig.NOTION_DATABASE_ID, "NOTION_DATABASE_ID");
  const dsId = await getDataSourceId(dbId);
  const { results } = await notionClient.dataSources.query({
    data_source_id: dsId,
    filter: {
      property: "Public",
      checkbox: { equals: true },
    },
  });
  return results;
}

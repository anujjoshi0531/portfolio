import { extractPlainText } from '@/lib';
import { getBlogs } from '@/lib/server/notion';
import type { MetadataRoute } from 'next';
import { clientConfig } from "@/lib/constant/config.client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = clientConfig.BASE_URL;
    const pages = await getBlogs() as unknown as NotionBlogPage[];
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/project`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    const dynamicPages: MetadataRoute.Sitemap = pages?.map((page) => {
        const slug = extractPlainText(page.properties.Slug?.rich_text) || '';
        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    }) ?? [];

    return [...staticPages, ...dynamicPages];
}
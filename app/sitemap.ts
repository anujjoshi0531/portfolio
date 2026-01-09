import { extractPlainText } from '@/lib';
import { getBlogs } from '@/lib/server/notion';
import type { MetadataRoute } from 'next';
import { config } from '@/lib/constant';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = config.BASE_URL;
    const pages = await getBlogs();
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
        const slug = extractPlainText((page as any).properties.Slug?.rich_text) || '';
        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    }) ?? [];
    console.log(pages?.length, "dynamic pages found");

    return [...staticPages, ...dynamicPages];
}
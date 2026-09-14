import { getBlogs } from '@/features/blog/lib/content';
import type { MetadataRoute } from 'next';
import { clientConfig } from "@/lib/config/client";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = clientConfig.BASE_URL;
    const pages = getBlogs();
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
        const slug = page.slug;
        return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: page.updated ? new Date(page.updated) : now,
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    }) ?? [];

    return [...staticPages, ...dynamicPages];
}
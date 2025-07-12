import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anujjoshi.netlify.app';

    let pages: { id: string }[] = [];
    try {
        const response = await fetch(`${baseUrl}/api/search`);
        if (response.ok) {
            const data = await response.json();
            pages = data.results || [];
        }
    } catch {
        console.log('Failed to fetch pages for sitemap');
    }

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
            priority: 0.5,
        },
        {
            url: `${baseUrl}/project`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    const dynamicPages: MetadataRoute.Sitemap = pages.map((page) => ({
        url: `${baseUrl}/blog/${page.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.5,
    }));

    return [...staticPages, ...dynamicPages];
}
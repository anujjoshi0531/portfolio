import NotFound from "@/app/not-found";
import { NotionPage } from "@/components/blog/NotionPage";
import BlogSection from "@/components/home/BlogSection";
import { extractPlainText } from "@/lib";
import { fetchPage } from "@/lib/server/notion";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { NewsletterSubscription } from "@/components/blog/NewsletterSubscription";

const ShareAndReact = dynamic(() => import("@/components/blog/ShareAndReact"), {
  loading: () => null,
});

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  const { data } = await fetchPage(pageId);

  if (!data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
      alternates: {
        canonical: `/blog/${pageId}`,
      },
      openGraph: {
        title: "Page Not Found",
        description: "The requested page does not exist.",
        type: "article",
        url: `/blog/${pageId}`,
        images: [
          {
            url: `/opengraph-image.webp`,
            width: 1200,
            height: 630,
            alt: "Page Not Found",
          },
        ],
      },
      twitter: {
        title: "Page Not Found",
        description: "The requested page does not exist.",
        card: "summary_large_image",
        creator: "@anujjoshi3105",
        site: "@anujjoshi3105",
      },
    };
  }

  const page = data as unknown as NotionBlogPage;
  const props = page.properties;
  const title = extractPlainText(props.Name?.title) || "Untitled";
  const description = extractPlainText(props.Description?.rich_text) || "No description available.";
  const image = props.Thumbnail.files[0]?.file?.url || props.Thumbnail.files[0]?.external?.url || `/opengraph-image.webp`;
  const slug = extractPlainText(props.Slug?.rich_text);


  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      creator: "@anujjoshi3105",
      site: "@anujjoshi3105",
      images: [image],
    },
  };
}

import JsonLd from "@/components/global/JsonLd";

export default async function page({ params }: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const { data, recordMap } = await fetchPage(pageId);
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pageId)) {
    const page = data as unknown as NotionBlogPage;
    const slug = extractPlainText(page?.properties?.Slug?.rich_text);
    if (slug) redirect(`/blog/${slug}`);
  }
  if (!data) return <NotFound />;

  const page = data as unknown as NotionBlogPage;
  const tags = page?.properties?.Tags?.multi_select?.map((tag) => tag.name);

  const title = extractPlainText(page?.properties?.Name?.title) || "Untitled";
  const description = extractPlainText(page?.properties?.Description?.rich_text) || "";
  const image = page?.properties?.Thumbnail.files[0]?.file?.url || page?.properties?.Thumbnail.files[0]?.external?.url || `/opengraph-image.webp`;
  const datePublished = page?.created_time || new Date().toISOString();
  const dateModified = page?.last_edited_time || datePublished;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: "Anuj Joshi",
    }
  };

  return <div className="pt-16 max-w-[900px] mx-auto relative px-4 sm:px-6 lg:px-8">
    <JsonLd data={jsonLd} />

    {/* Floating interaction bar on the left */}
    <ShareAndReact title={title} slug={extractPlainText(page?.properties?.Slug?.rich_text) || pageId} />

    <NotionPage
      recordMap={recordMap}
      slug={extractPlainText(page?.properties?.Slug?.rich_text) || pageId}
    />

    {/* Up Next / Related Articles */}
    <div className="my-16 sm:my-20">
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">More Related Articles</h3>
      <BlogSection tags={tags} excludeId={page.id} />
    </div>
    <NewsletterSubscription />
  </div>;
}

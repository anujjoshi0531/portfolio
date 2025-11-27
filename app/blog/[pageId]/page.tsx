import NotFound from "@/app/not-found";
import { NotionPage } from "@/components/blog/NotionPage";
import { extractPlainText } from "@/lib";
import { fetchPage } from "@/lib/server/notion";
import { redirect } from "next/navigation";
import { validate } from "uuid";

export const revalidate = 60 * 60; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  const { data } = await fetchPage(pageId);

  console.log("data", data);

  if (!data) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
      openGraph: {
        title: "Page Not Found",
        description: "The requested page does not exist.",
        type: "website",
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app"}/blog/${pageId}`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app"}/opengraph-image.webp`,
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

  const props = (data as any).properties || {};
  const title = extractPlainText(props.Name?.title) || "Untitled";
  const description = extractPlainText(props.Description?.rich_text) || "No description available.";
  const image = props.Thumbnail?.url || `${process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app"}/opengraph-image.webp`;
  const slug = extractPlainText(props.Slug?.rich_text);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app"}/blog/${slug}`,
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

export default async function page({ params } : {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const { data, recordMap } = await fetchPage(pageId);
  if (validate(pageId)) {
    const slug = extractPlainText((data as any)?.properties?.Slug?.rich_text);
    if (slug) redirect(`/blog/${slug}`);
  }
  if (!data) return <NotFound />;
  return <NotionPage recordMap={recordMap} />;
}

import Image from "next/image";
import NotFound from "@/app/not-found";
import BlogSection from "@/components/home/BlogSection";
import { getBlogBySlug } from "@/lib/server/local-content";
import { MarkdownRenderer } from "@/components/global/MarkdownRenderer";
import dynamic from "next/dynamic";
import { NewsletterSubscription } from "@/components/blog/NewsletterSubscription";
import JsonLd from "@/components/global/JsonLd";

const ShareAndReact = dynamic(() => import("@/components/blog/ShareAndReact"), {
  loading: () => null,
});

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  const localBlog = getBlogBySlug(pageId);

  if (!localBlog) {
    return {
      title: "Page Not Found",
      description: "The requested page does not exist.",
      alternates: {
        canonical: `/blog/${pageId}`,
      },
    };
  }

  return {
    title: localBlog.title,
    description: localBlog.description || "No description available.",
    alternates: {
      canonical: `/blog/${localBlog.slug}`,
    },
    openGraph: {
      title: localBlog.title,
      description: localBlog.description || "No description available.",
      type: "article",
      url: `/blog/${localBlog.slug}`,
      images: [
        {
          url: localBlog.thumbnail || `/opengraph-image.webp`,
          width: 1200,
          height: 630,
          alt: localBlog.title,
        },
      ],
    },
    twitter: {
      title: localBlog.title,
      description: localBlog.description || "No description available.",
      card: "summary_large_image",
      creator: "@anujjoshi3105",
      site: "@anujjoshi3105",
      images: [localBlog.thumbnail || `/opengraph-image.webp`],
    },
  };
}

export default async function page({ params }: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const localBlog = getBlogBySlug(pageId);

  if (!localBlog) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: localBlog.title,
    description: localBlog.description,
    image: localBlog.thumbnail || `/opengraph-image.webp`,
    datePublished: localBlog.published || localBlog.created || new Date().toISOString(),
    dateModified: localBlog.updated || localBlog.created || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Anuj Joshi",
    },
  };

  return (
    <div className="pt-16 max-w-[900px] mx-auto relative px-4 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />
      <ShareAndReact title={localBlog.title} slug={localBlog.slug} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-neutral-100">{localBlog.title}</h1>
        <p className="text-lg text-neutral-400 mb-6">{localBlog.description}</p>
        {localBlog.thumbnail && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 border border-neutral-800">
            <Image src={localBlog.thumbnail} alt={localBlog.title} fill className="object-cover" sizes="(max-width: 900px) 100vw, 900px" priority />
          </div>
        )}
      </div>

      <MarkdownRenderer content={localBlog.content} slug={localBlog.slug} />

      <div className="my-16 sm:my-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">More Related Articles</h3>
        <BlogSection tags={localBlog.tags} excludeId={localBlog.slug} />
      </div>
      <NewsletterSubscription />
    </div>
  );
}

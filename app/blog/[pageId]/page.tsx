import NotFound from "@/app/not-found";
import BlogSection from "@/components/home/BlogSection";
import { getBlogBySlug } from "@/features/blog/lib/content";
import { getBacklinks, getGraphData } from "@/features/blog/lib/graph";
import { renderMarkdownWithToc } from "@/components/global/MarkdownRenderer";
import { PageTemplate } from "@/components/global/SectionTemplate";
import { NewsletterSubscription } from "@/components/blog/NewsletterSubscription";
import JsonLd from "@/components/global/JsonLd";
import { Backlinks } from "@/components/blog/Backlinks";
import { PopoverPreview } from "@/components/blog/PopoverPreview";
import { DynamicGraphView } from "@/components/blog/DynamicGraphView";
import { TableOfContents } from "@/components/blog/TableOfContents";
import ShareAndReact from "@/components/blog/ShareAndReact";
import { BlogPlaylistContexts } from "@/features/blog/playlists/components/BlogPlaylistContexts";
import { getBlogPlaylistContexts } from "@/features/blog/playlists/lib/playlists";

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

export default async function page({ params, searchParams }: {
  params: Promise<{ pageId: string }>;
  searchParams?: Promise<{ from?: string | string[] }>;
}) {
  const { pageId } = await params;
  const query = await searchParams;
  const localBlog = getBlogBySlug(pageId);

  if (!localBlog) return <NotFound />;

  const graphData = getGraphData();
  const backlinks = getBacklinks(localBlog.slug);
  const playlistContexts = getBlogPlaylistContexts(localBlog.slug);
  const activePlaylistContext = Array.isArray(query?.from) ? query.from[0] : query?.from;
  const { element: renderedContent, toc } = await renderMarkdownWithToc({
    content: localBlog.content,
    slug: localBlog.slug,
  });
  const showIndex = toc.length >= 3;

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
    <>
      <JsonLd data={jsonLd} />
      <PopoverPreview />
      <ShareAndReact title={localBlog.title} slug={localBlog.slug} />
      <PageTemplate title={localBlog.title} subtitle={localBlog.description} />

      <main className="max-w-[1150px] mx-auto relative px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {showIndex && <TableOfContents toc={toc} className="lg:hidden" />}

          <BlogPlaylistContexts
            contexts={playlistContexts}
            activeContextId={activePlaylistContext}
          />

          {renderedContent}

          {/* Quartz Backlinks Section */}
          <div className="pt-8">
            <Backlinks backlinks={backlinks} />
          </div>
        </div>

        {/* Right Sidebar: Quartz Knowledge Graph & Interactive Tools */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {showIndex && <TableOfContents toc={toc} className="hidden lg:block" />}
          <DynamicGraphView data={graphData} currentSlug={localBlog.slug} title="Local Knowledge Graph" />
        </div>
      </div>

      <div className="my-16 sm:my-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8">More Related Articles</h3>
        <BlogSection tags={localBlog.tags} excludeId={localBlog.slug} />
      </div>
      <NewsletterSubscription />
      </main>
    </>
  );
}

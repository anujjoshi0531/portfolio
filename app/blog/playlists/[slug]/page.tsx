import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/global/SectionTemplate";
import { getBlogPlaylistBySlug, getBlogPlaylists } from "@/features/blog/playlists/lib/playlists";

interface BlogPlaylistDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPlaylists().map((playlist) => ({
    slug: playlist.id,
  }));
}

export async function generateMetadata({
  params,
}: BlogPlaylistDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const playlist = getBlogPlaylistBySlug(slug);

  if (!playlist) {
    return {
      title: "Blog Playlist Not Found",
    };
  }

  return {
    title: `${playlist.title} | Blog Playlists`,
    description: playlist.description,
  };
}

export default async function BlogPlaylistDetailPage({ params }: BlogPlaylistDetailPageProps) {
  const { slug } = await params;
  const playlist = getBlogPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <PageTemplate title={playlist.title} subtitle={playlist.description} />

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <Badge>{playlist.itemCount} posts</Badge>
          {playlist.summary && <span>{playlist.summary}</span>}
        </div>

        <div className="space-y-10">
          {playlist.sections.map((section, sectionIndex) => {
            const sectionOffset = playlist.sections
              .slice(0, sectionIndex)
              .reduce((count, previousSection) => count + previousSection.items.length, 0);

            return (
              <section key={section.title} className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  <div className="mt-2 h-px bg-border" />
                </div>

                <div className="divide-y rounded-sm border bg-muted/30">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={item.slug}
                      href={`${item.href}?from=${playlist.id}`}
                      className="group grid gap-3 p-4 transition-colors hover:bg-muted/70 sm:grid-cols-[3rem_1fr_auto]"
                    >
                      <div className="font-mono text-sm font-semibold text-muted-foreground">
                        {String(sectionOffset + itemIndex + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold leading-snug group-hover:text-primary">
                            {item.title}
                          </h3>
                          {item.category && (
                            <Badge variant="outline" className="text-[0.7rem]">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <BookOpen className="size-4" />
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

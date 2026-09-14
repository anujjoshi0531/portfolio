import type { Metadata } from "next";
import { PageTemplate } from "@/components/global/SectionTemplate";
import { BlogPlaylistSummaryCard } from "@/features/blog/playlists/components/BlogPlaylistSummaryCard";
import { getBlogPlaylists } from "@/features/blog/playlists/lib/playlists";

export const metadata: Metadata = {
  title: "Blog Playlists | Portfolio",
  description: "Curated reading paths through blog posts and contest writeups.",
};

export default function BlogPlaylistsPage() {
  const playlists = getBlogPlaylists();

  return (
    <>
      <PageTemplate
        title="Blog Playlists"
        subtitle="Curated paths through posts, writeups, and problem-solving notes"
      />

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {playlists.map((playlist) => (
            <BlogPlaylistSummaryCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </main>
    </>
  );
}

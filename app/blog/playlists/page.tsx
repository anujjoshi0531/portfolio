import type { Metadata } from "next";
import { PageTemplate } from "@/components/global/SectionTemplate";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogPlaylistListingItems } from "@/features/blog/lib/listing";

export const metadata: Metadata = {
  title: "Blog Playlists | Portfolio",
  description: "Curated reading paths through blog posts and contest writeups.",
};

export default function BlogPlaylistsPage() {
  const playlists = getBlogPlaylistListingItems();

  return (
    <>
      <PageTemplate
        title="Blog Playlists"
        subtitle="Curated paths through posts, writeups, and problem-solving notes"
      />

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {playlists.map((playlist) => (
            <BlogCard key={playlist.id} blog={playlist} />
          ))}
        </div>
      </main>
    </>
  );
}

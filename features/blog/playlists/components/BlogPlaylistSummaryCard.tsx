import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPlaylist } from "@/features/blog/playlists/types";

interface BlogPlaylistSummaryCardProps {
  playlist: BlogPlaylist;
}

export function BlogPlaylistSummaryCard({ playlist }: BlogPlaylistSummaryCardProps) {
  return (
    <Link href={`/blog/playlists/${playlist.id}`} className="group block h-full">
      <Card className="h-full transition-colors hover:border-primary/40">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <ListChecks className="size-4" />
              {playlist.itemCount} posts
            </div>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <CardTitle className="text-xl">{playlist.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            {playlist.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

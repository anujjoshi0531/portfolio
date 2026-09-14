import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPlaylistContext } from "@/features/blog/playlists/types";

interface BlogPlaylistContextsProps {
  contexts: BlogPlaylistContext[];
  activeContextId?: string;
}

function withContext(href: string, playlistId: string) {
  return `${href}?from=${playlistId}`;
}

export function BlogPlaylistContexts({
  contexts,
  activeContextId,
}: BlogPlaylistContextsProps) {
  if (contexts.length === 0) return null;

  const activeContext =
    contexts.find((context) => context.playlist.id === activeContextId) ?? contexts[0];

  return (
    <Card className="border-primary/15 bg-background/70">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Layers className="size-4" />
          Part of
        </div>
        <CardTitle className="text-lg leading-snug">
          {activeContext.playlist.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {contexts.map((context) => (
            <Link
              key={context.playlist.id}
              href={withContext(context.current.href, context.playlist.id)}
            >
              <Badge
                variant={context.playlist.id === activeContext.playlist.id ? "default" : "outline"}
                className="cursor-pointer"
              >
                {context.playlist.title}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {activeContext.previous ? (
            <Link
              href={withContext(activeContext.previous.href, activeContext.playlist.id)}
              className="group rounded-sm border bg-muted/40 p-3 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <ArrowLeft className="size-3.5" />
                Previous
              </div>
              <div className="mt-1 text-sm font-semibold group-hover:text-primary">
                {activeContext.previous.title}
              </div>
            </Link>
          ) : (
            <div className="rounded-sm border border-dashed p-3 text-sm text-muted-foreground">
              Start of playlist
            </div>
          )}

          {activeContext.next ? (
            <Link
              href={withContext(activeContext.next.href, activeContext.playlist.id)}
              className="group rounded-sm border bg-muted/40 p-3 text-right transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-end gap-2 text-xs uppercase text-muted-foreground">
                Next
                <ArrowRight className="size-3.5" />
              </div>
              <div className="mt-1 text-sm font-semibold group-hover:text-primary">
                {activeContext.next.title}
              </div>
            </Link>
          ) : (
            <div className="rounded-sm border border-dashed p-3 text-right text-sm text-muted-foreground">
              End of playlist
            </div>
          )}
        </div>

        <Link
          href={`/blog/playlists/${activeContext.playlist.id}`}
          className="inline-flex text-sm font-medium text-primary hover:underline"
        >
          View full playlist
        </Link>
      </CardContent>
    </Card>
  );
}

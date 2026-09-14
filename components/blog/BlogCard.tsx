import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/styles";
import { timeAgo } from "@/lib/utils/dates";
import type { BlogListingItem } from "@/features/blog/lib/listing";
import Image from "next/image";
import Link from "next/link";
import { ListVideo, Braces } from "lucide-react";
import ViewCounter from "./ViewCounter";

interface BlogCardProps {
  blog: BlogPost | BlogListingItem;
  variant?: "vertical" | "horizontal";
  className?: string;
  /** FocusCard-style: index of this card in its sibling list */
  index?: number;
  /** FocusCard-style: which sibling is currently hovered */
  hovered?: number | null;
  /** FocusCard-style: setter to track which card is hovered */
  setHovered?: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function BlogCard({
  blog,
  variant = "vertical",
  className,
  index = 0,
  hovered = null,
  setHovered,
}: BlogCardProps) {
  const isVertical = variant === "vertical";
  const title = blog.title || "Untitled Blog";
  const description = blog.description || "No description available";
  const slug = blog.slug || blog.id;
  const href = "href" in blog ? blog.href : `/blog/${slug}`;
  const thumbnail = blog.thumbnail || "/icon.webp";
  const tags = blog.tags.map((t, i) => ({ id: `${i}`, name: t }));
  const displayDate = blog.created ?? blog.published;
  const isPlaylist = "kind" in blog && blog.kind === "playlist";

  const isVisualizer = "kind" in blog && blog.kind === "visualizer";
  const kindLabel = isVisualizer ? "Visualizer" : isPlaylist ? "Playlist" : "Article";

  // FocusCard: blur & scale down when a sibling is hovered
  const isOtherHovered = hovered !== null && hovered !== index;

  return (
    <Link
      href={href}
      className={cn(
        "block w-full transition-opacity p-1",
        className
      )}
      aria-label={isVisualizer ? `Explore visualizer: ${title}` : isPlaylist ? `Open blog playlist: ${title}` : `Read blog post: ${title}`}
      onMouseEnter={setHovered ? () => setHovered(index) : undefined}
      onMouseLeave={setHovered ? () => setHovered(null) : undefined}
    >
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 flex h-full",
          "hover:shadow-xl hover:-translate-y-1",
          isVertical ? "flex-col pt-0" : "flex-col sm:flex-row py-0",
          isOtherHovered && "blur-sm scale-[0.98]"
        )}>
        <div
          className={cn(
            "relative overflow-hidden",
            isVertical
              ? "aspect-video w-full rounded-t-lg"
              : "aspect-video w-full sm:w-2/5 sm:aspect-square rounded-l-lg sm:rounded-r-none"
          )}>
          {isVisualizer ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/10 text-primary">
              <Braces className="size-14" aria-hidden="true" />
              <span className="text-sm font-mono">{blog.category}</span>
            </div>
          ) : <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />}
          {/* Always-visible bottom gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
          {/* FocusCard-style title overlay — fades in on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex items-end py-4 px-3 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
          </div>

          {isPlaylist && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 text-white" aria-hidden="true">
              <ListVideo className="size-12 drop-shadow-lg" />
            </div>
          )}

          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-md px-2 py-1 text-white">
            {isVisualizer ? (
              <span className="text-xs capitalize">{blog.difficulty}</span>
            ) : isPlaylist ? (
              <>
                <ListVideo className="size-4" aria-hidden="true" />
                <span className="text-xs font-medium">{blog.itemCount ?? 0}</span>
              </>
            ) : (
              <ViewCounter slug={slug} increment={false} className="text-white text-xs scale-90" />
            )}
          </div>

          <div className="absolute bottom-1 left-2 flex gap-1">
            {tags.map((topic) => (
              <Badge key={topic.id}>{topic.name}</Badge>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col justify-between grow",
            !isVertical && "sm:w-3/5 py-6"
          )}>
          <div>
            <CardHeader>
              <span className="text-xs font-medium text-primary">{kindLabel}</span>
              <CardTitle className="line-clamp-1 text-md transition-colors">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className={cn("mb-2 text-sm text-muted-foreground", isVertical && "line-clamp-3 min-h-[4rem]")}>
              {description}
            </CardContent>
          </div>

          <CardContent className="flex items-center justify-end text-muted-foreground text-xs font-medium">
            {isVisualizer ? (
              <span className="text-primary">Explore visualizer</span>
            ) : isPlaylist ? (
              <span>{blog.itemCount ?? 0} {(blog.itemCount ?? 0) === 1 ? "post" : "posts"}</span>
            ) : (
              <time className="text-xs" dateTime={displayDate ? new Date(displayDate).toISOString() : undefined} suppressHydrationWarning>
                {timeAgo(displayDate ? new Date(displayDate) : new Date())}
              </time>
            )}
          </CardContent>
        </div>
      </Card>
    </Link>

  );
}

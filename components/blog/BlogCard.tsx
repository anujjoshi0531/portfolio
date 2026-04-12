import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, extractPlainText, timeAgo } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import ViewCounter from "./ViewCounter";

interface BlogCardProps {
  blog: NotionBlogPage;
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
  const title = extractPlainText(blog.properties.Name?.title) || "Untitled Blog";
  const description = extractPlainText(blog.properties.Description?.rich_text) || "No description available";
  const slug = extractPlainText(blog.properties.Slug?.rich_text) || blog.id;
  const thumbnail = blog.properties.Thumbnail.files[0]?.file?.url || blog.properties.Thumbnail.files[0]?.external?.url || "/icon.webp";
  const tags = blog.properties.Tags?.multi_select || [];


  // FocusCard: blur & scale down when a sibling is hovered
  const isOtherHovered = hovered !== null && hovered !== index;

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "block w-full transition-opacity p-1",
        className
      )}
      aria-label={`Read blog post: ${title}`}
      onMouseEnter={() => setHovered?.(index)}
      onMouseLeave={() => setHovered?.(null)}
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
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
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

          <div className="absolute top-2 right-2 flex gap-1 bg-black/50 backdrop-blur-md rounded-md px-2 py-1">
            <ViewCounter slug={slug} increment={false} className="text-white text-xs scale-90" />
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
              <CardTitle className="line-clamp-1 text-md transition-colors">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className={cn("mb-2 text-sm text-muted-foreground", isVertical && "line-clamp-3 h-16")}>
              {description}
            </CardContent>
          </div>

          <CardContent className="flex items-center justify-end text-muted-foreground text-xs font-medium">
            <time className="text-xs" dateTime={blog.created_time ? new Date(blog.created_time).toISOString() : undefined} suppressHydrationWarning>
              {timeAgo(blog.created_time as unknown as Date)}
            </time>
          </CardContent>
        </div>
      </Card>
    </Link >

  );
}
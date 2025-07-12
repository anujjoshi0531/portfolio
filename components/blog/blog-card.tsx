import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn, extractPlainText, timeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  key: number | string;
  blog: any;
  variant?: "vertical" | "horizontal";
  className?: string;
}

export default function BlogCard({
  blog,
  variant = "vertical",
  className,
}: BlogCardProps) {
  const isVertical = variant === "vertical";

  return (    
  <Link
  key={blog.id}
      href={`/blog/${blog.id}`}
      className={cn(
        "block w-full transition-transform duration-300 p-1",
        className
      )}>
      <Card
      key={blog.id}
        className={cn(
          "group overflow-hidden transition-colors duration-300 flex h-full",
          isVertical ? "flex-col pt-0" : "flex-col sm:flex-row py-0"
        )}>
        <div
          className={cn(
            "relative overflow-hidden",
            isVertical
              ? "aspect-video w-full"
              : "aspect-video w-full sm:w-2/5 sm:aspect-square"
          )}>
          <Image
            src={blog.properties.Thumbnail?.url || blog?.cover?.external?.url || "/icon.png"}
            alt={blog.id}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-1 left-2 flex gap-1">
            {blog?.properties?.Tags && blog?.properties?.Tags?.multi_select?.map((topic: any) => (
              <Badge
              key={topic.id}>
                {topic.name}
              </Badge>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col justify-between flex-grow",
            !isVertical && "sm:w-3/5 py-6"
          )}>
          <div>
            <CardHeader>
              <CardTitle className="line-clamp-1 text-md transition-colors">
                {extractPlainText(blog.properties.Name?.title) || "Untitled Blog"}
              </CardTitle>
            </CardHeader>
            <CardContent className={cn("mb-2 text-sm text-muted-foreground", isVertical && "line-clamp-3 h-16")}>
                {extractPlainText(blog.properties.Description?.rich_text) || "No description available."}
              
            </CardContent>
          </div>
          <CardContent>
            <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
              <div className="flex items-center space-x-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={blog.properties.Author?.rich_text?.[0]?.plain_text}
                    alt={blog.properties.Author?.rich_text?.[0]?.plain_text}
                  />
                  <AvatarFallback>
                    {blog.properties.Author?.rich_text?.[0]?.plain_text.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                  <span className="text-xs">{blog.properties.Author?.rich_text?.[0]?.plain_text || "User"}</span>
              </div>
              <time className="text-xs" dateTime={blog.created_time ? new Date(blog.created_time).toISOString() : undefined}>
                {timeAgo(blog.created_time as unknown as Date)}
              </time>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>

  );
}
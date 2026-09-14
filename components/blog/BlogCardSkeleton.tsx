import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils/styles";

interface BlogCardSkeletonProps {
  variant?: "vertical" | "horizontal"
  className?: string
}

export default function BlogCardSkeleton({ variant = "vertical", className }: BlogCardSkeletonProps) {
  const isVertical = variant === "vertical"

  return (
    <div className={cn("block w-full p-1 animate-pulse", className)}>
      <Card className={cn("overflow-hidden flex h-full", isVertical ? "flex-col pt-0" : "flex-col sm:flex-row py-0")}>
        {/* Image Section Skeleton */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isVertical ? "aspect-video w-full min-w-[350px]" : "aspect-video w-full sm:w-2/5 sm:aspect-square",
          )}
        >
          {/* Image placeholder */}
          <div className="absolute inset-0 bg-linear-to-br from-muted/80 to-muted/40" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          {/* Tags skeleton */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            <div className="h-4 w-12 bg-muted-foreground/20 rounded-full" />
            <div className="h-4 w-16 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className={cn("flex flex-col justify-between grow", !isVertical && "sm:w-3/5 py-6")}>
          <div>
            {/* Title skeleton */}
            <CardHeader>
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded-xl w-4/5" />
                <div className="h-5 bg-muted rounded-xl w-3/5" />
              </div>
            </CardHeader>

            {/* Description skeleton */}
            <CardContent className={cn("mb-2", isVertical && "h-16")}>
              <div className="space-y-2">
                <div className="h-4 bg-muted/70 rounded w-full" />
                <div className="h-4 bg-muted/70 rounded w-5/6" />
                {isVertical && <div className="h-4 bg-muted/70 rounded w-4/6" />}
              </div>
            </CardContent>
          </div>

          {/* Author and date skeleton */}
          <CardContent>
            <div className="flex items-center justify-end">
              {/* Date skeleton */}
              <div className="h-3 bg-muted/70 rounded w-12" />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

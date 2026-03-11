"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib";
import { numberFormatter } from "@/lib/utils";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
  className?: string;
}

export default function ViewCounter({ slug, increment = false, className }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      const viewedKey = `viewed_post_${slug}`;
      const hasViewed = sessionStorage.getItem(viewedKey);

      try {
        // If we are supposed to increment, but we ALREADY incremented this session: just GET instead.
        if (increment && !hasViewed) {
          sessionStorage.setItem(viewedKey, "true");
          const res = await fetch("/api/views", {
            method: "POST",
            body: JSON.stringify({ slug }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (data?.views !== undefined) setViews(data.views);
        } else {
          // Normal GET request (either not incrementing, or already incremented this session)
          const res = await fetch(`/api/views?slug=${slug}`);
          const data = await res.json();
          if (data?.views !== undefined) setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to fetch view count:", error);
      }
    };

    fetchViews();
  }, [slug, increment]);
  if (views === null) return null;
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Eye className="w-4 h-4" />
      <span className="font-medium">
        {numberFormatter.format(views)} {views !== 1 ? 'views' : 'view'}
      </span>
    </div>
  );
}

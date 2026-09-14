"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/styles";
import { numberFormatter } from "@/lib/utils/format";
import { toast } from "sonner";

interface LikeCounterProps {
  slug: string;
  className?: string;
  showCountOnClickOnly?: boolean;
}

export default function LikeCounter({ slug, className, showCountOnClickOnly = false }: LikeCounterProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [showCount, setShowCount] = useState<boolean>(!showCountOnClickOnly);

  useEffect(() => {
    // Check if user already liked
    const likedFiles = JSON.parse(localStorage.getItem('liked_posts') || '{}');
    if (likedFiles[slug]) {
      setHasLiked(true);
    }

    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes?slug=${slug}`);
        const data = await res.json();
        if (data?.likes !== undefined) setLikes(data.likes);
        if (data?.hasLiked !== undefined) setHasLiked(data.hasLiked);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };
    fetchLikes();

    // Listen for sync events from other LikeCounter instances
    const handleSync = (e: Event) => {
        const customEvent = e as CustomEvent<{ slug: string; likes: number; hasLiked: boolean }>;
        if (customEvent.detail.slug === slug) {
            setLikes(customEvent.detail.likes);
            setHasLiked(customEvent.detail.hasLiked);
        }
    };
    window.addEventListener("like-sync", handleSync);
    return () => window.removeEventListener("like-sync", handleSync);
  }, [slug]);

  const handleLike = async () => {
    const isLiking = !hasLiked;
    const currentLikes = likes ?? 0;
    const newLikes = Math.max(0, currentLikes + (isLiking ? 1 : -1));
    
    // Optimistic UI updates
    setLikes(newLikes);
    setHasLiked(isLiking);

    if (showCountOnClickOnly) {
      setShowCount(true);
      setTimeout(() => setShowCount(false), 3000); // Hide after 3 seconds
    }

    // Broadcast change to other components instantly
    window.dispatchEvent(new CustomEvent("like-sync", {
        detail: { slug, likes: newLikes, hasLiked: isLiking }
    }));

    const likedFiles = JSON.parse(localStorage.getItem('liked_posts') || '{}');
    if (isLiking) {
      likedFiles[slug] = true;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete likedFiles[slug];
    }
    localStorage.setItem('liked_posts', JSON.stringify(likedFiles));

    try {
      await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({ slug, action: isLiking ? "increment" : "decrement" }),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Revert Optimistic UI on failure
      setLikes(currentLikes);
      setHasLiked(!isLiking);
      
      // Revert sync for other components
      window.dispatchEvent(new CustomEvent("like-sync", {
        detail: { slug, likes: currentLikes, hasLiked: !isLiking }
      }));

      if (!isLiking) {
          likedFiles[slug] = true;
      } else {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete likedFiles[slug];
      }
      localStorage.setItem('liked_posts', JSON.stringify(likedFiles));
      toast.error("Failed to update like. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={cn(
        "flex items-center gap-1.5 transition-colors duration-200",
        hasLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500",
        className
      )}
    >
      <Heart className={cn("w-4 h-4", hasLiked && "fill-current")} />
      {(showCount || !showCountOnClickOnly) && (
        <span className="font-medium">
          {likes === null ? "..." : numberFormatter.format(likes)}
        </span>
      )}
    </button>
  );
}

"use client";

import { useEffect } from "react";
import ErrorCard from "@/components/global/Error-Card";

export default function BlogPostError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Blog post error:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center py-20">
            <ErrorCard
                error={error}
                title="Failed to Load Blog Post"
                description="We couldn't load this blog post. It may have been moved or the content service is temporarily unavailable."
                onReset={reset}
            />
        </div>
    );
}

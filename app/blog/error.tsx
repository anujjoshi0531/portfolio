"use client";

import { useEffect } from "react";
import ErrorCard from '@/components/global/ErrorCard';

export default function BlogError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Blog page error:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center py-20">
            <ErrorCard
                error={error}
                title="Failed to Load Blog"
                description="We couldn't load the blog posts. The content service might be temporarily unavailable."
                onReset={reset}
            />
        </div>
    );
}

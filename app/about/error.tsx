"use client";

import { useEffect } from "react";
import ErrorCard from '@/components/global/ErrorCard';
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function AboutError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("About page error:", error);
    }, [error]);

    return (
        <>
            <PageTemplate title="About Me" subtitle="My Introduction" />
            <div className="flex items-center justify-center py-20">
                <ErrorCard
                    error={error}
                    title="Failed to Load About Page"
                    description="We couldn't load the about page content. This might be a temporary issue."
                    onReset={reset}
                />
            </div>
        </>
    );
}

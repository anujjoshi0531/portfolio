"use client";

import { useEffect } from "react";
import ErrorCard from '@/components/global/ErrorCard';
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function ProjectError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Project page error:", error);
    }, [error]);

    return (
        <>
            <PageTemplate title="Project" subtitle="My Recent Works" />
            <div className="flex items-center justify-center py-20">
                <ErrorCard
                    error={error}
                    title="Failed to Load Projects"
                    description="We couldn't load the projects. The content service might be temporarily unavailable."
                    onReset={reset}
                />
            </div>
        </>
    );
}

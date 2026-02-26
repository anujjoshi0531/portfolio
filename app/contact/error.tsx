"use client";

import { useEffect } from "react";
import ErrorCard from '@/components/global/ErrorCard';
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function ContactError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Contact page error:", error);
    }, [error]);

    return (
        <>
            <PageTemplate title="Contact Me" subtitle="Feel free to contact" />
            <div className="flex items-center justify-center py-20">
                <ErrorCard
                    error={error}
                    title="Failed to Load Contact Page"
                    description="We couldn't load the contact page. Please try again shortly."
                    onReset={reset}
                />
            </div>
        </>
    );
}

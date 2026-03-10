import React from 'react';

interface JsonLdProps {
    data: Record<string, unknown>;
}

/**
 * A reusable component for injecting JSON-LD scripts for SEO.
 */
export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

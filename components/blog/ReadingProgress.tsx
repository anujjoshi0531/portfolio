"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface ReadingProgressProps {
    /** Pass raw record map to count words for estimated reading time */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recordMap?: any;
}

function countWords(recordMap: unknown): number {
    if (!recordMap || typeof recordMap !== "object") return 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks = (recordMap as any)?.block || {};
    let wordCount = 0;
    for (const key of Object.keys(blocks)) {
        const value = blocks[key]?.value;
        if (!value) continue;
        const properties = value?.properties;
        if (!properties) continue;
        // Notion stores text in `title` property as [[text, ...decorations]]
        const title = properties?.title;
        if (Array.isArray(title)) {
            for (const segment of title) {
                if (typeof segment[0] === "string") {
                    wordCount += segment[0].split(/\s+/).filter(Boolean).length;
                }
            }
        }
    }
    return wordCount;
}

export function ReadingProgress({ recordMap }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);
    const [targetNode, setTargetNode] = useState<Element | null>(null);
    const raf = useRef<number | null>(null);

    const wordCount = countWords(recordMap);
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    useEffect(() => {
        const onScroll = () => {
            if (raf.current) cancelAnimationFrame(raf.current);
            raf.current = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
                setProgress(pct);
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        // Find the notion metadata row to inject the reading time into
        const interval = setInterval(() => {
            const row = document.querySelector('.notion-collection-row');
            if (row) {
                setTargetNode(row);
                clearInterval(interval);
            }
        }, 100);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
            clearInterval(interval);
        };
    }, []);

    const ReadingTimePill = (
        <div className="notion-collection-row-property">
            <div className="flex items-center justify-center gap-1.5 text-[14px] sm:text-[15px] font-medium text-theme/90 hover:text-theme transition-colors cursor-default">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{readingTime} min read</span>
            </div>
        </div>
    );

    return (
        <>
            {/* Fixed top progress bar */}
            <div
                className="blog-reading-progress"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
            >
                <div
                    className="blog-reading-progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Estimated reading time pill — Injected into the header row */}
            {wordCount > 0 && targetNode && createPortal(ReadingTimePill, targetNode)}
        </>
    );
}

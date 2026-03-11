"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import ViewCounter from "./ViewCounter";
import LikeCounter from "./LikeCounter";
import { ClockIcon } from "lucide-react";

interface ReadingProgressProps {
    /** Pass raw record map to count words for estimated reading time */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recordMap?: any;
    slug?: string;
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

export function ReadingProgress({ recordMap, slug }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);
    const [targetNode, setTargetNode] = useState<Element | null>(null);
    const raf = useRef<number | null>(null);

    const wordCount = useMemo(() => countWords(recordMap), [recordMap]);
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

        // Efficiently detect when the Notion header row appears in the DOM using MutationObserver
        const observer = new MutationObserver(() => {
            const rowBody = document.querySelector('.notion-collection-row-body')
                || document.querySelector('.notion-collection-row');
            if (rowBody) {
                let statsNode = document.getElementById('custom-blog-stats');
                if (!statsNode) {
                    statsNode = document.createElement('div');
                    statsNode.id = 'custom-blog-stats';
                    statsNode.className = 'w-full flex justify-center pt-4';
                    rowBody.appendChild(statsNode);
                }
                setTargetNode(statsNode);
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Initial check in case it's already there
        const rowBody = document.querySelector('.notion-collection-row-body')
            || document.querySelector('.notion-collection-row');
        if (rowBody) {
            let statsNode = document.getElementById('custom-blog-stats');
            if (!statsNode) {
                statsNode = document.createElement('div');
                statsNode.id = 'custom-blog-stats';
                statsNode.className = 'w-full flex justify-center pt-4';
                rowBody.appendChild(statsNode);
            }
            setTargetNode(statsNode);
            observer.disconnect();
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
            observer.disconnect();
        };
    }, []);

    const ReadingTimePill = (
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm sm:text-[15px] font-medium text-muted-foreground w-full">
            {slug && (
                <>
                    <ViewCounter slug={slug} increment={true} className="hover:text-foreground transition-colors" />
                    <LikeCounter slug={slug} className="hover:text-foreground transition-colors" />
                </>
            )}
            <div className="flex items-center gap-1.5 cursor-default hover:text-foreground transition-colors">
                <ClockIcon className="w-4 h-4" />
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

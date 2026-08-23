"use client";

import { useEffect, useRef, useState } from "react";
import ViewCounter from "./ViewCounter";
import LikeCounter from "./LikeCounter";
import { ClockIcon } from "lucide-react";

interface ReadingProgressProps {
    wordCount?: number;
    slug?: string;
}

export function ReadingProgress({ wordCount = 0, slug }: ReadingProgressProps) {
    const [progress, setProgress] = useState(0);
    const raf = useRef<number | null>(null);

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
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

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

            {/* Views / likes / estimated reading time */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-4 text-sm sm:text-[15px] font-medium text-muted-foreground w-full">
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
        </>
    );
}

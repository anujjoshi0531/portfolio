"use client";

import React, { useEffect, useState, useRef } from "react";
import { List } from "lucide-react";
import type { TocEntry } from "@/lib/markdown";

interface TableOfContentsProps {
  toc: TocEntry[];
  className?: string;
}

export function TableOfContents({ toc, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;

    const headingEls = toc
      .map((entry) => document.getElementById(entry.id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting (visible)
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    headingEls.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [toc]);

  if (toc.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      // Update URL hash without jumping
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 backdrop-blur-md ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 border-b border-neutral-800/80 pb-2.5">
        <List className="w-4 h-4 text-blue-400" />
        <span className="text-xs sm:text-sm font-semibold text-neutral-200 uppercase tracking-wider">
          Table of Contents
        </span>
      </div>

      {/* ToC List */}
      <nav aria-label="Table of Contents">
        <ul className="space-y-0.5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
          {toc.map((entry) => {
            const isActive = activeId === entry.id;
            const indent =
              entry.depth === 1 ? "pl-0" : entry.depth === 2 ? "pl-3" : "pl-6";

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => handleClick(entry.id)}
                  className={`
                    w-full text-left text-[13px] leading-snug py-1.5 px-2 rounded-md
                    transition-all duration-200 ${indent}
                    ${
                      isActive
                        ? "text-blue-400 bg-blue-500/10 font-medium border-l-2 border-blue-500"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 border-l-2 border-transparent"
                    }
                  `}
                  title={entry.text}
                >
                  <span className="line-clamp-2">{entry.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default TableOfContents;

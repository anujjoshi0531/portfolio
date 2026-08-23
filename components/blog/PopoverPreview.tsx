"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Calendar, Tag, FileText } from "lucide-react";

interface PreviewData {
  title: string;
  description: string;
  category?: string;
  tags: string[];
  thumbnail?: string;
  published?: string;
}

export function PopoverPreview() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const cacheRef = useRef<Map<string, PreviewData>>(new Map());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a.internal-link, a[href^='/blog/']");
      if (!target) return;

      const href = target.getAttribute("href");
      const dataSlug = target.getAttribute("data-slug");

      let slug = dataSlug;
      if (!slug && href) {
        const match = href.match(/\/blog\/([a-zA-Z0-9_-]+)/);
        if (match) slug = match[1];
      }

      if (!slug) return;

      const rect = target.getBoundingClientRect();
      const x = Math.min(rect.left + window.scrollX, window.innerWidth - 340);
      const y = rect.bottom + window.scrollY + 8;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        setActiveSlug(slug);
        setCoords({ x, y });

        const cached = cacheRef.current.get(slug);
        if (cached) {
          setData(cached);
          setLoading(false);
        } else {
          setLoading(true);
          try {
            const res = await fetch(`/api/blog-preview?slug=${slug}`);
            if (res.ok) {
              const preview = await res.json();
              cacheRef.current.set(slug, preview);
              setData(preview);
            } else {
              setData(null);
            }
          } catch {
            setData(null);
          } finally {
            setLoading(false);
          }
        }
      }, 150);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a.internal-link, a[href^='/blog/']");
      if (target) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setActiveSlug(null);
          setData(null);
        }, 200);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!activeSlug || !coords) return null;

  return (
    <div
      style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
      className="fixed z-50 w-80 rounded-xl border border-neutral-700/80 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in zoom-in-95 pointer-events-none"
    >
      {loading ? (
        <div className="flex items-center gap-2 text-xs text-neutral-400 py-2">
          <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading note preview...</span>
        </div>
      ) : data ? (
        <div>
          {data.thumbnail && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-2.5 border border-neutral-800">
              <Image src={data.thumbnail} alt={data.title} fill className="object-cover" sizes="320px" />
            </div>
          )}

          <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-semibold text-blue-400">
            <FileText className="w-3 h-3" />
            <span>{data.category || "Blog"}</span>
          </div>

          <h5 className="text-sm font-bold text-neutral-100 mb-1 line-clamp-1">{data.title}</h5>
          <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-3">{data.description}</p>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
            {data.published ? (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-neutral-500" />
                {data.published}
              </span>
            ) : (
              <span />
            )}
            {data.tags && data.tags.length > 0 && (
              <span className="flex items-center gap-1 text-neutral-400">
                <Tag className="w-3 h-3 text-blue-400" />
                {data.tags[0]}
              </span>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-neutral-400">Preview unavailable</p>
      )}
    </div>
  );
}

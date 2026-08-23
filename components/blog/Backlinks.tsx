import React from "react";
import Link from "next/link";
import { Link2, Tag, Calendar } from "lucide-react";
import type { BacklinkItem } from "@/lib/server/local-content";

interface BacklinksProps {
  backlinks: BacklinkItem[];
  className?: string;
}

export function Backlinks({ backlinks, className = "" }: BacklinksProps) {
  if (!backlinks || backlinks.length === 0) {
    return (
      <div className={`rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-2 text-neutral-400">
          <Link2 className="w-4 h-4 text-blue-400" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Backlinks</h4>
        </div>
        <p className="text-xs text-neutral-500 italic">No notes link to this post yet.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-neutral-800/90 bg-neutral-900/50 p-6 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-4.5 h-4.5 text-blue-400" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
            Mentioned In ({backlinks.length})
          </h4>
        </div>
        <span className="text-xs text-neutral-500">Backlinks</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {backlinks.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group relative block rounded-lg border border-neutral-800/70 bg-neutral-950/60 p-4 transition-all duration-200 hover:border-blue-500/40 hover:bg-neutral-800/50 hover:shadow-lg hover:shadow-blue-500/5"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h5 className="text-sm font-semibold text-neutral-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                {item.title}
              </h5>
              {item.category && (
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300">
                  {item.category}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400 line-clamp-2 mb-3 font-normal leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-neutral-800/50">
              {item.published ? (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.published}
                </span>
              ) : (
                <span />
              )}
              {item.tags.length > 0 && (
                <span className="flex items-center gap-1 text-neutral-400">
                  <Tag className="w-3 h-3 text-blue-400" />
                  {item.tags.slice(0, 2).join(", ")}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

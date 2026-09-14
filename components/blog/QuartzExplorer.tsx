import React from "react";
import Link from "next/link";
import { ChevronRight, Folder, Tag, Sparkles } from "lucide-react";

interface BreadcrumbsProps {
  category?: string;
  title: string;
}

export function QuartzBreadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4 overflow-x-auto py-1 scrollbar-none">
      <Link href="/" className="hover:text-theme transition-colors shrink-0">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
      <Link href="/blog" className="hover:text-theme transition-colors shrink-0">
        Blog
      </Link>
      {category && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
          <Link
            href={`/blog?category=${encodeURIComponent(category)}`}
            className="hover:text-theme transition-colors shrink-0 font-medium text-neutral-300"
          >
            {category}
          </Link>
        </>
      )}
      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
      <span className="text-neutral-200 font-medium truncate max-w-[200px] sm:max-w-[300px]">{title}</span>
    </nav>
  );
}

interface ExplorerProps {
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  currentCategory?: string;
  currentTag?: string;
}

export function QuartzExplorer({ categories, tags, currentCategory, currentTag }: ExplorerProps) {
  return (
    <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/50 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800">
        <Sparkles className="w-4 h-4 text-theme" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">Digital Garden Explorer</h4>
      </div>

      {categories.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-2">
            <Folder className="w-3.5 h-3.5 text-theme" />
            <span>Categories</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => {
              const active = currentCategory?.toLowerCase() === c.name.toLowerCase();
              return (
                <Link
                  key={c.name}
                  href={`/blog?category=${encodeURIComponent(c.name)}`}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    active
                      ? "bg-theme/15 text-theme border-theme/40 font-medium shadow-xs"
                      : "bg-neutral-800/60 text-neutral-300 border-neutral-700/60 hover:bg-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  {c.name} <span className="opacity-60 text-[10px]">({c.count})</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium mb-2">
            <Tag className="w-3.5 h-3.5 text-theme" />
            <span>Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => {
              const active = currentTag?.toLowerCase() === t.name.toLowerCase();
              return (
                <Link
                  key={t.name}
                  href={`/blog?tag=${encodeURIComponent(t.name)}`}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                    active
                      ? "bg-theme/15 text-theme border-theme/40 font-medium"
                      : "bg-neutral-950/70 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  #{t.name} <span className="opacity-60 text-[10px]">({t.count})</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

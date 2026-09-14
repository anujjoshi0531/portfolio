import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCatalogEntry, algorithmCatalog } from '@/lib/algorithms/registry'
import { AlgorithmVisualizer } from '@/components/algorithms/AlgorithmVisualizer'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface AlgorithmDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return algorithmCatalog.map((algo) => ({
    slug: algo.id,
  }))
}

export async function generateMetadata({
  params,
}: AlgorithmDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const summary = getCatalogEntry(slug)

  if (!summary) {
    return {
      title: 'Algorithm Not Found',
    }
  }

  return {
    title: `${summary.name} - Interactive Visualizer & Code Walkthrough`,
    description:
      summary.description ||
      `Step-by-step interactive visualization of ${summary.name} with multi-language source code, complexity charts, and execution walkthrough.`,
  }
}

export default async function AlgorithmDetailPage({ params }: AlgorithmDetailPageProps) {
  const { slug } = await params
  const summary = getCatalogEntry(slug)

  if (!summary) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/algorithms" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="size-3.5" />
            <span>Algorithms</span>
          </Link>
          <ChevronRight className="size-3.5 opacity-50" />
          <span className="text-muted-foreground/80">{summary.category}</span>
          <ChevronRight className="size-3.5 opacity-50" />
          <span className="text-foreground font-semibold">{summary.name}</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
              {summary.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold capitalize ${
                summary.difficulty === 'easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : summary.difficulty === 'intermediate'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {summary.difficulty}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {summary.name}
          </h1>
        </div>
      </div>

      {/* Main Full Visualizer Workspace */}
      <AlgorithmVisualizer algorithm={slug} mode="full" autoPlay={false} />
    </div>
  )
}

import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAlgorithmCatalog, getAlgorithmCatalogEntry } from '@/features/algorithms/lib/catalog'
import { AlgorithmVisualizer } from '@/features/algorithms/components/AlgorithmVisualizer'
import { PageTemplate } from '@/components/global/SectionTemplate'

interface AlgorithmDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAlgorithmCatalog().map((algo) => ({
    slug: algo.id,
  }))
}

export async function generateMetadata({
  params,
}: AlgorithmDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const summary = getAlgorithmCatalogEntry(slug)

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
  const summary = getAlgorithmCatalogEntry(slug)

  if (!summary) {
    notFound()
  }

  return (
    <>
      <PageTemplate
        title={summary.name}
        subtitle={summary.description || `${summary.category} visualizer`}
      />

      <main className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
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

        <AlgorithmVisualizer algorithm={slug} mode="full" autoPlay={false} />
      </main>
    </>
  )
}

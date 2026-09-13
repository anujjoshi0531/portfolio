import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { algorithmCatalog, getCatalogEntry } from '@/lib/algorithms/algorithms/catalog'
import { loadAlgorithm } from '@/lib/algorithms/algorithms/loaders'
import { loadAlgorithmDescription } from '@/lib/algorithms/descriptions'
import { AlgorithmVisualizer } from '@/components/algorithms/AlgorithmVisualizer'
import { ChevronLeft, ArrowLeft } from 'lucide-react'

interface AlgorithmDetailPageProps {
  params: Promise<{
    slug: string
  }>
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
  const entry = getCatalogEntry(slug)
  if (!entry) {
    return {
      title: 'Algorithm Not Found',
    }
  }

  return {
    title: `${entry.name} - Interactive Algorithm Visualizer & Code`,
    description: `Step-by-step interactive visualization and code implementation of ${entry.name} (${entry.category}). Explore time/space complexity and algorithms in Python, C++, Java, and JavaScript.`,
  }
}

export default async function AlgorithmDetailPage({
  params,
}: AlgorithmDetailPageProps) {
  const { slug } = await params
  const catalogEntry = getCatalogEntry(slug)

  if (!catalogEntry) {
    notFound()
  }

  let algorithm
  let description = ''
  let initialSteps: any[] = []
  try {
    algorithm = await loadAlgorithm(slug)
    description = await loadAlgorithmDescription(slug, 'en')
    initialSteps = algorithm.generateSteps('en')
  } catch (err) {
    console.error(`Failed to load algorithm: ${slug}`, err)
    notFound()
  }

  const serializableAlgorithm = {
    id: algorithm.id,
    name: algorithm.name,
    category: algorithm.category,
    difficulty: algorithm.difficulty,
    visualization: algorithm.visualization,
    code: algorithm.code,
  }

  // Related algorithms from the same category
  const relatedAlgorithms = algorithmCatalog
    .filter((a) => a.category === catalogEntry.category && a.id !== slug)
    .slice(0, 3)

  return (
    <main className="container max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/algorithms"
          className="flex items-center gap-1 hover:text-foreground transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Algorithms</span>
        </Link>
        <span>/</span>
        <span className="text-muted-foreground">{catalogEntry.category}</span>
        <span>/</span>
        <span className="text-foreground font-semibold">{catalogEntry.name}</span>
      </div>

      {/* Interactive Visualizer Canvas & Code */}
      <AlgorithmVisualizer
        algorithm={serializableAlgorithm}
        initialSteps={initialSteps}
        descriptionMarkdown={description}
      />

      {/* Related Algorithms Footer */}
      {relatedAlgorithms.length > 0 && (
        <section className="pt-8 border-t border-border/70 space-y-4">
          <h3 className="text-lg font-bold font-heading text-foreground">
            More {catalogEntry.category} Algorithms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedAlgorithms.map((rel) => (
              <Link
                key={rel.id}
                href={`/algorithms/${rel.id}`}
                className="p-4 rounded-xl bg-card border border-border/70 hover:border-primary/50 hover:bg-secondary/40 transition shadow-2xs group"
              >
                <div className="text-xs font-mono text-muted-foreground mb-1">
                  {rel.category}
                </div>
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {rel.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

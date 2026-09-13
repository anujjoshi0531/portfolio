import type { Metadata } from 'next'
import { algorithmCatalog } from '@/lib/algorithms/algorithms/catalog'
import { AlgorithmCatalog } from '@/components/algorithms/AlgorithmCatalog'

export const metadata: Metadata = {
  title: 'Algorithms & Coding Tutorials | Interactive Visualizer',
  description:
    'Interactive step-by-step visualizations for 40+ algorithms and data structures. Real-time code execution, variable tracking, and multi-language implementations.',
}

export default function AlgorithmsPage() {
  return (
    <main className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <AlgorithmCatalog algorithms={algorithmCatalog} />
    </main>
  )
}

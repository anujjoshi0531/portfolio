import React from 'react'
import type { Metadata } from 'next'
import { getAlgorithmCatalog, getAlgorithmCatalogCategories } from '@/lib/server/local-content'
import { AlgorithmCatalogClient } from './AlgorithmCatalogClient'

export const metadata: Metadata = {
  title: 'Algorithm & Data Structure Visualizers | Portfolio',
  description:
    'Explore, visualize, and step through interactive algorithms and data structures across Sorting, Searching, Graphs, Trees, DP, and more.',
}

export default function AlgorithmsPage() {
  const algorithmCatalog = getAlgorithmCatalog()
  const catalogCategories = getAlgorithmCatalogCategories()

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Interactive Learning Lab
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Algorithms & Data Structures
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Interactive step-by-step visualizers for fundamental algorithms, data structures, and computer science concepts. Step through execution in multiple programming languages.
        </p>
      </div>

      {/* Interactive Client Catalog with Search & Category Filters */}
      <AlgorithmCatalogClient
        categories={catalogCategories}
        allAlgorithms={algorithmCatalog}
      />
    </div>
  )
}

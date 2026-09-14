'use client'

import React, { useState, useMemo } from 'react'
import type { AlgorithmSummary, CategorySummary } from '@/lib/algorithms/types'
import Link from 'next/link'
import { Search, ArrowRight, BarChart2, GitFork, Grid, Box } from 'lucide-react'

interface AlgorithmCatalogClientProps {
  categories: CategorySummary[]
  allAlgorithms: AlgorithmSummary[]
}

export function AlgorithmCatalogClient({
  categories,
  allAlgorithms,
}: AlgorithmCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')

  const filteredAlgorithms = useMemo(() => {
    return allAlgorithms.filter((algo) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (algo.description && algo.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === 'All' || algo.category === selectedCategory

      const matchesDifficulty =
        selectedDifficulty === 'All' || algo.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [allAlgorithms, searchQuery, selectedCategory, selectedDifficulty])

  const categoryList = ['All', ...categories.map((c) => c.name)]
  const difficulties = ['All', 'easy', 'intermediate', 'advanced']

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case 'array':
        return <BarChart2 className="size-4 text-sky-400" />
      case 'graph':
        return <GitFork className="size-4 text-purple-400" />
      case 'matrix':
        return <Grid className="size-4 text-amber-400" />
      default:
        return <Box className="size-4 text-emerald-400" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search algorithms, categories, concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/60 border border-border/70 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-mono text-muted-foreground px-1 hidden sm:inline">
            Difficulty:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 text-xs font-mono rounded-lg capitalize transition-all ${
                selectedDifficulty === diff
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-foreground text-background font-bold shadow-sm'
                : 'bg-muted/50 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground">{filteredAlgorithms.length}</strong> algorithms
        </span>
      </div>

      {/* Algorithms Grid */}
      {filteredAlgorithms.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center bg-card/30 rounded-2xl border border-border/60 gap-2">
          <p className="font-semibold text-base">No algorithms match your filter</p>
          <p className="text-xs text-muted-foreground">Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAlgorithms.map((algo) => (
            <Link
              key={algo.id}
              href={`/algorithms/${algo.id}`}
              className="group flex flex-col justify-between p-5 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 hover:border-primary/60 hover:shadow-lg transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/60 text-[11px] font-mono text-muted-foreground">
                    {getVisualizationIcon(algo.visualization)}
                    <span>{algo.category}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      algo.difficulty === 'easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : algo.difficulty === 'intermediate'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {algo.difficulty}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {algo.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {algo.description || 'Interactive visualization and multi-language execution walkthrough.'}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs font-mono text-primary font-semibold">
                <span>Explore Visualizer</span>
                <ArrowRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

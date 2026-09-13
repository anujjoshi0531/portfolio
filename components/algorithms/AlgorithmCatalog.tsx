'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import type { AlgorithmSummary } from '@/lib/algorithms/types'
import { DifficultyBadge } from './DifficultyBadge'
import { Search, Sparkles, Filter, ArrowRight } from 'lucide-react'

interface AlgorithmCatalogProps {
  algorithms: AlgorithmSummary[]
  className?: string
}

export function AlgorithmCatalog({ algorithms, className = '' }: AlgorithmCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    algorithms.forEach((a) => set.add(a.category))
    return ['All', ...Array.from(set)]
  }, [algorithms])

  // Filtered algorithms
  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter((algo) => {
      const matchesSearch =
        searchQuery === '' ||
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || algo.category === selectedCategory

      const matchesDifficulty =
        selectedDifficulty === 'All' || algo.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [algorithms, searchQuery, selectedCategory, selectedDifficulty])

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Header & Search Banner */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-foreground flex items-center gap-3">
              Algorithms & Coding Hub
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {algorithms.length} Algorithms
              </span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              Interactive, step-by-step algorithm visualizers, time/space complexity analysis, and multi-language code solutions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span>Difficulty:</span>
          {['All', 'easy', 'intermediate', 'advanced'].map((diff) => {
            const isSelected = selectedDifficulty === diff
            return (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`capitalize px-2.5 py-1 rounded-lg border transition ${
                  isSelected
                    ? 'bg-secondary text-foreground border-primary/40 font-semibold'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {diff === 'intermediate' ? 'Medium' : diff === 'advanced' ? 'Hard' : diff}
              </button>
            )
          })}
        </div>
      </div>

      {/* Algorithm Grid */}
      {filteredAlgorithms.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-card border border-border/70">
          <Sparkles className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-bold text-foreground">No algorithms found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search query or category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlgorithms.map((algo) => (
            <Link
              key={algo.id}
              href={`/algorithms/${algo.id}`}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-card hover:bg-secondary/40 border border-border/70 hover:border-primary/50 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">
                    {algo.category}
                  </span>
                  <DifficultyBadge difficulty={algo.difficulty} />
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {algo.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs text-muted-foreground">
                <span className="capitalize font-mono text-[11px]">
                  {algo.visualization} model
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  Visualize <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

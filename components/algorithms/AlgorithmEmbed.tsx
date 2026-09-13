'use client'

import React, { useState, useEffect } from 'react'
import type { Algorithm } from '@/lib/algorithms/types'
import { loadAlgorithm } from '@/lib/algorithms/algorithms/loaders'
import { loadAlgorithmDescription } from '@/lib/algorithms/descriptions'
import { AlgorithmVisualizer } from './AlgorithmVisualizer'
import { Loader2 } from 'lucide-react'

interface AlgorithmEmbedProps {
  id: string
  className?: string
}

export function AlgorithmEmbed({ id, className = '' }: AlgorithmEmbedProps) {
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null)
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    setError(null)

    Promise.all([
      loadAlgorithm(id),
      loadAlgorithmDescription(id, 'en'),
    ])
      .then(([algo, desc]) => {
        if (isCancelled) return
        setAlgorithm(algo)
        setDescription(desc)
        setLoading(false)
      })
      .catch((err) => {
        if (isCancelled) return
        console.error(`Failed to load embedded algorithm ${id}:`, err)
        setError(`Failed to load algorithm: ${id}`)
        setLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center gap-3 rounded-2xl bg-card border border-border/60">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="text-xs font-mono text-muted-foreground">
          Loading algorithm visualizer...
        </span>
      </div>
    )
  }

  if (error || !algorithm) {
    return (
      <div className="w-full p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
        {error || 'Algorithm not found'}
      </div>
    )
  }

  return (
    <div className={`w-full my-6 not-prose ${className}`}>
      <AlgorithmVisualizer
        algorithm={algorithm}
        descriptionMarkdown={description}
      />
    </div>
  )
}

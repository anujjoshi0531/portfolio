'use client'

import React from 'react'
import type { Algorithm, Step } from '@/lib/algorithms/types'
import { ArrayVisualizer } from './visualizers/ArrayVisualizer'
import { GraphVisualizer } from './visualizers/GraphVisualizer'
import { MatrixVisualizer } from './visualizers/MatrixVisualizer'
import { ConceptVisualizer } from './visualizers/ConceptVisualizer'

interface AlgorithmCanvasProps {
  algorithm: Algorithm
  step: Step | null
  className?: string
}

export function AlgorithmCanvas({ algorithm, step, className = '' }: AlgorithmCanvasProps) {
  // Infer visualizer from algorithm metadata or step content
  const visualizationType = algorithm.visualization

  const renderContent = () => {
    if (step?.concept) {
      return <ConceptVisualizer concept={step.concept} />
    }
    if (step?.matrix || visualizationType === 'matrix') {
      return <MatrixVisualizer step={step} />
    }
    if (step?.graph || visualizationType === 'graph') {
      return <GraphVisualizer step={step} />
    }
    if (step?.array || visualizationType === 'array') {
      return <ArrayVisualizer step={step} />
    }
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm font-mono">
        Visualizer loading...
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-full min-h-[300px] flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-2xl border border-border/80 p-4 transition-all shadow-md overflow-hidden ${className}`}
    >
      {renderContent()}
    </div>
  )
}

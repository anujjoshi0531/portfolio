'use client'

import React, { useState, useEffect } from 'react'
import type { Algorithm } from '@/lib/algorithms/types'
import { loadAlgorithm } from '@/lib/algorithms/registry'
import { useAlgorithmPlayback } from '@/lib/algorithms/hooks/useAlgorithmPlayback'
import { AlgorithmCanvas } from './AlgorithmCanvas'
import { CodeViewer } from './CodeViewer'
import { StepController } from './StepController'
import { VariableInspector } from './VariableInspector'
import { ComplexityCard } from './ComplexityCard'
import { AlgorithmExplanation } from './AlgorithmExplanation'
import { Loader2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export interface AlgorithmVisualizerProps {
  /** Algorithm ID string (e.g. 'binary-search') or direct Algorithm object */
  algorithm: string | Algorithm
  /** 'full' for standalone page workspace, 'embedded' for markdown blogs */
  mode?: 'full' | 'embedded'
  autoPlay?: boolean
  initialSpeed?: number
  className?: string
}

export function AlgorithmVisualizer({
  algorithm: algorithmProp,
  mode = 'full',
  autoPlay = false,
  initialSpeed = 1,
  className = '',
}: AlgorithmVisualizerProps) {
  const [algo, setAlgo] = useState<Algorithm | null>(
    typeof algorithmProp === 'object' ? algorithmProp : null,
  )
  const [loading, setLoading] = useState<boolean>(typeof algorithmProp === 'string')
  const [error, setError] = useState<string | null>(null)

  const isEmbedded = mode === 'embedded'

  // Load algorithm dynamically if string ID was passed
  useEffect(() => {
    if (typeof algorithmProp === 'string') {
      setLoading(true)
      setError(null)
      loadAlgorithm(algorithmProp)
        .then((loaded) => {
          setAlgo(loaded)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setError(`Failed to load algorithm: ${algorithmProp}`)
          setLoading(false)
        })
    } else {
      setAlgo(algorithmProp)
      setLoading(false)
    }
  }, [algorithmProp])

  const {
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    currentStepData,
    stepForward,
    stepBackward,
    setStep,
    setSpeed,
    togglePlay,
    reset,
    regenerate,
  } = useAlgorithmPlayback({
    algorithm: algo,
    autoPlay,
    initialSpeed,
    enableKeyboard: !isEmbedded,
  })

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-12 bg-card/40 rounded-2xl border border-border/80 min-h-[300px] gap-3 text-muted-foreground ${className}`}
      >
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-xs font-mono">Loading algorithm visualizer...</span>
      </div>
    )
  }

  if (error || !algo) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 bg-destructive/10 rounded-2xl border border-destructive/30 text-destructive min-h-[200px] text-center gap-2 ${className}`}
      >
        <span className="font-semibold text-sm">{error || 'Algorithm not found'}</span>
        <span className="text-xs opacity-80">
          Make sure algorithm ID is valid in catalog.
        </span>
      </div>
    )
  }

  // ── EMBEDDED MODE (For Blogs & Markdown) ──
  if (isEmbedded) {
    return (
      <div
        className={`my-8 flex flex-col gap-3 p-4 bg-muted/20 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between pb-2 border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-bold text-sm tracking-tight">{algo.name}</span>
            <span className="text-[11px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted/60">
              {algo.category}
            </span>
          </div>

          <Link
            href={`/algorithms/${algo.id}`}
            className="flex items-center gap-1 text-xs font-mono text-primary hover:underline"
            target="_blank"
          >
            <span>Open Standalone</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        {/* Interactive Visualization Canvas */}
        <div className="h-[280px] sm:h-[320px]">
          <AlgorithmCanvas algorithm={algo} step={currentStepData} />
        </div>

        {/* Live Variable Inspector & Step Description */}
        <VariableInspector step={currentStepData} />

        {/* Playback Controls */}
        <StepController
          currentStep={currentStep}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          speed={speed}
          onTogglePlay={togglePlay}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onStepChange={setStep}
          onSetSpeed={setSpeed}
          onReset={reset}
          onRegenerate={regenerate}
        />
      </div>
    )
  }

  // ── FULL MODE (For /algorithms/[slug]) ──
  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Top Main Workspace: 2-Column Split (Canvas + Code Viewer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Top Column: Visualizer Canvas + Controls */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="h-[360px] sm:h-[420px] lg:h-[460px]">
            <AlgorithmCanvas algorithm={algo} step={currentStepData} />
          </div>

          <VariableInspector step={currentStepData} />

          <StepController
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            speed={speed}
            onTogglePlay={togglePlay}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
            onStepChange={setStep}
            onSetSpeed={setSpeed}
            onReset={reset}
            onRegenerate={regenerate}
          />
        </div>

        {/* Right Column: Synchronized Code Viewer */}
        <div className="lg:col-span-5 h-[480px] sm:h-[540px] lg:h-[620px]">
          <CodeViewer algorithm={algo} step={currentStepData} />
        </div>
      </div>

      {/* Bottom Section: Complexity Breakdown & In-Depth Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <ComplexityCard algorithm={algo} />
        </div>
        <div className="lg:col-span-7">
          <AlgorithmExplanation algorithm={algo} />
        </div>
      </div>
    </div>
  )
}

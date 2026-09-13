'use client'

import React, { useEffect, useRef } from 'react'
import type { Step, VisualizationType } from '@/lib/algorithms/types'
import type { Locale } from '@/lib/algorithms/i18n/translations'
import { renderStepVisualizer } from '@/lib/algorithms/visualizers/render-step'

interface AlgorithmStageProps {
  step: Step | null
  visualizationType: VisualizationType
  locale?: Locale
  className?: string
}

export function AlgorithmStage({
  step,
  visualizationType,
  locale = 'en',
  className = '',
}: AlgorithmStageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (!step) {
      containerRef.current.replaceChildren()
      return
    }

    let isMounted = true
    renderStepVisualizer(containerRef.current, step, visualizationType, locale).catch(
      (err) => {
        if (isMounted) console.error('Error rendering step visualizer:', err)
      }
    )

    return () => {
      isMounted = false
    }
  }, [step, visualizationType, locale])

  return (
    <div
      className={`relative w-full flex-1 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden rounded-2xl bg-card/60 backdrop-blur-sm border border-border/60 shadow-inner min-h-[320px] md:min-h-[420px] ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex-1 flex flex-col items-center justify-center min-h-0"
      />
    </div>
  )
}

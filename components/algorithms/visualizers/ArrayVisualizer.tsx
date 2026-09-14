'use client'

import React from 'react'
import type { Step } from '@/lib/algorithms/types'
import { highlightColors, DEFAULT_BAR_COLOR } from '@/lib/algorithms/highlight-colors'

interface ArrayVisualizerProps {
  step: Step | null
  className?: string
}

export function ArrayVisualizer({ step, className = '' }: ArrayVisualizerProps) {
  const array = step?.array || []
  const highlights = step?.highlights || {}
  const sorted = step?.sorted || []

  if (array.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No array data for this step
      </div>
    )
  }

  const maxValue = Math.max(...array, 1)
  const barGap = array.length > 15 ? 2 : array.length > 8 ? 4 : 6

  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-full h-full p-4 select-none ${className}`}>
      {/* Bars container */}
      <div
        className="flex items-end justify-center w-full max-w-4xl h-56 sm:h-72 px-2"
        style={{ gap: `${barGap}px` }}
      >
        {array.map((value, index) => {
          const highlight = highlights[index]
          const isSorted = sorted.includes(index)
          const color = highlight
            ? highlightColors[highlight]
            : isSorted
            ? highlightColors.sorted
            : DEFAULT_BAR_COLOR
          const heightPercent = Math.max((value / maxValue) * 100, 4)

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end h-full relative transition-all duration-200"
            >
              {/* Value Label */}
              <span
                className="text-xs font-mono font-bold mb-1.5 transition-colors duration-200"
                style={{ color }}
              >
                {value}
              </span>

              {/* Bar */}
              <div
                className="w-full rounded-t-md transition-all duration-300 ease-out shadow-sm"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: color,
                  opacity: !highlight && !isSorted ? 0.7 : 1,
                  boxShadow: highlight ? `0 0 12px ${color}80` : 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Indices row */}
      <div className="flex w-full max-w-4xl px-2" style={{ gap: `${barGap}px` }}>
        {array.map((_, index) => {
          const highlight = highlights[index]
          const isSorted = sorted.includes(index)
          const color = highlight
            ? highlightColors[highlight]
            : isSorted
            ? highlightColors.sorted
            : 'currentColor'

          return (
            <div
              key={index}
              className="flex-1 text-center text-[10px] sm:text-xs font-mono py-1 rounded transition-all duration-200"
              style={{
                backgroundColor: highlight ? `${color}20` : 'transparent',
                color: highlight || isSorted ? color : undefined,
                borderBottom: highlight ? `2px solid ${color}` : '2px solid transparent',
              }}
            >
              {index}
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import type { Step } from '@/lib/algorithms/types'
import { highlightStyles } from '@/lib/algorithms/highlight-colors'

interface MatrixVisualizerProps {
  step: Step | null
  className?: string
}

export function MatrixVisualizer({ step, className = '' }: MatrixVisualizerProps) {
  const matrix = step?.matrix

  if (!matrix || !matrix.values || matrix.values.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No matrix data for this step
      </div>
    )
  }

  const { rows, cols, values, highlights = {} } = matrix

  // Check if square grid (like N-Queens, Sudoku, Maze)
  const isChessboard = rows === cols && rows >= 4 && rows <= 8

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 overflow-auto ${className}`}>
      <div
        className="grid gap-1.5 p-3 bg-card/60 rounded-xl border border-border/80 shadow-md max-w-full overflow-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(32px, 48px))`,
          gridTemplateRows: `repeat(${rows}, minmax(32px, 48px))`,
        }}
      >
        {values.map((row, r) =>
          row.map((val, c) => {
            const key = `${r},${c}`
            const highlight = highlights[key]
            const isEvenCell = (r + c) % 2 === 0
            const style = highlight ? highlightStyles[highlight] : undefined

            const defaultBg = isChessboard
              ? isEvenCell
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.2)'
              : 'rgba(255,255,255,0.03)'

            const defaultBorder = 'rgba(255,255,255,0.08)'

            return (
              <div
                key={key}
                className="flex items-center justify-center font-mono font-bold text-xs sm:text-sm rounded-md transition-all duration-200 aspect-square select-none relative"
                style={{
                  backgroundColor: style ? style.bg : defaultBg,
                  color: style ? style.text : 'inherit',
                  border: style ? `1.5px solid ${style.border}` : `1px solid ${defaultBorder}`,
                  boxShadow: style ? `0 0 8px ${style.border}` : 'none',
                }}
              >
                {val !== undefined && val !== '' ? (
                  <span>{val}</span>
                ) : (
                  <span className="opacity-0">.</span>
                )}
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}

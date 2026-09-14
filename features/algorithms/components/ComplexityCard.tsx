'use client'

import React from 'react'
import type { Algorithm } from '@/features/algorithms/lib/types'
import { COMPLEXITY_COLORS, normalizeToKey } from '@/features/algorithms/lib/complexity'
import { Zap, HardDrive } from 'lucide-react'

interface ComplexityCardProps {
  algorithm: Algorithm
  className?: string
}

export function ComplexityCard({ algorithm, className = '' }: ComplexityCardProps) {
  const time = algorithm.timeComplexity || {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)',
  }
  const space = algorithm.spaceComplexity || 'O(1)'

  const getColorFor = (rawComplexity?: string) => {
    if (!rawComplexity) return '#60a5fa'
    const key = normalizeToKey(rawComplexity)
    return key ? COMPLEXITY_COLORS[key] : '#60a5fa'
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
    >
      {/* Time Complexity */}
      <div className="flex flex-col gap-2 p-3 bg-muted/30 rounded-xl border border-border/50">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Zap className="size-3.5 text-amber-400" />
          <span>Time Complexity</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-center font-mono text-xs">
          <div className="flex flex-col p-1.5 bg-card/60 rounded border border-border/50">
            <span className="text-[10px] text-muted-foreground mb-0.5">Best</span>
            <span className="font-bold" style={{ color: getColorFor(time.best) }}>
              {time.best || 'O(1)'}
            </span>
          </div>
          <div className="flex flex-col p-1.5 bg-card/60 rounded border border-border/50">
            <span className="text-[10px] text-muted-foreground mb-0.5">Average</span>
            <span className="font-bold" style={{ color: getColorFor(time.average) }}>
              {time.average || 'O(n)'}
            </span>
          </div>
          <div className="flex flex-col p-1.5 bg-card/60 rounded border border-border/50">
            <span className="text-[10px] text-muted-foreground mb-0.5">Worst</span>
            <span className="font-bold" style={{ color: getColorFor(time.worst) }}>
              {time.worst || 'O(n²)'}
            </span>
          </div>
        </div>
      </div>

      {/* Space Complexity & Difficulty */}
      <div className="flex flex-col justify-between p-3 bg-muted/30 rounded-xl border border-border/50 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <HardDrive className="size-3.5 text-sky-400" />
            <span>Space Complexity</span>
          </div>
          <span
            className="font-mono font-bold text-xs"
            style={{ color: getColorFor(space) }}
          >
            {space}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
          <span className="text-muted-foreground">Difficulty:</span>
          <span
            className={`font-mono font-bold capitalize px-2 py-0.5 rounded text-[11px] ${
              algorithm.difficulty === 'easy'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : algorithm.difficulty === 'intermediate'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}
          >
            {algorithm.difficulty}
          </span>
        </div>
      </div>
    </div>
  )
}

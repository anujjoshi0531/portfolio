'use client'

import React from 'react'
import type { Difficulty } from '@/lib/algorithms/types'

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bg: string; dot: string }
> = {
  easy: {
    label: 'Easy',
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  intermediate: {
    label: 'Medium',
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    dot: 'bg-amber-500',
  },
  advanced: {
    label: 'Hard',
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    dot: 'bg-red-500',
  },
}

export function DifficultyBadge({
  difficulty,
  className = '',
}: {
  difficulty: Difficulty
  className?: string
}) {
  const config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

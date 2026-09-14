'use client'

import React from 'react'

interface ExecutionTimelineProps {
  currentStep: number
  totalSteps: number
  onStepChange: (step: number) => void
  className?: string
}

export function ExecutionTimeline({
  currentStep,
  totalSteps,
  onStepChange,
  className = '',
}: ExecutionTimelineProps) {
  if (totalSteps <= 1) return null

  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>

      <div className="relative flex items-center w-full group py-1">
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
      </div>
    </div>
  )
}

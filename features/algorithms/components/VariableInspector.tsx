'use client'

import React from 'react'
import type { Step } from '@/features/algorithms/lib/types'
import { Info, Terminal } from 'lucide-react'

interface VariableInspectorProps {
  step: Step | null
  className?: string
}

export function VariableInspector({ step, className = '' }: VariableInspectorProps) {
  const variables = step?.variables || {}
  const description = step?.description || 'Inspect current algorithm step execution state.'
  const consoleOutput = step?.consoleOutput || []
  const hasVariables = Object.keys(variables).length > 0

  return (
    <div
      className={`flex flex-col gap-3 p-4 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
    >
      {/* Step Description */}
      <div className="flex items-start gap-2.5">
        <Info className="size-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {/* Live Variable Badges */}
      {hasVariables && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
          <span className="text-[11px] font-mono text-muted-foreground font-semibold">
            Variables:
          </span>
          {Object.entries(variables).map(([name, value]) => (
            <div
              key={name}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/60 border border-border/70 rounded-md font-mono text-xs shadow-xs"
            >
              <span className="text-amber-400/90 font-medium">{name}:</span>
              <span className="text-primary font-bold">
                {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Console Output if any */}
      {consoleOutput.length > 0 && (
        <div className="flex flex-col gap-1 p-2.5 bg-neutral-950/80 rounded-lg border border-border/60 font-mono text-[11px] text-neutral-300">
          <div className="flex items-center gap-1 text-muted-foreground mb-1">
            <Terminal className="size-3" />
            <span>Console</span>
          </div>
          {consoleOutput.map((line, idx) => (
            <div key={idx} className="leading-snug">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import React from 'react'

interface VariableInspectorProps {
  variables?: Record<string, unknown>
  className?: string
}

export function VariableInspector({ variables, className = '' }: VariableInspectorProps) {
  if (!variables || Object.keys(variables).length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
        Variables:
      </span>
      {Object.entries(variables).map(([key, val]) => {
        let displayVal = ''
        if (typeof val === 'object' && val !== null) {
          displayVal = JSON.stringify(val)
        } else {
          displayVal = String(val)
        }

        return (
          <div
            key={key}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/80 border border-border/70 font-mono text-xs shadow-2xs"
          >
            <span className="text-primary font-medium">{key}</span>
            <span className="text-muted-foreground">=</span>
            <span className="font-semibold text-foreground">{displayVal}</span>
          </div>
        )
      })}
    </div>
  )
}

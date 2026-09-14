'use client'

import '@/styles/markdown.css'
import 'highlight.js/styles/github-dark.min.css'
import 'katex/dist/katex.min.css'

import React, { useEffect, useState } from 'react'
import type { Algorithm } from '@/lib/algorithms/types'
import { renderMarkdown } from '@/lib/markdown'
import { BookOpen, CheckCircle2, Layers } from 'lucide-react'

interface AlgorithmExplanationProps {
  algorithm: Algorithm
  className?: string
}

export function AlgorithmExplanation({ algorithm, className = '' }: AlgorithmExplanationProps) {
  const { description, prerequisites, howItWorks = [] } = algorithm
  const [renderedDescription, setRenderedDescription] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!description || algorithm.descriptionFormat !== 'markdown') {
      setRenderedDescription(null)
      return
    }

    renderMarkdown(description)
      .then(({ html }) => {
        if (!cancelled) setRenderedDescription(html)
      })
      .catch(() => {
        if (!cancelled) setRenderedDescription(null)
      })

    return () => {
      cancelled = true
    }
  }, [description, algorithm.descriptionFormat])

  return (
    <div
      className={`flex flex-col gap-5 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
    >
      <div className="flex items-center gap-2 text-lg font-bold">
        <BookOpen className="size-5 text-primary" />
        <h2>About {algorithm.name}</h2>
      </div>

      {/* Description text */}
      {description && renderedDescription ? (
        <div
          className="markdown-body algorithm-description"
          dangerouslySetInnerHTML={{ __html: renderedDescription }}
        />
      ) : description ? (
        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {description}
        </div>
      ) : null}

      {/* Prerequisites */}
      {prerequisites && (
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-xs sm:text-sm">
          <span className="font-semibold text-foreground">Prerequisite: </span>
          <span className="text-muted-foreground">{prerequisites}</span>
        </div>
      )}

      {/* How it works steps */}
      {howItWorks.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-2 border-t border-border/50">
          <h3 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
            <Layers className="size-4 text-primary" />
            How It Works
          </h3>
          <ol className="flex flex-col gap-2 pl-1">
            {howItWorks.map((stepText, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary/80 shrink-0 mt-0.5" />
                <span>{stepText}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

'use client'

import '@/styles/markdown.css'
import 'highlight.js/styles/github-dark.min.css'
import 'katex/dist/katex.min.css'

import React, { useEffect, useState } from 'react'
import type { Algorithm } from '@/lib/algorithms/types'
import { renderMarkdown } from '@/lib/markdown'
import { BookOpen } from 'lucide-react'

interface AlgorithmExplanationProps {
  algorithm: Algorithm
  className?: string
}

export function AlgorithmExplanation({ algorithm, className = '' }: AlgorithmExplanationProps) {
  const { description } = algorithm
  const [renderedDescription, setRenderedDescription] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/algorithms/${algorithm.id}/content`)
      .then((response) => {
        if (!response.ok) throw new Error('Algorithm markdown not found')
        return response.json() as Promise<{ content?: string }>
      })
      .then(({ content }) => {
        if (!content) throw new Error('Algorithm markdown is empty')
        return renderMarkdown(content)
      })
      .then(({ html }) => {
        if (!cancelled) setRenderedDescription(html)
      })
      .catch(() => {
        if (cancelled) return

        if (description) {
          renderMarkdown(description)
            .then(({ html }) => {
              if (!cancelled) setRenderedDescription(html)
            })
            .catch(() => {
              if (!cancelled) setRenderedDescription(null)
            })
        } else {
          setRenderedDescription(null)
        }
      })

    return () => {
      cancelled = true
    }
  }, [algorithm.id, description])

  return (
    <div
      className={`flex flex-col gap-5 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
    >
      <div className="flex items-center gap-2 text-lg font-bold">
        <BookOpen className="size-5 text-primary" />
        <h2>About {algorithm.name}</h2>
      </div>

      {renderedDescription ? (
        <div
          className="markdown-body algorithm-description"
          dangerouslySetInnerHTML={{ __html: renderedDescription }}
        />
      ) : description ? (
        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {description}
        </div>
      ) : null}
    </div>
  )
}

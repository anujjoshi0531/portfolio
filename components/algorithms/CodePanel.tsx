'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Algorithm, SerializableAlgorithm, CodeLanguage, CodeImplementation } from '@/lib/algorithms/types'
import { codeLanguages, defaultCodeLanguage } from '@/lib/algorithms/code-languages'
import { loadLanguageImplementation } from '@/lib/algorithms/algorithms/loaders'
import { VariableInspector } from './VariableInspector'
import { Copy, Check, Code2 } from 'lucide-react'

interface CodePanelProps {
  algorithm: SerializableAlgorithm | Algorithm
  currentCodeLine?: number | null
  variables?: Record<string, unknown>
  className?: string
}

export function CodePanel({
  algorithm,
  currentCodeLine,
  variables,
  className = '',
}: CodePanelProps) {
  const [language, setLanguage] = useState<CodeLanguage>(defaultCodeLanguage)
  const [codeString, setCodeString] = useState<string>(algorithm.code)
  const [lineMap, setLineMap] = useState<Record<number, number> | null>(null)
  const [copied, setCopied] = useState(false)
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const activeLineRef = useRef<HTMLDivElement>(null)

  // Load language implementation when language tab changes
  useEffect(() => {
    let isCancelled = false

    if (language === 'javascript') {
      setCodeString(algorithm.code)
      setLineMap(null)
      return
    }

    loadLanguageImplementation(algorithm.id, language as Exclude<CodeLanguage, 'javascript'>).then(
      (impl: CodeImplementation | undefined) => {
        if (isCancelled) return
        if (impl) {
          setCodeString(impl.code)
          setLineMap(impl.lineMap)
        } else {
          // Fallback to JavaScript if no specific translation exists yet
          setCodeString(algorithm.code)
          setLineMap(null)
        }
      }
    )

    return () => {
      isCancelled = true
    }
  }, [algorithm, language])

  // Determine which line to highlight in the current active language
  let activeLine: number | null = null
  if (typeof currentCodeLine === 'number' && currentCodeLine > 0) {
    if (language === 'javascript' || !lineMap) {
      activeLine = currentCodeLine
    } else {
      activeLine = lineMap[currentCodeLine] ?? null
    }
  }

  // Scroll active line into view smoothly
  useEffect(() => {
    if (activeLineRef.current && codeContainerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeLine])

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = codeString.split('\n')

  return (
    <div
      className={`flex flex-col rounded-2xl bg-card border border-border/80 shadow-md overflow-hidden ${className}`}
    >
      {/* Header bar: Language tabs + Copy button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/70 bg-secondary/40">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {codeLanguages.map((lang) => {
            const isActive = language === lang.id
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox={lang.iconViewBox || '0 0 24 24'}
                >
                  <path d={lang.iconPath} />
                </svg>
                {lang.label}
              </button>
            )
          })}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          title="Copy code"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Viewer with active line highlight */}
      <div
        ref={codeContainerRef}
        className="flex-1 overflow-auto p-3 font-mono text-xs md:text-sm leading-relaxed max-h-[480px] bg-card/90 select-text"
      >
        <div className="w-full min-w-max">
          {lines.map((lineContent, idx) => {
            const lineNumber = idx + 1
            const isHighlighted = activeLine === lineNumber

            return (
              <div
                key={lineNumber}
                ref={isHighlighted ? activeLineRef : null}
                className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors duration-150 ${
                  isHighlighted
                    ? 'bg-primary/15 text-foreground font-semibold border-l-2 border-primary'
                    : 'text-foreground/80 hover:bg-secondary/40'
                }`}
              >
                {/* Line number gutter */}
                <span
                  className={`w-6 text-right select-none text-xs font-mono shrink-0 ${
                    isHighlighted
                      ? 'text-primary font-bold'
                      : 'text-muted-foreground/60'
                  }`}
                >
                  {lineNumber}
                </span>

                {/* Line text */}
                <span className="whitespace-pre">{lineContent || ' '}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Variable Inspector Footer */}
      {variables && Object.keys(variables).length > 0 && (
        <div className="p-3 border-t border-border/70 bg-secondary/30">
          <VariableInspector variables={variables} />
        </div>
      )}
    </div>
  )
}

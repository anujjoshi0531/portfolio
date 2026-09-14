'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Algorithm, CodeLanguage, Step } from '@/lib/algorithms/types'
import { Check, Copy, Code2 } from 'lucide-react'

interface CodeViewerProps {
  algorithm: Algorithm
  step: Step | null
  className?: string
}

const LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'rust', label: 'Rust' },
]

export function CodeViewer({ algorithm, step, className = '' }: CodeViewerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('javascript')
  const [copied, setCopied] = useState(false)
  const activeLineRef = useRef<HTMLDivElement | null>(null)

  // Get code and line map for current selected language
  let code = algorithm.code
  let lineMap: Record<number, number> | undefined = undefined

  if (selectedLanguage !== 'javascript' && algorithm.implementations) {
    const impl = algorithm.implementations[selectedLanguage]
    if (impl && impl.code) {
      code = impl.code
      lineMap = impl.lineMap
    }
  }

  // Calculate active target line number
  const activeJsLine = step?.codeLine
  let activeLineNumber: number | undefined = undefined
  if (activeJsLine !== undefined) {
    if (selectedLanguage === 'javascript') {
      activeLineNumber = activeJsLine
    } else if (lineMap) {
      activeLineNumber = lineMap[activeJsLine]
    }
  }

  // Build inline variable annotations string
  const inlineAnnotation = React.useMemo(() => {
    if (!step?.variables) return null
    const entries = Object.entries(step.variables)
    if (entries.length === 0) return null
    return `// ${entries
      .map(([k, v]) => `${k} = ${typeof v === 'string' ? v : JSON.stringify(v)}`)
      .join(', ')}`
  }, [step?.variables])

  // Scroll active line into view smoothly
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeLineNumber])

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div
      className={`flex flex-col h-full bg-card/60 backdrop-blur-sm rounded-2xl border border-border/80 overflow-hidden shadow-md ${className}`}
    >
      {/* Header with Language Tabs and Copy Button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/70 bg-muted/30">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 px-2 text-xs font-mono font-semibold text-muted-foreground mr-1">
            <Code2 className="size-3.5" />
            <span>Code</span>
          </div>

          {LANGUAGES.map((lang) => {
            const hasLang =
              lang.id === 'javascript' ||
              Boolean(algorithm.implementations && algorithm.implementations[lang.id as Exclude<CodeLanguage, 'javascript'>]?.code)

            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                disabled={!hasLang}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  selectedLanguage === lang.id
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : hasLang
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                    : 'text-muted-foreground/40 cursor-not-allowed'
                }`}
              >
                {lang.label}
              </button>
            )
          })}
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-md transition-colors"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed select-text min-h-0 bg-neutral-950/70 dark:bg-neutral-950/90 text-neutral-200">
        <div className="min-w-max">
          {lines.map((line, idx) => {
            const lineNum = idx + 1
            const isActive = activeLineNumber === lineNum

            return (
              <div
                key={lineNum}
                ref={isActive ? activeLineRef : null}
                className={`flex items-center rounded px-2 py-0.5 transition-colors duration-150 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-semibold'
                    : 'hover:bg-muted/30 text-neutral-300'
                }`}
              >
                {/* Line number gutter */}
                <span className="w-8 select-none text-[11px] text-neutral-500 text-right pr-4 font-mono">
                  {lineNum}
                </span>

                {/* Code content */}
                <span className="flex-1 whitespace-pre">{line}</span>

                {/* Active line variable annotation */}
                {isActive && inlineAnnotation && (
                  <span className="ml-4 text-[11px] font-mono font-medium text-amber-400/90 italic">
                    {inlineAnnotation}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

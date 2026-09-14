import type { CodeImplementation, CodeLanguage } from './types'

export interface CodeLanguageMeta {
  id: CodeLanguage
  label: string
}

export const codeLanguages: CodeLanguageMeta[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'rust', label: 'Rust' },
]

export const codeLanguageIds: CodeLanguage[] = ['javascript', 'python', 'java', 'cpp', 'rust']
export const defaultCodeLanguage: CodeLanguage = 'javascript'

/** Supports Python (`#@`) and C-family (`//@`) line markers. */
const MARKER = /[ \t]*(?:#|\/\/)@([\d,\s]+)$/

/**
 * Builds a `CodeImplementation` from source annotated with `#@<jsLine>` or `//@<jsLine>` markers.
 */
export function annotated(source: string): CodeImplementation {
  const lineMap: Record<number, number> = {}
  const code = source
    .split('\n')
    .map((line, index) => {
      const match = line.match(MARKER)
      if (!match) return line
      for (const raw of match[1].split(',')) {
        const jsLine = Number(raw.trim())
        if (Number.isInteger(jsLine) && jsLine > 0) lineMap[jsLine] = index + 1
      }
      return line.slice(0, match.index)
    })
    .join('\n')

  return { code, lineMap }
}

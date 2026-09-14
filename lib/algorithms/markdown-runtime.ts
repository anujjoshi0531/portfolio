import type { CodeImplementation, CodeLanguage } from './types'

export type MarkdownCodeBlocks = Partial<Record<CodeLanguage, string>>

export interface MarkdownAlgorithmRuntime {
  runtime?: string
  input?: unknown
  codeBlocks: MarkdownCodeBlocks
  lineMaps?: Partial<Record<Exclude<CodeLanguage, 'javascript'>, Record<number, number>>>
  complexity?: {
    best?: string
    average?: string
    worst?: string
  }
  spaceComplexity?: string
  prerequisites?: string
  howItWorks?: string[]
}

const LANGUAGE_ALIASES: Record<string, CodeLanguage> = {
  js: 'javascript',
  jsx: 'javascript',
  javascript: 'javascript',
  ts: 'javascript',
  typescript: 'javascript',
  py: 'python',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  'c++': 'cpp',
  rust: 'rust',
  rs: 'rust',
}

export function extractMarkdownCodeBlocks(content: string): MarkdownCodeBlocks {
  const blocks: MarkdownCodeBlocks = {}
  const codeFenceRegex = /```([^\n\r`]*)\r?\n([\s\S]*?)```/g
  let match: RegExpExecArray | null

  while ((match = codeFenceRegex.exec(content)) !== null) {
    const rawLanguage = match[1].trim().split(/\s+/)[0].toLowerCase()
    const language = LANGUAGE_ALIASES[rawLanguage]

    if (language && !blocks[language]) {
      blocks[language] = match[2].trimEnd()
    }
  }

  return blocks
}

export function toMarkdownCodeImplementations(
  codeBlocks: MarkdownCodeBlocks,
  lineMaps?: MarkdownAlgorithmRuntime['lineMaps'],
): Partial<Record<Exclude<CodeLanguage, 'javascript'>, CodeImplementation>> {
  const implementations: Partial<Record<Exclude<CodeLanguage, 'javascript'>, CodeImplementation>> = {}

  for (const language of ['python', 'java', 'cpp', 'rust'] as const) {
    const code = codeBlocks[language]
    if (!code) continue

    implementations[language] = {
      code,
      lineMap: lineMaps?.[language] ?? {},
    }
  }

  return implementations
}

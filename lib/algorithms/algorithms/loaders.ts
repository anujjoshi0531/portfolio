import type { Algorithm, CodeImplementation, CodeLanguage } from '@lib/types'
import { algorithms } from '@lib/algorithms/index'

type LangPack = Exclude<CodeLanguage, 'javascript'>

const ALGORITHM_MAP = new Map<string, Algorithm>(
  algorithms.map((algo) => [algo.id, algo])
)

/** Load a single algorithm (JS code + step generator). */
export async function loadAlgorithm(id: string): Promise<Algorithm> {
  const algo = ALGORITHM_MAP.get(id)
  if (!algo) {
    throw new Error(`Unknown algorithm: ${id}`)
  }
  return algo
}

/** Load one language implementation. */
export async function loadLanguageImplementation(
  algorithmId: string,
  language: LangPack
): Promise<CodeImplementation | undefined> {
  try {
    if (language === 'python') {
      const { pythonImplementations } = await import('./python/index')
      return pythonImplementations[algorithmId]
    }
    if (language === 'java') {
      const { javaImplementations } = await import('./java/index')
      return javaImplementations[algorithmId]
    }
    if (language === 'cpp') {
      const { cppImplementations } = await import('./cpp/index')
      return cppImplementations[algorithmId]
    }
    if (language === 'rust') {
      const { rustImplementations } = await import('./rust/index')
      return rustImplementations[algorithmId]
    }
  } catch (err) {
    console.error(`Failed to load ${language} implementation for ${algorithmId}:`, err)
  }
  return undefined
}

export function isLoadableAlgorithm(id: string): boolean {
  return ALGORITHM_MAP.has(id)
}

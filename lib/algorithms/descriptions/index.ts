import type { Locale } from '@/lib/algorithms/i18n/translations'

export async function loadAlgorithmDescription(id: string, locale: Locale = 'en'): Promise<string> {
  try {
    const mod = await import(`@content/${id}`)
    const descriptions = mod.default as Record<Locale, string>
    return descriptions[locale] || descriptions.en || ''
  } catch (err) {
    console.warn(`No description found for algorithm: ${id}`, err)
    return ''
  }
}

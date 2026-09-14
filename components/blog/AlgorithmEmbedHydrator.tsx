'use client'

import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { AlgorithmVisualizer } from '@/features/algorithms/components/AlgorithmVisualizer'

export function AlgorithmEmbedHydrator({ containerSelector = '.markdown-body' }: { containerSelector?: string }) {
  const rootsRef = useRef<ReturnType<typeof createRoot>[]>([])

  useEffect(() => {
    // Clean up any previously mounted roots
    rootsRef.current.forEach((r) => r.unmount())
    rootsRef.current = []

    const container = document.querySelector(containerSelector)
    if (!container) return

    const placeholders = container.querySelectorAll<HTMLElement>('.algo-embed-placeholder')

    placeholders.forEach((el) => {
      const algorithmId = el.getAttribute('data-algorithm')
      if (!algorithmId) return
      const caption = el.getAttribute('data-caption') || undefined
      const autoPlay = el.getAttribute('data-autoplay') === 'true'
      const speedValue = Number(el.getAttribute('data-speed'))
      const initialSpeed = Number.isFinite(speedValue) && speedValue > 0 ? speedValue : undefined

      // Avoid double hydration
      if (el.getAttribute('data-hydrated') === 'true') return
      el.setAttribute('data-hydrated', 'true')

      try {
        const root = createRoot(el)
        rootsRef.current.push(root)
        root.render(
          <AlgorithmVisualizer
            algorithm={algorithmId}
            mode="embedded"
            caption={caption}
            autoPlay={autoPlay}
            initialSpeed={initialSpeed}
          />
        )
      } catch (err) {
        console.error('Failed to hydrate algorithm visualizer for:', algorithmId, err)
      }
    })

    return () => {
      rootsRef.current.forEach((r) => {
        try {
          r.unmount()
        } catch {
          // ignore unmount on destroyed nodes
        }
      })
      rootsRef.current = []
    }
  }, [containerSelector])

  return null
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Algorithm, Step } from '../types'

export const SPEED_MAP: Record<number, number> = {
  0.5: 800,
  1: 400,
  2: 200,
  4: 100,
}

export interface UseAlgorithmPlaybackOptions {
  algorithm: Algorithm | null
  initialSteps?: Step[]
  autoPlay?: boolean
  initialSpeed?: number
  enableKeyboard?: boolean
}

export function useAlgorithmPlayback({
  algorithm,
  initialSteps,
  autoPlay = false,
  initialSpeed = 1,
  enableKeyboard = false,
}: UseAlgorithmPlaybackOptions) {
  const [steps, setSteps] = useState<Step[]>(() => {
    if (initialSteps && initialSteps.length > 0) return initialSteps
    if (algorithm) return algorithm.generateSteps('en', algorithm.runtimeInput)
    return []
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Sync when algorithm changes
  useEffect(() => {
    if (algorithm) {
      const newSteps = algorithm.generateSteps('en', algorithm.runtimeInput)
      setSteps(newSteps)
      setCurrentStep(0)
      setIsPlaying(false)
      if (autoPlay && newSteps.length > 0) {
        const t = setTimeout(() => setIsPlaying(true), 400)
        return () => clearTimeout(t)
      }
    }
  }, [algorithm, autoPlay])

  const stepForward = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [steps.length])

  const stepBackward = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }, [])

  const setStep = useCallback(
    (step: number) => {
      setCurrentStep(Math.max(0, Math.min(step, Math.max(0, steps.length - 1))))
    },
    [steps.length],
  )

  const togglePlay = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(true)
        return 0
      }
      setIsPlaying((p) => !p)
      return prev
    })
  }, [steps.length])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(0)
  }, [])

  const regenerate = useCallback(() => {
    if (algorithm) {
      const newSteps = algorithm.generateSteps('en', algorithm.runtimeInput)
      setSteps(newSteps)
      setCurrentStep(0)
      setIsPlaying(false)
    }
  }, [algorithm])

  // Playback timer interval
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (isPlaying && steps.length > 0) {
      const delay = SPEED_MAP[speed] || 400
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            if (timerRef.current) clearInterval(timerRef.current)
            return prev
          }
          return prev + 1
        })
      }, delay)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, speed, steps.length])

  // Keyboard shortcut support
  useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        stepForward()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        stepBackward()
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        reset()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboard, togglePlay, stepForward, stepBackward, reset])

  const currentStepData = steps[currentStep] || null

  return {
    steps,
    currentStep,
    totalSteps: steps.length,
    isPlaying,
    speed,
    currentStepData,
    stepForward,
    stepBackward,
    setStep,
    setSpeed,
    togglePlay,
    reset,
    regenerate,
    setIsPlaying,
  }
}

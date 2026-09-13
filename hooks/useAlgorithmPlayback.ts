'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Algorithm, SerializableAlgorithm, Step } from '@/lib/algorithms/types'
import type { Locale } from '@/lib/algorithms/i18n/translations'
import { loadAlgorithm } from '@/lib/algorithms/algorithms/loaders'

export const SPEED_MAP: Record<number, number> = {
  1: 1600, // 0.5x (slowest)
  2: 900,  // 1x (default)
  3: 500,  // 1.5x
  4: 250,  // 2x
  5: 100,  // 5x (fastest)
}

export interface UseAlgorithmPlaybackOptions {
  algorithm?: SerializableAlgorithm | Algorithm | null
  initialSteps?: Step[]
  locale?: Locale
  autoPlayOnInit?: boolean
  initialSpeed?: number
}

export function useAlgorithmPlayback({
  algorithm = null,
  initialSteps,
  locale = 'en',
  autoPlayOnInit = false,
  initialSpeed = 2,
}: UseAlgorithmPlaybackOptions = {}) {
  const [currentAlgo, setCurrentAlgo] = useState<SerializableAlgorithm | Algorithm | null>(algorithm)
  const [steps, setSteps] = useState<Step[]>(() => {
    if (initialSteps && initialSteps.length > 0) return initialSteps
    if (algorithm && 'generateSteps' in algorithm && typeof algorithm.generateSteps === 'function') {
      try {
        return algorithm.generateSteps(locale)
      } catch (e) {
        console.error('Error generating steps:', e)
        return []
      }
    }
    return []
  })

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlayOnInit)
  const [speed, setSpeedState] = useState<number>(initialSpeed)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Update algorithm and steps when prop changes or load if not generated yet
  useEffect(() => {
    if (algorithm) {
      setCurrentAlgo(algorithm)
      if (initialSteps && initialSteps.length > 0) {
        setSteps(initialSteps)
        setCurrentStep(0)
        setIsPlaying(autoPlayOnInit)
      } else if ('generateSteps' in algorithm && typeof algorithm.generateSteps === 'function') {
        try {
          const generated = algorithm.generateSteps(locale)
          setSteps(generated)
          setCurrentStep(0)
          setIsPlaying(autoPlayOnInit)
        } catch (err) {
          console.error('Error in step generation:', err)
        }
      } else {
        // Load dynamically on client if steps not provided
        loadAlgorithm(algorithm.id).then((fullAlgo) => {
          try {
            const generated = fullAlgo.generateSteps(locale)
            setSteps(generated)
            setCurrentStep(0)
            setIsPlaying(autoPlayOnInit)
          } catch (err) {
            console.error('Error generating steps client-side:', err)
          }
        })
      }
    }
  }, [algorithm, initialSteps, locale, autoPlayOnInit])

  const totalSteps = steps.length
  const currentStepData = steps[currentStep] || null

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const play = useCallback(() => {
    if (totalSteps <= 1) return
    setCurrentStep((prev) => (prev >= totalSteps - 1 ? 0 : prev))
    setIsPlaying(true)
  }, [totalSteps])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < totalSteps - 1) return prev + 1
      setIsPlaying(false)
      return prev
    })
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0))
  }, [])

  const goToStep = useCallback((stepIndex: number) => {
    const clamped = Math.max(0, Math.min(stepIndex, totalSteps - 1))
    setCurrentStep(clamped)
  }, [totalSteps])

  const restart = useCallback(() => {
    setCurrentStep(0)
  }, [])

  const setSpeed = useCallback((newSpeed: number) => {
    if (newSpeed >= 1 && newSpeed <= 5) {
      setSpeedState(newSpeed)
    }
  }, [])

  // Auto-play interval effect
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    const interval = SPEED_MAP[speed] || 900
    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1
        }
        setIsPlaying(false)
        return prev
      })
    }, interval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, speed, totalSteps])

  // Global keyboard shortcuts (Space: play/pause, ArrowLeft/ArrowRight: step)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        nextStep()
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        prevStep()
      } else if (e.code === 'Home') {
        e.preventDefault()
        restart()
      } else if (e.code === 'End') {
        e.preventDefault()
        goToStep(totalSteps - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, nextStep, prevStep, restart, goToStep, totalSteps])

  return {
    algorithm: currentAlgo,
    steps,
    currentStep,
    totalSteps,
    stepData: currentStepData,
    isPlaying,
    speed,
    play,
    pause,
    togglePlay,
    nextStep,
    prevStep,
    goToStep,
    restart,
    setSpeed,
  }
}

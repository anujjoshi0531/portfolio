'use client'

import React from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { ExecutionTimeline } from './ExecutionTimeline'

interface StepControllerProps {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  speed: number
  onTogglePlay: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onStepChange: (step: number) => void
  onSetSpeed: (speed: number) => void
  onReset: () => void
  onRegenerate?: () => void
  className?: string
}

const SPEED_OPTIONS = [0.5, 1, 2, 4]

export function StepController({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onStepChange,
  onSetSpeed,
  onReset,
  onRegenerate,
  className = '',
}: StepControllerProps) {
  const isAtStart = currentStep === 0
  const isAtEnd = currentStep >= totalSteps - 1

  return (
    <div
      className={`flex flex-col gap-3 p-4 bg-card/70 backdrop-blur-sm rounded-2xl border border-border/80 shadow-md ${className}`}
    >
      {/* Timeline Scrubber */}
      <ExecutionTimeline
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepChange={onStepChange}
      />

      {/* Action Controls & Speed Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-border/50">
        {/* Playback Button Group */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reset */}
          <button
            onClick={onReset}
            disabled={isAtStart}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Reset to Start (R)"
          >
            <RotateCcw className="size-4" />
          </button>

          {/* Step Backward */}
          <button
            onClick={onStepBackward}
            disabled={isAtStart}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Step Backward (Left Arrow)"
          >
            <SkipBack className="size-4" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={onTogglePlay}
            className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
            title="Play / Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="size-4 fill-current" />
                <span className="text-xs font-mono">Pause</span>
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" />
                <span className="text-xs font-mono">{isAtEnd ? 'Replay' : 'Play'}</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={onStepForward}
            disabled={isAtEnd}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Step Forward (Right Arrow)"
          >
            <SkipForward className="size-4" />
          </button>

          {/* Regenerate Random Dataset if available */}
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg transition-colors ml-1"
              title="Generate New Sample Input"
            >
              <Sparkles className="size-4 text-amber-400" />
            </button>
          )}
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/60">
          <span className="text-[11px] font-mono text-muted-foreground px-1.5 hidden sm:inline">
            Speed:
          </span>
          {SPEED_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSetSpeed(s)}
              className={`px-2 py-0.5 text-xs font-mono rounded transition-all ${
                speed === s
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

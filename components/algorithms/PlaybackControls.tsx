'use client'

import React from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Gauge,
  RotateCcw,
} from 'lucide-react'

interface PlaybackControlsProps {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  speed: number
  description?: string
  onPlayToggle: () => void
  onNextStep: () => void
  onPrevStep: () => void
  onGoToStep: (step: number) => void
  onRestart: () => void
  onSpeedChange: (speed: number) => void
  className?: string
}

const SPEED_LABELS: Record<number, string> = {
  1: '0.5x',
  2: '1x',
  3: '1.5x',
  4: '2x',
  5: '5x',
}

export function PlaybackControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  description,
  onPlayToggle,
  onNextStep,
  onPrevStep,
  onGoToStep,
  onRestart,
  onSpeedChange,
  className = '',
}: PlaybackControlsProps) {
  const isAtStart = currentStep === 0
  const isAtEnd = currentStep >= totalSteps - 1

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* Contextual Step Explanation Card */}
      {description && (
        <div className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/70 text-sm md:text-base font-sans text-foreground/90 transition-all flex items-start gap-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
            Step {currentStep + 1}/{totalSteps}
          </span>
          <p className="leading-relaxed flex-1">{description}</p>
        </div>
      )}

      {/* Scrubber & Slider */}
      <div className="w-full flex items-center gap-3 px-1">
        <span className="text-xs font-mono text-muted-foreground w-8 text-right">
          {currentStep + 1}
        </span>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onGoToStep(Number(e.target.value))}
          className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
        />
        <span className="text-xs font-mono text-muted-foreground w-8">
          {totalSteps}
        </span>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-card border border-border/70 shadow-sm">
        {/* Left: Restart */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onRestart}
            title="Restart to step 1 (Home)"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Playback Transport Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Skip to Start */}
          <button
            type="button"
            onClick={() => onGoToStep(0)}
            disabled={isAtStart}
            title="Skip to start"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent transition active:scale-95"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Previous Step */}
          <button
            type="button"
            onClick={onPrevStep}
            disabled={isAtStart}
            title="Previous step (Left Arrow)"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent transition active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Play / Pause Primary Button */}
          <button
            type="button"
            onClick={onPlayToggle}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition active:scale-95 flex items-center justify-center shadow-sm min-w-[5rem]"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Next Step */}
          <button
            type="button"
            onClick={onNextStep}
            disabled={isAtEnd}
            title="Next step (Right Arrow)"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent transition active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Skip to End */}
          <button
            type="button"
            onClick={() => onGoToStep(totalSteps - 1)}
            disabled={isAtEnd}
            title="Skip to end"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent transition active:scale-95"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Speed Selector */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground bg-secondary/80 px-2 py-1 rounded-lg border border-border/50">
            <Gauge className="w-3.5 h-3.5 text-primary" />
            <select
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              aria-label="Playback Speed"
              className="bg-transparent text-foreground font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value={1} className="bg-popover text-popover-foreground">0.5x</option>
              <option value={2} className="bg-popover text-popover-foreground">1.0x</option>
              <option value={3} className="bg-popover text-popover-foreground">1.5x</option>
              <option value={4} className="bg-popover text-popover-foreground">2.0x</option>
              <option value={5} className="bg-popover text-popover-foreground">5.0x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import type { Algorithm, SerializableAlgorithm, Step } from '@/lib/algorithms/types'
import { useAlgorithmPlayback } from '@/hooks/useAlgorithmPlayback'
import { AlgorithmStage } from './AlgorithmStage'
import { PlaybackControls } from './PlaybackControls'
import { CodePanel } from './CodePanel'
import { DifficultyBadge } from './DifficultyBadge'
import { LayoutGrid, Code2, BookOpen, Columns } from 'lucide-react'

interface AlgorithmVisualizerProps {
  algorithm: SerializableAlgorithm | Algorithm
  initialSteps?: Step[]
  descriptionMarkdown?: string
  initialSpeed?: number
  className?: string
}

type ViewMode = 'split' | 'visualizer' | 'code' | 'tutorial'

export function AlgorithmVisualizer({
  algorithm,
  initialSteps,
  descriptionMarkdown,
  initialSpeed = 2,
  className = '',
}: AlgorithmVisualizerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const {
    currentStep,
    totalSteps,
    stepData,
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
  } = useAlgorithmPlayback({
    algorithm,
    initialSteps,
    initialSpeed,
  })

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {/* Visualizer Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-foreground">
              {algorithm.name}
            </h2>
            <DifficultyBadge difficulty={algorithm.difficulty} />
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-secondary text-muted-foreground border border-border/60">
              {algorithm.category}
            </span>
          </div>
        </div>

        {/* View Layout Switcher */}
        <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border/60">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'split'
                ? 'bg-card text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Side by side split view"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('visualizer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'visualizer'
                ? 'bg-card text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Visualizer</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              viewMode === 'code'
                ? 'bg-card text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>

          {descriptionMarkdown && (
            <button
              type="button"
              onClick={() => setViewMode('tutorial')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'tutorial'
                  ? 'bg-card text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explanation</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
          {/* Left Column: Visualizer Stage + Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <AlgorithmStage
              step={stepData}
              visualizationType={algorithm.visualization}
              className="min-h-[380px] md:min-h-[460px]"
            />

            <PlaybackControls
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              speed={speed}
              description={stepData?.description}
              onPlayToggle={togglePlay}
              onNextStep={nextStep}
              onPrevStep={prevStep}
              onGoToStep={goToStep}
              onRestart={restart}
              onSpeedChange={setSpeed}
            />
          </div>

          {/* Right Column: Code Panel & Variable Inspector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <CodePanel
              algorithm={algorithm}
              currentCodeLine={stepData?.codeLine}
              variables={stepData?.variables}
            />

            {/* Quick Complexity Summary */}
            {descriptionMarkdown && (
              <div className="p-4 rounded-2xl bg-card border border-border/80 text-xs md:text-sm text-foreground/90 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {descriptionMarkdown.split('Time Complexity:')[1]
                  ? `Time Complexity:${descriptionMarkdown.split('Time Complexity:')[1]}`
                  : descriptionMarkdown.slice(0, 300) + '...'}
              </div>
            )}
          </div>
        </div>
      ) : viewMode === 'visualizer' ? (
        <div className="flex flex-col gap-4 w-full">
          <AlgorithmStage
            step={stepData}
            visualizationType={algorithm.visualization}
            className="min-h-[420px] md:min-h-[520px]"
          />
          <PlaybackControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            speed={speed}
            description={stepData?.description}
            onPlayToggle={togglePlay}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onGoToStep={goToStep}
            onRestart={restart}
            onSpeedChange={setSpeed}
          />
        </div>
      ) : viewMode === 'code' ? (
        <div className="flex flex-col gap-4 w-full">
          <CodePanel
            algorithm={algorithm}
            currentCodeLine={stepData?.codeLine}
            variables={stepData?.variables}
          />
          <PlaybackControls
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            speed={speed}
            description={stepData?.description}
            onPlayToggle={togglePlay}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onGoToStep={goToStep}
            onRestart={restart}
            onSpeedChange={setSpeed}
          />
        </div>
      ) : (
        /* Tutorial / Explanation Tab */
        <div className="w-full p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-sm leading-relaxed">
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-sans text-sm md:text-base">
            {descriptionMarkdown}
          </div>
        </div>
      )}
    </div>
  )
}

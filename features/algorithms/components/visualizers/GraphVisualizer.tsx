'use client'

import React from 'react'
import type { Step } from '@/features/algorithms/lib/types'
import { highlightColors } from '@/features/algorithms/lib/highlight-colors'

interface GraphVisualizerProps {
  step: Step | null
  className?: string
}

export function GraphVisualizer({ step, className = '' }: GraphVisualizerProps) {
  const graph = step?.graph

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No graph data for this step
      </div>
    )
  }

  const {
    nodes,
    edges,
    visitedNodes = [],
    currentNode = null,
    visitedEdges = [],
    currentEdge = null,
    queue,
    stack,
    distances,
  } = graph

  // Node position map for edge drawing
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {/* SVG Canvas for nodes and edges */}
      <div className="relative w-full max-w-xl aspect-[4/3] bg-card/40 rounded-xl border border-border/60 overflow-hidden shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="20"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="10"
              markerHeight="7"
              refX="20"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={highlightColors.active} />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, idx) => {
            const from = nodeMap.get(edge.from)
            const to = nodeMap.get(edge.to)
            if (!from || !to) return null

            const isCurrent =
              currentEdge &&
              ((currentEdge[0] === edge.from && currentEdge[1] === edge.to) ||
                (currentEdge[0] === edge.to && currentEdge[1] === edge.from))

            const isVisited = visitedEdges.some(
              ([f, t]) => (f === edge.from && t === edge.to) || (f === edge.to && t === edge.from),
            )

            const strokeColor = isCurrent
              ? highlightColors.active
              : isVisited
              ? highlightColors.visited
              : '#475569'
            const strokeWidth = isCurrent ? 3.5 : isVisited ? 2.5 : 1.5

            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                {edge.weight !== undefined && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <circle r="9" fill="#0f172a" stroke={strokeColor} strokeWidth="1" />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[10px] font-mono fill-foreground font-bold"
                    >
                      {edge.weight}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isCurrent = currentNode === node.id
            const isVisited = visitedNodes.includes(node.id)

            const fillColor = isCurrent
              ? highlightColors.current
              : isVisited
              ? highlightColors.visited
              : '#1e293b'
            const strokeColor = isCurrent
              ? '#fb923c'
              : isVisited
              ? '#c084fc'
              : '#64748b'

            const distance = distances ? distances[node.id] : undefined

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                {isCurrent && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    fill="none"
                    stroke={highlightColors.current}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-spin origin-center"
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="18"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  className="transition-all duration-300 shadow-md"
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs font-mono font-bold fill-white pointer-events-none"
                >
                  {node.label}
                </text>
                {distance !== undefined && (
                  <text
                    x={node.x}
                    y={node.y - 24}
                    textAnchor="middle"
                    className="text-[10px] font-mono font-bold fill-amber-400"
                  >
                    d={distance}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Auxiliary State Badges (Queue, Stack, Distances) */}
      {(queue || stack || distances) && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          {queue && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border border-border/80 rounded-md">
              <span className="text-muted-foreground font-semibold">Queue:</span>
              <span className="text-primary font-bold">
                [{queue.map((id) => nodeMap.get(id)?.label ?? id).join(', ')}]
              </span>
            </div>
          )}
          {stack && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 border border-border/80 rounded-md">
              <span className="text-muted-foreground font-semibold">Stack:</span>
              <span className="text-primary font-bold">
                [{stack.map((id) => nodeMap.get(id)?.label ?? id).join(', ')}]
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

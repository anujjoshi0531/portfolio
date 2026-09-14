'use client'

import React from 'react'
import type {
  ConceptState,
  BigOState,
  CallStackState,
  StackQueueState,
  LinkedListState,
  HashTableState,
  BinaryTreeState,
  TrieState,
  LruCacheState,
  TwoPointersState,
  SlidingWindowState,
  MemoTableState,
  CoinChangeState,
  BucketsState,
  EuclideanState,
  HuffmanState,
  RleState,
  Lz77State,
  LzwState,
  DeflateState,
  BrotliState,
} from '@/lib/algorithms/types'
import { highlightColors } from '@/lib/algorithms/highlight-colors'
import { ArrowRight } from 'lucide-react'

interface ConceptVisualizerProps {
  concept: ConceptState | null
  className?: string
}

export function ConceptVisualizer({ concept, className = '' }: ConceptVisualizerProps) {
  if (!concept) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
        No concept state for this step
      </div>
    )
  }

  switch (concept.type) {
    case 'binaryTree':
      return <BinaryTreeVisualizer state={concept} className={className} />
    case 'trie':
      return <TrieVisualizer state={concept} className={className} />
    case 'linkedList':
      return <LinkedListVisualizer state={concept} className={className} />
    case 'stackQueue':
      return <StackQueueVisualizer state={concept} className={className} />
    case 'hashTable':
      return <HashTableVisualizer state={concept} className={className} />
    case 'lruCache':
      return <LruCacheVisualizer state={concept} className={className} />
    case 'twoPointers':
      return <TwoPointersVisualizer state={concept} className={className} />
    case 'slidingWindow':
      return <SlidingWindowVisualizer state={concept} className={className} />
    case 'callStack':
      return <CallStackVisualizer state={concept} className={className} />
    case 'memoTable':
      return <MemoTableVisualizer state={concept} className={className} />
    case 'coinChange':
      return <CoinChangeVisualizer state={concept} className={className} />
    case 'buckets':
      return <BucketsVisualizer state={concept} className={className} />
    case 'bigO':
      return <BigOVisualizer state={concept} className={className} />
    case 'euclidean':
      return <EuclideanVisualizer state={concept} className={className} />
    case 'huffman':
    case 'rle':
    case 'lz77':
    case 'lzw':
    case 'deflate':
    case 'brotli':
      return <CompressionVisualizer state={concept} className={className} />
    default:
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
          Rendering {((concept as { type: string }).type)} visualization...
        </div>
      )
  }
}

/* ─────────────────────────────────────────────────────────────
   1. Binary Tree / BST / Heap Visualizer
   ───────────────────────────────────────────────────────────── */
function BinaryTreeVisualizer({ state, className = '' }: { state: BinaryTreeState; className?: string }) {
  const { nodes = [], operation, treeType, heapType } = state

  // Positions for 4 levels (15 nodes max in standard tree)
  const getCoordinates = (index: number) => {
    const level = Math.floor(Math.log2(index + 1))
    const posInLevel = index - (Math.pow(2, level) - 1)
    const totalInLevel = Math.pow(2, level)
    const x = ((posInLevel + 0.5) / totalInLevel) * 360 + 20
    const y = level * 65 + 40
    return { x, y }
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-3 ${className}`}>
      {operation && (
        <div className="px-3 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
          {operation}
        </div>
      )}

      <div className="relative w-full max-w-lg aspect-[4/3] bg-card/40 rounded-xl border border-border/60 overflow-hidden shadow-inner flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 280">
          {/* Edges */}
          {nodes.map((node, i) => {
            if (!node) return null
            const leftChild = 2 * i + 1
            const rightChild = 2 * i + 2
            const { x, y } = getCoordinates(i)

            return (
              <g key={`edges-${i}`}>
                {nodes[leftChild] && (
                  <line
                    x1={x}
                    y1={y}
                    x2={getCoordinates(leftChild).x}
                    y2={getCoordinates(leftChild).y}
                    stroke="#475569"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
                {nodes[rightChild] && (
                  <line
                    x1={x}
                    y1={y}
                    x2={getCoordinates(rightChild).x}
                    y2={getCoordinates(rightChild).y}
                    stroke="#475569"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            if (!node) return null
            const { x, y } = getCoordinates(i)
            const { value, state: nodeState } = node

            let fill = '#1e293b'
            let stroke = '#64748b'
            if (nodeState === 'current') {
              fill = highlightColors.current
              stroke = '#fb923c'
            } else if (nodeState === 'found') {
              fill = highlightColors.found
              stroke = '#4ade80'
            } else if (nodeState === 'comparing') {
              fill = highlightColors.comparing
              stroke = '#60a5fa'
            } else if (nodeState === 'new' || nodeState === 'placed') {
              fill = '#10b981'
              stroke = '#34d399'
            }

            return (
              <g key={`tree-node-${i}`} className="transition-all duration-300">
                <circle
                  cx={x}
                  cy={y}
                  r="16"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                  className="shadow-md"
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs font-mono font-bold fill-white pointer-events-none"
                >
                  {value}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="text-[11px] font-mono text-muted-foreground">
        Type: <span className="text-foreground uppercase font-bold">{treeType}</span>
        {heapType && ` (${heapType})`}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. Trie (Prefix Tree) Visualizer
   ───────────────────────────────────────────────────────────── */
function TrieVisualizer({ state, className = '' }: { state: TrieState; className?: string }) {
  const { nodes = {}, words = [], probe, matched = 0, suggestions = [], operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        {probe && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-md border border-border">
            <span className="text-muted-foreground">Probe:</span>
            <span className="text-primary font-bold">{probe}</span>
            <span className="text-[10px] text-muted-foreground">({matched}/{probe.length} matched)</span>
          </div>
        )}
        {operation && (
          <div className="px-3 py-1 bg-primary/10 text-primary rounded-md font-semibold border border-primary/20">
            {operation}
          </div>
        )}
      </div>

      {/* Trie Structure Grid / Nodes */}
      <div className="w-full max-w-xl p-4 bg-card/40 rounded-xl border border-border/60 min-h-[220px] flex flex-wrap gap-2 items-start justify-center overflow-auto shadow-inner">
        {Object.entries(nodes).map(([id, node]) => {
          const isRoot = node.id === 0
          const stateColor =
            node.state === 'current'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : node.state === 'found'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : node.state === 'path'
              ? 'bg-sky-500/20 border-sky-500 text-sky-300'
              : 'bg-muted/60 border-border/80 text-foreground'

          return (
            <div
              key={id}
              className={`flex flex-col items-center p-2 rounded-lg border text-xs font-mono transition-all duration-200 ${stateColor}`}
            >
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{isRoot ? 'ROOT' : `'${node.char}'`}</span>
                {node.isEnd && (
                  <span className="text-[9px] px-1 bg-emerald-600 text-white rounded font-sans font-bold">
                    END
                  </span>
                )}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                Children: {Object.keys(node.children).join(', ') || 'none'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Words List */}
      {words.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-muted-foreground">Words:</span>
          <div className="flex flex-wrap gap-1.5">
            {words.map((w) => (
              <span key={w} className="px-2 py-0.5 bg-muted rounded text-[11px] font-semibold">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   3. Linked List Visualizer
   ───────────────────────────────────────────────────────────── */
function LinkedListVisualizer({ state, className = '' }: { state: LinkedListState; className?: string }) {
  const { nodes = [], operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {operation && (
        <div className="px-3 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
          {operation}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-card/40 rounded-xl border border-border/60 max-w-full overflow-auto shadow-inner">
        {nodes.map((node, index) => {
          let nodeColor = 'border-border/80 bg-muted/60 text-foreground'
          if (node.state === 'current') nodeColor = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40'
          if (node.state === 'found') nodeColor = 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
          if (node.state === 'new') nodeColor = 'border-sky-500 bg-sky-500/20 text-sky-300'
          if (node.state === 'removing') nodeColor = 'border-rose-500 bg-rose-500/20 text-rose-300 line-through'

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center px-4 py-3 rounded-lg border text-sm font-mono font-bold shadow-md transition-all duration-300 min-w-[54px] ${nodeColor}`}>
                  {node.value}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground mt-1">idx {index}</span>
              </div>

              {index < nodes.length - 1 && (
                <div className="flex items-center text-muted-foreground font-mono px-1">
                  <ArrowRight className="size-4" />
                </div>
              )}
            </React.Fragment>
          )
        })}
        {nodes.length > 0 && (
          <div className="flex items-center text-muted-foreground font-mono text-xs pl-1">
            <ArrowRight className="size-4" />
            <span className="ml-1 text-[11px] font-semibold text-rose-400">NULL</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   4. Stack / Queue Visualizer
   ───────────────────────────────────────────────────────────── */
function StackQueueVisualizer({ state, className = '' }: { state: StackQueueState; className?: string }) {
  const { structure, items = [], operation, removedValue } = state
  const isStack = structure === 'stack'

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
          {structure}
        </span>
        {operation && (
          <span className="px-2.5 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold">
            {operation}
          </span>
        )}
      </div>

      <div className="p-4 bg-card/40 rounded-xl border border-border/60 min-h-[180px] flex items-center justify-center shadow-inner">
        {isStack ? (
          // Vertical Stack
          <div className="flex flex-col-reverse items-center gap-1.5 w-32 border-b-2 border-x-2 border-primary/40 p-2 rounded-b-lg">
            {items.length === 0 ? (
              <span className="text-xs font-mono text-muted-foreground py-8">Empty Stack</span>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full py-2 text-center font-mono font-bold text-sm rounded border transition-all duration-300 ${
                    item.state === 'entering'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-105'
                      : item.state === 'leaving'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 opacity-50'
                      : 'bg-muted/80 border-border text-foreground'
                  }`}
                >
                  {item.value}
                  {index === items.length - 1 && (
                    <span className="block text-[9px] text-primary">TOP</span>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          // Horizontal Queue
          <div className="flex items-center gap-2 border-y-2 border-primary/40 px-4 py-3 rounded-lg overflow-auto max-w-md">
            {items.length === 0 ? (
              <span className="text-xs font-mono text-muted-foreground px-8">Empty Queue</span>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className={`px-3.5 py-2 font-mono font-bold text-sm rounded border transition-all duration-300 text-center ${
                    item.state === 'entering'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : item.state === 'leaving'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 opacity-50'
                      : 'bg-muted/80 border-border text-foreground'
                  }`}
                >
                  {item.value}
                  <span className="block text-[9px] text-muted-foreground mt-0.5">
                    {index === 0 ? 'FRONT' : index === items.length - 1 ? 'REAR' : `#${index}`}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {removedValue !== undefined && removedValue !== null && (
        <div className="text-xs font-mono text-rose-400">
          Popped/Dequeued value: <span className="font-bold">{removedValue}</span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   5. Hash Table Visualizer
   ───────────────────────────────────────────────────────────── */
function HashTableVisualizer({ state, className = '' }: { state: HashTableState; className?: string }) {
  const { buckets = [], size, hashingKey, hashResult, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {/* Operation info */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        {hashingKey && (
          <div className="px-3 py-1 bg-muted rounded border border-border">
            hash(<span className="text-primary font-bold">&quot;{hashingKey}&quot;</span>) ={' '}
            <span className="text-amber-400 font-bold">{hashResult}</span>
          </div>
        )}
        {operation && (
          <div className="px-3 py-1 bg-primary/10 text-primary rounded font-semibold border border-primary/20">
            {operation}
          </div>
        )}
      </div>

      {/* Buckets grid */}
      <div className="w-full max-w-xl grid gap-2 p-3 bg-card/40 rounded-xl border border-border/60 shadow-inner overflow-auto">
        {buckets.map((bucket, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-mono transition-colors ${
              hashResult === idx ? 'bg-amber-500/10 border-amber-500/60' : 'bg-muted/40 border-border/60'
            }`}
          >
            <div className="w-8 h-8 rounded bg-card flex items-center justify-center font-bold text-muted-foreground border border-border">
              {idx}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              {bucket.length === 0 ? (
                <span className="text-muted-foreground text-[11px] italic">empty</span>
              ) : (
                bucket.map((entry, eIdx) => (
                  <div
                    key={eIdx}
                    className={`flex items-center gap-1 px-2 py-1 rounded border font-semibold ${
                      entry.state === 'new'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : entry.state === 'collision'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : entry.state === 'found'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-card border-border text-foreground'
                    }`}
                  >
                    <span>{entry.key}:</span>
                    <span className="text-primary">{entry.value}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   6. LRU Cache Visualizer
   ───────────────────────────────────────────────────────────── */
function LruCacheVisualizer({ state, className = '' }: { state: LruCacheState; className?: string }) {
  const { capacity, entries = [], lookupKey, miss, evictedKey, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-2.5 py-1 bg-muted rounded border border-border">
          Capacity: <span className="font-bold text-primary">{capacity}</span>
        </span>
        {lookupKey && (
          <span className={`px-2.5 py-1 rounded border font-semibold ${
            miss ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
          }`}>
            get(&quot;{lookupKey}&quot;) ➔ {miss ? 'MISS' : 'HIT'}
          </span>
        )}
        {evictedKey && (
          <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500 text-amber-300 rounded font-semibold">
            Evicted: &quot;{evictedKey}&quot;
          </span>
        )}
        {operation && (
          <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded font-semibold">
            {operation}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 p-4 bg-card/40 rounded-xl border border-border/60 shadow-inner max-w-full overflow-auto">
        <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold px-1">
          MRU
        </div>
        {entries.map((entry, idx) => (
          <React.Fragment key={entry.key}>
            <div
              className={`flex flex-col items-center px-3 py-2 rounded-lg border text-xs font-mono font-bold transition-all duration-300 ${
                entry.state === 'hit'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-105'
                  : entry.state === 'new'
                  ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                  : entry.state === 'evicting'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 opacity-50'
                  : 'bg-muted/80 border-border text-foreground'
              }`}
            >
              <span>{entry.key}</span>
              <span className="text-[10px] text-primary">{entry.value}</span>
            </div>
            {idx < entries.length - 1 && <ArrowRight className="size-3.5 text-muted-foreground" />}
          </React.Fragment>
        ))}
        <div className="text-[10px] font-mono uppercase text-rose-400 font-bold px-1">
          LRU
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   7. Two Pointers & Sliding Window Visualizers
   ───────────────────────────────────────────────────────────── */
function TwoPointersVisualizer({ state, className = '' }: { state: TwoPointersState; className?: string }) {
  const { array = [], left, right, highlights = {}, sum, target, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        {sum !== undefined && target !== undefined && (
          <div className="px-3 py-1 bg-muted rounded border border-border">
            sum = <span className="font-bold text-amber-300">{sum}</span> (target = {target})
          </div>
        )}
        {operation && (
          <div className="px-3 py-1 bg-primary/10 text-primary rounded font-semibold border border-primary/20">
            {operation}
          </div>
        )}
      </div>

      {/* Array Elements with Left & Right pointer tags */}
      <div className="flex flex-wrap items-end justify-center gap-2 p-4 bg-card/40 rounded-xl border border-border/60">
        {array.map((val, idx) => {
          const isLeft = left === idx
          const isRight = right === idx
          const stateType = highlights[idx] || 'default'

          let bg = 'bg-muted/60 border-border/80'
          if (isLeft) bg = 'bg-sky-500/20 border-sky-500 text-sky-300 ring-2 ring-sky-500/30'
          if (isRight) bg = 'bg-pink-500/20 border-pink-500 text-pink-300 ring-2 ring-pink-500/30'
          if (stateType === 'found') bg = 'bg-emerald-500/20 border-emerald-500 text-emerald-300'

          return (
            <div key={idx} className="flex flex-col items-center">
              {(isLeft || isRight) && (
                <span className="text-[10px] font-mono font-bold text-amber-400 mb-1">
                  {isLeft && isRight ? 'L & R' : isLeft ? 'LEFT' : 'RIGHT'}
                </span>
              )}
              <div className={`w-11 h-11 flex items-center justify-center rounded-lg border font-mono font-bold text-sm shadow-sm transition-all ${bg}`}>
                {val}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground mt-1">{idx}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SlidingWindowVisualizer({ state, className = '' }: { state: SlidingWindowState; className?: string }) {
  const { chars = [], windowStart, windowEnd, charStates = {}, best, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {operation && (
        <div className="px-3 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
          {operation}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-card/40 rounded-xl border border-border/60">
        {chars.map((char, idx) => {
          const inWindow = idx >= windowStart && idx <= windowEnd
          const charState = charStates[idx] || (inWindow ? 'inWindow' : 'outside')

          let color = 'bg-muted/40 border-border/60 text-muted-foreground'
          if (charState === 'inWindow') color = 'bg-primary/20 border-primary text-primary font-bold scale-105'
          if (charState === 'current') color = 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
          if (charState === 'duplicate') color = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'

          return (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg border font-mono text-sm transition-all ${color}`}>
                {char}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground mt-1">{idx}</span>
            </div>
          )
        })}
      </div>

      <div className="text-xs font-mono text-muted-foreground">
        Window length:{' '}
        <span className="text-primary font-bold">{Math.max(0, windowEnd - windowStart + 1)}</span>
        {best && ` (Best: ${best.end - best.start + 1})`}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   8. Call Stack Visualizer (Recursion)
   ───────────────────────────────────────────────────────────── */
function CallStackVisualizer({ state, className = '' }: { state: CallStackState; className?: string }) {
  const { frames = [] } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
        Execution Call Stack
      </div>

      <div className="w-full max-w-sm flex flex-col-reverse gap-2 p-4 bg-card/40 rounded-xl border border-border/60 shadow-inner">
        {frames.length === 0 ? (
          <div className="text-center text-xs font-mono text-muted-foreground py-6">Stack Empty</div>
        ) : (
          frames.map((frame, idx) => {
            let color = 'bg-muted/80 border-border text-foreground'
            if (frame.state === 'active') color = 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/30'
            if (frame.state === 'base') color = 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
            if (frame.state === 'resolved') color = 'bg-sky-500/20 border-sky-500 text-sky-300'

            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border font-mono text-xs shadow-sm flex items-center justify-between transition-all ${color}`}
              >
                <div className="flex flex-col">
                  <span className="font-bold">{frame.label}</span>
                  {frame.detail && (
                    <span className="text-[10px] text-muted-foreground mt-0.5">{frame.detail}</span>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/30 font-semibold">
                  {frame.state}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   9. Memoization / DP Table Visualizer
   ───────────────────────────────────────────────────────────── */
function MemoTableVisualizer({ state, className = '' }: { state: MemoTableState; className?: string }) {
  const { entries = [], currentCall, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="flex items-center gap-3 text-xs font-mono">
        {currentCall && (
          <span className="px-3 py-1 bg-muted rounded border border-border font-bold text-primary">
            {currentCall}
          </span>
        )}
        {operation && (
          <span className="px-3 py-1 bg-primary/10 text-primary rounded font-semibold border border-primary/20">
            {operation}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 p-4 bg-card/40 rounded-xl border border-border/60 max-w-xl">
        {entries.map((entry) => (
          <div
            key={entry.key}
            className={`flex flex-col items-center p-2 min-w-[56px] rounded-lg border font-mono text-xs ${
              entry.state === 'cached' || entry.state === 'hit'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : entry.state === 'computing'
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-muted/40 border-border/60 text-muted-foreground'
            }`}
          >
            <span className="text-[10px] opacity-70">f({entry.key})</span>
            <span className="font-bold text-sm mt-0.5">{entry.value !== null ? entry.value : '-'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   10. Coin Change / Greedy vs DP Visualizer
   ───────────────────────────────────────────────────────────── */
function CoinChangeVisualizer({ state, className = '' }: { state: CoinChangeState; className?: string }) {
  const { coins = [], target, selected = [], remaining, approach, greedyResult, dpResult, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1 bg-muted rounded border border-border">
          Target: <span className="font-bold text-primary">{target}</span> | Remaining:{' '}
          <span className="font-bold text-amber-400">{remaining}</span>
        </span>
        {operation && (
          <span className="px-3 py-1 bg-primary/10 text-primary rounded border border-primary/20 font-semibold">
            {operation}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 p-4 bg-card/40 rounded-xl border border-border/60 w-full max-w-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">Coins:</span>
          {coins.map((c) => (
            <span key={c} className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center justify-center font-mono font-bold text-xs">
              {c}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-mono text-muted-foreground">Selected:</span>
          {selected.length === 0 ? (
            <span className="text-xs font-mono text-muted-foreground italic">None</span>
          ) : (
            selected.map((s, idx) => (
              <span key={idx} className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-300 flex items-center justify-center font-mono font-bold text-xs">
                {s}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   11. Buckets Sort Visualizer
   ───────────────────────────────────────────────────────────── */
function BucketsVisualizer({ state, className = '' }: { state: BucketsState; className?: string }) {
  const { array = [], buckets = [], phase, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {operation && (
        <div className="px-3 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
          {operation}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl p-4 bg-card/40 rounded-xl border border-border/60">
        {buckets.map((b, idx) => (
          <div key={idx} className="p-3 bg-muted/40 rounded-lg border border-border flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-muted-foreground">
              Bucket {idx}
            </span>
            <div className="flex flex-wrap gap-1 items-center justify-center min-h-[36px]">
              {b.length === 0 ? (
                <span className="text-[10px] text-muted-foreground italic">empty</span>
              ) : (
                b.map((val, vIdx) => (
                  <span key={vIdx} className="px-2 py-1 rounded bg-primary/20 border border-primary text-primary font-mono font-bold text-xs">
                    {val}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   12. Big-O Complexity Graph Visualizer
   ───────────────────────────────────────────────────────────── */
function BigOVisualizer({ state, className = '' }: { state: BigOState; className?: string }) {
  const { curves = [], maxN = 10 } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="w-full max-w-lg aspect-[16/9] bg-card/40 rounded-xl border border-border/60 p-4 relative shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 400 220">
          {/* Grid lines */}
          <line x1="40" y1="180" x2="380" y2="180" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
          <text x="375" y="200" className="text-[10px] font-mono fill-muted-foreground">N</text>
          <text x="15" y="30" className="text-[10px] font-mono fill-muted-foreground">Ops</text>

          {/* O(1) */}
          <line x1="40" y1="165" x2="380" y2="165" stroke="#10b981" strokeWidth="2" />
          <text x="320" y="160" className="text-[10px] font-mono fill-emerald-400 font-bold">O(1)</text>

          {/* O(log n) */}
          <path d="M 40 165 Q 180 145, 380 135" fill="none" stroke="#34d399" strokeWidth="2" />
          <text x="320" y="130" className="text-[10px] font-mono fill-teal-400 font-bold">O(log n)</text>

          {/* O(n) */}
          <line x1="40" y1="165" x2="380" y2="70" stroke="#60a5fa" strokeWidth="2" />
          <text x="320" y="65" className="text-[10px] font-mono fill-blue-400 font-bold">O(n)</text>

          {/* O(n log n) */}
          <path d="M 40 165 Q 180 110, 320 30" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <text x="260" y="25" className="text-[10px] font-mono fill-amber-400 font-bold">O(n log n)</text>

          {/* O(n²) */}
          <path d="M 40 165 Q 120 150, 190 20" fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
          <text x="140" y="20" className="text-[10px] font-mono fill-red-400 font-bold">O(n²)</text>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
        <span className="text-emerald-400 font-bold">● O(1) Excellent</span>
        <span className="text-teal-400 font-bold">● O(log n) Good</span>
        <span className="text-blue-400 font-bold">● O(n) Fair</span>
        <span className="text-amber-400 font-bold">● O(n log n) Bad</span>
        <span className="text-red-400 font-bold">● O(n²) Horrible</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   13. Euclidean GCD Algorithm Visualizer
   ───────────────────────────────────────────────────────────── */
function EuclideanVisualizer({ state, className = '' }: { state: EuclideanState; className?: string }) {
  const { a, b, quotient, remainder, history = [], gcd, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      {operation && (
        <div className="px-3 py-1 text-xs font-mono font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
          {operation}
        </div>
      )}

      <div className="w-full max-w-md p-4 bg-card/40 rounded-xl border border-border/60 shadow-inner flex flex-col gap-2 font-mono text-xs">
        {history.map((h, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/40 border border-border/60">
            <span>{h.a} = ({h.q} × {h.b}) + <span className="text-amber-400 font-bold">{h.r}</span></span>
          </div>
        ))}

        {quotient !== undefined && remainder !== undefined && (
          <div className="flex items-center justify-between p-2.5 rounded bg-primary/20 border border-primary font-bold text-sm">
            <span>{a} = ({quotient} × {b}) + <span className="text-amber-300">{remainder}</span></span>
          </div>
        )}

        {gcd !== undefined && (
          <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-center font-bold text-sm mt-2">
            GCD = {gcd}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   14. Compression Visualizer (Huffman, RLE, LZ77, LZW, DEFLATE)
   ───────────────────────────────────────────────────────────── */
function CompressionVisualizer({
  state,
  className = '',
}: {
  state: HuffmanState | RleState | Lz77State | LzwState | DeflateState | BrotliState
  className?: string
}) {
  const { type, operation } = state

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-4 gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
          {type} Compression
        </span>
        {operation && (
          <span className="px-2.5 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20 font-semibold">
            {operation}
          </span>
        )}
      </div>

      <div className="w-full max-w-lg p-5 bg-card/40 rounded-xl border border-border/60 shadow-inner flex flex-col gap-3 font-mono text-xs">
        {'text' in state && state.text && (
          <div className="flex items-center gap-2 p-2 bg-muted/60 rounded border border-border">
            <span className="text-muted-foreground font-semibold">Input:</span>
            <span className="text-primary font-bold">&quot;{state.text}&quot;</span>
          </div>
        )}

        {'summary' in state && state.summary && (
          <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded border border-border/60 text-xs">
            {Object.entries(state.summary).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="font-bold text-foreground">{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

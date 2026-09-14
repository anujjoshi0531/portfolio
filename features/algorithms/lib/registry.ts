import type { Algorithm } from './types'
import { applyMarkdownRuntime, loadMarkdownRuntime } from './markdown-runtime'

// ── Algorithm Loaders & Importers ──

const algorithmCache = new Map<string, Promise<Algorithm>>()

type ModuleLoader = () => Promise<Record<string, unknown>>

const MODULE_LOADERS: Record<string, { loader: ModuleLoader; exportName: string }> = {
  // Concepts & DS in concepts.ts
  'big-o-notation': { loader: () => import('./definitions/concepts'), exportName: 'bigONotation' },
  recursion: { loader: () => import('./definitions/concepts'), exportName: 'recursion' },
  'two-pointers': { loader: () => import('./definitions/concepts'), exportName: 'twoPointers' },
  'sliding-window': { loader: () => import('./definitions/concepts'), exportName: 'slidingWindow' },
  'space-complexity': { loader: () => import('./definitions/concepts'), exportName: 'spaceComplexity' },
  memoization: { loader: () => import('./definitions/concepts'), exportName: 'memoization' },
  'greedy-vs-dp': { loader: () => import('./definitions/concepts'), exportName: 'greedyVsDp' },
  stack: { loader: () => import('./definitions/concepts'), exportName: 'stack' },
  queue: { loader: () => import('./definitions/concepts'), exportName: 'queue' },

  // Data structures in data-structures.ts
  'linked-list': { loader: () => import('./definitions/data-structures'), exportName: 'linkedList' },
  'hash-table': { loader: () => import('./definitions/data-structures'), exportName: 'hashTable' },
  'binary-search-tree': { loader: () => import('./definitions/data-structures'), exportName: 'binarySearchTree' },
  heap: { loader: () => import('./definitions/data-structures'), exportName: 'heap' },
  trie: { loader: () => import('./definitions/data-structures'), exportName: 'trie' },
  'lru-cache': { loader: () => import('./definitions/data-structures'), exportName: 'lruCache' },

  // Sorting
  'bubble-sort': { loader: () => import('./definitions/sorting'), exportName: 'bubbleSort' },
  'selection-sort': { loader: () => import('./definitions/sorting'), exportName: 'selectionSort' },
  'insertion-sort': { loader: () => import('./definitions/sorting'), exportName: 'insertionSort' },
  'quick-sort': { loader: () => import('./definitions/sorting'), exportName: 'quickSort' },
  'merge-sort': { loader: () => import('./definitions/sorting'), exportName: 'mergeSort' },
  'heap-sort': { loader: () => import('./definitions/sorting'), exportName: 'heapSort' },
  'counting-sort': { loader: () => import('./definitions/sorting'), exportName: 'countingSort' },
  'radix-sort': { loader: () => import('./definitions/sorting'), exportName: 'radixSort' },
  'shell-sort': { loader: () => import('./definitions/sorting'), exportName: 'shellSort' },
  'bucket-sort': { loader: () => import('./definitions/sorting'), exportName: 'bucketSort' },

  // Searching
  'binary-search': { loader: () => import('./definitions/searching'), exportName: 'binarySearch' },
  'linear-search': { loader: () => import('./definitions/searching'), exportName: 'linearSearch' },
  'jump-search': { loader: () => import('./definitions/searching'), exportName: 'jumpSearch' },
  'interpolation-search': { loader: () => import('./definitions/searching'), exportName: 'interpolationSearch' },

  // Graphs
  bfs: { loader: () => import('./definitions/graphs'), exportName: 'bfs' },
  dfs: { loader: () => import('./definitions/graphs'), exportName: 'dfs' },
  dijkstra: { loader: () => import('./definitions/graphs'), exportName: 'dijkstra' },
  prim: { loader: () => import('./definitions/graphs'), exportName: 'prim' },
  'topological-sort': { loader: () => import('./definitions/graphs'), exportName: 'topologicalSort' },

  // Dynamic Programming
  'fibonacci-dp': { loader: () => import('./definitions/dynamic-programming'), exportName: 'fibonacciDp' },
  knapsack: { loader: () => import('./definitions/dynamic-programming'), exportName: 'knapsack' },
  lcs: { loader: () => import('./definitions/dynamic-programming'), exportName: 'lcs' },

  // Backtracking
  'n-queens': { loader: () => import('./definitions/backtracking'), exportName: 'nQueens' },
  'sudoku-solver': { loader: () => import('./definitions/backtracking'), exportName: 'sudokuSolver' },
  'maze-pathfinding': { loader: () => import('./definitions/backtracking'), exportName: 'mazePathfinding' },

  // Divide and Conquer
  'tower-of-hanoi': { loader: () => import('./definitions/divide-and-conquer'), exportName: 'towerOfHanoi' },

  // Math
  euclidean: { loader: () => import('./definitions/math'), exportName: 'euclideanAlgorithm' },
  'sieve-of-eratosthenes': { loader: () => import('./definitions/math'), exportName: 'sieveOfEratosthenes' },

  // Compression
  'run-length-encoding': { loader: () => import('./definitions/compression'), exportName: 'runLengthEncoding' },
  lz77: { loader: () => import('./definitions/compression'), exportName: 'lz77' },
  lzw: { loader: () => import('./definitions/compression'), exportName: 'lzw' },
  'huffman-coding': { loader: () => import('./definitions/compression'), exportName: 'huffmanCoding' },
  deflate: { loader: () => import('./definitions/compression'), exportName: 'deflate' },
  brotli: { loader: () => import('./definitions/compression'), exportName: 'brotli' },
}

export async function loadAlgorithm(id: string): Promise<Algorithm> {
  const cached = algorithmCache.get(id)
  if (cached) return cached

  const entry = MODULE_LOADERS[id]
  if (!entry) {
    return Promise.reject(new Error(`Unknown algorithm: ${id}`))
  }

  const promise = entry.loader().then(async (mod) => {
    const algo = mod[entry.exportName] as Algorithm
    if (!algo) {
      throw new Error(`Algorithm export '${entry.exportName}' not found for ${id}`)
    }

    const runtime = await loadMarkdownRuntime(id)
    return applyMarkdownRuntime(algo, runtime)
  })

  algorithmCache.set(id, promise)
  return promise
}

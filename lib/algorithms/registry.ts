import type { Algorithm, AlgorithmSummary, CategorySummary, CodeImplementation, CodeLanguage } from './types'

export const algorithmCatalog: AlgorithmSummary[] = [
  // Concepts
  {
    id: 'big-o-notation',
    name: 'Big O Notation',
    category: 'Concepts',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Understand time and space complexity growth rates using asymptotic notation.',
  },
  {
    id: 'recursion',
    name: 'Recursion',
    category: 'Concepts',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'A method where the solution depends on solutions to smaller instances of the same problem.',
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    category: 'Concepts',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Iterate with two references through data structures to solve search/pair problems in O(n).',
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    category: 'Concepts',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Perform required operations on a window that slides over data to avoid redundant computations.',
  },
  {
    id: 'space-complexity',
    name: 'Space Complexity',
    category: 'Concepts',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Visualize memory consumption and call-stack growth during execution.',
  },
  {
    id: 'memoization',
    name: 'Memoization',
    category: 'Concepts',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Top-down caching optimization to store results of expensive function calls.',
  },
  {
    id: 'greedy-vs-dp',
    name: 'Greedy vs DP',
    category: 'Concepts',
    difficulty: 'advanced',
    visualization: 'concept',
    description: 'Compare local optimal choices (greedy) against globally optimal subproblems (dynamic programming).',
  },
  // Data Structures
  {
    id: 'stack',
    name: 'Stack',
    category: 'Data Structures',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Last-In-First-Out (LIFO) collection supporting push and pop operations.',
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'Data Structures',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'First-In-First-Out (FIFO) collection supporting enqueue and dequeue operations.',
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    category: 'Data Structures',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Linear collection of data elements where order is given by pointers between nodes.',
  },
  {
    id: 'hash-table',
    name: 'Hash Table',
    category: 'Data Structures',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Associative array data structure mapping keys to values using hash functions.',
  },
  {
    id: 'binary-search-tree',
    name: 'Binary Search Tree',
    category: 'Data Structures',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Hierarchical node-based data structure where each node has at most two children in sorted order.',
  },
  {
    id: 'heap',
    name: 'Heap',
    category: 'Data Structures',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Specialized tree-based data structure satisfying the heap property (min-heap / max-heap).',
  },
  {
    id: 'trie',
    name: 'Trie',
    category: 'Data Structures',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Digital tree / radix tree used to store associative arrays where keys are strings.',
  },
  {
    id: 'lru-cache',
    name: 'LRU Cache',
    category: 'Data Structures',
    difficulty: 'advanced',
    visualization: 'concept',
    description: 'Least Recently Used cache eviction strategy combining a Hash Map and Doubly Linked List.',
  },
  // Sorting
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'easy',
    visualization: 'array',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if in wrong order.',
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    difficulty: 'easy',
    visualization: 'array',
    description: 'Divides input into sorted and unsorted regions, repeatedly selecting the smallest element.',
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    difficulty: 'easy',
    visualization: 'array',
    description: 'Builds the final sorted array one item at a time by inserting elements into their correct position.',
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Divide-and-conquer algorithm that partitions an array around a chosen pivot element.',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Efficient, general-purpose, divide-and-conquer comparison-based sorting algorithm.',
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Comparison-based sorting technique based on Binary Heap data structure.',
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Non-comparison sorting algorithm that counts occurrences of each distinct element.',
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Non-comparative integer sorting algorithm sorting digit by digit.',
  },
  {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Generalized insertion sort allowing exchange of far-apart items via gap sequences.',
  },
  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'Sorting',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Distributes elements into buckets, sorts individual buckets, and concatenates.',
  },
  // Searching
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    difficulty: 'easy',
    visualization: 'array',
    description: 'Efficient search algorithm finding position in sorted array by halving search intervals.',
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    difficulty: 'easy',
    visualization: 'array',
    description: 'Sequential check of each element until a match is found or end of list reached.',
  },
  {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'Searching',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Searches sorted arrays by jumping fixed steps forward then linear searching backward.',
  },
  {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'Searching',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Searches uniformly distributed sorted arrays based on probing key value estimation.',
  },
  // Graphs
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graphs',
    difficulty: 'intermediate',
    visualization: 'graph',
    description: 'Traverses or searches tree or graph data structures exploring nearest neighbor nodes first.',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graphs',
    difficulty: 'intermediate',
    visualization: 'graph',
    description: 'Explores as far as possible along each branch before backtracking.',
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graphs',
    difficulty: 'advanced',
    visualization: 'graph',
    description: 'Finds the shortest paths between nodes in a weighted graph with non-negative edge weights.',
  },
  {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'Graphs',
    difficulty: 'advanced',
    visualization: 'graph',
    description: 'Greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.',
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    category: 'Graphs',
    difficulty: 'advanced',
    visualization: 'graph',
    description: 'Linear ordering of vertices in directed acyclic graphs such that every edge points forward.',
  },
  // Dynamic Programming
  {
    id: 'fibonacci-dp',
    name: 'Fibonacci DP',
    category: 'Dynamic Programming',
    difficulty: 'intermediate',
    visualization: 'array',
    description: 'Calculates Fibonacci numbers using bottom-up tabulation to eliminate exponential overlap.',
  },
  {
    id: 'knapsack',
    name: 'Knapsack 0/1',
    category: 'Dynamic Programming',
    difficulty: 'advanced',
    visualization: 'matrix',
    description: 'Determines the number of items to include in a collection so total weight is under limit.',
  },
  {
    id: 'lcs',
    name: 'Longest Common Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'advanced',
    visualization: 'matrix',
    description: 'Finds the longest subsequence common to two sequences using 2D grid dynamic programming.',
  },
  // Backtracking
  {
    id: 'n-queens',
    name: 'N-Queens Problem',
    category: 'Backtracking',
    difficulty: 'advanced',
    visualization: 'matrix',
    description: 'Places N non-attacking chess queens on an N×N chessboard using recursive backtracking.',
  },
  {
    id: 'sudoku-solver',
    name: 'Sudoku Solver',
    category: 'Backtracking',
    difficulty: 'advanced',
    visualization: 'matrix',
    description: 'Fills a 9x9 grid with digits according to constraints using depth-first search & pruning.',
  },
  {
    id: 'maze-pathfinding',
    name: 'Maze Pathfinding',
    category: 'Backtracking',
    difficulty: 'intermediate',
    visualization: 'matrix',
    description: 'Finds a traversable path from entrance to exit through a grid labyrinth.',
  },
  // Divide and Conquer
  {
    id: 'tower-of-hanoi',
    name: 'Tower of Hanoi',
    category: 'Divide and Conquer',
    difficulty: 'intermediate',
    visualization: 'matrix',
    description: 'Mathematical game moving disks between three rods obeying size ordering rules.',
  },
  // Math
  {
    id: 'euclidean',
    name: 'Euclidean Algorithm',
    category: 'Math',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Efficient method for computing the greatest common divisor (GCD) of two integers.',
  },
  {
    id: 'sieve-of-eratosthenes',
    name: 'Sieve of Eratosthenes',
    category: 'Math',
    difficulty: 'intermediate',
    visualization: 'matrix',
    description: 'Ancient algorithm for finding all prime numbers up to any given limit.',
  },
  // Compression
  {
    id: 'run-length-encoding',
    name: 'Run-Length Encoding',
    category: 'Compression',
    difficulty: 'easy',
    visualization: 'concept',
    description: 'Lossless data compression where runs of consecutive data values are stored as single counts.',
  },
  {
    id: 'lz77',
    name: 'LZ77',
    category: 'Compression',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Sliding-window dictionary compression replacing repeated occurrences with back-references.',
  },
  {
    id: 'lzw',
    name: 'LZW',
    category: 'Compression',
    difficulty: 'intermediate',
    visualization: 'concept',
    description: 'Dictionary-based lossless compression building a table of character strings dynamically.',
  },
  {
    id: 'huffman-coding',
    name: 'Huffman Coding',
    category: 'Compression',
    difficulty: 'advanced',
    visualization: 'concept',
    description: 'Prefix coding algorithm assigning variable-length codes based on character frequencies.',
  },
  {
    id: 'deflate',
    name: 'DEFLATE',
    category: 'Compression',
    difficulty: 'advanced',
    visualization: 'concept',
    description: 'Combines LZ77 sliding window encoding and Huffman coding (used in GZIP and PNG).',
  },
  {
    id: 'brotli',
    name: 'Brotli',
    category: 'Compression',
    difficulty: 'advanced',
    visualization: 'concept',
    description: 'Modern compression algorithm using 2nd-order context modeling, static dictionaries, and LZ77.',
  },
]

export const CATEGORY_ORDER = [
  'Concepts',
  'Data Structures',
  'Sorting',
  'Searching',
  'Graphs',
  'Dynamic Programming',
  'Backtracking',
  'Divide and Conquer',
  'Math',
  'Compression',
] as const

export const catalogCategories: CategorySummary[] = CATEGORY_ORDER.map((name) => ({
  name,
  algorithms: algorithmCatalog.filter((a) => a.category === name),
}))

export function getCatalogEntry(id: string): AlgorithmSummary | undefined {
  return algorithmCatalog.find((a) => a.id === id)
}

export function isKnownAlgorithmId(id: string): boolean {
  return algorithmCatalog.some((a) => a.id === id)
}

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

    // Try to load detailed description and multi-language implementations lazily
    try {
      const descMod = await import(`./descriptions/${id}`).catch(() => null)
      if (descMod?.default?.en) {
        algo.description = descMod.default.en
      }
    } catch {
      // description is optional
    }

    // Load multi-language packs in parallel
    const [py, java, cpp, rust] = await Promise.all([
      loadLanguageImplementation(id, 'python').catch(() => undefined),
      loadLanguageImplementation(id, 'java').catch(() => undefined),
      loadLanguageImplementation(id, 'cpp').catch(() => undefined),
      loadLanguageImplementation(id, 'rust').catch(() => undefined),
    ])

    algo.implementations = {
      python: py,
      java: java,
      cpp: cpp,
      rust: rust,
    }

    return algo
  })

  algorithmCache.set(id, promise)
  return promise
}

export async function loadLanguageImplementation(
  algorithmId: string,
  language: Exclude<CodeLanguage, 'javascript'>,
): Promise<CodeImplementation | undefined> {
  const summary = getCatalogEntry(algorithmId)
  if (!summary) return undefined

  const groupMap: Record<string, string> = {
    Concepts: 'concepts',
    'Data Structures': 'data-structures',
    Sorting: 'sorting',
    Searching: 'searching',
    Graphs: 'graphs',
    'Dynamic Programming': 'dynamic-programming',
    Backtracking: 'backtracking',
    'Divide and Conquer': 'divide-and-conquer',
    Math: 'math',
    Compression: 'compression',
  }

  const group = groupMap[summary.category]
  if (!group) return undefined

  try {
    const mod = await import(`./definitions/${language}/${group}`)
    if (mod?.loadImplementation) {
      return mod.loadImplementation(algorithmId)
    }
  } catch {
    return undefined
  }
  return undefined
}

const description = `Heap (Min Heap)

A Heap is a complete binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. It's stored as an array.

Array-to-tree mapping (0-indexed):
  Parent of i:      Math.floor((i - 1) / 2)
  Left child of i:  2 * i + 1
  Right child of i: 2 * i + 2

Operations:
  insert:     add at end, bubble up   — O(log n)
  extractMin: remove root, bubble down — O(log n)
  peek:       return root             — O(1)

Applications:
  - Priority queues
  - Heap Sort
  - Dijkstra's algorithm
  - Finding k-th smallest/largest`

export default description

---
id: heap
title: "Heap"
category: "Data Structures"
difficulty: intermediate
visualization: concept
description: "Specialized tree-based data structure satisfying the heap property (min-heap / max-heap)."
runtime: heap
---

# Heap

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
  - Finding k-th smallest/largest

```js
class MinHeap {
  constructor() { this.heap = []; }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] =
        [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  bubbleDown(i) {
    while (2 * i + 1 < this.heap.length) {
      let smallest = 2 * i + 1;
      const right = smallest + 1;
      if (right < this.heap.length &&
          this.heap[right] < this.heap[smallest])
        smallest = right;
      if (this.heap[i] <= this.heap[smallest]) break;
      [this.heap[i], this.heap[smallest]] =
        [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}
```

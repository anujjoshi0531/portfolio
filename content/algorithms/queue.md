---
id: queue
title: "Queue"
category: "Data Structures"
difficulty: easy
visualization: concept
description: "First-In-First-Out (FIFO) collection supporting enqueue and dequeue operations."
runtime: queue
---

# Queue

A Queue is a linear data structure that follows the FIFO principle — First In, First Out. Like a line at a store: the first person in line is served first.

Operations:
  enqueue(item) — add to back       O(1)
  dequeue()     — remove from front  O(1)
  front()       — view front         O(1)
  isEmpty()     — check if empty     O(1)

Applications:
  - Task scheduling (CPU, printer)
  - Breadth-First Search (BFS)
  - Message buffers and event queues
  - Rate limiting
  - Order processing systems

Space Complexity: O(n) for n elements

```js
class Queue {
  constructor() { this.items = []; }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  get size() {
    return this.items.length;
  }
}
```

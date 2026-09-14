const description = `Queue

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

Space Complexity: O(n) for n elements`

export default description

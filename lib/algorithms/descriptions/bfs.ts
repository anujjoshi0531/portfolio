const description = `Breadth-First Search (BFS)

BFS is a graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level. It uses a queue data structure.

How it works:
1. Start from a source node, mark it as visited, add to queue
2. Dequeue a node, process it
3. Enqueue all unvisited neighbors
4. Repeat until the queue is empty

Time Complexity: O(V + E)
  V = number of vertices, E = number of edges

Space Complexity: O(V) — for the queue and visited set

Applications:
  - Shortest path in unweighted graphs
  - Level-order traversal of trees
  - Finding connected components
  - Web crawling
  - Social network analysis (degrees of separation)

BFS guarantees finding the shortest path (fewest edges) between two nodes in an unweighted graph.`

export default description

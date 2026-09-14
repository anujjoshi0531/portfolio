const description = `Depth-First Search (DFS)

DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion).

How it works:
1. Start from a source node, mark it as visited
2. Recursively visit each unvisited neighbor
3. Backtrack when no unvisited neighbors remain
4. Continue until all reachable nodes are visited

Time Complexity: O(V + E)
  V = number of vertices, E = number of edges

Space Complexity: O(V) — for the recursion stack and visited set

Applications:
  - Detecting cycles in graphs
  - Topological sorting
  - Finding connected components
  - Solving mazes and puzzles
  - Path finding

DFS explores deep paths first, which makes it useful for topological sorting and cycle detection, but it doesn't guarantee shortest paths.`

export default description

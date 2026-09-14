const description = `Maze Pathfinding (BFS)

This algorithm uses Breadth-First Search to find the shortest path through a maze from start to finish, navigating around walls.

How it works:
1. Start BFS from the starting cell
2. Explore all 4 neighbors (up, down, left, right)
3. Skip walls and already-visited cells
4. Mark each explored cell and record its parent
5. When the end is reached, trace back through parents to find the path

Time Complexity: O(rows × cols)
Space Complexity: O(rows × cols)

Properties:
  - Guarantees the shortest path
  - Explores level by level (nearest cells first)
  - Works on unweighted grids

BFS-based pathfinding is fundamental in game development, robotics, and navigation systems. For weighted grids, Dijkstra's or A* would be used instead.`

export default description

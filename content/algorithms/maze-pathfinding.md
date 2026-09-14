---
id: maze-pathfinding
title: "Maze Pathfinding"
category: "Backtracking"
difficulty: intermediate
visualization: matrix
description: "Finds a traversable path from entrance to exit through a grid labyrinth."
runtime: maze-pathfinding
---

# Maze Pathfinding

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

BFS-based pathfinding is fundamental in game development, robotics, and navigation systems. For weighted grids, Dijkstra's or A* would be used instead.

```js
function mazeBFS(maze, start, end) {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited = Array(rows).fill(null)
    .map(() => Array(cols).fill(false));
  const parent = Array(rows).fill(null)
    .map(() => Array(cols).fill(null));

  const queue = [start];
  visited[start[0]][start[1]] = true;
  const dirs = [[0,1],[1,0],[0,-1],[-1,0]];

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (r === end[0] && c === end[1]) {
      // Reconstruct path
      const path = [];
      let curr = end;
      while (curr) {
        path.unshift(curr);
        curr = parent[curr[0]][curr[1]];
      }
      return path;
    }

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 &&
          nc < cols && !visited[nr][nc] &&
          maze[nr][nc] === 0) {
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        queue.push([nr, nc]);
      }
    }
  }

  return null; // No path found
}
```

```python
def maze_bfs(maze, start, end):
    rows = len(maze)
    cols = len(maze[0])
    visited = [[False] * cols for _ in range(rows)]
    parent = [[None] * cols for _ in range(rows)]

    queue = [start]
    visited[start[0]][start[1]] = True
    dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

    while len(queue) > 0:
        r, c = queue.pop(0)

        if r == end[0] and c == end[1]:
            # Reconstruct path
            path = []
            curr = end
            while curr:
                path.insert(0, curr)
                curr = parent[curr[0]][curr[1]]
            return path

        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if (nr >= 0 and nr < rows and nc >= 0 and
                    nc < cols and not visited[nr][nc] and
                    maze[nr][nc] == 0):
                visited[nr][nc] = True
                parent[nr][nc] = [r, c]
                queue.append([nr, nc])

    return None  # No path found
```

```java
List<int[]> mazeBfs(int[][] maze, int[] start, int[] end) {
    int rows = maze.length;
    int cols = maze[0].length;
    boolean[][] visited = new boolean[rows][cols];
    int[][][] parent = new int[rows][cols][];

    Queue<int[]> queue = new LinkedList<>();
    queue.add(start);
    visited[start[0]][start[1]] = true;
    int[][] dirs = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        int r = cell[0], c = cell[1];

        if (r == end[0] && c == end[1]) {
            // Reconstruct path
            List<int[]> path = new ArrayList<>();
            int[] curr = end;
            while (curr != null) {
                path.add(0, curr);
                curr = parent[curr[0]][curr[1]];
            }
            return path;
        }

        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                    && !visited[nr][nc] && maze[nr][nc] == 0) {
                visited[nr][nc] = true;
                parent[nr][nc] = new int[]{r, c};
                queue.add(new int[]{nr, nc});
            }
        }
    }

    return null; // No path found
}
```

```cpp
vector<pair<int, int>> mazeBfs(
    vector<vector<int>>& maze,
    pair<int, int> start,
    pair<int, int> end
) {
    int rows = maze.size();
    int cols = maze[0].size();
    vector<vector<bool>> visited(rows, vector<bool>(cols, false));
    vector<vector<pair<int, int>>> parent(rows, vector<pair<int, int>>(cols, {-1, -1}));

    queue<pair<int, int>> q;
    q.push(start);
    visited[start.first][start.second] = true;
    int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();

        if (r == end.first && c == end.second) {
            // Reconstruct path
            vector<pair<int, int>> path;
            pair<int, int> curr = end;
            while (curr.first != -1) {
                path.insert(path.begin(), curr);
                curr = parent[curr.first][curr.second];
            }
            return path;
        }

        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                    && !visited[nr][nc] && maze[nr][nc] == 0) {
                visited[nr][nc] = true;
                parent[nr][nc] = {r, c};
                q.push({nr, nc});
            }
        }
    }

    return {}; // No path found
}
```

```rust
use std::collections::VecDeque;

fn maze_bfs(
    maze: &[Vec<i32>],
    start: (usize, usize),
    end: (usize, usize),
) -> Option<Vec<(usize, usize)>> {
    let rows = maze.len();
    let cols = maze[0].len();
    let mut visited = vec![vec![false; cols]; rows];
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; cols]; rows];

    let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
    queue.push_back(start);
    visited[start.0][start.1] = true;
    let dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)];

    while let Some((r, c)) = queue.pop_front() {
        if (r, c) == end {
            // Reconstruct path
            let mut path = Vec::new();
            let mut curr = Some(end);
            while let Some(cell) = curr {
                path.insert(0, cell);
                curr = parent[cell.0][cell.1];
            }
            return Some(path);
        }

        for (dr, dc) in dirs {
            let nr = r as i32 + dr;
            let nc = c as i32 + dc;
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                let (nr, nc) = (nr as usize, nc as usize);
                if !visited[nr][nc] && maze[nr][nc] == 0 {
                    visited[nr][nc] = true;
                    parent[nr][nc] = Some((r, c));
                    queue.push_back((nr, nc));
                }
            }
        }
    }

    None // No path found
}
```

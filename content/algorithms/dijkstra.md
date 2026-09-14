---
id: dijkstra
title: "Dijkstra's Algorithm"
category: "Graphs"
difficulty: advanced
visualization: graph
description: "Finds the shortest paths between nodes in a weighted graph with non-negative edge weights."
runtime: dijkstra
---

# Dijkstra's Algorithm

Dijkstra's Algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.

How it works:
1. Initialize distances: source = 0, all others = ∞
2. Mark all nodes as unvisited
3. Pick the unvisited node with the smallest distance
4. For each unvisited neighbor, calculate the tentative distance
5. If the new distance is smaller, update it
6. Mark the current node as visited
7. Repeat until all nodes are visited

Time Complexity:
  O(V²) with simple array
  O((V + E) log V) with min-heap

Space Complexity: O(V)

Applications:
  - GPS navigation and route planning
  - Network routing protocols (OSPF)
  - Finding shortest paths in maps
  - Social network analysis

Dijkstra's Algorithm is one of the most important graph algorithms. It guarantees optimal solutions for graphs with non-negative weights.

```js
function dijkstra(graph, start) {
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[start] = 0;

  for (let i = 0; i < n; i++) {
    // Pick unvisited node with minimum distance
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || dist[v] < dist[u])) {
        u = v;
      }
    }

    visited[u] = true;

    // Relax neighbors
    for (const { node: v, weight: w } of graph[u]) {
      if (!visited[v] && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  return dist;
}
```

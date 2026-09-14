---
id: prim
title: "Prim's Algorithm"
category: "Graphs"
difficulty: advanced
visualization: graph
description: "Greedy algorithm that finds a minimum spanning tree for a weighted undirected graph."
runtime: prim
---

# Prim's Algorithm

Prim's Algorithm finds a Minimum Spanning Tree (MST) for a weighted, connected, undirected graph. The MST connects all vertices with the minimum total edge weight.

How it works:
1. Start with any node as the initial tree
2. Find the minimum weight edge connecting the tree to a non-tree vertex
3. Add that edge and vertex to the tree
4. Repeat until all vertices are in the tree

Time Complexity:
  O(V²) with adjacency matrix
  O(E log V) with binary heap

Space Complexity: O(V)

Applications:
  - Network design (minimum cost wiring)
  - Approximation algorithms for NP-hard problems
  - Cluster analysis
  - Image segmentation

Prim's Algorithm is a greedy algorithm that always picks the cheapest edge to expand the tree. Compare with Kruskal's Algorithm, which sorts all edges globally.

```js
function prim(graph, start) {
  const n = graph.length;
  const key = new Array(n).fill(Infinity);
  const inMST = new Array(n).fill(false);
  const parent = new Array(n).fill(-1);
  key[start] = 0;

  for (let i = 0; i < n; i++) {
    // Pick node with minimum key not in MST
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!inMST[v] && (u === -1 || key[v] < key[u])) {
        u = v;
      }
    }

    inMST[u] = true;

    // Update neighbor keys
    for (const { node: v, weight: w } of graph[u]) {
      if (!inMST[v] && w < key[v]) {
        key[v] = w;
        parent[v] = u;
      }
    }
  }

  return parent;
}
```

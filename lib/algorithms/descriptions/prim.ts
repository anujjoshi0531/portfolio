const description = `Prim's Algorithm

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

Prim's Algorithm is a greedy algorithm that always picks the cheapest edge to expand the tree. Compare with Kruskal's Algorithm, which sorts all edges globally.`

export default description

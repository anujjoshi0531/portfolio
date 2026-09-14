---
id: topological-sort
title: "Topological Sort"
category: "Graphs"
difficulty: advanced
visualization: graph
description: "Linear ordering of vertices in directed acyclic graphs such that every edge points forward."
runtime: topological-sort
---

# Topological Sort

Topological Sort produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u → v, vertex u comes before v in the ordering.

How it works (Kahn's Algorithm - BFS-based):
1. Compute the in-degree of each vertex
2. Add all vertices with in-degree 0 to a queue
3. While the queue is not empty:
   a. Dequeue a vertex, add it to the result
   b. For each outgoing edge, decrement the neighbor's in-degree
   c. If a neighbor's in-degree becomes 0, enqueue it
4. If all vertices are processed, the result is a valid topological order

Time Complexity: O(V + E)
Space Complexity: O(V)

Applications:
  - Task scheduling with dependencies
  - Build systems (Make, Gradle)
  - Course prerequisite planning
  - Package dependency resolution

Topological Sort is only possible for DAGs (Directed Acyclic Graphs). If the graph has a cycle, no valid ordering exists.

```js
function topologicalSort(graph, numNodes) {
  const inDegree = new Array(numNodes).fill(0);

  // Compute in-degrees
  for (let u = 0; u < numNodes; u++) {
    for (const v of graph[u]) {
      inDegree[v]++;
    }
  }

  // Start with nodes of in-degree 0
  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order;
}
```

```python
def topological_sort(graph, num_nodes):
    in_degree = [0] * num_nodes

    # Compute in-degrees
    for u in range(num_nodes):
        for v in graph[u]:
            in_degree[v] += 1

    # Start with nodes of in-degree 0
    queue = []
    for i in range(num_nodes):
        if in_degree[i] == 0:
            queue.append(i)

    order = []
    while queue:
        node = queue.pop(0)
        order.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order
```

```java
List<Integer> topologicalSort(List<List<Integer>> graph, int numNodes) {
    int[] inDegree = new int[numNodes];

    // Compute in-degrees
    for (int u = 0; u < numNodes; u++) {
        for (int v : graph.get(u)) {
            inDegree[v]++;
        }
    }

    // Start with nodes of in-degree 0
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numNodes; i++) {
        if (inDegree[i] == 0) {
            queue.add(i);
        }
    }

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);

        for (int neighbor : graph.get(node)) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                queue.add(neighbor);
            }
        }
    }

    return order;
}
```

```cpp
vector<int> topologicalSort(vector<vector<int>>& graph, int numNodes) {
    vector<int> inDegree(numNodes, 0);

    // Compute in-degrees
    for (int u = 0; u < numNodes; u++) {
        for (int v : graph[u]) {
            inDegree[v]++;
        }
    }

    // Start with nodes of in-degree 0
    queue<int> q;
    for (int i = 0; i < numNodes; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }

    vector<int> order;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);

        for (int neighbor : graph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    return order;
}
```

```rust
fn topological_sort(graph: &[Vec<usize>], num_nodes: usize) -> Vec<usize> {
    let mut in_degree = vec![0usize; num_nodes];

    // Compute in-degrees
    for u in 0..num_nodes {
        for &v in &graph[u] {
            in_degree[v] += 1;
        }
    }

    // Start with nodes of in-degree 0
    let mut queue: VecDeque<usize> = VecDeque::new();
    for i in 0..num_nodes {
        if in_degree[i] == 0 {
            queue.push_back(i);
        }
    }

    let mut order: Vec<usize> = Vec::new();
    while let Some(node) = queue.pop_front() {
        order.push(node);

        for &neighbor in &graph[node] {
            in_degree[neighbor] -= 1;
            if in_degree[neighbor] == 0 {
                queue.push_back(neighbor);
            }
        }
    }

    order
}
```

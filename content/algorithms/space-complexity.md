---
id: space-complexity
title: "Space Complexity"
category: "Concepts"
difficulty: easy
visualization: concept
description: "Visualize memory consumption and call-stack growth during execution."
runtime: space-complexity
---

# Space Complexity

Space Complexity measures the amount of memory an algorithm uses relative to the input size. Like time complexity, we use Big O notation.

Common space complexities:
  O(1)     — Constant: fixed number of variables
  O(log n) — Logarithmic: recursive call stack depth
  O(n)     — Linear: one copy of the input
  O(n²)    — Quadratic: 2D matrix of input size

Important distinction:
  - Auxiliary space: extra memory beyond the input
  - Total space: input + auxiliary

Examples:
  O(1): in-place sorting (Bubble Sort), variable swaps
  O(log n): recursive binary search (call stack)
  O(n): Merge Sort (temporary arrays), hash tables
  O(n²): DP tables, adjacency matrices

```js
// O(1) space — fixed variables
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// O(log n) space — recursive call stack
function binarySearch(arr, target, lo, hi) {
  if (lo > hi) return -1;
  const mid = Math.floor((lo + hi) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearch(arr, target, mid + 1, hi);
  return binarySearch(arr, target, lo, mid - 1);
}

// O(n) space — copy of input
function reversed(arr) {
  const copy = [...arr]; // allocates n elements
  return copy.reverse();
}

// O(n²) space — 2D matrix
function createMatrix(n) {
  return Array.from({ length: n },
    () => new Array(n).fill(0));
}
```

```python
# O(1) space — fixed variables
def swap(arr, i, j):
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp

# O(log n) space — recursive call stack
def binary_search(arr, target, lo, hi):
    if lo > hi:
        return -1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search(arr, target, mid + 1, hi)
    return binary_search(arr, target, lo, mid - 1)

# O(n) space — copy of input
def reverse_copy(arr):
    copy = list(arr)  # allocates n elements
    copy.reverse()
    return copy

# O(n²) space — 2D matrix
def create_matrix(n):
    return [[0] * n for _ in range(n)]
```

```java
// O(1) space — fixed variables
void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// O(log n) space — recursive call stack
int binarySearch(int[] arr, int target, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = (lo + hi) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, hi);
    }
    return binarySearch(arr, target, lo, mid - 1);
}

// O(n) space — copy of input
int[] reverseCopy(int[] arr) {
    int[] copy = Arrays.copyOf(arr, arr.length); // allocates n elements
    // reverse in place on the copy
    for (int i = 0, j = copy.length - 1; i < j; i++, j--) {
        int t = copy[i]; copy[i] = copy[j]; copy[j] = t;
    }
    return copy;
}

// O(n²) space — 2D matrix
int[][] createMatrix(int n) {
    return new int[n][n];
}
```

```cpp
// O(1) space — fixed variables
void swap(vector<int>& arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// O(log n) space — recursive call stack
int binarySearch(const vector<int>& arr, int target, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = (lo + hi) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, hi);
    }
    return binarySearch(arr, target, lo, mid - 1);
}

// O(n) space — copy of input
vector<int> reverseCopy(const vector<int>& arr) {
    vector<int> copy = arr; // allocates n elements
    reverse(copy.begin(), copy.end());
    return copy;
}

// O(n²) space — 2D matrix
vector<vector<int>> createMatrix(int n) {
    return vector<vector<int>>(n, vector<int>(n, 0));
}
```

```rust
// O(1) space — fixed variables
fn swap(arr: &mut [i32], i: usize, j: usize) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// O(log n) space — recursive call stack
fn binary_search(arr: &[i32], target: i32, lo: usize, hi: usize) -> Option<usize> {
    if lo >= hi {
        return None;
    }
    let mid = lo + (hi - lo) / 2;
    if arr[mid] == target {
        return Some(mid);
    }
    if arr[mid] < target {
        return binary_search(arr, target, mid + 1, hi);
    }
    binary_search(arr, target, lo, mid)
}

// O(n) space — copy of input
fn reverse_copy(arr: &[i32]) -> Vec<i32> {
    let mut copy = arr.to_vec(); // allocates n elements
    copy.reverse();
    copy
}

// O(n²) space — 2D matrix
fn create_matrix(n: usize) -> Vec<Vec<i32>> {
    vec![vec![0; n]; n]
}
```

const description = `Space Complexity

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
  O(n²): DP tables, adjacency matrices`

export default description

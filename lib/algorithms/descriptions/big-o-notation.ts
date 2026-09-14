const description = `Big O Notation

Big O Notation describes how an algorithm's running time or space requirements grow relative to the input size. It focuses on the worst-case scenario and ignores constants and lower-order terms.

Common complexities (fastest to slowest):
  O(1)       — Constant: same time regardless of input size
  O(log n)   — Logarithmic: halves the problem each step (binary search)
  O(n)       — Linear: processes each element once
  O(n log n) — Linearithmic: efficient sorting (Merge Sort, Quick Sort)
  O(n²)      — Quadratic: nested loops (Bubble Sort, brute force)
  O(2^n)     — Exponential: doubles with each new element
  O(n!)      — Factorial: all permutations

Why it matters:
  For n = 1,000: O(n) = 1,000 operations, O(n²) = 1,000,000 operations
  Choosing the right algorithm can mean seconds vs. hours of computation.

Rules of Big O:
  1. Drop constants: O(2n) → O(n)
  2. Drop lower-order terms: O(n² + n) → O(n²)
  3. Focus on the dominant term as n grows large`

export default description

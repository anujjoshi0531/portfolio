const description = `Memoization

Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.

Without memoization (Fibonacci):
  fib(5) calls fib(4) + fib(3)
  fib(4) calls fib(3) + fib(2) — fib(3) computed AGAIN!
  Exponential: O(2^n) time

With memoization:
  Each value is computed ONCE and cached
  Subsequent calls with the same input return instantly
  Linear: O(n) time, O(n) space

Key insight: trade space for time
  - Store results in a dictionary/array
  - Before computing, check if result exists
  - Dramatic speedup for overlapping subproblems`

export default description

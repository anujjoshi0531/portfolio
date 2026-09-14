---
id: memoization
title: "Memoization"
category: "Concepts"
difficulty: intermediate
visualization: concept
description: "Top-down caching optimization to store results of expensive function calls."
runtime: memoization
---

# Memoization

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
  - Dramatic speedup for overlapping subproblems

```js
// Without memoization — O(2^n) time!
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// With memoization — O(n) time!
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n]; // cache hit!
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo)
           + fibMemo(n - 2, memo);
  return memo[n];
}

// fibMemo(7):
// Only computes each value ONCE
// Then reuses cached results
```

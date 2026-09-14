---
id: recursion
title: "Recursion"
category: "Concepts"
difficulty: easy
visualization: concept
description: "A method where the solution depends on solutions to smaller instances of the same problem."
runtime: recursion
---

# Recursion

Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It's one of the most powerful concepts in computer science.

Every recursive function needs two parts:
  1. Base case — the condition that stops the recursion
  2. Recursive case — the function calls itself with a smaller input

How the call stack works:
  - Each function call is pushed onto the call stack
  - When a base case is reached, results propagate back up
  - The stack unwinds as each call returns its result

Common patterns:
  - Factorial: n! = n × (n-1)!
  - Fibonacci: F(n) = F(n-1) + F(n-2)
  - Tree traversals: process node, then recurse on children
  - Divide and conquer: split problem, solve halves, combine

Pitfalls:
  - Stack overflow: too many recursive calls exhaust memory
  - Redundant computation: naive recursion can be exponential
  - Solution: use memoization or convert to iteration

Recursive algorithms in this visualizer:
  Quick Sort, Merge Sort, DFS, N-Queens, Sudoku Solver, Tower of Hanoi

```js
function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n <= 1) return 1;

  // Recursive case: n * factorial(n - 1)
  return n * factorial(n - 1);
}

// factorial(5) unfolds as:
// 5 * factorial(4)
//   4 * factorial(3)
//     3 * factorial(2)
//       2 * factorial(1)
//         → 1 (base case)
//       → 2 * 1 = 2
//     → 3 * 2 = 6
//   → 4 * 6 = 24
// → 5 * 24 = 120
```

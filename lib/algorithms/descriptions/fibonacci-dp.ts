const description = `Fibonacci (Dynamic Programming)

The Fibonacci sequence is a classic example of dynamic programming. Each number is the sum of the two preceding ones: F(n) = F(n-1) + F(n-2).

How it works (Bottom-Up Tabulation):
1. Create a table to store computed values
2. Set base cases: F(0) = 0, F(1) = 1
3. Fill the table iteratively: F(i) = F(i-1) + F(i-2)
4. Return F(n)

Time Complexity: O(n)
Space Complexity: O(n) — can be optimized to O(1)

Comparison:
  - Naive recursion: O(2^n) — exponential
  - Memoization (top-down): O(n)
  - Tabulation (bottom-up): O(n)

Dynamic Programming avoids redundant computation by storing previously computed results. Fibonacci is the simplest illustration of this technique.`

export default description

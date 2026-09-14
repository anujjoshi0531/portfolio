const description = `0/1 Knapsack Problem

The 0/1 Knapsack Problem: given items with weights and values, and a maximum capacity, find the maximum value that can be carried without exceeding the capacity. Each item can be taken at most once.

How it works (Bottom-Up DP):
1. Create a 2D table: dp[i][w] = max value using first i items with capacity w
2. For each item i and capacity w:
   - If item doesn't fit: dp[i][w] = dp[i-1][w]
   - If item fits: dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
3. dp[n][W] contains the optimal value

Time Complexity: O(n × W) — pseudo-polynomial
Space Complexity: O(n × W) — can be optimized to O(W)

Applications:
  - Resource allocation
  - Budget planning
  - Cargo loading
  - Cryptography

The Knapsack Problem is one of the fundamental problems in combinatorial optimization and is NP-hard in general.`

export default description

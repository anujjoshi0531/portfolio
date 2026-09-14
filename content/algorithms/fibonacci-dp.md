---
id: fibonacci-dp
title: "Fibonacci DP"
category: "Dynamic Programming"
difficulty: intermediate
visualization: array
description: "Calculates Fibonacci numbers using bottom-up tabulation to eliminate exponential overlap."
runtime: fibonacci-dp
---

# Fibonacci DP

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

Dynamic Programming avoids redundant computation by storing previously computed results. Fibonacci is the simplest illustration of this technique.

```js
function fibonacci(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp;
}
```

```python
def fibonacci(n):
    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp
```

```java
int[] fibonacci(int n) {
    int[] dp = new int[n + 1];
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp;
}
```

```cpp
vector<int> fibonacci(int n) {
    vector<int> dp(n + 1, 0);
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp;
}
```

```rust
fn fibonacci(n: usize) -> Vec<u64> {
    let mut dp = vec![0; n + 1];
    dp[1] = 1;

    for i in 2..=n {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    dp
}
```

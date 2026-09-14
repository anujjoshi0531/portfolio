---
id: greedy-vs-dp
title: "Greedy vs DP"
category: "Concepts"
difficulty: advanced
visualization: concept
description: "Compare local optimal choices (greedy) against globally optimal subproblems (dynamic programming)."
runtime: greedy-vs-dp
---

# Greedy vs DP

Both Greedy and DP solve optimization problems, but they differ fundamentally:

Greedy:
  - Makes the locally optimal choice at each step
  - Fast: usually O(n log n) or O(n)
  - Does NOT always find the global optimum
  - Works when the "greedy choice property" holds

Dynamic Programming:
  - Considers ALL possible choices
  - Finds the globally optimal solution — always
  - Slower: usually O(n × m) time and space
  - Works for problems with overlapping subproblems

Example — Coin Change with coins [1, 4, 6], amount 8:
  Greedy picks 6+1+1 = 3 coins (suboptimal!)
  DP finds 4+4 = 2 coins (optimal!)

```js
// GREEDY: always pick the largest coin first
function greedyCoinChange(coins, amount) {
  coins.sort((a, b) => b - a); // largest first
  const result = [];
  for (const coin of coins) {
    while (amount >= coin) {
      result.push(coin);
      amount -= coin;
    }
  }
  return amount === 0 ? result : null;
}

// DP: find the optimal solution
function dpCoinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  const used = Array(amount + 1).fill(-1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        used[i] = coin;
      }
    }
  }
  // Reconstruct solution
  const result = [];
  let rem = amount;
  while (rem > 0) { result.push(used[rem]); rem -= used[rem]; }
  return result;
}
```

```python
# GREEDY: always pick the largest coin first
def greedy_coin_change(coins, amount):
    coins.sort(reverse=True)  # largest first
    result = []
    for coin in coins:
        while amount >= coin:
            result.append(coin)
            amount -= coin
    return result if amount == 0 else None

# DP: find the optimal solution
def dp_coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    used = [-1] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                used[i] = coin
    # Reconstruct solution
    result = []
    rem = amount
    while rem > 0:
        result.append(used[rem])
        rem -= used[rem]
    return result
```

```java
// GREEDY: always pick the largest coin first
List<Integer> greedyCoinChange(int[] coins, int amount) {
    Arrays.sort(coins); // sort ascending, then reverse walk
    List<Integer> result = new ArrayList<>();
    for (int i = coins.length - 1; i >= 0; i--) {
        while (amount >= coins[i]) {
            result.add(coins[i]);
            amount -= coins[i];
        }
    }
    return amount == 0 ? result : null;
}

// DP: find the optimal solution
List<Integer> dpCoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    int[] used = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE / 2);
    Arrays.fill(used, -1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                used[i] = coin;
            }
        }
    }
    // Reconstruct solution
    List<Integer> result = new ArrayList<>();
    int rem = amount;
    while (rem > 0) {
        result.add(used[rem]);
        rem -= used[rem];
    }
    return result;
}
```

```cpp
// GREEDY: always pick the largest coin first
optional<vector<int>> greedyCoinChange(vector<int> coins, int amount) {
    sort(coins.rbegin(), coins.rend()); // largest first
    vector<int> result;
    for (int coin : coins) {
        while (amount >= coin) {
            result.push_back(coin);
            amount -= coin;
        }
    }
    return amount == 0 ? optional(result) : nullopt;
}

// DP: find the optimal solution
vector<int> dpCoinChange(const vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX / 2);
    vector<int> used(amount + 1, -1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                used[i] = coin;
            }
        }
    }
    // Reconstruct solution
    vector<int> result;
    int rem = amount;
    while (rem > 0) {
        result.push_back(used[rem]);
        rem -= used[rem];
    }
    return result;
}
```

```rust
// GREEDY: always pick the largest coin first
fn greedy_coin_change(coins: &[usize], mut amount: usize) -> Option<Vec<usize>> {
    let mut sorted = coins.to_vec();
    sorted.sort_by(|a, b| b.cmp(a)); // largest first
    let mut result = Vec::new();
    for coin in sorted {
        while amount >= coin {
            result.push(coin);
            amount -= coin;
        }
    }
    if amount == 0 { Some(result) } else { None }
}

// DP: find the optimal solution
fn dp_coin_change(coins: &[usize], amount: usize) -> Vec<usize> {
    let mut dp = vec![usize::MAX / 2; amount + 1];
    let mut used: Vec<Option<usize>> = vec![None; amount + 1];
    dp[0] = 0;
    for i in 1..=amount {
        for &coin in coins {
            if coin <= i && dp[i - coin] + 1 < dp[i] {
                dp[i] = dp[i - coin] + 1;
                used[i] = Some(coin);
            }
        }
    }
    // Reconstruct solution
    let mut result = Vec::new();
    let mut rem = amount;
    while let Some(coin) = used[rem] {
        result.push(coin);
        rem -= coin;
    }
    result
}
```

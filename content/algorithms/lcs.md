---
id: lcs
title: "Longest Common Subsequence"
category: "Dynamic Programming"
difficulty: advanced
visualization: matrix
description: "Finds the longest subsequence common to two sequences using 2D grid dynamic programming."
runtime: lcs
---

# Longest Common Subsequence

LCS finds the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.

How it works (Bottom-Up DP):
1. Create a 2D table: dp[i][j] = length of LCS of first i chars of X and first j chars of Y
2. If characters match: dp[i][j] = dp[i-1][j-1] + 1
3. If they don't match: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
4. dp[m][n] contains the LCS length

Time Complexity: O(m × n)
Space Complexity: O(m × n) — can be optimized to O(min(m, n))

Applications:
  - Diff tools (file comparison)
  - DNA sequence alignment
  - Version control systems
  - Spell checking

LCS is a fundamental problem in bioinformatics and text processing. It generalizes to the edit distance problem.

```js
function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

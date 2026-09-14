const description = `Longest Common Subsequence (LCS)

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

LCS is a fundamental problem in bioinformatics and text processing. It generalizes to the edit distance problem.`

export default description

const description = `Sliding Window

Sliding Window maintains a dynamic range (window) over a sequence, expanding and contracting to solve substring/subarray problems efficiently.

How it works:
1. Expand the window by moving the right pointer
2. If a condition is violated, shrink from the left
3. Track the best result seen so far

Time Complexity: O(n) — each character is visited at most twice
Space Complexity: O(min(n, alphabet))

Classic problems:
  - Longest substring without repeating chars
  - Minimum window substring
  - Maximum sum subarray of size k
  - Longest repeating character replacement`

export default description

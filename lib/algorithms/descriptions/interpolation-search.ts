const description = `Interpolation Search

Interpolation Search is an improved variant of Binary Search for uniformly distributed sorted data. Instead of always going to the middle, it estimates the position of the target based on its value.

How it works:
1. Estimate position: pos = low + ((target - arr[low]) × (high - low)) / (arr[high] - arr[low])
2. If arr[pos] equals target, return pos
3. If arr[pos] < target, search right portion
4. If arr[pos] > target, search left portion

Time Complexity:
  Best:    O(1)
  Average: O(log log n) — for uniform distribution
  Worst:   O(n) — for non-uniform distribution

Space Complexity: O(1)

Properties:
  - Requires sorted array
  - Best for uniformly distributed data
  - Can degrade to O(n) for skewed distributions

Interpolation Search can be significantly faster than Binary Search when data is uniformly distributed, as it makes better guesses about where the target might be.`

export default description

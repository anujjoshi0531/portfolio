const description = `Bucket Sort

Bucket Sort is a distribution-based sorting algorithm that works by partitioning an array into a number of buckets. Each bucket is then sorted individually using another sorting algorithm or recursively applying the bucket sort.

How it works:
1. Find the range (min/max) to determine bucket indices
2. Create empty buckets based on a fixed size (e.g., 10 or 20)
3. Distribute elements into buckets: index = floor((value - min) / size)
4. Sort each non-empty bucket using Insertion Sort
5. Collect elements from sorted buckets back into the main array

Time Complexity:
  Best:    O(n + k) — uniform distribution
  Average: O(n + k)
  Worst:   O(n²) — all elements fall into one bucket

Space Complexity: O(n + k) — extra space for buckets

Properties:
  - Stable sort (if underlying sort is stable)
  - Not in-place
  - Data-distribution dependent`

export default description

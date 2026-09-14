const description = `Counting Sort

Counting Sort is a non-comparison-based sorting algorithm. It counts the occurrences of each value and uses arithmetic to determine positions.

How it works:
1. Find the range of input values (min to max)
2. Create a count array to store frequency of each value
3. Modify count array to store cumulative counts
4. Build the output array by placing elements at their correct positions

Time Complexity:
  Best:    O(n + k)
  Average: O(n + k)
  Worst:   O(n + k)
  where k is the range of input values

Space Complexity: O(n + k)

Properties:
  - Stable sort
  - Not in-place
  - Not comparison-based
  - Very efficient when k is small relative to n

Counting Sort is ideal for sorting integers within a known, small range. It's used as a subroutine in Radix Sort.`

export default description

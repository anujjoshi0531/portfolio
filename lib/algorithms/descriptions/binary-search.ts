const description = `Binary Search

Binary Search is an efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half.

Prerequisite: The array must be sorted.

How it works:
1. Compare the target with the middle element
2. If equal, we found the target
3. If target is smaller, search the left half
4. If target is larger, search the right half
5. Repeat until found or search space is empty

Time Complexity:
  Best:    O(1) — target is at the middle
  Average: O(log n)
  Worst:   O(log n)

Space Complexity: O(1) — iterative version

Binary Search is fundamental in computer science and is used extensively in databases, file systems, and as a building block for more complex algorithms.`

export default description

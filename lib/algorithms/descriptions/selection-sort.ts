const description = `Selection Sort

Selection Sort divides the array into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.

How it works:
1. Find the minimum element in the unsorted portion
2. Swap it with the first unsorted element
3. Move the boundary between sorted and unsorted one element to the right
4. Repeat until the entire array is sorted

Time Complexity:
  Best:    O(n²)
  Average: O(n²)
  Worst:   O(n²)

Space Complexity: O(1) — in-place

Properties:
  - Not stable (can change relative order of equal elements)
  - Not adaptive
  - In-place
  - Minimizes the number of swaps: O(n)

Useful when memory writes are expensive, as it performs at most O(n) swaps.`

export default description

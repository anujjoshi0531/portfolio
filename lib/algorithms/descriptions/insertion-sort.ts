const description = `Insertion Sort

Insertion Sort builds the sorted array one element at a time. It picks each element and inserts it into its correct position in the already-sorted portion of the array.

How it works:
1. Start from the second element (first element is trivially sorted)
2. Pick the current element as the "key"
3. Compare the key with elements in the sorted portion
4. Shift larger elements to the right
5. Insert the key into its correct position

Time Complexity:
  Best:    O(n) — already sorted
  Average: O(n²)
  Worst:   O(n²) — reverse sorted

Space Complexity: O(1) — in-place

Properties:
  - Stable sort
  - Adaptive (efficient for nearly sorted data)
  - In-place
  - Online (can sort as data is received)

Excellent for small datasets or nearly sorted data. Often used as the base case in hybrid sorting algorithms like Timsort.`

export default description

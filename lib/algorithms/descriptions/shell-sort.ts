const description = `Shell Sort

Shell Sort is a generalization of Insertion Sort that allows the exchange of items that are far apart. It uses a decreasing gap sequence to progressively sort the array.

How it works:
1. Start with a large gap (typically n/2)
2. Perform a gapped insertion sort for the current gap
3. Reduce the gap (typically by half)
4. Repeat until gap is 1 (final pass is a standard insertion sort)

Time Complexity:
  Best:    O(n log n)
  Average: O(n^(3/2)) — depends on gap sequence
  Worst:   O(n²) — with n/2 gap sequence

Space Complexity: O(1) — in-place

Properties:
  - Not stable
  - In-place
  - Adaptive

Shell Sort is faster than Insertion Sort for larger arrays because it moves elements closer to their final position earlier. Performance depends heavily on the gap sequence chosen.`

export default description

const description = `Heap Sort

Heap Sort uses a binary heap data structure to sort elements. It first builds a max-heap from the array, then repeatedly extracts the maximum element.

How it works:
1. Build a max-heap from the input array
2. The largest element is now at the root (index 0)
3. Swap it with the last element, reduce heap size
4. Heapify the root to restore the max-heap property
5. Repeat until the heap is empty

Time Complexity:
  Best:    O(n log n)
  Average: O(n log n)
  Worst:   O(n log n)

Space Complexity: O(1) — in-place

Properties:
  - Not stable
  - In-place
  - Guaranteed O(n log n) performance

Heap Sort combines the best of Merge Sort (guaranteed O(n log n)) and Quick Sort (in-place). Useful when worst-case performance matters.`

export default description

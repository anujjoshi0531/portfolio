---
id: bubble-sort
title: "Bubble Sort"
category: "Sorting"
difficulty: easy
visualization: array
description: "Repeatedly steps through the list, compares adjacent elements, and swaps them if in wrong order."
runtime: bubble-sort
---

# Bubble Sort

Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

The algorithm gets its name because smaller elements "bubble" to the top of the list with each pass.

How it works:
1. Compare each pair of adjacent elements
2. Swap them if the left element is greater
3. After each pass, the largest unsorted element settles in its final position
4. Repeat until no swaps are needed

Time Complexity:
  Best:    O(n) — already sorted
  Average: O(n²)
  Worst:   O(n²)

Space Complexity: O(1) — in-place

Properties:
  - Stable sort
  - Adaptive
  - In-place

Mainly used for educational purposes. For production, prefer Quick Sort or Merge Sort.

```js
function bubbleSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap adjacent elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}
```

```python
def bubble_sort(array):
    n = len(array)

    for i in range(n - 1):
        for j in range(n - i - 1):
            if array[j] > array[j + 1]:
                # Swap adjacent elements
                array[j], array[j + 1] = array[j + 1], array[j]

    return array
```

```java
void bubbleSort(int[] array) {
    int n = array.length;

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap adjacent elements
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}
```

```cpp
void bubbleSort(vector<int>& array) {
    int n = array.size();

    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap adjacent elements
                swap(array[j], array[j + 1]);
            }
        }
    }
}
```

```rust
fn bubble_sort(array: &mut [i32]) {
    let n = array.len();

    for i in 1..n {
        for j in 0..n - i {
            if array[j] > array[j + 1] {
                // Swap adjacent elements
                array.swap(j, j + 1);
            }
        }
    }
}
```

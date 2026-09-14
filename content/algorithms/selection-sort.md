---
id: selection-sort
title: "Selection Sort"
category: "Sorting"
difficulty: easy
visualization: array
description: "Divides input into sorted and unsorted regions, repeatedly selecting the smallest element."
runtime: selection-sort
---

# Selection Sort

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

Useful when memory writes are expensive, as it performs at most O(n) swaps.

```js
function selectionSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
}
```

```python
def selection_sort(array):
    n = len(array)

    for i in range(n - 1):
        min_index = i

        for j in range(i + 1, n):
            if array[j] < array[min_index]:
                min_index = j

        if min_index != i:
            array[i], array[min_index] = array[min_index], array[i]

    return array
```

```java
void selectionSort(int[] array) {
    int n = array.length;

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex != i) {
            int temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
}
```

```cpp
void selectionSort(vector<int>& array) {
    int n = array.size();

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex != i) {
            swap(array[i], array[minIndex]);
        }
    }
}
```

```rust
fn selection_sort(array: &mut [i32]) {
    let n = array.len();

    for i in 0..n {
        let mut min_index = i;

        for j in i + 1..n {
            if array[j] < array[min_index] {
                min_index = j;
            }
        }

        if min_index != i {
            array.swap(i, min_index);
        }
    }
}
```

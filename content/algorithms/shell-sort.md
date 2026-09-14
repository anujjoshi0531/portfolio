---
id: shell-sort
title: "Shell Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Generalized insertion sort allowing exchange of far-apart items via gap sequences."
runtime: shell-sort
---

# Shell Sort

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

Shell Sort is faster than Insertion Sort for larger arrays because it moves elements closer to their final position earlier. Performance depends heavily on the gap sequence chosen.

```js
function shellSort(array) {
  const n = array.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }

      array[j] = temp;
    }
  }

  return array;
}
```

```python
def shell_sort(array):
    n = len(array)

    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = array[i]
            j = i

            while j >= gap and array[j - gap] > temp:
                array[j] = array[j - gap]
                j -= gap

            array[j] = temp

        gap //= 2

    return array
```

```java
void shellSort(int[] array) {
    int n = array.length;

    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = array[i];
            int j = i;

            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }

            array[j] = temp;
        }
        // gap shrinks each pass
    }
}
```

```cpp
void shellSort(vector<int>& array) {
    int n = array.size();

    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = array[i];
            int j = i;

            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                j -= gap;
            }

            array[j] = temp;
        }
        // gap shrinks each pass
    }
}
```

```rust
fn shell_sort(array: &mut [i32]) {
    let n = array.len();

    let mut gap = n / 2;
    while gap > 0 {
        for i in gap..n {
            let temp = array[i];
            let mut j = i;

            while j >= gap && array[j - gap] > temp {
                array[j] = array[j - gap];
                j -= gap;
            }

            array[j] = temp;
        }

        gap /= 2;
    }
}
```

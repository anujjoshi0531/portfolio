---
id: insertion-sort
title: "Insertion Sort"
category: "Sorting"
difficulty: easy
visualization: array
description: "Builds the final sorted array one item at a time by inserting elements into their correct position."
runtime: insertion-sort
---

# Insertion Sort

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

Excellent for small datasets or nearly sorted data. Often used as the base case in hybrid sorting algorithms like Timsort.

```js
function insertionSort(array) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;
  }

  return array;
}
```

```python
def insertion_sort(array):
    n = len(array)

    for i in range(1, n):
        key = array[i]
        j = i - 1

        while j >= 0 and array[j] > key:
            array[j + 1] = array[j]
            j -= 1

        array[j + 1] = key

    return array
```

```java
void insertionSort(int[] array) {
    int n = array.length;

    for (int i = 1; i < n; i++) {
        int key = array[i];
        int j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }
}
```

```cpp
void insertionSort(vector<int>& array) {
    int n = array.size();

    for (int i = 1; i < n; i++) {
        int key = array[i];
        int j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }
}
```

```rust
fn insertion_sort(array: &mut [i32]) {
    let n = array.len();

    for i in 1..n {
        let key = array[i];
        let mut j = i;

        while j > 0 && array[j - 1] > key {
            array[j] = array[j - 1];
            j -= 1;
        }

        array[j] = key;
    }
}
```

---
id: quick-sort
title: "Quick Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Divide-and-conquer algorithm that partitions an array around a chosen pivot element."
runtime: quick-sort
---

# Quick Sort

Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a "pivot" element and partitioning the array around it.

How it works:
1. Choose a pivot element (here, the last element)
2. Partition: rearrange so elements smaller than pivot are on the left, larger on the right
3. The pivot is now in its final sorted position
4. Recursively apply to the left and right sub-arrays

Time Complexity:
  Best:    O(n log n)
  Average: O(n log n)
  Worst:   O(n²) — when pivot is always the smallest/largest

Space Complexity: O(log n) average, O(n) worst — recursive call stack

Properties:
  - Not stable
  - In-place (with Lomuto partition)
  - Cache-friendly

Quick Sort is one of the fastest general-purpose sorting algorithms in practice. Used in many standard library implementations.

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)

    return arr


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

```java
void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}
```

```cpp
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}
```

```rust
fn quick_sort(arr: &mut [i32], low: isize, high: isize) {
    if low < high {
        let pivot_idx = partition(arr, low, high);
        quick_sort(arr, low, pivot_idx - 1);
        quick_sort(arr, pivot_idx + 1, high);
    }
}

fn partition(arr: &mut [i32], low: isize, high: isize) -> isize {
    let pivot = arr[high as usize];
    let mut i = low - 1;

    for j in low..high {
        if arr[j as usize] <= pivot {
            i += 1;
            arr.swap(i as usize, j as usize);
        }
    }

    arr.swap((i + 1) as usize, high as usize);
    i + 1
}
```

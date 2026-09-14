---
id: heap-sort
title: "Heap Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Comparison-based sorting technique based on Binary Heap data structure."
runtime: heap-sort
---

# Heap Sort

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

Heap Sort combines the best of Merge Sort (guaranteed O(n log n)) and Quick Sort (in-place). Useful when worst-case performance matters.

```js
function heapSort(array) {
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0);
  }

  return array;
}

function heapify(array, size, root) {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;

  if (left < size && array[left] > array[largest]) {
    largest = left;
  }

  if (right < size && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== root) {
    [array[root], array[largest]] = [array[largest], array[root]];
    heapify(array, size, largest);
  }
}
```

```python
def heap_sort(array):
    n = len(array)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(array, n, i)

    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        array[0], array[i] = array[i], array[0]
        heapify(array, i, 0)

    return array


def heapify(array, size, root):
    largest = root
    left = 2 * root + 1
    right = 2 * root + 2

    if left < size and array[left] > array[largest]:
        largest = left

    if right < size and array[right] > array[largest]:
        largest = right

    if largest != root:
        array[root], array[largest] = array[largest], array[root]
        heapify(array, size, largest)
```

```java
void heapSort(int[] array) {
    int n = array.length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        int temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapify(array, i, 0);
    }
}

void heapify(int[] array, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != root) {
        int temp = array[root];
        array[root] = array[largest];
        array[largest] = temp;
        heapify(array, size, largest);
    }
}
```

```cpp
void heapSort(vector<int>& array) {
    int n = array.size();

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(array, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(array[0], array[i]);
        heapify(array, i, 0);
    }
}

void heapify(vector<int>& array, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;

    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    if (right < size && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != root) {
        swap(array[root], array[largest]);
        heapify(array, size, largest);
    }
}
```

```rust
fn heap_sort(array: &mut [i32]) {
    let n = array.len();

    // Build max heap
    for i in (0..n / 2).rev() {
        heapify(array, n, i);
    }

    // Extract elements from heap
    for i in (1..n).rev() {
        array.swap(0, i);
        heapify(array, i, 0);
    }
}

fn heapify(array: &mut [i32], size: usize, root: usize) {
    let mut largest = root;
    let left = 2 * root + 1;
    let right = 2 * root + 2;

    if left < size && array[left] > array[largest] {
        largest = left;
    }

    if right < size && array[right] > array[largest] {
        largest = right;
    }

    if largest != root {
        array.swap(root, largest);
        heapify(array, size, largest);
    }
}
```

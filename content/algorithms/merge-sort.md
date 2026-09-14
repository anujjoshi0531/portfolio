---
id: merge-sort
title: "Merge Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Efficient, general-purpose, divide-and-conquer comparison-based sorting algorithm."
runtime: merge-sort
---

# Merge Sort

Merge Sort is a stable, divide-and-conquer sorting algorithm. It divides the array into halves, recursively sorts each half, then merges the sorted halves.

How it works:
1. Divide the array into two halves
2. Recursively sort each half
3. Merge the two sorted halves into a single sorted array
4. The merge step compares elements from both halves and places them in order

Time Complexity:
  Best:    O(n log n)
  Average: O(n log n)
  Worst:   O(n log n)

Space Complexity: O(n) — requires temporary array

Properties:
  - Stable sort
  - Not in-place (requires O(n) extra space)
  - Predictable performance (always O(n log n))
  - Parallelizable

Merge Sort guarantees O(n log n) performance regardless of input. Ideal when stability is required or for sorting linked lists.

```js
function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  mergeSort(arr, start, mid);
  mergeSort(arr, mid + 1, end);
  merge(arr, start, mid, end);
}

function merge(arr, start, mid, end) {
  const temp = [];
  let i = start, j = mid + 1;

  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }

  while (i <= mid) temp.push(arr[i++]);
  while (j <= end) temp.push(arr[j++]);

  for (let k = 0; k < temp.length; k++) {
    arr[start + k] = temp[k];
  }
}
```

```python
def merge_sort(arr, start=0, end=None):
    if end is None:
        end = len(arr) - 1
    if start >= end:
        return

    mid = (start + end) // 2
    merge_sort(arr, start, mid)
    merge_sort(arr, mid + 1, end)
    merge(arr, start, mid, end)


def merge(arr, start, mid, end):
    temp = []
    i = start
    j = mid + 1

    while i <= mid and j <= end:
        if arr[i] <= arr[j]:
            temp.append(arr[i])
            i += 1
        else:
            temp.append(arr[j])
            j += 1

    while i <= mid:
        temp.append(arr[i])
        i += 1
    while j <= end:
        temp.append(arr[j])
        j += 1

    for k in range(len(temp)):
        arr[start + k] = temp[k]
```

```java
void mergeSort(int[] arr, int start, int end) {
    if (start >= end) return;

    int mid = (start + end) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}

void merge(int[] arr, int start, int mid, int end) {
    int[] temp = new int[end - start + 1];
    int i = start, j = mid + 1, k = 0;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= end) temp[k++] = arr[j++];

    for (int t = 0; t < temp.length; t++) {
        arr[start + t] = temp[t];
    }
}
```

```cpp
void mergeSort(vector<int>& arr, int start, int end) {
    if (start >= end) return;

    int mid = (start + end) / 2;
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}

void merge(vector<int>& arr, int start, int mid, int end) {
    vector<int> temp;
    int i = start, j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp.push_back(arr[i++]);
        } else {
            temp.push_back(arr[j++]);
        }
    }

    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= end) temp.push_back(arr[j++]);

    for (int k = 0; k < (int)temp.size(); k++) {
        arr[start + k] = temp[k];
    }
}
```

```rust
fn merge_sort(arr: &mut [i32], start: usize, end: usize) {
    if start >= end {
        return;
    }

    let mid = (start + end) / 2;
    merge_sort(arr, start, mid);
    merge_sort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}

fn merge(arr: &mut [i32], start: usize, mid: usize, end: usize) {
    let mut temp: Vec<i32> = Vec::new();
    let mut i = start;
    let mut j = mid + 1;

    while i <= mid && j <= end {
        if arr[i] <= arr[j] {
            temp.push(arr[i]);
            i += 1;
        } else {
            temp.push(arr[j]);
            j += 1;
        }
    }

    while i <= mid {
        temp.push(arr[i]);
        i += 1;
    }
    while j <= end {
        temp.push(arr[j]);
        j += 1;
    }

    for (k, value) in temp.iter().enumerate() {
        arr[start + k] = *value;
    }
}
```

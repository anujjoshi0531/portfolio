---
id: binary-search
title: "Binary Search"
category: "Searching"
difficulty: easy
visualization: array
runtime: binary-search
description: "Efficient search algorithm finding position in sorted array by halving search intervals."
input:
  array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
  target: 23
complexity:
  best: O(1)
  average: O(log n)
  worst: O(log n)
spaceComplexity: O(1)
prerequisites: "The array must be sorted."
---

# Binary Search

Binary Search is an efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half.

Prerequisite: The array must be sorted.

How it works:
1. Compare the target with the middle element
2. If equal, we found the target
3. If target is smaller, search the left half
4. If target is larger, search the right half
5. Repeat until found or search space is empty

Time Complexity:
  Best:    O(1) — target is at the middle
  Average: O(log n)
  Worst:   O(log n)

Space Complexity: O(1) — iterative version

Binary Search is fundamental in computer science and is used extensively in databases, file systems, and as a building block for more complex algorithms.

```js
function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}
```

```python
def binary_search(array, target):
    low = 0
    high = len(array) - 1

    while low <= high:
        mid = (low + high) // 2

        if array[mid] == target:
            return mid
        elif array[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1
```

```java
int binarySearch(int[] array, int target) {
    int low = 0;
    int high = array.length - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (array[mid] == target) {
            return mid; // Found!
        } else if (array[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    return -1; // Not found
}
```

```cpp
int binarySearch(const vector<int>& array, int target) {
    int low = 0;
    int high = (int)array.size() - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (array[mid] == target) {
            return mid; // Found!
        } else if (array[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    return -1; // Not found
}
```

```rust
fn binary_search(array: &[i32], target: i32) -> Option<usize> {
    let mut low: isize = 0;
    let mut high: isize = array.len() as isize - 1;

    while low <= high {
        let mid = (low + high) / 2;

        if array[mid as usize] == target {
            return Some(mid as usize); // Found!
        } else if array[mid as usize] < target {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    None // Not found
}
```

---
id: interpolation-search
title: "Interpolation Search"
category: "Searching"
difficulty: intermediate
visualization: array
description: "Searches uniformly distributed sorted arrays based on probing key value estimation."
runtime: interpolation-search
---

# Interpolation Search

Interpolation Search is an improved variant of Binary Search for uniformly distributed sorted data. Instead of always going to the middle, it estimates the position of the target based on its value.

How it works:
1. Estimate position: pos = low + ((target - arr[low]) × (high - low)) / (arr[high] - arr[low])
2. If arr[pos] equals target, return pos
3. If arr[pos] < target, search right portion
4. If arr[pos] > target, search left portion

Time Complexity:
  Best:    O(1)
  Average: O(log log n) — for uniform distribution
  Worst:   O(n) — for non-uniform distribution

Space Complexity: O(1)

Properties:
  - Requires sorted array
  - Best for uniformly distributed data
  - Can degrade to O(n) for skewed distributions

Interpolation Search can be significantly faster than Binary Search when data is uniformly distributed, as it makes better guesses about where the target might be.

```js
function interpolationSearch(array, target) {
  let low = 0;
  let high = array.length - 1;

  while (low <= high && target >= array[low] && target <= array[high]) {
    // Estimate position using interpolation formula
    const pos = low + Math.floor(
      ((target - array[low]) * (high - low)) /
      (array[high] - array[low])
    );

    if (array[pos] === target) {
      return pos; // Found!
    } else if (array[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1; // Not found
}
```

```python
def interpolation_search(array, target):
    low = 0
    high = len(array) - 1

    while low <= high and array[low] <= target <= array[high]:
        # Estimate position using interpolation formula
        pos = low + (
            ((target - array[low]) * (high - low)) //
            (array[high] - array[low])
        )

        if array[pos] == target:
            return pos  # Found!
        elif array[pos] < target:
            low = pos + 1
        else:
            high = pos - 1

    return -1  # Not found
```

```java
int interpolationSearch(int[] array, int target) {
    int low = 0;
    int high = array.length - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
        // Estimate position using interpolation formula
        int pos = low + (
            ((target - array[low]) * (high - low)) /
            (array[high] - array[low])
        );

        if (array[pos] == target) {
            return pos; // Found!
        } else if (array[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1; // Not found
}
```

```cpp
int interpolationSearch(const vector<int>& array, int target) {
    int low = 0;
    int high = (int)array.size() - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
        // Estimate position using interpolation formula
        int pos = low + (
            ((target - array[low]) * (high - low)) /
            (array[high] - array[low])
        );

        if (array[pos] == target) {
            return pos; // Found!
        } else if (array[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1; // Not found
}
```

```rust
fn interpolation_search(array: &[i32], target: i32) -> Option<usize> {
    let mut low: isize = 0;
    let mut high: isize = array.len() as isize - 1;

    while low <= high && target >= array[low as usize] && target <= array[high as usize] {
        // Estimate position using interpolation formula
        let pos = low + (
            ((target - array[low as usize]) as isize * (high - low)) /
            ((array[high as usize] - array[low as usize]) as isize)
        );

        if array[pos as usize] == target {
            return Some(pos as usize); // Found!
        } else if array[pos as usize] < target {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    None // Not found
}
```

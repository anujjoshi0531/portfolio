---
id: linear-search
title: "Linear Search"
category: "Searching"
difficulty: easy
visualization: array
description: "Sequential check of each element until a match is found or end of list reached."
runtime: linear-search
---

# Linear Search

Linear Search (or Sequential Search) is the simplest searching algorithm. It checks every element in the list sequentially until the target is found or the list is exhausted.

How it works:
1. Start from the first element
2. Compare each element with the target
3. If a match is found, return the index
4. If the end is reached without a match, return -1

Time Complexity:
  Best:    O(1) — target is the first element
  Average: O(n)
  Worst:   O(n) — target is last or not present

Space Complexity: O(1)

Properties:
  - Works on unsorted arrays
  - No preprocessing needed
  - Simple to implement

Linear Search is useful for small datasets or unsorted data where more efficient algorithms cannot be applied.

```js
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i; // Found!
    }
  }

  return -1; // Not found
}
```

```python
def linear_search(array, target):
    for i in range(len(array)):
        if array[i] == target:
            return i  # Found!

    return -1  # Not found
```

```java
int linearSearch(int[] array, int target) {
    for (int i = 0; i < array.length; i++) {
        if (array[i] == target) {
            return i; // Found!
        }
    }

    return -1; // Not found
}
```

```cpp
int linearSearch(const vector<int>& array, int target) {
    for (int i = 0; i < (int)array.size(); i++) {
        if (array[i] == target) {
            return i; // Found!
        }
    }

    return -1; // Not found
}
```

```rust
fn linear_search(array: &[i32], target: i32) -> Option<usize> {
    for i in 0..array.len() {
        if array[i] == target {
            return Some(i); // Found!
        }
    }

    None // Not found
}
```

---
id: jump-search
title: "Jump Search"
category: "Searching"
difficulty: intermediate
visualization: array
description: "Searches sorted arrays by jumping fixed steps forward then linear searching backward."
runtime: jump-search
---

# Jump Search

Jump Search works on sorted arrays by jumping ahead by fixed steps and then performing a linear search within the identified block.

How it works:
1. Calculate the optimal jump size: √n
2. Jump through the array in blocks until finding a block where the target could be
3. Perform a linear search within that block
4. Return the index if found, -1 otherwise

Time Complexity:
  Best:    O(1)
  Average: O(√n)
  Worst:   O(√n)

Space Complexity: O(1)

Properties:
  - Requires sorted array
  - Better than Linear Search, simpler than Binary Search
  - Optimal jump size is √n

Jump Search is useful when jumping back is costly (e.g., in linked lists) compared to Binary Search which requires random access.

```js
function jumpSearch(array, target) {
  const n = array.length;
  const jump = Math.floor(Math.sqrt(n));
  let prev = 0;
  let curr = jump;

  // Jump in blocks of size sqrt(n)
  while (curr < n && array[curr] <= target) {
    prev = curr;
    curr += jump;
  }

  // Linear search in the block
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (array[i] === target) {
      return i;
    }
  }

  return -1;
}
```

```python
def jump_search(array, target):
    n = len(array)
    jump = int(n ** 0.5)
    prev = 0
    curr = jump

    # Jump in blocks of size √n
    while curr < n and array[curr] <= target:
        prev = curr
        curr += jump

    # Linear search in the block
    for i in range(prev, min(curr, n)):
        if array[i] == target:
            return i  # Found!

    return -1  # Not found
```

```java
int jumpSearch(int[] array, int target) {
    int n = array.length;
    int jump = (int) Math.sqrt(n);
    int prev = 0;
    int curr = jump;

    // Jump in blocks of size √n
    while (curr < n && array[curr] <= target) {
        prev = curr;
        curr += jump;
    }

    // Linear search in the block
    for (int i = prev; i < Math.min(curr, n); i++) {
        if (array[i] == target) {
            return i; // Found!
        }
    }

    return -1; // Not found
}
```

```cpp
int jumpSearch(const vector<int>& array, int target) {
    int n = array.size();
    int jump = (int)sqrt(n);
    int prev = 0;
    int curr = jump;

    // Jump in blocks of size √n
    while (curr < n && array[curr] <= target) {
        prev = curr;
        curr += jump;
    }

    // Linear search in the block
    for (int i = prev; i < min(curr, n); i++) {
        if (array[i] == target) {
            return i; // Found!
        }
    }

    return -1; // Not found
}
```

```rust
fn jump_search(array: &[i32], target: i32) -> Option<usize> {
    let n = array.len();
    let jump = (n as f64).sqrt() as usize;
    let mut prev = 0;
    let mut curr = jump;

    // Jump in blocks of size √n
    while curr < n && array[curr] <= target {
        prev = curr;
        curr += jump;
    }

    // Linear search in the block
    for i in prev..curr.min(n) {
        if array[i] == target {
            return Some(i); // Found!
        }
    }

    None // Not found
}
```

---
id: two-pointers
title: "Two Pointers"
category: "Concepts"
difficulty: intermediate
visualization: concept
description: "Iterate with two references through data structures to solve search/pair problems in O(n)."
runtime: two-pointers
---

# Two Pointers

Two Pointers is a technique where two indices move through a data structure (usually an array) to solve problems efficiently.

Common patterns:
  - Left & Right: start from both ends, move inward
  - Slow & Fast: both start from beginning at different speeds

Time Complexity: O(n) — each pointer moves at most n times
Space Complexity: O(1) — only two variables

Classic problems:
  - Two Sum (sorted array)
  - Container with most water
  - Remove duplicates in-place
  - Palindrome checking
  - Linked list cycle detection (slow/fast)

```js
function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;   // need bigger sum
    } else {
      right--;  // need smaller sum
    }
  }
  return null; // no pair found
}
```

```python
def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return [left, right]
        elif total < target:
            left += 1   # need bigger sum
        else:
            right -= 1  # need smaller sum
    return None  # no pair found
```

```java
int[] twoSumSorted(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;

    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) {
            return new int[]{left, right};
        } else if (total < target) {
            left++;   // need bigger sum
        } else {
            right--;  // need smaller sum
        }
    }
    return null; // no pair found
}
```

```cpp
optional<pair<int, int>> twoSumSorted(const vector<int>& arr, int target) {
    int left = 0;
    int right = (int)arr.size() - 1;

    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) {
            return make_pair(left, right);
        } else if (total < target) {
            left++;   // need bigger sum
        } else {
            right--;  // need smaller sum
        }
    }
    return nullopt; // no pair found
}
```

```rust
fn two_sum_sorted(arr: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut left = 0;
    let mut right = arr.len() - 1;

    while left < right {
        let total = arr[left] + arr[right];
        if total == target {
            return Some((left, right));
        } else if total < target {
            left += 1;  // need bigger sum
        } else {
            right -= 1; // need smaller sum
        }
    }
    None // no pair found
}
```

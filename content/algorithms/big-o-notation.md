---
id: big-o-notation
title: "Big O Notation"
category: "Concepts"
difficulty: easy
visualization: concept
description: "Understand time and space complexity growth rates using asymptotic notation."
runtime: big-o-notation
---

# Big O Notation

Big O Notation describes how an algorithm's running time or space requirements grow relative to the input size. It focuses on the worst-case scenario and ignores constants and lower-order terms.

Common complexities (fastest to slowest):
  O(1)       — Constant: same time regardless of input size
  O(log n)   — Logarithmic: halves the problem each step (binary search)
  O(n)       — Linear: processes each element once
  O(n log n) — Linearithmic: efficient sorting (Merge Sort, Quick Sort)
  O(n²)      — Quadratic: nested loops (Bubble Sort, brute force)
  O(2^n)     — Exponential: doubles with each new element
  O(n!)      — Factorial: all permutations

Why it matters:
  For n = 1,000: O(n) = 1,000 operations, O(n²) = 1,000,000 operations
  Choosing the right algorithm can mean seconds vs. hours of computation.

Rules of Big O:
  1. Drop constants: O(2n) → O(n)
  2. Drop lower-order terms: O(n² + n) → O(n²)
  3. Focus on the dominant term as n grows large


```js
// O(1) — Constant time
function getFirst(arr) {
  return arr[0];
}

// O(n) — Linear time
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) — Quadratic time
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(log n) — Logarithmic time
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
  

// O(n log n) — Linearithmic time
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result, ...left, ...right];
}
```

```python
# O(1) — Constant time
def get_first(arr):
    return arr[0]

# O(n) — Linear time
def find_max(arr):
    maximum = arr[0]
    for i in range(1, len(arr)):
        if arr[i] > maximum:
            maximum = arr[i]
    return maximum

# O(n²) — Quadratic time
def has_duplicate(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# O(log n) — Logarithmic time
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# O(n log n) — Linearithmic time
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    while left and right:
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    return result + left + right
```

```java
// O(1) — Constant time
int getFirst(int[] arr) {
    return arr[0];
}

// O(n) — Linear time
int findMax(int[] arr) {
    int maximum = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }
    return maximum;
}

// O(n²) — Quadratic time
boolean hasDuplicate(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}

// O(log n) — Logarithmic time
int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// O(n log n) — Linearithmic time
int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}
```

```cpp
// O(1) — Constant time
int getFirst(const vector<int>& arr) {
    return arr[0];
}

// O(n) — Linear time
int findMax(const vector<int>& arr) {
    int maximum = arr[0];
    for (int i = 1; i < (int)arr.size(); i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }
    return maximum;
}

// O(n²) — Quadratic time
bool hasDuplicate(const vector<int>& arr) {
    for (int i = 0; i < (int)arr.size(); i++) {
        for (int j = i + 1; j < (int)arr.size(); j++) {
            if (arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}

// O(log n) — Logarithmic time
int binarySearch(const vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// O(n log n) — Linearithmic time
vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
}
```

```rust
// O(1) — Constant time
fn get_first(arr: &[i32]) -> i32 {
    arr[0]
}

// O(n) — Linear time
fn find_max(arr: &[i32]) -> i32 {
    let mut maximum = arr[0];
    for i in 1..arr.len() {
        if arr[i] > maximum {
            maximum = arr[i];
        }
    }
    maximum
}

// O(n²) — Quadratic time
fn has_duplicate(arr: &[i32]) -> bool {
    for i in 0..arr.len() {
        for j in (i + 1)..arr.len() {
            if arr[i] == arr[j] {
                return true;
            }
        }
    }
    false
}

// O(log n) — Logarithmic time
fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut lo = 0;
    let mut hi = arr.len();
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        if arr[mid] == target {
            return Some(mid);
        }
        if arr[mid] < target {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    None
}

// O(n log n) — Linearithmic time
fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len() <= 1 {
        return arr.to_vec();
    }
    let mid = arr.len() / 2;
    let left = merge_sort(&arr[..mid]);
    let right = merge_sort(&arr[mid..]);
    merge(left, right)
}
```

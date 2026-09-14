---
id: counting-sort
title: "Counting Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Non-comparison sorting algorithm that counts occurrences of each distinct element."
runtime: counting-sort
---

# Counting Sort

Counting Sort is a non-comparison-based sorting algorithm. It counts the occurrences of each value and uses arithmetic to determine positions.

How it works:
1. Find the range of input values (min to max)
2. Create a count array to store frequency of each value
3. Modify count array to store cumulative counts
4. Build the output array by placing elements at their correct positions

Time Complexity:
  Best:    O(n + k)
  Average: O(n + k)
  Worst:   O(n + k)
  where k is the range of input values

Space Complexity: O(n + k)

Properties:
  - Stable sort
  - Not in-place
  - Not comparison-based
  - Very efficient when k is small relative to n

Counting Sort is ideal for sorting integers within a known, small range. It's used as a subroutine in Radix Sort.

```js
function countingSort(array) {
  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);
  const output = new Array(array.length);

  // Count occurrences
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
  }

  // Cumulative count
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Build output (reverse for stability)
  for (let i = array.length - 1; i >= 0; i--) {
    output[count[array[i]] - 1] = array[i];
    count[array[i]]--;
  }

  return output;
}
```

```python
def counting_sort(array):
    max_value = max(array)
    count = [0] * (max_value + 1)
    output = [0] * len(array)

    # Count occurrences
    for i in range(len(array)):
        count[array[i]] += 1

    # Cumulative count
    for i in range(1, max_value + 1):
        count[i] += count[i - 1]

    # Build output (reverse for stability)
    for i in range(len(array) - 1, -1, -1):
        output[count[array[i]] - 1] = array[i]
        count[array[i]] -= 1

    return output
```

```java
int[] countingSort(int[] array) {
    int maxValue = array[0];
    for (int v : array) if (v > maxValue) maxValue = v;
    int[] count = new int[maxValue + 1];
    int[] output = new int[array.length];

    // Count occurrences
    for (int i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    // Cumulative count
    for (int i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }

    // Build output (reverse for stability)
    for (int i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    return output;
}
```

```cpp
vector<int> countingSort(vector<int>& array) {
    int maxValue = *max_element(array.begin(), array.end());
    vector<int> count(maxValue + 1, 0);
    vector<int> output(array.size());

    // Count occurrences
    for (int i = 0; i < (int)array.size(); i++) {
        count[array[i]]++;
    }

    // Cumulative count
    for (int i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }

    // Build output (reverse for stability)
    for (int i = (int)array.size() - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    return output;
}
```

```rust
fn counting_sort(array: &[i32]) -> Vec<i32> {
    let max_value = *array.iter().max().unwrap() as usize;
    let mut count = vec![0usize; max_value + 1];
    let mut output = vec![0i32; array.len()];

    // Count occurrences
    for &value in array {
        count[value as usize] += 1;
    }

    // Cumulative count
    for i in 1..=max_value {
        count[i] += count[i - 1];
    }

    // Build output (reverse for stability)
    for i in (0..array.len()).rev() {
        let value = array[i] as usize;
        output[count[value] - 1] = array[i];
        count[value] -= 1;
    }

    output
}
```

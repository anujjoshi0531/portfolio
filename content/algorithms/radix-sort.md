---
id: radix-sort
title: "Radix Sort"
category: "Sorting"
difficulty: intermediate
visualization: array
description: "Non-comparative integer sorting algorithm sorting digit by digit."
runtime: radix-sort
---

# Radix Sort

Radix Sort sorts numbers digit by digit, from the least significant digit to the most significant (LSD Radix Sort). It uses a stable sort (like Counting Sort) as a subroutine.

How it works:
1. Find the maximum number to determine the number of digits
2. For each digit position (ones, tens, hundreds, ...):
   a. Sort the array based on the current digit using a stable sort
3. After processing all digits, the array is sorted

Time Complexity:
  Best:    O(d × (n + k))
  Average: O(d × (n + k))
  Worst:   O(d × (n + k))
  where d = number of digits, k = base (10 for decimal)

Space Complexity: O(n + k)

Properties:
  - Stable sort
  - Not in-place
  - Not comparison-based
  - Efficient for integers and strings

Radix Sort can outperform comparison-based sorts when the number of digits is small relative to log(n).

```js
function radixSort(array) {
  const max = Math.max(...array);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp);
  }

  return array;
}

function countingSortByDigit(array, exp) {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(array[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
}
```

```python
def radix_sort(array):
    max_value = max(array)

    exp = 1
    while max_value // exp > 0:
        counting_sort_by_digit(array, exp)
        exp *= 10

    return array


def counting_sort_by_digit(array, exp):
    n = len(array)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        digit = (array[i] // exp) % 10
        count[digit] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        digit = (array[i] // exp) % 10
        output[count[digit] - 1] = array[i]
        count[digit] -= 1

    for i in range(n):
        array[i] = output[i]
```

```java
void radixSort(int[] array) {
    int maxValue = array[0];
    for (int v : array) if (v > maxValue) maxValue = v;

    for (int exp = 1; maxValue / exp > 0; exp *= 10) {
        countingSortByDigit(array, exp);
    }
}

void countingSortByDigit(int[] array, int exp) {
    int n = array.length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int i = 0; i < n; i++) {
        int digit = (array[i] / exp) % 10;
        count[digit]++;
    }

    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i >= 0; i--) {
        int digit = (array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
    }

    for (int i = 0; i < n; i++) {
        array[i] = output[i];
    }
}
```

```cpp
void radixSort(vector<int>& array) {
    int maxValue = *max_element(array.begin(), array.end());

    for (int exp = 1; maxValue / exp > 0; exp *= 10) {
        countingSortByDigit(array, exp);
    }
}

void countingSortByDigit(vector<int>& array, int exp) {
    int n = array.size();
    vector<int> output(n);
    vector<int> count(10, 0);

    for (int i = 0; i < n; i++) {
        int digit = (array[i] / exp) % 10;
        count[digit]++;
    }

    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i >= 0; i--) {
        int digit = (array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
    }

    for (int i = 0; i < n; i++) {
        array[i] = output[i];
    }
}
```

```rust
fn radix_sort(array: &mut [i32]) {
    let max_value = *array.iter().max().unwrap();

    let mut exp = 1;
    while max_value / exp > 0 {
        counting_sort_by_digit(array, exp);
        exp *= 10;
    }
}

fn counting_sort_by_digit(array: &mut [i32], exp: i32) {
    let n = array.len();
    let mut output = vec![0i32; n];
    let mut count = [0usize; 10];

    for &value in array.iter() {
        let digit = ((value / exp) % 10) as usize;
        count[digit] += 1;
    }

    for i in 1..10 {
        count[i] += count[i - 1];
    }

    for i in (0..n).rev() {
        let digit = ((array[i] / exp) % 10) as usize;
        output[count[digit] - 1] = array[i];
        count[digit] -= 1;
    }

    array.copy_from_slice(&output);
}
```

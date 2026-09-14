---
id: bucket-sort
title: "Bucket Sort"
category: "Sorting"
difficulty: intermediate
visualization: concept
description: "Distributes elements into buckets, sorts individual buckets, and concatenates."
runtime: bucket-sort
---

# Bucket Sort

Bucket Sort is a distribution-based sorting algorithm that works by partitioning an array into a number of buckets. Each bucket is then sorted individually using another sorting algorithm or recursively applying the bucket sort.

How it works:
1. Find the range (min/max) to determine bucket indices
2. Create empty buckets based on a fixed size (e.g., 10 or 20)
3. Distribute elements into buckets: index = floor((value - min) / size)
4. Sort each non-empty bucket using Insertion Sort
5. Collect elements from sorted buckets back into the main array

Time Complexity:
  Best:    O(n + k) — uniform distribution
  Average: O(n + k)
  Worst:   O(n²) — all elements fall into one bucket

Space Complexity: O(n + k) — extra space for buckets

Properties:
  - Stable sort (if underlying sort is stable)
  - Not in-place
  - Data-distribution dependent

```js
function bucketSort(array, bucketSize = 5) {
  if (array.length === 0) return array;

  // 1. Find min and max values
  let min = array[0];
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) min = array[i];
    else if (array[i] > max) max = array[i];
  }

  // 2. Initialize buckets
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount);
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  // 3. Distribute elements into buckets
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - min) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }

  // 4. Sort buckets and concatenate
  array.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    for (let j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }

  return array;
}
```

```python
def bucket_sort(array, bucket_size=5):
    if len(array) == 0:
        return array

    # 1. Find min and max values
    min_value = array[0]
    max_value = array[0]
    for i in range(1, len(array)):
        if array[i] < min_value:
            min_value = array[i]
        elif array[i] > max_value:
            max_value = array[i]

    # 2. Initialize buckets
    bucket_count = (max_value - min_value) // bucket_size + 1
    buckets = []
    for i in range(bucket_count):
        buckets.append([])

    # 3. Distribute elements into buckets
    for i in range(len(array)):
        bucket_index = (array[i] - min_value) // bucket_size
        buckets[bucket_index].append(array[i])

    # 4. Sort buckets and concatenate
    array.clear()
    for i in range(len(buckets)):
        insertion_sort(buckets[i])
        for j in range(len(buckets[i])):
            array.append(buckets[i][j])

    return array
```

```java
void bucketSort(int[] array, int bucketSize) {
    if (array.length == 0) return;

    // 1. Find min and max values
    int minValue = array[0];
    int maxValue = array[0];
    for (int i = 1; i < array.length; i++) {
        if (array[i] < minValue) minValue = array[i];
        else if (array[i] > maxValue) maxValue = array[i];
    }

    // 2. Initialize buckets
    int bucketCount = (maxValue - minValue) / bucketSize + 1;
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }

    // 3. Distribute elements into buckets
    for (int i = 0; i < array.length; i++) {
        int bucketIndex = (array[i] - minValue) / bucketSize;
        buckets.get(bucketIndex).add(array[i]);
    }

    // 4. Sort buckets and concatenate
    int idx = 0;
    for (int i = 0; i < buckets.size(); i++) {
        Collections.sort(buckets.get(i));
        for (int j = 0; j < buckets.get(i).size(); j++) {
            array[idx++] = buckets.get(i).get(j);
        }
    }
}
```

```cpp
void bucketSort(vector<int>& array, int bucketSize = 5) {
    if (array.empty()) return;

    // 1. Find min and max values
    int minValue = array[0];
    int maxValue = array[0];
    for (int i = 1; i < (int)array.size(); i++) {
        if (array[i] < minValue) minValue = array[i];
        else if (array[i] > maxValue) maxValue = array[i];
    }

    // 2. Initialize buckets
    int bucketCount = (maxValue - minValue) / bucketSize + 1;
    vector<vector<int>> buckets(bucketCount);

    // 3. Distribute elements into buckets
    for (int i = 0; i < (int)array.size(); i++) {
        int bucketIndex = (array[i] - minValue) / bucketSize;
        buckets[bucketIndex].push_back(array[i]);
    }

    // 4. Sort buckets and concatenate
    array.clear();
    for (int i = 0; i < (int)buckets.size(); i++) {
        sort(buckets[i].begin(), buckets[i].end());
        for (int j = 0; j < (int)buckets[i].size(); j++) {
            array.push_back(buckets[i][j]);
        }
    }
}
```

```rust
fn bucket_sort(array: &mut Vec<i32>, bucket_size: i32) {
    if array.is_empty() {
        return;
    }

    // 1. Find min and max values
    let mut min_value = array[0];
    let mut max_value = array[0];
    for &value in array.iter().skip(1) {
        if value < min_value {
            min_value = value;
        } else if value > max_value {
            max_value = value;
        }
    }

    // 2. Initialize buckets
    let bucket_count = ((max_value - min_value) / bucket_size + 1) as usize;
    let mut buckets: Vec<Vec<i32>> = vec![Vec::new(); bucket_count];

    // 3. Distribute elements into buckets
    for &value in array.iter() {
        let bucket_index = ((value - min_value) / bucket_size) as usize;
        buckets[bucket_index].push(value);
    }

    // 4. Sort buckets and concatenate
    array.clear();
    for bucket in buckets.iter_mut() {
        bucket.sort();
        for value in bucket.iter() {
            array.push(*value);
        }
    }
}
```

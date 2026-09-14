---
title: "Subarrays with First Element Minimum"
description: "Step-by-step solution using monotonic stack techniques to count valid subarrays."
published: 2001-11-23
thumbnail: _assets/thumbnails/gfg-subarrays.webp
tags:
  - GeeksforGeeks
  - Monotonic Stack
  - POTD
  - Arrays
category: Blog
likes: 0
views: 2
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

> [!info] Subarrays with First Element Minimum | Practice | GeeksforGeeks  
> You are given an integer array&nbsp;arr[ ].  
> [https://www.geeksforgeeks.org/problems/subarrays-with-first-element-minimum/1](https://www.geeksforgeeks.org/problems/subarrays-with-first-element-minimum/1)  

## Problem

You are given an integer array `arr[]`. Count the number of **subarrays where the first element of the subarray is the minimum element of that subarray**.

|**Input**|**Output**|**Explanation**|
|---|---|---|
|`[3,1,2]`|`4`|Valid subarrays: `(3)`, `(1)`, `(1,2)`, `(2)`|
|`[1,2,3]`|`6`|All subarrays are valid because the first element is always the minimum|

## Prerequisites

A **monotonic stack** helps efficiently find the **next smaller element** in an array.

- [https://cp-algorithms.com/data_structures/stack_queue_modification.html](https://cp-algorithms.com/data_structures/stack_queue_modification.html)
- [https://www.geeksforgeeks.org/problems/immediate-smaller-element1142/1](https://www.geeksforgeeks.org/problems/immediate-smaller-element1142/1)
- [https://leetcode.com/problems/sum-of-subarray-minimums/](https://leetcode.com/problems/sum-of-subarray-minimums/)
- [https://leetcode.com/problems/largest-rectangle-in-histogram/](https://leetcode.com/problems/largest-rectangle-in-histogram/)
- Related blog: [[sum-of-subarray-minimums]]
- Visual reference: [Stack Algorithm Visualizer](/algorithms/stack)

## Pattern

This is a boundary-counting problem. For every index `i`, find the first index to the right where the value becomes strictly smaller than `arr[i]`. Every ending position before that boundary forms a valid subarray.

It pairs naturally with [[sum-of-subarray-minimums]], where the same stack idea counts each element's full contribution as a minimum.

## Visual Walkthrough

```algo:stack
The stack stores unresolved starting indices until a smaller value appears and closes their valid range.
```

## Brute Force

### Idea

Generate all subarrays and check whether the **first element is the smallest** in that subarray.

1. Generate every subarray `(i → j)`
2. Track the **minimum value** in that subarray
3. If `arr[i] == minimum`, count that subarray

### Code

#### C++

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& arr) {
        int n = arr.size();
        stack<int> st;
        long long ans = 0;

        for(int i = n - 1; i >= 0; i--) {
            while(!st.empty() && arr[st.top()] >= arr[i])
                st.pop();

            int nextSmaller = st.empty() ? n : st.top();
            ans += (nextSmaller - i);

            st.push(i);
        }

        return ans;
    }
};
```

#### Java

```java
class Solution {
    public long countSubarrays(int[] arr) {
        int n = arr.length;
        Stack<Integer> st = new Stack<>();
        long ans = 0;

        for(int i = n - 1; i >= 0; i--) {
            while(!st.isEmpty() && arr[st.peek()] >= arr[i])
                st.pop();

            int nextSmaller = st.isEmpty() ? n : st.peek();
            ans += nextSmaller - i;

            st.push(i);
        }

        return ans;
    }
}
```

#### JavaScript

```jsx
class Solution {
    countSubarrays(arr) {
        let n = arr.length;
        let stack = [];
        let ans = 0;

        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
                stack.pop();
            }

            let nextSmaller = stack.length ? stack[stack.length - 1] : n;
            ans += nextSmaller - i;

            stack.push(i);
        }

        return ans;
    }
}
```

#### Python

```python
class Solution:
    def countSubarrays(self, arr):
        n = len(arr)
        stack = []
        ans = 0

        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()

            next_smaller = stack[-1] if stack else n
            ans += next_smaller - i

            stack.append(i)

        return ans
```

### Complexity

- Total subarrays = `O(N^2)`
- Checking minimum = `O(N)`

|Metric|Value|
|---|---|
|Time Complexity|`O(N³) (or O(N²) with running minimum)`|
|Space Complexity|`O(1)`|

This is **not feasible for** `**n ≤ 10^5**`.

## Optimal Approach

### Hint

For a subarray starting at index `i`:

```
[i ... j]
```

`arr[i]` must remain the **minimum element**.

The subarray becomes invalid when we encounter the **first element smaller than** `**arr[i]**`.

So we only need to know:

> **Where is the next element smaller than** `**arr[i]**`**?**

### Idea

```
nextSmaller[i] = index of next element smaller than arr[i]
```

Then valid subarrays starting at `i` are:

```
[i]
[i, i+1]
[i, i+2]
...
[i, nextSmaller[i]-1]
```

Number of such subarrays:

```
count = nextSmaller[i] - i
// If there is no smaller element, then: count = n - i
```

### Finding Next Smaller Element

We use a **monotonic increasing stack**.

While traversing:

- Maintain elements in **increasing order**
- If we find a **smaller element**, we resolve previous indices.

### Approach

1. Traverse the array using a stack.
2. Maintain indices of elements.
3. When `arr[i] < arr[stack.top()]`, update the next smaller index.
4. Sum all the contributions: `count = nextSmaller[i] - i`

### Code

#### C++

```cpp
class Solution {
  public:
    long long countSubarrays(vector<int>& arr) {
        int n = arr.size();
        stack<int> st;
        long long res = 0;

        for(int i = 0; i < n; i++) {
            while(!st.empty() && arr[i] < arr[st.top()]) {
                int idx = st.top();
                st.pop();
                res += (i - idx);
            }
            st.push(i);
        }

        while(!st.empty()) {
            int idx = st.top();
            st.pop();
            res += (n - idx);
        }

        return res;
    }
};
```

#### Java

```java
import java.util.*;

class Solution {
    public long countSubarrays(int[] arr) {
        int n = arr.length;
        Stack<Integer> st = new Stack<>();
        long res = 0;

        for(int i = 0; i < n; i++) {
            while(!st.isEmpty() && arr[i] < arr[st.peek()]) {
                int idx = st.pop();
                res += (i - idx);
            }
            st.push(i);
        }

        while(!st.isEmpty()) {
            int idx = st.pop();
            res += (n - idx);
        }

        return res;
    }
}
```

#### JavaScript

```jsx
class Solution {
    countSubarrays(arr) {
        let n = arr.length;
        let stack = [];
        let res = 0;

        for (let i = 0; i < n; i++) {
            while (stack.length && arr[i] < arr[stack[stack.length - 1]]) {
                let idx = stack.pop();
                res += (i - idx);
            }
            stack.push(i);
        }

        while (stack.length) {
            let idx = stack.pop();
            res += (n - idx);
        }

        return res;
    }
}
```

#### Python

```python
class Solution:
    def countSubarrays(self, arr):
        n = len(arr)
        stack = []
        res = 0

        for i in range(n):
            while stack and arr[i] < arr[stack[-1]]:
                idx = stack.pop()
                res += (i - idx)

            stack.append(i)

        while stack:
            idx = stack.pop()
            res += (n - idx)

        return res
```

### Complexity

|Metric|Value|
|---|---|
|Time Complexity|`O(N)`|
|Space Complexity|`O(N)`|

Each element is **pushed and popped from the stack at most once**.

## Common Mistakes

| Case | Why it matters |
|---|---|
| Equal values | The condition uses a strictly smaller boundary. Equal values can stay in the subarray. |
| Direction | Right-to-left computes the next boundary directly; left-to-right resolves older indices when a smaller value arrives. |
| Large counts | The number of subarrays can exceed `int`, so store the answer in `long long`/`long`. |

## Conclusion

Instead of checking every subarray:

- Focus on **each index as the starting point**
- Extend the subarray **until a smaller element appears**
- Count how many such extensions are possible

This avoids explicitly generating subarrays.

## Related

- [[sum-of-subarray-minimums]]
- [Stack Algorithm Visualizer](/algorithms/stack)
- [Big O Notation](/algorithms/big-o-notation)

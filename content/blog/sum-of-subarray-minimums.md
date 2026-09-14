---
title: "Sum of Subarray Minimums"
description: "Efficient monotonic stack approach to compute the sum of subarray minimum elements."
published: 2001-11-23
tags:
  - GeeksforGeeks
  - Monotonic Stack
  - POTD
  - Arrays
category: Blog
likes: 2
views: 16
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

> [!info] Sum of subarray minimums | Practice | GeeksforGeeks  
> Given an array arr[] of positive integers, find the total sum of the minimum elements of every possible subarrays.  
> [https://www.geeksforgeeks.org/problems/sum-of-subarray-minimum/1](https://www.geeksforgeeks.org/problems/sum-of-subarray-minimum/1)  

Given an integer array `arr[]`, for **every subarray** compute the **minimum element** and return the **sum of all those minimums**.

## Example

|Input|Output|Explanation|
|---|---|---|
|`[10,20]`|`40`|Subarrays → `(10)=10`, `(10,20)=10`, `(20)=20`|
|`[3,1,2,4]`|`17`|Subarrays → minimums: `(3)=3`, `(3,1)=1`, `(3,1,2)=1`, `(3,1,2,4)=1`, `(1)=1`, `(1,2)=1`, `(1,2,4)=1`, `(2)=2`, `(2,4)=2`, `(4)=4`|

## HINT

Instead of finding the minimum for **every subarray**,

> For each element `arr[i]`, how many subarrays have `arr[i]` as their minimum?

If an element is the minimum for **k subarrays**, its total contribution is: `arr[i] × k`

## Prerequisites

This problem relies on the **monotonic stack** contribution pattern: instead of asking "what is the minimum of this subarray?", ask "for how many subarrays is this element the minimum?"

- [https://cp-algorithms.com/data_structures/stack_queue_modification.html](https://cp-algorithms.com/data_structures/stack_queue_modification.html)
- [https://leetcode.com/problems/maximum-subarray/](https://leetcode.com/problems/maximum-subarray/)
- Related blog: [[subarrays-with-first-element-minimum]]
- Visual reference: [Stack Algorithm Visualizer](/algorithms/stack)

## Pattern

This is the same family as [[subarrays-with-first-element-minimum]]: use a monotonic stack to find the first boundary where an element stops being valid. The only difference is that here each element contributes `arr[i] * left * right`, while the related problem counts valid starting positions.

## Visual Walkthrough

```algo:stack
The stack keeps candidate indices in increasing order so each element can discover the range where it remains the minimum.
```

## Brute Force

### Idea

1. Generate every subarray.
2. Track the **minimum element** inside that subarray.
3. Add that minimum to the total sum.

`arr = [3,1,2]`

```
[3] → 3
[3,1] → 1
[3,1,2] → 1
[1] → 1
[1,2] → 1
[2] → 2
```

`Total: 3 + 1 + 1 + 1 + 1 + 2 = 9`

### Code

#### C++

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        int ans = 0;

        for(int i = 0; i < n; i++) {
            int mini = arr[i];
            for(int j = i; j < n; j++) {
                mini = min(mini, arr[j]);
                ans += mini;
            }
        }

        return ans;
    }
};
```

### Complexity

|Metric|Value|
|---|---|
|Time Complexity|`O(N²)`|
|Space Complexity|`O(1)`|

For `n ≤ 10^5`, this approach **will not work**.

## Optimal Approach

### Key Observation

Instead of computing the minimum for every subarray:

> Count how many subarrays **use each element as the minimum**.

If `arr[i]` is the minimum in some subarrays, then its **total contribution** is: `arr[i] × number_of_subarrays_where_it_is_minimum`

### Idea

For every element `arr[i]`, determine:

```
left = distance to previous smaller element
right = distance to next smaller element
```

Then the number of subarrays where `arr[i]` is the minimum: `count = left × right` and contribution: `arr[i] × left × right`

### Finding Previous and Next Smaller Elements

We use a **monotonic increasing stack**. Stack maintains indices of elements in **increasing order**.

We compute:

```
previous smaller element (PSE)
next smaller element (NSE)
```

in `O(N)` time.

### Approach

1. Compute **Previous Smaller Element (PSE)**.
2. Compute **Next Smaller Element (NSE)**.
3. For each index:

```
left = i - PSE[i]
right = NSE[i] - i

answer += arr[i] * left * right
```

For handling duplicates, notice the comparison differences:

```
PSE uses >
NSE uses >=
```

This prevents **double counting when duplicate values exist**.

### Code

#### C++

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        vector<int> prev(n), next(n);
        stack<int> st;

        for(int i = 0; i < n; i++) {
            while(!st.empty() && arr[st.top()] > arr[i])
                st.pop();

            prev[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }

        while(!st.empty()) st.pop();

        for(int i = n-1; i >= 0; i--) {
            while(!st.empty() && arr[st.top()] >= arr[i])
                st.pop();

            next[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        long long ans = 0;

        for(int i = 0; i < n; i++) {
            long long left = i - prev[i];
            long long right = next[i] - i;
            ans += arr[i] * left * right;
        }

        return ans;
    }
};
```

#### Java

```java
class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        int[] prev = new int[n];
        int[] next = new int[n];
        Stack<Integer> st = new Stack<>();

        for(int i = 0; i < n; i++) {
            while(!st.isEmpty() && arr[st.peek()] > arr[i])
                st.pop();

            prev[i] = st.isEmpty() ? -1 : st.peek();
            st.push(i);
        }

        st.clear();

        for(int i = n-1; i >= 0; i--) {
            while(!st.isEmpty() && arr[st.peek()] >= arr[i])
                st.pop();

            next[i] = st.isEmpty() ? n : st.peek();
            st.push(i);
        }

        long ans = 0;

        for(int i = 0; i < n; i++) {
            long left = i - prev[i];
            long right = next[i] - i;
            ans += arr[i] * left * right;
        }

        return (int) ans;
    }
}
```

#### Python

```python
class Solution:
    def sumSubarrayMins(self, arr):
        n = len(arr)
        stack = []
        prev = [-1]*n
        next = [n]*n

        for i in range(n):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()

            prev[i] = stack[-1] if stack else -1
            stack.append(i)

        stack = []

        for i in range(n-1, -1, -1):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()

            next[i] = stack[-1] if stack else n
            stack.append(i)

        ans = 0

        for i in range(n):
            left = i - prev[i]
            right = next[i] - i
            ans += arr[i] * left * right

        return ans
```

#### JavaScript

```jsx
function sumSubarrayMins(arr) {
    const n = arr.length;
    const prev = new Array(n);
    const next = new Array(n);
    const stack = [];

    for(let i = 0; i < n; i++) {
        while(stack.length && arr[stack[stack.length-1]] > arr[i]) {
            stack.pop();
        }

        prev[i] = stack.length ? stack[stack.length-1] : -1;
        stack.push(i);
    }

    stack.length = 0;

    for(let i = n-1; i >= 0; i--) {
        while(stack.length && arr[stack[stack.length-1]] >= arr[i]) {
            stack.pop();
        }

        next[i] = stack.length ? stack[stack.length-1] : n;
        stack.push(i);
    }

    let ans = 0;

    for(let i = 0; i < n; i++) {
        const left = i - prev[i];
        const right = next[i] - i;
        ans += arr[i] * left * right;
    }

    return ans;
}
```

### Complexity Analysis

|Metric|Complexity|
|---|---|
|Time Complexity|**O(N)**|
|Space Complexity|**O(N)**|

Each element is pushed and popped from the stack **at most once**.

## Common Mistakes

| Case | What to watch |
|---|---|
| Duplicate values | Use `>` on the previous-smaller pass and `>=` on the next-smaller pass so equal values are owned by one side only. |
| Large answers | Use `long long`/`long`; many versions of this problem require modulo arithmetic. |
| Empty stack | Treat no previous smaller as `-1` and no next smaller as `n`. |

## Conclusion

Instead of examining every subarray:

1. Determine **how far each element can extend while remaining at a minimum**.
2. Count how many subarrays use that element as the minimum.
3. Multiply by the element value to compute its **total contribution**.

Using a **monotonic stack**, we reduce the problem from O(N²) to O(N)

## Related

- [[subarrays-with-first-element-minimum]]
- [Stack Algorithm Visualizer](/algorithms/stack)
- [Big O Notation](/algorithms/big-o-notation)

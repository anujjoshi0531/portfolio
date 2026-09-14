---
title: "Game of XOR"
description: "Comprehensive guide to solving GeeksforGeeks Game of XOR problem using bitwise operations."
published: 2001-11-23
thumbnail: _assets/thumbnails/gfg-gameOfXor.webp
tags:
  - GeeksforGeeks
  - Bit Manipulation
  - POTD
  - XOR
category: Blog
likes: 0
views: 0
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

> [!info] Game of XOR | Practice | GeeksforGeeks  
> You are given an integer array arr[].  
> [https://www.geeksforgeeks.org/problems/game-of-xor1541/1](https://www.geeksforgeeks.org/problems/game-of-xor1541/1)  

## Problem

You are given an integer array `arr[]`. The value of a subarray is defined as the bitwise XOR of all elements in that subarray. Compute the bitwise XOR of the values of `all possible subarrays of arr[]`.

|**Input**|**Output**|**Explanation**|
|---|---|---|
|`[1,2,3]`|`2`|`Subarrays: (1), (1,2), (2), (2,3), (1,2,3), (3)`  
`XORs = 1,3,2,1,0,3`  
`Result = 1 ^ 3 ^ 2 ^ 1 ^ 0 ^ 3 = 2`|
|`[1,2]`|`0`|`Subarrays: (1), (1,2), (2) XORs , 3 , 2`  
`Result : 1 ^ 3 ^ 2 = 0`|

## Prerequisites

### Bitwise XOR Properties

- `a ^ a = 0`
- `a ^ 0 = a`
- XOR is associative: `a ^ (b ^ c) = (a ^ b) ^ c`
- Order does not matter: `a ^ b = b ^ a`

### Resources

- [Bit Manipulation | LeetCode The Hard Way](https://leetcodethehardway.com/tutorials/math/bit-manipulation)
- [CPH Bit Manipulation](https://usaco.guide/CPH.pdf#page=105) (extra)
- [Bit manipulation - CP Algorithms](https://cp-algorithms.com/algebra/bit-manipulation.html)
- [CF - Raising Bacteria](https://codeforces.com/problemset/problem/579/A)
- [Virtual Judge - Little Elephant and Bits](https://vjudge.net/problem/CodeForces-258A)
- [Virtual Judge - Maximizing Xor](https://vjudge.net/problem/HackerRank-maximizing-xor)
- [CF - Preparing Olympiad](https://codeforces.com/problemset/problem/550/B)
- [Virtual Judge - Red Scarf](https://vjudge.net/problem/AtCoder-abc171_e)

## Pattern

This is a contribution-counting problem. Instead of listing every subarray, count how many subarrays include each element. XOR makes the final step simple: values that appear an even number of times cancel out.

Useful reference: [Big O Notation](/algorithms/big-o-notation)

## Brute Force

Generate all subarrays and compute the XOR of each subarrays.

This is not feasible for the constraint `n ≤ 10^5` , because time complexity is `O(N^2)`

## Code

```cpp
class Solution {
  public:
    int subarrayXor(vector<int>& arr) {
        int n = arr.size();
        int xr = 0;
        for(int i = 0; i < n; i++){
            int cur = 0;
            for(int j = i; j < n; j++){
                cur ^= arr[j];
                xr ^= cur;
            }
        }
        return xr;
    }
};
```

## Optimal Approach

### Hint

For an element, `arr[i]`: How many subarrays include `arr[i]`

### Idea

We should compute the involvement of each number in the respective subarray. There are three conditions only:

- The subarray starts from `0 to i` of the array
- The subarray ends at `i to n-1` of the array

Therefore, for `arr[i]`:

- Possible start positions: `i+1`
- Possible end positions: `n-i`

So, total appearances in subarrays: `count = (i+1)*(n-i)`

> If an element appears an **even** number of times, it cancels out in XOR. If it appears an **odd** times, it contributes to the final result.

### Approach

1. While iterating, compute the occurrence of each element by `(i+1)*(n-i)`
2. If the occurrence is odd, then take XOR. Otherwise, they will cancel each other.
3. Return the final result.

### Code

```cpp
class Solution {
  public:
    int subarrayXor(vector<int>& arr) {
        int n = arr.size();
        int xr = 0;
        for(int i = 0; i < n; i++){
            int cnt = (i+1)*(n-i);
            if(cnt&1) xr ^= arr[i];
        }
        return xr;
    }
};
```

`Time Complexity: O(N)`

`Space Complexity: O(1)`

This approach only requires one pass through the array and constant extra storage.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Wrong contribution formula | Use `(i + 1) * (n - i)`, not `(i + 1) * (n - 1)`. |
| Forgetting XOR cancellation | Even appearances contribute `0`; only odd appearances remain. |
| Building all subarrays | Counting contributions reduces the solution to one pass. |

## Conclusion

Instead of building subarrays, the most efficient method is to compute the occurrence of each element in its subarrays and take only the odd occurrences for the XOR.

This greedy approach works because XORs at even count cancel each other out.

## Related

- [Big O Notation](/algorithms/big-o-notation)
- [[leetcode-weekly-contest-476]]
- [[leetcode-weekly-contest-494]]

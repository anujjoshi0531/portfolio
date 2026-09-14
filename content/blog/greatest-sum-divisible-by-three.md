---
title: "Greatest Sum Divisible by Three"
description: "Optimal approach and explanation to find the maximum sum of elements divisible by three on LeetCode."
published: 2001-11-23
thumbnail: _assets/thumbnails/gfg-subarrays.webp
tags:
  - Leetcode
  - POTD
  - Dynamic Programming
  - Greedy
category: Blog
likes: 0
views: 4
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## Problem

[https://leetcode.com/problems/greatest-sum-divisible-by-three](https://leetcode.com/problems/greatest-sum-divisible-by-three/)

Given an integer array `nums`, the goal is to select a subset of elements such that, `the total sum is maximum` and `the sum is divisible by 3`

|**Input**|**Output**|**Explanation**|
|---|---|---|
|`[3,6,5,1,8]`|`18`|Pick `3 + 6 + 1 + 8`, which is the largest divisible sum|
|`[4]`|`0`|No valid subset, so return 0|
|`[1,2,3,4,4]`|`12`|Pick `1 + 3 + 4 + 4 = 12`|

## Brute Force

Generate all subsets and compute the sum of each subset. Update the best sum divisible by 3

This is not feasible for the constraint `n ≤ 40,000` , because time complexity is `O(2^n)`

## Pattern

This problem can be solved either as a tiny dynamic programming state machine or as a greedy removal problem. The greedy version works because only the remainder modulo `3` matters.

Useful references:

- [Greedy vs DP](/algorithms/greedy-vs-dp)
- [Memoization](/algorithms/memoization)

## Visual Walkthrough

```algo:greedy-vs-dp
The key decision is whether to store best sums by remainder or remove the smallest values that fix the final remainder.
```

## Optimal Approach

### Idea

Every number, when divided by 3, produces three possible remainders: 0, 1, and 2.

If we compute the total sum, which is also a number, then:

- If `sum % 3 == 0`, it is already valid.
- If `sum % 3 == 1`, we must remove the smallest possible value that makes the remaining sum divisible by 3: Either the smallest number with remainder `1` or the sum of the two smallest numbers with remainder `2`
- If `sum % 3 == 2`, remove the smallest number with a remainder `2` or the sum of the two smallest numbers with remainder `1`

### Approach

1. Compute the total sum of all elements.
2. While iterating, keep the smallest and second-smallest elements among numbers with a remainder of 1, and likewise for those with a remainder of 2.
3. Adjust the final result based on `sum % 3`.

### Dry Run

For `nums = [3, 6, 5, 1, 8]`:

| Step | Value |
|---|---|
| Total sum | `23` |
| `23 % 3` | `2` |
| Remove options | smallest remainder `2` value is `5`, or two smallest remainder `1` values if both exist |
| Best removal | `5` |
| Answer | `23 - 5 = 18` |

### Code

```cpp
class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        int sum = 0;
        int a = INT_MAX, b = INT_MAX; // two smallest values with rem = 1
        int c = INT_MAX, d = INT_MAX; // two smallest values with rem = 2

        for(int &num : nums){
            sum += num;
            int rem = num % 3;

            if(rem == 1){
                if(a > num){
                    b = a;
                    a = num;
                } else if(b > num){
                    b = num;
                }
            } else if(rem == 2){
                if(c > num){
                    d = c;
                    c = num;
                } else if(d > num){
                    d = num;
                }
            }
        }

        int rem = sum % 3;

        if(rem == 1){
            int x = a;
            if(c != INT_MAX && d != INT_MAX) x = min(x, c+d);
            return sum - x;
        }
        else if(rem == 2){
            int x = c;
            if(a != INT_MAX && b != INT_MAX) x = min(x, a+b);
            return sum - x;
        }

        return sum;
    }
};
```

`Time Complexity: O(N)`

`Space Complexity: O(1)`

This approach only requires one pass through the array and constant extra storage.

## Common Mistakes

| Case | What to remember |
|---|---|
| `sum % 3 == 1` | Remove one smallest `rem=1` number or two smallest `rem=2` numbers. |
| `sum % 3 == 2` | Remove one smallest `rem=2` number or two smallest `rem=1` numbers. |
| Missing candidates | Only use a pair if both values exist. |

## Conclusion

Instead of building subsets, the most efficient method is to compute the total sum and remove the smallest necessary values to make it divisible by three.

This greedy approach works because modulo arithmetic with 3 provides predictable behaviour that allows controlled adjustments with minimal loss.

## Related

- [Greedy vs DP](/algorithms/greedy-vs-dp)
- [Memoization](/algorithms/memoization)
- [[maximum-total-value-k-subarrays]]

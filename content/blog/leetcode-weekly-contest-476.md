---
title: "Leetcode Weekly Contest 476"
description: "Solutions covering prefix sums, prefix XOR, difference arrays, and modular arithmetic for LeetCode Contest 476."
published: 2001-08-30
thumbnail: _assets/thumbnails/lc-476.webp
tags:
  - Contest
  - Leetcode
category: Blog
likes: 0
views: 1
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

> [!info] Contest - LeetCode  
> LeetCode hosts coding contests regularly, including weekly contests and specialized events like university coding competitions.  
> [https://leetcode.com/contest/weekly-contest-477/](https://leetcode.com/contest/weekly-contest-477/)  

Weekly Contest 477 revolves heavily around **prefix sums**, **prefix XOR**, and efficient suffix extraction techniques such as **difference arrays and modulus arithmetic**.

This guide covers all prerequisite concepts followed by clear solutions to the three contest problems, including constraints, hints, and example test cases to ensure complete understanding.

## Prerequisites

`Prefix sums are widely used in competitive programming to reduce the time complexity for handling multiple range-based operations.`

- [CPH Range Queries (before Binary Indexed Tree)](https://cses.fi/book/book.pdf#page=93)
- [USACO Guide – Prefix Sums (Chapter 11)](https://darrenyao.com/usacobook/cpp.pdf#page=60)
- [LeetCode Solved Examples](https://leetcodethehardway.com/tutorials/basic-topics/prefix-sum) — includes two solved illustrations
- [Maximum Sum Subsection](https://www.iarcs.org.in/inoi/online-study-material/topics/prefix-sums-maximum-sum-subsection.php)
- CSES: [Sum Queries](https://cses.fi/problemset/task/1646), [XOR Queries](https://cses.fi/problemset/task/1650)
- Codeforces: [Playing in a Casino](https://codeforces.com/problemset/problem/1808/B)
- CSES: [Subarray Sums II](https://cses.fi/problemset/task/1661/)
- CodeChef: [GCD Discount](https://www.codechef.com/problems/GCDISCOUNT)
- CSES: [Maximum Subarray Sum](https://cses.fi/problemset/task/1643)

### 2D Prefix Sum

- [Ramu's Mango Trees](https://www.iarcs.org.in/inoi/online-study-material/topics/prefix-sums-ramus-mango-trees.php)
- CSES: [Forest Queries](https://cses.fi/problemset/task/1652)
- AOJ: [Maximum Number of Overlaps](https://onlinejudge.u-aizu.ac.jp/courses/library/3/DSL/5/DSL_5_B)

## Concatenate non-zero digits and multiply Sum I

> [!info] Concatenate Non-Zero Digits and Multiply by Sum I - LeetCode  
> Can you solve this real interview question?  
> [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i/](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i/)  

You are given an integer `n`. Form a new integer `x` by concatenating all the non-zero digits of `n` in their original order. Then, compute `x * (sum of digits in x)` If no non-zero digits exist, `x = 0`.

### **Constraints**

`0 ≤ n ≤ 10^9`

|**Input**|**Output**|**Explanation**|
|---|---|---|
|`10203004`|`12340`|x=1234, sum=10 → 1234×10|
|`1000`|`1`|x=1, sum=1|
|`0`|`0`|No digits|
|`909`|`162`|x=99, sum=18 → 99×18|

## Hint

Track two variables, `sum` and `nonZero`, for collecting the non-zero digits and computing their sum.

## Code

```cpp
class Solution {
public:
    long long sumAndMultiply(int n) {
        string s = to_string(n);
        long long sum = 0, nonZero = 0;

        for(char c : s) {
            int num = c - '0';
            if(num != 0) {
                nonZero = nonZero * 10 + num;
                sum += num;
            }
        }
        return nonZero * sum;
    }
};
```

### Complexity

- Time: `O(N)`
- Space: `O(1)`

## Find the maximum balanced xor subarray length

> [!info] Find Maximum Balanced XOR Subarray Length - LeetCode  
> Can you solve this real interview question?  
> [https://leetcode.com/problems/find-maximum-balanced-xor-subarray-length/](https://leetcode.com/problems/find-maximum-balanced-xor-subarray-length/)  

Given an array, return the length of the longest subarray such that: XOR of all elements = `0` and the number of even and odd elements is equal

### **Constraints**

- `1 ≤ nums.length ≤ 10^5`
- `0 ≤ nums[i] ≤ 10^9`

|**Input**|**Output**|**Explanation**|
|---|---|---|
|`[3,1,3,2,0]`|`4`|`[1,3,2,0]` works|
|`[3,2,8,5,4,14,9,15]`|`8`|Full array valid|
|`[0]`|`0`|No valid subarray|
|`[1,2,3,4]`|`2`|`[1,2]` works|

## Hint

Track two prefix metrics: `pxor = prefix XOR` and `diff = (#odd - #even)`

Store the earliest index of each `(pxor, diff)` pair in a HashMap.

## Code

```cpp
class Solution {
public:
    int maxBalancedSubarray(vector<int>& nums) {
		    int n = nums.size();
        map<pair<int,int>, int> mp;

        int xr = 0, cnt = 0, res = 0;
        mp[{0,0}] = -1;

        for (int i = 0; i < n; i++) {
            xr ^= nums[i];
            if (nums[i]&1) cnt++;
            else cnt--;
            pair<int,int> key = {xr, cnt};
            if (mp.count(key)) res = max(res, i - mp[key]);
            else mp[key] = i;
        }
        return res;
    }
};
```

### Complexity

- Time: `O(N)`
- Space: `O(N)`

## Concatenate non-zero digits and multiply sum II

> [!info] Concatenate Non-Zero Digits and Multiply by Sum II - LeetCode  
> Can you solve this real interview question?  
> [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii/)  

Given a digit string `s` and multiple queries `(l, r)`:

1. Extract substring `s[l..r]`
2. Concatenate non-zero digits → `x`
3. Compute sum of digits in `x`
4. Return `(x * sum) mod (1e9+7)`

### Constraints

- `1 ≤ s.length ≤ 10^5`
- `1 ≤ queries.length ≤ 10^5`
- Output modulo `1e9 + 7`

|**Input**|**Output**|
|---|---|
|`"10203004", [[0,7],[1,3],[4,6]]`|`[12340,4,9]`|
|`"1000", [[0,3],[1,1]]`|`[1,0]`|
|`"9876543210", [[0,9]]`|`[444444137]`|
|`"00000", [[0,4]]`|`[0]`|

## Hint

Use prefix arrays to track:

- sum of non-zero digits
- modular concatenation of digits
- powers of 10
- count of non-zero digits

Each query resolves in `O(1)`.

## Code

```cpp
class Solution {
public:
    static const int MOD = 1e9 + 7;

    vector<int> sumAndMultiply(string s, vector<vector<int>>& queries) {
        int n = s.size();
        vector<long long> sum(n+1, 0), pref(n+1, 0), pow10(n+1);
        vector<int> prefLen(n+1, 0);

        pow10[0] = 1;

        for(int i = 0; i < n; i++) {
            pow10[i+1] = (pow10[i] * 10) % MOD;
            int d = s[i] - '0';

            sum[i+1] = sum[i];
            pref[i+1] = pref[i];
            prefLen[i+1] = prefLen[i];

            if(d != 0) {
                sum[i+1] += d;
                pref[i+1] = (pref[i] * 10 + d) % MOD;
                prefLen[i+1]++;
            }
        }

        vector<int> res;
        res.reserve(queries.size());

        for(auto &q : queries) {
            int l = q[0], r = q[1];
            long long total = sum[r+1] - sum[l];

            if(total == 0) {
                res.push_back(0);
                continue;
            }

            int len = prefLen[r+1] - prefLen[l];
            long long val = (pref[r+1] - (pref[l] * pow10[len]) % MOD + MOD) % MOD;

            res.push_back((val * total) % MOD);
        }

        return res;
    }
};
```

### Complexity

- Preprocessing: `O(N)`
- Query: `O(1)`
- Total: `O(N + Q)`

## Related

- [[game-of-xor]]
- [[greatest-sum-divisible-by-three]]
- [Big O Notation](/algorithms/big-o-notation)
- [Greedy vs DP](/algorithms/greedy-vs-dp)

---
title: "Maximum Total Value of K Subarrays"
description: "Algorithmic walkthrough for finding the maximum total value of K non-overlapping subarrays."
published: 2001-09-25
tags:
  - Greedy
  - Leetcode
  - Sparse-Tree
  - Range Query
category: Blog
likes: 0
views: 2
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## Problem

We are given an array of integers `nums` of length `n` and an integer `k`. The task is to select exactly `k` distinct, non-empty subarrays from `nums` (subarrays can overlap, but each subarray can only be selected once), and maximize the total value, where the value of a subarray nums[l..r] = max(nums[l..r]) - min(nums[l..r])

## Brute Force

  

### Approach

1. Generate all possible subarrays of the array `nums` by fixing start i and changing j to calculate max, min for all nums[j].
2. For each subarray, compute the value (max - min).
3. Keep a priority queue to maintain only top `k` values to maximize the result.

  

### Code

```cpp
class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int n = nums.size();
	      priority_queue<int, vector<int>, greater<>> pq;
	      for(int i = 0; i < n; i++){
		        int maxi = INT_MIN;
		        int mini = INT_MAX;
		        for(int j = i; j < n; j++){
			          maxi = max(maxi, nums[j]);
			          mini = min(mini, nums[j]);
			          pq.push(maxi-mini);
			          if(pq.size() > k) pq.pop();
			       }  
			   }
			   long long res = 0;
			   
			   while(!pq.empty()){
					   res += pq.top();
					   pq.pop();
				 }
				 return res;
    }
};
```

## Best Approach

  

### Idea

The value of subarray is monotonic, because max value always increases with increasing subarray, similarly min value decreases with increasing subarray.

Therefore, it behaves monotonically.

The cost either remain same or increase always

Useful references:

- [Greedy vs DP](/algorithms/greedy-vs-dp)
- [Big O Notation](/algorithms/big-o-notation)
- [[greatest-sum-divisible-by-three]]

  

### Approach

1. **Build Sparse Table:** Precompute min and max for all ranges using a sparse table.
2. **Initialize Intervals:** For all subarrays `[0, i]`, compute `(max - min)` and store in a multiset.
3. **Select Top** `**k**`**:** Repeatedly pick the interval with the highest value, add it to the result, and split the interval (remove leftmost element).
4. **Repeat:** Do this `k` times to get the maximum total value.

  

### Code

```cpp
class SparseTable {
private:
    int n;
    vector<vector<int>> mn, mx;
    vector<int> lval;

public:
    SparseTable(const vector<int>& nums) {
        n = nums.size();
        int maxLog = 32 - __builtin_clz(n);
        mn.assign(n, vector<int>(maxLog));
        mx.assign(n, vector<int>(maxLog));
        lval.resize(n + 1);

        for (int i = 2; i <= n; ++i)
            lval[i] = lval[i / 2] + 1;

        for (int i = 0; i < n; ++i)
            mn[i][0] = mx[i][0] = nums[i];

        for (int j = 1; (1 << j) <= n; ++j)
            for (int i = 0; i + (1 << j) <= n; ++i) {
                mn[i][j] = min(mn[i][j - 1], mn[i + (1 << (j - 1))][j - 1]);
                mx[i][j] = max(mx[i][j - 1], mx[i + (1 << (j - 1))][j - 1]);
            }
    }

    int mini(int l, int r) const {
        int j = lval[r - l + 1];
        return min(mn[l][j], mn[r - (1 << j) + 1][j]);
    }

    int maxi(int l, int r) const {
        int j = lval[r - l + 1];
        return max(mx[l][j], mx[r - (1 << j) + 1][j]);
    }

    int rangeDiff(int l, int r) const {
        return maxi(l, r) - mini(l, r);
    }
};

class Solution {
public:
    long long maxTotalValue(vector<int>& nums, int k) {
        int n = nums.size();
        SparseTable st(nums);
        long long res = 0;

        multiset<tuple<int, int, int>> ms;
        for (int i = 0; i < n; ++i)
            ms.insert({st.rangeDiff(0, i), 0, i});

        while (k-- && !ms.empty()) {
            auto [val, l, r] = *ms.rbegin();
            ms.erase(prev(ms.end()));
            res += val;

            if (l + 1 <= r) ms.insert({st.rangeDiff(l + 1, r), l + 1, r});
        }

        return res;
    }
};
```

## Complexity

| Approach | Time | Space |
|---|---:|---:|
| Brute force with heap | `O(n^2 log k)` | `O(k)` |
| Sparse table with ordered candidates | `O((n + k) log n)` after preprocessing | `O(n log n)` |

## Common Mistakes

| Mistake | Fix |
|---|---|
| Recomputing max/min for every candidate range | Precompute range min/max with a sparse table. |
| Assuming subarrays cannot overlap | The selected subarrays only need to be distinct; overlap is allowed. |
| Forgetting to split candidates | After taking `[l, r]`, insert `[l + 1, r]` if it remains valid. |

## Related

- [[greatest-sum-divisible-by-three]]
- [Greedy vs DP](/algorithms/greedy-vs-dp)
- [Big O Notation](/algorithms/big-o-notation)

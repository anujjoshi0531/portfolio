---
title: "Leetcode Weekly Contest 46"
description: "Problem summaries and solution approaches for LeetCode Weekly Contest 46."
published: 2001-09-25
tags:
  - Greedy
  - Leetcode
  - Sparse-Tree
category: Blog
thumbnail: _assets/thumbnails/lc-contest.png
likes: 0
views: 0
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## **Problem**

We are given an array of integers `nums` of length `n` and an integer `k`. The task is to select exactly `k` distinct, non-empty subarrays from `nums` (subarrays can overlap, but each subarray can only be selected once), and maximize the total value, where the value of a subarray nums[l..r] = max(nums[l..r]) - min(nums[l..r])

## **Brute Force**

  

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
			          mini = min(mini, nums[j]));
			          pq.push(maxi-mini);
			          if(pq.size() > k) pq.pop();
			       }  
			   }
			   long long res = 0;
			   
			   while(!pq.empty()){
					   res += pq.top();
					   pq.pop();
				 }    
    }
};
```

## **Best Approach**

  

### Idea

The value of subarray is monotonic, because max value always increases with increasing subarray, similarly min value decreases with increasing subarray.

Therefore, it behaves monotonically.

The cost either remain same or increase always

  

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

## Related

- [[maximum-total-value-k-subarrays]]
- [[greatest-sum-divisible-by-three]]
- [Big O Notation](/algorithms/big-o-notation)
- [Greedy vs DP](/algorithms/greedy-vs-dp)

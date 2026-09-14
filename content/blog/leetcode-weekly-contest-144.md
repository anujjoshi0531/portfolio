---
title: "Leetcode Weekly Contest 144"
description: "Detailed breakdowns and solutions for problems in LeetCode Weekly Contest 144."
published: 2001-08-30
tags:
  - Contest
  - Leetcode
category: Blog
likes: 0
views: 0
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## [1108. Defanging an IP Address](https://leetcode.com/problems/defanging-an-ip-address/)

### Problem

Given a valid IPv4 IP address, return a **defanged version** where every `"."` is replaced with `"[.]"`.

**Example:**

- Input: `"1.1.1.1"` Output: `"1[.]1[.]1[.]1"`
- Input: `"255.100.50.0"` Output: `"255[.]100[.]50[.]0"`

### Approach

- Traverse the string.
- For each character:
    - If it is `.`, append `[.]` to the result.
    - Else, append the character itself.

### Code

```cpp
class Solution {
public:
    string defangIPaddr(string address) {
        string res = "";
        for(char &ch: address){
            if(ch == '.') res += "[.]";
            else res += ch;
        }
        return res;
    }
};
```

**Time Complexity:** `O(n)`

**Space Complexity:** `O(n)`

## [1109. Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/)

### Problem

There are `n` flights labelled from `1` to `n`. Each booking is `[first, last, seats]` representing seats booked for all flights from `first` to `last`.

Return a list of total seats booked for each flight.

**Example:**

- Input: `bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5`
    
    Output: `[10,55,45,25,25]`

### Approach

- Use a **difference array**:
    - Add `seats` at `start-1`.
    - Subtract `seats` at `end` (if `end < n`).
- Compute **prefix sum** to get actual seats for each flight.

### Code

```cpp
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> seats(n, 0);
        for(auto &b: bookings){
            int start = b[0], end = b[1], seat = b[2];
            seats[start-1] += seat;
            if(end < n) seats[end] -= seat;
        }
        for(int i = 1; i < n; i++) seats[i] += seats[i-1];
        return seats;
    }
};
```

**Time Complexity:** `O(n + m)` (m = number of bookings)

**Space Complexity:** `O(n)`

## [1110. Delete Nodes And Return Forest](https://leetcode.com/problems/delete-nodes-and-return-forest/)

### Problem

Given a binary tree root and a list of nodes `to_delete`, remove these nodes and return the forest of remaining trees.

**Example:**

- Input: `root = [1,2,3,4,5,6,7], to_delete = [3,5]`
    
    Output: `[[1,2,null,4],[6],[7]]`

### Approach

- Use **BFS/DFS** traversal.
- Track nodes to delete using a set or array.
- If a node is deleted:
    - Detach it from parent.
    - Its children (if not deleted) become new roots.
- Collect all new roots in a result vector.

### Code

```cpp
class Solution {
public:
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        vector<TreeNode*> res;
        if(!root) return res;

        vector<int> st(10001, 0);
        for(int &val: to_delete) st[val] = 1;

        queue<pair<TreeNode*, bool>> q;
        q.push({root, false});
        unordered_map<TreeNode*, TreeNode*> parentMap;

        while(!q.empty()){
            TreeNode* cur = q.front().first;
            bool status = q.front().second;
            q.pop();

            if(st[cur->val]){
                TreeNode* parent = parentMap[cur];
                if(parent){
                    if(parent->left == cur) parent->left = nullptr;
                    if(parent->right == cur) parent->right = nullptr;
                }
                if(cur->left) q.push({cur->left, false});
                if(cur->right) q.push({cur->right, false});
            }
            else {
                if(!status) res.push_back(cur);
                if(cur->left){
                    q.push({cur->left, true});
                    parentMap[cur->left] = cur;
                }
                if(cur->right){
                    q.push({cur->right, true});
                    parentMap[cur->right] = cur;
                }
            }
        }
        return res;
    }
};
```

**Time Complexity:** `O(n)`

**Space Complexity:** `O(n)`

## Related

- [[leetcode-weekly-contest-476]]
- [[game-of-xor]]
- [Stack Algorithm Visualizer](/algorithms/stack)
- [Big O Notation](/algorithms/big-o-notation)

## [1111. Maximum Nesting Depth of Two Valid Parentheses Strings](https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)

### Problem

Given a valid parentheses string `seq`, split it into two disjoint valid strings `A` and `B` such that **maximum depth of either is minimized**.

Return an array where `res[i] = 0` if `seq[i]` is part of `A`, else `1`.

**Example:**

- Input: `"(()())"` → Output: `[0,1,1,1,1,0]`

### Approach

- Use a **stack or depth counter**:
    - Keep track of nesting depth.
    - Alternate assignment of `'('` and `')'` to `A` and `B` to minimize max depth.

### Code

```cpp
class Solution {
public:
    vector<int> maxDepthAfterSplit(string seq) {
        int n = seq.size();
        stack<char> st1, st2;
        vector<int> res(n);
        for(int i = 0; i < n; i++){
            char ch = seq[i];
            if(ch == '('){
                if(st2.size() < st1.size()){
                    st2.push('(');
                    res[i] = 1;
                } else {
                    st1.push('(');
                    res[i] = 0;
                }
            } else {
                if(st2.size() < st1.size()){
                    st1.pop();
                    res[i] = 0;
                } else {
                    st2.pop();
                    res[i] = 1;
                }
            }
        }
        return res;
    }
};
```

**Time Complexity:** `O(n)`

**Space Complexity:** `O(n)`

---
id: sliding-window
title: "Sliding Window"
category: "Concepts"
difficulty: intermediate
visualization: concept
description: "Perform required operations on a window that slides over data to avoid redundant computations."
runtime: sliding-window
---

# Sliding Window

Sliding Window maintains a dynamic range (window) over a sequence, expanding and contracting to solve substring/subarray problems efficiently.

How it works:
1. Expand the window by moving the right pointer
2. If a condition is violated, shrink from the left
3. Track the best result seen so far

Time Complexity: O(n) — each character is visited at most twice
Space Complexity: O(min(n, alphabet))

Classic problems:
  - Longest substring without repeating chars
  - Minimum window substring
  - Maximum sum subarray of size k
  - Longest repeating character replacement

```js
function longestUniqueSubstring(s) {
  const seen = new Set();
  let start = 0, best = 0, bestStart = 0;

  for (let end = 0; end < s.length; end++) {
    while (seen.has(s[end])) {
      seen.delete(s[start]);
      start++;
    }
    seen.add(s[end]);
    if (end - start + 1 > best) {
      best = end - start + 1;
      bestStart = start;
    }
  }
  return s.slice(bestStart, bestStart + best);
}
```

```python
def longest_unique_substring(s):
    seen = set()
    start, best, best_start = 0, 0, 0

    for end in range(len(s)):
        while s[end] in seen:
            seen.remove(s[start])
            start += 1
        seen.add(s[end])
        if end - start + 1 > best:
            best = end - start + 1
            best_start = start
    return s[best_start:best_start + best]
```

```java
String longestUniqueSubstring(String s) {
    Set<Character> seen = new HashSet<>();
    int start = 0, best = 0, bestStart = 0;

    for (int end = 0; end < s.length(); end++) {
        while (seen.contains(s.charAt(end))) {
            seen.remove(s.charAt(start));
            start++;
        }
        seen.add(s.charAt(end));
        if (end - start + 1 > best) {
            best = end - start + 1;
            bestStart = start;
        }
    }
    return s.substring(bestStart, bestStart + best);
}
```

```cpp
string longestUniqueSubstring(const string& s) {
    unordered_set<char> seen;
    int start = 0, best = 0, bestStart = 0;

    for (int end = 0; end < (int)s.size(); end++) {
        while (seen.count(s[end])) {
            seen.erase(s[start]);
            start++;
        }
        seen.insert(s[end]);
        if (end - start + 1 > best) {
            best = end - start + 1;
            bestStart = start;
        }
    }
    return s.substr(bestStart, best);
}
```

```rust
fn longest_unique_substring(s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();
    let mut seen: HashSet<char> = HashSet::new();
    let (mut start, mut best, mut best_start) = (0, 0, 0);

    for end in 0..chars.len() {
        while seen.contains(&chars[end]) {
            seen.remove(&chars[start]);
            start += 1;
        }
        seen.insert(chars[end]);
        if end - start + 1 > best {
            best = end - start + 1;
            best_start = start;
        }
    }
    chars[best_start..best_start + best].iter().collect()
}
```

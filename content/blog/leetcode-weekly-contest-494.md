---
title: "Leetcode Weekly Contest 494"
description: "Covers parity concepts, fundamental dynamic programming techniques, and XOR operations for Contest 494."
published: 2001-09-25
tags:
  - Leetcode
  - Dynamic Programming
  - Bit Manipulation
  - Contest
category: Blog
thumbnail: _assets/thumbnails/lc-contest.png
likes: 0
views: 1
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## Contest Summary

This contest emphasizes odd/even parity, small dynamic programming states, and XOR contribution logic. Keep the post concise as a contest index, then link out to deeper notes for reusable patterns.

| Topic | Pattern | Reference |
|---|---|---|
| Parity | Count odd/even behavior instead of simulating every option | [Big O Notation](/algorithms/big-o-notation) |
| Dynamic programming | Store only the state needed for the next transition | [Memoization](/algorithms/memoization) |
| XOR | Even occurrences cancel, odd occurrences remain | [[game-of-xor]] |

## Takeaways

- Check whether the problem is really asking for parity, not the full value.
- For DP, name the state before writing the transition.
- For XOR, count how many times each value contributes.

## Related

- [[game-of-xor]]
- [[greatest-sum-divisible-by-three]]
- [Greedy vs DP](/algorithms/greedy-vs-dp)

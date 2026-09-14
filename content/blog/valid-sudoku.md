---
title: "Valid Sudoku"
description: "Validating partially filled 9x9 Sudoku boards using hash sets and bitmasking techniques."
published: 2001-08-30
thumbnail: _assets/thumbnails/lc.png
tags:
  - Leetcode
  - POTD
  - Hash Table
  - Matrix
category: Blog
likes: 0
views: 0
created: 2025-06-11T14:50
updated: 2026-03-25T14:00
---

## Problem

[Leetcode: Valid Sudoku](https://leetcode.com/problems/valid-sudoku)

[GFG: Is Sudoku Valid](https://www.geeksforgeeks.org/problems/is-sudoku-valid4820/1)

We are given a **partially filled 9x9 Sudoku board**. We need to validate whether the current state of the board is valid or not. A board is considered **valid** if:

- Each **row** contains digits 1–9 **without repetition**.
- Each **column** contains digits 1–9 **without repetition**.
- Each of the **nine 3x3 sub-boxes** contains digits 1–9 **without repetition**.

Empty cells may be represented by `0` or `'.'`

## Pattern

This is a constraint validation problem. Each filled value belongs to exactly three groups:

| Group | Key |
|---|---|
| Row | `rowIndex` |
| Column | `colIndex` |
| Box | `3 * (rowIndex / 3) + (colIndex / 3)` |

If a value appears twice in any one of these groups, the board is invalid immediately.

Visual references:

- [Hash Table Algorithm Visualizer](/algorithms/hash-table)
- [Sudoku Solver Visualizer](/algorithms/sudoku-solver)

## Visual Walkthrough

```algo:hash-table
Use sets like small hash tables: each row, column, and 3x3 box records the digits already seen.
```

## Approach

1. Create **9 sets for each** row, column, and 3x3 box
2. For every filled cell `mat[i][j]`:
    - Skip if the value is `0`.
    - Calculate the box index using: `boxIndex = 3 * (i / 3) + (j / 3)`
    - Check if the value already exists in:
        - `row[i]`
        - `col[j]`
        - `box[boxIndex]`
    - If **any set already contains** the value, return `false`.
    - Otherwise, insert the value into all three sets.

## Dry Run

For a filled cell at `(row=4, col=7)` with value `5`:

| Check | Value |
|---|---|
| Row set | `row[4]` must not contain `5` |
| Column set | `col[7]` must not contain `5` |
| Box index | `3 * (4 / 3) + (7 / 3) = 5` |
| Box set | `box[5]` must not contain `5` |

If all three checks pass, insert `5` into all three sets.

## Code

```cpp
class Solution {
  public:
    bool isValid(vector<vector<int>>& mat) {
        vector<set<int>> row(9), col(9), box(9);

        for(int i = 0; i < 9; i++) {
            for(int j = 0; j < 9; j++) {
                int val = mat[i][j];
                if(val == 0) continue;  // Skip empty cells

                int boxIndex = 3 * (i / 3) + (j / 3);

                // Check if value already exists in row, column or box
                if(row[i].count(val) || col[j].count(val) || box[boxIndex].count(val))
                    return false;

                // Insert the value into respective sets
                row[i].insert(val);
                col[j].insert(val);
                box[boxIndex].insert(val);
            }
        }

        return true;
    }
};
```

## Bitmask Alternative

Instead of `set<int>`, each row, column, and box can use a 9-bit integer. Digit `d` maps to bit `1 << d`. If the bit is already set, the digit is duplicated.

This keeps the same `O(1)` complexity but uses less memory and is often faster in competitive programming.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Checking only rows and columns | A Sudoku board also needs each 3x3 box to be unique. |
| Wrong box formula | Use `3 * (i / 3) + (j / 3)` for zero-based indices. |
| Treating empty cells as values | Skip `0` or `'.'` before checking sets. |

## Time and Space Complexity

- **Time Complexity:** `O(81)` = `O(1)`
    
    (Since the board is always 9x9)
    
- **Space Complexity:** `O(27)` = `O(1)`
    
    (9 sets each for row, column, and box)

## Related

- [Hash Table Algorithm Visualizer](/algorithms/hash-table)
- [Sudoku Solver Visualizer](/algorithms/sudoku-solver)
- [Backtracking](/algorithms/n-queens)

---
id: sudoku-solver
title: "Sudoku Solver"
category: "Backtracking"
difficulty: advanced
visualization: matrix
description: "Fills a 9x9 grid with digits according to constraints using depth-first search & pruning."
runtime: sudoku-solver
---

# Sudoku Solver

This solver uses backtracking to fill a Sudoku grid so that each row, column, and box contains all digits exactly once. This visualization uses a 4×4 variant with digits 1-4.

How it works (Backtracking):
1. Find an empty cell
2. Try each valid number (1 to N)
3. Check if the number is safe (not in same row, column, or box)
4. If safe, place it and recursively try to fill the next empty cell
5. If no valid number works, backtrack (remove the number and try the next)

Time Complexity: O(N^(N×N)) — worst case
Space Complexity: O(N×N) — for the board

Properties:
  - Always finds a solution if one exists
  - Backtracking prunes invalid branches early
  - Can be optimized with constraint propagation

Sudoku is a classic constraint satisfaction problem solved efficiently with backtracking.

```js
function solveSudoku(board) {
  function isValid(row, col, num) {
    for (let c = 0; c < 4; c++)
      if (board[row][c] === num) return false;

    for (let r = 0; r < 4; r++)
      if (board[r][col] === num) return false;

    const boxR = Math.floor(row / 2) * 2;
    const boxC = Math.floor(col / 2) * 2;
    for (let r = boxR; r < boxR + 2; r++)
      for (let c = boxC; c < boxC + 2; c++)
        if (board[r][c] === num) return false;

    return true;
  }

  function solve() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) {
          for (let num = 1; num <= 4; num++) {
            if (isValid(r, c, num)) {
              board[r][c] = num;
              if (solve()) return true;
              board[r][c] = 0; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return board;
}
```

```python
def solve_sudoku(board):
    def is_valid(row, col, num):
        for c in range(4):
            if board[row][c] == num:
                return False

        for r in range(4):
            if board[r][col] == num:
                return False

        box_r = (row // 2) * 2
        box_c = (col // 2) * 2
        for r in range(box_r, box_r + 2):
            for c in range(box_c, box_c + 2):
                if board[r][c] == num:
                    return False

        return True

    def solve():
        for r in range(4):
            for c in range(4):
                if board[r][c] == 0:
                    for num in range(1, 5):
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if solve():
                                return True
                            board[r][c] = 0  # Backtrack
                    return False
        return True

    solve()
    return board
```

```java
int[][] solveSudoku(int[][] board) {
    solve(board);
    return board;
}

boolean isValid(int[][] board, int row, int col, int num) {
    for (int c = 0; c < 4; c++) {
        if (board[row][c] == num) return false;
    }

    for (int r = 0; r < 4; r++) {
        if (board[r][col] == num) return false;
    }

    int boxR = (row / 2) * 2;
    int boxC = (col / 2) * 2;
    for (int r = boxR; r < boxR + 2; r++) {
        for (int c = boxC; c < boxC + 2; c++) {
            if (board[r][c] == num) return false;
        }
    }

    return true;
}

boolean solve(int[][] board) {
    for (int r = 0; r < 4; r++) {
        for (int c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                for (int num = 1; num <= 4; num++) {
                    if (isValid(board, r, c, num)) {
                        board[r][c] = num;
                        if (solve(board)) return true;
                        board[r][c] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}
```

```cpp
vector<vector<int>> solveSudoku(vector<vector<int>>& board) {
    solve(board);
    return board;
}

bool isValid(vector<vector<int>>& board, int row, int col, int num) {
    for (int c = 0; c < 4; c++) {
        if (board[row][c] == num) return false;
    }

    for (int r = 0; r < 4; r++) {
        if (board[r][col] == num) return false;
    }

    int boxR = (row / 2) * 2;
    int boxC = (col / 2) * 2;
    for (int r = boxR; r < boxR + 2; r++) {
        for (int c = boxC; c < boxC + 2; c++) {
            if (board[r][c] == num) return false;
        }
    }

    return true;
}

bool solve(vector<vector<int>>& board) {
    for (int r = 0; r < 4; r++) {
        for (int c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                for (int num = 1; num <= 4; num++) {
                    if (isValid(board, r, c, num)) {
                        board[r][c] = num;
                        if (solve(board)) return true;
                        board[r][c] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}
```

```rust
fn solve_sudoku(mut board: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    solve(&mut board);
    board
}

fn is_valid(board: &[Vec<i32>], row: usize, col: usize, num: i32) -> bool {
    for c in 0..4 {
        if board[row][c] == num {
            return false;
        }
    }

    for r in 0..4 {
        if board[r][col] == num {
            return false;
        }
    }

    let box_r = (row / 2) * 2;
    let box_c = (col / 2) * 2;
    for r in box_r..box_r + 2 {
        for c in box_c..box_c + 2 {
            if board[r][c] == num {
                return false;
            }
        }
    }

    true
}

fn solve(board: &mut Vec<Vec<i32>>) -> bool {
    for r in 0..4 {
        for c in 0..4 {
            if board[r][c] == 0 {
                for num in 1..=4 {
                    if is_valid(board, r, c, num) {
                        board[r][c] = num;
                        if solve(board) {
                            return true;
                        }
                        board[r][c] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    true
}
```

---
id: n-queens
title: "N-Queens Problem"
category: "Backtracking"
difficulty: advanced
visualization: matrix
description: "Places N non-attacking chess queens on an N×N chessboard using recursive backtracking."
runtime: n-queens
---

# N-Queens Problem

The N-Queens problem asks: how can N chess queens be placed on an N×N chessboard so that no two queens threaten each other?

A queen can attack any piece in the same row, column, or diagonal. Therefore, a solution requires that no two queens share the same row, column, or diagonal.

How it works (Backtracking):
1. Place queens one row at a time
2. For each row, try each column
3. Check if the position is safe (no conflicts)
4. If safe, place the queen and move to the next row
5. If no safe column exists, backtrack to the previous row

This visualization shows the 4-Queens problem on a 4×4 board.

Time Complexity: O(N!) — in the worst case
Space Complexity: O(N²) — for the board

The N-Queens problem is a classic example of backtracking algorithms and constraint satisfaction problems.

```js
function solveNQueens(n) {
  const board = Array(n).fill(null)
    .map(() => Array(n).fill('.'));

  function isSafe(row, col) {
    for (let i = 0; i < row; i++)
      if (board[i][col] === 'Q') return false;

    for (let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === 'Q') return false;

    for (let i = row-1, j = col+1; i >= 0 && j < n; i--, j++)
      if (board[i][j] === 'Q') return false;

    return true;
  }

  function solve(row) {
    if (row === n) return true;

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        if (solve(row + 1)) return true;
        board[row][col] = '.'; // Backtrack
      }
    }

    return false;
  }

  solve(0);
  return board;
}
```

```python
def solve_n_queens(n):
    board = [['.'] * n for _ in range(n)]

    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 'Q':
                return False

        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i, j = i - 1, j - 1

        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i, j = i - 1, j + 1

        return True

    def solve(row):
        if row == n:
            return True

        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                if solve(row + 1):
                    return True
                board[row][col] = '.'  # Backtrack

        return False

    solve(0)
    return board
```

```java
char[][] solveNQueens(int n) {
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');

    solve(board, 0, n);
    return board;
}

boolean isSafe(char[][] board, int row, int col, int n) {
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }

    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }

    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }

    return true;
}

boolean solve(char[][] board, int row, int n) {
    if (row == n) return true;

    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';
            if (solve(board, row + 1, n)) return true;
            board[row][col] = '.'; // Backtrack
        }
    }

    return false;
}
```

```cpp
vector<vector<char>> solveNQueens(int n) {
    vector<vector<char>> board(n, vector<char>(n, '.'));

    solve(board, 0, n);
    return board;
}

bool isSafe(vector<vector<char>>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }

    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }

    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }

    return true;
}

bool solve(vector<vector<char>>& board, int row, int n) {
    if (row == n) return true;

    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 'Q';
            if (solve(board, row + 1, n)) return true;
            board[row][col] = '.'; // Backtrack
        }
    }

    return false;
}
```

```rust
fn solve_n_queens(n: usize) -> Vec<Vec<char>> {
    let mut board = vec![vec!['.'; n]; n];

    solve(&mut board, 0, n);
    board
}

fn is_safe(board: &[Vec<char>], row: usize, col: usize, n: usize) -> bool {
    for i in 0..row {
        if board[i][col] == 'Q' {
            return false;
        }
    }

    let (mut i, mut j) = (row as i32 - 1, col as i32 - 1);
    while i >= 0 && j >= 0 {
        if board[i as usize][j as usize] == 'Q' {
            return false;
        }
        i -= 1;
        j -= 1;
    }

    let (mut i, mut j) = (row as i32 - 1, col as i32 + 1);
    while i >= 0 && j < n as i32 {
        if board[i as usize][j as usize] == 'Q' {
            return false;
        }
        i -= 1;
        j += 1;
    }

    true
}

fn solve(board: &mut Vec<Vec<char>>, row: usize, n: usize) -> bool {
    if row == n {
        return true;
    }

    for col in 0..n {
        if is_safe(board, row, col, n) {
            board[row][col] = 'Q';
            if solve(board, row + 1, n) {
                return true;
            }
            board[row][col] = '.'; // Backtrack
        }
    }

    false
}
```

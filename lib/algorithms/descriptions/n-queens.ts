const description = `N-Queens Problem

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

The N-Queens problem is a classic example of backtracking algorithms and constraint satisfaction problems.`

export default description

const description = `Sudoku Solver

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

Sudoku is a classic constraint satisfaction problem solved efficiently with backtracking.`

export default description

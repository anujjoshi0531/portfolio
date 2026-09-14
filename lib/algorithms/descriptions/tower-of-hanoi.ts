const description = `Tower of Hanoi

The Tower of Hanoi is a classic recursive puzzle. Move all disks from the source peg to the target peg, one at a time, never placing a larger disk on top of a smaller one.

How it works (Recursive):
1. Move the top n-1 disks from source to auxiliary peg
2. Move the largest disk from source to target peg
3. Move the n-1 disks from auxiliary to target peg

Time Complexity: O(2^n - 1) — exactly 2^n - 1 moves
Space Complexity: O(n) — recursive call stack

Properties:
  - Minimum moves required: 2^n - 1
  - Classic example of divide and conquer
  - Demonstrates the power of recursion

The puzzle was invented by mathematician Édouard Lucas in 1883. Legend says monks in a temple are moving 64 golden disks — completing the puzzle would mark the end of the world (requiring 18,446,744,073,709,551,615 moves).`

export default description

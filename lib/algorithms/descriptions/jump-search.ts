const description = `Jump Search

Jump Search works on sorted arrays by jumping ahead by fixed steps and then performing a linear search within the identified block.

How it works:
1. Calculate the optimal jump size: √n
2. Jump through the array in blocks until finding a block where the target could be
3. Perform a linear search within that block
4. Return the index if found, -1 otherwise

Time Complexity:
  Best:    O(1)
  Average: O(√n)
  Worst:   O(√n)

Space Complexity: O(1)

Properties:
  - Requires sorted array
  - Better than Linear Search, simpler than Binary Search
  - Optimal jump size is √n

Jump Search is useful when jumping back is costly (e.g., in linked lists) compared to Binary Search which requires random access.`

export default description

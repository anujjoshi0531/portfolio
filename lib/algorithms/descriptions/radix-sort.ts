const description = `Radix Sort

Radix Sort sorts numbers digit by digit, from the least significant digit to the most significant (LSD Radix Sort). It uses a stable sort (like Counting Sort) as a subroutine.

How it works:
1. Find the maximum number to determine the number of digits
2. For each digit position (ones, tens, hundreds, ...):
   a. Sort the array based on the current digit using a stable sort
3. After processing all digits, the array is sorted

Time Complexity:
  Best:    O(d × (n + k))
  Average: O(d × (n + k))
  Worst:   O(d × (n + k))
  where d = number of digits, k = base (10 for decimal)

Space Complexity: O(n + k)

Properties:
  - Stable sort
  - Not in-place
  - Not comparison-based
  - Efficient for integers and strings

Radix Sort can outperform comparison-based sorts when the number of digits is small relative to log(n).`

export default description

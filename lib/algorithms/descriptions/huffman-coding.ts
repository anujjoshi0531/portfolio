const description = `Huffman Coding

Huffman Coding is a greedy algorithm for lossless data compression. It assigns shorter binary codes to frequent characters and longer codes to rare ones, reducing the total number of bits needed to represent the data.

How it works:
1. Count how often each character appears
2. Create a leaf node per character and put them in a min-priority queue
3. Repeatedly remove the two lowest-frequency nodes and merge them under a new parent whose frequency is their sum
4. When one node remains, use it as the tree root
5. Assign codes by walking the tree: left = 0, right = 1

Why it works:
  No code is a prefix of another, so the encoded bitstream decodes unambiguously. The greedy merge guarantees an optimal prefix code for the given frequencies.

Time Complexity:
  Best:    O(n log n)
  Average: O(n log n)
  Worst:   O(n log n)

Space Complexity: O(n)

Properties:
  - Lossless: the original data is recovered exactly
  - Optimal among prefix codes for a known frequency distribution
  - Used in DEFLATE (ZIP, gzip, PNG), JPEG, and MP3

Invented by David A. Huffman in 1952 while he was a student at MIT, it remains a cornerstone of modern compression.`

export default description

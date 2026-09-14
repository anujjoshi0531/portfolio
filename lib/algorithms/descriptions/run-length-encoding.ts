const description = `Run-Length Encoding

Run-Length Encoding (RLE) is a simple lossless compression algorithm. It replaces consecutive repeats of the same symbol with a single (symbol, count) pair.

How it works:
1. Scan the input from left to right
2. When a new character appears, start a run
3. Keep counting while the next character matches
4. Emit (character, count) and continue after the run

Why it works:
  Long runs of identical values waste space if stored naively. Encoding the length once captures that redundancy. Decoding is the inverse: expand each pair into count copies of the character.

Time Complexity:
  Best:    O(n)
  Average: O(n)
  Worst:    O(n)

Space Complexity: O(k) where k is the number of runs

Properties:
  - Lossless when counts and symbols are stored losslessly
  - Excellent for sparse bitmaps, icons, and simple graphics (BMP RLE, PCX, fax)
  - Can expand data with no long runs (e.g. alternating ABABAB)
  - Often used as a first stage before Huffman or arithmetic coding

RLE is one of the oldest compression ideas still taught — easy to implement, easy to visualize, and a building block inside larger formats.`

export default description

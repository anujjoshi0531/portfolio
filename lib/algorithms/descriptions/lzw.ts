const description = `LZW

LZW (Lempel–Ziv–Welch) is an adaptive dictionary compressor published by Terry Welch in 1984. Both encoder and decoder build the same dictionary on the fly from the data stream — no separate dictionary needs to be transmitted.

How it works:
1. Seed the dictionary with every single-character string
2. Keep a current phrase w (initially empty)
3. For each next character c:
   - If w+c is already in the dictionary, set w = w+c
   - Otherwise emit the code for w, add w+c to the dictionary, and set w = c
4. After the last character, emit the code for the remaining w

Why it works:
  As phrases repeat, they receive short integer codes. Longer and longer phrases are learned automatically. The decoder mirrors the encoder: each received code expands to a string, and the next unseen phrase is added with the same rule, so both sides stay in sync.

Time Complexity:
  Best:    O(n)
  Average: O(n)
  Worst:   O(n) with a hash dictionary

Space Complexity: O(d) where d is the number of dictionary entries

Properties:
  - Lossless adaptive dictionary coding
  - Used historically in GIF and Unix compress
  - No prior frequency analysis required
  - Dictionary growth can be capped (fixed code width) for streaming formats

LZW shows how a growing codebook turns recurring structure into shorter integer codes without a separate model of the source.`

export default description

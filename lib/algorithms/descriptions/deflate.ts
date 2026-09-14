const description = `DEFLATE

DEFLATE is the lossless compression engine inside gzip, ZIP, and PNG. It is not a single trick — it is a pipeline that combines two ideas you can study separately on this site: LZ77 dictionary matching and Huffman coding.

How it works:
1. LZ77 scan — find repeated substrings in a sliding window and emit (offset, length, next) tokens
2. Symbol stream — turn those tokens into a sequence of symbols (match markers + literals)
3. Huffman coding — build shorter bit codes for symbols that appear more often
4. Bitstream — replace each symbol with its code; gzip then wraps the stream with a header and checksum

Why it works:
  LZ77 removes redundancy that looks like "I already said this phrase." Huffman removes redundancy that looks like "some symbols are rare." Together they compress both structure and skew — far better than either alone on typical text and web assets.

Time Complexity:
  Dominated by match finding: O(n · W) naive, much faster with hash chains / lazy matching in real gzip
  Huffman stage: O(k log k) for k distinct symbols in the block

Space Complexity: O(W + k) for the window and code tables

Properties:
  - Lossless block compressor (RFC 1951)
  - Used by gzip (RFC 1952), zlib, ZIP, and PNG IDAT
  - Real implementations use dynamic or fixed Huffman trees and separate distance codes — this page teaches the pipeline, not every RFC detail
  - Great mental model: dictionary first, entropy second

If you only remember one sentence: gzip is mostly DEFLATE, and DEFLATE is LZ77 feeding Huffman.`

export default description

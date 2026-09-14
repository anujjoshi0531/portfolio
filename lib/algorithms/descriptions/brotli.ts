const description = `Brotli

Brotli is a modern lossless compressor from Google (2015), widely used as HTTP Content-Encoding: br for HTML, CSS, and JavaScript. It sits in the same family as DEFLATE — dictionary matches plus entropy coding — but adds a powerful extra ingredient: a large static dictionary of phrases that already appear across the web.

How it works (pedagogical model on this page):
1. Static dictionary — try to match known phrases (URL pieces, tags, common words) without discovering them from the file alone
2. LZ back-references — copy from already-seen text when the dictionary does not help
3. Literals — emit single characters when neither dictionary nor history matches
4. Entropy coding — assign short codes to frequent commands (real Brotli uses richer, context-dependent codes)

Why it often beats gzip on the web:
  gzip only learns structure inside the current stream. Brotli also starts with shared knowledge of the web: "https://", "www.", "</div>", and thousands of other fragments. That shared prior is free information at both ends of HTTP.

Time Complexity:
  Match finding similar in spirit to LZ77 / DEFLATE; quality depends on window and matcher
  Dictionary lookups are designed to be fast in production codecs

Space Complexity:
  Encoder/decoder need the static dictionary (about 120KB in full Brotli) plus a sliding window

Properties:
  - Lossless; RFC 7932
  - Excellent for text-like web assets; less magic on already-compressed binary
  - Higher compression levels trade CPU for density (CDN / build-time vs on-the-fly)
  - This visualization is a teaching pipeline, not a bit-compatible Brotli encoder

Remember: Brotli ≈ DEFLATE's idea + a web-aware static dictionary + stronger entropy coding.`

export default description

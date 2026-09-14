---
id: brotli
title: "Brotli"
category: "Compression"
difficulty: advanced
visualization: concept
description: "Modern compression algorithm using 2nd-order context modeling, static dictionaries, and LZ77."
runtime: brotli
---

# Brotli

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

Remember: Brotli ≈ DEFLATE's idea + a web-aware static dictionary + stronger entropy coding.

```js
// Pedagogical Brotli: static dict → LZ back-ref → Huffman
function brotliCompress(text, dictionary) {
  // Prefer longer dictionary phrases (real Brotli ships ~120KB of web words)
  const dict = [...dictionary].sort((a, b) => b.length - a.length);
  const commands = [];
  let i = 0;

  while (i < text.length) {
    // 1) Static dictionary hit?
    let hit = null;
    for (const word of dict) {
      if (text.startsWith(word, i)) { hit = word; break; }
    }
    if (hit) {
      commands.push({ type: 'dict', value: hit });
      i += hit.length;
      continue;
    }

    // 2) LZ-style back-reference into already-seen text
    let bestOffset = 0, bestLength = 0;
    for (let j = 0; j < i; j++) {
      let length = 0;
      while (
        i + length < text.length &&
        text[j + length] === text[i + length]
      ) length++;
      if (length > bestLength && length >= 3) {
        bestLength = length;
        bestOffset = i - j;
      }
    }
    if (bestLength >= 3) {
      commands.push({ type: 'match', offset: bestOffset, length: bestLength });
      i += bestLength;
      continue;
    }

    // 3) Literal byte
    commands.push({ type: 'lit', value: text[i] });
    i++;
  }

  // Entropy stage: Huffman over command labels
  const labels = commands.map(cmdLabel);
  const freq = {};
  for (const s of labels) freq[s] = (freq[s] || 0) + 1;
  const codes = buildHuffman(freq);
  const bits = labels.map((s) => codes[s]).join('');
  return { commands, codes, bits };
}

brotliCompress(
  'https://www.example.com/https://www.example.com/x',
  ['https://', 'www.', 'example', '.com/', '/']
);
```

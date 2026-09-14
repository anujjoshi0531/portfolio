---
id: run-length-encoding
title: "Run-Length Encoding"
category: "Compression"
difficulty: easy
visualization: concept
description: "Lossless data compression where runs of consecutive data values are stored as single counts."
runtime: run-length-encoding
---

# Run-Length Encoding

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

RLE is one of the oldest compression ideas still taught — easy to implement, easy to visualize, and a building block inside larger formats.

```js
function runLengthEncode(text) {
  const tokens = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    let count = 1;

    // Extend the run while the next char matches
    while (i + count < text.length && text[i + count] === char) {
      count++;
    }

    tokens.push([char, count]);
    i += count;
  }

  return tokens;
}

runLengthEncode('AAABBBCCCCDAA');
```

```python
def run_length_encode(text):
    tokens = []
    i = 0

    while i < len(text):
        char = text[i]
        count = 1

        while i + count < len(text) and text[i + count] == char:
            count += 1

        tokens.append((char, count))
        i += count

    return tokens


run_length_encode("AAABBBCCCCDAA")
```

```java
List<AbstractMap.SimpleEntry<Character, Integer>> runLengthEncode(String text) {
    List<AbstractMap.SimpleEntry<Character, Integer>> tokens = new ArrayList<>();
    int i = 0;

    while (i < text.length()) {
        char ch = text.charAt(i);
        int count = 1;

        while (i + count < text.length() && text.charAt(i + count) == ch) {
            count++;
        }

        tokens.add(new AbstractMap.SimpleEntry<>(ch, count));
        i += count;
    }

    return tokens;
}

runLengthEncode("AAABBBCCCCDAA");
```

```cpp
vector<pair<char, int>> runLengthEncode(const string& text) {
    vector<pair<char, int>> tokens;
    size_t i = 0;

    while (i < text.size()) {
        char ch = text[i];
        int count = 1;

        while (i + count < text.size() && text[i + count] == ch) {
            ++count;
        }

        tokens.emplace_back(ch, count);
        i += count;
    }

    return tokens;
}

runLengthEncode("AAABBBCCCCDAA");
```

```rust
fn run_length_encode(text: &str) -> Vec<(char, usize)> {
    let chars: Vec<char> = text.chars().collect();
    let mut tokens = Vec::new();
    let mut i = 0;

    while i < chars.len() {
        let ch = chars[i];
        let mut count = 1;

        while i + count < chars.len() && chars[i + count] == ch {
            count += 1;
        }

        tokens.push((ch, count));
        i += count;
    }

    tokens
}

run_length_encode("AAABBBCCCCDAA");
```

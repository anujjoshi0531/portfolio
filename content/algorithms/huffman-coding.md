---
id: huffman-coding
title: "Huffman Coding"
category: "Compression"
difficulty: advanced
visualization: concept
description: "Prefix coding algorithm assigning variable-length codes based on character frequencies."
runtime: huffman-coding
---

# Huffman Coding

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

Invented by David A. Huffman in 1952 while he was a student at MIT, it remains a cornerstone of modern compression.

```js
function huffmanCoding(text) {
  // 1. Count character frequencies
  const freq = {};
  for (const ch of text) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  // 2. Create a leaf node per character and push
  //    them all into a min-priority queue
  let pq = Object.entries(freq).map(
    ([char, f]) => ({ char, freq: f, left: null, right: null })
  );

  // 3. Build the tree: repeatedly merge the two
  //    lowest-frequency nodes into a new parent
  while (pq.length > 1) {
    pq.sort((a, b) => a.freq - b.freq);
    const left = pq.shift();
    const right = pq.shift();
    pq.push({ char: null, freq: left.freq + right.freq, left, right });
  }
  const root = pq[0];

  // 4. Walk the tree to assign a binary code to
  //    each character (left = 0, right = 1)
  const codes = {};
  function assign(node, code) {
    if (!node.left && !node.right) {
      codes[node.char] = code || '0';
      return;
    }
    assign(node.left, code + '0');
    assign(node.right, code + '1');
  }
  assign(root, '');

  // 5. Encode the text using the generated codes
  const encoded = [...text].map((ch) => codes[ch]).join('');
  return { codes, encoded };
}

huffmanCoding('ABRACADABRA');
```

```python
from dataclasses import dataclass


@dataclass
class Node:
    char: str | None
    freq: int
    left: "Node | None" = None
    right: "Node | None" = None


def huffman_coding(text):
    freq = {}
    for char in text:
        freq[char] = freq.get(char, 0) + 1

    queue = [Node(char, count) for char, count in freq.items()]
    while len(queue) > 1:
        queue.sort(key=lambda node: node.freq)
        left = queue.pop(0)
        right = queue.pop(0)
        queue.append(Node(None, left.freq + right.freq, left, right))
    root = queue[0]

    codes = {}

    def assign(node, code):
        if node.left is None and node.right is None:
            codes[node.char] = code or "0"
            return
        assign(node.left, code + "0")
        assign(node.right, code + "1")

    assign(root, "")
    encoded = "".join(codes[char] for char in text)
    return codes, encoded


huffman_coding("ABRACADABRA")
```

```java
static final class Node {
    final Character ch;
    final int freq;
    final Node left;
    final Node right;

    Node(Character ch, int freq) {
        this(ch, freq, null, null);
    }

    Node(Character ch, int freq, Node left, Node right) {
        this.ch = ch;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

record HuffmanResult(Map<Character, String> codes, String encoded) {}

HuffmanResult huffmanCoding(String text) {
    Map<Character, Integer> freq = new LinkedHashMap<>();
    for (char ch : text.toCharArray()) {
        freq.merge(ch, 1, Integer::sum);
    }

    PriorityQueue<Node> queue = new PriorityQueue<>(
        Comparator.comparingInt(node -> node.freq)
    );
    freq.forEach((ch, count) -> queue.add(new Node(ch, count)));

    while (queue.size() > 1) {
        Node left = queue.remove();
        Node right = queue.remove();
        queue.add(new Node(null, left.freq + right.freq, left, right));
    }
    Node root = queue.remove();

    Map<Character, String> codes = new HashMap<>();
    assignCodes(root, "", codes);
    String encoded = text.chars()
        .mapToObj(ch -> codes.get((char) ch))
        .collect(Collectors.joining());
    return new HuffmanResult(codes, encoded);
}

void assignCodes(Node node, String code, Map<Character, String> codes) {
    if (node.left == null && node.right == null) {
        codes.put(node.ch, code.isEmpty() ? "0" : code);
        return;
    }
    assignCodes(node.left, code + "0", codes);
    assignCodes(node.right, code + "1", codes);
}

huffmanCoding("ABRACADABRA");
```

```cpp
struct Node {
    char ch;
    int freq;
    Node* left;
    Node* right;
};

struct CompareFreq {
    bool operator()(const Node* a, const Node* b) const {
        return a->freq > b->freq;
    }
};

struct HuffmanResult {
    unordered_map<char, string> codes;
    string encoded;
};

HuffmanResult huffmanCoding(const string& text) {
    unordered_map<char, int> freq;
    for (char ch : text) {
        ++freq[ch];
    }

    priority_queue<Node*, vector<Node*>, CompareFreq> queue;
    for (auto [ch, count] : freq) {
        queue.push(new Node{ch, count, nullptr, nullptr});
    }

    while (queue.size() > 1) {
        Node* left = queue.top(); queue.pop();
        Node* right = queue.top(); queue.pop();
        queue.push(new Node{'\\0', left->freq + right->freq, left, right});
    }
    Node* root = queue.top();

    unordered_map<char, string> codes;
    assignCodes(root, "", codes);
    string encoded;
    for (char ch : text) encoded += codes[ch];
    return {codes, encoded};
}

void assignCodes(Node* node, string code, unordered_map<char, string>& codes) {
    if (node->left == nullptr && node->right == nullptr) {
        codes[node->ch] = code.empty() ? "0" : code;
        return;
    }
    assignCodes(node->left, code + "0", codes);
    assignCodes(node->right, code + "1", codes);
}

huffmanCoding("ABRACADABRA");
```

```rust
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

#[derive(Eq, Ord, PartialEq, PartialOrd)]
struct Node {
    freq: usize,
    ch: Option<char>,
    left: Option<Box<Node>>,
    right: Option<Box<Node>>,
}

impl Node {
    fn leaf(ch: char, freq: usize) -> Self {
        Self { freq, ch: Some(ch), left: None, right: None }
    }

    fn parent(left: Node, right: Node) -> Self {
        Self {
            freq: left.freq + right.freq,
            ch: None,
            left: Some(Box::new(left)),
            right: Some(Box::new(right)),
        }
    }
}

fn huffman_coding(text: &str) -> (HashMap<char, String>, String) {
    let mut freq = HashMap::new();
    for ch in text.chars() {
        *freq.entry(ch).or_insert(0) += 1;
    }

    let mut queue: BinaryHeap<Reverse<Node>> = freq
        .iter()
        .map(|(&ch, &count)| Reverse(Node::leaf(ch, count)))
        .collect();

    while queue.len() > 1 {
        let left = queue.pop().unwrap().0;
        let right = queue.pop().unwrap().0;
        queue.push(Reverse(Node::parent(left, right)));
    }
    let root = queue.pop().unwrap().0;

    let mut codes = HashMap::new();
    assign_codes(&root, String::new(), &mut codes);
    let mut encoded = String::new();
    for ch in text.chars() {
        encoded.push_str(&codes[&ch]);
    }
    (codes, encoded)
}

fn assign_codes(node: &Node, code: String, codes: &mut HashMap<char, String>) {
    if node.left.is_none() && node.right.is_none() {
        codes.insert(node.ch.unwrap(), if code.is_empty() { "0".into() } else { code });
        return;
    }
    assign_codes(node.left.as_ref().unwrap(), format!("{code}0"), codes);
    assign_codes(node.right.as_ref().unwrap(), format!("{code}1"), codes);
}

huffman_coding("ABRACADABRA");
```

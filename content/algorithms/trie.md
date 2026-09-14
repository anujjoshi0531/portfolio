---
id: trie
title: "Trie"
category: "Data Structures"
difficulty: intermediate
visualization: concept
description: "Digital tree / radix tree used to store associative arrays where keys are strings."
runtime: trie
---

# Trie

A Trie stores strings by sharing their common prefixes. Each edge is a character, and the path from the root to a node spells out a prefix. Lookups cost O(L) where L is the length of the word — independent of how many words are stored.

How it works:
1. Each node holds a map of children (character → node) and an isEnd flag
2. Inserting walks the word character by character, creating nodes only when missing
3. isEnd marks where a real word ends, so "ca" can be a path without being a word

Why not a hash table:
  A hash table also looks up an exact key in O(L),
  but it cannot answer "which words start with ca?"
  without scanning every key. A trie walks 2 nodes
  down and the whole subtree is the answer.

Time Complexity:
  Best:    O(1) when the first character does not match
  Average: O(L) for insert, search and startsWith
  Worst:   O(L) — never depends on the number of words

Space Complexity: O(n × L) — its main weakness. Radix trees compress single-child chains to reduce it.

Applications: autocomplete, spell checkers, IP routing tables (longest prefix match), T9 keyboards, word games, editor symbol completion

```js
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  traverse(prefix) {
    let node = this.root;
    for (const char of prefix) {
      node = node.children.get(char);
      if (!node) return null;
    }
    return node;
  }

  search(word) {
    const node = this.traverse(word);
    return node != null && node.isEnd;
  }

  startsWith(prefix) {
    return this.traverse(prefix) != null;
  }

  wordsWithPrefix(prefix) {
    const out = [];
    const walk = (node, acc) => {
      if (!node) return;
      if (node.isEnd) out.push(acc);
      for (const [c, child] of node.children)
        walk(child, acc + c);
    };
    walk(this.traverse(prefix), prefix);
    return out;
  }
}
```

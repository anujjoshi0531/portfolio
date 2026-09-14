const description = `Trie (Prefix Tree)

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

Applications: autocomplete, spell checkers, IP routing tables (longest prefix match), T9 keyboards, word games, editor symbol completion`

export default description

const description = `Hash Table

A Hash Table maps keys to values using a hash function. It provides near-constant time O(1) for insert, lookup, and delete operations.

How it works:
1. A hash function converts the key into an array index
2. The value is stored at that index (bucket)
3. If two keys hash to the same index → collision

Collision handling (chaining):
  Each bucket stores a list of entries.
  Multiple keys can share the same bucket.

Time Complexity:
  Average: O(1) for set, get, delete
  Worst:   O(n) when all keys collide

Space Complexity: O(n)

Applications: caches, databases, symbol tables, counting frequencies, deduplication`

export default description

const description = `LRU Cache

An LRU (Least Recently Used) Cache holds a fixed number of entries and evicts the one untouched for the longest time when it runs out of room. The challenge is doing both get and put in O(1).

Why one structure is not enough:
1. A hash map alone gives O(1) access but cannot tell which entry is oldest
2. An ordered list alone knows the oldest but takes O(n) to find a key
3. So combine them: the map answers "where", the list answers "when"

The design:
  Hash map:            key → pointer to a node, O(1)
  Doubly linked list:  head = most recent, tail = next to evict

Two details that are easy to miss:
  Each node stores its own key. Eviction reaches the node
  through the list tail, and needs the key to delete the
  map entry — otherwise the map keeps an orphan.

  The list must be doubly linked. Moving a node to the
  front means unlinking it from the middle, which needs
  its prev pointer. With a singly linked list it is O(n).

Time Complexity:
  Best:    O(1) for get and put
  Average: O(1) — hash lookup plus constant pointer rewiring
  Worst:   O(n) only if every key collides in the hash map

Space Complexity: O(capacity)

Applications: database and web caches, Redis eviction (sampled approximation), CPU cache replacement, browser back/forward stacks, memoization with bounded memory`

export default description

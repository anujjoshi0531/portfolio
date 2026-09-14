const description = `Linked List

A Linked List is a linear data structure where each element (node) contains a value and a pointer to the next node.

Unlike arrays, elements are not in contiguous memory — each node can be anywhere, connected by pointers.

Operations:
  append:  add node at the end       — O(1) with tail pointer
  prepend: add node at the beginning — O(1)
  search:  traverse to find a value  — O(n)
  delete:  remove a node by value    — O(n)
  access:  traverse from head        — O(n)

Advantages:
  - O(1) insertion/deletion at known positions
  - Dynamic size, no wasted memory

Disadvantages:
  - O(n) access by index (no random access)
  - Extra memory for pointers
  - Not cache-friendly`

export default description

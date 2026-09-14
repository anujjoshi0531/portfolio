---
id: lru-cache
title: "LRU Cache"
category: "Data Structures"
difficulty: advanced
visualization: concept
description: "Least Recently Used cache eviction strategy combining a Hash Map and Doubly Linked List."
runtime: lru-cache
---

# LRU Cache

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

Applications: database and web caches, Redis eviction (sampled approximation), CPU cache replacement, browser back/forward stacks, memoization with bounded memory

```js
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    // sentinels: head side = MRU, tail = LRU
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.remove(node);
    this.addToFront(node);
    return node.value;
  }

  put(key, value) {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.remove(existing);
      this.addToFront(existing);
      return;
    }
    const node = new Node(key, value);
    this.map.set(key, node);
    this.addToFront(node);
    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this.remove(lru);
      this.map.delete(lru.key);
    }
  }
}
```

```python
class Node:
    def __init__(self, key, value):
        self.key = key  # needed to delete from the map on eviction
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.map = {}
        # sentinels: head side = MRU, tail side = LRU
        self.head = Node(None, None)
        self.tail = Node(None, None)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_front(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        node = self.map.get(key)
        if node is None:
            return -1
        self._remove(node)
        self._add_to_front(node)
        return node.value

    def put(self, key, value):
        existing = self.map.get(key)
        if existing is not None:
            existing.value = value
            self._remove(existing)
            self._add_to_front(existing)
            return
        node = Node(key, value)
        self.map[key] = node
        self._add_to_front(node)
        if len(self.map) > self.capacity:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]
```

```java
class Node {
    String key;  // needed to delete from the map on eviction
    int value;
    Node prev, next;

    Node(String key, int value) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private final int capacity;
    private final Map<String, Node> map = new HashMap<>();
    // sentinels: head side = MRU, tail side = LRU
    private final Node head = new Node(null, 0);
    private final Node tail = new Node(null, 0);

    LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    int get(String key) {
        Node node = map.get(key);
        if (node == null) return -1;
        remove(node);
        addToFront(node);
        return node.value;
    }

    void put(String key, int value) {
        Node existing = map.get(key);
        if (existing != null) {
            existing.value = value;
            remove(existing);
            addToFront(existing);
            return;
        }
        Node node = new Node(key, value);
        map.put(key, node);
        addToFront(node);
        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}
```

```cpp
struct Node {
    string key;  // needed to erase from the map on eviction
    int value;
    Node* prev = nullptr;
    Node* next = nullptr;
    Node(string k, int v) : key(move(k)), value(v) {}
};

class LRUCache {
    int capacity;
    unordered_map<string, Node*> map;
    // sentinels: head side = MRU, tail side = LRU
    Node* head = new Node("", 0);
    Node* tail = new Node("", 0);

    void remove(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

public:
    explicit LRUCache(int capacity) : capacity(capacity) {
        head->next = tail;
        tail->prev = head;
    }

    int get(const string& key) {
        auto it = map.find(key);
        if (it == map.end()) return -1;
        remove(it->second);
        addToFront(it->second);
        return it->second->value;
    }

    void put(const string& key, int value) {
        auto it = map.find(key);
        if (it != map.end()) {
            it->second->value = value;
            remove(it->second);
            addToFront(it->second);
            return;
        }
        Node* node = new Node(key, value);
        map[key] = node;
        addToFront(node);
        if ((int)map.size() > capacity) {
            Node* lru = tail->prev;
            remove(lru);
            map.erase(lru->key);
            delete lru;
        }
    }
};
```

```rust
struct Node {
    key: String,  // needed to remove from the map on eviction
    value: i32,
    prev: usize,
    next: usize,
}

// Safe Rust will not let the map and the list both own a node,
// so the list lives in a Vec arena and the links are indices.
// Slots 0 and 1 are the head/tail sentinels.
const HEAD: usize = 0;
const TAIL: usize = 1;

struct LruCache {
    capacity: usize,
    map: HashMap<String, usize>,
    nodes: Vec<Node>,
    free: Vec<usize>,
}

impl LruCache {
    fn new(capacity: usize) -> Self {
        let sentinel = |prev, next| Node {
            key: String::new(),
            value: 0,
            prev,
            next,
        };
        LruCache {
            capacity,
            map: HashMap::new(),
            nodes: vec![sentinel(TAIL, TAIL), sentinel(HEAD, HEAD)],
            free: Vec::new(),
        }
    }

    fn remove(&mut self, i: usize) {
        let (prev, next) = (self.nodes[i].prev, self.nodes[i].next);
        self.nodes[prev].next = next;
        self.nodes[next].prev = prev;
    }

    fn add_to_front(&mut self, i: usize) {
        let first = self.nodes[HEAD].next;
        self.nodes[i].next = first;
        self.nodes[i].prev = HEAD;
        self.nodes[first].prev = i;
        self.nodes[HEAD].next = i;
    }

    fn get(&mut self, key: &str) -> i32 {
        let Some(&i) = self.map.get(key) else {
            return -1;
        };
        self.remove(i);
        self.add_to_front(i);
        self.nodes[i].value
    }

    fn put(&mut self, key: &str, value: i32) {
        if let Some(&i) = self.map.get(key) {
            self.nodes[i].value = value;
            self.remove(i);
            self.add_to_front(i);
            return;
        }
        let node = Node {
            key: key.to_string(),
            value,
            prev: HEAD,
            next: HEAD,
        };
        let i = match self.free.pop() {
            Some(slot) => {
                self.nodes[slot] = node;
                slot
            }
            None => {
                self.nodes.push(node);
                self.nodes.len() - 1
            }
        };
        self.map.insert(key.to_string(), i);
        self.add_to_front(i);
        if self.map.len() > self.capacity {
            let lru = self.nodes[TAIL].prev;
            self.remove(lru);
            let evicted = self.nodes[lru].key.clone();
            self.map.remove(&evicted);
            self.free.push(lru);
        }
    }
}
```

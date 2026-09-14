---
id: hash-table
title: "Hash Table"
category: "Data Structures"
difficulty: intermediate
visualization: concept
description: "Associative array data structure mapping keys to values using hash functions."
runtime: hash-table
---

# Hash Table

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

Applications: caches, databases, symbol tables, counting frequencies, deduplication

```js
class HashTable {
  constructor(size = 7) {
    this.buckets = new Array(size)
      .fill(null).map(() => []);
  }

  hash(key) {
    let h = 0;
    for (const ch of key)
      h = (h + ch.charCodeAt(0)) % this.buckets.length;
    return h;
  }

  set(key, value) {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find(e => e.key === key);
    if (existing) existing.value = value;
    else bucket.push({ key, value });
  }

  get(key) {
    const idx = this.hash(key);
    const entry = this.buckets[idx]
      .find(e => e.key === key);
    return entry?.value;
  }

  delete(key) {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const i = bucket.findIndex(e => e.key === key);
    if (i !== -1) bucket.splice(i, 1);
  }
}
```

```python
class HashTable:
    def __init__(self, size=7):
        self.buckets = [[] for _ in range(size)]

    def hash(self, key):
        h = 0
        for ch in key:
            h = (h + ord(ch)) % len(self.buckets)
        return h

    def set(self, key, value):
        idx = self.hash(key)
        bucket = self.buckets[idx]
        for entry in bucket:
            if entry['key'] == key:
                entry['value'] = value
                return
        bucket.append({'key': key, 'value': value})

    def get(self, key):
        idx = self.hash(key)
        for entry in self.buckets[idx]:
            if entry['key'] == key:
                return entry['value']
        return None

    def delete(self, key):
        idx = self.hash(key)
        bucket = self.buckets[idx]
        for i, entry in enumerate(bucket):
            if entry['key'] == key:
                del bucket[i]
                return
```

```java
class HashTable {
    private List<Entry>[] buckets;

    @SuppressWarnings("unchecked")
    HashTable(int size) {
        buckets = new List[size];
        for (int i = 0; i < size; i++) {
            buckets[i] = new ArrayList<>();
        }
    }

    int hash(String key) {
        int h = 0;
        for (char ch : key.toCharArray()) {
            h = (h + ch) % buckets.length;
        }
        return h;
    }

    void set(String key, int value) {
        int idx = hash(key);
        List<Entry> bucket = buckets[idx];
        for (Entry entry : bucket) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }
        bucket.add(new Entry(key, value));
    }

    Integer get(String key) {
        int idx = hash(key);
        for (Entry entry : buckets[idx]) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
        }
        return null;
    }

    void delete(String key) {
        int idx = hash(key);
        List<Entry> bucket = buckets[idx];
        bucket.removeIf(entry -> entry.key.equals(key));
    }

    static class Entry {
        String key;
        int value;
        Entry(String key, int value) {
            this.key = key;
            this.value = value;
        }
    }
}
```

```cpp
class HashTable {
    vector<vector<pair<string, int>>> buckets;

public:
    HashTable(int size = 7) : buckets(size) {}

    int hash(const string& key) {
        int h = 0;
        for (char ch : key) {
            h = (h + ch) % buckets.size();
        }
        return h;
    }

    void set(const string& key, int value) {
        int idx = hash(key);
        auto& bucket = buckets[idx];
        for (auto& entry : bucket) {
            if (entry.first == key) {
                entry.second = value;
                return;
            }
        }
        bucket.push_back({key, value});
    }

    optional<int> get(const string& key) {
        int idx = hash(key);
        for (auto& entry : buckets[idx]) {
            if (entry.first == key) {
                return entry.second;
            }
        }
        return nullopt;
    }

    void remove(const string& key) {
        int idx = hash(key);
        auto& bucket = buckets[idx];
        bucket.erase(
            remove_if(bucket.begin(), bucket.end(),
                [&](auto& e) { return e.first == key; }),
            bucket.end()
        );
    }
};
```

```rust
struct HashTable {
    // Chaining: every bucket holds a list of (key, value)
    buckets: Vec<Vec<(String, i32)>>,
}

impl HashTable {
    fn new(size: usize) -> Self {
        HashTable { buckets: vec![Vec::new(); size] }
    }

    fn hash(&self, key: &str) -> usize {
        let mut h = 0;
        for ch in key.chars() {
            h = (h + ch as usize) % self.buckets.len();
        }
        h
    }

    fn set(&mut self, key: &str, value: i32) {
        let idx = self.hash(key);
        let bucket = &mut self.buckets[idx];
        for entry in bucket.iter_mut() {
            if entry.0 == key {
                entry.1 = value;
                return;
            }
        }
        bucket.push((key.to_string(), value));
    }

    fn get(&self, key: &str) -> Option<i32> {
        let idx = self.hash(key);
        for entry in &self.buckets[idx] {
            if entry.0 == key {
                return Some(entry.1);
            }
        }
        None
    }

    fn delete(&mut self, key: &str) {
        let idx = self.hash(key);
        // retain keeps every entry whose key does not match
        self.buckets[idx].retain(|entry| entry.0 != key);
    }
}
```

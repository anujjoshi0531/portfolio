---
id: binary-search-tree
title: "Binary Search Tree"
category: "Data Structures"
difficulty: intermediate
visualization: concept
description: "Hierarchical node-based data structure where each node has at most two children in sorted order."
runtime: binary-search-tree
---

# Binary Search Tree

A BST is a tree where each node has at most two children, and for every node:
  - Left subtree contains only values less than the node
  - Right subtree contains only values greater than the node

This ordering enables efficient search by halving the search space at each step.

Operations:
  insert: compare and go left/right — O(h)
  search: compare and go left/right — O(h)
  delete: find and restructure      — O(h)

Where h = height of the tree:
  Balanced tree: h = O(log n) — efficient!
  Degenerate:    h = O(n) — like a linked list

Applications: ordered data storage, range queries, priority queues (with balancing)

```js
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(value) {
    const node = new BSTNode(value);
    if (!this.root) { this.root = node; return; }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node; return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node; return;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value
        ? current.left : current.right;
    }
    return null;
  }
}
```

```python
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        node = BSTNode(value)
        if not self.root:
            self.root = node
            return
        current = self.root
        while True:
            if value < current.value:
                if not current.left:
                    current.left = node
                    return
                current = current.left
            else:
                if not current.right:
                    current.right = node
                    return
                current = current.right

    def search(self, value):
        current = self.root
        while current:
            if value == current.value:
                return current
            current = (current.left if value < current.value
                       else current.right)
        return None
```

```java
class BSTNode {
    int value;
    BSTNode left, right;

    BSTNode(int value) {
        this.value = value;
    }
}

class BST {
    BSTNode root;

    void insert(int value) {
        BSTNode node = new BSTNode(value);
        if (root == null) {
            root = node;
            return;
        }
        BSTNode current = root;
        while (true) {
            if (value < current.value) {
                if (current.left == null) {
                    current.left = node;
                    return;
                }
                current = current.left;
            } else {
                if (current.right == null) {
                    current.right = node;
                    return;
                }
                current = current.right;
            }
        }
    }

    BSTNode search(int value) {
        BSTNode current = root;
        while (current != null) {
            if (value == current.value) {
                return current;
            }
            current = value < current.value
                ? current.left
                : current.right;
        }
        return null;
    }
}
```

```cpp
struct BSTNode {
    int value;
    BSTNode* left = nullptr;
    BSTNode* right = nullptr;
    BSTNode(int value) : value(value) {}
};

class BST {
    BSTNode* root = nullptr;

public:
    void insert(int value) {
        BSTNode* node = new BSTNode(value);
        if (!root) {
            root = node;
            return;
        }
        BSTNode* current = root;
        while (true) {
            if (value < current->value) {
                if (!current->left) {
                    current->left = node;
                    return;
                }
                current = current->left;
            } else {
                if (!current->right) {
                    current->right = node;
                    return;
                }
                current = current->right;
            }
        }
    }

    BSTNode* search(int value) {
        BSTNode* current = root;
        while (current) {
            if (value == current->value) {
                return current;
            }
            current = value < current->value
                ? current->left
                : current->right;
        }
        return nullptr;
    }
};
```

```rust
struct BstNode {
    value: i32,
    left: Option<Box<BstNode>>,
    right: Option<Box<BstNode>>,
}

impl BstNode {
    fn new(value: i32) -> Self {
        BstNode { value, left: None, right: None }
    }
}

struct Bst {
    root: Option<Box<BstNode>>,
}

impl Bst {
    fn new() -> Self {
        Bst { root: None }
    }

    fn insert(&mut self, value: i32) {
        let node = Box::new(BstNode::new(value));
        if self.root.is_none() {
            self.root = Some(node);
            return;
        }
        // current walks down the tree as a mutable borrow
        let mut current = self.root.as_mut().unwrap();
        loop {
            if value < current.value {
                if current.left.is_none() {
                    current.left = Some(node);
                    return;
                }
                current = current.left.as_mut().unwrap();
            } else {
                if current.right.is_none() {
                    current.right = Some(node);
                    return;
                }
                current = current.right.as_mut().unwrap();
            }
        }
    }

    fn search(&self, value: i32) -> Option<&BstNode> {
        let mut current = self.root.as_deref();
        while let Some(node) = current {
            if value == node.value {
                return Some(node);
            }
            current = if value < node.value {
                node.left.as_deref()
            } else {
                node.right.as_deref()
            };
        }
        None
    }
}
```

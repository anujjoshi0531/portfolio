---
id: linked-list
title: "Linked List"
category: "Data Structures"
difficulty: easy
visualization: concept
description: "Linear collection of data elements where order is given by pointers between nodes."
runtime: linked-list
---

# Linked List

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
  - Not cache-friendly

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  delete(value) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        if (current.next === this.tail) {
          this.tail = current;
        }
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
}
```

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, value):
        node = Node(value)
        if not self.head:
            self.head = self.tail = node
        else:
            self.tail.next = node
            self.tail = node

    def prepend(self, value):
        node = Node(value)
        node.next = self.head
        self.head = node
        if not self.tail:
            self.tail = node

    def search(self, value):
        current = self.head
        while current:
            if current.value == value:
                return current
            current = current.next
        return None

    def delete(self, value):
        if not self.head:
            return
        if self.head.value == value:
            self.head = self.head.next
            if not self.head:
                self.tail = None
            return
        current = self.head
        while current.next:
            if current.next.value == value:
                if current.next is self.tail:
                    self.tail = current
                current.next = current.next.next
                return
            current = current.next
```

```java
class Node {
    int value;
    Node next;

    Node(int value) {
        this.value = value;
    }
}

class LinkedList {
    Node head;
    Node tail;

    void append(int value) {
        Node node = new Node(value);
        if (head == null) {
            head = tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    void prepend(int value) {
        Node node = new Node(value);
        node.next = head;
        head = node;
        if (tail == null) {
            tail = node;
        }
    }

    Node search(int value) {
        Node current = head;
        while (current != null) {
            if (current.value == value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    void delete(int value) {
        if (head == null) return;
        if (head.value == value) {
            head = head.next;
            if (head == null) tail = null;
            return;
        }
        Node current = head;
        while (current.next != null) {
            if (current.next.value == value) {
                if (current.next == tail) {
                    tail = current;
                }
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
}
```

```cpp
struct Node {
    int value;
    Node* next;
    Node(int value) : value(value), next(nullptr) {}
};

class LinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;

public:
    void append(int value) {
        Node* node = new Node(value);
        if (!head) {
            head = tail = node;
        } else {
            tail->next = node;
            tail = node;
        }
    }

    void prepend(int value) {
        Node* node = new Node(value);
        node->next = head;
        head = node;
        if (!tail) {
            tail = node;
        }
    }

    Node* search(int value) {
        Node* current = head;
        while (current) {
            if (current->value == value) {
                return current;
            }
            current = current->next;
        }
        return nullptr;
    }

    void deleteValue(int value) {
        if (!head) return;
        if (head->value == value) {
            Node* old = head;
            head = head->next;
            delete old;
            if (!head) tail = nullptr;
            return;
        }
        Node* current = head;
        while (current->next) {
            if (current->next->value == value) {
                Node* old = current->next;
                if (old == tail) {
                    tail = current;
                }
                current->next = old->next;
                delete old;
                return;
            }
            current = current->next;
        }
    }
};
```

```rust
struct Node {
    value: i32,
    // Each node owns the next one through the Box,
    // so None marks the end of the list.
    next: Option<Box<Node>>,
}

struct LinkedList {
    // No tail pointer: two owners of the same node would
    // require Rc<RefCell<Node>>, so we walk to the end.
    head: Option<Box<Node>>,
}

impl LinkedList {
    fn new() -> Self {
        LinkedList { head: None }
    }

    fn append(&mut self, value: i32) {
        let node = Box::new(Node { value, next: None });
        if self.head.is_none() {
            self.head = Some(node);
            return;
        }
        let mut current = self.head.as_mut().unwrap();
        while current.next.is_some() {
            current = current.next.as_mut().unwrap();
        }
        current.next = Some(node);
    }

    fn prepend(&mut self, value: i32) {
        // take() moves the old head out, leaving None behind
        let node = Box::new(Node {
            value,
            next: self.head.take(),
        });
        self.head = Some(node);
    }

    fn search(&self, value: i32) -> Option<&Node> {
        let mut current = self.head.as_deref();
        while let Some(node) = current {
            if node.value == value {
                return Some(node);
            }
            current = node.next.as_deref();
        }
        None
    }

    fn delete(&mut self, value: i32) {
        if self.head.is_none() {
            return;
        }
        if self.head.as_ref().unwrap().value == value {
            let old = self.head.take().unwrap();
            self.head = old.next;
            return;
        }
        let mut current = self.head.as_mut().unwrap();
        while current.next.is_some() {
            if current.next.as_ref().unwrap().value == value {
                // Unlink: current.next skips over the removed node
                let removed = current.next.take().unwrap();
                current.next = removed.next;
                return;
            }
            current = current.next.as_mut().unwrap();
        }
    }
}
```

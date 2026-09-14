---
id: tower-of-hanoi
title: "Tower of Hanoi"
category: "Divide and Conquer"
difficulty: intermediate
visualization: matrix
description: "Mathematical game moving disks between three rods obeying size ordering rules."
runtime: tower-of-hanoi
---

# Tower of Hanoi

The Tower of Hanoi is a classic recursive puzzle. Move all disks from the source peg to the target peg, one at a time, never placing a larger disk on top of a smaller one.

How it works (Recursive):
1. Move the top n-1 disks from source to auxiliary peg
2. Move the largest disk from source to target peg
3. Move the n-1 disks from auxiliary to target peg

Time Complexity: O(2^n - 1) — exactly 2^n - 1 moves
Space Complexity: O(n) — recursive call stack

Properties:
  - Minimum moves required: 2^n - 1
  - Classic example of divide and conquer
  - Demonstrates the power of recursion

The puzzle was invented by mathematician Édouard Lucas in 1883. Legend says monks in a temple are moving 64 golden disks — completing the puzzle would mark the end of the world (requiring 18,446,744,073,709,551,615 moves).

```js
function hanoi(n, source, target, auxiliary) {
  if (n === 0) return;

  // Move n-1 disks from source to auxiliary
  hanoi(n - 1, source, auxiliary, target);

  // Move the largest disk to target
  console.log(\`Move disk \${n} from \${source} to \${target}\`);

  // Move n-1 disks from auxiliary to target
  hanoi(n - 1, auxiliary, target, source);
}

hanoi(3, 'A', 'C', 'B');
```

```python
def hanoi(n, source, target, auxiliary):
    if n == 0:
        return

    # Move n-1 disks from source to auxiliary
    hanoi(n - 1, source, auxiliary, target)

    # Move the largest disk to target
    print(f"Move disk {n} from {source} to {target}")

    # Move n-1 disks from auxiliary to target
    hanoi(n - 1, auxiliary, target, source)


hanoi(3, "A", "C", "B")
```

```java
void hanoi(int n, String source, String target, String auxiliary) {
    if (n == 0) return;

    // Move n-1 disks from source to auxiliary
    hanoi(n - 1, source, auxiliary, target);

    // Move the largest disk to target
    System.out.println("Move disk " + n + " from " + source + " to " + target);

    // Move n-1 disks from auxiliary to target
    hanoi(n - 1, auxiliary, target, source);
}

hanoi(3, "A", "C", "B");
```

```cpp
void hanoi(int n, string source, string target, string auxiliary) {
    if (n == 0) return;

    // Move n-1 disks from source to auxiliary
    hanoi(n - 1, source, auxiliary, target);

    // Move the largest disk to target
    cout << "Move disk " << n << " from " << source << " to " << target << endl;

    // Move n-1 disks from auxiliary to target
    hanoi(n - 1, auxiliary, target, source);
}

hanoi(3, "A", "C", "B");
```

```rust
fn hanoi(n: u32, source: &str, target: &str, auxiliary: &str) {
    if n == 0 {
        return;
    }

    // Move n-1 disks from source to auxiliary
    hanoi(n - 1, source, auxiliary, target);

    // Move the largest disk to target
    println!("Move disk {n} from {source} to {target}");

    // Move n-1 disks from auxiliary to target
    hanoi(n - 1, auxiliary, target, source);
}

hanoi(3, "A", "C", "B");
```

---
id: euclidean
title: "Euclidean Algorithm"
category: "Math"
difficulty: easy
visualization: concept
description: "Efficient method for computing the greatest common divisor (GCD) of two integers."
runtime: euclidean
---

# Euclidean Algorithm

The Euclidean Algorithm computes the greatest common divisor (GCD) of two integers — the largest number that divides both without a remainder. It is one of the oldest algorithms still in common use.

The key insight: any number that divides both a and b also divides their remainder a mod b. So gcd(a, b) = gcd(b, a mod b), and repeating this shrinks the pair until the remainder is 0.

How it works:
1. Divide a by b to get the remainder r = a mod b
2. If r is 0, then b is the answer
3. Otherwise replace the pair with (b, r) and repeat

Why it is fast:
  The remainder at least halves every two steps, so the number of divisions is O(log min(a, b)) — far fewer than trying every candidate divisor.

Time Complexity:
  Best:    O(1)
  Average: O(log min(a, b))
  Worst:   O(log min(a, b))

Space Complexity: O(1) for the iterative version

Properties:
  - Deterministic, no randomness
  - Works with the modulo operation only — no factorization needed
  - Foundation for the Extended Euclidean Algorithm, modular inverses, and reducing fractions

Described by the Greek mathematician Euclid in his Elements (~300 BCE), this algorithm still underpins modern arithmetic, cryptography (RSA key math), and computer algebra systems.

```js
function gcd(a, b) {
  while (b !== 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

gcd(48, 36);
```

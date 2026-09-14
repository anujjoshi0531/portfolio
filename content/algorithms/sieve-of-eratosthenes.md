---
id: sieve-of-eratosthenes
title: "Sieve of Eratosthenes"
category: "Math"
difficulty: intermediate
visualization: matrix
description: "Ancient algorithm for finding all prime numbers up to any given limit."
runtime: sieve-of-eratosthenes
---

# Sieve of Eratosthenes

The Sieve of Eratosthenes is a classic algorithm for finding all prime numbers up to a limit n. It works by iteratively marking the multiples of each prime, starting from 2.

How it works:
1. Create a boolean array marking 2..n as potentially prime
2. For each i from 2 up to √n, if i is still marked prime, mark every multiple of i (starting from i²) as composite
3. Numbers that remain marked after the loop are the primes ≤ n

Why start crossing from i²?
  All smaller multiples of i (2i, 3i, …, (i−1)i) have already been crossed by a smaller prime.

Time Complexity:
  Best:    O(n log log n)
  Average: O(n log log n)
  Worst:   O(n log log n)

Space Complexity: O(n)

Properties:
  - Deterministic, no randomness
  - Cache-friendly when n fits in memory
  - Foundational for number theory and cryptography preprocessing

Named after the Greek mathematician Eratosthenes of Cyrene (~276–194 BCE), this sieve remains one of the most efficient ways to find all small primes and is the basis for many factorization preprocessing steps.

```js
function sieveOfEratosthenes(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime
    .map((p, i) => p ? i : null)
    .filter(x => x !== null);
}

sieveOfEratosthenes(30);
```

```python
def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i, p in enumerate(is_prime) if p]


sieve_of_eratosthenes(30)
```

```java
List<Integer> sieveOfEratosthenes(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    List<Integer> primes = new ArrayList<>();
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.add(i);
    }
    return primes;
}

sieveOfEratosthenes(30);
```

```cpp
vector<int> sieveOfEratosthenes(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push_back(i);
    }
    return primes;
}

sieveOfEratosthenes(30);
```

```rust
fn sieve_of_eratosthenes(n: usize) -> Vec<usize> {
    let mut is_prime = vec![true; n + 1];
    is_prime[0] = false;
    is_prime[1] = false;

    // Crossing out only needs to reach sqrt(n)
    let limit = (n as f64).sqrt() as usize;
    for i in 2..=limit {
        if is_prime[i] {
            for j in (i * i..=n).step_by(i) {
                is_prime[j] = false;
            }
        }
    }

    (2..=n).filter(|&i| is_prime[i]).collect()
}

sieve_of_eratosthenes(30);
```

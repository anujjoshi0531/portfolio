const description = `Sieve of Eratosthenes

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

Named after the Greek mathematician Eratosthenes of Cyrene (~276–194 BCE), this sieve remains one of the most efficient ways to find all small primes and is the basis for many factorization preprocessing steps.`

export default description

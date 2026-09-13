import type { CodeImplementation } from '@lib/types'
import { annotated } from '@lib/code-languages'

export const mathPython: Record<string, CodeImplementation> = {
  euclidean: annotated(`def gcd(a, b):
    while b != 0:  #@2
        q = a // b  #@3
        r = a % b  #@4
        a = b  #@5
        b = r  #@6
    return a  #@8


gcd(48, 36)`),
  'sieve-of-eratosthenes': annotated(`def sieve_of_eratosthenes(n):
    is_prime = [True] * (n + 1)  #@2
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n ** 0.5) + 1):  #@5
        if is_prime[i]:
            for j in range(i * i, n + 1, i):  #@7
                is_prime[j] = False

    return [i for i, p in enumerate(is_prime) if p]  #@12


sieve_of_eratosthenes(30)`),
}

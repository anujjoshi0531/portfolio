import type { CodeImplementation } from '@lib/types'
import { annotated } from '@lib/code-languages'

export const mathJava: Record<string, CodeImplementation> = {
  euclidean: annotated(`int gcd(int a, int b) {
    while (b != 0) {  //@2
        int q = a / b;  //@3
        int r = a % b;  //@4
        a = b;  //@5
        b = r;  //@6
    }
    return a;  //@8
}

gcd(48, 36);`),
  'sieve-of-eratosthenes': annotated(`List<Integer> sieveOfEratosthenes(int n) {
    boolean[] isPrime = new boolean[n + 1];  //@2
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= n; i++) {  //@5
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {  //@7
                isPrime[j] = false;
            }
        }
    }

    List<Integer> primes = new ArrayList<>();  //@12
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.add(i);
    }
    return primes;
}

sieveOfEratosthenes(30);`),
}

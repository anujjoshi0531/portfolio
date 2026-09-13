import type { CodeImplementation } from '@lib/types'
import { annotated } from '@lib/code-languages'

export const mathRust: Record<string, CodeImplementation> = {
  euclidean: annotated(`fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b != 0 {  //@2
        let q = a / b;  //@3
        let r = a % b;  //@4
        a = b;  //@5
        b = r;  //@6
    }
    a  //@8
}

gcd(48, 36);`),
  'sieve-of-eratosthenes': annotated(`fn sieve_of_eratosthenes(n: usize) -> Vec<usize> {
    let mut is_prime = vec![true; n + 1];  //@2
    is_prime[0] = false;
    is_prime[1] = false;

    // Crossing out only needs to reach sqrt(n)
    let limit = (n as f64).sqrt() as usize;
    for i in 2..=limit {  //@5
        if is_prime[i] {
            for j in (i * i..=n).step_by(i) {  //@7
                is_prime[j] = false;
            }
        }
    }

    (2..=n).filter(|&i| is_prime[i]).collect()  //@12
}

sieve_of_eratosthenes(30);`),
}

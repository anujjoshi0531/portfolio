import type { Algorithm, Step, HighlightType } from '@lib/types'
import { d } from '@lib/algorithms/shared'

const euclideanAlgorithm: Algorithm = {
  id: 'euclidean',
  name: 'Euclidean Algorithm',
  category: 'Math',
  difficulty: 'easy',
  visualization: 'concept',
  code: `function gcd(a, b) {
  while (b !== 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

gcd(48, 36);`,

  generateSteps(locale = 'en') {
    const A0 = 48
    const B0 = 36

    const steps: Step[] = []
    const history: { a: number; b: number; q: number; r: number }[] = []

    let a = A0
    let b = B0

    steps.push({
      concept: { type: 'euclidean', a, b, phase: 'intro', history: [...history] },
      description: d(
        locale,
        `Compute gcd(${A0}, ${B0}). Euclid's key idea: gcd(a, b) = gcd(b, a mod b).`,
        `Calcular gcd(${A0}, ${B0}). La idea clave de Euclides: gcd(a, b) = gcd(b, a mod b).`,
      ),
      codeLine: 2,
      variables: { a, b },
    })

    while (b !== 0) {
      const q = Math.floor(a / b)
      const r = a % b

      steps.push({
        concept: {
          type: 'euclidean',
          a,
          b,
          quotient: q,
          remainder: r,
          phase: 'divide',
          history: [...history],
          operation: `${a} mod ${b} = ${r}`,
        },
        description:
          r === 0
            ? d(
                locale,
                `${a} = ${q} · ${b} + 0. The remainder is 0, so the divisor ${b} is the gcd.`,
                `${a} = ${q} · ${b} + 0. El residuo es 0, así que el divisor ${b} es el gcd.`,
              )
            : d(
                locale,
                `${a} = ${q} · ${b} + ${r}. Remainder ${r} ≠ 0, so gcd(${a}, ${b}) = gcd(${b}, ${r}).`,
                `${a} = ${q} · ${b} + ${r}. Residuo ${r} ≠ 0, así que gcd(${a}, ${b}) = gcd(${b}, ${r}).`,
              ),
        codeLine: 4,
        variables: { a, b, q, r },
      })

      history.push({ a, b, q, r })
      a = b
      b = r

      if (b === 0) {
        steps.push({
          concept: { type: 'euclidean', a, b, phase: 'done', history: [...history], gcd: a },
          description: d(
            locale,
            `Done. gcd(${A0}, ${B0}) = ${a}.`,
            `Listo. gcd(${A0}, ${B0}) = ${a}.`,
          ),
          codeLine: 8,
          variables: { a, b, gcd: a },
          consoleOutput: [String(a)],
        })
      } else {
        steps.push({
          concept: {
            type: 'euclidean',
            a,
            b,
            phase: 'reduce',
            history: [...history],
            operation: `a ← ${a}, b ← ${b}`,
          },
          description: d(
            locale,
            `Slide the pair down: a ← ${a}, b ← ${b}. Repeat the division.`,
            `Desplazar el par: a ← ${a}, b ← ${b}. Repetir la división.`,
          ),
          codeLine: 6,
          variables: { a, b },
        })
      }
    }

    return steps
  },
}

const sieveOfEratosthenes: Algorithm = {
  id: 'sieve-of-eratosthenes',
  name: 'Sieve of Eratosthenes',
  category: 'Math',
  difficulty: 'intermediate',
  visualization: 'matrix',
  code: `function sieveOfEratosthenes(n) {
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

sieveOfEratosthenes(30);`,

  generateSteps(locale = 'en') {
    const N = 30
    const COLS = 6
    const ROWS = Math.ceil(N / COLS)

    const values: (number | string)[][] = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c) => r * COLS + c + 1),
    )

    const cellOf = (v: number): [number, number] => [Math.floor((v - 1) / COLS), (v - 1) % COLS]

    const steps: Step[] = []
    const composite = new Set<number>()

    const buildHighlights = (
      currentPrime: number | null,
      currentMultiple: number | null,
    ): Record<string, HighlightType> => {
      const h: Record<string, HighlightType> = {}
      h['0,0'] = 'sorted'
      for (const c of composite) {
        const [r, col] = cellOf(c)
        h[`${r},${col}`] = 'placed'
      }
      if (currentPrime != null) {
        const [r, col] = cellOf(currentPrime)
        h[`${r},${col}`] = 'current'
      }
      if (currentMultiple != null) {
        const [r, col] = cellOf(currentMultiple)
        h[`${r},${col}`] = 'checking'
      }
      return h
    }

    steps.push({
      matrix: {
        rows: ROWS,
        cols: COLS,
        values,
        highlights: buildHighlights(null, null),
      },
      description: d(
        locale,
        `Initialize: assume every number from 2 to ${N} is prime. 1 is excluded by definition.`,
        `Inicializar: asumimos que todo número de 2 a ${N} es primo. 1 se excluye por definición.`,
      ),
      codeLine: 2,
      variables: { n: N, primes: 0 },
    })

    const limit = Math.floor(Math.sqrt(N))
    for (let i = 2; i <= limit; i++) {
      if (composite.has(i)) continue

      steps.push({
        matrix: {
          rows: ROWS,
          cols: COLS,
          values,
          highlights: buildHighlights(i, null),
        },
        description: d(
          locale,
          `${i} is still marked prime. Cross out its multiples starting from ${i}² = ${i * i}.`,
          `${i} sigue marcado como primo. Tachar sus múltiplos empezando en ${i}² = ${i * i}.`,
        ),
        codeLine: 5,
        variables: { i, 'i*i': i * i },
      })

      for (let j = i * i; j <= N; j += i) {
        steps.push({
          matrix: {
            rows: ROWS,
            cols: COLS,
            values,
            highlights: buildHighlights(i, j),
          },
          description: d(
            locale,
            `Mark ${j} as composite (multiple of ${i}).`,
            `Marcar ${j} como compuesto (múltiplo de ${i}).`,
          ),
          codeLine: 7,
          variables: { i, j },
        })
        composite.add(j)
      }
    }

    const primes: number[] = []
    for (let k = 2; k <= N; k++) if (!composite.has(k)) primes.push(k)

    const finalHighlights: Record<string, HighlightType> = { '0,0': 'sorted' }
    for (let k = 2; k <= N; k++) {
      const [r, col] = cellOf(k)
      finalHighlights[`${r},${col}`] = composite.has(k) ? 'placed' : 'pivot'
    }

    steps.push({
      matrix: {
        rows: ROWS,
        cols: COLS,
        values,
        highlights: finalHighlights,
      },
      description: d(
        locale,
        `Done. Primes ≤ ${N}: ${primes.join(', ')} (${primes.length} primes).`,
        `Listo. Primos ≤ ${N}: ${primes.join(', ')} (${primes.length} primos).`,
      ),
      codeLine: 12,
      variables: { count: primes.length, primes: primes.join(',') },
      consoleOutput: [`[${primes.join(', ')}]`],
    })

    return steps
  },
}

export { euclideanAlgorithm, sieveOfEratosthenes }

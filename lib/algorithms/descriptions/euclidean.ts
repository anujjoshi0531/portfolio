import type { Locale } from '@i18n/translations'

const descriptions: Record<Locale, string> = {
  en: `Euclidean Algorithm

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

Described by the Greek mathematician Euclid in his Elements (~300 BCE), this algorithm still underpins modern arithmetic, cryptography (RSA key math), and computer algebra systems.`,
  es: `Algoritmo de Euclides

El Algoritmo de Euclides calcula el máximo común divisor (MCD) de dos enteros: el número más grande que divide a ambos sin dejar residuo. Es uno de los algoritmos más antiguos que se siguen usando.

La idea clave: cualquier número que divide a a y a b también divide su residuo a mod b. Por eso gcd(a, b) = gcd(b, a mod b), y repetirlo encoge el par hasta que el residuo es 0.

Cómo funciona:
1. Divide a entre b para obtener el residuo r = a mod b
2. Si r es 0, entonces b es la respuesta
3. Si no, reemplaza el par por (b, r) y repite

Por qué es rápido:
  El residuo se reduce al menos a la mitad cada dos pasos, así que el número de divisiones es O(log min(a, b)) — muchísimo menos que probar cada divisor candidato.

Complejidad Temporal:
  Mejor:    O(1)
  Promedio: O(log min(a, b))
  Peor:     O(log min(a, b))

Complejidad Espacial: O(1) en la versión iterativa

Propiedades:
  - Determinista, sin aleatoriedad
  - Usa solo la operación módulo — no requiere factorización
  - Base del Algoritmo de Euclides Extendido, los inversos modulares y la simplificación de fracciones

Descrito por el matemático griego Euclides en sus Elementos (~300 a.C.), este algoritmo aún sustenta la aritmética moderna, la criptografía (matemática de claves RSA) y los sistemas de álgebra computacional.`,
}

export default descriptions

export type ComplexityKey =
  | 'O(1)'
  | 'O(log n)'
  | 'O(√n)'
  | 'O(n)'
  | 'O(n log log n)'
  | 'O(n log n)'
  | 'O(n²)'
  | 'O(2^n)'
  | 'O(n!)'

export const COMPLEXITY_FNS: Record<ComplexityKey, (n: number) => number> = {
  'O(1)': () => 1,
  'O(log n)': (n) => Math.log2(Math.max(1, n)),
  'O(√n)': (n) => Math.sqrt(n),
  'O(n)': (n) => n,
  'O(n log log n)': (n) => n * Math.log2(Math.max(2, Math.log2(Math.max(2, n)))),
  'O(n log n)': (n) => n * Math.log2(Math.max(1, n)),
  'O(n²)': (n) => n * n,
  'O(2^n)': (n) => Math.pow(2, n),
  'O(n!)': (n) => {
    let r = 1
    for (let i = 2; i <= n; i++) r *= i
    return r
  },
}

export const COMPLEXITY_COLORS: Record<ComplexityKey, string> = {
  'O(1)': '#10b981', // green
  'O(log n)': '#34d399', // emerald
  'O(√n)': '#22d3ee', // cyan
  'O(n)': '#60a5fa', // blue
  'O(n log log n)': '#818cf8', // indigo
  'O(n log n)': '#fbbf24', // amber
  'O(n²)': '#fb923c', // orange
  'O(2^n)': '#f87171', // red
  'O(n!)': '#ef4444', // bright red
}

export function normalizeToKey(raw: string): ComplexityKey | null {
  const s = raw.replace(/\s+/g, '').toLowerCase()
  if (/^o\(1\)/.test(s)) return 'O(1)'
  if (/n!/.test(s)) return 'O(n!)'
  if (/2\^|k\^/.test(s)) return 'O(2^n)'
  if (/√n|sqrt/.test(s)) return 'O(√n)'
  if (/n²|n\^2|v²/.test(s)) return 'O(n²)'
  if (/nloglogn|n\*loglogn/.test(s)) return 'O(n log log n)'
  if (/nlogn|n\*logn|\(v\+e\)log|elog|n\^1\.25/.test(s)) return 'O(n log n)'
  if (/loglog/.test(s)) return 'O(log n)'
  if (/log/.test(s)) return 'O(log n)'
  if (/n\+k|d[×x*]/.test(s)) return 'O(n)'
  if (/[nm][×x*][nwm]|rows[×x*]cols/.test(s)) return 'O(n²)'
  if (/v\+e/.test(s)) return 'O(n)'
  if (/n/.test(s)) return 'O(n)'
  return null
}

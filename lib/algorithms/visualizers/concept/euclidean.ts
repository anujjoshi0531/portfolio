/**
 * Concept visualizer: Euclidean Algorithm (GCD by division).
 *
 * Shows the current pair (a, b), the active division `a = q·b + r` with the
 * remainder highlighted, a proportional bar illustrating how many times b fits
 * into a, and the running history of reductions until b reaches 0.
 */
import type { EuclideanState } from '@lib/types'
import { applyStyles } from '@lib/visualizers/concept/dom'

function tile(value: number, variant: 'a' | 'b' | 'result'): HTMLElement {
  const colors = {
    a: { bg: 'rgba(96,165,250,0.15)', border: 'rgba(96,165,250,0.4)', text: '#60a5fa' },
    b: { bg: 'rgba(192,132,252,0.15)', border: 'rgba(192,132,252,0.4)', text: '#c084fc' },
    result: { bg: 'rgba(74,222,128,0.18)', border: 'rgba(74,222,128,0.5)', text: '#4ade80' },
  }[variant]
  const el = document.createElement('div')
  el.className =
    'min-w-16 h-16 px-3 rounded-lg border flex items-center justify-center font-mono text-2xl font-bold transition-all duration-300'
  applyStyles(el, {
    backgroundColor: colors.bg,
    borderColor: colors.border,
    color: colors.text,
    boxShadow: `0 0 12px ${colors.border}`,
  })
  el.textContent = String(value)
  return el
}

export function renderEuclidean(state: EuclideanState): HTMLElement {
  const { a, b, quotient, remainder, phase, history, gcd, operation } = state

  const wrap = document.createElement('div')
  wrap.className = 'flex-1 flex flex-col items-center justify-center gap-4 w-full'

  const title = document.createElement('div')
  title.className = 'text-neutral-500 font-mono text-[11px] uppercase tracking-widest'
  title.textContent = 'Euclidean Algorithm'
  wrap.append(title)

  if (operation) {
    const badge = document.createElement('div')
    badge.className =
      'font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300'
    badge.textContent = operation
    wrap.append(badge)
  }

  // ── Current pair: a and b tiles ──
  const pair = document.createElement('div')
  pair.className = 'flex items-end gap-3'

  const aGroup = document.createElement('div')
  aGroup.className = 'flex flex-col items-center gap-1'
  const aLabel = document.createElement('span')
  aLabel.className = 'text-[10px] font-mono font-bold text-blue-400'
  aLabel.textContent = 'a'
  aGroup.append(aLabel, tile(a, 'a'))

  const bGroup = document.createElement('div')
  bGroup.className = 'flex flex-col items-center gap-1'
  const bLabel = document.createElement('span')
  bLabel.className = 'text-[10px] font-mono font-bold text-purple-400'
  bLabel.textContent = 'b'
  bGroup.append(bLabel, tile(b, 'b'))

  pair.append(aGroup, bGroup)
  wrap.append(pair)

  // ── Division equation: a = q·b + r ──
  if (phase !== 'intro' && quotient != null && remainder != null) {
    const eq = document.createElement('div')
    eq.className = 'font-mono text-sm text-neutral-400 flex items-center gap-1'

    eq.append(document.createTextNode(`${a} = ${quotient} · ${b} + `))

    const rSpan = document.createElement('span')
    const solved = remainder === 0
    rSpan.className = solved ? 'text-green-400 font-bold' : 'text-amber-300 font-bold'
    rSpan.textContent = String(remainder)
    eq.append(rSpan)

    eq.append(
      document.createTextNode(solved ? '  → remainder 0, done' : `  → gcd(${b}, ${remainder})`),
    )
    wrap.append(eq)

    // ── Proportional bar: q blocks of width b, then the remainder r ──
    const bar = document.createElement('div')
    bar.className = 'flex h-6 rounded-md overflow-hidden border border-white/10'
    applyStyles(bar, { width: 'min(340px, 80%)' })
    const total = quotient * b + remainder || 1
    for (let i = 0; i < quotient; i++) {
      const block = document.createElement('div')
      block.className = 'h-full border-r border-black/30'
      applyStyles(block, {
        width: `${(b / total) * 100}%`,
        backgroundColor: 'rgba(192,132,252,0.35)',
      })
      bar.append(block)
    }
    if (remainder > 0) {
      const rem = document.createElement('div')
      rem.className = 'h-full'
      applyStyles(rem, { width: `${(remainder / total) * 100}%`, backgroundColor: '#f59e0b' })
      bar.append(rem)
    }
    wrap.append(bar)
  }

  // ── History of completed reductions ──
  if (history.length > 0) {
    const list = document.createElement('div')
    list.className = 'flex flex-col items-center gap-0.5 mt-1'
    history.forEach((row) => {
      const line = document.createElement('div')
      line.className = 'font-mono text-[11px] text-neutral-600'
      line.textContent = `${row.a} = ${row.q} · ${row.b} + ${row.r}`
      list.append(line)
    })
    wrap.append(list)
  }

  // ── Result ──
  if (phase === 'done' && gcd != null) {
    const result = document.createElement('div')
    result.className = 'font-mono text-lg font-bold text-green-400 mt-1'
    result.textContent = `gcd = ${gcd}`
    wrap.append(result)
  }

  return wrap
}
